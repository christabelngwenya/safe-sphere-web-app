import React, { useState } from "react";
import styled from "styled-components";

const NoticesContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  color: #2f3b52;
  margin-bottom: 20px;
`;

const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NoticeItem = styled.li`
  background: #fff;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const AddNoticeButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Notices = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: "Deadline Extended", content: "The submission deadline for assignments has been extended to Friday." },
    { id: 2, title: "Campus Event", content: "Join us for the annual cultural fest on Saturday at 5 PM." },
  ]);

  const addNotice = () => {
    const newNotice = {
      id: notices.length + 1,
      title: "New Notice",
      content: "This is a new notice added to the list.",
    };
    setNotices([...notices, newNotice]);
  };

  return (
    <NoticesContainer>
      <Title>Notices</Title>
      <AddNoticeButton onClick={addNotice}>Add Notice</AddNoticeButton>
      <NoticeList>
        {notices.map((notice) => (
          <NoticeItem key={notice.id}>
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
          </NoticeItem>
        ))}
      </NoticeList>
    </NoticesContainer>
  );
};

export default Notices;