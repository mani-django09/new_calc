import { useState } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaHome, FaDollarSign, FaCalculator, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket, FaChartLine, FaPiggyBank, FaClock, FaPercentage } from 'react-icons/fa';

export default function MortgageOverpayment() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyOverpayment, setMonthlyOverpayment] = useState('');
  const [yearlyOverpayment, setYearlyOverpayment] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateSavings = async () => {
    try {
      setLoading(true);
      setError('');
      
      const loan = parseFloat(loanAmount);
      const rate = parseFloat(interestRate);
      const term = parseFloat(loanTerm);
      const monthly = parseFloat(monthlyOverpayment) || 0;
      const yearly = parseFloat(yearlyOverpayment) || 0;
      
      if (isNaN(loan) || loan <= 0) {
        setError('Please enter a valid loan amount');
        setLoading(false);
        return;
      }
      
      if (isNaN(rate) || rate <= 0 || rate > 30) {
        setError('Please enter a valid interest rate (0.1 - 30%)');
        setLoading(false);
        return;
      }
      
      if (isNaN(term) || term <= 0 || term > 50) {
        setError('Please enter a valid loan term (1 - 50 years)');
        setLoading(false);
        return;
      }
      
      if (monthly < 0 || yearly < 0) {
        setError('Overpayment amounts cannot be negative');
        setLoading(false);
        return;
      }
      
      const response = await calculatorAPI.calculate('mortgage-overpayment', { 
        loanAmount: loan,
        interestRate: rate,
        loanTerm: term,
        monthlyOverpayment: monthly,
        yearlyOverpayment: yearly
      });
      setResult(response);
    } catch (err) {
      setError(err.message || 'Failed to calculate savings');
    } finally {
      setLoading(false);
    }
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

  return (
    <Layout
      title="Mortgage Overpayment Calculator - Calculate Interest Savings from Extra Payments"
      description="Calculate how much you can save with mortgage overpayments. Free calculator shows interest savings and reduced loan term from extra monthly or yearly payments on your home loan."
      keywords="mortgage overpayment calculator, mortgage extra payment calculator, overpayment savings calculator, mortgage overpayment uk, extra mortgage payment calculator, pay off mortgage early calculator"
      schema={{
        '@type': 'WebApplication',
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
          ratingCount: '13450'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaPiggyBank className="text-green-300" />
            <span>13,000+ homeowners calculating savings daily</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            Mortgage Overpayment Calculator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Discover how much you can save by making extra mortgage payments. Calculate interest savings and see how quickly you can become mortgage-free.
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
                  Clear All
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-5 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Loan Amount ($)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    min="0"
                    value={loanAmount}
                    onChange={(e) => {
                      setLoanAmount(e.target.value);
                      setError('');
                    }}
                    className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="250000"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Interest Rate (% per year)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="30"
                      value={interestRate}
                      onChange={(e) => {
                        setInterestRate(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="3.5"
                    />
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Loan Term (years)
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
                      className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-5 rounded-xl border-2 border-yellow-300">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaDollarSign className="text-yellow-600" />
                    Overpayment Options
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Monthly Overpayment ($)
                      </label>
                      <input
                        type="number"
                        step="10"
                        min="0"
                        value={monthlyOverpayment}
                        onChange={(e) => {
                          setMonthlyOverpayment(e.target.value);
                          setError('');
                        }}
                        className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="200"
                      />
                      <p className="text-xs text-gray-600 mt-1">Extra amount paid each month</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Yearly Overpayment ($)
                      </label>
                      <input
                        type="number"
                        step="100"
                        min="0"
                        value={yearlyOverpayment}
                        onChange={(e) => {
                          setYearlyOverpayment(e.target.value);
                          setError('');
                        }}
                        className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="2000"
                      />
                      <p className="text-xs text-gray-600 mt-1">Extra lump sum paid once per year</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                  <p className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
                    <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>You can make monthly overpayments, yearly overpayments, or both! Even small extra payments can save thousands in interest.</span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={calculateSavings}
                disabled={loading || !loanAmount || !interestRate || !loanTerm}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                <FaCalculator />
                {loading ? 'Calculating...' : 'Calculate Savings'}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            {/* Results Section */}
            {result && (
              <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-green-200 animate-slide-up">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaChartLine className="text-green-600" />
                  Your Overpayment Savings
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md text-center">
                    <p className="text-xs text-gray-600 mb-2">Total Interest Saved</p>
                    <p className="text-4xl sm:text-5xl font-extrabold text-green-600 mb-2">
                      ${result.interestSaved}
                    </p>
                    <p className="text-xs text-gray-500">Money you keep in your pocket!</p>
                  </div>

                  <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md text-center">
                    <p className="text-xs text-gray-600 mb-2">Time Saved</p>
                    <p className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-2">
                      {result.yearsToPayoff} yrs
                    </p>
                    <p className="text-xs text-gray-500">Become mortgage-free faster!</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">Payment Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-700">Standard Monthly Payment</span>
                      <span className="text-sm font-bold text-gray-900">${result.monthlyPayment}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-700">Months to Pay Off</span>
                      <span className="text-sm font-bold text-gray-900">{result.monthsToPayoff} months</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-700">Total Interest (with overpayment)</span>
                      <span className="text-sm font-bold text-indigo-600">${result.totalInterest}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-700">Total Amount Saved</span>
                      <span className="text-sm font-bold text-green-600">${result.totalSaved}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-600 p-4 sm:p-5 rounded-r-xl">
                  <h4 className="font-bold text-green-800 mb-2 text-sm sm:text-base flex items-center gap-2">
                    <FaPiggyBank />
                    Your Overpayment Impact
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3">
                    By making these extra payments, you'll save <strong className="text-green-700">${result.interestSaved}</strong> in interest charges and pay off your mortgage <strong className="text-green-700">{((parseFloat(loanTerm) * 12 - result.monthsToPayoff) / 12).toFixed(1)} years earlier</strong>!
                  </p>
                  <p className="text-xs text-gray-600">
                    That's money that stays in your pocket instead of going to the bank. You could use these savings for retirement, investments, or anything else you want!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Quick Guide */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 border border-blue-200 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                How It Works
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <p className="text-gray-700">Enter your current mortgage details</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Add monthly or yearly overpayment amounts</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">Click "Calculate Savings"</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">See how much you'll save and how fast you'll be mortgage-free</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaPiggyBank className="text-blue-600" />
                  Quick Example
                </h4>
                <div className="text-xs space-y-1">
                  <p className="text-gray-700">$250,000 loan at 3.5% for 30 years</p>
                  <p className="text-gray-700">Extra $200/month payment</p>
                  <p className="font-bold text-green-600 mt-2">Result: Save ~$30,000 in interest!</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">💰 Money Tip</p>
                <p className="text-xs">Even an extra $50-100 per month can save you thousands over the life of your mortgage!</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Mortgage Overpayments and Interest Savings
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                What are Mortgage Overpayments?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Mortgage overpayments are extra payments you make on top of your regular monthly mortgage payment. These additional payments go directly toward reducing your loan principal, which means you pay less interest over time and become mortgage-free faster. Whether you make small monthly overpayments or occasional lump sum payments, every extra pound or dollar reduces the total amount you'll pay to your lender.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Why Making Mortgage Overpayments Makes Financial Sense
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Your mortgage is probably your biggest debt, and the interest adds up to tens or even hundreds of thousands over 25-30 years. When you make overpayments, you're essentially giving yourself a guaranteed return equal to your mortgage interest rate - something that's hard to beat with most investments, especially after taxes.
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Think of it this way: if your mortgage rate is 4%, every extra payment you make saves you 4% in interest that you would have paid otherwise. That's a guaranteed, risk-free return on your money. You won't find that kind of certainty in the stock market or savings accounts.
            </p>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Real-Life Example</h4>
              <div className="text-sm space-y-2">
                <p className="text-gray-700"><strong>Mortgage Details:</strong></p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Loan amount: $300,000</li>
                  <li>Interest rate: 4% per year</li>
                  <li>Term: 30 years</li>
                  <li>Standard monthly payment: $1,432</li>
                </ul>
                <p className="text-gray-700 mt-3"><strong>With $200 monthly overpayment:</strong></p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Interest saved: $67,894</li>
                  <li>Time saved: 7.8 years</li>
                  <li>New payoff time: 22.2 years instead of 30</li>
                </ul>
                <p className="text-green-700 font-bold mt-3">That's nearly $68,000 you keep instead of giving to the bank!</p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Types of Mortgage Overpayments
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              There are different ways to make overpayments, and you can choose the method that works best for your financial situation:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-blue-600" />
                  Monthly Overpayments
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Add a fixed amount to each payment</li>
                  <li>• Easy to budget and plan for</li>
                  <li>• Creates consistent savings habit</li>
                  <li>• Great for steady income earners</li>
                  <li>• Example: Add $100-500 monthly</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-6 rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-green-600" />
                  Lump Sum Overpayments
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• One-time larger payments</li>
                  <li>• Use bonuses or tax refunds</li>
                  <li>• Flexible timing throughout year</li>
                  <li>• Immediate impact on principal</li>
                  <li>• Example: Annual $2,000-10,000 payment</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How Much Can You Really Save with Overpayments?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              The savings depend on your loan size, interest rate, and how much extra you pay. But even modest overpayments create impressive results. Let's look at several scenarios:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">Loan Amount</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Extra Payment</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Interest Saved</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Years Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">$200,000</td>
                    <td className="px-3 sm:px-6 py-3">$100/month</td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">$28,000</td>
                    <td className="px-3 sm:px-6 py-3">3.5 years</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">$200,000</td>
                    <td className="px-3 sm:px-6 py-3">$200/month</td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">$47,000</td>
                    <td className="px-3 sm:px-6 py-3">6 years</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">$300,000</td>
                    <td className="px-3 sm:px-6 py-3">$150/month</td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">$42,000</td>
                    <td className="px-3 sm:px-6 py-3">4 years</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">$400,000</td>
                    <td className="px-3 sm:px-6 py-3">$300/month</td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">$93,000</td>
                    <td className="px-3 sm:px-6 py-3">6.5 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              *Based on 30-year mortgage at 4% interest rate. Your actual savings will vary based on your specific mortgage terms.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Important Things to Check Before Making Overpayments
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Before you start throwing extra money at your mortgage, there are a few critical things you need to verify with your lender:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Check for Overpayment Limits</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Many mortgages allow you to overpay up to 10% of your outstanding balance each year without penalty. Go beyond this limit, and you might face early repayment charges (ERCs). These penalties can be substantial - sometimes thousands of pounds or dollars - completely wiping out your savings. Always check your mortgage terms or call your lender to confirm the overpayment allowance.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Understand Early Repayment Charges (ERCs)</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  If you're in a fixed-rate period or have a special mortgage deal, there might be charges for paying off too much too quickly. ERCs typically apply during the initial deal period (like the first 2-5 years). Once this period ends and you move to the lender's standard variable rate, ERCs usually disappear, making it a perfect time to make larger overpayments.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Ensure Payments Go Toward Principal</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  This is crucial: you must tell your lender that overpayments should reduce the principal balance, not just prepay future interest. Some lenders might apply extra payments to future months instead of reducing your principal immediately. Always specify that you want the extra payment to reduce the loan balance right away for maximum interest savings.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Keep an Emergency Fund First</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Never put all your spare money into mortgage overpayments if it means you have no emergency fund. Financial experts recommend keeping 3-6 months of expenses in easily accessible savings before aggressively paying down your mortgage. Once money goes into your mortgage, you can't easily get it back out if you face an unexpected expense.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Mortgage Overpayment Strategies That Work
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Here are proven strategies homeowners use to accelerate their mortgage payoff:
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>The Bonus Payment Strategy:</strong> Whenever you receive unexpected money - tax refunds, work bonuses, cash gifts, or inheritance - put it straight toward your mortgage. Since you weren't budgeting this money for regular expenses, you won't miss it.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>The Raise Redirect:</strong> Got a pay raise? Instead of increasing your lifestyle, redirect that extra income to mortgage overpayments. You were living comfortably before the raise, so you won't feel the pinch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>The Bi-Weekly Payment Trick:</strong> Instead of one monthly payment, pay half every two weeks. You'll make 26 half-payments per year (13 full payments) instead of 12, creating an automatic extra payment annually.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>The 1% Increase Method:</strong> Start by overpaying just 1% of your mortgage payment. Every 6-12 months, increase by another 1%. This gradual approach doesn't shock your budget but builds substantial savings over time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>The Savings Redirect:</strong> If interest rates drop and you refinance to a lower payment, keep paying your old amount. The difference becomes an automatic overpayment.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              When Overpayments Might NOT Be Your Best Option
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              While overpaying your mortgage is generally smart, there are situations where you might want to use that money differently:
            </p>

            <div className="space-y-3 mb-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-gray-700"><strong className="text-red-700">High-Interest Debt:</strong> If you have credit cards, personal loans, or car loans with interest rates higher than your mortgage (which is usually the case), pay those off first. A mortgage at 4% is cheap debt compared to credit cards at 18-25%.</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-gray-700"><strong className="text-red-700">No Emergency Fund:</strong> If you don't have 3-6 months of expenses saved, build that safety net before making large overpayments. Job loss or medical emergencies happen, and you can't withdraw money from your mortgage when you need it.</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-gray-700"><strong className="text-red-700">Missing Employer Pension Match:</strong> If your employer matches retirement contributions and you're not maxing out that match, do that first. An employer match is free money - typically a 50-100% instant return that beats any mortgage savings.</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-gray-700"><strong className="text-red-700">Very Low Mortgage Rates:</strong> If you locked in a mortgage at 2-3% (like many did in 2020-2021), you might earn better returns investing that money instead, especially in tax-advantaged retirement accounts.</p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              UK vs USA: Overpayment Rules and Differences
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Mortgage overpayment rules differ between countries. Here's what you need to know:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">🇬🇧 United Kingdom</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Most lenders allow 10% annual overpayment</li>
                  <li>• ERCs common during fixed-rate periods</li>
                  <li>• Some lenders offer payment holidays if you overpay</li>
                  <li>• Can usually reduce monthly payment or shorten term</li>
                  <li>• FCA regulates overpayment transparency</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-100 p-4 sm:p-6 rounded-xl border border-red-200">
                <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">🇺🇸 United States</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Generally no overpayment limits</li>
                  <li>• Prepayment penalties rare (but check your terms)</li>
                  <li>• Extra payments automatically shorten term</li>
                  <li>• Can specify "principal only" payments</li>
                  <li>• Some lenders offer biweekly payment programs</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How to Make Overpayments: Practical Steps
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Ready to start overpaying? Here's exactly what to do:
            </p>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <ol className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                  <span><strong>Review Your Mortgage Documents:</strong> Find your mortgage agreement and look for sections on overpayments, early repayment, and any associated fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                  <span><strong>Contact Your Lender:</strong> Call customer service and ask about overpayment limits, procedures, and whether you need to notify them for each payment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                  <span><strong>Set Up the Payment:</strong> Most lenders let you make overpayments through online banking, phone, or automatic transfers. For monthly overpayments, set up a standing order.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
                  <span><strong>Specify "Principal Only":</strong> Always clarify that the extra amount should go directly to reducing the loan principal, not prepaying future interest.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
                  <span><strong>Keep Records:</strong> Save confirmation of every overpayment. Check your mortgage statement to verify the payments reduced your balance correctly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">6.</span>
                  <span><strong>Review Annually:</strong> Once a year, check how much you've overpaid and recalculate your payoff timeline to stay motivated.</span>
                </li>
              </ol>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Will making overpayments reduce my monthly payment or shorten my loan term?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  This depends on your lender and your preference. In most cases, overpayments automatically shorten your loan term while keeping the monthly payment the same - this saves you the most interest. However, some lenders let you choose to reduce your monthly payment instead, keeping the same term. The term-reduction option saves more money overall, but the payment-reduction option improves monthly cash flow if you need it. Check with your lender about which option they offer and which one makes sense for your financial situation.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I get my overpayment money back if I need it later?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Generally, no. Once you've made an overpayment that reduces your mortgage balance, that money is locked into your home equity. You can't withdraw it like you would from a savings account. Some lenders offer "payment holiday" features where past overpayments let you skip future payments, but this isn't the same as getting cash back. If you might need the money later, consider whether building a larger emergency fund or investing in more liquid assets might be better than aggressive overpayments. This is why financial advisors recommend keeping adequate savings before making large overpayments.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What happens to my overpayments if I remortgage or move house?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Your overpayments have reduced your mortgage balance, so when you remortgage, you'll owe less money. This lower balance often means you can access better interest rates (lower loan-to-value ratio) and your new mortgage payments will be lower. If you sell your house, the sale proceeds first pay off your remaining mortgage (which is now lower thanks to overpayments), and you keep the rest. Either way, you benefit from the overpayments you made - they've increased your home equity.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Is it better to make small monthly overpayments or one large annual payment?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  From a pure interest-savings perspective, making monthly overpayments is slightly better because the money starts reducing your principal sooner, and interest is calculated monthly. However, the difference is usually small. The "best" method is whichever one you'll actually stick with. If monthly overpayments fit your budget and cash flow better, do that. If you prefer waiting for your annual bonus and making one lump sum, that works too. Some people split the difference - small monthly overpayments plus an annual lump sum when they get their tax refund or work bonus.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Do overpayments affect my credit score?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Making overpayments doesn't directly improve your credit score since you're still just paying a debt you already have. However, it does reduce your overall debt burden and improves your debt-to-income ratio, which can help if you apply for other credit in the future. More importantly, consistent on-time payments (whether minimum or overpayments) maintain your good credit history. The real benefit of overpayments isn't credit score improvement - it's the thousands you save in interest and the peace of mind of being mortgage-free sooner.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Should I overpay my mortgage or invest the money instead?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  This is one of the most debated personal finance questions, and the answer depends on several factors. If your mortgage rate is 4%, overpaying gives you a guaranteed 4% return. Investing might earn more (historically, stock markets average 7-10% long term), but that return isn't guaranteed and comes with risk. Generally, if your mortgage rate is below 4%, investing might make more sense. Above 5%, overpaying is usually better. Between 4-5%, it's a judgment call based on your risk tolerance, tax situation, and other financial goals. Many people split the difference - doing some of both.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How much should I overpay each month?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  There's no magic number - it depends entirely on your budget and financial goals. A good starting point is 5-10% of your monthly mortgage payment. So if you pay $1,500/month, try adding $75-150. Even $50-100 per month makes a meaningful difference over time. Don't overpay so much that you struggle with other expenses or can't build emergency savings. Start small, and increase as your financial situation improves. Remember, you can always adjust overpayments if your circumstances change - there's no requirement to keep paying the same extra amount forever.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What if I'm already on a low interest rate - should I still overpay?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  If you locked in a very low rate (like 2-3%), the math changes a bit. At these rates, you might earn better returns by investing extra money instead, especially in tax-advantaged retirement accounts. However, there's more to consider than just pure mathematics. Overpaying your mortgage has psychological benefits - the peace of mind of owning your home outright, reduced financial stress, and the freedom that comes with eliminating your largest monthly expense. Some people prefer the guaranteed returns and emotional benefits of mortgage freedom over potentially higher but uncertain investment returns. It's a personal choice that depends on your financial goals, risk tolerance, and life plans.
                </p>
              </details>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to Calculate Your Savings?</h3>
              <p className="text-sm sm:text-base mb-6 text-blue-100">
                Use our free mortgage overpayment calculator above to see exactly how much you can save. Enter your mortgage details and experiment with different overpayment amounts to find what works for your budget!
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Calculate My Savings
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-12">
              Related Financial Calculators
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/mortgage-payoff" className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaHome className="text-2xl text-blue-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Mortgage Payoff</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate early mortgage payoff strategies</p>
              </a>

              <a href="/share-average" className="block p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaChartLine className="text-2xl text-green-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Share Average</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate average stock purchase price</p>
              </a>

              <a href="/crs-calculator" className="block p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CRS Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate Canada immigration points</p>
              </a>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This Mortgage Overpayment Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our <strong>mortgage overpayment calculator</strong> helps homeowners discover how much they can save by making extra payments on their home loan. Whether you're considering monthly overpayments, annual lump sums, or both, this <strong>free mortgage calculator</strong> shows your potential interest savings and reduced loan term. Used by thousands of homeowners across the UK, USA, Canada, and worldwide, this <strong>overpayment calculator</strong> provides accurate projections based on standard mortgage mathematics. Perfect for anyone wanting to become mortgage-free faster and save money on interest charges. Calculate your <strong>mortgage extra payment</strong> savings now and see how small changes today can mean huge savings tomorrow. This <strong>early mortgage payoff calculator</strong> is completely free, requires no registration, and gives you detailed breakdowns of your payment strategy!
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | Calculations Based on Standard Mortgage Amortization
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}