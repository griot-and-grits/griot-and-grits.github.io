"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"

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
        "The Griot and Grits Project has revolutionized how we preserve and share our cultural heritage. It's an invaluable resource for future generations.",
        author: "Dr. Maya Johnson",
        position: "Historian",
        avatarUrl: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        content:
        "This project gives voice to stories that might otherwise have been lost. It's a powerful tool for education and connection across generations.",
        author: "Marcus Greene",
        position: "Community Leader",
        avatarUrl: "https://images.unsplash.com/photo-1587064712555-6e206484699b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        content:
        "As an educator, I've found this project invaluable in bringing living history into my classroom. It's engaging, authentic, and deeply impactful.",
        author: "Alicia Thompson",
        position: "High School Teacher",
        avatarUrl: "https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        content:
        "The innovative use of AI in this project has allowed us to uncover connections and insights we never thought possible. It's truly groundbreaking.",
        author: "Dr. James Wilson",
        position: "AI Researcher",
        avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        content:
        "This project has given me a new appreciation for my family's history. It's like having a time machine to explore our roots.",
        author: "Tanya George",
        position: "Project Participant",
        avatarUrl: "https://images.unsplash.com/photo-1523825036634-aab3cce05919?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        content:
        "The Griot and Grits Project is more than just a database; it's a living, breathing testament to our resilience and creativity as a community.",
        author: "Robert SMith",
        position: "Digital Archivist",
        avatarUrl: "https://images.unsplash.com/photo-1630328311029-6f8b81627fc3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleTestimonialClick(testimonial)}
                >
                    <p className="mb-4 line-clamp-4">{testimonial.content}</p>
                    <div className="flex items-center">
                    <img
                        src={testimonial.avatarUrl || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full bg-cover mr-4"
                    />
                    <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-gray-500">{testimonial.position}</p>
                    </div>
                    </div>
                </motion.div>
                ))}
            </div>
            <div className="flex justify-center space-x-2">
            {Array.from({ length: pageCount }).map((_, index) => (
                <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`w-3 h-3 rounded-full ${currentPage === index ? "bg-pink-600" : "bg-gray-300"}`}
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
                    <img
                    src={selectedTestimonial.avatarUrl || "/placeholder.svg"}
                    alt={selectedTestimonial.author}
                    className="w-16 h-16 rounded-full mr-4"
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

