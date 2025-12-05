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
  ChevronRight,
  Copy,
  FileDown
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
  const [shareLoading, setShareLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const service = loanDetails[loanId];
  const pageRef = useRef();

  // Optimized image mapping
  const imageMap = useMemo(() => ({
    'flat-purchase': "https://res.cloudinary.com/dvtnm3d8k/image/upload/q_auto,f_auto/v1764731098/WhatsApp_Image_2025-12-02_at_17.48.01_1_afuhwt.jpg",
    'flat': "https://res.cloudinary.com/dvtnm3d8k/image/upload/q_auto,f_auto/v1764731098/WhatsApp_Image_2025-12-02_at_17.48.01_1_afuhwt.jpg",
    'apartment': "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'house-purchase': "https://res.cloudinary.com/dvtnm3d8k/image/upload/q_auto,f_auto/v1764731098/WhatsApp_Image_2025-12-02_at_17.48.01_rbqnet.jpg",
    'house': "https://res.cloudinary.com/dvtnm3d8k/image/upload/q_auto,f_auto/v1764731098/WhatsApp_Image_2025-12-02_at_17.48.01_rbqnet.jpg",
    'construction-loan': "https://homefirstindia.com/app/uploads/2020/09/construction-2.jpg",
    'construction': "https://homefirstindia.com/app/uploads/2020/09/construction-2.jpg",
    'plot-purchase': "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'land': "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'renovation': "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'education': "https://www.i2ifunding.com/assets/bank-education-loan.jpg",
    'business': "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'doctor': "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'machine': "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'loan-against-property': "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'mortgage': "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'personal': "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'service': "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70",
    'default': "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=70"
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

    for (const [key, image] of Object.entries(imageMap)) {
      if (serviceId.includes(key)) return image;
    }

    for (const [key, image] of Object.entries(imageMap)) {
      if (serviceName.includes(key)) return image;
    }

    if (service.category === 'loan') return imageMap['default'];
    if (service.category === 'mortgage') return imageMap['mortgage'];
    if (service.category === 'service') return imageMap['service'];

    return imageMap['default'];
  }, [service, imageMap]);

  // Preload image
  useEffect(() => {
    if (loanImage) {
      preloadImage(loanImage)
        .then(() => setImageLoaded(true))
        .catch(() => setImageLoaded(true));
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

  // Get documents list for PDF/Sharing
  const getDocumentsList = useCallback(() => {
    if (!service) return '';
    
    let documents = [];
    
    if (service.category === 'service') {
      documents = service.documents || [];
    } else {
      const selectedDocuments = selectedSubtype ? selectedSubtype.documents : service.documents;
      
      if (selectedDocuments?.basicKyc) {
        documents = [...documents, ...selectedDocuments.basicKyc];
      }
      
      if (selectedDocuments?.[applicantType]) {
        documents = [...documents, ...selectedDocuments[applicantType]];
      }
      
      if (selectedDocuments?.property) {
        documents = [...documents, ...selectedDocuments.property];
      }
    }
    
    return documents;
  }, [service, applicantType, selectedSubtype]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mb-4">
            <FileSearch className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-3">Service Not Found</h1>
          <p className="text-gray-600 mb-6 text-sm">The requested service could not be found.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:shadow-lg transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Generate document list as text for sharing
  const generateDocumentListText = useCallback(() => {
    const documents = getDocumentsList();
    const applicantTypeText = applicantType === 'salaried' ? 'Salaried' : 'Business';
    
    let text = `📋 ${service.name} - Required Documents\n\n`;
    text += `Applicant Type: ${applicantTypeText}\n\n`;
    
    if (service.category === 'service') {
      text += "Documents Required:\n";
      documents.forEach((doc, index) => {
        text += `${index + 1}. ${doc}\n`;
      });
    } else {
      const selectedDocuments = selectedSubtype ? selectedSubtype.documents : service.documents;
      
      if (selectedDocuments?.basicKyc) {
        text += "📄 Basic KYC Documents:\n";
        selectedDocuments.basicKyc.forEach((doc, index) => {
          text += `   ${index + 1}. ${doc}\n`;
        });
        text += "\n";
      }
      
      if (selectedDocuments?.[applicantType]) {
        text += `💰 ${applicantTypeText} Documents:\n`;
        selectedDocuments[applicantType].forEach((doc, index) => {
          text += `   ${index + 1}. ${doc}\n`;
        });
        text += "\n";
      }
      
      if (selectedDocuments?.property) {
        text += "🏠 Property Documents:\n";
        selectedDocuments.property.forEach((doc, index) => {
          text += `   ${index + 1}. ${doc}\n`;
        });
      }
    }
    
    text += `\n---\n📞 Contact: 9850366753\n🏢 Tirupati Agencies`;
    
    return text;
  }, [service, applicantType, selectedSubtype, getDocumentsList]);

  // Share document list
  const handleShareDocuments = useCallback(async () => {
    setShareLoading(true);
    const shareText = generateDocumentListText();
    
    const shareData = {
      title: `${service.name} - Document Checklist`,
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          await navigator.clipboard.writeText(shareText);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    
    setShareLoading(false);
  }, [generateDocumentListText, service]);

  // Download PDF with document list
  const handleDownloadPDF = useCallback(async () => {
    setPdfLoading(true);
    
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        generatePDF();
        setPdfLoading(false);
      }, { timeout: 1000 });
    } else {
      setTimeout(() => {
        generatePDF();
        setPdfLoading(false);
      }, 0);
    }
  }, [service, applicantType, selectedSubtype]);

  const generatePDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    let y = 60;
    const pageWidth = doc.internal.pageSize.width;

    // Header
    doc.setFillColor(249, 115, 22, 0.1);
    doc.rect(0, 0, pageWidth, 60, 'F');
    
    doc.setFontSize(16);
    doc.setTextColor(249, 115, 22);
    doc.setFont('helvetica', 'bold');
    doc.text('Tirupati Agencies', margin, 35);
    
    doc.setFontSize(9);
    doc.setTextColor(99, 102, 106);
    doc.setFont('helvetica', 'normal');
    doc.text('Trusted Financial & Property Services', margin, 48);
    
    y = 80;

    // Service Title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(33, 37, 41);
    doc.text(service.name, margin, y);
    y += 15;

    if (service.marathiName) {
      doc.setFontSize(9);
      doc.setTextColor(99, 102, 106);
      doc.text(service.marathiName, margin, y);
      y += 20;
    }

    // Document Checklist Header
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(33, 37, 41);
    doc.text('📋 Document Checklist', margin, y);
    y += 20;

    // Applicant Type
    doc.setFontSize(10);
    doc.setTextColor(66, 66, 66);
    doc.text(`Applicant Type: ${applicantType === 'salaried' ? 'Salaried' : 'Business'}`, margin, y);
    y += 15;

    // Documents List
    const documents = getDocumentsList();
    
    if (service.category === 'service') {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Required Documents:', margin, y);
      y += 15;
      
      doc.setFont('helvetica', 'normal');
      documents.forEach((docItem, index) => {
        if (y > 700) {
          doc.addPage();
          y = 40;
        }
        doc.text(`${index + 1}. ${docItem}`, margin + 10, y);
        y += 12;
      });
    } else {
      const selectedDocuments = selectedSubtype ? selectedSubtype.documents : service.documents;
      
      if (selectedDocuments?.basicKyc) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Basic KYC Documents:', margin, y);
        y += 15;
        
        doc.setFont('helvetica', 'normal');
        selectedDocuments.basicKyc.forEach((docItem, index) => {
          if (y > 700) {
            doc.addPage();
            y = 40;
          }
          doc.text(`${index + 1}. ${docItem}`, margin + 10, y);
          y += 12;
        });
        y += 5;
      }
      
      if (selectedDocuments?.[applicantType]) {
        if (y > 700) {
          doc.addPage();
          y = 40;
        }
        doc.setFont('helvetica', 'bold');
        doc.text(`${applicantType === 'salaried' ? 'Income' : 'Business'} Documents:`, margin, y);
        y += 15;
        
        doc.setFont('helvetica', 'normal');
        selectedDocuments[applicantType].forEach((docItem, index) => {
          if (y > 700) {
            doc.addPage();
            y = 40;
          }
          doc.text(`${index + 1}. ${docItem}`, margin + 10, y);
          y += 12;
        });
        y += 5;
      }
      
      if (selectedDocuments?.property) {
        if (y > 700) {
          doc.addPage();
          y = 40;
        }
        doc.setFont('helvetica', 'bold');
        doc.text('Property Documents:', margin, y);
        y += 15;
        
        doc.setFont('helvetica', 'normal');
        selectedDocuments.property.forEach((docItem, index) => {
          if (y > 700) {
            doc.addPage();
            y = 40;
          }
          doc.text(`${index + 1}. ${docItem}`, margin + 10, y);
          y += 12;
        });
      }
    }

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${new Date().toLocaleDateString()} - Tirupati Agencies`, margin, pageHeight - 20);
    doc.text('Contact: 9850366753', pageWidth - margin - 80, pageHeight - 20);

    const filename = `${service.name.replace(/\s+/g, '_')}_documents.pdf`;
    doc.save(filename);
  };

  // Memoized quick stats
  const quickStats = useMemo(() => [
    // { 
    //   title: "Amount", 
    //   value: service.maxAmount || 'Custom', 
    //   icon: Banknote,
    //   color: "from-orange-500 to-amber-500"
    // },
    // { 
    //   title: "Interest", 
    //   value: service.interest || 'From 8.5%', 
    //   icon: Percent,
    //   color: "from-blue-500 to-cyan-500"
    // },
    // { 
    //   title: "Tenure", 
    //   value: service.tenure || 'Flexible', 
    //   icon: Clock,
    //   color: "from-green-500 to-emerald-500"
    // },
    // { 
    //   title: "Processing", 
    //   value: service.duration || 'Quick', 
    //   icon: Zap,
    //   color: "from-purple-500 to-pink-500"
    // }
  ], [service]);

  // Render documents section
  const renderDocuments = useMemo(() => {
    if (!service) return null;

    if (service.category === 'service') {
      return (
        <div className="space-y-2">
          {service.documents?.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{doc}</span>
            </div>
          ))}
        </div>
      );
    }

    const documents = selectedSubtype ? selectedSubtype.documents : service.documents;

    return (
      <div className="space-y-4">
        {/* Basic KYC Documents */}
        {documents?.basicKyc && (
          <div className="bg-gradient-to-br from-orange-50/50 to-white p-4 rounded-xl border border-orange-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Basic KYC Documents</h3>
                <p className="text-xs text-gray-500">सर्वसाधारण कागदपत्रे</p>
              </div>
            </div>
            <div className="grid gap-1.5">
              {documents.basicKyc.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Income Documents */}
        {documents?.[applicantType] && (
          <div className="bg-gradient-to-br from-blue-50/50 to-white p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  {applicantType === 'salaried' ? 'Income Documents' : 'Business Documents'}
                </h3>
                <p className="text-xs text-gray-500">
                  {applicantType === 'salaried' ? 'उत्पन्नाचे कागदपत्रे' : 'व्यवसाय कागदपत्रे'}
                </p>
              </div>
            </div>
            <div className="grid gap-1.5">
              {documents[applicantType].map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Property Documents */}
        {documents?.property && (
          <div className="bg-gradient-to-br from-green-50/50 to-white p-4 rounded-xl border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                <Building className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Property Documents</h3>
                <p className="text-xs text-gray-500">मालमत्तेचे कागदपत्रे</p>
              </div>
            </div>
            <div className="grid gap-1.5">
              {documents.property.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-gray-100">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium hover:shadow transition text-sm ${
              pdfLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {pdfLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                Download PDF
              </>
            )}
          </button>
          
          <button
            onClick={handleShareDocuments}
            disabled={shareLoading}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 border-orange-500 text-orange-600 font-medium hover:bg-orange-50 transition text-sm ${
              shareLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {shareLoading ? (
              <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            ) : copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Share List
              </>
            )}
          </button>
        </div>
      </div>
    );
  }, [service, applicantType, selectedSubtype, handleDownloadPDF, handleShareDocuments, pdfLoading, shareLoading, copied]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-56 sm:h-64 md:h-72 lg:h-96 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        <img
          src={loanImage}
          alt={service.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
       
        <div className="relative h-full px-4 flex items-center">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{service.name}</h1>
                <p className="text-sm sm:text-base text-orange-100 opacity-95">{service.marathiName}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                service.category === 'loan' 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
                  : service.category === 'mortgage'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              }`}>
                {service.category === 'loan' ? 'Loan' : service.category === 'mortgage' ? 'Mortgage' : 'Service'}
              </span>
              
              <div className="flex items-center gap-1 text-white/80">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">Across Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition text-sm"
          aria-label="Go back"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        {/* Top-right action buttons removed (design: cleaner hero) */}
      </div>

      {/* Main Content */}
      <div className="px-3 py-4 -mt-4 relative z-10">
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${stat.color} rounded-lg p-3 text-white shadow`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{stat.title}</span>
                  </div>
                  <div className="text-sm font-bold">{stat.value}</div>
                </div>
              );
            })}
          </div>

          {/* Overview Card */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                <IconComponent className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Overview</h2>
                <p className="text-xs text-gray-500">Service details & information</p>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm mb-3">{service.description}</p>

            {service.benefits && service.benefits.length > 0 && (
              <div className="grid gap-2">
                {service.benefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subtypes */}
          {service.subtypes && service.subtypes.length > 0 && (
            <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Available Options</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {service.subtypes.length} options
                </span>
              </div>
              <div className="grid gap-2">
                {service.subtypes.map((subtype, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedSubtype(selectedSubtype?.id === subtype.id ? null : subtype)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedSubtype?.id === subtype.id
                        ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          selectedSubtype?.id === subtype.id
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                            : 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{subtype.name}</h4>
                          <p className="text-xs text-gray-500">{subtype.marathiName}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                        selectedSubtype?.id === subtype.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                    
                    {selectedSubtype?.id === subtype.id && subtype.description && (
                      <div className="mt-2 ml-8">
                        <div className="p-2 bg-white rounded border border-orange-100">
                          <p className="text-xs text-gray-700">{subtype.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Section */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Required Documents</h3>
                  <p className="text-xs text-gray-500">कागदपत्रांची यादी</p>
                </div>
              </div>

              {service.category === 'loan' && (
                <div className="flex gap-1 bg-gradient-to-r from-gray-50 to-white p-0.5 rounded-lg border border-gray-200 self-start">
                  <button
                    onClick={() => setApplicantType('salaried')}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      applicantType === 'salaried'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Salaried
                  </button>
                  <button
                    onClick={() => setApplicantType('business')}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      applicantType === 'business'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
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
          {/* <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                <Settings className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Process Flow</h3>
                <p className="text-xs text-gray-500">आमची प्रक्रिया</p>
              </div>
            </div>

            <div className="space-y-2">
              {service.process?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    {idx < service.process.length - 1 && (
                      <div className="h-4 w-0.5 bg-gradient-to-b from-orange-200 to-amber-200 mx-auto"></div>
                    )}
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-2.5 border border-gray-100 flex-1">
                    <p className="text-xs text-gray-800">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Quick Actions - Mobile */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-50">
              <div className="flex gap-2">
                <Link 
                  to="/apply" 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-2.5 rounded-lg font-bold text-sm"
                >
                  Apply Now
                </Link>
                <a 
                  href="tel:9850366753"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-2.5 rounded-lg font-bold text-sm"
                >
                  Call Now
                </a>
              </div>
            </div>
          )}

          {/* Sidebar Content for Desktop */}
          {!isMobile && (
            <div className="lg:col-span-1 space-y-4">
              {/* Quick Action Card */}
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl p-4 text-white shadow">
                <h3 className="font-bold mb-2">Ready to Apply?</h3>
                <p className="text-orange-100 text-sm mb-3">Our experts are ready to guide you.</p>
                
                <div className="space-y-2">
                  <Link 
                    to="/apply" 
                    className="block w-full bg-white text-orange-600 text-center py-2 rounded-lg font-semibold hover:bg-orange-50 transition text-sm"
                  >
                    Apply Now
                  </Link>
                  
                  <a 
                    href="tel:9850366753"
                    className="flex items-center justify-center gap-1.5 w-full bg-white/20 backdrop-blur-sm text-white text-center py-2 rounded-lg font-semibold hover:bg-white/30 transition border border-white/30 text-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call: 9850366753
                  </a>
                </div>
              </div>

              {/* Why Choose Us */}
             
            </div>
          )}
        </div>

        {/* Mobile Bottom Padding */}
        {isMobile && <div className="h-14"></div>}
      </div>
    </div>
  );
}

export default LoanDetails;