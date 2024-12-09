import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;