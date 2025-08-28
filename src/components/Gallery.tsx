import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WeddingData } from '../types/wedding'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'

interface GalleryProps {
  data: WeddingData
}

export const Gallery = ({ data }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    } else if (selectedImage === 0) {
      setSelectedImage(data.gallery.images.length - 1)
    }
  }
  
  const handleNext = () => {
    if (selectedImage !== null && selectedImage < data.gallery.images.length - 1) {
      setSelectedImage(selectedImage + 1)
    } else if (selectedImage === data.gallery.images.length - 1) {
      setSelectedImage(0)
    }
  }
  
  return (
    <>
      <section className="gallery-section">
        <motion.div 
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-header">
            <Camera className="section-icon" />
            <h2 className="section-title">Gallery</h2>
          </div>
          
          <div className="gallery-grid">
            {data.gallery.images.map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={image} 
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="gallery-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close gallery"
              >
                <X />
              </button>
              
              <button
                className="modal-nav modal-prev"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <ChevronLeft />
              </button>
              
              <img 
                src={data.gallery.images[selectedImage]} 
                alt={`Gallery ${selectedImage + 1}`}
                className="modal-image"
              />
              
              <button
                className="modal-nav modal-next"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRight />
              </button>
              
              <div className="modal-indicator">
                {selectedImage + 1} / {data.gallery.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}