import bcrypt from "bcrypt";
import { loginUseCase } from "../../application/usecases/loginUseCase.ts";
import { generateJWT } from "../../domain/entities/schema/jwtSchema.ts";
import { EntityManager } from "typeorm";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";

// Mock bcrypt and generateJWT
jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

jest.mock("../../domain/entities/schema/jwtSchema", () => ({
  generateJWT: jest.fn(),
}));

describe("loginUseCase", () => {
  let mockUserRepo: jest.Mocked<UserRepositoryPort>;;
  let mockTransactionManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockUserRepo = {
      loginUserPort: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    mockTransactionManager = {} as unknown as jest.Mocked<EntityManager>;

    jest.clearAllMocks();
  });

  test("should return a user object and token when login is successful", async () => {
    const mockUser = { id: 1, password: "hashedPassword123", roles: "admin" };
    
    mockUserRepo.loginUserPort.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (generateJWT as jest.Mock).mockReturnValue("mockedToken");

    const result = await loginUseCase("test@example.com", "password123", mockUserRepo, mockTransactionManager);

    expect(result).toEqual({
      user: { id: mockUser.id, roles: mockUser.roles },
      token: "mockedToken",
    });

    expect(bcrypt.compare).toHaveBeenCalledWith("password123", mockUser.password);
    expect(generateJWT).toHaveBeenCalledWith({ id: mockUser.id, roles: mockUser.roles });
  });

  test("should throw an error when email is not found", async () => {
    mockUserRepo.loginUserPort.mockResolvedValue(null);

    await expect(
      loginUseCase("nonexistent@example.com", "password123", mockUserRepo, mockTransactionManager)
    ).rejects.toThrow("User not found!");

    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(generateJWT).not.toHaveBeenCalled();
  });

  test("should throw an error when password is incorrect", async () => {
    const mockUser = { id: 1, password: "hashedPassword123", roles: "admin" };
    
    mockUserRepo.loginUserPort.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      loginUseCase("test@example.com", "wrongPassword", mockUserRepo, mockTransactionManager)
    ).rejects.toThrow("Invalid Email or Password");

    expect(bcrypt.compare).toHaveBeenCalledWith("wrongPassword", mockUser.password);
    expect(generateJWT).not.toHaveBeenCalled();
  });
});
