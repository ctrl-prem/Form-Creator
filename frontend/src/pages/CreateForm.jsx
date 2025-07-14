import { useState } from 'react';
import axios from 'axios';

export default function CreateForm() {
  const [data, setData] = useState({
    limit: '',
    startDate: '',
    endDate: ''
  });
  const [link, setLink] = useState('');

  const handleSubmit = async () => {
    if (!data.limit || !data.startDate || !data.endDate) {
      alert('Please fill all fields.');
      return;
    }

    if (data.endDate < data.startDate) {
      alert('End date cannot be before start date.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/forms', data);
      const formId = res.data.formId;
      setLink(`${window.location.origin}/form/${formId}`);
    } catch (error) {
      alert('Error creating form', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">📋 Create a New Form</h1>

        <label className="block mb-2 text-gray-700 font-medium">Submission Limit</label>
        <input
          type="number"
          className="input"
          placeholder="e.g. 5"
          value={data.limit}
          onChange={e => setData({ ...data, limit: e.target.value })}
        />

        <label className="block mt-4 mb-2 text-gray-700 font-medium">Start Date</label>
        <input
          type="date"
          className="input"
          value={data.startDate}
          onChange={e => {
            const start = e.target.value;
            setData(prev => ({
              ...prev,
              startDate: start,
              endDate: prev.endDate && prev.endDate < start ? start : prev.endDate
            }));
          }}
        />

        <label className="block mt-4 mb-2 text-gray-700 font-medium">End Date</label>
        <input
          type="date"
          className="input"
          value={data.endDate}
          min={data.startDate}
          onChange={e => setData({ ...data, endDate: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-6 transition duration-300"
        >
          Generate Form Link
        </button>

        {link && (
          <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-md text-sm text-gray-700">
            <p className="mb-1 font-medium">Form Link:</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
