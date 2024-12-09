import * as yup from "yup";
export const registerSchema = yup.object({
  first_name: yup.string().required("Nombre es requerido"),
  last_name: yup.string().required("Apellido es requerido"),
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .required("Correo es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Las contraseñas no coinciden")
    .required("Confirmar contraseña es requerido"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .required("Correo es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida"),
});

export const recipeSchema = yup.object().shape({
  title: yup
    .string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
  ingredients: yup
    .array()
    .of(
      yup.object({
        ingredientsName: yup
          .string()
          .required("Cada ingrediente es obligatorio"),
      }),
    )
    .min(1, "Debe haber al menos un ingrediente")
    .required("Los ingredientes son obligatorios"),
  procedure: yup
    .array()
    .of(
      yup.object({
        stepName: yup.string().required("Cada paso es obligatorio"),
      }),
    )
    .min(1, "Debe haber al menos un paso")
    .required("Los pasos son obligatorios"),
  category: yup.string().required("La categoría es obligatoria"),
  image: yup
    .mixed<File>()
    .required("La imagen es obligatoria")
    .test(
      "fileType",
      "Solo se permiten imágenes (jpeg, png, gif)",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/gif"].includes(
            (value as File).type,
          )),
    ),
});

export const EditRecipeSchema = yup.object().shape({
  title: yup
    .string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
  ingredients: yup
    .array()
    .of(
      yup.object({
        ingredientsName: yup
          .string()
          .required("Cada ingrediente es obligatorio"),
      }),
    )
    .min(1, "Debe haber al menos un ingrediente")
    .required("Los ingredientes son obligatorios"),
  procedure: yup
    .array()
    .of(
      yup.object({
        stepName: yup.string().required("Cada paso es obligatorio"),
      }),
    )
    .min(1, "Debe haber al menos un paso")
    .required("Los pasos son obligatorios"),
  category: yup.string().required("La categoría es obligatoria"),
  image: yup
    .mixed<File>()
    .test(
      "fileType",
      "Solo se permiten imágenes (jpeg, png, gif)",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/gif"].includes(
            (value as File).type,
          )),
    ), // Campo auxiliar para manejar imágenes existentes
});
