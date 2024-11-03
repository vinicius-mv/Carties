'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { useParams } from "next/navigation";
import { Bid } from "@/types";

type Props = {
    children: ReactNode
}

function SignalRProvider({ children }: Props) {
    const connection = useRef<HubConnection>();
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);
    const params = useParams<{ id: string }>();

    useEffect(() => {
        if (!connection.current) {
            connection.current = new HubConnectionBuilder()
                .withUrl('http://localhost:6001/notifications')
                .withAutomaticReconnect()
                .build();

            connection.current.start()
                .then(() => 'Connected to notifications hub')
                .catch(err => console.log(err));

            connection.current.on('BidPlaced', (bid: Bid) => {
                setCurrentPrice(bid.auctionId, bid.amount);
            })
        }
    }, [setCurrentPrice])

    return (
        children
    );
}

export default SignalRProvider;