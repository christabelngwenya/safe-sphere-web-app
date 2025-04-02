import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";

const ReportAbuse = () => {
  const [report, setReport] = useState({
    name: "",
    email: "",
    message: "",
    anonymous: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitReport = async (e) => {
    e.preventDefault();

    if (!report.message.trim()) {
      setError("Please describe the abuse before submitting.");
      return;
    }

    if (!report.anonymous && !validateEmail(report.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reports", report);
      setError("");
      setSuccess("Report submitted successfully!");
      setReport({ name: "", email: "", message: "", anonymous: false });
    } catch (error) {
      setError("There was an error submitting your report. Please try again.");
      setSuccess("");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <PageContainer>
      <Header>Report Abuse</Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      {!report.anonymous && (
        <>
          <Input
            type="text"
            placeholder="Your Name"
            value={report.name}
            onChange={(e) => setReport({ ...report, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={report.email}
            onChange={(e) => setReport({ ...report, email: e.target.value })}
          />
        </>
      )}

      <Textarea
        placeholder="Describe the abuse..."
        value={report.message}
        onChange={(e) => setReport({ ...report, message: e.target.value })}
      />

      <CheckboxLabel>
        <Checkbox
          type="checkbox"
          checked={report.anonymous}
          onChange={(e) => setReport({ ...report, anonymous: e.target.checked })}
        />
        Report Anonymously
      </CheckboxLabel>

      <SubmitButton onClick={submitReport}>Submit</SubmitButton>
    </PageContainer>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 480px;
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
  margin-bottom: 20px;
  color: #d3d3d3;
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

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  background-color: #374151;
  color: white;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: #d3d3d3;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
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

export default ReportAbuse;