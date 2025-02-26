import { useContext } from "react";
import { UserContext } from "../context/UseContext";
import { LoadingWrapper } from "../components/styles/profile/ProfileStyles";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    <LoadingWrapper>...Loading</LoadingWrapper>;
  }
  return context;
};
