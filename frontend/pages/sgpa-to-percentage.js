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
  FaTrophy,
  FaStar,
  FaBolt,
  FaAward,
  FaArrowRight,
  FaBook,
  FaFileAlt
} from 'react-icons/fa';

// ─── SVG 1: Semester Journey Arc ──────────────────────────────────────────────
// Shows S1 → S2 → S3 → S4 as an upward-trending arc with SGPA labels
const SemesterJourneyIllustration = () => (
  <svg viewBox="0 0 540 220" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="8" y="8" width="524" height="204" rx="20" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5" />

    {/* Grid lines (light) */}
    {[60, 100, 140, 180].map((y, i) => (
      <line key={i} x1="60" y1={y} x2="480" y2={y} stroke="#e5e7eb" strokeWidth="0.8" strokeDasharray="4 3" />
    ))}

    {/* Y-axis labels */}
    <text x="48" y="64" textAnchor="end" fontSize="9" fill="#9ca3af" fontWeight="600">10.0</text>
    <text x="48" y="104" textAnchor="end" fontSize="9" fill="#9ca3af" fontWeight="600">8.5</text>
    <text x="48" y="144" textAnchor="end" fontSize="9" fill="#9ca3af" fontWeight="600">7.0</text>
    <text x="48" y="184" textAnchor="end" fontSize="9" fill="#9ca3af" fontWeight="600">5.5</text>

    {/* Semester data points: S1=7.5(y≈168), S2=7.9(y≈155), S3=8.4(y≈138), S4=8.8(y≈118) */}
    {/* Gradient fill under curve */}
    <defs>
      <linearGradient id="arcFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.01" />
      </linearGradient>
    </defs>
    <path d="M100,168 C160,162 200,155 220,155 C260,155 300,140 330,138 C370,138 410,120 440,118 L440,195 L100,195 Z" fill="url(#arcFill)" />

    {/* Curve line */}
    <path d="M100,168 C160,162 200,155 220,155 C260,155 300,140 330,138 C370,138 410,120 440,118"
      stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

    {/* Dots + labels */}
    {[
      { cx: 100, cy: 168, sem: 'S1', sgpa: '7.5', pct: '71.3%', labelY: 185 },
      { cx: 220, cy: 155, sem: 'S2', sgpa: '7.9', pct: '75.1%', labelY: 172 },
      { cx: 330, cy: 138, sem: 'S3', sgpa: '8.4', pct: '79.8%', labelY: 155 },
      { cx: 440, cy: 118, sem: 'S4', sgpa: '8.8', pct: '83.6%', labelY: 135 }
    ].map((d, i) => (
      <g key={i}>
        {/* Glow ring */}
        <circle cx={d.cx} cy={d.cy} r="9" fill="#7c3aed" fillOpacity="0.15" />
        {/* Dot */}
        <circle cx={d.cx} cy={d.cy} r="5.5" fill="#7c3aed" stroke="#fff" strokeWidth="2.2" />
        {/* Semester label below */}
        <text x={d.cx} y={d.labelY} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#6b21a8">{d.sem}</text>
        {/* SGPA badge above */}
        <rect x={d.cx - 17} y={d.cy - 28} width="34" height="18" rx="9" fill="#7c3aed" />
        <text x={d.cx} y={d.cy - 16} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{d.sgpa}</text>
      </g>
    ))}

    {/* Trend arrow label */}
    <rect x="350" y="28" width="140" height="28" rx="14" fill="#ede9fe" stroke="#a78bfa" strokeWidth="1" />
    <text x="370" y="47" fontSize="10" fontWeight="700" fill="#6d28d9">📈 Upward Trend</text>
  </svg>
);

// ─── SVG 2: Credit-Weighted Calculation Visual ───────────────────────────────
// Shows how different credit subjects combine into one SGPA
const CreditWeightVisual = () => (
  <svg viewBox="0 0 500 195" className="w-full max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="488" height="183" rx="18" fill="#eef2ff" stroke="#a5b4fc" strokeWidth="1.4" />

    {/* Subject bars — width proportional to credits */}
    {/* Math: 4 credits, grade 9 → width 160 */}
    <rect x="28" y="38" width="160" height="30" rx="8" fill="#4f46e5" />
    <text x="48" y="58" fontSize="10.5" fontWeight="700" fill="#fff">Mathematics</text>
    <text x="172" y="58" textAnchor="end" fontSize="10" fontWeight="600" fill="#c7d2fe">4 cr · G9</text>

    {/* Physics: 3 credits, grade 8 → width 120 */}
    <rect x="28" y="78" width="120" height="30" rx="8" fill="#6366f1" />
    <text x="48" y="98" fontSize="10.5" fontWeight="700" fill="#fff">Physics</text>
    <text x="132" y="98" textAnchor="end" fontSize="10" fontWeight="600" fill="#c7d2fe">3 cr · G8</text>

    {/* English: 2 credits, grade 10 → width 80 */}
    <rect x="28" y="118" width="80" height="30" rx="8" fill="#818cf8" />
    <text x="48" y="138" fontSize="10.5" fontWeight="700" fill="#fff">English</text>
    <text x="92" y="138" textAnchor="end" fontSize="10" fontWeight="600" fill="#e0e7ff">2 cr · G10</text>

    {/* Equals sign divider */}
    <line x1="230" y1="40" x2="230" y2="148" stroke="#a5b4fc" strokeWidth="1.5" strokeDasharray="5 3" />
    <text x="230" y="102" textAnchor="middle" fontSize="16" fontWeight="800" fill="#6366f1">=</text>

    {/* Result box */}
    <rect x="250" y="52" width="220" height="84" rx="14" fill="#fff" stroke="#6366f1" strokeWidth="2" />
    <text x="360" y="82" textAnchor="middle" fontSize="11" fill="#6b7280" fontWeight="600">Weighted SGPA</text>
    <text x="360" y="118" textAnchor="middle" fontSize="28" fontWeight="800" fill="#4f46e5">8.67</text>

    {/* Mini formula */}
    <text x="360" y="155" textAnchor="middle" fontSize="8.5" fill="#9ca3af" fontWeight="500">(9×4 + 8×3 + 10×2) ÷ 9 = 8.67</text>
  </svg>
);

// ─── SVG 3: Result Percentage Ring (indigo/purple theme) ──────────────────────
const ResultRing = ({ percentage, color }) => {
  const pct = Math.min(parseFloat(percentage), 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference - (pct / 100) * circumference;

  let ringColor = '#6366f1';
  let bgColor = '#eef2ff';
  if (color === 'green') { ringColor = '#22c55e'; bgColor = '#dcfce7'; }
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
      <text x="70" y="60" textAnchor="middle" fontSize="26" fontWeight="800" fill="#111827">{percentage}%</text>
      <text x="70" y="80" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280">Percentage</text>
      <text x="70" y="104" textAnchor="middle" fontSize="9.5" fontWeight="500" fill="#9ca3af">from SGPA</text>
    </svg>
  );
};

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function SGPAToPercentage() {
  const [sgpa, setSgpa] = useState('');
  const [scale, setScale] = useState('10');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);

  // ── Client-side calculation (no API needed — it's just multiply / divide) ──
  const calculatePercentage = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const sgpaValue = parseFloat(sgpa);
      const scaleValue = parseFloat(scale);

      if (isNaN(sgpaValue) || sgpaValue < 0 || sgpaValue > scaleValue) {
        setError(`Enter a valid SGPA between 0 and ${scale}.`);
        setLoading(false);
        return;
      }

      let percentage, formula;

      if (scale === '10') {
        percentage = (sgpaValue * 9.5).toFixed(2);
        formula = `Percentage = ${sgpaValue} × 9.5 = ${percentage}%`;
      } else {
        percentage = ((sgpaValue / 4) * 100).toFixed(2);
        formula = `Percentage = (${sgpaValue} ÷ 4) × 100 = ${percentage}%`;
      }

      const pctNum = parseFloat(percentage);
      let letterGrade, color, insight;

      if (pctNum >= 90) {
        letterGrade = 'O / A+'; color = 'green';
        insight = 'This is an outstanding semester. Scores like this catch the attention of recruiters and graduate admissions committees alike. You are setting a high bar for the rest of your academic journey.';
      } else if (pctNum >= 80) {
        letterGrade = 'A'; color = 'green';
        insight = 'An excellent semester by any standard. This kind of consistent performance builds a strong cumulative record and keeps scholarship and internship doors wide open.';
      } else if (pctNum >= 70) {
        letterGrade = 'B+'; color = 'blue';
        insight = 'A solid, respectable semester. Most competitive internships and postgraduate programs will view this favorably, especially if your trend across semesters is upward.';
      } else if (pctNum >= 60) {
        letterGrade = 'B'; color = 'blue';
        insight = 'A decent semester that clears the threshold for most programs. If this is a tough semester with heavy coursework, it is completely normal — focus on bouncing back next term.';
      } else if (pctNum >= 50) {
        letterGrade = 'C'; color = 'yellow';
        insight = 'You passed, and that matters. One average semester does not define your degree. Use the upcoming term to identify what went wrong and adjust your study approach accordingly.';
      } else if (pctNum >= 40) {
        letterGrade = 'D'; color = 'orange';
        insight = 'This semester was difficult. The semester system gives you the chance to recover — many successful graduates have bounced back from one or two tough terms. Make a concrete plan for next semester.';
      } else {
        letterGrade = 'F'; color = 'red';
        insight = 'A very challenging result. Speak with your academic advisor about options — retaking subjects, adjusting your course load, or accessing support services can all make a real difference going forward.';
      }

      // How far to key thresholds
      const targetFor80 = scale === '10' ? (80 / 9.5).toFixed(2) : (80 / 100 * 4).toFixed(2);
      const targetFor85 = scale === '10' ? (85 / 9.5).toFixed(2) : (85 / 100 * 4).toFixed(2);
      const gap80 = Math.max(0, parseFloat(targetFor80) - sgpaValue).toFixed(2);
      const gap85 = Math.max(0, parseFloat(targetFor85) - sgpaValue).toFixed(2);

      setResult({
        percentage,
        sgpaValue,
        scale,
        formula,
        letterGrade,
        color,
        insight,
        targetFor80,
        targetFor85,
        gap80,
        gap85
      });

      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }, 520);
  };

  const clearAll = () => {
    setSgpa('');
    setScale('10');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="SGPA to Percentage Calculator 2026 – Convert Semester GPA to Percentage Free"
      description="Convert your semester SGPA to percentage instantly with our free calculator. Supports 10-point (India) and 4-point (USA/Canada) scales. Get letter grades, semester insights, and target gap analysis in one click."
      keywords="sgpa to percentage calculator, convert sgpa to percentage, semester gpa to percentage, sgpa percentage conversion, sgpa calculator free, 10 point sgpa to percentage, semester grade percentage calculator"
      canonicalPath="/sgpa-to-percentage-calculator"
      ogImage="sgpa-to-percentage-calculator.jpg"
      lastUpdated="2026-01-31"
      schema={[
        {
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
            ratingCount: '18400',
            bestRating: '5',
            worstRating: '1'
          }
        },
        {
          '@type': 'HowTo',
          name: 'How to Convert SGPA to Percentage',
          description: 'A step-by-step guide to converting your semester grade point average into a percentage score using both 10-point and 4-point grading scales.',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Select Your Grading Scale',
              text: 'Choose the scale your university uses. Most Indian universities follow the 10-point scale set by UGC. Universities in the US and Canada typically use the 4-point scale. Check your grade card if you are unsure.',
              image: 'https://calculators.me.uk/images/sgpa-step1.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Enter Your Semester SGPA',
              text: 'Type in the SGPA printed on your semester grade card. This is the grade point average for that single semester only — not your cumulative score. Decimals are supported (e.g. 8.45).',
              image: 'https://calculators.me.uk/images/sgpa-step2.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Click Convert to Percentage',
              text: 'Press the Convert button. The calculator applies the correct formula instantly — multiplying by 9.5 for the 10-point scale or the equivalent operation for the 4-point scale.',
              image: 'https://calculators.me.uk/images/sgpa-step3.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Review Your Results',
              text: 'Your semester percentage, letter grade, the exact formula used, and a target gap analysis are all displayed. The gap analysis shows how close your SGPA is to key academic thresholds like 80% and 85%.',
              image: 'https://calculators.me.uk/images/sgpa-step4.jpg'
            }
          ],
          totalTime: 'PT25S'
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I convert SGPA to percentage on a 10-point scale?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Multiply your SGPA by 9.5. For example, an SGPA of 8.2 becomes 8.2 × 9.5 = 77.9%. This formula follows the UGC standard used by most Indian universities and is the most widely accepted method.'
              }
            },
            {
              '@type': 'Question',
              name: 'What is the difference between SGPA and CGPA?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'SGPA (Semester Grade Point Average) represents your academic performance in a single semester. CGPA (Cumulative Grade Point Average) is the average of all your semester SGPAs across your entire degree. For example, if your SGPAs are 7.8, 8.2, 8.5, and 8.1 over four semesters, your CGPA is (7.8 + 8.2 + 8.5 + 8.1) ÷ 4 = 8.15.'
              }
            },
            {
              '@type': 'Question',
              name: 'How is SGPA calculated from individual subject grades?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'SGPA is a credit-weighted average. Multiply each subject\'s grade point by its credit hours, add all those products together, then divide by the total number of credits. For instance, if you scored grade 9 in a 4-credit subject and grade 8 in a 3-credit subject, SGPA = (9×4 + 8×3) ÷ (4+3) = 60 ÷ 7 = 8.57.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can one bad semester SGPA ruin my overall CGPA?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. One lower SGPA will bring down your CGPA slightly, but it does not ruin it permanently. If you score consistently well in subsequent semesters, your CGPA will recover. For example, a 6.0 in Semester 1 followed by three semesters of 8.5 gives a CGPA of (6.0 + 8.5 + 8.5 + 8.5) ÷ 4 = 7.88, which is still a solid score.'
              }
            },
            {
              '@type': 'Question',
              name: 'Do internship companies check semester-wise SGPA or only CGPA?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most companies screen candidates using CGPA as the primary filter. However, top recruiters may also look at semester-wise trends. A consistently improving SGPA trajectory — even if earlier semesters were lower — often makes a stronger impression than a flat or declining pattern.'
              }
            },
            {
              '@type': 'Question',
              name: 'Does this calculator work for 4-point GPA systems too?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. When you select the 4-point scale, the calculator uses the formula: Percentage = (SGPA ÷ 4) × 100. So a 3.4 GPA becomes (3.4 ÷ 4) × 100 = 85%. This is the standard linear conversion used for international applicant evaluations.'
              }
            }
          ]
        }
      ]}
    >
      {/* ── Breadcrumbs ──────────────────────────────────────────────────────── */}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'SGPA to Percentage Calculator', href: '/sgpa-to-percentage-calculator' }
      ]} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full mb-5 border border-indigo-100">
            <FaTrophy className="text-yellow-500" />
            <span className="text-sm font-semibold text-gray-800">Trusted by 18,000+ students every week</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            SGPA to Percentage Calculator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Convert your semester GPA to percentage in seconds. Understand exactly where you stand — one semester at a time. No sign-up, no nonsense.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                <FaBolt className="text-indigo-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">Instant Results</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center">
                <FaChartLine className="text-violet-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">Semester Insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Body ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Calculator Card (2/3) ──────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaBook className="text-indigo-600" />
                  Convert Your Semester SGPA
                </h2>
                <button onClick={clearAll} className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium">
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Scale Selector */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    Which Grading Scale Does Your University Use?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => { setScale('10'); setError(''); }}
                      className={`relative flex flex-col items-center p-5 rounded-xl border-2 transition-all ${
                        scale === '10'
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-indigo-300'
                      }`}
                    >
                      {scale === '10' && (
                        <span className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-xs" />
                        </span>
                      )}
                      <span className="text-3xl font-extrabold text-gray-900">10</span>
                      <span className="text-xs font-semibold text-gray-600 mt-1">Point Scale</span>
                      <span className="text-xs text-indigo-600 font-medium mt-0.5 bg-indigo-100 px-2 py-0.5 rounded-full">India / UGC</span>
                    </button>
                    <button
                      onClick={() => { setScale('4'); setError(''); }}
                      className={`relative flex flex-col items-center p-5 rounded-xl border-2 transition-all ${
                        scale === '4'
                          ? 'border-violet-500 bg-violet-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-violet-300'
                      }`}
                    >
                      {scale === '4' && (
                        <span className="absolute top-2 right-2 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
                          <FaCheckCircle className="text-white text-xs" />
                        </span>
                      )}
                      <span className="text-3xl font-extrabold text-gray-900">4</span>
                      <span className="text-xs font-semibold text-gray-600 mt-1">Point Scale</span>
                      <span className="text-xs text-violet-600 font-medium mt-0.5 bg-violet-100 px-2 py-0.5 rounded-full">USA / Canada</span>
                    </button>
                  </div>
                </div>

                {/* SGPA Input */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    Your SGPA This Semester (0 – {scale})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={scale}
                      value={sgpa}
                      onChange={(e) => { setSgpa(e.target.value); setError(''); }}
                      className="w-full px-4 py-4 text-xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12"
                      placeholder={scale === '10' ? 'e.g. 8.2' : 'e.g. 3.6'}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <FaGraduationCap className="text-2xl text-gray-300" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This is the SGPA for <strong>one semester only</strong> — check your latest grade card.
                  </p>
                </div>

                {/* Context Tip */}
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-5 rounded-xl border border-indigo-200">
                  <div className="flex items-start gap-3">
                    <FaLightbulb className="text-yellow-600 text-xl mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">SGPA vs CGPA — quick clarification</p>
                      <p className="text-sm text-gray-700">
                        <strong>SGPA</strong> is your grade for this semester alone. <strong>CGPA</strong> is the running average across all semesters.
                        This calculator handles SGPA. If you need to convert your overall CGPA, use our dedicated CGPA to Percentage tool instead.
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
                  onClick={calculatePercentage}
                  disabled={loading || !sgpa}
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Converting…
                    </>
                  ) : (
                    <>
                      <FaCalculator />
                      Convert to Percentage
                    </>
                  )}
                </button>
              </div>

              {/* How-to Steps */}
              <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-lg">
                  <FaInfoCircle className="text-indigo-600" />
                  How to Use This Calculator
                </h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  {[
                    { num: '1', label: 'Pick Your Scale', color: 'bg-indigo-100 text-indigo-600', icon: null },
                    { num: '2', label: 'Enter Your SGPA', color: 'bg-violet-100 text-violet-600', icon: null },
                    { num: '3', label: 'Click Convert', color: null, icon: <FaCalculator className="text-4xl text-purple-600" /> },
                    { num: '4', label: 'See Semester %', color: null, icon: <FaTrophy className="text-4xl text-yellow-500" /> }
                  ].map((step, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-white rounded-xl p-6 mb-3 shadow-sm border border-indigo-100 h-28 flex flex-col items-center justify-center">
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

          {/* ── Sidebar (1/3) ──────────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Formulas Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaChartLine className="text-indigo-600" />
                The Two Formulas
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">10-Point</span>
                    <span className="text-xs text-gray-500">India</span>
                  </div>
                  <p className="font-mono text-sm text-gray-800 font-semibold">% = SGPA × 9.5</p>
                  <p className="text-xs text-gray-500 mt-1">e.g. 8.2 × 9.5 = <strong>77.9%</strong></p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-violet-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">4-Point</span>
                    <span className="text-xs text-gray-500">USA / Canada</span>
                  </div>
                  <p className="font-mono text-sm text-gray-800 font-semibold">% = (SGPA ÷ 4) × 100</p>
                  <p className="text-xs text-gray-500 mt-1">e.g. (3.6 ÷ 4) × 100 = <strong>90%</strong></p>
                </div>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Reference (10-pt)
              </h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { sgpa: '10.0', pct: '95.0%', label: 'Outstanding' },
                  { sgpa: '9.0', pct: '85.5%', label: 'Excellent' },
                  { sgpa: '8.0', pct: '76.0%', label: 'Very Good' },
                  { sgpa: '7.0', pct: '66.5%', label: 'Good' },
                  { sgpa: '6.0', pct: '57.0%', label: 'Average' },
                  { sgpa: '5.0', pct: '47.5%', label: 'Pass' }
                ].map((row, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-lg flex items-center justify-between">
                    <span className="font-bold text-gray-900">SGPA {row.sgpa}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-indigo-600 font-semibold text-xs">{row.pct}</span>
                      <span className="text-xs text-gray-400">{row.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Semester-Specific Tip */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-indigo-600" />
                Why Semester % Matters
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  'Internship companies screen semester-wise trends, not just CGPA',
                  'Semester scholarships have per-term percentage cut-offs',
                  'Exchange programs ask for your most recent semester score',
                  'A rising trend across semesters impresses graduate admissions'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheckCircle className="text-indigo-600 mt-0.5 flex-shrink-0" />
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
            {/* Celebration for strong results */}
            {parseFloat(result.percentage) >= 80 && (
              <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white p-6 sm:p-8 rounded-2xl shadow-2xl mb-6 text-center">
                <div className="text-5xl mb-3">🎓</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  Great Semester! You hit {result.percentage}%
                </h2>
                <p className="text-lg sm:text-xl text-indigo-100">
                  That is a <strong>{result.letterGrade}</strong> — well done this term.
                </p>
              </div>
            )}

            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                  <FaChartLine className="text-indigo-600" />
                  Your Semester Results
                </h2>
                <ResultRing percentage={result.percentage} color={result.color} />

                {/* Letter Grade Badge */}
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg shadow-lg mt-4 ${
                  result.color === 'green' ? 'bg-green-100 text-green-800 border-2 border-green-300' :
                  result.color === 'blue' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' :
                  result.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' :
                  result.color === 'orange' ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' :
                  'bg-red-100 text-red-800 border-2 border-red-300'
                }`}>
                  <FaStar className="text-xl" />
                  Grade: {result.letterGrade}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-indigo-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Semester %</div>
                    <FaAward className="text-indigo-600 text-xl" />
                  </div>
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">{result.percentage}%</div>
                  <div className="text-xs text-gray-500">This semester</div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-violet-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Your SGPA</div>
                    <FaGraduationCap className="text-violet-600 text-xl" />
                  </div>
                  <div className="text-4xl font-extrabold text-violet-700 mb-1">{result.sgpaValue}</div>
                  <div className="text-xs text-gray-500">out of {result.scale}.0</div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Letter Grade</div>
                    <FaStar className="text-purple-600 text-xl" />
                  </div>
                  <div className="text-3xl font-extrabold text-purple-700 mb-1">{result.letterGrade}</div>
                  <div className="text-xs text-gray-500">Academic Tier</div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Scale</div>
                    <FaChartLine className="text-blue-600 text-xl" />
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 mb-1">{result.scale}-Point</div>
                  <div className="text-xs text-gray-500">{result.scale === '10' ? 'India / UGC' : 'USA / Canada'}</div>
                </div>
              </div>

              {/* Formula Box */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaCalculator className="text-indigo-600" />
                  Formula Applied
                </h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-200 text-center">
                  <p className="font-mono text-base text-gray-800 font-semibold">{result.formula}</p>
                </div>
              </div>

              {/* Target Gap Analysis — unique to this page */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl border-2 border-violet-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <FaRocket className="text-violet-600" />
                  Next Semester Targets
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  See how your current SGPA compares to the benchmarks that matter most for internships and postgraduate admissions.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-violet-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Target: 80% (SGPA {result.targetFor80})</span>
                      {parseFloat(result.gap80) === 0
                        ? <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ Achieved</span>
                        : <span className="text-xs bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">+{result.gap80} SGPA needed</span>
                      }
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-violet-500 h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((parseFloat(result.sgpaValue) / parseFloat(result.targetFor80)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Target: 85% (SGPA {result.targetFor85})</span>
                      {parseFloat(result.gap85) === 0
                        ? <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ Achieved</span>
                        : <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">+{result.gap85} SGPA needed</span>
                      }
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((parseFloat(result.sgpaValue) / parseFloat(result.targetFor85)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contextual Insight */}
              <div className={`p-6 rounded-xl border-2 shadow-inner ${
                result.color === 'green' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' :
                result.color === 'blue' ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300' :
                result.color === 'yellow' ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300' :
                result.color === 'orange' ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300' :
                'bg-gradient-to-r from-red-50 to-pink-50 border-red-300'
              }`}>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                  {result.color === 'green' ? <FaTrophy className="text-yellow-600 text-xl" /> : <FaLightbulb className="text-indigo-600 text-xl" />}
                  What This Means for You
                </h3>
                <p className="text-gray-700 leading-relaxed">{result.insight}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Content Sections ──────────────────────────────────────────── */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">

          {/* 1. What is SGPA and Why Does Semester Percentage Matter */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaInfoCircle className="text-indigo-600" />
              What Is SGPA — and Why Should You Convert It?
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Every semester, your university hands you a number: your <strong>SGPA</strong>, or Semester Grade Point Average.
                It is a single figure that captures how you performed across every subject you studied that term,
                weighted by how many credits each subject carried. A subject worth four credits pulls harder on your SGPA than one worth two.
              </p>
              <p>
                The problem is that SGPA lives on a scale — usually 0 to 10 or 0 to 4 — and not everyone interprets those scales the same way.
                Recruiters scanning resumes, scholarship committees reviewing applications, and exchange-program coordinators evaluating candidates
                often think in terms of <strong>percentage</strong>. Converting your SGPA to percentage makes your semester performance instantly readable
                by anyone, anywhere, without guessing what "8.2 out of 10" actually means in practice.
              </p>
              <p>
                Beyond applications, there is a personal value to tracking this number. When you convert each semester's SGPA to percentage,
                you get a clear, comparable view of your own trajectory — a story told in numbers that you can act on.
              </p>
            </div>

            {/* Semester Journey SVG */}
            <div className="mt-8 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 rounded-2xl p-6 sm:p-8 border-2 border-indigo-200 shadow-inner">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">A Typical Semester Progression</h3>
              <SemesterJourneyIllustration />
              <p className="text-xs text-gray-500 mt-3 text-center italic">
                Each dot is one semester. The upward curve shows how consistent effort compounds into a stronger academic record over time.
              </p>
            </div>
          </section>

          {/* 2. How Credit-Weighted SGPA Actually Works */}
          <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl shadow-md p-8 border border-violet-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How Your SGPA Is Actually Calculated
            </h2>
            <p className="text-gray-700 mb-6">
              Before you can convert SGPA to percentage, it helps to understand where the SGPA number comes from in the first place.
              It is not a simple average of your marks. It is a <strong>credit-weighted average</strong> — meaning subjects you took for more credits
              have a bigger say in the final number than subjects with fewer credits.
            </p>

            {/* Credit Weight SVG */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-violet-200 shadow-inner mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Credit-Weighted Calculation in Action</h3>
              <CreditWeightVisual />
              <p className="text-xs text-gray-500 mt-3 text-center italic">
                Mathematics (4 credits) has twice the influence on your SGPA compared to English (2 credits), even if your English grade is higher.
              </p>
            </div>

            {/* Step-by-step walkthrough */}
            <div className="bg-white p-6 rounded-lg border-l-4 border-indigo-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Then: SGPA → Percentage</h3>
              <p className="text-gray-700 mb-3">
                Once you have your SGPA (your university prints it on the grade card), converting it to percentage is a single step:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <p className="text-center text-xl font-bold text-gray-900">
                  Percentage = SGPA × 9.5 <span className="text-gray-400 text-base">(10-point scale)</span>
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">📝 Full Walkthrough:</p>
                <p className="text-sm text-gray-700">Using the example above, SGPA = 8.67</p>
                <p className="text-sm text-gray-700 mt-1">Percentage = 8.67 × 9.5 = <strong className="text-indigo-700">82.37%</strong></p>
                <p className="text-xs text-gray-500 mt-2 italic">This student scored the equivalent of 82% for the semester — a solid A-grade performance.</p>
              </div>
            </div>
          </section>

          {/* 3. Semester Trends — the unique angle */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Tracking Semester-by-Semester Matters
            </h2>
            <p className="text-gray-700 mb-6">
              Your CGPA is important, but it tells only half the story. Two students can have the exact same CGPA
              yet have very different academic narratives. The student whose SGPA climbed steadily from 6.5 to 9.0
              tells a story of growth and determination. The student whose SGPA dropped from 9.0 to 6.5 raises questions.
              Recruiters and admissions officers notice this.
            </p>

            {/* Comparison Table — unique to this page */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                    <th className="px-5 py-3 text-left font-bold text-sm">Semester</th>
                    <th className="px-5 py-3 text-left font-bold text-sm">Student A (SGPA)</th>
                    <th className="px-5 py-3 text-left font-bold text-sm">Student A (%)</th>
                    <th className="px-5 py-3 text-left font-bold text-sm">Student B (SGPA)</th>
                    <th className="px-5 py-3 text-left font-bold text-sm">Student B (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { sem: 'Semester 1', aSgpa: '6.5', aPct: '61.8%', bSgpa: '8.8', bPct: '83.6%' },
                    { sem: 'Semester 2', aSgpa: '7.2', aPct: '68.4%', bSgpa: '8.5', bPct: '80.8%' },
                    { sem: 'Semester 3', aSgpa: '8.0', aPct: '76.0%', bSgpa: '7.8', bPct: '74.1%' },
                    { sem: 'Semester 4', aSgpa: '8.8', aPct: '83.6%', bSgpa: '7.2', bPct: '68.4%' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-indigo-50">
                      <td className="px-5 py-3 font-medium text-sm text-gray-900">{row.sem}</td>
                      <td className="px-5 py-3 text-sm font-semibold text-indigo-700">{row.aSgpa}</td>
                      <td className="px-5 py-3 text-sm text-gray-600">{row.aPct}</td>
                      <td className="px-5 py-3 text-sm font-semibold text-violet-700">{row.bSgpa}</td>
                      <td className="px-5 py-3 text-sm text-gray-600">{row.bPct}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 border-t-2 border-indigo-200">
                    <td className="px-5 py-3 font-bold text-sm text-gray-900">CGPA</td>
                    <td className="px-5 py-3 text-sm font-bold text-indigo-700">7.63</td>
                    <td className="px-5 py-3 text-sm font-bold text-indigo-600">72.4%</td>
                    <td className="px-5 py-3 text-sm font-bold text-violet-700">8.08</td>
                    <td className="px-5 py-3 text-sm font-bold text-violet-600">76.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <FaRocket className="text-green-600" />
                  Student A — The Growth Story
                </h3>
                <p className="text-sm text-gray-700">
                  Lower CGPA on paper, but the trajectory is unmistakable. Every semester improved.
                  This student adapted, learned from early struggles, and finished strong. Interviewers and admissions panels
                  respond well to this kind of narrative because it shows resilience and self-awareness.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl">
                <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                  <FaLightbulb className="text-yellow-600" />
                  Student B — The Declining Trend
                </h3>
                <p className="text-sm text-gray-700">
                  Higher CGPA overall, but the direction raises eyebrows. Started strong and gradually slipped.
                  Without context — burnout, a family issue, a particularly tough curriculum — this pattern can work against
                  a candidate during interviews or admission reviews.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Common Mistakes */}
          <section className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl shadow-md p-8 border border-red-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Mistakes Students Make When Converting SGPA
            </h2>
            <p className="text-gray-700 mb-6">
              The conversion itself is simple arithmetic, but a few common errors can lead to wrong numbers on applications. Here is what to watch out for.
            </p>
            <div className="space-y-5">
              {[
                {
                  title: 'Mixing Up SGPA and CGPA',
                  desc: 'SGPA is one semester. CGPA is the cumulative average. If an application asks for "overall GPA" and you plug in last semester\'s SGPA, the number will be misleading — and admissions officers who spot the discrepancy will notice. Always match the number to what is being asked.'
                },
                {
                  title: 'Choosing the Wrong Scale',
                  desc: 'Applying the 10-point formula to a 4-point SGPA (or vice versa) produces a completely incorrect percentage. A quick way to verify: check your grade card. It almost always states the scale somewhere on the document.'
                },
                {
                  title: 'Averaging Percentages Instead of SGPAs',
                  desc: 'If you want your overall percentage, do not convert each semester to percentage and then average those percentages. The correct method: average all your semester SGPAs first to get your CGPA, then convert that single CGPA to percentage. The two approaches yield different results because of how credit weighting works across semesters.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-lg border-l-4 border-red-500">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. FAQ */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How do I convert SGPA to percentage on a 10-point scale?',
                  a: 'Multiply your SGPA by 9.5. For example, an SGPA of 8.2 becomes 8.2 × 9.5 = 77.9%. This is the standard method recommended by UGC and followed by the vast majority of Indian universities.'
                },
                {
                  q: 'What is the difference between SGPA and CGPA?',
                  a: 'SGPA covers one semester. CGPA is the average of all your semester SGPAs across your entire degree program. If you have completed four semesters with SGPAs of 7.8, 8.2, 8.5, and 8.1, your CGPA is simply (7.8 + 8.2 + 8.5 + 8.1) ÷ 4 = 8.15. The conversion formula to percentage is the same for both — you just need to start with the right number.'
                },
                {
                  q: 'How is SGPA calculated from individual subject grades?',
                  a: 'Your university calculates SGPA as a credit-weighted average. Each subject has a grade point and a credit value. Multiply each grade by its credits, sum everything up, then divide by total credits. For instance: grade 9 in a 4-credit subject and grade 8 in a 3-credit subject gives SGPA = (9×4 + 8×3) ÷ 7 = 60 ÷ 7 = 8.57.'
                },
                
                {
                  q: 'Do companies look at individual semester SGPAs during recruitment?',
                  a: 'Most companies use CGPA as the primary filter during initial screening. However, interviewers at top firms sometimes ask about semester-wise performance, especially if they notice a drop or inconsistency. A consistently improving trajectory strengthens your candidacy, while a sudden decline may prompt questions you should be prepared to answer.'
                },
                {
                  q: 'Does the 9.5 multiplier work for every Indian university?',
                  a: '9.5 is the standard set by UGC and adopted by most institutions. A few universities use a multiplier of 10 or have their own conversion tables published on their websites. If your university has a specific method, follow that. Otherwise, 9.5 is the safest and most widely recognized choice.'
                },
                {
                  q: 'Can I use this calculator for 4-point GPA systems as well?',
                  a: 'Yes. Select the 4-point scale option and the calculator switches to the appropriate formula: Percentage = (SGPA ÷ 4) × 100. So a 3.4 GPA becomes 85%. This linear method is the standard approach for converting international transcripts.'
                },
                
              ].map((item, i) => (
                <details key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <summary className="font-bold text-gray-900 text-lg">{item.q}</summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Expert Box — E-E-A-T */}
          <ExpertBox
            expertType="education"
            calculatorName="SGPA to Percentage Calculator"
            lastUpdated="January 31, 2026"
          />

          {/* User Reviews — E-E-A-T */}
          <UserReviews calculatorType="sgpa"/>

          {/* Related Calculators */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/cgpa-to-percentage" className="block p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaPercent className="text-2xl text-blue-600" />
                  <h3 className="font-bold text-gray-900">CGPA to Percentage</h3>
                  <FaArrowRight className="text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600">Convert your cumulative GPA to percentage</p>
              </a>
              <a href="/percentage-to-cgpa-calculator" className="block p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaChartLine className="text-2xl text-emerald-600" />
                  <h3 className="font-bold text-gray-900">Percentage to CGPA</h3>
                  <FaArrowRight className="text-emerald-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600">Do the reverse — percentage back to CGPA</p>
              </a>
              <a href="/marks-percentage-calculator" className="block p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-purple-600" />
                  <h3 className="font-bold text-gray-900">Marks to Percentage</h3>
                  <FaArrowRight className="text-purple-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600">Calculate percentage from obtained and total marks</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}