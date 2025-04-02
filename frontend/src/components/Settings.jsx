import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaSave, FaPhone, FaUniversity, FaAddressCard } from "react-icons/fa";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";

const Settings = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    email: "",
    contactInfo: "",
    college: "",
    emergencyContact: "",
    nextOfKin: "",
    nextOfKinContact: "",
    expectedCompletionYear: "",
    program: "",
    campusStatus: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUserDetails({
          name: response.data.name || "",
          surname: response.data.surname || "",
          email: response.data.email || "",
          contactInfo: response.data.contact_info || "",
          college: response.data.college || "",
          emergencyContact: response.data.emergency_contact || "",
          nextOfKin: response.data.next_of_kin || "",
          nextOfKinContact: response.data.next_of_kin_contact || "",
          expectedCompletionYear: response.data.expected_completion_year || "",
          program: response.data.program || "",
          campusStatus: response.data.campus_status || "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(
        "http://localhost:5000/api/auth/profile",
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainerr>
      {/* Header */}
      <Header>Profile Settings</Header>

      {/* Form */}
      <Form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <InputField>
          <FaUser className="icon" />
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={userDetails.name}
            onChange={handleChange}
          />
        </InputField>

        <InputField>
          <FaUser className="icon" />
          <Input
            type="text"
            name="surname"
            placeholder="Surname"
            value={userDetails.surname}
            onChange={handleChange}
          />
        </InputField>

        {/* Contact Information */}
        <InputField>
          <FaPhone className="icon" />
          <Input
            type="text"
            name="contactInfo"
            placeholder="Contact Info"
            value={userDetails.contactInfo}
            onChange={handleChange}
          />
        </InputField>

        {/* Academic Information */}
        <InputField>
          <FaUniversity className="icon" />
          <Input
            type="text"
            name="college"
            placeholder="College Enrolled At"
            value={userDetails.college}
            onChange={handleChange}
          />
        </InputField>

        <InputField>
          <FaUniversity className="icon" />
          <Input
            type="text"
            name="program"
            placeholder="Program"
            value={userDetails.program}
            onChange={handleChange}
          />
        </InputField>

        <InputField>
          <FaUniversity className="icon" />
          <Input
            type="text"
            name="expectedCompletionYear"
            placeholder="Year Expected to Complete Studies"
            value={userDetails.expectedCompletionYear}
            onChange={handleChange}
          />
        </InputField>

        <InputField>
          <FaUniversity className="icon" />
          <Input
            type="text"
            name="campusStatus"
            placeholder="On/Off Rez Campus"
            value={userDetails.campusStatus}
            onChange={handleChange}
          />
        </InputField>

        {/* Emergency Contacts */}
        <InputField>
          <FaPhone className="icon" />
          <Input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={userDetails.emergencyContact}
            onChange={handleChange}
          />
        </InputField>

        <InputField>
          <FaAddressCard className="icon" />
          <Input
            type="text"
            name="nextOfKin"
            placeholder="Next of Kin Full Name"
            value={userDetails.nextOfKin}
            onChange={handleChange}
          />
        </InputField>

        <InputField>
          <FaPhone className="icon" />
          <Input
            type="text"
            name="nextOfKinContact"
            placeholder="Next of Kin Contact Details"
            value={userDetails.nextOfKinContact}
            onChange={handleChange}
          />
        </InputField>

        {/* Submit Button */}
        <SubmitButton type="submit" disabled={isLoading}>
          <FaSave />
          {isLoading ? "Saving..." : "Save Changes"}
        </SubmitButton>
      </Form>
    </PageContainerr>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 24px;
  color: #1e40af;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .icon {
    color: #6b7280;
    margin-right: 12px;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  color: #374151;

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => (props.disabled ? "#93c5fd" : "#3b82f6")};
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
    background-color: ${(props) => (props.disabled ? "#93c5fd" : "#2563eb")};
  }

  svg {
    font-size: 1.25rem;
  }
`;

export default Settings;