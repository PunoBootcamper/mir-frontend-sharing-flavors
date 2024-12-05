import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  register: UseFormRegister<{ [key: string]: string }>;
  error?: FieldError;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  register,
  error,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium">
        {label}
      </label>
      <input
        id={id}
        {...register(id)}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default TextInput;
