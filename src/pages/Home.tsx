import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col">
            {/* Hero section with large gradient overlay */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent dark:from-primary/5"></div>
                <div className="container mx-auto px-6 py-12 md:py-12 flex flex-col items-center justify-center text-center relative z-10">
                    <h1 className="text-4xl md:text-7xl font-medium tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                        <span className="">HINT Protocol</span>
                    </h1>
                    
                    <div className="inline-flex items-center justify-center mb-4 bg-secondary/50 text-foreground/80 px-4 py-1.5 rounded-full text-sm font-medium">
                        <span className="relative">Human In The Loop</span>
                    </div>
                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
                        A collaborative approach to quantum education where humans help refine explanations through shared understanding.
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                        Discover quantum computing through intuitive explanations and interactive experiences where your participation matters.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-5 mb-8">
                        <Link 
                            to="/experiments"
                            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium text-base rounded-full shadow-sm hover:bg-primary/90 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Try Experiments
                        </Link>
                        <Link 
                            to="/blog"
                            className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground font-medium text-base rounded-full border border-border hover:bg-secondary/80 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Read Articles
                        </Link>
                    </div>
                    

                </div>
            </div>

            {/* Featured blog post section */}
            <div className="container mx-auto px-6 py-16 border-b border-border">
                <div className="max-w-4xl mx-auto">
                    <span className="block text-sm font-medium text-primary mb-3">FEATURED ARTICLE</span>
                    <h2 className="text-xl md:text-3xl font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                        Introducing HINT: Human In The Loop Protocol
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        Discover a new approach to quantum education that puts humans at the center of the learning process. Learn how HINT Protocol makes complex quantum concepts more accessible and intuitive through collaborative insights.
                    </p>
                    <Link 
                        to="/blog/introducing-hint"
                        className="inline-flex items-center text-primary hover:underline group"
                    >
                        Read the full article
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1 transition-all duration-300 group-hover:translate-x-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Feature section with cards */}
            <div className="container mx-auto px-6 py-24">
                <h2 className="text-xl md:text-3xl font-medium text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Explore the quantum world</h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Discover the fascinating principles of quantum physics through interactive experiments and clear explanations.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                            </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-medium mb-3">Learn</h3>
                        <p className="text-muted-foreground">Understand quantum principles through clear, accessible explanations designed for beginners.</p>
                    </div>
                    
                    <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21a48.295 48.295 0 0 1-8.135-1.587c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                            </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-medium mb-3">Experiment</h3>
                        <p className="text-muted-foreground">Interact with simulations that demonstrate quantum phenomena in an intuitive, visual way.</p>
                    </div>
                    
                    <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-medium mb-3">Connect</h3>
                        <p className="text-muted-foreground">Join a community exploring the future of quantum computing and its real-world applications.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}