"use client"

import type React from "react";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Play } from "lucide-react";
import { videos } from "@/lib/constants";

const FeaturedStories: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0])
  const controls = useAnimation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section className="pt-20 overflow-hidden">
      <div className="container mx-auto px-4">        
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#a94728] tracking-widest font-semibold text-sm uppercase max-w-4xl mx-auto mb-4"
        >
          / Featured Stories
      </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-12"
        >
          <h2 className="max-w-4xl mx-auto text-4xl font-bold mb-4">Discover the rich tapestry of African American experiences</h2>
        </motion.div>

        <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
          <div>            
            {/* Featured Video */}
            <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
        </div>

        {/* Video Grid */}
        <div className="space-y-3">
          <p>Select a video to view the before and after above:</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {videos.map((video) => (
              <div key={video.id} className="group relative cursor-pointer" onClick={() => setSelectedVideo(video)}>
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-white">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/*<div className="max-w-screen-lg mx-auto">
          <MasonryGallery>
            <MasonryItem 
              src="cld-sample"
              alt="Project 1"
              title="First Project"
              description="Description of the first project"
              link="/project1"
            />
            <MasonryItem 
              src="cld-sample-2"
              alt="Project 1"
              title="First Project"
              description="Description of the first project"
              link="/project1"
            />
            <MasonryItem 
              src="cld-sample-3"
              alt="Project 1"
              title="First Project"
              description="Description of the first project"
              link="/project1"
            />
            <MasonryItem 
              src="cld-sample-4"
              alt="Project 1"
              title="First Project"
              description="Description of the first project"
              link="/project1"
            />
            <MasonryItem 
              src="cld-sample-5"
              alt="Project 1"
              title="First Project"
              description="Description of the first project"
              link="/project1"
            />
            <MasonryItem 
              src="cld-sample"
              alt="Project 1"
              title="First Project"
              description="Description of the first project"
              link="/project1"
            />
          </MasonryGallery>
        </div>*/}
      </div>
    </section>
  )
}

export default FeaturedStories

