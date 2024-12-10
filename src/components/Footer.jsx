import React from 'react';
import { UilFacebook } from '@iconscout/react-unicons'
import { UilGithub } from '@iconscout/react-unicons'
import { UilInstagram } from '@iconscout/react-unicons'
import { UilTwitter } from '@iconscout/react-unicons'

function Footer() {
    return (
        <div className='bg-[#000000] text-[#ffffff] relative inset-x-0 bottom-0 p-6 h-[10rem] opacity-90 w-[100%]' >
            <div id="footer_items" className='flex justify-between items-center'>
                <div id="devs" className='flex flex-col gap-2'>
                    <a href="https://github.com/Alexhcx" className='flex'><UilGithub />Alexandre Nazareth</a>
                    <a href="https://github.com/EddieJr95" className='flex'><UilGithub />Edvaldo Junior</a>
                </div>

                <div id="social_media" className='text-[1.2rem]'>
                    <span>Nos siga em nossas redes sociais</span>
                    <div id="social_medias_items" className='flex gap-8 justify-center mt-2'>
                        <a href="https://web.facebook.com/?_rdc=1&_rdr#" className='text-blue-700'><UilFacebook /></a>
                        <a href="https://www.instagram.com/"><UilInstagram /></a>
                        <a href="https://x.com/?lang=pt-br"><img className='w-7 h-7' src="https://deg9n53j48u2o.cloudfront.net/x-icon.png" alt="" /></a>
                        
                    </div>
                </div>

                <div id="promotion" className='flex flex-col items-center text-[1rem]'>
                    <span>Quer receber promoções exclusivas?</span>
                    <input type="email" name="email" id="email_promotion" placeholder='Email...' className='mt-2 w-[200px] p-[3px] flex justify-center 
                    items-center rounded-[7px] appearance-none text-black'/>
                </div>
            </div>
        </div>
    )
};

export default Footer;