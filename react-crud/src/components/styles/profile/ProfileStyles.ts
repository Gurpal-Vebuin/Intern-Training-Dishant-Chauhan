import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 89.6vh;
  padding: 20px;
  background: linear-gradient(135deg, #f0f2f5, #dfe4ea);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ProfileCard = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 400px;
  width: 100%;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProfileTitle = styled.h1`
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const ProfileItem = styled.p`
  font-size: 18px;
  color: #555;
  margin: 8px 0;
  font-weight: 500;

  span {
    font-weight: bold;
    color: #007bff;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  animation: fadeIn 1s ease-in-out infinite alternate;

  @keyframes fadeIn {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
`;
