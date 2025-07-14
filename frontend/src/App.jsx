import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import FormPage from './pages/FormPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateForm />} />
        <Route path="/form/:formId" element={<FormPage />} />
      </Routes>
    </Router>
  );
}
