import { useState } from 'react';

// Mock implementation of useAccount until wagmi is properly set up
const useAccount = () => {
  return {
    isConnected: false,
    address: undefined,
    connect: () => {}
  };
};

interface ContributePanelProps {
  conceptId?: string;
  conceptName?: string;
  onClose?: () => void;
}

export function ContributePanel({ 
  conceptId = '', 
  conceptName = 'Quantum Concept',
  onClose 
}: ContributePanelProps) {
  const { isConnected } = useAccount();
  const [contribution, setContribution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contribution.trim()) return;
    
    // Simulate submission
    setIsSubmitting(true);
    
    // In a real app, you would send this to your backend
    console.log(`Submitting contribution for concept: ${conceptId}`);
    // await api.submitContribution({ conceptId, content: contribution });
    
    // Simulate a delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setContribution('');
      
      // Reset success message after a delay
      setTimeout(() => {
        setShowSuccess(false);
        if (onClose) onClose();
      }, 3000);
    }, 1500);
  };

  if (!isConnected) {
    return (
      <div className="p-6 bg-card border border-border rounded-2xl">
        <h3 className="text-xl font-medium mb-4">Join the Loop</h3>
        <p className="text-muted-foreground mb-6">
          Connect your Farcaster account to contribute your understanding 
          and help refine quantum explanations for everyone.
        </p>
        <button
          className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-full shadow-sm hover:bg-primary/90 transition-all duration-200"
        >
          Connect with Farcaster
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-card border border-border rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">Human In The Loop</h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      
      {showSuccess ? (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-primary mb-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-foreground font-medium">Thank you for your contribution!</p>
          <p className="text-sm text-muted-foreground mt-1">Your interpretation helps improve our explanations.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-muted-foreground mb-4">
            Share your understanding of <span className="font-medium text-foreground">{conceptName}</span> to help others learn.
          </p>
          
          <div className="mb-4">
            <label htmlFor="contribution" className="sr-only">Your interpretation</label>
            <textarea
              id="contribution"
              rows={4}
              placeholder="In your own words, how would you explain this concept to someone else?"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Your contribution will be attributed to your Farcaster profile
            </p>
            <button
              type="submit"
              disabled={isSubmitting || !contribution.trim()}
              className="inline-flex items-center justify-center px-5 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-full shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Contribute'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
