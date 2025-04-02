import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";

const Counseling = () => {
  const contacts = [
    { name: "Counsellor A", phone: "263735058068", role: "Licensed Professional Counselor" },
    { name: "Counsellor B", phone: "263786089668", role: "Clinical Psychologist" },
  ];

  const handleWhatsAppClick = (phone) => {
    const whatsappURL = `https://wa.me/${phone}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <Header>Counseling Services</Header>
      <Subheader>
        Welcome to our counseling services. Our team of licensed professionals is here to support you with any challenges you may be facing.
      </Subheader>

      {/* Contacts Grid */}
      <Grid>
        {contacts.map((contact, index) => (
          <Card key={index}>
            {/* Profile Section */}
            <Profile>
              <Avatar>
                <FontAwesomeIcon icon={faWhatsapp} />
              </Avatar>
              <Name>{contact.name}</Name>
              <Role>{contact.role}</Role>
            </Profile>

            {/* Action Button */}
            <WhatsAppButton onClick={() => handleWhatsAppClick(contact.phone)}>
              <FontAwesomeIcon icon={faWhatsapp} />
              Chat on WhatsApp
            </WhatsAppButton>
          </Card>
        ))}
      </Grid>
    </PageContainer>
  );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f9fafb;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 12px;
  color:#2f3b52;
`;

const Subheader = styled.p`
  text-align: center;
  margin-bottom: 24px;
  color: #4b5563;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  background-color:#2f3b52;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  svg {
    font-size: 2rem;
    color: white;
  }
`;

const Name = styled.h3`
  font-size: 1.25rem;
  color:#2f3b52;
  margin-bottom: 4px;
`;

const Role = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
`;

const WhatsAppButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16a34a;
  }

  svg {
    font-size: 1.25rem;
  }
`;

export default Counseling;