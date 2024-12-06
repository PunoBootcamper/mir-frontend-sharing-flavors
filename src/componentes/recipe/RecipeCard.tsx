import { Recipe } from "../../interfaces";
import { useImageLoader } from "../../hooks/useImageLoader";
import { Link } from "react-router-dom";
import Stars from "./Stars";
import Views from "./Views";

const RecipeCard: React.FC<Recipe> = ({
  title,
  images,
  views,
  average_rating,
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
        <Stars rating={average_rating} />
        <div className="flex items-center justify-between">
          <Views views={views} />
          <Link
            to="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Favoritos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
