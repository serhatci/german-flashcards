import * as yup from "yup";

export const LoginValSchema = yup.object().shape({
  email: yup.string().email("*Invalid Email").required("*Email Required"),
  password: yup
    .string()
    .min(4, "*Password too Short")
    .max(50, "Come on!... Keep it shorter!..")
    .required("*Password Required"),
});

export const SignupValSchema = yup.object().shape({
  email: yup.string().email("*Invalid Email").required("*Email Required"),
  password: yup
    .string()
    .min(4, "*Password too Short")
    .max(50, "Come on!.. Keep it shorter!..")
    .required("*Password Required"),
  passconfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "*Passwords must match")
    .required("*Required"),
});

export const resetPasswordValSchema = yup.object().shape({
  email: yup.string().email("*Invalid Email").required("*Email Required"),
});
