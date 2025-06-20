import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Headphones,
  BarChart3,
  Brain,
  Settings,
  User,
  LogOut,
  Sparkles,
  Eye,
  EyeOff,
  Volume2,
  Download,
  Copy,
  RefreshCw,
  ExternalLink,
  Mic,
  FileImage,
  FileVideo,
  File,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";

const Dashboard = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [originalText, setOriginalText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [simplificationLevel, setSimplificationLevel] = useState("medium");
  const [processingStatus, setProcessingStatus] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setProcessingStatus("File uploaded successfully");

      // Simulate reading file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setOriginalText(content.substring(0, 1000) + "..."); // Simulate content preview
      };
      reader.readAsText(file);
    }
  };

  const handleTextSimplification = () => {
    if (!originalText) return;

    setIsProcessing(true);
    setProcessingStatus("AI is simplifying your content...");

    // Simulate AI processing
    setTimeout(() => {
      const simplified = `This is a simplified version of your content. The AI has broken down complex sentences, used simpler vocabulary, and organized the information in a more digestible format. Key concepts are highlighted and explained in easier terms.`;
      setSimplifiedText(simplified);
      setIsProcessing(false);
      setProcessingStatus("Content simplified successfully!");
    }, 2000);
  };

  const openPodcastWindow = () => {
    const podcastWindow = window.open(
      "",
      "podcast",
      "width=800,height=600,scrollbars=yes"
    );
    podcastWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Podcast Generator - Learning Copilot</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
            h1 { color: #4f46e5; text-align: center; margin-bottom: 30px; }
            .podcast-controls { background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; }
            .audio-visualizer { height: 60px; background: linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899); border-radius: 8px; margin: 20px 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
            button { background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; }
            button:hover { background: #4338ca; }
            .settings { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .setting-group { background: #f1f5f9; padding: 15px; border-radius: 8px; }
            select, input[type="range"] { width: 100%; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎧 Podcast Generator</h1>
            <div class="podcast-controls">
              <h3>Convert Your Content to Audio</h3>
              <div class="audio-visualizer">🎵 Audio Preview Will Appear Here 🎵</div>
              <div class="settings">
                <div class="setting-group">
                  <label><strong>Voice Type:</strong></label>
                  <select>
                    <option>Female - Sarah (Calm)</option>
                    <option>Male - David (Clear)</option>
                    <option>Female - Emma (Friendly)</option>
                  </select>
                </div>
                <div class="setting-group">
                  <label><strong>Speed:</strong></label>
                  <input type="range" min="0.5" max="2" step="0.1" value="1">
                  <small>1.0x Normal Speed</small>
                </div>
                <div class="setting-group">
                  <label><strong>Background Music:</strong></label>
                  <select>
                    <option>None</option>
                    <option>Ambient Focus</option>
                    <option>Nature Sounds</option>
                    <option>Soft Piano</option>
                  </select>
                </div>
                <div class="setting-group">
                  <label><strong>Pause Duration:</strong></label>
                  <select>
                    <option>Short (0.5s)</option>
                    <option>Medium (1s)</option>
                    <option>Long (2s)</option>
                  </select>
                </div>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                <button onclick="generatePodcast()">🎙️ Generate Podcast</button>
                <button onclick="downloadAudio()">💾 Download Audio</button>
                <button onclick="window.close()">❌ Close</button>
              </div>
            </div>
          </div>
          <script>
            function generatePodcast() {
              alert('🎉 Podcast generation started! This will take a few moments...');
            }
            function downloadAudio() {
              alert('📥 Audio file will be downloaded once generation is complete!');
            }
          </script>
        </body>
      </html>
    `);
  };

  const openProgressWindow = () => {
    const progressWindow = window.open(
      "",
      "progress",
      "width=900,height=700,scrollbars=yes"
    );
    progressWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Progress Report - Learning Copilot</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
            .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
            h1 { color: #e11d48; text-align: center; margin-bottom: 30px; }
            .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
            .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; text-align: center; }
            .stat-number { font-size: 2.5em; font-weight: bold; margin: 10px 0; }
            .progress-bar { background: #e5e7eb; height: 12px; border-radius: 6px; overflow: hidden; margin: 10px 0; }
            .progress-fill { height: 100%; background: linear-gradient(90deg, #10b981, #059669); transition: width 0.3s ease; }
            .chart-placeholder { height: 200px; background: linear-gradient(45deg, #f3f4f6, #e5e7eb); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 20px 0; color: #6b7280; font-weight: bold; }
            .insights { background: #fef3c7; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #f59e0b; }
            button { background: #e11d48; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 10px 5px; }
            button:hover { background: #be185d; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📊 Your Learning Progress</h1>
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-number">47</div>
                <div>Documents Processed</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">23h</div>
                <div>Total Study Time</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">89%</div>
                <div>Average Focus Score</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">12</div>
                <div>Podcasts Created</div>
              </div>
            </div>

            <h3>📈 Weekly Progress</h3>
            <div class="chart-placeholder">📊 Interactive Charts Will Load Here</div>

            <h3>🎯 Learning Goals</h3>
            <div style="margin: 20px 0;">
              <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>Daily Study Goal</span>
                <span>85%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 85%;"></div>
              </div>
            </div>
            
            <div style="margin: 20px 0;">
              <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>Weekly Content Goal</span>
                <span>67%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 67%;"></div>
              </div>
            </div>

            <div class="insights">
              <h4>🧠 AI Insights</h4>
              <p><strong>Best Learning Time:</strong> You're most focused between 9-11 AM</p>
              <p><strong>Preferred Content:</strong> Visual materials with audio narration work best for you</p>
              <p><strong>Attention Pattern:</strong> You maintain focus for 18-minute intervals on average</p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <button onclick="exportReport()">📥 Export Report</button>
              <button onclick="window.print()">🖨️ Print Report</button>
              <button onclick="window.close()">❌ Close</button>
            </div>
          </div>
          <script>
            function exportReport() {
              alert('📋 Report exported successfully!');
            }
          </script>
        </body>
      </html>
    `);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setProcessingStatus("Text copied to clipboard!");
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 ${
        dyslexiaFont ? "font-mono" : "font-sans"
      }`}
    >
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-indigo-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Learning Copilot
                </h1>
                <p className="text-sm text-gray-600">
                  AI-Powered Content Simplification
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <User className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Upload Content
              </h2>
              <p className="text-gray-600">
                Upload documents, images, or paste text to get started
              </p>
            </div>

            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex space-x-2">
                    <FileText className="h-8 w-8 text-gray-400" />
                    <FileImage className="h-8 w-8 text-gray-400" />
                    <FileVideo className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, TXT, JPG, PNG, MP4
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp4"
              />

              <div className="text-center text-gray-500 font-medium">OR</div>

              <textarea
                placeholder="Paste your text here..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />

              {uploadedFile && (
                <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-800">
                    {uploadedFile.name} uploaded successfully
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Text Simplification */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                AI Text Simplification
              </h2>
              <p className="text-gray-600">
                Make complex content easier to understand
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Simplification Level
                </label>
                <select
                  value={simplificationLevel}
                  onChange={(e) => setSimplificationLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="light">
                    Light - Keep most technical terms
                  </option>
                  <option value="medium">
                    Medium - Balanced simplification
                  </option>
                  <option value="heavy">Heavy - Maximum simplification</option>
                </select>
              </div>

              <button
                onClick={handleTextSimplification}
                disabled={!originalText || isProcessing}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    <span>Simplify Text</span>
                  </>
                )}
              </button>

              {processingStatus && (
                <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    {processingStatus}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={openPodcastWindow}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white p-8 rounded-2xl shadow-xl transition-all duration-200 text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Headphones className="h-8 w-8" />
                  <h3 className="text-2xl font-bold">Create Podcast</h3>
                </div>
                <p className="text-purple-100 mb-4">
                  Convert your content into engaging audio format with AI voice
                  narration
                </p>
                <div className="flex items-center space-x-2 text-purple-200">
                  <span className="text-sm">Open in new window</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={openProgressWindow}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white p-8 rounded-2xl shadow-xl transition-all duration-200 text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <BarChart3 className="h-8 w-8" />
                  <h3 className="text-2xl font-bold">Progress Report</h3>
                </div>
                <p className="text-orange-100 mb-4">
                  View detailed analytics of your learning journey and
                  achievements
                </p>
                <div className="flex items-center space-x-2 text-orange-200">
                  <span className="text-sm">Open in new window</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Content Display */}
        {(originalText || simplifiedText) && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Content Preview
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Font Size:</span>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <button
                  onClick={() => setDyslexiaFont(!dyslexiaFont)}
                  className={`p-2 rounded-lg transition-colors ${
                    dyslexiaFont
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {originalText && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-700">
                      Original Text
                    </h4>
                    <button
                      onClick={() => copyToClipboard(originalText)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <div
                    className={`p-6 bg-gray-50 rounded-xl border-2 border-gray-200 ${
                      fontSize === "large"
                        ? "text-lg"
                        : fontSize === "small"
                        ? "text-sm"
                        : "text-base"
                    }`}
                  >
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {originalText}
                    </p>
                  </div>
                </div>
              )}

              {simplifiedText && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-700">
                      Simplified Text
                    </h4>
                    <button
                      onClick={() => copyToClipboard(simplifiedText)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <div
                    className={`p-6 bg-green-50 rounded-xl border-2 border-green-200 ${
                      fontSize === "large"
                        ? "text-lg"
                        : fontSize === "small"
                        ? "text-sm"
                        : "text-base"
                    }`}
                  >
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {simplifiedText}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Accessibility Panel */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Eye className="h-5 w-5 text-blue-600 mr-2" />
            Accessibility Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="flex items-center space-x-3">
              <Volume2 className="h-5 w-5 text-gray-600" />
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="70"
                className="flex-1 accent-indigo-600"
              />
              <span className="text-sm text-gray-600">70%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Theme:</span>
              <select className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Light</option>
                <option>Dark</option>
                <option>High Contrast</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
