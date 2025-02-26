import React from "react";
import { InputValue } from "../../atoms/Input/InputValue";
import useLanguage from "../../../hooks/useLanguage";
import { FormWrapper, LoginWrapper } from "../../styles/form/FormStyles";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ErrorMessage } from "../../styles/form/InputStyles";
import {
  AuthFormProps,
  LoginFormData,
} from "../../../types/interfaces/interface";
import { loginSchema } from "../../../data/models/loginSchema";
import { Links } from "../../../types/constants/Links/Links";
import { useNavigate } from "react-router-dom";

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: joiResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <LoginWrapper>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <h2>{t("Login")}</h2>

        <InputValue
          htmlFor="email"
          type="email"
          label={t("Form.Email")}
          id="email"
          placeholder={t("EmailPlaceholder")}
          registerProps={register("email")}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <InputValue
          htmlFor="password"
          type="password"
          label={t("Form.Password")}
          id="password"
          placeholder={t("PasswordPlaceholder")}
          registerProps={register("password")}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <button type="submit">{t("Login")}</button>
        <p>
          {t("Not Registered")}{" "}
          <span onClick={() => navigate(`${Links.REGISTER}`)}>
            {t("Register")}
          </span>
        </p>
      </FormWrapper>
    </LoginWrapper>
  );
};

export default AuthForm;
