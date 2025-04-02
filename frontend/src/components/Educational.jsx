import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";

const Educational = () => {
  const [resourceName, setResourceName] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const [resources, setResources] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/resources");
      setResources(response.data);
    } catch (error) {
      setMessage({ text: "Error fetching resources. Please try again.", type: "error" });
    }
  };

  const handleFileChange = (e) => {
    setResourceFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", resourceName);
    formData.append("link", resourceLink);
    formData.append("file", resourceFile);

    try {
      const response = await axios.post("http://localhost:5000/upload-resource", formData);
      setResources([response.data, ...resources]);
      setMessage({ text: "Resource uploaded successfully!", type: "success" });
      setResourceName("");
      setResourceLink("");
      setResourceFile(null);
    } catch (error) {
      setMessage({ text: "Error uploading resource. Please try again.", type: "error" });
    }
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <Header>Educational Resources</Header>
      <Subheader>Empowering sisterhood through knowledge and support.</Subheader>

      {/* Message Section */}
      {message.text && (
        <Message type={message.type}>
          {message.text}
        </Message>
      )}

      {/* Why Share Section */}
      <InfoBox>
        <h3>Why Share Educational Resources?</h3>
        <p>
          By sharing educational resources, you are helping to create a safer and more supportive environment for sisterhood.
        </p>
      </InfoBox>

      {/* Upload Form */}
      <Form onSubmit={handleSubmit}>
        <Label>Resource Name:</Label>
        <Input
          type="text"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          placeholder="Enter resource name"
        />

        <Label>Resource Link (optional):</Label>
        <Input
          type="text"
          value={resourceLink}
          onChange={(e) => setResourceLink(e.target.value)}
          placeholder="Enter resource link"
        />

        <Label>Upload File (optional):</Label>
        <FileInput
          type="file"
          onChange={handleFileChange}
        />

        <SubmitButton type="submit">Upload Resource</SubmitButton>
      </Form>

      {/* Available Resources */}
      <ResourcesSection>
        <h3>Available Resources</h3>
        <ResourceList>
          {resources.map((resource, index) => (
            <ResourceItem key={index}>
              {resource.link ? (
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  {resource.name}
                </a>
              ) : (
                <a href={`http://localhost:5000${resource.file_path}`} target="_blank" rel="noopener noreferrer">
                  {resource.name}
                </a>
              )}
            </ResourceItem>
          ))}
        </ResourceList>
      </ResourcesSection>
    </PageContainer>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
  color: #2f3b52;
`;

const Subheader = styled.p`
  text-align: center;
  margin-bottom: 24px;
  color: #4b5563;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Message = styled.div`
  background-color: ${(props) => (props.type === "success" ? "#e8f5e9" : "#ffebee")};
  color: ${(props) => (props.type === "success" ? "#2e7d32" : "#c62828")};
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
`;

const InfoBox = styled.div`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 8px;
    color: #2f3b52;
  }

  p {
    font-size: 0.9rem;
    color: #4b5563;
  }
`;

const Form = styled.form`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #4b5563;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #2f3b52;
    border-color:#2f3b52;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #2f3b52;
    border-color: #2f3b52;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color:#2f3b52;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2f3b52;
  }
`;

const ResourcesSection = styled.div`
  margin-top: 24px;
`;

const ResourceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ResourceItem = styled.div`
  background-color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  a {
    color:#2f3b52;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Educational;