import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FormPage() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [input, setInput] = useState({ title: '', description: '' });
  const [status, setStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/forms/${formId}`)
      .then(res => {
        setForm(res.data);
        setStatus('ready');
      })
      .catch(() => {
        setStatus('error');
        setErrorMsg('❌ Form not found.');
      });
  }, [formId]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/forms/${formId}/submissions`, input);
      if (res.status === 200) {
        setStatus('submitted');
      }
    } catch (error) {
      setStatus('failed');
      setErrorMsg(error.response?.data?.error || 'Submission failed.');
    }
  };

  if (status === 'loading') {
    return <p className="p-6 text-center text-gray-600">⏳ Loading form...</p>;
  }

  if (status === 'error') {
    return <p className="p-6 text-center text-red-500 font-semibold">{errorMsg}</p>;
  }

  if (status === 'submitted') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-2">✅ Submission Successful!</h2>
          <p className="text-gray-700">Thank you for your response.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">📝 Fill Out This Form</h2>

        <div className="text-sm text-gray-600 mb-6 text-center">
          <p><strong>Start Date:</strong> {new Date(form.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(form.endDate).toLocaleDateString()}</p>
        </div>

        <label className="block mb-2 text-gray-700 font-medium">Title</label>
        <input
          className="input"
          placeholder="Enter title"
          value={input.title}
          onChange={e => setInput({ ...input, title: e.target.value })}
        />

        <label className="block mt-4 mb-2 text-gray-700 font-medium">Description</label>
        <textarea
          className="input"
          placeholder="Enter description"
          value={input.description}
          onChange={e => setInput({ ...input, description: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-6 transition duration-300"
        >
          Submit
        </button>

        {status === 'failed' && (
          <p className="text-red-500 text-sm mt-3 text-center">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
