//src/pages/Login.tsx
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "../interfaces/User";
import { useLoginMutation } from "../app/apis/compartiendoSabores.api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../app/store/authSlice";

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
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

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

  const onSubmit = async (data: UserCredentials) => {
    try {
      console.log("Datos enviados:", data);
      const response = await login(data).unwrap();

      console.log("Respuesta:", response);

      dispatch(loginSuccess(response));
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#281B23] flex flex-col items-center px-4">
      {/* Título */}
      <div className="text-center mt-16 font-cookie text-white">
        <h1 className="text-3xl md:text-5xl max-w-md">
          ¡Bienvenid@ a Compartiendo Sabores!
        </h1>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid place-items-center mt-8 p-4 w-full max-w-md"
      >
        {/* Campo de correo electrónico */}
        <div className="w-full mb-5">
          <label htmlFor="email" className="text-white mb-2 block text-left">
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
        <div className="w-full mb-10">
          <label htmlFor="password" className="text-white mb-2 block text-left">
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

        {/* Botón de iniciar sesión */}
        <div className="w-full mb-2">
          <button
            type="submit"
            className="w-full h-12 bg-[#D9C9A5] hover:bg-[#F47E68] text-black font-semibold rounded-lg transition-colors duration-300"
          >
            Iniciar Sesión
          </button>
        </div>

        {/* Botón de registrarse */}
        <div className="w-full mb-2">
          <button
            onClick={() => navigate("/register")}
            className="w-full h-12 bg-[#D9C9A5] hover:bg-[#F47E68] text-black font-semibold rounded-lg transition-colors duration-300"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}
