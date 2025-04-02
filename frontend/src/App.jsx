import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Counseling from "./components/Counseling";
import ReportAbuse from "./components/ReportAbuse";
import Educational from "./components/Educational";
import Settings from "./components/Settings";
import GirlsCorner from "./components/GirlsCorner";
import CampusLocator from "./components/CampusLocateMe";
import WhistleblowerPage from "./components/WhistleblowerPage";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  /* Default margin for medium screens */
  margin-left: 250px; /* Same as sidebar width */

  /* Increase width on larger screens */
  @media (min-width: 1024px) {
    margin-left: 300px; /* Increase the margin to give more space to the main content */
  }

  /* Remove margin on small screens */
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 20px;
  margin-top: 64px; /* Space for the header */
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const DashboardLayout = ({ activeSection, setActiveSection }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "counseling":
        return <Counseling />;
      case "report-abuse":
        return <ReportAbuse />;
      case "educational":
        return <Educational />;
      case "whistleblower":
        return <WhistleblowerPage />;
      case "campus-locate-me":
        return <CampusLocator />;
      case "girls-corner":
        return <GirlsCorner />;
      case "settings":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <AppContainer>
      {/* Sidebar */}
      <Sidebar
        setActiveSection={setActiveSection}
        onClose={() => setMobileSidebarOpen(false)}
        className={mobileSidebarOpen ? "open" : ""}
      />

      {/* Main Content Wrapper */}
      <MainContentWrapper>
        {/* Header */}
        <Header onMenuClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        {/* Content Area */}
        <ContentArea>{renderSection()}</ContentArea>
      </MainContentWrapper>
    </AppContainer>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <DashboardLayout
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          }
        />
        <Route
          path="/"
          element={
            <DashboardLayout
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;