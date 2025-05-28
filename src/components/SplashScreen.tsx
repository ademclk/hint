import { useEffect, useState } from 'react';

// Following Farcaster mini apps splash screen requirements
export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Start animation after component mounts
    const timer1 = setTimeout(() => setAnimate(true), 100);
    
    // Complete splash screen after animation
    const timer2 = setTimeout(() => onComplete(), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        {/* Using the icon format required by Farcaster mini apps - 200x200px splash image */}
        <div className={`transition-all duration-1000 ease-in-out ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="w-32 h-32 flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-primary-foreground">H</span>
            </div>
          </div>
        </div>
        <h1 className={`mt-4 text-2xl font-medium text-white transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          HINT Protocol
        </h1>
        <p className={`text-sm text-white/70 mt-2 transition-all duration-1000 delay-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
          Human In The Loop
        </p>
      </div>
    </div>
  );
}
