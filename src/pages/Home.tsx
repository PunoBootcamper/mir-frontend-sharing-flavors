import AddButton from "../componentes/Home/AddButton";
import RecipeCard from "../componentes/recipe/RecipeCard";
import Layout from "../componentes/Home/Layout";
import { useGetRecipesQuery } from "../app/apis/compartiendoSabores.api";
export default function Home() {
  const { data: recipes } = useGetRecipesQuery();

  const recipesContent = recipes?.map((recipe) => (
    <RecipeCard
      key={recipe._id}
      images={recipe.images}
      title={recipe.title}
      average_rating={recipe.average_rating}
      views={recipe.views}
    />
  ));

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center justify-center">
        {recipesContent}
      </div>
      <AddButton />
    </Layout>
  );
}
