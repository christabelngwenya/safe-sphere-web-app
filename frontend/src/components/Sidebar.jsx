import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faComments,
  faExclamationTriangle,
  faBookOpen,
  faCog,
  faSignOutAlt,
  faShieldAlt,
  faBullhorn,
  faNewspaper,
  faMapMarkerAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// Styled components for the sidebar
const SidebarContainer = styled.nav`
  background: linear-gradient(145deg, #2f3b52, #1c2639);
  color: white;
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1000;

  @media (max-width: 768px) {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(0);
    }
  }
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
  color: #d3d3d3;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  flex-grow: 1;
`;

const NavItem = styled.li`
  margin: 15px 0;
  cursor: pointer;
  font-size: 1.1em;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &:hover {
    background-color: #d3d3d3;
    color: white;
    transform: scale(1.05);
  }

  &:active {
    background-color: #a4a2a5;
  }
`;

const LogoutItem = styled(NavItem)`
  background: none;
  color: #d3d3d3;
  font-weight: bold;

  &:hover {
    background-color: #d3d3d3;
    color: white;
  }
`;

const handleLogout = () => {
  localStorage.removeItem("token");
  sessionStorage.clear();
  window.location.href = "/login";
};

const Sidebar = ({ setActiveSection, onClose }) => {
  return (
    <SidebarContainer>
      <Logo>Dashboard</Logo>
      <NavList>
        {[
          { id: "home", label: "Home", icon: faHome },
          { id: "counseling", label: "Online Counseling", icon: faComments },
          { id: "report-abuse", label: "Report Abuse", icon: faExclamationTriangle },
          { id: "whistleblower", label: "Whistleblowing", icon: faShieldAlt },
          { id: "educational", label: "Educational Share", icon: faBookOpen },
          { id: "notices", label: "Notices", icon: faBullhorn },
          { id: "news-feeds", label: "News Feeds", icon: faNewspaper },
          { id: "campus-locate-me", label: "Campus Locate Me", icon: faMapMarkerAlt },
          { id: "girls-corner", label: "Girls Corner", icon: faUsers },
          { id: "settings", label: "Settings", icon: faCog },
        ].map((item) => (
          <NavItem
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              onClose();
            }}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.label}</span>
          </NavItem>
        ))}

        <LogoutItem onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </LogoutItem>
      </NavList>

      <div className="w-full pt-4 border-t border-blue-700 text-sm text-blue-200">
        Student Support v1.0
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;