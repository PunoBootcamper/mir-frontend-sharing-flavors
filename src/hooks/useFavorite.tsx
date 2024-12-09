import { useUpdateUserMutation } from "../app/apis/compartiendoSabores.api";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";

export const useFavorite = () => {
  const [updateUser] = useUpdateUserMutation();
  const loggedUser = useSelector((state: RootState) => state.auth.user);

  const handleFavorite = async (recipeId: string, isFavorite: boolean) => {
    try {
      // Obtiene favoritos actuales del usuario
      const localStorageData = localStorage.getItem("user");
      const parsedData = localStorageData ? JSON.parse(localStorageData) : null;
      const currentFavorites = parsedData?.profile?.favorites || [];

      //Del redux
      //const currentFavorites = loggedUser?.profile.favorites || [];

      let newFavorites: string[];

      if (isFavorite) {
        // Remover de favoritos
        newFavorites = currentFavorites.filter(
          (favorite: string) => favorite !== recipeId,
        );
      } else {
        // Agregar a favoritos
        newFavorites = [...currentFavorites, recipeId];
      }

      // Actualizar localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...parsedData,
          profile: {
            ...parsedData.profile,
            favorites: newFavorites,
          },
        }),
      );

      // Actualizar en el backend
      await updateUser({
        _id: loggedUser?._id || "",
        favorites: newFavorites,
      });
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
    }
  };

  return { handleFavorite };
};
