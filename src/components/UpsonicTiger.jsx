import React from 'react';
import { Button } from "@/components/ui/button";

const UpsonicTiger = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-3/4 h-3/4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Upsonic Tiger Interface</h2>
        <div className="space-y-4">
          {/* Placeholder for Upsonic Tiger functionality */}
          <p className="text-cyan-300">Upsonic Tiger interface goes here...</p>
          {/* Add more Upsonic Tiger components and functionality here */}
        </div>
        <Button onClick={onClose} className="mt-4 bg-cyan-600 hover:bg-cyan-700">Close</Button>
      </div>
    </div>
  );
};

export default UpsonicTiger;