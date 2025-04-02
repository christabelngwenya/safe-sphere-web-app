import React from "react";
import styled, { keyframes } from "styled-components";
import PageContainer from "../components/PageContainer";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  width: 100%;
  background: linear-gradient(135deg, #1e1e30, #3d3d61);
  color: white;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

const WelcomeSection = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const WelcomeTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  animation: ${fadeIn} 1.5s ease;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.4rem;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 30px;
  animation: ${fadeIn} 1.8s ease;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  font-size: 1.2rem;
  color: white;
  background: #ff4d4d;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #ff3333;
    transform: scale(1.05);
  }
`;

const Home = () => {
  return (
    <PageContainer>
    <HomeContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome to SafeSphere</WelcomeTitle>
        <WelcomeSubtitle>
          Your safety is our priority. This is a judgment-free space where you can share and report with confidence.
        </WelcomeSubtitle>
        <ButtonGroup>
          <ActionButton>Get Started</ActionButton>
          <ActionButton>Learn More</ActionButton>
        </ButtonGroup>
      </WelcomeSection>
    </HomeContainer>
    </PageContainer>
  );
};

export default Home;