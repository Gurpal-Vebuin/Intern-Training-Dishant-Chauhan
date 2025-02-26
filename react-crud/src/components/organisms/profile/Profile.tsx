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
          <span>{t("Form.Name")}:</span> {context?.user?.name}
        </ProfileItem>
        <ProfileItem>
          <span>{t("Form.Email")}:</span> {context?.user?.email}
        </ProfileItem>
        <ProfileItem>
          <span>{t("Form.Phone")}:</span> {context?.user?.phone}
        </ProfileItem>
        <ProfileItem>
          <span>{t("Form.Roles")}:</span> {context?.user?.roles}
        </ProfileItem>
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default Profile;
