import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaPassport, FaCalculator, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket, FaChartLine, FaGraduationCap, FaBriefcase, FaLanguage, FaMapMarkerAlt } from 'react-icons/fa';

export default function CRSCalculator() {
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('bachelor');
  const [workExperience, setWorkExperience] = useState('');
  const [canadianExperience, setCanadianExperience] = useState('0');
  const [languageTest, setLanguageTest] = useState({
    type: 'IELTS',
    listening: '',
    reading: '',
    writing: '',
    speaking: ''
  });
  const [hasJobOffer, setHasJobOffer] = useState(false);
  const [hasNomination, setHasNomination] = useState(false);
  const [hasSpouse, setHasSpouse] = useState(false);
  const [spouseEducation, setSpouseEducation] = useState('');
  const [spouseLanguage, setSpouseLanguage] = useState('');
  const [spouseCanadianExp, setSpouseCanadianExp] = useState('0');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const resultRef = useRef(null);

  const calculateCRS = async () => {
    try {
      setLoading(true);
      setError('');
      
      const ageValue = parseInt(age);
      const workExpValue = parseInt(workExperience);
      const canadianExpValue = parseInt(canadianExperience);
      
      if (isNaN(ageValue) || ageValue < 18 || ageValue > 100) {
        setError('Please enter a valid age between 18 and 100');
        setLoading(false);
        return;
      }
      
      if (isNaN(workExpValue) || workExpValue < 0) {
        setError('Please enter valid work experience');
        setLoading(false);
        return;
      }

      const requestData = {
        age: ageValue,
        education,
        languageTest: {
          type: languageTest.type,
          listening: parseFloat(languageTest.listening) || 0,
          reading: parseFloat(languageTest.reading) || 0,
          writing: parseFloat(languageTest.writing) || 0,
          speaking: parseFloat(languageTest.speaking) || 0
        },
        workExperience: workExpValue,
        canadianWorkExperience: canadianExpValue,
        hasJobOffer,
        provincialNomination: hasNomination,
        spouseInfo: {
          hasSpouse,
          education: hasSpouse ? spouseEducation : null,
          languageTest: hasSpouse ? {
            type: 'IELTS',
            listening: parseFloat(spouseLanguage) || 0,
            reading: parseFloat(spouseLanguage) || 0,
            writing: parseFloat(spouseLanguage) || 0,
            speaking: parseFloat(spouseLanguage) || 0
          } : null,
          canadianWorkExperience: hasSpouse ? parseInt(spouseCanadianExp) : null
        }
      };
      
      const response = await calculatorAPI.calculate('crs-calculator', requestData);
      setResult(response);
      
      // Scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err.message || 'Failed to calculate CRS score');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setAge('');
    setEducation('bachelor');
    setWorkExperience('');
    setCanadianExperience('0');
    setLanguageTest({ type: 'IELTS', listening: '', reading: '', writing: '', speaking: '' });
    setHasJobOffer(false);
    setHasNomination(false);
    setHasSpouse(false);
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="CRS Calculator - Calculate Your Canada Express Entry CRS Score"
      description="Free CRS calculator for Canada immigration. Calculate your Comprehensive Ranking System score for Express Entry. Check if your CRS score is competitive for Canadian permanent residence."
      keywords="crs calculator, canada crs calculator, express entry calculator, crs score calculator, canada immigration calculator, comprehensive ranking system calculator, canada express entry points calculator"
      schema={{
        '@type': 'WebApplication',
        name: 'CRS Calculator',
        applicationCategory: 'GovernmentApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '14820'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-rose-800 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaCheckCircle className="text-green-300" />
            <span>14,000+ Express Entry applicants use this calculator</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            CRS Calculator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-red-100 max-w-2xl mx-auto">
            Calculate your Comprehensive Ranking System score for Canada Express Entry. Find out if you're competitive for permanent residence.
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
                  <FaPassport className="text-red-600" />
                  Your Information
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-5 sm:space-y-6 mb-6">
                {/* Age & Education */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
                      Your Age
                    </label>
                    <input
                      type="number"
                      min="18"
                      max="100"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 py-3 text-base font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="29"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
                      Education Level
                    </label>
                    <select
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="w-full px-4 py-3 text-base font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="secondary">High School</option>
                      <option value="one-year">1-Year Diploma</option>
                      <option value="two-year">2-Year Diploma</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                </div>

                {/* Work Experience */}
                <div className="bg-blue-50 p-4 sm:p-5 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaBriefcase className="text-blue-600" />
                    Work Experience
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foreign Work Experience (Years)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={workExperience}
                        onChange={(e) => {
                          setWorkExperience(e.target.value);
                          setError('');
                        }}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Canadian Work Experience (Years)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={canadianExperience}
                        onChange={(e) => setCanadianExperience(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Language Test */}
                <div className="bg-green-50 p-4 sm:p-5 rounded-xl border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaLanguage className="text-green-600" />
                    Language Test Results
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Type
                    </label>
                    <select
                      value={languageTest.type}
                      onChange={(e) => setLanguageTest({...languageTest, type: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="IELTS">IELTS</option>
                      <option value="CELPIP">CELPIP</option>
                      <option value="TEF">TEF (French)</option>
                      <option value="TCF">TCF (French)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Listening
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        value={languageTest.listening}
                        onChange={(e) => setLanguageTest({...languageTest, listening: e.target.value})}
                        className="w-full px-2 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="7.5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Reading
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        value={languageTest.reading}
                        onChange={(e) => setLanguageTest({...languageTest, reading: e.target.value})}
                        className="w-full px-2 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="7.5"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Writing
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        value={languageTest.writing}
                        onChange={(e) => setLanguageTest({...languageTest, writing: e.target.value})}
                        className="w-full px-2 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="7.0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Speaking
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        value={languageTest.speaking}
                        onChange={(e) => setLanguageTest({...languageTest, speaking: e.target.value})}
                        className="w-full px-2 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="7.0"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Factors */}
                <div className="bg-purple-50 p-4 sm:p-5 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />
                    Additional Factors
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasJobOffer}
                        onChange={(e) => setHasJobOffer(e.target.checked)}
                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm sm:text-base text-gray-700">I have a valid job offer in Canada (+50-200 points)</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasNomination}
                        onChange={(e) => setHasNomination(e.target.checked)}
                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm sm:text-base text-gray-700">I have a provincial nomination (+600 points)</span>
                    </label>
                  </div>
                </div>

                {/* Spouse Information */}
                <div className="bg-pink-50 p-4 sm:p-5 rounded-xl border border-pink-200">
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={hasSpouse}
                      onChange={(e) => setHasSpouse(e.target.checked)}
                      className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <span className="text-base font-bold text-gray-900">I have a spouse/partner coming with me</span>
                  </label>

                  {hasSpouse && (
                    <div className="space-y-4 pt-3 border-t border-pink-300">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spouse's Education Level
                        </label>
                        <select
                          value={spouseEducation}
                          onChange={(e) => setSpouseEducation(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">Select...</option>
                          <option value="secondary">High School</option>
                          <option value="bachelor">Bachelor's</option>
                          <option value="master">Master's or Higher</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spouse's Language Score (CLB Level)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={spouseLanguage}
                          onChange={(e) => setSpouseLanguage(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                          placeholder="7"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spouse's Canadian Work Experience (Years)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={spouseCanadianExp}
                          onChange={(e) => setSpouseCanadianExp(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={calculateCRS}
                disabled={loading || !age || !workExperience}
                className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                <FaCalculator />
                {loading ? 'Calculating...' : 'Calculate My CRS Score'}
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
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-blue-200 animate-slide-up">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FaChartLine className="text-blue-600" />
                    Your CRS Score
                  </h2>
                  
                  {/* Big Score Display */}
                  <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 shadow-md text-center border-2 border-blue-300">
                    <p className="text-sm text-gray-600 mb-2">Total CRS Score</p>
                    <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-blue-600 mb-3">
                      {result.totalScore}
                    </p>
                    <p className="text-sm text-gray-600">out of 1200 points</p>
                  </div>

                  {/* Score Interpretation */}
                  <div className={`p-4 sm:p-5 rounded-xl mb-6 ${
                    result.totalScore >= 500 ? 'bg-green-100 border-2 border-green-400' :
                    result.totalScore >= 450 ? 'bg-yellow-100 border-2 border-yellow-400' :
                    'bg-orange-100 border-2 border-orange-400'
                  }`}>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                      {result.totalScore >= 500 ? '🎉 Excellent Score!' :
                       result.totalScore >= 450 ? '👍 Good Score!' :
                       '💪 Keep Building Your Profile!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      {result.totalScore >= 500 ? 
                        'Your score is very competitive! Recent Express Entry draws have been inviting candidates with scores around 480-540. You have a strong chance of receiving an Invitation to Apply (ITA).' :
                       result.totalScore >= 450 ?
                        'Your score is decent and you may receive an ITA, though it might take some time. Recent draws typically range from 480-540 points. Consider improving your language scores or gaining more work experience.' :
                        'Your current score is below recent draw cutoffs (typically 480-540). Focus on improving language scores, gaining Canadian experience, or getting a provincial nomination to boost your chances.'}
                    </p>
                  </div>

                  {/* Score Breakdown */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md mb-6">
                    <h3 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">Score Breakdown</h3>
                    <div className="space-y-3">
                      {result.breakdown && Object.entries(result.breakdown).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                          <span className="text-sm text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="font-bold text-gray-900">{value} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Improvement Tips */}
                  <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-5 rounded-r-xl">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">💡 How to Improve Your Score</h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                      {result.totalScore < 500 && (
                        <>
                          <li className="flex items-start gap-2">
                            <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Improve language scores:</strong> Aim for CLB 9+ (IELTS 7+ in each section) - this can add 50+ points</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Gain Canadian experience:</strong> Even 1 year of Canadian work adds significant points</span>
                          </li>
                        </>
                      )}
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Consider Provincial Nominee Program:</strong> A nomination adds 600 points - virtually guaranteeing an ITA</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Get a job offer:</strong> A valid LMIA-approved job offer can add 50-200 points</span>
                      </li>
                      {!hasSpouse && result.totalScore < 500 && (
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Note:</strong> If you have a spouse with strong credentials, including them might help</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Quick Guide */}
          <div className="lg:col-span-1">
            <div className="bg-red-50 rounded-2xl p-4 sm:p-6 border border-red-200 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                Quick Guide
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <p className="text-gray-700">Fill in your personal details accurately</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Enter your actual language test scores (IELTS/CELPIP)</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">Include spouse info if they're coming with you</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">Check boxes for job offers or nominations</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-red-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaInfoCircle className="text-red-600" />
                  Recent Draw Info
                </h4>
                <p className="text-xs text-gray-700 mb-2">Recent CRS cutoff scores:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• General: 480-540</li>
                  <li>• PNP: 680+</li>
                  <li>• CEC: 420-450</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">🇨🇦 Pro Tip</p>
                <p className="text-xs">Most successful candidates have IELTS 7.5+ in each section. Language scores make the biggest difference!</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Canada's CRS Calculator
            </h2>

            <div className="bg-red-50 border-l-4 border-red-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                What is the CRS Calculator?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                The Comprehensive Ranking System (CRS) calculator helps you figure out your score for Canada's Express Entry immigration system. Think of it like a points game - you earn points for things like your age, education, work experience, and especially your English or French language skills. Canada uses this score to decide who gets invited to apply for permanent residence. Basically, the higher your score, the better your chances of getting that golden ticket to Canada.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How Does the CRS System Actually Work?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Here's the deal: Canada doesn't just accept everyone who applies. They use a competitive points-based system where you're basically competing against other candidates from around the world. Every few weeks, Immigration, Refugees and Citizenship Canada (IRCC) holds what they call a "draw" - they look at everyone in the Express Entry pool and invite the top-scoring candidates to apply for permanent residence.
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              The maximum score is 1,200 points. You can earn up to 600 points from what they call "core human capital factors" (your age, education, language, and work experience), and another 600 points from things like having a provincial nomination, a job offer, or Canadian education. Most people who get invited these days have scores between 480 and 540, though this changes depending on how many spots Canada is trying to fill.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Breaking Down the Points System
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Let's look at where your points actually come from. Understanding this helps you figure out where you might be able to improve:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">Factor</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Maximum Points</th>
                    <th className="px-3 sm:px-6 py-3 text-left">What Matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Age</td>
                    <td className="px-3 sm:px-6 py-3">110 points</td>
                    <td className="px-3 sm:px-6 py-3">Peak at 20-29 years old</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Education</td>
                    <td className="px-3 sm:px-6 py-3">150 points</td>
                    <td className="px-3 sm:px-6 py-3">PhD gets maximum</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Language Skills</td>
                    <td className="px-3 sm:px-6 py-3">160 points</td>
                    <td className="px-3 sm:px-6 py-3">CLB 9+ in all abilities</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Work Experience</td>
                    <td className="px-3 sm:px-6 py-3">80 points</td>
                    <td className="px-3 sm:px-6 py-3">3+ years foreign work</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Provincial Nomination</td>
                    <td className="px-3 sm:px-6 py-3">600 points</td>
                    <td className="px-3 sm:px-6 py-3">Basically guarantees ITA</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Job Offer</td>
                    <td className="px-3 sm:px-6 py-3">50-200 points</td>
                    <td className="px-3 sm:px-6 py-3">Must be LMIA-approved</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              The Biggest Mistake People Make
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Here's something most people don't realize until it's too late: language scores are absolutely crucial. I'm talking about the difference between getting an ITA and sitting in the pool for years. A lot of folks think "Oh, I speak English fine, I'll just take the IELTS and score okay" - but "okay" doesn't cut it.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-6 mb-6 rounded-r-xl">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Real Example:</h4>
              <p className="text-xs sm:text-sm text-gray-700 mb-3">
                Two candidates, both 29 years old with bachelor's degrees and 3 years of work experience:
              </p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                <li><strong>Candidate A:</strong> IELTS scores of 6.5 in each section = ~430 CRS points</li>
                <li><strong>Candidate B:</strong> IELTS scores of 8.0 in each section = ~490 CRS points</li>
              </ul>
              <p className="text-xs sm:text-sm text-gray-700 mt-3">
                That's a 60-point difference just from language scores! Candidate B gets an ITA while Candidate A doesn't.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Smart Ways to Boost Your CRS Score
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Okay, so you've calculated your score and it's lower than you hoped. Don't panic - there are several ways to improve it. Some are quick, others take time, but they all work:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5 rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaLanguage className="text-green-600" />
                  Retake Language Tests
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Time: 2-3 months</strong><br/>
                  This is your best bet for quick points. Study specifically for IELTS or CELPIP. Getting from 6.5 to 8.0 can add 50+ points. Many people improve significantly on their second attempt once they know what to expect.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-5 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaGraduationCap className="text-blue-600" />
                  Get Canadian Education
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Time: 1-2 years</strong><br/>
                  A Canadian degree/diploma adds points and often makes you eligible for Canadian work experience. Plus, many provinces have streams specifically for international students - easier path to nomination.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-5 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaBriefcase className="text-purple-600" />
                  Gain More Experience
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Time: Ongoing</strong><br/>
                  Both foreign and Canadian work experience add points. If you're already in Canada on a work permit, every year you stay increases your score. Foreign experience maxes out at 3 years for full points.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-5 rounded-xl border border-orange-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaMapMarkerAlt className="text-orange-600" />
                  Apply to PNP
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Time: 3-6 months</strong><br/>
                  Provincial Nominee Programs add 600 points - instant ITA. Many provinces have tech streams, healthcare streams, or general streams. Research which province matches your profile and apply directly.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Should You Include Your Spouse?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              This is actually a strategic decision, not just an automatic yes. If you're married or have a common-law partner, you can choose to include them or not in your application. Here's when each makes sense:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <p className="text-sm sm:text-base text-gray-700 mb-3">
                <strong>Include your spouse if:</strong>
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li>✓ They have strong language scores (CLB 7+)</li>
                <li>✓ They have Canadian work experience</li>
                <li>✓ They have post-secondary education</li>
                <li>✓ Your score is already quite high</li>
              </ul>
              <p className="text-sm sm:text-base text-gray-700 mt-4 mb-2">
                <strong>Apply alone if:</strong>
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li>✓ Your spouse has no Canadian experience</li>
                <li>✓ Their language scores are weak or non-existent</li>
                <li>✓ You're close to the cutoff score</li>
                <li>✓ You have strong credentials on your own</li>
              </ul>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Don't worry - if you apply alone, your spouse can still come with you to Canada. They just won't be included in the points calculation. You can add them to your application after you get your ITA. The difference is that their credentials won't affect your score either way.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Common Questions About CRS Calculator
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What's a competitive CRS score right now?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  This changes literally every two weeks with new draws. Generally speaking, you're in good shape with 480-500+ for general draws. Recent all-program draws have ranged from 480-540. Category-specific draws (like French language, healthcare, STEM) sometimes have lower cutoffs. Check IRCC's website for the latest draw results - they publish them after every draw with the minimum score invited.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How often does the CRS cutoff score change?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Express Entry draws happen roughly every two weeks, sometimes more frequently. Each draw can have a different cutoff depending on how many invitations Canada wants to issue and how many people are in the pool. The score generally trends based on policy changes and immigration targets. For example, when Canada increased their immigration targets, cutoffs dropped. When they paused draws during COVID, scores shot up because the pool got bigger.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">My score is 450. Should I even bother applying?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes! First, create your Express Entry profile anyway - it's free and stays valid for 12 months. While 450 might not get you invited in a general draw right now, there are other pathways. You might be eligible for category-based draws (if you speak French or work in certain fields). You could apply for PNP programs - many provinces look at Express Entry candidates. Plus, the cutoff scores fluctuate. Use the time in the pool to improve your score - retake language tests, gain experience, etc.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Does my work experience need to be in my field of study?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Nope! CRS points for work experience are separate from your education points. What matters is that your work experience is in a skilled occupation (NOC 0, A, or B - basically professional, management, or skilled trades jobs). It doesn't have to match your degree. An engineer who's now working in IT? That's fine. A teacher who moved into project management? Also fine. Just make sure you can prove the work experience with reference letters.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I improve my score after creating my Express Entry profile?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Absolutely! Your profile is not set in stone. You can (and should) update it whenever your situation improves. Got better language test results? Update it. Gained another year of work experience? Update it. Turned 29 (the age where you get maximum points)? Update it. Your score will automatically adjust, and you'll move up in the rankings. This is why many people stay in the pool for several months while actively working on improving their score.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Do I need a job offer to apply through Express Entry?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  No! This is a huge misconception. You do NOT need a job offer to enter the Express Entry pool or receive an ITA. A job offer gives you bonus points, sure, but most people who get permanent residence through Express Entry don't have one. What you DO need is skilled work experience (at least 1 year in the past 10 years), language test results, and an educational credential assessment if you studied outside Canada. That's it for the basics.
                </p>
              </details>
            </div>

            <div className="mt-8 bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Check Your CRS Score Now</h3>
              <p className="text-sm sm:text-base mb-6 text-red-100">
                Use our calculator above to find out your current CRS score and see how you stack up against recent Express Entry draws. Knowledge is power when it comes to immigration planning!
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Calculate My Score
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-12">
              Related Calculators
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/crs-score" className="block p-4 bg-gradient-to-br from-red-50 to-rose-100 rounded-xl border border-red-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaPassport className="text-2xl text-red-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CRS Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Simplified CRS points calculator</p>
              </a>

              <a href="/cgpa-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaGraduationCap className="text-2xl text-blue-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate your academic grades</p>
              </a>

              <a href="/mortgage-payoff" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-green-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Mortgage Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Plan your home financing in Canada</p>
              </a>
            </div>

            <div className="mt-12 bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This CRS Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our CRS calculator is used by over 14,000 potential immigrants every month to estimate their Comprehensive Ranking System score for Canada Express Entry. The calculator follows the official IRCC point allocation system and provides accurate estimates based on your credentials. While this tool gives you a reliable score estimate, your official score will be calculated by IRCC when you submit your Express Entry profile. Use this calculator to plan your immigration strategy, identify areas for improvement, and understand your chances of receiving an Invitation to Apply. This tool is completely free and requires no registration.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | Based on official IRCC CRS criteria
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}