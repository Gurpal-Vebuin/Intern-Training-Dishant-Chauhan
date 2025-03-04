import {
  NavWrapper,
  NavLogo,
  NavLinks,
  ContentWrapper,
  NavItem,
} from "../../styles/navbar/NavbarStyles";
import SelectLanguage from "../../molecules/select/SelectLanguage";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Links } from "../../../types/constants/Links/Links";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/features/slices/AuthSlice";
import useLanguage from "../../../hooks/useLanguage";
import { useUser } from "../../../hooks/useUser";
import Button from "../../atoms/button/Button";

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
    navigate(`${Links.REPORT}`, { replace: true });
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
            <Button onClick={handleLogout}>{t("Logout")}</Button>
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
