import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle, Cloud, Zap, Database, Brain, Play, ArrowRight } from 'lucide-react';
import { apiService } from '../../services/api';
import { RoleSelector } from './RoleSelector';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onUploadSuccess: (filename: string, aiRecommendation?: any) => void;
  onApplyTemplate?: (template: any) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onApplyTemplate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textData, setTextData] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [description, setDescription] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<any | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [roleSuggestions, setRoleSuggestions] = useState<string[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    const file = selectedFile;

    // Check file size (16MB limit)
    const maxSize = 16 * 1024 * 1024; // 16MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 16MB');
      return;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['csv', 'xlsx', 'xls', 'json'];
    
    if (!allowedExtensions.includes(fileExtension || '')) {
      toast.error('Please upload a CSV, Excel, or JSON file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // First check if backend is running
      try {
        await apiService.healthCheck();
      } catch (error) {
        toast.error('Backend server is not running. Please start the Flask server on port 5000.');
        setIsUploading(false);
        return;
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const result = await apiService.uploadFile(file, description);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setUploadedFile(result.filename);
        setSelectedFile(null);
        setAiRecommendation(result.ai_recommendation || null);
        setShowRecommendation(true);
        onUploadSuccess(result.filename, result.ai_recommendation);
        toast.success('File uploaded successfully!');
        setIsUploading(false);
      }, 500);
      
    } catch (error: any) {
      setIsUploading(false);
      setUploadProgress(0);
      
      if (error.message.includes('Backend server is not running')) {
        toast.error('Backend server is not running. Please start the Flask server on port 5000.');
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to upload file. Please try again.');
      }
    }
  };

  const handleTextUpload = async () => {
    if (!textData.trim()) {
      toast.error('Please enter some data');
      return;
    }
    setIsUploading(true);
    try {
      const filename = `text_data_${Date.now()}.csv`;
      // Create a File from the text data
      const blob = new Blob([textData], { type: 'text/csv' });
      const file = new window.File([blob], filename, { type: 'text/csv' });
      // Use the same uploadFile API as file upload, with description
      const result = await apiService.uploadFile(file, description);
      setUploadedFile(result.filename);
      setSelectedFile(null);
      setAiRecommendation(result.ai_recommendation || null);
      setShowRecommendation(true);
      onUploadSuccess(result.filename, result.ai_recommendation);
      toast.success('Text data uploaded successfully!');
      setTextData('');
      setShowTextInput(false);
    } catch (error) {
      toast.error('Failed to upload text data');
    } finally {
      setIsUploading(false);
    }
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    setSelectedFile(null);
    setUploadProgress(0);
    setAiRecommendation(null);
    setShowRecommendation(false);
  };

  const handleApplyTemplate = () => {
    if (onApplyTemplate && aiRecommendation) {
      onApplyTemplate(aiRecommendation);
      toast.success('Template applied! Starting guided workflow...');
    }
  };

  const handleRoleSelect = (role: string, suggestions: string[]) => {
    setSelectedRole(role);
    setRoleSuggestions(suggestions);
    setShowRoleSelector(false);
    toast.success(`Role selected: ${role}. You'll get personalized suggestions!`);
  };

  const handleSkipRoleSelection = () => {
    setShowRoleSelector(false);
    toast.success('Proceeding without role selection');
  };

  const getDomainColor = (domain: string) => {
    const colors: { [key: string]: string } = {
      'Marketing': 'from-pink-500 to-rose-600',
      'Finance': 'from-green-500 to-emerald-600',
      'Healthcare': 'from-blue-500 to-cyan-600',
      'E-commerce': 'from-purple-500 to-violet-600',
      'Technology': 'from-indigo-500 to-blue-600',
      'Education': 'from-yellow-500 to-orange-600',
      'Manufacturing': 'from-gray-500 to-slate-600',
      'Retail': 'from-red-500 to-pink-600',
    };
    return colors[domain] || 'from-blue-500 to-purple-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <AnimatePresence mode="wait">
        {showRoleSelector ? (
          <RoleSelector 
            onRoleSelect={handleRoleSelect}
            onSkip={handleSkipRoleSelection}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* --- LEFT COLUMN: File Upload Section --- */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* File Upload Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Cloud className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Upload Dataset</h3>
                      <p className="text-gray-300">Drag & drop or browse files</p>
                    </div>
                  </div>
                  {/* Description Textarea (shared for both file and text input) */}
                  <div className="mb-4">
                    <label htmlFor="dataset-description" className="block text-white font-medium mb-1">
                      Briefly describe your dataset (optional)
                    </label>
                    <textarea
                      id="dataset-description"
                      className="w-full rounded-lg border border-white/20 bg-white/10 text-white p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={2}
                      placeholder="e.g. Customer purchase data from 2023 retail campaign"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      maxLength={300}
                    />
                  </div>
                  {!uploadedFile ? (
                    <motion.div
                      className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                        isDragging 
                          ? 'border-blue-400 bg-blue-500/10 scale-105' 
                          : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Upload className="mx-auto h-16 w-16 text-blue-400 mb-6" />
                      </motion.div>
                      <h4 className="text-xl font-semibold text-white mb-3">
                        Drop your files here
                      </h4>
                      <p className="text-gray-300 mb-6">
                        Supports CSV, Excel (.xlsx), and JSON files up to 16MB
                      </p>
                      <input
                        type="file"
                        accept=".csv,.xlsx,.json"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105"
                      >
                        <File className="h-5 w-5" />
                        <span>Browse Files</span>
                      </label>
                      {selectedFile && (
                        <div className="mt-4 text-white text-sm">
                          <span className="font-semibold">Selected File:</span> {selectedFile.name}
                        </div>
                      )}
                      <button
                        className={`mt-6 w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={handleFileUpload}
                        disabled={!selectedFile || isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Upload'}
                      </button>
                      <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>CSV</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Excel</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>JSON</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-lg">{uploadedFile}</p>
                            <p className="text-green-300">Successfully uploaded and ready for analysis</p>
                          </div>
                        </div>
                        <motion.button
                          onClick={clearUploadedFile}
                          className="text-green-400 hover:text-green-300 p-2 rounded-xl hover:bg-white/10 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                  <AnimatePresence>
                    {isUploading && (
                      <motion.div
                        className="mt-6 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                          <span className="text-white font-medium">Processing your data...</span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${uploadProgress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm"></div>
                        </div>
                        <p className="text-sm text-gray-300 text-center">{uploadProgress}% complete</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
            {/* --- RIGHT COLUMN: Info/Features/AI Section --- */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* AI Recommendation Section */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* AI Recommendation Card */}
                <AnimatePresence>
                  {showRecommendation && aiRecommendation && (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
                      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-center space-x-3 mb-6">
                          <div className={`w-12 h-12 bg-gradient-to-r ${getDomainColor(aiRecommendation.recommended_domain)} rounded-2xl flex items-center justify-center`}>
                            <Brain className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">AI Recommendation</h3>
                            <p className="text-gray-300">Based on your data analysis</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Domain Recommendation */}
                          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-lg font-semibold text-white mb-3">
                              Recommended Domain: {aiRecommendation.recommended_domain}
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {aiRecommendation.why}
                            </p>
                          </div>

                          {/* Suggested Next Steps */}
                          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-lg font-semibold text-white mb-4">Suggested Next Steps</h4>
                            <div className="space-y-3">
                              {aiRecommendation.suggested_next_steps?.map((step: string, index: number) => (
                                <div key={index} className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">{index + 1}</span>
                                  </div>
                                  <p className="text-gray-300 text-sm">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Apply Template Button */}
                          <motion.button
                            onClick={handleApplyTemplate}
                            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Play className="h-5 w-5" />
                            <span>Apply Template & Start Workflow</span>
                            <ArrowRight className="h-5 w-5" />
                          </motion.button>

                          <p className="text-center text-gray-400 text-sm">
                            This will automatically configure the analysis workflow based on your data type
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Text Input Section */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                        <Database className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Paste Data</h3>
                        <p className="text-gray-300">Enter CSV or TSV data directly</p>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => setShowTextInput(!showTextInput)}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 border border-white/20 rounded-2xl text-white font-medium hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Zap className="h-5 w-5" />
                      <span>{showTextInput ? 'Hide' : 'Show'} Text Input</span>
                    </motion.button>

                    <AnimatePresence>
                      {showTextInput && (
                        <motion.div
                          className="mt-6 space-y-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative">
                            <textarea
                              value={textData}
                              onChange={(e) => setTextData(e.target.value)}
                              placeholder="Paste your CSV data here...&#10;Example:&#10;Name,Age,City&#10;John,25,New York&#10;Jane,30,Los Angeles"
                              className="w-full h-48 p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none backdrop-blur-sm transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl pointer-events-none"></div>
                          </div>
                          
                          {/* Description Textarea for text input */}
                          <div className="mb-4 mt-4">
                            <label htmlFor="textdata-description" className="block text-white font-medium mb-1">
                              Briefly describe your dataset (optional)
                            </label>
                            <textarea
                              id="textdata-description"
                              className="w-full rounded-lg border border-white/20 bg-white/10 text-white p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                              rows={2}
                              placeholder="e.g. Customer purchase data from 2023 retail campaign"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              maxLength={300}
                            />
                          </div>
                          <motion.button
                            onClick={handleTextUpload}
                            disabled={!textData.trim() || isUploading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isUploading ? (
                              <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Processing...</span>
                              </div>
                            ) : (
                              'Upload Text Data'
                            )}
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Features Info */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <h4 className="text-xl font-bold text-white mb-6">Platform Features</h4>
                    
                    <div className="space-y-4">
                      {[
                        { icon: Zap, title: 'Lightning Fast', desc: 'Process datasets in seconds' },
                        { icon: Database, title: 'Smart Analysis', desc: 'AI-powered data insights' },
                        { icon: CheckCircle, title: 'Secure Upload', desc: 'Enterprise-grade security' },
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <feature.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-white">{feature.title}</h5>
                            <p className="text-sm text-gray-300">{feature.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};