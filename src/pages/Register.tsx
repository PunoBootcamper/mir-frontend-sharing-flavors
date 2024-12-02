import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";

const registerSchema = yup.object({
  name: yup.string().required("Nombre es requerido"),
  lastName: yup.string().required("Apellido es requerido"),
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: Partial<User>) => {
    console.log("Datos enviados:", data);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#281B23] flex justify-center items-center px-4 py-8">
      {/* Formulario */}
      <div className="rounded-lg shadow-lg w-full max-w-lg p-6 space-y-6">
        {/* Título */}
        <h1 className="text-center text-2xl md:text-3xl font-semibold text-white">
          Registrarse
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo de nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Nombre:
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="name"
                  placeholder="Ingresa tu nombre"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  className="bg-white rounded-lg"
                />
              )}
            />
          </div>

          {/* Campo de apellido */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white"
            >
              Apellido:
            </label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="lastName"
                  placeholder="Ingresa tu apellido"
                  fullWidth
                  margin="normal"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
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
