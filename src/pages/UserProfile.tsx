import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import CallIcon from "@mui/icons-material/Call";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { CustomTabPanel } from "../componentes/profile/CustomTabPanel";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateChatMutation,
  useGetRecipesQuery,
  useGetUserByIdQuery,
} from "../app/apis/compartiendoSabores.api";

const UserProfile = () => {
  const [value, setValue] = useState(0);
  const isUserAuthenticated = localStorage.getItem("user");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);
  const { id } = useParams();

  const isOwnProfile = id ? id === userCredentials._id : true;
  const { data: user } = useGetUserByIdQuery(
    isOwnProfile ? userCredentials._id : id,
  );
  const { data: recipes } = useGetRecipesQuery();
  const [createChat, { isLoading }] = useCreateChatMutation();
  const isCompanyAccount = user?.role === "Empresa";
  const myRecipes = recipes?.filter((recipe) => recipe.user_id === user?._id);
  const myFavoriteRecipes = recipes?.filter((recipe) =>
    user?.favorites.includes(recipe._id),
  );
  const navigate = useNavigate();

  const handleOpenChat = async () => {
    try {
      await createChat({
        owner_id: userCredentials._id,
        friend_id: id || "",
      }).unwrap();
      navigate("/chats");
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <div className="bg-[#281b23] text-white min-h-screen p-6 md:p-12">
      {/* Encabezado con botón volver y editar */}
      <div className="flex items-center justify-between mb-8">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowBackIcon className="text-3xl" />
        </div>
        {isOwnProfile && (
          <div
            className="cursor-pointer"
            onClick={() => navigate("/edit-profile")}
          >
            <EditIcon className="text-2xl" />
          </div>
        )}
      </div>

      {/* Información principal del usuario */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-8">
        <div className="flex flex-col items-center justify-center">
          <Avatar
            className="border border-white w-36 h-36"
            alt={user?.first_name}
            src={user?.photo_url}
          />
          <h3 className="mt-4 text-2xl font-semibold flex items-center">
            {user?.first_name} {user?.last_name}
            {isCompanyAccount && (
              <span className="text-gray-400 text-sm ml-2 font-medium">
                (Empresa/Negocio)
              </span>
            )}
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/10 rounded p-4">
          <h2 className="text-xl mb-2">Recetas Compartidas</h2>
          <h2 className="text-4xl text-gray-100">{myRecipes?.length ?? 0}</h2>
        </div>
      </div>

      {/* Botón para enviar mensaje si no es tu perfil */}
      {!isOwnProfile && (
        <div className="mt-6 flex justify-start">
          <Button
            variant="contained"
            className="bg-green-600 text-white hover:bg-white hover:text-green-600 text-base h-10 flex items-center justify-center gap-2"
            onClick={handleOpenChat}
            disabled={isLoading}
          >
            <p>Enviar mensaje</p>
            <SendIcon />
          </Button>
        </div>
      )}

      {/* Descripción del usuario */}
      <p className="mt-6 text-lg">{user?.description}</p>

      {/* Info de contacto si es empresa */}
      {isCompanyAccount && user?.phone_number && (
        <div className="mt-4 flex items-center gap-2">
          <CallIcon className="text-xl" />
          <p className="text-lg">{user.phone_number}</p>
        </div>
      )}

      {/* Tabs de publicaciones y favoritos */}
      <div className="mt-8">
        <Tabs
          value={value}
          onChange={(_event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
          }}
          className="text-gray-400 [&_.MuiTabs-indicator]:bg-gray-400"
        >
          <Tab
            label="Publicaciones"
            sx={{
              color: value === 1 ? "white" : "gray",
              "&:hover": { color: "blue" },
            }}
          />
          {isOwnProfile && (
            <Tab
              label="Favoritos"
              sx={{
                color: value === 1 ? "white" : "gray",
                "&:hover": { color: "blue" },
              }}
            />
          )}
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
            {myRecipes?.length ? (
              myRecipes.map((item) => (
                <ImageListItem
                  key={item._id}
                  className="cursor-pointer hover:opacity-90 transition"
                  onClick={() => navigate(`/recipe/${item._id}`)}
                >
                  <div className="flex flex-col items-center">
                    {/* Imagen con dimensiones uniformes */}
                    <img
                      className="rounded-lg w-40 h-40 object-cover"
                      src={item.images[0]}
                      alt={item.title}
                    />
                    {/* Contenedor con ancho fijo */}

                    <div className="w-40 flex justify-between items-center mt-2">
                      <p className="text-sm">{item.title}</p>
                      <div
                        className="cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/edit-recipe/${item._id}`);
                        }}
                      >
                        {" "}
                        {isOwnProfile && <EditIcon className="text-2xl" />}
                      </div>
                    </div>
                  </div>
                </ImageListItem>
              ))
            ) : (
              <p>No se han agregado recetas</p>
            )}
          </div>
        </CustomTabPanel>
        {isOwnProfile && (
          <CustomTabPanel value={value} index={1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
              {myFavoriteRecipes?.length ? (
                myFavoriteRecipes.map(({ images, _id, title }) => (
                  <ImageListItem
                    key={_id}
                    className="cursor-pointer hover:opacity-90 transition"
                    onClick={() => navigate(`/recipe/${_id}`)}
                  >
                    <div className="flex flex-col items-center">
                      {/* Imagen con dimensiones uniformes */}
                      <img
                        src={images[0]}
                        alt={title}
                        className="rounded-lg w-40 h-40 object-cover"
                      />
                      {/* Título o contenido adicional con ancho fijo */}
                      <div className="w-40 mt-2 text-center">
                        <p className="text-sm font-medium">{title}</p>
                      </div>
                    </div>
                  </ImageListItem>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center mt-4 gap-2">
                  <img
                    src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                    alt="No images available"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <p className="text-center text-lg">No tienes favoritos aún</p>
                </div>
              )}
            </div>
          </CustomTabPanel>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
