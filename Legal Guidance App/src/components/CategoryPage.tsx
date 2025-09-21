import { ArrowLeft, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface CategoryPageProps {
  category: string;
  onBack: () => void;
  onActionSelect: (action: string) => void;
}

export function CategoryPage({ category, onBack, onActionSelect }: CategoryPageProps) {
  const categoryData: Record<string, { name: string; actions: Array<{ id: string; name: string; description: string; difficulty: 'Easy' | 'Medium' | 'Complex' }> }> = {
    business: {
      name: 'Business Law',
      actions: [
        { id: 'register-company', name: 'Register a Company', description: 'Incorporate your business legally', difficulty: 'Medium' },
        { id: 'annual-returns', name: 'File Annual Returns', description: 'Submit required yearly compliance documents', difficulty: 'Easy' },
        { id: 'trademark', name: 'Register Trademark', description: 'Protect your brand identity', difficulty: 'Medium' },
        { id: 'gst-registration', name: 'GST Registration', description: 'Register for Goods and Services Tax', difficulty: 'Easy' },
        { id: 'partnership-deed', name: 'Partnership Deed', description: 'Create legal partnership agreement', difficulty: 'Complex' },
        { id: 'business-license', name: 'Business License', description: 'Obtain required business permits', difficulty: 'Medium' }
      ]
    },
    property: {
      name: 'Property Law',
      actions: [
        { id: 'property-registration', name: 'Property Registration', description: 'Register property purchase/sale', difficulty: 'Complex' },
        { id: 'rent-agreement', name: 'Rent Agreement', description: 'Create legal rental contract', difficulty: 'Easy' },
        { id: 'property-dispute', name: 'Property Dispute', description: 'Resolve property ownership issues', difficulty: 'Complex' },
        { id: 'mutation', name: 'Property Mutation', description: 'Transfer property records', difficulty: 'Medium' },
        { id: 'encumbrance', name: 'Encumbrance Certificate', description: 'Get property transaction history', difficulty: 'Easy' }
      ]
    },
    criminal: {
      name: 'Criminal Law',
      actions: [
        { id: 'file-fir', name: 'File FIR', description: 'Register criminal complaint with police', difficulty: 'Medium' },
        { id: 'bail-application', name: 'Bail Application', description: 'Apply for bail in criminal case', difficulty: 'Complex' },
        { id: 'chargesheet', name: 'Understand Chargesheet', description: 'Comprehend criminal charges filed', difficulty: 'Medium' },
        { id: 'police-complaint', name: 'Police Complaint', description: 'File non-cognizable offense complaint', difficulty: 'Easy' }
      ]
    },
    family: {
      name: 'Family Law',
      actions: [
        { id: 'divorce', name: 'Divorce Proceedings', description: 'Legal separation process', difficulty: 'Complex' },
        { id: 'child-custody', name: 'Child Custody', description: 'Legal custody arrangements', difficulty: 'Complex' },
        { id: 'maintenance', name: 'Maintenance Claim', description: 'Spousal/child support proceedings', difficulty: 'Medium' },
        { id: 'adoption', name: 'Adoption Process', description: 'Legal child adoption procedures', difficulty: 'Complex' }
      ]
    },
    employment: {
      name: 'Employment Law',
      actions: [
        { id: 'wrongful-termination', name: 'Wrongful Termination', description: 'Challenge unlawful job dismissal', difficulty: 'Complex' },
        { id: 'wage-dispute', name: 'Wage & Salary Dispute', description: 'Recover unpaid wages or overtime', difficulty: 'Medium' },
        { id: 'workplace-harassment', name: 'Workplace Harassment', description: 'Report and address harassment claims', difficulty: 'Complex' },
        { id: 'employment-contract', name: 'Employment Contract Review', description: 'Understand your employment terms', difficulty: 'Medium' },
        { id: 'labor-complaint', name: 'Labor Law Complaint', description: 'File complaint with labor board', difficulty: 'Medium' },
        { id: 'workplace-discrimination', name: 'Workplace Discrimination', description: 'Address discrimination based on protected characteristics', difficulty: 'Complex' },
        { id: 'pf-gratuity', name: 'PF & Gratuity Claims', description: 'Claim provident fund and gratuity benefits', difficulty: 'Easy' },
        { id: 'maternity-leave', name: 'Maternity/Paternity Leave', description: 'Know your parental leave rights', difficulty: 'Easy' },
        { id: 'workplace-safety', name: 'Workplace Safety', description: 'Report unsafe working conditions', difficulty: 'Medium' },
        { id: 'bonus-disputes', name: 'Bonus & Benefits Dispute', description: 'Claim unpaid bonuses and benefits', difficulty: 'Medium' },
        { id: 'work-hours', name: 'Working Hours Violation', description: 'Address excessive working hours issues', difficulty: 'Easy' },
        { id: 'retrenchment', name: 'Retrenchment & Layoffs', description: 'Understand rights during job cuts', difficulty: 'Complex' }
      ]
    }
  };

  const currentCategory = categoryData[category];
  
  if (!currentCategory) {
    return (
      <div className="p-6 pb-24">
        <div className="max-w-md mx-auto text-center">
          <p>Category not found</p>
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="flex-1">{currentCategory.name}</h1>
        </div>
        
        <div className="space-y-4">
          {currentCategory.actions.map((action) => (
            <Card 
              key={action.id}
              className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-primary"
              onClick={() => onActionSelect(action.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{action.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(action.difficulty)}`}>
                      {action.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Start with "Easy" level actions to familiarize yourself with legal processes.
          </p>
        </div>
      </div>
    </div>
  );
}