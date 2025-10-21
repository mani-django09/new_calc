import { useState } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaChartLine, FaPlus, FaTrash, FaCalculator, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket, FaDollarSign, FaGraduationCap, FaPercent } from 'react-icons/fa';

export default function ShareAverageCalculator() {
  const [purchases, setPurchases] = useState([
    { quantity: '', price: '' }
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addPurchase = () => {
    setPurchases([...purchases, { quantity: '', price: '' }]);
  };

  const removePurchase = (index) => {
    if (purchases.length > 1) {
      const newPurchases = purchases.filter((_, i) => i !== index);
      setPurchases(newPurchases);
    }
  };

  const updatePurchase = (index, field, value) => {
    const newPurchases = [...purchases];
    newPurchases[index][field] = value;
    setPurchases(newPurchases);
    setError('');
  };

  const calculateAverage = async () => {
    try {
      setLoading(true);
      setError('');
      
      const validPurchases = purchases.filter(p => p.quantity && p.price);
      
      if (validPurchases.length === 0) {
        setError('Please enter at least one purchase with quantity and price');
        setLoading(false);
        return;
      }

      const response = await calculatorAPI.calculate('share-average', { purchases: validPurchases });
      setResult(response);
    } catch (err) {
      setError(err.message || 'Failed to calculate average');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setPurchases([{ quantity: '', price: '' }]);
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="Share Average Calculator - Calculate Stock Average Price Online Free"
      description="Free share average calculator to find your average stock purchase price. Calculate cost basis for multiple stock purchases. Perfect for dollar-cost averaging and investment tracking."
      keywords="share average calculator, stock average calculator, average share price calculator, calculate average stock price, cost basis calculator, dollar cost averaging calculator, share price calculator, investment calculator"
      schema={{
        '@type': 'WebApplication',
        name: 'Share Average Calculator',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      }}
    >
      <div className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3 text-xs sm:text-sm">
            <FaCheckCircle className="text-green-300" />
            <span>Free Stock Average Price Calculator</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
            Share Average Calculator
          </h1>
          <p className="text-base sm:text-lg text-green-100 max-w-2xl mx-auto">
            Calculate your average share purchase price instantly. Track multiple stock purchases and know your break-even point.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaChartLine className="text-green-600" />
                  Your Stock Purchases
                </h2>
                <button onClick={clearAll} className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                  Clear All
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {purchases.map((purchase, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-900">Purchase #{index + 1}</span>
                      {purchases.length > 1 && (
                        <button onClick={() => removePurchase(index)} className="text-red-500 hover:text-red-700 transition-colors">
                          <FaTrash className="text-sm" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Number of Shares</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={purchase.quantity}
                          onChange={(e) => updatePurchase(index, 'quantity', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Price per Share ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={purchase.price}
                          onChange={(e) => updatePurchase(index, 'price', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="50.00"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addPurchase}
                className="w-full mb-4 bg-white border-2 border-dashed border-green-400 hover:border-green-600 text-green-600 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <FaPlus />
                Add Another Purchase
              </button>
              
              <button
                onClick={calculateAverage}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                <FaCalculator />
                {loading ? 'Calculating...' : 'Calculate Average Price'}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            {result && (
              <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-green-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaDollarSign className="text-green-600" />
                  Your Investment Summary
                </h2>
                
                <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 shadow-md text-center">
                  <p className="text-sm text-gray-600 mb-2">Average Share Price</p>
                  <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-green-600 mb-2">
                    ${result.averagePrice}
                  </p>
                  <p className="text-sm text-gray-500">per share</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-5 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                      <FaChartLine className="text-green-600" />
                      Total Shares Owned
                    </h3>
                    <p className="text-3xl font-bold text-green-600">{result.totalShares}</p>
                    <p className="text-xs text-gray-600 mt-1">shares</p>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                      <FaDollarSign className="text-blue-600" />
                      Total Investment
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">${result.totalInvestment}</p>
                    <p className="text-xs text-gray-600 mt-1">invested</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <h3 className="font-bold text-gray-900 mb-4 text-base">Purchase Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-green-100">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">#</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Shares</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Price</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {result.purchaseDetails.map((detail) => (
                          <tr key={detail.purchaseNumber} className="hover:bg-gray-50">
                            <td className="px-3 py-3 font-semibold">{detail.purchaseNumber}</td>
                            <td className="px-3 py-3">{detail.quantity}</td>
                            <td className="px-3 py-3">${detail.price}</td>
                            <td className="px-3 py-3 font-semibold text-green-600">${detail.investment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                  <p className="text-sm text-gray-700">
                    <strong className="text-blue-700">Break-even Point:</strong> You'll break even when the share price reaches ${result.averagePrice}. Anything above this is profit!
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-green-50 rounded-2xl p-4 sm:p-6 border border-green-200 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                Quick Guide
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">1</div>
                  <p className="text-gray-700">Enter the number of shares you bought</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">2</div>
                  <p className="text-gray-700">Enter the price you paid per share</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">3</div>
                  <p className="text-gray-700">Add more purchases if you bought at different times</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">4</div>
                  <p className="text-gray-700">Click calculate to see your average cost</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaInfoCircle className="text-green-600" />
                  Why Calculate Average?
                </h4>
                <p className="text-xs text-gray-700">
                  Knowing your average share price helps you understand your actual cost basis, make informed selling decisions, and track whether you're in profit or loss.
                </p>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">💡 Pro Tip</p>
                <p className="text-xs">Dollar-cost averaging (buying regularly) often results in a better average price than trying to time the market!</p>
              </div>
            </div>
          </div>
        </div>

         {/* SEO Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Calculating Your Average Share Price
            </h2>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                Why Every Stock Investor Needs a Share Average Calculator
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                If you're buying stocks regularly or investing through SIPs (Systematic Investment Plans), you're probably buying the same shares at different prices. Maybe you bought 50 shares at $100, then bought 30 more at $85, and later picked up another 20 at $110. What's your actual average cost? This is where a share average calculator becomes your best friend. It tells you exactly what price you need the stock to reach before you start making money.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              What Is Average Share Price and Why Does It Matter?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Your average share price is simply the total amount you've invested divided by the total number of shares you own. It's your true cost per share when you've made multiple purchases at different price points. This number is super important because it's your break-even point - the price the stock needs to hit for you to not lose money if you sell.
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Think of it this way: if you buy ice cream cones at different prices throughout the week, the average price tells you what you're really paying per cone on average. Same logic applies to stocks, except the stakes are much higher!
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How to Calculate Average Stock Price (The Simple Formula)
            </h3>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-sm sm:text-base text-center text-gray-800 font-semibold mb-3">
                Average Price = Total Investment ÷ Total Shares
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Real Example:</strong></p>
                <p className="text-sm text-gray-600 mb-1">Purchase 1: 100 shares at $50 = $5,000</p>
                <p className="text-sm text-gray-600 mb-1">Purchase 2: 50 shares at $60 = $3,000</p>
                <p className="text-sm text-gray-600 mb-3">Purchase 3: 75 shares at $45 = $3,375</p>
                <p className="text-sm text-gray-600 mb-1">Total Investment = $11,375</p>
                <p className="text-sm text-gray-600 mb-1">Total Shares = 225</p>
                <p className="text-sm text-green-600 font-semibold">Average Price = $11,375 ÷ 225 = $50.56</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              See how the average comes out to $50.56 even though you bought at $50, $60, and $45? The calculator automatically weighs each purchase by the number of shares, giving you the accurate picture of your investment.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              When You Really Need to Know Your Average Share Price
            </h3>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Deciding when to sell:</strong> You can't know if you're making or losing money without knowing your average cost. If the current price is above your average, you're in profit. Below it? You're taking a loss.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Tax calculations:</strong> When tax season rolls around, you need to report capital gains or losses accurately. Your average price helps calculate this correctly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Portfolio rebalancing:</strong> Smart investors regularly review their holdings. Knowing which stocks are above or below their average helps you decide where to add more money.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Averaging down strategy:</strong> Some investors intentionally buy more shares when prices drop. The calculator shows how this affects your overall cost basis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Tracking SIP investments:</strong> If you're doing monthly investments in stocks or mutual funds, your average price changes every month. The calculator keeps this updated.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Step-by-Step: Using the Share Average Calculator
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Our calculator makes the whole process dead simple. Here's exactly how to use it:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Step 1: Enter Your First Purchase</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Start with your earliest stock purchase. Type in how many shares you bought and the price you paid per share. Don't worry about the order - you can enter purchases in any sequence.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Step 2: Add More Purchases</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Click the "Add Another Purchase" button for each additional time you bought shares. You can add as many purchases as you want - whether it's 2 or 20 transactions.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Step 3: Hit Calculate</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Once all your purchases are entered, click the "Calculate Average Price" button. The calculator instantly shows your average cost per share, total investment, and a complete breakdown.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Step 4: Review Your Results</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Check out your results screen. You'll see your average price front and center, plus your total shares owned and total money invested. The breakdown table shows each purchase so you can verify everything's correct.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Understanding Dollar-Cost Averaging (DCA)
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              You've probably heard the term "dollar-cost averaging" thrown around. It's actually a pretty smart strategy, and the share average calculator is the perfect tool to track it. Here's what DCA means in plain English:
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Instead of trying to time the market perfectly (which nobody can do consistently), you invest a fixed amount of money at regular intervals. Maybe you buy $500 worth of stock every month, regardless of whether the price is up or down. When prices are low, you get more shares. When prices are high, you get fewer shares. Over time, this typically gives you a pretty good average price.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-6 rounded-r-xl mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Why DCA Works</h4>
              <p className="text-xs sm:text-sm text-gray-700 mb-3">
                Markets go up and down constantly. Nobody - not even professional traders - can consistently predict the tops and bottoms. By spreading your purchases over time, you automatically buy more when it's cheap and less when it's expensive. This smooths out your average cost and removes the emotional stress of trying to time your entries perfectly.
              </p>
              <p className="text-xs sm:text-sm text-gray-700">
                Plus, you avoid the horrible feeling of putting all your money in right before a crash. Been there, felt that!
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Common Mistakes People Make (And How to Avoid Them)
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Over the years, I've seen investors make the same errors over and over when calculating their average share price. Let's make sure you don't fall into these traps:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <span className="text-red-600">❌</span> Forgetting About Fees and Commissions
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Your brokerage probably charges fees or commissions on trades. These add to your cost! If you paid $5 commission on a $500 purchase, your real cost is $505. Include these in your price calculations for accuracy.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <span className="text-red-600">❌</span> Not Tracking All Purchases
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Keep records of every single purchase, no matter how small. That random 5 shares you bought on a whim? It counts. Missing purchases throws off your entire average.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <span className="text-red-600">❌</span> Ignoring Stock Splits
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  If the company does a stock split (say, 2-for-1), your share count doubles but the price per share halves. Adjust your old purchases accordingly, or your average will be way off.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <span className="text-red-600">❌</span> Mixing Up Different Stocks
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  This seems obvious, but calculate averages separately for each stock you own. Don't combine your Apple and Microsoft purchases into one calculation!
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Real-World Example: Tracking a Year of Investments
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Let me walk you through a realistic scenario. Say you're investing in XYZ stock throughout 2024:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">Month</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Shares Bought</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Price per Share</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Total Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3">January</td>
                    <td className="px-3 sm:px-6 py-3">20</td>
                    <td className="px-3 sm:px-6 py-3">$75.00</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">$1,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3">March</td>
                    <td className="px-3 sm:px-6 py-3">15</td>
                    <td className="px-3 sm:px-6 py-3">$82.50</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">$1,237.50</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3">June</td>
                    <td className="px-3 sm:px-6 py-3">25</td>
                    <td className="px-3 sm:px-6 py-3">$68.00</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">$1,700</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3">September</td>
                    <td className="px-3 sm:px-6 py-3">30</td>
                    <td className="px-3 sm:px-6 py-3">$71.25</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">$2,137.50</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3">December</td>
                    <td className="px-3 sm:px-6 py-3">10</td>
                    <td className="px-3 sm:px-6 py-3">$79.00</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">$790</td>
                  </tr>
                  <tr className="bg-green-50 font-bold">
                    <td className="px-3 sm:px-6 py-3">Total</td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">100 shares</td>
                    <td className="px-3 sm:px-6 py-3"></td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">$7,365</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-100 p-4 sm:p-6 rounded-xl mb-6">
              <p className="text-sm sm:text-base text-gray-800 mb-2">
                <strong>Average Price Calculation:</strong>
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Total Investment = $7,365
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Total Shares = 100
              </p>
              <p className="text-lg font-bold text-green-700">
                Average Price = $7,365 ÷ 100 = $73.65 per share
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Notice how the average of $73.65 is different from just averaging the five prices ($75.15). That's because you bought different quantities at each price point. The calculator properly weights each purchase by the number of shares, giving you the true average cost.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Using Average Price for Smart Selling Decisions
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Knowing your average price isn't just about record-keeping - it's a powerful tool for making selling decisions. Here's how savvy investors use this information:
            </p>

            <div className="bg-blue-50 p-4 sm:p-6 rounded-xl mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">The 10% Rule</h4>
              <p className="text-xs sm:text-sm text-gray-700 mb-3">
                Many investors set a rule: sell when the stock price is at least 10% above their average cost. Using our example above, with an average of $73.65, you might set a target of $81 (10% above average). This ensures you're locking in a decent profit.
              </p>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">The Stop-Loss Strategy</h4>
              <p className="text-xs sm:text-sm text-gray-700">
                On the flip side, some folks set a stop-loss at 10% below their average. If the stock drops to $66.29 (10% below $73.65), they sell to limit their losses. This prevents small losses from becoming big ones.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Frequently Asked Questions About Share Average Calculator
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How often should I calculate my average share price?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Recalculate every time you buy more shares. If you're investing monthly, update it monthly. If you're buying quarterly, update quarterly. The point is to always know your current average cost so you can make informed decisions.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Does the calculator work for mutual funds and ETFs too?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Absolutely! The math is exactly the same whether you're buying individual stocks, mutual funds, ETFs, or even cryptocurrency. Just enter the units/shares you bought and the price you paid. It works for any investment where you might make multiple purchases at different prices.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What if I've sold some shares? How does that affect my average?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Great question! When you sell shares, your average price for the remaining shares doesn't change. If you bought at an average of $50 and you sell half your holdings, your average is still $50 for the shares you kept. Only new purchases change your average. However, for tax purposes, which shares you sold (FIFO vs LIFO) matters, but that's a different calculation.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I use this for stocks in different currencies?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes, but convert everything to one currency first. If you bought shares in USD and EUR, pick one currency (say USD) and convert all your purchases to that currency using the exchange rate at the time of each purchase. Then calculate the average.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Is averaging down a good strategy when a stock drops?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  It depends! Averaging down (buying more when the price drops) can be smart if you believe in the company's long-term prospects and the drop is temporary. You're essentially buying at a discount. However, if the company has fundamental problems, you might be throwing good money after bad. Always ask yourself: "Would I buy this stock today if I didn't already own it?" If the answer is no, don't average down.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Should I include dividends in my average price calculation?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  No, dividends are separate income. Your average price is based purely on what you paid to buy the shares. However, dividends do affect your total return on investment. Some investors track "cost basis after dividends" (original cost minus dividends received), but that's a different metric from average share price.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How do DRIP investments affect my average?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  DRIP (Dividend Reinvestment Plan) purchases should be added to your calculation just like regular purchases. Each time dividends buy new shares, add that as a new purchase entry with the number of shares bought and the price paid. These typically happen automatically, so check your brokerage statements to get the exact numbers.
                </p>
              </details>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Tips for Long-Term Investors
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              If you're in it for the long haul (which you should be!), here are some practical tips for using the share average calculator effectively:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaCheckCircle className="text-purple-600" />
                  Keep a Spreadsheet
                </h4>
                <p className="text-xs text-gray-700">
                  Track all your purchases in a simple Excel or Google Sheets file. Note the date, shares bought, and price paid. Update it after every purchase. Takes 2 minutes but saves you headaches later.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaCheckCircle className="text-purple-600" />
                  Review Quarterly
                </h4>
                <p className="text-xs text-gray-700">
                  Every three months, check where each stock's current price is relative to your average. This helps you spot opportunities and potential problems early.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaCheckCircle className="text-purple-600" />
                  Don't Obsess
                </h4>
                <p className="text-xs text-gray-700">
                  Yes, know your numbers. But don't check daily. Long-term investing is about years, not days. Calculate your average when you buy, then check quarterly or annually.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaCheckCircle className="text-purple-600" />
                  Factor in Opportunity Cost
                </h4>
                <p className="text-xs text-gray-700">
                  Your average price tells you your cost. But also consider: could that money have done better elsewhere? This perspective keeps you honest about your holdings.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to Calculate Your Average Share Price?</h3>
              <p className="text-sm sm:text-base mb-6 text-green-100">
                Use our free share average calculator above to instantly find your average cost per share. No signup required, works on your phone, and gives you all the details you need to make smart investment decisions.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Calculate Now
              </button>
            </div>

            <div className="mt-12 bg-green-50 border-l-4 border-green-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This Share Average Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                This <strong>share average calculator</strong> helps investors quickly find their average stock purchase price across multiple transactions. Whether you're practicing dollar-cost averaging, buying dips, or just adding to positions over time, knowing your average cost is essential for profitable investing. The calculator handles any number of purchases and works for stocks, ETFs, mutual funds, and other securities. It's 100% free, requires zero registration, and gives you instant results with a detailed breakdown. Thousands of investors use this tool daily to track their cost basis and make informed buy and sell decisions. The math is simple but powerful - total investment divided by total shares - giving you the one number you need to know if you're winning or losing on any position.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | Investment Calculator for Stocks, ETFs, and Mutual Funds
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}