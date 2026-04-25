'use client'
import { useState } from 'react'
import { draftReviewReply } from '@/lib/services/ai/review-reply'
export default function AdminReviewsPage(){const [review,setReview]=useState('I had irritation after using this product.');const [reply,setReply]=useState('');return <main className='p-8 max-w-4xl mx-auto space-y-4'><h1 className='text-3xl font-serif'>Admin Review Reply Assistant</h1><textarea className='w-full border rounded-xl p-3' rows={5} value={review} onChange={e=>setReview(e.target.value)} /><button className='px-4 py-2 rounded-full bg-rose-mauve text-white' onClick={()=>setReply(draftReviewReply(review))}>Generate AI Draft Reply</button><textarea className='w-full border rounded-xl p-3' rows={8} value={reply} onChange={e=>setReply(e.target.value)} /></main>}
