import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CalculatorCard from '../components/CalculatorCard';
import { FaGraduationCap, FaHashtag, FaChartLine, FaPercent, FaSnowflake, FaHome, FaDollarSign, FaPassport, FaStar, FaSearch, FaRocket, FaShieldAlt, FaMobileAlt, FaCheckCircle, FaClock, FaLock, FaChartBar, FaBook } from 'react-icons/fa';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calculators = [
    {
      title: 'CGPA Calculator',
      description: 'Calculate your cumulative grade point average with grades and credits for accurate GPA tracking.',
      icon: <FaGraduationCap className="text-blue-600" />,
      href: '/cgpa-calculator',
      category: 'education',
      popular: true
    },
    {
      title: 'CRS Calculator',
      description: 'Calculate your Comprehensive Ranking System score for Canada Express Entry immigration.',
      icon: <FaPassport className="text-red-600" />,
      href: '/crs-calculator',
      category: 'immigration',
      popular: true
    },
    {
      title: 'Mortgage Payoff',
      description: 'Calculate early mortgage payoff savings with extra payment strategies.',
      icon: <FaHome className="text-green-600" />,
      href: '/mortgage-payoff-calculator',
      category: 'finance',
      popular: true
    },
    {
      title: 'Name Numerology',
      description: 'Discover your name number and its spiritual meaning based on Pythagorean numerology.',
      icon: <FaHashtag className="text-purple-600" />,
      href: '/name-numerology-calculator',
      category: 'lifestyle'
    },
    {
      title: 'Share Average Calculator',
      description: 'Calculate average stock price across multiple purchases for investment tracking.',
      icon: <FaChartLine className="text-green-600" />,
      href: '/share-average-calculator',
      category: 'finance'
    },
    {
      title: 'CGPA to Percentage',
      description: 'Convert CGPA to percentage for 10-point and 4-point grading scales instantly.',
      icon: <FaPercent className="text-blue-600" />,
      href: '/cgpa-to-percentage',
      category: 'education'
    },
    {
      title: 'Marks Percentage',
      description: 'Calculate percentage from obtained marks and total marks with grade classification.',
      icon: <FaStar className="text-yellow-600" />,
      href: '/marks-percentage-calculator',
      category: 'education'
    },
    {
      title: 'Percentage to CGPA',
      description: 'Convert percentage to CGPA for university applications and academic records.',
      icon: <FaGraduationCap className="text-indigo-600" />,
      href: '/percentage-to-cgpa-calculator',
      category: 'education'
    },
    {
      title: 'SGPA to Percentage',
      description: 'Convert semester GPA to percentage for academic tracking and applications.',
      icon: <FaBook className="text-purple-600" />,
      href: '/sgpa-to-percentage',
      category: 'education'
    },
    {
      title: 'Snow Day Calculator',
      description: 'Predict school closure probability based on weather conditions and snowfall.',
      icon: <FaSnowflake className="text-cyan-600" />,
      href: '/snow-day-calculator',
      category: 'lifestyle'
    },
    {
      title: 'Mortgage Overpayment',
      description: 'Calculate interest savings and reduced loan term with mortgage overpayments.',
      icon: <FaDollarSign className="text-green-600" />,
      href: '/mortgage-overpayment-calculator',
      category: 'finance',
      popular: true
    },
    {
      title: 'CRS Score Calculator',
      description: 'Check your Canadian immigration points for Express Entry application.',
      icon: <FaPassport className="text-indigo-600" />,
      href: '/crs-score-calculator',
      category: 'immigration'
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🌐' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'immigration', name: 'Immigration', icon: '🛂' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '✨' },
  ];

  const filteredCalculators = calculators.filter(calc => {
    const matchesSearch = calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || calc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout
      title="Free Online Calculators - CGPA, CRS, Mortgage & More"
      description="Professional online calculators for students, immigrants, and homeowners. Calculate CGPA, CRS scores, mortgage payments, and more. Fast, accurate, and 100% free."
      keywords="online calculator, CGPA calculator, CRS calculator, mortgage calculator, percentage calculator, free calculator, education calculator, immigration calculator"
    >
      {/* Compact Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        </div>

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3 text-xs sm:text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="font-medium">Trusted by 50,000+ users worldwide</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
              Professional Calculators
              <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                For Every Need
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-primary-100 mb-5 leading-relaxed px-4">
              Fast, accurate, and free calculators for students, professionals, and homeowners across India, USA, UK, and Canada.
            </p>

            {/* Compact Search */}
            <div className="max-w-2xl mx-auto mb-4 px-4">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base" />
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl text-gray-900 text-sm sm:text-base shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
                />
              </div>
            </div>

            {/* Compact Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 px-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-white text-primary-700 shadow-lg scale-105'
                      : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 5C120 10 240 20 360 23.3C480 26.5 600 23.5 720 21.7C840 20 960 20 1080 23.3C1200 26.5 1320 33.5 1380 36.7L1440 40V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-6 sm:py-10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: <FaCheckCircle />, value: '50K+', label: 'Users' },
              { icon: <FaClock />, value: '<1s', label: 'Speed' },
              { icon: <FaLock />, value: '100%', label: 'Secure' },
              { icon: <FaChartBar />, value: '99.9%', label: 'Accurate' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl mb-2 text-primary-600 text-lg sm:text-xl">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1.5 rounded-full border border-yellow-300">
              <FaStar className="text-yellow-600 text-sm" />
              <span className="font-bold text-gray-800 text-sm">Featured Tools</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>

          {filteredCalculators.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="text-4xl sm:text-5xl mb-3">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No calculators found</h3>
              <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCalculators.map((calc, index) => (
                <div key={index} className="relative">
                  {calc.popular && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <FaStar className="text-xs" />
                        <span className="hidden sm:inline">Popular</span>
                      </div>
                    </div>
                  )}
                  <CalculatorCard {...calc} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-white py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Your Trusted Online Calculator Platform
            </h2>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to <strong>Calculators.me.uk</strong> – your comprehensive solution for all calculation needs. Whether you're a student tracking academic performance, a professional planning finances, or an immigrant preparing for relocation, our platform offers accurate, fast, and completely free calculators designed specifically for users in <strong>India, USA, UK, and Canada</strong>.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-8">Why should you Choose Our Calculators?</h3>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 my-6">
              {[
                { icon: <FaRocket />, title: 'Lightning Fast Performance', desc: 'Get instant results with our optimized calculation engine. No waiting, no delays.' },
                { icon: <FaShieldAlt />, title: '100% Data Privacy', desc: 'Your calculations stay on your device. We never store or share your personal data.' },
                { icon: <FaMobileAlt />, title: 'Mobile Optimized', desc: 'Perfect experience on any device - phone, tablet, or desktop. Calculate anywhere.' },
                { icon: <FaCheckCircle />, title: 'Verified Accuracy', desc: 'All formulas validated by experts. Trusted by 50,000+ users worldwide.' },
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
                  <div className="text-2xl sm:text-3xl text-primary-600 flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-8">Popular Calculator Categories</h3>
            
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 mt-6">📚 Education Calculators</h4>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Our <strong>CGPA calculator</strong> helps students in India, USA, UK, and Canada track their cumulative grade point average with precision. Convert between <strong>CGPA to percentage</strong> or <strong>percentage to CGPA</strong> using standard conversion formulas for 10-point and 4-point scales. Calculate your <strong>marks percentage</strong> and <strong>SGPA to percentage</strong> instantly for exam results and academic applications.
            </p>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 mt-6">💰 Finance Calculators</h4>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Plan your financial future with our <strong>mortgage payoff calculator</strong> and <strong>mortgage overpayment calculator</strong>. Discover how extra payments can save thousands in interest and reduce your loan term by years. Our <strong>share average calculator</strong> helps investors track stock purchases and calculate average cost basis for tax reporting and portfolio management.
            </p>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 mt-6">🛂 Immigration Calculators</h4>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Planning to immigrate to Canada? Our <strong>CRS calculator</strong> (Comprehensive Ranking System calculator) helps you determine your Express Entry points based on age, education, language proficiency, and work experience. The <strong>CRS score calculator</strong> provides detailed breakdowns to help you improve your immigration chances and understand Canadian immigration requirements.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-8">How Our Calculators Work</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Each calculator is built with validated mathematical formulas and industry-standard algorithms. Simply enter your data, click calculate, and receive instant, accurate results. All calculations are performed locally in your browser, ensuring complete privacy and lightning-fast performance without server delays.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-8">Free Forever, No Hidden Costs</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Unlike many online calculator platforms that require subscriptions or display intrusive ads, Calculators.me.uk is completely free with no registration required. Our mission is to provide accessible, professional-grade calculation tools to everyone who needs them. We believe essential tools should be free for all.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-8">Trusted Across Multiple Countries</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Our calculators support regional variations and standards for users in India, United States, United Kingdom, and Canada. Whether you're calculating CGPA using the Indian education system, mortgage payments with UK interest rates, or CRS scores for Canadian immigration, our tools adapt to your specific requirements.
            </p>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-4 sm:p-6 my-6 sm:my-8 rounded-r-lg">
              <p className="text-sm sm:text-base text-gray-800 font-medium">
                <strong>Start calculating now</strong> – Choose any calculator above and get instant, accurate results. No signup, no payment, no hassle. Just reliable calculations when you need them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Calculate?
          </h2>
          <p className="text-base sm:text-lg text-primary-100 mb-6">
            Join 50,000+ users who trust our calculators daily
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 sm:px-8 py-3 rounded-full font-bold text-base shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
          >
            <FaRocket />
            Get Started Free
          </button>
        </div>
      </div>
    </Layout>
  );
}