
import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { TrendGrid } from './components/TrendGrid';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DiscoverPage } from './components/DiscoverPage';
import { OpportunitiesPage } from './components/OpportunitiesPage';
import { DemoDashboardPage } from './components/DemoDashboardPage';
import { Category } from './types';

const Footer: React.FC = () => (
  <footer className="border-t border-white/5 bg-nexus-950 py-12">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
      <p>&copy; 2025 MetaEngine Intelligence. All systems nominal.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-nexus-code transition-colors">Privacy</a>
        <a href="#" className="hover:text-nexus-code transition-colors">Terms</a>
        <a href="#" className="hover:text-nexus-code transition-colors">API Status</a>
      </div>
    </div>
  </footer>
);

type PageState = 'HOME' | 'DISCOVER' | 'OPPORTUNITIES' | 'DASHBOARD' | 'DEMO_DASHBOARD';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('HOME');
  const [dashboardInitCategory, setDashboardInitCategory] = useState<Category | undefined>(undefined);

  const handleOpenDashboard = (category?: Category) => {
    setDashboardInitCategory(category);
    setCurrentPage('DASHBOARD');
  };

  const handleOpenDemoDashboard = () => {
    setCurrentPage('DEMO_DASHBOARD');
  };

  const handleNavigate = (page: any) => {
    setCurrentPage(page);
  };

  const handleOpenTool = (tool: 'SNIPER' | 'BUILDER') => {
    // Map tool to dashboard views if needed, for now just open dashboard
    // Ideally Dashboard would accept an initialView prop too
    setCurrentPage('DASHBOARD');
  };

  return (
    <main className="bg-nexus-950 min-h-screen text-white selection:bg-nexus-code selection:text-black">
      {currentPage === 'DASHBOARD' ? (
        <Dashboard onClose={() => setCurrentPage('HOME')} initialCategory={dashboardInitCategory} isDemo={false} />
      ) : currentPage === 'DEMO_DASHBOARD' ? (
        <DemoDashboardPage onClose={() => setCurrentPage('HOME')} />
      ) : (
        <>
          <Header onStartDemo={() => handleOpenDashboard()} onNavigate={handleNavigate} />
          
          {currentPage === 'HOME' && (
            <>
              <Hero onStartDemo={() => handleOpenDashboard()} onStartLimitedDemo={handleOpenDemoDashboard} />
              <TrendGrid onViewData={(cat) => handleOpenDashboard(cat)} />
            </>
          )}

          {currentPage === 'DISCOVER' && (
             <DiscoverPage onOpenDashboard={() => handleOpenDashboard()} />
          )}

          {currentPage === 'OPPORTUNITIES' && (
             <OpportunitiesPage onOpenTool={handleOpenTool} />
          )}
          
          <Footer />
        </>
      )}
    </main>
  );
}
