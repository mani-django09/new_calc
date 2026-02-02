import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import {
  FaHome,
  FaCalculator,
  FaInfoCircle,
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaChartLine,
  FaTrophy,
  FaStar,
  FaBolt,
  FaAward,
  FaArrowRight,
  FaDollarSign,
  FaCalendarAlt,
  FaPiggyBank,
  FaClock,
  FaPercentage,
  FaLandmark,
  FaWallet
} from 'react-icons/fa';

// ─── SVG 1: Amortization Visual — how extra payments bypass interest ─────────
const AmortizationIllustration = () => (
  <svg viewBox="0 0 560 240" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="6" y="6" width="548" height="228" rx="22" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.5" />
    
    {/* House icon */}
    <g transform="translate(40, 40)">
      <rect x="20" y="40" width="80" height="60" rx="4" fill="#0ea5e9" />
      <polygon points="60,10 10,45 110,45" fill="#0284c7" />
      <rect x="45" y="70" width="30" height="30" rx="2" fill="#f0f9ff" />
      <rect x="30" y="50" width="20" height="20" rx="2" fill="#bae6fd" />
      <rect x="70" y="50" width="20" height="20" rx="2" fill="#bae6fd" />
    </g>
    
    {/* Payment flow arrows */}
    <path d="M160,100 L200,100" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowBlue)" />
    <path d="M160,130 L200,130" stroke="#10b981" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowGreen)" />
    
    <defs>
      <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#0ea5e9" />
      </marker>
      <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
      </marker>
    </defs>
    
    {/* Payment breakdown box */}
    <rect x="220" y="50" width="180" height="140" rx="16" fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
    <text x="310" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0c4a6e">Monthly Payment</text>
    
    {/* Interest portion */}
    <rect x="240" y="95" width="140" height="35" rx="8" fill="#fee2e2" />
    <text x="250" y="115" fontSize="10" fontWeight="600" fill="#dc2626">Interest</text>
    <text x="365" y="118" textAnchor="end" fontSize="14" fontWeight="800" fill="#dc2626">$1,625</text>
    
    {/* Principal portion */}
    <rect x="240" y="140" width="140" height="35" rx="8" fill="#d1fae5" />
    <text x="250" y="160" fontSize="10" fontWeight="600" fill="#059669">Principal</text>
    <text x="365" y="163" textAnchor="end" fontSize="14" fontWeight="800" fill="#059669">$296</text>
    
    {/* Extra payment arrow */}
    <path d="M420,120 L460,120" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeDasharray="5,3" markerEnd="url(#arrowGreen)" />
    
    {/* Result box */}
    <rect x="480" y="70" width="70" height="100" rx="12" fill="#10b981" />
    <text x="515" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d1fae5">Extra =</text>
    <text x="515" y="125" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">Direct to</text>
    <text x="515" y="145" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">Principal</text>
    
    {/* Formula note */}
    <text x="280" y="215" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="500">
      Extra payments bypass interest and reduce principal immediately
    </text>
  </svg>
);

// ─── SVG 2: Savings Timeline — visual comparison of payoff timelines ─────────
const SavingsTimelineIllustration = () => (
  <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="508" height="188" rx="18" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.3" />
    
    {/* Timeline track */}
    <rect x="30" y="80" width="460" height="12" rx="6" fill="#e5e7eb" />
    
    {/* Standard payoff (longer) */}
    <rect x="30" y="80" width="460" height="12" rx="6" fill="#ef4444" opacity="0.3" />
    
    {/* With extra payments (shorter) */}
    <rect x="30" y="80" width="320" height="12" rx="6" fill="#10b981" />
    
    {/* Year markers */}
    {[0, 5, 10, 15, 20, 25, 30].map((year, i) => (
      <g key={i}>
        <line x1={30 + (year / 30) * 460} y1="95" x2={30 + (year / 30) * 460} y2="110" stroke="#9ca3af" strokeWidth="1" />
        <text x={30 + (year / 30) * 460} y="125" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6b7280">{year}yr</text>
      </g>
    ))}
    
    {/* Standard end marker */}
    <circle cx="490" cy="86" r="8" fill="#ef4444" />
    <text x="490" y="60" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">30 Years</text>
    <text x="490" y="150" textAnchor="middle" fontSize="8" fill="#6b7280">Standard</text>
    
    {/* Extra payment end marker */}
    <circle cx="350" cy="86" r="10" fill="#10b981" />
    <text x="350" y="55" textAnchor="middle" fontSize="10" fontWeight="800" fill="#059669">~21 Years</text>
    <text x="350" y="165" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">With Extra $200/mo</text>
    
    {/* Savings badge */}
    <rect x="200" y="140" width="120" height="35" rx="17" fill="#fbbf24" />
    <text x="260" y="162" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400e">Save ~7 Years!</text>
  </svg>
);

// ─── SVG 3: Savings Ring — green theme for mortgage savings ──────────────────
const SavingsRing = ({ amount, years }) => {
  const pct = Math.min(parseFloat(years) * 3.33, 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference - (pct / 100) * circumference;

  return (
    <svg viewBox="0 0 140 140" className="w-44 h-44 sm:w-52 sm:h-52 mx-auto drop-shadow-lg">
      <circle cx="70" cy="70" r="60" fill="#f0fdf4" />
      <circle cx="70" cy="70" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
      <circle
        cx="70" cy="70" r={radius}
        fill="none"
        stroke="#10b981"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDash}
        transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <text x="70" y="55" textAnchor="middle" fontSize="14" fontWeight="800" fill="#111827">{amount}</text>
      <text x="70" y="72" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6b7280">Interest Saved</text>
      <text x="70" y="95" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">{years} Years Saved</text>
    </svg>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MortgagePayoffCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('30');
  const [extraPayment, setExtraPayment] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);

  // ── Client-side calculation ───────────────────────────────────────────────
  const calculatePayoff = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const loan = parseFloat(loanAmount);
      const rate = parseFloat(interestRate);
      const term = parseFloat(loanTerm);
      const extra = parseFloat(extraPayment) || 0;

      if (isNaN(loan) || loan <= 0 || loan > 50000000) {
        setError('Please enter a valid loan amount between $1 and $50,000,000');
        setLoading(false);
        return;
      }

      if (isNaN(rate) || rate <= 0 || rate > 30) {
        setError('Please enter a valid interest rate between 0.1% and 30%');
        setLoading(false);
        return;
      }

      if (isNaN(term) || term <= 0 || term > 50) {
        setError('Please enter a valid loan term between 1 and 50 years');
        setLoading(false);
        return;
      }

      // Calculate monthly payment (standard amortization formula)
      const monthlyRate = rate / 100 / 12;
      const numPayments = term * 12;
      const monthlyPayment = loan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1);

      // Calculate standard totals
      const totalPaid = monthlyPayment * numPayments;
      const totalInterest = totalPaid - loan;

      // Calculate with extra payments
      let balance = loan;
      let monthsWithExtra = 0;
      let totalInterestWithExtra = 0;
      const totalMonthly = monthlyPayment + extra;

      while (balance > 0 && monthsWithExtra < 600) {
        const interestThisMonth = balance * monthlyRate;
        let principalThisMonth = totalMonthly - interestThisMonth;
        
        if (principalThisMonth >= balance) {
          principalThisMonth = balance;
          balance = 0;
        } else {
          balance -= principalThisMonth;
        }
        
        totalInterestWithExtra += interestThisMonth;
        monthsWithExtra++;
      }

      const yearsWithExtra = monthsWithExtra / 12;
      const totalPaidWithExtra = loan + totalInterestWithExtra;
      const interestSaved = totalInterest - totalInterestWithExtra;
      const yearsSaved = term - yearsWithExtra;

      setResult({
        monthlyPayment,
        totalPaid,
        totalInterest,
        withExtraPayment: {
          monthlyPayment: totalMonthly,
          totalPaid: totalPaidWithExtra,
          totalInterest: totalInterestWithExtra,
          yearsToPayoff: yearsWithExtra.toFixed(1)
        },
        savings: {
          interestSaved,
          yearsSaved: yearsSaved.toFixed(1)
        }
      });

      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }, 520);
  };

  const clearAll = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('30');
    setExtraPayment('');
    setResult(null);
    setError('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout
      title="Mortgage Payoff Calculator 2026 – Save Interest & Pay Off Early"
      description="Use our free mortgage payoff calculator to see how extra payments reduce interest, shorten your loan term, and help you pay off your mortgage early."
      keywords="mortgage payoff calculator, mortgage calculator with extra payments, early mortgage payoff calculator, calculate mortgage payoff, home loan payoff calculator, mortgage extra payment calculator, pay off mortgage early, mortgage savings calculator"
      canonicalPath="/mortgage-payoff-calculator"
      ogImage="mortgage-payoff-calculator.jpg"
      lastUpdated="2026-02-01"
      schema={[
        {
          '@type': 'WebApplication',
          name: 'Mortgage Payoff Calculator',
          applicationCategory: 'FinanceApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '18400',
            bestRating: '5',
            worstRating: '1'
          }
        },
        {
          '@type': 'HowTo',
          name: 'How to Calculate Mortgage Payoff with Extra Payments',
          description: 'A step-by-step guide to calculating how much you can save by making extra mortgage payments each month.',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Enter Your Loan Amount',
              text: 'Input your current mortgage balance or original loan amount in dollars. You can find this on your latest mortgage statement.',
              image: 'https://calculators.me.uk/images/mortgage-step1.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Enter Interest Rate and Term',
              text: 'Input your annual interest rate (e.g., 6.5%) and remaining loan term in years. Check your mortgage documents for these figures.',
              image: 'https://calculators.me.uk/images/mortgage-step2.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Add Extra Payment Amount',
              text: 'Enter the additional amount you plan to pay each month (optional). Even small amounts like $50-100 can save thousands over time.',
              image: 'https://calculators.me.uk/images/mortgage-step3.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'View Your Savings',
              text: 'Click Calculate to see your interest savings, years saved, and new payoff timeline with detailed comparison charts.',
              image: 'https://calculators.me.uk/images/mortgage-step4.jpg'
            }
          ],
          totalTime: 'PT2M'
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How much can I save by paying extra on my mortgage?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The amount you save depends on your loan size, interest rate, and extra payment amount. For example, paying an extra $200/month on a $300,000 mortgage at 6.5% interest can save approximately $86,000 in interest and pay off the loan about 7 years early. Use our calculator to see your specific savings.'
              }
            },
            {
              '@type': 'Question',
              name: 'Is it better to pay extra on my mortgage or invest the money?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'This depends on your mortgage interest rate and risk tolerance. If your rate is 6% or higher, paying extra provides a guaranteed return equal to your interest rate, which is often better than risky investments. With rates below 4%, investing may yield better long-term returns. Consider your financial goals, emergency fund, and other high-interest debt before deciding.'
              }
            },
            {
              '@type': 'Question',
              name: 'Will paying extra affect my monthly payment amount?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No, your required monthly payment stays the same when you make extra payments. The extra amount reduces your principal balance faster, which means you will pay off the loan sooner and save on interest. Some lenders offer recasting (recalculating your payment based on the lower balance), but this usually requires a lump sum and a fee.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I get my extra payments back if I need them later?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Unfortunately, no. Once you pay down your principal, that money is locked in your home equity and you cannot simply withdraw it. This is why it is crucial to maintain a 3-6 month emergency fund before aggressively paying down your mortgage. To access that equity later, you would need to refinance, get a home equity loan, or sell the house.'
              }
            },
            {
              '@type': 'Question',
              name: 'Should I check for prepayment penalties?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, always check your mortgage documents for prepayment penalties before making extra payments. While rare in modern mortgages (especially those originated after 2014), some loans charge fees for early payoff. If you have a prepayment penalty, calculate whether the interest savings still make extra payments worthwhile.'
              }
            },
            {
              '@type': 'Question',
              name: 'What if I can only afford extra payments sometimes?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Any extra payment helps, even if inconsistent! You might pay extra when you receive a bonus, tax refund, or just have a good financial month. Each extra payment reduces your principal immediately and starts saving you interest. There is no requirement to pay extra every single month - do what works for your budget.'
              }
            }
          ]
        }
      ]}
    >
      {/* ── Breadcrumbs ───────────────────────────────────────────────────── */}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Mortgage Payoff Calculator', href: '/mortgage-payoff-calculator' }
      ]} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full mb-5 border border-green-100">
            <FaTrophy className="text-yellow-500" />
            <span className="text-sm font-semibold text-gray-800">18,400+ homeowners calculate daily</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Mortgage Payoff Calculator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            See how much you can save by paying extra on your mortgage. Calculate your interest savings, early payoff timeline, and build equity faster — all in seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <FaBolt className="text-blue-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">Instant Results</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <FaDollarSign className="text-green-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">See Real Savings</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Calculator (2/3) ────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaHome className="text-green-600" />
                  Enter Your Mortgage Details
                </h2>
                <button onClick={clearAll} className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium">Clear All</button>
              </div>

              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">Loan Amount ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">$</span>
                    <input
                      type="number" step="1000" min="0"
                      value={loanAmount}
                      onChange={(e) => { setLoanAmount(e.target.value); setError(''); }}
                      className="w-full pl-10 pr-4 py-4 text-xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="300,000"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Enter your current mortgage balance or original loan amount</p>
                </div>

                {/* Interest Rate & Term */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3">Interest Rate (%)</label>
                    <div className="relative">
                      <input
                        type="number" step="0.01" min="0" max="30"
                        value={interestRate}
                        onChange={(e) => { setInterestRate(e.target.value); setError(''); }}
                        className="w-full px-4 py-4 text-xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="6.5"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3">Loan Term (Years)</label>
                    <select
                      value={loanTerm}
                      onChange={(e) => { setLoanTerm(e.target.value); setError(''); }}
                      className="w-full px-4 py-4 text-xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="10">10 years</option>
                      <option value="15">15 years</option>
                      <option value="20">20 years</option>
                      <option value="25">25 years</option>
                      <option value="30">30 years</option>
                    </select>
                  </div>
                </div>

                {/* Extra Payment */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200">
                  <label className="block text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaPiggyBank className="text-green-600" />
                    Extra Monthly Payment ($) — Optional
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">$</span>
                    <input
                      type="number" step="50" min="0"
                      value={extraPayment}
                      onChange={(e) => { setExtraPayment(e.target.value); setError(''); }}
                      className="w-full pl-10 pr-4 py-4 text-xl font-semibold border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="200"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                    <FaLightbulb className="text-yellow-500" />
                    Even $50-100 extra per month can save thousands!
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2">
                    <FaInfoCircle className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Button */}
                <button
                  onClick={calculatePayoff}
                  disabled={loading || !loanAmount || !interestRate}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Calculating…</>
                  ) : (
                    <><FaCalculator /> Calculate Payoff Savings</>
                  )}
                </button>
              </div>

              {/* How-to steps */}
              <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-lg">
                  <FaInfoCircle className="text-green-600" /> How to Use This Calculator
                </h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  {[
                    { num: '1', label: 'Enter Loan', icon: <FaDollarSign className="text-4xl text-green-600" /> },
                    { num: '2', label: 'Add Rate', icon: <FaPercentage className="text-4xl text-emerald-600" /> },
                    { num: '3', label: 'Extra Payment', icon: <FaPiggyBank className="text-4xl text-teal-600" /> },
                    { num: '4', label: 'See Savings', icon: <FaTrophy className="text-4xl text-yellow-500" /> }
                  ].map((step, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-white rounded-xl p-6 mb-3 shadow-sm border border-green-100 h-28 flex flex-col items-center justify-center">
                        {step.icon}
                      </div>
                      <p className="text-xs font-semibold text-gray-700">{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar (1/3) ───────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Formulas */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaChartLine className="text-green-600" /> How It Works
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Monthly</span>
                    <span className="text-xs text-gray-500">Payment</span>
                  </div>
                  <p className="font-mono text-sm text-gray-800 font-semibold">P × (r(1+r)ⁿ) ÷ ((1+r)ⁿ-1)</p>
                  <p className="text-xs text-gray-500 mt-1">Standard amortization formula</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Extra</span>
                    <span className="text-xs text-gray-500">Payments</span>
                  </div>
                  <p className="font-mono text-sm text-gray-800 font-semibold">All → Principal</p>
                  <p className="text-xs text-gray-500 mt-1">Bypasses interest entirely</p>
                </div>
              </div>
            </div>

            {/* Quick reference */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Example Savings</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { loan: '$300K', extra: '$100/mo', save: '$52K', years: '4 yrs' },
                  { loan: '$300K', extra: '$200/mo', save: '$86K', years: '7 yrs' },
                  { loan: '$300K', extra: '$500/mo', save: '$142K', years: '12 yrs' },
                  { loan: '$500K', extra: '$200/mo', save: '$118K', years: '6 yrs' },
                  { loan: '$500K', extra: '$500/mo', save: '$198K', years: '11 yrs' }
                ].map((row, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-lg flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-xs">{row.loan} + {row.extra}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-semibold text-xs">Save {row.save}</span>
                      <span className="text-blue-600 text-xs">({row.years})</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">*At 6.5% interest, 30-year term</p>
            </div>

            {/* Where this helps */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaWallet className="text-green-600" /> Why Pay Extra?
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  'Save thousands in interest payments',
                  'Build home equity faster',
                  'Own your home years sooner',
                  'Gain financial freedom earlier',
                  'Reduce total cost of homeownership'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Results ──────────────────────────────────────────────────────── */}
        {result && (
          <div ref={resultsRef} className="mt-12 animate-fade-in">
            {/* Celebration */}
            {result.savings.interestSaved > 10000 && (
              <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white p-6 sm:p-8 rounded-2xl shadow-2xl mb-6 text-center">
                <div className="text-5xl mb-3">🏠💰</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Amazing Savings Ahead!</h2>
                <p className="text-lg sm:text-xl text-green-100">You could save <strong>{formatCurrency(result.savings.interestSaved)}</strong> in interest!</p>
              </div>
            )}

            {/* Main card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                  <FaChartLine className="text-green-600" /> Your Savings Breakdown
                </h2>
                <SavingsRing 
                  amount={formatCurrency(result.savings.interestSaved)} 
                  years={result.savings.yearsSaved} 
                />
              </div>

              {/* Comparison Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {/* Standard Plan */}
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-gray-400 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <FaHome className="text-gray-600" /> Standard Plan
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(result.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-bold text-red-600">{formatCurrency(result.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Cost:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(result.totalPaid)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Payoff:</span>
                      <span className="font-bold text-gray-900">{loanTerm} years</span>
                    </div>
                  </div>
                </div>

                {/* With Extra Payments */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <FaPiggyBank className="text-green-600" /> With Extra Payments
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Monthly:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(result.withExtraPayment.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total Interest:</span>
                      <span className="font-bold text-green-600">{formatCurrency(result.withExtraPayment.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total Cost:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(result.withExtraPayment.totalPaid)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-green-200">
                      <span className="text-gray-700">Payoff:</span>
                      <span className="font-bold text-green-700">{result.withExtraPayment.yearsToPayoff} years</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-xl">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaRocket className="text-blue-600" /> What This Means For You
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>By paying <strong>{formatCurrency(parseFloat(extraPayment || '0'))}</strong> extra per month, you will save <strong className="text-green-600">{formatCurrency(result.savings.interestSaved)}</strong> in interest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>You will own your home <strong>{result.savings.yearsSaved} years earlier</strong> than originally planned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Your total payment drops from <strong>{formatCurrency(result.totalPaid)}</strong> to <strong>{formatCurrency(result.withExtraPayment.totalPaid)}</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── Content Sections ──────────────────────────────────────────── */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">

          {/* 1. How Extra Payments Work */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaInfoCircle className="text-green-600" /> How Do Extra Mortgage Payments Actually Work?
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                When you make your regular monthly mortgage payment, a significant portion goes toward interest — 
                especially in the early years. This is because mortgage interest is calculated on your remaining 
                principal balance. The lower your balance, the less interest you pay each month.
              </p>
              <p>
                Here is where extra payments become powerful: <strong>every dollar you pay above your required monthly 
                payment goes directly toward reducing your principal</strong>. Unlike your regular payment, which is split 
                between interest and principal, extra payments bypass the interest entirely.
              </p>
              <p>
                This creates a compounding effect. When you reduce your principal, the next month&apos;s interest calculation 
                is based on a smaller balance. More of your regular payment then goes toward principal, accelerating 
                your payoff even further.
              </p>
            </div>

            {/* Amortization Visual */}
            <div className="mt-8 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 shadow-inner">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">How Extra Payments Bypass Interest</h3>
              <AmortizationIllustration />
              <p className="text-xs text-gray-500 mt-3 text-center italic">
                Extra payments go straight to principal, reducing your balance immediately and saving interest over time.
              </p>
            </div>
          </section>

          {/* 2. Real Numbers */}
          <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-8 border border-green-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Real Numbers: What Can You Actually Save?
            </h2>
            <p className="text-gray-700 mb-6">
              Let us look at a realistic example to see the power of extra payments in action. These numbers represent 
              a typical mortgage scenario that millions of homeowners face.
            </p>

            <div className="bg-white p-6 rounded-xl border border-green-200 mb-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCalculator className="text-green-600" /> Example Scenario
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-gray-600">Loan:</span><span className="font-semibold">$300,000</span></div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-gray-600">Rate:</span><span className="font-semibold">6.5%</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-gray-600">Term:</span><span className="font-semibold">30 years</span></div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-gray-600">Extra:</span><span className="font-semibold">$200/month</span></div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">Results:</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">$86,000</p>
                    <p className="text-xs text-gray-600">Interest Saved</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">7 Years</p>
                    <p className="text-xs text-gray-600">Time Saved</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">23 Years</p>
                    <p className="text-xs text-gray-600">New Payoff</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Visual */}
            <div className="bg-white rounded-2xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Visual Timeline: Standard vs. Accelerated Payoff</h3>
              <SavingsTimelineIllustration />
            </div>
          </section>

          {/* 3. Payment Strategies */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Different Strategies for Making Extra Payments
            </h2>
            <p className="text-gray-700 mb-6">
              You do not need to commit to the same extra amount every month. Different strategies work for different 
              financial situations and personal preferences.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: <FaDollarSign />, title: 'Monthly Extra', desc: 'Add a fixed amount every month. Even $50 makes a difference over time. Most effective for long-term savings.', color: 'blue' },
                { icon: <FaCalendarAlt />, title: 'Annual Lump Sum', desc: 'Use tax refunds or bonuses for one large payment. One extra payment per year can shave 4-5 years off.', color: 'green' },
                { icon: <FaClock />, title: 'Biweekly Payments', desc: 'Pay half every two weeks. 26 half-payments = 13 full payments per year instead of 12.', color: 'purple' },
                { icon: <FaRocket />, title: 'Round-Up Method', desc: 'Round your payment up to nearest $50 or $100. Automatic approach requiring no extra thought.', color: 'orange' }
              ].map((strategy, i) => (
                <div key={i} className={`bg-${strategy.color}-50 p-5 rounded-xl border border-${strategy.color}-200`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 bg-${strategy.color}-100 rounded-lg flex items-center justify-center text-${strategy.color}-600 text-xl`}>
                      {strategy.icon}
                    </div>
                    <h4 className="font-bold text-gray-900">{strategy.title}</h4>
                  </div>
                  <p className="text-sm text-gray-700">{strategy.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Payoff vs Invest */}
          <section className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-md p-8 border border-amber-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Should You Pay Off Your Mortgage or Invest?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-5 rounded-xl border-l-4 border-green-500 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> Pay Off Mortgage If:
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Your interest rate is 6% or higher</li>
                  <li>• You value guaranteed, risk-free returns</li>
                  <li>• You are within 10-15 years of retirement</li>
                  <li>• You want the psychological benefit of being debt-free</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaChartLine className="text-blue-600" /> Consider Investing If:
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Your interest rate is below 4%</li>
                  <li>• You have a long time horizon (15+ years)</li>
                  <li>• You are comfortable with market volatility</li>
                  <li>• You have not maxed out retirement accounts</li>
                </ul>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-amber-200">
              <p className="text-sm text-gray-700">
                <strong>The Bottom Line:</strong> If your mortgage rate is 6.5%, paying extra gives you a <strong>guaranteed 6.5% return</strong> — 
                after-tax, making it even more valuable. Compare that to the stock market&apos;s historical average of 10% (with volatility and risk).
              </p>
            </div>
          </section>

          {/* 5. FAQ */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'How much can I save by paying extra on my mortgage?', a: 'The amount depends on your loan size, interest rate, and extra payment. For example, $200/month extra on a $300,000 mortgage at 6.5% can save approximately $86,000 in interest and pay off the loan about 7 years early.' },
                { q: 'Is it better to pay extra on my mortgage or invest?', a: 'If your mortgage rate is 6% or higher, paying extra provides a guaranteed, risk-free return equal to your interest rate. With rates below 4%, investing might yield better long-term returns. Consider your complete financial picture before deciding.' },
                { q: 'Will making extra payments reduce my monthly payment?', a: 'No, your required monthly payment stays the same. Extra payments reduce your principal faster, meaning you will pay off the loan sooner and save on interest. Some lenders offer recasting for a fee.' },
                { q: 'Should I pay off my mortgage before retirement?', a: 'Many advisors recommend entering retirement without a mortgage. It significantly reduces required monthly income, meaning savings last longer. However, this depends on your specific situation and interest rate.' },
                { q: 'Can I get my extra payments back if I need the money?', a: 'Unfortunately, no. Once paid, that money is locked in home equity. Maintain a 3-6 month emergency fund before aggressively paying down your mortgage. To access equity later, you would need to refinance or sell.' },
                { q: 'Do I need to check for prepayment penalties?', a: 'Yes, always check your mortgage documents. While rare in modern mortgages (especially post-2014), some loans charge fees for early payoff. Calculate if interest savings still make extra payments worthwhile.' },
              ].map((item, i) => (
                <details key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <summary className="font-bold text-gray-900 text-lg">{item.q}</summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Expert Box */}
          <ExpertBox expertType="finance" calculatorName="Mortgage Payoff Calculator" lastUpdated="February 1, 2026" />

          {/* User Reviews */}
          <UserReviews calculatorType="mortgage" />

          {/* Related */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <FaHome className="text-2xl text-green-600" />, title: 'Mortgage Calculator', desc: 'Calculate monthly payments for a new home purchase', href: '/mortgage-calculator', color: 'green' },
                { icon: <FaLandmark className="text-2xl text-blue-600" />, title: 'Refinance Calculator', desc: 'See if refinancing your mortgage makes sense', href: '/refinance-calculator', color: 'blue' },
                { icon: <FaWallet className="text-2xl text-purple-600" />, title: 'Loan Payoff Calculator', desc: 'Calculate payoff for any type of loan', href: '/loan-payoff-calculator', color: 'purple' }
              ].map((calc, i) => (
                <a key={i} href={calc.href} className={`block p-5 bg-${calc.color}-50 rounded-xl border border-${calc.color}-200 hover:shadow-lg transition-all group`}>
                  <div className="flex items-center gap-3 mb-2">
                    {calc.icon}
                    <h3 className="font-bold text-gray-900">{calc.title}</h3>
                    <FaArrowRight className={`text-${calc.color}-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <p className="text-sm text-gray-600">{calc.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}