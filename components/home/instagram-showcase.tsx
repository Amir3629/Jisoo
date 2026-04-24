import Link from 'next/link'

const posts = [
  { id: 1, title: 'Hydration Ritual', tag: '수분' },
  { id: 2, title: 'Glow Layering', tag: '광채' },
  { id: 3, title: 'Seoul Edit', tag: '서울' },
  { id: 4, title: 'Daily SPF', tag: '피부' },
]

export function InstagramShowcase() {
  return (
    <section className="py-20 px-4 lg:px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-serif text-4xl">Instagram Moments</h2>
        <div className="flex gap-2 text-sm">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full border border-rose-mauve/25">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full border border-rose-mauve/25">TikTok</a>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map(post => (
          <article key={post.id} className="rounded-2xl border border-rose-mauve/20 bg-white/80 p-4">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-[#fbeff4] to-[#f8efe7]" />
            <p className="mt-3 text-sm text-charcoal/70">{post.tag}</p>
            <h3 className="font-medium mt-1">{post.title}</h3>
          </article>
        ))}
      </div>
      <Link href="/tips" className="mt-6 inline-block text-rose-mauve">Explore care guides →</Link>
    </section>
  )
}
