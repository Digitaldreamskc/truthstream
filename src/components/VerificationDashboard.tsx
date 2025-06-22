import React from 'react';
import { Shield, CheckCircle, AlertCircle, Clock, TrendingUp, Users, FileText } from 'lucide-react';

const VerificationDashboard: React.FC = () => {
  const stats = {
    totalContent: 1247,
    verified: 1156,
    pending: 67,
    flagged: 24,
    verificationRate: 92.7
  };

  const recentVerifications = [
    {
      id: '1',
      title: 'City Council Meeting Coverage',
      timestamp: '2 minutes ago',
      status: 'verified',
      confidence: 98.5,
      blockchainHash: '0xa1b2c3d4e5f6...'
    },
    {
      id: '2',
      title: 'Breaking News Photos',
      timestamp: '15 minutes ago',
      status: 'verified',
      confidence: 94.2,
      blockchainHash: '0xf6e5d4c3b2a1...'
    },
    {
      id: '3',
      title: 'Interview Recording',
      timestamp: '1 hour ago',
      status: 'pending',
      confidence: 87.3,
      blockchainHash: 'Processing...'
    },
    {
      id: '4',
      title: 'Document Submission',
      timestamp: '2 hours ago',
      status: 'flagged',
      confidence: 45.8,
      blockchainHash: 'Under review'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'flagged': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'flagged': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalContent.toLocaleString()}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-green-600">{stats.verified.toLocaleString()}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verification Rate</p>
              <p className="text-2xl font-bold text-blue-600">{stats.verificationRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Blockchain Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Blockchain Network Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-gray-900">Network Status</p>
              <p className="text-sm text-gray-600">Connected & Operational</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Block Height</p>
              <p className="text-sm text-gray-600">18,945,672</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Avg. Confirmation</p>
              <p className="text-sm text-gray-600">12.3 seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Verifications</h3>
        <div className="space-y-4">
          {recentVerifications.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.timestamp}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Confidence: {item.confidence}%
                    </p>
                    <p className="text-xs text-gray-600 font-mono">
                      {item.blockchainHash}
                    </p>
                  </div>
                  
                  <div className={`w-2 h-2 rounded-full ${
                    item.confidence >= 90 ? 'bg-green-500' :
                    item.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Process */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">How Verification Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Content Analysis</h4>
            <p className="text-sm text-gray-600">
              AI algorithms analyze content for authenticity markers and metadata integrity
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Blockchain Timestamp</h4>
            <p className="text-sm text-gray-600">
              Immutable timestamp recorded on blockchain with content hash verification
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Verification Badge</h4>
            <p className="text-sm text-gray-600">
              Verified content receives trust badge with confidence score and provenance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationDashboard;