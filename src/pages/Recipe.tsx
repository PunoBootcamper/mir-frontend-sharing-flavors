import { useGetRecipeByIdQuery } from "../app/apis/compartiendoSabores.api";
import { useParams } from "react-router-dom";
import RecipeCardDetailed from "../componentes/recipe/RecipeCardDetailed";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe } = useGetRecipeByIdQuery(id || "");

  console.log("Receta:", recipe);
  return (
    <div>
      <RecipeCardDetailed {...recipe} />
    </div>
  );
};

export default Recipe;
