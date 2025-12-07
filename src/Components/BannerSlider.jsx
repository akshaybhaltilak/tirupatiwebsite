// Components/BannerSlider.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Shield, 
  Clock, 
  Users, 
  Target, 
  CheckCircle,
  Percent,
  Home,
  Building,
  FileText,
  CreditCard,
  TrendingUp,
  FileSearch,
  Eye,
  ArrowRightCircle,
  ArrowRight,
  FileCheck,
  Calculator,
  ClipboardCheck,
  Wallet,
  PieChart,
  BarChart,
  Phone,
  Play,
  Pause,
  UserCheck,
  Search,
  DollarSign,
  Award
} from 'lucide-react';

const BannerSlider = ({ services = [], autoChangeInterval = 8000 }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // Process Steps for different service types
  const processSteps = useMemo(() => ({
    loan: [
      { id: 1, title: "Application", icon: FileText, color: "from-blue-500 to-cyan-500", duration: "1D" },
      { id: 2, title: "CIBIL Check", icon: CreditCard, color: "from-purple-500 to-pink-500", duration: "1D" },
      { id: 3, title: "Income Check", icon: TrendingUp, color: "from-green-500 to-emerald-500", duration: "2D" },
      { id: 4, title: "Valuation", icon: Calculator, color: "from-amber-500 to-orange-500", duration: "2D" },
      { id: 5, title: "Inspection", icon: Eye, color: "from-red-500 to-pink-500", duration: "1D" },
      { id: 6, title: "Sanction", icon: Award, color: "from-indigo-500 to-blue-500", duration: "1D" },
      { id: 7, title: "Mortgage", icon: FileCheck, color: "from-teal-500 to-green-500", duration: "2D" },
      { id: 8, title: "Disbursement", icon: ArrowRightCircle, color: "from-cyan-500 to-blue-500", duration: "1D" },
    ],
    mortgage: [], // No process steps for mortgage
    other: [
      { id: 1, title: "Consultation", icon: Phone, color: "from-blue-500 to-cyan-500", duration: "1D" },
      { id: 2, title: "Analysis", icon: PieChart, color: "from-purple-500 to-pink-500", duration: "2D" },
      { id: 3, title: "Solution", icon: Target, color: "from-green-500 to-emerald-500", duration: "2D" },
      { id: 4, title: "Processing", icon: BarChart, color: "from-amber-500 to-orange-500", duration: "3D" },
      { id: 5, title: "Approval", icon: CheckCircle, color: "from-indigo-500 to-blue-500", duration: "1D" },
      { id: 6, title: "Support", icon: Users, color: "from-teal-500 to-green-500", duration: "Ongoing" },
      { id: 7, title: "Implementation", icon: UserCheck, color: "from-blue-500 to-indigo-500", duration: "2D" },
      { id: 8, title: "Review", icon: Search, color: "from-purple-500 to-pink-500", duration: "1D" }
    ]
  }), []);

  // Default services with enhanced details
  const defaultServices = [
    {
      id: 1,
      title: "Home Loan Services",
      description: "Get your dream home with competitive rates starting from 8.5% p.a. and flexible repayment options.",
      shortDescription: "Lowest interest rates with quick approval",
      icon: Home,
      features: [
        "Interest from 8.5%",
        "Quick approval",
        "30 years tenure",
        "Balance transfer",
        "Pre-approved offers"
      ],
      stats: [
        { label: "Success", value: "100%" },
        { label: "Time", value: "7 Days" },
        { label: "Cities", value: "50+" }
      ],
      processType: "loan",
      color: "from-blue-600 to-indigo-600",
      imageUrl: "https://res.cloudinary.com/dvtnm3d8k/image/upload/q_auto,f_auto/v1764731098/WhatsApp_Image_2025-12-02_at_17.48.02_pdvzrg.jpg",
      badge: "Popular",
      showProcess: true,
      serviceLink: "/#services"
    },
    {
      id: 2,
      title: "Mortgage Services",
      description: "Complete property documentation, registration, and legal verification services with expert assistance.",
      shortDescription: "End-to-end property documentation",
      icon: Building,
      features: [
        "Property verification",
        "Legal documentation",
        "Registration",
        "Title search",
        "Valuation services",
        "EMI calculation"
      ],
      stats: [
        { label: "Success", value: "100%" },
        { label: "Time", value: "15 Days" },
        { label: "Cities", value: "50+" }
      ],
      processType: "mortgage",
      color: "from-green-600 to-teal-600",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
      badge: "Expert",
      showProcess: false,
      serviceLink: "/#services"
    },
    {
      id: 3,
      title: "Financial Services",
      description: "Complete financial planning including insurance, investments, and wealth management solutions.",
      shortDescription: "One-stop financial solutions",
      icon: FileText,
      features: [
        "Life Insurance",
        "Health Insurance",
        "Investment Planning",
        "Wealth Management",
        "Tax Planning",
        "Retirement Plans"
      ],
      stats: [
        { label: "Services", value: "25+" },
        { label: "Clients", value: "10K+" },
        { label: "Cities", value: "100+" }
      ],
      processType: "other",
      color: "from-purple-600 to-pink-600",
      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
      badge: "Premium",
      showProcess: true,
      serviceLink: "/#services"
    }
  ];

  const enhancedServices = services.length > 0 ? services : defaultServices;

  // Check mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide with progress
  useEffect(() => {
    if (enhancedServices.length === 0 || !autoPlay || isHovering) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % enhancedServices.length);
      setProgress(0);
    }, autoChangeInterval);

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed % autoChangeInterval) / autoChangeInterval * 100;
      setProgress(newProgress);
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [enhancedServices.length, autoChangeInterval, isHovering, currentSlide, autoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % enhancedServices.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + enhancedServices.length) % enhancedServices.length);
    setProgress(0);
  };

  const goToSlide = (i) => {
    setCurrentSlide(i);
    setProgress(0);
  };

  const toggleAutoPlay = () => setAutoPlay((v) => !v);

  const handleApplyClick = () => {
    if (currentService?.serviceLink) {
      navigate(currentService.serviceLink);
      if (currentService.serviceLink.startsWith('/#')) {
        const id = currentService.serviceLink.replace('/#', '');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  };

  const currentService = enhancedServices[currentSlide] || enhancedServices[0];
  const currentProcessSteps = processSteps[currentService?.processType] || [];
  // Always show up to 8 steps so mobile and desktop display the same content
  const displayedProcessSteps = currentProcessSteps.slice(0, 8);

  return (
    <div 
      className="relative w-full h-[55vh] md:h-[65vh] rounded-xl md:rounded-2xl overflow-hidden shadow group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Image */}
      <img
        src={currentService.imageUrl}
        alt={currentService.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Main Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-3 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
              {/* Left Column - Service Info */}
              <div className="text-white">
                {/* Badge and Service Type */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span className="text-xs font-semibold">{currentService.badge}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full">
                    <currentService.icon className="w-2.5 h-2.5" />
                    <span className="text-xs capitalize">{currentService.processType}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mb-3">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 leading-tight">
                    {currentService.title}
                  </h2>
                  <p className="text-xs md:text-sm text-white/90 mb-2 max-w-lg leading-relaxed">
                    {currentService.description}
                  </p>
                  <p className="text-xs text-white/80">{currentService.shortDescription}</p>
                </div>

                {/* Stats - Compact */}
                <div className="flex gap-2 mb-3 max-w-xs">
                  {currentService.stats?.map((stat, idx) => (
                    <div key={idx} className="bg-white/5 rounded-md p-1.5 px-2.5">
                      <div className="text-[10px] text-white/70">{stat.label}</div>
                      <div className="text-xs font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Features - Compact Grid */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-1.5 max-w-md">
                    {currentService.features?.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-xs text-white/95 truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleApplyClick}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition-shadow text-xs md:text-sm"
                >
                  {currentService.ctaText || 'Apply Now'}
                </button>
              </div>

              {/* Right Column - Conditional Content */}
              <div className={`flex flex-col gap-3 ${isMobile ? 'mt-4' : ''}`}>
                {/* Show Process Steps for services that have process steps (desktop & mobile) */}
                {currentService.showProcess && currentProcessSteps.length > 0 ? (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center">
                          <Target className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">8-Step Process</h3>
                          <p className="text-xs text-white/70">Complete journey</p>
                        </div>
                      </div>
                      <div className="text-xs text-white/60">
                        {currentProcessSteps.length} steps
                      </div>
                    </div>

                    {/* Process Steps - Compact Grid (responsive) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {displayedProcessSteps.map((step) => (
                        <div 
                          key={step.id}
                          className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:border-white/30 transition-all duration-200 group/step"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-[10px] text-white/60">S{step.id}</div>
                            <div className="text-[9px] text-white/50">{step.duration}</div>
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <div className={`w-6 h-6 rounded-md bg-gradient-to-r ${step.color} flex items-center justify-center mb-1 group-hover/step:scale-110 transition-transform`}>
                              <step.icon className="w-3 h-3 text-white" />
                            </div>
                            <h4 className="text-[10px] font-semibold text-white truncate w-full">{step.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Why Choose Us - For Mortgage Services and Mobile View */
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center">
                        <Shield className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">Why Choose Us</h3>
                        <p className="text-xs text-white/70">Trusted by thousands</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: Shield, title: "10+ Years", desc: "Exp", color: "from-blue-500 to-cyan-500" },
                        { icon: Clock, title: "Fast", desc: "Process", color: "from-green-500 to-emerald-500" },
                        { icon: Users, title: "Expert", desc: "Support", color: "from-purple-500 to-pink-500" },
                        { icon: Percent, title: "Best", desc: "Rates", color: "from-amber-500 to-orange-500" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:border-white/30 transition-colors">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                              <item.icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs">{item.title}</div>
                              <div className="text-white/70 text-[10px]">{item.desc}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Additional Benefits - Compact */}
                    <div className="mt-3 grid grid-cols-2 gap-1.5">
                      {[
                        "100% Success",
                        "Legal Expert",
                        "Transparent",
                        "Dedicated"
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-xs text-white/90 truncate">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Mobile Optimized */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-lg px-3 py-1.5 rounded-full border border-white/10">
        <button
          onClick={prevSlide}
          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-3 h-3" />
        </button>

        {/* Slide Dots - Compact */}
        <div className="flex gap-1.5">
          {enhancedServices.map((service, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
              aria-label={`Go to ${service.title}`}
            >
              <div className={`w-8 h-1 rounded-full overflow-hidden ${
                index === currentSlide ? 'bg-white/40' : 'bg-white/20'
              }`}>
                {index === currentSlide && (
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap transition-opacity ${
                index === currentSlide 
                  ? 'text-white bg-black/40 opacity-100' 
                  : 'opacity-0 group-hover:opacity-100'
              }`}>
                {service.processType}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-3 h-3" />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all ml-1.5"
          aria-label={autoPlay ? "Pause auto-play" : "Play auto-play"}
        >
          {autoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>

      {/* Slide Counter - Compact */}
      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-lg rounded-lg px-2 py-1 border border-white/20">
        <div className="text-white font-semibold flex items-center gap-0.5 text-sm">
          <span>{currentSlide + 1}</span>
          <span className="text-white/50">/</span>
          <span className="text-white/70">{enhancedServices.length}</span>
        </div>
      </div>

      {/* Service Type Badge - Mobile Hidden */}
      {!isMobile && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 backdrop-blur-sm rounded-full px-2.5 py-1">
          <div className="flex items-center gap-1.5">
            <currentService.icon className="w-3 h-3 text-white" />
            <span className="text-xs font-semibold text-white capitalize">
              {currentService.processType}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerSlider;