import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RunPage from "./pages/RunPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/run/:id" element={<RunPage />} />
      </Routes>
    </BrowserRouter>
  );
}
