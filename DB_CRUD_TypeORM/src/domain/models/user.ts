// type of classes
type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: string;
};

type Login = {
  id: number;
  password: string;
  roles: string;
};

type getUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: string;
};

type updateUser = {
  id: string;
  name?: string;
  phone?: string;
  password?: string;
};

type deleteUser = {
  id: string;
  roles: string;
};

type tokenUser = {
  id: string;
};
export { User, Login, getUser, updateUser, deleteUser, tokenUser };
