import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";

export default function CreateButton() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return null;
  return (
    <button
      onClick={() => navigate("/add-recipe")}
      className="fixed bottom-8 right-8 bg-secondary hover:bg-[#b02036] text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
    >
      + Añadir Receta
    </button>
  );
}
