import React from 'react'
import AuctionCard from './AuctionCard';

async function getData() {
    const res = await fetch('http://localhost:6001/search?pageSize=10');

    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

export default async function Listings() {
    const data = await getData();

    return (
        <div className='grid grid-cols-4 gap-6'>
            {data && data.results.map((auction: any) => {
                console.log(`auction.id ${auction.id}`);
                return (< AuctionCard auction={auction} key={auction.id} />)
            })}
        </div>
    )
}
