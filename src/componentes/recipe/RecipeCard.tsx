import { Recipe } from "../../interfaces";
import { useImageLoader } from "../../hooks/useImageLoader";
import { Link } from "react-router-dom";

const RecipeCard: React.FC<Partial<Recipe>> = ({
  title,
  images,
  views,
  average_rating = 0,
  _id,
}) => {
  const imgURL = useImageLoader(images);
  const path = `/recipe/${_id}`;
  const handleClicked = () => {
    console.log("clicked");
  };
  return (
    <div className="w-full h-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        {" "}
        <Link to={path} onClick={handleClicked} className="w-full">
          <img
            className="p-8 rounded-t-lg h-64  md:h-64 w-full object-cover"
            src={imgURL}
            alt={title}
          />
        </Link>
      </div>
      <div className="px-5 pb-5">
        <Link to={path} onClick={handleClicked}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < average_rating
                    ? "text-yellow-300"
                    : "text-gray-200 dark:text-gray-600"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {average_rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 ml-1 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.5C7.305 4.5 3.13 7.46 1.23 12c1.9 4.54 6.075 7.5 10.77 7.5 4.695 0 8.87-2.96 10.77-7.5-1.9-4.54-6.075-7.5-10.77-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {views}
            </span>
          </div>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Favoritos
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
