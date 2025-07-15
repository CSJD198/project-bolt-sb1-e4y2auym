import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Database, 
  BarChart3, 
  Wrench, 
  Brain, 
  Download,
  FileText,
  Zap,
  Code,
  TrendingUp,
  MessageCircle,
  Activity,
  Layout,
  Sparkles,
  GitBranch,
  Shield,
  Users
} from 'lucide-react';
import pieChartLogo from '../../assets/mind-map.png';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'upload', label: 'Data Upload', icon: Upload, color: 'from-blue-500 to-cyan-500' },
  { id: 'preview', label: 'Preview', icon: Database, color: 'from-green-500 to-emerald-500' },
  { id: 'dashboard', label: 'Auto Dashboard', icon: BarChart3, color: 'from-blue-500 to-indigo-500' },
  { id: 'ask', label: 'Ask Insight', icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
  { id: 'customml', label: 'Custom ML', icon: Brain, color: 'from-indigo-500 to-blue-500' },
  { id: 'realtime', label: 'Real-time Streaming', icon: Activity, color: 'from-red-500 to-pink-500' },
  { id: 'dashboard-builder', label: 'Dashboard Builder', icon: Layout, color: 'from-purple-500 to-indigo-500' },
  { id: 'ai-insights', label: 'AI Insights', icon: Sparkles, color: 'from-pink-500 to-purple-500' },
  { id: 'pipeline', label: 'Pipeline Orchestrator', icon: GitBranch, color: 'from-indigo-500 to-purple-500' },
  { id: 'data-quality', label: 'Data Quality', icon: Shield, color: 'from-green-500 to-emerald-500' },
  { id: 'collaboration', label: 'Collaboration', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { id: 'eda', label: 'EDA Report', icon: FileText, color: 'from-purple-500 to-violet-500' },
  { id: 'clean', label: 'Data Cleaning', icon: Wrench, color: 'from-orange-500 to-amber-500' },
  { id: 'visualize', label: 'Visualization', icon: BarChart3, color: 'from-pink-500 to-rose-500' },
  { id: 'sql', label: 'SQL Studio', icon: Code, color: 'from-yellow-500 to-orange-500' },
  { id: 'stock', label: 'Stock Analytics', icon: TrendingUp, color: 'from-green-500 to-lime-500' },
  { id: 'ml', label: 'Machine Learning', icon: Brain, color: 'from-indigo-500 to-blue-500' },
  { id: 'export', label: 'Export', icon: Download, color: 'from-teal-500 to-cyan-500' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-80 relative">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-main-gradient backdrop-blur-xl shadow-xl" style={{ boxShadow: '0 0 24px 0 rgba(0,0,0,0.10)' }}></div>
      {/* Gradient edge for separation */}
      {/* <div className="absolute top-0 right-0 h-full w-3 pointer-events-none" style={{ background: 'linear-gradient(to left, #3b82f6 40%, transparent 100%)', opacity: 0.18 }} /> */}
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Logo Section */}
        <motion.div 
          className="p-8 border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={pieChartLogo} alt="DataWhiz Logo" className="w-16 h-16 rounded-xl shadow-lg object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-text">
                DataWhiz
              </h1>
              <p className="text-sm text-secondary-text">Upload. Analyze. Discover. Instantly</p>
            </div>
          </div>
        </motion.div>
        
        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-3">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-card shadow-lg border border-card' 
                    : 'hover:bg-card hover:border hover:border-card'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-20 rounded-2xl`}
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                
                <div className="relative flex items-center space-x-4 px-6 py-4">
                  <div className={`p-2 rounded-xl bg-card border border-card ${isActive ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'} transition-all duration-300`}>
                    <Icon className="h-5 w-5 text-primary-text" />
                  </div>
                  <span className={`font-medium transition-colors duration-300 ${
                    isActive 
                      ? 'text-primary-text' 
                      : 'text-secondary-text group-hover:text-primary-text'
                  }`}>
                    {tab.label}
                  </span>
                </div>
                
                {/* Animated border */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full"
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
        
        {/* Footer */}
        <motion.div 
          className="p-6 border-t border-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-card rounded-2xl p-4 backdrop-blur-sm border border-card">
            <div className="text-sm text-secondary-text space-y-1">
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>System Online</span>
              </p>
              <p>Built with React & AI</p>
              <p>Powered by Advanced Analytics</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};