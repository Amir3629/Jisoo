import Script from 'next/script'

export function InstagramShowcase() {
  return (
    <section className="w-full px-4 py-16 lg:px-6">
      <Script id="elfsight-platform" src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      <div className="mx-auto w-full max-w-[1500px] rounded-[2rem] border border-[#e8d9cf] bg-[#fffdfb] p-3 shadow-[0_20px_60px_rgba(42,32,35,0.08)] sm:p-4 lg:p-5">
        <div className="min-h-[520px] w-full">
          <div className="elfsight-app-c1e1c5fb-090c-44f4-8806-944402444301" data-elfsight-app-lazy />
        </div>
      </div>
    </section>
  )
}
