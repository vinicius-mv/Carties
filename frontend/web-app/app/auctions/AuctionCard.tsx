import Image from 'next/image'
import React from 'react'

type Props = {
    auction: any
}

export default function AuctionCard({ auction }: Props) {
    return (
        <a href='#'>
            <div className='relative w-full bg-gray-200 aspect-video rounded-lg overflow-hidden'>
                <Image
                    src={auction.imageUrl}
                    alt={`Image of ${auction.make} ${auction.model} in ${auction.color}`}
                    fill
                    priority
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                />
            </div>
            <div className='flex justify-between items-center mt-4'>
                <h3 className='text-gray-700'>{auction.make} {auction.model}</h3>
                <p className='font-semibold text-sm'>{auction.year}</p>
            </div>
        </a>
    )
}
