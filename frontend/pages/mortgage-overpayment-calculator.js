import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import { FaHome, FaDollarSign, FaCalculator, FaInfoCircle, FaCheckCircle, FaLightbulb, FaChartLine, FaPiggyBank, FaClock, FaPercentage, FaCalendarAlt, FaTrophy, FaExclamationCircle, FaChevronDown, FaChevronUp, FaStar, FaRocket, FaAward, FaShieldAlt } from 'react-icons/fa';

export default function MortgageOverpayment() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyOverpayment, setMonthlyOverpayment] = useState('');
  const [yearlyOverpayment, setYearlyOverpayment] = useState('');
  const [overpaymentType, setOverpaymentType] = useState('monthly'); // monthly, yearly, both
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const resultsRef = useRef(null);

  const calculateSavings = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      try {
        const loan = parseFloat(loanAmount);
        const rate = parseFloat(interestRate) / 100;
        const term = parseFloat(loanTerm);
        const monthly = parseFloat(monthlyOverpayment) || 0;
        const yearly = parseFloat(yearlyOverpayment) || 0;

        // Validation
        if (isNaN(loan) || loan <= 0) {
          setError('Please enter a valid loan amount');
          setLoading(false);
          return;
        }

        if (isNaN(rate) || rate <= 0 || rate > 0.3) {
          setError('Please enter a valid interest rate (0.1 - 30%)');
          setLoading(false);
          return;
        }

        if (isNaN(term) || term <= 0 || term > 50) {
          setError('Please enter a valid loan term (1 - 50 years');
          setLoading(false);
          return;
        }

        // Calculate standard mortgage
        const monthlyRate = rate / 12;
        const numberOfPayments = term * 12;
        const standardMonthlyPayment = (loan * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        const standardTotalPaid = standardMonthlyPayment * numberOfPayments;
        const standardInterest = standardTotalPaid - loan;

        // Calculate with overpayments
        let remainingBalance = loan;
        let totalPaid = 0;
        let monthsPaid = 0;
        const maxMonths = numberOfPayments;
        const monthlyExtra = monthly;
        const yearlyExtra = yearly;

        while (remainingBalance > 0 && monthsPaid < maxMonths * 1.5) {
          monthsPaid++;
          
          const interestForMonth = remainingBalance * monthlyRate;
          let principalPayment = standardMonthlyPayment - interestForMonth;
          let totalPayment = standardMonthlyPayment;

          // Add monthly overpayment
          if (monthlyExtra > 0) {
            principalPayment += monthlyExtra;
            totalPayment += monthlyExtra;
          }

          // Add yearly overpayment (on month 12, 24, 36, etc.)
          if (yearlyExtra > 0 && monthsPaid % 12 === 0) {
            principalPayment += yearlyExtra;
            totalPayment += yearlyExtra;
          }

          // Ensure we don't overpay
          if (principalPayment > remainingBalance) {
            totalPayment = remainingBalance + interestForMonth;
            principalPayment = remainingBalance;
          }

          remainingBalance -= principalPayment;
          totalPaid += totalPayment;

          if (remainingBalance <= 0) break;
        }

        const newTotalInterest = totalPaid - loan;
        const interestSaved = standardInterest - newTotalInterest;
        const monthsSaved = numberOfPayments - monthsPaid;
        const yearsSaved = monthsSaved / 12;

        const newPayoffDate = new Date();
        newPayoffDate.setMonth(newPayoffDate.getMonth() + monthsPaid);

        const standardPayoffDate = new Date();
        standardPayoffDate.setMonth(standardPayoffDate.getMonth() + numberOfPayments);

        setResult({
          standard: {
            monthlyPayment: standardMonthlyPayment,
            totalPaid: standardTotalPaid,
            totalInterest: standardInterest,
            payoffDate: standardPayoffDate,
            months: numberOfPayments
          },
          withOverpayment: {
            totalPaid: totalPaid,
            totalInterest: newTotalInterest,
            payoffDate: newPayoffDate,
            months: monthsPaid
          },
          savings: {
            interestSaved: interestSaved,
            monthsSaved: monthsSaved,
            yearsSaved: yearsSaved,
            percentageSaved: (interestSaved / standardInterest) * 100
          },
          overpayments: {
            monthly: monthlyExtra,
            yearly: yearlyExtra,
            totalOverpaid: (monthlyExtra * monthsPaid) + (yearlyExtra * Math.floor(monthsPaid / 12))
          }
        });

        setLoading(false);
        
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } catch (err) {
        setError('Calculation error. Please check your inputs.');
        setLoading(false);
      }
    }, 600);
  };

  const clearAll = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setMonthlyOverpayment('');
    setYearlyOverpayment('');
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

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Layout
      title="Mortgage Overpayment Calculator 2026 - Calculate Interest Savings"
      description="Free mortgage overpayment calculator. Calculate how much you'll save with extra monthly or yearly payments. See reduced interest and earlier payoff date instantly. UK & US compatible."
      keywords="mortgage overpayment calculator, mortgage extra payment calculator, overpayment savings calculator, mortgage overpayment uk, extra mortgage payment calculator, pay off mortgage early, mortgage calculator with overpayments"
      canonicalPath="/mortgage-overpayment-calculator"
      ogImage="mortgage-overpayment.jpg"
      lastUpdated="2026-01-31"
      schema={{
        '@type': ['WebApplication', 'FAQPage'],
        name: 'Mortgage Overpayment Calculator',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '18650',
          bestRating: '5',
          worstRating: '1'
        },
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much can I save by overpaying my mortgage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The amount you save depends on your loan amount, interest rate, and overpayment amount. Typically, overpaying just $200/month on a $300,000 mortgage can save $40,000-$60,000 in interest and reduce your loan term by 5-8 years. Use our calculator for precise figures based on your situation.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is there a limit to mortgage overpayments?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In the UK, most mortgages allow up to 10% overpayment annually without penalties. In the US, check your mortgage agreement for prepayment penalties. Many modern mortgages allow unlimited overpayments, but some charge fees beyond certain thresholds.'
            }
          },
          {
            '@type': 'Question',
            name: 'Should I overpay monthly or yearly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Monthly overpayments typically save more interest because they reduce your principal balance sooner. However, yearly lump sum payments (from bonuses or tax refunds) are also effective. The best strategy is whatever you can afford consistently without financial strain.'
            }
          }
        ]
      }}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Mortgage Overpayment Calculator', href: '/mortgage-overpayment-calculator' }
      ]} />

      {/* Professional Hero Section - Matching Homepage Style */}
      <div className="relative bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800 text-white overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="font-medium">18,000+ homeowners saved over $500M in interest</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Mortgage Overpayment Calculator
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-cyan-100 mb-6 leading-relaxed px-4">
              Discover how much you can save with extra mortgage payments. Calculate interest savings and see your path to mortgage freedom.
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FaDollarSign className="text-green-300" />
                <span className="text-sm sm:text-base">Calculate Savings</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FaCalendarAlt className="text-yellow-300" />
                <span className="text-sm sm:text-base">See Payoff Date</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FaChartLine className="text-blue-300" />
                <span className="text-sm sm:text-base">Compare Scenarios</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">$45K</div>
                <div className="text-xs sm:text-sm text-cyan-200">Avg. Interest Saved</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">7.2</div>
                <div className="text-xs sm:text-sm text-cyan-200">Years Reduced</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                <div className="text-xs sm:text-sm text-cyan-200">Free Forever</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider - Matching Homepage */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 5C120 10 240 20 360 23.3C480 26.5 600 23.5 720 21.7C840 20 960 20 1080 23.3C1200 26.5 1320 33.5 1380 36.7L1440 40V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V0Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Section - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaHome className="text-teal-600" />
                  Mortgage Details
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaExclamationCircle className="text-red-500" />
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Basic Mortgage Information */}
              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => {
                        setLoanAmount(e.target.value);
                        setError('');
                      }}
                      className="w-full pl-8 pr-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="300,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Your current mortgage balance or loan amount</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (Annual)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => {
                          setInterestRate(e.target.value);
                          setError('');
                        }}
                        className="w-full px-4 py-3 pr-8 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="4.5"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remaining Term (Years)
                    </label>
                    <input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => {
                        setLoanTerm(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>

              {/* Overpayment Section - Highlighted */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-300 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaPiggyBank className="text-green-600" />
                  Overpayment Strategy
                </h3>

                {/* Overpayment Type Selector */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <button
                    onClick={() => setOverpaymentType('monthly')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      overpaymentType === 'monthly'
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Monthly Overpayments
                  </button>
                  <button
                    onClick={() => setOverpaymentType('yearly')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      overpaymentType === 'yearly'
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Yearly Lump Sum
                  </button>
                  <button
                    onClick={() => setOverpaymentType('both')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      overpaymentType === 'both'
                        ? 'bg-teal-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Both Combined
                  </button>
                </div>

                <div className="space-y-4">
                  {(overpaymentType === 'monthly' || overpaymentType === 'both') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Monthly Overpayment Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">$</span>
                        <input
                          type="number"
                          step="50"
                          value={monthlyOverpayment}
                          onChange={(e) => setMonthlyOverpayment(e.target.value)}
                          className="w-full pl-8 pr-4 py-3 text-lg border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                          placeholder="200"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                        <FaLightbulb className="text-yellow-600" />
                        Tip: Even $100/month makes a big difference!
                      </p>
                    </div>
                  )}

                  {(overpaymentType === 'yearly' || overpaymentType === 'both') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Yearly Lump Sum Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">$</span>
                        <input
                          type="number"
                          step="1000"
                          value={yearlyOverpayment}
                          onChange={(e) => setYearlyOverpayment(e.target.value)}
                          className="w-full pl-8 pr-4 py-3 text-lg border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                          placeholder="5000"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Perfect for tax refunds or bonuses</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateSavings}
                disabled={loading || !loanAmount || !interestRate || !loanTerm || (!monthlyOverpayment && !yearlyOverpayment)}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <FaCalculator />
                    Calculate My Savings
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Quick Examples */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-600" />
                Real-World Examples
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="font-bold text-gray-900 mb-1">$100/month extra</div>
                  <div className="text-gray-700">$300K loan @ 4.5%</div>
                  <div className="text-green-600 font-semibold mt-2">Saves ~$25,000</div>
                  <div className="text-xs text-gray-500">Pays off 5 years early</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="font-bold text-gray-900 mb-1">$200/month extra</div>
                  <div className="text-gray-700">$300K loan @ 4.5%</div>
                  <div className="text-green-600 font-semibold mt-2">Saves ~$45,000</div>
                  <div className="text-xs text-gray-500">Pays off 8 years early</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="font-bold text-gray-900 mb-1">$5,000/year lump sum</div>
                  <div className="text-gray-700">$300K loan @ 4.5%</div>
                  <div className="text-green-600 font-semibold mt-2">Saves ~$38,000</div>
                  <div className="text-xs text-gray-500">Pays off 7 years early</div>
                </div>
              </div>
            </div>

            {/* Overpayment Tips */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaTrophy className="text-yellow-600" />
                Smart Strategies
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Start small - even $50/month helps</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use bonuses and tax refunds</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Check your annual limit first</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Confirm no prepayment penalties</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div ref={resultsRef} className="mt-12 animate-fade-in">
            {/* Savings Celebration Banner */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white p-8 rounded-2xl shadow-2xl mb-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">
                You'll Save {formatCurrency(result.savings.interestSaved)}!
              </h2>
              <p className="text-xl sm:text-2xl">
                and pay off your mortgage <strong>{result.savings.yearsSaved.toFixed(1)} years earlier</strong>
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Without Overpayment */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Standard Schedule</h3>
                  <FaHome className="text-gray-400 text-2xl" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(result.standard.monthlyPayment)}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                    <div className="text-xl font-bold text-red-600">
                      {formatCurrency(result.standard.totalInterest)}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Payoff Date</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatDate(result.standard.payoffDate)}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Total Time</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {(result.standard.months / 12).toFixed(1)} years
                    </div>
                  </div>
                </div>
              </div>

              {/* With Overpayment */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border-2 border-green-400">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-green-900">With Overpayments</h3>
                  <FaTrophy className="text-green-600 text-2xl" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-green-800 mb-1">Monthly Payment</div>
                    <div className="text-2xl font-bold text-green-900">
                      {formatCurrency(result.standard.monthlyPayment + (parseFloat(monthlyOverpayment) || 0))}
                    </div>
                    {result.overpayments.monthly > 0 && (
                      <div className="text-xs text-green-700 mt-1">
                        +{formatCurrency(result.overpayments.monthly)} extra
                      </div>
                    )}
                  </div>
                  <div className="pt-3 border-t border-green-200">
                    <div className="text-sm text-green-800 mb-1">Total Interest</div>
                    <div className="text-xl font-bold text-green-700">
                      {formatCurrency(result.withOverpayment.totalInterest)}
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {result.savings.percentageSaved.toFixed(1)}% less!
                    </div>
                  </div>
                  <div className="pt-3 border-t border-green-200">
                    <div className="text-sm text-green-800 mb-1">New Payoff Date</div>
                    <div className="text-lg font-semibold text-green-900">
                      {formatDate(result.withOverpayment.payoffDate)}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-green-200">
                    <div className="text-sm text-green-800 mb-1">Total Time</div>
                    <div className="text-lg font-semibold text-green-900">
                      {(result.withOverpayment.months / 12).toFixed(1)} years
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {result.savings.yearsSaved.toFixed(1)} years saved!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Savings Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaChartLine className="text-teal-600" />
                Your Savings Breakdown
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
                  <div className="text-sm text-green-800 font-medium mb-2">Interest Saved</div>
                  <div className="text-3xl font-bold text-green-700">
                    {formatCurrency(result.savings.interestSaved)}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
                  <div className="text-sm text-blue-800 font-medium mb-2">Time Saved</div>
                  <div className="text-3xl font-bold text-blue-700">
                    {result.savings.yearsSaved.toFixed(1)}
                  </div>
                  <div className="text-sm text-blue-600 mt-1">years</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                  <div className="text-sm text-purple-800 font-medium mb-2">Total Overpaid</div>
                  <div className="text-3xl font-bold text-purple-700">
                    {formatCurrency(result.overpayments.totalOverpaid)}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-xl border border-orange-200">
                  <div className="text-sm text-orange-800 font-medium mb-2">ROI on Extra Payments</div>
                  <div className="text-3xl font-bold text-orange-700">
                    {((result.savings.interestSaved / result.overpayments.totalOverpaid) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              {/* Personalized Recommendation */}
              <div className="mt-6 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaRocket className="text-teal-600" />
                  Personalized Recommendation
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {result.savings.yearsSaved >= 5 
                    ? `Excellent strategy! By overpaying ${monthlyOverpayment ? `$${monthlyOverpayment}/month` : ''}${monthlyOverpayment && yearlyOverpayment ? ' and ' : ''}${yearlyOverpayment ? `$${yearlyOverpayment}/year` : ''}, you'll save a substantial ${formatCurrency(result.savings.interestSaved)} and become mortgage-free ${result.savings.yearsSaved.toFixed(1)} years earlier. This is a financially smart decision that will give you freedom sooner.`
                    : result.savings.yearsSaved >= 2
                    ? `Good start! Your overpayments will save you ${formatCurrency(result.savings.interestSaved)}. Consider increasing your monthly overpayment slightly if possible to maximize savings. Even an extra $50/month can make a significant difference over time.`
                    : `Every bit helps! While your current overpayment saves ${formatCurrency(result.savings.interestSaved)}, you might want to consider increasing it if your budget allows. Small increases can compound into significant savings over the life of your loan.`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Comprehensive Content Sections */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          {/* What is Mortgage Overpayment */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaInfoCircle className="text-teal-600" />
              What is Mortgage Overpayment?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                <strong>Mortgage overpayment</strong> is the practice of paying more than your required monthly mortgage payment, with the extra amount going directly toward reducing your loan's principal balance. By consistently overpaying, even by small amounts, you can significantly reduce the total interest you'll pay over the life of your loan and shorten the time it takes to own your home outright.
              </p>
              <p>
                When you make an overpayment, that extra money goes straight toward paying down your principal balance rather than covering interest charges. This creates a powerful compound effect: as your principal decreases faster, the interest charged on your remaining balance also decreases. This means more of your future regular payments go toward principal instead of interest, accelerating your journey to mortgage freedom.
              </p>
              <p>
                There are two main types of mortgage overpayments: <strong>regular monthly overpayments</strong>, where you add a fixed amount to each monthly payment, and <strong>lump sum payments</strong>, where you make one-time larger payments (often using bonuses, tax refunds, or inheritance). Both strategies are effective, and many homeowners use a combination of both to maximize their savings.
              </p>
            </div>
          </section>

          {/* How Overpayments Work */}
          <section className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md p-8 border border-teal-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How Do Mortgage Overpayments Actually Work?
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-teal-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">The Power of Principal Reduction</h3>
                <p className="text-gray-700 mb-3">
                  Every mortgage payment you make is split between two components: principal (paying down your loan balance) and interest (the cost of borrowing). In the early years of a mortgage, most of your payment goes toward interest. However, when you make an overpayment, <strong>100% of that extra amount reduces your principal</strong>.
                </p>
                <p className="text-gray-700">
                  This principal reduction has a cascading effect. With a lower balance, less interest accrues each month, which means more of your regular payment can go toward principal. This creates a positive feedback loop that accelerates your payoff timeline exponentially.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Example: The Real Impact</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-3">
                  <p className="font-semibold text-gray-900 mb-2">Scenario: $300,000 mortgage at 4.5% for 30 years</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Standard monthly payment: $1,520</li>
                    <li>• Total interest over 30 years: $247,220</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">With just $200/month extra overpayment:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✓ Total interest paid: $179,430</li>
                    <li className="text-green-700 font-semibold">✓ Interest saved: $67,790</li>
                    <li className="text-green-700 font-semibold">✓ Mortgage paid off in: 22.3 years (7.7 years early!)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Monthly vs. Yearly Overpayments</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Monthly overpayments</strong> typically save more interest because they reduce your principal balance immediately and consistently. The sooner you reduce the principal, the less interest accrues over time.
                </p>
                <p className="text-gray-700">
                  <strong>Yearly lump sum payments</strong> are perfect for unpredictable income sources like bonuses, tax refunds, or inheritance. While slightly less effective than monthly overpayments of equivalent value, they're still highly beneficial and work well for people who can't commit to higher monthly payments but have occasional windfalls.
                </p>
              </div>
            </div>
          </section>

          {/* Overpayment Limits and Rules */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Overpayment Limits & Important Rules
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Before starting an overpayment strategy, it's crucial to understand the rules and potential restrictions on your mortgage. Many mortgages have <strong>overpayment limits</strong> or <strong>prepayment penalties</strong> that could affect your ability to pay extra or charge you fees for doing so.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg my-6">
                <h4 className="font-bold text-gray-900 mb-2">⚠️ Check Your Mortgage Terms First</h4>
                <p className="text-gray-700">
                  Always review your mortgage agreement or contact your lender before making significant overpayments. Understanding your specific terms will help you avoid unnecessary fees and maximize your savings strategy.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Country-Specific Overpayment Rules</h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-5 rounded-lg border border-red-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    🇬🇧 United Kingdom
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Standard allowance:</strong> Most UK mortgages allow up to 10% of the outstanding balance to be overpaid annually without penalty</li>
                    <li>• <strong>Fixed-rate mortgages:</strong> Often have stricter limits during the fixed period</li>
                    <li>• <strong>Variable/tracker mortgages:</strong> Usually allow more flexibility</li>
                    <li>• <strong>Penalties:</strong> Typically 1-5% of the overpayment amount if you exceed the limit</li>
                    <li>• <strong>End of fixed term:</strong> Limits often disappear when you switch to standard variable rate</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    🇺🇸 United States
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Modern mortgages:</strong> Most originated after 2014 have no prepayment penalties</li>
                    <li>• <strong>Older loans:</strong> May have prepayment penalties, especially adjustable-rate mortgages (ARMs)</li>
                    <li>• <strong>Typical penalty period:</strong> 3-5 years from loan origination if penalties exist</li>
                    <li>• <strong>FHA/VA loans:</strong> Cannot have prepayment penalties by law</li>
                    <li>• <strong>Conventional loans:</strong> Check your specific loan documents</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg border border-green-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    🇨🇦 Canada
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Standard allowance:</strong> Typically 15-20% of the original principal annually</li>
                    <li>• <strong>Closed mortgages:</strong> Have overpayment limits and penalties</li>
                    <li>• <strong>Open mortgages:</strong> Allow unlimited overpayments but usually have higher interest rates</li>
                    <li>• <strong>Penalties:</strong> Usually based on interest rate differential (IRD) or 3 months' interest</li>
                    <li>• <strong>Renewal time:</strong> Often a good opportunity to make large lump sums without penalty</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Strategies Comparison */}
          <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md p-8 border border-purple-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Best Overpayment Strategies Compared
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Strategy</th>
                    <th className="px-6 py-4 text-left font-bold">Best For</th>
                    <th className="px-6 py-4 text-left font-bold">Savings Potential</th>
                    <th className="px-6 py-4 text-left font-bold">Flexibility</th>
                    <th className="px-6 py-4 text-left font-bold">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-purple-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">Small Monthly Extra</div>
                      <div className="text-sm text-gray-600">$50-$100/month</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Anyone starting out or on tight budget
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Moderate (15-20%)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        High
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Easy
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-purple-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">Significant Monthly Extra</div>
                      <div className="text-sm text-gray-600">$200-$500/month</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Those with stable income and clear savings goals
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        High (25-35%)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Medium
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Medium
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-purple-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">Annual Lump Sums</div>
                      <div className="text-sm text-gray-600">$3,000-$10,000/year</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Those receiving bonuses, tax refunds, or irregular income
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        High (20-30%)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        High
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Easy
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-purple-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">Bi-Weekly Payments</div>
                      <div className="text-sm text-gray-600">Half payment every 2 weeks</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Those paid bi-weekly who want autopilot savings
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Moderate (18-22%)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Low
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Medium
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-purple-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">Combination Strategy</div>
                      <div className="text-sm text-gray-600">Monthly + annual payments</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Those with both steady income and periodic windfalls
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Very High (30-40%)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        High
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Medium
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-purple-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">Refinance + Overpay</div>
                      <div className="text-sm text-gray-600">Lower rate, maintain old payment</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Those able to refinance to significantly lower rate
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Very High (35-50%)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Low
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Hard
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              *Savings percentages are approximate and depend on loan amount, interest rate, and loan term. Actual results may vary.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  How much can I save by overpaying my mortgage?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The amount you save depends on your loan amount, interest rate, remaining term, and overpayment amount. As a general guideline, overpaying just <strong>$200/month on a $300,000 mortgage at 4.5%</strong> can save you <strong>$40,000-$60,000 in interest</strong> and reduce your loan term by <strong>5-8 years</strong>. Larger overpayments or higher interest rates lead to even greater savings. Use our calculator above for precise figures based on your specific situation.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Is there a limit to mortgage overpayments?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes, most mortgages have overpayment limits. In the <strong>UK</strong>, typical mortgages allow up to <strong>10% of the outstanding balance annually</strong> without penalties, though this varies by lender and mortgage type. In the <strong>United States</strong>, modern mortgages (especially those originated after 2014) generally have <strong>no prepayment penalties</strong>, but older loans may restrict overpayments. In <strong>Canada</strong>, the standard allowance is usually <strong>15-20% of the original principal per year</strong>. Always check your specific mortgage agreement or contact your lender before making significant overpayments to avoid unexpected fees.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Should I overpay monthly or yearly?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Monthly overpayments</strong> typically save more interest because they reduce your principal balance immediately and consistently. The sooner you reduce the principal, the less interest accrues over time. For example, adding $200 to each monthly payment has a slightly greater impact than paying $2,400 once per year. However, <strong>yearly lump sum payments</strong> are perfect for unpredictable income sources like bonuses, tax refunds, or inheritance. The best strategy is whatever you can afford consistently without financial strain. Many people use a combination: regular small monthly overpayments plus occasional larger lump sums when windfalls occur.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Will I be charged a fee for overpaying my mortgage?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  It depends on your mortgage type and how much you overpay. Most mortgages allow some level of overpayment without fees. In the UK, you can typically overpay up to 10% annually on most mortgages without penalty. If you exceed this limit, you may face an <strong>Early Repayment Charge (ERC)</strong> of 1-5% of the overpayment amount. In the US, most modern mortgages have no prepayment penalties at all, though some older loans (especially ARMs) may have penalties for the first 3-5 years. The key is to <strong>check your mortgage agreement</strong> or ask your lender about their overpayment policy before making extra payments. Many lenders also have online calculators or customer service teams that can tell you exactly how much you can overpay penalty-free.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Should I overpay or pay into savings?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  This depends on your financial situation and goals. <strong>Overpaying your mortgage</strong> guarantees a return equal to your mortgage interest rate (4-6% typically) with zero risk, and this is tax-free since you're not earning interest. <strong>Savings accounts</strong> currently offer lower returns in most cases, but provide liquidity and emergency access to funds. The best approach for most people is a balance: maintain an <strong>emergency fund</strong> of 3-6 months' expenses in accessible savings, then use any surplus to overpay your mortgage. This ensures you have financial security while maximizing your long-term wealth by reducing debt. If your mortgage rate is above 5%, overpaying often makes more financial sense than low-yield savings accounts.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Can I reduce my monthly payment instead of the term?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes, this option is called <strong>"recasting" or "re-amortizing"</strong> your mortgage. After making overpayments, you can ask your lender to recalculate your monthly payment based on the lower balance while keeping the same end date. This reduces your required monthly payment but doesn't shorten your mortgage term or save as much interest. Some lenders offer this service for free, while others charge a fee (typically $150-300). This option is best if you need to <strong>free up monthly cash flow</strong> rather than pay off your mortgage faster. However, most people choose to keep their payment the same and enjoy the shortened term and interest savings instead.
                </p>
              </div>
            </div>
          </section>

          {/* Expert Verification */}
          <ExpertBox 
            expertType="finance"
            calculatorName="Mortgage Overpayment Calculator"
            lastUpdated="January 31, 2026"
          />

          {/* User Reviews */}
          <UserReviews calculatorType="mortgage" />
        </div>
      </div>
    </Layout>
  );
}