import { renderHook, act } from "@testing-library/react";
import StatusCodes from "../../types/constants/statuscode/status";
import { API } from "../../services/api/CreateAxios";
import UseAuth from "../../hooks/useAuth";
import { Links } from "../../types/constants/Links/Links";

jest.mock("../../services/api/CreateAxios", () => ({
  API: {
    post: jest.fn(),
  },
}));

describe("UseAuth Hook", () => {
  const mockRegisterData = {
    name: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    password: "password123",
    roles: "user",
  };

  const mockLoginData = {
    email: "test@example.com",
    password: "password123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("registers a new user successfully", async () => {
    (API.post as jest.Mock).mockResolvedValue({
      status: StatusCodes.CREATED,
      data: { message: "User registered successfully" },
    });

    const { result } = renderHook(() => UseAuth());

    let response;
    await act(async () => {
      response = await result.current.register(mockRegisterData);
    });

    expect(response).toEqual({
      success: true,
      data: "User registered successfully",
    });
    expect(API.post).toHaveBeenCalledWith(Links.REGISTER, mockRegisterData);
  });

  test("handles registration failure due to server error", async () => {
    (API.post as jest.Mock).mockRejectedValue({
      response: { data: { message: "Registration failed" } },
    });

    const { result } = renderHook(() => UseAuth());

    let response;
    await act(async () => {
      response = await result.current.register(mockRegisterData);
    });

    expect(response).toEqual({
      success: false,
      error: "An unexpected error occurred",
    });
    expect(API.post).toHaveBeenCalledWith(Links.REGISTER, mockRegisterData);
  });

  test("handles registration failure due to unexpected error", async () => {
    (API.post as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => UseAuth());

    let response;
    await act(async () => {
      response = await result.current.register(mockRegisterData);
    });

    expect(response).toEqual({
      success: false,
      error: "An unexpected error occurred",
    });
    expect(API.post).toHaveBeenCalledWith(Links.REGISTER, mockRegisterData);
  });

  test("logs in a user successfully", async () => {
    (API.post as jest.Mock).mockResolvedValue({
      status: StatusCodes.SUCCESS,
      data: { message: "Login successful", token: "mock-token" },
    });

    const { result } = renderHook(() => UseAuth());

    let response;
    await act(async () => {
      response = await result.current.login(mockLoginData);
    });

    expect(response).toEqual({
      success: true,
      data: "Login successful",
      token: "mock-token",
    });
    expect(API.post).toHaveBeenCalledWith(Links.LOGIN, mockLoginData);
  });

  test("handles login failure due to incorrect credentials", async () => {
    (API.post as jest.Mock).mockRejectedValue({
      isAxiosError: true,
      response: {
        data: { message: "Invalid email or password" },
      },
    });

    const { result } = renderHook(() => UseAuth());

    let response;
    await act(async () => {
      response = await result.current.login(mockLoginData);
    });

    expect(response).toEqual({
      success: false,
      error: "Invalid email or password",
    });

    expect(API.post).toHaveBeenCalledWith(Links.LOGIN, mockLoginData);
  });

  test("handles login failure due to unexpected error", async () => {
    (API.post as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => UseAuth());

    let response;
    await act(async () => {
      response = await result.current.login(mockLoginData);
    });

    expect(response).toEqual({
      success: false,
      error: "An unexpected error occurred",
    });
    expect(API.post).toHaveBeenCalledWith(Links.LOGIN, mockLoginData);
  });
});
