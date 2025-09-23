import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, NewTask, NotFound } from "./pages";
import { Sidebar } from "./components";
import CategoryPage from "./pages/category/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;