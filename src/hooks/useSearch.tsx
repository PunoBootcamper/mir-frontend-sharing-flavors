import { useState } from "react";
import { SearchParams } from "../interfaces";

export const useSearch = ({ data }: SearchParams) => {
  const [text, setText] = useState("");

  const onChangeInput = (value: string) => {
    setText(value);
  };

  const result =
    text.toLocaleLowerCase().trim().length >= 2
      ? data?.filter((recipe) =>
          recipe.title
            .toLocaleLowerCase()
            .trim()
            .includes(text.toLocaleLowerCase().trim()),
        )
      : data;

  return { text, onChangeInput, result };
};
