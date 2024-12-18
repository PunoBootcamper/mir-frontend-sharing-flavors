import { CircularProgress } from "@mui/material";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  text: string;
}
export default function LoadingButton({
  isLoading,
  text,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      type="submit"
      className={`w-full h-12 ${
        isLoading
          ? "bg-gray-400" // Color cuando isLoading es true
          : "bg-[#D9C9A5] hover:bg-[#F47E68]" // Colores normales
      } hover:bg-[#F47E68] text-black font-semibold rounded-lg transition-colors duration-300`}
      {...props}
    >
      {isLoading ? <CircularProgress size="30px" /> : text}
    </button>
  );
}
