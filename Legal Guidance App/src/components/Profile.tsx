import { useState } from "react";
import { Settings, ChevronRight, ChevronDown, MapPin, FileText, MessageSquare, Clock, CheckCircle, Bookmark, Calendar, User, Mail, Shield, Bell, HelpCircle, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";

interface RoadmapItem {
  id: string;
  name: string;
  progress: number;
  totalSteps: number;
  currentStep: number;
  status: 'in-progress' | 'completed' | 'saved';
}

interface DocumentItem {
  id: string;
  name: string;
  scanDate: string;
}

interface CommunityItem {
  id: string;
  title: string;
  type: 'question' | 'comment';
  date: string;
  engagement?: number;
}

export function Profile() {
  const [roadmapsExpanded, setRoadmapsExpanded] = useState(true);
  const [documentsExpanded, setDocumentsExpanded] = useState(false);
  const [communityExpanded, setCommunityExpanded] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Mock data
  const roadmapData: RoadmapItem[] = [
    {
      id: "1",
      name: "Register a Company",
      progress: 40,
      totalSteps: 5,
      currentStep: 2,
      status: 'in-progress'
    },
    {
      id: "2", 
      name: "File GST Registration",
      progress: 100,
      totalSteps: 4,
      currentStep: 4,
      status: 'completed'
    },
    {
      id: "3",
      name: "Property Registration",
      progress: 0,
      totalSteps: 6,
      currentStep: 0,
      status: 'saved'
    },
    {
      id: "4",
      name: "Employment Contract Review",
      progress: 75,
      totalSteps: 4,
      currentStep: 3,
      status: 'in-progress'
    }
  ];

  const documentData: DocumentItem[] = [
    {
      id: "1",
      name: "Rental Agreement",
      scanDate: "2025-01-15"
    },
    {
      id: "2",
      name: "Employment Contract",
      scanDate: "2025-01-12"
    },
    {
      id: "3",
      name: "Property Deed",
      scanDate: "2025-01-10"
    }
  ];

  const communityData: CommunityItem[] = [
    {
      id: "1",
      title: "Help with GST registration process",
      type: 'question',
      date: "2025-01-14",
      engagement: 5
    },
    {
      id: "2",
      title: "Replied to: Property dispute with neighbor",
      type: 'comment', 
      date: "2025-01-13"
    },
    {
      id: "3",
      title: "Employment law clarification needed",
      type: 'question',
      date: "2025-01-11",
      engagement: 8
    }
  ];

  const inProgressRoadmaps = roadmapData.filter(item => item.status === 'in-progress');
  const completedRoadmaps = roadmapData.filter(item => item.status === 'completed');
  const savedRoadmaps = roadmapData.filter(item => item.status === 'saved');

  const myQuestions = communityData.filter(item => item.type === 'question');
  const myContributions = communityData.filter(item => item.type === 'comment');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'saved':
        return <Bookmark className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'saved':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <h1 className="mb-2">Profile</h1>
              <p className="text-muted-foreground text-sm">Track your legal journey</p>
            </div>
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Settings className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm mx-auto">
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <User className="h-4 w-4 mr-3" />
                    Account Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Bell className="h-4 w-4 mr-3" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Shield className="h-4 w-4 mr-3" />
                    Privacy & Security
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <HelpCircle className="h-4 w-4 mr-3" />
                    Help & Support
                  </Button>
                  <Separator className="my-2" />
                  <Button variant="ghost" className="w-full justify-start text-red-600" size="sm">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="px-6 space-y-4">
          {/* My Roadmaps Section */}
          <Card>
            <Collapsible open={roadmapsExpanded} onOpenChange={setRoadmapsExpanded}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <MapPin className="h-4 w-4" />
                      My Roadmaps
                    </CardTitle>
                    {roadmapsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  {/* In Progress */}
                  {inProgressRoadmaps.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Clock className="h-3 w-3 text-blue-600" />
                        In Progress ({inProgressRoadmaps.length})
                      </h4>
                      <div className="space-y-2">
                        {inProgressRoadmaps.map((roadmap) => (
                          <div key={roadmap.id} className="border rounded-lg p-3 hover:bg-accent/20 cursor-pointer transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">{roadmap.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                Step {roadmap.currentStep}/{roadmap.totalSteps}
                              </Badge>
                            </div>
                            <Progress value={roadmap.progress} className="h-1.5 mb-1" />
                            <span className="text-xs text-muted-foreground">
                              {roadmap.progress}% complete
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Completed */}
                  {completedRoadmaps.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        Completed ({completedRoadmaps.length})
                      </h4>
                      <div className="space-y-2">
                        {completedRoadmaps.map((roadmap) => (
                          <div key={roadmap.id} className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
                            <span className="text-sm">{roadmap.name}</span>
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Saved for Later */}
                  {savedRoadmaps.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Bookmark className="h-3 w-3 text-orange-600" />
                        Saved for Later ({savedRoadmaps.length})
                      </h4>
                      <div className="space-y-2">
                        {savedRoadmaps.map((roadmap) => (
                          <div key={roadmap.id} className="flex items-center justify-between py-2 px-3 bg-orange-50 rounded-lg hover:bg-orange-100 cursor-pointer transition-colors">
                            <span className="text-sm">{roadmap.name}</span>
                            <Bookmark className="h-3 w-3 text-orange-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* My Documents Section */}
          <Card>
            <Collapsible open={documentsExpanded} onOpenChange={setDocumentsExpanded}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <FileText className="h-4 w-4" />
                      My Documents ({documentData.length})
                    </CardTitle>
                    {documentsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-3">
                  {documentData.map((document) => (
                    <div key={document.id} className="flex items-center justify-between py-2 px-3 border rounded-lg hover:bg-accent/20 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{document.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{document.scanDate}</span>
                      </div>
                    </div>
                  ))}
                  
                  <Alert className="mt-4 border-blue-200 bg-blue-50">
                    <Shield className="h-3 w-3" />
                    <AlertDescription className="text-xs">
                      <strong>Privacy Note:</strong> Your scanned documents are not stored on our servers.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* My Community Section */}
          <Card>
            <Collapsible open={communityExpanded} onOpenChange={setCommunityExpanded}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <MessageSquare className="h-4 w-4" />
                      My Community
                    </CardTitle>
                    {communityExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  {/* My Questions */}
                  {myQuestions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3">My Questions ({myQuestions.length})</h4>
                      <div className="space-y-2">
                        {myQuestions.map((item) => (
                          <div key={item.id} className="border rounded-lg p-3 hover:bg-accent/20 cursor-pointer transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-sm leading-snug">{item.title}</span>
                              <Badge variant="outline" className="text-xs ml-2">
                                {item.engagement} replies
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* My Contributions */}
                  {myContributions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3">My Contributions ({myContributions.length})</h4>
                      <div className="space-y-2">
                        {myContributions.map((item) => (
                          <div key={item.id} className="border rounded-lg p-3 hover:bg-accent/20 cursor-pointer transition-colors">
                            <span className="text-sm leading-snug">{item.title}</span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                              <Calendar className="h-3 w-3" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>
      </div>
    </div>
  );
}