'use client'

import { useParamStore } from '@/hooks/useParamsStore'
import React from 'react'
import { AiOutlineCar } from 'react-icons/ai'

export default function Logo() {
    const reset = useParamStore(state => state.reset);

    return (
        <div onClick={reset}
            className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'>
            <AiOutlineCar />
            <div>Carsties Auctions</div>
        </div>
    )
}
