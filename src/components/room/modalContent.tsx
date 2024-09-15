import Image from 'next/image'
import React from 'react'
import Bidders_viewers_list from './bidders-viewers-list'
import Chatwithothers from './chatwithothers'
import BidSummary from './bidSummary'
import { ProductType } from '@/lib/types'

interface ModalContentProps {
    buttonAcitve:string;
    product:ProductType;
}

function ModalContent({ buttonAcitve, product }:ModalContentProps) {
    return (
        <>
            {
                (buttonAcitve == "viewers-list" || buttonAcitve == "bidders-list") &&
                <Bidders_viewers_list buttonAcitve={buttonAcitve} product={product} />
            }
            {
                buttonAcitve == "chat" &&
                <Chatwithothers />
            }
            {
                buttonAcitve == "bid-summary" &&
                <BidSummary buttonAcitve={buttonAcitve} product={product}  />
            }

        </>
    )
}

export default ModalContent