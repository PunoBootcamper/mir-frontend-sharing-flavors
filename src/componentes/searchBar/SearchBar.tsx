import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  text: string;
  onChangeInput: (value: string) => void;
}

export const SearchBar = ({ text, onChangeInput }: SearchProps) => {
  return (
    <div className="flex items-center bg-white rounded-full shadow-md">
      <input
        type="text"
        className="flex-1 px-4 py-2 text-lg outline-none bg-transparent"
        value={text}
        onChange={({ target }) => onChangeInput(target.value)}
        placeholder="Buscar..."
      />
      <div className="flex items-center justify-center w-12 h-12 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer">
        <SearchIcon className="text-3xl" />
      </div>
    </div>
  );
};
