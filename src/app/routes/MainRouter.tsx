import { Routes, Route } from "react-router-dom";

import { Home, Login, Register, Categories } from "../../pages";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/category/:category" element={<Categories />} />
    </Routes>
  );
};

export default MainRouter;
