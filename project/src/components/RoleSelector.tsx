import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Search, 
  Target, 
  BarChart3, 
  Users, 
  DollarSign, 
  Stethoscope, 
  ShoppingCart,
  Brain,
  Zap
} from 'lucide-react';

interface RoleSelectorProps {
  onRoleSelect: (role: string, suggestions: string[]) => void;
  onSkip: () => void;
}

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  suggestions: string[];
  color: string;
}

const roleOptions: RoleOption[] = [
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Analyze business metrics, KPIs, and performance data',
    icon: <TrendingUp className="w-6 h-6" />,
    suggestions: [
      'Create customer segmentation analysis',
      'Analyze sales performance trends',
      'Identify key business drivers',
      'Generate executive dashboards'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'researcher',
    title: 'Research & EDA',
    description: 'Explore data patterns, correlations, and insights',
    icon: <Search className="w-6 h-6" />,
    suggestions: [
      'Perform exploratory data analysis',
      'Find correlations between variables',
      'Identify data quality issues',
      'Generate statistical summaries'
    ],
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'predictive-modeler',
    title: 'Predictive Modeling',
    description: 'Build ML models for forecasting and classification',
    icon: <Target className="w-6 h-6" />,
    suggestions: [
      'Build customer churn prediction models',
      'Create sales forecasting models',
      'Develop classification algorithms',
      'Perform feature engineering'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'marketing-analyst',
    title: 'Marketing Analytics',
    description: 'Analyze campaign performance and customer behavior',
    icon: <BarChart3 className="w-6 h-6" />,
    suggestions: [
      'Analyze campaign ROI and performance',
      'Segment customers by behavior',
      'Optimize marketing spend allocation',
      'Track customer lifetime value'
    ],
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'finance-analyst',
    title: 'Financial Analysis',
    description: 'Analyze financial data, risk, and performance',
    icon: <DollarSign className="w-6 h-6" />,
    suggestions: [
      'Analyze financial performance metrics',
      'Detect fraud and anomalies',
      'Calculate risk assessments',
      'Generate financial reports'
    ],
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'data-scientist',
    title: 'Data Science',
    description: 'Advanced analytics, ML, and statistical modeling',
    icon: <Brain className="w-6 h-6" />,
    suggestions: [
      'Perform advanced clustering analysis',
      'Build recommendation systems',
      'Conduct A/B testing analysis',
      'Create predictive models'
    ],
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'ecommerce-analyst',
    title: 'E-commerce Analytics',
    description: 'Analyze online sales, inventory, and customer data',
    icon: <ShoppingCart className="w-6 h-6" />,
    suggestions: [
      'Analyze product performance',
      'Optimize inventory management',
      'Track customer purchase patterns',
      'Improve conversion rates'
    ],
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'healthcare-analyst',
    title: 'Healthcare Analytics',
    description: 'Analyze patient data and medical outcomes',
    icon: <Stethoscope className="w-6 h-6" />,
    suggestions: [
      'Analyze patient outcomes',
      'Identify risk factors',
      'Optimize treatment protocols',
      'Track healthcare metrics'
    ],
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'general',
    title: 'General Analysis',
    description: 'Flexible analysis for any type of data',
    icon: <Zap className="w-6 h-6" />,
    suggestions: [
      'Explore data patterns and insights',
      'Clean and prepare data',
      'Create visualizations',
      'Generate summary reports'
    ],
    color: 'from-gray-500 to-gray-600'
  }
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect, onSkip }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleRoleSelect = (role: RoleOption) => {
    setSelectedRole(role.id);
    setShowSuggestions(true);
  };

  const handleConfirm = () => {
    if (selectedRole) {
      const role = roleOptions.find(r => r.id === selectedRole);
      if (role) {
        onRoleSelect(role.id, role.suggestions);
      }
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
    setShowSuggestions(false);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Users className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">What's your analysis goal?</h2>
        <p className="text-white/70 text-lg">Choose your role to get personalized suggestions and guidance</p>
      </div>

      <AnimatePresence mode="wait">
        {!showSuggestions ? (
          /* Role Selection Grid */
          <motion.div
            key="roles"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          >
            {roleOptions.map((role, index) => (
              <motion.button
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className={`p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-left hover:bg-white/20 transition-all duration-300 group`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {role.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{role.title}</h3>
                <p className="text-white/70 text-sm">{role.description}</p>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          /* Suggestions View */
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-8"
          >
            {selectedRole && (() => {
              const role = roleOptions.find(r => r.id === selectedRole);
              if (!role) return null;

              return (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={handleBack}
                      className="mr-4 p-2 text-white/70 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className={`w-12 h-12 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mr-4`}>
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{role.title}</h3>
                      <p className="text-white/70">{role.description}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Suggested Analysis Tasks:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {role.suggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          className="p-4 rounded-xl"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <p className="text-white/90 text-sm">{suggestion}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <motion.button
                      onClick={handleConfirm}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start Analysis with {role.title}
                    </motion.button>
                    <motion.button
                      onClick={handleBack}
                      className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Choose Different Role
                    </motion.button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button */}
      <div className="text-center mt-6">
        <button
          onClick={onSkip}
          className="text-white/60 hover:text-white transition-colors text-sm"
        >
          Skip role selection and upload directly
        </button>
      </div>
    </motion.div>
  );
}; 