import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaPaperclip, FaMicrophone, FaImage, FaVideo } from "react-icons/fa";
import PageContainer from "../components/PageContainer";

const GirlsCorner = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    const newMessage = {
      id: Date.now(),
      text,
      file: file ? URL.createObjectURL(file) : null,
      type: file ? file.type.split("/")[0] : "text",
    };

    setMessages([...messages, newMessage]);
    setText("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  return (
    <PageContainer>
      {/* Header */}
      <Header>
        <h2>Girls Corner</h2>
        <p>Promoting Sisterhood and Support</p>
      </Header>

      {/* Chat Area */}
      <ChatArea>
        {messages.length === 0 && (
          <EmptyState>
            <FaPaperclip className="icon" />
            <p>No messages yet. Start the conversation!</p>
          </EmptyState>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} type={message.type}>
            {message.text && <p>{message.text}</p>}
            {message.file && message.type === "image" && (
              <img src={message.file} alt="uploaded" />
            )}
            {message.file && message.type === "video" && (
              <video controls src={message.file} />
            )}
            {message.file && message.type === "audio" && (
              <audio controls src={message.file} />
            )}
          </MessageBubble>
        ))}
      </ChatArea>

      {/* Input Area */}
      <InputArea onSubmit={handleSendMessage}>
        <AttachButton onClick={() => fileInputRef.current.click()}>
          <FaPaperclip />
        </AttachButton>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <TextInput
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <SendButton type="submit">
          <FaMicrophone />
        </SendButton>
      </InputArea>
    </PageContainer>
  );
};

// Styled Components
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    color:#2f3b52;
  }

  p {
    font-size: 0.9rem;
    color: #6b7280;
  }
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6b7280;

  .icon {
    font-size: 3rem;
    margin-bottom: 10px;
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  margin-left: auto;
  background-color: ${(props) => (props.type === "text" ? "#d1fae5" : "#e0f2fe")};
  padding: 10px 15px;
  border-radius: 12px;
  animation: ${fadeIn} 0.5s ease-in-out;

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  video {
    max-width: 100%;
    border-radius: 8px;
  }

  audio {
    width: 100%;
  }
`;

const InputArea = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
`;

const AttachButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #2f3b52;

  &:hover {
    color:#2f3b52;
  }
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solidrgb(74, 79, 87);
  border-radius: 8px;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color:rgb(93, 98, 106);
  }

  &:focus {
    border-color: #2f3b52;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const SendButton = styled.button`
  background-color:#2f3b52;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color:#2f3b52;
  }
`;

export default GirlsCorner;