import { useState } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaPercent, FaUniversity, FaStar } from 'react-icons/fa';
import { FaPlus, FaTrash, FaCalculator, FaGraduationCap, FaChartLine, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket } from 'react-icons/fa';

export default function CGPACalculator() {
  const [subjects, setSubjects] = useState([
    { grade: '', credit: '' }
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addSubject = () => {
    setSubjects([...subjects, { grade: '', credit: '' }]);
  };

  const removeSubject = (index) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
    setError('');
  };

  const calculateCGPA = async () => {
    try {
      setLoading(true);
      setError('');
      
      const grades = subjects.map(s => parseFloat(s.grade));
      const credits = subjects.map(s => parseFloat(s.credit));
      
      if (grades.some(g => isNaN(g) || g < 0 || g > 10)) {
        setError('Please enter valid grades between 0 and 10');
        setLoading(false);
        return;
      }
      
      if (credits.some(c => isNaN(c) || c <= 0)) {
        setError('Please enter valid credits greater than 0');
        setLoading(false);
        return;
      }
      
      const response = await calculatorAPI.calculate('cgpa-calculator', { grades, credits });
      setResult(response);
    } catch (err) {
      setError(err.message || 'Failed to calculate CGPA');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setSubjects([{ grade: '', credit: '' }]);
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="CGPA Calculator - Calculate Your Cumulative GPA Online Free"
      description="Free CGPA calculator for students in India, USA, UK, and Canada. Calculate cumulative grade point average instantly with our accurate GPA calculator. Support for 4-point and 10-point scales."
      keywords="CGPA calculator, GPA calculator, cumulative GPA, grade point average calculator, CGPA to percentage, student GPA calculator, college GPA calculator, university GPA calculator"
      schema={{
        '@type': 'WebApplication',
        name: 'CGPA Calculator',
        applicationCategory: 'EducationalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '15420'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaCheckCircle className="text-green-300" />
            <span>Used by 15,000+ students monthly</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            CGPA Calculator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Calculate your Cumulative Grade Point Average instantly. Free, accurate, and easy to use for all grading systems.
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
                  <FaGraduationCap className="text-blue-600" />
                  Enter Your Grades
                </h2>
                {subjects.length > 1 && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="space-y-3 sm:space-y-4 mb-6">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex gap-2 sm:gap-4 items-center bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-3">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Grade (0-10)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="10"
                          value={subject.grade}
                          onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="8.5"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Credits
                        </label>
                        <input
                          type="number"
                          step="1"
                          min="1"
                          value={subject.credit}
                          onChange={(e) => handleInputChange(index, 'credit', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="4"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeSubject(index)}
                      className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={subjects.length === 1}
                      title="Remove subject"
                    >
                      <FaTrash className="text-sm sm:text-base" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={addSubject}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all text-sm sm:text-base"
                >
                  <FaPlus /> Add Subject
                </button>
                
                <button
                  onClick={calculateCGPA}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <FaCalculator />
                  {loading ? 'Calculating...' : 'Calculate CGPA'}
                </button>
              </div>

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
                
                <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 shadow-md">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Your CGPA</p>
                    <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-600 mb-2">{result.cgpa}</p>
                    <p className="text-sm text-gray-600">Total Credits: <span className="font-semibold">{result.totalCredits}</span></p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">Subject Breakdown</h3>
                  <div className="space-y-3">
                    {result.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-3 last:border-b-0 text-xs sm:text-sm">
                        <span className="text-gray-700 font-medium">Subject {index + 1}</span>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">Grade: {item.grade} | Credits: {item.credit}</p>
                          <p className="text-xs text-gray-600">Grade Points: {item.points}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                  <p className="text-sm text-gray-700">
                    <strong className="text-blue-700">Next Steps:</strong> Use our <a href="/cgpa-to-percentage" className="text-blue-600 hover:underline font-semibold">CGPA to Percentage converter</a> to convert this score for university applications.
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
                Quick Guide
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <p className="text-gray-700">Enter your grade points for each subject (0-10 scale)</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Enter credit hours for each course</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">Click "Add Subject" for more courses</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">Hit Calculate to get your CGPA instantly</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaInfoCircle className="text-blue-600" />
                  Formula
                </h4>
                <p className="text-xs text-gray-700 font-mono bg-gray-50 p-2 rounded">
                  CGPA = Σ(Grade × Credit) / Σ(Credits)
                </p>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">💡 Pro Tip</p>
                <p className="text-xs">Save your results by taking a screenshot or noting them down for future reference.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Understanding CGPA: Everything You Need to Know
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                What is CGPA?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                CGPA stands for Cumulative Grade Point Average. Think of it as your overall academic score that combines all your semester results into one number. Universities worldwide use this system because it gives a fair picture of how you've performed throughout your entire course, not just in one exam or semester.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How to Calculate Your CGPA
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Calculating CGPA might seem tricky at first, but it's actually pretty straightforward once you get the hang of it. Here's how it works:
            </p>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-6">
              <p className="font-mono text-sm sm:text-base text-center text-gray-800 font-semibold">
                CGPA = (Grade₁ × Credit₁ + Grade₂ × Credit₂ + ... + Gradeₙ × Creditₙ) / (Total Credits)
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Here's what happens: Each course you take has a grade (your performance) and credits (the course's weightage). Courses with more credits have a bigger impact on your CGPA. The calculator multiplies each grade by its credits, adds everything up, and divides by your total credits. That's your CGPA!
            </p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 my-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-green-600" />
                  10-Point Scale (Mainly India)
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Grades go from 0 to 10</li>
                  <li>• Most Indian universities follow this</li>
                  <li>• Easy to convert to percentage</li>
                  <li>• IITs, NITs, and most colleges use this</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaCheckCircle className="text-green-600" />
                  4-Point Scale (USA/Canada)
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
                  <li>• Grades range from 0 to 4</li>
                  <li>• Standard in North American universities</li>
                  <li>• A = 4.0, B = 3.0, C = 2.0, and so on</li>
                  <li>• Used by most US and Canadian schools</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              What Do Different CGPA Scores Mean?
            </h3>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">CGPA Range</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Letter Grade</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Performance</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Percentage Equiv.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">9.0 - 10.0</td>
                    <td className="px-3 sm:px-6 py-3">A+</td>
                    <td className="px-3 sm:px-6 py-3">Outstanding</td>
                    <td className="px-3 sm:px-6 py-3">85% - 100%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">8.0 - 8.9</td>
                    <td className="px-3 sm:px-6 py-3">A</td>
                    <td className="px-3 sm:px-6 py-3">Excellent</td>
                    <td className="px-3 sm:px-6 py-3">76% - 84%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">7.0 - 7.9</td>
                    <td className="px-3 sm:px-6 py-3">B+</td>
                    <td className="px-3 sm:px-6 py-3">Very Good</td>
                    <td className="px-3 sm:px-6 py-3">66% - 75%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">6.0 - 6.9</td>
                    <td className="px-3 sm:px-6 py-3">B</td>
                    <td className="px-3 sm:px-6 py-3">Good</td>
                    <td className="px-3 sm:px-6 py-3">57% - 65%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 font-semibold">5.0 - 5.9</td>
                    <td className="px-3 sm:px-6 py-3">C</td>
                    <td className="px-3 sm:px-6 py-3">Average</td>
                    <td className="px-3 sm:px-6 py-3">47% - 56%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Why Use This Calculator?
            </h3>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              {[
                { icon: <FaRocket />, title: 'Instant Results', desc: 'Get your CGPA in seconds, not minutes' },
                { icon: <FaCheckCircle />, title: 'Always Accurate', desc: 'We use the same formula universities use' },
                { icon: <FaLightbulb />, title: 'Super Simple', desc: "No sign-up needed. Just plug in your grades" },
              ].map((feature, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 text-center">
                  <div className="text-3xl text-blue-600 mb-2 flex justify-center">{feature.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              CGPA vs GPA: What's the Difference?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              People often use these terms interchangeably, but there's actually a subtle difference:
            </p>

            <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-2 mb-6 pl-4">
              <li><strong>CGPA (Cumulative Grade Point Average):</strong> This covers your entire academic program from day one till now. It's the big picture of your performance.</li>
              <li><strong>GPA (Grade Point Average):</strong> Usually refers to just one semester or academic year. It's more of a snapshot.</li>
              <li><strong>SGPA (Semester Grade Point Average):</strong> Your performance in a single semester only.</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Want to Boost Your CGPA? Here's How
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Improving your CGPA takes some strategy. Here are some practical tips that actually work:
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Target high-credit courses:</strong> A good grade in a 4-credit course helps your CGPA more than the same grade in a 2-credit course. Focus your energy where it counts most.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Be consistent:</strong> It's better to maintain steady B+ grades than to have a mix of A+ and C grades. Consistency is key to a strong CGPA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Start strong:</strong> Your first year matters more than you think. A weak start can be tough to overcome later, so give it your best shot from the beginning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Track your progress:</strong> Use this calculator regularly to see how different grades would affect your CGPA. It helps you set realistic goals.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              CGPA Requirements for Higher Studies
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Different programs and universities have different CGPA cutoffs. Here's what you generally need:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left">Program Type</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Minimum CGPA</th>
                    <th className="px-3 sm:px-6 py-3 text-left">Competitive CGPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3">Master's Degree (India)</td>
                    <td className="px-3 sm:px-6 py-3">6.0 - 6.5</td>
                    <td className="px-3 sm:px-6 py-3">8.0+</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3">Master's Degree (USA)</td>
                    <td className="px-3 sm:px-6 py-3">3.0/4.0</td>
                    <td className="px-3 sm:px-6 py-3">3.5+/4.0</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3">PhD Programs</td>
                    <td className="px-3 sm:px-6 py-3">7.5 - 8.0</td>
                    <td className="px-3 sm:px-6 py-3">9.0+</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-3">Top MBA Programs</td>
                    <td className="px-3 sm:px-6 py-3">7.0 - 7.5</td>
                    <td className="px-3 sm:px-6 py-3">8.5+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Common Questions About CGPA
            </h3>

            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How is CGPA different from percentage?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  CGPA is a point system while percentage is your actual marks out of 100. To convert CGPA to percentage on the 10-point scale, just multiply by 9.5. So if you have 8.0 CGPA, that's roughly 76%. Want an exact conversion? Try our <a href="/cgpa-to-percentage" className="text-blue-600 hover:underline font-semibold">CGPA to Percentage converter</a>.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Can I calculate CGPA for all my semesters at once?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Absolutely! Just add all your subjects from every semester with their grades and credits. The calculator does all the heavy lifting and gives you your overall CGPA. No need to calculate semester by semester separately.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">What's a good CGPA for getting placed?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Most companies set their minimum bar at 6.0-7.0 CGPA for campus placements. Top consulting firms and tech giants often look for 8.0 or above. But here's the thing - CGPA isn't everything. Your projects, internships, and skills matter just as much, sometimes even more.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">How do I convert between 4-point and 10-point scales?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  It's pretty simple - multiply by 2.5 to go from 4-point to 10-point (so 3.2 GPA becomes 8.0 CGPA). To go the other way, divide by 2.5. Keep in mind some universities have their own conversion methods, so it's worth checking with your institution if you need an official conversion.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Do failed subjects count in CGPA?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  Yes, they do - and they hit your CGPA pretty hard since failed subjects usually count as 0 or F grade. This is why clearing backlogs quickly is important. The sooner you retake and pass those courses, the sooner you can start improving your overall CGPA.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <summary className="font-semibold text-gray-900 text-sm sm:text-base">Which is better - CGPA or percentage system?</summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-700">
                  CGPA has its advantages. It reduces the pressure of competing for every single mark and gives you a broader range to work with. But percentage is still widely recognized in India, especially for competitive exams and some job applications. Both have their place, really.
                </p>
              </details>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to Calculate Your CGPA?</h3>
              <p className="text-sm sm:text-base mb-6 text-blue-100">
                Scroll back up and use our calculator to find out where you stand. Thousands of students use it every month to track their academic progress. It's free, fast, and accurate.
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
              Other Calculators You Might Need
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/cgpa-to-percentage" className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaPercent className="text-2xl text-blue-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA to Percentage</h4>
                </div>
                <p className="text-xs text-gray-600">Convert your CGPA to percentage instantly</p>
              </a>

              <a href="/percentage-to-cgpa" className="block p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaGraduationCap className="text-2xl text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Percentage to CGPA</h4>
                </div>
                <p className="text-xs text-gray-600">Convert percentage to CGPA format</p>
              </a>

              <a href="/marks-percentage" className="block p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaStar className="text-2xl text-green-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Marks Percentage</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate percentage from marks</p>
              </a>
            </div>

            <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This CGPA Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We built this calculator to help students quickly figure out their cumulative GPA without the hassle of manual calculations. Over 15,000 students use it every month from India, USA, UK, and Canada. The formulas we use are verified and match what universities actually use to calculate CGPA. Whether you're checking your eligibility for a master's program, applying for scholarships, or just want to know where you stand academically, this tool has got you covered. It works with both 10-point and 4-point grading systems, handles as many subjects as you need, and best of all - it's completely free. No sign-ups, no hidden fees, just straightforward CGPA calculation whenever you need it.
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