import { EntityManager } from "typeorm";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { updateUserType } from "../../domain/models/user.ts";
import { updateUser } from "../../application/usecases/updateUserUseCase.ts";

describe("updateUser Use Case", () => {
  let mockUserRepo: jest.Mocked<UserRepositoryPort>;
  let mockTransactionManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockUserRepo = {
      checkUserByIdPort: jest.fn(),
      updateUserPort: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    mockTransactionManager = {} as unknown as jest.Mocked<EntityManager>;

    jest.clearAllMocks();
  });

  it("should update user successfully when authorized", async () => {
    const user: updateUserType = {
      id: "1",
      name: "Test User Updated",
      phone: "9893333432",
      password: "dummy232",
    };
    const id = 1;

    mockUserRepo.checkUserByIdPort.mockResolvedValue(true); // checkUserByIdPort returns boolean
    mockUserRepo.updateUserPort.mockResolvedValue(true);

    await expect(
      updateUser(user, id, mockUserRepo, mockTransactionManager)
    ).resolves.not.toThrow();

    expect(mockUserRepo.checkUserByIdPort).toHaveBeenCalledWith(
      "1",
      mockTransactionManager
    );
    expect(mockUserRepo.updateUserPort).toHaveBeenCalledWith(
      user,
      mockTransactionManager
    );
  });

  it("should throw an error if user ID does not exist", async () => {
    const user: updateUserType = {
      id: "1",
      name: "Test User Updated",
      phone: "9893333432",
      password: "dummy232",
    };
    const id = 1;

    mockUserRepo.checkUserByIdPort.mockResolvedValue(false); // Returns boolean, not null

    await expect(
      updateUser(user, id, mockUserRepo, mockTransactionManager)
    ).rejects.toThrow("Id does not exists to update!");

    expect(mockUserRepo.checkUserByIdPort).toHaveBeenCalledWith(
      "1",
      mockTransactionManager
    );
    expect(mockUserRepo.updateUserPort).not.toHaveBeenCalled();
  });

  it("should throw an error if trying to update another user's data", async () => {
    const user: updateUserType = {
      id: "2",
      name: "Test User Updated",
      phone: "9893333432",
      password: "dummy232",
    };
    const id = 1;

    mockUserRepo.checkUserByIdPort.mockResolvedValue(true); // ID exists

    await expect(
      updateUser(user, id, mockUserRepo, mockTransactionManager)
    ).rejects.toThrow(
      "Unauthorized You can only update your own account only."
    );

    expect(mockUserRepo.checkUserByIdPort).toHaveBeenCalledWith(
      "2",
      mockTransactionManager
    );
    expect(mockUserRepo.updateUserPort).not.toHaveBeenCalled();
  });

  it("should throw an error if updateUserPort fails", async () => {
    const user: updateUserType = {
      id: "1",
      name: "Test User Updated",
      phone: "9893333432",
      password: "dummy232",
    };
    const id = 1;

    mockUserRepo.checkUserByIdPort.mockResolvedValue(true);
    mockUserRepo.updateUserPort.mockResolvedValue(false);

    await expect(
      updateUser(user, id, mockUserRepo, mockTransactionManager)
    ).rejects.toThrow("Error Occurred while updating the given user.");

    expect(mockUserRepo.checkUserByIdPort).toHaveBeenCalledWith(
      "1",
      mockTransactionManager
    );
    expect(mockUserRepo.updateUserPort).toHaveBeenCalledWith(
      user,
      mockTransactionManager
    );
  });
});
