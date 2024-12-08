import React, { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import CourseManagement from './Course';

// Create a Home component for the dashboard
const DashboardHome = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
    {/* Add your dashboard content here */}
  </div>
);

const StudentDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Student Dashboard</title>
      </head>
      <body>
        <div id="root">
          <DashboardContainer>
            <Sidebar isMobileMenuOpen={isMobileMenuOpen}>
              <SidebarHeader>
                <h2>Dashboard</h2>
                <button onClick={toggleMobileMenu} className="lg:hidden">&#10005;</button>
              </SidebarHeader>
              <MenuList>
                {[
                  { path: '/student/dashboard', label: 'Home' },
                  { path: '/student/courses', label: 'Courses' },
                  { path: '/student/profile', label: 'Profile' },
                  { path: '/student/settings', label: 'Settings' }
                ].map(({ path, label }) => (
                  <MenuItem 
                    key={path}
                    active={isActivePath(path)} 
                    onClick={() => handleNavigation(path)}
                  >
                    {label}
                  </MenuItem>
                ))}
              </MenuList>
            </Sidebar>

            <MainContent>
              <Navbar>
                <button onClick={toggleMobileMenu} className="lg:hidden">&#9776;</button>
                <NavbarLinks>
                  <a href="#notifications">Notifications</a>
                  <a href="#logout">Logout</a>
                </NavbarLinks>
              </Navbar>
              <ContentWrapper>
                <Routes>
                  <Route path="dashboard" element={<DashboardHome />} />
                  <Route path="courses" element={<CourseManagement />} />
                  <Route path="profile" element={<div>Profile Page</div>} />
                  <Route path="settings" element={<div>Settings Page</div>} />
                  <Route path="*" element={<div>Not Found</div>} />
                </Routes>
              </ContentWrapper>
            </MainContent>
          </DashboardContainer>
        </div>
        <script type="module" src="/src/main.tsx"></script>
        <script src="//code.tidio.co/8u1spxrcgdblh0hyxswqtyvxik9adsty.js" async></script>
      </body>
    </html>
  );
};

// Styled components remain the same
const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const Sidebar = styled.aside`
  position: fixed;
  inset-y: 0;
  left: 0;
  z-index: 50;
  width: 16rem;
  background: linear-gradient(to bottom, #1e3a8a, #1d4ed8);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  color: white;
  transform: ${(props) => (props.isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  height: 100vh;
  @media (min-width: 1024px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #3b82f6;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 1rem;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.375rem;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: #2563eb;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  ${(props) =>
    props.active &&
    `
    background: #2563eb;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  `}
`;

const MainContent = styled.div`
  margin-left: 16rem;
  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

const Navbar = styled.header`
  position: fixed;
  top: 0;
  left: 16rem;
  right: 0;
  height: 4rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 50;
  @media (max-width: 1024px) {
    left: 0;
  }
`;

const NavbarLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ContentWrapper = styled.main`
  margin-top: 4rem;
  padding: 2rem;
`;

export default StudentDashboard;