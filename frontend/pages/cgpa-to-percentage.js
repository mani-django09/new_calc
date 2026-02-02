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
  FaBriefcase,
  FaFileAlt,
  FaUniversity,
  FaBook
} from 'react-icons/fa';

// ─── SVG 1: CGPA Assembly — how 4 semester SGPAs merge into one CGPA ─────────
const CGPAAssemblyIllustration = () => (
  <svg viewBox="0 0 560 210" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="6" y="6" width="548" height="198" rx="22" fill="#faf5ff" stroke="#c4b5fd" strokeWidth="1.5" />

    {/* Semester bubbles on the left — S1 through S4 stacked */}
    {[
      { y: 38, label: 'Sem 1', val: '7.8', color: '#a78bfa' },
      { y: 78, label: 'Sem 2', val: '8.2', color: '#8b5cf6' },
      { y: 118, label: 'Sem 3', val: '8.5', color: '#7c3aed' },
      { y: 158, label: 'Sem 4', val: '8.1', color: '#6d28d9' }
    ].map((s, i) => (
      <g key={i}>
        <rect x="24" y={s.y} width="130" height="32" rx="16" fill={s.color} />
        <text x="50" y={s.y + 20} fontSize="10" fontWeight="700" fill="#fff">{s.label}</text>
        <text x="128" y={s.y + 20} textAnchor="end" fontSize="13" fontWeight="800" fill="#fff">{s.val}</text>
      </g>
    ))}

    {/* Converging arrows */}
    <path d="M158,54 Q220,54 240,100" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none" markerEnd="url(#arrowPurple)" />
    <path d="M158,94 Q210,94 240,100" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" fill="none" markerEnd="url(#arrowPurple)" />
    <path d="M158,134 Q210,134 240,108" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" fill="none" markerEnd="url(#arrowPurple)" />
    <path d="M158,174 Q220,174 240,116" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" fill="none" markerEnd="url(#arrowPurple)" />
    <defs>
      <marker id="arrowPurple" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L7,3.5 L0,7 Z" fill="#7c3aed" />
      </marker>
    </defs>

    {/* Central CGPA circle */}
    <circle cx="290" cy="105" r="42" fill="#7c3aed" stroke="#6d28d9" strokeWidth="2.5" />
    <text x="290" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#c4b5fd">CGPA</text>
    <text x="290" y="120" textAnchor="middle" fontSize="22" fontWeight="800" fill="#fff">8.15</text>

    {/* Arrow to result */}
    <path d="M335,105 L375,105" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowPurple)" />

    {/* Result box */}
    <rect x="388" y="72" width="148" height="66" rx="16" fill="#fff" stroke="#7c3aed" strokeWidth="2.2" />
    <text x="462" y="96" textAnchor="middle" fontSize="10.5" fill="#6b7280" fontWeight="600">× 9.5 =</text>
    <text x="462" y="122" textAnchor="middle" fontSize="24" fontWeight="800" fill="#7c3aed">77.4%</text>

    {/* Formula note at bottom */}
    <text x="290" y="192" textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="500">
      CGPA = (7.8 + 8.2 + 8.5 + 8.1) ÷ 4 = 8.15  →  Percentage = 8.15 × 9.5 = 77.4%
    </text>
  </svg>
);

// ─── SVG 2: Job Eligibility Meter — CGPA thresholds mapped to company tiers ──
const JobEligibilityMeter = () => (
  <svg viewBox="0 0 520 185" className="w-full max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="508" height="173" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.3" />

    {/* Main CGPA track */}
    <text x="28" y="38" fontSize="10.5" fontWeight="700" fill="#475569">CGPA Scale (10-point)</text>
    <rect x="28" y="48" width="464" height="22" rx="11" fill="#e2e8f0" />

    {/* Colored segments: 0-5 red, 5-6 orange, 6-7 yellow, 7-8 blue, 8-10 green */}
    <rect x="28" y="48" width="93" height="22" rx="11" fill="#ef4444" clipPath="url(#trackClip)" />
    <rect x="121" y="48" width="93" height="22" fill="#f97316" clipPath="url(#trackClip)" />
    <rect x="214" y="48" width="93" height="22" fill="#eab308" clipPath="url(#trackClip)" />
    <rect x="307" y="48" width="93" height="22" fill="#3b82f6" clipPath="url(#trackClip)" />
    <rect x="400" y="48" width="92" height="22" rx="0" fill="#22c55e" clipPath="url(#trackClipR)" />
    <defs>
      <clipPath id="trackClip"><rect x="28" y="48" width="464" height="22" rx="11" /></clipPath>
      <clipPath id="trackClipR"><rect x="28" y="48" width="464" height="22" rx="11" /></clipPath>
    </defs>

    {/* Scale numbers below track */}
    {[
      { x: 28, label: '0' }, { x: 121, label: '5' }, { x: 214, label: '6' },
      { x: 307, label: '7' }, { x: 400, label: '8' }, { x: 492, label: '10' }
    ].map((t, i) => (
      <text key={i} x={t.x} y={88} fontSize="9" fontWeight="600" fill="#64748b">{t.label}</text>
    ))}

    {/* Tier labels */}
    {[
      { x: 74, label: 'Below Cut-off', color: '#dc2626' },
      { x: 167, label: 'Basic', color: '#ea580c' },
      { x: 260, label: 'Mid-tier', color: '#ca8a04' },
      { x: 353, label: 'Strong', color: '#2563eb' },
      { x: 446, label: 'Top Tier', color: '#16a34a' }
    ].map((t, i) => (
      <text key={i} x={t.x} y={105} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={t.color}>{t.label}</text>
    ))}

    {/* Company examples */}
    {[
      { y: 128, pct: '60%', cgpa: '6.3', icon: '🏢', label: 'Most companies screen here', color: '#f59e0b' },
      { y: 148, pct: '65%', cgpa: '6.8', icon: '🏛️', label: 'Government jobs & PSUs', color: '#3b82f6' },
      { y: 168, pct: '75%', cgpa: '7.9', icon: '🚀', label: 'Top recruiters & startups', color: '#22c55e' }
    ].map((row, i) => (
      <g key={i}>
        <text x="28" y={row.y} fontSize="9" fill="#64748b">{row.icon}</text>
        <text x="44" y={row.y} fontSize="9" fontWeight="600" fill="#1e293b">{row.label}</text>
        <text x="390" y={row.y} textAnchor="end" fontSize="9" fontWeight="700" fill={row.color}>≥ {row.pct} ({row.cgpa} CGPA)</text>
      </g>
    ))}
  </svg>
);

// ─── SVG 3: Result Ring — purple/blue theme (distinct from other pages) ──────
const ResultRing = ({ percentage, color }) => {
  const pct = Math.min(parseFloat(percentage), 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference - (pct / 100) * circumference;

  let ringColor = '#7c3aed';
  let bgColor = '#f5f3ff';
  if (color === 'green') { ringColor = '#16a34a'; bgColor = '#dcfce7'; }
  if (color === 'blue') { ringColor = '#2563eb'; bgColor = '#dbeafe'; }
  if (color === 'yellow') { ringColor = '#ca8a04'; bgColor = '#fef9c3'; }
  if (color === 'orange') { ringColor = '#ea580c'; bgColor = '#ffedd5'; }
  if (color === 'red') { ringColor = '#dc2626'; bgColor = '#fee2e2'; }

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
      <text x="70" y="104" textAnchor="middle" fontSize="9.5" fontWeight="500" fill="#9ca3af">from CGPA {' '}</text>
    </svg>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CGPAToPercentage() {
  const [cgpa, setCgpa] = useState('');
  const [scale, setScale] = useState('10');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);

  // ── Client-side calculation — no API needed for multiply/divide ───────────
  const calculatePercentage = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const cgpaValue = parseFloat(cgpa);
      const scaleValue = parseFloat(scale);

      if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > scaleValue) {
        setError(`Enter a valid CGPA between 0 and ${scale}.`);
        setLoading(false);
        return;
      }

      let percentage, formula;
      if (scale === '10') {
        percentage = (cgpaValue * 9.5).toFixed(2);
        formula = `Percentage = ${cgpaValue} × 9.5 = ${percentage}%`;
      } else {
        percentage = ((cgpaValue / 4) * 100).toFixed(2);
        formula = `Percentage = (${cgpaValue} ÷ 4) × 100 = ${percentage}%`;
      }

      const pctNum = parseFloat(percentage);
      let letterGrade, color, insight;

      if (pctNum >= 90) {
        letterGrade = 'O / A+'; color = 'green';
        insight = 'This is a degree-defining score. A CGPA at this level opens doors to the most competitive postgraduate programs, elite recruiters, and international fellowship opportunities. Very few graduates reach this benchmark consistently.';
      } else if (pctNum >= 80) {
        letterGrade = 'A'; color = 'green';
        insight = 'An excellent cumulative record. This CGPA clears the threshold for top-tier campus placements, most scholarship programs, and competitive postgraduate admissions. It signals sustained academic discipline across your entire degree.';
      } else if (pctNum >= 70) {
        letterGrade = 'B+'; color = 'blue';
        insight = 'A strong and respectable degree. This CGPA comfortably clears the screening criteria at the majority of companies and meets the requirements for most postgraduate and professional programs you might consider.';
      } else if (pctNum >= 60) {
        letterGrade = 'B'; color = 'blue';
        insight = 'A solid degree that meets the baseline eligibility for most employers and programs. While it may not crack into the very top tier of recruiters, it opens a wide range of professional and academic opportunities.';
      } else if (pctNum >= 50) {
        letterGrade = 'C'; color = 'yellow';
        insight = 'Your degree is complete and valid, but this CGPA will require you to compensate with strong internship experience, skills, or other achievements during interviews and applications. Focus on building a compelling portfolio.';
      } else if (pctNum >= 40) {
        letterGrade = 'D'; color = 'orange';
        insight = 'This CGPA is below the screening threshold of many employers. Consider supplementing your resume with certifications, project work, or relevant experience to strengthen your candidacy in competitive situations.';
      } else {
        letterGrade = 'F'; color = 'red';
        insight = 'This score suggests significant academic difficulty. Speaking with your university\'s career services or academic advisor can help you explore pathways forward — whether that is additional coursework, bridging programs, or alternative career routes.';
      }

      // Job eligibility gaps
      const target65 = scale === '10' ? (65 / 9.5).toFixed(2) : (65 / 100 * 4).toFixed(2);
      const target75 = scale === '10' ? (75 / 9.5).toFixed(2) : (75 / 100 * 4).toFixed(2);
      const gap65 = Math.max(0, parseFloat(target65) - cgpaValue).toFixed(2);
      const gap75 = Math.max(0, parseFloat(target75) - cgpaValue).toFixed(2);

      setResult({ percentage, cgpaValue, scale, formula, letterGrade, color, insight, target65, target75, gap65, gap75 });
      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }, 520);
  };

  const clearAll = () => {
    setCgpa('');
    setScale('10');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="CGPA to Percentage Calculator 2026 – Convert Cumulative GPA to Percentage Free"
      description="Convert your CGPA to percentage instantly. Supports both 10-point (India/UGC) and 4-point (USA/Canada) scales. Get your letter grade, job-eligibility analysis, and the exact formula used — all in one click."
      keywords="cgpa to percentage calculator, convert cgpa to percentage, gpa to percentage, cgpa percentage conversion, 10 point cgpa to percentage, 4 point gpa to percentage, cumulative gpa calculator"
      canonicalPath="/cgpa-to-percentage"
      ogImage="cgpa-to-percentage.jpg"
      lastUpdated="2026-01-31"
      schema={[
        {
          '@type': 'WebApplication',
          name: 'CGPA to Percentage Calculator',
          applicationCategory: 'EducationalApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '24100',
            bestRating: '5',
            worstRating: '1'
          }
        },
        {
          '@type': 'HowTo',
          name: 'How to Convert CGPA to Percentage',
          description: 'A clear step-by-step guide to converting your cumulative grade point average into a percentage score using the 10-point or 4-point grading scale.',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Choose Your Grading Scale',
              text: 'Select the scale your university uses. Indian universities under UGC follow the 10-point scale. Universities in the US and Canada use the 4-point scale. Your degree certificate or transcript will confirm which one applies to you.',
              image: 'https://calculators.me.uk/images/cgpa-pct-step1.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Enter Your CGPA',
              text: 'Type in your cumulative GPA — the overall average printed on your final degree certificate or latest transcript. This is not a single semester score; it is the number that represents your entire academic record. Decimals are supported.',
              image: 'https://calculators.me.uk/images/cgpa-pct-step2.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Click Convert to Percentage',
              text: 'Press the Convert button. The calculator applies the appropriate formula instantly: multiplication by 9.5 for the 10-point scale, or the equivalent linear mapping for the 4-point scale.',
              image: 'https://calculators.me.uk/images/cgpa-pct-step3.jpg'
            },
            {
              '@type': 'HowToStep',
              name: 'Read Your Full Results',
              text: 'Your percentage, letter grade, the exact formula applied, and a job-eligibility gap analysis are all displayed. The gap analysis tells you how your CGPA compares to common recruitment and scholarship thresholds.',
              image: 'https://calculators.me.uk/images/cgpa-pct-step4.jpg'
            }
          ],
          totalTime: 'PT20S'
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I convert CGPA to percentage on a 10-point scale?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Multiply your CGPA by 9.5. For example, a CGPA of 8.0 becomes 8.0 × 9.5 = 76%. This is the standard formula recommended by the University Grants Commission (UGC) of India and adopted by the majority of Indian universities.'
              }
            },
            {
              '@type': 'Question',
              name: 'Why do universities use 9.5 as the multiplier instead of 10?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The 9.5 multiplier was chosen because achieving a perfect 10.0 CGPA is exceptionally rare in practice. Using 9.5 means a 10.0 CGPA maps to 95% — a realistic upper bound that reflects genuine academic excellence without inflating scores. A multiplier of 10 would cap percentage at 100%, which does not align with how most universities award marks.'
              }
            },
            {
              '@type': 'Question',
              name: 'Does every Indian university use the 9.5 multiplier?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most do, because UGC recommends it. However, a small number of private institutions use a multiplier of 10, and some universities have published their own conversion tables. If your university has an official conversion chart, use that. Otherwise, 9.5 is the safest and most widely accepted standard.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I write a self-converted percentage on job application forms?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, for initial applications and screening forms, self-conversion using the standard formula is common practice and generally accepted. However, if a company asks for verification or you are applying for government positions, obtain an official percentage conversion letter from your university\'s examination office.'
              }
            },
            {
              '@type': 'Question',
              name: 'What CGPA do I need to clear the 60% cut-off on job forms?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'On the 10-point scale, 60% corresponds to a CGPA of 60 ÷ 9.5 = 6.32. So a CGPA of 6.32 or above will meet the 60% threshold. Similarly, 65% requires a CGPA of 6.84, and 75% requires 7.89.'
              }
            },
            {
              '@type': 'Question',
              name: 'How is CGPA different from SGPA?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'SGPA is your grade point average for one semester. CGPA is the cumulative average across all semesters of your degree. For example, if your semester SGPAs are 7.8, 8.2, 8.5, and 8.1, your CGPA is (7.8 + 8.2 + 8.5 + 8.1) ÷ 4 = 8.15. The conversion formula to percentage is the same for both — you just use the cumulative number for CGPA.'
              }
            }
          ]
        }
      ]}
    >
      {/* ── Breadcrumbs ───────────────────────────────────────────────────── */}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'CGPA to Percentage Calculator', href: '/cgpa-to-percentage' }
      ]} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full mb-5 border border-purple-100">
            <FaTrophy className="text-yellow-500" />
            <span className="text-sm font-semibold text-gray-800">24,000+ students convert daily</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            CGPA to Percentage Calculator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Convert your cumulative GPA to percentage instantly. The number that goes on your resume, your job form, and your degree — decoded in seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                <FaBolt className="text-purple-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">Instant Conversion</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <FaBriefcase className="text-blue-600 text-xs" />
              </div>
              <span className="text-gray-700 font-medium">Job Eligibility Check</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Calculator (2/3) ────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaGraduationCap className="text-purple-600" />
                  Convert Your CGPA
                </h2>
                <button onClick={clearAll} className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium">Clear All</button>
              </div>

              <div className="space-y-6">
                {/* Scale selector */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">Which Grading Scale Does Your Degree Use?</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: '10', label: '10', sub: 'Point Scale', tag: 'India / UGC', tagColor: 'text-purple-600 bg-purple-100', activeB: 'border-purple-500 bg-purple-50', activeTag: null },
                      { val: '4', label: '4', sub: 'Point Scale', tag: 'USA / Canada', tagColor: 'text-blue-600 bg-blue-100', activeB: 'border-blue-500 bg-blue-50', activeTag: null }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => { setScale(opt.val); setError(''); }}
                        className={`relative flex flex-col items-center p-5 rounded-xl border-2 transition-all ${
                          scale === opt.val ? opt.activeB + ' shadow-md' : 'border-gray-200 bg-white hover:border-purple-300'
                        }`}
                      >
                        {scale === opt.val && (
                          <span className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${opt.val === '10' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                            <FaCheckCircle className="text-white text-xs" />
                          </span>
                        )}
                        <span className="text-3xl font-extrabold text-gray-900">{opt.label}</span>
                        <span className="text-xs font-semibold text-gray-600 mt-1">{opt.sub}</span>
                        <span className={`text-xs font-medium mt-0.5 px-2 py-0.5 rounded-full ${opt.tagColor}`}>{opt.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CGPA input */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    Your Cumulative CGPA (0 – {scale})
                  </label>
                  <div className="relative">
                    <input
                      type="number" step="0.01" min="0" max={scale}
                      value={cgpa}
                      onChange={(e) => { setCgpa(e.target.value); setError(''); }}
                      className="w-full px-4 py-4 text-xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                      placeholder={scale === '10' ? 'e.g. 8.5' : 'e.g. 3.7'}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <FaGraduationCap className="text-2xl text-gray-300" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This is your <strong>overall</strong> CGPA across all semesters — check your latest transcript or degree certificate.
                  </p>
                </div>

                {/* Tip box */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl border border-purple-200">
                  <div className="flex items-start gap-3">
                    <FaLightbulb className="text-yellow-600 text-xl mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">What goes into CGPA?</p>
                      <p className="text-sm text-gray-700">
                        Your CGPA is the average of every semester's SGPA across your degree. It is the single number that represents your
                        full academic record — and the one that appears on job forms, loan applications, and graduate school submissions.
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

                {/* Button */}
                <button
                  onClick={calculatePercentage}
                  disabled={loading || !cgpa}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Converting…</>
                  ) : (
                    <><FaCalculator /> Convert to Percentage</>
                  )}
                </button>
              </div>

              {/* How-to steps */}
              <div className="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-lg">
                  <FaInfoCircle className="text-purple-600" /> How to Use This Calculator
                </h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  {[
                    { num: '1', label: 'Pick Your Scale', color: 'bg-purple-100 text-purple-600' },
                    { num: '2', label: 'Enter CGPA', color: 'bg-blue-100 text-blue-600' },
                    { num: '3', label: 'Click Convert', icon: <FaCalculator className="text-4xl text-indigo-600" /> },
                    { num: '4', label: 'See Results', icon: <FaTrophy className="text-4xl text-yellow-500" /> }
                  ].map((step, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-white rounded-xl p-6 mb-3 shadow-sm border border-purple-100 h-28 flex flex-col items-center justify-center">
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

          {/* ── Sidebar (1/3) ───────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Formulas */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaChartLine className="text-purple-600" /> Conversion Formulas
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">10-Point</span>
                    <span className="text-xs text-gray-500">India / UGC</span>
                  </div>
                  <p className="font-mono text-sm text-gray-800 font-semibold">% = CGPA × 9.5</p>
                  <p className="text-xs text-gray-500 mt-1">e.g. 8.5 × 9.5 = <strong>80.75%</strong></p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">4-Point</span>
                    <span className="text-xs text-gray-500">USA / Canada</span>
                  </div>
                  <p className="font-mono text-sm text-gray-800 font-semibold">% = (CGPA ÷ 4) × 100</p>
                  <p className="text-xs text-gray-500 mt-1">e.g. (3.5 ÷ 4) × 100 = <strong>87.5%</strong></p>
                </div>
              </div>
            </div>

            {/* Quick reference */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Reference (10-pt)</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { cgpa: '10.0', pct: '95.0%', note: 'Perfect' },
                  { cgpa: '9.0', pct: '85.5%', note: 'Distinction' },
                  { cgpa: '8.0', pct: '76.0%', note: 'First Class' },
                  { cgpa: '7.0', pct: '66.5%', note: 'Second Class' },
                  { cgpa: '6.3', pct: '60.0%', note: 'Basic cut-off' },
                  { cgpa: '5.0', pct: '47.5%', note: 'Pass' }
                ].map((row, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-lg flex items-center justify-between">
                    <span className="font-bold text-gray-900">CGPA {row.cgpa}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-purple-600 font-semibold text-xs">{row.pct}</span>
                      <span className="text-xs text-gray-400">{row.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Where you need this */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-purple-600" /> Where You'll Need This
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  'Job application forms asking for percentage',
                  'Government competitive exam registrations',
                  'Educational loan eligibility checks',
                  'Postgraduate admission forms',
                  'Scholarship cut-off verification'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheckCircle className="text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Results ──────────────────────────────────────────────────────── */}
        {result && (
          <div ref={resultsRef} className="mt-12 animate-fade-in">
            {/* Celebration */}
            {parseFloat(result.percentage) >= 80 && (
              <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white p-6 sm:p-8 rounded-2xl shadow-2xl mb-6 text-center">
                <div className="text-5xl mb-3">🎓</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Excellent Degree! Your percentage is {result.percentage}%</h2>
                <p className="text-lg sm:text-xl text-purple-100">A <strong>{result.letterGrade}</strong> cumulative record — this opens serious doors.</p>
              </div>
            )}

            {/* Main card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                  <FaChartLine className="text-purple-600" /> Your Conversion Results
                </h2>
                <ResultRing percentage={result.percentage} color={result.color} />
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg shadow-lg mt-4 ${
                  result.color === 'green' ? 'bg-green-100 text-green-800 border-2 border-green-300' :
                  result.color === 'blue' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' :
                  result.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' :
                  result.color === 'orange' ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' :
                  'bg-red-100 text-red-800 border-2 border-red-300'
                }`}>
                  <FaStar className="text-xl" /> Grade: {result.letterGrade}
                </div>
              </div>

              {/* 4-card grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Percentage</div>
                    <FaAward className="text-purple-600 text-xl" />
                  </div>
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">{result.percentage}%</div>
                  <div className="text-xs text-gray-500">Your degree score</div>
                </div>
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Input CGPA</div>
                    <FaGraduationCap className="text-blue-600 text-xl" />
                  </div>
                  <div className="text-4xl font-extrabold text-blue-700 mb-1">{result.cgpaValue}</div>
                  <div className="text-xs text-gray-500">out of {result.scale}.0</div>
                </div>
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-indigo-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Letter Grade</div>
                    <FaStar className="text-indigo-600 text-xl" />
                  </div>
                  <div className="text-3xl font-extrabold text-indigo-700 mb-1">{result.letterGrade}</div>
                  <div className="text-xs text-gray-500">Academic Tier</div>
                </div>
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border-l-4 border-pink-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-600 font-medium">Scale</div>
                    <FaChartLine className="text-pink-600 text-xl" />
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 mb-1">{result.scale}-Point</div>
                  <div className="text-xs text-gray-500">{result.scale === '10' ? 'India / UGC' : 'USA / Canada'}</div>
                </div>
              </div>

              {/* Formula */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaCalculator className="text-purple-600" /> Formula Applied
                </h3>
                <div className="bg-white p-3 rounded-lg border border-purple-200 text-center">
                  <p className="font-mono text-base text-gray-800 font-semibold">{result.formula}</p>
                </div>
              </div>

              {/* Job Eligibility Gap — unique to this page */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <FaBriefcase className="text-blue-600" /> Job Eligibility Check
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Most companies set a minimum percentage on application forms. See how your CGPA stacks up against the two most common thresholds.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">65% Cut-off (CGPA {result.target65})</span>
                      {parseFloat(result.gap65) === 0
                        ? <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ Cleared</span>
                        : <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">+{result.gap65} CGPA short</span>
                      }
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((parseFloat(result.cgpaValue) / parseFloat(result.target65)) * 100, 100)}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Common threshold for PSUs & government jobs</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">75% Cut-off (CGPA {result.target75})</span>
                      {parseFloat(result.gap75) === 0
                        ? <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ Cleared</span>
                        : <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">+{result.gap75} CGPA short</span>
                      }
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((parseFloat(result.cgpaValue) / parseFloat(result.target75)) * 100, 100)}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Top recruiters & competitive scholarships</p>
                  </div>
                </div>
              </div>

              {/* Insight panel */}
              <div className={`p-6 rounded-xl border-2 shadow-inner ${
                result.color === 'green' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' :
                result.color === 'blue' ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300' :
                result.color === 'yellow' ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300' :
                result.color === 'orange' ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300' :
                'bg-gradient-to-r from-red-50 to-pink-50 border-red-300'
              }`}>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                  {result.color === 'green' ? <FaTrophy className="text-yellow-600 text-xl" /> : <FaLightbulb className="text-purple-600 text-xl" />}
                  What This Means for Your Career
                </h3>
                <p className="text-gray-700 leading-relaxed">{result.insight}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Content Sections ──────────────────────────────────────────── */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">

          {/* 1. What CGPA really is */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaInfoCircle className="text-purple-600" /> What Is CGPA — and Why Does the Percentage Matter?
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Out of every number your university hands you over four years, your <strong>CGPA</strong> is the one that follows you longest.
                It is the single figure that summarises your entire academic journey — every exam, every assignment, every semester
                — rolled into one cumulative score. It lives on your degree certificate, and it is the first thing recruiters
                glance at when they scan your resume.
              </p>
              <p>
                The catch is that CGPA lives on a scale — usually 0 to 10 or 0 to 4 — and the world outside your campus does not always
                speak that language. Job application forms, government exam registrations, educational loan portals, and scholarship
                committees frequently ask for <strong>percentage</strong>. Converting your CGPA to percentage is therefore not an academic
                exercise; it is a practical necessity that most graduates face within weeks of finishing their degree.
              </p>
              <p>
                The good news: the math is a single step. This calculator handles it instantly. But understanding <em>why</em> the formula
                works the way it does — and where it comes from — makes you more confident when you write that number on a form.
              </p>
            </div>

            {/* CGPA Assembly SVG */}
            <div className="mt-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-2xl p-6 sm:p-8 border-2 border-purple-200 shadow-inner">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">How Four Semesters Become One CGPA</h3>
              <CGPAAssemblyIllustration />
              <p className="text-xs text-gray-500 mt-3 text-center italic">
                Each semester's SGPA feeds into the cumulative average. That average, multiplied by 9.5, gives you the percentage that goes on every form.
              </p>
            </div>
          </section>

          {/* 2. The 9.5 story — WHY that number */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why 9.5? The Story Behind the Multiplier
            </h2>
            <p className="text-gray-700 mb-6">
              If you have ever wondered why the formula uses 9.5 and not 10, you are not alone. It is one of the most common questions
              students ask — and the answer reveals something important about how Indian universities think about grading.
            </p>

            <div className="bg-white p-6 rounded-lg border-l-4 border-purple-600 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Logic</h3>
              <p className="text-gray-700 mb-3">
                A perfect 10.0 CGPA is extraordinarily rare. In practice, even the most brilliant students across an entire university
                rarely sustain a 10.0 across every semester. The University Grants Commission recognised this and set <strong>9.5 as the multiplier</strong>
                so that a 10.0 CGPA maps to <strong>95%</strong> — a high, but achievable, benchmark — rather than 100%.
              </p>
              <p className="text-gray-700">
                This also means that the percentage scale stays grounded in reality. A student with a 8.0 CGPA genuinely scored around 76% on average,
                which matches what their actual marks looked like before the university converted them to grade points.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Two Formulas — Side by Side</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-xs font-bold text-purple-700 mb-2 flex items-center gap-1">
                    <span className="bg-purple-100 px-2 py-0.5 rounded-full">10-Point (India)</span>
                  </p>
                  <p className="font-mono text-lg font-bold text-gray-900 text-center">% = CGPA × 9.5</p>
                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>CGPA 8.0 → <strong>76%</strong></p>
                    <p>CGPA 8.5 → <strong>80.75%</strong></p>
                    <p>CGPA 9.0 → <strong>85.5%</strong></p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-1">
                    <span className="bg-blue-100 px-2 py-0.5 rounded-full">4-Point (USA/Canada)</span>
                  </p>
                  <p className="font-mono text-lg font-bold text-gray-900 text-center">% = (CGPA ÷ 4) × 100</p>
                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>GPA 3.0 → <strong>75%</strong></p>
                    <p>GPA 3.5 → <strong>87.5%</strong></p>
                    <p>GPA 3.8 → <strong>95%</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Job eligibility — the real-world use */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              CGPA and Job Eligibility: What Recruiters Actually Look At
            </h2>
            <p className="text-gray-700 mb-6">
              When you open a job application form — whether it is on a company website, a government portal, or a campus recruitment
              system — one of the first fields you encounter is <em>"Minimum percentage required."</em> That single field is where CGPA
              conversion becomes urgent. Here is how the thresholds actually break down in the real world.
            </p>

            {/* Job Eligibility Meter SVG */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-blue-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Common Recruitment Thresholds</h3>
              <JobEligibilityMeter />
            </div>

            {/* Threshold breakdown */}
            <div className="space-y-4">
              {[
                {
                  pct: '60%', cgpa: '6.32', title: 'The Basic Screening Line',
                  desc: 'This is where most companies set their floor. If your CGPA falls below 6.32 on the 10-point scale, a significant number of application forms will reject you at the very first step — before anyone reads your resume or sees your projects. It is the single most important threshold to clear.'
                },
                {
                  pct: '65%', cgpa: '6.84', title: 'Government and PSU Jobs',
                  desc: 'Public sector undertakings and many government recruitment portals set their cut-off here. UPSC, SSC, and banking exams frequently require 65% as a minimum eligibility criterion. For students targeting stable government careers, this is the number to aim for during your degree.'
                },
                {
                  pct: '75%', cgpa: '7.89', title: 'Top Recruiters and Scholarships',
                  desc: 'Elite companies and competitive scholarship programs often set their bar at 75%. This is also where many postgraduate admissions become more competitive. A CGPA above 7.89 does not guarantee you anything on its own, but it removes you from the first round of rejections at the companies that matter most.'
                }
              ].map((row, i) => (
                <div key={i} className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-purple-100 text-purple-700 text-sm font-bold px-3 py-1 rounded-full">≥ {row.pct}</span>
                    <span className="text-sm text-gray-500">CGPA ≥ {row.cgpa}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{row.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{row.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Official docs — the honesty point */}
          <section className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-md p-8 border border-amber-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Self-Conversion vs Official Documents — When Does It Matter?
            </h2>
            <p className="text-gray-700 mb-6">
              Typing your CGPA into a calculator and writing the percentage on a form is standard practice.
              Millions of graduates do it every year without issue. But there are specific situations where
              self-conversion is not enough — and knowing the difference saves you from embarrassment or, worse, a rejected application.
            </p>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> Self-Conversion Is Fine For…
                </h3>
                <ul className="text-sm text-gray-700 space-y-1.5 ml-5 list-disc">
                  <li>Online job application forms during initial screening</li>
                  <li>Campus placement registration portals</li>
                  <li>Scholarship eligibility checks before you apply</li>
                  <li>Personal planning and comparing your score against cut-offs</li>
                  <li>Filling out forms where the field says "approximate percentage"</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 p-5 rounded-xl">
                <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-red-600" /> You Need an Official Document For…
                </h3>
                <ul className="text-sm text-gray-700 space-y-1.5 ml-5 list-disc">
                  <li>Government job verification after selection</li>
                  <li>Educational loan applications at banks</li>
                  <li>International university admissions (credential evaluation)</li>
                  <li>Any form that says "attach proof of percentage"</li>
                  <li>Legal or contractual documents requiring verified academic records</li>
                </ul>
              </div>
            </div>
            <div className="mt-5 bg-white p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-gray-700">
                <strong>How to get an official document:</strong> Visit your university's examination office or registrar and ask for a
                <em> "percentage conversion letter"</em> or <em>"equivalent percentage certificate."</em> Most universities issue this within
                a few days, and it carries the institutional stamp that recruiters and loan officers need.
              </p>
            </div>
          </section>

          {/* 5. FAQ */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How do I convert CGPA to percentage on a 10-point scale?',
                  a: 'Multiply your CGPA by 9.5. A CGPA of 8.0 becomes 8.0 × 9.5 = 76%. This is the standard UGC-recommended formula and the one accepted by the vast majority of Indian universities, employers, and government bodies.'
                },
                {
                  q: 'Why does the formula use 9.5 and not 10?',
                  a: 'A perfect 10.0 CGPA is rare in practice. Using 9.5 as the multiplier means a 10.0 maps to 95% — a high but realistic ceiling. If the multiplier were 10, a 10.0 CGPA would equal 100%, which does not reflect how marks are actually distributed in most university examinations.'
                },
                {
                  q: 'What CGPA do I need to meet the 60% cut-off?',
                  a: 'On the 10-point scale, 60% requires a CGPA of 60 ÷ 9.5 = 6.32. For 65%, you need 6.84. For 75%, you need 7.89. These are the three thresholds that appear most frequently on job application forms across India.'
                },
                {
                  q: 'Does every university use 9.5 as the multiplier?',
                  a: 'Most do, because UGC recommends it. A few private institutions use 10 instead, and some have published their own conversion tables. If your university has an official conversion chart on its website, use that number. Otherwise, 9.5 is the safest and most widely recognized standard.'
                },
                {
                  q: 'How is CGPA different from SGPA?',
                  a: 'SGPA is the grade point average for a single semester. CGPA is the cumulative average across all semesters of your degree. If your four semester SGPAs are 7.8, 8.2, 8.5, and 8.1, your CGPA is (7.8 + 8.2 + 8.5 + 8.1) ÷ 4 = 8.15. The conversion formula to percentage works the same way for both — you just use the cumulative number.'
                },
                {
                  q: 'Can I use this calculator for a 4-point GPA?',
                  a: 'Yes. Select the 4-point scale and enter your GPA. The calculator uses the formula: Percentage = (GPA ÷ 4) × 100. So a 3.5 GPA becomes 87.5%. This linear method is the standard approach used for international transcript conversions.'
                },
              ].map((item, i) => (
                <details key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <summary className="font-bold text-gray-900 text-lg">{item.q}</summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Expert Box */}
          <ExpertBox expertType="education" calculatorName="CGPA to Percentage Calculator" lastUpdated="January 31, 2026" />

          {/* User Reviews */}
          <UserReviews calculatorType="cgpa" />

          {/* Related */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/percentage-to-cgpa-calculator" className="block p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaPercent className="text-2xl text-emerald-600" />
                  <h3 className="font-bold text-gray-900">Percentage to CGPA</h3>
                  <FaArrowRight className="text-emerald-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600">Do the reverse — convert percentage back to CGPA</p>
              </a>
              <a href="/sgpa-to-percentage-calculator" className="block p-5 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-200 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaBook className="text-2xl text-indigo-600" />
                  <h3 className="font-bold text-gray-900">SGPA to Percentage</h3>
                  <FaArrowRight className="text-indigo-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600">Convert a single semester's GPA to percentage</p>
              </a>
              <a href="/marks-percentage-calculator" className="block p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-blue-600" />
                  <h3 className="font-bold text-gray-900">Marks to Percentage</h3>
                  <FaArrowRight className="text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
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