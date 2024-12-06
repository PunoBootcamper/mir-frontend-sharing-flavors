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
    <div className="bg-[#281b23] text-white p-12 min-h-screen">
      <div className="absolute top-6 left-8 cursor-pointer">
        <ArrowBackIcon className="text-3xl" onClick={() => navigate(-1)} />
      </div>
      {isOwnProfile && (
        <div
          className="absolute top-6 right-8 cursor-pointer"
          onClick={() => navigate("/edit-profile")}
        >
          <EditIcon className="text-2xl" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-8 mx-10">
        <div className="flex flex-col items-center">
          <Avatar
            className="border border-white w-36 h-36"
            alt={user?.first_name}
            src={user?.photo_url}
          />
          <h3 className="mt-2 text-2xl font-semibold">
            {user?.first_name} {user?.last_name}
            {isCompanyAccount && (
              <span className="text-gray-400 text-sm ml-2 font-medium">
                Empresa/Negocio
              </span>
            )}
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl">Recetas Compartidas</h2>
          <h2 className="text-4xl text-gray-400">{myRecipes?.length}</h2>
        </div>
      </div>
      {!isOwnProfile && (
        <div className="mx-10 mt-4">
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
      <p className="mx-10 mt-4 text-lg">{user?.description}</p>
      {isCompanyAccount && (
        <div className="mx-10 flex items-center mt-4">
          <CallIcon className="text-xl mr-2" />
          <p className="text-lg">{user?.phone_number}</p>
        </div>
      )}
      <div className="mx-10 mt-8">
        <Tabs
          value={value}
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
          }}
          className="text-gray-400 [&_.MuiTabs-indicator]:bg-gray-400"
        >
          <Tab label="Publicaciones" className="text-green-600" />
          {isOwnProfile && <Tab label="Favoritos" className="text-red-600" />}
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
            {myRecipes?.length ? (
              myRecipes.map((item) => (
                <ImageListItem
                  key={item._id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/recipe/${item._id}`)}
                >
                  <img
                    className="rounded-lg"
                    src={item.images[0]}
                    alt={item.title}
                  />
                </ImageListItem>
              ))
            ) : (
              <p>No se agregaron recetas</p>
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
                    className="cursor-pointer"
                    onClick={() => navigate(`/recipe/${_id}`)}
                  >
                    <img src={images[0]} alt={title} className="rounded-lg" />
                  </ImageListItem>
                ))
              ) : (
                <ImageListItem>
                  <img
                    src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                    alt="No images available"
                    className="rounded-lg"
                  />
                </ImageListItem>
              )}
            </div>
          </CustomTabPanel>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
