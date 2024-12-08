import { useGetRecipeByIdQuery } from "../app/apis/compartiendoSabores.api";
import { useParams } from "react-router-dom";
import RecipeCardDetailed from "../componentes/recipe/RecipeCardDetailed";
import AddButton from "../componentes/ui/Button/AddButton";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe } = useGetRecipeByIdQuery(id || "");

  return (
    <div>
      <RecipeCardDetailed {...recipe} />
      <AddButton />
    </div>
  );
};

export default Recipe;
