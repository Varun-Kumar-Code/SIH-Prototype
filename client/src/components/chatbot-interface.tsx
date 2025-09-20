import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  Minimize2, 
  Maximize2, 
  X, 
  Send, 
  Bot,
  Mic,
  Settings
} from "lucide-react";
import FeatureSelector from "@/components/FeatureSelector";
import LanguageSelector from "@/components/LanguageSelector";
import { Message, Feature, Language } from "@/types/chatbot-types";
import { 
  getItinerary, 
  getLocationSuggestion, 
  getLanguageHelp, 
  recommendSouvenirs, 
  getGeneralResponse 
} from "@/services/aiService";

interface ChatbotInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatbotInterface({ isOpen, onClose }: ChatbotInterfaceProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Jharkhand Tourism AI Assistant. I can help you with itineraries, souvenirs, locations, and language assistance. How can I make your Jharkhand experience amazing today?",
      sender: 'bot',
      timestamp: new Date(),
      feature: Feature.GENERAL
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFeatureSelect = async (feature: Feature) => {
    setSelectedFeature(feature);
    setIsLoading(true);
    
    try {
      let response: Message;
      switch (feature) {
        case Feature.ITINERARY:
          response = await getItinerary("I want to plan a trip to Jharkhand", currentLanguage);
          break;
        case Feature.SOUVENIR:
          response = await recommendSouvenirs("Show me Jharkhand souvenirs", currentLanguage);
          break;
        case Feature.LOCATION:
          response = await getLocationSuggestion("Tell me about Jharkhand locations", currentLanguage);
          break;
        case Feature.LANGUAGE:
          response = await getLanguageHelp("Help me with Jharkhand languages", currentLanguage);
          break;
        default:
          response = await getGeneralResponse("Hello", currentLanguage);
      }
      
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error("Error getting feature response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await getGeneralResponse(inputValue, currentLanguage);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    console.log("Voice recording:", !isRecording);
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setShowLanguageSelector(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Full-Screen Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          />
          
          {/* Full-Screen Chat Window */}
          <div className="relative w-full max-w-4xl h-[90vh] mx-4 bg-card rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 border border-border flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-bounce">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Zoiee</h2>
                  <p className="text-sm text-muted-foreground">Jharkhand Tourism Assistant</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <Minimize2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Language Selector */}
            {showLanguageSelector && (
              <div className="px-6 py-3 border-b border-border bg-muted/20 flex-shrink-0">
                <LanguageSelector 
                  selectedLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                  isExpanded={true}
                />
              </div>
            )}

            {/* Feature Selector */}
            <div className="px-6 py-3 border-b border-border flex-shrink-0">
              <FeatureSelector 
                onSelectFeature={handleFeatureSelect}
                language={currentLanguage}
                isExpanded={true}
              />
            </div>

            {/* Messages Area */}
            <div className="flex-1 px-6 py-4 overflow-y-auto">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'bot' ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                        message.sender === 'bot'
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      } animate-in slide-in-from-bottom-2 duration-300`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="px-6 py-4 border-t border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Jharkhand tourism..."
                  className="flex-1 px-4 py-3 rounded-xl border-border focus:border-primary focus:ring-primary h-12"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleMicClick}
                  size="icon"
                  variant="outline"
                  className={`w-12 h-12 flex-shrink-0 rounded-xl transition-colors ${
                    isRecording 
                      ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive" 
                      : "border-border hover:bg-accent hover:text-accent-foreground"
                  }`}
                  disabled={isLoading}
                >
                  <Mic className={`w-5 h-5 ${isRecording ? "animate-pulse" : ""}`} />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="w-12 h-12 flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Chat Window */}
      {!isExpanded && (
        <div className="fixed bottom-4 right-4 z-40 animate-in slide-in-from-bottom-4 duration-300">
          <div className="w-80 h-[500px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border rounded-t-2xl bg-primary flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary-foreground">Zoiee</h3>
                  <p className="text-xs text-primary-foreground/80">Tourism Assistant</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(true)}
                  className="w-6 h-6 hover:bg-primary/20 text-primary-foreground"
                >
                  <Maximize2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="w-6 h-6 hover:bg-primary/20 text-primary-foreground"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Feature Selector - Minimized */}
            <div className="px-3 py-2 border-b border-border flex-shrink-0">
              <FeatureSelector 
                onSelectFeature={handleFeatureSelect}
                language={currentLanguage}
                isExpanded={false}
              />
            </div>

            {/* Messages Area */}
            <div className="flex-1 px-4 py-2 overflow-y-auto">
              <div className="space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'bot' ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[180px] px-2 py-1.5 rounded-lg text-xs whitespace-pre-wrap ${
                        message.sender === 'bot'
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="leading-tight">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="px-3 py-2 border-t border-border flex-shrink-0">
              <div className="flex items-center gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Jharkhand..."
                  className="flex-1 px-3 py-2 text-xs rounded-lg border-border focus:border-primary focus:ring-primary h-8"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleMicClick}
                  size="icon"
                  variant="outline"
                  className={`w-8 h-8 flex-shrink-0 rounded-lg transition-colors ${
                    isRecording 
                      ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive" 
                      : "border-border hover:bg-accent hover:text-accent-foreground"
                  }`}
                  disabled={isLoading}
                >
                  <Mic className={`w-3 h-3 ${isRecording ? "animate-pulse" : ""}`} />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="w-8 h-8 flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}