import React from 'react'
import Bidder_viewer from './bidders_viewersList'
import { ProductType } from '@/lib/types'


interface ModalProps {
    product:ProductType,
    buttonAcitve:string,
    setmodalshow:React.Dispatch<React.SetStateAction<boolean>>
}

function Modal({ product, buttonAcitve, setmodalshow }:ModalProps) {

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