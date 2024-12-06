import React from "react";

interface CommentBoxProps {
  id?: string;
  placeholder?: string;
  rows?: number;
  onChange?: (value: string) => void;
  value?: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  id = "comment",
  placeholder = "Escribe tu comentario aquí...",
  rows = 4,
  onChange,
  value,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
      >
        Comentario
      </label>
      <textarea
        id={id}
        rows={rows}
        className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      ></textarea>
    </div>
  );
};

export default CommentBox;