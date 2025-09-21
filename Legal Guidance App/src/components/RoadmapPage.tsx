import { useState } from "react";
import { ArrowLeft, CheckCircle, Clock, AlertCircle, MessageCircle, Send } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface RoadmapPageProps {
  action: string;
  onBack: () => void;
}

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  documents: string[];
  fees: string;
  timeline: string;
  officialLink?: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export function RoadmapPage({ action, onBack }: RoadmapPageProps) {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; message: string }>>([
    { sender: 'bot', message: 'Hi! I can help you adapt this roadmap based on your specific situation. What questions do you have?' }
  ]);
  const [showChat, setShowChat] = useState(false);

  const roadmapData: Record<string, { name: string; steps: RoadmapStep[] }> = {
    'register-company': {
      name: 'Register a Company',
      steps: [
        {
          id: '1',
          title: 'Choose Company Structure',
          description: 'Decide between Private Limited, LLP, or One Person Company based on your needs.',
          documents: ['Business plan', 'Identity proof', 'Address proof'],
          fees: 'Free (consultation)',
          timeline: '1-2 days',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Reserve Company Name',
          description: 'Apply for name availability through MCA portal. Choose 2-3 alternative names.',
          documents: ['DIN application', 'Digital signature'],
          fees: '₹1,000',
          timeline: '1-2 days',
          officialLink: 'https://www.mca.gov.in',
          status: 'in-progress'
        },
        {
          id: '3',
          title: 'Obtain Digital Signature Certificate',
          description: 'Get DSC for all directors and subscribers.',
          documents: ['Identity proof', 'Address proof', 'Photograph'],
          fees: '₹1,500 per person',
          timeline: '1-2 days',
          status: 'pending'
        },
        {
          id: '4',
          title: 'File Incorporation Documents',
          description: 'Submit SPICe+ form with all required documents to MCA.',
          documents: ['MOA', 'AOA', 'SPICe+ form', 'Proof of registered office'],
          fees: '₹4,000-10,000',
          timeline: '10-15 days',
          status: 'pending'
        }
      ]
    },
    'file-fir': {
      name: 'File FIR',
      steps: [
        {
          id: '1',
          title: 'Gather Evidence',
          description: 'Collect all relevant documents, photographs, and witness information.',
          documents: ['Evidence materials', 'Witness statements', 'Medical reports (if applicable)'],
          fees: 'Free',
          timeline: '1-2 days',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Visit Police Station',
          description: 'Go to the nearest police station with jurisdiction over the crime location.',
          documents: ['Identity proof', 'Evidence', 'Written complaint'],
          fees: 'Free',
          timeline: '1 day',
          status: 'in-progress'
        },
        {
          id: '3',
          title: 'File FIR',
          description: 'Provide detailed information about the incident to the investigating officer.',
          documents: ['Signed FIR copy'],
          fees: 'Free',
          timeline: '1 day',
          status: 'pending'
        },
        {
          id: '4',
          title: 'Follow Up',
          description: 'Regular follow-ups with investigating officer for case progress.',
          documents: ['FIR copy', 'Any additional evidence'],
          fees: 'Free',
          timeline: 'Ongoing',
          status: 'pending'
        }
      ]
    },
    'wrongful-termination': {
      name: 'Challenge Wrongful Termination',
      steps: [
        {
          id: '1',
          title: 'Document the Termination',
          description: 'Collect all termination-related documents and communications from your employer.',
          documents: ['Termination letter', 'Employment contract', 'Performance reviews', 'Email communications'],
          fees: 'Free',
          timeline: '1-2 days',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Review Employment Contract',
          description: 'Analyze your employment terms, notice period, and termination clauses.',
          documents: ['Employment agreement', 'Company policies', 'HR handbook'],
          fees: 'Free (self-review) or ₹2,000-5,000 (legal consultation)',
          timeline: '2-3 days',
          status: 'in-progress'
        },
        {
          id: '3',
          title: 'Send Legal Notice',
          description: 'Issue a formal legal notice to your employer demanding reinstatement or compensation.',
          documents: ['Legal notice draft', 'Supporting evidence', 'Proof of service'],
          fees: '₹5,000-15,000',
          timeline: '7-10 days',
          status: 'pending'
        },
        {
          id: '4',
          title: 'File Labor Court Case',
          description: 'If no response, file a case with the appropriate labor court or tribunal.',
          documents: ['Application form', 'Supporting documents', 'Court fees'],
          fees: '₹10,000-50,000',
          timeline: '30-60 days to file',
          officialLink: 'https://labour.gov.in',
          status: 'pending'
        }
      ]
    },
    'wage-dispute': {
      name: 'Recover Unpaid Wages',
      steps: [
        {
          id: '1',
          title: 'Calculate Outstanding Amount',
          description: 'Document all unpaid wages, overtime, bonuses, and statutory benefits.',
          documents: ['Salary slips', 'Bank statements', 'Overtime records', 'Bonus calculations'],
          fees: 'Free',
          timeline: '1-2 days',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Raise Internal Complaint',
          description: 'File a formal complaint with HR department and immediate supervisor.',
          documents: ['Written complaint', 'Proof of submission', 'HR acknowledgment'],
          fees: 'Free',
          timeline: '3-7 days',
          status: 'in-progress'
        },
        {
          id: '3',
          title: 'File Labor Inspector Complaint',
          description: 'Approach the local Labor Inspector if internal complaint fails.',
          documents: ['Complaint application', 'Evidence of wage dues', 'Employment proof'],
          fees: 'Free',
          timeline: '15-30 days',
          officialLink: 'https://labour.gov.in',
          status: 'pending'
        },
        {
          id: '4',
          title: 'Legal Proceedings',
          description: 'File case in Labor Court if Labor Inspector intervention fails.',
          documents: ['Court application', 'All supporting evidence', 'Legal representation'],
          fees: '₹5,000-25,000',
          timeline: '60-90 days',
          status: 'pending'
        }
      ]
    },
    'workplace-harassment': {
      name: 'Address Workplace Harassment',
      steps: [
        {
          id: '1',
          title: 'Document Incidents',
          description: 'Record all harassment incidents with dates, times, witnesses, and evidence.',
          documents: ['Incident diary', 'Screenshots/emails', 'Witness statements', 'Medical reports if applicable'],
          fees: 'Free',
          timeline: 'Ongoing',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Report to Internal Committee',
          description: 'File formal complaint with company\'s Internal Complaints Committee (ICC).',
          documents: ['Written complaint', 'Supporting evidence', 'Witness details'],
          fees: 'Free',
          timeline: '7-10 days',
          status: 'in-progress'
        },
        {
          id: '3',
          title: 'ICC Investigation',
          description: 'Cooperate with ICC investigation process and hearings.',
          documents: ['Additional evidence', 'Statement recordings', 'Medical certificates'],
          fees: 'Free',
          timeline: '90 days (as per POSH Act)',
          status: 'pending'
        },
        {
          id: '4',
          title: 'External Legal Action',
          description: 'If ICC fails to act or you\'re unsatisfied, approach Local Complaints Committee or court.',
          documents: ['ICC complaint copy', 'All evidence', 'Legal representation'],
          fees: '₹10,000-50,000',
          timeline: '30-180 days',
          officialLink: 'https://www.shebox.nic.in',
          status: 'pending'
        }
      ]
    },
    'employment-contract': {
      name: 'Employment Contract Review',
      steps: [
        {
          id: '1',
          title: 'Gather All Documents',
          description: 'Collect your employment letter, contract, appointment letter, and company policies.',
          documents: ['Employment contract', 'Offer letter', 'Company handbook', 'Salary structure'],
          fees: 'Free',
          timeline: '1 day',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Review Key Terms',
          description: 'Understand salary, benefits, job role, termination clauses, and restrictive covenants.',
          documents: ['Contract analysis checklist', 'Industry standard comparisons'],
          fees: 'Free (self-review)',
          timeline: '2-3 days',
          status: 'in-progress'
        },
        {
          id: '3',
          title: 'Legal Consultation',
          description: 'Consult with employment lawyer for complex clauses or concerns.',
          documents: ['All employment documents', 'Specific questions list'],
          fees: '₹3,000-10,000',
          timeline: '1-2 hours',
          status: 'pending'
        },
        {
          id: '4',
          title: 'Negotiate Changes',
          description: 'Discuss any unfavorable terms with HR or management if still negotiable.',
          documents: ['Proposed amendments', 'Legal advice summary'],
          fees: 'Free',
          timeline: '1-2 weeks',
          status: 'pending'
        }
      ]
    },
    'pf-gratuity': {
      name: 'Claim PF & Gratuity Benefits',
      steps: [
        {
          id: '1',
          title: 'Check Eligibility',
          description: 'Verify your eligibility for PF withdrawal and gratuity based on service period.',
          documents: ['Service certificate', 'PF account details', 'UAN number'],
          fees: 'Free',
          timeline: '1 day',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Submit PF Withdrawal',
          description: 'File PF withdrawal application online through EPFO portal.',
          documents: ['Form 19/10C', 'Bank details', 'Aadhar/PAN', 'Service certificate'],
          fees: 'Free',
          timeline: '7-15 days',
          officialLink: 'https://www.epfindia.gov.in',
          status: 'in-progress'
        },
        {
          id: '3',
          title: 'Apply for Gratuity',
          description: 'Submit gratuity application to your employer (if 5+ years service).',
          documents: ['Gratuity application', 'Service certificate', 'Resignation letter'],
          fees: 'Free',
          timeline: '30 days',
          status: 'pending'
        },
        {
          id: '4',
          title: 'Follow Up & Recovery',
          description: 'Track application status and take legal action if payments are delayed.',
          documents: ['Application receipts', 'Follow-up communications'],
          fees: 'Legal fees if required: ₹5,000-15,000',
          timeline: '30-60 days',
          status: 'pending'
        }
      ]
    }
  };

  const currentRoadmap = roadmapData[action];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { sender: 'user' as const, message: chatInput },
      { 
        sender: 'bot' as const, 
        message: generateBotResponse(chatInput, action)
      }
    ];
    
    setChatMessages(newMessages);
    setChatInput('');
  };

  const generateBotResponse = (input: string, actionType: string) => {
    const responses: Record<string, string[]> = {
      'register-company': [
        'For company registration, I recommend starting with a Private Limited Company for better credibility and investment opportunities.',
        'Make sure to have at least 2 directors and 2 shareholders. The registered office address is mandatory.',
        'If you face any delays, you can escalate through the MCA grievance portal or contact a chartered accountant.'
      ],
      'file-fir': [
        'If the police refuse to file your FIR, you have the right to approach the Superintendent of Police or file a complaint with the Magistrate under Section 156(3).',
        'Always insist on getting a copy of the FIR immediately after filing. This is your legal right.',
        'For serious crimes, you can also send a copy to the District Collector and local human rights commission.'
      ],
      'wrongful-termination': [
        'Remember to check if you received proper notice period as per your employment contract or labor laws. Sudden termination without notice may be wrongful.',
        'If terminated for misconduct, ensure you received a proper show-cause notice and opportunity to explain before termination.',
        'Keep all performance reviews and communications that show your good standing at work - these will be crucial evidence.',
        'Consider negotiating a settlement before filing a legal case, as litigation can be time-consuming and expensive.'
      ],
      'wage-dispute': [
        'Document everything - salary slips, bank statements, work hours, overtime records. Strong documentation is key to winning wage disputes.',
        'Check if your employer is covered under the Payment of Wages Act - it mandates wage payment within 7-10 days of due date.',
        'Calculate interest on delayed wages as per labor laws - you may be entitled to compensation beyond just the unpaid wages.',
        'Try internal grievance mechanisms first, but don\'t delay too long as there are limitation periods for wage claims.'
      ],
      'workplace-harassment': [
        'Sexual harassment cases must be reported within 3 months of the incident as per POSH Act 2013. Don\'t delay in filing complaints.',
        'If your company doesn\'t have an ICC or it has less than 10 employees, you can directly approach the Local Complaints Committee.',
        'Maintain detailed records with dates, times, witnesses. Screenshots of messages and emails are crucial evidence.',
        'You have the right to ask for interim relief during investigation, including transfer of the harasser or yourself.'
      ],
      'employment-contract': [
        'Pay attention to non-compete and confidentiality clauses - some may be legally unenforceable if too broad or restrictive.',
        'Check if the notice period mentioned is reasonable and as per industry standards. Very long notice periods may be challenged.',
        'Understand your probation period rights - termination during probation has different rules than regular employment.',
        'Look for arbitration clauses that may limit your right to approach courts for disputes.'
      ],
      'pf-gratuity': [
        'You can withdraw PF for unemployment, medical treatment, education, or house purchase even before retirement.',
        'Gratuity is mandatory for companies with 10+ employees if you\'ve completed 5 years of service. Calculate 15 days\' salary for each year.',
        'Use the EPFO mobile app or website for faster PF processing. Most withdrawals are now processed within 3-7 days.',
        'If your employer delays PF or gratuity payment, you can file a complaint with EPFO enforcement officer.'
      ]
    };

    const actionResponses = responses[actionType] || ['I can help you adapt this roadmap based on your specific situation. Could you provide more details about your concern?'];
    return actionResponses[Math.floor(Math.random() * actionResponses.length)];
  };

  if (!currentRoadmap) {
    return (
      <div className="p-6 pb-24">
        <div className="max-w-md mx-auto text-center">
          <p>Roadmap not found</p>
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={20} className="text-green-600" />;
      case 'in-progress': return <Clock size={20} className="text-blue-600" />;
      default: return <AlertCircle size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-l-green-500 bg-green-50';
      case 'in-progress': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="p-6 bg-background border-b sticky top-0 z-10">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="flex-1">{currentRoadmap.name}</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowChat(!showChat)}
              className={showChat ? 'bg-primary text-primary-foreground' : ''}
            >
              <MessageCircle size={20} />
            </Button>
          </div>
        </div>

        {/* Chat Section */}
        {showChat && (
          <div className="p-4 bg-muted border-b">
            <div className="space-y-3 max-h-40 overflow-y-auto mb-3">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-lg text-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about this process..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* Roadmap Steps */}
        <div className="p-6 space-y-4">
          {currentRoadmap.steps.map((step, index) => (
            <Card key={step.id} className={`p-4 border-l-4 ${getStatusColor(step.status)}`}>
              <div className="flex items-start gap-3">
                {getStatusIcon(step.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <h3>{step.title}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">💰 {step.fees}</Badge>
                      <Badge variant="outline">⏱️ {step.timeline}</Badge>
                    </div>
                    
                    {step.documents.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-1">Required Documents:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {step.documents.map((doc, docIndex) => (
                            <li key={docIndex} className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-primary rounded-full"></span>
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {step.officialLink && (
                      <Button variant="link" className="p-0 h-auto text-xs" asChild>
                        <a href={step.officialLink} target="_blank" rel="noopener noreferrer">
                          Visit Official Portal →
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="px-6 pb-6">
          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Legal Disclaimer</p>
                <p className="text-xs text-amber-700 mt-1">
                  This roadmap provides general guidance only. Laws and procedures may vary by jurisdiction. 
                  Always consult with a qualified legal professional for advice specific to your situation.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}