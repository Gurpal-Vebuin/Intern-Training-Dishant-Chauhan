import { renderHook } from "@testing-library/react";
import { useUser } from "../../hooks/useUser";
import { UserContext } from "../../context/UseContext";
import { ReactNode, useState } from "react";
import { User } from "../../types/interfaces/interface";

const mockUser: User = {
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  password: "john@123",
  roles: "admin",
};

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn: true }}>
      {children}
    </UserContext.Provider>
  );
};

describe("useUser Hook", () => {
  test("returns user data when context is provided", () => {
    const { result } = renderHook(() => useUser(), { wrapper: ContextWrapper });

    expect(result.current).toEqual({
      user: mockUser,
      setUser: expect.any(Function),
      isLoggedIn: true,
    });
  });

  test("returns undefined when context is missing", () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: ({ children }) => <>{children}</>,
    });

    expect(result.current).toBeUndefined();
  });
});
