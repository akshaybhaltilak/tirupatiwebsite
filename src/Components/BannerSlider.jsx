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
      { id: 1, title: "Application", icon: FileText, color: "from-blue-500 to-cyan-500", duration: "1 Day" },
      { id: 2, title: "CIBIL Check", icon: CreditCard, color: "from-purple-500 to-pink-500", duration: "1 Day" },
      { id: 3, title: "Income Check", icon: TrendingUp, color: "from-green-500 to-emerald-500", duration: "2 Days" },
      { id: 4, title: "Valuation", icon: Calculator, color: "from-amber-500 to-orange-500", duration: "2 Days" },
      { id: 5, title: "Inspection", icon: Eye, color: "from-red-500 to-pink-500", duration: "1 Day" },
      { id: 6, title: "Sanction", icon: Award, color: "from-indigo-500 to-blue-500", duration: "1 Day" },
      { id: 7, title: "Mortgage", icon: FileCheck, color: "from-teal-500 to-green-500", duration: "2 Days" },
      { id: 8, title: "Disbursement", icon: ArrowRightCircle, color: "from-cyan-500 to-blue-500", duration: "1 Day" },
    ],
    mortgage: [], // No process steps for mortgage
    other: [
      { id: 1, title: "Consultation", icon: Phone, color: "from-blue-500 to-cyan-500", duration: "1 Day" },
      { id: 2, title: "Analysis", icon: PieChart, color: "from-purple-500 to-pink-500", duration: "2 Days" },
      { id: 3, title: "Solution", icon: Target, color: "from-green-500 to-emerald-500", duration: "2 Days" },
      { id: 4, title: "Processing", icon: BarChart, color: "from-amber-500 to-orange-500", duration: "3 Days" },
      { id: 5, title: "Approval", icon: CheckCircle, color: "from-indigo-500 to-blue-500", duration: "1 Day" },
      { id: 6, title: "Support", icon: Users, color: "from-teal-500 to-green-500", duration: "Ongoing" },
      { id: 7, title: "Implementation", icon: UserCheck, color: "from-blue-500 to-indigo-500", duration: "2 Days" },
      { id: 8, title: "Review", icon: Search, color: "from-purple-500 to-pink-500", duration: "1 Day" }
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

  const defaultSlides = [
    {
      id: 'home-loan',
      title: 'Home Loans Made Simple',
      subtitle: 'Competitive rates, fast approvals',
      image:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1770&q=80',
      serviceLink: '/#services',
    },
    {
      id: 'business-loan',
      title: 'Business Loans For Growth',
      subtitle: 'Flexible terms for every stage',
      image:
        'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1770&q=80',
      serviceLink: '/#services',
    },
    {
      id: 'personal-loan',
      title: 'Personal Loans Fast',
      subtitle: 'Funds for emergencies and plans',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1770&q=80',
      serviceLink: '/#services',
    },
    {
      id: 'other',
      title: 'Financial Services & Advisory',
      subtitle: 'End-to-end support for complex needs',
      image:
        'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1770&q=80',
      serviceLink: '/#services',
      process: [
        'Consultation',
        'Eligibility Check',
        'Documentation',
        'Application Submission',
        'Approval',
        'Disbursement',
        'Implementation',
        'Review & Monitoring',
      ],
    },
  ];

  const currentService = enhancedServices[currentSlide] || enhancedServices[0];
  const currentProcessSteps = processSteps[currentService?.processType] || [];
  const displayedProcessSteps = currentProcessSteps.slice(0, 8);

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

  return (
    <div 
      className="relative w-full h-[55vh] md:h-[65vh] rounded-xl md:rounded-2xl overflow-hidden shadow-xl group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
        <img
          src={currentService.imageUrl}
          alt={currentService.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Main Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column - Service Info */}
              <div className="text-white">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs font-semibold">{currentService.badge}</span>
                  </div>
                  <div className="text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
                    {currentService.processType === 'loan' ? 'Loan' : currentService.processType === 'mortgage' ? 'Property' : 'Financial'} Service
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mb-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                    {currentService.title}
                  </h2>
                  <p className="text-sm md:text-base text-white/90 mb-3 max-w-lg leading-relaxed">
                    {currentService.description}
                  </p>
                  <p className="text-sm text-white/80 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {currentService.shortDescription}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 max-w-xs">
                  {currentService.stats?.map((stat, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="text-xs text-white/70 mb-1">{stat.label}</div>
                      <div className="text-base font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-2 max-w-md">
                    {currentService.features?.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-sm text-white/95">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                {/* <button 
                  onClick={handleApplyClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2"
                >
                  <span>{currentService.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button> */}
              </div>

              {/* Right Column - Conditional Content */}
              <div className="flex flex-col gap-4">
                {/* Show Process Steps only for loan and other services */}
                {currentService.showProcess && currentProcessSteps.length > 0 ? (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">8-Step Process</h3>
                          <p className="text-xs text-white/70">Complete loan journey</p>
                        </div>
                      </div>
                      <div className="text-xs text-white/60">
                        {currentProcessSteps.length} steps
                      </div>
                    </div>

                    {/* Process Steps - Grid Layout */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {displayedProcessSteps.map((step) => (
                        <div 
                          key={step.id}
                          className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-white/30 transition-all duration-200 group/step"
                        >
                          {/* Step Number */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-white/60">Step {step.id}</div>
                            <div className="text-[10px] text-white/50">{step.duration}</div>
                          </div>
                          
                          {/* Step Content */}
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center flex-shrink-0 group-hover/step:scale-110 transition-transform`}>
                              <step.icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-semibold text-white truncate">{step.title}</h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Process Timeline - Visual Connection */}
                    {!isMobile && (
                      <div className="mt-4 relative">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 -translate-y-1/2"></div>
                        <div className="flex justify-between relative z-10">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((stepNum) => (
                            <div key={stepNum} className="relative">
                              <div className={`w-2 h-2 rounded-full ${stepNum <= currentProcessSteps.length ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-white/20'}`}></div>
                              {stepNum % 2 === 0 && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/70">
                                  Step {stepNum}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Why Choose Us - For Mortgage Services */
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Why Choose Us</h3>
                        <p className="text-xs text-white/70">Trusted by thousands</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Shield, title: "10+ Years", desc: "Experience", color: "from-blue-500 to-cyan-500" },
                        { icon: Clock, title: "Fast", desc: "Processing", color: "from-green-500 to-emerald-500" },
                        { icon: Users, title: "Expert", desc: "Support", color: "from-purple-500 to-pink-500" },
                        { icon: Percent, title: "Best", desc: "Rates", color: "from-amber-500 to-orange-500" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-white/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm">{item.title}</div>
                              <div className="text-white/70 text-xs">{item.desc}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Additional Benefits */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {[
                        "100% Success Rate",
                        "Legal Expertise",
                        "Transparent Pricing",
                        "Dedicated Manager"
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-white/90">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Need Help?</div>
                      <a href="tel:9850366753" className="text-xs text-white/80 hover:text-white transition-colors">
                        Call: 98503 66753
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/30 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10">
        <button
          onClick={prevSlide}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Dots */}
        <div className="flex gap-2">
          {enhancedServices.map((service, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
              aria-label={`Go to ${service.title}`}
            >
              <div className={`w-10 h-1.5 rounded-full overflow-hidden ${
                index === currentSlide ? 'bg-white/40' : 'bg-white/20'
              }`}>
                {index === currentSlide && (
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity ${
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
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm ml-2"
          aria-label={autoPlay ? "Pause auto-play" : "Play auto-play"}
        >
          {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-lg rounded-lg px-3 py-2 border border-white/20">
        <div className="text-white font-semibold flex items-center gap-1">
          <span className="text-xl">{currentSlide + 1}</span>
          <span className="text-white/50">/</span>
          <span className="text-white/70">{enhancedServices.length}</span>
        </div>
      </div>

      {/* Service Type Badge */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 backdrop-blur-sm rounded-full px-3 py-1.5">
        <div className="flex items-center gap-2">
          <currentService.icon className="w-4 h-4 text-white" />
          <span className="text-xs font-semibold text-white capitalize">
            {currentService.processType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;