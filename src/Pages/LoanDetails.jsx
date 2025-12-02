import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Share2,
  Home,
  Building,
  GraduationCap,
  Briefcase,
  Settings,
  User,
  FileSearch,
  BarChart,
  FileCheck,
  Phone,
  FileText,
  CheckCircle,
  ArrowLeft,
  Building2,
  School,
  Factory,
  Stethoscope,
  Calculator,
  MapPin,
  Landmark,
  Banknote,
  TrendingUp,
  Clock,
  Percent,
  Shield,
  Users,
  Zap,
  Star,
  Award,
  ChevronRight
} from 'lucide-react';
import jsPDF from 'jspdf';
import loanDetails from '../data/loanDetails.json';

// Preload images function
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
};

function LoanDetails() {
  const { loanId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [applicantType, setApplicantType] = useState('salaried');
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const service = loanDetails[loanId];
  const pageRef = useRef();

  // Optimized image mapping with smaller, optimized images
  const imageMap = useMemo(() => ({
    // FLAT PURCHASE - Optimized with lower q parameter
    'flat-purchase': "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'flat': "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'apartment': "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // HOUSE PURCHASE
    'house-purchase': "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'house': "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // CONSTRUCTION LOAN
    'construction-loan': "https://homefirstindia.com/app/uploads/2020/09/construction-2.jpg",
    'construction': "https://homefirstindia.com/app/uploads/2020/09/construction-2.jpg",
    
    // PLOT PURCHASE
    'plot-purchase': "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'land': "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // RENOVATION LOAN
    'renovation': "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'renovation-loan': "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // EDUCATION
    'education': "https://www.i2ifunding.com/assets/bank-education-loan.jpg",
    'education-loan': "https://www.i2ifunding.com/assets/bank-education-loan.jpg",
    
    // BUSINESS
    'business': "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'business-loan': "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // MEDICAL
    'doctor': "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'medical': "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // EQUIPMENT
    'machine': "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'equipment': "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // LOAN AGAINST PROPERTY
    'loan-against-property': "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'lap': "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // MORTGAGE
    'mortgage': "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'registration': "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // PERSONAL LOAN
    'personal': "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    'personal-loan': "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // SERVICES
    'service': "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70",
    
    // DEFAULT
    'default': "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70"
  }), []);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get loan image with memoization
  const loanImage = useMemo(() => {
    if (!service) return '';
    
    const serviceId = service.id.toLowerCase();
    const serviceName = service.name.toLowerCase();

    // Try to match by service ID first
    for (const [key, image] of Object.entries(imageMap)) {
      if (serviceId.includes(key)) return image;
    }

    // Then try by service name
    for (const [key, image] of Object.entries(imageMap)) {
      if (serviceName.includes(key)) return image;
    }

    // Fallback based on category
    if (service.category === 'loan') return imageMap['default'];
    if (service.category === 'mortgage') return imageMap['mortgage'];
    if (service.category === 'service') return imageMap['service'];

    return imageMap['default'];
  }, [service, imageMap]);

  // Preload image on component mount
  useEffect(() => {
    if (loanImage) {
      preloadImage(loanImage)
        .then(() => setImageLoaded(true))
        .catch(() => setImageLoaded(true)); // Even if error, mark as loaded to show fallback
    }
  }, [loanImage]);

  const getIconComponent = useCallback((iconName) => {
    const iconComponents = {
      Home, Building, GraduationCap, Briefcase, Settings, User,
      FileSearch, BarChart, FileCheck, Building2, School,
      Factory, Stethoscope, Calculator, MapPin, Landmark,
      Banknote, TrendingUp, Clock, Percent, Shield, Users, Zap
    };
    return iconComponents[iconName] || FileText;
  }, []);

  const IconComponent = service ? getIconComponent(service.icon) : FileText;

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4 sm:p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <FileSearch className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The requested service could not be found.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Optimized Share function
  const handleShare = useCallback(async () => {
    const shareData = {
      title: `${service.name} - Tirupati Agencies`,
      text: `Check out ${service.name} from Tirupati Agencies`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  }, [service]);

  const fallbackShare = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(() => {
          prompt('Copy this link:', window.location.href);
        });
    } else {
      prompt('Copy this link:', window.location.href);
    }
  };

  // Optimized PDF Generation
  const handleDownloadPDF = useCallback(async () => {
    setPdfLoading(true);
    
    // Use requestIdleCallback for non-blocking PDF generation
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        generatePDF();
        setPdfLoading(false);
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        generatePDF();
        setPdfLoading(false);
      }, 0);
    }
  }, [service]);

  const generatePDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    let y = 60;

    // Header with gradient background
    doc.setFillColor(249, 115, 22, 0.1);
    doc.rect(0, 0, doc.internal.pageSize.width, 80, 'F');

    // Company name
    doc.setFontSize(18);
    doc.setTextColor(249, 115, 22);
    doc.setFont('helvetica', 'bold');
    doc.text('Tirupati Agencies', margin, 40);

    // Tagline
    doc.setFontSize(10);
    doc.setTextColor(99, 102, 106);
    doc.setFont('helvetica', 'normal');
    doc.text('Trusted Financial & Property Services', margin, 56);
    y = 100;

    // Service title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(33, 37, 41);
    doc.text(service.name, margin, y);
    y += 20;

    // Marathi name if exists
    if (service.marathiName) {
      doc.setFontSize(10);
      doc.setTextColor(99, 102, 106);
      doc.text(service.marathiName, margin, y);
      y += 30;
    }

    // Description
    doc.setFontSize(11);
    doc.setTextColor(66, 66, 66);
    const descriptionLines = doc.splitTextToSize(service.description, 500);
    doc.text(descriptionLines, margin, y);
    y += descriptionLines.length * 15 + 20;

    // Key details section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(33, 37, 41);
    doc.text('Key Details:', margin, y);
    y += 20;

    // Add key details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`• Category: ${service.category}`, margin + 10, y);
    y += 15;
    
    if (service.maxAmount) {
      doc.text(`• Maximum Amount: ${service.maxAmount}`, margin + 10, y);
      y += 15;
    }
    
    if (service.tenure) {
      doc.text(`• Tenure: ${service.tenure}`, margin + 10, y);
      y += 15;
    }
    
    if (service.interest) {
      doc.text(`• Interest Rate: ${service.interest}`, margin + 10, y);
      y += 15;
    }

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated from Tirupati Agencies - ${new Date().toLocaleDateString()}`, margin, pageHeight - 30);

    const filenameSafe = service.name.replace(/\s+/g, '_').toLowerCase();
    doc.save(`${filenameSafe}_tirupati_agencies.pdf`);
  };

  // Memoized renderDocuments function
  const renderDocuments = useMemo(() => {
    if (!service) return null;

    if (service.category === 'service') {
      return (
        <div className="space-y-3">
          {service.documents?.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 transition-all">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <span className="text-sm sm:text-base text-gray-700 font-medium">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    const documents = selectedSubtype ? selectedSubtype.documents : service.documents;

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Basic KYC Documents */}
        {documents?.basicKyc && (
          <div className="bg-gradient-to-br from-orange-50/50 to-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-orange-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Basic KYC Documents</h3>
                <p className="text-xs sm:text-sm text-gray-500">सर्वसाधारण कागदपत्रे</p>
              </div>
            </div>
            <div className="grid gap-2">
              {documents.basicKyc.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Income Documents */}
        {documents?.[applicantType] && (
          <div className="bg-gradient-to-br from-blue-50/50 to-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {applicantType === 'salaried' ? 'Income Documents' : 'Business Documents'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {applicantType === 'salaried' ? 'उत्पन्नाचे कागदपत्रे' : 'व्यवसाय कागदपत्रे'}
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              {documents[applicantType].map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Property/Other Documents */}
        {documents?.property && (
          <div className="bg-gradient-to-br from-green-50/50 to-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                <Building className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {service.category === 'loan' ? 'Property Documents' : 'Additional Documents'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {service.category === 'loan' ? 'मालमत्तेचे कागदपत्रे' : 'अतिरिक्त कागदपत्रे'}
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              {documents.property.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }, [service, applicantType, selectedSubtype]);

  // Memoized quick stats
  const quickStats = useMemo(() => [
    { 
      title: "Amount", 
      value: service.maxAmount || 'Custom', 
      icon: Banknote,
      color: "from-orange-500 to-amber-500"
    },
    { 
      title: "Interest", 
      value: service.interest || 'From 8.5%', 
      icon: Percent,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Tenure", 
      value: service.tenure || 'Flexible', 
      icon: Clock,
      color: "from-green-500 to-emerald-500"
    },
    { 
      title: "Processing", 
      value: service.duration || 'Quick', 
      icon: Zap,
      color: "from-purple-500 to-pink-500"
    }
  ], [service]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with optimized image loading */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 overflow-hidden">
        {/* Gradient fallback while image loads */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 transition-opacity duration-500 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Optimized image with lazy loading */}
        <img
          src={loanImage}
          alt={service.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} // Fallback to gradient
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 leading-tight">{service.name}</h1>
                <p className="text-sm sm:text-base md:text-lg text-orange-100 opacity-90">{service.marathiName}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                service.category === 'loan' 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
                  : service.category === 'mortgage'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              }`}>
                {service.category === 'loan' ? 'Loan Product' : service.category === 'mortgage' ? 'Mortgage Service' : 'Professional Service'}
              </span>
              
              <div className="flex items-center gap-1 sm:gap-2 text-white/80">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">Available Across Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition sm:top-6 sm:left-6 sm:px-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm">Back</span>
        </button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2 sm:top-6 sm:right-6 sm:gap-3">
          <button
            onClick={handleShare}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
            title="Share"
            aria-label="Share this service"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg transition ${
              pdfLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Download PDF"
            aria-label="Download PDF document"
          >
            {pdfLoading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Quick Stats Card - Mobile Optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white shadow-lg`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs sm:text-sm font-medium">{stat.title}</span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold">{stat.value}</div>
                  </div>
                );
              })}
            </div>

            {/* Overview Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Service Overview</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Complete details & information</p>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">{service.description}</p>

              {/* Key Benefits in Grid */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {service.benefits.slice(0, 4).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg sm:rounded-xl border border-gray-100">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Subtypes Section */}
            {service.subtypes && service.subtypes.length > 0 && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Available Options</h3>
                  <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                    {service.subtypes.length} options
                  </span>
                </div>
                <div className="grid gap-3 sm:gap-4">
                  {service.subtypes.map((subtype, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedSubtype(selectedSubtype?.id === subtype.id ? null : subtype)}
                      className={`p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedSubtype?.id === subtype.id
                          ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 shadow-sm'
                          : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            selectedSubtype?.id === subtype.id
                              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                              : 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base">{subtype.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-500">{subtype.marathiName}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${
                          selectedSubtype?.id === subtype.id ? 'rotate-90' : ''
                        }`} />
                      </div>
                      
                      {selectedSubtype?.id === subtype.id && subtype.description && (
                        <div className="mt-3 sm:mt-4 pl-11 sm:pl-14">
                          <div className="p-3 sm:p-4 bg-white rounded-lg border border-orange-100">
                            <p className="text-xs sm:text-sm text-gray-700">{subtype.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Required Documents</h3>
                    <p className="text-xs sm:text-sm text-gray-500">कागदपत्रांची यादी</p>
                  </div>
                </div>

                {service.category === 'loan' && (
                  <div className="flex gap-2 bg-gradient-to-r from-gray-50 to-white p-1 rounded-xl border border-gray-200 self-start sm:self-auto">
                    <button
                      onClick={() => setApplicantType('salaried')}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                        applicantType === 'salaried'
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Salaried
                    </button>
                    <button
                      onClick={() => setApplicantType('business')}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                        applicantType === 'business'
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Business
                    </button>
                  </div>
                )}
              </div>

              {renderDocuments}
            </div>

            {/* Process Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Process Flow</h3>
                  <p className="text-xs sm:text-sm text-gray-500">आमची प्रक्रिया</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {service.process?.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center text-sm sm:text-lg font-bold">
                        {idx + 1}
                      </div>
                      {idx < service.process.length - 1 && (
                        <div className="h-6 sm:h-8 w-0.5 bg-gradient-to-b from-orange-200 to-amber-200 mx-auto"></div>
                      )}
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 sm:p-4 border border-gray-100 flex-1">
                      <p className="text-xs sm:text-sm md:text-base text-gray-800">{step}</p>
                    </div>
                  </div>
                ))}

                {!service.process && (
                  <div className="text-center py-6 sm:py-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mb-3 sm:mb-4">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    </div>
                    <p className="text-sm sm:text-base text-gray-500">Process details will be provided upon application</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Quick Action Card */}
            {isMobile ? (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-50">
                <div className="flex gap-2">
                  <a 
                    href="tel:9850366753"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-3 rounded-lg font-bold text-sm"
                  >
                    Call Now
                  </a>
                  <Link 
                    to="/apply" 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-3 rounded-lg font-bold text-sm"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-5 sm:p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-3 sm:mb-4">Ready to Apply?</h3>
                <p className="text-orange-100 text-sm sm:text-base mb-4 sm:mb-6">Our experts are ready to guide you through the process.</p>
                
                <div className="space-y-3">
                  <Link 
                    to="/apply" 
                    className="block w-full bg-white text-orange-600 text-center py-3 rounded-xl font-bold hover:bg-orange-50 transition text-sm sm:text-base"
                  >
                    Apply Now
                  </Link>
                  
                  <a 
                    href="tel:9850366753"
                    className="block w-full bg-white/20 backdrop-blur-sm text-white text-center py-3 rounded-xl font-bold hover:bg-white/30 transition border border-white/30 text-sm sm:text-base"
                  >
                    <Phone className="inline-block w-4 h-4 mr-2" />
                    Call: 9850366753
                  </a>
                  
                  <button
                    onClick={handleDownloadPDF}
                    disabled={pdfLoading}
                    className={`block w-full bg-white/10 backdrop-blur-sm text-white text-center py-3 rounded-xl font-bold hover:bg-white/20 transition border border-white/20 text-sm sm:text-base ${
                      pdfLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Download className="inline-block w-4 h-4 mr-2" />
                    {pdfLoading ? 'Generating...' : 'Download PDF'}
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <CheckCircle className="w-4 h-4 text-orange-100" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-orange-100" />
                    <span>No Hidden Charges</span>
                  </div>
                </div>
              </div>
            )}

            {/* Service Info Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-4">Service Details</h4>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">Service Category</div>
                    <div className="font-medium text-gray-900 capitalize">{service.category}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">Service ID</div>
                    <div className="font-medium text-gray-900 text-sm sm:text-base">{service.id}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs sm:text-sm text-gray-500 mb-2">Available For</div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">Salaried</span>
                    <span className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Business</span>
                    <span className="px-2 sm:px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">Professionals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg sm:text-xl">Why Choose Us?</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm sm:text-base">Trusted Partner</div>
                    <div className="text-xs sm:text-sm text-gray-500">10+ years in financial services</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm sm:text-base">Quick Processing</div>
                    <div className="text-xs sm:text-sm text-gray-500">Fast approvals & minimal docs</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm sm:text-base">Expert Support</div>
                    <div className="text-xs sm:text-sm text-gray-500">Dedicated relationship manager</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-3">Share This Service</h4>
              <p className="text-gray-600 text-sm mb-4">Help others find this financial solution</p>
              
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition text-sm sm:text-base"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Share with Friends & Family
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Padding for fixed action bar */}
        {isMobile && <div className="h-16"></div>}
      </div>
    </div>
  );
}

export default LoanDetails;