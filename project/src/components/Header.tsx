import React from 'react';
import { BarChart3, Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-800">FeasibilityPro</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-600 hover:text-blue-600 transition-colors">Sign In</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={onMenuToggle}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
            <a href="#features" className="block px-3 py-2 text-slate-600 hover:text-blue-600">Features</a>
            <a href="#how-it-works" className="block px-3 py-2 text-slate-600 hover:text-blue-600">How It Works</a>
            <a href="#pricing" className="block px-3 py-2 text-slate-600 hover:text-blue-600">Pricing</a>
            <a href="#contact" className="block px-3 py-2 text-slate-600 hover:text-blue-600">Contact</a>
            <div className="border-t border-slate-200 pt-4 pb-3">
              <button className="block w-full text-left px-3 py-2 text-slate-600 hover:text-blue-600">Sign In</button>
              <button className="block w-full text-left px-3 py-2 mt-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};