import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import CrewAITools from '../components/CrewAITools';
import UpsonicTiger from '../components/UpsonicTiger';
import AdvancedInternetInteraction from '../components/AdvancedInternetInteraction';
import CodeExecution from '../components/CodeExecution';

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
  const [selectedEmbeddingModel, setSelectedEmbeddingModel] = useState('');
  const [continuousMode, setContinuousMode] = useState(false);
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentActions, setAgentActions] = useState({ previous: '', current: '', next: '' });
  const [update, setUpdate] = useState('');
  const [isUpsonicTigerVisible, setIsUpsonicTigerVisible] = useState(false);
  const [isAdvancedInternetInteractionVisible, setIsAdvancedInternetInteractionVisible] = useState(false);
  const [isCodeExecutionVisible, setIsCodeExecutionVisible] = useState(false);

  const { data: ollamaModels, isLoading, error } = useQuery({
    queryKey: ['ollamaModels'],
    queryFn: fetchOllamaModels,
  });

  useEffect(() => {
    const backupInterval = setInterval(() => {
      // Implement backup logic
      console.log('Backing up data...');
    }, 15 * 60 * 1000);

    return () => clearInterval(backupInterval);
  }, []);

  const handleStartExecution = () => {
    // Implement crew execution logic
    console.log('Starting crew execution...');
  };

  const handleAutoGenerateAgents = () => {
    const newAgents = Array.from({ length: numAgents }, (_, index) => ({
      id: index + 1,
      role: `Agent ${index + 1}`,
      goal: '',
      backstory: '',
    }));
    setAgents(newAgents);
  };

  const handleAutoGenerateTasks = () => {
    // Implement task auto-generation logic
    console.log('Auto-generating tasks...');
  };

  const handleUploadFiles = () => {
    // Implement file upload logic
    console.log('Uploading files...');
  };

  const handleAddTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, description: '', assignedTo: null }]);
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskDescriptionChange = (taskId, description) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, description } : task));
  };

  const handleAssignTask = (taskId, agentId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, assignedTo: agentId } : task));
  };

  if (isLoading) return <div className="loading">Loading models...</div>;
  if (error) return <div className="error">Error loading models: {error.message}</div>;

  const textModels = ollamaModels?.models.filter(model => !model.includes('vision')) || [];
  const visionModels = ollamaModels?.models.filter(model => model.includes('vision')) || [];

  return (
    <div className="min-h-screen bg-black text-cyan-300 p-8 retro-futuristic">
      <motion.h1 
        className="text-4xl font-bold mb-8 glow-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AutoCrew
      </motion.h1>
      
      <div className="space-y-6">
        <div className="terminal-window">
          <label htmlFor="objectives" className="block mb-2">Objectives</label>
          <Textarea
            id="objectives"
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            className="w-full bg-gray-800 text-cyan-300 border-cyan-500 terminal-input"
            placeholder="Enter main objectives for AI agents"
          />
        </div>

        <div className="hologram-select">
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

        <div className="hologram-select">
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

        <div className="hologram-select">
          <label htmlFor="embedding-model-select" className="block mb-2">Choose Embedding Model</label>
          <Select onValueChange={setSelectedEmbeddingModel} value={selectedEmbeddingModel}>
            <SelectTrigger id="embedding-model-select" className="w-full bg-gray-800 text-cyan-300 border-cyan-500">
              <SelectValue placeholder="Select embedding model" />
            </SelectTrigger>
            <SelectContent>
              {textModels.map((model) => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="slider-container">
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

        <Button
          onClick={handleAutoGenerateAgents}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white illuminated-button"
        >
          AUTO-GENERATE AGENTS
        </Button>

        {agents.map((agent) => (
          <Card key={agent.id} className="bg-gray-800 border-cyan-500">
            <CardHeader>
              <CardTitle>Agent {agent.id} Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Role"
                value={agent.role}
                onChange={(e) => {
                  const updatedAgents = agents.map(a => a.id === agent.id ? { ...a, role: e.target.value } : a);
                  setAgents(updatedAgents);
                }}
                className="mb-2"
              />
              <Input
                placeholder="Goal"
                value={agent.goal}
                onChange={(e) => {
                  const updatedAgents = agents.map(a => a.id === agent.id ? { ...a, goal: e.target.value } : a);
                  setAgents(updatedAgents);
                }}
                className="mb-2"
              />
              <Textarea
                placeholder="Backstory"
                value={agent.backstory}
                onChange={(e) => {
                  const updatedAgents = agents.map(a => a.id === agent.id ? { ...a, backstory: e.target.value } : a);
                  setAgents(updatedAgents);
                }}
              />
              <CrewAITools agentId={agent.id} />
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={handleAutoGenerateTasks}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white illuminated-button"
        >
          AUTO-GENERATE TASKS
        </Button>

        <div className="flex items-center space-x-2 switch-container">
          <Checkbox
            id="continuous-mode"
            checked={continuousMode}
            onCheckedChange={setContinuousMode}
            className="neon-checkbox"
          />
          <label
            htmlFor="continuous-mode"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Continuous Mode
          </label>
        </div>

        <Button
          onClick={handleUploadFiles}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white illuminated-button"
        >
          UPLOAD FILES
        </Button>

        <Card className="bg-gray-800 border-cyan-500">
          <CardHeader>
            <CardTitle>Task Management</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.map((task) => (
              <div key={task.id} className="mb-4 flex items-center space-x-2">
                <Input
                  value={task.description}
                  onChange={(e) => handleTaskDescriptionChange(task.id, e.target.value)}
                  placeholder={`Task ${task.id}`}
                  className="flex-grow"
                />
                <Select onValueChange={(value) => handleAssignTask(task.id, value)} value={task.assignedTo}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Assign to Agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id.toString()}>Agent {agent.id}</SelectItem>
                    ))}
                    <SelectItem value="master">MASTER AGENT</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => handleRemoveTask(task.id)} variant="destructive">-</Button>
              </div>
            ))}
            <Button onClick={handleAddTask} className="mt-2">+ Add Task</Button>
          </CardContent>
        </Card>

        <Button
          onClick={handleStartExecution}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white illuminated-button"
        >
          Start Crew Execution
        </Button>

        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white illuminated-button"
        >
          START/STOP
        </Button>

        <Card className="bg-gray-800 border-cyan-500">
          <CardHeader>
            <CardTitle>Selected Agent: {selectedAgent ? `Agent ${selectedAgent}` : 'None'}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gray-800 border-cyan-500">
          <CardHeader>
            <CardTitle>Agent Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Previous: {agentActions.previous}</div>
            <div>Current: {agentActions.current}</div>
            <div>Next: {agentActions.next}</div>
          </CardContent>
        </Card>

        <div className="terminal-window">
          <label htmlFor="update" className="block mb-2">Update</label>
          <div className="flex space-x-2">
            <Input
              id="update"
              value={update}
              onChange={(e) => setUpdate(e.target.value)}
              className="flex-grow bg-gray-800 text-cyan-300 border-cyan-500 terminal-input"
              placeholder="Enter update for agents"
            />
            <Button onClick={() => {
              // Implement update logic
              console.log('Sending update:', update);
              setUpdate('');
            }}>
              Enter
            </Button>
          </div>
        </div>

        <Button
          onClick={() => setIsUpsonicTigerVisible(!isUpsonicTigerVisible)}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white illuminated-button"
        >
          UPSONIC TIGER
        </Button>

        {isUpsonicTigerVisible && (
          <UpsonicTiger onClose={() => setIsUpsonicTigerVisible(false)} />
        )}

        <Button
          onClick={() => setIsAdvancedInternetInteractionVisible(!isAdvancedInternetInteractionVisible)}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white illuminated-button"
        >
          ADVANCED INTERNET INTERACTION
        </Button>

        {isAdvancedInternetInteractionVisible && (
          <AdvancedInternetInteraction onClose={() => setIsAdvancedInternetInteractionVisible(false)} />
        )}

        <Button
          onClick={() => setIsCodeExecutionVisible(!isCodeExecutionVisible)}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white illuminated-button"
        >
          CODE EXECUTION
        </Button>

        {isCodeExecutionVisible && (
          <CodeExecution onClose={() => setIsCodeExecutionVisible(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;