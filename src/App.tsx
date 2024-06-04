import FlameColumnGraph from "./flameColumnGraph";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GraphDetails from "./graphDetails";

const App = () => (
  <div style={{ width: "100%" }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlameColumnGraph />} />
        <Route path="graph-details" element={<GraphDetails />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
