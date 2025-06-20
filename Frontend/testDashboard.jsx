import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Eye,
  EyeOff,
  Settings,
  BookOpen,
  Headphones,
  Brain,
  Lightbulb,
  FileText,
  Mic,
  Camera,
  CameraOff,
  Focus,
  Timer,
  BarChart3,
  User,
  LogOut,
  Upload,
  Download,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [attentionMonitoring, setAttentionMonitoring] = useState(false);
  const [currentContent, setCurrentContent] = useState("");
  const [focusScore, setFocusScore] = useState(85);
  const [learningMode, setLearningMode] = useState("visual");
  const [fontSize, setFontSize] = useState("medium");
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [distractionLevel, setDistractionLevel] = useState("low");

  // Simulate session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleAttentionMonitoring = () => {
    setAttentionMonitoring(!attentionMonitoring);
  };

  const sampleContent = `Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed. It involves algorithms that can identify patterns, make predictions, and improve their performance over time through experience.`;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${
        dyslexiaFont ? "font-mono" : "font-sans"
      }`}
    >
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-indigo-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Learning Copilot
                </h1>
                <p className="text-sm text-gray-600">
                  Personalized AI-Powered Education
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <Timer className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {formatTime(sessionTime)}
                </span>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <Settings className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <User className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                  <Upload className="h-8 w-8 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-indigo-900">
                    Upload Content
                  </span>
                </button>
                <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <Headphones className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-900">
                    Create Podcast
                  </span>
                </button>
                <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <FileText className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-900">
                    Simplify Text
                  </span>
                </button>
                <button className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-orange-900">
                    Progress Report
                  </span>
                </button>
              </div>
            </div>

            {/* Learning Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
                  Current Lesson: Introduction to Machine Learning
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Learning Mode:</span>
                  <select
                    value={learningMode}
                    onChange={(e) => setLearningMode(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="visual">Visual</option>
                    <option value="auditory">Auditory</option>
                    <option value="multimodal">Multi-modal</option>
                  </select>
                </div>
              </div>

              {/* Content Display */}
              <div
                className={`p-6 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 mb-6 ${
                  fontSize === "large"
                    ? "text-lg"
                    : fontSize === "small"
                    ? "text-sm"
                    : "text-base"
                }`}
              >
                <p className="text-gray-800 leading-relaxed">{sampleContent}</p>
              </div>

              {/* Media Controls */}
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                    <span>{isPlaying ? "Pause" : "Play"} Audio</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Headphones className="h-5 w-5" />
                    <span>Generate Podcast</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-gray-600" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="70"
                    className="w-20 accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-6 w-6 text-yellow-600 mr-2" />
                AI Insights & Recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Learning Pattern
                  </h3>
                  <p className="text-sm text-blue-800">
                    You learn best with visual aids and shorter content blocks.
                    Consider breaking down complex topics.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">
                    Attention Span
                  </h3>
                  <p className="text-sm text-green-800">
                    Your focus is strongest in 15-minute intervals. Take breaks
                    to maintain optimal learning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Attention Monitoring */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Focus className="h-5 w-5 text-red-600 mr-2" />
                Attention Monitor
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Camera Monitoring
                  </span>
                  <button
                    onClick={toggleAttentionMonitoring}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      attentionMonitoring
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {attentionMonitoring ? (
                      <Camera className="h-4 w-4" />
                    ) : (
                      <CameraOff className="h-4 w-4" />
                    )}
                    <span>{attentionMonitoring ? "On" : "Off"}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus Score</span>
                    <span className="font-medium text-green-600">
                      {focusScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${focusScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Distraction Level</span>
                    <span
                      className={`font-medium ${
                        distractionLevel === "low"
                          ? "text-green-600"
                          : distractionLevel === "medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {distractionLevel.charAt(0).toUpperCase() +
                        distractionLevel.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 text-blue-600 mr-2" />
                Accessibility
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size
                  </label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Dyslexia-Friendly Font
                  </span>
                  <button
                    onClick={() => setDyslexiaFont(!dyslexiaFont)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      dyslexiaFont ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        dyslexiaFont ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
                Today's Progress
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Lessons Completed
                  </span>
                  <span className="font-bold text-purple-600">3/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Study Time</span>
                  <span className="font-bold text-purple-600">
                    {formatTime(sessionTime)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Focus Average</span>
                  <span className="font-bold text-purple-600">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  60% of daily goal achieved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
