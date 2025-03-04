import { Dispatch, ReactNode, SetStateAction } from "react";

export interface LangState {
  language: string;
}

export interface TokenState {
  token: string;
}

export interface RootState {
  lang: LangState;
}

export interface AuthState {
  auth: TokenState;
}

export interface LanguageOptionsProps {
  options: { [key: string]: string };
  onChange: (value: string) => void;
  selectedValue?: string;
}

export interface InputProps {
  htmlFor?: string;
  type: string;
  label?: string;
  id: string;
  placeholder: string;
  registerProps?: any;
}

export interface NewFormProps {
  onSubmit: (data: FormData) => void;
}

export interface AuthFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: string;
}

export interface ButtonPropsType {
  type?: "button" | "submit";
  text?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: string;
}

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoggedIn: boolean;
}

export interface UserContextProviderProps {
  children: ReactNode;
}

export interface RequireAuthProps {
  children?: ReactNode;
}
