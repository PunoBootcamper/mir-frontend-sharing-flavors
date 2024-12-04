import { useState, useEffect } from "react";

export const useImageLoader = (images: string[] | undefined): string => {
  const [imgURL, setImgURL] = useState<string>(
    "https://via.placeholder.com/150",
  );

  useEffect(() => {
    if (images && images.length > 0) {
      const img = new Image();
      img.src = images[0];
      img.onload = () => setImgURL(images[0]);
      img.onerror = () => setImgURL("https://via.placeholder.com/150");
    }
  }, [images]);

  return imgURL;
};
