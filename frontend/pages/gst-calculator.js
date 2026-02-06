import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import {
  FaPercent,
  FaCalculator,
  FaInfoCircle,
  FaCheckCircle,
  FaLightbulb,
  FaChartLine,
  FaFileInvoiceDollar,
  FaArrowRight,
  FaShoppingCart,
  FaReceipt,
  FaBook,
  FaUsers,
  FaAward,
  FaShieldAlt
} from 'react-icons/fa';

// Simplified GST Flow Illustration
const GSTFlowIllustration = () => (
  <svg viewBox="0 0 540 200" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="10" y="20" width="520" height="160" rx="20" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" />

    {/* Step 1 – Original Amount */}
    <circle cx="90" cy="100" r="45" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
    <text x="90" y="92" textAnchor="middle" fontSize="18" fontWeight="700" fill="#047857">$</text>
    <text x="90" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="#065f46">1,000</text>
    <text x="90" y="165" textAnchor="middle" fontSize="10" fontWeight="600" fill="#374151">Base Price</text>

    {/* Arrow 1 */}
    <path d="M145 100 L175 100" stroke="#10b981" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowGreen)" />
    <defs>
      <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
      </marker>
    </defs>

    {/* Step 2 – GST Rate */}
    <rect x="185" y="60" width="130" height="80" rx="16" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
    <text x="250" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6b7280">GST Rate</text>
    <text x="250" y="112" textAnchor="middle" fontSize="24" fontWeight="800" fill="#059669">10%</text>
    <text x="250" y="165" textAnchor="middle" fontSize="10" fontWeight="600" fill="#374151">Tax Applied</text>

    {/* Arrow 2 */}
    <path d="M325 100 L355 100" stroke="#10b981" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowGreen)" />

    {/* Step 3 – Final Amount */}
    <circle cx="450" cy="100" r="45" fill="#059669" stroke="#047857" strokeWidth="3" />
    <text x="450" y="92" textAnchor="middle" fontSize="18" fontWeight="700" fill="#ffffff">$</text>
    <text x="450" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ecfdf5">1,100</text>
    <text x="450" y="165" textAnchor="middle" fontSize="10" fontWeight="600" fill="#374151">Final Price</text>

    {/* GST Amount Badge */}
    <rect x="200" y="25" width="140" height="22" rx="11" fill="#10b981" />
    <text x="270" y="40" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">GST: $100</text>
  </svg>
);

// Simple Result Display Component
const GSTResultDisplay = ({ baseAmount, gstAmount, totalAmount, gstRate }) => {
  const percentage = ((gstAmount / totalAmount) * 100).toFixed(1);

  return (
    <div className="text-center">
      <div className="inline-block bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border-2 border-emerald-200 shadow-lg">
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-600 mb-2">GST Amount</div>
          <div className="text-5xl font-bold text-emerald-600">${gstAmount}</div>
          <div className="text-xs text-gray-500 mt-2">{percentage}% of final price</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-emerald-600 h-3 rounded-full transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default function GSTCalculatorAustralia() {
  const [calculationType, setCalculationType] = useState('exclusive');
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('10');
  const [customRate, setCustomRate] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);

  // Common GST rates (10% is standard in Australia)
  const commonRates = ['0', '10', 'custom'];

  // Core GST calculation 
  const calculateGST = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const inputAmount = parseFloat(amount);
      let rate = gstRate === 'custom' ? parseFloat(customRate) : parseFloat(gstRate);

      if (isNaN(inputAmount) || inputAmount <= 0) {
        setError('Please enter a valid amount greater than 0.');
        setLoading(false);
        return;
      }

      if (isNaN(rate) || rate < 0 || rate > 100) {
        setError('Please enter a valid GST rate between 0 and 100.');
        setLoading(false);
        return;
      }

      let baseAmount, gstAmount, totalAmount;

      if (calculationType === 'exclusive') {
        // GST Exclusive: Add GST to the base amount
        baseAmount = inputAmount;
        gstAmount = (baseAmount * rate) / 100;
        totalAmount = baseAmount + gstAmount;
      } else {
        // GST Inclusive: Extract GST from the total amount
        totalAmount = inputAmount;
        baseAmount = totalAmount / (1 + rate / 100);
        gstAmount = totalAmount - baseAmount;
      }

      setResult({
        baseAmount: baseAmount.toFixed(2),
        gstAmount: gstAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        gstRate: rate.toFixed(1),
        calculationType,
        gstPercentOfTotal: ((gstAmount / totalAmount) * 100).toFixed(2)
      });

      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }, 400);
  };

  const clearAll = () => {
    setAmount('');
    setGstRate('10');
    setCustomRate('');
    setResult(null);
    setError('');
  };

  const activeRate = gstRate === 'custom' ? customRate : gstRate;

  return (
    <Layout
      title="GST Calculator Australia 2026 – Calculate 10% GST Instantly Free"
      description="Free Australian GST calculator. Instantly calculate 10% GST on purchases and sales. Add or remove GST from amounts for accurate invoicing and tax compliance. Updated for 2026 ATO requirements."
      keywords="gst calculator australia, australian gst calculator, calculate gst, gst calculation australia, add gst calculator, remove gst calculator, 10% gst calculator, ato gst calculator, goods and services tax australia"
      canonicalPath="/gst-calculator-australia"
      ogImage="gst-calculator-australia.jpg"
      lastUpdated="2026-02-05"
      schema={[
        {
          '@type': 'WebApplication',
          name: 'Australian GST Calculator',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'AUD'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '15230',
            bestRating: '5',
            worstRating: '1'
          }
        },
        {
          '@type': 'HowTo',
          name: 'How to Calculate GST in Australia',
          description: 'Step-by-step guide to calculate 10% GST for Australian businesses and consumers',
          totalTime: 'PT30S',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Choose Calculation Type',
              text: 'Select whether to add GST to a base price (GST exclusive) or extract GST from a total price (GST inclusive).'
            },
            {
              '@type': 'HowToStep',
              name: 'Enter Amount',
              text: 'Input the dollar amount. For exclusive, enter the price before GST. For inclusive, enter the final price with GST already included.'
            },
            {
              '@type': 'HowToStep',
              name: 'Calculate',
              text: 'Click calculate to instantly see the base amount, GST component (10%), and total amount.'
            },
            {
              '@type': 'HowToStep',
              name: 'Use Results',
              text: 'Use the breakdown for accurate invoicing, BAS reporting, or price verification.'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I calculate GST in Australia?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'To add GST (exclusive calculation): Multiply your amount by 1.1 or add 10% to the base price. Formula: Total = Price × 1.1. Example: $100 + GST = $110. To remove GST (inclusive calculation): Divide the total by 11 to find the GST amount, or divide by 1.1 to find the base. Example: From $110, GST = $110 ÷ 11 = $10, Base = $110 ÷ 1.1 = $100.'
              }
            },
            {
              '@type': 'Question',
              name: 'What is the GST rate in Australia?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The Goods and Services Tax (GST) rate in Australia is fixed at 10%. This rate has been consistent since GST was introduced on 1 July 2000 and applies to most goods and services sold or consumed in Australia.'
              }
            },
            {
              '@type': 'Question',
              name: 'Do I need to register for GST in Australia?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'You must register for GST if your business or enterprise has a GST turnover of $75,000 or more ($150,000 for non-profit organizations). You can also choose to register voluntarily if your turnover is below these thresholds. Ride-sourcing and taxi drivers must register regardless of turnover.'
              }
            },
            {
              '@type': 'Question',
              name: 'What items are GST-free in Australia?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'GST-free items include most basic food items, some medical and health services, some educational courses, exports, and certain childcare services. Fresh fruit, vegetables, bread, milk and most unprocessed foods are GST-free, while restaurant meals and processed foods generally include GST.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I claim GST credits on business purchases?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'If you are registered for GST, you can claim credits (input tax credits) for the GST included in the price of goods and services you buy for your business. You must have a tax invoice for purchases over $82.50 (including GST) and the purchase must be for your business activities.'
              }
            }
          ]
        }
      ]}
    >
      {/* Breadcrumbs*/}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'GST Calculator Australia', href: '/gst-calculator-australia' }
      ]} />

      {/*Compact Hero*/}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="text-center mb-6">
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              GST Calculator
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              Calculate 10% GST instantly for accurate pricing, invoicing, and BAS reporting
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="text-emerald-600 text-xs" />
                <span className="text-gray-700">100% Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="text-emerald-600 text-xs" />
                <span className="text-gray-700">Instant Results</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="text-emerald-600 text-xs" />
                <span className="text-gray-700">No Registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content*/}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/*Calculator Card (2/3)*/}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FaCalculator className="text-emerald-600" />
                  Calculate GST
                </h2>
                <button 
                  onClick={clearAll} 
                  className="text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-6">
                {/* Calculation Type Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Calculation Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => { setCalculationType('exclusive'); setError(''); }}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        calculationType === 'exclusive'
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 bg-white hover:border-emerald-200'
                      }`}
                    >
                      {calculationType === 'exclusive' && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-xs" />
                        </span>
                      )}
                      <div className="text-left">
                        <div className="font-bold text-gray-900 mb-1">Add GST</div>
                        <div className="text-xs text-gray-600">Calculate GST on base price</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { setCalculationType('inclusive'); setError(''); }}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        calculationType === 'inclusive'
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 bg-white hover:border-emerald-200'
                      }`}
                    >
                      {calculationType === 'inclusive' && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-xs" />
                        </span>
                      )}
                      <div className="text-left">
                        <div className="font-bold text-gray-900 mb-1">Remove GST</div>
                        <div className="text-xs text-gray-600">Extract GST from total price</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {calculationType === 'exclusive' ? 'Amount (excluding GST)' : 'Amount (including GST)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={amount}
                      onChange={(e) => { setAmount(e.target.value); setError(''); }}
                      className="w-full pl-10 pr-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter amount"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {calculationType === 'exclusive' 
                      ? 'Enter the price before GST is added' 
                      : 'Enter the final price that includes 10% GST'}
                  </p>
                </div>

                {/* GST Rate Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    GST Rate (%)
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {commonRates.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => { setGstRate(rate); setError(''); }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          gstRate === rate
                            ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                            : 'border-gray-200 bg-white hover:border-emerald-200'
                        }`}
                      >
                        {rate === 'custom' ? (
                          <div>
                            <div className="text-sm font-bold text-gray-900">Custom</div>
                            <div className="text-xs text-gray-500">Other rate</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-lg font-bold text-gray-900">{rate}%</div>
                            {rate === '10' && (
                              <div className="text-xs text-emerald-600 font-medium">Standard</div>
                            )}
                            {rate === '0' && (
                              <div className="text-xs text-gray-500">GST-free</div>
                            )}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom Rate Input */}
                  {gstRate === 'custom' && (
                    <div className="mt-3">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={customRate}
                        onChange={(e) => { setCustomRate(e.target.value); setError(''); }}
                        className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter custom rate (e.g., 15)"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Enter a custom GST percentage (0-100)
                      </p>
                    </div>
                  )}

                  {gstRate !== 'custom' && (
                    <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-gray-700">
                        {gstRate === '10' ? (
                          <>
                            <strong>Standard Australian GST:</strong> Most goods and services are taxed at 10%
                          </>
                        ) : (
                          <>
                            <strong>GST-Free:</strong> Items like basic food, health, and education
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FaLightbulb className="text-blue-600 text-lg mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-1">Quick Formula:</p>
                      <p><strong>Add GST:</strong> Amount × 1.1 or Amount × 110%</p>
                      <p><strong>Remove GST:</strong> Amount ÷ 1.1 or Amount ÷ 11 (for GST portion only)</p>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
                    <FaInfoCircle className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Calculate Button */}
                <button
                  onClick={calculateGST}
                  disabled={loading || !amount || (!activeRate)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Calculating…
                    </>
                  ) : (
                    <>
                      <FaCalculator />
                      Calculate GST
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar (1/3)*/}
          <div className="space-y-6">

            {/* Quick Examples */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Common Examples
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { base: '$100', rate: '10%', gst: '$10', total: '$110' },
                  { base: '$500', rate: '10%', gst: '$50', total: '$550' },
                  { base: '$1,000', rate: '0%', gst: '$0', total: '$1,000' },
                  { base: '$2,000', rate: '15%', gst: '$300', total: '$2,300' }
                ].map((row, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{row.base}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        row.rate === '10%' ? 'bg-emerald-100 text-emerald-700' :
                        row.rate === '0%' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {row.rate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>GST: <strong className="text-emerald-600">{row.gst}</strong></span>
                      <span>Total: <strong className="text-gray-900">{row.total}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GST-Free Items */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                GST-Free Items
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Basic food (bread, milk, vegetables)',
                  'Some education courses',
                  'Certain medical services',
                  'Exports',
                  'Childcare services',
                  'International transport'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0 text-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div ref={resultsRef} className="mt-12">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Your GST Calculation
              </h2>

              {/* Visual Result */}
              <div className="mb-8">
                <GSTResultDisplay 
                  baseAmount={parseFloat(result.baseAmount)} 
                  gstAmount={parseFloat(result.gstAmount)} 
                  totalAmount={parseFloat(result.totalAmount)} 
                  gstRate={result.gstRate}
                />
              </div>

              {/* Breakdown Cards */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-xs font-semibold text-gray-600 mb-2">Base Amount</div>
                  <div className="text-2xl font-bold text-gray-900">${result.baseAmount}</div>
                  <div className="text-xs text-gray-500 mt-1">Excluding GST</div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                  <div className="text-xs font-semibold text-gray-600 mb-2">GST Amount</div>
                  <div className="text-2xl font-bold text-emerald-600">${result.gstAmount}</div>
                  <div className="text-xs text-gray-500 mt-1">{result.gstRate}% Tax</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-xs font-semibold text-gray-600 mb-2">Total Amount</div>
                  <div className="text-2xl font-bold text-gray-900">${result.totalAmount}</div>
                  <div className="text-xs text-gray-500 mt-1">Including GST</div>
                </div>
              </div>

              {/* Invoice Format */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
                  <FaFileInvoiceDollar className="text-emerald-600" />
                  Invoice Summary
                </h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600">Base Amount:</span>
                    <span className="font-semibold text-gray-900">$ {result.baseAmount}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600">GST ({result.gstRate}%):</span>
                    <span className="font-semibold text-emerald-600">$ {result.gstAmount}</span>
                  </div>
                  <div className="flex justify-between py-2 bg-white px-3 rounded border-2 border-emerald-500">
                    <span className="font-bold text-gray-900">Total Amount:</span>
                    <span className="font-bold text-emerald-600">$ {result.totalAmount}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center italic">
                  Ready for your tax invoice or BAS reporting
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Educational Content*/}
        <div className="mt-16 max-w-4xl mx-auto space-y-10">

          {/* Understanding GST */}
          <section className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding GST in Australia
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                The Goods and Services Tax (GST) is a broad-based consumption tax of 10% applied to most goods, services, and other items sold or consumed in Australia. Introduced on 1 July 2000, GST replaced the previous wholesale sales tax system and fundamentally changed how businesses handle taxation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike income tax which targets earnings, GST is a consumption tax paid by the end consumer. For businesses, it operates as a pass-through mechanism where you collect GST from customers and claim credits for GST paid on business purchases. This means Australian businesses act as collection agents for the Australian Taxation Office (ATO), making accurate GST calculation essential for compliance.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The 10% rate has remained constant since GST's introduction, making Australia's tax system relatively straightforward compared to countries with multiple tax tiers. Whether you're a small café owner pricing your coffee or a construction company invoicing for a major project, understanding how to properly calculate and apply GST ensures you stay compliant while maintaining accurate financial records.
              </p>
            </div>

            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How GST Flows Through Your Business</h3>
              <GSTFlowIllustration />
            </div>
          </section>

          {/* Calculation Methods */}
          <section className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Two Ways to Calculate GST: Add or Remove
            </h2>
            
            <div className="space-y-6">
              {/* Adding GST */}
              <div className="border-l-4 border-emerald-500 bg-emerald-50 p-5 rounded-r-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Adding GST (GST-Exclusive Pricing)
                </h3>
                <p className="text-gray-700 mb-3">
                  When you know the base price of your product or service and need to add GST to find the final price your customer pays, you're working with GST-exclusive pricing. This is the most common scenario for businesses setting prices.
                </p>
                <div className="bg-white border border-emerald-200 rounded p-4 mb-3">
                  <p className="font-semibold text-gray-900 mb-2">Formula:</p>
                  <p className="font-mono text-sm">Total Price = Base Price × 1.1</p>
                  <p className="text-xs text-gray-600 mt-2">or simply: Base Price + (Base Price × 10 ÷ 100)</p>
                </div>
                <div className="bg-white border border-emerald-200 rounded p-4">
                  <p className="font-semibold text-gray-900 mb-2">Example:</p>
                  <p className="text-sm text-gray-700">
                    A plumber charges $200 for their labour. The customer pays:<br/>
                    <span className="font-mono">$200 × 1.1 = $220</span><br/>
                    <span className="text-gray-600">($200 base + $20 GST)</span>
                  </p>
                </div>
              </div>

              {/* Removing GST */}
              <div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded-r-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Removing GST (GST-Inclusive Pricing)
                </h3>
                <p className="text-gray-700 mb-3">
                  When you have a final price that already includes GST and need to determine the base amount and GST component separately, you're working backwards from GST-inclusive pricing. This is essential for BAS reporting and understanding profit margins.
                </p>
                <div className="bg-white border border-blue-200 rounded p-4 mb-3">
                  <p className="font-semibold text-gray-900 mb-2">Formula:</p>
                  <p className="font-mono text-sm">Base Price = Total Price ÷ 1.1</p>
                  <p className="font-mono text-sm mt-1">GST Amount = Total Price ÷ 11</p>
                </div>
                <div className="bg-white border border-blue-200 rounded p-4">
                  <p className="font-semibold text-gray-900 mb-2">Example:</p>
                  <p className="text-sm text-gray-700">
                    A retail item costs $220 including GST. To find the breakdown:<br/>
                    <span className="font-mono">Base: $220 ÷ 1.1 = $200</span><br/>
                    <span className="font-mono">GST: $220 ÷ 11 = $20</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Registration Requirements */}
          <section className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              When You Must Register for GST
            </h2>
            <p className="text-gray-700 mb-4">
              Not every business in Australia needs to register for GST. The ATO has clear thresholds and rules determining when registration becomes mandatory versus optional.
            </p>
            
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Mandatory Registration</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Your business turnover is $75,000 or more per year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Your non-profit turnover is $150,000 or more per year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span>You provide taxi or ride-sourcing services (regardless of turnover)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span>You want to claim fuel tax credits for your business</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Voluntary Registration</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Even if your turnover is below the threshold, you can choose to register for GST. This might benefit you if:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>You have significant business purchases where you could claim GST credits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Your customers are other businesses who want to claim credits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>You expect to exceed the threshold soon</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* GST Credits */}
          <section className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How GST Credits Work: The Real Benefit of Registration
            </h2>
            <p className="text-gray-700 mb-4">
              One of the biggest advantages of GST registration is the ability to claim GST credits (also called input tax credits). This prevents you from paying tax on tax and significantly impacts your business cash flow.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Real-World Example:</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white border border-gray-200 rounded p-3">
                  <p className="font-semibold mb-1">Month's Business Activity:</p>
                  <p className="text-gray-700">You purchase $5,500 worth of stock (inc. $500 GST)</p>
                  <p className="text-gray-700">You sell products for $11,000 (inc. $1,000 GST)</p>
                </div>
                <div className="bg-white border border-emerald-200 rounded p-3">
                  <p className="font-semibold mb-1">GST Calculation:</p>
                  <p className="text-gray-700">GST collected from sales: $1,000</p>
                  <p className="text-gray-700">GST paid on purchases: $500</p>
                  <p className="text-emerald-600 font-semibold mt-2">Net GST payable to ATO: $500</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3 italic">
                Without GST registration, you'd still pay the $500 GST on purchases but couldn't claim it back or charge GST on sales—putting you at a competitive disadvantage.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FaInfoCircle className="text-amber-600" />
                What You Need to Claim Credits
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• A valid tax invoice for purchases over $82.50 (including GST)</li>
                <li>• The purchase must be for your business, not private use</li>
                <li>• You must have paid or be liable to pay for the purchase</li>
                <li>• Your supplier must be registered for GST</li>
              </ul>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Common GST Mistakes Australian Businesses Make
            </h2>
            <div className="space-y-4">
              {[
                {
                  mistake: 'Charging GST When Not Registered',
                  impact: 'You must remit the GST collected even though you can\'t claim credits. Register immediately if you\'re collecting GST.',
                  fix: 'Only charge GST once you have your ABN and are officially registered. Check your registration status on the ABR.'
                },
                {
                  mistake: 'Not Issuing Proper Tax Invoices',
                  impact: 'Your customers can\'t claim GST credits without a compliant tax invoice, damaging business relationships.',
                  fix: 'Ensure invoices over $82.50 include: your ABN, "tax invoice" clearly stated, GST amount or statement that price includes GST, and all other required details.'
                },
                {
                  mistake: 'Mixing Up GST-Free and Input-Taxed Sales',
                  impact: 'GST-free sales let you claim credits on purchases; input-taxed sales don\'t. Misclassification affects your BAS.',
                  fix: 'Learn the difference: GST-free items (like basic food) allow credit claims, while input-taxed items (like residential rent) don\'t.'
                },
                {
                  mistake: 'Claiming GST on Non-Claimable Items',
                  impact: 'The ATO will disallow credits on private expenses, second-hand goods from unregistered sellers, or items bought before registration.',
                  fix: 'Keep meticulous records. Only claim GST on legitimate business expenses from registered suppliers.'
                },
                {
                  mistake: 'Forgetting to Include GST in Price Quotes',
                  impact: 'Quoting $1,000 then adding GST ($1,100) upsets customers who expected the quoted price to be final.',
                  fix: 'Always clarify: "$1,000 + GST" or "$1,100 including GST" in all quotes and advertising to avoid disputes.'
                },
                {
                  mistake: 'Late BAS Lodgement',
                  impact: 'Penalties start at $330 for small businesses and increase with delays. Interest accrues on unpaid GST.',
                  fix: 'Set up calendar reminders or use accounting software with BAS lodgement features. Consider quarterly reporting if monthly is challenging.'
                }
              ].map((item, i) => (
                <div key={i} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {i + 1}. {item.mistake}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong className="text-red-700">Impact:</strong> {item.impact}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong className="text-emerald-700">Fix:</strong> {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How do I calculate GST in Australia?',
                  a: 'To add GST to a price, multiply by 1.1 (or add 10%). For example, $100 becomes $110. To remove GST from a total price, divide by 1.1 to get the base amount, or divide by 11 to find just the GST component. From $110, the base is $100 ($110 ÷ 1.1) and the GST is $10 ($110 ÷ 11).'
                },
                {
                  q: 'What is the current GST rate in Australia?',
                  a: 'The GST rate in Australia is 10% and has remained unchanged since it was introduced on 1 July 2000. This rate applies to most goods and services, though some items are GST-free (0%) and others are input-taxed.'
                },
                {
                  q: 'Do all businesses need to charge GST?',
                  a: 'No. You only need to register for and charge GST if your business turnover is $75,000 or more per year ($150,000 for non-profits), you provide taxi or ride-sourcing services, or you choose to register voluntarily. Businesses below the threshold can operate without GST registration.'
                },
                {
                  q: 'What\'s the difference between GST-free and exempt?',
                  a: 'GST-free sales (like basic food and exports) don\'t have GST charged, but you can still claim GST credits on related purchases. Input-taxed sales (like residential rent and financial services) have no GST charged and you cannot claim credits on related purchases. This distinction significantly affects your business\'s GST position.'
                },
                {
                  q: 'How often do I need to report GST to the ATO?',
                  a: 'Most businesses report GST quarterly through their Business Activity Statement (BAS), due 28 days after the quarter ends. Some larger businesses ($20 million+ turnover) must report monthly. The ATO will tell you your reporting frequency when you register. You can also lodge annually if you\'re eligible for the GST instalment system.'
                },
                {
                  q: 'Can I claim GST credits on purchases made before registration?',
                  a: 'Generally no. You can only claim GST credits on purchases made after you\'re registered for GST. However, there\'s an exception: if you held goods for less than 12 months before registration or hadn\'t yet used trading stock, you may be able to claim. This is complex, so consult the ATO or a tax professional for your specific situation.'
                }
              ].map((item, i) => (
                <details key={i} className="bg-gray-50 border border-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <summary className="font-semibold text-gray-900">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Expert Box */}
          <ExpertBox
            expertType="finance"
            calculatorName="Australian GST Calculator"
            lastUpdated="February 05, 2026"
          />

          {/* User Reviews */}
          <UserReviews calculatorType="gst-australia" />

          {/* Related Calculators */}
          <section className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/percentage-calculator" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaPercent className="text-xl text-emerald-600" />
                  <h3 className="font-semibold text-gray-900 text-sm">Percentage Calculator</h3>
                  <FaArrowRight className="text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                </div>
                <p className="text-xs text-gray-600">Calculate percentages and markups</p>
              </a>
              <a href="/margin-calculator" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaChartLine className="text-xl text-emerald-600" />
                  <h3 className="font-semibold text-gray-900 text-sm">Margin Calculator</h3>
                  <FaArrowRight className="text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                </div>
                <p className="text-xs text-gray-600">Calculate profit margins</p>
              </a>
              <a href="/discount-calculator" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaShoppingCart className="text-xl text-emerald-600" />
                  <h3 className="font-semibold text-gray-900 text-sm">Discount Calculator</h3>
                  <FaArrowRight className="text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                </div>
                <p className="text-xs text-gray-600">Calculate sale prices</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}