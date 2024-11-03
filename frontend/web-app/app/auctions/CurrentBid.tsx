import React from 'react';
import { numberWithCommas } from '../lib/numberWithComma';

type Props = {
    amount?: number;
    reservePrice: number;

}

function CurrentBid({ amount, reservePrice }: Props) {
    const text = amount ? '$' + numberWithCommas(amount) : 'No bids';
    const color = amount ? amount > reservePrice ? 'bg-green-600' : 'bg-amber-600' : 'bg-red-600'
    return (
        <div className={`
        border-2 border-white text-white py-1 px-2 rounded-lg flex 
        justify-center ${color}
        `}>
            {text}
        </div>
    );
}

export default CurrentBid;