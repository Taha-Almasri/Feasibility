import React from 'react';
import { ArrowLeft, Download, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, DollarSign, Calendar, Users, Target } from 'lucide-react';
import { StudyData } from './StudyForm';

interface StudyResultsProps {
  data: StudyData;
  onBack: () => void;
  onNewStudy: () => void;
}

export const StudyResults: React.FC<StudyResultsProps> = ({ data, onBack, onNewStudy }) => {
  // Calculate feasibility score based on input data
  const calculateFeasibilityScore = (): number => {
    let score = 0;
    
    // Financial viability (30 points)
    const monthlyProfit = data.monthlyRevenue - data.monthlyExpenses;
    const breakEvenTime = data.initialInvestment / (monthlyProfit > 0 ? monthlyProfit : 1);
    
    if (monthlyProfit > 0) score += 15;
    if (breakEvenTime <= 12) score += 10;
    else if (breakEvenTime <= 24) score += 5;
    
    if (data.initialInvestment < 50000) score += 5;
    
    // Market conditions (25 points)
    if (data.marketSize === 'global') score += 10;
    else if (data.marketSize === 'national') score += 8;
    else if (data.marketSize === 'regional') score += 6;
    else if (data.marketSize === 'local') score += 4;
    
    if (data.competitorCount === 'none') score += 10;
    else if (data.competitorCount === 'few') score += 8;
    else if (data.competitorCount === 'some') score += 5;
    else if (data.competitorCount === 'many') score += 2;
    
    if (data.uniqueValue.length > 50) score += 5;
    
    // Execution factors (25 points)
    if (data.timeToMarket <= 6) score += 10;
    else if (data.timeToMarket <= 12) score += 7;
    else if (data.timeToMarket <= 18) score += 4;
    
    if (data.teamSize >= 3) score += 8;
    else if (data.teamSize >= 2) score += 5;
    else score += 2;
    
    if (data.riskTolerance === 'high') score += 7;
    else if (data.riskTolerance === 'medium') score += 5;
    else if (data.riskTolerance === 'low') score += 3;
    
    // Industry and description bonus (20 points)
    if (data.industry && data.industry !== '') score += 5;
    if (data.description.length > 100) score += 10;
    if (data.targetMarket.length > 50) score += 5;
    
    return Math.min(score, 100);
  };

  const feasibilityScore = calculateFeasibilityScore();
  const monthlyProfit = data.monthlyRevenue - data.monthlyExpenses;
  const breakEvenMonths = data.initialInvestment / (monthlyProfit > 0 ? monthlyProfit : 1);
  const annualRevenue = data.monthlyRevenue * 12;
  const roi = data.initialInvestment > 0 ? ((annualRevenue - (data.monthlyExpenses * 12) - data.initialInvestment) / data.initialInvestment) * 100 : 0;

  const getFeasibilityLevel = (score: number): { level: string; color: string; icon: React.ReactNode } => {
    if (score >= 80) {
      return { level: 'Highly Feasible', color: 'text-green-600', icon: <CheckCircle className="h-6 w-6 text-green-600" /> };
    } else if (score >= 60) {
      return { level: 'Moderately Feasible', color: 'text-yellow-600', icon: <TrendingUp className="h-6 w-6 text-yellow-600" /> };
    } else if (score >= 40) {
      return { level: 'Challenging', color: 'text-orange-600', icon: <AlertTriangle className="h-6 w-6 text-orange-600" /> };
    } else {
      return { level: 'High Risk', color: 'text-red-600', icon: <TrendingDown className="h-6 w-6 text-red-600" /> };
    }
  };

  const feasibilityLevel = getFeasibilityLevel(feasibilityScore);

  const generateRecommendations = (): string[] => {
    const recommendations: string[] = [];
    
    if (monthlyProfit <= 0) {
      recommendations.push("Review your revenue model and pricing strategy to ensure profitability");
    }
    
    if (breakEvenMonths > 24) {
      recommendations.push("Consider reducing initial investment or increasing revenue projections");
    }
    
    if (data.competitorCount === 'many') {
      recommendations.push("Develop stronger differentiation strategies to stand out in a crowded market");
    }
    
    if (data.timeToMarket > 12) {
      recommendations.push("Look for ways to accelerate time-to-market to reduce opportunity cost");
    }
    
    if (data.teamSize < 2) {
      recommendations.push("Consider building a larger team to distribute workload and expertise");
    }
    
    if (!data.uniqueValue || data.uniqueValue.length < 30) {
      recommendations.push("Clearly define and strengthen your unique value proposition");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Your project shows strong potential - focus on execution and market validation");
      recommendations.push("Consider conducting pilot tests or MVP launch to validate assumptions");
      recommendations.push("Develop partnerships to accelerate growth and reduce risks");
    }
    
    return recommendations;
  };

  const recommendations = generateRecommendations();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors mr-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Form
              </button>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{data.projectName}</h1>
                <p className="text-slate-600">Feasibility Study Report</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </button>
              <button
                onClick={onNewStudy}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                New Study
              </button>
            </div>
          </div>
        </div>

        {/* Feasibility Score */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              {feasibilityLevel.icon}
              <h2 className="text-2xl font-bold text-slate-800 ml-3">Overall Feasibility Score</h2>
            </div>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(feasibilityScore / 100) * 314} 314`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">{feasibilityScore}</span>
              </div>
            </div>
            <p className={`text-xl font-semibold ${feasibilityLevel.color} mb-2`}>
              {feasibilityLevel.level}
            </p>
            <p className="text-slate-600">Based on your project parameters and market analysis</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <DollarSign className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-slate-800">
                ${monthlyProfit >= 0 ? monthlyProfit.toLocaleString() : `(${Math.abs(monthlyProfit).toLocaleString()})`}
              </span>
            </div>
            <p className="text-slate-600 mt-2">Monthly Profit</p>
            <p className={`text-sm ${monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {monthlyProfit >= 0 ? 'Profitable' : 'Operating at Loss'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-800">
                {isFinite(breakEvenMonths) ? Math.ceil(breakEvenMonths) : '∞'}
              </span>
            </div>
            <p className="text-slate-600 mt-2">Break-even Timeline</p>
            <p className="text-sm text-slate-500">Months to profitability</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-slate-800">
                {roi.toFixed(1)}%
              </span>
            </div>
            <p className="text-slate-600 mt-2">Annual ROI</p>
            <p className={`text-sm ${roi >= 15 ? 'text-green-600' : roi >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
              {roi >= 15 ? 'Excellent' : roi >= 5 ? 'Good' : 'Below Average'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <Target className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-slate-800">{data.timeToMarket}</span>
            </div>
            <p className="text-slate-600 mt-2">Time to Market</p>
            <p className="text-sm text-slate-500">Months to launch</p>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strengths & Opportunities */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              Strengths & Opportunities
            </h3>
            <div className="space-y-4">
              {monthlyProfit > 0 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">Positive monthly profit projection</p>
                </div>
              )}
              {data.competitorCount === 'none' || data.competitorCount === 'few' ? (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">Limited competition in target market</p>
                </div>
              ) : null}
              {data.timeToMarket <= 6 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">Fast time-to-market advantage</p>
                </div>
              )}
              {data.marketSize === 'global' || data.marketSize === 'national' ? (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">Large addressable market</p>
                </div>
              ) : null}
              {data.teamSize >= 3 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">Strong team foundation</p>
                </div>
              )}
            </div>
          </div>

          {/* Risks & Challenges */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
              Risks & Challenges
            </h3>
            <div className="space-y-4">
              {monthlyProfit <= 0 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">Negative cash flow projections</p>
                </div>
              )}
              {breakEvenMonths > 24 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">Extended break-even timeline</p>
                </div>
              )}
              {data.competitorCount === 'many' && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">Highly competitive market environment</p>
                </div>
              )}
              {data.teamSize < 2 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">Limited team capacity</p>
                </div>
              )}
              {data.initialInvestment > 100000 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-slate-700">High capital requirements</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Strategic Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-slate-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Project Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Project Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Industry:</span>
                  <span className="text-slate-800 capitalize">{data.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Location:</span>
                  <span className="text-slate-800">{data.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Market Size:</span>
                  <span className="text-slate-800 capitalize">{data.marketSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Risk Tolerance:</span>
                  <span className="text-slate-800 capitalize">{data.riskTolerance}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Financial Overview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Initial Investment:</span>
                  <span className="text-slate-800">${data.initialInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Monthly Revenue:</span>
                  <span className="text-slate-800">${data.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Monthly Expenses:</span>
                  <span className="text-slate-800">${data.monthlyExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Team Size:</span>
                  <span className="text-slate-800">{data.teamSize} people</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};