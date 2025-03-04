import { useNavigate } from "react-router-dom";
import { Links } from "../../../types/constants/Links/Links";
import {
  HomeButton,
  NotFoundWrapper,
} from "../../styles/notfound/NotFoundStyles";
import { Description, Title } from "../../styles/report/ReportStyles";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <Title>404</Title>
      <Description>
        Oops! The page you are looking for does not exist.
      </Description>
      <HomeButton onClick={() => navigate(`${Links.HOME}`)}>
        Go to Home
      </HomeButton>
    </NotFoundWrapper>
  );
};

export default NotFound;
