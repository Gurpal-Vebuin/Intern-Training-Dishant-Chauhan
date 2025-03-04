import AuthForm from "../../../molecules/form/AuthForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../../../hooks/useAuth";
import { Links } from "../../../../types/constants/Links/Links";
import { LoginFormData } from "../../../../types/interfaces/interface";
import { useDispatch } from "react-redux";
import { setToken } from "../../../../redux/features/slices/AuthSlice";

const LoginForm = () => {
  const { login } = UseAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data: LoginFormData) => {
    const response = await login(data);

    if (response.success) {
      dispatch(setToken(response.token));
      toast.success(`${response.data}`);
      navigate(`${Links.PROFILE}`);
    } else {
      toast.error(`Login Failed: ${response.error}`);
    }
  };
  return <AuthForm onSubmit={handleLogin} />;
};

export default LoginForm;
