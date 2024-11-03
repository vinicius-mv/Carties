'use client';

import React, {useEffect, useState} from 'react';
import {User} from "next-auth";
import {Auction, Bid} from "@/types";
import {useBidStore} from "@/hooks/useBidStore";
import {getBidsForAuction} from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
import Heading from "@/app/components/Heading";
import BidItem from "@/app/auctions/details/[id]/BidItem";

type Props = {
    user: User | null;
    auction: Auction;
}

function BidList({auction}: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const bids = useBidStore(state => state.bids);
    const setBids = useBidStore(state => state.setBids);

    useEffect(() => {
        getBidsForAuction(auction.id)
            .then((res: any) => {
                if (res.error) {
                    throw res.error;
                }
                setBids(res as Bid[]);
            }).catch(err => {
                toast.error(err.message);
            }).finally(() => setLoading(false));
    }, [auction.id, setLoading, setBids]);

    if (loading) return <span>Loading bids...</span>

    return (
        <div className='border-2 rounded-lg p-2 bg-gray-100'>
            <Heading title='Bids'/>
            {bids.map(bid => (
                <BidItem key={bid.id} bid={bid}/>
            ))}
        </div>
    );
}

export default BidList;