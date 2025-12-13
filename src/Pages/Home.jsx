import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  Shield,
  Clock,
  Award,
  ArrowRight,
  ChevronRight,
  Check,
  TrendingUp,
  Sparkles,
  Home as HomeIcon,
  Phone,
  Menu,
  X,
  FileText,
  CreditCard,
  Building,
  FileSearch,
  Eye,
  CheckCircle,
  ArrowRightCircle,
  ClipboardCheck,
  Download,
  FileDown,
  BanknoteIcon,
  AlertCircle
} from 'lucide-react';
import BankMarquee from '../Components/BankMarquee';
import BannerSlider from '../Components/BannerSlider';
import loanDetails from '../data/loanDetails.json';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('loans');
  const [downloading, setDownloading] = useState(null);

  // Memoized services by category
  const { loanServices, mortgageServices, otherServices } = useMemo(() => {
    const services = Object.values(loanDetails);
    return {
      loanServices: services.filter(service => service.category === 'loan'),
      mortgageServices: services.filter(service => service.category === 'mortgage'),
      otherServices: services.filter(service => service.category === 'service')
    };
  }, []);

  // Simple PDF Forms Data
  const pdfForms = useMemo(() => [
    {
      id: 1, title: "SBI Home Loan Form", bank: "State Bank of India",
      color: "bg-orange-50", textColor: "text-orange-700", borderColor: "border-orange-200",
      downloadUrl: "/sbi hl appli from.pdf", fileName: "SBI-Home-Loan-Application.pdf"
    },
    {
      id: 2, title: "SBI Top-Up Loan Form", bank: "State Bank of India",
      color: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-200",
      downloadUrl: "/Top Up Loan Application.pdf", fileName: "SBI-Top-Up-Loan-Application.pdf"
    },
    {
      id: 3, title: "Central Bank Home Loan", bank: "Central Bank of India",
      color: "bg-red-50", textColor: "text-red-700", borderColor: "border-red-200",
      downloadUrl: "/CENTRAL BANK APP FORM.pdf", fileName: "Central-Bank-Home-Loan-Application.pdf"
    },
    {
      id: 4, title: "Bank of Maharashtra Home Loan", bank: "Bank of Maharashtra",
      color: "bg-orange-50", textColor: "text-orange-800", borderColor: "border-orange-300",
      downloadUrl: "/BOM APPLICATON FORM.pdf", fileName: "Bank-of-Maharashtra-Home-Loan-Application.pdf"
    }
  ], []);

  // Handle PDF download
  const handlePdfDownload = useCallback(async (form) => {
    setDownloading(form.id);
    try {
      const response = await fetch(form.downloadUrl, { method: 'HEAD' });
      if (response.ok) {
        const link = document.createElement('a');
        link.href = form.downloadUrl;
        link.download = form.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
          alert(`✓ ${form.title} downloaded!`);
          setDownloading(null);
        }, 100);
      } else {
        throw new Error('File not found');
      }
    } catch (error) {
      alert(`⚠️ ${form.title} is unavailable. Call 9850366753 for assistance.`);
      setDownloading(null);
    }
  }, []);

  // Stats
  const stats = useMemo(() => [
    { number: "10+", label: "Years", icon: Clock, color: "text-orange-500" },
    { number: "5000+", label: "Customers", icon: Users, color: "text-amber-500" },
    { number: "15+", label: "Products", icon: Award, color: "text-yellow-500" },
    { number: "100%", label: "Trust", icon: Shield, color: "text-red-500" }
  ], []);

  // Process Steps
  const processSteps = useMemo(() => [
    { id: 1, title: "Application", icon: FileText, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50" },
    { id: 2, title: "CIBIL Check", icon: CreditCard, color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50" },
    { id: 3, title: "Income Check", icon: TrendingUp, color: "from-green-500 to-emerald-500", bgColor: "bg-green-50" },
    { id: 4, title: "Valuation", icon: FileSearch, color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50" },
    { id: 5, title: "Inspection", icon: Eye, color: "from-red-500 to-pink-500", bgColor: "bg-red-50" },
    { id: 6, title: "Sanction", icon: CheckCircle, color: "from-indigo-500 to-blue-500", bgColor: "bg-indigo-50" },
    { id: 7, title: "Mortgage", icon: Building, color: "from-teal-500 to-green-500", bgColor: "bg-teal-50" },
    { id: 8, title: "Disbursement", icon: ArrowRightCircle, color: "from-cyan-500 to-blue-500", bgColor: "bg-cyan-50" }
  ], []);

  // Icons mapping
  const customIcons = useMemo(() => ({
    "home-loan-flat-purchase": "https://cdn-icons-gif.flaticon.com/15586/15586092.gif",
    "home-loan-house-purchase": "https://cdn-icons-gif.flaticon.com/16677/16677925.gif",
    "home-loan-construction": "https://cdn-icons-gif.flaticon.com/15586/15586068.gif",
    "plot-purchase-loan": "https://cdn-icons-gif.flaticon.com/19020/19020075.gif",
    "takeover-topup-loan": "https://cdn-icons-gif.flaticon.com/15576/15576128.gif",
    "loan-against-property": "https://cdn-icons-gif.flaticon.com/17489/17489766.gif",
    "education-loan": "https://cdn-icons-gif.flaticon.com/12743/12743767.gif",
    "project-loan": "https://cdn-icons-gif.flaticon.com/19032/19032720.gif",
    "machine-loan": "https://cdn-icons-gif.flaticon.com/16158/16158485.gif",
    "doctor-loan": "https://cdn-icons-gif.flaticon.com/13099/13099871.gif",
    "mortgage-registration": "https://cdn-icons-gif.flaticon.com/19035/19035067.gif",
    "equitable-mortgage": "https://cdn-icons-gif.flaticon.com/12420/12420695.gif",
    "search-report": "https://cdn-icons-gif.flaticon.com/19018/19018144.gif",
    "valuation-report": "https://cdn-icons-gif.flaticon.com/19013/19013048.gif"
  }), []);

  const getCustomIcon = useCallback(
    (serviceId) => customIcons[serviceId] || "https://cdn-icons-png.flaticon.com/128/10307/10307931.png",
    [customIcons]
  );

  // Search handling
  const handleSearch = useCallback((e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = Object.values(loanDetails).filter(service =>
        service.name.toLowerCase().includes(query) ||
        service.marathiName.toLowerCase().includes(query)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleSuggestionClick = useCallback(
    (service) => {
      navigate(`/loan/${service.id}`);
      setSearchQuery('');
      setSuggestions([]);
    },
    [navigate]
  );

  // Active services
  const activeServices = useMemo(() => {
    switch (activeTab) {
      case 'loans': return loanServices;
      case 'mortgage': return mortgageServices;
      case 'services': return otherServices;
      default: return loanServices;
    }
  }, [activeTab, loanServices, mortgageServices, otherServices]);

  const tabs = useMemo(() => [
    { id: 'loans', name: 'Loan Products', count: loanServices.length },
    { id: 'mortgage', name: 'Mortgage Services', count: mortgageServices.length },
    { id: 'services', name: 'Other Services', count: otherServices.length }
  ], [loanServices.length, mortgageServices.length, otherServices.length]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* HERO Section */}
      <BannerSlider/>
      
      <BankMarquee />

      {/* Search Section - Compact */}
       <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full mb-2">
            <ClipboardCheck className="w-3 h-3 text-orange-600" />
            <span className="text-xs font-semibold text-orange-700">Process Flow</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            How It <span className="text-orange-600">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className={`${step.bgColor} rounded-lg p-3 border border-gray-100`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">Step {step.id}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h3>
              </div>
            );
          })}
        </div>

        {/* Process Summary */}
        <div className="mt-4 bg-orange-50 rounded-xl p-4 border border-orange-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">8 Steps</div>
              <div className="text-xs text-gray-700">Complete Process</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">7-14 Days</div>
              <div className="text-xs text-gray-700">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">95%</div>
              <div className="text-xs text-gray-700">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    
      {/* Stats Section - Compact */}
      
      {/* Services Tabs - Compact */}
      <section id="services" className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Our <span className="text-orange-600">Services</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>

        {/* Services Grid - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeServices.map((service) => {
            const iconUrl = getCustomIcon(service.id);
            return (
              <div
                key={service.id}
                onClick={() => navigate(`/loan/${service.id}`)}
                className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow hover:border-orange-200 transition cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <img src={iconUrl} alt="" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5 truncate">{service.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{service.marathiName}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-xs mb-3 line-clamp-2">{service.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {service.maxAmount && (
                    <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-700 rounded">
                      Max: {service.maxAmount}
                    </span>
                  )}
                  {service.tenure && (
                    <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded">
                      {service.tenure}
                    </span>
                  )}
                </div>

                <button
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-medium hover:shadow transition"
                  onClick={(e) => { e.stopPropagation(); navigate(`/loan/${service.id}`); }}
                >
                  View Details
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Flow - Compact */}
     

      {/* PDF Forms - Compact */}
      <section className="max-w-4xl mx-auto px-3 sm:px-4 py-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full mb-2">
            <Download className="w-3 h-3 text-orange-600" />
            <span className="text-xs font-semibold text-orange-700">Bank Forms</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Download <span className="text-orange-600">Forms</span>
          </h2>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">Downloadable bank forms have been moved to the <span className="text-orange-600 font-medium"><a href="/forms">Forms</a></span> page.</p>
        </div>
      </section>

      {/* CTA - Compact */}
      <section className="max-w-3xl mx-auto px-3 sm:px-4 py-6">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-5 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Need Assistance?</h2>
          <p className="text-orange-100 text-sm mb-4">
            Our experts are ready to help you.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Link 
              to="/apply" 
              className="px-5 py-2 bg-white text-orange-600 font-bold rounded-md hover:bg-orange-50 transition text-sm flex items-center gap-1.5"
            >
              Apply Now
              <ArrowRight className="w-3 h-3" />
            </Link>

            <a 
              href="tel:9850366753"
              className="px-5 py-2 border border-white/40 text-white font-bold rounded-md hover:bg-white/10 transition text-sm flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Floating buttons & EMI modal moved to App.jsx for global availability */}
    </div>
  );
}

export default Home;