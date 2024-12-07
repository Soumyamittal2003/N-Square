// src/Bulk.tsx
import React from 'react';
import BulkContent from './BulkContent';

const Bulk = () => {
  return (
    <div className="max-w-3xl mx-auto my-12 p-5 font-sans">
      <div className="p-8 rounded-lg shadow-md bg-white">
        <h2 className="text-4xl text-center mb-2 text-gray-800">📧 Bulk Email Sender</h2>
        <p className="text-center text-lg text-gray-600 mb-5">
          Easily send bulk emails to your recipients with a single click.
        </p>
        <BulkContent />
      </div>
    </div>
  );
};

export default Bulk;
