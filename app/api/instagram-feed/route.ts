import { NextResponse } from 'next/server'

const INSTAGRAM_GRAPH_VERSION = 'v22.0'
const CACHE_SECONDS = 60 * 30

type InstagramGraphMedia = {
  id: string
  caption?: string
  media_type: string
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp?: string
  like_count?: number
  comments_count?: number
}

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

  if (!accessToken || !businessAccountId) {
    return NextResponse.json({
      status: 'not_configured',
      message: 'Instagram API credentials are missing.',
      profile: {
        name: 'JISOO Seoul Edition',
        username: 'jisoocosmetics',
      },
      posts: [],
    })
  }

  try {
    const profileUrl = `https://graph.facebook.com/${INSTAGRAM_GRAPH_VERSION}/${businessAccountId}?fields=username,followers_count,follows_count,media_count&access_token=${accessToken}`
    const mediaUrl = `https://graph.facebook.com/${INSTAGRAM_GRAPH_VERSION}/${businessAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&access_token=${accessToken}`

    const [profileRes, mediaRes] = await Promise.all([
      fetch(profileUrl, { next: { revalidate: CACHE_SECONDS } }),
      fetch(mediaUrl, { next: { revalidate: CACHE_SECONDS } }),
    ])

    if (!mediaRes.ok) {
      throw new Error(`Instagram media request failed with ${mediaRes.status}`)
    }

    const profileJson = profileRes.ok ? await profileRes.json() : {}
    const mediaJson = await mediaRes.json()
    const rawPosts: InstagramGraphMedia[] = Array.isArray(mediaJson?.data) ? mediaJson.data : []

    const posts = rawPosts
      .filter(post => (post.media_url || post.thumbnail_url) && post.permalink)
      .slice(0, 8)
      .map(post => ({
        id: post.id,
        caption: post.caption ?? '',
        mediaType: post.media_type,
        mediaUrl: post.media_url ?? post.thumbnail_url ?? '',
        thumbnailUrl: post.thumbnail_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
        likeCount: post.like_count,
        commentsCount: post.comments_count,
      }))

    return NextResponse.json({
      status: 'ok',
      profile: {
        name: 'JISOO Seoul Edition',
        username: profileJson?.username ?? 'jisoocosmetics',
        posts: profileJson?.media_count,
        followers: profileJson?.followers_count,
        following: profileJson?.follows_count,
      },
      posts,
    })
  } catch (error) {
    console.error('Instagram feed error:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Unable to load Instagram feed right now.',
        profile: {
          name: 'JISOO Seoul Edition',
          username: 'jisoocosmetics',
        },
        posts: [],
      },
      { status: 502 }
    )
  }
}
