import React, { useState } from 'react';
import { Search, Filter, FileText, Image, Video, Calendar, CheckCircle, AlertCircle, Eye } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'document' | 'stream';
  timestamp: string;
  status: 'verified' | 'pending' | 'flagged';
  views: number;
  size?: string;
  thumbnail?: string;
}

const ContentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const mockContent: ContentItem[] = [
    {
      id: '1',
      title: 'City Council Meeting Coverage',
      type: 'video',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'verified',
      views: 1234,
      size: '45.2 MB'
    },
    {
      id: '2',
      title: 'Breaking: Traffic Incident Photos',
      type: 'image',
      timestamp: '2024-01-15T12:15:00Z',
      status: 'verified',
      views: 856,
      size: '8.5 MB'
    },
    {
      id: '3',
      title: 'Live Stream: Press Conference',
      type: 'stream',
      timestamp: '2024-01-15T10:00:00Z',
      status: 'verified',
      views: 2145,
    },
    {
      id: '4',
      title: 'Investigation Documents',
      type: 'document',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'pending',
      views: 432,
      size: '2.1 MB'
    },
    {
      id: '5',
      title: 'Suspicious Activity Video',
      type: 'video',
      timestamp: '2024-01-14T11:20:00Z',
      status: 'flagged',
      views: 78,
      size: '23.8 MB'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5 text-blue-600" />;
      case 'video': return <Video className="w-5 h-5 text-purple-600" />;
      case 'stream': return <Video className="w-5 h-5 text-red-600" />;
      default: return <FileText className="w-5 h-5 text-green-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="flex items-center space-x-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            <span>Verified</span>
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center space-x-1 text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
            <AlertCircle className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
      case 'flagged':
        return (
          <span className="flex items-center space-x-1 text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
            <AlertCircle className="w-3 h-3" />
            <span>Flagged</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Library</h2>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
            <option value="stream">Streams</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      {/* Content Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          {filteredContent.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getTypeIcon(item.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                    {item.size && (
                      <span>{item.size}</span>
                    )}
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {getStatusBadge(item.status)}
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLibrary;