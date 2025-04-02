import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 1200px; /* Default max-width for medium screens */
  margin: 0 auto; /* Center the container */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Increase width on larger screens */
  @media (min-width: 1024px) {
    max-width: 1400px; /* Larger width for big screens */
  }

  /* Full width on small screens */
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
  }
`;

export default PageContainer;