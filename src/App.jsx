import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SaveNote from './SaveNote';
import ViewMessages from './ViewMessages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SaveNote />} />
        <Route path="/view" element={<ViewMessages />} />
      </Routes>
    </BrowserRouter>
  );
}