'use client'

export function HomeAtmosphereCanvas() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none home-canvas-base"
    >
      <div
        className="absolute -top-[18%] -left-[14%] h-[42rem] w-[42rem] rounded-full opacity-25 blur-[70px] bg-[radial-gradient(circle,rgba(233,199,209,0.82)_0%,rgba(233,199,209,0.38)_42%,transparent_75%)]"
      />
      <div
        className="absolute top-[16%] -right-[18%] h-[40rem] w-[40rem] rounded-full opacity-20 blur-[70px] bg-[radial-gradient(circle,rgba(201,164,106,0.68)_0%,rgba(201,164,106,0.3)_44%,transparent_76%)]"
      />
      <div
        className="absolute bottom-[-20%] left-[14%] h-[44rem] w-[44rem] rounded-full opacity-22 blur-[78px] bg-[radial-gradient(circle,rgba(243,231,224,0.9)_0%,rgba(183,110,138,0.13)_48%,transparent_78%)]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,249,0.52),rgba(255,248,244,0.22)_35%,rgba(255,248,244,0.56)_100%)]"
      />
      <div className="absolute inset-0 home-canvas-grain opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,248,244,0.5),rgba(255,248,244,0.63)_36%,rgba(255,248,244,0.79)_72%,rgba(255,248,244,0.9))]" />
    </div>
  )
}
