import RecipeCard from "../componentes/recipe/RecipeCard";
import { useGetRecipesQuery } from "../app/apis/compartiendoSabores.api";
import AddButton from "../componentes/ui/Button/AddButton";
import { useSearch } from "../hooks/useSearch";
import { SearchBar } from "../componentes/searchBar/SearchBar";

export default function Home() {
  const { data: recipes } = useGetRecipesQuery();

  const { text, result, onChangeInput } = useSearch({ data: recipes });

  return (
    <>
      <div className="w-full bg-[#d9c9a5] p-8">
        <SearchBar text={text} onChangeInput={onChangeInput} />
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center justify-center">
        {result?.map((recipe) => {
          return <RecipeCard key={recipe._id} {...recipe} />;
        })}
      </div>

      <AddButton />
    </>
  );
}
