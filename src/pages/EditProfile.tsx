import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { User } from "../interfaces";

import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../app/apis/compartiendoSabores.api";

import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../services/cloudinary";

const EditProfile = () => {
  const isUserAuthenticated = localStorage.getItem("user");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);
  const { data, isSuccess } = useGetUserByIdQuery(userCredentials._id);
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  const [form, setForm] = useState<Partial<User>>({
    first_name: "",
    last_name: "",
    phone_number: "",
    description: "",
    photo_url: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onInputChange = (value: string, field: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleUserUpdate = async () => {
    // Validaciones para evitar campos vacíos
    if (!form.first_name || !form.last_name || !form.phone_number) {
      setErrorMessage(
        "Por favor, completa los campos de Nombre, Apellido y Contacto.",
      );
      return;
    }

    try {
      await updateUser({ ...form, _id: userCredentials._id }).unwrap();
      navigate("/home");
    } catch (error) {
      setErrorMessage("Hubo un error al guardar los datos.");
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const showWidgetPhotoUser = async () => {
    try {
      const inputFile = document.createElement("input");
      inputFile.type = "file";
      inputFile.accept = "image/*";

      inputFile.onchange = async (event: Event) => {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (!file) return;

        try {
          const uploadedImageUrl = await uploadImageToCloudinary(file);
          console.log("Uploaded Image URL:", uploadedImageUrl);
          onInputChange(uploadedImageUrl, "photo_url");
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

      inputFile.click();
    } catch (error) {
      console.error("Error in showWidgetPhotoUser:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setForm({
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        phone_number: data?.phone_number || "",
        description: data?.description || "",
        photo_url: data?.photo_url || "",
      });
    }
  }, [isSuccess, data]);

  return (
    <div className="min-h-screen bg-[#281b23] p-4 sm:p-8">
      <div className="flex justify-between items-center">
        <Button
          variant="contained"
          className="bg-[#d12942] w-28 h-10 hover:bg-[#7d1928] text-sm"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          className="bg-[#46d243] w-28 h-10 hover:bg-[#278126] text-sm"
          onClick={handleUserUpdate}
        >
          Guardar
        </Button>
      </div>

      <div className="my-8 flex flex-col items-center">
        <Avatar
          className="w-24 h-24 border border-white mb-4"
          alt={data?.first_name}
          src={form?.photo_url}
        />
        <Button
          variant="text"
          className="text-white border border-gray-400 hover:bg-white hover:text-[#281b23] text-sm"
          onClick={showWidgetPhotoUser}
        >
          <AddIcon className="mr-2 text-sm" />
          Editar foto
        </Button>
      </div>

      <hr className="border-gray-400 my-8" />

      <div className="text-white text-sm sm:text-lg">
        <div className="space-y-6 px-6 sm:px-20">
          {errorMessage && (
            <div className="bg-red-600 text-white p-2 rounded-md text-center mb-4">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="w-1/3">Correo</p>
            <TextField
              className="w-2/3 bg-transparent"
              value={data?.email || ""}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#FFFFFF",
                  WebkitTextFillColor: "#FFFFFF",
                },
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="w-1/3">Nombre</p>
            <div className="w-2/3">
              <div className="border border-gray-400 rounded-lg p-2">
                <input
                  type="text"
                  className="w-full bg-transparent text-white outline-none"
                  onChange={({ target }) =>
                    onInputChange(target.value, "first_name")
                  }
                  value={form?.first_name}
                />
              </div>
              {errorMessage && !form?.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  Este campo es obligatorio.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="w-1/3">Apellido</p>
            <div className="w-2/3">
              <div className="border border-gray-400 rounded-lg p-2">
                <input
                  type="text"
                  className="w-full bg-transparent text-white outline-none"
                  onChange={({ target }) =>
                    onInputChange(target.value, "last_name")
                  }
                  value={form.last_name}
                />
              </div>
              {errorMessage && !form?.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  Este campo es obligatorio.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="w-1/3">Contacto</p>
            <div className="w-2/3">
              <div className="border border-gray-400 rounded-lg p-2">
                <input
                  type="text"
                  className="w-full bg-transparent text-white outline-none"
                  onChange={({ target }) =>
                    onInputChange(target.value, "phone_number")
                  }
                  value={form.phone_number}
                />
              </div>
              {errorMessage && !form?.phone_number && (
                <p className="text-red-500 text-xs mt-1">
                  Este campo es obligatorio.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="w-1/3">Descripción</p>
            <div className="w-2/3">
              <div className="border border-gray-400 rounded-lg p-2">
                <textarea
                  className="w-full bg-transparent text-white outline-none resize-none"
                  rows={4}
                  onChange={({ target }) =>
                    onInputChange(target.value, "description")
                  }
                  value={form.description}
                ></textarea>
              </div>
              {errorMessage && !form?.description && (
                <p className="text-red-500 text-xs mt-1">
                  Este campo es obligatorio.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
