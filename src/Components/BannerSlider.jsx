// Components/BannerSlider.jsx
import React, { useState, useEffect } from 'react';
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
  FileText
} from 'lucide-react';

const BannerSlider = ({ services = [], autoChangeInterval = 15000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Three professional services with proper images
  const defaultServices = [
    {
      id: 1,
      title: "Loan Services",
      description: "Comprehensive loan solutions including personal, business, and education loans with competitive rates and flexible terms.",
      icon: Home,
      features: ["Low Interest Rates", "Quick Approval", "Flexible Tenure", "Minimal Documentation"],
   
      ctaText: "Apply Now",
      color: "bg-gradient-to-r from-blue-600 to-indigo-600",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 2,
      title: "Mortgage Services",
      description: "Expert mortgage registration, documentation, and property verification services with 100% success rate.",
      icon: Building,
      features: ["Property Verification", "Legal Support", "Fast Processing", "Expert Guidance"],
    
      ctaText: "Get Started",
      color: "bg-gradient-to-r from-green-600 to-teal-600",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 3,
      title: "Other Services",
      description: "Complete financial solutions including insurance, investment planning, credit cards, and wealth management.",
      icon: FileText,
      features: ["Insurance Plans", "Investment Advice", "Credit Cards", "Wealth Management"],
    
      ctaText: "Explore Services",
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    }
  ];

  const enhancedServices = services.length > 0 ? services : defaultServices;

  // Reset image loaded state when slide changes
  useEffect(() => {
    setImgLoaded(false);
    
    // Preload all images on component mount
    enhancedServices.forEach(service => {
      if (service.imageUrl) {
        const img = new Image();
        img.src = service.imageUrl;
        img.onload = () => {
          if (service.id === enhancedServices[currentSlide].id) {
            setImgLoaded(true);
          }
        };
      }
    });
  }, [currentSlide, enhancedServices]);

  // Auto slide change with progress bar
  useEffect(() => {
    if (enhancedServices.length === 0 || isHovering) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % enhancedServices.length);
      setProgress(0);
    }, autoChangeInterval);

    // Update progress bar
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed % autoChangeInterval) / autoChangeInterval * 100;
      setProgress(newProgress);
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [enhancedServices.length, autoChangeInterval, isHovering, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % enhancedServices.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + enhancedServices.length) % enhancedServices.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const currentService = enhancedServices[currentSlide];
  const Icon = currentService.icon;

  // Handle image error
  const handleImageError = (e) => {
    console.warn(`Image failed to load: ${currentService.imageUrl}`);
    // Don't hide the image, just set loaded to true to show gradient fallback
    setImgLoaded(true);
  };

  const handleImageLoad = () => {
    setImgLoaded(true);
  };

  // Mobile responsive breakpoints
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        {/* Gradient fallback - always visible but behind image */}
        <div 
          className={`absolute inset-0 ${currentService.color} transition-opacity duration-500`}
        />
        
        {/* Main Image */}
        <img
          src={currentService.imageUrl}
          alt={currentService.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* Loading indicator */}
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Content - Responsive Layout */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left Content - Main Info */}
              <div className="text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-white/20">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-semibold">Premium Service</span>
                </div>

                {/* Title & Description */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
                    {currentService.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 max-w-2xl leading-relaxed">
                    {currentService.description}
                  </p>
                </div>

                {/* Stats Row - Responsive */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 max-w-md">
                  {currentService.stats?.map((stat, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/20">
                      <div className="text-xs sm:text-sm text-white/70 mb-1">{stat.label}</div>
                      <div className="text-base sm:text-lg font-bold text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Features List - Stack on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-xl">
                  {currentService.features?.slice(0, isMobile ? 2 : 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm text-white/95">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA buttons removed intentionally (design: image-first banner) */}
              </div>

              {/* Right Content - Why Choose Us (Hidden on mobile, shown on desktop) */}
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 max-w-md ml-auto">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Why Choose Us?</h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { icon: Shield, title: "Trusted Partner", desc: "10+ years in financial services" },
                      { icon: Clock, title: "Quick Processing", desc: "Fast approvals & minimal docs" },
                      { icon: Users, title: "Expert Support", desc: "Dedicated relationship manager" },
                      { icon: Percent, title: "Best Rates", desc: "Lowest interest rates" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                          <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base sm:text-lg mb-0.5 sm:mb-1">{item.title}</h4>
                          <p className="text-white/80 text-xs sm:text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls - Responsive */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4">
        <button
          onClick={prevSlide}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm hover:scale-110 border border-white/30 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Slide Dots - Responsive */}
        <div className="flex gap-2 sm:gap-3">
          {enhancedServices.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`w-8 h-1.5 sm:w-10 md:w-12 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}>
                {index === currentSlide && (
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
              {/* Slide number tooltip on hover (desktop only) */}
              {!isMobile && (
                <div className={`absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium transition-all whitespace-nowrap ${
                  index === currentSlide 
                    ? 'text-white opacity-100' 
                    : 'text-white/50 opacity-0 group-hover:opacity-100'
                }`}>
                  {index + 1}
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm hover:scale-110 border border-white/30 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Slide Counter - Responsive */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
        <div className="bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 border border-white/30">
          <div className="text-white text-xs sm:text-sm font-semibold">
            <span className="text-lg sm:text-xl md:text-2xl">{currentSlide + 1}</span>
            <span className="text-white/70">/{enhancedServices.length}</span>
          </div>
        </div>
      </div>

      {/* Auto-play Indicator - Responsive */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isHovering ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
            <span className="text-[10px] sm:text-xs text-white font-medium">
              {isHovering ? 'Paused' : 'Auto'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;