import React, { useMemo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, AlertCircle } from 'lucide-react';

const Forms = () => {
  const [downloading, setDownloading] = useState(null);

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
        setTimeout(() => setDownloading(null), 120);
      } else throw new Error('File not found');
    } catch (err) {
      alert(`⚠️ ${form.title} is unavailable. Call 9850366753 for assistance.`);
      setDownloading(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
            <p className="text-xs text-gray-600">Download bank application forms</p>
          </div>
          <Link to="/" className="text-sm text-orange-600 font-medium">Back to Home</Link>
        </div>

        <div className="space-y-3">
          {pdfForms.map((form) => (
            <div key={form.id} className={`${form.color} border ${form.borderColor} rounded-lg p-3`}> 
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className={`w-5 h-5 ${form.textColor}`} />
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{form.title}</h3>
                    <p className="text-xs text-gray-600 truncate">{form.bank}</p>
                  </div>
                </div>

                <button
                  onClick={() => handlePdfDownload(form)}
                  disabled={downloading === form.id}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
                    downloading === form.id
                      ? 'bg-orange-100 text-orange-700 cursor-not-allowed'
                      : 'bg-white text-orange-600 hover:bg-orange-50 border border-orange-200'
                  }`}
                >
                  {downloading === form.id ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-600"></div>
                      ...
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3" />
                      PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-700">Forms are in PDF format. Call <a href="tel:9850366753" className="font-semibold text-orange-600">9850366753</a> for assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
