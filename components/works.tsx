"use client"

import type React from "react";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MasonryGallery, MasonryItem } from "./masonry-gallery";

const FeaturedStories: React.FC = () => {
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
          <h2 className="max-w-4xl mx-auto text-4xl font-bold mb-4">Discover and watch the rich tapestry of African American experiences</h2>
        </motion.div>

          {/*<div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
            <div>         
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
          */}

        <div className="max-w-screen-lg mx-auto">
          <MasonryGallery>
            <MasonryItem 
              src="https://res.cloudinary.com/ducxigdil/image/upload/v1739470989/image_vfqft9.png"
              alt="Ms Glady's M. Williams thumbnail"
              title="Ms Glady's M. Williams"
              description="Gladys Williams shares her journey from her early years in Washington, North Carolina, to her experiences in Brooklyn and beyond. She reflects on her dedication to work, education, and personal values, emphasizing resilience, integrity..."
              link="https://www.youtube.com/watch?v=Bwk5yovVvmM&t=1s"
            />
            <MasonryItem 
              src="https://res.cloudinary.com/ducxigdil/image/upload/v1739667110/Screenshot_60_hitkvb.png"
              alt="Thumbnail for McCoy Family Concept YouTube Video"
              title="McCoy Family Concept Video"
              description="Deborah McCoy reflects on her life, from her birth in Philadelphia in 1949 to the different names she has been called, symbolizing her personal growth. She shares insights into her family, highlighting her hardworking father and determined mother..."
              link="https://www.youtube.com/watch?v=i7KdDb4nv7U"
            />
            <MasonryItem 
              src="https://res.cloudinary.com/ducxigdil/image/upload/v1739667554/Screenshot_61_e3jz6q.png"
              alt="Thumnail for Youtube VIdeo: Sharon McDuffie recalls 911"
              title="Sharon McDuffie recalls 911"
              description="On the morning of September 11, 2001, she awoke in Raleigh, North Carolina, to the shocking news of a plane crashing into the World Trade Center. As a second plane struck, confirming the attack, a sense of urgency and fear set in. Watching the..."
              link="https://www.youtube.com/watch?v=meR02ie2lYg"
            />
            <MasonryItem 
              src="https://res.cloudinary.com/ducxigdil/image/upload/v1739667555/Screenshot_62_wjthuw.png"
              alt="Thumbnail for Mrs. Parks Talks Black Prisoner Cadavers"
              title="Mrs. Parks Talks Black Prisoner Cadavers"
              description="Irene Clark examines the historical use of black prisoners' cadavers in medical schools without family consent. This legal practice primarily benefited white institutions while restricting white cadavers from black schools..."
              link="https://www.youtube.com/watch?v=mE1PTJeDBXI"
            />
          </MasonryGallery>
        </div>
      </div>
    </section>
  )
}

export default FeaturedStories

