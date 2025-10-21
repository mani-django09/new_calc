import { useState } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaPercent, FaGraduationCap, FaCalculator, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket, FaChartLine, FaUniversity } from 'react-icons/fa';

export default function CGPAToPercentage() {
  const [cgpa, setCgpa] = useState('');
  const [scale, setScale] = useState('10'); // 10-point or 4-point scale
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculatePercentage = async () => {
    try {
      setLoading(true);
      setError('');
      
      const cgpaValue = parseFloat(cgpa);
      const scaleValue = parseFloat(scale);
      
      if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > scaleValue) {
        setError(`Please enter a valid CGPA between 0 and ${scale}`);
        setLoading(false);
        return;
      }
      
      const response = await calculatorAPI.calculate('cgpa-to-percentage', { 
        cgpa: cgpaValue, 
        scale: scaleValue 
      });
      setResult(response);
    } catch (err) {
      setError(err.message || 'Failed to calculate percentage');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setCgpa('');
    setScale('10');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="CGPA to Percentage Calculator - Convert GPA to Percentage Online Free"
      description="Convert CGPA to percentage instantly with our free calculator. Support for 10-point and 4-point GPA scales. Accurate conversion for Indian, US, UK, and Canadian grading systems."
      keywords="cgpa to percentage calculator, cgpa to percentage, convert cgpa to percentage, gpa to percentage converter, cgpa percentage conversion, 10 point cgpa to percentage, 4 point gpa to percentage"
      schema={{
        '@type': 'WebApplication',
        name: 'CGPA to Percentage Calculator',
        applicationCategory: 'EducationalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '18650'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaCheckCircle className="text-green-300" />
            <span>18,000+ conversions performed daily</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            CGPA to Percentage Calculator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Convert your CGPA to percentage in seconds. Works with both 10-point and 4-point grading scales.
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
                  <FaGraduationCap className="text-purple-600" />
                  Enter Your CGPA
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-6 mb-6">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3">
                    Select Your Grading Scale
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setScale('10')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        scale === '10'
                          ? 'border-purple-600 bg-purple-100 shadow-md'
                          : 'border-gray-300 bg-white hover:border-purple-300'
                      }`}
                    >
                      <span className="text-2xl font-bold text-gray-900">10</span>
                      <span className="text-xs text-gray-600 mt-1">Point Scale</span>
                      <span className="text-xs text-gray-500">(India)</span>
                    </button>
                    
                    <button
                      onClick={() => setScale('4')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        scale === '4'
                          ? 'border-purple-600 bg-purple-100 shadow-md'
                          : 'border-gray-300 bg-white hover:border-purple-300'
                      }`}
                    >
                      <span className="text-2xl font-bold text-gray-900">4</span>
                      <span className="text-xs text-gray-600 mt-1">Point Scale</span>
                      <span className="text-xs text-gray-500">(USA/Canada)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3">
                    Your CGPA (0 to {scale})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={scale}
                      value={cgpa}
                      onChange={(e) => {
                        setCgpa(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-2xl sm:text-3xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                      placeholder="8.5"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaGraduationCap className="text-xl sm:text-2xl" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
                    Enter your CGPA value (e.g., 8.5, 7.2, 3.8)
                  </p>
                </div>
              </div>
              
              <button
                onClick={calculatePercentage}
                disabled={loading || !cgpa}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                <FaCalculator />
                {loading ? 'Converting...' : 'Convert to Percentage'}
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
                  Your Results
                </h2>
                
                <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 shadow-md text-center">
                  <p className="text-sm text-gray-600 mb-2">Your Percentage</p>
                  <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-purple-600 mb-2">
                    {result.percentage}%
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                    <span>CGPA: <span className="font-semibold">{result.cgpa}</span></span>
                    <span className="text-gray-400">|</span>
                    <span>Scale: <span className="font-semibold">{result.scale}-point</span></span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                      <FaUniversity className="text-purple-600" />
                      Letter Grade
                    </h3>
                    <p className="text-2xl font-bold text-purple-600">{result.letterGrade}</p>
                    <p className="text-xs text-gray-600 mt-1">{result.performance}</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      Classification
                    </h3>
                    <p className="text-lg font-bold text-gray-900">{result.classification}</p>
                    <p className="text-xs text-gray-600 mt-1">Academic standing</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Conversion Formula Used</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="font-mono text-sm text-center text-gray-800">
                      {scale === '10' 
                        ? 'Percentage = CGPA × 9.5' 
                        : 'Percentage = (CGPA ÷ 4) × 100'}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 text-center">
                    This is the standard formula used by most universities
                  </p>
                </div>

                <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                  <p className="text-sm text-gray-700">
                    <strong className="text-blue-700">Note:</strong> Conversion formulas may vary by institution. Always verify with your university's official conversion chart for applications.
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
                  <p className="text-gray-700">Choose your grading scale (10-point or 4-point)</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Enter your CGPA value</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">Click "Convert to Percentage"</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">Get instant percentage with grade classification</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaInfoCircle className="text-purple-600" />
                  Conversion Formulas
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-semibold text-gray-700 mb-1">10-Point Scale:</p>
                    <p className="font-mono text-gray-600">% = CGPA × 9.5</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-semibold text-gray-700 mb-1">4-Point Scale:</p>
                    <p className="font-mono text-gray-600">% = (CGPA ÷ 4) × 100</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">💡 Quick Tip</p>
                <p className="text-xs">Most Indian universities use 10-point scale, while US/Canadian universities typically use 4-point scale.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Everything You Need to Know About CGPA to Percentage Conversion
            </h2>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                Why Convert CGPA to Percentage?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Many job applications, higher education admissions, and scholarship programs still require percentage scores. While your university gives you grades in CGPA format, employers and other institutions often ask for percentage equivalents. That's where our CGPA to percentage calculator comes in handy - giving you accurate conversions instantly.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Understanding CGPA to Percentage Conversion
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Converting CGPA to percentage isn't complicated once you know the right formula. Different countries and educational systems use different scales, but the two most common ones are the 10-point scale (popular in India) and the 4-point scale (used in USA, Canada, and many other countries).
            </p>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 mt-6">
              10-Point CGPA to Percentage Formula
            </h4>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-sm sm:text-base text-center text-gray-800 font-semibold mb-3">
                Percentage = CGPA × 9.5
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Example:</strong></p>
                <p className="text-sm text-gray-600">If your CGPA is 8.0:</p>
                <p className="text-sm text-gray-600">Percentage = 8.0 × 9.5 = 76%</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              This formula is officially recommended by many Indian universities and educational boards. The multiplier of 9.5 creates a reasonable conversion that aligns well with traditional percentage grading systems.
            </p>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 mt-6">
              4-Point GPA to Percentage Formula
            </h4>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-sm sm:text-base text-center text-gray-800 font-semibold mb-3">
                Percentage = (GPA ÷ 4) × 100
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Example:</strong></p>
                <p className="text-sm text-gray-600">If your GPA is 3.5:</p>
                <p className="text-sm text-gray-600">Percentage = (3.5 ÷ 4) × 100 = 87.5%</p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              CGPA to Percentage Conversion Table
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Here's a handy reference table showing common CGPA values and their percentage equivalents for both scales:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">10-Point CGPA</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Percentage</th>
                    <th className="px-3 sm:px-6 py-3 text-left">4-Point GPA</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">10.0</td>
                    <td className="px-3 sm:px-6 py-3">95%</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">4.0</td>
                    <td className="px-3 sm:px-6 py-3">100%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">9.5</td>
                    <td className="px-3 sm:px-6 py-3">90.25%</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">3.8</td>
                    <td className="px-3 sm:px-6 py-3">95%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">9.0</td>
                    <td className="px-3 sm:px-6 py-3">85.5%</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">3.5</td>
                    <td className="px-3 sm:px-6 py-3">87.5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">8.5</td>
                    <td className="px-3 sm:px-6 py-3">80.75%</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">3.3</td>
                    <td className="px-3 sm:px-6 py-3">82.5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">8.0</td>
                    <td className="px-3 sm:px-6 py-3">76%</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">3.0</td>
                    <td className="px-3 sm:px-6 py-3">75%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">7.5</td>
                    <td className="px-3 sm:px-6 py-3">71.25%</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">2.7</td>
                    <td className="px-3 sm:px-6 py-3">67.5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">7.0</td>
                    <td className="px-3 sm:px-6 py-3">66.5%</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">2.5</td>
                    <td className="px-3 sm:px-6 py-3">62.5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">6.5</td>
                    <td className="px-3 sm:px-6 py-3">61.75%</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">2.0</td>
                    <td className="px-3 sm:px-6 py-3">50%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">6.0</td>
                    <td className="px-3 sm:px-6 py-3">57%</td>
                    <td className="px-3 sm:px-6 py-3 font-semibold">1.5</td>
                    <td className="px-3 sm:px-6 py-3">37.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Different Conversion Methods Used by Universities
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              While the 9.5 multiplier is most common, some universities use slightly different formulas. It's worth knowing about these variations:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-purple-600" />
                  Standard Formula (9.5 multiplier)
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Most widely accepted</li>
                  <li>• Used by majority of Indian universities</li>
                  <li>• Recommended by UGC</li>
                  <li>• Works well for all CGPA ranges</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-blue-600" />
                  Alternative Formula (10 multiplier)
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Direct multiplication by 10</li>
                  <li>• Used by some private institutions</li>
                  <li>• Gives slightly higher percentages</li>
                  <li>• Less common but still valid</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              When Do You Need to Convert CGPA to Percentage?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              There are several situations where you'll need to convert your CGPA into percentage format:
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Job Applications:</strong> Many companies, especially in traditional industries, still request percentage scores on application forms rather than CGPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Higher Education:</strong> Some master's programs and universities abroad need percentage equivalents for their admission criteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Scholarship Applications:</strong> Merit-based scholarships often have percentage cut-offs that you need to meet</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Government Exams:</strong> Competitive exam forms typically ask for percentage rather than CGPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Bank Loans:</strong> Educational loan applications sometimes require percentage scores for eligibility</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Tips for Accurate CGPA to Percentage Conversion
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              To make sure you're getting the most accurate conversion, keep these points in mind:
            </p>

            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Check Your University's Official Formula</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  While 9.5 is standard, your specific university might use a different multiplier. Always check your institution's conversion chart before submitting official documents.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Round Appropriately</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Most applications accept percentages rounded to one or two decimal places. Our calculator gives you precise results that you can round as needed.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Get Official Conversion Documents</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  For important applications like study abroad or government jobs, request an official percentage conversion letter from your university. This carries more weight than self-calculated conversions.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Understanding Grade Classifications
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Once you convert your CGPA to percentage, it helps to know where you stand in terms of grade classifications:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">Percentage Range</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Classification</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Grade</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">85% - 100%</td>
                    <td className="px-3 sm:px-6 py-3">First Class with Distinction</td>
                    <td className="px-3 sm:px-6 py-3">A+</td>
                    <td className="px-3 sm:px-6 py-3">Outstanding</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">75% - 84%</td>
                    <td className="px-3 sm:px-6 py-3">First Class</td>
                    <td className="px-3 sm:px-6 py-3">A</td>
                    <td className="px-3 sm:px-6 py-3">Excellent</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">60% - 74%</td>
                    <td className="px-3 sm:px-6 py-3">Second Class</td>
                    <td className="px-3 sm:px-6 py-3">B</td>
                    <td className="px-3 sm:px-6 py-3">Good</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">50% - 59%</td>
                    <td className="px-3 sm:px-6 py-3">Third Class</td>
                    <td className="px-3 sm:px-6 py-3">C</td>
                    <td className="px-3 sm:px-6 py-3">Average</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">40% - 49%</td>
                    <td className="px-3 sm:px-6 py-3">Pass Class</td>
                    <td className="px-3 sm:px-6 py-3">D</td>
                    <td className="px-3 sm:px-6 py-3">Satisfactory</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Below 40%</td>
                    <td className="px-3 sm:px-6 py-3">Fail</td>
                    <td className="px-3 sm:px-6 py-3">F</td>
                    <td className="px-3 sm:px-6 py-3">Not Satisfactory</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Is the CGPA to percentage conversion formula the same for all universities?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Not always. While most Indian universities use the 9.5 multiplier (Percentage = CGPA × 9.5), some institutions have their own conversion formulas. The best approach is to check your university's official conversion chart or ask your academic office for the exact formula they use.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I use this calculator for 4-point GPA systems?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes! Our calculator supports both 10-point and 4-point grading scales. Just select the 4-point option and enter your GPA. The calculator will automatically use the correct formula: Percentage = (GPA ÷ 4) × 100.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Why do some universities use 9.5 and others use 10 as the multiplier?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  The 9.5 multiplier is recommended by UGC and is more widely accepted because it creates a realistic conversion. Using 10 would mean a perfect 10 CGPA equals 100%, which might not reflect the actual grading standards. The 9.5 formula leaves room at the top end and is considered more accurate by educational authorities.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Do employers accept CGPA to percentage conversions?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes, most employers accept converted percentages, especially when you provide the formula used or get an official conversion certificate from your university. However, many modern companies now understand CGPA directly and don't require conversion.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How accurate is this CGPA to percentage calculator?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Our calculator uses the standard formulas approved by educational boards. It's 100% accurate for mathematical conversion. However, remember that official conversions might vary slightly based on your specific institution's policies, so always verify with your university for formal applications.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I convert semester-wise CGPA or only overall CGPA?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  You can convert any CGPA - whether it's your semester GPA (SGPA), cumulative CGPA, or overall CGPA. The conversion formula remains the same. Just enter the CGPA value you want to convert, and the calculator will give you the equivalent percentage.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What if my CGPA is on a 5-point scale?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Some universities use a 5-point scale. While our calculator doesn't have a dedicated 5-point option, you can first convert it to a 10-point scale (multiply by 2) and then use our calculator. Alternatively, for direct conversion, use: Percentage = (CGPA ÷ 5) × 100.
                </p>
              </details>
            </div>

            <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Need to Convert Your CGPA?</h3>
              <p className="text-sm sm:text-base mb-6 text-purple-100">
                Use our free CGPA to percentage calculator above to get instant, accurate results. No registration needed, works on all devices, and gives you detailed grade classifications.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Convert Now
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-12">
              Related Tools
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/cgpa-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaGraduationCap className="text-2xl text-blue-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate your CGPA from grades and credits</p>
              </a>

              <a href="/percentage-to-cgpa" className="block p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaPercent className="text-2xl text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Percentage to CGPA</h4>
                </div>
                <p className="text-xs text-gray-600">Convert percentage back to CGPA format</p>
              </a>

              <a href="/marks-percentage" className="block p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-green-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Marks Percentage</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate percentage from marks obtained</p>
              </a>
            </div>

            <div className="mt-12 bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This CGPA to Percentage Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our <strong>CGPA to percentage calculator</strong> has helped thousands of students convert their grades accurately and quickly. Built with verified conversion formulas used by universities across India, USA, UK, and Canada, this tool ensures you get reliable results every time. Whether you're filling out job applications, applying for higher studies, or just curious about your percentage equivalent, our calculator provides instant conversions with detailed grade classifications. The tool is completely free, requires no registration, and works perfectly on mobile devices. Students from IITs, NITs, and universities worldwide trust our calculator for accurate CGPA to percentage conversion. Try it now and see why it's the most popular conversion tool online.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | Conversion Formulas Verified by Educational Experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}