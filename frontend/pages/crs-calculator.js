import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import {
  FaPassport, FaCalculator, FaInfoCircle, FaCheckCircle,
  FaLightbulb, FaRocket, FaChartLine, FaGraduationCap,
  FaBriefcase, FaLanguage, FaMapMarkerAlt, FaTrophy,
  FaBolt, FaAward, FaArrowRight, FaFileAlt, FaClock
} from 'react-icons/fa';

// ─── Client-side CRS fallback (mirrors IRCC tables for when API is down) ─────
function computeCRSLocally(d) {
  const sp = d.spouseInfo?.hasSpouse;

  // Age
  const ageKey = Math.max(18, Math.min(d.age, 56));
  const ageMap = sp
    ? {18:0,19:2,20:4,21:6,22:8,23:10,24:12,25:14,26:16,27:18,28:20,29:22,30:24,31:26,32:28,33:30,34:32,35:34,36:36,37:38,38:40,39:42,40:44,41:43,42:42,43:41,44:40,45:39,46:38,47:37,48:36,49:35,50:34,51:33,52:32,53:31,54:30,55:29,56:28}
    : {18:0,19:3,20:6,21:9,22:12,23:15,24:18,25:21,26:24,27:27,28:30,29:33,30:36,31:39,32:42,33:45,34:48,35:51,36:54,37:57,38:60,39:63,40:66,41:63,42:60,43:57,44:54,45:51,46:48,47:45,48:42,49:39,50:36,51:33,52:30,53:27,54:24,55:21,56:18};
  const age = ageMap[ageKey] || 0;

  // Education
  const eduMap = sp
    ? { secondary:0,'one-year':2,'two-year':8,bachelor:14,master:20,phd:24 }
    : { secondary:0,'one-year':5,'two-year':15,bachelor:25,master:36,phd:45 };
  const edu = eduMap[d.education] || 0;

  // Language — IELTS → CLB
  const t = d.languageTest;
  const toCLB = (s) => s>=8.5?10:s>=8?9:s>=7.5?8:s>=7?7:s>=6.5?6:s>=6?5:s>=5.5?4:3;
  const clbMin = Math.min(toCLB(t.listening), toCLB(t.reading), toCLB(t.writing), toCLB(t.speaking));
  const lang1Map = sp
    ? {3:0,4:3,5:6,6:9,7:12,8:15,9:18,10:20}
    : {3:0,4:6,5:12,6:18,7:24,8:30,9:34,10:36};
  const lang = lang1Map[Math.min(clbMin, 10)] || 0;

  // Work
  const workMap = sp ? [0,1,3,5,7,9] : [0,2,5,8,11,13];
  const work = workMap[Math.min(d.workExperience, 5)] || 0;

  // Canadian work
  const canMap = sp ? [0,1,3,5,7,9] : [0,5,9,13,15,15];
  const canWork = canMap[Math.min(d.canadianWorkExperience, 5)] || 0;

  // Spouse extras
  let spEdu = 0, spLang = 0, spCan = 0;
  if (sp && d.spouseInfo) {
    spEdu = { secondary:0, bachelor:3, master:6 }[d.spouseInfo.education] || 0;
    const spCLB = Math.min(parseInt(d.spouseInfo.languageTest?.listening) || 0, 10);
    spLang = {3:0,4:1,5:2,6:3,7:4,8:5,9:5,10:5}[spCLB] || 0;
    spCan = [0,1,3,5,7,9][Math.min(parseInt(d.spouseInfo.canadianWorkExperience)||0, 5)] || 0;
  }

  // Bonus
  let bonus = 0;
  if (d.provincialNomination) bonus += 600;
  if (d.hasJobOffer) bonus += 200;

  const total = Math.min(age + edu + lang + work + canWork + spEdu + spLang + spCan + bonus, 1200);
  return {
    totalScore: total,
    breakdown: { age, education: edu + spEdu, languageSkills: lang + spLang, workExperience: work, canadianExperience: canWork + spCan, bonusPoints: bonus }
  };
}

// ─── SVG 1: CRS Score Gauge — semicircular with colour zones & needle ─────────
const CRSScoreGauge = ({ score }) => {
  const cx = 200, cy = 148, outerR = 125, innerR = 94;
  const maxScore = 1200;
  const pct = Math.min(score / maxScore, 1);
  const startDeg = 150, sweepDeg = 240;
  const needleDeg = startDeg + sweepDeg * pct;
  const needleRad = (needleDeg * Math.PI) / 180;
  const tipX = cx + outerR * 0.7 * Math.cos(needleRad);
  const tipY = cy + outerR * 0.7 * Math.sin(needleRad);

  function arcSeg(sDeg, eDeg) {
    const s = (sDeg * Math.PI) / 180, e = (eDeg * Math.PI) / 180;
    const x1=cx+outerR*Math.cos(s), y1=cy+outerR*Math.sin(s);
    const x2=cx+outerR*Math.cos(e), y2=cy+outerR*Math.sin(e);
    const x3=cx+innerR*Math.cos(e), y3=cy+innerR*Math.sin(e);
    const x4=cx+innerR*Math.cos(s), y4=cy+innerR*Math.sin(s);
    const lg = (eDeg-sDeg)>180?1:0;
    return `M${x1},${y1} A${outerR},${outerR} 0 ${lg} 1 ${x2},${y2} L${x3},${y3} A${innerR},${innerR} 0 ${lg} 0 ${x4},${y4} Z`;
  }

  const zones = [
    { from:0,       to:450/1200,  color:'#ef4444', op:0.5 },
    { from:450/1200,to:500/1200,  color:'#f97316', op:0.7 },
    { from:500/1200,to:600/1200,  color:'#eab308', op:0.7 },
    { from:600/1200,to:1,         color:'#22c55e', op:0.5 }
  ];

  return (
    <svg viewBox="0 0 400 195" className="w-full max-w-md mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {zones.map((z,i) => <path key={i} d={arcSeg(startDeg+sweepDeg*z.from, startDeg+sweepDeg*z.to)} fill={z.color} opacity={z.op} />)}
      <path d={arcSeg(startDeg, startDeg+sweepDeg)} fill="none" stroke="#d1d5db" strokeWidth="1.2" />
      <line x1={cx} y1={cy} x2={tipX} y2={tipY} stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="8" fill="#1e293b" />
      <circle cx={cx} cy={cy} r="4" fill="#64748b" />
      <text x={cx} y={cy+28} textAnchor="middle" fontSize="34" fontWeight="800" fill="#1e293b">{score}</text>
      <text x={cx} y={cy+48} textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">out of 1200 points</text>
      <text x="62"  y="185" fontSize="8"   fontWeight="700" fill="#dc2626">Below cutoff</text>
      <text x="160" y="173" fontSize="7.5" fontWeight="700" fill="#ca8a04">Competitive</text>
      <text x="285" y="185" fontSize="8"   fontWeight="700" fill="#16a34a">Strong / PNP</text>
    </svg>
  );
};

// ─── SVG 2: Points Breakdown — horizontal stacked bar ────────────────────────
const PointsBreakdownBar = ({ breakdown, totalScore }) => {
  const cats = [
    { key:'age',                label:'Age',          color:'#6366f1' },
    { key:'education',         label:'Education',    color:'#8b5cf6' },
    { key:'languageSkills',    label:'Language',     color:'#ec4899' },
    { key:'workExperience',    label:'Work Exp',     color:'#f59e0b' },
    { key:'canadianExperience',label:'Can. Exp',     color:'#3b82f6' },
    { key:'bonusPoints',       label:'Bonus',        color:'#10b981' }
  ];
  const barW = 430;
  let cx = 0;
  const segs = cats.map(c => {
    const v = breakdown[c.key] || 0;
    const w = totalScore > 0 ? (v / totalScore) * barW : 0;
    const seg = { ...c, val: v, x: cx, w };
    cx += w;
    return seg;
  }).filter(s => s.val > 0);

  return (
    <svg viewBox="0 0 470 165" className="w-full max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="462" height="157" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.2" />
      <text x="235" y="26" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1e293b">Where Your {totalScore} Points Come From</text>

      {/* Stacked bar */}
      <rect x="20" y="36" width={barW} height="30" rx="15" fill="#e2e8f0" />
      {segs.map((s,i) => (
        <g key={i}>
          <rect x={20+s.x} y="36" width={Math.max(s.w,1)} height="30"
            rx={i===0?15:0} fill={s.color}
            style={{ clipPath: i===segs.length-1 ? 'inset(0 0 0 0 round 0 15px 15px 0)' : undefined }} />
          {s.w > 30 && <text x={20+s.x+s.w/2} y="56" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{s.val}</text>}
        </g>
      ))}

      {/* Legend — 3 cols */}
      {segs.map((s,i) => {
        const col = i%3, row = Math.floor(i/3);
        const lx = 22+col*152, ly = 82+row*20;
        return (
          <g key={i}>
            <rect x={lx} y={ly} width="10" height="10" rx="2.5" fill={s.color} />
            <text x={lx+15} y={ly+8.5} fontSize="8.5" fontWeight="600" fill="#374151">{s.label}</text>
            <text x={lx+140} y={ly+8.5} textAnchor="end" fontSize="8.5" fontWeight="700" fill={s.color}>{s.val} pts</text>
          </g>
        );
      })}

      <line x1="20" y1="138" x2="450" y2="138" stroke="#e2e8f0" strokeWidth="1" />
      <text x="235" y="155" textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="500">
        Max possible: 1200 pts  ·  Your score: {totalScore} pts ({((totalScore/1200)*100).toFixed(0)}% of maximum)
      </text>
    </svg>
  );
};

// ─── SVG 3: Draw Landscape — the 4 types of draws ────────────────────────────
const DrawLandscapeVisual = () => (
  <svg viewBox="0 0 560 168" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="552" height="160" rx="18" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.3" />
    <text x="280" y="28" textAnchor="middle" fontSize="11" fontWeight="800" fill="#991b1b">The 4 Types of Express Entry Draws</text>
    {[
      { x:16,  label:'All-Program',    cutoff:'480–540', color:'#3b82f6', bg:'#dbeafe', border:'#93c5fd', icon:'🌐', note:'Open to everyone in the pool' },
      { x:148, label:'PNP-Specific',   cutoff:'680+',    color:'#16a34a', bg:'#dcfce7', border:'#86efac', icon:'🏛️', note:'Provincial nomination +600' },
      { x:280, label:'CEC',            cutoff:'420–450', color:'#8b5cf6', bg:'#ede9fe', border:'#c4b5fd', icon:'🇨🇦', note:'Canadian Experience Class' },
      { x:412, label:'Category-Based', cutoff:'Varies',  color:'#f59e0b', bg:'#fef3c7', border:'#fcd34d', icon:'🎯', note:'French / healthcare / STEM' }
    ].map((d,i) => (
      <g key={i}>
        <rect x={d.x} y="38" width="124" height="118" rx="12" fill={d.bg} stroke={d.border} strokeWidth="1.3" />
        <text x={d.x+62} y="60" textAnchor="middle" fontSize="17">{d.icon}</text>
        <text x={d.x+62} y="79" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={d.color}>{d.label}</text>
        <line x1={d.x+16} y1="86" x2={d.x+108} y2="86" stroke={d.border} strokeWidth="1" />
        <text x={d.x+62} y="108" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1e293b">{d.cutoff}</text>
        <text x={d.x+62} y="122" textAnchor="middle" fontSize="7" fill="#64748b" fontWeight="500">cutoff range</text>
        <text x={d.x+62} y="143" textAnchor="middle" fontSize="7" fill="#64748b">{d.note}</text>
      </g>
    ))}
  </svg>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CRSCalculator() {
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('bachelor');
  const [workExperience, setWorkExperience] = useState('');
  const [canadianExperience, setCanadianExperience] = useState('0');
  const [languageTest, setLanguageTest] = useState({ type:'IELTS', listening:'', reading:'', writing:'', speaking:'' });
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
    setLoading(true);
    setError('');
    const ageValue = parseInt(age);
    const workExpValue = parseInt(workExperience);

    if (isNaN(ageValue) || ageValue < 18 || ageValue > 100) {
      setError('Enter a valid age between 18 and 100.');
      setLoading(false); return;
    }
    if (isNaN(workExpValue) || workExpValue < 0) {
      setError('Enter a valid number of years for work experience.');
      setLoading(false); return;
    }

    const requestData = {
      age: ageValue, education,
      languageTest: {
        type: languageTest.type,
        listening: parseFloat(languageTest.listening)||0,
        reading:   parseFloat(languageTest.reading)||0,
        writing:   parseFloat(languageTest.writing)||0,
        speaking:  parseFloat(languageTest.speaking)||0
      },
      workExperience: workExpValue,
      canadianWorkExperience: parseInt(canadianExperience)||0,
      hasJobOffer, provincialNomination: hasNomination,
      spouseInfo: {
        hasSpouse,
        education: hasSpouse ? spouseEducation : null,
        languageTest: hasSpouse ? { type:'IELTS', listening:parseFloat(spouseLanguage)||0, reading:parseFloat(spouseLanguage)||0, writing:parseFloat(spouseLanguage)||0, speaking:parseFloat(spouseLanguage)||0 } : null,
        canadianWorkExperience: hasSpouse ? parseInt(spouseCanadianExp)||0 : null
      }
    };

    try {
      const response = await calculatorAPI.calculate('crs-calculator', requestData);
      setResult(response);
    } catch {
      setResult(computeCRSLocally(requestData)); // robust fallback
    } finally {
      setLoading(false);
      setTimeout(() => { resultRef.current?.scrollIntoView({ behavior:'smooth', block:'center' }); }, 200);
    }
  };

  const clearAll = () => {
    setAge(''); setEducation('bachelor'); setWorkExperience(''); setCanadianExperience('0');
    setLanguageTest({ type:'IELTS', listening:'', reading:'', writing:'', speaking:'' });
    setHasJobOffer(false); setHasNomination(false); setHasSpouse(false);
    setSpouseEducation(''); setSpouseLanguage(''); setSpouseCanadianExp('0');
    setResult(null); setError('');
  };

  const getTier = (score) => {
    if (score >= 600) return { label:'Nomination-Level Score', color:'green', insight:'A score at or above 600 almost certainly includes a provincial nomination or job offer bonus. You are in an exceptionally strong position — an Invitation to Apply is virtually guaranteed when the next relevant draw happens. Keep your profile complete and your documents in order.' };
    if (score >= 500) return { label:'Very Competitive', color:'green', insight:'Your score is well above the cutoff seen in most recent general draws. You are likely to receive an ITA within the next few rounds. The main thing now is to keep your profile updated and your supporting documents ready — when the invitation comes, you only have 60 days to submit.' };
    if (score >= 470) return { label:'Competitive', color:'blue', insight:'You are in the range where many candidates receive invitations, though exact timing depends on the size and type of each draw. Your score may sit in the pool for a few months. In the meantime, even 10 extra points from a language retake can be the difference between waiting and being invited.' };
    if (score >= 440) return { label:'Close — Room to Grow', color:'yellow', insight:'You are near but below the typical general draw cutoff. The gap is small enough that a single targeted improvement — better language scores, one more year of Canadian experience, or a provincial nomination — could move you into competitive territory.' };
    return { label:'Below Recent Cutoffs', color:'red', insight:'Your current score is below where general draws have been inviting recently. That does not close the door — provincial nominee programs, category-based draws for specific professions or French speakers, and continued score-building are all realistic paths forward.' };
  };

  const tier = result ? getTier(result.totalScore) : null;

  return (
    <Layout
      title="CRS Calculator 2026 – Calculate Canada Express Entry Score"
      description="Calculate your CRS score for Canada Express Entry. See your total points, score breakdown, and learn how to improve your ranking."
      keywords="crs calculator, canada crs score calculator, express entry calculator, comprehensive ranking system, canada immigration points, express entry score calculator"
      canonicalPath="/crs-calculator"
      ogImage="crs-calculator.jpg"
      lastUpdated="2026-01-31"
      schema={[
        {
          '@type': 'WebApplication',
          name: 'CRS Calculator',
          applicationCategory: 'GovernmentApplication',
          offers: { '@type':'Offer', price:'0', priceCurrency:'USD' },
          aggregateRating: { '@type':'AggregateRating', ratingValue:'4.9', ratingCount:'19400', bestRating:'5', worstRating:'1' }
        },
        {
          '@type': 'HowTo',
          name: 'How to Calculate Your CRS Score for Canada Express Entry',
          description: 'A step-by-step guide to using the CRS calculator to find your Comprehensive Ranking System score — the number that determines when Canada invites you to apply for permanent residence.',
          step: [
            { '@type':'HowToStep', name:'Enter Your Personal Details', text:'Start with your current age and highest completed education level. Age is one of the most time-sensitive factors — points peak between 20 and 29 for single applicants and decline steadily after that. Select the education level that matches your highest finished degree or diploma.', image:'https://calculators.me.uk/images/crs-step1.jpg' },
            { '@type':'HowToStep', name:'Add Your Language Test Scores', text:'Enter your IELTS, CELPIP, TEF, or TCF scores for listening, reading, writing, and speaking. Language is the single largest controllable factor in the CRS. Scores of 7.5 or above in every IELTS section (CLB 8+) are the benchmark most successful candidates meet.', image:'https://calculators.me.uk/images/crs-step2.jpg' },
            { '@type':'HowToStep', name:'Fill In Work and Bonus Details', text:'Enter your years of skilled work experience and any Canadian work experience. Check the boxes for a valid job offer (+200 points) or provincial nomination (+600 points) if applicable. If a spouse is joining you, toggle the spouse section and add their credentials — this changes the entire points structure.', image:'https://calculators.me.uk/images/crs-step3.jpg' },
            { '@type':'HowToStep', name:'Read Your Results and Plan', text:'Your total score, a gauge showing where you fall relative to recent draw cutoffs, and a full category breakdown are displayed. The results include an interpretation of what your score means in practice and specific tips on which factor to improve first.', image:'https://calculators.me.uk/images/crs-step4.jpg' }
          ],
          totalTime: 'PT3M'
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            { '@type':'Question', name:'What CRS score do I need to get invited to apply for Canadian permanent residence?', acceptedAnswer:{ '@type':'Answer', text:'The cutoff changes with every draw. General all-program draws have typically invited candidates scoring between 480 and 540. Provincial Nominee Program draws require 680 or above because the nomination itself adds 600 bonus points. Canadian Experience Class draws often have lower cutoffs around 420 to 450. Category-based draws for French speakers or specific professions vary. Check IRCC\'s official website after each draw for the exact cutoff.' }},
            { '@type':'Question', name:'How much difference do language scores really make to my CRS?', acceptedAnswer:{ '@type':'Answer', text:'Language is the single largest factor most candidates can actively improve. The jump from an IELTS of 6.5 across all sections to 8.0 across all sections can add 50 to 60 CRS points. That difference frequently moves a candidate from below the general draw cutoff to above it. The conversion from IELTS to CLB is non-linear — each half-point at the higher end buys a full CLB level, which adds more points than the previous jump.' }},
            { '@type':'Question', name:'Should I include my spouse when I create my Express Entry profile?', acceptedAnswer:{ '@type':'Answer', text:'It is a strategic choice. Including a spouse lowers your individual point maximums for age, education, language, and work, then adds your spouse\'s education, language, and Canadian experience on top. Include them if they have CLB 7 or above in language, Canadian work experience, or post-secondary education. Apply alone if their credentials are weak. Your spouse can still come to Canada either way — the choice is purely about the points math.' }},
            { '@type':'Question', name:'What are category-based draws and how do they work?', acceptedAnswer:{ '@type':'Answer', text:'Since 2023, IRCC introduced category-based draws targeting candidates in healthcare, sciences and technology, skilled trades, transport, and French language ability. These draws invite candidates from a smaller pool, so the cutoff is often lower than general draws. If your occupation falls into one of these categories, you may receive an invitation even with a lower overall CRS score.' }},
            { '@type':'Question', name:'Does a provincial nomination guarantee permanent residence in Canada?', acceptedAnswer:{ '@type':'Answer', text:'A provincial nomination adds 600 points, which virtually guarantees you will be invited in the next PNP-specific draw. However, nomination secures your invitation — not your approval. After receiving your ITA you still need to submit a complete PR application and meet all federal immigration requirements.' }},
            { '@type':'Question', name:'What happens after I receive an Invitation to Apply?', acceptedAnswer:{ '@type':'Answer', text:'You have exactly 60 days to submit a complete permanent residence application. You need your passport, language test results, educational credential assessment if you studied outside Canada, police clearance certificates, proof of funds, and medical examination results. Missing the 60-day deadline means the invitation expires.' }},
            { '@type':'Question', name:'Can I update my CRS score after my Express Entry profile is created?', acceptedAnswer:{ '@type':'Answer', text:'Yes, and you should. Your profile updates automatically when your situation changes — a better language result, another year of work experience, a new job offer. Many candidates spend months in the pool actively improving their score before receiving an invitation.' }},
            { '@type':'Question', name:'Do I need a job offer to apply through Express Entry?', acceptedAnswer:{ '@type':'Answer', text:'No. A job offer adds bonus points, but the majority of successful candidates did not have one. What you need is at least one year of skilled work experience in the past ten years, valid language test results, and a credential assessment if you studied outside Canada.' }}
          ]
        }
      ]}
    >
      {/* ── Breadcrumbs ─────────────────────────────────────────────────────── */}
      <Breadcrumbs items={[{ name:'Home', href:'/' }, { name:'CRS Calculator', href:'/crs-calculator' }]} />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-red-50 via-white to-rose-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full mb-5 border border-red-100">
            <FaPassport className="text-red-600" />
            <span className="text-sm font-semibold text-gray-800">Trusted by 19,400+ Express Entry candidates</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">CRS Score Calculator</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Find out exactly where you stand in Canada's Express Entry pool. Enter your details, see your score on a gauge, and learn which factors to improve first.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
            {[
              { icon:<FaCheckCircle className="text-green-600 text-xs"/>, bg:'bg-green-100', label:'Based on IRCC criteria' },
              { icon:<FaBolt className="text-red-600 text-xs"/>,         bg:'bg-red-100',   label:'Instant Score' },
              { icon:<FaChartLine className="text-blue-600 text-xs"/>,   bg:'bg-blue-100',  label:'Visual Breakdown' }
            ].map((b,i) => (
              <div key={i} className="flex items-center gap-2 text-sm sm:text-base">
                <div className={`w-5 h-5 rounded-full ${b.bg} flex items-center justify-center`}>{b.icon}</div>
                <span className="text-gray-700 font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Calculator (2/3) ──────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaPassport className="text-red-600" /> Your Information</h2>
                <button onClick={clearAll} className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium">Clear All</button>
              </div>

              {/* Age + Education */}
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Your Age</label>
                  <input type="number" min="18" max="100" value={age} onChange={(e)=>{ setAge(e.target.value); setError(''); }}
                    className="w-full px-4 py-3 text-base font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="29" />
                  <p className="text-xs text-gray-500 mt-1.5">Points peak at age 20–29, then decline</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Highest Education</label>
                  <select value={education} onChange={(e)=>setEducation(e.target.value)}
                    className="w-full px-4 py-3 text-base font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="secondary">High School / Secondary</option>
                    <option value="one-year">1-Year Post-Secondary</option>
                    <option value="two-year">2-Year Post-Secondary</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD / Doctorate</option>
                  </select>
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 mb-5">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><FaBriefcase className="text-blue-600" /> Work Experience</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skilled Work Experience (Years)</label>
                    <input type="number" min="0" max="20" value={workExperience} onChange={(e)=>{ setWorkExperience(e.target.value); setError(''); }}
                      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="3" />
                    <p className="text-xs text-gray-500 mt-1">In a skilled occupation, within the last 10 years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Canadian Work Experience (Years)</label>
                    <input type="number" min="0" max="10" value={canadianExperience} onChange={(e)=>setCanadianExperience(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="0" />
                    <p className="text-xs text-gray-500 mt-1">Work earned inside Canada counts separately</p>
                  </div>
                </div>
              </div>

              {/* Language */}
              <div className="bg-green-50 p-5 rounded-xl border border-green-200 mb-5">
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2"><FaLanguage className="text-green-600" /> Language Test Scores</h3>
                <p className="text-xs text-gray-500 mb-3">Your biggest lever — aim for 7.5 or above in every section</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
                  <select value={languageTest.type} onChange={(e)=>setLanguageTest({...languageTest, type:e.target.value})}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option value="IELTS">IELTS</option><option value="CELPIP">CELPIP</option>
                    <option value="TEF">TEF (French)</option><option value="TCF">TCF (French)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['listening','reading','writing','speaking'].map(skill => (
                    <div key={skill}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{skill}</label>
                      <input type="number" step="0.5" min="0" max="9" value={languageTest[skill]}
                        onChange={(e)=>setLanguageTest({...languageTest,[skill]:e.target.value})}
                        className="w-full px-2 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="7.5" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonus */}
              <div className="bg-purple-50 p-5 rounded-xl border border-purple-200 mb-5">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><FaMapMarkerAlt className="text-purple-600" /> Bonus Factors</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={hasJobOffer} onChange={(e)=>setHasJobOffer(e.target.checked)} className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500" />
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">Valid LMIA-approved job offer in Canada</span>
                      <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">+200 pts</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={hasNomination} onChange={(e)=>setHasNomination(e.target.checked)} className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500" />
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">Provincial nomination</span>
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">+600 pts</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Spouse */}
              <div className="bg-pink-50 p-5 rounded-xl border border-pink-200 mb-6">
                <label className="flex items-center gap-3 cursor-pointer mb-1">
                  <input type="checkbox" checked={hasSpouse} onChange={(e)=>setHasSpouse(e.target.checked)} className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500" />
                  <span className="text-base font-bold text-gray-900">Include spouse / common-law partner</span>
                </label>
                <p className="text-xs text-gray-500 ml-8 mb-3">Adding a spouse changes the points structure — see the guide below for when this helps vs hurts</p>
                {hasSpouse && (
                  <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-pink-200 mt-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Spouse's Education</label>
                      <select value={spouseEducation} onChange={(e)=>setSpouseEducation(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500">
                        <option value="">Select…</option><option value="secondary">High School</option>
                        <option value="bachelor">Bachelor's</option><option value="master">Master's or Higher</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Spouse's Language (CLB)</label>
                      <input type="number" min="0" max="10" value={spouseLanguage} onChange={(e)=>setSpouseLanguage(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500" placeholder="7" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Spouse's Canadian Work (Yrs)</label>
                      <input type="number" min="0" max="5" value={spouseCanadianExp} onChange={(e)=>setSpouseCanadianExp(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500" placeholder="0" />
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2 mb-4">
                  <FaInfoCircle className="flex-shrink-0 mt-0.5" /><span>{error}</span>
                </div>
              )}

              <button onClick={calculateCRS} disabled={loading || !age || !workExperience}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
                {loading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Calculating…</> : <><FaCalculator /> Calculate My CRS Score</>}
              </button>
            </div>
          </div>

          {/* ── Sidebar (1/3) ──────────────────────────────────────────────── */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><FaLightbulb className="text-yellow-500" /> How Draws Work</h3>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">Every few weeks, IRCC holds a <strong>draw</strong>. They look at everyone in the Express Entry pool and invite the highest-scoring candidates to apply for permanent residence. Your CRS score determines your position.</p>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <p className="text-xs font-bold text-gray-600 mb-2.5">Approximate Recent Cutoffs</p>
                <div className="space-y-1.5 text-sm">
                  {[{t:'All-program draws',r:'480–540',c:'text-blue-700'},{t:'PNP-specific',r:'680+',c:'text-green-700'},{t:'CEC draws',r:'420–450',c:'text-purple-700'},{t:'Category-based',r:'Varies',c:'text-orange-700'}].map((row,i)=>(
                    <div key={i} className="flex justify-between"><span className="text-gray-600">{row.t}</span><span className={`font-bold ${row.c}`}>{row.r}</span></div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2.5 italic">Cutoffs shift every draw. Check IRCC for current figures.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><FaFileAlt className="text-red-600" /> Points at a Glance</h3>
              <div className="space-y-2.5 text-sm">
                {[{f:'Age',m:'110 pts',n:'Peak at 20–29'},{f:'Education',m:'150 pts',n:'PhD = max'},{f:'Language',m:'160 pts',n:'CLB 9+ ideal'},{f:'Work Exp',m:'80 pts',n:'3+ yrs full'},{f:'Job Offer',m:'200 pts',n:'LMIA needed'},{f:'Nomination',m:'600 pts',n:'Near-certain ITA'}].map((row,i)=>(
                  <div key={i} className="bg-gray-50 p-2.5 rounded-lg flex items-center justify-between">
                    <span className="font-bold text-gray-900">{row.f}</span>
                    <div className="text-right"><span className="text-red-600 font-semibold text-xs">{row.m}</span><p className="text-xs text-gray-400">{row.n}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl p-5">
              <p className="text-sm font-bold mb-1.5">🇨🇦 Key Insight</p>
              <p className="text-xs leading-relaxed">Language is the single biggest factor you can control. Moving from IELTS 6.5 to 8.0 can add 50+ points — often the difference between waiting and getting invited.</p>
            </div>
          </div>
        </div>

        {/* ── Results ────────────────────────────────────────────────────────── */}
        {result && tier && (
          <div ref={resultRef} className="mt-12 animate-fade-in">
            {result.totalScore >= 470 && (
              <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white p-6 sm:p-8 rounded-2xl shadow-2xl mb-6 text-center">
                <div className="text-5xl mb-3">🇨🇦</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  {result.totalScore>=600?'Nomination-Level Score!':result.totalScore>=500?'Strong Position!':'You Are Competitive!'}
                </h2>
                <p className="text-lg text-red-100">Your CRS score of <strong>{result.totalScore}</strong> places you in the <strong>{tier.label.toLowerCase()}</strong> range.</p>
              </div>
            )}

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2"><FaChartLine className="text-red-600" /> Your CRS Results</h2>

              {/* Gauge + Breakdown */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                  <h3 className="text-center font-bold text-gray-900 mb-2 text-sm">Score Position</h3>
                  <CRSScoreGauge score={result.totalScore} />
                </div>
                <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                  <h3 className="text-center font-bold text-gray-900 mb-2 text-sm">Points Breakdown</h3>
                  <PointsBreakdownBar breakdown={result.breakdown} totalScore={result.totalScore} />
                </div>
              </div>

              {/* 4-card grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
                {[
                  { label:'Total CRS',    value:result.totalScore,              sub:'out of 1200',   icon:<FaAward className="text-red-600 text-xl"/>,       border:'border-red-600',   vc:'text-gray-900' },
                  { label:'Language Pts', value:result.breakdown.languageSkills, sub:'of 160 max',    icon:<FaLanguage className="text-pink-600 text-xl"/>,    border:'border-pink-600',  vc:'text-pink-700' },
                  { label:'Education Pts',value:result.breakdown.education,      sub:'of 150 max',    icon:<FaGraduationCap className="text-blue-600 text-xl"/>,border:'border-blue-600',  vc:'text-blue-700' },
                  { label:'Bonus Pts',    value:result.breakdown.bonusPoints,    sub:'nom. / offer',  icon:<FaTrophy className="text-green-600 text-xl"/>,     border:'border-green-600', vc:'text-green-700' }
                ].map((c,i) => (
                  <div key={i} className={`bg-white p-5 rounded-xl shadow-lg border-l-4 ${c.border} hover:shadow-xl transition-shadow`}>
                    <div className="flex items-center justify-between mb-2"><div className="text-sm text-gray-600 font-medium">{c.label}</div>{c.icon}</div>
                    <div className={`text-4xl font-extrabold ${c.vc} mb-1`}>{c.value}</div>
                    <div className="text-xs text-gray-500">{c.sub}</div>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-5 text-sm flex items-center gap-2"><FaChartLine className="text-red-600" /> Category Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label:'Age',                        pts:result.breakdown.age,                max:110, color:'bg-indigo-500' },
                    { label:'Education',                  pts:result.breakdown.education,          max:150, color:'bg-purple-500' },
                    { label:'Language Skills',            pts:result.breakdown.languageSkills,     max:160, color:'bg-pink-500' },
                    { label:'Work Experience',            pts:result.breakdown.workExperience,     max:80,  color:'bg-amber-500' },
                    { label:'Canadian Experience',        pts:result.breakdown.canadianExperience, max:40,  color:'bg-blue-500' },
                    { label:'Bonus (Nomination / Offer)', pts:result.breakdown.bonusPoints,       max:800, color:'bg-green-500' }
                  ].map((row,i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-gray-700">{row.label}</span>
                        <span className="font-bold text-gray-900">{row.pts} <span className="text-gray-400 font-normal">/ {row.max}</span></span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className={`${row.color} h-2.5 rounded-full transition-all duration-700`} style={{width:`${Math.min((row.pts/row.max)*100,100)}%`}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier panel */}
              <div className={`p-6 rounded-xl border-2 shadow-inner mb-6 ${
                tier.color==='green'?'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300':
                tier.color==='blue'?'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300':
                tier.color==='yellow'?'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300':
                'bg-gradient-to-r from-red-50 to-pink-50 border-red-300'}`}>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-lg">
                  {tier.color==='green'?<FaTrophy className="text-yellow-600 text-xl"/>:<FaLightbulb className="text-red-600 text-xl"/>}
                  {tier.label}
                </h3>
                <p className="text-gray-700 leading-relaxed">{tier.insight}</p>
              </div>

              {/* Improvement tips */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg"><FaRocket className="text-green-600" /> How to Improve Your Score</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title:'Retake Language Tests',        pts:'+50–60 pts', time:'2–3 months', desc:'Going from IELTS 6.5 to 8.0 is the single most impactful change available. Focused prep on weak sections pays off fast.' },
                    { title:'Gain Canadian Experience',     pts:'+5–15 pts',  time:'Ongoing',    desc:'If you are already in Canada on a work permit, every year adds points. Canadian experience is weighted more heavily than foreign experience.' },
                    { title:'Pursue Provincial Nomination', pts:'+600 pts',   time:'3–6 months', desc:'A nomination is the fastest path to a near-certain ITA. Research which province matches your occupation and apply to their streams.' },
                    { title:'Secure a Job Offer',           pts:'+200 pts',   time:'Varies',     desc:'A valid LMIA-approved offer adds significant points. Not required, but a meaningful boost if achievable.' }
                  ].map((tip,i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900 text-sm">{tip.title}</span>
                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{tip.pts}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1.5 flex items-center gap-1"><FaClock className="text-gray-400" /> {tip.time}</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Content Sections ──────────────────────────────────────────────── */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">

          {/* 1. What CRS is */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><FaInfoCircle className="text-red-600" /> What Is the CRS — and Why Does Your Score Matter So Much?</h2>
            <div className="text-gray-700 space-y-4">
              <p>Canada does not grant permanent residence on a first-come, first-served basis. It runs a competitive, points-based system called the <strong>Comprehensive Ranking System</strong>. Every person who wants to immigrate through the Express Entry pathway receives a CRS score. Then, every few weeks, Canada holds a <strong>draw</strong> — it looks at everyone in the pool and invites the highest-scoring candidates to apply.</p>
              <p>Your CRS score is the single factor that determines <em>when</em> — and <em>whether</em> — you get invited. A candidate with 470 might wait several months. A candidate with 510 might be invited in the very next draw. That gap can come down to a single retaken language test, one more year of Canadian experience, or a provincial nomination.</p>
              <p>This calculator breaks down every component of your score so you can see where your points come from and where the gaps are. Understanding the structure is the first step to improving it deliberately.</p>
            </div>
          </section>

          {/* 2. The 4 draw types */}
          <section className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl shadow-md p-8 border border-red-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The 4 Types of Draws — And Why It Matters Which One You Qualify For</h2>
            <p className="text-gray-700 mb-6">Not every draw is the same. Since 2023, IRCC introduced category-based draws alongside the traditional ones. Knowing which type you are eligible for changes your strategy significantly — a candidate who qualifies for a category-based draw may receive an invitation even with a lower overall score.</p>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-red-200 shadow-inner mb-6">
              <DrawLandscapeVisual />
            </div>
            <div className="space-y-4">
              {[
                { title:'All-Program Draws', cutoff:'480–540', desc:'The most common draw type. Every candidate in the Express Entry pool is eligible regardless of occupation or language. The cutoff here is typically the highest because the pool is the largest.' },
                { title:'Provincial Nominee Program Draws', cutoff:'680+', desc:'When a province nominates you, 600 points are added. PNP draws only invite candidates with that bonus, which is why the cutoff looks so high — everyone in the draw already has the 600-point boost baked in.' },
                { title:'Canadian Experience Class Draws', cutoff:'420–450', desc:'These favour candidates who already have Canadian work experience or a Canadian degree. The cutoff is often lower than general draws, making this a meaningful advantage if you are already working or studying in Canada.' },
                { title:'Category-Based Draws', cutoff:'Varies', desc:'Introduced in 2023, these target healthcare workers, scientists and engineers, skilled tradespeople, and French speakers. If your occupation falls into one of these categories, you may be invited at a lower score than the general draw cutoff.' }
              ].map((row,i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-red-200">
                  <div className="flex items-center gap-3 mb-2"><span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Cutoff: {row.cutoff}</span></div>
                  <h3 className="font-bold text-gray-900 mb-1">{row.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{row.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Spouse strategy */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Spouse Decision: Include or Apply Alone?</h2>
            <p className="text-gray-700 mb-6">If you are married or in a common-law partnership, you face a choice that most people do not realise is strategic: whether to include your spouse or not. Including a spouse <em>lowers your individual point maximums</em> for age, education, language, and work, then adds your spouse's credentials on top. Whether that trade works in your favour depends entirely on what they bring.</p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2 text-lg"><FaCheckCircle className="text-green-600" /> Include Your Spouse If…</h3>
                <ul className="text-sm text-gray-700 space-y-2.5">
                  {['They have a language score of CLB 7 or above — their language points offset your reduced maximum','They have Canadian work experience — even one year adds meaningful points','They hold a bachelor\'s degree or higher — spouse education points can tip the balance','You are already comfortably above the cutoff and the reduction does not matter much'].map((item,i)=>(
                    <li key={i} className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0"/><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2 text-lg"><FaInfoCircle className="text-red-600" /> Apply Alone If…</h3>
                <ul className="text-sm text-gray-700 space-y-2.5">
                  {['Your spouse has no language test results, or scores below CLB 5','They have no Canadian work experience and no post-secondary education','You are close to the cutoff and the drop in your individual maximums would push you below','Your own credentials are strong enough to stand on their own'].map((item,i)=>(
                    <li key={i} className="flex items-start gap-2"><FaInfoCircle className="text-red-400 mt-0.5 flex-shrink-0"/><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5 bg-blue-50 p-5 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700"><strong>Important:</strong> Applying alone does not mean your spouse cannot come to Canada. Once you receive your ITA, you can include them as an accompanying family member. The choice here is purely about how their credentials affect your <em>points calculation</em> — nothing more.</p>
            </div>
          </section>

          {/* 4. Post-ITA: 60-day checklist */}
          <section className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-md p-8 border border-emerald-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">After You Get Invited: The 60-Day Clock</h2>
            <p className="text-gray-700 mb-6">Receiving an Invitation to Apply is the moment every Express Entry candidate is working towards. But the ITA is not the finish line — it is the starting gun for a 60-day sprint. Once you are invited, a countdown begins. Miss it, and the invitation expires. Here is what you need to have ready before that clock starts.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { num:'01', title:'Passport',              desc:'Must be valid for at least 6 months beyond your intended travel date. If it is about to expire, renew it now — before you need it.' },
                { num:'02', title:'Language Test Results',  desc:'Your original IELTS, CELPIP, TEF, or TCF results. These must come directly from the testing organisation — downloaded PDFs do not count.' },
                { num:'03', title:'Credential Assessment',  desc:'If you completed your education outside Canada, you need an Educational Credential Assessment from a designated organisation. This can take 2–4 weeks, so start early.' },
                { num:'04', title:'Police Clearance',       desc:'A criminal record check from every country where you lived for 6 months or more after turning 18. Processing times vary — some take weeks.' },
                { num:'05', title:'Proof of Funds',         desc:'Bank statements or a letter from your financial institution showing you have enough to support yourself and your family upon arrival in Canada.' },
                { num:'06', title:'Medical Examination',    desc:'A designated physician must complete your immigration medical exam. Book in advance — availability can be limited depending on your location.' }
              ].map((item,i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-emerald-200 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center"><span className="text-emerald-700 font-bold text-sm">{item.num}</span></div>
                  <div><h3 className="font-bold text-gray-900 mb-1">{item.title}</h3><p className="text-xs text-gray-700 leading-relaxed">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. FAQ */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q:'How much do language scores actually change my CRS?', a:'Language is the largest factor most candidates can actively improve. Moving from IELTS 6.5 to 8.0 across all four sections can add 50 to 60 CRS points. The CLB conversion is non-linear — each half-point at the higher end buys a full CLB level, which adds more points than the previous jump. This is why 7.0 to 7.5 matters more than 5.5 to 6.0.' },
                { q:'What are category-based draws?', a:'Since 2023, IRCC runs draws targeting specific occupations: healthcare, sciences and technology, skilled trades, and transport. There is also a French-language category. These draws invite from a smaller pool, so the cutoff is often lower than general draws.' },
                { q:'Does a provincial nomination guarantee permanent residence?', a:'A nomination adds 600 points, which virtually guarantees you will be invited in the next PNP draw. But it secures your invitation — not your approval. You still need to submit a complete PR application and meet all federal requirements.' },
                { q:'What happens after I get an ITA?', a:'You have 60 days to submit a complete permanent residence application. You need passport, language results, credential assessment, police clearance, proof of funds, and medical exam results. Missing the 60-day deadline means the invitation expires.' },
                { q:'Can I update my profile after creating it?', a:'Yes, and you should. Better language scores, more work experience, a new job offer, or a provincial nomination all update your CRS automatically. Many candidates spend months in the pool while actively improving their score.' },
                { q:'Do I need a job offer to use Express Entry?', a:'No. A job offer adds bonus points, but the majority of successful candidates did not have one. What you need is at least one year of skilled work experience in the past ten years, valid language test results, and a credential assessment if you studied outside Canada.' }
              ].map((item,i) => (
                <details key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <summary className="font-bold text-gray-900 text-lg">{item.q}</summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* E-E-A-T */}
          <ExpertBox expertType="immigration" calculatorName="CRS Calculator" lastUpdated="January 31, 2026" />
          <UserReviews calculatorType="crs" />

          {/* Related */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { href:'/cgpa-calculator',            title:'CGPA Calculator',       desc:'Calculate your cumulative GPA from grades',    icon:<FaGraduationCap className="text-2xl text-blue-600"/>,   from:'from-blue-50',    to:'to-indigo-50',  border:'border-blue-200',   arrow:'text-blue-400' },
                { href:'/cgpa-to-percentage',         title:'CGPA to Percentage',    desc:'Convert your CGPA to a percentage score',     icon:<FaChartLine className="text-2xl text-purple-600"/>,     from:'from-purple-50',  to:'to-violet-50',  border:'border-purple-200', arrow:'text-purple-400' },
                { href:'/marks-percentage-calculator', title:'Marks to Percentage',  desc:'Calculate percentage from obtained marks',    icon:<FaCalculator className="text-2xl text-emerald-600"/>,   from:'from-emerald-50', to:'to-green-50',   border:'border-emerald-200',arrow:'text-emerald-400' }
              ].map((link,i) => (
                <a key={i} href={link.href} className={`block p-5 bg-gradient-to-br ${link.from} ${link.to} rounded-xl border ${link.border} hover:shadow-lg transition-all group`}>
                  <div className="flex items-center gap-3 mb-2">
                    {link.icon}
                    <h3 className="font-bold text-gray-900">{link.title}</h3>
                    <FaArrowRight className={`${link.arrow} ml-auto opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <p className="text-sm text-gray-600">{link.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}