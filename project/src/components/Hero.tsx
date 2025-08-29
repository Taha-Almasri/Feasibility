import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStartStudy: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartStudy }) => {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Professional Feasibility
            <span className="text-blue-600 block">Studies Made Simple</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your business ideas into data-driven decisions. Our AI-powered platform 
            analyzes market conditions, financial projections, and operational requirements 
            to deliver comprehensive feasibility reports in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onStartStudy}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              Start Your Study
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
              View Sample Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-slate-600">Market Analysis</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-slate-600">Financial Projections</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-slate-600">Risk Assessment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};