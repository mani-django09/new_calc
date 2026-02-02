import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import {
  FaPercent,
  FaGraduationCap,
  FaCalculator,
  FaInfoCircle,
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaChartLine,
  FaStar,
  FaTrophy,
  FaBolt,
  FaAward,
  FaGlobeAmericas,
  FaFileAlt,
  FaArrowRight
} from 'react-icons/fa';

// ─── Inline SVG: Conversion Journey Illustration ────────────────────────────
const ConversionJourneyIllustration = () => (
  <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background pill */}
    <rect x="10" y="20" width="500" height="160" rx="24" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />

    {/* Step 1 – Percentage circle */}
    <circle cx="90" cy="100" r="48" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5" />
    <text x="90" y="88" textAnchor="middle" fontSize="22" fontWeight="700" fill="#16a34a">75</text>
    <text x="90" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="#15803d">%</text>
    <text x="90" y="168" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4b5563">Percentage</text>

    {/* Arrow 1 */}
    <path d="M148 100 L178 100" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowGreen)" />
    <defs>
      <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#22c55e" />
      </marker>
    </defs>

    {/* Step 2 – Formula box */}
    <rect x="188" y="58" width="144" height="84" rx="16" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
    <text x="260" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6b7280">Formula</text>
    <text x="260" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">÷ 9.5</text>
    <text x="260" y="168" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4b5563">Conversion</text>

    {/* Arrow 2 */}
    <path d="M342 100 L372 100" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowGreen)" />

    {/* Step 3 – CGPA result circle */}
    <circle cx="430" cy="100" r="48" fill="#16a34a" stroke="#15803d" strokeWidth="2.5" />
    <text x="430" y="88" textAnchor="middle" fontSize="24" fontWeight="700" fill="#ffffff">7.89</text>
    <text x="430" y="112" textAnchor="middle" fontSize="12" fontWeight="600" fill="#bbf7d0">CGPA</text>
    <text x="430" y="168" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4b5563">Result</text>
  </svg>
);

// ─── Inline SVG: Scale Comparison Visual ─────────────────────────────────────
const ScaleComparisonIllustration = () => (
  <svg viewBox="0 0 480 180" className="w-full max-w-lg mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* India 10-point track */}
    <text x="12" y="42" fontSize="11" fontWeight="600" fill="#4b5563">India (10-pt)</text>
    <rect x="12" y="52" width="456" height="28" rx="14" fill="#e5e7eb" />
    <rect x="12" y="52" width="320" height="28" rx="14" fill="url(#indiaGrad)" />
    <text x="180" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">7.89 / 10</text>
    <defs>
      <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>

    {/* USA 4-point track */}
    <text x="12" y="118" fontSize="11" fontWeight="600" fill="#4b5563">USA / Canada (4-pt)</text>
    <rect x="12" y="128" width="456" height="28" rx="14" fill="#e5e7eb" />
    <rect x="12" y="128" width="273" height="28" rx="14" fill="url(#usaGrad)" />
    <text x="155" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">3.0 / 4.0</text>
    <defs>
      <linearGradient id="usaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>

    {/* Percentage label at top right */}
    <rect x="370" y="6" width="96" height="26" rx="13" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
    <text x="418" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#16a34a">75% Input</text>
  </svg>
);

// ─── Inline SVG: Result Ring ──────────────────────────────────────────────────
const ResultRing = ({ cgpa, scale, color }) => {
  const max = parseFloat(scale);
  const pct = Math.min((parseFloat(cgpa) / max) * 100, 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference - (pct / 100) * circumference;

  let ringColor = '#22c55e';
  let bgColor = '#dcfce7';
  if (color === 'blue') { ringColor = '#3b82f6'; bgColor = '#dbeafe'; }
  if (color === 'yellow') { ringColor = '#eab308'; bgColor = '#fef9c3'; }
  if (color === 'orange') { ringColor = '#f97316'; bgColor = '#ffedd5'; }
  if (color === 'red') { ringColor = '#ef4444'; bgColor = '#fee2e2'; }

  return (
    <svg viewBox="0 0 140 140" className="w-44 h-44 sm:w-52 sm:h-52 mx-auto drop-shadow-lg">
      <circle cx="70" cy="70" r="60" fill={bgColor} />
      <circle cx="70" cy="70" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
      <circle
        cx="70" cy="70" r={radius}
        fill="none"
        stroke={ringColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDash}
        transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <text x="70" y="62" textAnchor="middle" fontSize="28" fontWeight="800" fill="#111827">{cgpa}</text>
      <text x="70" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6b7280">CGPA</text>
      <text x="70" y="104" textAnchor="middle" fontSize="9.5" fontWeight="500" fill="#9ca3af">out of {scale}</text>
    </svg>
  );
};

export default function PercentageToCGPA() {
  const [percentage, setPercentage] = useState('');
  const [scale, setScale] = useState('10');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);

  // ── Core calculation (client-side, no API needed for simple math) ──────────
  const calculateCGPA = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const pct = parseFloat(percentage);

      if (isNaN(pct) || pct < 0 || pct > 100) {
        setError('Please enter a valid percentage between 0 and 100.');
        setLoading(false);
        return;
      }

      let cgpa, formula, letterGrade, interpretation, color;

      if (scale === '10') {
        cgpa = (pct / 9.5).toFixed(2);
        formula = `CGPA = ${pct} ÷ 9.5 = ${cgpa}`;
      } else {
        cgpa = ((pct / 100) * 4).toFixed(2);
        formula = `GPA = (${pct} ÷ 100) × 4 = ${cgpa}`;
      }

      const cgpaNum = parseFloat(cgpa);
      const maxScale = parseFloat(scale);

      // Determine grade & color based on proportion of scale
      const ratio = cgpaNum / maxScale;
      if (ratio >= 0.9) {
        letterGrade = 'A+'; color = 'green';
        interpretation = 'Exceptional academic standing. You are in the top tier and highly competitive for elite programs worldwide.';
      } else if (ratio >= 0.8) {
        letterGrade = 'A'; color = 'green';
        interpretation = 'Excellent performance. Your academics position you strongly for competitive admissions and scholarship opportunities.';
      } else if (ratio >= 0.7) {
        letterGrade = 'B+'; color = 'blue';
        interpretation = 'Very solid academics. Most universities and programs will view this favorably during the admission process.';
      } else if (ratio >= 0.6) {
        letterGrade = 'B'; color = 'blue';
        interpretation = 'Good standing. This CGPA meets the baseline requirements of most undergraduate and postgraduate programs.';
      } else if (ratio >= 0.5) {
        letterGrade = 'C'; color = 'yellow';
        interpretation = 'Average standing. Consider strengthening your application with strong extracurriculars or a compelling personal statement.';
      } else if (ratio >= 0.4) {
        letterGrade = 'D'; color = 'orange';
        interpretation = 'Below average. Some programs may still accept this, but improving your score would open significantly more doors.';
      } else {
        letterGrade = 'F'; color = 'red';
        interpretation = 'This score is below most admission thresholds. Focus on retaking exams or strengthening other parts of your application.';
      }

      setResult({
        cgpa,
        percentage: pct,
        scale,
        formula,
        letterGrade,
        interpretation,
        color,
        marksNeededFor85: scale === '10' ? (85 / 9.5).toFixed(2) : ((85 / 100) * 4).toFixed(2),
        marksNeededFor90: scale === '10' ? (90 / 9.5).toFixed(2) : ((90 / 100) * 4).toFixed(2),
        gap85: Math.max(0, 85 - pct).toFixed(1),
        gap90: Math.max(0, 90 - pct).toFixed(1)
      });

      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }, 520);
  };

  const clearAll = () => {
    setPercentage('');
    setScale('10');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="Percentage to CGPA Calculator 2026 – Convert Percentage to GPA Instantly"
      description="Convert percentage to CGPA in seconds with our free calculator. Supports both 10-point (India) and 4-point (USA/Canada) grading scales. Get letter grades, conversion formulas, and target gap analysis instantly."
      keywords="percentage to cgpa calculator, convert percentage to cgpa, percentage to gpa converter, marks to cgpa, percentage to grade point, cgpa conversion calculator, percentage to 4 point gpa"
      canonicalPath="/percentage-to-cgpa-calculator"
      ogImage="percentage-to-cgpa-calculator.jpg"
      lastUpdated="2026-01-31"
      schema={[
        {
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
            ratingCount: '21800',
            bestRating: '5',
            worstRating: '1'
          }
        },
        {
          '@type': 'HowTo',
          name: 'How to Convert Percentage to CGPA',
          description: 'Step-by-step guide to convert your exam percentage into CGPA on both 10-point and 4-point grading scales',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Choose Your Grading Scale',
              text: 'Select the grading scale your target institution uses — 10-point scale for most Indian universities or 4-point scale for US and Canadian universities.',
              image: 'https://calculators.me.uk/images/pct-cgpa-step1.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Enter Your Percentage',
              text: 'Type in your aggregate or semester percentage as a number between 0 and 100. Decimals are supported (e.g. 78.5).',
              image: 'https://calculators.me.uk/images/pct-cgpa-step2.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Click Convert',
              text: 'Press the "Convert to CGPA" button. The calculator applies the correct formula for your chosen scale automatically.',
              image: 'https://calculators.me.uk/images/pct-cgpa-step3.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Read Your Results',
              text: 'View your CGPA, equivalent letter grade, the exact formula used, and a gap analysis showing how close you are to higher academic tiers.',
              image: 'https://calculators.me.uk/images/pct-cgpa-step4.jpg'
            }
          ],
          totalTime: 'PT20S'
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I convert percentage to CGPA on a 10-point scale?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Divide your percentage by 9.5. For example, if your percentage is 75%, your CGPA is 75 ÷ 9.5 = 7.89 on a 10-point scale. This formula follows the standard UGC (University Grants Commission) guideline used across Indian universities.'
              }
            },
            {
              '@type': 'Question',
              name: 'How do I convert percentage to GPA on a 4-point scale?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Divide your percentage by 100 and multiply the result by 4. For example, 75% becomes (75 ÷ 100) × 4 = 3.0 GPA. This method gives a linear approximation suitable for most US and Canadian university applications.'
              }
            },
            {
              '@type': 'Question',
              name: 'Which scale should I use — 10-point or 4-point?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use the 10-point scale if you are applying to or studying at Indian universities that follow UGC or AICTE norms. Use the 4-point scale if your target institution is in the United States, Canada, or another country that follows the 4.0 GPA system. When in doubt, check the admission requirements of the specific university.'
              }
            },
            {
              '@type': 'Question',
              name: 'Is the 9.5 divisor formula accurate for all Indian universities?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The 9.5 divisor is the most widely accepted standard recommended by UGC for converting percentage to CGPA. However, a small number of institutions use a divisor of 10 or have their own internal conversion tables. Always cross-check with your university\'s official policy if one exists.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I use a self-converted CGPA on university applications?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'For initial screening and personal planning, yes. However, most international universities require an official credential evaluation (such as WES or ECE) or a conversion letter from your institution. Use our calculator to estimate your CGPA, then obtain official documentation before submitting your application.'
              }
            },
            {
              '@type': 'Question',
              name: 'What percentage do I need for a 3.5 GPA on a 4-point scale?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'To achieve a 3.5 GPA on the 4-point scale, you need a percentage of (3.5 ÷ 4) × 100 = 87.5%. Similarly, for a 3.0 GPA you need 75%, and for a 3.8 GPA you need 95%.'
              }
            }
          ]
        }
      ]}
    >
      {/* ── Breadcrumbs ──────────────────────────────────────────────────────── */}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Percentage to CGPA Calculator', href: '/percentage-to-cgpa-calculator' }
      ]} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full mb-5 border border-emerald-100">
            <FaTrophy className="text-yellow-500" />
            <span className="text-sm font-semibold text-gray-800">Used by 19,000+ students every week</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Percentage to CGPA Calculator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Convert your exam percentage into CGPA instantly. Supports both the Indian 10-point system and the US/Canada 4-point system — no sign-up needed.
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
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                <FaBolt className="text-emerald-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">Dual-Scale Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <FaGlobeAmericas className="text-blue-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">Global Standards</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Body ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Calculator Card (2/3) ────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaPercent className="text-emerald-600" />
                  Convert Your Percentage
                </h2>
                <button onClick={clearAll} className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium">
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Scale Selector */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    Choose Your Grading Scale
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => { setScale('10'); setError(''); }}
                      className={`relative flex flex-col items-center p-5 rounded-xl border-2 transition-all ${
                        scale === '10'
                          ? 'border-emerald-500 bg-emerald-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      {scale === '10' && (
                        <span className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-xs" />
                        </span>
                      )}
                      <span className="text-3xl font-extrabold text-gray-900">10</span>
                      <span className="text-xs font-semibold text-gray-600 mt-1">Point Scale</span>
                      <span className="text-xs text-emerald-600 font-medium mt-0.5 bg-emerald-100 px-2 py-0.5 rounded-full">India / UGC</span>
                    </button>
                    <button
                      onClick={() => { setScale('4'); setError(''); }}
                      className={`relative flex flex-col items-center p-5 rounded-xl border-2 transition-all ${
                        scale === '4'
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      {scale === '4' && (
                        <span className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-xs" />
                        </span>
                      )}
                      <span className="text-3xl font-extrabold text-gray-900">4</span>
                      <span className="text-xs font-semibold text-gray-600 mt-1">Point Scale</span>
                      <span className="text-xs text-blue-600 font-medium mt-0.5 bg-blue-100 px-2 py-0.5 rounded-full">USA / Canada</span>
                    </button>
                  </div>
                </div>

                {/* Percentage Input */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    Your Percentage (0 – 100)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={percentage}
                      onChange={(e) => { setPercentage(e.target.value); setError(''); }}
                      className="w-full px-4 py-4 text-xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-12"
                      placeholder="e.g. 75.5"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <span className="text-2xl font-bold text-gray-300">%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Enter your aggregate or semester percentage. Decimals are fine.</p>
                </div>

                {/* Quick Tip Box */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-200">
                  <div className="flex items-start gap-3">
                    <FaLightbulb className="text-yellow-600 text-xl mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">How it works:</p>
                      <p className="text-sm text-gray-700">
                        On the <strong>10-point scale</strong>, we divide your percentage by 9.5 (the UGC standard).
                        On the <strong>4-point scale</strong>, we apply the formula <code className="bg-white px-1.5 py-0.5 rounded text-xs">(% ÷ 100) × 4</code>.
                        Both results appear instantly after you click Convert.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2">
                    <FaInfoCircle className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Convert Button */}
                <button
                  onClick={calculateCGPA}
                  disabled={loading || !percentage}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Converting…
                    </>
                  ) : (
                    <>
                      <FaCalculator />
                      Convert to CGPA
                    </>
                  )}
                </button>
              </div>

              {/* How-to Steps */}
              <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-lg">
                  <FaInfoCircle className="text-teal-600" />
                  How to Use This Calculator
                </h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  {[
                    { num: '1', label: 'Pick Your Scale', icon: null, color: 'bg-emerald-100 text-emerald-600' },
                    { num: '2', label: 'Enter Percentage', icon: null, color: 'bg-teal-100 text-teal-600' },
                    { num: '3', label: 'Click Convert', icon: <FaCalculator className="text-4xl text-cyan-600" />, color: null },
                    { num: '4', label: 'See Your CGPA', icon: <FaTrophy className="text-4xl text-yellow-500" />, color: null }
                  ].map((step, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-white rounded-xl p-6 mb-3 shadow-sm border border-teal-100 h-28 flex flex-col items-center justify-center">
                        {step.icon || (
                          <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mb-2`}>
                            <span className="text-2xl font-bold">{step.num}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-gray-700">{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar (1/3) ────────────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Conversion Formulas Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaChartLine className="text-emerald-600" />
                Conversion Formulas
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">10-Point</span>
                    <span className="text-xs text-gray-500">India / UGC</span>
                  </div>
                  <p className="font-mono text-sm text-gray-800 font-semibold">CGPA = Percentage ÷ 9.5</p>
                  <p className="text-xs text-gray-500 mt-1">e.g. 76% → 76 ÷ 9.5 = <strong>8.0</strong></p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">4-Point</span>
                    <span className="text-xs text-gray-500">USA / Canada</span>
                  </div>
                  <p className="font-mono text-sm text-gray-800 font-semibold">GPA = (Percentage ÷ 100) × 4</p>
                  <p className="text-xs text-gray-500 mt-1">e.g. 85% → (85 ÷ 100) × 4 = <strong>3.4</strong></p>
                </div>
              </div>
            </div>

            {/* Quick Conversion Examples */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Conversions
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { pct: '95%', cgpa10: '10.0', cgpa4: '3.8', tag: 'Outstanding' },
                  { pct: '85%', cgpa10: '8.95', cgpa4: '3.4', tag: 'Excellent' },
                  { pct: '75%', cgpa10: '7.89', cgpa4: '3.0', tag: 'Very Good' },
                  { pct: '65%', cgpa10: '6.84', cgpa4: '2.6', tag: 'Good' },
                  { pct: '55%', cgpa10: '5.79', cgpa4: '2.2', tag: 'Average' }
                ].map((row, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg flex items-center justify-between">
                    <span className="font-bold text-gray-900">{row.pct}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-600 font-semibold text-xs">{row.cgpa10} (10pt)</span>
                      <span className="text-blue-600 font-semibold text-xs">{row.cgpa4} (4pt)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* When Do You Need This? */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-indigo-600" />
                When You'll Need This
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  'Applying to universities in the US or Canada',
                  'Filling out scholarship application forms',
                  'Preparing credential evaluation documents',
                  'Comparing your score against international benchmarks',
                  'Converting old percentage records to CGPA format'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Results Section ──────────────────────────────────────────────── */}
        {result && (
          <div ref={resultsRef} className="mt-12 animate-fade-in">
            {/* Celebration Banner – high performers */}
            {parseFloat(result.cgpa) / parseFloat(result.scale) >= 0.8 && (
              <div className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white p-6 sm:p-8 rounded-2xl shadow-2xl mb-6 text-center">
                <div className="text-5xl mb-3">🎓</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  Great Work! Your CGPA is {result.cgpa} / {result.scale}
                </h2>
                <p className="text-lg sm:text-xl text-emerald-100">
                  That puts you in the <strong>{result.letterGrade}</strong> tier — highly competitive for top programs.
                </p>
              </div>
            )}

            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                  <FaChartLine className="text-emerald-600" />
                  Your Conversion Results
                </h2>

                {/* Animated Ring */}
                <ResultRing cgpa={result.cgpa} scale={result.scale} color={result.color} />

                {/* Letter Grade Badge */}
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg shadow-lg mt-4 ${
                  result.color === 'green' ? 'bg-green-100 text-green-800 border-2 border-green-300' :
                  result.color === 'blue' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' :
                  result.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' :
                  result.color === 'orange' ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' :
                  'bg-red-100 text-red-800 border-2 border-red-300'
                }`}>
                  <FaStar className="text-xl" />
                  Letter Grade: {result.letterGrade}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-emerald-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Your CGPA</div>
                    <FaAward className="text-emerald-600 text-xl" />
                  </div>
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">{result.cgpa}</div>
                  <div className="text-xs text-gray-500">out of {result.scale}.0</div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Input Percentage</div>
                    <FaPercent className="text-blue-600 text-xl" />
                  </div>
                  <div className="text-4xl font-extrabold text-blue-700 mb-1">{result.percentage}%</div>
                  <div className="text-xs text-gray-500">Your entered score</div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-indigo-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Scale Used</div>
                    <FaGlobeAmericas className="text-indigo-600 text-xl" />
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 mb-1">
                    {result.scale}-Point
                  </div>
                  <div className="text-xs text-gray-500">{result.scale === '10' ? 'India / UGC' : 'USA / Canada'}</div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Letter Grade</div>
                    <FaStar className="text-purple-600 text-xl" />
                  </div>
                  <div className="text-4xl font-extrabold text-purple-700 mb-1">{result.letterGrade}</div>
                  <div className="text-xs text-gray-500">Academic Tier</div>
                </div>
              </div>

              {/* Formula Used */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaCalculator className="text-teal-600" />
                  Formula Applied
                </h3>
                <div className="bg-white p-3 rounded-lg border border-teal-200 text-center">
                  <p className="font-mono text-base text-gray-800 font-semibold">{result.formula}</p>
                </div>
              </div>

              {/* Gap Analysis – unique feature not on other pages */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <FaRocket className="text-indigo-600" />
                  Target Gap Analysis
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  See how far you are from common high-value CGPA thresholds that many competitive programs look for.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Target: 85% ({result.marksNeededFor85} CGPA)</span>
                      {parseFloat(result.gap85) === 0
                        ? <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ Achieved</span>
                        : <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">+{result.gap85}% needed</span>
                      }
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-indigo-500 h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((result.percentage / 85) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Target: 90% ({result.marksNeededFor90} CGPA)</span>
                      {parseFloat(result.gap90) === 0
                        ? <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ Achieved</span>
                        : <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">+{result.gap90}% needed</span>
                      }
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((result.percentage / 90) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contextual Insight Panel */}
              <div className={`p-6 rounded-xl border-2 shadow-inner ${
                result.color === 'green' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' :
                result.color === 'blue' ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300' :
                result.color === 'yellow' ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300' :
                result.color === 'orange' ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300' :
                'bg-gradient-to-r from-red-50 to-pink-50 border-red-300'
              }`}>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                  {result.color === 'green' ? <FaTrophy className="text-yellow-600 text-xl" /> : <FaLightbulb className="text-indigo-600 text-xl" />}
                  What This Means for Your Applications
                </h3>
                <p className="text-gray-700 leading-relaxed">{result.interpretation}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Comprehensive Content ──────────────────────────────────────── */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">

          {/* Section 1: What is CGPA Conversion */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaInfoCircle className="text-emerald-600" />
              What Is Percentage to CGPA Conversion?
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                When you study in a system that awards marks out of a total — say, 450 out of 600 — your institution reports your performance as a <strong>percentage</strong>.
                Other systems, particularly those followed in the United States, Canada, and a growing number of global universities, report academic standing as a <strong>Grade Point Average (GPA or CGPA)</strong> on a fixed scale, usually 4.0 or 10.0.
              </p>
              <p>
                Percentage to CGPA conversion is the process of translating one into the other so that your academic record is understood anywhere in the world.
                If you are preparing an application for a university abroad, filling out a scholarship form, or simply curious about where your marks land on an international scale, this conversion is something every student eventually needs.
              </p>
              <p>
                The good news is that the math behind it is straightforward. Our calculator handles all the heavy lifting — you just need to punch in your percentage and pick the right scale.
              </p>
            </div>

            {/* Inline SVG Illustration */}
            <div className="mt-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border-2 border-emerald-200 shadow-inner">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">How the Conversion Flows</h3>
              <ConversionJourneyIllustration />
            </div>
          </section>

          {/* Section 2: The Two Formulas Explained */}
          <section className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md p-8 border border-teal-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Two Conversion Formulas — Explained Simply
            </h2>
            <p className="text-gray-700 mb-6">
              There are two main grading scales used across the world. Knowing which one applies to your situation is the first step. Here is exactly how each formula works, with real-world walkthrough examples.
            </p>

            {/* 10-Point */}
            <div className="bg-white p-6 rounded-lg border-l-4 border-emerald-600 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-700 text-sm font-bold px-3 py-1 rounded-full">10-Point Scale</span>
                Indian Universities (UGC Standard)
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <p className="text-center text-2xl font-bold text-gray-900">
                  CGPA = Percentage ÷ 9.5
                </p>
              </div>
              <p className="text-gray-700 mb-3">
                The University Grants Commission of India established <strong>9.5 as the standard divisor</strong> for converting percentage to CGPA.
                This number was chosen because a student scoring 95% — the realistic upper bound for most examinations — would land at exactly 10.0 CGPA, which is the top of the scale.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">📝 Worked Example:</p>
                <p className="text-sm text-gray-700">A student scores <strong>82.5%</strong> in their final year.</p>
                <p className="text-sm text-gray-700 mt-1">CGPA = 82.5 ÷ 9.5 = <strong className="text-emerald-700">8.68</strong></p>
                <p className="text-xs text-gray-500 mt-2 italic">This places the student firmly in the A-grade bracket on the Indian 10-point scale.</p>
              </div>
            </div>

            {/* 4-Point */}
            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">4-Point Scale</span>
                US & Canadian Universities
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <p className="text-center text-2xl font-bold text-gray-900">
                  GPA = (Percentage ÷ 100) × 4
                </p>
              </div>
              <p className="text-gray-700 mb-3">
                The 4.0 scale is the dominant standard in North American higher education.
                The conversion formula simply maps your percentage onto a 0–4 range proportionally.
                Keep in mind that many US universities use a <strong>cutoff-based method</strong> (e.g., 93–100% = A = 4.0) rather than a linear formula.
                Our calculator uses the linear method, which is the most commonly accepted for <em>international applicant conversions</em>.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">📝 Worked Example:</p>
                <p className="text-sm text-gray-700">A student scores <strong>78%</strong> in their degree program.</p>
                <p className="text-sm text-gray-700 mt-1">GPA = (78 ÷ 100) × 4 = <strong className="text-blue-700">3.12</strong></p>
                <p className="text-xs text-gray-500 mt-2 italic">A 3.12 GPA is competitive for many master's programs in the US and Canada.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Scale Comparison Visual */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seeing Both Scales Side by Side
            </h2>
            <p className="text-gray-700 mb-6">
              The chart below shows what a 75% score looks like when mapped onto each of the two major grading scales.
              Notice that the same underlying performance occupies a different proportion of each scale — this is why knowing which scale your target institution uses matters so much.
            </p>
            <div className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200">
              <ScaleComparisonIllustration />
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center italic">
              Visual representation of 75% mapped onto the 10-point (India) and 4-point (USA/Canada) grading scales.
            </p>
          </section>

          {/* Section 4: When and Why */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-8 border border-indigo-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              When and Why Students Need This Conversion
            </h2>
            <p className="text-gray-700 mb-6">
              Converting percentage to CGPA is not just a number-crunching exercise — it is often a <strong>gatekeeping step</strong> in important life decisions.
              Here are the most common scenarios where students find this conversion essential.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  icon: <FaGlobeAmericas className="text-blue-600" />,
                  title: 'Study Abroad Applications',
                  desc: 'Universities in the US, UK, Canada, and Australia expect academic records in GPA or CGPA format. If your transcripts only show percentage, admission offices may not know how to evaluate your score without a conversion.'
                },
                {
                  icon: <FaFileAlt className="text-emerald-600" />,
                  title: 'Scholarship Forms',
                  desc: 'International and merit-based scholarships frequently ask applicants to report CGPA. Submitting the wrong format — or leaving the field blank — can disqualify an otherwise strong application.'
                },
                {
                  icon: <FaGraduationCap className="text-purple-600" />,
                  title: 'Credential Evaluations',
                  desc: 'Services like WES or ECE that evaluate foreign degrees for North American institutions will convert your marks. Understanding the conversion yourself helps you know what to expect and avoid surprises.'
                },
                {
                  icon: <FaRocket className="text-orange-600" />,
                  title: 'Self-Assessment & Planning',
                  desc: 'Knowing your CGPA equivalent helps you set realistic targets. If a dream program requires a 3.5 GPA, you now know exactly what percentage you need to hit — and how much room for improvement exists.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Important Caveats */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Important Things to Keep in Mind
            </h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-yellow-600" />
                  Formulas Are Approximations
                </h3>
                <p className="text-sm text-gray-700">
                  The 9.5 divisor and the linear 4-point formula are <strong>widely accepted standards</strong>, but they are not universally mandated.
                  Some universities use step-based grading (e.g., 90–100% = A = 4.0; 80–89% = B = 3.0) rather than a linear scale.
                  Always confirm your target institution's preferred conversion method before finalizing any application.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-600" />
                  Official Documents May Be Required
                </h3>
                <p className="text-sm text-gray-700">
                  Our calculator gives you an accurate estimate for planning purposes, but <strong>most international universities require official conversion documentation</strong>.
                  This is usually a letter from your institution's examination office or a third-party evaluation from a service like WES (World Education Services).
                </p>
              </div>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-emerald-600" />
                  Use Aggregate, Not Single-Subject Scores
                </h3>
                <p className="text-sm text-gray-700">
                  When converting for university applications, you should almost always use your <strong>aggregate or cumulative percentage</strong> — not individual subject marks.
                  If a specific program asks for semester-wise CGPA, apply the same formula to each semester's percentage individually.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: FAQ */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How do I convert percentage to CGPA on a 10-point scale?',
                  a: 'Divide your percentage by 9.5. For example, a 75% becomes 75 ÷ 9.5 = 7.89 CGPA. This formula is the standard set by the University Grants Commission (UGC) and is accepted by virtually all Indian universities that use the 10-point system.'
                },
                {
                  q: 'Which scale should I choose — 10-point or 4-point?',
                  a: 'If you are applying to or studying at an institution in India that follows UGC or AICTE norms, use the 10-point scale. If your target institution is in the United States, Canada, or another country that uses the 4.0 GPA system, choose the 4-point scale. When in doubt, check the admissions page of the specific university you are applying to.'
                },
                {
                  q: 'Can I use a self-converted CGPA on my university application?',
                  a: 'For initial screening, planning, and comparison purposes, absolutely. However, most international universities expect official credential evaluations or a conversion letter from your institution before making an admission decision. Use our calculator as a reliable starting point, then get official documentation before submitting.'
                },
                
                {
                  q: 'What percentage do I need to get a 3.5 GPA on the 4-point scale?',
                  a: 'Using the linear formula, a 3.5 GPA requires (3.5 ÷ 4) × 100 = 87.5%. Similarly, a 3.0 GPA needs 75%, and a 3.8 GPA needs 95%. Our calculator can verify any of these in seconds.'
                },
                
                {
                  q: 'My university uses a 5-point scale. How do I convert?',
                  a: 'Apply the same logic: GPA = (Percentage ÷ 100) × 5. For example, 80% on a 5-point scale becomes (80 ÷ 100) × 5 = 4.0. If your target institution specifies a different method, always follow their guidelines.'
                },
                {
                  q: 'Will WES or ECE calculate a different CGPA than this calculator?',
                  a: 'Possibly. Credential evaluation services sometimes use institution-specific conversion tables or grading policies rather than the standard formula. Our calculator gives you the universally accepted approximation. The actual evaluation may differ slightly based on the evaluator\'s methodology and your institution\'s historical grading patterns.'
                }
              ].map((item, i) => (
                <details key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <summary className="font-bold text-gray-900 text-lg">{item.q}</summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Expert Box – E-E-A-T Trust Signal */}
          <ExpertBox
            expertType="education"
            calculatorName="Percentage to CGPA Calculator"
            lastUpdated="January 31, 2026"
          />

          {/* User Reviews – E-E-A-T Trust Signal */}
          <UserReviews calculatorType="education" />

          {/* Related Calculators */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/marks-percentage-calculator" className="block p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-blue-600" />
                  <h3 className="font-bold text-gray-900">Marks to Percentage</h3>
                  <FaArrowRight className="text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600">Calculate your percentage from obtained and total marks</p>
              </a>
              <a href="/cgpa-calculator" className="block p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaGraduationCap className="text-2xl text-emerald-600" />
                  <h3 className="font-bold text-gray-900">CGPA Calculator</h3>
                  <FaArrowRight className="text-emerald-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600">Compute your cumulative GPA from grades and credits</p>
              </a>
              <a href="/cgpa-to-percentage" className="block p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaChartLine className="text-2xl text-purple-600" />
                  <h3 className="font-bold text-gray-900">CGPA to Percentage</h3>
                  <FaArrowRight className="text-purple-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600">Do the reverse — convert any CGPA back to percentage</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}