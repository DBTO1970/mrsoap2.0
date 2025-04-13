import Image from 'next/image'
import React, { useState } from 'react'
import Modal from 'react-modal'

const ImageModal = ({ isOpen, onClose, src, alt }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="image-modal text-center">
                <Image src={src} alt={alt} width={500} height={500} placeholder='blur' blurDataURL={src}/>
                <button onClick={onClose}>Close</button>
        </Modal>
        
    )
}

export default ImageModal