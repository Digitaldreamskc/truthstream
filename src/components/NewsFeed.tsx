import React, { useState, useEffect } from 'react'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  ExternalLink, 
  Shield, 
  Clock, 
  MapPin, 
  User,
  Filter,
  TrendingUp,
  Eye,
  Copy,
  Twitter,
  Facebook,
  Link
} from 'lucide-react'

interface NewsPost {
  id: string
  title: string
  content: string
  contentType: 'image' | 'video' | 'document' | 'stream'
  creator: {
    address: string
    name: string
    verified: boolean
  }
  timestamp: string
  location?: string
  verificationData: {
    blockchainHash: string
    blockNumber: number
    confidence: number
    verified: boolean
  }
  engagement: {
    likes: number
    comments: number
    shares: number
    views: number
  }
  thumbnail?: string
  tags: string[]
}

const NewsFeed: React.FC = () => {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [filter, setFilter] = useState<'all' | 'trending' | 'recent' | 'verified'>('all')
  const [shareModalOpen, setShareModalOpen] = useState<string | null>(null)

  useEffect(() => {
    // Mock data - in real app, this would fetch from blockchain/IPFS
    const mockPosts: NewsPost[] = [
      {
        id: '1',
        title: 'Breaking: City Council Approves New Infrastructure Bill',
        content: 'Live coverage from today\'s city council meeting where the $50M infrastructure bill was unanimously approved.',
        contentType: 'video',
        creator: {
          address: '0x1234...5678',
          name: 'Sarah Chen',
          verified: true
        },
        timestamp: '2024-01-15T14:30:00Z',
        location: 'City Hall, Downtown',
        verificationData: {
          blockchainHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef',
          blockNumber: 18945672,
          confidence: 98.5,
          verified: true
        },
        engagement: {
          likes: 234,
          comments: 45,
          shares: 67,
          views: 1234
        },
        tags: ['politics', 'infrastructure', 'breaking']
      },
      {
        id: '2',
        title: 'Traffic Incident on Highway 101 - Live Updates',
        content: 'Multiple vehicle accident causing major delays. Emergency services on scene.',
        contentType: 'image',
        creator: {
          address: '0x9876...4321',
          name: 'Mike Rodriguez',
          verified: true
        },
        timestamp: '2024-01-15T12:15:00Z',
        location: 'Highway 101, Mile Marker 45',
        verificationData: {
          blockchainHash: '0xf6e5d4c3b2a1098765432109876543210987654321',
          blockNumber: 18945650,
          confidence: 94.2,
          verified: true
        },
        engagement: {
          likes: 89,
          comments: 23,
          shares: 34,
          views: 567
        },
        tags: ['traffic', 'emergency', 'live']
      },
      {
        id: '3',
        title: 'Community Garden Project Launch',
        content: 'Local residents come together to start a new community garden initiative in the downtown area.',
        contentType: 'document',
        creator: {
          address: '0x5555...7777',
          name: 'Emma Thompson',
          verified: false
        },
        timestamp: '2024-01-15T10:00:00Z',
        location: 'Downtown Community Center',
        verificationData: {
          blockchainHash: '0x1111222233334444555566667777888899990000',
          blockNumber: 18945620,
          confidence: 87.3,
          verified: true
        },
        engagement: {
          likes: 156,
          comments: 78,
          shares: 23,
          views: 890
        },
        tags: ['community', 'environment', 'local']
      }
    ]
    setPosts(mockPosts)
  }, [])

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥'
      case 'image': return '📷'
      case 'document': return '📄'
      case 'stream': return '📡'
      default: return '📄'
    }
  }

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, engagement: { ...post.engagement, likes: post.engagement.likes + 1 }}
        : post
    ))
  }

  const handleShare = (post: NewsPost, platform?: string) => {
    const url = `https://truthstream.app/post/${post.id}`
    const text = `${post.title} - Verified on TruthStream`
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
    
    setPosts(prev => prev.map(p => 
      p.id === post.id 
        ? { ...p, engagement: { ...p.engagement, shares: p.engagement.shares + 1 }}
        : p
    ))
    setShareModalOpen(null)
  }

  const filteredPosts = posts.filter(post => {
    switch (filter) {
      case 'trending': return post.engagement.views > 500
      case 'recent': return new Date(post.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      case 'verified': return post.verificationData.verified && post.verificationData.confidence > 90
      default: return true
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">News Feed</h2>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Posts</option>
              <option value="trending">Trending</option>
              <option value="recent">Recent</option>
              <option value="verified">Highly Verified</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{posts.length}</p>
            <p className="text-sm text-blue-700">Total Posts</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {posts.filter(p => p.verificationData.verified).length}
            </p>
            <p className="text-sm text-green-700">Verified</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {posts.reduce((sum, p) => sum + p.engagement.views, 0).toLocaleString()}
            </p>
            <p className="text-sm text-purple-700">Total Views</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">
              {posts.filter(p => p.engagement.views > 500).length}
            </p>
            <p className="text-sm text-orange-700">Trending</p>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Post Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{post.creator.name}</span>
                      {post.creator.verified && (
                        <Shield className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(post.timestamp).toLocaleString()}</span>
                      {post.location && (
                        <>
                          <span>•</span>
                          <MapPin className="w-4 h-4" />
                          <span>{post.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getContentIcon(post.contentType)}</span>
                  {post.verificationData.verified && (
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                      <Shield className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-medium text-green-700">
                        {post.verificationData.confidence}% Verified
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.content}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Blockchain Verification */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">Base Blockchain Verified</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                    <ExternalLink className="w-4 h-4" />
                    <span>View on Explorer</span>
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-600 font-mono">
                  Block: {post.verificationData.blockNumber} | Hash: {post.verificationData.blockchainHash.slice(0, 20)}...
                </div>
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{post.engagement.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.engagement.comments}</span>
                  </button>
                  
                  <button
                    onClick={() => setShareModalOpen(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">{post.engagement.shares}</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>{post.engagement.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Share Modal */}
            {shareModalOpen === post.id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleShare(post, 'twitter')}
                      className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-blue-500" />
                      <span>Share on Twitter</span>
                    </button>
                    
                    <button
                      onClick={() => handleShare(post, 'facebook')}
                      className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <span>Share on Facebook</span>
                    </button>
                    
                    <button
                      onClick={() => handleShare(post, 'copy')}
                      className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShareModalOpen(null)}
                    className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600">Try adjusting your filter or check back later for new content</p>
        </div>
      )}
    </div>
  )
}

export default NewsFeed