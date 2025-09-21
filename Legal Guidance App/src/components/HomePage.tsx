import { Building2, Home as HomeIcon, Gavel, Heart, Car, FileText, Shield, Users } from "lucide-react";
import { Card } from "./ui/card";

interface HomePageProps {
  onCategorySelect: (category: string) => void;
}

export function HomePage({ onCategorySelect }: HomePageProps) {
  const categories = [
    { id: 'business', name: 'Business Law', icon: Building2, color: 'bg-blue-50 hover:bg-blue-100 border-blue-200', iconColor: 'text-blue-600' },
    { id: 'property', name: 'Property Law', icon: HomeIcon, color: 'bg-green-50 hover:bg-green-100 border-green-200', iconColor: 'text-green-600' },
    { id: 'criminal', name: 'Criminal Law', icon: Gavel, color: 'bg-red-50 hover:bg-red-100 border-red-200', iconColor: 'text-red-600' },
    { id: 'family', name: 'Family Law', icon: Heart, color: 'bg-pink-50 hover:bg-pink-100 border-pink-200', iconColor: 'text-pink-600' },
    { id: 'motor', name: 'Motor Vehicle', icon: Car, color: 'bg-purple-50 hover:bg-purple-100 border-purple-200', iconColor: 'text-purple-600' },
    { id: 'contracts', name: 'Contracts', icon: FileText, color: 'bg-orange-50 hover:bg-orange-100 border-orange-200', iconColor: 'text-orange-600' },
    { id: 'consumer', name: 'Consumer Rights', icon: Shield, color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200', iconColor: 'text-cyan-600' },
    { id: 'employment', name: 'Employment', icon: Users, color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200', iconColor: 'text-indigo-600' }
  ];

  return (
    <div className="p-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="mb-2">LegalGuide AI</h1>
          <p className="text-muted-foreground">Navigate legal processes with confidence</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className={`p-6 cursor-pointer transition-all duration-200 ${category.color}`}
                onClick={() => onCategorySelect(category.id)}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <Icon size={32} className={category.iconColor} />
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            This tool provides general legal guidance. Always consult with a qualified attorney for specific legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}