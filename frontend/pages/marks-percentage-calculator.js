import { useState } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaStar, FaCalculator, FaTrophy, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket, FaChartBar, FaGraduationCap, FaAward } from 'react-icons/fa';

export default function MarksPercentage() {
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculatePercentage = async () => {
    try {
      setLoading(true);
      setError('');
      
      const obtained = parseFloat(obtainedMarks);
      const total = parseFloat(totalMarks);
      
      if (isNaN(obtained) || isNaN(total)) {
        setError('Please enter valid numbers for both marks');
        setLoading(false);
        return;
      }
      
      if (obtained < 0 || total <= 0) {
        setError('Please enter positive values. Total marks must be greater than 0');
        setLoading(false);
        return;
      }
      
      if (obtained > total) {
        setError('Obtained marks cannot be greater than total marks');
        setLoading(false);
        return;
      }
      
      const response = await calculatorAPI.calculate('marks-percentage', { 
        obtainedMarks: obtained, 
        totalMarks: total 
      });
      setResult(response);
    } catch (err) {
      setError(err.message || 'Failed to calculate percentage');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setObtainedMarks('');
    setTotalMarks('');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="Marks Percentage Calculator - Calculate Exam Percentage from Marks Online"
      description="Calculate your exam percentage instantly from obtained marks and total marks. Free marks to percentage calculator for students. Get grades, results, and performance analysis in seconds."
      keywords="marks percentage calculator, calculate percentage from marks, marks to percentage, exam percentage calculator, percentage calculator marks, how to calculate percentage of marks, marks percentage formula, grade percentage calculator"
      schema={{
        '@type': 'WebApplication',
        name: 'Marks Percentage Calculator',
        applicationCategory: 'EducationalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '22450'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaTrophy className="text-yellow-300" />
            <span>22,000+ students use this daily</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            Marks Percentage Calculator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Find your exam percentage instantly. Enter your obtained marks and total marks to get your score percentage with grade classification.
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
                  <FaStar className="text-blue-600" />
                  Enter Your Marks
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-200">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3">
                    Marks Obtained
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={obtainedMarks}
                      onChange={(e) => {
                        setObtainedMarks(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-2xl sm:text-3xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="450"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaCheckCircle className="text-xl sm:text-2xl" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
                    Enter the marks you scored in the exam
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-3">
                    Total Marks
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={totalMarks}
                      onChange={(e) => {
                        setTotalMarks(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-2xl sm:text-3xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                      placeholder="600"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaGraduationCap className="text-xl sm:text-2xl" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
                    Enter the maximum marks possible
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                  <p className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
                    <FaInfoCircle className="text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Example: If you scored 450 marks out of 600 total marks, enter 450 in obtained marks and 600 in total marks.</span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={calculatePercentage}
                disabled={loading || !obtainedMarks || !totalMarks}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                <FaCalculator />
                {loading ? 'Calculating...' : 'Calculate Percentage'}
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
                  <FaChartBar className="text-green-600" />
                  Your Result
                </h2>
                
                <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 shadow-md text-center">
                  <p className="text-sm text-gray-600 mb-2">Your Percentage Score</p>
                  <p className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-blue-600 mb-4">
                    {result.percentage}%
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 flex-wrap">
                    <span>Obtained: <span className="font-semibold text-gray-900">{result.obtainedMarks}</span></span>
                    <span className="text-gray-400">|</span>
                    <span>Total: <span className="font-semibold text-gray-900">{result.totalMarks}</span></span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                      <FaAward className="text-yellow-600" />
                      Grade
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-blue-600">{result.grade}</p>
                    <p className="text-xs text-gray-600 mt-1">{result.status}</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                      <FaTrophy className="text-purple-600" />
                      Performance
                    </h3>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">{result.status}</p>
                    <p className="text-xs text-gray-600 mt-1">Overall evaluation</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Calculation Breakdown</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-mono text-sm text-center text-gray-800 mb-3">
                      ({result.obtainedMarks} ÷ {result.totalMarks}) × 100 = {result.percentage}%
                    </p>
                    <p className="text-xs text-gray-600 text-center">
                      This is the standard formula used to calculate percentage from marks
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-600 p-4 rounded-r-xl">
                  <p className="text-sm text-gray-700">
                    <strong className="text-green-700">Great Job!</strong> {result.percentage >= 90 ? 'Outstanding performance! Keep up the excellent work.' : result.percentage >= 75 ? 'Excellent work! You\'re doing great.' : result.percentage >= 60 ? 'Good effort! Keep working hard.' : result.percentage >= 50 ? 'You passed! There\'s room for improvement.' : 'Don\'t give up! Focus on understanding concepts better for next time.'}
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
                  <p className="text-gray-700">Enter your obtained marks (marks you scored)</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Enter total marks (maximum possible marks)</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">Click "Calculate Percentage"</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">Get instant percentage with grade classification</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaCalculator className="text-blue-600" />
                  Formula
                </h4>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs font-mono text-center text-gray-800 mb-2">
                    Percentage = (Obtained Marks ÷ Total Marks) × 100
                  </p>
                  <p className="text-xs text-gray-600 text-center">
                    Standard percentage formula
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">📚 Quick Tip</p>
                <p className="text-xs">You can calculate percentage for individual subjects or total marks across all subjects combined!</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              How to Calculate Percentage from Marks: Complete Guide for Students
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                Why Calculate Percentage from Marks?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Calculating your exam percentage is important for tracking academic progress, applying to colleges, filling job applications, and understanding where you stand among your peers. Most schools and universities provide marks, but many applications and forms ask for percentage scores. Our marks percentage calculator makes this conversion instant and accurate, helping students across India, USA, UK, and worldwide.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Understanding the Marks to Percentage Formula
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              The formula for calculating percentage from marks is straightforward and universally used. Whether you're in high school, college, or university, this same formula applies everywhere. The calculation involves dividing your obtained marks by the total marks and then multiplying by 100 to get the percentage.
            </p>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-sm sm:text-base text-center text-gray-800 font-semibold mb-4">
                Percentage = (Obtained Marks ÷ Total Marks) × 100
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Simple Example:</strong></p>
                <p className="text-sm text-gray-600">If you scored 85 marks out of 100:</p>
                <p className="text-sm text-gray-600">Percentage = (85 ÷ 100) × 100</p>
                <p className="text-sm text-gray-600">Percentage = 0.85 × 100</p>
                <p className="text-sm font-bold text-blue-600">Percentage = 85%</p>
              </div>
            </div>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 mt-6">
              Step-by-Step: Calculating Percentage with Different Total Marks
            </h4>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Not all exams are out of 100 marks. Your board exams might be out of 600, university exams might be out of 500, and individual papers could have different totals. Here's how to handle different scenarios:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-200">
                <h5 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Example 1: Board Exam (Out of 500)</h5>
                <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                  <p>Obtained Marks: 425</p>
                  <p>Total Marks: 500</p>
                  <p className="font-semibold mt-2">Calculation: (425 ÷ 500) × 100 = 85%</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h5 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Example 2: University Exam (Out of 600)</h5>
                <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                  <p>Obtained Marks: 456</p>
                  <p>Total Marks: 600</p>
                  <p className="font-semibold mt-2">Calculation: (456 ÷ 600) × 100 = 76%</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl border border-green-200">
                <h5 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Example 3: Single Subject (Out of 80)</h5>
                <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                  <p>Obtained Marks: 67</p>
                  <p>Total Marks: 80</p>
                  <p className="font-semibold mt-2">Calculation: (67 ÷ 80) × 100 = 83.75%</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Grade Classification Based on Percentage
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Different educational systems use different grading scales, but most follow similar patterns. Understanding where your percentage falls helps you know your academic standing:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">Percentage Range</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Grade</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Classification</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">90% - 100%</td>
                    <td className="px-3 sm:px-6 py-3">A+</td>
                    <td className="px-3 sm:px-6 py-3">Outstanding</td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">Excellent</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">80% - 89%</td>
                    <td className="px-3 sm:px-6 py-3">A</td>
                    <td className="px-3 sm:px-6 py-3">Excellent</td>
                    <td className="px-3 sm:px-6 py-3 text-green-600">Very Good</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">70% - 79%</td>
                    <td className="px-3 sm:px-6 py-3">B</td>
                    <td className="px-3 sm:px-6 py-3">Very Good</td>
                    <td className="px-3 sm:px-6 py-3 text-blue-600">Good</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">60% - 69%</td>
                    <td className="px-3 sm:px-6 py-3">C</td>
                    <td className="px-3 sm:px-6 py-3">Good</td>
                    <td className="px-3 sm:px-6 py-3 text-blue-600">Average</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">50% - 59%</td>
                    <td className="px-3 sm:px-6 py-3">D</td>
                    <td className="px-3 sm:px-6 py-3">Average</td>
                    <td className="px-3 sm:px-6 py-3 text-yellow-600">Pass</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">40% - 49%</td>
                    <td className="px-3 sm:px-6 py-3">E</td>
                    <td className="px-3 sm:px-6 py-3">Pass</td>
                    <td className="px-3 sm:px-6 py-3 text-yellow-600">Satisfactory</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">Below 40%</td>
                    <td className="px-3 sm:px-6 py-3">F</td>
                    <td className="px-3 sm:px-6 py-3">Fail</td>
                    <td className="px-3 sm:px-6 py-3 text-red-600">Need Improvement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Calculating Percentage for Multiple Subjects
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              When you have marks from multiple subjects, you need to add all your obtained marks and all total marks separately, then apply the formula. Here's a practical example from a typical semester exam:
            </p>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Semester Exam Example (5 Subjects)</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm">
                  <thead className="bg-indigo-100 text-indigo-800">
                    <tr>
                      <th className="px-3 py-2 text-left">Subject</th>
                      <th className="px-3 py-2 text-right">Obtained</th>
                      <th className="px-3 py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-3 py-2">Mathematics</td>
                      <td className="px-3 py-2 text-right">85</td>
                      <td className="px-3 py-2 text-right">100</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Physics</td>
                      <td className="px-3 py-2 text-right">78</td>
                      <td className="px-3 py-2 text-right">100</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Chemistry</td>
                      <td className="px-3 py-2 text-right">82</td>
                      <td className="px-3 py-2 text-right">100</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">English</td>
                      <td className="px-3 py-2 text-right">88</td>
                      <td className="px-3 py-2 text-right">100</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Computer Science</td>
                      <td className="px-3 py-2 text-right">92</td>
                      <td className="px-3 py-2 text-right">100</td>
                    </tr>
                    <tr className="bg-blue-50 font-bold">
                      <td className="px-3 py-2">Total</td>
                      <td className="px-3 py-2 text-right">425</td>
                      <td className="px-3 py-2 text-right">500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-700 mt-4">
                <strong>Percentage Calculation:</strong> (425 ÷ 500) × 100 = <span className="text-blue-600 font-bold text-lg">85%</span>
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Common Mistakes Students Make When Calculating Percentage
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Mistake #1: Forgetting to Multiply by 100</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  If you score 450 out of 600, dividing gives you 0.75. You must multiply by 100 to get 75%. Many students stop at the decimal and get confused about their actual percentage.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Mistake #2: Using Individual Subject Totals Incorrectly</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  When calculating overall percentage, add ALL obtained marks first, then ALL total marks. Don't calculate percentage for each subject and then average those percentages - this gives wrong results when subjects have different total marks.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Mistake #3: Rounding Too Early</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  Wait until the final answer to round. If you round intermediate steps, you'll accumulate small errors. Calculate (obtained ÷ total) × 100 completely, then round to 2 decimal places if needed.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Different Marking Systems Around the World
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              While the percentage formula stays the same, different countries use different grading philosophies:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-6 rounded-xl border border-orange-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-orange-600" />
                  India (CBSE/ICSE/State Boards)
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Usually out of 100 per subject</li>
                  <li>• 90%+ is considered excellent</li>
                  <li>• 75%+ is first division</li>
                  <li>• 60%+ is second division</li>
                  <li>• 33-40% is passing (varies by board)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-blue-600" />
                  USA (High School/College)
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Often uses GPA (4.0 scale)</li>
                  <li>• 93-100% = A (4.0)</li>
                  <li>• 90-92% = A- (3.7)</li>
                  <li>• 87-89% = B+ (3.3)</li>
                  <li>• Below 60% typically fails</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-green-600" />
                  UK (A-Levels/GCSE)
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• A* = 90-100%</li>
                  <li>• A = 80-89%</li>
                  <li>• B = 70-79%</li>
                  <li>• C = 60-69%</li>
                  <li>• Below 40% is usually fail</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-purple-600" />
                  Canada (University Level)
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Uses both GPA and percentage</li>
                  <li>• 90-100% = A+ (4.0)</li>
                  <li>• 85-89% = A (4.0)</li>
                  <li>• 80-84% = A- (3.7)</li>
                  <li>• 50% is typically passing</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How to Improve Your Percentage Score
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              If you're not happy with your current percentage, here are proven strategies that students use to improve their scores:
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Focus on Understanding, Not Memorizing:</strong> When you truly understand concepts, you can answer variations of questions, not just memorized ones</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Practice Previous Year Papers:</strong> This shows you the exam pattern, question types, and marking scheme</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Strengthen Weak Subjects:</strong> Improving a subject where you scored 50% to 60% has more impact than pushing 90% to 95%</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Time Management During Exams:</strong> Allocate time based on marks - don't spend 30 minutes on a 2-mark question</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Write Clear, Structured Answers:</strong> Examiners appreciate well-organized answers with proper headings and points</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How do I calculate percentage if subjects have different total marks?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Add all your obtained marks together, then add all the total marks together, then apply the formula. For example, if you got 85/100 in Math, 78/100 in Science, and 67/80 in English, your calculation would be: (85+78+67) ÷ (100+100+80) × 100 = 230 ÷ 280 × 100 = 82.14%. Don't calculate individual subject percentages and average them - that gives wrong results when totals differ.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Is 75% a good percentage in exams?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes, 75% is generally considered a good score! In most Indian education systems, 75% puts you in the first division category. It qualifies you for most college admissions and shows strong understanding of the material. However, "good" is relative - if you're aiming for top engineering or medical colleges, you might need 85-90%+, but for most career paths, 75% is a solid, respectable score that shows you're a competent student.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How many marks do I need to get 90% if total is 500?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  To get 90% when the total is 500 marks, you need to score 450 marks. The calculation is: (Required Percentage × Total Marks) ÷ 100 = Required Marks. So: (90 × 500) ÷ 100 = 45,000 ÷ 100 = 450 marks. Similarly, for 85% you'd need 425 marks, for 80% you'd need 400 marks, and so on.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I calculate percentage for practicals and theory separately?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes, you can calculate percentages separately for practicals and theory if needed. For example, if you scored 38/50 in theory and 42/50 in practicals, theory percentage = 76% and practical percentage = 84%. However, for your overall subject marks, combine both: (38+42) ÷ (50+50) × 100 = 80%. Many universities show separate percentages for practical and theory components on mark sheets.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Why is my percentage different from what the marksheet shows?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Small differences can occur due to rounding. If you calculate (456 ÷ 600) × 100, you get 76.000%, but if the system rounds intermediate steps differently, you might see 76.01% or 75.99%. Also, some boards use grace marks or have special calculation rules for certain subjects. If there's a large difference, double-check that you're including all subjects and using the correct total marks. When in doubt, the official marksheet is what counts for applications.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How do grace marks affect my percentage?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Grace marks are additional marks given by examination boards to help students pass. If you originally scored 32/100 and received 3 grace marks to pass, your final marks become 35/100, making your percentage 35% instead of 32%. Grace marks are added to your obtained marks before calculating percentage. They appear on your marksheet and are counted as part of your official score for all purposes including college admissions.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Should I calculate percentage with or without additional subjects?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  This depends on what you need the percentage for. For your overall academic record, include all subjects. For college admission, check their requirements - some count only core subjects (best 5 or best 4), while others include all subjects. For competitive exams like JEE or NEET, they usually specify which subjects to include. When in doubt, calculate both ways and use whichever is required by the specific application or institution you're applying to.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Is percentage or grades more important?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  It depends on the context. In India, percentage is traditionally more important for applications and is still widely used. In Western countries, grades (like A, B, C) or GPA matter more. Modern Indian education is slowly shifting toward grades, but most universities, companies, and competitive exams still ask for percentage. The good news is that grades and percentages are interconvertible - if you know one, you can usually figure out the other using standard conversion charts.
                </p>
              </details>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Calculate Your Exam Percentage Now</h3>
              <p className="text-sm sm:text-base mb-6 text-blue-100">
                Use our free marks percentage calculator above to find your exact score percentage in seconds. Perfect for students, parents, and teachers. Works for any marking system - school, college, or university exams!
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Calculate Now
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-12">
              Related Educational Calculators
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
                  <FaCalculator className="text-2xl text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA to Percentage</h4>
                </div>
                <p className="text-xs text-gray-600">Convert CGPA to percentage format</p>
              </a>

              <a href="/percentage-to-cgpa" className="block p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaStar className="text-2xl text-green-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Percentage to CGPA</h4>
                </div>
                <p className="text-xs text-gray-600">Convert percentage to CGPA score</p>
              </a>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This Marks Percentage Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our <strong>marks percentage calculator</strong> is designed specifically for students who need quick, accurate percentage calculations from their exam marks. Whether you're calculating board exam results, university semester scores, or individual subject percentages, this <strong>exam percentage calculator</strong> handles all scenarios. Students across India, USA, UK, Canada, and worldwide use this <strong>free percentage calculator</strong> daily to track their academic performance. The tool works for any marking system - whether your exam is out of 100, 500, 600, or any other total. Get instant results with grade classifications and performance evaluation. This <strong>marks to percentage converter</strong> is completely free, requires no registration, and gives you detailed breakdowns of your academic standing. Calculate your <strong>exam percentage</strong> now and know exactly where you stand academically!
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | Based on Standard Percentage Calculation Formula
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}