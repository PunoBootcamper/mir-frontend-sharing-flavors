import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./app/routes/MainRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="bottom-left" />
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
