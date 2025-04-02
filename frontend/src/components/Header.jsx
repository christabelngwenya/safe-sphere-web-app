import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faBell, faCogs } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// Styled components for the header
const HeaderContainer = styled.header`
  background: #ffffff;
  color: #2f3b52;
  padding: 15px 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 64px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Tagline = styled.span`
  font-size: 0.85em;
  color: #666;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconContainer = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #D3D3D3;
  }
`;

const ProfileName = styled.span`
  font-size: 1em;
  color: #2f3b52;
`;

const Header = ({ onMenuClick }) => {
  return (
    <HeaderContainer>
      <div className="flex items-center">
        {/* Menu Icon for Mobile */}
        <button
          className="md:hidden mr-4 text-blue-900"
          onClick={onMenuClick}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Logo and Tagline for Desktop */}
        <LogoContainer className="hidden md:block">
          <Logo>Safe Sphere</Logo>
          <Tagline>Personalised Safety</Tagline>
        </LogoContainer>
      </div>

      {/* Actions Container */}
      <ActionsContainer>
        <IconContainer>
          <FontAwesomeIcon icon={faBell} />
        </IconContainer>
        <IconContainer>
          <FontAwesomeIcon icon={faCogs} />
        </IconContainer>
        <ProfileContainer>
          <FontAwesomeIcon icon={faUserCircle} />
          <ProfileName className="hidden md:inline">Christabel</ProfileName>
        </ProfileContainer>
      </ActionsContainer>
    </HeaderContainer>
  );
};

export default Header;