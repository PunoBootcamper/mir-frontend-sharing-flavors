import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormField from "../componentes/ui/Form/FormField";
import Dropzone from "../componentes/ui/Form/Dropzone";
import useCloudinaryUpload from "../hooks/useCloudinaryUpload";

const recipeSchema = yup.object().shape({
  title: yup
    .string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
  ingredients: yup
    .array()
    .of(
      yup.object({
        ingredientsName: yup
          .string()
          .required("Cada ingrediente es obligatorio"),
      }),
    )
    .min(1, "Debe haber al menos un ingrediente")
    .required("Los ingredientes son obligatorios"),
  procedure: yup
    .array()
    .of(
      yup.object({
        stepName: yup.string().required("Cada paso es obligatorio"),
      }),
    )
    .min(1, "Debe haber al menos un paso")
    .required("Los pasos son obligatorios"),
  category: yup.string().required("La categoría es obligatoria"),
  image: yup
    .mixed<File>()
    .required("La imagen es obligatoria")
    .test(
      "fileType",
      "Solo se permiten imágenes (jpeg, png, gif)",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/gif"].includes(
            (value as File).type,
          )),
    ),
});

interface IRecipeForm {
  title: string;
  ingredients: { ingredientsName: string }[];
  procedure: { stepName: string }[];
  category: string;
  image: File;
}

const AddRecipe: React.FC = () => {
  const {
    uploadImage,
    loading: loadingImg,
    uploadedUrl,
  } = useCloudinaryUpload();
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

  const handleAddIngredient = () => {
    appendIngredient({ ingredientsName: "" });
  };

  const handleAddStep = () => {
    appendStep({ stepName: "" });
  };

  const handleUploadImage = async (file: File) => {
    if (file) {
      try {
        const url = await uploadImage(file);
        console.log("Image uploaded successfully:", url);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onSubmit = async (data: IRecipeForm) => {
    console.log("Datos del formulario:", data);
    await handleUploadImage(data.image);
    console.log("Imagen subida:", uploadedUrl);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="max-w-screen-md w-full md:mt-24 mx-auto p-4 bg-white shadow-md rounded-md">
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
              <button
                type="button"
                onClick={handleAddIngredient}
                className="bg-green-500 w-full text-white p-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Agregar Ingrediente
              </button>
              {errors.ingredients?.message && (
                <p className="text-red-500 text-sm">
                  {errors.ingredients.message}
                </p>
              )}
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
              <button
                type="button"
                onClick={handleAddStep}
                className="bg-green-500 w-full text-white p-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Agregar paso
              </button>
              {errors.procedure?.message && (
                <p className="text-red-500 text-sm">
                  {errors.procedure.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="md:fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-lg"
            >
              {loadingImg ? "Cargando imagen" : "Agregar Receta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
