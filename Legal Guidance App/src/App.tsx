import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { CategoryPage } from "./components/CategoryPage";
import { RoadmapPage } from "./components/RoadmapPage";
import { DocumentScanner } from "./components/DocumentScanner"; 
import { ChatbotLawyer } from "./components/ChatbotLawyer";
import { Community } from "./components/Community";
import { Profile } from "./components/Profile";

type ViewType = 'roadmaps' | 'scanner' | 'chatbot' | 'community' | 'profile';
type RoadmapState = 'home' | 'category' | 'roadmap';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('roadmaps');
  const [roadmapState, setRoadmapState] = useState<RoadmapState>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setRoadmapState('category');
  };

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
    setRoadmapState('roadmap');
  };

  const handleBackToHome = () => {
    setRoadmapState('home');
    setSelectedCategory('');
    setSelectedAction('');
  };

  const handleBackToCategory = () => {
    setRoadmapState('category');
    setSelectedAction('');
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    // Reset roadmap state when switching to roadmaps view
    if (view === 'roadmaps') {
      setRoadmapState('home');
      setSelectedCategory('');
      setSelectedAction('');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'roadmaps':
        switch (roadmapState) {
          case 'home':
            return <HomePage onCategorySelect={handleCategorySelect} />;
          case 'category':
            return (
              <CategoryPage 
                category={selectedCategory}
                onBack={handleBackToHome}
                onActionSelect={handleActionSelect}
              />
            );
          case 'roadmap':
            return (
              <RoadmapPage
                action={selectedAction}
                onBack={handleBackToCategory}
              />
            );
          default:
            return <HomePage onCategorySelect={handleCategorySelect} />;
        }
      case 'scanner':
        return <DocumentScanner />;
      case 'chatbot':
        return <ChatbotLawyer />;
      case 'community':
        return <Community />;
      case 'profile':
        return <Profile />;
      default:
        return <HomePage onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentView()}
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
    </div>
  );
}