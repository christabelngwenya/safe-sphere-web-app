import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaUser, FaPhone, FaUniversity, FaAddressCard } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SignupStepsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #2f3b52, #1c2639);
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const SignupStepsForm = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
`;

const Card = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const Title = styled.h2`
  text-align: center;
  color: #3d4d66;
  font-size: 24px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 12px;
  margin: 15px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:focus-within {
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
    transform: translateY(-5px);
  }

  svg {
    color: #3d4d66;
    margin-right: 12px;
    font-size: 18px;
  }

  input {
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    font-size: 16px;
    color: #333;
    transition: all 0.3s ease;

    &:focus {
      border-bottom: 2px solid #3d4d66;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #3d4d66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2c3a4d;
  }

  &:disabled {
    background: #b0c4de;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  color: #3d4d66;
  font-size: 18px;
  margin-top: 20px;
`;

const SignupSteps = () => {
  const location = useLocation();
  const { email, password } = location.state || { email: "", password: "" };
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    contactInfo: "",
    college: "",
    emergencyContact: "",
    nextOfKin: "",
    expectedCompletionYear: "",
    program: "",
    campusStatus: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const fullUserDetails = { email, password, ...userDetails };
      await axios.post("http://localhost:5000/api/users/signup", fullUserDetails);
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error.response.data.error);
    }
  };

  return (
    <SignupStepsContainer>
      <SignupStepsForm>
        {/* Step 1: Basic Info */}
        <Card active={step === 1}>
          <Title>Step 1: Basic Information</Title>
          <FormGroup>
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userDetails.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FaUser />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={userDetails.surname}
              onChange={handleChange}
            />
          </FormGroup>
          <ButtonGroup>
            <Button onClick={nextStep}>Next</Button>
          </ButtonGroup>
        </Card>

        {/* Step 2: Contact Info */}
        <Card active={step === 2}>
          <Title>Step 2: Contact Information</Title>
          <FormGroup>
            <FaPhone />
            <input
              type="text"
              name="contactInfo"
              placeholder="Contact Info"
              value={userDetails.contactInfo}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FaPhone />
            <input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact"
              value={userDetails.emergencyContact}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FaAddressCard />
            <input
              type="text"
              name="nextOfKin"
              placeholder="Next of Kin"
              value={userDetails.nextOfKin}
              onChange={handleChange}
            />
          </FormGroup>
          <ButtonGroup>
            <Button onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next</Button>
          </ButtonGroup>
        </Card>

        {/* Step 3: Academic Info */}
        <Card active={step === 3}>
          <Title>Step 3: Academic Information</Title>
          <FormGroup>
            <FaUniversity />
            <input
              type="text"
              name="college"
              placeholder="College Enrolled At"
              value={userDetails.college}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FaUniversity />
            <input
              type="text"
              name="expectedCompletionYear"
              placeholder="Year Expected to Complete Studies"
              value={userDetails.expectedCompletionYear}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FaUniversity />
            <input
              type="text"
              name="program"
              placeholder="Program"
              value={userDetails.program}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FaUniversity />
            <input
              type="text"
              name="campusStatus"
              placeholder="On/Off Rez Campus"
              value={userDetails.campusStatus}
              onChange={handleChange}
            />
          </FormGroup>
          <ButtonGroup>
            <Button onClick={prevStep}>Back</Button>
            <Button onClick={handleSubmit}>Finish</Button>
          </ButtonGroup>
        </Card>
      </SignupStepsForm>
    </SignupStepsContainer>
  );
};

export default SignupSteps;