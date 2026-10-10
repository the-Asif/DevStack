import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoText from './assets/logo-text.png';
import bannerStack from './assets/banner-stack.png';

interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  difficulty: string;
  badge: string;
}

export default function App() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [stack, setStack] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);

  // Load JSON Data via useEffect with loading state
  useEffect(() => {
    setIsLoading(true);
    fetch('/technologies.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch technology data');
        }
        return res.json();
      })
      .then((data: Technology[]) => {
        setTechnologies(data);
      })
      .catch((error) => {
        console.error('Error loading technologies:', error);
        toast.error('Failed to load technology data. Please refresh.');
      })
      .finally(() => {
        // Ensure smooth transition after data load
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }, []);

  // Add to Stack Functionality
  const handleAddToStack = (tech: Technology) => {
    const isAlreadyAdded = stack.some((item) => item.id === tech.id);
    if (isAlreadyAdded) {
      toast.warning(`${tech.name} is already in your stack!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setStack((prev) => [...prev, tech]);
    toast.success(`${tech.name} added to your stack!`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // Remove single item from stack
  const handleRemoveFromStack = (tech: Technology) => {
    setStack((prev) => prev.filter((item) => item.id !== tech.id));
    toast.info(`${tech.name} removed from your stack.`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // Remove All from stack
  const handleRemoveAll = () => {
    if (stack.length === 0) return;
    setStack([]);
    toast.error('All technologies removed from your stack.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // Check if tech is in stack
  const isTechInStack = (techId: string) => {
    return stack.some((item) => item.id === techId);
  };

  // Badge styling helper based on badge name
  const getBadgeStyle = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'popular':
      case 'top sql':
      case 'essential':
      case 'robust':
      case 'containers':
        return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'versatile':
      case 'standard':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'fast':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'cache':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'ubiquitous':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'modern':
        return 'bg-teal-50 text-teal-600 border-teal-100';
      default:
        return 'bg-purple-50 text-purple-600 border-purple-100';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] text-slate-800 font-sans">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />

      {/* =========================================================================
          NAVBAR (Sticky)
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Mobile Left: Hamburger Icon */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Left / Mobile Center: Brand Logo */}
            <div className="flex items-center justify-center md:justify-start flex-1 md:flex-initial">
              <a href="#home" className="flex items-center gap-2 group">
                <img
                  src={logoText}
                  alt="Dev Stack Logo"
                  className="h-8 sm:h-9 object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </a>
            </div>

            {/* Desktop Center: Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a
                href="#home"
                className="text-pink-600 font-semibold transition-colors duration-150 hover:text-pink-700"
              >
                Home
              </a>
              <a
                href="#technologies"
                className="text-slate-600 hover:text-pink-600 transition-colors duration-150"
              >
                Technologies
              </a>
              <a
                href="#projects"
                className="text-slate-600 hover:text-pink-600 transition-colors duration-150"
              >
                Projects
              </a>
              <a
                href="#about"
                className="text-slate-600 hover:text-pink-600 transition-colors duration-150"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-slate-600 hover:text-pink-600 transition-colors duration-150"
              >
                Contact
              </a>
            </nav>

            {/* Right: Sign In & Sign Up Buttons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                onClick={() => setAuthModal('signin')}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors px-2 py-1.5 cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthModal('signup')}
                className="brand-gradient-btn text-sm font-semibold px-5 py-2 rounded-full cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
            <a
              href="#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-pink-600 bg-pink-50"
            >
              Home
            </a>
            <a
              href="#technologies"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Technologies
            </a>
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* =========================================================================
          BANNER / HERO SECTION
          ========================================================================= */}
      <section id="home" className="pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Banner Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Build Your Ideal <br />
                <span className="brand-gradient-text">Development Stack</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Explore frontend, backend, database, and tooling options, compare
                them side by side, and put together the stack that fits your next
                project.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#technologies"
                  className="brand-gradient-btn px-6 py-3 rounded-lg text-sm sm:text-base font-semibold inline-flex items-center gap-2 cursor-pointer"
                >
                  Explore Technologies
                </a>
                <a
                  href="#about"
                  className="px-6 py-3 rounded-lg text-sm sm:text-base font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center cursor-pointer"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Banner Right Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-none">
                <img
                  src={bannerStack}
                  alt="3D Development Stack Layers"
                  className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TECHNOLOGIES & YOUR STACK SECTION
          ========================================================================= */}
      <section id="technologies" className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore the <span className="brand-gradient-text">Technologies</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Pick one technology per category to build your ideal stack.
            </p>
          </div>

          {/* Main Grid + Sidebar Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 9 Columns: Technology Cards Grid */}
            <div className="lg:col-span-9">
              {isLoading ? (
                /* Loading State: Spinner & friendly message */
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                  <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin-fast"></div>
                  <p className="text-slate-600 font-medium text-base">
                    Loading technologies...
                  </p>
                </div>
              ) : (
                /* 3-column on desktop, 2-column on tablet, 1-column on mobile */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technologies.map((tech) => {
                    const isAdded = isTechInStack(tech.id);
                    return (
                      <div
                        key={tech.id}
                        className="tech-card bg-white rounded-2xl p-6 flex flex-col justify-between shadow-xs transition-all duration-200"
                      >
                        {/* Top: Icon + Badge */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 flex items-center justify-center">
                              <img
                                src={tech.icon}
                                alt={`${tech.name} icon`}
                                className="w-9 h-9 object-contain"
                                loading="lazy"
                              />
                            </div>
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getBadgeStyle(
                                tech.badge
                              )}`}
                            >
                              {tech.badge}
                            </span>
                          </div>

                          {/* Tech Name */}
                          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                            {tech.name}
                          </h3>

                          {/* Tech Description */}
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 min-h-[54px]">
                            {tech.description}
                          </p>
                        </div>

                        {/* Bottom: Meta Chips + Button */}
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-2 border-t border-slate-50">
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                              {tech.category}
                            </span>
                            <span className="font-medium text-slate-600">
                              {tech.difficulty}
                            </span>
                            <span className="flex items-center font-bold text-slate-800">
                              <svg
                                className="w-3.5 h-3.5 text-amber-400 mr-1 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {tech.rating}
                            </span>
                          </div>

                          {/* Add to Stack Button */}
                          <button
                            type="button"
                            disabled={isAdded}
                            onClick={() => handleAddToStack(tech)}
                            className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                              isAdded
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                : 'bg-[#0f172a] hover:bg-slate-800 text-white shadow-xs hover:shadow-md'
                            }`}
                          >
                            {isAdded ? '✓ Added to Stack' : 'Add to Stack'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right 3 Columns: Your Stack Sidebar Panel */}
            <div className="lg:col-span-3">
              <aside className="bg-white rounded-2xl border border-slate-150 p-6 sticky top-24 shadow-xs">
                {/* Heading & Selection Count */}
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Your Stack
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-5">
                  {stack.length === 0
                    ? 'No technologies selected yet.'
                    : `${stack.length} Technology Selected`}
                </p>

                {/* Conditional Rendering: Empty State vs Selected Items */}
                {stack.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-xl py-10 px-4 text-center">
                    <p className="text-slate-400 text-sm font-medium">
                      Your stack is empty.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Selected Stack Items List */}
                    <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                      {stack.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.icon}
                              alt={item.name}
                              className="w-7 h-7 object-contain"
                            />
                            <div>
                              <p className="text-sm font-bold text-slate-900 leading-none">
                                {item.name}
                              </p>
                              <span className="text-[11px] text-slate-400 font-medium capitalize">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          {/* Remove Single Item (✕) Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveFromStack(item)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                            aria-label={`Remove ${item.name} from stack`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Remove All Button */}
                    <button
                      type="button"
                      onClick={handleRemoveAll}
                      className="w-full mt-4 py-2.5 px-4 rounded-xl text-sm font-semibold text-rose-500 border border-rose-200 hover:bg-rose-50 hover:border-rose-300 transition-all duration-200 cursor-pointer"
                    >
                      Remove All
                    </button>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PROJECTS SECTION (Supplementary content for navigation)
          ========================================================================= */}
      <section id="projects" className="py-16 bg-[#fafbfc] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Stack <span className="brand-gradient-text">Architectures</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Discover industry-proven architecture patterns built by engineering teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                Full-Stack SaaS
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                Modern Cloud Application
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                React, Next.js, PostgreSQL, and Tailwind CSS configured for high
                scalability and automated deployments.
              </p>
              <div className="flex gap-2 text-xs font-medium text-slate-600">
                <span className="bg-slate-100 px-2 py-0.5 rounded">Next.js</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">PostgreSQL</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">Docker</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                High Performance
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                Real-Time Streaming Engine
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Node.js and Redis memory caching backing interactive web apps
                with microsecond latency responses.
              </p>
              <div className="flex gap-2 text-xs font-medium text-slate-600">
                <span className="bg-slate-100 px-2 py-0.5 rounded">Node.js</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">Redis</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">TypeScript</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                Lean & Agile
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                Lightweight Reactive Dashboard
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                Svelte and Tailwind CSS combining effortless developer experience
                with zero-bundle overhead reactivity.
              </p>
              <div className="flex gap-2 text-xs font-medium text-slate-600">
                <span className="bg-slate-100 px-2 py-0.5 rounded">Svelte</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">Tailwind</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT & CONTACT SECTION
          ========================================================================= */}
      <section id="about" className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                About Dev Stack
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Designed for Developers, Engineered for Efficiency
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Dev Stack simplifies modern web toolchain selection. Instead of
                navigating hundreds of disparate documentations, developers can
                explore curated frameworks, inspect real ratings and difficulty curves,
                and compose production-ready technology combinations effortlessly.
              </p>
              <div className="pt-2 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500">Open Source</p>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">12+</p>
                  <p className="text-xs text-slate-500">Core Technologies</p>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">Lightning</p>
                  <p className="text-xs text-slate-500">Stack Customization</p>
                </div>
              </div>
            </div>

            <div id="contact" className="bg-[#fafbfc] rounded-2xl p-8 border border-slate-200/80">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Get in Touch</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Have questions or want to suggest a new technology for Dev Stack?
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Thank you! Your message has been received.');
                  (e.target as HTMLFormElement).reset();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="developer@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share your thoughts or recommendations..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="brand-gradient-btn w-full py-2.5 rounded-xl font-semibold text-sm cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
            {/* Brand Block */}
            <div className="lg:col-span-2 space-y-4">
              <a href="#home" className="inline-block">
                <img
                  src={logoText}
                  alt="Dev Stack"
                  className="h-8 object-contain"
                />
              </a>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
                Curated tools, technologies, and resources for developers building
                modern software.
              </p>
              {/* Social Links */}
              <div className="flex items-center space-x-4 pt-1">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <a href="#home" className="hover:text-pink-600 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#technologies"
                    className="hover:text-pink-600 transition-colors"
                  >
                    Technologies
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-pink-600 transition-colors"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <a href="#about" className="hover:text-pink-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-pink-600 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#careers"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info('Careers page coming soon!');
                    }}
                    className="hover:text-pink-600 transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <a
                    href="#privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info('Privacy Policy documentation');
                    }}
                    className="hover:text-pink-600 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info('Terms of Service documentation');
                    }}
                    className="hover:text-pink-600 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© 2026 Dev Stack. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info('Privacy Policy documentation');
                }}
                className="hover:text-slate-600 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info('Terms of Service documentation');
                }}
                className="hover:text-slate-600 transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          AUTHENTICATION MODAL (Sign In / Sign Up)
          ========================================================================= */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-150 animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {authModal === 'signin' ? 'Sign In to Dev Stack' : 'Create an Account'}
              </h3>
              <button
                type="button"
                onClick={() => setAuthModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              {authModal === 'signin'
                ? 'Welcome back! Enter your details to access your saved stacks.'
                : 'Join Dev Stack to curate, save, and share your technology architectures.'}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success(
                  authModal === 'signin'
                    ? 'Successfully signed in!'
                    : 'Account created successfully!'
                );
                setAuthModal(null);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <button
                type="submit"
                className="brand-gradient-btn w-full py-2.5 rounded-xl font-semibold text-sm mt-2 cursor-pointer"
              >
                {authModal === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
