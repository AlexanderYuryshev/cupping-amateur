import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import HomePage from "./pages/home"
import HistoryPage from "./pages/history"
import SessionPage from "./pages/session"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/session" element={<SessionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
