import Navbar from "../componentes/ui/Navbar/Navbar";
import AddButton from "../componentes/Home/AddButton";
import RecipeCard from "../componentes/recipe/RecipeCard";
import ProductCard from "../componentes/card/ProductCard";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
        <div className="text-center font-cookie">
          <h1 className="font-cookie text-3xl md:text-5xl max-w-md text-white">
            ¡Bienvenid@ a Compartiendo Sabores!
          </h1>
        </div>
        <main className="w-full max-w-4xl p-4">
          <div className="bg-tertiary p-6 rounded-xl shadow-lg">
            <RecipeCard
              images={["https://via.placeholder.com/150"]}
              title="Queque de Vainilla"
              views={17}
              average_rating={4}
            />
          </div>
          <ProductCard
            images={["https://via.placeholder.com/150"]}
            title="Sopa de fideo"
            average_rating={4}
            views={599}
          />
          <ProductCard
            images={["https://via.placeholder.com/150"]}
            title="Sopa de fideo"
            average_rating={4}
            views={599}
          />
        </main>
        <AddButton />
        <RecipeCard
          images={["https://via.placeholder.com/150"]}
          title="Queque de Vainilla"
          views={17}
          average_rating={4}
        />
      </div>
    </>
  );
}
