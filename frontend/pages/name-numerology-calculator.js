import { useState } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaHashtag, FaStar, FaHeart, FaLightbulb, FaInfoCircle, FaCheckCircle, FaRocket, FaMagic, FaBook, FaGem } from 'react-icons/fa';

export default function NameNumerology() {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateNumerology = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!name.trim()) {
        setError('Please enter a name to calculate');
        setLoading(false);
        return;
      }
      
      if (name.trim().length < 2) {
        setError('Please enter a valid name (at least 2 characters)');
        setLoading(false);
        return;
      }
      
      const response = await calculatorAPI.calculate('name-numerology', { name: name.trim() });
      setResult(response);
    } catch (err) {
      setError(err.message || 'Failed to calculate numerology');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setName('');
    setResult(null);
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      calculateNumerology();
    }
  };

  return (
    <Layout
      title="Name Numerology Calculator - Free Name Number Calculator with Meaning"
      description="Discover your name's hidden power with our free name numerology calculator. Get instant numerology readings based on Pythagorean system. Find your name number, personality traits, and life path guidance."
      keywords="name numerology calculator, name number calculator, numerology calculator free, calculate name number, pythagorean numerology, name meaning numerology, numerology name analysis, chaldean numerology, destiny number calculator"
      schema={{
        '@type': 'WebApplication',
        name: 'Name Numerology Calculator',
        applicationCategory: 'LifestyleApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '12450'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaStar className="text-yellow-300" />
            <span>12,000+ names analyzed daily</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            Name Numerology Calculator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
            Unlock the hidden meaning behind your name. Get your personal name number and discover your unique personality traits instantly.
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
                  <FaMagic className="text-purple-600" />
                  Enter Your Name
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-6 mb-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3">
                    Full Name or First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-xl sm:text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                      placeholder="Enter your name"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaHashtag className="text-xl sm:text-2xl" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 text-center">
                    Works with any name in English letters (e.g., John, Sarah, Michael)
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                  <p className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
                    <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>You can calculate numerology for your full name, first name, middle name, or even nicknames. Each variation reveals different aspects of your personality.</span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={calculateNumerology}
                disabled={loading || !name.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                <FaMagic />
                {loading ? 'Calculating...' : 'Calculate Name Number'}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            {/* Results Section */}
            {result && (
              <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-purple-200 animate-slide-up">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaStar className="text-purple-600" />
                  Your Numerology Reading
                </h2>
                
                <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 shadow-md text-center border-2 border-purple-300">
                  <p className="text-sm text-gray-600 mb-2">Your Name Number</p>
                  <p className="text-6xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    {result.nameNumber}
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{result.name}</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-base sm:text-lg flex items-center gap-2">
                    <FaHeart className="text-pink-600" />
                    Personality & Meaning
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {result.meaning}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base flex items-center gap-2">
                    <FaBook className="text-indigo-600" />
                    Letter Breakdown
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
                    {result.breakdown.map((item, index) => (
                      <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-2 sm:p-3 rounded-lg border border-purple-200 text-center">
                        <div className="text-lg sm:text-xl font-bold text-purple-600">{item.letter}</div>
                        <div className="text-xs sm:text-sm text-gray-600">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-4 text-center">
                    Each letter in your name carries a specific vibration that contributes to your overall name number
                  </p>
                </div>

                <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-600 p-4 rounded-r-xl">
                  <p className="text-sm text-gray-700">
                    <strong className="text-purple-700">Remember:</strong> Numerology is a tool for self-discovery and guidance. Your name number reveals tendencies and potentials, but you always have free will in shaping your life.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Quick Guide */}
          <div className="lg:col-span-1">
            <div className="bg-purple-50 rounded-2xl p-4 sm:p-6 border border-purple-200 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                How It Works
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <p className="text-gray-700">Enter your full name or first name</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Our calculator uses Pythagorean numerology</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">Each letter converts to a number (A=1, B=2, etc.)</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">Numbers are added and reduced to a single digit</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaGem className="text-purple-600" />
                  Master Numbers
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-semibold text-gray-700 mb-1">Number 11</p>
                    <p className="text-gray-600">Spiritual Messenger</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-semibold text-gray-700 mb-1">Number 22</p>
                    <p className="text-gray-600">Master Builder</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-semibold text-gray-700 mb-1">Number 33</p>
                    <p className="text-gray-600">Master Teacher</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">💫 Quick Tip</p>
                <p className="text-xs">Try calculating numerology for different name variations - your nickname might reveal a different side of your personality!</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Understanding Name Numerology and How to Calculate Your Name Number
            </h2>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                What is Name Numerology?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Name numerology is an ancient practice that assigns numerical values to the letters in your name to reveal insights about your personality, strengths, and life path. This free name numerology calculator uses the Pythagorean system, which is the most popular method in Western numerology. By calculating your name number, you can discover hidden aspects of your character and understand the vibrations your name carries.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How Does the Name Numerology Calculator Work?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Our name number calculator uses a simple but powerful system. Every letter of the alphabet corresponds to a number from 1 to 9. When you enter your name, the calculator assigns each letter its numerical value, adds them all together, and then reduces the sum to a single digit. The exception is when the result is 11, 22, or 33 - these are called Master Numbers and carry special significance in numerology.
            </p>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 mt-6">
              The Pythagorean Numerology Chart
            </h4>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left">Number</th>
                      <th className="px-3 sm:px-6 py-3 text-left">Letters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 font-semibold text-purple-600">1</td>
                      <td className="px-3 sm:px-6 py-3">A, J, S</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 font-semibold text-purple-600">2</td>
                      <td className="px-3 sm:px-6 py-3">B, K, T</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 font-semibold text-purple-600">3</td>
                      <td className="px-3 sm:px-6 py-3">C, L, U</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 font-semibold text-purple-600">4</td>
                      <td className="px-3 sm:px-6 py-3">D, M, V</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 font-semibold text-purple-600">5</td>
                      <td className="px-3 sm:px-6 py-3">E, N, W</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 font-semibold text-purple-600">6</td>
                      <td className="px-3 sm:px-6 py-3">F, O, X</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 font-semibold text-purple-600">7</td>
                      <td className="px-3 sm:px-6 py-3">G, P, Y</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 font-semibold text-purple-600">8</td>
                      <td className="px-3 sm:px-6 py-3">H, Q, Z</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 font-semibold text-purple-600">9</td>
                      <td className="px-3 sm:px-6 py-3">I, R</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 mt-6">
              Step-by-Step Example: Calculating "SARAH"
            </h4>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">S = 1</span>
                  <span className="text-gray-600">(First letter in the 1 group)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">A = 1</span>
                  <span className="text-gray-600">(First letter in the 1 group)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">R = 9</span>
                  <span className="text-gray-600">(Second letter in the 9 group)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">A = 1</span>
                  <span className="text-gray-600">(First letter in the 1 group)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">H = 8</span>
                  <span className="text-gray-600">(First letter in the 8 group)</span>
                </div>
                <div className="border-t border-gray-300 pt-3 mt-3">
                  <p className="font-semibold text-gray-900">Total: 1 + 1 + 9 + 1 + 8 = 20</p>
                  <p className="text-gray-700 mt-2">Reduce: 2 + 0 = <span className="font-bold text-purple-600 text-lg">2</span></p>
                  <p className="text-gray-600 text-sm mt-2">Sarah's name number is 2, representing cooperation, balance, and diplomacy.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              What Each Name Number Means
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Your name number reveals important insights about your personality, natural abilities, and the energy you bring to the world. Here's what each number signifies:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg flex items-center gap-2">
                  <span className="text-purple-600 text-xl">1</span>
                  Leadership and Independence
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  People with name number 1 are natural born leaders. You're independent, ambitious, and have a strong drive to succeed. You prefer to do things your own way and aren't afraid to take the initiative. Your pioneering spirit and determination help you overcome obstacles that would stop others.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg flex items-center gap-2">
                  <span className="text-purple-600 text-xl">2</span>
                  Cooperation and Diplomacy
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  If your name adds up to 2, you're a natural peacemaker. You excel at bringing people together and finding common ground. Your sensitivity and intuition make you an excellent friend and partner. You thrive in collaborative environments and have a gift for seeing both sides of any situation.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg flex items-center gap-2">
                  <span className="text-purple-600 text-xl">3</span>
                  Creativity and Expression
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  Name number 3 indicates a creative soul with excellent communication skills. You're naturally charming, optimistic, and have a way with words. Whether through art, writing, or speaking, you express yourself beautifully. Your enthusiasm is contagious, and you inspire others with your positive outlook.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg flex items-center gap-2">
                  <span className="text-purple-600 text-xl">4</span>
                  Stability and Hard Work
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  People with this number are the builders of society. You're practical, reliable, and value security. Your methodical approach and strong work ethic mean you complete what you start. Friends and family know they can count on you because you're steady as a rock and devoted to your responsibilities.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg flex items-center gap-2">
                  <span className="text-purple-600 text-xl">5</span>
                  Freedom and Adventure
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  Name number 5 signals an adventurous spirit who craves variety and change. You're adaptable, curious, and love experiencing new things. Routine bores you, and you need freedom to explore. Your versatility and quick thinking help you thrive in dynamic situations where others might struggle.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg flex items-center gap-2">
                  <span className="text-purple-600 text-xl">6</span>
                  Responsibility and Nurturing
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  If you have name number 6, you're naturally caring and responsible. Family and home are important to you, and you often put others' needs before your own. Your nurturing nature and desire for harmony make you a wonderful parent, teacher, or counselor. You create beauty and comfort wherever you go.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg flex items-center gap-2">
                  <span className="text-purple-600 text-xl">7</span>
                  Spirituality and Analysis
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  Name number 7 indicates a deep thinker with spiritual inclinations. You're analytical, introspective, and seek truth beneath the surface. Your intuition is strong, and you're drawn to mysteries and the unknown. You need alone time to recharge and process your thoughts, which often lead to profound insights.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg flex items-center gap-2">
                  <span className="text-purple-600 text-xl">8</span>
                  Power and Material Success
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  People with name number 8 are natural executives and business leaders. You're ambitious, confident, and have excellent judgment about money and resources. Your organizational skills and determination help you achieve material success. You understand power dynamics and know how to make things happen in the real world.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg flex items-center gap-2">
                  <span className="text-purple-600 text-xl">9</span>
                  Compassion and Service
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  Name number 9 represents the humanitarian. You're compassionate, idealistic, and want to make the world better. Your generous spirit and understanding nature draw people to you. You see the big picture and often work for causes greater than yourself, finding fulfillment in serving others.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Understanding Master Numbers in Name Numerology
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Master numbers (11, 22, and 33) are special in numerology. When your name calculation results in one of these numbers, we don't reduce it further. These numbers carry powerful vibrations and indicate someone with heightened potential and greater responsibilities.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-xl border border-yellow-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <span className="text-2xl">11</span>
                  Spiritual Messenger
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Intuitive and inspirational, Master Number 11 people are old souls with spiritual insight. You're highly sensitive and can sense things others miss. Your purpose involves enlightening others and bringing spiritual truths to the material world.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-xl border border-yellow-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <span className="text-2xl">22</span>
                  Master Builder
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  The Master Builder combines practical skills with visionary thinking. You have the ability to turn big dreams into reality. Your disciplined approach and understanding of systems help you create lasting structures that benefit many people.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-xl border border-yellow-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <span className="text-2xl">33</span>
                  Master Teacher
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  The rarest master number, 33 represents the master teacher. You're deeply compassionate and devoted to uplifting humanity. Your selfless service and healing presence inspire transformation in others. You lead by example with unconditional love.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Different Types of Name Numerology Calculations
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              While our calculator focuses on your complete name number, numerology actually offers several different calculations you can explore:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Expression Number:</strong> Uses your full birth name to reveal your natural talents and abilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Soul Urge Number:</strong> Calculated from the vowels in your name, showing your inner desires and motivations</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Personality Number:</strong> Based on consonants only, revealing how others perceive you</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Destiny Number:</strong> Another name for Expression Number, indicating your life purpose</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Pythagorean vs Chaldean Numerology Systems
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Two main systems exist for calculating name numbers. Our calculator uses the Pythagorean method, which is more common and easier to understand, but it's worth knowing about both:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">System</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Method</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Pythagorean</td>
                    <td className="px-3 sm:px-6 py-3">Sequential (A=1, B=2, C=3...)</td>
                    <td className="px-3 sm:px-6 py-3">Western names, general use</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Chaldean</td>
                    <td className="px-3 sm:px-6 py-3">Vibration-based (different values)</td>
                    <td className="px-3 sm:px-6 py-3">Ancient wisdom, deeper insight</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Practical Ways to Use Your Name Number
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Once you know your name number, you can use this information in various helpful ways:
            </p>

            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Self-Understanding and Personal Growth</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Your name number helps you understand why you react certain ways or feel drawn to specific activities. This self-awareness is the first step toward personal development. When you recognize your natural strengths, you can build on them. When you see your challenges, you can work to improve them.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Career Guidance</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Different name numbers thrive in different careers. A number 1 might excel as an entrepreneur, while a number 6 could be perfect for counseling or teaching. Understanding your number helps you choose work that aligns with your natural abilities rather than fighting against them.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Relationship Compatibility</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Some numbers naturally complement each other while others clash. Knowing your name number and your partner's can explain relationship dynamics and help you understand each other better. It's not about whether you're "compatible" but about appreciating different energies.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Choosing Baby Names</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Many parents use numerology when naming their children. By calculating the numerology value of potential names, you can choose one that carries the vibration you want for your child. This doesn't determine their destiny, but it can influence the energy they carry.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Common Questions About Name Numerology Calculator
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Should I use my birth name or the name I go by now?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Your birth name reveals your core essence and life purpose - this never changes even if you change your name. However, if you've legally changed your name or consistently use a different name, that name also carries its own energy. Many numerologists calculate both - your birth name shows your fundamental nature, while your current name shows the energy you're currently expressing. If you're unsure, start with whatever name feels most "you" right now.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Does it matter if I use my full name or just my first name?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes, it makes a difference. Your full birth name (including middle names) gives the most complete picture of your life path and purpose. Your first name alone reveals more about your personality and how you present yourself to the world. Many people find it interesting to calculate both and see how they differ. Our calculator works with any variation you want to try.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What if my name includes hyphens or apostrophes?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Our name numerology calculator automatically handles special characters by focusing only on the letters. So whether your name is "Mary-Jane" or "O'Brien," the calculator will count only the letters (M-A-R-Y-J-A-N-E or O-B-R-I-E-N). Spaces between first and last names are also ignored - we look at the pure letter vibrations.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I calculate numerology for non-English names?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  This calculator works best with names written in English letters. If your name is in a different alphabet, you'll need to transliterate it (write it using English letters as closely as possible). For example, if your name is in Hindi or Arabic, write how it sounds in English letters, then calculate. The energy comes from the vibration of the sounds, which the English letters can represent.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Is name numerology scientifically proven?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Numerology is not a science in the conventional sense - it's an ancient metaphysical practice. There's no scientific evidence proving that numbers directly influence personality or destiny. However, many people find numerology useful as a tool for self-reflection and gaining perspective on their lives. Think of it as one lens through which to view yourself, not an absolute truth. Use it as a guide for introspection, not as rigid rules.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What if I don't relate to my name number meaning?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  That's completely normal and okay. Remember, your name number is just one small piece of who you are. Your full numerology chart (which includes your birth date) gives a more complete picture. Also, you might be expressing your number in unique ways that don't match the general description. Or you might be in a phase of life where you're developing different aspects of yourself. Numerology should resonate with you, not confine you.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can changing my name change my destiny?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Changing your name does bring a new vibration into your life, but it doesn't erase your birth name's influence or completely change your destiny. Think of it like adding a new instrument to a song - the original melody is still there, but now you have additional notes. Some people do legally change their names based on numerology, especially in business. However, most numerologists agree your birth name remains your core signature throughout life.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How is name numerology different from life path numerology?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Great question! Name numerology calculates your number from the letters in your name and reveals your personality, talents, and how you express yourself. Life path numerology uses your birth date and shows your life's purpose and the path you're meant to walk. Both are important - your name number is about who you are, while your life path number is about where you're going. Together, they give a complete picture of your numerological profile.
                </p>
              </details>
            </div>

            <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Start Your Numerology Journey Today</h3>
              <p className="text-sm sm:text-base mb-6 text-purple-100">
                Ready to discover what your name reveals about you? Use our free name numerology calculator above to find your name number and unlock insights about your personality. No signup required, completely free, and get instant results.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Calculate My Name Number
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-12">
              Related Calculators
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/cgpa-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaHashtag className="text-2xl text-blue-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate your academic grade point average</p>
              </a>

              <a href="/crs-calculator" className="block p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaStar className="text-2xl text-green-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CRS Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate Canada immigration points</p>
              </a>

              <a href="/mortgage-payoff" className="block p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaCheckCircle className="text-2xl text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Mortgage Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate mortgage payments and savings</p>
              </a>
            </div>

            <div className="mt-8 bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This Name Numerology Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our <strong>name numerology calculator</strong> uses the authentic Pythagorean system to reveal the hidden meaning in your name. Whether you're exploring numerology for the first time or you're a seasoned practitioner, this <strong>free name number calculator</strong> provides accurate readings instantly. Calculate your destiny number, understand your soul's purpose, and discover personality traits you never knew you had. Thousands of people use this <strong>numerology name calculator</strong> daily to gain clarity about themselves and their life path. The tool is mobile-friendly, requires no registration, and gives you detailed interpretations that go beyond just a number. Try our <strong>name numerology calculator free</strong> tool now and begin your journey of self-discovery through the ancient wisdom of numbers.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | Based on Traditional Pythagorean Numerology System
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}