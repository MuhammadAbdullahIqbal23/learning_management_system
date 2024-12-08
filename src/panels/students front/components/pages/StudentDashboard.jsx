import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import CourseManagement from './Course';

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
    return location.pathname.includes(path);
  };

  return (
    <DashboardContainer>
      <Sidebar isMobileMenuOpen={isMobileMenuOpen}>
        <SidebarHeader>
          <h2>Dashboard</h2>
          <button onClick={toggleMobileMenu}>&#10005;</button>
        </SidebarHeader>
        <MenuList>
          <MenuItem 
            active={isActivePath('/student/dashboard')} 
            onClick={() => handleNavigation('/student/dashboard')}
          >
            Home
          </MenuItem>
          <MenuItem 
            active={isActivePath('/student/courses')}
            onClick={() => handleNavigation('/student/courses')}
          >
            Courses
          </MenuItem>
          <MenuItem 
            active={isActivePath('/student/profile')}
            onClick={() => handleNavigation('/student/profile')}
          >
            Profile
          </MenuItem>
          <MenuItem 
            active={isActivePath('/student/settings')}
            onClick={() => handleNavigation('/student/settings')}
          >
            Settings
          </MenuItem>
        </MenuList>
      </Sidebar>

      <MainContent>
        <Navbar>
          <button onClick={toggleMobileMenu}>&#9776;</button>
          <NavbarLinks>
            <a href="#notifications">Notifications</a>
            <a href="#logout">Logout</a>
          </NavbarLinks>
        </Navbar>
        <ContentWrapper>
          {location.pathname === '/student/courses' ? (
            <CourseManagement />
          ) : location.pathname === '/student/dashboard' ? (
            <>
              <h1>Welcome to the Student Dashboard</h1>
              <p>Here is your overview and updates.</p>
            </>
          ) : null}
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
};

// Styles remain the same
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