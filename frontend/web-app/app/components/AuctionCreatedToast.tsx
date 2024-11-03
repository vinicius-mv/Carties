import React from 'react';
import {Auction} from "@/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
    auction: Auction;
}

function AuctionCreatedToast({auction}: Props) {
    return (
        <Link href={`/auctions/details/${auction.id}`} className='flex flex-col items-center'>
            <div className='flex flex-row items-center gap-2'>
                <Image src={auction.imageUrl}
                       alt={`Image of ${auction.make} ${auction.model}`}
                       height={80}
                       width={80}
                       className='rounded-lg w-auto h-auto'
                />
                <span>New Auction! {auction.make} {auction.model} ha been added</span>
            </div>
        </Link>
    );
}

export default AuctionCreatedToast;