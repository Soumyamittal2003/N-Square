import React, { useState } from 'react';

const BulkContent = () => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [batch, setBatch] = useState(''); // Added batch state
  const [success, setSuccess] = useState(false);

  const handleSend = () => {
    if (recipients && subject && message && batch) {
      setSuccess(true);
      // Here you can integrate your API call to send the bulk email.
      setTimeout(() => setSuccess(false), 4000); // Automatically hide success message
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50">
      <div className="max-h-[500px] overflow-y-auto"> {/* Added scrolling container */}
        {/* Recipients Field */}
        <div className="mb-5">
          <label className="block mb-2 font-bold text-gray-700">Recipients (comma-separated emails)</label>
          <textarea
            placeholder="example1@gmail.com, example2@yahoo.com"
            className="w-full p-3 text-base border border-gray-300 rounded-md resize-y"
            rows={2}
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />
        </div>

        {/* Batch Field */}
        <div className="mb-5">
          <label className="block mb-2 font-bold text-gray-700">Batch</label>
          <input
            type="text"
            placeholder="Enter batch name"
            className="w-full p-3 text-base border border-gray-300 rounded-md"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
        </div>

        {/* Subject Field */}
        <div className="mb-5">
          <label className="block mb-2 font-bold text-gray-700">Subject</label>
          <input
            type="text"
            placeholder="Enter your email subject"
            className="w-full p-3 text-base border border-gray-300 rounded-md"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Message Field */}
        <div className="mb-5">
          <label className="block mb-2 font-bold text-gray-700">Message</label>
          <textarea
            placeholder="Write your message here"
            className="w-full p-3 text-base border border-gray-300 rounded-md resize-y"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md text-lg"
            onClick={handleSend}
          >
            Send Bulk Email 📤
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mt-6 p-3 bg-green-100 text-green-800 border border-green-300 rounded-md text-center">
            ✅ Bulk email sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkContent;
