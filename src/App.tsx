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

// Enhanced floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 25 + 15,
    color: i % 3 === 0 ? '#4f46e5' : i % 3 === 1 ? '#22c55e' : '#3b82f6',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -120, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
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

// Enhanced animated background grid
const AnimatedGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-30">
      <svg width="100%" height="100%">
        <defs>
          {/* Subtle dot pattern */}
          <pattern id="dots" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="1.5" fill="#4f46e5" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="20" cy="20" r="1" fill="#22c55e" opacity="0.2">
              <animate attributeName="opacity" values="0.05;0.3;0.05" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="20" r="0.8" fill="#3b82f6" opacity="0.25">
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="5s" repeatCount="indefinite" />
            </circle>
          </pattern>
          
          {/* Flowing lines pattern */}
          <pattern id="lines" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M0,100 Q50,50 100,100 T200,100" stroke="#4f46e5" strokeWidth="0.5" fill="none" opacity="0.1">
              <animate attributeName="opacity" values="0.05;0.2;0.05" dur="8s" repeatCount="indefinite" />
            </path>
            <path d="M0,150 Q50,100 100,150 T200,150" stroke="#22c55e" strokeWidth="0.3" fill="none" opacity="0.08">
              <animate attributeName="opacity" values="0.03;0.15;0.03" dur="10s" repeatCount="indefinite" />
            </path>
          </pattern>
          
          {/* Radial gradient overlay */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.02" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Apply patterns */}
        <rect width="100%" height="100%" fill="url(#dots)" />
        <rect width="100%" height="100%" fill="url(#lines)" />
        <rect width="100%" height="100%" fill="url(#centerGlow)" />
      </svg>
    </div>
  );
};

// Enhanced scroll indicator
const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary-gradient z-50 origin-left shadow-glow-primary"
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
    <div className="min-h-screen bg-main-gradient relative overflow-x-hidden">
      {/* Organic flowing background overlay */}
      <div className="fixed inset-0 organic-bg pointer-events-none" />
      
      <FloatingParticles />
      <AnimatedGrid />
      <ScrollIndicator />
      
      {/* Enhanced cursor follower */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference border-2 border-accent"
        style={{ backgroundColor: 'rgba(79, 70, 229, 0.2)' }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Enhanced Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-40 glass-card"
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
                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary-gradient shadow-glow-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <BarChart3 className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold text-primary-text">DataWhiz</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Features', 'About', 'Pricing', 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                  className="text-secondary-text hover:text-primary-text transition-colors relative group border-animate"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-gradient group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
              ))}
              <motion.button 
                className="px-6 py-2 rounded-xl font-semibold bg-primary-gradient text-white hover:shadow-glow-primary transition-all duration-300 hover-lift"
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

      {/* Enhanced Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <motion.div 
          className="absolute inset-0 bg-mesh-gradient rounded-full blur-3xl"
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
                className="text-6xl md:text-8xl font-bold mb-6 text-primary-text"
                style={{ y: y1 }}
              >
                Transform Your
                <motion.span 
                  className="text-gradient-primary block"
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
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-secondary-text"
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
                className="px-8 py-4 rounded-2xl font-semibold text-lg bg-primary-gradient text-white shadow-glow-primary transition-all duration-300 flex items-center space-x-2 group hover-lift"
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
                className="px-8 py-4 glass-card rounded-2xl font-semibold text-lg text-primary-text hover:bg-white/20 transition-all duration-300 group hover-lift"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="group-hover:mr-2 transition-all">Learn More</span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="inline-block text-accent"
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Enhanced animated scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-8 w-8 text-accent animate-pulse" />
            </motion.div>
          </motion.div>
          
          {/* Enhanced Animated Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: "10M+", label: "Datasets Analyzed", icon: Database, color: "bg-primary-gradient" },
              { number: "99.9%", label: "Uptime", icon: Clock, color: "bg-accent-gradient" },
              { number: "50K+", label: "Happy Users", icon: Users, color: "bg-primary-gradient" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group hover-lift"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 ${stat.color} rounded-2xl flex items-center justify-center shadow-glow-primary`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold mb-2 text-primary-text"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 1, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-secondary-text group-hover:text-accent transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <motion.div 
          className="absolute inset-0 bg-mesh-gradient rounded-full blur-3xl"
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
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 glass-card"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-secondary-text">Powerful Features</span>
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-6 text-primary-text">
              Everything You Need
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-secondary-text">
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
                color: "bg-primary-gradient",
                delay: 0
              },
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description: "Machine learning algorithms automatically identify patterns, anomalies, and insights in your data.",
                color: "bg-accent-gradient",
                delay: 0.1
              },
              {
                icon: BarChart3,
                title: "Interactive Dashboards",
                description: "Create stunning visualizations and dashboards with our drag-and-drop interface.",
                color: "bg-primary-gradient",
                delay: 0.2
              },
              {
                icon: Zap,
                title: "Real-time Processing",
                description: "Process millions of rows in seconds with our optimized data processing engine.",
                color: "bg-accent-gradient",
                delay: 0.3
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and security protocols to keep your data safe and compliant.",
                color: "bg-primary-gradient",
                delay: 0.4
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share insights, collaborate on projects, and work together seamlessly across teams.",
                color: "bg-accent-gradient",
                delay: 0.5
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group cursor-pointer hover-lift"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: feature.color }}
                />
                
                <div className="relative glass-card rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-white/20">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color} shadow-glow-primary`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-primary-text group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-text leading-relaxed group-hover:text-primary-text transition-colors">
                    {feature.description}
                  </p>
                  
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 px-6 glass-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 glass-card"
                whileHover={{ scale: 1.05 }}
              >
                <Award className="h-5 w-5 text-accent" />
                <span className="text-secondary-text">About DataWhiz</span>
              </motion.div>
              
              <h2 className="text-5xl font-bold mb-8 text-primary-text">
                Revolutionizing
                <motion.span 
                  className="block text-gradient-accent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Data Analytics
                </motion.span>
              </h2>
              
              <motion.p 
                className="text-xl mb-6 leading-relaxed text-secondary-text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Founded in 2020, DataWhiz has revolutionized how businesses approach data analysis. 
                Our mission is to democratize data science and make advanced analytics accessible to everyone.
              </motion.p>
              
              <motion.p 
                className="text-lg mb-8 leading-relaxed text-secondary-text"
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
                      <CheckCircle className="h-6 w-6 text-accent" />
                    </motion.div>
                    <span className="text-secondary-text group-hover:text-primary-text transition-colors">{item}</span>
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
                className="absolute inset-0 rounded-3xl blur-2xl bg-mesh-gradient"
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
              
              <div className="relative glass-card rounded-3xl p-8">
                <motion.div 
                  className="grid grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: TrendingUp, value: "500%", label: "Faster Analysis", color: "text-accent" },
                    { icon: Database, value: "10TB+", label: "Data Processed", color: "text-accent" },
                    { icon: Activity, value: "99.9%", label: "Accuracy Rate", color: "text-accent" },
                    { icon: Users, value: "24/7", label: "Support", color: "text-accent" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      className="text-center group cursor-pointer hover-lift"
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                      </motion.div>
                      <motion.div 
                        className="text-3xl font-bold mb-2 text-primary-text"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-secondary-text group-hover:text-primary-text transition-colors">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-20 px-6 relative">
        <motion.div 
          className="absolute inset-0 bg-mesh-gradient rounded-full blur-3xl"
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
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 glass-card"
              whileHover={{ scale: 1.05 }}
            >
              <Target className="h-5 w-5 text-accent" />
              <span className="text-secondary-text">Simple Pricing</span>
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-6 text-primary-text">Choose Your Plan</h2>
            <p className="text-xl max-w-3xl mx-auto text-secondary-text">
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
                color: "bg-primary-gradient",
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
                color: "bg-accent-gradient",
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
                color: "bg-primary-gradient",
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative group hover-lift ${plan.popular ? 'scale-105' : ''}`}
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
                    <div className="px-4 py-1 rounded-full text-sm font-semibold bg-accent-gradient text-white shadow-glow-accent">
                      Most Popular
                    </div>
                  </motion.div>
                )}
                
                <motion.div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: plan.color }}
                />
                
                <div className="relative glass-card rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-white/20">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto ${plan.color} shadow-glow-primary`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Star className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-center mb-2 text-primary-text">{plan.name}</h3>
                  
                  <div className="text-center mb-6">
                    <motion.span 
                      className="text-4xl font-bold text-primary-text"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      {plan.price}
                    </motion.span>
                    <span className="text-secondary-text">{plan.period}</span>
                  </div>
                  
                  <p className="text-center mb-8 text-secondary-text">{plan.description}</p>
                  
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
                          <CheckCircle className="h-5 w-5 text-accent" />
                        </motion.div>
                        <span className="text-secondary-text">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.button 
                    className={`w-full px-6 py-3 rounded-2xl font-semibold ${plan.color} text-white shadow-glow-primary transition-all duration-300 group hover-lift`}
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

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-6 glass-card">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 glass-card"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="h-5 w-5 text-accent" />
              <span className="text-secondary-text">Get In Touch</span>
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-6 text-primary-text">Contact Us</h2>
            <p className="text-xl max-w-3xl mx-auto text-secondary-text">
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
                  { icon: Mail, title: "Email", info: "hello@datawhiz.com", color: "bg-primary-gradient" },
                  { icon: Phone, title: "Phone", info: "+1 (555) 123-4567", color: "bg-accent-gradient" },
                  { icon: MapPin, title: "Office", info: "123 Data Street, Analytics City, AC 12345", color: "bg-primary-gradient" }
                ].map((contact, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-4 group cursor-pointer hover-lift"
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${contact.color} shadow-glow-primary`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-text group-hover:text-accent transition-colors">{contact.title}</h3>
                      <p className="text-secondary-text group-hover:text-primary-text transition-colors">{contact.info}</p>
                    </div>
                  </motion.div>
                ))}

                <motion.div 
                  className="pt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4 text-primary-text">Follow Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: Twitter, color: "hover:bg-primary-btn" },
                      { icon: Linkedin, color: "hover:bg-secondary-btn" },
                      { icon: Github, color: "hover:bg-gray-600" }
                    ].map((social, index) => (
                      <motion.button 
                        key={index}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center glass-card transition-all duration-300 ${social.color} hover-lift`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <social.icon className="h-6 w-6 text-primary-text" />
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
                className="glass-card rounded-3xl p-8 hover-lift"
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
                      <label className="block font-medium mb-2 text-primary-text">First Name</label>
                      <motion.input 
                        type="text" 
                        className="w-full px-4 py-3 glass-card rounded-xl transition-all focus:ring-2 focus:ring-primary-btn focus:border-primary-btn text-primary-text placeholder-secondary-text"
                        placeholder="John"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2 text-primary-text">Last Name</label>
                      <motion.input 
                        type="text" 
                        className="w-full px-4 py-3 glass-card rounded-xl transition-all focus:ring-2 focus:ring-primary-btn focus:border-primary-btn text-primary-text placeholder-secondary-text"
                        placeholder="Doe"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block font-medium mb-2 text-primary-text">Email</label>
                    <motion.input 
                      type="email" 
                      className="w-full px-4 py-3 glass-card rounded-xl transition-all focus:ring-2 focus:ring-primary-btn focus:border-primary-btn text-primary-text placeholder-secondary-text"
                      placeholder="john@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block font-medium mb-2 text-primary-text">Message</label>
                    <motion.textarea 
                      rows={4}
                      className="w-full px-4 py-3 glass-card rounded-xl transition-all focus:ring-2 focus:ring-primary-btn focus:border-primary-btn resize-none text-primary-text placeholder-secondary-text"
                      placeholder="Tell us about your project..."
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.button 
                    type="submit"
                    variants={itemVariants}
                    className="w-full px-6 py-3 rounded-xl font-semibold bg-primary-gradient text-white shadow-glow-primary transition-all duration-300 flex items-center justify-center space-x-2 group hover-lift"
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

      {/* Enhanced Footer */}
      <motion.footer 
        className="py-12 px-6 border-t border-card-border"
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary-gradient shadow-glow-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <BarChart3 className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold text-primary-text">DataWhiz</span>
              </motion.div>
              <p className="mb-4 text-secondary-text">
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
                <h4 className="font-semibold mb-4 text-primary-text">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex}>
                      <motion.a 
                        href="#" 
                        className="text-secondary-text hover:text-accent transition-colors"
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
            className="border-t border-card-border mt-8 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-secondary-text">
              © 2024 DataWhiz. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;