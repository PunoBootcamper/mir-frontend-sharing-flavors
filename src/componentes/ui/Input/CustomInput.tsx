interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomInput = ({ value, onChange, placeholder }: CustomInputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border p-2 rounded-md"
    />
  );
};

export default CustomInput;
