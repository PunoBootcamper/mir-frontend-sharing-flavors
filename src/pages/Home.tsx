import Carousel from "./Home/Carousel";
import Navbar from "../componentes/ui/Navbar/Navbar";
import AddButton from "./Home/AddButton";
export default function Home() {
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
            <Carousel />
          </div>
        </main>
        ¿<AddButton />
      </div>
    </>
  );
}
