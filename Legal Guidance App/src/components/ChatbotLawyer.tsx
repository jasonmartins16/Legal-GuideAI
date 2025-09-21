import { useState } from "react";
import { Send, Scale, Download, AlertCircle, CheckCircle, FileText } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  type?: 'text' | 'options' | 'roadmap' | 'template' | 'rights';
  options?: string[];
  data?: any;
}

interface LegalRoadmapStep {
  step: number;
  title: string;
  description: string;
  documents: string[];
  timeframe: string;
  cost: string;
}

export function ChatbotLawyer() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      message: 'Hello! I\'m your AI Legal Assistant. I\'ll help you understand your legal options and create a customized roadmap. What legal issue are you facing today?',
      type: 'options',
      options: [
        'Business/Commercial Issue',
        'Property Dispute',
        'Consumer Complaint',
        'Employment Issue',
        'Criminal Matter',
        'Family Law Issue',
        'Other'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentFlow, setCurrentFlow] = useState<string>('initial');
  const [userContext, setUserContext] = useState<Record<string, any>>({});

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;

    const newMessages = [...messages, { sender: 'user' as const, message: messageToSend }];
    
    // Generate bot response based on current flow and message
    const botResponse = generateBotResponse(messageToSend, currentFlow, userContext);
    newMessages.push(botResponse);
    
    setMessages(newMessages);
    setInputMessage('');
    
    // Update context based on user input
    updateUserContext(messageToSend, currentFlow);
  };

  const updateUserContext = (message: string, flow: string) => {
    const context = { ...userContext };
    
    switch (flow) {
      case 'initial':
        context.issueType = message;
        setCurrentFlow('details');
        break;
      case 'details':
        context.details = message;
        setCurrentFlow('options');
        break;
      case 'options':
        context.preferredOption = message;
        setCurrentFlow('roadmap');
        break;
    }
    
    setUserContext(context);
  };

  const generateBotResponse = (userMessage: string, flow: string, context: Record<string, any>): ChatMessage => {
    switch (flow) {
      case 'initial':
        return {
          sender: 'bot',
          message: `I understand you're dealing with a ${userMessage.toLowerCase()}. Could you provide more specific details about your situation? For example:\n\n• What exactly happened?\n• When did it occur?\n• Who are the parties involved?\n• What outcome are you seeking?`,
          type: 'text'
        };

      case 'details':
        return {
          sender: 'bot',
          message: 'Based on your situation, here are your main legal options. Each has different pros, cons, and requirements:',
          type: 'options',
          options: [
            'Send Legal Notice (Formal warning)',
            'File Consumer Complaint (Cost-effective)',
            'Approach Court (Formal litigation)',
            'Seek Mediation (Mutual resolution)',
            'File Police Complaint (Criminal matters)'
          ]
        };

      case 'options':
        return generateRoadmapResponse(userMessage, context);

      default:
        return {
          sender: 'bot',
          message: 'I can help you with legal guidance, document templates, or explain your rights. What would you like to know?',
          type: 'text'
        };
    }
  };

  const generateRoadmapResponse = (option: string, context: Record<string, any>): ChatMessage => {
    const roadmaps: Record<string, LegalRoadmapStep[]> = {
      'Send Legal Notice': [
        {
          step: 1,
          title: 'Draft Legal Notice',
          description: 'Prepare a formal legal notice outlining your grievance and demands',
          documents: ['Identity proof', 'Supporting evidence', 'Address proof of recipient'],
          timeframe: '1-2 days',
          cost: '₹500-2000 (lawyer fees)'
        },
        {
          step: 2,
          title: 'Send via Registered Post',
          description: 'Send the notice through registered post with acknowledgment',
          documents: ['Legal notice copy', 'Postal receipt'],
          timeframe: '1 day',
          cost: '₹50-100 (postal charges)'
        },
        {
          step: 3,
          title: 'Wait for Response',
          description: 'Give the recipient 15-30 days to respond as mentioned in notice',
          documents: ['Delivery receipt', 'Response (if any)'],
          timeframe: '15-30 days',
          cost: 'No cost'
        },
        {
          step: 4,
          title: 'Next Steps',
          description: 'If no response, proceed with legal action. If positive response, negotiate settlement',
          documents: ['All previous correspondence'],
          timeframe: 'Varies',
          cost: 'Depends on next action'
        }
      ],
      'Consumer Complaint': [
        {
          step: 1,
          title: 'Determine Jurisdiction',
          description: 'Choose appropriate consumer forum based on complaint value',
          documents: ['Purchase receipt', 'Warranty card', 'Correspondence with seller'],
          timeframe: '1 day',
          cost: 'No cost'
        },
        {
          step: 2,
          title: 'Prepare Complaint',
          description: 'Draft complaint with all relevant details and supporting documents',
          documents: ['Complaint form', 'Evidence', 'Court fee receipt'],
          timeframe: '2-3 days',
          cost: '₹100-500 (court fees)'
        },
        {
          step: 3,
          title: 'File Complaint',
          description: 'Submit complaint to consumer forum with required copies',
          documents: ['Original complaint', '2 copies for each respondent'],
          timeframe: '1 day',
          cost: 'No additional cost'
        },
        {
          step: 4,
          title: 'Attend Hearings',
          description: 'Appear for hearings and present your case',
          documents: ['All evidence', 'Witness statements'],
          timeframe: '3-6 months',
          cost: 'Travel expenses'
        }
      ]
    };

    const selectedRoadmap = roadmaps[option] || roadmaps['Send Legal Notice'];

    return {
      sender: 'bot',
      message: `Perfect! Here's your custom roadmap for "${option}":`,
      type: 'roadmap',
      data: {
        title: option,
        steps: selectedRoadmap,
        estimation: {
          totalTime: '1-2 months',
          totalCost: '₹1,000-5,000',
          successRate: '70-80%'
        }
      }
    };
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    switch (message.type) {
      case 'options':
        return (
          <div key={index} className="space-y-3">
            <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
            {message.options && (
              <div className="flex flex-col gap-2">
                {message.options.map((option, optionIndex) => (
                  <Button
                    key={optionIndex}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(option)}
                    className="justify-start"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>
        );

      case 'roadmap':
        return (
          <div key={index} className="space-y-4">
            <div className="flex justify-start">
              <div className="max-w-xs p-3 rounded-lg bg-muted">
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
            
            {message.data && (
              <Card className="p-4">
                <div className="mb-4">
                  <h3 className="mb-2">{message.data.title}</h3>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="outline">⏱️ {message.data.estimation.totalTime}</Badge>
                    <Badge variant="outline">💰 {message.data.estimation.totalCost}</Badge>
                    <Badge variant="outline">📈 {message.data.estimation.successRate}</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {message.data.steps.map((step: LegalRoadmapStep, stepIndex: number) => (
                    <div key={stepIndex} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                          {step.step}
                        </div>
                        <h4 className="font-medium text-sm">{step.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <div className="space-y-1">
                        <div className="flex gap-2 text-xs">
                          <Badge variant="secondary">⏱️ {step.timeframe}</Badge>
                          <Badge variant="secondary">💰 {step.cost}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <strong>Documents needed:</strong> {step.documents.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText size={14} />
                    Get Template
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download size={14} />
                    Download Roadmap
                  </Button>
                </div>
              </Card>
            )}
          </div>
        );

      default:
        return (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              <p className="text-sm whitespace-pre-line">{message.message}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen pb-24">
      <div className="max-w-md mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-background border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Scale size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1>AI Legal Assistant</h1>
              <p className="text-sm text-muted-foreground">Professional legal guidance & roadmaps</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message, index) => renderMessage(message, index))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Describe your legal issue..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage()} size="icon">
              <Send size={16} />
            </Button>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <Alert className="mx-4 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Legal Disclaimer:</strong> This AI provides general legal information only, not legal advice. 
            Always consult with a qualified attorney for specific legal matters. Information accuracy is not guaranteed.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}