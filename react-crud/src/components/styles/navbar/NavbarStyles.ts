import styled from "styled-components";

export const NavWrapper = styled.div`
  height: 60px;
  width: 100%;
  background: linear-gradient(90deg, rgb(0, 45, 118), rgb(10, 34, 63));
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const NavLogo = styled.div`
  font-size: 24px;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export const NavLinks = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavItem = styled.div`
  color: white;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const RegisterButton = styled.button`
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    transform: scale(1.05);
  }
`;

export const ContentWrapper = styled.div`
  margin-top: 30px;
  padding: 2px;
`;
