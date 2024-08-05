import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  "Scrape Website",
  "Directory Read",
  "File Read",
  "Selenium Scraper",
  "Directory Search",
  "PDF Search",
  "TXT Search",
  "CSV Search",
  "XML Search",
  "JSON Search",
  "Docx Search",
  "Website Search",
  "Code Docs Search",
  "Youtube Video Search",
  "Youtube Channel Search",
  "DuckDuckGoRun"
];

const CrewAITools = ({ agentId }) => {
  const [enabledTools, setEnabledTools] = useState({});

  const toggleTool = (tool) => {
    setEnabledTools(prev => ({
      ...prev,
      [tool]: !prev[tool]
    }));
  };

  return (
    <Card className="mt-4 bg-gray-800 border-cyan-500">
      <CardHeader>
        <CardTitle>Enabled Tools for Agent {agentId}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => (
            <Button
              key={tool}
              onClick={() => toggleTool(tool)}
              className={`w-full ${enabledTools[tool] ? 'bg-green-600' : 'bg-red-600'} hover:opacity-80`}
            >
              {tool}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewAITools;