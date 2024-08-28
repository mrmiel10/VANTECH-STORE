import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const text = ['Find all your IT needs is one place',
   'Safe online buying', 
   "High-quality equipment at affordable prices", 
   "Your online tech store, fast delivery, shop now"
  ]

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
          className="absolute cursor-pointer max-xs:text-xs text-sm font-semibold tracking-tight text-white"
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