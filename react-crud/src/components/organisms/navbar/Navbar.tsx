import {
  NavWrapper,
  NavLogo,
  NavLinks,
  ContentWrapper,
  NavItem,
  RegisterButton,
} from "../../styles/navbar/NavbarStyles";
import SelectLanguage from "../../molecules/select/SelectLanguage";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Links } from "../../../types/constants/Links/Links";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/features/slices/AuthSlice";
import useLanguage from "../../../hooks/useLanguage";
import { useUser } from "../../../hooks/useUser";

const Navbar = () => {
  const context = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const isReportPage = location.pathname === Links.REPORT;

  const handleLogout = () => {
    dispatch(setToken(""));
    navigate(`${Links.HOME}`);
  };

  const handleReport = () => {
    navigate(`${Links.REPORT}`,{ replace: true });
  };

  const handleMyDetails = () => {
    navigate(`${Links.PROFILE}`);
  };

  return (
    <>
      <NavWrapper>
        <NavLogo>Logo</NavLogo>
        <NavLinks>
          <SelectLanguage />
          {context?.user?.roles === "admin" && !isReportPage && (
            <NavItem onClick={handleReport}>{t("Report.Title")}</NavItem>
          )}
          {context?.user?.roles === "admin" && isReportPage && (
            <NavItem onClick={handleMyDetails}>{t("MyDetails")}</NavItem>
          )}
          {context?.isLoggedIn && (
            <RegisterButton onClick={handleLogout}>
              {t("Logout")}
            </RegisterButton>
          )}
        </NavLinks>
      </NavWrapper>

      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

export default Navbar;
