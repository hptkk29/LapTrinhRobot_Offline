import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OfflinePage from './pages/OfflinePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OfflinePage />} />
      </Routes>
    </BrowserRouter>
  )
}
