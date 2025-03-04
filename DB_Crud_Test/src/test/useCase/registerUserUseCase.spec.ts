import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import bcrypt from "bcrypt";
import { EntityManager } from "typeorm";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { rolesFormat } from "../../infractructure/typeOrm/entities/userEntity.ts";
import { userRegisterUseCase } from "../../application/usecases/registerUserUseCase.ts";
import * as chai from "chai";
chai.use(chaiAsPromised);

describe("userRegisterUseCase", () => {
  let mockUserRepo: sinon.SinonStubbedInstance<UserRepositoryPort>;
  let mockTransactionManager: sinon.SinonStubbedInstance<EntityManager>;
  let bcryptHashStub: sinon.SinonStub;

  beforeEach(() => {
    mockUserRepo = {
      checkUserByEmailPort: sinon.stub(),
      createUserPort: sinon.stub(),
    } as unknown as sinon.SinonStubbedInstance<UserRepositoryPort>;

    mockTransactionManager =
      {} as unknown as sinon.SinonStubbedInstance<EntityManager>;

    bcryptHashStub = sinon.stub(bcrypt, "hash").resolves("hashed_password");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should successfully register a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      password: "plaintext_password",
      roles: "user" as rolesFormat,
    };

    mockUserRepo.checkUserByEmailPort.resolves(false);
    mockUserRepo.createUserPort.resolves(true);

    const newUser = await userRegisterUseCase(
      userData.name,
      userData.email,
      userData.phone,
      userData.password,
      userData.roles,
      mockUserRepo,
      mockTransactionManager
    );

    expect(newUser).to.include({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      roles: userData.roles,
    });
    expect(newUser.password).to.equal("hashed_password");
    expect(
      mockUserRepo.checkUserByEmailPort.calledWith(
        userData.email,
        mockTransactionManager
      )
    ).to.be.true;
    expect(mockUserRepo.createUserPort.calledOnce).to.be.true;
  });

  it("should throw an error if user already exists", async () => {
    mockUserRepo.checkUserByEmailPort.resolves(true);

    await expect(
      userRegisterUseCase(
        "John Doe",
        "existing@example.com",
        "1234567890",
        "plaintext_password",
        "user" as rolesFormat,
        mockUserRepo,
        mockTransactionManager
      )
    ).to.eventually.be.rejectedWith("User already exists with this email.");

    expect(mockUserRepo.createUserPort.notCalled).to.be.true;
  });

  it("should throw an error if database insertion fails", async () => {
    mockUserRepo.checkUserByEmailPort.resolves(false);
    mockUserRepo.createUserPort.resolves(false);

    await expect(
      userRegisterUseCase(
        "John Doe",
        "john@example.com",
        "1234567890",
        "plaintext_password",
        "user" as rolesFormat,
        mockUserRepo,
        mockTransactionManager
      )
    ).to.eventually.be.rejectedWith("Database Error! User not inserted.");

    expect(mockUserRepo.createUserPort.calledOnce).to.be.true;
  });
});
