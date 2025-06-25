
import { useState, useEffect, useRef } from "react";
import {
  Upload,
  BookOpen,
  Settings,
  Play,
  Square,
  Mic,
  Timer,
  Eye,
  Moon,
  Focus,
  Zap,
  FileText,
  Volume2,
  RotateCcw,
  Flame,
  PlayCircle,
  PauseCircle,
  StopCircle,
} from "lucide-react";

import FaceDetectionMini from "./FaceDetectionMini"


export default function NeuroNavApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [calmMode, setCalmMode] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [voiceStyle, setVoiceStyle] = useState("friendly");
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(80);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [streak, setStreak] = useState(0);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [attentionSpan, setAttentionSpan] = useState(null);
  const [summarizedParagraphs, setSummarizedParagraphs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  
  const faceRef = useRef();
  const speechSynthesis = window.speechSynthesis;
  const fileInputRef = useRef();

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white"
    : "bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700"
    : "bg-white/80 border-gray-200";

  const fontClass = dyslexicFont ? "font-mono" : "font-sans";

  // Focus Mode Variables and Hooks
  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => setTimerMinutes((prev) => prev + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  useEffect(() => {
    if (!goalAchieved && timerMinutes >= 2) {
      setGoalAchieved(true);
      setStreak((prev) => prev + 1);
    }
  }, [timerMinutes, goalAchieved]);

  const handleStart = () => {
    setIsTimerRunning(true);
    if (!isTimerRunning) setStreak((s) => s + 1);
    faceRef.current?.startDetection();
  };

  const handlePause = () => {
    setIsTimerRunning(false);
    faceRef.current?.stopDetection();
  };

  const handleReset = () => {
    setTimerMinutes(0);
    setIsTimerRunning(false);
    setGoalAchieved(false);
    faceRef.current?.stopDetection();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // File handling
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      handleFileRead(file);
    }
  };

  const handleFileRead = async (file) => {
    setIsProcessing(true);
    try {
      let text = "";
      
      if (file.type === "application/pdf") {
        // For PDF files, we'll simulate reading the content
        // In a real implementation, you'd use a PDF parsing library
        text = "This is a sample PDF content. In a real implementation, you would use a PDF parsing library like pdf-parse or PDF.js to extract text from the PDF file. This content would then be processed and summarized into digestible paragraphs for better learning.";
      } else if (file.type === "text/plain" || file.type.includes("text")) {
        text = await file.text();
      } else {
        alert("Please upload a text file or PDF");
        setIsProcessing(false);
        return;
      }
      
      // Combine file content with text input
      const combinedText = [text, textInput].filter(Boolean).join("\n\n");
      await processcontent(combinedText);
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Error reading file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Content processing and summarization
  

  const createSummary = (text) => {
    // Simple summarization logic - in a real app, you'd use AI
    const words = text.split(' ');
    if (words.length <= 20) return text;
    
    // Take first and last parts of the text for summary
    const firstPart = words.slice(0, 10).join(' ');
    const lastPart = words.slice(-10).join(' ');
    return `${firstPart}... ${lastPart}`;
  };

const processcontent = async () => {
  if (!textInput.trim() && !uploadedFile) {
    alert("Please provide content to process!");
    return;
  }

  setIsProcessing(true);
  try {
    const formData = new FormData();
    if (uploadedFile) formData.append('file', uploadedFile);
    if (textInput.trim()) formData.append('prompt', textInput);

    const response = await fetch('http://localhost:5000/api/data/summarize', {
      method: 'POST',
      body: formData // No headers!
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "API request failed");
    }

    const { paragraphs } = await response.json();

    const formattedParagraphs = paragraphs.map((summary, index) => ({
      id: index,
      title: `Section ${index + 1}`,
      summary: summary,
      keyPoints: []
    }));

    setSummarizedParagraphs(formattedParagraphs);

  } catch (error) {
    console.error("API Error:", error);
    alert("Summarization failed. Please try again.");
  } finally {
    setIsProcessing(false);
  }
};



  // Text-to-Speech functionality
 const speakText = (text, paragraphId) => {
  // If the same paragraph is playing, stop it
  if (currentlyPlaying === paragraphId) {
    speechSynthesis.cancel();
    setCurrentlyPlaying(null);
    return;
  }
  // If another paragraph is playing, stop it first
  if (currentlyPlaying !== null) {
    speechSynthesis.cancel();
    setCurrentlyPlaying(null);
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = speed;
  utterance.volume = volume / 100;
  // ... set voice as before

  utterance.onstart = () => setCurrentlyPlaying(paragraphId);
  utterance.onend = () => setCurrentlyPlaying(null);
  utterance.onerror = () => setCurrentlyPlaying(null);

  speechSynthesis.speak(utterance);
};


  const stopSpeech = () => {
    speechSynthesis.cancel();
    setCurrentlyPlaying(null);
  };

  return (
    <div
      className={`min-h-screen ${themeClasses} ${fontClass} transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">NeuroNav</h1>
            <p className="text-sm opacity-75">AI-Powered Learning Companion</p>
          </div>
        </div>
        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          🎯 Focus Mode Ready
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-6 pb-6">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Smart Learning Hub */}
          <div
            className={`${cardClasses} backdrop-blur-sm rounded-2xl p-6 border shadow-xl`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Smart Learning Hub</h2>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center mb-6 hover:border-purple-400 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Drop your content here or browse
              </h3>
              <p className="text-sm opacity-75 mb-4">
                PDFs, Word docs, or plain text • AI will optimize it for your learning style
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                ✨ Choose File
              </button>
              {uploadedFile && (
                <p className="text-sm mt-2 text-green-600">
                  ✓ {uploadedFile.name} uploaded
                </p>
              )}
            </div>

            {/* Text Input Area */}
            <div className="mb-6">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Or paste your text here… I'll help make it perfect for your brain! 🧠✨"
                className={`w-full h-32 p-4 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none resize-none ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white"
                }`}
              />
            </div>

            {/* Transform Button */}
            <button 
              onClick={processcontent}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Content...
                </span>
              ) : (
                "✨ Transform My Content ✨"
              )}
            </button>
          </div>

          {/* Summarized Content Display */}
          
              {/* Summarized Content Display */}
{summarizedParagraphs.length > 0 && (
  <div className={`${cardClasses} backdrop-blur-sm rounded-2xl p-6 border shadow-xl`}>
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
        <BookOpen className="w-5 h-5 text-white" />
      </div>
      <h2 className="text-xl font-bold">Summarized Content</h2>
    </div>
    {/* All summaries in one box */}
    <div>
      {summarizedParagraphs.map((paragraph) => (
        <div key={paragraph.id} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-purple-600">{paragraph.title}</h3>
            <button
              onClick={() => speakText(paragraph.summary, paragraph.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-1 text-xs"
            >
              <PlayCircle className="w-3 h-3" />
              <span>Play</span>
            </button>
          </div>
          <p className="text-sm leading-relaxed">{paragraph.summary}</p>
        </div>
      ))}
    </div>
  </div>
)}

           

          {/* Voice Assistant */}
          <div
            className={`${cardClasses} backdrop-blur-sm rounded-2xl p-6 border shadow-xl`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Voice Assistant</h2>
            </div>

            {/* Voice Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Voice Style
                </label>
                <select
                  value={voiceStyle}
                  onChange={(e) => setVoiceStyle(e.target.value)}
                  className={`w-full p-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white"
                  }`}
                >
                  <option value="friendly">😊 Friendly</option>
                  <option value="professional">👔 Professional</option>
                  <option value="casual">😎 Casual</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Speed: {speed}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Volume2 className="w-4 h-4 inline mr-1" />
                    Volume: {volume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div
              className={`mt-4 p-3 rounded-xl ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } text-sm`}
            >
              {summarizedParagraphs.length > 0 
                ? "🎵 Content ready for text-to-speech! Use the play buttons above." 
                : "📄 Add some content above to enable voice reading."
              }
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Accessibility Panel */}
          <div
            className={`${cardClasses} backdrop-blur-sm rounded-2xl p-6 border shadow-xl`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Accessibility</h2>
            </div>

            <div className="space-y-4">
              {/* Dyslexic Font Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="font-medium">Dyslexic Font</div>
                    <div className="text-sm opacity-75">Easier reading</div>
                  </div>
                </div>
                <button
                  onClick={() => setDyslexicFont(!dyslexicFont)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    dyslexicFont ? "bg-yellow-400" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      dyslexicFont ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-sm opacity-75">Better contrast</div>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    isDarkMode ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      isDarkMode ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Focus Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Focus className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="font-medium">Focus Mode</div>
                    <div className="text-sm opacity-75">Highlight text</div>
                  </div>
                </div>
                <button
                  onClick={() => setFocusMode(!focusMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    focusMode ? "bg-yellow-400" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      focusMode ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Calm Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="font-medium">Calm Mode</div>
                    <div className="text-sm opacity-75">Less animation</div>
                  </div>
                </div>
                <button
                  onClick={() => setCalmMode(!calmMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    calmMode ? "bg-yellow-400" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      calmMode ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Success Message */}
            <div className="mt-6 bg-green-100 border border-green-200 text-green-800 p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <span>🎯</span>
                <span className="font-medium">
                  Your interface is optimized for learning!
                </span>
              </div>
            </div>
          </div>

          {/* Focus Timer */}
          <div
            className={`${cardClasses} backdrop-blur-sm rounded-2xl p-6 border shadow-xl`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Timer className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Focus Timer</h2>
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-purple-500 mb-2">
                {formatTime(timerMinutes)}
              </div>
              <div className="text-sm opacity-75 mb-4">
                Deep focus time today
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Daily Goal</div>
                <div className="text-lg font-bold">
                  {Math.floor(timerMinutes / 60)} / 1min
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-500 h-2 rounded-full w-0"></div>
                </div>
                <div className="text-xs opacity-75 mt-1">
                  {Math.floor((timerMinutes / 120) * 100)}% complete
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {!isTimerRunning ? (
                <button
                  type="button"
                  onClick={handleStart}
                  className="bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePause}
                  className="bg-orange-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Square className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="bg-yellow-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-medium">Streak:</span>
              <span className="font-bold">{streak} days</span>
            </div>
          </div>

          {/* Focus Mode Camera */}
          {attentionSpan !== null && (
            <div className="text-center text-sm text-blue-700 font-medium">
              Attention Span: {attentionSpan}%
            </div>
          )}

          <FaceDetectionMini
            ref={faceRef}
            setAttentionSpan={setAttentionSpan}
          />
        </div>
      </div>
    </div>
  );
}