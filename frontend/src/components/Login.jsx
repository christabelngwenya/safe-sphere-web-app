import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #2f3b52, #1c2639);
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const LoginForm = styled.div`
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

const PasswordToggle = styled.span`
  cursor: pointer;
  color: #3d4d66;
  font-size: 18px;
`;

const LoginButton = styled.button`
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
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SignupLink = styled.div`
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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 15px;
`;

const Login = ({ setIsLoggedIn, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      
      // Store token and user data
      localStorage.setItem("authToken", response.data.token);
      setUser(response.data.user);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.error || error.message);
      setError(error.response?.data?.error || "Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Title>Login to Safe Sphere</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleLogin}>
          <FormGroup>
            <FaUser />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </FormGroup>
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </LoginButton>
        </form>
        <SignupLink>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignupLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;