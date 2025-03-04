import { EntityManager } from "typeorm";
import { deleteUsers } from "../../application/usecases/deleteUsersUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";

describe("deleteUsers Use Case", () => {
  let mockUserRepo: jest.Mocked<UserRepositoryPort>;
  let mockTransactionManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockUserRepo = {
      getTargetUserPort: jest.fn(),
      deleteUserPort: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    mockTransactionManager = {} as unknown as jest.Mocked<EntityManager>;
    jest.clearAllMocks();
  });

  it("should successfully delete a user when authorized", async () => {
    mockUserRepo.getTargetUserPort.mockResolvedValue({
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      password: "hashedpassword123",
      roles: "user",
    });

    mockUserRepo.deleteUserPort.mockResolvedValue(true);

    await expect(
      deleteUsers(mockUserRepo, "2", 2, "user", mockTransactionManager)
    ).resolves.not.toThrow();

    expect(mockUserRepo.getTargetUserPort).toHaveBeenCalledWith(
      2,
      mockTransactionManager
    );
    expect(mockUserRepo.deleteUserPort).toHaveBeenCalledWith(
      2,
      mockTransactionManager
    );
  });

  it("should throw an error when the user ID is invalid", async () => {
    await expect(
      deleteUsers(mockUserRepo, "invalid", 2, "user", mockTransactionManager)
    ).rejects.toThrow("Invalid user ID: invalid");

    expect(mockUserRepo.getTargetUserPort).not.toHaveBeenCalled();
    expect(mockUserRepo.deleteUserPort).not.toHaveBeenCalled();
  });

  it("should throw an error if user does not exist", async () => {
    mockUserRepo.getTargetUserPort.mockResolvedValue(null);

    await expect(
      deleteUsers(mockUserRepo, "3", 3, "user", mockTransactionManager)
    ).rejects.toThrow("No user found with ID: 3");

    expect(mockUserRepo.getTargetUserPort).toHaveBeenCalledWith(
      3,
      mockTransactionManager
    );
    expect(mockUserRepo.deleteUserPort).not.toHaveBeenCalled();
  });

  it("should throw an error if a non-admin tries to delete another user's account", async () => {
    mockUserRepo.getTargetUserPort.mockResolvedValue({
      id: 3,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "9876543210",
      password: "hashedpassword456",
      roles: "user",
    });

    await expect(
      deleteUsers(mockUserRepo, "3", 2, "user", mockTransactionManager)
    ).rejects.toThrow("Unauthorized: You can only delete your own account.");

    expect(mockUserRepo.getTargetUserPort).toHaveBeenCalledWith(
      3,
      mockTransactionManager
    );
    expect(mockUserRepo.deleteUserPort).not.toHaveBeenCalled();
  });

  it("should throw an error if an admin tries to delete another admin account", async () => {
    mockUserRepo.getTargetUserPort.mockResolvedValue({
      id: 4,
      name: "Admin User",
      email: "admin@example.com",
      phone: "5678901234",
      password: "hashedpassword789",
      roles: "admin",
    });

    await expect(
      deleteUsers(mockUserRepo, "4", 1, "admin", mockTransactionManager)
    ).rejects.toThrow(
      "Unauthorized: Admin cannot delete another admin account."
    );

    expect(mockUserRepo.getTargetUserPort).toHaveBeenCalledWith(
      4,
      mockTransactionManager
    );
    expect(mockUserRepo.deleteUserPort).not.toHaveBeenCalled();
  });

  it("should throw an error if deleteUserPort fails", async () => {
    mockUserRepo.getTargetUserPort.mockResolvedValue({
      id: 5,
      name: "Failed User",
      email: "failed@example.com",
      phone: "2223334445",
      password: "hashedpassword000",
      roles: "user",
    });

    mockUserRepo.deleteUserPort.mockResolvedValue(false);

    await expect(
      deleteUsers(mockUserRepo, "5", 5, "user", mockTransactionManager)
    ).rejects.toThrow("Failed to delete user with ID: 5");

    expect(mockUserRepo.getTargetUserPort).toHaveBeenCalledWith(
      5,
      mockTransactionManager
    );
    expect(mockUserRepo.deleteUserPort).toHaveBeenCalledWith(
      5,
      mockTransactionManager
    );
  });
});
