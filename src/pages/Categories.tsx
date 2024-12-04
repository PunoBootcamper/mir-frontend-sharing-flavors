import Navbar from "../componentes/ui/Navbar/Navbar";
import AddButton from "../componentes/Home/AddButton";
import RecipeCard from "../componentes/recipe/RecipeCard";
import { useParams } from "react-router-dom";
export default function Categories() {
  const { category } = useParams<{ category: string }>();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#281B23]">
        <div className="text-center font-cookie">
          <h1 className="font-cookie text-3xl md:text-5xl max-w-md text-white">
            ¡Bienvenid@ a Compartiendo Sabores!
          </h1>
        </div>
        <main className="w-full max-w-4xl p-4">
          <div className="bg-[#D9C9A5] p-6 rounded-xl shadow-lg">
            {category}
          </div>
        </main>
        <AddButton />
        <RecipeCard title="Queque de Vainilla" views={17} average_rating={4} />
      </div>
    </>
  );
}
