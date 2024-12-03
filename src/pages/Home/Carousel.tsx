import React, { useState, useEffect } from "react";

interface Category {
  src: string;
  title: string;
  path: string;
}

const categories: Category[] = [
  {
    src: "https://www.comedera.com/wp-content/uploads/2013/05/sopa-de-verduras-1.jpg",
    title: "Sopas",
    path: "/category/Sopas",
  },
  {
    src: "https://www.laylita.com/recetas/wp-content/uploads/Ensalada-de-lechuga-con-limon-y-cilantro.jpg",
    title: "Ensaladas",
    path: "/category/Ensaladas",
  },
  {
    src: "https://uvn-brightspot.s3.amazonaws.com/assets/vixes/3/3_entradas_deliciosas_pero_saludables_que_puedes_darle_a_tus_invitados_si_tienes_una_reunion_en_casa4.jpg",
    title: "Entradas",
    path: "/category/Entradas",
  },
  {
    src: "https://www.lima2019.pe/sites/default/files/inline-images/preview-gallery-004_0.jpg",
    title: "Platos Fuertes",
    path: "/category/Platos Fuertes",
  },
  {
    src: "https://media.glamour.mx/photos/63fbac8762e9478a3fe578a3/3:2/w_2429,h_1620,c_limit/Decoraci%C3%B3n%20de%20bebidas.jpg",
    title: "Bebidas",
    path: "/category/Bebidas",
  },
  {
    src: "https://www.lazayafruits.com/es/wp-content/uploads/sites/2/2020/08/nuevas-tendencias-en-pasteleria-industrial-1.jpg",
    title: "Pastelería y Postres",
    path: "/category/Pastelería y Postres",
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambiar automáticamente las imágenes cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 4000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + categories.length) % categories.length,
    );
  };

  const handleSlideTo = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageClick = (path: string) => {
    console.log(`Navigating to: ${path}`);
    // Aquí puedes redirigir al usuario a la ruta usando react-router-dom, por ejemplo:
    // navigate(path);
  };

  return (
    <div className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`absolute w-full h-full duration-700 ease-in-out ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <img
              src={category.src}
              className="block w-full h-full object-cover cursor-pointer"
              alt={category.title}
              onClick={() => handleImageClick(category.path)}
            />
            <div className="absolute top-0 left-0 w-full bg-black/30 text-white text-center py-2">
              {category.title}
            </div>
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {categories.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-current={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleSlideTo(index)}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
