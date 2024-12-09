import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../componentes/ui/Form/FormField";
import Dropzone from "../componentes/ui/Form/Dropzone";
import useCloudinaryUpload from "../hooks/useCloudinaryUpload";
import { IRecipeForm } from "../interfaces";
import { transformIRecipeFormToRecipe } from "../utils/recipeUtils";
import { useCreateRecipeMutation } from "../app/apis/compartiendoSabores.api";
import { recipeSchema } from "../utils/yupSchemas";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddRecipe: React.FC = () => {
  const [createRecipe, { isLoading: loadingRecipe }] =
    useCreateRecipeMutation();
  const { uploadImage, loading: loadingImg } = useCloudinaryUpload();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecipeForm>({ resolver: yupResolver(recipeSchema) });
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

  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const handleAddIngredient = () => {
    appendIngredient({ ingredientsName: "" });
  };

  const handleAddStep = () => {
    appendStep({ stepName: "" });
  };

  const onSubmit = async (data: IRecipeForm) => {
    try {
      console.log("Datos del formulario:", data);
      const uploadedUrl = await uploadImage(data.image);
      console.log("Imagen subida:", uploadedUrl);
      const recipe = transformIRecipeFormToRecipe(
        data,
        user?._id || "",
        uploadedUrl || "",
      );
      console.log("Receta a enviar:", recipe);
      await createRecipe(recipe).unwrap();
      toast.success("Receta publicada con éxito");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al publicar la receta");
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="max-w-screen-md w-full md:mt-6 mx-auto p-4 bg-gray-800 shadow-md rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Título de la receta"
                />
              </div>
              <div className="mb-4">
                {/* Aquí va el campo de la categoría */}
                <label
                  className="block text-sm font-medium mb-1 text-white"
                  htmlFor="category"
                >
                  Categoría
                </label>
                <select
                  id="category"
                  className={`w-full p-2 border rounded-md bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.category ? "border-red-500 focus:ring-red-500" : "border-gray-500 "}`}
                  {...register("category")}
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="Postre">Postre</option>
                  <option value="Entrada">Entrada</option>
                  <option value="Plato Principal">Plato Principal</option>
                  <option value="Bebida">Bebida</option>
                </select>
                {errors.category && (
                  <p className="text-white text-sm mt-1">
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
                  />
                )}
              />
              {errors.image && (
                <p className="text-white text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              {" "}
              {/* Aquí va el campo de los ingredientes */}
              <label
                className="block text-sm font-medium mb-1 text-white"
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
                <p className="text-white text-sm">
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
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-gray-300"
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
                className="block text-sm font-medium mb-1 text-white"
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
                <p className="text-white text-sm">{errors.procedure.message}</p>
              )}
              {procedureFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    {...register(`procedure.${index}.stepName` as const)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-gray-300"
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
            <button
              type="submit"
              className="fixed bottom-8 right-8 bg-secondary hover:bg-[#b02036] text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
            >
              {loadingImg
                ? "Cargando imagen..."
                : loadingRecipe
                  ? "Subiendo receta..."
                  : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
