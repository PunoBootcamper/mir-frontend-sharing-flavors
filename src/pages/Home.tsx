import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <div>Por favor, inicia sesión.</div>;
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
