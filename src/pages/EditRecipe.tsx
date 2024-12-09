import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../componentes/ui/Form/FormField";
import Dropzone from "../componentes/ui/Form/Dropzone";
import useCloudinaryUpload from "../hooks/useCloudinaryUpload";
import { IRecipeEditForm } from "../interfaces";
import { useUpdateRecipeMutation } from "../app/apis/compartiendoSabores.api";
import { EditRecipeSchema } from "../utils/yupSchemas";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetRecipeByIdQuery } from "../app/apis/compartiendoSabores.api";
import { transformIRecipeEditFormToRecipe } from "../utils/recipeUtils";

const EditRecipe: React.FC = () => {
  const [updateRecipe, { isLoading: updatingRecipe }] =
    useUpdateRecipeMutation();
  const { uploadImage, loading: loadingImg } = useCloudinaryUpload();
  const navigate = useNavigate();
  const { recipe_id } = useParams();
  const {
    data: recipe,
    isLoading,
    isError,
  } = useGetRecipeByIdQuery(recipe_id || "");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRecipeEditForm>({ resolver: yupResolver(EditRecipeSchema) });
  const {
    fields: ingredientsFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    name: "ingredients",
    control,
  });
  const {
    fields: procedureFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    name: "procedure",
    control,
  });
  useEffect(() => {
    if (recipe && !isLoading) {
      // O cargar uno específico
      reset({
        title: recipe.title,
        category: recipe.category,
        ingredients: recipe.ingredients.map((ingredient) => ({
          ingredientsName: ingredient,
        })),
        procedure: recipe.procedure.map((step) => ({ stepName: step })),
      });
      console.log("Receta cargada:", recipe);
    }

    if (isError) {
      console.log("Error al cargar la receta");
      navigate("/home");
    }
  }, [recipe, isLoading, reset, isError, navigate]);

  const user = useSelector((state: RootState) => state.auth.user);

  const handleAddIngredient = () => {
    appendIngredient({ ingredientsName: "" });
  };

  const handleAddStep = () => {
    appendStep({ stepName: "" });
  };

  const onSubmit = async (data: IRecipeEditForm) => {
    try {
      console.log("ID del creador:", user?._id);
      console.log("Datos recibidos:", data);

      let imageUrl = recipe?.images[0]; // Mantener la imagen existente por defecto

      if (data.image) {
        console.log("Subiendo imagen...");
        imageUrl = await uploadImage(data.image); // Actualizar URL si hay una nueva imagen
        console.log("Imagen subida:", imageUrl);
      } else {
        console.log("No se subió imagen, manteniendo la existente:", imageUrl);
      }

      const updatedRecipe = transformIRecipeEditFormToRecipe(
        data,
        user?._id || "",
        imageUrl,
      );

      console.log("Receta a actualizar:", updatedRecipe);

      // Llama a updateRecipe
      await updateRecipe({ _id: recipe_id, ...updatedRecipe }).unwrap();

      console.log("Receta actualizada correctamente.");
      navigate("/home");
    } catch (error) {
      console.error("Error al actualizar la receta:", error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Link to="/home">Volver al inicio</Link>;

  return (
    <>
      <div className="flex justify-center min-h-screen">
        <div className="max-w-screen-md w-full md:mt-4 mx-auto p-4 bg-white shadow-md rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Compartiendo sabores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <div className="mb-4">
                  {" "}
                  {/* Aquí va el campo nombre del Ingrediene */}
                  <FormField
                    label="Título de la receta"
                    id="title"
                    error={errors.title?.message}
                    register={register}
                  />
                </div>
                <div className="mb-4">
                  {/* Aquí va el campo de la categoría */}
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="category"
                  >
                    Categoría
                  </label>
                  <select
                    id="category"
                    className={`w-full p-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md`}
                    {...register("category")}
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="Postre">Postre</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Plato Principal">Plato Principal</option>
                    <option value="Bebida">Bebida</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                {" "}
                {/* Aquí va el campo de la imagen */}
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Dropzone
                      onFileChange={(file) => {
                        onChange(file);
                      }}
                      existingImage={recipe?.images[0]}
                    />
                  )}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                {" "}
                {/* Aquí va el campo de los ingredientes */}
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="ingredients"
                >
                  Ingredientes
                </label>
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="bg-green-500 w-full text-white p-2 rounded-md hover:bg-green-600 transition-colors mb-6"
                >
                  Agregar Ingrediente
                </button>
                {errors.ingredients?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.ingredients.message}
                  </p>
                )}
                {ingredientsFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      {...register(
                        `ingredients.${index}.ingredientsName` as const,
                      )}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                {" "}
                {/* Aquí va el campo del procedimiento */}
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="procedure"
                >
                  Procedimiento
                </label>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="bg-green-500 w-full mb-6 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Agregar paso
                </button>
                {errors.procedure?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.procedure.message}
                  </p>
                )}
                {procedureFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      {...register(`procedure.${index}.stepName` as const)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
              <div className="mb-4 fixed bottom-8 right-8 flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="bg-blue-400 hover:bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-secondary hover:bg-[#b02036] text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
                >
                  {loadingImg
                    ? "Cargando imagen..."
                    : updatingRecipe
                      ? "Actualizando receta..."
                      : "Actualizar receta"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRecipe;
