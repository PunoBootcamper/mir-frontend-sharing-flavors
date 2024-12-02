import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "../interfaces/User";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .required("Correo es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida"),
});

export default function Login() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentials>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: UserCredentials) => {
    console.log("Datos enviados:", data);
    // Aquí iría la lógica para iniciar sesión
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo de correo electrónico */}
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
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
              />
            )}
          />
        </div>

        {/* Campo de contraseña */}
        <div>
          <label htmlFor="password">Contraseña:</label>
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
              />
            )}
          />
        </div>

        {/* Botón de iniciar sesión */}
        <div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar Sesión
          </Button>
        </div>

        {/* Botón de registrarse */}
        <div>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/register")}
          >
            Registrarse
          </Button>
        </div>
      </form>
    </div>
  );
}
