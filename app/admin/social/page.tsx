'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Share2,
  Instagram,
  Globe,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Send,
  Image as ImageIcon,
  Video,
  Link2,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share,
  BarChart2,
} from 'lucide-react'
import { PageHeader } from '@/components/admin/ui/page-header'
import { StatusBadge } from '@/components/admin/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { socialPosts } from '@/lib/admin/data'
import { products } from '@/lib/data'
import type { SocialChannel, PublishStatus } from '@/lib/admin/types'
import { cn } from '@/lib/utils'

const channels: { value: SocialChannel; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { value: 'tiktok', label: 'TikTok', icon: Video, color: 'bg-black' },
  { value: 'website', label: 'Website', icon: Globe, color: 'bg-plum' },
]

export default function SocialPage() {
  const [selectedChannel, setSelectedChannel] = useState<SocialChannel | 'all'>('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState(socialPosts[0])

  const filteredPosts = socialPosts.filter(post =>
    selectedChannel === 'all' || post.channel === selectedChannel
  )

  const draftPosts = filteredPosts.filter(p => p.status === 'draft')
  const scheduledPosts = filteredPosts.filter(p => p.status === 'scheduled')
  const publishedPosts = filteredPosts.filter(p => p.status === 'published')

  const getChannelConfig = (channel: SocialChannel) => channels.find(c => c.value === channel)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Social Publishing Center"
        description="Manage content across Instagram, TikTok, and your website"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Social' }]}
        actions={
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Social Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Channel</Label>
                  <div className="flex gap-2">
                    {channels.map(channel => (
                      <Button
                        key={channel.value}
                        variant="outline"
                        className="flex-1 justify-center gap-2"
                      >
                        <div className={cn('h-6 w-6 rounded flex items-center justify-center', channel.color)}>
                          <channel.icon className="h-3.5 w-3.5 text-white" />
                        </div>
                        {channel.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Title (Internal)</Label>
                  <Input placeholder="E.g., New Product Launch Announcement" />
                </div>
                <div className="space-y-2">
                  <Label>Caption</Label>
                  <Textarea
                    placeholder="Write your caption here..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">0/2200 characters</p>
                </div>
                <div className="space-y-2">
                  <Label>Media</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-plum transition-colors cursor-pointer">
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Drop media here or click to select</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Link Products</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select products to link" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Schedule Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Schedule Time</Label>
                    <Input type="time" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Save Draft</Button>
                <Button onClick={() => setShowCreateDialog(false)}>Schedule Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Channel Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {channels.map((channel, index) => {
          const channelPosts = socialPosts.filter(p => p.channel === channel.value)
          const publishedCount = channelPosts.filter(p => p.status === 'published').length
          const scheduledCount = channelPosts.filter(p => p.status === 'scheduled').length
          return (
            <motion.div
              key={channel.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  'cursor-pointer transition-all hover:shadow-luxury border-border/50',
                  selectedChannel === channel.value && 'ring-2 ring-plum'
                )}
                onClick={() => setSelectedChannel(selectedChannel === channel.value ? 'all' : channel.value)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', channel.color)}>
                      <channel.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{channel.label}</h3>
                      <p className="text-xs text-muted-foreground">{channelPosts.length} total posts</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-lg bg-emerald-50 p-2">
                      <p className="text-lg font-semibold text-emerald-700">{publishedCount}</p>
                      <p className="text-[10px] text-emerald-600 uppercase">Published</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-2">
                      <p className="text-lg font-semibold text-blue-700">{scheduledCount}</p>
                      <p className="text-[10px] text-blue-600 uppercase">Scheduled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Posts */}
      <Tabs defaultValue="scheduled" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="drafts">
            Drafts
            <Badge variant="outline" className="ml-2">{draftPosts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Scheduled
            <Badge variant="outline" className="ml-2">{scheduledPosts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="published">
            Published
            <Badge variant="outline" className="ml-2">{publishedPosts.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drafts" className="space-y-4">
          {draftPosts.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="py-12 text-center text-muted-foreground">
                <Edit className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No draft posts</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {draftPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledPosts.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="py-12 text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No scheduled posts</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {scheduledPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          {publishedPosts.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="py-12 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No published posts</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {publishedPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} showEngagement />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PostCardProps {
  post: typeof socialPosts[0]
  index: number
  showEngagement?: boolean
}

function PostCard({ post, index, showEngagement }: PostCardProps) {
  const channelConfig = channels.find(c => c.value === post.channel)
  const ChannelIcon = channelConfig?.icon || Globe

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="border-border/50 hover:shadow-luxury transition-all">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Media Preview */}
            <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-blush-pink to-nude-beige shrink-0 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-plum/50" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={cn('h-5 w-5 rounded flex items-center justify-center', channelConfig?.color)}>
                      <ChannelIcon className="h-3 w-3 text-white" />
                    </div>
                    <h3 className="font-medium text-foreground truncate">{post.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge
                      status={post.status === 'published' ? 'success' : post.status === 'scheduled' ? 'pending' : 'neutral'}
                      label={post.status}
                      size="sm"
                    />
                    {post.scheduledAt && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(post.scheduledAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" /> Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    {post.status !== 'published' && (
                      <DropdownMenuItem>
                        <Send className="h-4 w-4 mr-2" /> Publish Now
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.caption}</p>

              {/* Linked Products */}
              {post.productIds.length > 0 && (
                <div className="flex items-center gap-1 mb-3">
                  <Link2 className="h-3 w-3 text-muted-foreground" />
                  {post.productIds.slice(0, 2).map(id => (
                    <Badge key={id} variant="outline" className="text-[10px]">
                      {products.find(p => p.id === id)?.name || id}
                    </Badge>
                  ))}
                  {post.productIds.length > 2 && (
                    <Badge variant="outline" className="text-[10px]">+{post.productIds.length - 2}</Badge>
                  )}
                </div>
              )}

              {/* Engagement */}
              {showEngagement && post.engagement && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    {post.engagement.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {post.engagement.comments.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share className="h-3.5 w-3.5" />
                    {post.engagement.shares.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart2 className="h-3.5 w-3.5" />
                    {post.engagement.views.toLocaleString()} views
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
