import { useState } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx"; // Ensure the 'xlsx' package is installed

const BulkUploadContent = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.name.endsWith(".xlsx")) {
      setFile(uploadedFile);
      parseExcel(uploadedFile);
    } else {
      toast.error("Please upload a valid Excel file.");
    }
  };

  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const workBook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workBook.SheetNames[0];
      const sheet = workBook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFetch = async () => {
    if (!data.length) {
      toast.error("No data to fetch. Please upload a file.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/organization/fetch-email-data",
        { data }
      );
      toast.success(response.data.message || "Data fetched successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const downloadSample = () => {
    const sampleData = [
      {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        Role: "",
        PhoneNumber: "",
        Address: "",
        Gender: "",
        Dob: "",
        State: "",
        City: "",
        ZipCode: "",
        Origination: "",
      },
    ];

    const workSheet = XLSX.utils.json_to_sheet(sampleData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "SampleData");

    // Generate and download the Excel file
    XLSX.writeFile(workBook, "sample_bulk_upload.xlsx");
  };

  return (
    <div className="w-full mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar />

      <div className="max-h-[500px] overflow-y-auto hide-scrollbar">
        {/* File Upload Section */}
        <div className="mb-5">
          <label className="block mb-2 font-bold text-gray-700">
            Upload Excel File
          </label>
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
            <pre className="text-sm text-gray-600">
              {JSON.stringify(data, null, 2)}
            </pre>
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
            {loading ? "Uploading..." : "Upload Data 📥"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadContent;
