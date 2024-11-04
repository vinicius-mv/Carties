'use client';

import {ReactNode, useCallback, useEffect, useRef} from 'react';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { useParams } from "next/navigation";
import {Auction, AuctionFinished, Bid} from "@/types";
import {User} from "next-auth";
import AuctionCreatedToast from "@/app/components/AuctionCreatedToast";
import toast from "react-hot-toast";
import {getDetailedViewData} from "@/app/actions/auctionActions";
import AuctionFinishedToast from "@/app/components/AuctionFinishedToast";

type Props = {
    children: ReactNode;
    user: User | null;
    notifyUrl: string;
}

function SignalRProvider({ user, children, notifyUrl }: Props) {
    const connection = useRef<HubConnection>();
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);
    const params = useParams<{ id: string }>();

    const handleAuctionFinished = useCallback((finishedAuction: AuctionFinished) => {
        const auction = getDetailedViewData(finishedAuction.auctionId);
        return toast.promise(auction, {
            loading: 'Loading',
            success: (auction) =>
                <AuctionFinishedToast finishedAuction={finishedAuction}
                                      auction={auction}
                />,
            error: (err) => 'Auction finished'
        }, {success: {duration: 10_000, icon: null}})
    }, [])

    const handleBidPlaced = useCallback((bid: Bid) => {
        if (bid.bidStatus.includes('Accepted')) {
            setCurrentPrice(bid.auctionId, bid.amount);
        }

        if (params.id === bid.auctionId) {
            addBid(bid);
        }
    }, [addBid, params.id, setCurrentPrice]);

    const handleAuctionCreated = useCallback((auction: Auction) => {
        if (user?.username !== auction.seller) {
            return toast(<AuctionCreatedToast auction={auction} />, {
                duration: 10_000
            });
        }
    }, [user?.username]);

    useEffect(() => {
        if (!connection.current) {
            connection.current = new HubConnectionBuilder()
                .withUrl(notifyUrl)
                .withAutomaticReconnect()
                .build();

            connection.current.start()
                .then(() => 'Connected to notifications hub')
                .catch(err => console.log(err));
        }

        connection.current.on('BidPlaced', handleBidPlaced);
        connection.current.on('AuctionCreated', handleAuctionCreated);
        connection.current.on('AuctionFinished', handleAuctionFinished);
        
        return () => {
            connection.current?.off('BidPlaced', handleBidPlaced);
            connection.current?.off('AuctionCreated', handleAuctionCreated);
            connection.current?.off('AuctionFinished', handleAuctionFinished);
        }
    }, [handleAuctionCreated, handleAuctionFinished, handleBidPlaced, notifyUrl, setCurrentPrice])

    return (
        children
    );
}

export default SignalRProvider;