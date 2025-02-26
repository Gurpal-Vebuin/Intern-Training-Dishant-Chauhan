import React from "react";
import { InputValue } from "../../atoms/Input/InputValue";
import useLanguage from "../../../hooks/useLanguage";
import { FormWrapper } from "../../styles/form/FormStyles";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../../../data/models/registerSchema";
import { ErrorMessage, LabelWrapper } from "../../styles/form/InputStyles";
import { StyledOption, StyledSelect } from "../../styles/select/SelectStyles";
import { NewFormProps, FormData } from "../../../types/interfaces/interface";
import { useNavigate } from "react-router-dom";
import { Links } from "../../../types/constants/Links/Links";

const NewUserForm: React.FC<NewFormProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: joiResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      roles: "user",
    },
  });

  const selectedRole = watch("roles");

  return (

      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <h2>{t("Register")}</h2>

        <InputValue
          htmlFor="name"
          type="text"
          label={t("Form.Name")}
          id="name"
          placeholder={t("NamePlaceholder")}
          registerProps={register("name")}
          />

        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

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
          htmlFor="phone"
          type="text"
          label={t("Form.Phone")}
          id="phone"
          placeholder={t("PhonePlaceholder")}
          registerProps={register("phone")}
          />
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

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

        <LabelWrapper htmlFor="roles">{t("Form.Roles")}</LabelWrapper>
        <StyledSelect
          id="roles"
          {...register("roles")}
          value={selectedRole}
          onChange={(e) => {
            setValue("roles", e.target.value);
            trigger("roles");
          }}
          >
          <StyledOption value="user">{t("Form.User")}</StyledOption>
          <StyledOption value="admin">{t("Form.Admin")}</StyledOption>
        </StyledSelect>
        {errors.roles && <ErrorMessage>{errors.roles.message}</ErrorMessage>}

        <div>
          <button type="submit">{t("Register")}</button>
          <p>
            {t("Registered")}{" "}
            <span onClick={() => navigate(`${Links.HOME}`)}>{t("Login")}</span>
          </p>
        </div>
      </FormWrapper>
    
  );
};

export default NewUserForm;
