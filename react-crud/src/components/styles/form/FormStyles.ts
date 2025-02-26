import styled from "styled-components";

export const FormWrapper = styled.form`
  width: 580px;
  margin: 30px auto;
  padding: 15px 40px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  border-radius: 15px;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.2),
    -6px -6px 15px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.4s ease-in-out;
  animation: fadeIn 0.7s ease-in-out;

  h2 {
    font-size: 30px;
    font-weight: bold;
    color: rgb(10, 34, 63);
    margin-bottom: 10px;
    text-align: center;
  }

  button {
    margin-top: 5px;
    width: 103.5%;
    padding: 12px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #007bff, #00c6ff);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: linear-gradient(135deg, #0056b3, #0090ff);
      box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
    }
  }

  span {
    color: darkblue;
    font-weight: bold;
    cursor: pointer;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  margin-top: 80px;
`