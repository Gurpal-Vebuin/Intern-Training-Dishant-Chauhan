import { EntityManager } from "typeorm";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { getUser, User } from "../../domain/models/user.ts";
import { getUsers } from "../../application/usecases/getUserUseCase.ts";

describe("getUsers Use Case", () => {
  let mockUserRepo: jest.Mocked<UserRepositoryPort>;
  let mockTransactionManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockUserRepo = {
      getAllUsersPort: jest.fn(),
      getTargetUserPort: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    mockTransactionManager = {} as unknown as jest.Mocked<EntityManager>;
    jest.clearAllMocks();
  });

  it("should return all users when the user is an admin", async () => {
    const users: getUser[] = [
      {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        phone: "1234567890",
        password: "hashedpassword",
        roles: "admin",
      },
      {
        id: 2,
        name: "Regular User",
        email: "user@example.com",
        phone: "0987654321",
        password: "hashedpassword",
        roles: "user",
      },
    ];

    mockUserRepo.getAllUsersPort.mockResolvedValue(users);

    const result = await getUsers(
      1,
      "admin",
      mockUserRepo,
      mockTransactionManager,
      "true"
    );

    expect(result).toEqual(users);
    expect(mockUserRepo.getAllUsersPort).toHaveBeenCalledWith(
      mockTransactionManager
    );
    expect(mockUserRepo.getTargetUserPort).not.toHaveBeenCalled();
  });

  it("should return a specific user when the user is not an admin", async () => {
    const user: getUser = {
      id: 2,
      name: "Regular User",
      email: "user@example.com",
      phone: "0987654321",
      password: "hashedpassword",
      roles: "user",
    };

    mockUserRepo.getTargetUserPort.mockResolvedValue(user);

    const result = await getUsers(
      2,
      "user",
      mockUserRepo,
      mockTransactionManager
    );

    expect(result).toEqual(user);
    expect(mockUserRepo.getTargetUserPort).toHaveBeenCalledWith(
      2,
      mockTransactionManager
    );
    expect(mockUserRepo.getAllUsersPort).not.toHaveBeenCalled();
  });

  it("should return null if the requested user is not found", async () => {
    mockUserRepo.getTargetUserPort.mockResolvedValue(null);

    const result = await getUsers(
      99,
      "user",
      mockUserRepo,
      mockTransactionManager
    );

    expect(result).toBeNull();
    expect(mockUserRepo.getTargetUserPort).toHaveBeenCalledWith(
      99,
      mockTransactionManager
    );
    expect(mockUserRepo.getAllUsersPort).not.toHaveBeenCalled();
  });
});
