import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  id: keyof T;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
  placeholder?: string;
}

const FormField = <T extends FieldValues>({
  label,
  id,
  type = "text",
  register,
  error,
  placeholder,
}: Props<T>) => {
  return (
    <div className="flex flex-col text-white">
      <label className="font-bold" htmlFor={id as string}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id as string}
          {...register(id as Path<T>)}
          className="w-full p-2 border rounded-md text-white"
        />
      ) : (
        <input
          type={type}
          id={id as string}
          {...register(id as Path<T>)}
          className="w-full p-2 border rounded-md bg-gray-700 text-gray-300"
          placeholder={placeholder}
        />
      )}
      {error && <span className="text-white text-sm">{error}</span>}
    </div>
  );
};

export default FormField;
