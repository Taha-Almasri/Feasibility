import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Building, DollarSign, TrendingUp, Users, Calendar, Shield } from 'lucide-react';

interface StudyFormProps {
  onSubmit: (data: StudyData) => void;
  onBack: () => void;
}

export interface StudyData {
  projectName: string;
  industry: string;
  description: string;
  targetMarket: string;
  marketSize: string;
  initialInvestment: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  teamSize: number;
  timeToMarket: number;
  riskTolerance: string;
  location: string;
  competitorCount: string;
  uniqueValue: string;
}

export const StudyForm: React.FC<StudyFormProps> = ({ onSubmit, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StudyData>({
    projectName: '',
    industry: '',
    description: '',
    targetMarket: '',
    marketSize: '',
    initialInvestment: 0,
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    teamSize: 0,
    timeToMarket: 0,
    riskTolerance: '',
    location: '',
    competitorCount: '',
    uniqueValue: ''
  });

  const totalSteps = 4;

  const handleInputChange = (field: keyof StudyData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800">Project Overview</h2>
              <p className="text-slate-600">Tell us about your business idea</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Project Name</label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your project name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
                <option value="food-service">Food & Service</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Project Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your business idea and what problems it solves"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, State/Country"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800">Market Analysis</h2>
              <p className="text-slate-600">Define your target market and competition</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Market</label>
              <textarea
                value={formData.targetMarket}
                onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your ideal customers and target demographic"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Market Size</label>
              <select
                value={formData.marketSize}
                onChange={(e) => handleInputChange('marketSize', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select market size</option>
                <option value="local">Local (&lt; 100K people)</option>
                <option value="regional">Regional (100K - 1M people)</option>
                <option value="national">National (1M+ people)</option>
                <option value="global">Global</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Number of Direct Competitors</label>
              <select
                value={formData.competitorCount}
                onChange={(e) => handleInputChange('competitorCount', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select competitor count</option>
                <option value="none">No direct competitors</option>
                <option value="few">1-3 competitors</option>
                <option value="some">4-10 competitors</option>
                <option value="many">10+ competitors</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Unique Value Proposition</label>
              <textarea
                value={formData.uniqueValue}
                onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What makes your solution unique and better than alternatives?"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800">Financial Projections</h2>
              <p className="text-slate-600">Estimate your financial requirements and projections</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Initial Investment Required ($)</label>
              <input
                type="number"
                value={formData.initialInvestment}
                onChange={(e) => handleInputChange('initialInvestment', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Projected Monthly Revenue ($)</label>
              <input
                type="number"
                value={formData.monthlyRevenue}
                onChange={(e) => handleInputChange('monthlyRevenue', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Projected Monthly Expenses ($)</label>
              <input
                type="number"
                value={formData.monthlyExpenses}
                onChange={(e) => handleInputChange('monthlyExpenses', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Team Size (including yourself)</label>
              <input
                type="number"
                value={formData.teamSize}
                onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800">Timeline & Risk Assessment</h2>
              <p className="text-slate-600">Final details about timing and risk tolerance</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Time to Market (months)</label>
              <input
                type="number"
                value={formData.timeToMarket}
                onChange={(e) => handleInputChange('timeToMarket', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Risk Tolerance</label>
              <select
                value={formData.riskTolerance}
                onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select risk tolerance</option>
                <option value="low">Low - Prefer safe, proven opportunities</option>
                <option value="medium">Medium - Balanced risk/reward approach</option>
                <option value="high">High - Comfortable with uncertainty for higher returns</option>
              </select>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Study Summary</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Project:</strong> {formData.projectName || 'Not specified'}</p>
                <p><strong>Industry:</strong> {formData.industry || 'Not specified'}</p>
                <p><strong>Initial Investment:</strong> ${formData.initialInvestment.toLocaleString()}</p>
                <p><strong>Monthly Revenue Projection:</strong> ${formData.monthlyRevenue.toLocaleString()}</p>
                <p><strong>Time to Market:</strong> {formData.timeToMarket} months</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-slate-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              className="flex items-center px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 1 ? 'Back to Home' : 'Previous'}
            </button>

            <button
              onClick={nextStep}
              className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentStep === totalSteps ? 'Generate Study' : 'Next Step'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};