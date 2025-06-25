import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetail from "./pages/NoteDetail"
import toast from "react-hot-toast"

function App() {
  return (
    <div className="relative h-full w-full">
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <Routes></Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
      <button
        onClick={() => toast.success("Tiurin Michail")}
        className="btn btn-outline"
      >
        Made by?!
      </button>
    </div>
  )
}

export default App
