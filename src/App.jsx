import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MobileBottomBar from './components/MobileBottomBar';
import OnboardingView from './components/OnboardingView';
import MapView from './components/MapView';
import FeedView from './components/FeedView';
import MyDealsView from './components/MyDealsView';
import ChatView from './components/ChatView';
import NotificationsView from './components/NotificationsView';
import ProfileView from './components/ProfileView';
import AuthModal from './components/AuthModal';
import PololoDetailModal from './components/PololoDetailModal';
import CreatePololoModal from './components/CreatePololoModal';
import ReportModal from './components/ReportModal';
import RatingModal from './components/RatingModal';
import { MOCK_POLOLOS, CATEGORIES, MOCK_NOTIFICATIONS, MOCK_DEALS } from './data/mockData';
import { requestNotificationPermission } from './lib/notifications';

export default function App() {
  // Onboarding & Auth
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('pololosafe_onboarded');
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState('map');

  // Data
  const [pololos, setPololos] = useState(MOCK_POLOLOS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [deals, setDeals] = useState(MOCK_DEALS);

  // Modals
  const [selectedPololo, setSelectedPololo] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [reportModalData, setReportModalData] = useState(null);
  const [ratingModalData, setRatingModalData] = useState(null);

  // User
  const [currentUser, setCurrentUser] = useState(null);

  // Computed
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadDeals = deals.filter(d => d.status === 'pending' || d.status === 'accepted').length;

  // Complete onboarding
  const handleOnboardingComplete = () => {
    localStorage.setItem('pololosafe_onboarded', 'true');
    setShowOnboarding(false);
    setIsAuthModalOpen(true);
  };

  // Login success
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    requestNotificationPermission();
  };

  // Create pololo
  const handleCreatePololo = (newPololo) => {
    setPololos([newPololo, ...pololos]);
    setIsCreateModalOpen(false);
  };

  // Open create modal (requires auth)
  const handleOpenCreateModal = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCreateModalOpen(true);
  };

  // Tab change
  const handleTabChange = (tab) => {
    if ((tab === 'deals' || tab === 'profile') && !currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (tab === 'notifications') {
      setShowNotifications(true);
      return;
    }
    setActiveTab(tab);
  };

  // Notification tap
  const handleNotificationTap = (notification) => {
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    setShowNotifications(false);
  };

  // Report
  const handleReport = (user) => {
    setReportModalData(user);
  };

  // Rating
  const handleOpenRating = (userName, userAvatar) => {
    setRatingModalData({ userName, userAvatar });
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('map');
  };

  // Show onboarding on first visit
  if (showOnboarding) {
    return <OnboardingView onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header */}
      <Header
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenProfile={() => handleTabChange('profile')}
        currentUser={currentUser}
        unreadCount={unreadNotifications}
      />

      {/* Main Content */}
      <main className="flex-1 relative pb-16">
        {activeTab === 'map' && (
          <MapView
            pololos={pololos}
            onSelectPololo={setSelectedPololo}
          />
        )}

        {activeTab === 'feed' && (
          <FeedView
            pololos={pololos}
            onSelectPololo={setSelectedPololo}
            categories={CATEGORIES}
          />
        )}

        {activeTab === 'deals' && (
          currentUser ? (
            <MyDealsView
              deals={deals}
              onOpenChat={(deal) => {
                setActiveTab('deals');
              }}
              onExplore={() => setActiveTab('feed')}
            />
          ) : null
        )}

        {activeTab === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <MobileBottomBar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenCreateModal={handleOpenCreateModal}
        unreadDeals={unreadDeals}
      />

      {/* Modals & Overlays */}
      {selectedPololo && (
        <PololoDetailModal
          pololo={selectedPololo}
          onClose={() => setSelectedPololo(null)}
          onReport={() => handleReport(selectedPololo.author)}
        />
      )}

      <CreatePololoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreatePololo}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {showNotifications && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-10">
            <h2 className="text-base font-bold text-slate-900">Notificaciones</h2>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-slate-500 hover:text-slate-900 text-sm font-medium"
            >
              Cerrar
            </button>
          </div>
          <NotificationsView
            notifications={notifications}
            onTapNotification={handleNotificationTap}
          />
        </div>
      )}

      {reportModalData && (
        <ReportModal
          isOpen={true}
          onClose={() => setReportModalData(null)}
          reportedUser={reportModalData}
        />
      )}

      {ratingModalData && (
        <RatingModal
          isOpen={true}
          onClose={() => setRatingModalData(null)}
          userName={ratingModalData.userName}
          userAvatar={ratingModalData.userAvatar}
        />
      )}
    </div>
  );
}
