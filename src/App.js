import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

// pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-sky-700 py-2.5 px-5 text-center">
        <h1 className="text-white text-xl">Supa Blog</h1>
        <Link to="/" className="text-gray-400 m-2.5 inline-block">Home</Link>
        <Link to="/create" className="text-gray-400 m-2.5 inline-block">Create New Blog</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
