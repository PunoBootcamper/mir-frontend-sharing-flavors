import RecipeCard from "../componentes/recipe/RecipeCard";
import { useGetRecipesQuery } from "../app/apis/compartiendoSabores.api";
import AddButton from "../componentes/ui/Button/AddButton";
export default function Home() {
  const { data: recipes } = useGetRecipesQuery();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center justify-center">
        {recipes?.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />)}
      </div>
      <AddButton />
    </>
  );
}
