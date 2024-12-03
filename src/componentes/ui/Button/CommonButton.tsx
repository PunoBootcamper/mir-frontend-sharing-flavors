interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
export default function CommonButton({ text, ...props }: CommonButtonProps) {
  return (
    <button
      type="submit"
      className="w-full min-w-48 h-12 bg-[#D9C9A5] hover:bg-[#F47E68] text-black font-semibold rounded-lg transition-colors duration-300"
      {...props}
    >
      {text}
    </button>
  );
}
