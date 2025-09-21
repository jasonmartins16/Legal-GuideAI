import { useState } from "react";
import { Upload, FileText, Camera, AlertTriangle, CheckCircle, X, Eye } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface DocumentAnalysis {
  documentType: string;
  keyDetails: { label: string; value: string; status: 'ok' | 'missing' | 'warning' }[];
  summary: string;
  redFlags: string[];
  credibilityScore: number;
  suggestions: string[];
}

export function DocumentScanner() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setAnalysis(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const analyzeDocument = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis result based on file name/type
    const mockAnalysis: DocumentAnalysis = {
      documentType: selectedFile.name.toLowerCase().includes('agreement') ? 'Rental Agreement' : 
                   selectedFile.name.toLowerCase().includes('deed') ? 'Property Sale Deed' :
                   selectedFile.name.toLowerCase().includes('contract') ? 'Service Contract' : 'Legal Document',
      keyDetails: [
        { label: 'Document Date', value: '15th March, 2024', status: 'ok' },
        { label: 'Parties Involved', value: 'John Doe, ABC Properties Ltd.', status: 'ok' },
        { label: 'Witness Signatures', value: '2 witnesses present', status: 'ok' },
        { label: 'Stamp Duty', value: '₹500 (Required: ₹1000)', status: 'warning' },
        { label: 'Notarization', value: 'Not found', status: 'missing' }
      ],
      summary: 'This appears to be a rental agreement between John Doe (tenant) and ABC Properties Ltd. (landlord) for a residential property. The agreement outlines monthly rent of ₹25,000, security deposit of ₹50,000, and a tenure of 11 months.',
      redFlags: [
        'Insufficient stamp duty - should be ₹1000 for this agreement value',
        'Document lacks notarization which may affect legal validity',
        'No mention of maintenance charges responsibility'
      ],
      credibilityScore: 75,
      suggestions: [
        'Get the document properly stamped with ₹1000 stamp duty',
        'Consider notarizing the agreement for better legal protection',
        'Add clause about maintenance and utility charges',
        'Include termination conditions and notice period'
      ]
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return <CheckCircle size={16} className="text-green-600" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'missing': return <X size={16} className="text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'missing': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="mb-2">Document Scanner</h1>
          <p className="text-muted-foreground">Upload legal documents to get AI-powered analysis and explanations</p>
        </div>

        {!selectedFile && !analysis && (
          <Card
            className={`p-8 border-2 border-dashed cursor-pointer transition-all duration-200 ${
              dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Upload size={48} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Upload Document</p>
                <p className="text-sm text-muted-foreground">Drag & drop or click to select</p>
              </div>
              <div className="flex justify-center gap-4">
                <Badge variant="outline" className="gap-1">
                  <Camera size={14} />
                  Photo
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <FileText size={14} />
                  PDF
                </Badge>
              </div>
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
          </Card>
        )}

        {selectedFile && !analysis && (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                  <X size={16} />
                </Button>
              </div>
            </Card>

            <Button 
              onClick={analyzeDocument} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing Document...
                </>
              ) : (
                <>
                  <Eye size={16} className="mr-2" />
                  Analyze Document
                </>
              )}
            </Button>
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => { setSelectedFile(null); setAnalysis(null); }}>
                ← Scan Another Document
              </Button>
            </div>

            {/* Document Type & Credibility */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3>Document Analysis</h3>
                <Badge variant="outline" className="gap-1">
                  <FileText size={14} />
                  {analysis.documentType}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Credibility Score:</span>
                <span className={`font-medium ${getCredibilityColor(analysis.credibilityScore)}`}>
                  {analysis.credibilityScore}%
                </span>
              </div>
            </Card>

            {/* Summary */}
            <Card className="p-4">
              <h3 className="mb-3">Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{analysis.summary}</p>
            </Card>

            {/* Key Details */}
            <Card className="p-4">
              <h3 className="mb-3">Key Details</h3>
              <div className="space-y-3">
                {analysis.keyDetails.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {getStatusIcon(detail.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{detail.label}</span>
                      </div>
                      <span className={`text-sm ${getStatusColor(detail.status)}`}>
                        {detail.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Red Flags */}
            {analysis.redFlags.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-medium">⚠️ Red Flags Detected</p>
                    <ul className="space-y-1">
                      {analysis.redFlags.map((flag, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Suggestions */}
            <Card className="p-4">
              <h3 className="mb-3">💡 Suggestions</h3>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Privacy Notice */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Privacy Protection</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Your document is processed locally and securely. No personal data is stored on our servers.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}