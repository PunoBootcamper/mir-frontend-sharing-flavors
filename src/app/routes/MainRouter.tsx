import { Routes, Route } from "react-router-dom";

import { Home, Login, Register, Chat } from "../../pages";
import AddRecipe from "../../pages/AddRecipe";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default MainRouter;
