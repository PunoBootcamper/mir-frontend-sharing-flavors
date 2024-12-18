import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import { useCreateUserMutation } from "../app/apis/compartiendoSabores.api";
import MyButton from "../componentes/ui/Button/LoadingButton";
import { registerSchema } from "../utils/yupSchemas";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();
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
      await createUser(data).unwrap();
      toast.success("Usuario creado exitosamente");
      navigate("/login");
    } catch (error) {
      toast.error("Error al crear el usuario");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex justify-center items-center px-4 py-8">
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
          <MyButton isLoading={isLoading} text="Registrarse" />
        </form>
      </div>
    </div>
  );
}
