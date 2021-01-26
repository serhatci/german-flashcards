const yup = require("yup");

export const loginValSchema = yup.object().shape({
  email: yup
    .string()
    .email("Don't worry, you can do it! just try a valid email!")
    .required("How can we register you without an Email?"),
  password: yup
    .string()
    .min(4, "A longer pass would be better idea :)")
    .max(50, "Come on!... Keep it shorter!..")
    .required(
      "Provide a valid pass! Otherwise we will automatically assign you -123456- and share it on twitter!"
    ),
});

export const signupValSchema = yup.object().shape({
  nickname: yup
    .string()
    .required("Without a nickname you will be boring..")
    .max(40, "What?.. Find something shorter or you are out.. "),
  email: yup
    .string()
    .email("Don't worry, you can do it! just try a valid email!")
    .required("How can we register you without an Email?"),
  password: yup
    .string()
    .min(4, "A longer pass would be better idea :)")
    .max(50, "Come on!... Keep it shorter!..")
    .required(
      "Provide a valid pass! Otherwise we will automatically assign you -123456- and share it on twitter!"
    ),
});
