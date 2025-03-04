import { rolesFormat } from "../../infractructure/typeOrm/entities/userEntity.ts";

// type of classes
type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: rolesFormat;
};

type Login = {
  id: number;
  email?: string;
  password: string;
  roles: string;
};

type getUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: rolesFormat;
};

type updateUserType = {
  id: string;
  name?: string;
  phone?: string;
  password?: string;
};

type deleteUser = {
  id: string;
  roles: string;
};

export { User, Login, getUser, updateUserType, deleteUser };
