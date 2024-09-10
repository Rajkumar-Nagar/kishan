import React from 'react'
import Bidder_viewer from './bidders_viewersList'

function Modal({ product, buttonAcitve, setmodalshow }) {

    return (

        <div>
            {
                buttonAcitve == "bid-summary" &&
                < Bidder_viewer product={product} buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />}
            {
                buttonAcitve == "chat" &&
                < Bidder_viewer product={product} buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />}
            {
                buttonAcitve == "bidders-list" &&
                < Bidder_viewer product={product} buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />}
            {
                buttonAcitve == "viewers-list" &&
                < Bidder_viewer product={product} buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />}

        </div>


    )
}

export default Modal