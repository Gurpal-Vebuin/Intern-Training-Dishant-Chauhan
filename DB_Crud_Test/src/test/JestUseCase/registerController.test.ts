import bcrypt from "bcrypt";
import { userRegisterUseCase } from "../../application/usecases/registerUserUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";
import { User } from "../../domain/models/user.ts";
import { rolesFormat } from "../../infractructure/typeOrm/entities/userEntity.ts";

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

describe("userRegisterUseCase", () => {
  let mockUserRepo: jest.Mocked<UserRepositoryPort>;
  let mockTransactionManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockUserRepo = {
      checkUserByEmailPort: jest.fn(),
      createUserPort: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    mockTransactionManager = {} as unknown as jest.Mocked<EntityManager>;

    jest.clearAllMocks();
  });

  test("should register a new user successfully", async () => {
    const mockUser: User = {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      password: "hashedPassword123",
      roles: "user" as rolesFormat,
    };

    (mockUserRepo.checkUserByEmailPort as jest.Mock).mockResolvedValue(false);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword123");
    (mockUserRepo.createUserPort as jest.Mock).mockResolvedValue(true);

    const result = await userRegisterUseCase(
      mockUser.name,
      mockUser.email,
      mockUser.phone,
      "plainTextPassword",
      mockUser.roles,
      mockUserRepo,
      mockTransactionManager
    );

    expect(mockUserRepo.checkUserByEmailPort).toHaveBeenCalledWith(mockUser.email, mockTransactionManager);
    expect(bcrypt.hash).toHaveBeenCalledWith("plainTextPassword", 10);
    expect(mockUserRepo.createUserPort).toHaveBeenCalledWith(
      expect.objectContaining({
        name: mockUser.name,
        email: mockUser.email,
        phone: mockUser.phone,
        password: "hashedPassword123",
        roles: mockUser.roles,
      }),
      mockTransactionManager
    );
    expect(result).toEqual(mockUser);
  });

  test("should throw an error if user already exists", async () => {
    (mockUserRepo.checkUserByEmailPort as jest.Mock).mockResolvedValue(true);

    await expect(
      userRegisterUseCase(
        "Jane Doe",
        "janedoe@example.com",
        "0987654321",
        "password123",
        "admin" as rolesFormat,
        mockUserRepo,
        mockTransactionManager
      )
    ).rejects.toThrow("User already exists with this email.");

    expect(mockUserRepo.checkUserByEmailPort).toHaveBeenCalledWith("janedoe@example.com", mockTransactionManager);
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(mockUserRepo.createUserPort).not.toHaveBeenCalled();
  });

  test("should throw an error if user insertion fails", async () => {
    (mockUserRepo.checkUserByEmailPort as jest.Mock).mockResolvedValue(false);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword123");
    (mockUserRepo.createUserPort as jest.Mock).mockResolvedValue(false);

    await expect(
      userRegisterUseCase(
        "John Doe",
        "johndoe@example.com",
        "1234567890",
        "plainTextPassword",
        "user" as rolesFormat,
        mockUserRepo,
        mockTransactionManager
      )
    ).rejects.toThrow("Database Error! User not inserted.");

    expect(mockUserRepo.checkUserByEmailPort).toHaveBeenCalledWith("johndoe@example.com", mockTransactionManager);
    expect(bcrypt.hash).toHaveBeenCalledWith("plainTextPassword", 10);
    expect(mockUserRepo.createUserPort).toHaveBeenCalled();
  });
});
