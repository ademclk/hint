export function Experiments() {
  // Updated experiments with Apple-like gradient text on solid backgrounds
  const experiments = [
    {
      id: 'quantum-game-of-life',
      title: 'Quantum Game of Life',
      description: 'Explore a classic simulation with a quantum twist. See how superposition and entanglement change the rules.',
      status: 'Coming Soon',
      gradientFrom: 'from-blue-400',
      gradientTo: 'to-indigo-600',
      bgColor: 'bg-white dark:bg-black',
      tag: 'Simulation'
    },
    {
      id: 'quantum-phenomena-lab',
      title: 'Quantum Phenomena Lab',
      description: 'Observe and interact with key quantum effects. See superposition, entanglement, and measurement in action.',
      status: 'Interactive Demo Coming Soon',
      gradientFrom: 'from-purple-400',
      gradientTo: 'to-pink-600',
      bgColor: 'bg-white dark:bg-black',
      tag: 'Interactive'
    },
    {
      id: 'quantum-playground',
      title: 'Quantum Playground',
      description: 'Build your own quantum circuits and see them in action. Perfect for beginners to quantum computing.',
      status: 'Coming Soon',
      gradientFrom: 'from-emerald-400',
      gradientTo: 'to-teal-600',
      bgColor: 'bg-white dark:bg-black',
      tag: 'Educational'
    },
    {
      id: 'entanglement-visualizer',
      title: 'Entanglement Visualizer',
      description: 'Watch quantum entanglement happen in real-time and understand its implications for quantum computing.',
      status: 'Under Development',
      gradientFrom: 'from-amber-400',
      gradientTo: 'to-orange-600',
      bgColor: 'bg-white dark:bg-black',
      tag: 'Visual Learning'
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero section with solid background and regular text */}
      <div className="relative bg-background pt-20 pb-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
              Experience Quantum Physics
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just read about quantum mechanics—experience it. These interactive
              experiments let you see and manipulate quantum phenomena firsthand.
            </p>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="container mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {experiments.map((experiment) => (
            <div 
              key={experiment.id}
              className={`group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg`}
            >
              <div className={`relative h-56 ${experiment.bgColor} overflow-hidden flex items-center justify-center p-6`}>
                <span className="absolute top-4 left-4 text-xs font-medium bg-primary/90 text-primary-foreground py-1 px-3 rounded-full z-20">
                  {experiment.tag}
                </span>
                <h2 className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${experiment.gradientFrom} ${experiment.gradientTo} text-center leading-tight`}>
                  {experiment.title}
                </h2>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium bg-secondary text-muted-foreground py-1 px-2 rounded-full">
                    {experiment.status}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {experiment.description}
                </p>
                
                <button className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                  Learn more
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Farcaster follow section */}
        <div className="mt-20 bg-card border border-border rounded-2xl p-8 md:p-10 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">Stay updated</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow <a href="https://farcaster.xyz/ademclk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@ademclk</a> on Farcaster for the latest updates on HINT Protocol and new quantum experiments.
            </p>
          </div>
          
          <div className="flex justify-center">
            <a 
              href="https://farcaster.xyz/ademclk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-full transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              Follow on Farcaster
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
