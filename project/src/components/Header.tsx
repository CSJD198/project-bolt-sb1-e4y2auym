import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Zap, Brain, Workflow } from 'lucide-react';
import { Dataset } from '../../types';

interface HeaderProps {
  activeTab: string;
  currentDataset?: Dataset;
  useSmartWorkflow?: boolean;
  onWorkflowToggle?: () => void;
}

const tabTitles: { [key: string]: { title: string; subtitle: string; icon: any } } = {
  upload: { 
    title: 'Data Ingestion', 
    subtitle: 'Upload and import your datasets',
    icon: Database
  },
  preview: { 
    title: 'Data Explorer', 
    subtitle: 'Analyze structure and preview your data',
    icon: Activity
  },
  eda: { 
    title: 'Exploratory Analysis', 
    subtitle: 'Generate comprehensive data insights',
    icon: Zap
  },
  clean: { 
    title: 'Data Processing', 
    subtitle: 'Clean and transform your datasets',
    icon: Cpu
  },
  visualize: { 
    title: 'Data Visualization', 
    subtitle: 'Create interactive charts and graphs',
    icon: Activity
  },
  ml: { 
    title: 'Machine Learning', 
    subtitle: 'Apply AI algorithms to your data',
    icon: Cpu
  },
  export: { 
    title: 'Data Export', 
    subtitle: 'Download and share your results',
    icon: Database
  },
};

export const Header: React.FC<HeaderProps> = ({ activeTab, currentDataset, useSmartWorkflow = false, onWorkflowToggle }) => {
  const currentTab = tabTitles[activeTab] || tabTitles.upload;
  const Icon = currentTab.icon;

  return (
    <div className="relative">
      {/* Glassmorphism Background */}
      {/* <div className="absolute inset-0 bg-main-gradient backdrop-blur-xl shadow-lg"></div> */}
      {/* Gradient edge for horizontal separation */}
      
      <div className="relative z-10 px-8 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-14 h-14 flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary-text" />
              </div>
              {/* Remove blurred gradient and card background for logo */}
            </div>
            <div>
              <motion.h2 
                className="text-3xl font-bold text-primary-text"
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentTab.title}
              </motion.h2>
              <motion.p 
                className="text-secondary-text mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentTab.subtitle}
              </motion.p>
              {/* Keep dataset info as is */}
              {currentDataset && (
                <motion.div 
                  className="flex items-center space-x-4 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm border border-white/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span
                      className="text-sm text-white font-medium max-w-[180px] truncate inline-block align-middle"
                      title={currentDataset.filename}
                      style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', verticalAlign: 'middle' }}
                    >
                      {currentDataset.filename}
                    </span>
                  </div>
                  {currentDataset.columns && (
                    <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm border border-white/20">
                      <Database className="w-3 h-3 text-blue-400" />
                      <span className="text-sm text-gray-300">
                        {currentDataset.columns.length} columns
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Status Indicators */}
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Workflow Toggle */}
            {onWorkflowToggle && (
              <motion.button
                onClick={onWorkflowToggle}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  useSmartWorkflow
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {useSmartWorkflow ? (
                  <>
                    <Brain className="w-4 h-4" />
                    <span className="text-sm">AI Workflow</span>
                  </>
                ) : (
                  <>
                    <Workflow className="w-4 h-4" />
                    <span className="text-sm">Traditional</span>
                  </>
                )}
              </motion.button>
            )}
            {/* System Status */}
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white font-medium">System Online</span>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/20">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">AI Ready</span>
                </div>
              </div>
            </div>
            
            {/* Performance Metrics */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">99.9%</div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">2.3s</div>
                <div className="text-xs text-gray-400">Avg Response</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};