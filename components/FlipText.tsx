import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const text = ['Retrouvez tous vos besoins informatiques en un seul endroit',

   'Achetez en ligne avec confiance', 
   "Technologie à votre service, achetez en ligne, livraison rapide",
   
   
   'Equipements de qualité à prix compétitifs']

const TextFlip = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((state) => {
        if (state >= text.length - 1) return 0
        return state + 1
      })
    }, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex w-full items-center justify-center  text-center">
      <AnimatePresence mode="wait">
        <motion.div
          className="absolute cursor-pointer max-xs:text-xs text-lg font-medium tracking-tight text-white"
          key={index}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {text[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TextFlip