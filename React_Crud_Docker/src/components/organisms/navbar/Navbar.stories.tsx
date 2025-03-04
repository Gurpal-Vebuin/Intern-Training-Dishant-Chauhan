import { Meta, StoryFn } from "@storybook/react";
import Navbar from "./Navbar";
import { Provider } from "react-redux";
import { store } from "../../../redux/store/Store";
import { useState } from "react";
import { UserContext } from "../../../context/UseContext";

const MockUserContextProvider: React.FC<{
  user: any;
  children: React.ReactNode;
}> = ({ user, children }) => {
  const [mockUser, setMockUser] = useState(user);

  return (
    <UserContext.Provider
      value={{ user: mockUser, setUser: setMockUser, isLoggedIn: !!mockUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <>
        <Navbar />
        <Story />
      </>
    ),
  ],
  tags: ["autodocs"],
} as Meta<typeof Navbar>;

const Template: StoryFn<{ user?: any; route?: string }> = (args) => (
  <Provider store={store}>
    <MockUserContextProvider user={args.user}>
      <Navbar />
    </MockUserContextProvider>
  </Provider>
);

export const Login = Template.bind({});
Login.args = {
  user: null,
  route: "/",
};

export const AdminLoggedIn = Template.bind({});
AdminLoggedIn.args = {
  user: {
    name: "John Doe",
    roles: "admin",
  },
  route: "/profile",
};

export const AdminMyDetailsPage = Template.bind({});
AdminMyDetailsPage.args = {
  user: {
    name: "John Doe",
    roles: "admin",
  },
  route: "/mydetails",
};

export const UserProfilePage = Template.bind({});
UserProfilePage.args = {
  user: {
    name: "John Doe",
    roles: "user",
  },
  route: "/profile",
};
