import { Home, FileSearch, MessageCircle, Users, User } from "lucide-react";

interface NavigationProps {
  currentView: 'roadmaps' | 'scanner' | 'chatbot' | 'community' | 'profile';
  onViewChange: (view: 'roadmaps' | 'scanner' | 'chatbot' | 'community' | 'profile') => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'roadmaps' as const, icon: Home, label: 'Roadmaps' },
    { id: 'scanner' as const, icon: FileSearch, label: 'Scanner' },
    { id: 'chatbot' as const, icon: MessageCircle, label: 'AI Lawyer' },
    { id: 'community' as const, icon: Users, label: 'Community' },
    { id: 'profile' as const, icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="max-w-md mx-auto flex">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`flex-1 py-3 px-2 flex flex-col items-center space-y-1 transition-colors ${
              currentView === id
                ? 'text-primary bg-accent/50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}