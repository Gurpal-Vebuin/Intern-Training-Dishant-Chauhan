import { toast } from "react-toastify";
import { FormData } from "../../../../types/interfaces/interface";
import UseAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Links } from "../../../../types/constants/Links/Links";
import NewUserForm from "../../../molecules/form/NewUserForm";

const RegisterForm = () => {
    const { register } = UseAuth();
    const navigate = useNavigate();

    const handleRegister = async (data: FormData) => {
      const response = await register(data);

      if (response.success) {
        toast.success(`${response.data} Please Login!`);
        navigate(`${Links.HOME}`);
      } else {
        toast.error(`Registration Failed: ${response.error}`);
      }
    };

  return (
    <>
      <NewUserForm onSubmit={handleRegister} />
    </>
  );
};

export default RegisterForm;
