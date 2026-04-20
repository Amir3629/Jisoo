'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export function HomeAtmosphereCanvas() {
  const { scrollYProgress } = useScroll()

  const bloomAY = useTransform(scrollYProgress, [0, 1], ['-3%', '9%'])
  const bloomBY = useTransform(scrollYProgress, [0, 1], ['7%', '-7%'])
  const bloomCY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const fogY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

  const bloomAOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.32, 0.24, 0.2])
  const bloomBOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.22, 0.28, 0.2])
  const bloomCOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.18, 0.24, 0.3])

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none home-canvas-base"
    >
      <motion.div
        style={{ y: bloomAY, opacity: bloomAOpacity }}
        animate={{ x: [0, 18, 0], y: ['0%', '-1%', '0%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[18%] -left-[14%] h-[54rem] w-[54rem] rounded-full blur-[130px] bg-[radial-gradient(circle,rgba(233,199,209,0.95)_0%,rgba(233,199,209,0.5)_42%,transparent_75%)]"
      />
      <motion.div
        style={{ y: bloomBY, opacity: bloomBOpacity }}
        animate={{ x: [0, -22, 0], y: ['0%', '1.4%', '0%'] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[16%] -right-[18%] h-[52rem] w-[52rem] rounded-full blur-[130px] bg-[radial-gradient(circle,rgba(201,164,106,0.78)_0%,rgba(201,164,106,0.35)_44%,transparent_76%)]"
      />
      <motion.div
        style={{ y: bloomCY, opacity: bloomCOpacity }}
        animate={{ x: [0, 14, 0], y: ['0%', '1%', '0%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-24%] left-[14%] h-[62rem] w-[62rem] rounded-full blur-[138px] bg-[radial-gradient(circle,rgba(243,231,224,0.95)_0%,rgba(183,110,138,0.16)_48%,transparent_78%)]"
      />
      <motion.div
        style={{ y: fogY }}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,249,0.56),rgba(255,248,244,0.22)_35%,rgba(255,248,244,0.56)_100%)]"
      />
      <div className="absolute inset-0 home-canvas-grain opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,248,244,0.5),rgba(255,248,244,0.63)_36%,rgba(255,248,244,0.79)_72%,rgba(255,248,244,0.9))]" />
    </div>
  )
}
