import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoanDetails from './Pages/LoanDetails';
import Apply from './Pages/Apply';
import Header from './Components/Header';
import Footer from './Components/Footer';
import EmiCalculator from './Components/EmiCalculator';
import { Calculator, MessageCircle } from 'lucide-react';
import './App.css';
import ScrollToTop from './Components/ScrollToTop';
import About from './Pages/About';

function App() {
  const [showEmiPopup, setShowEmiPopup] = useState(false);
  const emiPrefill = { amount: 500000, rate: 8.5, tenure: 60 };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ScrollToTop /> {/* This fixes scrolling issue */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loan/:loanId" element={<LoanDetails />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Global floating buttons (WhatsApp + EMI) - visible on all pages */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        <a
          href="https://wa.me/919850366753"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        <button
          onClick={() => setShowEmiPopup(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition"
          title="EMI Calculator"
        >
          <Calculator className="w-6 h-6" />
        </button>
      </div>

      <EmiCalculator
        visible={showEmiPopup}
        onClose={() => setShowEmiPopup(false)}
        initialAmount={emiPrefill.amount}
        initialRate={emiPrefill.rate}
        initialTenure={emiPrefill.tenure}
      />

      <Footer />
    </div>
  );
}

export default App;
