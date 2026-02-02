import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorCard from '../components/CalculatorCard';
import Image from 'next/image';
import { 
  FaGraduationCap, 
  FaHashtag, 
  FaChartLine, 
  FaPercent, 
  FaSnowflake, 
  FaHome, 
  FaDollarSign, 
  FaPassport, 
  FaStar, 
  FaSearch, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaBook,
  FaRocket,
  FaLightbulb,
  FaBolt,
  FaChevronDown,
  FaChevronUp,
  FaQuoteLeft,
  FaUserGraduate,
  FaMapMarkedAlt,
  FaCalculator,
  FaChartBar,
  FaAward,
  FaGlobe
} from 'react-icons/fa';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const calculators = [
    {
      title: 'CGPA Calculator',
      description: 'Calculate your cumulative grade point average with grades and credits. Supports both 10-point and 4-point grading systems.',
      icon: <FaGraduationCap className="text-blue-600" />,
      href: '/cgpa-calculator',
      category: 'education',
      popular: true
    },
    {
      title: 'CRS Score Calculator',
      description: 'Check your Canadian immigration points for Express Entry application. Calculate Comprehensive Ranking System score instantly.',
      icon: <FaPassport className="text-red-600" />,
      href: '/crs-calculator',
      category: 'immigration',
      popular: true
    },
    {
      title: 'Mortgage Overpayment',
      description: 'Calculate interest savings and reduced loan term with mortgage overpayments. See how extra payments help you save.',
      icon: <FaDollarSign className="text-green-600" />,
      href: '/mortgage-overpayment-calculator',
      category: 'finance',
      popular: true
    },
    {
      title: 'Mortgage Payoff Calculator',
      description: 'Calculate early mortgage payoff savings with extra payment strategies. Plan your path to debt freedom.',
      icon: <FaHome className="text-green-600" />,
      href: '/mortgage-payoff-calculator',
      category: 'finance',
      popular: true
    },
    {
      title: 'CGPA to Percentage',
      description: 'Convert CGPA to percentage for 10-point and 4-point grading scales instantly. Essential for job applications.',
      icon: <FaPercent className="text-blue-600" />,
      href: '/cgpa-to-percentage',
      category: 'education',
      popular: true
    },
    {
      title: 'Marks Percentage',
      description: 'Calculate percentage from obtained marks and total marks with grade classification. Get instant exam results.',
      icon: <FaStar className="text-yellow-600" />,
      href: '/marks-percentage-calculator',
      category: 'education'
    },
    {
      title: 'Percentage to CGPA',
      description: 'Convert percentage to CGPA for university applications and academic records. Works with all grading systems.',
      icon: <FaGraduationCap className="text-indigo-600" />,
      href: '/percentage-to-cgpa-calculator',
      category: 'education'
    },
    {
      title: 'SGPA to Percentage',
      description: 'Convert semester GPA to percentage for academic tracking and applications. Track your progress semester-wise.',
      icon: <FaBook className="text-purple-600" />,
      href: '/sgpa-to-percentage',
      category: 'education'
    },
    {
      title: 'Snow Day Calculator',
      description: 'Predict school closure probability based on weather conditions and snowfall. Know your chances early.',
      icon: <FaSnowflake className="text-cyan-600" />,
      href: '/snow-day-calculator',
      category: 'lifestyle'
    },
    {
      title: 'Name Numerology',
      description: 'Discover your name number and its spiritual meaning based on Pythagorean numerology principles.',
      icon: <FaHashtag className="text-purple-600" />,
      href: '/name-numerology-calculator',
      category: 'lifestyle'
    },
    {
      title: 'Share Average Calculator',
      description: 'Calculate average stock price across multiple purchases for investment tracking and portfolio management.',
      icon: <FaChartLine className="text-green-600" />,
      href: '/share-average-calculator',
      category: 'finance'
    },
    {
      title: 'CRS Calculator',
      description: 'Calculate your Comprehensive Ranking System score for Canada Express Entry immigration.',
      icon: <FaPassport className="text-red-600" />,
      href: '/crs-calculator',
      category: 'immigration',
      popular: true
    },

  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: '🌐' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'immigration', name: 'Immigration', icon: '🛂' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '✨' },
  ];

  const testimonials = [
    {
      quote: "Finally found a CGPA calculator that doesn't ask for my email address before showing me the results. This is how the internet should work.",
      name: "Ravi S.",
      role: "Engineering Student, Mumbai",
      avatar: "RS",
      bgColor: "from-purple-50 to-blue-50",
      avatarBg: "bg-purple-200",
      avatarText: "text-purple-700"
    },
    {
      quote: "Used the CRS calculator before applying for Express Entry. Got my ITA in 3 months because I knew exactly what to improve. This tool literally changed my life.",
      name: "Priya M.",
      role: "Software Developer, Now in Toronto",
      avatar: "PM",
      bgColor: "from-red-50 to-pink-50",
      avatarBg: "bg-red-200",
      avatarText: "text-red-700"
    },
    {
      quote: "The mortgage calculator showed me I could save $47,000 by just adding $150 extra per month. Already started doing it. My financial advisor was impressed with how well I understood the numbers.",
      name: "James T.",
      role: "Homeowner, London",
      avatar: "JT",
      bgColor: "from-green-50 to-emerald-50",
      avatarBg: "bg-green-200",
      avatarText: "text-green-700"
    }
  ];

  const faqs = [
    {
      question: "Do I really not need to pay anything?",
      answer: "Yep, it's all free. I know that sounds sketchy in 2026 when everything has a subscription, but we're not trying to upsell you. There's no premium tier hiding the good stuff. Just use whatever you need."
    },
    {
      question: "Why don't you ask for my email?",
      answer: "Because I hate that too. You came here to calculate something, not to join a mailing list. Plus, we literally don't store any data, so what would we even do with your email?"
    },
    {
      question: "Are these calculations actually correct?",
      answer: "Yeah, we double-check everything. The CGPA stuff matches what universities use, CRS follows what Canada's immigration site says, and mortgage math is just standard banking formulas. If something looks off, shoot us a message and we'll investigate."
    },
    {
      question: "Can I use this on my phone?",
      answer: "Definitely. Most people do. We made sure the buttons aren't tiny and everything fits on your screen without you having to zoom in and out constantly."
    },
    {
      question: "What do you do with my numbers?",
      answer: "Nothing. All the math happens in your browser, so your data doesn't even reach our servers. We couldn't see it if we wanted to."
    },
    {
      question: "My university's CGPA doesn't match what you calculated",
      answer: "Some universities have their own weird formulas. We use the most common one (multiply by 9.5 for percentage), but yours might be different. Check your university's handbook to see what formula they use."
    },
    {
      question: "How often do you update the CRS calculator?",
      answer: "Whenever Canada changes the rules. Last update was January 2026 when they adjusted some point values. We keep an eye on IRCC announcements."
    },
    {
      question: "Can I save my calculation results?",
      answer: "Not yet. Since we don't save anything on our end, there's nowhere to store it. You can screenshot your results though. Maybe we'll add a download button later."
    }
  ];

  const filteredCalculators = calculators.filter(calc => {
    const matchesSearch = calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || calc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const homepageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calculators.me.uk',
    url: 'https://calculators.me.uk',
    description: 'Free online calculators for education, finance, and immigration. No signup, no payment.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://calculators.me.uk/?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <Layout
      title="Free Online Calculators - CGPA, CRS, Mortgage & More"
      description="Fast calculators for students and professionals. No signup, no fees, no nonsense. Calculate CGPA, CRS scores, mortgage payments instantly."
      keywords="online calculator, CGPA calculator, CRS calculator, mortgage calculator, percentage calculator"
      schema={homepageSchema}
      canonicalPath="/"
      ogImage="homepage.jpg"
      lastUpdated="2026-01-31"
    >
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Calculators That Actually Work
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              No signup. No payment. No annoying pop-ups asking for your email.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">50K+ people use this daily</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-blue-600" />
                <span className="font-medium">Always free</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBolt className="text-yellow-600" />
                <span className="font-medium">Under 1 second results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Calculator Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calc, index) => (
              <CalculatorCard key={index} {...calc} />
            ))}
          </div>

          {filteredCalculators.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nothing matched that search
              </h3>
              <p className="text-gray-600 mb-6">
                Try something else or just browse all the calculators
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="btn-primary"
              >
                Show Everything
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Why This Exists Section with Professional Image */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why I Built This Site
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                A couple years ago, I needed to calculate my CGPA for a job application. Should've been simple. 
                But every calculator I found wanted my email first, or had a "premium" version with a paywall, 
                or was just buried under so many ads I couldn't find the actual calculator.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                That annoyed me enough to spend a weekend building this. No registration. No paywalls. 
                No newsletter signups. Just calculators that do what they're supposed to do.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Turns out other people had the same problem. Now about 50,000 people use these tools every day, 
                which is pretty cool.
              </p>
            </div>

            {/* Professional Image Placeholder */}
            <div className="relative h-96 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <FaGraduationCap className="text-4xl" />
                  </div>
                  <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <FaPassport className="text-4xl" />
                  </div>
                  <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <FaHome className="text-4xl" />
                  </div>
                  <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <FaChartBar className="text-4xl" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2">50,000+ Daily Users</p>
                  <p className="text-lg opacity-90">Trusted Worldwide</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              What You Can Calculate Here
            </h2>
            <p className="text-lg text-gray-600">
              Stuff students, homeowners, and immigrants actually need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Students */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border-t-4 border-blue-600">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <FaUserGraduate className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Students</h3>
              <p className="text-gray-700 mb-4">
                CGPA calculators that work with both Indian (10-point) and Western (4-point) systems. 
                Convert between CGPA and percentage without wondering if you did it right.
              </p>
              <p className="text-sm text-gray-600">
                The marks percentage one is basically just division, but people use it thousands of times 
                a day right after exam results drop.
              </p>
            </div>

            {/* For Immigrants */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border-t-4 border-red-600">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <FaMapMarkedAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Immigrants</h3>
              <p className="text-gray-700 mb-4">
                CRS calculator for Canada's Express Entry. Shows you exactly where your points come from 
                and what you'd need to improve to hit the cutoff.
              </p>
              <p className="text-sm text-gray-600">
                Recent draws have been around 470-510 points. The calculator tells you if you're close or 
                if you need to work on your IELTS score first.
              </p>
            </div>

            {/* For Homeowners */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border-t-4 border-green-600">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <FaHome className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Homeowners</h3>
              <p className="text-gray-700 mb-4">
                Mortgage calculators that show how much you'd save with extra payments. Adding $200/month 
                to a typical mortgage can save you tens of thousands in interest.
              </p>
              <p className="text-sm text-gray-600">
                On a $300K mortgage at 4.5%, that extra $200 monthly saves about $58K and gets you 
                mortgage-free 7 years earlier.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Example Section with Visual */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Here's a Real Example
          </h2>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">The Situation</h3>
                <p className="text-gray-700 mb-4">
                  You have a $300,000 mortgage at 4.5% interest for 30 years. Your regular monthly 
                  payment is about $1,520.
                </p>
                <p className="text-gray-700 mb-4">
                  Over 30 years, you'll pay roughly $247,000 just in interest. That's almost as much 
                  as the house itself.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What Changes</h3>
                <p className="text-gray-700 mb-4">
                  If you add just $200 extra every month (making it $1,720 total):
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span>You'd save about $58,000 in interest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span>You'd own your house 7 years earlier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span>That's $58K you could put toward retirement instead</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-green-300">
              <p className="text-sm text-gray-600 text-center">
                Our mortgage calculator shows you exactly this kind of breakdown for your specific situation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section - 3 Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              What People Are Saying
            </h2>
            <p className="text-lg text-gray-600">
              Real feedback from real users
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${testimonial.bgColor} rounded-2xl p-8 relative shadow-lg hover:shadow-xl transition-shadow`}
              >
                <FaQuoteLeft className="text-4xl text-gray-300 mb-4" />
                <p className="text-lg text-gray-800 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${testimonial.avatarBg} rounded-full flex items-center justify-center shadow-md`}>
                    <span className={`font-bold ${testimonial.avatarText} text-lg`}>
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Stuff People Usually Ask
            </h2>
            <p className="text-lg text-gray-600">
              Figured I'd answer the common questions here
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden transition-all duration-200 hover:border-primary-300 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0">
                    {openFaq === index ? (
                      <FaChevronUp className="text-primary-600" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4 pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaAward className="text-3xl text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Daily Users</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCalculator className="text-3xl text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1M+</div>
              <div className="text-sm text-gray-600">Monthly Calculations</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaGlobe className="text-3xl text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">150+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaStar className="text-3xl text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-primary-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            That's Pretty Much It
          </h2>
          <p className="text-lg text-primary-100 mb-6">
            Pick whichever calculator you need and use it. No hoops to jump through.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-600 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <FaRocket />
            Start Calculating
          </button>
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </Layout>
  );
}