import React, { useState, useEffect } from "react";

interface DropzoneProps {
  onFileChange: (file: File | null) => void;
  existingImage?: string; // Nueva prop para la imagen existente
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileChange, existingImage }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (existingImage) {
      setPreviewImage(existingImage); // Establece la imagen existente como vista previa inicial
    }
  }, [existingImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL); // Actualiza la vista previa con la nueva imagen
    }

    onFileChange(file);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${
          previewImage ? "bg-cover bg-center" : "bg-gray-50"
        }`}
        style={previewImage ? { backgroundImage: `url(${previewImage})` } : {}}
      >
        {!previewImage && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Subir imagen</span> o puedes
              arrastrar la imagen
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default Dropzone;
