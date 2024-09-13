'use server'

import { Auction, PagedResult } from "@/types";

export async function getData(query: string): Promise<PagedResult<Auction>> {
    const res = await fetch(`http://localhost:6001/search${query}`);

    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

export async function updateAuctionTest() {
    const data = {
        mileage: Math.floor(Math.random() * 1000) + 1
    }

    const res = await fetch('http://localhost:6001/auctions', {
        method: 'PUT',
        headers: {},
        body: JSON.stringify(data)
    });

    if (!res.ok) return { status: res.status, message: res.statusText }

    return res.json();
}