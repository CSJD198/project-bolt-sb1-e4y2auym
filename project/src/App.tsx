import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  BarChart3, 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Play,
  TrendingUp,
  Database,
  Activity,
  Sparkles,
  Code,
  Target,
  Globe,
  Rocket,
  Award,
  Clock,
  ChevronDown
} from 'lucide-react';

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated background grid
const AnimatedGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-10">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4f46e5" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

// Scroll indicator
const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 relative overflow-x-hidden">
      <FloatingParticles />
      <AnimatedGrid />
      <ScrollIndicator />
      
      {/* Cursor follower */}
      <motion.div
        className="fixed w-6 h-6 bg-blue-500/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-40 backdrop-blur-xl border-b"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <BarChart3 className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold text-white">DataWhiz</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Features', 'About', 'Pricing', 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
              ))}
              <motion.button 
                className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-6 text-white"
                style={{ y: y1 }}
              >
                Transform Your
                <motion.span 
                  className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent block"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Data
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300"
              style={{ y: y2 }}
            >
              Upload. Analyze. Discover. Instantly transform raw data into actionable insights with AI-powered analytics.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.button 
                onClick={() => scrollToSection('features')}
                className="px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2 group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Start Analyzing</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>
              
              <motion.button 
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 backdrop-blur-sm border rounded-2xl font-semibold text-lg text-white hover:bg-white/20 transition-all duration-300 group"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="group-hover:mr-2 transition-all">Learn More</span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Animated scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-8 w-8 text-white/50" />
            </motion.div>
          </motion.div>
          
          {/* Animated Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: "10M+", label: "Datasets Analyzed", icon: Database },
              { number: "99.9%", label: "Uptime", icon: Clock },
              { number: "50K+", label: "Happy Users", icon: Users }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold mb-2 text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 1, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 group-hover:text-white transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">Powerful Features</span>
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-6 text-white">
              Everything You Need
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Turn your data into insights with our comprehensive analytics platform
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Upload,
                title: "Smart Upload",
                description: "Drag & drop CSV, Excel, or JSON files. AI automatically detects data types and suggests analysis paths.",
                color: "from-blue-500 to-cyan-500",
                delay: 0
              },
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description: "Machine learning algorithms automatically identify patterns, anomalies, and insights in your data.",
                color: "from-purple-500 to-pink-500",
                delay: 0.1
              },
              {
                icon: BarChart3,
                title: "Interactive Dashboards",
                description: "Create stunning visualizations and dashboards with our drag-and-drop interface.",
                color: "from-green-500 to-emerald-500",
                delay: 0.2
              },
              {
                icon: Zap,
                title: "Real-time Processing",
                description: "Process millions of rows in seconds with our optimized data processing engine.",
                color: "from-yellow-500 to-orange-500",
                delay: 0.3
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and security protocols to keep your data safe and compliant.",
                color: "from-red-500 to-pink-500",
                delay: 0.4
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share insights, collaborate on projects, and work together seamlessly across teams.",
                color: "from-indigo-500 to-purple-500",
                delay: 0.5
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                  animate={{
                    background: [
                      `linear-gradient(45deg, rgba(79, 70, 229, 0.1), rgba(59, 130, 246, 0.1))`,
                      `linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(79, 70, 229, 0.1))`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <div 
                  className="relative backdrop-blur-xl border rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-white/20"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r ${feature.color}`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {feature.description}
                  </p>
                  
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <ArrowRight className="h-5 w-5 text-blue-400" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                whileHover={{ scale: 1.05 }}
              >
                <Award className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">About DataWhiz</span>
              </motion.div>
              
              <h2 className="text-5xl font-bold mb-8 text-white">
                Revolutionizing
                <motion.span 
                  className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Data Analytics
                </motion.span>
              </h2>
              
              <motion.p 
                className="text-xl mb-6 leading-relaxed text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Founded in 2020, DataWhiz has revolutionized how businesses approach data analysis. 
                Our mission is to democratize data science and make advanced analytics accessible to everyone.
              </motion.p>
              
              <motion.p 
                className="text-lg mb-8 leading-relaxed text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                With over 50,000 users worldwide, we've processed millions of datasets and helped 
                companies make data-driven decisions that drive growth and innovation.
              </motion.p>
              
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "AI-first approach to data analysis",
                  "No-code solution for complex analytics",
                  "Enterprise-grade security and compliance",
                  "24/7 customer support"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-3 group"
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </motion.div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="absolute inset-0 rounded-3xl blur-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div 
                className="relative backdrop-blur-xl border rounded-3xl p-8"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <motion.div 
                  className="grid grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: TrendingUp, value: "500%", label: "Faster Analysis", color: "text-blue-400" },
                    { icon: Database, value: "10TB+", label: "Data Processed", color: "text-green-400" },
                    { icon: Activity, value: "99.9%", label: "Accuracy Rate", color: "text-purple-400" },
                    { icon: Users, value: "24/7", label: "Support", color: "text-blue-400" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                      </motion.div>
                      <motion.div 
                        className="text-3xl font-bold mb-2 text-white"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-300 group-hover:text-white transition-colors">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [-100, 100, -100],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
              whileHover={{ scale: 1.05 }}
            >
              <Target className="h-5 w-5 text-green-400" />
              <span className="text-gray-300">Simple Pricing</span>
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-6 text-white">Choose Your Plan</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              All plans include our core features with different usage limits
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for individuals and small teams",
                features: [
                  "Up to 10 datasets",
                  "Basic visualizations",
                  "Email support",
                  "5GB storage"
                ],
                color: "from-blue-500 to-cyan-500",
                popular: false
              },
              {
                name: "Professional",
                price: "$99",
                period: "/month",
                description: "Best for growing businesses",
                features: [
                  "Unlimited datasets",
                  "Advanced AI insights",
                  "Priority support",
                  "100GB storage",
                  "Team collaboration",
                  "Custom dashboards"
                ],
                color: "from-purple-500 to-pink-500",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large organizations",
                features: [
                  "Everything in Professional",
                  "Dedicated support",
                  "Custom integrations",
                  "Unlimited storage",
                  "Advanced security",
                  "SLA guarantee"
                ],
                color: "from-green-500 to-emerald-500",
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative group ${plan.popular ? 'scale-105' : ''}`}
                whileHover={{ y: -10, scale: plan.popular ? 1.08 : 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <div className="px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Most Popular
                    </div>
                  </motion.div>
                )}
                
                <motion.div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                />
                
                <div 
                  className="relative backdrop-blur-xl border rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-white/20"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto bg-gradient-to-r ${plan.color}`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Star className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-center mb-2 text-white">{plan.name}</h3>
                  
                  <div className="text-center mb-6">
                    <motion.span 
                      className="text-4xl font-bold text-white"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      {plan.price}
                    </motion.span>
                    <span className="text-gray-300">{plan.period}</span>
                  </div>
                  
                  <p className="text-center mb-8 text-gray-300">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 + 0.5 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </motion.div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.button 
                    className={`w-full px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r ${plan.color} text-white hover:shadow-lg transition-all duration-300 group`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="group-hover:mr-2 transition-all">Get Started</span>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">Get In Touch</span>
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-6 text-white">Contact Us</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: Mail, title: "Email", info: "hello@datawhiz.com", color: "from-blue-500 to-cyan-500" },
                  { icon: Phone, title: "Phone", info: "+1 (555) 123-4567", color: "from-green-500 to-emerald-500" },
                  { icon: MapPin, title: "Office", info: "123 Data Street, Analytics City, AC 12345", color: "from-purple-500 to-pink-500" }
                ].map((contact, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-4 group cursor-pointer"
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${contact.color}`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{contact.title}</h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{contact.info}</p>
                    </div>
                  </motion.div>
                ))}

                <motion.div 
                  className="pt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: Twitter, color: "hover:bg-blue-500" },
                      { icon: Linkedin, color: "hover:bg-blue-600" },
                      { icon: Github, color: "hover:bg-gray-600" }
                    ].map((social, index) => (
                      <motion.button 
                        key={index}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color}`}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <social.icon className="h-6 w-6 text-white" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="backdrop-blur-xl border rounded-3xl p-8"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.form 
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={itemVariants}
                  >
                    <div>
                      <label className="block font-medium mb-2 text-white">First Name</label>
                      <motion.input 
                        type="text" 
                        className="w-full px-4 py-3 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                        placeholder="John"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-white">Last Name</label>
                      <motion.input 
                        type="text" 
                        className="w-full px-4 py-3 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                        placeholder="Doe"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block font-medium mb-2 text-white">Email</label>
                    <motion.input 
                      type="email" 
                      className="w-full px-4 py-3 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                      placeholder="john@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block font-medium mb-2 text-white">Message</label>
                    <motion.textarea 
                      rows={4}
                      className="w-full px-4 py-3 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                      placeholder="Tell us about your project..."
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.button 
                    type="submit"
                    variants={itemVariants}
                    className="w-full px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Send Message</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </motion.button>
                </motion.form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-12 px-6 border-t"
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <motion.div 
                className="flex items-center space-x-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <BarChart3 className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold text-white">DataWhiz</span>
              </motion.div>
              <p className="mb-4 text-gray-300">
                Transform your data into actionable insights with our AI-powered analytics platform.
              </p>
            </motion.div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Documentation"]
              },
              {
                title: "Company", 
                links: ["About", "Blog", "Careers", "Press"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact", "Status", "Privacy"]
              }
            ].map((section, index) => (
              <motion.div key={index} variants={itemVariants}>
                <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex}>
                      <motion.a 
                        href="#" 
                        className="text-gray-300 hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="border-t mt-8 pt-8 text-center"
            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300">
              © 2024 DataWhiz. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;