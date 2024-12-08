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

  const onInputChange = (value: string, field: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleUserUpdate = async () => {
    try {
      await updateUser({ ...form, _id: userCredentials._id }).unwrap();
      navigate("/home");
    } catch (error) {
      alert(JSON.stringify(error));
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
    <>
      <div className="min-h-screen bg-[#281b23] p-8">
        <div className="flex justify-between">
          <Button
            variant="contained"
            className="bg-[#d12942] w-32 h-10 hover:bg-[#7d1928]"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            className="bg-[#46d243] w-32 h-10 hover:bg-[#278126]"
            onClick={handleUserUpdate}
          >
            Guardar
          </Button>
        </div>
        <div className="my-10">
          <div className="flex flex-col items-center">
            <Avatar
              className="w-32 h-32 border border-white my-6"
              alt={data?.first_name}
              src={form?.photo_url}
            />
            <Button
              variant="text"
              className="text-white border border-gray-400 hover:bg-white hover:text-[#281b23]"
            >
              <AddIcon className="mr-2" />
              <div className="cursor-pointer" onClick={showWidgetPhotoUser}>
                Editar foto
              </div>
            </Button>
          </div>
          <hr className="border-gray-400 my-8" />
          <div className="text-white text-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <p className="w-1/5">Correo</p>
                  <TextField
                    className="w-4/5 bg-transparent"
                    disabled
                    id="outlined-disabled"
                    value={data?.email || ""}
                    sx={{
                      "& .MuiInputBase-root.Mui-disabled": {
                        "& > fieldset": { opacity: 0 },
                      },
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <p className="w-1/5">Nombre</p>
                  <div className="w-4/5 border border-gray-400 rounded-lg p-2">
                    <input
                      type="text"
                      className="w-full bg-transparent text-white outline-none"
                      onChange={({ target }) =>
                        onInputChange(target.value, "first_name")
                      }
                      value={form?.first_name}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="w-1/5">Apellido</p>
                  <div className="w-4/5 border border-gray-400 rounded-lg p-2">
                    <input
                      type="text"
                      className="w-full bg-transparent text-white outline-none"
                      onChange={({ target }) =>
                        onInputChange(target.value, "last_name")
                      }
                      value={form.last_name}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="w-1/5">Contacto</p>
                  <div className="w-4/5 border border-gray-400 rounded-lg p-2">
                    <input
                      type="text"
                      className="w-full bg-transparent text-white outline-none"
                      placeholder="Opcional..."
                      onChange={({ target }) =>
                        onInputChange(target.value, "phone_number")
                      }
                      value={form.phone_number}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="w-1/5">Descripción</p>
                  <div className="w-4/5 border border-gray-400 rounded-lg p-2">
                    <textarea
                      className="w-full bg-transparent text-white outline-none resize-none"
                      rows={4}
                      onChange={({ target }) =>
                        onInputChange(target.value, "description")
                      }
                      value={form.description}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
