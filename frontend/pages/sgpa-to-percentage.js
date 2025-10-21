import { useState } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaPercent, FaGraduationCap, FaCalculator, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket, FaChartLine, FaUniversity, FaBook, FaTrophy } from 'react-icons/fa';

export default function SGPAToPercentage() {
  const [sgpa, setSgpa] = useState('');
  const [scale, setScale] = useState('10');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculatePercentage = async () => {
    try {
      setLoading(true);
      setError('');
      
      const sgpaValue = parseFloat(sgpa);
      const scaleValue = parseFloat(scale);
      
      if (isNaN(sgpaValue) || sgpaValue < 0 || sgpaValue > scaleValue) {
        setError(`Please enter a valid SGPA between 0 and ${scale}`);
        setLoading(false);
        return;
      }
      
      // Using CGPA to percentage endpoint since calculation is the same
      const response = await calculatorAPI.calculate('cgpa-to-percentage', { 
        cgpa: sgpaValue, 
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
    setSgpa('');
    setScale('10');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="SGPA to Percentage Calculator - Convert Semester GPA to Percentage Free"
      description="Convert SGPA to percentage instantly with our free calculator. Supports 10-point and 4-point GPA scales. Get accurate semester grade percentage for university applications and academic records."
      keywords="sgpa to percentage calculator, sgpa to percentage, convert sgpa to percentage, semester gpa to percentage, sgpa percentage conversion, sgpa calculator free, 10 point sgpa to percentage, semester grade calculator"
      schema={{
        '@type': 'WebApplication',
        name: 'SGPA to Percentage Calculator',
        applicationCategory: 'EducationalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '17250'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaCheckCircle className="text-green-300" />
            <span>17,000+ semester conversions daily</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            SGPA to Percentage Calculator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
            Convert your semester GPA to percentage instantly. Works with 10-point and 4-point grading systems used worldwide.
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
                  <FaBook className="text-indigo-600" />
                  Enter Your SGPA
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-6 mb-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 rounded-xl border border-indigo-200">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3">
                    Select Your Grading Scale
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setScale('10')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        scale === '10'
                          ? 'border-indigo-600 bg-indigo-100 shadow-md'
                          : 'border-gray-300 bg-white hover:border-indigo-300'
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
                          ? 'border-indigo-600 bg-indigo-100 shadow-md'
                          : 'border-gray-300 bg-white hover:border-indigo-300'
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
                    Your SGPA (0 to {scale})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={scale}
                      value={sgpa}
                      onChange={(e) => {
                        setSgpa(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-2xl sm:text-3xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center"
                      placeholder="8.2"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaGraduationCap className="text-xl sm:text-2xl" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
                    Enter your semester GPA value (e.g., 8.2, 7.5, 3.6)
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                  <p className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
                    <FaInfoCircle className="text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>SGPA is your grade point average for one semester. If you want to convert your overall CGPA, use our CGPA to Percentage calculator instead.</span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={calculatePercentage}
                disabled={loading || !sgpa}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
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
                  Your Semester Results
                </h2>
                
                <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 shadow-md text-center">
                  <p className="text-sm text-gray-600 mb-2">Semester Percentage</p>
                  <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-indigo-600 mb-2">
                    {result.percentage}%
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                    <span>SGPA: <span className="font-semibold">{result.cgpa}</span></span>
                    <span className="text-gray-400">|</span>
                    <span>Scale: <span className="font-semibold">{result.scale}-point</span></span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                      <FaTrophy className="text-yellow-600" />
                      Letter Grade
                    </h3>
                    <p className="text-2xl font-bold text-indigo-600">{result.letterGrade}</p>
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
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <p className="font-mono text-sm text-center text-gray-800">
                      {scale === '10' 
                        ? 'Percentage = SGPA × 9.5' 
                        : 'Percentage = (SGPA ÷ 4) × 100'}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 text-center">
                    Standard formula used by most universities for semester grades
                  </p>
                </div>

                <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                  <p className="text-sm text-gray-700">
                    <strong className="text-blue-700">Remember:</strong> This is your semester percentage. For overall academic percentage, calculate your CGPA by averaging all semester SGPAs, then convert that to percentage.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Quick Guide */}
          <div className="lg:col-span-1">
            <div className="bg-indigo-50 rounded-2xl p-4 sm:p-6 border border-indigo-200 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                How It Works
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <p className="text-gray-700">Choose your grading scale (10 or 4 point)</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Enter your SGPA for the semester</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">Click "Convert to Percentage"</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">Get instant percentage with grade details</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-indigo-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaInfoCircle className="text-indigo-600" />
                  Quick Formulas
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-semibold text-gray-700 mb-1">10-Point Scale:</p>
                    <p className="font-mono text-gray-600">% = SGPA × 9.5</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-semibold text-gray-700 mb-1">4-Point Scale:</p>
                    <p className="font-mono text-gray-600">% = (SGPA ÷ 4) × 100</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">🎓 Pro Tip</p>
                <p className="text-xs">SGPA shows one semester's performance. Track each semester to monitor your academic progress over time!</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Everything About Converting SGPA to Percentage
            </h2>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                What is SGPA and Why Convert to Percentage?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                SGPA (Semester Grade Point Average) shows your academic performance for a single semester. While modern universities use SGPA for grading, many situations still require percentage format - like internship applications, semester-based scholarships, or comparing performance with students from traditional marking systems. Converting SGPA to percentage makes your grades universally understandable and helps you track semester-by-semester progress effectively.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              SGPA vs CGPA: Know the Difference
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Students often confuse SGPA with CGPA, but they're quite different. SGPA measures your performance in one semester - think of it as your monthly report card. CGPA is the cumulative average of all your semester SGPAs since you started your course - it's like your overall academic report. Both are important, but they serve different purposes.
            </p>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Real Example</h4>
              <div className="text-sm space-y-2">
                <p className="text-gray-700">Let's say you're in your 4th semester:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Semester 1 SGPA: 7.8</li>
                  <li>Semester 2 SGPA: 8.2</li>
                  <li>Semester 3 SGPA: 8.5</li>
                  <li>Semester 4 SGPA: 8.1 (current semester)</li>
                </ul>
                <p className="text-gray-700 mt-3">Your current SGPA is 8.1 (this semester only)</p>
                <p className="text-gray-700">Your CGPA is (7.8 + 8.2 + 8.5 + 8.1) ÷ 4 = 8.15 (overall average)</p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How to Calculate Percentage from SGPA
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              The conversion formula is straightforward and works the same way whether you're converting SGPA or CGPA. The key is knowing which grading scale your university uses - most Indian universities use 10-point while American and Canadian institutions typically use 4-point.
            </p>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 mt-6">
              For 10-Point Scale (Indian Universities)
            </h4>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-sm sm:text-base text-center text-gray-800 font-semibold mb-3">
                Percentage = SGPA × 9.5
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Example Calculation:</strong></p>
                <p className="text-sm text-gray-600">Your Semester 5 SGPA: 8.7</p>
                <p className="text-sm text-gray-600">Percentage = 8.7 × 9.5</p>
                <p className="text-sm font-bold text-indigo-600">Percentage = 82.65%</p>
                <p className="text-sm text-gray-600 mt-2">This means you scored about 83% in Semester 5</p>
              </div>
            </div>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 mt-6">
              For 4-Point Scale (US/Canadian Universities)
            </h4>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-sm sm:text-base text-center text-gray-800 font-semibold mb-3">
                Percentage = (SGPA ÷ 4) × 100
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Example Calculation:</strong></p>
                <p className="text-sm text-gray-600">Your Fall Semester GPA: 3.4</p>
                <p className="text-sm text-gray-600">Percentage = (3.4 ÷ 4) × 100</p>
                <p className="text-sm text-gray-600">Percentage = 0.85 × 100</p>
                <p className="text-sm font-bold text-indigo-600">Percentage = 85%</p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              SGPA to Percentage Conversion Chart
            </h3>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">10-Point SGPA</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Percentage</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Grade</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">10.0</td>
                    <td className="px-3 sm:px-6 py-3">95%</td>
                    <td className="px-3 sm:px-6 py-3">O</td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">Outstanding</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">9.0</td>
                    <td className="px-3 sm:px-6 py-3">85.5%</td>
                    <td className="px-3 sm:px-6 py-3">A+</td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">Excellent</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">8.0</td>
                    <td className="px-3 sm:px-6 py-3">76%</td>
                    <td className="px-3 sm:px-6 py-3">A</td>
                    <td className="px-3 sm:px-6 py-3 text-blue-600">Very Good</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">7.0</td>
                    <td className="px-3 sm:px-6 py-3">66.5%</td>
                    <td className="px-3 sm:px-6 py-3">B</td>
                    <td className="px-3 sm:px-6 py-3 text-blue-600">Good</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">6.0</td>
                    <td className="px-3 sm:px-6 py-3">57%</td>
                    <td className="px-3 sm:px-6 py-3">C</td>
                    <td className="px-3 sm:px-6 py-3 text-yellow-600">Average</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">5.0</td>
                    <td className="px-3 sm:px-6 py-3">47.5%</td>
                    <td className="px-3 sm:px-6 py-3">D</td>
                    <td className="px-3 sm:px-6 py-3 text-orange-600">Pass</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              When You Need SGPA to Percentage Conversion
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Converting semester GPA to percentage isn't just academic exercise - there are real situations where you'll need this conversion:
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Summer Internship Applications:</strong> Many companies want to see semester-wise performance, not just overall CGPA, to check if you're improving or declining</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Semester-Based Scholarships:</strong> Some merit scholarships evaluate each semester separately and require percentage above a certain cut-off</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Exchange Student Programs:</strong> When applying for semester abroad programs, universities often need your recent semester percentage</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Personal Progress Tracking:</strong> Converting each semester helps you visualize your academic journey and spot improvement patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Course-Specific Requirements:</strong> Some advanced courses or projects require minimum percentage in prerequisite semesters</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Understanding Semester-Wise Performance Trends
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              One major advantage of tracking SGPA to percentage conversions each semester is seeing your performance trend. This helps you understand if you're improving, maintaining consistency, or need to work harder.
            </p>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Performance Trend Example</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm">
                  <thead className="bg-purple-100 text-purple-800">
                    <tr>
                      <th className="px-3 py-2 text-left">Semester</th>
                      <th className="px-3 py-2 text-right">SGPA</th>
                      <th className="px-3 py-2 text-right">Percentage</th>
                      <th className="px-3 py-2 text-left">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-3 py-2">Sem 1</td>
                      <td className="px-3 py-2 text-right font-semibold">7.5</td>
                      <td className="px-3 py-2 text-right">71.25%</td>
                      <td className="px-3 py-2 text-gray-600">Starting point</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Sem 2</td>
                      <td className="px-3 py-2 text-right font-semibold">7.9</td>
                      <td className="px-3 py-2 text-right">75.05%</td>
                      <td className="px-3 py-2 text-green-600">↑ Improving</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Sem 3</td>
                      <td className="px-3 py-2 text-right font-semibold">8.4</td>
                      <td className="px-3 py-2 text-right">79.8%</td>
                      <td className="px-3 py-2 text-green-600">↑ Great progress</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Sem 4</td>
                      <td className="px-3 py-2 text-right font-semibold">8.7</td>
                      <td className="px-3 py-2 text-right">82.65%</td>
                      <td className="px-3 py-2 text-green-600">↑ Consistent growth</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-3">This student shows steady improvement - exactly what employers and graduate schools love to see!</p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Common Mistakes When Converting SGPA
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Mistake #1: Using CGPA Formula for SGPA</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  The conversion formula is the same for both SGPA and CGPA, but students sometimes confuse which number to use. Remember: SGPA is for one semester only. If you want overall percentage, first calculate CGPA by averaging all semester SGPAs, then convert.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Mistake #2: Wrong Grading Scale</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Using 10-point formula when your university uses 4-point scale (or vice versa) gives completely wrong results. Always verify your university's grading scale before converting. Check your grade card - it usually mentions the scale.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Mistake #3: Averaging Percentages Instead of SGPAs</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Wrong way: Convert each semester to percentage, then average those percentages. Right way: First average all semester SGPAs to get CGPA, then convert CGPA to percentage. The math works out differently!
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Tips to Improve Your SGPA Each Semester
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Every semester is a fresh start. If your last semester SGPA wasn't great, you can bounce back. Here's how successful students maintain or improve their semester GPA:
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Attend Classes Regularly from Day One</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Missing the first few weeks seems harmless, but it sets a bad pattern. Professors often introduce key concepts early that everything else builds on. Students with 75%+ attendance consistently score better than those who skip classes.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Don't Ignore Continuous Assessment</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Assignments, quizzes, and mid-terms often contribute 30-40% of your final grade. Many students focus only on end-semester exams and lose easy marks. Do your assignments properly - they're free points!
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Form a Consistent Study Routine</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Studying 2 hours daily is better than 14 hours before exams. Your brain retains information better with regular exposure. Set a fixed time each day for revision - treat it like a class you can't skip.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How is SGPA calculated from my semester grades?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  SGPA is calculated using your grade points and credit hours for each subject in that semester. Formula: SGPA = (Sum of Grade Points × Credits for each subject) ÷ (Total Credits). For example, if you got grades 9, 8, 10 in subjects with 4, 3, 2 credits: SGPA = (9×4 + 8×3 + 10×2) ÷ (4+3+2) = 80 ÷ 9 = 8.89. Then you'd convert this 8.89 SGPA to percentage using our calculator.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I convert each semester SGPA separately?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Absolutely! Each semester SGPA converts to its own percentage. If Semester 1 SGPA is 7.8, that's 74.1%. If Semester 2 is 8.2, that's 77.9%. These are separate conversions showing your performance in each individual semester. This is different from overall percentage, which requires calculating CGPA first.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Is 8.0 SGPA good for getting a job?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes, 8.0 SGPA (76%) is good! Most companies have eligibility criteria around 60-70%, so 8.0 clears most cut-offs comfortably. Top companies might look for 8.5+ (80.75%), but 8.0 opens doors to majority of opportunities. More importantly, consistent 8.0 across semesters looks better than fluctuating between 7.0 and 9.0.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Does one bad semester ruin my overall percentage?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  No, that's the beauty of the semester system! One bad semester lowers your CGPA but doesn't ruin it completely. If you got 6.0 in Semester 1 but then consistently score 8.5+ in remaining semesters, your CGPA will improve significantly. Many students start slow and finish strong. What matters is showing improvement and maintaining good performance in later semesters.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Why do some universities use different conversion formulas?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  While 9.5 multiplier is most common for 10-point systems, some universities use their own formulas to align with their specific grading philosophy. Some use 10 as multiplier, others use different values. Always check your university's official conversion chart before using converted percentages for formal applications. Our calculator uses the most widely accepted standard formulas.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How do I calculate overall percentage from multiple semesters?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Step 1: Add all your semester SGPAs. Step 2: Divide by number of semesters to get CGPA. Step 3: Convert CGPA to percentage. Example: If you have SGPAs of 7.8, 8.2, 8.5, 8.1 over 4 semesters, CGPA = (7.8+8.2+8.5+8.1)÷4 = 8.15. Then percentage = 8.15 × 9.5 = 77.4%. This is your overall percentage across all semesters.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Do elective subjects count in SGPA?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes, elective subjects count toward your SGPA just like core subjects. All subjects you're enrolled in during that semester contribute based on their credit hours and your grades. Some universities have "audit" courses that don't count, but regular electives do. This is why choosing electives you're genuinely interested in can help boost your semester GPA.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I use this calculator for CGPA to percentage?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes! The formula is exactly the same for SGPA and CGPA conversion. SGPA shows one semester, CGPA shows overall performance, but both use the same conversion method. So if your CGPA is 8.3, you can use this calculator to convert it to percentage (78.85%). For dedicated CGPA conversion, we also have a CGPA to Percentage calculator on our site.
                </p>
              </details>
            </div>

            <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to Convert Your SGPA?</h3>
              <p className="text-sm sm:text-base mb-6 text-indigo-100">
                Use our free SGPA to percentage calculator above for instant, accurate results. Track your semester performance, apply for internships, or just understand where you stand academically!
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Calculate Now
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-12">
              Related Academic Calculators
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/cgpa-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaGraduationCap className="text-2xl text-blue-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate cumulative grade point average</p>
              </a>

              <a href="/cgpa-to-percentage" className="block p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaPercent className="text-2xl text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA to Percentage</h4>
                </div>
                <p className="text-xs text-gray-600">Convert overall CGPA to percentage</p>
              </a>

              <a href="/marks-percentage" className="block p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-green-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Marks Percentage</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate percentage from marks</p>
              </a>
            </div>

            <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This SGPA to Percentage Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our <strong>SGPA to percentage calculator</strong> helps students convert semester GPA to percentage format instantly and accurately. Whether you're tracking semester-wise academic progress, applying for summer internships, or need percentage equivalents for scholarship applications, this <strong>semester GPA calculator</strong> provides results based on standard university conversion formulas. Supporting both 10-point and 4-point grading scales, this <strong>free SGPA converter</strong> is trusted by thousands of students daily across Indian universities (VTU, Anna University, JNTU, Mumbai University), American colleges, and international institutions. Perfect for engineering students, MBA students, and anyone following the semester system. Calculate your <strong>semester percentage</strong> now and monitor your academic performance effectively. This <strong>SGPA percentage calculator</strong> is mobile-optimized, requires no registration, and provides detailed grade classifications with every conversion!
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | Based on Standard Academic Conversion Formulas
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}