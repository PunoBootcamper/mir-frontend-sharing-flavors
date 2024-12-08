import RecipeCard from "../componentes/recipe/RecipeCard";
import { useGetRecipesQuery } from "../app/apis/compartiendoSabores.api";
import { useGetUserByIdQuery } from "../app/apis/compartiendoSabores.api";
import { RootState } from "../app/store/store";
import { useSelector } from "react-redux";
import AddButton from "../componentes/ui/Button/AddButton";
export default function Home() {
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const { data: recipes } = useGetRecipesQuery();
  const { data: dataLoggedUser } = useGetUserByIdQuery(loggedUser?._id || "");

  const localStorageData = localStorage.getItem("user");
  const parsedData = localStorageData ? JSON.parse(localStorageData) : null;

  // Del local storage
  console.log("favorites", parsedData.profile.favorites);

  // Del redux
  console.log("Data", dataLoggedUser?.favorites);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center justify-center">
        {recipes?.map((recipe) => {
          //const isFavorite = !!dataLoggedUser?.favorites?.includes(recipe._id);
          const isFavorite = !!parsedData.profile.favorites.includes(
            recipe._id,
          );
          return (
            <RecipeCard key={recipe._id} {...recipe} isFavorite={isFavorite} />
          );
        })}
      </div>

      <AddButton />
    </>
  );
}
