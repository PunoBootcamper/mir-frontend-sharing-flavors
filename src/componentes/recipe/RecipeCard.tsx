import { Recipe } from "../../interfaces";

const RecipeCard: React.FC<Partial<Recipe>> = ({
  title,
  images,
  views,
  average_rating = 0,
}) => {
  const imgURL = images
    ? images[0]
    : "https://i.ytimg.com/vi/J9fJDuix1cc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCzv4X2gHz_PeK63pGEZsaJ22Sbeg";
  return (
    <div className="flex items-center bg-[#93AE97] rounded-lg shadow-lg overflow-hidden">
      {/* Imagen */}
      <div className="w-1/3 bg-gray-200 flex items-center justify-center">
        <img src={imgURL} alt={title} className="object-cover h-full w-full" />
      </div>
      {/* Información */}
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex items-center mt-2 space-x-2">
          {/* Número de vistas */}
          <div className="flex items-center text-black">
            <span className="text-lg font-bold">{views}</span>
            <svg
              className="w-5 h-5 ml-1"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.5C7.305 4.5 3.13 7.46 1.23 12c1.9 4.54 6.075 7.5 10.77 7.5 4.695 0 8.87-2.96 10.77-7.5-1.9-4.54-6.075-7.5-10.77-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
          </div>
          {/* Calificación */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < average_rating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.425L24 9.75l-6 5.849L19.336 24 12 20.01 4.664 24l1.336-8.401L0 9.75l8.332-1.738z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
