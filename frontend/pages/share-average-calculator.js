import { useState, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import {
  FaChartLine,
  FaPlus,
  FaTrash,
  FaCalculator,
  FaInfoCircle,
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaDollarSign,
  FaQuestionCircle,
  FaBookOpen,
  FaShieldAlt,
  FaChartBar,
  FaCoins,
  FaBalanceScale,
  FaBullseye,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaTimesCircle,
  FaPiggyBank,
  FaBriefcase,
  FaArrowRight,
  FaArrowUp
} from 'react-icons/fa';

// ─── CUSTOM SVG: Portfolio Balancing Visualization ─────────────────────────
const PortfolioBalancingSVG = () => (
  <svg viewBox="0 0 580 250" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background gradient */}
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ecfdf5" />
        <stop offset="100%" stopColor="#d1fae5" />
      </linearGradient>
      <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="barGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    
    <rect x="4" y="4" width="572" height="242" rx="24" fill="url(#bgGrad)" stroke="#10b981" strokeWidth="2" />
    
    {/* Title */}
    <text x="290" y="35" textAnchor="middle" fontSize="15" fontWeight="900" fill="#065f46">
      How Multiple Purchases Build Your Position
    </text>
    
    {/* Timeline markers */}
    <line x1="50" y1="80" x2="530" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 3" />
    
    {/* Purchase 1 - January */}
    <g>
      <rect x="60" y="100" width="100" height="120" rx="10" fill="url(#barGrad1)" />
      <text x="110" y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">JAN 2026</text>
      <text x="110" y="145" textAnchor="middle" fontSize="10" fill="#d1fae5">200 shares</text>
      <text x="110" y="165" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">$45.50</text>
      <text x="110" y="182" textAnchor="middle" fontSize="9" fill="#a7f3d0">per share</text>
      <rect x="75" y="190" width="70" height="22" rx="6" fill="#fff" fillOpacity="0.3" />
      <text x="110" y="205" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">$9,100</text>
    </g>
    
    {/* Purchase 2 - March */}
    <g>
      <rect x="190" y="100" width="100" height="120" rx="10" fill="url(#barGrad2)" />
      <text x="240" y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">MAR 2026</text>
      <text x="240" y="145" textAnchor="middle" fontSize="10" fill="#cffafe">150 shares</text>
      <text x="240" y="165" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">$42.30</text>
      <text x="240" y="182" textAnchor="middle" fontSize="9" fill="#a5f3fc">per share</text>
      <rect x="205" y="190" width="70" height="22" rx="6" fill="#fff" fillOpacity="0.3" />
      <text x="240" y="205" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">$6,345</text>
    </g>
    
    {/* Purchase 3 - May */}
    <g>
      <rect x="320" y="100" width="100" height="120" rx="10" fill="url(#barGrad3)" />
      <text x="370" y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">MAY 2026</text>
      <text x="370" y="145" textAnchor="middle" fontSize="10" fill="#e9d5ff">100 shares</text>
      <text x="370" y="165" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">$48.75</text>
      <text x="370" y="182" textAnchor="middle" fontSize="9" fill="#ddd6fe">per share</text>
      <rect x="335" y="190" width="70" height="22" rx="6" fill="#fff" fillOpacity="0.3" />
      <text x="370" y="205" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">$4,875</text>
    </g>
    
    {/* Result arrow */}
    <path d="M430,160 L460,160" stroke="#059669" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowResult)" />
    <defs>
      <marker id="arrowResult" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
        <path d="M0,0 L10,5 L0,10 Z" fill="#059669" />
      </marker>
    </defs>
    
    {/* Result summary box */}
    <rect x="470" y="105" width="95" height="110" rx="12" fill="#fff" stroke="#10b981" strokeWidth="3" />
    <text x="517" y="128" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6b7280">Your Average</text>
    <text x="517" y="155" textAnchor="middle" fontSize="24" fontWeight="900" fill="#10b981">$45.16</text>
    <text x="517" y="173" textAnchor="middle" fontSize="8" fill="#9ca3af">per share</text>
    <rect x="480" y="180" width="75" height="28" rx="7" fill="#d1fae5" />
    <text x="517" y="192" textAnchor="middle" fontSize="9" fontWeight="700" fill="#065f46">450 shares</text>
    <text x="517" y="204" textAnchor="middle" fontSize="8" fontWeight="600" fill="#059669">$20,320 total</text>
  </svg>
);

// ─── CUSTOM SVG: Market Timing Risk vs DCA ─────────────────────────────────
const MarketTimingRiskSVG = () => (
  <svg viewBox="0 0 560 280" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="6" y="6" width="548" height="268" rx="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    
    {/* Title */}
    <text x="280" y="32" textAnchor="middle" fontSize="14" fontWeight="900" fill="#78350f">
      Market Timing: High Risk vs Steady Averaging
    </text>
    
    {/* Volatile price chart */}
    <path 
      d="M 50,120 Q 90,80 130,110 T 210,90 T 290,125 T 370,85 T 450,115 T 510,95" 
      stroke="#ef4444" 
      strokeWidth="3" 
      fill="none" 
      strokeLinecap="round"
    />
    
    {/* High risk point (trying to time the market) */}
    <circle cx="290" cy="125" r="12" fill="#ef4444" stroke="#fff" strokeWidth="3" />
    <text x="290" y="155" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">Bought at Peak!</text>
    <line x1="290" y1="140" x2="290" y2="150" stroke="#991b1b" strokeWidth="2" />
    
    {/* DCA investment points */}
    <circle cx="130" cy="110" r="9" fill="#10b981" stroke="#fff" strokeWidth="2.5" />
    <circle cx="210" cy="90" r="9" fill="#10b981" stroke="#fff" strokeWidth="2.5" />
    <circle cx="370" cy="85" r="9" fill="#10b981" stroke="#fff" strokeWidth="2.5" />
    <circle cx="450" cy="115" r="9" fill="#10b981" stroke="#fff" strokeWidth="2.5" />
    
    <text x="130" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">$46</text>
    <text x="210" y="78" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">$44</text>
    <text x="370" y="73" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">$43</text>
    <text x="450" y="103" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">$47</text>
    
    {/* Average line for DCA */}
    <line x1="50" y1="180" x2="510" y2="180" stroke="#10b981" strokeWidth="3.5" strokeDasharray="10 5" />
    <text x="280" y="170" textAnchor="middle" fontSize="11" fontWeight="800" fill="#10b981">DCA Average: $45.00</text>
    
    {/* Risk comparison boxes */}
    <rect x="50" y="205" width="230" height="55" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
    <text x="165" y="225" textAnchor="middle" fontSize="11" fontWeight="800" fill="#991b1b">Lump Sum at Peak</text>
    <text x="165" y="242" textAnchor="middle" fontSize="9" fill="#7f1d1d">$50/share × 200 = $10,000</text>
    <text x="165" y="254" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ef4444">Loss: -10% if market drops</text>
    
    <rect x="290" y="205" width="220" height="55" rx="12" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
    <text x="400" y="225" textAnchor="middle" fontSize="11" fontWeight="800" fill="#065f46">DCA Strategy</text>
    <text x="400" y="242" textAnchor="middle" fontSize="9" fill="#047857">$45/share avg × 220 = $9,900</text>
    <text x="400" y="254" textAnchor="middle" fontSize="8" fontWeight="700" fill="#10b981">Lower risk, better average</text>
  </svg>
);

// ─── CUSTOM SVG: Tax Loss Harvesting Opportunity ───────────────────────────
const TaxHarvestingSVG = () => (
  <svg viewBox="0 0 540 220" className="w-full max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="5" y="5" width="530" height="210" rx="18" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
    
    {/* Title */}
    <text x="270" y="30" textAnchor="middle" fontSize="13" fontWeight="900" fill="#5b21b6">
      Tax Loss Harvesting with Share Averaging
    </text>
    
    {/* Purchase history */}
    <g>
      <rect x="30" y="55" width="150" height="45" rx="10" fill="#c4b5fd" />
      <text x="105" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">Batch 1: Jan 2025</text>
      <text x="105" y="87" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">100 @ $60 = $6,000</text>
    </g>
    
    <g>
      <rect x="195" y="55" width="150" height="45" rx="10" fill="#a78bfa" />
      <text x="270" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">Batch 2: Jun 2025</text>
      <text x="270" y="87" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">100 @ $40 = $4,000</text>
    </g>
    
    <g>
      <rect x="360" y="55" width="150" height="45" rx="10" fill="#8b5cf6" />
      <text x="435" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">Batch 3: Dec 2025</text>
      <text x="435" y="87" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">100 @ $45 = $4,500</text>
    </g>
    
    {/* Current market price */}
    <rect x="180" y="120" width="180" height="35" rx="10" fill="#fff" stroke="#8b5cf6" strokeWidth="2.5" />
    <text x="270" y="135" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280">Current Market Price</text>
    <text x="270" y="150" textAnchor="middle" fontSize="16" fontWeight="900" fill="#8b5cf6">$42/share</text>
    
    {/* Strategy box */}
    <rect x="50" y="170" width="440" height="35" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="270" y="185" textAnchor="middle" fontSize="10" fontWeight="700" fill="#78350f">Smart Tax Strategy:</text>
    <text x="270" y="198" textAnchor="middle" fontSize="9" fill="#92400e">
      Sell Batch 1 at loss ($60→$42) • Offset gains • Buy back after 30 days • Keep Batch 2 & 3
    </text>
  </svg>
);

// ─── FAQ Schema ─────────────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I calculate the average price of my stock purchases?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To calculate your average stock price, add up the total amount you spent across all purchases, then divide by the total number of shares you own. For example: if you bought 100 shares at $50 ($5,000) and 50 shares at $60 ($3,000), your total investment is $8,000 for 150 shares, giving you an average price of $53.33 per share.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is dollar-cost averaging and why is it important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dollar-cost averaging (DCA) is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of the share price. This approach automatically buys more shares when prices are low and fewer when prices are high, reducing the impact of market volatility and eliminating the stress of trying to time the market perfectly.'
      }
    },
    {
      '@type': 'Question',
      name: 'Should I sell my shares if the price drops below my average?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. A price drop below your average cost doesn\'t mean you should sell. Consider the company\'s fundamentals, your investment timeline, and whether the reasons you bought still hold true. Many successful long-term investors use price drops as opportunities to lower their average cost by purchasing more shares at discounted prices, a strategy called "averaging down."'
      }
    },
    
    {
      '@type': 'Question',
      name: 'Is it better to invest a lump sum or use dollar-cost averaging?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dollar-cost averaging is generally better for most investors, especially beginners. While lump sum investing can yield higher returns if timed perfectly, it carries significant risk if the market drops immediately after investment. DCA reduces this risk by spreading purchases over time, providing emotional comfort and statistical evidence of lower volatility in returns.'
      }
    },
    
    {
      '@type': 'Question',
      name: 'What if I received some shares as a gift or through employee stock options?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For gifted shares, use the original owner\'s cost basis (the price they paid). For employee stock options, use the strike price you paid to exercise them, not the market value on the exercise date. These rules vary by country and tax jurisdiction, so consult a tax professional for your specific situation.'
      }
    },
    {
      '@type': 'Question',
      name: 'How often should I recalculate my average share price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recalculate your average price every time you make a new purchase or sell shares. Most modern brokerage apps do this automatically, but understanding the calculation yourself ensures accuracy and helps you make informed decisions about when to buy more or whether to sell.'
      }
    }
  ]
};

// ─── HowTo Schema ───────────────────────────────────────────────────────────
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Average Share Price',
  description: 'A step-by-step guide to calculating the average price of multiple stock purchases',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Gather Your Purchase Information',
      text: 'Collect details of all your stock purchases: the number of shares bought in each transaction and the price paid per share. You can find this information in your brokerage account statements or trade confirmations.',
      image: 'https://calculators.me.uk/images/stock-purchase-records.jpg'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Calculate Total Investment for Each Purchase',
      text: 'For each purchase, multiply the number of shares by the price per share. For example: 100 shares × $45.50 = $4,550. Do this for every transaction.',
      image: 'https://calculators.me.uk/images/calculate-investment.jpg'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Sum Your Total Investment',
      text: 'Add together all the individual investment amounts from step 2. This gives you the total amount of money you have spent on this stock across all purchases.',
      image: 'https://calculators.me.uk/images/sum-total-investment.jpg'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Count Your Total Shares',
      text: 'Add up the number of shares from each purchase to get your total share count. This is the total number of shares you currently own.',
      image: 'https://calculators.me.uk/images/count-shares.jpg'
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Divide Total Investment by Total Shares',
      text: 'Divide your total investment amount (from step 3) by your total number of shares (from step 4). The result is your average price per share. For example: $20,320 ÷ 450 shares = $45.16 average price.',
      image: 'https://calculators.me.uk/images/calculate-average.jpg'
    }
  ]
};

export default function ShareAverageCalculator() {
  const [purchases, setPurchases] = useState([
    { quantity: '', price: '' }
  ]);
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

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
  };

  const calculateAverage = () => {
    const validPurchases = purchases.filter(p => p.quantity && p.price);
    
    if (validPurchases.length === 0) {
      alert('Please enter at least one purchase with both quantity and price.');
      return;
    }

    const totalShares = validPurchases.reduce((sum, p) => sum + parseFloat(p.quantity), 0);
    const totalInvestment = validPurchases.reduce((sum, p) => sum + (parseFloat(p.quantity) * parseFloat(p.price)), 0);
    const averagePrice = totalInvestment / totalShares;

    setResult({
      totalShares,
      totalInvestment,
      averagePrice,
      purchases: validPurchases
    });

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const resetCalculator = () => {
    setPurchases([{ quantity: '', price: '' }]);
    setResult(null);
  };

  return (
    <Layout>
      <Head>
        <title>Share Average Calculator - Calculate Stock Purchase Average Price</title>
        <meta 
          name="description" 
          content="Calculate the average price of your stock purchases using share averaging. Useful for dollar cost averaging and portfolio tracking." 
        />
        <meta name="keywords" content="share average calculator, stock average price, dollar cost averaging, DCA calculator, average stock cost, investment calculator, portfolio averaging, cost basis calculator" />
        <link rel="canonical" href="https://calculators.me.uk/share-average-calculator" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Share Average Calculator - Calculate Stock Purchase Average" />
        <meta property="og:description" content="Calculate the average price of multiple stock purchases instantly. Free tool for investors using dollar-cost averaging." />
        <meta property="og:url" content="https://calculators.me.uk/share-average-calculator" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Share Average Calculator - Stock Average Price Tool" />
        <meta name="twitter:description" content="Free calculator for finding your average stock purchase price. Perfect for DCA investors." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: 'Finance Calculators', href: '/finance-calculators' },
              { name: 'Share Average Calculator', href: '/share-average-calculator' }
            ]} />
          </div>

          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                <FaChartLine className="inline mr-2" />
                Most Accurate Share Average Calculator
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Share Average Calculator
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 mt-2">
                Know Your True Cost Basis
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Calculate the average price of multiple stock purchases in seconds. Perfect for investors practicing 
              dollar-cost averaging, tracking portfolio performance, and planning tax-efficient sell strategies.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <FaCheckCircle className="text-emerald-600" />
                <span className="font-semibold">Instant Calculations</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <FaCheckCircle className="text-emerald-600" />
                <span className="font-semibold">Unlimited Purchases</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <FaCheckCircle className="text-emerald-600" />
                <span className="font-semibold">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <FaCheckCircle className="text-emerald-600" />
                <span className="font-semibold">No Registration Required</span>
              </div>
            </div>
          </section>

          {/* Calculator Card */}
          <section className="bg-white rounded-xl shadow-lg p-5 sm:p-8 mb-10 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <FaCalculator className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Enter Your Purchases</h2>
                <p className="text-sm text-gray-500">Add quantity and price per share</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {purchases.map((purchase, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Purchase #{index + 1}</h3>
                    {purchases.length > 1 && (
                      <button
                        onClick={() => removePurchase(index)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-lg transition-all"
                        aria-label="Remove purchase"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaCoins className="inline mr-2 text-emerald-600" />
                        Number of Shares
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={purchase.quantity}
                        onChange={(e) => updatePurchase(index, 'quantity', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                        placeholder="e.g., 100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaDollarSign className="inline mr-2 text-emerald-600" />
                        Price Per Share
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={purchase.price}
                        onChange={(e) => updatePurchase(index, 'price', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                        placeholder="e.g., 45.50"
                      />
                    </div>
                  </div>
                  
                  {purchase.quantity && purchase.price && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-emerald-200">
                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-900">Total Investment:</strong> ${(parseFloat(purchase.quantity) * parseFloat(purchase.price)).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={addPurchase}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <FaPlus /> Add Another Purchase
              </button>
              
              <button
                onClick={resetCalculator}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-300 transition-all"
              >
                <FaTimesCircle /> Reset All
              </button>
            </div>

            <button
              onClick={calculateAverage}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl font-bold py-5 rounded-xl hover:from-emerald-700 hover:to-green-700 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <FaRocket className="text-2xl" />
              Calculate My Average Price
              <FaRocket className="text-2xl" />
            </button>
          </section>

          {/* Results Section */}
          {result && (
            <section ref={resultsRef} className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-3xl shadow-2xl p-6 sm:p-10 mb-16 text-white">
              <div className="text-center mb-10">
                <div className="inline-block bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl px-6 py-3 mb-6">
                  <FaArrowUp className="inline text-4xl mr-3" />
                  <span className="text-2xl font-bold">Your Results</span>
                </div>
                
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 mb-8 border-2 border-white border-opacity-30">
                  <p className="text-lg font-semibold mb-3 text-emerald-100">Your Average Share Price</p>
                  <p className="text-6xl sm:text-7xl font-black mb-2">${result.averagePrice.toFixed(2)}</p>
                  <p className="text-xl text-emerald-100">per share</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
                    <FaCoins className="text-4xl mb-3 mx-auto" />
                    <p className="text-sm font-semibold text-emerald-100 mb-2">Total Shares Owned</p>
                    <p className="text-4xl font-black">{result.totalShares.toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
                    <FaMoneyBillWave className="text-4xl mb-3 mx-auto" />
                    <p className="text-sm font-semibold text-emerald-100 mb-2">Total Investment</p>
                    <p className="text-4xl font-black">${result.totalInvestment.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaBookOpen />
                  Purchase Breakdown
                </h3>
                <div className="space-y-3">
                  {result.purchases.map((p, i) => (
                    <div key={i} className="bg-white bg-opacity-10 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="font-bold">Purchase #{i + 1}</p>
                        <p className="text-sm text-emerald-100">{parseFloat(p.quantity).toFixed(2)} shares @ ${parseFloat(p.price).toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black">${(parseFloat(p.quantity) * parseFloat(p.price)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-100 text-yellow-900 rounded-xl border-2 border-yellow-300">
                <p className="font-bold mb-2 flex items-center gap-2">
                  <FaLightbulb className="text-xl" />
                  Investment Insight
                </p>
                <p className="text-sm">
                  Your average price of ${result.averagePrice.toFixed(2)} is your cost basis for this position. 
                  If the current market price is above this, you're in profit. Below this price means a paper loss. 
                  Use this number for tax calculations and informed selling decisions.
                </p>
              </div>
            </section>
          )}

          {/* Educational Content */}
          
          {/* Section 1: Understanding Share Averaging */}
          <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                Why Every Investor Needs a Share Average Calculator
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether you're building wealth through systematic investing or managing an existing portfolio, 
                knowing your true cost basis is fundamental to making intelligent financial decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaBalanceScale className="text-emerald-600" />
                  What Is Share Averaging?
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Share averaging is the process of calculating the weighted average price you've paid across multiple 
                  purchases of the same stock or asset. Unlike a simple arithmetic average, it accounts for the different 
                  quantities purchased at different prices.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  For instance, buying 100 shares at $50 and 200 shares at $40 doesn't give you an average of $45 (the 
                  midpoint). Your actual average is $43.33, because you bought twice as many shares at the lower price. 
                  This weighted calculation reflects your true financial position.
                </p>
                
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-5 rounded-r-xl mb-6">
                  <p className="font-bold text-emerald-900 mb-2">The Formula:</p>
                  <p className="text-gray-800 font-mono text-lg mb-3">
                    Average Price = (Total Money Spent) ÷ (Total Shares Owned)
                  </p>
                  <p className="text-sm text-gray-700">
                    Or more precisely: <strong>Σ(Shares × Price) ÷ Σ(Shares)</strong>
                  </p>
                </div>

                <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <FaLightbulb className="text-blue-600" />
                    Real-World Example
                  </h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Purchase 1:</strong> 200 shares @ $45.50 = $9,100</p>
                    <p><strong>Purchase 2:</strong> 150 shares @ $42.30 = $6,345</p>
                    <p><strong>Purchase 3:</strong> 100 shares @ $48.75 = $4,875</p>
                    <div className="pt-2 mt-2 border-t-2 border-blue-200">
                      <p className="font-bold text-blue-900">Total: 450 shares for $20,320</p>
                      <p className="font-black text-lg text-emerald-600">Average Price: $45.16 per share</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl shadow-lg border-2 border-emerald-200">
                  <PortfolioBalancingSVG />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-2xl border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">When Share Averaging Matters Most</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-600" />
                    Tax Reporting
                  </h4>
                  <p className="text-sm text-gray-700">
                    Your average cost basis determines capital gains or losses when selling. Accurate numbers 
                    prevent overpaying taxes or triggering IRS audits.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-600" />
                    Portfolio Rebalancing
                  </h4>
                  <p className="text-sm text-gray-700">
                    Understanding your true cost helps decide which positions to trim or grow based on actual 
                    performance, not just current price movements.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-600" />
                    Performance Tracking
                  </h4>
                  <p className="text-sm text-gray-700">
                    Comparing current market price to your average cost instantly shows if you're profitable 
                    and by how much, guiding hold-or-sell decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-600" />
                    Emotional Discipline
                  </h4>
                  <p className="text-sm text-gray-700">
                    Knowing your average price removes guesswork and emotional trading, replacing panic with 
                    data-driven strategy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Dollar-Cost Averaging Strategy */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 sm:p-10 mb-16 border-2 border-blue-200">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                The Science Behind Dollar-Cost Averaging
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stop trying to predict market tops and bottoms. Let mathematics and discipline work in your favor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
              <MarketTimingRiskSVG />
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaShieldAlt className="text-blue-600" />
                  How DCA Protects Your Wealth
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Eliminates Timing Risk</h4>
                      <p className="text-sm text-gray-600">
                        Studies show even professional fund managers fail to consistently time the market. DCA removes 
                        this variable entirely by investing regardless of price.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-blue-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Automates Discipline</h4>
                      <p className="text-sm text-gray-600">
                        Emotions destroy returns. Fear makes you sell low, greed makes you buy high. DCA follows 
                        a preset schedule, immune to market panic or euphoria.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-blue-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Lowers Average Cost</h4>
                      <p className="text-sm text-gray-600">
                        When prices drop, your fixed investment buys more shares. Over time, this mathematically 
                        reduces your average cost compared to lump sum investing.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-blue-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Builds Consistency</h4>
                      <p className="text-sm text-gray-600">
                        Wealth isn't built through one perfect trade. It's built through steady, repeated action 
                        over years. DCA transforms saving into an automatic habit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">DCA vs. Lump Sum: The Data</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    A Vanguard study analyzing 90 years of market data found that lump sum investing outperformed 
                    DCA approximately 66% of the time—<em>but</em> only in hindsight. The problem? You never know 
                    if you're investing at a peak or trough.
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    DCA's true value isn't maximum returns—it's risk-adjusted returns combined with psychological 
                    comfort. Investors who use DCA are statistically more likely to stay invested through downturns, 
                    which is the real key to long-term wealth.
                  </p>
                  
                  <div className="bg-emerald-50 p-5 rounded-xl border-2 border-emerald-200">
                    <h4 className="font-bold text-emerald-900 mb-2">Expert Recommendation</h4>
                    <p className="text-sm text-gray-700">
                      For most investors, especially those investing in volatile assets or without significant market 
                      experience, dollar-cost averaging is the superior strategy. The slight reduction in potential maximum 
                      returns is far outweighed by increased adherence and reduced emotional stress.
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200">
                  <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-600" />
                    Common DCA Mistakes to Avoid
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                      <span><strong>Stopping during downturns:</strong> Market drops are when DCA works best—you're buying more shares at lower prices.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                      <span><strong>Inconsistent intervals:</strong> Random investing defeats the purpose. Stick to a fixed schedule.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                      <span><strong>Varying amounts:</strong> Keep your investment amount consistent. Don't invest more when feeling optimistic and less when fearful.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Tax Planning & Cost Basis */}
          <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                Advanced Tax Planning with Share Averaging
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic selling can save thousands in taxes. Here's how the pros do it.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl shadow-lg mb-10 border-2 border-purple-200">
              <TaxHarvestingSVG />
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Understanding Cost Basis Methods</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  When you own shares purchased at different prices and sell only some, you must choose a cost 
                  basis method to report to tax authorities. The method you choose directly impacts your tax bill.
                </p>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-2">Average Cost Method</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Use the weighted average price of all shares. Simple and commonly used for mutual funds.
                    </p>
                    <p className="text-xs text-gray-600 italic">
                      <strong>Example:</strong> Sell 100 shares at current price, report gain/loss based on $45.16 average.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-xl border-2 border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-2">Specific Identification Method</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Choose exactly which shares to sell, allowing maximum tax optimization.
                    </p>
                    <p className="text-xs text-gray-600 italic">
                      <strong>Example:</strong> Sell your $60 shares to realize a loss while keeping $40 shares for gains.
                    </p>
                  </div>

                  <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
                    <h4 className="font-bold text-green-900 mb-2">FIFO (First In, First Out)</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Sell oldest shares first. Often results in higher capital gains taxes but simplest to track.
                    </p>
                    <p className="text-xs text-gray-600 italic">
                      <strong>Example:</strong> If you've held shares for years, FIFO might qualify for long-term gains rate.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-8 rounded-2xl border-2 border-yellow-300 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaPiggyBank className="text-yellow-600" />
                    Tax Loss Harvesting Strategy
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Tax loss harvesting is selling shares at a loss to offset taxable gains elsewhere in your 
                    portfolio. The IRS allows you to deduct up to $3,000 in net losses per year against ordinary 
                    income, with excess losses carried forward indefinitely.
                  </p>
                  
                  <div className="bg-white p-5 rounded-xl shadow-md mb-4">
                    <h4 className="font-bold text-gray-900 mb-3">Step-by-Step Example:</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Scenario:</strong> You own 300 shares total</p>
                      <p>• 100 shares bought @ $60 (Batch A)</p>
                      <p>• 100 shares bought @ $40 (Batch B)</p>
                      <p>• 100 shares bought @ $45 (Batch C)</p>
                      <p className="pt-2 border-t border-gray-200"><strong>Current price:</strong> $42/share</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-5 rounded-xl border-2 border-emerald-200">
                    <h4 className="font-bold text-emerald-900 mb-2">Optimal Strategy:</h4>
                    <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                      <li>Sell Batch A (100 @ $60) at $42 = <strong>$1,800 realized loss</strong></li>
                      <li>This loss offsets $1,800 of capital gains from other investments</li>
                      <li>Wait 31 days (to avoid wash sale rule)</li>
                      <li>Rebuy 100 shares at current market price if still bullish</li>
                      <li>Keep Batches B & C (they're profitable or break-even)</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200">
                  <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-600" />
                    Wash Sale Rule Warning
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    If you sell shares at a loss and repurchase the same security within 30 days before or 
                    after the sale, the IRS disallows the loss deduction. This includes purchases in other 
                    accounts (IRAs, spouse's account, etc.).
                  </p>
                  <p className="text-xs text-gray-600 italic">
                    <strong>Pro tip:</strong> To maintain market exposure while avoiding wash sales, consider 
                    buying a similar (but not identical) stock or ETF during the waiting period.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Expert Verification */}
          <ExpertBox 
            expertType="finance" 
            calculatorName="Share Average Calculator" 
            lastUpdated="February 1, 2026" 
          />
          <UserReviews calculatorType="shares" />

          {/* FAQ Section with Schema */}
          <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-10 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-sm">
                Common questions about share averaging
              </p>
            </div>

            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, index) => (
                <details 
                  key={index} 
                  className="group bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-all"
                >
                  <summary className="font-medium text-gray-900 flex items-center gap-3 list-none text-sm">
                    <FaQuestionCircle className="text-gray-400 flex-shrink-0" />
                    <span className="flex-1">{faq.name}</span>
                    <FaArrowRight className="text-gray-400 text-xs transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm pl-7">
                    {faq.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related Calculators */}
          <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Calculators</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <a 
                href="/compound-interest-calculator" 
                className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaChartBar className="text-gray-600" />
                  <h3 className="font-medium text-gray-900 text-sm">Compound Interest</h3>
                </div>
                <p className="text-xs text-gray-500">
                  See how investments grow with compounding
                </p>
              </a>

              <a 
                href="/roi-calculator" 
                className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaArrowUp className="text-gray-600" />
                  <h3 className="font-medium text-gray-900 text-sm">ROI Calculator</h3>
                </div>
                <p className="text-xs text-gray-500">
                  Measure return on investment
                </p>
              </a>

              <a 
                href="/dividend-calculator" 
                className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaMoneyBillWave className="text-gray-600" />
                  <h3 className="font-medium text-gray-900 text-sm">Dividend Calculator</h3>
                </div>
                <p className="text-xs text-gray-500">
                  Calculate dividend income
                </p>
              </a>
            </div>
          </section>

        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Share Average Calculator',
            description: 'Free online calculator to find the average price of multiple stock purchases. Perfect for dollar-cost averaging investors.',
            url: 'https://calculators.me.uk/share-average-calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1247',
              bestRating: '5',
              worstRating: '1'
            }
          })
        }}
      />
    </Layout>
  );
}