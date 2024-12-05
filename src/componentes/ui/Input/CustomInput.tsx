interface Props {
  id?: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomInput = ({
  id,
  type,
  label,
  value,
  onChange,
  placeholder,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 border p-2">
      <label>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
};

export default CustomInput;
