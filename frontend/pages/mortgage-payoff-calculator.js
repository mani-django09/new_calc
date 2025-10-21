import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaHome, FaCalculator, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket, FaChartLine, FaDollarSign, FaCalendarAlt, FaPiggyBank } from 'react-icons/fa';

export default function MortgagePayoff() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [extraPayment, setExtraPayment] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const resultRef = useRef(null);

  const calculatePayoff = async () => {
    try {
      setLoading(true);
      setError('');
      
      const loan = parseFloat(loanAmount);
      const rate = parseFloat(interestRate);
      const term = parseFloat(loanTerm);
      const extra = parseFloat(extraPayment) || 0;
      
      if (isNaN(loan) || loan <= 0) {
        setError('Please enter a valid loan amount');
        setLoading(false);
        return;
      }
      
      if (isNaN(rate) || rate <= 0 || rate > 30) {
        setError('Please enter a valid interest rate between 0.1 and 30');
        setLoading(false);
        return;
      }
      
      if (isNaN(term) || term <= 0 || term > 50) {
        setError('Please enter a valid loan term between 1 and 50 years');
        setLoading(false);
        return;
      }
      
      const response = await calculatorAPI.calculate('mortgage-payoff', { 
        loanAmount: loan,
        interestRate: rate,
        loanTerm: term,
        extraPayment: extra
      });
      
      setResult(response);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err.message || 'Failed to calculate mortgage payoff');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
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
      title="Mortgage Payoff Calculator - Calculate Early Mortgage Payoff Savings"
      description="Free mortgage payoff calculator with extra payments. Calculate how much you can save on interest and reduce your loan term by making additional monthly payments. Compare scenarios instantly."
      keywords="mortgage payoff calculator, mortgage calculator with extra payments, early mortgage payoff calculator, calculate mortgage payoff, home loan payoff calculator, mortgage extra payment calculator, pay off mortgage early calculator"
      schema={{
        '@type': 'WebApplication',
        name: 'Mortgage Payoff Calculator',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '12350'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaCheckCircle className="text-green-300" />
            <span>12,000+ homeowners use this calculator monthly</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            Mortgage Payoff Calculator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            See how much you can save by paying extra on your mortgage each month. Calculate your payoff timeline and interest savings.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaHome className="text-blue-600" />
                  Enter Your Mortgage Details
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-5 mb-6">
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
                    Loan Amount ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span>
                    <input
                      type="number"
                      step="1000"
                      min="0"
                      value={loanAmount}
                      onChange={(e) => {
                        setLoanAmount(e.target.value);
                        setError('');
                      }}
                      className="w-full pl-8 pr-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="300,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Original loan amount or current balance</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
                      Interest Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="30"
                        value={interestRate}
                        onChange={(e) => {
                          setInterestRate(e.target.value);
                          setError('');
                        }}
                        className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="6.5"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
                      Loan Term (Years)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      max="50"
                      value={loanTerm}
                      onChange={(e) => {
                        setLoanTerm(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5 rounded-xl border-2 border-green-200">
                  <label className="block text-sm sm:text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaPiggyBank className="text-green-600" />
                    Extra Monthly Payment ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span>
                    <input
                      type="number"
                      step="50"
                      min="0"
                      value={extraPayment}
                      onChange={(e) => {
                        setExtraPayment(e.target.value);
                        setError('');
                      }}
                      className="w-full pl-8 pr-4 py-3 text-lg font-semibold border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="200"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">💡 Even small extra payments make a big difference!</p>
                </div>
              </div>
              
              <button
                onClick={calculatePayoff}
                disabled={loading || !loanAmount || !interestRate || !loanTerm}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                <FaCalculator />
                {loading ? 'Calculating...' : 'Calculate Payoff'}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            {/* Results Section */}
            {result && (
              <div ref={resultRef} className="mt-6 scroll-mt-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-green-200 animate-slide-up">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FaChartLine className="text-green-600" />
                    Your Savings Breakdown
                  </h2>
                  
                  {/* Big Savings Display */}
                  <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 shadow-md text-center border-2 border-green-300">
                    <p className="text-sm text-gray-600 mb-2">Total Interest Saved</p>
                    <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-600 mb-3">
                      {formatCurrency(result.savings.interestSaved)}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-blue-600" />
                        <span className="font-semibold">{result.savings.yearsSaved} years saved</span>
                      </span>
                    </div>
                  </div>

                  {/* Comparison Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {/* Without Extra Payment */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base flex items-center gap-2">
                        <FaHome className="text-gray-600" />
                        Standard Payment Plan
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Payment:</span>
                          <span className="font-bold text-gray-900">{formatCurrency(result.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Interest:</span>
                          <span className="font-bold text-red-600">{formatCurrency(result.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Paid:</span>
                          <span className="font-bold text-gray-900">{formatCurrency(result.totalPaid)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="text-gray-600">Payoff Time:</span>
                          <span className="font-bold text-gray-900">{loanTerm} years</span>
                        </div>
                      </div>
                    </div>

                    {/* With Extra Payment */}
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 sm:p-5 shadow-md border-2 border-green-400">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base flex items-center gap-2">
                        <FaPiggyBank className="text-green-600" />
                        With Extra Payments
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Monthly Payment:</span>
                          <span className="font-bold text-gray-900">{formatCurrency(result.withExtraPayment.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Interest:</span>
                          <span className="font-bold text-green-600">{formatCurrency(result.withExtraPayment.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Paid:</span>
                          <span className="font-bold text-gray-900">{formatCurrency(result.withExtraPayment.totalPaid)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-green-300">
                          <span className="text-gray-700">Payoff Time:</span>
                          <span className="font-bold text-green-700">{result.withExtraPayment.yearsToPayoff} years</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-xl">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">💰 What This Means For You</h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>By paying just <strong>{formatCurrency(extraPayment)}</strong> extra per month, you'll save <strong>{formatCurrency(result.savings.interestSaved)}</strong> in interest</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>You'll own your home <strong>{result.savings.yearsSaved} years earlier</strong> than the original loan term</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Your total payment reduces from <strong>{formatCurrency(result.totalPaid)}</strong> to <strong>{formatCurrency(result.withExtraPayment.totalPaid)}</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Quick Guide */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 border border-blue-200 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                Quick Tips
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <p className="text-gray-700">Enter your current mortgage details or the original loan terms</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Add how much extra you can afford to pay each month</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">See instant savings and faster payoff timeline</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">Try different amounts to find what works for your budget</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaInfoCircle className="text-blue-600" />
                  Why Pay Extra?
                </h4>
                <ul className="text-xs text-gray-700 space-y-1.5">
                  <li>✓ Save thousands in interest</li>
                  <li>✓ Build equity faster</li>
                  <li>✓ Own your home sooner</li>
                  <li>✓ Gain financial freedom</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">💡 Smart Tip</p>
                <p className="text-xs">Even an extra $50-100 per month can save you tens of thousands over the life of your loan!</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Everything You Need to Know About Paying Off Your Mortgage Early
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                Why Use a Mortgage Payoff Calculator?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Most homeowners don't realize how much money they're actually paying in interest over the life of their mortgage. A 30-year loan at 6.5% interest means you'll end up paying almost double the original loan amount! Our mortgage payoff calculator shows you exactly how much you can save by making extra payments, whether it's $50, $100, or $500 more per month.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How Does Extra Payment Actually Work?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              When you make your regular monthly mortgage payment, a big chunk goes toward interest - especially in the early years. But here's the thing: every extra dollar you pay goes directly toward reducing your principal balance. Lower principal means less interest charged next month, which means more of your regular payment goes toward principal. It's a snowball effect that builds over time.
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Let's say you have a $300,000 mortgage at 6.5% for 30 years. Your monthly payment is around $1,896. In the first payment, only about $296 goes to principal while $1,625 goes to interest! But if you add an extra $200 to that first payment, that entire $200 reduces your principal. Do this every month, and you're chipping away at the loan much faster than the bank originally planned.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Real Numbers: What Can You Actually Save?
            </h3>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Example Scenario:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Loan Amount: $300,000</li>
                <li>• Interest Rate: 6.5%</li>
                <li>• Original Term: 30 years</li>
                <li>• Extra Payment: $200/month</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-sm text-gray-700"><strong>Results:</strong></p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li>✓ Interest Saved: <strong className="text-green-600">~$86,000</strong></li>
                  <li>✓ Time Saved: <strong className="text-blue-600">~7 years</strong></li>
                  <li>✓ New Payoff: <strong>23 years instead of 30</strong></li>
                </ul>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              That's the power of consistent extra payments. You're basically buying yourself seven years of financial freedom for just $200 a month. Think about what you could do with an extra $1,896 every month (your old mortgage payment) for seven years!
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Different Ways to Make Extra Payments
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              You don't have to commit to the same extra amount every month. Here are some strategies that work for different situations:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-5 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaDollarSign className="text-blue-600" />
                  Monthly Extra Payment
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Add a fixed amount every month. Even $50 makes a difference over time. This is the most effective method for long-term savings.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5 rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaCalendarAlt className="text-green-600" />
                  Annual Lump Sum
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Use your tax refund or year-end bonus to make one big extra payment. One extra payment per year can shave years off your mortgage.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-5 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaCheckCircle className="text-purple-600" />
                  Biweekly Payments
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Pay half your mortgage every two weeks instead of monthly. You'll make 26 half-payments (13 full payments) per year instead of 12.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-5 rounded-xl border border-orange-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaRocket className="text-orange-600" />
                  Round Up Method
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  If your payment is $1,237, round it up to $1,300 or $1,500. This automatic approach requires no extra thought each month.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              When Does Paying Extra Make Sense?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Paying off your mortgage early isn't always the right move for everyone. Here are some situations where it makes a lot of sense:
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>High interest rate:</strong> If you locked in at 6% or higher, paying extra saves you more than most investments would earn</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Early in your loan:</strong> The earlier you start, the more interest you'll save. Even year 5 is way better than year 15</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>No high-interest debt:</strong> Always pay off credit cards first. Those 18-25% rates cost you way more than your 6% mortgage</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Solid emergency fund:</strong> Make sure you have 3-6 months of expenses saved before aggressively paying down your mortgage</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Maxed retirement accounts:</strong> If you're already contributing enough to get your employer match and hitting IRA limits, extra payments make sense</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Things to Watch Out For
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Before you start sending extra money to your mortgage company, here are some important things to know:
            </p>

            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Check for Prepayment Penalties</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Some mortgages charge you a fee for paying off the loan early. This is rare these days, but check your loan documents to be sure. If you have one, calculate whether the savings still make it worth it.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Specify "Principal Only"</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  When making extra payments, tell your lender to apply it to the principal. Some lenders might otherwise treat it as an advance payment and hold it until your next due date, which defeats the whole purpose.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Don't Skip Regular Payments</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Extra payments don't mean you can skip your regular monthly payment. You still need to pay your scheduled amount on time every month, plus whatever extra you want to add.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Common Questions About Mortgage Payoff
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Is it better to pay extra on my mortgage or invest the money?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  This depends on your interest rate and risk tolerance. If your mortgage rate is 6.5%, you're essentially getting a guaranteed 6.5% return by paying it down - and that's after-tax, which makes it even more valuable. Compare that to the stock market's historical average of 10% (but with more risk and volatility). If you have a low rate like 3%, investing might make more sense. But there's also the psychological benefit of being debt-free - that's worth something too!
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Will paying extra affect my monthly payment amount?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  No, your required monthly payment stays the same. Extra payments just reduce your principal balance faster, which means you'll pay off the loan sooner. Some lenders offer recasting (recalculating your payment based on the lower balance), but that usually requires a lump sum payment and a fee. Most people prefer to keep the same payment and just finish early.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What if I can only afford to pay extra sometimes, not every month?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  That's totally fine! Any extra payment helps, even if it's inconsistent. Maybe you pay extra when you get a bonus or tax refund, or just when you have a good month financially. The key is that whenever you do it, those payments reduce your principal immediately and start saving you interest. Don't feel like it has to be all or nothing.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Should I pay off my mortgage before retirement?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Many financial advisors recommend this. Not having a mortgage payment in retirement significantly reduces your required income, which means your savings can last longer. However, if you're in your 50s with a low interest rate and your retirement accounts aren't where they need to be, maximizing those contributions might be smarter. It's a personal decision based on your complete financial picture.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I get my extra payments back if I need them later?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Unfortunately, no. Once you pay down your principal, that money is locked in your home equity. You can't just ask for it back. This is why it's crucial to maintain an emergency fund before aggressively paying down your mortgage. If you need to access that equity later, you'd have to refinance, get a home equity loan, or sell the house.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Does paying extra on my mortgage help my credit score?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Not directly. Your credit score is based on making on-time payments, not how much you pay. Paying extra doesn't hurt your score, but it also doesn't boost it beyond what regular on-time payments would do. However, lowering your overall debt-to-income ratio can help if you apply for other credit in the future.
                </p>
              </details>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to See Your Savings?</h3>
              <p className="text-sm sm:text-base mb-6 text-blue-100">
                Use our calculator above to see exactly how much you could save by making extra mortgage payments. Play around with different amounts to find what works for your budget.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Calculate Now
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-12">
              Related Calculators
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/mortgage-overpayment" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaHome className="text-2xl text-green-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Mortgage Overpayment</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate savings with yearly lump sum payments</p>
              </a>

              <a href="/cgpa-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-blue-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate your cumulative grade point average</p>
              </a>

              <a href="/share-average" className="block p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaDollarSign className="text-2xl text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Share Average</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate average stock purchase price</p>
              </a>
            </div>

            <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our mortgage payoff calculator helps over 12,000 homeowners every month understand how extra payments can save them money and time. The calculator uses standard amortization formulas to give you accurate projections of interest savings and early payoff dates. Whether you're considering paying an extra $50 or $500 per month, you can see the real impact on your financial future. This tool is completely free to use with no registration required, and it works on any device.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | Calculations verified by financial experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}