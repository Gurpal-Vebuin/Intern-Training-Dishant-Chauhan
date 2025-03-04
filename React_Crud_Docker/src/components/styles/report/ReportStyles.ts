import styled from "styled-components";

export const ReportWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 95vh;
  background: linear-gradient(135deg, #f0f2f5, #dfe4ea);
`;

export const ReportCard = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #666;
`;
