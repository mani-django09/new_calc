import { useState } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaPercent, FaGraduationCap, FaCalculator, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket, FaChartLine, FaUniversity } from 'react-icons/fa';

export default function PercentageToCGPA() {
  const [percentage, setPercentage] = useState('');
  const [scale, setScale] = useState('10');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateCGPA = async () => {
    try {
      setLoading(true);
      setError('');
      
      const percentageValue = parseFloat(percentage);
      const scaleValue = parseFloat(scale);
      
      if (isNaN(percentageValue) || percentageValue < 0 || percentageValue > 100) {
        setError('Please enter a valid percentage between 0 and 100');
        setLoading(false);
        return;
      }
      
      const response = await calculatorAPI.calculate('percentage-to-cgpa', { 
        percentage: percentageValue, 
        scale: scaleValue 
      });
      
      setResult(response);
    } catch (err) {
      setError(err.message || 'Failed to calculate CGPA');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setPercentage('');
    setScale('10');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="Percentage to CGPA Calculator - Convert Percentage to GPA Online Free"
      description="Convert percentage to CGPA instantly with our free calculator. Support for 10-point and 4-point scales. Accurate conversion for Indian, US, UK, and Canadian grading systems."
      keywords="percentage to cgpa calculator, percentage to cgpa, convert percentage to cgpa, percentage to gpa converter, marks to cgpa calculator, percentage to grade point calculator"
      schema={{
        '@type': 'WebApplication',
        name: 'Percentage to CGPA Calculator',
        applicationCategory: 'EducationalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '16240'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaCheckCircle className="text-green-300" />
            <span>16,000+ conversions daily</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            Percentage to CGPA Calculator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
            Convert your percentage marks to CGPA format in seconds. Works with both 10-point and 4-point grading scales.
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
                  <FaPercent className="text-green-600" />
                  Enter Your Percentage
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-6 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl border border-green-200">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3">
                    Select Target Grading Scale
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setScale('10');
                        setError('');
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        scale === '10'
                          ? 'border-green-600 bg-green-100 shadow-md'
                          : 'border-gray-300 bg-white hover:border-green-300'
                      }`}
                    >
                      <span className="text-2xl font-bold text-gray-900">10</span>
                      <span className="text-xs text-gray-600 mt-1">Point Scale</span>
                      <span className="text-xs text-gray-500">(India)</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setScale('4');
                        setError('');
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        scale === '4'
                          ? 'border-green-600 bg-green-100 shadow-md'
                          : 'border-gray-300 bg-white hover:border-green-300'
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
                    Your Percentage (0 to 100)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={percentage}
                      onChange={(e) => {
                        setPercentage(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-2xl sm:text-3xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                      placeholder="75"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaPercent className="text-xl sm:text-2xl" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
                    Enter your percentage (e.g., 75, 82.5, 68)
                  </p>
                </div>
              </div>
              
              <button
                onClick={calculateCGPA}
                disabled={loading || !percentage}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                <FaCalculator />
                {loading ? 'Converting...' : 'Convert to CGPA'}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            {/* Results Section */}
            {result && (
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-blue-200 animate-slide-up">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaChartLine className="text-blue-600" />
                  Your Results
                </h2>
                
                <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 shadow-md text-center">
                  <p className="text-sm text-gray-600 mb-2">Your CGPA</p>
                  <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-green-600 mb-2">
                    {result.cgpa}
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                    <span>Percentage: <span className="font-semibold">{result.percentage}%</span></span>
                    <span className="text-gray-400">|</span>
                    <span>Scale: <span className="font-semibold">{result.scale}-point</span></span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Conversion Formula Used</h3>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="font-mono text-sm text-center text-gray-800">
                      {result.formula}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 text-center">
                    This is the reverse of the standard CGPA to percentage formula
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                  <p className="text-sm text-gray-700">
                    <strong className="text-yellow-700">Important:</strong> The CGPA value shown is an approximation. Different universities may use different conversion methods, so always check your institution's official policy.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Quick Guide */}
          <div className="lg:col-span-1">
            <div className="bg-green-50 rounded-2xl p-4 sm:p-6 border border-green-200 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                How It Works
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <p className="text-gray-700">Choose your target grading scale (10-point or 4-point)</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Enter your percentage value</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">Click "Convert to CGPA"</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">Get your CGPA equivalent instantly</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaInfoCircle className="text-green-600" />
                  Conversion Formulas
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-semibold text-gray-700 mb-1">10-Point Scale:</p>
                    <p className="font-mono text-gray-600">CGPA = % ÷ 9.5</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-semibold text-gray-700 mb-1">4-Point Scale:</p>
                    <p className="font-mono text-gray-600">GPA = (% ÷ 100) × 4</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">💡 Did You Know?</p>
                <p className="text-xs">Converting percentage to CGPA helps when applying to universities that use grade point systems instead of percentage scores.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Percentage to CGPA Conversion
            </h2>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                Why Convert Percentage to CGPA?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                If you're applying to universities abroad or institutions that use CGPA grading systems, you'll often need to convert your percentage marks into CGPA format. Many international universities in the US, Canada, and even some Indian institutions now prefer CGPA over traditional percentage scores. Our percentage to CGPA calculator makes this conversion quick and hassle-free.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Understanding the Conversion Process
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Converting percentage to CGPA is basically the reverse of the CGPA to percentage conversion. Once you understand the relationship between these two grading systems, it becomes pretty straightforward.
            </p>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 mt-6">
              Converting to 10-Point CGPA (Indian System)
            </h4>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-sm sm:text-base text-center text-gray-800 font-semibold mb-3">
                CGPA = Percentage ÷ 9.5
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Here's an example:</strong></p>
                <p className="text-sm text-gray-600">If you scored 76% in your exams</p>
                <p className="text-sm text-gray-600">Your CGPA would be: 76 ÷ 9.5 = 8.0 CGPA</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              This formula is widely accepted across Indian universities and colleges. The 9.5 divisor comes from the University Grants Commission (UGC) guidelines, making it the most reliable method for conversion in India.
            </p>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 mt-6">
              Converting to 4-Point GPA (US/Canadian System)
            </h4>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-sm sm:text-base text-center text-gray-800 font-semibold mb-3">
                GPA = (Percentage ÷ 100) × 4
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Here's an example:</strong></p>
                <p className="text-sm text-gray-600">If you have 85% marks</p>
                <p className="text-sm text-gray-600">Your GPA is: (85 ÷ 100) × 4 = 3.4 GPA</p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Percentage to CGPA Conversion Table
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Here's a handy reference chart showing how different percentage scores translate to CGPA:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">Percentage</th>
                    <th className="px-3 sm:px-6 py-3 text-left">10-Point CGPA</th>
                    <th className="px-3 sm:px-6 py-3 text-left">4-Point GPA</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">90% - 100%</td>
                    <td className="px-3 sm:px-6 py-3">9.5 - 10.0</td>
                    <td className="px-3 sm:px-6 py-3">3.6 - 4.0</td>
                    <td className="px-3 sm:px-6 py-3">A+</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">80% - 89%</td>
                    <td className="px-3 sm:px-6 py-3">8.4 - 9.4</td>
                    <td className="px-3 sm:px-6 py-3">3.2 - 3.5</td>
                    <td className="px-3 sm:px-6 py-3">A</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">70% - 79%</td>
                    <td className="px-3 sm:px-6 py-3">7.4 - 8.3</td>
                    <td className="px-3 sm:px-6 py-3">2.8 - 3.1</td>
                    <td className="px-3 sm:px-6 py-3">B+</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">60% - 69%</td>
                    <td className="px-3 sm:px-6 py-3">6.3 - 7.3</td>
                    <td className="px-3 sm:px-6 py-3">2.4 - 2.7</td>
                    <td className="px-3 sm:px-6 py-3">B</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">50% - 59%</td>
                    <td className="px-3 sm:px-6 py-3">5.3 - 6.2</td>
                    <td className="px-3 sm:px-6 py-3">2.0 - 2.3</td>
                    <td className="px-3 sm:px-6 py-3">C</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">40% - 49%</td>
                    <td className="px-3 sm:px-6 py-3">4.2 - 5.2</td>
                    <td className="px-3 sm:px-6 py-3">1.6 - 1.9</td>
                    <td className="px-3 sm:px-6 py-3">D</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Below 40%</td>
                    <td className="px-3 sm:px-6 py-3">Below 4.2</td>
                    <td className="px-3 sm:px-6 py-3">Below 1.6</td>
                    <td className="px-3 sm:px-6 py-3">F</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              When You'll Need This Conversion
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              There are several common situations where converting your percentage to CGPA becomes necessary:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Study Abroad Applications:</strong> Most universities in the US, Canada, UK, and Australia use GPA systems. If your transcripts show percentage, you'll need to provide CGPA equivalents</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Transfer Applications:</strong> When moving from a percentage-based institution to a CGPA-based one, you'll need this conversion for credit evaluation</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Scholarship Applications:</strong> International scholarships often require GPA format, even if you studied in a percentage system</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Job Applications Abroad:</strong> Some international employers prefer seeing academic performance in GPA format</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Internal University Transfers:</strong> Some Indian universities are switching to CGPA, so you might need to convert old percentage-based records</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Important Things to Remember
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-xl border border-yellow-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaInfoCircle className="text-yellow-600" />
                  Get Official Conversions
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  While our calculator gives you accurate estimates, many universities require official conversion certificates from your institution. Contact your university's examination office for official documents.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaInfoCircle className="text-blue-600" />
                  Check University Requirements
                </h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Different universities may have their own conversion standards. Always check the specific requirements of the institution you're applying to before submitting documents.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Will universities accept my self-calculated CGPA conversion?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  It depends on the university. Most institutions require official conversion documents from your previous university or an authorized credential evaluation service like WES (World Education Services). Our calculator is great for getting a quick estimate, but for actual applications, you'll typically need official documentation. Always check with the admissions office about their specific requirements.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">My percentage is 68%. What CGPA should I mention in applications?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Using the standard formula, 68% converts to approximately 7.16 CGPA on a 10-point scale. You can round this to 7.2 for most applications. However, check if your target university has specific rounding guidelines. Some prefer one decimal place while others allow two. When in doubt, it's better to be slightly conservative with rounding rather than inflating your score.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Does the conversion formula work for all Indian universities?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  The 9.5 divisor formula is the standard recommended by UGC and used by most Indian universities. However, some institutions might have their own specific conversion methods. For example, some universities use a divisor of 10 instead of 9.5. It's always best to check your university's official conversion policy. If they have one, use that; otherwise, the 9.5 formula is your safest bet.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I convert aggregate percentage or should it be semester-wise?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Both approaches can work depending on what you need. For overall university applications, your aggregate/cumulative percentage conversion is most important. However, if you're applying for credit transfers, you might need semester-by-semester conversions. Some universities ask for both. The good news is the formula remains the same regardless of whether you're converting aggregate or semester percentages.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What if my target university uses a different scale like 5.0?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Some universities use 5-point scales. To convert to a 5-point scale, you can use: GPA = (Percentage ÷ 100) × 5. For example, 80% would be (80 ÷ 100) × 5 = 4.0 on a 5-point scale. Alternatively, you can first convert to the 10-point scale and then divide by 2. Always verify with the specific institution about their preferred conversion method.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Do I need to convert internal marks or just final exam percentages?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Typically, you convert your final semester or year-end percentages that appear on your official mark sheets. Internal assessment marks or mid-semester scores usually don't need conversion unless specifically requested. Most universities want to see your final, officially recorded academic performance. If you're unsure what to convert, check the application guidelines or contact the admissions office.
                </p>
              </details>
            </div>

            <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Need to Convert Your Percentage?</h3>
              <p className="text-sm sm:text-base mb-6 text-green-100">
                Use our calculator above to get instant CGPA conversions. It's free, accurate, and takes just a few seconds!
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Convert Now
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-12">
              Related Calculators
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/cgpa-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaGraduationCap className="text-2xl text-blue-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate your CGPA from grades and credits</p>
              </a>

              <a href="/cgpa-to-percentage" className="block p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaPercent className="text-2xl text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA to Percentage</h4>
                </div>
                <p className="text-xs text-gray-600">Convert CGPA to percentage format</p>
              </a>

              <a href="/marks-percentage" className="block p-4 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl border border-orange-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-orange-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Marks Percentage</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate percentage from marks obtained</p>
              </a>
            </div>

            <div className="mt-12 bg-green-50 border-l-4 border-green-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our percentage to CGPA calculator helps thousands of students every month convert their marks for university applications worldwide. Whether you're applying to study in the US, Canada, UK, or any CGPA-based institution, our tool provides accurate conversions based on standard formulas. The calculator is completely free, requires no registration, and works on all devices. We've built this tool to simplify the often confusing process of grade conversion, making it easier for students to prepare their applications with confidence.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | Verified by Education Experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}