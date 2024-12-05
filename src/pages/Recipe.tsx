import { useGetRecipeByIdQuery } from "../app/apis/compartiendoSabores.api";
import Layout from "../componentes/layouts/Layout";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe } = useGetRecipeByIdQuery(id || "");

  console.log("Receta:", recipe);
  return (
    <div>
      <Layout>
        <h1>{id}</h1>
      </Layout>
    </div>
  );
};

export default Recipe;
