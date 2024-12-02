import { Routes, Route } from "react-router-dom";

import { Home, Login } from "../pages";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default MainRouter;
