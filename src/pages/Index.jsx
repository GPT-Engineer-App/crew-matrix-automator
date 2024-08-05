import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [objectives, setObjectives] = useState('');
  const [numAgents, setNumAgents] = useState(1);
  const [selectedModel, setSelectedModel] = useState('');
  const [continuousMode, setContinuousMode] = useState(false);

  const handleStartExecution = () => {
    // TODO: Implement crew execution logic
    console.log('Starting crew execution...');
  };

  return (
    <div className="min-h-screen bg-black text-cyan-300 p-8">
      <h1 className="text-4xl font-bold mb-8">AutoCrew</h1>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="objectives" className="block mb-2">Objectives</label>
          <Input
            id="objectives"
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            className="w-full bg-gray-800 text-cyan-300 border-cyan-500"
            placeholder="Enter main objectives for AI agents"
          />
        </div>

        <div>
          <label htmlFor="llm-select" className="block mb-2">Choose LLM for Agents</label>
          <Select onValueChange={setSelectedModel}>
            <SelectTrigger id="llm-select" className="w-full bg-gray-800 text-cyan-300 border-cyan-500">
              <SelectValue placeholder="Select Ollama model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="model1">Model 1</SelectItem>
              <SelectItem value="model2">Model 2</SelectItem>
              <SelectItem value="model3">Model 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="num-agents" className="block mb-2">Number of Agents: {numAgents}</label>
          <Slider
            id="num-agents"
            min={1}
            max={10}
            step={1}
            value={[numAgents]}
            onValueChange={(value) => setNumAgents(value[0])}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="continuous-mode"
            checked={continuousMode}
            onCheckedChange={setContinuousMode}
          />
          <label
            htmlFor="continuous-mode"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Continuous Mode
          </label>
        </div>

        <Button
          onClick={handleStartExecution}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          Start Crew Execution
        </Button>
      </div>
    </div>
  );
};

export default Index;