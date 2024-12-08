import React, { useState, useEffect } from 'react';
import Chatbot from '../../components/Chatbot/Chatbot';
import { MessageCircle, X } from 'lucide-react';

const ChatbotToggle = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 414);

  // Check screen size and update isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 414);
    };

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Initial check
    checkScreenSize();

    // Cleanup listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Automatically open chatbot in desktop mode
  useEffect(() => {
    if (!isMobile) {
      setIsChatbotOpen(true);
    }
  }, [isMobile]);

  // If mobile menu is open, hide chatbot
  const handleMobileMenuToggle = () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuToggle && sidebar) {
      const isMobileMenuOpen = sidebar.classList.contains('active');
      if (isMobileMenuOpen && isChatbotOpen) {
        setIsChatbotOpen(false);
      }
    }
  };

  // Add event listener for mobile menu toggle
  useEffect(() => {
    window.addEventListener('click', handleMobileMenuToggle);
    return () => {
      window.removeEventListener('click', handleMobileMenuToggle);
    };
  }, [isChatbotOpen]);

  // Only show toggle button in mobile mode
  if (!isMobile && isChatbotOpen) {
    return <Chatbot />;
  }

  return (
    <div className="chatbot-toggle-container">
      {isMobile && (
        <button 
          className={`chatbot-toggle-button ${isChatbotOpen ? 'open' : ''}`}
          onClick={toggleChatbot}
          aria-label={isChatbotOpen ? 'Close Chatbot' : 'Open Chatbot'}
        >
          {isChatbotOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      )}
      {isChatbotOpen && <Chatbot />}
    </div>
  );
};

export default ChatbotToggle;