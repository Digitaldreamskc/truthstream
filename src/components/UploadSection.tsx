import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, Video, Clock, Shield, CheckCircle, Wallet } from 'lucide-react';
import { useBlockchain } from '../hooks/useBlockchain';

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  timestamp: string;
  verified: boolean;
  blockchainHash?: string;
  blockNumber?: number;
  verificationId?: string;
}

const UploadSection: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isConnected, isVerifying, verifyContent } = useBlockchain();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    if (!isConnected) {
      alert('Please connect your wallet first to verify content on Base blockchain');
      return;
    }

    if (!title.trim()) {
      alert('Please enter a title for your content');
      return;
    }

    setIsUploading(true);
    
    for (const file of files) {
      try {
        // Verify content on Base blockchain
        const verificationResult = await verifyContent(file, {
          title,
          location,
          contentType: file.type,
          creator: 'Current User' // This would be from user profile
        });
        
        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.startsWith('video/') ? 'video' : 'document',
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          timestamp: new Date().toISOString(),
          verified: true,
          blockchainHash: verificationResult.transactionHash,
          blockNumber: verificationResult.blockNumber,
          verificationId: verificationResult.verificationId
        };
        
        setUploadedFiles(prev => [newFile, ...prev]);
      } catch (error) {
        console.error('Verification failed:', error);
        alert('Failed to verify content on blockchain. Please try again.');
      }
    }
    
    setIsUploading(false);
    setTitle('');
    setLocation('');
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5 text-blue-600" />;
      case 'video': return <Video className="w-5 h-5 text-purple-600" />;
      default: return <FileText className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload News Content</h2>
        
        {!isConnected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800 font-medium">
                Connect your wallet to verify content on Base blockchain
              </p>
            </div>
          </div>
        )}

        {/* Content Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location (Optional)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where was this content created?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
            isDragging 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Drop files here or click to upload
          </h3>
          <p className="text-gray-600 mb-6">
            Support for images, videos, and documents up to 100MB
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || isVerifying || !isConnected}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading || isVerifying ? 'Verifying on Base...' : 'Choose Files'}
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        
        <div className="mt-6 flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Base blockchain verification</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-600" />
            <span>Immutable timestamp</span>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Uploads</h3>
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {getFileIcon(file.type)}
                  <div>
                    <h4 className="font-medium text-gray-900">{file.name}</h4>
                    <p className="text-sm text-gray-600">
                      {file.size} • {new Date(file.timestamp).toLocaleString()}
                    </p>
                    {file.blockNumber && (
                      <p className="text-xs text-blue-600 font-mono">
                        Block: {file.blockNumber} | ID: {file.verificationId}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {file.verified && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Base Verified</span>
                    </div>
                  )}
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View on Explorer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;