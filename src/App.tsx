import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Callback from "./routes/Callback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
}

export default App;