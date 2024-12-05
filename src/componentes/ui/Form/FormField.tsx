import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  label: string;
  id: keyof T;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
}

const FormField = <T extends FieldValues>({
  label,
  id,
  type = "text",
  register,
  error,
}: Props<T>) => {
  return (
    <div className="flex flex-col gap-4 border p-2">
      <label className="font-bold" htmlFor={id as string}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id as string}
          {...register(id as Path<T>)}
          className="w-full p-2 border rounded-md"
        />
      ) : (
        <input
          type={type}
          id={id as string}
          {...register(id as Path<T>)}
          className="w-full p-2 border rounded-md"
        />
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default FormField;
