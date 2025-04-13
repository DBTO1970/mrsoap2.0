/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
// import NextJsCarousel from '../components/Carousel'
import ImageModal from '../components/ImageModal'

function About() {
    const [ isModalOpen, setIsModalOpen ] = useState(false)
        const [ selectedImage, setSelectedImage ] = useState(null)
    
        const handleImageClick = (src, alt) => {
            setSelectedImage({ src, alt })
            setIsModalOpen(true)
        }
    
    return (

        <div className='container'>
        <Head>
            <title>About Morning Rituals Soap</title>
        </Head>
        <div style={{display: 'flex', }}>
            <div style={{marginRight: '10px', }}> 
              <Image 
                src="/IMG_5577.jpg"
                width={500}
                height={500}
                alt="Soap mandala"
                placeholder='blur'
                blurDataURL='/IMG_5577.jpg'
                style={{borderRadius: '50%'}}

                />
            </div>
            <p style={{fontSize: '1.25rem'}}><b>Morning Rituals Soap</b> is more than just a bar of soap - it's a daily ritual that invigorates your senses and starts your day on the right note. Our handmade soaps are not only gentle on your skin but also offer a luxurious and indulgent cleansing experience. Infused with coffee oils, our soaps can enhance blood circulation and provide antioxidant protection - leaving your skin feeling rejuvenated and refreshed. Crafted with care, each bar is made with natural ingredients and a touch of love.<br></br></p>
                  
            
           </div>
           
           <p className='text-center' style={{fontSize: '1.25rem'}}><b >Wake up your skin with Morning Rituals Soap!</b></p>
              
            <div style={{maxWidth: '100%', width: '1000px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
              <Image 
                src="/IMG_5585.jpg"
                width={250}
                height={250}
                alt="soap"
                placeholder='blur'
                blurDataURL='/IMG_5585.jpg'
                style={{borderRadius: '5%',  cursor:'pointer'}}
                 className='p-2 col-sm'
                 onClick={() => handleImageClick("/IMG_5585.jpg", "soap")}
                 
                
                />
             
                 <Image 
                    src="/IMG_5573.jpg"
                    width={250}
                    height={250}
                    alt="soap"
                    placeholder='blur'
                    blurDataURL='/IMG_5573.jpg'
                    style={{borderRadius: '5%',cursor:'pointer'}}
                    className='p-2 col-sm'
                    onClick={() => handleImageClick("/IMG_5573.jpg", "soap")}
                    
                />
               
                <Image 
                    src="/IMG_5588.jpg"
                    width={250}
                    height={250}
                    alt="soap"
                    placeholder='blur'
                    blurDataURL='/IMG_5588.jpg'
                    style={{borderRadius: '5%', cursor:'pointer'}}
                    className='p-2 col-sm'
                    onClick={() => handleImageClick("/IMG_5588.jpg", "soap")}
                    
                />
              
                <Image 
                    src="/IMG_5591.jpg"
                    width={250}
                    height={250}
                    alt="soap"
                    placeholder='blur'
                    blurDataURL='/IMG_5591.jpg'
                    style={{borderRadius: '5%', cursor: 'pointer',}}
                    className='p-2 col-sm'
                    onClick={() => handleImageClick("/IMG_5591.jpg", "soap")}
                    
                />
              </div>
                <ImageModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    src={selectedImage?.src}
                    alt={selectedImage?.alt}
                />
           
           <div className='text-center row' >
            <hr />
           <p style={{fontSize: '1.2rem'}}>Our coffee soap has been a hit at the <a href="https://www.charlestoncoffeeexchange.com/" target="_blank" rel='noreferrer'>Charleston Coffee Exchange</a> since 2019. We love using their local coffee in every bar.</p>
               <div>
               <a className="navbar-brand" style={{fontFamily: 'Balsamiq Sans'}} href="https://www.charlestoncoffeeexchange.com/" target="_blank" rel='noreferrer'>
               <Image 
                src="/cce.img.png"
                width={580}
                height={175}
                alt="Charleton Coffee Exchange"
                placeholder='blur'
                blurDataURL='/cce.img.png'

            />
                 {/* <img className="img-responsive mx-auto" style={{height: '', width:'auto', borderRadius: '5px', marginLeft: "auto", marginRight: "auto", cursor:"pointer" }} src="/cce.img.png" alt="Charleston Coffee Exchange Image" /> */}
                 </a> 
                </div>      
            
           <div style={{height:"10%"}} >
         
           </div>
           
           
           </div>
           
        <hr />   
        </div>
    )
}

export default About
