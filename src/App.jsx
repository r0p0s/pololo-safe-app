import React, { useState } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import FeedView from './components/FeedView';
import ChatView from './components/ChatView';
import ProfileView from './components/ProfileView';
import AuthModal from './components/AuthModal';
import PololoDetailModal from './components/PololoDetailModal';
import CreatePololoModal from './components/CreatePololoModal';
import MobileBottomBar from './components/MobileBottomBar';
import { MOCK_POLOLOS, CATEGORIES } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'feed' | 'chat' | 'profile'
  const [pololos, setPololos] = useState(MOCK_POLOLOS);
  const [selectedPololo, setSelectedPololo] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Usuario activo simulado post-auth
  const [currentUser, setCurrentUser] = useState({
    name: "Gonzalo Valenzuela",
    rut: "18.452.910-K",
    verifiedRUT: true,
    rating: 5.0,
    reviewsCount: 4,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  });

  const handleCreatePololo = (newPololo) => {
    setPololos([newPololo, ...pololos]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-16 sm:pb-0">
      {/* Header Desktop / Tablet */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Vista Principal */}
      <main className="flex-1 relative">
        {activeTab === 'map' && (
          <MapView
            pololos={pololos}
            onSelectPololo={(pololo) => setSelectedPololo(pololo)}
          />
        )}

        {activeTab === 'feed' && (
          <FeedView
            pololos={pololos}
            onSelectPololo={(pololo) => setSelectedPololo(pololo)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={CATEGORIES}
          />
        )}

        {activeTab === 'chat' && (
          <ChatView
            activeChat={selectedPololo}
            onBack={() => setActiveTab('feed')}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Navegación Móvil Estilo App Nativa */}
      <MobileBottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Modales */}
      <PololoDetailModal
        pololo={selectedPololo}
        onClose={() => setSelectedPololo(null)}
      />

      <CreatePololoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreatePololo}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </div>
  );
}
