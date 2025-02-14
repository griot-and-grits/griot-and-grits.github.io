"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import Image from "next/image"

    interface Testimonial {
        id: number
        content: string
        author: string
        position: string
        avatarUrl: string
    }

    const testimonials: Testimonial[] = [
    {
        id: 1,
        content:
        "It's truly inspiring to collaborate with individuals who are deeply passionate about making history by preserving the past and harnessing AI to bring these stories to life in innovative and meaningful ways.",
        author: "Demethria Ramseur",
        position: "Principal Agilist",
        avatarUrl: "https://res.cloudinary.com/ducxigdil/image/upload/v1739470053/unnamed_2_hioho1.png",
    },
    {
        id: 2,
        content:
        "Working on this project is like playing in the All-Star game. Surrounded by brilliance, driven by shared passion, and inspired by a team that reflects the diversity of our culture. We're creating something truly exceptional; something that can impact not just a culture, but all its people.  I am honored to be a part of Griot and Grits.",
        author: "Marcus Greene",
        position: "Team Member",
        avatarUrl: "https://res.cloudinary.com/ducxigdil/image/upload/v1739470053/unnamed_1_fnwr24.png",
    },
    {
        id: 3,
        content:
        "Preserving our community stories is something that has been on my mind a lot lately.   I am so grateful to be able to work on a project that is collecting, organizing, enhancing and sharing our story in a way not seen before. Working on this project has been a joy.  I look forward to all of the great things we can accomplish in the future.",
        author: "Albert Myles",
        position: "Manager, Knowledge Management",
        avatarUrl: "https://res.cloudinary.com/ducxigdil/image/upload/v1739470054/image_1_yonrgl.png",
    },
    {
        id: 4,
        content:
        "This project is an opportunity to honor the contributions, resilience, and brilliance of those who came before us while also creating something that will educate and inspire future generations. Personally, Black history is a vital part of my identity and legacy, and professionally, it aligns with my passion for storytelling, empowerment, and ensuring that important narratives are preserved and shared.  I’m grateful to contribute to this project and to collaborate with others who are equally passionate about making an impact on preserving our history. We are our ancestors' wildest dreams.",
        author: "Koren Townsend",
        position: "Sr. Project Manager",
        avatarUrl: "https://res.cloudinary.com/ducxigdil/image/upload/v1739470056/image_fygbiz.png",
    },
    {
        id: 5,
        content:
        "An increasing challenge that black families face is the further we are from the struggles of our ancestors, the harder it is to acknowledge that the struggle ever existed.  Using AI to blend rich historical archives together with oral history will bring new life to these amazing stories.  It’s important we teach future generations about these struggles in ways that are relatable, educational and heart-felt.",
        author: "Ty McDuffie",
        position: "Founder",
        avatarUrl: "https://res.cloudinary.com/ducxigdil/image/upload/v1739470053/unnamed_zovuhs.png",
    },
    {
        id: 6,
        content:
        "Through Griot and Grits, we are taking a significant step towards ensuring that the voices and stories of the Black community are preserved.  We have an aging generation that lived through segregation, fought for equal rights, and witnessed a man step foot on the moon.  It’s critically important that families capture those stories before they are lost forever, and AI is helping us do just that for them.",
        author: "Sherard Griffin",
        position: "Senior Director, OpenShift AI Engineering",
        avatarUrl: "https://res.cloudinary.com/ducxigdil/image/upload/v1739473412/Picture1_w1clj2.png",
    },
    {
        id: 7,
        content:
        "Griot and Grits is a wonderful way to create family memories and share the amazing history of our country through the telling of the stories of our lives. I am excited about how this will open up our history to those generations to come after us in the tradition of the griot - sharing the important happenings of the family and tribe for all to celebrate down through the ages.",
        author: "Carmen Cauthen",
        position: "Historian of African American history and Author",
        avatarUrl: "https://res.cloudinary.com/ducxigdil/image/upload/v1739473410/Picture2_pzzbzn.png",
    },
    ]

    const FuturisticTestimonials: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
    const testimonialsPerPage = 2
    const pageCount = Math.ceil(testimonials.length / testimonialsPerPage)

    useEffect(() => {
        const interval = setInterval(() => {
        if (!selectedTestimonial) {
            setCurrentPage((prevPage) => (prevPage + 1) % pageCount)
        }
        }, 5000)

        return () => clearInterval(interval)
    }, [selectedTestimonial, pageCount])

    const handleTestimonialClick = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial)
    }

    const handleCloseSelected = () => {
        setSelectedTestimonial(null)
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    useEffect(() => {
        gsap.fromTo(".testimonial-card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 })
    }, [])

    return (
        <div className="flex flex-col justify-center items-center pb-10 p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Our History, Told By Us</h2>
        <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 border-t-2 md:grid-cols-2 gap-8">
            {testimonials
                .slice(currentPage * testimonialsPerPage, (currentPage + 1) * testimonialsPerPage)
                .map((testimonial) => (
                <motion.div
                    key={testimonial.id}
                    className="testimonial-card bg-pink-50 bg-opacity-10 md:border-l backdrop-filter backdrop-blur-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 0.95 }}
                    onClick={() => handleTestimonialClick(testimonial)}
                >
                    <p className="line-clamp-3">{testimonial.content}</p>
                    <p className="text-sm text-neutral-600">Read More...</p>
                    <div className="flex items-center">
                    <Image
                        src={testimonial.avatarUrl || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full bg-cover mt-4 mr-4"
                        width={1000}
                        height={1000}
                    />
                    <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-gray-500">{testimonial.position}</p>
                    </div>
                    </div>
                </motion.div>
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: pageCount }).map((_, index) => (
                <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`w-3 h-3 rounded-full ${currentPage === index ? "bg-[#a94728]" : "bg-gray-300"}`}
                />
            ))}
            </div>
        </div>
        <AnimatePresence>
            {selectedTestimonial && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                onClick={handleCloseSelected}
            >
                <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-8 max-w-2xl"
                onClick={(e) => e.stopPropagation()}
                >
                <p className="text-gray-800 text-lg mb-6">{selectedTestimonial.content}</p>
                <div className="flex items-center">
                    <Image
                    src={selectedTestimonial.avatarUrl || "/placeholder.svg"}
                    alt={selectedTestimonial.author}
                    className="w-16 h-16 rounded-full mr-4"
                    width={1000}
                    height={1000}
                    />
                    <div>
                    <p className="text-gray-800 font-semibold text-xl">{selectedTestimonial.author}</p>
                    <p className="text-gray-600">{selectedTestimonial.position}</p>
                    </div>
                </div>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    )
}

export default FuturisticTestimonials

