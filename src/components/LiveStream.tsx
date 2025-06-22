import React, { useState } from 'react';
import { Radio, VideoIcon, Mic, MicOff, Video, VideoOff, Settings, Users, Clock, Shield } from 'lucide-react';

const LiveStream: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [viewers, setViewers] = useState(0);
  const [streamTitle, setStreamTitle] = useState('');
  const [streamLocation, setStreamLocation] = useState('');

  const handleStartStream = () => {
    if (!streamTitle.trim()) {
      alert('Please enter a stream title');
      return;
    }
    setIsStreaming(true);
    // Simulate viewer count increase
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    
    // Store interval reference for cleanup
    setTimeout(() => clearInterval(interval), 30000);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    setViewers(0);
  };

  return (
    <div className="space-y-8">
      {/* Stream Setup */}
      {!isStreaming && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Start Live Stream</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stream Title *
              </label>
              <input
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                placeholder="Enter a descriptive title for your news stream"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location (Optional)
              </label>
              <input
                type="text"
                value={streamLocation}
                onChange={(e) => setStreamLocation(e.target.value)}
                placeholder="Enter location for context"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-900">Blockchain Verification Active</h4>
                  <p className="text-sm text-blue-700">Your stream will be timestamped and verified in real-time</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleStartStream}
              disabled={!streamTitle.trim()}
              className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Radio className="w-5 h-5" />
              <span>Start Live Stream</span>
            </button>
          </div>
        </div>
      )}

      {/* Live Stream Interface */}
      {isStreaming && (
        <div className="space-y-6">
          {/* Stream Display */}
          <div className="bg-black rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative">
              <div className="text-center text-white">
                <VideoIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl">Live Camera Feed</p>
                <p className="text-sm opacity-75">Simulated stream display</p>
              </div>
              
              {/* Live indicator */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">LIVE</span>
              </div>
              
              {/* Viewer count */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                <Users className="w-4 h-4 inline mr-1" />
                {viewers} viewers
              </div>
              
              {/* Verification badge */}
              <div className="absolute bottom-4 right-4 bg-green-600 px-3 py-1 rounded-full text-white text-sm flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Verified</span>
              </div>
            </div>
          </div>
          
          {/* Stream Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{streamTitle}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Started {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            
            {streamLocation && (
              <p className="text-gray-600 mb-4">📍 {streamLocation}</p>
            )}
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-green-600">
                <Shield className="w-4 h-4" />
                <span>Blockchain verified</span>
              </div>
              <div className="text-gray-600">
                Hash: 0x{Math.random().toString(16).substr(2, 16)}...
              </div>
            </div>
          </div>
          
          {/* Stream Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-4 rounded-full transition-colors ${
                  isMicOn 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                }`}
              >
                {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>
              
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-4 rounded-full transition-colors ${
                  isCameraOn 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                }`}
              >
                {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>
              
              <button className="p-4 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              
              <button
                onClick={handleStopStream}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                End Stream
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStream;