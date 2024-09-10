import Image from 'next/image'
import React from 'react'
import Bidders_viewers_list from './bidders-viewers-list'
import Chatwithothers from './chatwithothers'
import BidSummary from './bidSummary'

function ModalContent({ buttonAcitve, product }) {
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
                <BidSummary />
            }

        </>
    )
}

export default ModalContent