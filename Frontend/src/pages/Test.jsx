import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUpload, FiHeadphones, FiBook, FiEye, FiPlay, FiPause, FiChevronDown } from 'react-icons/fi';

const UnifiedLearningCopilot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your learning copilot. Upload a file or describe what you're studying, and I'll help make it easier to understand!", isUser: false, timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [attentionLevel, setAttentionLevel] = useState(88);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sample content for demonstration
  const sampleContent = `Neuroplasticity refers to the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This process allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or changes in their environment.`;
  
  const simplifiedContent = `Neuroplasticity means your brain can change and adapt. It forms new connections to heal from injuries and adjust to new environments.`;
  
  const quizExamples = [
    {
      question: "What is neuroplasticity?",
      options: ["A fixed brain structure", "The brain's ability to change", "A neurological disorder"],
      correct: 1
    }
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: "I've processed your request. How would you like me to help?",
        isUser: false,
        timestamp: new Date(),
        actions: ['simplify', 'quiz', 'podcast', 'explain']
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const userMessage = {
        id: messages.length + 1,
        text: `Uploaded file: ${file.name}`,
        isUser: true,
        timestamp: new Date(),
        file: file
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate processing
      setTimeout(() => {
        const aiMessage = {
          id: messages.length + 2,
          text: "I've processed your document! Here's what I can do with it:",
          isUser: false,
          timestamp: new Date(),
          actions: ['simplify', 'quiz', 'podcast', 'summary']
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1500);
    }
  };

  // Handle action button clicks
  const handleActionClick = (action) => {
    let response = {};
    
    switch(action) {
      case 'simplify':
        response = {
          text: "I've simplified the content for easier understanding:",
          isUser: false,
          content: simplifiedContent,
          contentType: 'simplified'
        };
        setActiveFeature('simplify');
        break;
        
      case 'quiz':
        response = {
          text: "Here's a quick quiz to test your understanding:",
          isUser: false,
          content: quizExamples,
          contentType: 'quiz'
        };
        setActiveFeature('quiz');
        break;
        
      case 'podcast':
        response = {
          text: "I've generated a podcast episode for you:",
          isUser: false,
          content: "Neuroplasticity Explained Podcast",
          contentType: 'podcast'
        };
        setActiveFeature('podcast');
        break;
        
      case 'explain':
        response = {
          text: "Let me explain this concept in more detail:",
          isUser: false,
          content: "Neuroplasticity is like your brain's superpower. It allows your brain to reorganize itself by forming new connections between neurons. This means your brain isn't fixed - it can change and adapt throughout your life!",
          contentType: 'explanation'
        };
        break;
        
      default:
        response = {
          text: "I'm not sure how to help with that. Try one of these actions:",
          isUser: false,
          actions: ['simplify', 'quiz', 'podcast', 'explain']
        };
    }
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      ...response,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <FiBook className="h-8 w-8 mr-3" />
            <h1 className="text-2xl font-bold tracking-tight">Personalized Learning Copilot</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Focus Level: {attentionLevel}%</span>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
            >
              <FiEye className="mr-1" /> 
              <span>{isExpanded ? 'Minimize' : 'Expand'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Conditionally expanded */}
        {isExpanded && (
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Attention Monitoring</h2>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                  style={{ width: `${attentionLevel}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Distracted</span>
                <span>Focused</span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Features</h2>
              <div className="space-y-3">
                {activeFeature && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-1 capitalize">{activeFeature} Mode</h3>
                    <p className="text-sm text-blue-700">Currently active in chat</p>
                  </div>
                )}
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200">
                  <span>Text Simplification</span>
                  <FiChevronDown />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200">
                  <span>Quiz Generation</span>
                  <FiChevronDown />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200">
                  <span>Podcast Creation</span>
                  <FiChevronDown />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`max-w-3xl mx-auto ${message.isUser ? 'ml-auto' : ''}`}
              >
                <div className={`rounded-2xl p-5 ${message.isUser ? 'bg-indigo-600 text-white' : 'bg-white shadow-sm border border-gray-200'}`}>
                  {message.file ? (
                    <div className="flex items-center">
                      <FiUpload className="mr-2" />
                      <span>{message.text}</span>
                    </div>
                  ) : (
                    <>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      
                      {/* Display content based on type */}
                      {message.contentType === 'simplified' && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-lg">{message.content}</p>
                          <button className="mt-3 flex items-center text-blue-600">
                            <FiHeadphones className="mr-1" /> Play Audio Narration
                          </button>
                        </div>
                      )}
                      
                      {message.contentType === 'quiz' && message.content && (
                        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <h3 className="font-medium text-yellow-800 mb-2">{message.content[0].question}</h3>
                          <div className="space-y-2">
                            {message.content[0].options.map((option, index) => (
                              <div key={index} className="p-3 bg-white border border-gray-300 rounded-lg">
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {message.contentType === 'podcast' && (
                        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200 flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                          <div className="flex-1">
                            <h3 className="font-medium text-purple-800">{message.content}</h3>
                            <p className="text-sm text-purple-700">Duration: 5:24</p>
                            <button className="mt-2 flex items-center text-purple-600">
                              <FiPlay className="mr-1" /> Play Podcast
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {message.contentType === 'explanation' && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-gray-700">{message.content}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Action buttons */}
                  {message.actions && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(action)}
                          className="px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg text-sm"
                        >
                          {action === 'simplify' && 'Simplify Text'}
                          {action === 'quiz' && 'Create Quiz'}
                          {action === 'podcast' && 'Make Podcast'}
                          {action === 'explain' && 'Explain Concept'}
                          {action === 'summary' && 'Generate Summary'}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className={`mt-2 text-xs ${message.isUser ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="max-w-3xl mx-auto flex">
              <div className="flex-1 flex bg-gray-100 rounded-xl">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Message your learning copilot..."
                  className="flex-1 bg-transparent px-4 py-3 focus:outline-none"
                />
                
                <label className="cursor-pointer p-3 text-gray-600 hover:text-indigo-600">
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.txt"
                  />
                  <FiUpload />
                </label>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`ml-3 w-14 h-14 flex items-center justify-center rounded-xl ${
                  inputText.trim() 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <FiSend />
              </button>
            </div>
            
            <div className="max-w-3xl mx-auto mt-3 flex flex-wrap gap-2">
              <button 
                onClick={() => handleActionClick('simplify')}
                className="flex items-center px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm"
              >
                <FiBook className="mr-1" /> Simplify Text
              </button>
              <button 
                onClick={() => handleActionClick('quiz')}
                className="flex items-center px-3 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-sm"
              >
                Generate Quiz
              </button>
              <button 
                onClick={() => handleActionClick('podcast')}
                className="flex items-center px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm"
              >
                <FiHeadphones className="mr-1" /> Create Podcast
              </button>
              <button 
                onClick={() => handleActionClick('explain')}
                className="flex items-center px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm"
              >
                Explain Concept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLearningCopilot;
