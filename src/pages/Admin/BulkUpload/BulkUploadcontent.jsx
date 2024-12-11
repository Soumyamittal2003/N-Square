import { useState } from 'react';
import axiosInstance from '../../../utils/axiosinstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx'; // Make sure you've installed the xlsx package
import { saveAs } from 'file-saver'; // You need to install file-saver for this

const BulkUploadContent = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.name.endsWith('.xlsx')) {
      setFile(uploadedFile);
      parseExcel(uploadedFile);
    } else {
      toast.error('Please upload a valid Excel file.');
    }
  };

  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const workBook = XLSX.read(arrayBuffer, { type: 'array' }); // Changed to 'array' for ArrayBuffer
      const sheetName = workBook.SheetNames[0]; // Assuming the first sheet
      const sheet = workBook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file); // Using readAsArrayBuffer instead of readAsBinaryString
  };

  const handleFetch = async () => {
    if (!data.length) {
      toast.error('No data to fetch. Please upload a file.');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/organization/fetch-email-data', { data });
      toast.success(response.data.message || 'Data fetched successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  // Generate Sample Excel File
  const downloadSample = () => {
    const sampleData = [
      { Batch: 'Batch 1', Email: 'email1@example.com', Name: 'John Doe' },
      { Batch: 'Batch 2', Email: 'email2@example.com', Name: 'Jane Smith' },
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sample Data');
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Use FileSaver to trigger the download
    const blob = new Blob([excelFile], { type: 'application/octet-stream' });
    saveAs(blob, 'sample_bulk_upload.xlsx');
  };

  return (
    <div className="w-full mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar />

      <div className="max-h-[500px] overflow-y-auto hide-scrollbar">
        {/* File Upload Section */}
        <div className="mb-5">
          <label className="block mb-2 font-bold text-gray-700">Upload Excel File</label>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="w-full p-3 text-base border border-gray-300 rounded-md"
          />
        </div>

        {/* Data Display Section */}
        {data.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xl font-bold text-gray-700">Uploaded Data:</h3>
            <pre className="text-sm text-gray-600">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}

        {/* Button Section */}
        <div className="flex justify-center space-x-4">
          {/* Download Sample Button */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md text-lg"
            onClick={downloadSample}
          >
            Download Sample 📥
          </button>

          {/* Fetch Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md text-lg"
            onClick={handleFetch}
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Fetch Data 📥'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadContent;
