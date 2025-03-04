import {
  ProfileWrapper,
  ProfileCard,
  ProfileTitle,
  ProfileItem,
} from "../../styles/profile/ProfileStyles";
import useLanguage from "../../../hooks/useLanguage";
import { useUser } from "../../../hooks/useUser";

const Profile = () => {
  const { t } = useLanguage();
  const context = useUser();

  return (
    <ProfileWrapper>
      <ProfileCard>
        <ProfileTitle>
          {t("Welcome")} {context?.isLoggedIn ? context?.user?.name : "Guest"}!
        </ProfileTitle>
        <ProfileItem>
          <span>{t("Form.Name")}:</span> {context?.user?.name || "John Doe"}
        </ProfileItem>
        <ProfileItem>
          <span>{t("Form.Email")}:</span> {context?.user?.email || "john@gmail.com"}
        </ProfileItem>
        <ProfileItem>
          <span>{t("Form.Phone")}:</span> {context?.user?.phone || "1234567890"}
        </ProfileItem>
        <ProfileItem>
          <span>{t("Form.Roles")}:</span> {context?.user?.roles || "User"}
        </ProfileItem>
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default Profile;
