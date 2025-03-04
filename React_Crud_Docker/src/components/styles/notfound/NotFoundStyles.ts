import styled from "styled-components";

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
`;

export const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: #ff4d4d;
`;

export const Description = styled.p`
  font-size: 1.5rem;
  color: #6c757d;
  margin: 10px 0;
`;

export const HomeButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
