import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import ExcalidrawEditor from "./pages/ExcalidrawEditor";

const App = () => {
  return (
    <div className="bg-[#121212] h-screen dark:bg-grey-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ExcalidrawEditor />} />
      </Routes>
    </div>
  );
};
export default App;
