import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import { useCreateUserMutation } from "../app/apis/compartiendoSabores.api";

const registerSchema = yup.object({
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

export default function Register() {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: Partial<User>) => {
    try {
      data.role = "USER";
      console.log("Datos enviados:", data);
      await createUser(data).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#281B23] flex justify-center items-center px-4 py-8">
      {/* Formulario */}
      <div className="rounded-lg shadow-lg w-full max-w-lg p-6 space-y-6">
        {/* Título */}
        <h1 className="font-cookie text-center text-2xl md:text-3xl font-semibold text-white">
          Registrarse
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo de nombre */}
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-white"
            >
              Nombre:
            </label>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="name"
                  placeholder="Ingresa tu nombre"
                  fullWidth
                  margin="normal"
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                  className="bg-white rounded-lg"
                />
              )}
            />
          </div>

          {/* Campo de apellido */}
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-white"
            >
              Apellido:
            </label>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="last_name"
                  placeholder="Ingresa tu apellido"
                  fullWidth
                  margin="normal"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                  className="bg-white rounded-lg"
                />
              )}
            />
          </div>

          {/* Campo de correo electrónico */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Correo Electrónico:
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Ingresa tu correo"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  className="bg-white rounded-lg"
                />
              )}
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Contraseña:
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  className="bg-white rounded-lg"
                />
              )}
            />
          </div>

          {/* Campo de confirmar contraseña */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirmar Contraseña:
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  fullWidth
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  className="bg-white rounded-lg"
                />
              )}
            />
          </div>

          {/* Botón de registrarse */}
          <button
            type="submit"
            className="w-full py-3 bg-[#D9C9A5] hover:bg-[#F47E68] text-black font-semibold rounded-lg transition-all duration-300"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
