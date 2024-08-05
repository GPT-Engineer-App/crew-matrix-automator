import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';

const fetchOllamaModels = async () => {
  const response = await fetch('http://localhost:11434/api/tags');
  if (!response.ok) {
    throw new Error('Failed to fetch Ollama models');
  }
  return response.json();
};

const Index = () => {
  const [objectives, setObjectives] = useState('');
  const [numAgents, setNumAgents] = useState(1);
  const [selectedTextModel, setSelectedTextModel] = useState('');
  const [selectedVisionModel, setSelectedVisionModel] = useState('');
  const [continuousMode, setContinuousMode] = useState(false);

  const { data: ollamaModels, isLoading, error } = useQuery({
    queryKey: ['ollamaModels'],
    queryFn: fetchOllamaModels,
  });

  const handleStartExecution = () => {
    // TODO: Implement crew execution logic
    console.log('Starting crew execution...');
    console.log('Selected Text Model:', selectedTextModel);
    console.log('Selected Vision Model:', selectedVisionModel);
  };

  if (isLoading) return <div>Loading models...</div>;
  if (error) return <div>Error loading models: {error.message}</div>;

  const textModels = ollamaModels?.models.filter(model => !model.includes('vision')) || [];
  const visionModels = ollamaModels?.models.filter(model => model.includes('vision')) || [];

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
          <label htmlFor="text-model-select" className="block mb-2">Choose Text LLM for Agents</label>
          <Select onValueChange={setSelectedTextModel} value={selectedTextModel}>
            <SelectTrigger id="text-model-select" className="w-full bg-gray-800 text-cyan-300 border-cyan-500">
              <SelectValue placeholder="Select Ollama text model" />
            </SelectTrigger>
            <SelectContent>
              {textModels.map((model) => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="vision-model-select" className="block mb-2">Choose Vision LLM for Agents</label>
          <Select onValueChange={setSelectedVisionModel} value={selectedVisionModel}>
            <SelectTrigger id="vision-model-select" className="w-full bg-gray-800 text-cyan-300 border-cyan-500">
              <SelectValue placeholder="Select Ollama vision model" />
            </SelectTrigger>
            <SelectContent>
              {visionModels.map((model) => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
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