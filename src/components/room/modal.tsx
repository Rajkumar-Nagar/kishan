import React from 'react'
import Bidder_viewer from './bidders_viewersList'
import { ProductType } from '@/lib/types'
import { MandiHeaderOptions } from './headerButtons'


interface ModalProps {
    product: ProductType,
    buttonAcitve: string,
    setmodalshow: React.Dispatch<React.SetStateAction<boolean>>
}

function Modal({ product, buttonAcitve, setmodalshow }: ModalProps) {

    return (

        <>
            {
                buttonAcitve == MandiHeaderOptions.bidSummary &&
                <Bidder_viewer product={product} buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />}
            {
                buttonAcitve == MandiHeaderOptions.chat &&
                <Bidder_viewer product={product} buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />}
            {
                buttonAcitve == MandiHeaderOptions.biddersList &&
                <Bidder_viewer product={product} buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />}
            {
                buttonAcitve == MandiHeaderOptions.viewersList &&
                <Bidder_viewer product={product} buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />}

        </>


    )
}

export default Modal