import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaUser, FaLock, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SignupContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #2f3b52, #1c2639);
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const SignupForm = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
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

const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 14px;
  margin-bottom: 10px;
`;

const SignupButton = styled.button`
  width: 100%;
  background: #3d4d66;
  color: white;
  padding: 14px;
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

const LoginLink = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #666;

  a {
    color: #3d4d66;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear any previous errors
    setError("");

    // Proceed to the multi-step form
    navigate("/signup-steps", { state: { email, password } });
  };

  return (
    <SignupContainer>
      <SignupForm>
        <Title>Sign up for Safe Sphere</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormGroup>
          <FaUser />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FaLock />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FaCheck />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <SignupButton onClick={handleSignup}>Sign up</SignupButton>
        <LoginLink>
          Already have an account? <Link to="/login">Login</Link>
        </LoginLink>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;