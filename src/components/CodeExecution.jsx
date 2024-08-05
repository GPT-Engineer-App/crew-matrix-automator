import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CodeExecution = ({ onClose }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleExecute = async () => {
    // Placeholder for actual implementation
    setOutput(`Simulated execution of:\n\n${code}\n\nOutput: Code executed successfully`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-3/4 h-3/4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Code Execution</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter code to execute"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-gray-700 text-cyan-300 border-cyan-500 h-40"
          />
          <Button onClick={handleExecute} className="bg-cyan-600 hover:bg-cyan-700">
            Execute Code
          </Button>
          <Textarea
            value={output}
            readOnly
            className="bg-gray-700 text-cyan-300 border-cyan-500 h-40"
          />
        </div>
        <Button onClick={onClose} className="mt-4 bg-cyan-600 hover:bg-cyan-700">Close</Button>
      </div>
    </div>
  );
};

export default CodeExecution;