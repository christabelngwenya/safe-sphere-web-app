import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";

const WhistleblowerPage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitWhistle = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Please enter a message before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/whistle", { message });
      setError("");
      setSuccessMessage("Thank you for your whistle. We appreciate your input!");
      setMessage("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      setError("There was an error submitting your whistle. Please try again.");
    }
  };

  return (
    <PageContainer>
      <Header>Whistle Submission</Header>
      <Subheader>We value your input. Help us improve our services.</Subheader>

      <InfoBox>
        <h3>Why Your Whistle Matters</h3>
        <p>
          Your whistle helps us understand how we can better serve you. Your
          whistle is <strong>completely anonymous</strong>.
        </p>
      </InfoBox>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <Textarea
        placeholder="Share your whistle here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <SubmitButton onClick={submitWhistle}>Submit Whistle</SubmitButton>
    </PageContainer>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1f2937;
  color: white;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
`;

const Header = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 12px;
  color: #d3d3d3;
`;

const Subheader = styled.p`
  text-align: center;
  margin-bottom: 24px;
  color: #a0aec0;
`;

const InfoBox = styled.div`
  background-color: #374151;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 8px;
    color: #d3d3d3;
  }

  p {
    font-size: 0.9rem;
    color: #a0aec0;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
`;

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 12px;
  margin-bottom: 16px;
  background-color: #374151;
  color: white;
  border: none;
  border-radius: 8px;
  resize: none;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

export default WhistleblowerPage;