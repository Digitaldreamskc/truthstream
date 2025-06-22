import React, { useState } from 'react';
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Camera, Upload, Radio, Shield, Clock, User, Menu, X, FileText, Image, Video, Rss } from 'lucide-react';
import { config } from './config/blockchain'
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import LiveStream from './components/LiveStream';
import ContentLibrary from './components/ContentLibrary';
import VerificationDashboard from './components/VerificationDashboard';
import NewsFeed from './components/NewsFeed';

type Tab = 'feed' | 'upload' | 'stream' | 'library' | 'verification';

const queryClient = new QueryClient()

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'feed' as Tab, label: 'News Feed', icon: Rss },
    { id: 'upload' as Tab, label: 'Upload Content', icon: Upload },
    { id: 'stream' as Tab, label: 'Live Stream', icon: Radio },
    { id: 'library' as Tab, label: 'Content Library', icon: FileText },
    { id: 'verification' as Tab, label: 'Verification', icon: Shield },
  ];

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          
          {/* Navigation */}
          <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="hidden md:flex space-x-8">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-600 hover:text-gray-900 p-2"
                  >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>
              
              {/* Mobile menu */}
              {isMenuOpen && (
                <div className="md:hidden pb-4">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'feed' && <NewsFeed />}
            {activeTab === 'upload' && <UploadSection />}
            {activeTab === 'stream' && <LiveStream />}
            {activeTab === 'library' && <ContentLibrary />}
            {activeTab === 'verification' && <VerificationDashboard />}
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;