import About from '@/components/about'
import ContactSection from '@/components/contact'
import FAQ from '@/components/faq'
import Hero from '@/components/hero'
import Nav from '@/components/nav'
import Services from '@/components/services'
import Testimonials from '@/components/testimonials'
import Works from '@/components/works'
import { loadVideoMetadata, loadFilterMetadata } from '@/lib/load-metadata'
import React from 'react'

const page = () => {
    const videoMetadata = loadVideoMetadata();
    const filterMetadata = loadFilterMetadata();
    
    return (
        <>
            <Nav />
            <Hero />
            <About />
            <Services />
            <Works videos={videoMetadata.videos} filters={filterMetadata} />
            <Testimonials />
            {/* <Stats /> */}
            <FAQ />
            <ContactSection />
        </>
    )
}

export default page