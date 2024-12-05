//src/pages/Login.tsx
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "../interfaces/User";
import { useLoginMutation } from "../app/apis/compartiendoSabores.api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../app/store/authSlice";
import MyButton from "../componentes/ui/Button/LoadingButton";
import CommonButton from "../componentes/ui/Button/CommonButton";
import { loginSchema } from "../utils/yupSchemas";

export default function Login() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
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
    <div className="min-h-screen bg-primary flex flex-col items-center px-4">
      {/* Título */}
      <div className="text-center mt-16 font-cookie text-white">
        <h1 className="font-cookie text-3xl md:text-5xl max-w-md">
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
          <MyButton isLoading={isLoading} text="Iniciar Sesión" />
        </div>

        {/* Botón de registrarse */}
        <div className="w-full mb-2">
          <CommonButton
            text="Registrarse"
            onClick={() => navigate("/register")}
          />
        </div>
      </form>
    </div>
  );
}
