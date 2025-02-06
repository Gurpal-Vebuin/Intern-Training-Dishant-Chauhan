// type of classes
type User = {
  name: string;
  email: string;
  phone: number;
  password: string;
  roles: string;
};

type Login = {
  email: string;
  password: string;
  roles: string;
};

type getUser = {
  email: string;
  roles: string;
};

type updateUser = {
  id: string;
  name?: string;
  phone?: number;
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
