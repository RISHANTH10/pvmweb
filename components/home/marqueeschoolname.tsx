import React from 'react'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import { Anek_Tamil, Space_Grotesk } from 'next/font/google';


const anekTamil = Anek_Tamil({
    subsets: ['tamil'],
    weight: ['100', '200', '400', '700'], // Specify the weights you need
    variable: '--font-anek-tamil', // Optional: Define a CSS variable name
    display: 'swap',
});

const spacegrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});


const MarquueeSchoolName = () => {
    return (
        <section className='h-[140px] flex items-center bg-white overflow-hidden'>
            <div className='text-[120px]'>
                <Marquee speed={450} pauseOnHover={false} gradient={false}>
                    <span className={`mx-10 ${anekTamil.className} font-bold text-black`}>பிரசன் வித்யா மந்திர்</span>
                    <Image src={"/images/logo.png"} alt='' height={150} width={150} className='mx-10' draggable={false} />
                    <span className={`mx-10 font-bold ${spacegrotesk.className} text-black`}><span className='font-thin'>PRASAN</span> VIDYA MANDIR</span>
                    <Image src={"/images/logo.png"} alt='' height={150} width={150} className='mx-10' draggable={false} />
                </Marquee>
            </div>
        </section>
    )
}

export default MarquueeSchoolName