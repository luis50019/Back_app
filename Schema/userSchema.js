import zod from "zod";

const userSchemaRegister = zod.object({
  name: zod
    .string({
      message: "El formato del nombre no es correcto",
    })
    .min(4, { message: "El nombre debe tener almenos 3 caracteres" }),
  email: zod
    .string({ message: "El formato del email no es correcto" })
    .email({ message: "El email no es valido" }),
  password: zod
    .string({ message: "El formato de la contraseña no es correcto" })
    .min(8, { message: "La contraseña debe de tener minimo 8 caracteres" }),
});

const userSchemaLogin = zod.object({
  email: zod
    .string({ message: "El formato del email no es correcto" })
    .email({ message: "El email no es valido" }),
  password: zod
    .string({ message: "El formato de la contraseña no es correcto" })
    .min(8, { message: "La contraseña debe de tener minimo 8 caracteres" }),
});

export const validateUserRegister = (data) => {
  return userSchemaRegister.safeParse(data);
};

export const validateUserLogin = (data) => {
  return userSchemaLogin.safeParse(data);
};
