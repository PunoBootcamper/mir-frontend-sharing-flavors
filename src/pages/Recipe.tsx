import { useGetRecipeByIdQuery } from "../app/apis/compartiendoSabores.api";
import { useParams } from "react-router-dom";
import RecipeCardDetailed from "../componentes/recipe/RecipeCardDetailed";
import AddButton from "../componentes/ui/Button/AddButton";
import NotFound from "./NotFound";

const Recipe = () => {
  const { id } = useParams();

  const { data: recipe, error, isLoading } = useGetRecipeByIdQuery(id || "");

  if (!id || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching recipe:", error);
    return <div>There was an error loading the recipe.</div>;
  }

  if (!recipe) {
    return <NotFound />;
  }

  return (
    <div>
      <RecipeCardDetailed {...recipe} />
      <AddButton />
    </div>
  );
};

export default Recipe;
