import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { ArrowRight, ShieldCheck, Sparkles, Menu, X } from 'lucide-react';

interface LandingNavbarProps {
  onStartFree: () => void;
  onSignIn: () => void;
  onExploreDemo: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onStartFree,
  onSignIn,
  onExploreDemo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'AI CFO', href: '#ai-cfo' },
    { label: 'Cash Flow', href: '#cash-flow' },
    { label: 'Profitability', href: '#profitability' },
    { label: 'GST Intelligence', href: '#gst' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '#security' },
  ];

  return (
    <header
      id="ytech-landing-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-3.5 shadow-sm border-b border-slate-200'
          : 'bg-white py-4 sm:py-5 border-b border-slate-200 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between">
        {/* Left: Centralized Logo */}
        <Logo
          variant="full"
          size="md"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-explore-demo-btn"
            onClick={onExploreDemo}
            className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Live Demo
          </button>

          <button
            id="nav-signin-btn"
            onClick={onSignIn}
            className="text-sm font-semibold px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign In
          </button>

          <button
            id="nav-start-free-btn"
            onClick={onStartFree}
            className="text-sm font-semibold px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-sm"
          >
            Start Free
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-blue-600 py-2 border-b border-slate-50"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreDemo();
              }}
              className="w-full text-center text-sm font-semibold text-slate-800 bg-slate-100 py-2.5 rounded-lg"
            >
              Explore YTech Demo
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignIn();
                }}
                className="w-full text-center text-sm font-semibold text-slate-700 border border-slate-200 py-2.5 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartFree();
                }}
                className="w-full text-center text-sm font-semibold text-white bg-blue-600 py-2.5 rounded-lg"
              >
                Start Free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
