'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export function HomeAtmosphereCanvas() {
  const { scrollYProgress } = useScroll()

  const bloomAY = useTransform(scrollYProgress, [0, 1], ['-4%', '8%'])
  const bloomBY = useTransform(scrollYProgress, [0, 1], ['8%', '-6%'])
  const bloomCY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

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
        className="absolute -top-[18%] -left-[14%] h-[52rem] w-[52rem] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(233,199,209,0.95)_0%,rgba(233,199,209,0.5)_42%,transparent_75%)]"
      />
      <motion.div
        style={{ y: bloomBY, opacity: bloomBOpacity }}
        className="absolute top-[18%] -right-[18%] h-[50rem] w-[50rem] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(201,164,106,0.8)_0%,rgba(201,164,106,0.4)_44%,transparent_76%)]"
      />
      <motion.div
        style={{ y: bloomCY, opacity: bloomCOpacity }}
        className="absolute bottom-[-24%] left-[18%] h-[60rem] w-[60rem] rounded-full blur-[130px] bg-[radial-gradient(circle,rgba(243,231,224,0.95)_0%,rgba(183,110,138,0.18)_48%,transparent_78%)]"
      />
      <div className="absolute inset-0 home-canvas-grain opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,248,244,0.54),rgba(255,248,244,0.68)_36%,rgba(255,248,244,0.82)_72%,rgba(255,248,244,0.92))]" />
    </div>
  )
}

