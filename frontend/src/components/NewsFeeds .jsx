import React, { useState } from "react";
import styled from "styled-components";

const NewsFeedsContainer = styled.div`
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

const FeedList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeedItem = styled.li`
  background: #fff;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const AddFeedButton = styled.button`
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

const NewsFeeds = () => {
  const [feeds, setFeeds] = useState([
    { id: 1, title: "New Scholarship Program", content: "Apply for the new scholarship program by the end of this month." },
    { id: 2, title: "Sports Day Results", content: "Check out the results of the annual sports day event." },
  ]);

  const addFeed = () => {
    const newFeed = {
      id: feeds.length + 1,
      title: "New News Feed",
      content: "This is a new news feed added to the list.",
    };
    setFeeds([...feeds, newFeed]);
  };

  return (
    <NewsFeedsContainer>
      <Title>News Feeds</Title>
      <AddFeedButton onClick={addFeed}>Add News Feed</AddFeedButton>
      <FeedList>
        {feeds.map((feed) => (
          <FeedItem key={feed.id}>
            <h3>{feed.title}</h3>
            <p>{feed.content}</p>
          </FeedItem>
        ))}
      </FeedList>
    </NewsFeedsContainer>
  );
};

export default NewsFeeds;