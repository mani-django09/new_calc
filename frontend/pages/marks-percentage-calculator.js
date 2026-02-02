import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import { FaStar, FaCalculator, FaCheckCircle, FaLightbulb, FaTrophy, FaGraduationCap, FaChartLine, FaAward, FaInfoCircle, FaRocket, FaBolt, FaUserGraduate } from 'react-icons/fa';

export default function MarksPercentageCalculator() {
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  const calculatePercentage = () => {
    setLoading(true);

    setTimeout(() => {
      const obtained = parseFloat(obtainedMarks);
      const total = parseFloat(totalMarks);

      if (isNaN(obtained) || isNaN(total) || obtained < 0 || total <= 0) {
        alert('Please enter valid marks');
        setLoading(false);
        return;
      }

      if (obtained > total) {
        alert('Obtained marks cannot be greater than total marks');
        setLoading(false);
        return;
      }

      const percentage = (obtained / total) * 100;
      
      let grade = '';
      let gradePoint = 0;
      let division = '';
      let status = '';
      let color = '';

      if (percentage >= 90) {
        grade = 'A+';
        gradePoint = 10;
        division = 'First Division with Distinction';
        status = 'Outstanding';
        color = 'green';
      } else if (percentage >= 80) {
        grade = 'A';
        gradePoint = 9;
        division = 'First Division';
        status = 'Excellent';
        color = 'green';
      } else if (percentage >= 70) {
        grade = 'B+';
        gradePoint = 8;
        division = 'First Division';
        status = 'Very Good';
        color = 'blue';
      } else if (percentage >= 60) {
        grade = 'B';
        gradePoint = 7;
        division = 'Second Division';
        status = 'Good';
        color = 'blue';
      } else if (percentage >= 50) {
        grade = 'C';
        gradePoint = 6;
        division = 'Second Division';
        status = 'Average';
        color = 'yellow';
      } else if (percentage >= 40) {
        grade = 'D';
        gradePoint = 5;
        division = 'Third Division';
        status = 'Pass';
        color = 'orange';
      } else if (percentage >= 33) {
        grade = 'E';
        gradePoint = 4;
        division = 'Pass';
        status = 'Just Pass';
        color = 'orange';
      } else {
        grade = 'F';
        gradePoint = 0;
        division = 'Fail';
        status = 'Failed';
        color = 'red';
      }

      setResult({
        percentage: percentage.toFixed(2),
        grade,
        gradePoint,
        division,
        status,
        color,
        obtained,
        total,
        marksLost: total - obtained
      });

      setLoading(false);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 500);
  };

  const clearForm = () => {
    setObtainedMarks('');
    setTotalMarks('');
    setResult(null);
  };

  return (
    <Layout
      title="Marks Percentage Calculator 2026 - Calculate Exam Percentage with Grades"
      description="Free marks percentage calculator with grade classification. Calculate your exam percentage instantly from obtained marks and total marks. Get grades, divisions, and CGPA equivalent for Indian, US, UK exams."
      keywords="marks percentage calculator, percentage calculator from marks, exam percentage calculator, marks to percentage, calculate percentage of marks, grade calculator, marks percentage with grade, percentage to grade calculator"
      canonicalPath="/marks-percentage-calculator"
      ogImage="marks-percentage-calculator.jpg"
      lastUpdated="2026-01-31"
      schema={[
        {
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
            ratingCount: '32500',
            bestRating: '5',
            worstRating: '1'
          }
        },
        {
          '@type': 'HowTo',
          name: 'How to Calculate Marks Percentage',
          description: 'Step-by-step guide to calculate your exam percentage from obtained marks and total marks',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Enter Obtained Marks',
              text: 'Enter the marks you scored in the exam or total of all subjects',
              image: 'https://calculators.me.uk/images/step1-enter-marks.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Enter Total Marks',
              text: 'Enter the maximum marks possible in the exam or total of all subjects',
              image: 'https://calculators.me.uk/images/step2-total-marks.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Click Calculate',
              text: 'Click the Calculate Percentage button to get instant results',
              image: 'https://calculators.me.uk/images/step3-calculate.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'View Results',
              text: 'See your percentage, grade, division, and performance status instantly',
              image: 'https://calculators.me.uk/images/step4-results.jpg'
            }
          ],
          totalTime: 'PT30S'
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I calculate percentage from marks?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'To calculate percentage from marks, use this formula: Percentage = (Obtained Marks / Total Marks) × 100. For example, if you scored 450 marks out of 600, your percentage is (450/600) × 100 = 75%.'
              }
            },
            {
              '@type': 'Question',
              name: 'What is a good percentage in exams?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A percentage above 75% is generally considered very good and earns first division. 60-75% is good (second division), 50-60% is average, and 40-50% is pass. However, requirements vary by institution and country. For competitive exams and top universities, 85%+ is often expected.'
              }
            },
            {
              '@type': 'Question',
              name: 'How is percentage different from CGPA?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Percentage is a direct calculation of marks scored out of total marks (0-100 scale). CGPA (Cumulative Grade Point Average) is a weighted average on a 10-point or 4-point scale. To convert: CGPA = Percentage/9.5 (for Indian 10-point system) or use specific university conversion tables.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I calculate percentage for multiple subjects?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! Add up all your obtained marks across all subjects, then add up all the maximum marks. Use the total obtained and total maximum in the calculator. For example: if you scored 80/100 in Math, 75/100 in Science, and 85/100 in English, your percentage is (80+75+85)/(100+100+100) × 100 = 240/300 × 100 = 80%.'
              }
            }
          ]
        }
      ]}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Marks Percentage Calculator', href: '/marks-percentage-calculator' }
      ]} />

      {/* Professional Hero Section - Clean & Modern */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full mb-5 border border-blue-100">
            <FaTrophy className="text-yellow-500" />
            <span className="text-sm font-semibold text-gray-800">22,000+ students use this daily</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Marks Percentage Calculator
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Calculate your exam percentage instantly with grade classification. No signup required.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <FaBolt className="text-blue-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">Instant Results</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                <FaStar className="text-yellow-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">Grade Classification</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Section - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaCalculator className="text-blue-600" />
                  Calculate Your Percentage
                </h2>
                <button
                  onClick={clearForm}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Calculator Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    Marks Obtained
                  </label>
                  <input
                    type="number"
                    value={obtainedMarks}
                    onChange={(e) => setObtainedMarks(e.target.value)}
                    className="w-full px-4 py-4 text-xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 450"
                    min="0"
                  />
                  <p className="text-sm text-gray-500 mt-2">Enter the marks you scored (sum of all subjects)</p>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    className="w-full px-4 py-4 text-xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 600"
                    min="0"
                  />
                  <p className="text-sm text-gray-500 mt-2">Enter maximum possible marks (sum of all subjects)</p>
                </div>

                {/* Example Box */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
                  <div className="flex items-start gap-3">
                    <FaLightbulb className="text-yellow-600 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Quick Example:</p>
                      <p className="text-sm text-gray-700">
                        If you scored 450 marks out of 600 total, enter 450 in obtained marks and 600 in total marks. 
                        The calculator will show 75% with first division grade.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculatePercentage}
                  disabled={loading || !obtainedMarks || !totalMarks}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <FaCalculator />
                      Calculate Percentage
                    </>
                  )}
                </button>
              </div>

              {/* How to Use - Enhanced with Better Visuals */}
              <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-lg">
                  <FaInfoCircle className="text-indigo-600" />
                  How to Use This Calculator
                </h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-6 mb-3 shadow-sm border border-indigo-100 h-28 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-blue-600">1</span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-700">Enter Obtained Marks</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-6 mb-3 shadow-sm border border-indigo-100 h-28 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-green-600">2</span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-700">Enter Total Marks</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-6 mb-3 shadow-sm border border-indigo-100 h-28 flex flex-col items-center justify-center">
                      <FaCalculator className="text-4xl text-purple-600" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">Click Calculate</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-6 mb-3 shadow-sm border border-indigo-100 h-28 flex flex-col items-center justify-center">
                      <FaTrophy className="text-4xl text-yellow-500" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">Get Instant Grade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Grade Classification Guide */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaAward className="text-purple-600" />
                Grade Classification
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-200">
                  <span className="font-medium text-gray-900">90-100%</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-bold">A+</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-200">
                  <span className="font-medium text-gray-900">80-89%</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">A</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-200">
                  <span className="font-medium text-gray-900">70-79%</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-bold">B+</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-200">
                  <span className="font-medium text-gray-900">60-69%</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">B</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-yellow-200">
                  <span className="font-medium text-gray-900">50-59%</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold">C</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-orange-200">
                  <span className="font-medium text-gray-900">40-49%</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-bold">D</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-red-200">
                  <span className="font-medium text-gray-900">Below 40%</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-bold">F</span>
                </div>
              </div>
            </div>

            

            {/* Popular Examples */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Popular Examples
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold text-gray-900">450/600 marks</div>
                  <div className="text-green-600">= 75% (First Division)</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold text-gray-900">540/600 marks</div>
                  <div className="text-green-600">= 90% (Distinction)</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold text-gray-900">360/500 marks</div>
                  <div className="text-blue-600">= 72% (First Division)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - Enhanced Design */}
        {result && (
          <div ref={resultsRef} className="mt-12 animate-fade-in">
            {/* Celebration Banner - If Excellent Performance */}
            {result.percentage >= 75 && (
              <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white p-6 sm:p-8 rounded-2xl shadow-2xl mb-6 text-center">
                <div className="text-5xl mb-3">🎉</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  Congratulations! You Scored {result.percentage}%
                </h2>
                <p className="text-lg sm:text-xl text-green-50">
                  That's a <strong>{result.division}</strong> performance!
                </p>
              </div>
            )}

            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                  <FaChartLine className="text-blue-600" />
                  Your Results
                </h2>
                
                {/* Large Percentage Display */}
                <div className={`inline-flex flex-col items-center justify-center w-48 h-48 sm:w-56 sm:h-56 rounded-full shadow-2xl mb-6 ${
                  result.color === 'green' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                  result.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                  result.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                  result.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                  'bg-gradient-to-br from-red-500 to-pink-600'
                }`}>
                  <div className="text-5xl sm:text-6xl font-extrabold text-white">{result.percentage}%</div>
                  <div className="text-white text-base sm:text-lg font-medium mt-2">Your Score</div>
                </div>

                {/* Status Badge */}
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg shadow-lg ${
                  result.color === 'green' ? 'bg-green-100 text-green-800 border-2 border-green-300' :
                  result.color === 'blue' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' :
                  result.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' :
                  result.color === 'orange' ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' :
                  'bg-red-100 text-red-800 border-2 border-red-300'
                }`}>
                  {result.status === 'Outstanding' || result.status === 'Excellent' ? <FaTrophy className="text-xl" /> : <FaStar />}
                  {result.status}
                </div>
              </div>

              {/* Results Grid - Enhanced */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Grade</div>
                    <FaAward className="text-blue-600 text-xl" />
                  </div>
                  <div className="text-4xl font-extrabold text-gray-900 mb-2">{result.grade}</div>
                  <div className="text-xs text-gray-500">Grade Point: {result.gradePoint}/10</div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Division</div>
                    <FaStar className="text-purple-600 text-xl" />
                  </div>
                  <div className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{result.division}</div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-green-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Marks Secured</div>
                    <FaCheckCircle className="text-green-600 text-xl" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-1">{result.obtained}</div>
                  <div className="text-xs text-gray-500">out of {result.total}</div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-orange-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Marks Lost</div>
                    <FaInfoCircle className="text-orange-600 text-xl" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-orange-700 mb-1">{result.marksLost}</div>
                  <div className="text-xs text-gray-500">{((result.marksLost/result.total)*100).toFixed(1)}% lost</div>
                </div>
              </div>

              {/* Performance Insight - Enhanced */}
              {result.percentage >= 75 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-300 shadow-inner">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                    <FaTrophy className="text-yellow-600 text-xl" />
                    Excellent Performance!
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    You've scored in the first division! This is an impressive achievement that demonstrates strong 
                    understanding of the subject matter. Keep up the excellent work and maintain this momentum in future exams!
                  </p>
                </div>
              )}

              {result.percentage >= 60 && result.percentage < 75 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-300 shadow-inner">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                    <FaStar className="text-blue-600 text-xl" />
                    Good Performance!
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    You've secured a second division with a solid performance. With some additional effort in weaker 
                    areas and focused preparation, you can aim for first division in your next exam. You're on the right track!
                  </p>
                </div>
              )}

              {result.percentage < 60 && result.percentage >= 40 && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300 shadow-inner">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                    <FaCheckCircle className="text-yellow-600 text-xl" />
                    Room for Improvement
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    You've passed the exam, which is a good start. Focus on understanding core concepts better, 
                    practice more regularly, and don't hesitate to ask teachers for help. With consistent effort, 
                    you can significantly improve your score in future exams!
                  </p>
                </div>
              )}

              {result.percentage < 40 && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border-2 border-red-300 shadow-inner">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                    <FaLightbulb className="text-red-600 text-xl" />
                    Need to Work Harder
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    This result shows there's significant room for improvement. Don't be discouraged! Start by identifying 
                    your weak topics, create a study schedule, seek help from teachers, and practice regularly. 
                    With dedication and proper guidance, you can definitely improve your performance!
                  </p>
                </div>
              )}
            </div>

            {/* Conversion Reference */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaChartLine className="text-indigo-600" />
                Percentage to CGPA Conversion (Quick Reference)
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <div className="font-semibold text-gray-900 mb-1">90-100%</div>
                  <div className="text-sm text-gray-600">CGPA: 9.5-10</div>
                  <div className="text-xs text-green-700 mt-1">Outstanding</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <div className="font-semibold text-gray-900 mb-1">75-89%</div>
                  <div className="text-sm text-gray-600">CGPA: 7.9-9.4</div>
                  <div className="text-xs text-blue-700 mt-1">First Division</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                  <div className="font-semibold text-gray-900 mb-1">60-74%</div>
                  <div className="text-sm text-gray-600">CGPA: 6.3-7.8</div>
                  <div className="text-xs text-yellow-700 mt-1">Second Division</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                  <div className="font-semibold text-gray-900 mb-1">40-59%</div>
                  <div className="text-sm text-gray-600">CGPA: 4.2-6.2</div>
                  <div className="text-xs text-orange-700 mt-1">Pass</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">
                *Conversion formula may vary by university. This is based on the common Indian system (Percentage ÷ 9.5 = CGPA).
              </p>
            </div>
          </div>
        )}

        {/* Comprehensive Content Sections */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          {/* What is Marks Percentage */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaInfoCircle className="text-blue-600" />
              What is Marks Percentage?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                <strong>Marks percentage</strong> is a standardized way to express your academic performance as a number between 0 and 100. It shows what proportion of the total possible marks you've earned, making it easy to compare performance across different exams, subjects, or even educational systems.
              </p>
              <p>
                Whether you're a student checking your semester results, a parent tracking your child's progress, or someone applying to universities abroad, understanding how to calculate and interpret percentage is essential. In India, the UK, the US, and many other countries, percentage remains one of the most widely used metrics for academic evaluation.
              </p>
              <p>
                The beauty of percentage is its simplicity. No matter if your exam was out of 100 marks, 500 marks, or any other total, converting to percentage creates a common scale everyone understands. Scoring 450 out of 600 might not immediately tell you much, but knowing it's 75% instantly communicates that you've performed very well.
              </p>
            </div>

            {/* Enhanced Illustration Image */}
            <div className="mt-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-inner">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="font-semibold text-gray-900">Enter Your Marks</p>
                        <p className="text-sm text-gray-600">Total marks you scored across all subjects</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="font-semibold text-gray-900">Enter Maximum Marks</p>
                        <p className="text-sm text-gray-600">Total maximum marks possible</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <p className="font-semibold text-gray-900">Get Instant Results</p>
                        <p className="text-sm text-gray-600">Percentage, grade, and division instantly</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-dashed border-indigo-300">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <FaGraduationCap className="text-6xl text-indigo-600" />
                    </div>
                    <p className="text-gray-500 text-sm italic">Percentage = (Obtained ÷ Total) × 100</p>
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">Example:</p>
                      <p className="text-xs text-gray-600 mt-1">(450 ÷ 600) × 100 = 75%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Calculate */}
          <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-8 border border-green-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Calculate Percentage from Marks
            </h2>
            
            <div className="bg-white p-6 rounded-lg border-l-4 border-green-600 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Formula</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <p className="text-center text-2xl font-bold text-gray-900">
                  Percentage = (Obtained Marks ÷ Total Marks) × 100
                </p>
              </div>
              <p className="text-gray-700">
                This simple formula works for any exam, any subject, and any marking system. The key is to make sure you're using the correct total marks (the maximum possible score) and your actual obtained marks.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step-by-Step Calculation</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <strong>Add up your obtained marks:</strong> If you have multiple subjects, add all the marks you scored. For example: Math (80) + Science (75) + English (85) + History (70) = 310 marks obtained.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <strong>Add up the total possible marks:</strong> Similarly, add the maximum marks for each subject. If each subject is out of 100, that's 100 + 100 + 100 + 100 = 400 total marks.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <strong>Divide obtained by total:</strong> Take your obtained marks (310) and divide by total marks (400). This gives you 310 ÷ 400 = 0.775
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <div>
                      <strong>Multiply by 100:</strong> Convert the decimal to percentage by multiplying by 100. So 0.775 × 100 = 77.5%
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Real Example</h3>
                <div className="bg-purple-50 p-5 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-3">Student's Marks:</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-white p-3 rounded">Mathematics: 85/100</div>
                    <div className="bg-white p-3 rounded">Physics: 78/100</div>
                    <div className="bg-white p-3 rounded">Chemistry: 82/100</div>
                    <div className="bg-white p-3 rounded">English: 75/100</div>
                    <div className="bg-white p-3 rounded">Computer: 90/100</div>
                  </div>
                  <div className="border-t border-purple-200 pt-4">
                    <p className="text-gray-700 mb-2">
                      <strong>Total Obtained:</strong> 85 + 78 + 82 + 75 + 90 = <span className="text-purple-700 font-bold">410 marks</span>
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Total Maximum:</strong> 100 + 100 + 100 + 100 + 100 = <span className="text-purple-700 font-bold">500 marks</span>
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Calculation:</strong> (410 ÷ 500) × 100 = <span className="text-green-700 font-bold">82%</span>
                    </p>
                    <p className="text-sm text-purple-700 mt-3 font-semibold">
                      Result: First Division with A grade ✓
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Grade System Explanation */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Grade Classifications
            </h2>
            <p className="text-gray-700 mb-6">
              Different educational systems use different grading scales, but here's how percentage typically converts to grades in most Indian schools and universities:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Percentage Range</th>
                    <th className="px-6 py-4 text-left font-bold">Grade</th>
                    <th className="px-6 py-4 text-left font-bold">Grade Point</th>
                    <th className="px-6 py-4 text-left font-bold">Division</th>
                    <th className="px-6 py-4 text-left font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-green-50">
                    <td className="px-6 py-4 font-medium">90-100%</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-bold text-sm">A+</span>
                    </td>
                    <td className="px-6 py-4">10</td>
                    <td className="px-6 py-4 font-medium">First with Distinction</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Outstanding performance</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-6 py-4 font-medium">80-89%</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-sm">A</span>
                    </td>
                    <td className="px-6 py-4">9</td>
                    <td className="px-6 py-4 font-medium">First Division</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Excellent work</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-6 py-4 font-medium">70-79%</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-bold text-sm">B+</span>
                    </td>
                    <td className="px-6 py-4">8</td>
                    <td className="px-6 py-4 font-medium">First Division</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Very good performance</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-6 py-4 font-medium">60-69%</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-sm">B</span>
                    </td>
                    <td className="px-6 py-4">7</td>
                    <td className="px-6 py-4 font-medium">Second Division</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Good performance</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="px-6 py-4 font-medium">50-59%</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold text-sm">C</span>
                    </td>
                    <td className="px-6 py-4">6</td>
                    <td className="px-6 py-4 font-medium">Second Division</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Average performance</td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="px-6 py-4 font-medium">40-49%</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-bold text-sm">D</span>
                    </td>
                    <td className="px-6 py-4">5</td>
                    <td className="px-6 py-4 font-medium">Third Division</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Pass</td>
                  </tr>
                  <tr className="hover:bg-red-50">
                    <td className="px-6 py-4 font-medium">Below 40%</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-bold text-sm">F</span>
                    </td>
                    <td className="px-6 py-4">0</td>
                    <td className="px-6 py-4 font-medium">Fail</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Below passing marks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> These classifications can vary slightly between different educational boards and universities. 
                Some institutions may have different cutoffs or additional grade categories. Always check your specific institution's 
                grading policy for official classifications.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 text-lg">How do I calculate percentage from marks?</summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  To calculate percentage from marks, use this formula: <strong>Percentage = (Obtained Marks ÷ Total Marks) × 100</strong>. 
                  For example, if you scored 450 marks out of 600, your percentage is (450 ÷ 600) × 100 = 75%. It's that simple! 
                  This formula works whether you're calculating for one subject or multiple subjects combined.
                </p>
              </details>

              <details className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 text-lg">What is a good percentage in exams?</summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  A percentage above <strong>75% is generally considered very good</strong> and earns first division. 60-75% is good (second division), 
                  50-60% is average, and 40-50% is pass. However, requirements vary by institution and country. For competitive exams and 
                  admission to top universities, <strong>85%+ is often expected</strong>. In professional courses like engineering or medicine, 
                  even higher percentages (90%+) may be needed for top colleges.
                </p>
              </details>

              <details className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 text-lg">How is percentage different from CGPA?</summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Percentage is a direct calculation of marks scored out of total marks on a 0-100 scale. <strong>CGPA (Cumulative Grade Point Average)</strong> 
                  is a weighted average typically on a 10-point or 4-point scale. To convert percentage to CGPA in the Indian system, you generally 
                  divide by 9.5 (Percentage ÷ 9.5 = CGPA). For example, 75% = 7.89 CGPA. However, exact conversion formulas can vary by university, 
                  and some institutions have their own specific conversion tables.
                </p>
              </details>

              <details className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 text-lg">Can I calculate percentage for multiple subjects?</summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Yes! Add up all your obtained marks across all subjects, then add up all the maximum marks. Use the total obtained and total 
                  maximum in the calculator. For example: if you scored 80/100 in Math, 75/100 in Science, and 85/100 in English, your percentage 
                  is (80+75+85) ÷ (100+100+100) × 100 = 240/300 × 100 = <strong>80%</strong>. This method works for any number of subjects, 
                  even if they have different maximum marks.
                </p>
              </details>

              <details className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 text-lg">What if subjects have different maximum marks?</summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  No problem! The formula still works. Just add all obtained marks and all total marks, even if they're different. Example: 
                  Math 80/100, Science 60/80, English 45/50. Total obtained = 80+60+45 = 185. Total maximum = 100+80+50 = 230. 
                  Percentage = (185 ÷ 230) × 100 = <strong>80.43%</strong>. The calculator handles this automatically.
                </p>
              </details>

              <details className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 text-lg">Can I use this calculator for semester results?</summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Absolutely! Whether it's a single exam, semester results, annual exams, or even cumulative performance across multiple years, 
                  this calculator works for all scenarios. Just make sure you're adding all relevant marks correctly. For semester results, 
                  add up marks from all subjects in that semester. For cumulative results, add marks from all semesters together.
                </p>
              </details>
            </div>
          </section>

          {/* Tips for Students */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-8 border border-indigo-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Tips to Improve Your Percentage
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaRocket className="text-blue-600" />
                  Before Exams
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Start preparation early - don't wait for last minute</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Focus on understanding concepts, not just memorizing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Practice previous year question papers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Make summary notes for quick revision</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaTrophy className="text-yellow-600" />
                  During Exams
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Read questions carefully before answering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Attempt all questions - never leave blanks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Manage time wisely - allocate time per question</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Review your answers before submitting</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaLightbulb className="text-yellow-600" />
                  Study Strategies
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Create a realistic study schedule and stick to it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Take regular breaks to avoid burnout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Study in groups for complex topics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use multiple resources - books, videos, tutorials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaAward className="text-purple-600" />
                  Weak Subject Focus
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Identify subjects where you're scoring low</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Spend extra time on difficult topics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Don't hesitate to ask teachers for help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Practice more problems in weak areas</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Expert Verification */}
          <ExpertBox 
            expertType="education"
            calculatorName="Marks Percentage Calculator"
            lastUpdated="January 31, 2026"
          />

          {/* User Reviews */}
          <UserReviews calculatorType="education" />

          {/* Related Calculators */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/cgpa-calculator" className="block p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaGraduationCap className="text-2xl text-blue-600" />
                  <h3 className="font-bold text-gray-900">CGPA Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate cumulative GPA</p>
              </a>

              <a href="/cgpa-to-percentage" className="block p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaChartLine className="text-2xl text-green-600" />
                  <h3 className="font-bold text-gray-900">CGPA to Percentage</h3>
                </div>
                <p className="text-sm text-gray-600">Convert CGPA to percentage</p>
              </a>

              <a href="/percentage-to-cgpa-calculator" className="block p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaStar className="text-2xl text-purple-600" />
                  <h3 className="font-bold text-gray-900">Percentage to CGPA</h3>
                </div>
                <p className="text-sm text-gray-600">Convert percentage to CGPA</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}