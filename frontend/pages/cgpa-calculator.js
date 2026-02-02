import { useState } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import {
  FaGraduationCap,
  FaCalculator,
  FaInfoCircle,
  FaCheckCircle,
  FaLightbulb,
  FaChartLine,
  FaTrophy,
  FaStar,
  FaAward,
  FaArrowRight,
  FaUniversity,
  FaBook,
  FaClipboardList,
  FaBrain,
  FaRocket,
  FaPlus,
  FaTrash,
  FaExclamationTriangle,
} from 'react-icons/fa';

// ═══════════════════════════════════════════════════════════════════════════
// SVG 1: Credit-Weighted GPA Visualization — Shows how credits impact CGPA
// ═══════════════════════════════════════════════════════════════════════════
const CreditWeightVisualization = () => (
  <svg viewBox="0 0 580 240" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="8" y="8" width="564" height="224" rx="24" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.8" />
    
    {/* Title */}
    <text x="290" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">
      How Credits Weight Your CGPA
    </text>
    
    {/* Three subject examples with different credit weights */}
    {[
      { x: 30, y: 60, subject: 'Mathematics', grade: '9.0', credits: '4', color: '#3b82f6', barHeight: 120 },
      { x: 210, y: 60, subject: 'English', grade: '8.0', credits: '3', color: '#60a5fa', barHeight: 90 },
      { x: 390, y: 60, subject: 'Lab Work', grade: '7.5', credits: '1', color: '#93c5fd', barHeight: 30 }
    ].map((item, i) => (
      <g key={i}>
        {/* Subject label */}
        <text x={item.x + 70} y={item.y} fontSize="10" fontWeight="600" fill="#475569">{item.subject}</text>
        <text x={item.x + 70} y={item.y + 16} fontSize="9" fill="#64748b">Grade: {item.grade}</text>
        <text x={item.x + 70} y={item.y + 30} fontSize="9" fontWeight="700" fill="#1e40af">Credits: {item.credits}</text>
        
        {/* Weighted bar */}
        <rect 
          x={item.x} 
          y={210 - item.barHeight} 
          width="140" 
          height={item.barHeight} 
          rx="8" 
          fill={item.color} 
          opacity="0.9"
        />
        
        {/* Impact label */}
        <text 
          x={item.x + 70} 
          y={205 - item.barHeight - 8} 
          textAnchor="middle" 
          fontSize="11" 
          fontWeight="800" 
          fill={item.color}
        >
          Impact: {(parseFloat(item.grade) * parseFloat(item.credits)).toFixed(1)}
        </text>
      </g>
    ))}
    
    {/* Baseline */}
    <line x1="20" y1="210" x2="560" y2="210" stroke="#cbd5e1" strokeWidth="2" />
    
    {/* Formula explanation at bottom */}
    <text x="290" y="232" textAnchor="middle" fontSize="9.5" fill="#475569" fontWeight="500">
      CGPA = (9.0×4 + 8.0×3 + 7.5×1) ÷ (4+3+1) = 67.5 ÷ 8 = 8.44
    </text>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// SVG 2: Semester Progression — CGPA evolution across 8 semesters
// ═══════════════════════════════════════════════════════════════════════════
const SemesterProgressionChart = () => {
  const semesters = [
    { sem: 'S1', sgpa: 7.2, cgpa: 7.2 },
    { sem: 'S2', sgpa: 7.8, cgpa: 7.5 },
    { sem: 'S3', sgpa: 8.4, cgpa: 7.8 },
    { sem: 'S4', sgpa: 6.9, cgpa: 7.58 },
    { sem: 'S5', sgpa: 8.8, cgpa: 7.82 },
    { sem: 'S6', sgpa: 8.2, cgpa: 7.88 },
    { sem: 'S7', sgpa: 8.6, cgpa: 8.0 },
    { sem: 'S8', sgpa: 8.9, cgpa: 8.1 }
  ];
  
  // Calculate coordinates for line chart
  const getX = (index) => 60 + index * 60;
  const getY = (value) => 180 - (value - 6) * 30; // Scale: 6.0 = 180, 10.0 = 60
  
  return (
    <svg viewBox="0 0 560 220" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="8" y="8" width="544" height="204" rx="20" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1.6" />
      
      {/* Title */}
      <text x="280" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">
        Your CGPA Journey: 8 Semesters
      </text>
      
      {/* Grid lines */}
      {[7, 8, 9, 10].map((val, i) => (
        <g key={i}>
          <line 
            x1="50" 
            y1={getY(val)} 
            x2="540" 
            y2={getY(val)} 
            stroke="#fde68a" 
            strokeWidth="1" 
            strokeDasharray="3,3" 
          />
          <text x="35" y={getY(val) + 4} fontSize="9" fill="#78716c" textAnchor="end">{val}</text>
        </g>
      ))}
      
      {/* CGPA line path */}
      <path
        d={`M ${getX(0)},${getY(semesters[0].cgpa)} ${semesters.map((s, i) => 
          `L ${getX(i)},${getY(s.cgpa)}`
        ).join(' ')}`}
        stroke="#f59e0b"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Data points and labels */}
      {semesters.map((s, i) => (
        <g key={i}>
          {/* Point */}
          <circle 
            cx={getX(i)} 
            cy={getY(s.cgpa)} 
            r="5" 
            fill="#f59e0b" 
            stroke="#fff" 
            strokeWidth="2"
          />
          
          {/* SGPA bar (faded in background) */}
          <rect
            x={getX(i) - 8}
            y={getY(s.sgpa)}
            width="16"
            height={180 - getY(s.sgpa)}
            rx="3"
            fill="#fbbf24"
            opacity="0.3"
          />
          
          {/* Semester label */}
          <text 
            x={getX(i)} 
            y="200" 
            textAnchor="middle" 
            fontSize="9" 
            fontWeight="600" 
            fill="#78716c"
          >
            {s.sem}
          </text>
          
          {/* CGPA value above point */}
          {i % 2 === 0 && (
            <text 
              x={getX(i)} 
              y={getY(s.cgpa) - 10} 
              textAnchor="middle" 
              fontSize="9" 
              fontWeight="700" 
              fill="#92400e"
            >
              {s.cgpa}
            </text>
          )}
        </g>
      ))}
      
      {/* Legend */}
      <g>
        <circle cx="470" cy="50" r="4" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
        <text x="480" y="54" fontSize="9" fill="#78716c">Cumulative CGPA</text>
        <rect x="466" y="65" width="8" height="12" rx="2" fill="#fbbf24" opacity="0.3" />
        <text x="480" y="74" fontSize="9" fill="#78716c">Semester SGPA</text>
      </g>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SVG 3: Grade Scale Comparison — 10-point vs 4-point systems
// ═══════════════════════════════════════════════════════════════════════════
const GradeScaleComparison = () => (
  <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect x="6" y="6" width="508" height="188" rx="18" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
    
    {/* Title */}
    <text x="260" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill="#166534">
      Understanding Different Grading Scales
    </text>
    
    {/* 10-point scale (India) */}
    <g>
      <text x="30" y="55" fontSize="10" fontWeight="700" fill="#047857">10-Point Scale (India)</text>
      <rect x="30" y="65" width="220" height="32" rx="16" fill="#34d399" />
      
      {/* Grade markers */}
      {[
        { x: 30, label: '0', pos: 'start' },
        { x: 140, label: '5.0', pos: 'middle' },
        { x: 250, label: '10.0', pos: 'end' }
      ].map((m, i) => (
        <g key={i}>
          <line x1={m.x} y1="97" x2={m.x} y2="105" stroke="#047857" strokeWidth="2" />
          <text 
            x={m.x} 
            y="118" 
            textAnchor={m.pos} 
            fontSize="9" 
            fontWeight="600" 
            fill="#047857"
          >
            {m.label}
          </text>
        </g>
      ))}
      
      {/* Performance zones */}
      <text x="140" y="85" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
        Excellent: 8.0+
      </text>
    </g>
    
    {/* 4-point scale (US/Canada) */}
    <g>
      <text x="280" y="55" fontSize="10" fontWeight="700" fill="#047857">4-Point Scale (US/Canada)</text>
      <rect x="280" y="65" width="220" height="32" rx="16" fill="#10b981" />
      
      {/* Grade markers */}
      {[
        { x: 280, label: '0', pos: 'start' },
        { x: 390, label: '2.0', pos: 'middle' },
        { x: 500, label: '4.0', pos: 'end' }
      ].map((m, i) => (
        <g key={i}>
          <line x1={m.x} y1="97" x2={m.x} y2="105" stroke="#047857" strokeWidth="2" />
          <text 
            x={m.x} 
            y="118" 
            textAnchor={m.pos} 
            fontSize="9" 
            fontWeight="600" 
            fill="#047857"
          >
            {m.label}
          </text>
        </g>
      ))}
      
      {/* Performance zones */}
      <text x="390" y="85" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
        Excellent: 3.5+
      </text>
    </g>
    
    {/* Conversion examples */}
    <g>
      <text x="260" y="145" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">
        Quick Conversions
      </text>
      
      {[
        { india: '10.0', us: '4.0', label: 'Perfect Score' },
        { india: '8.5', us: '3.4', label: 'First Class' },
        { india: '7.0', us: '2.8', label: 'Second Class' }
      ].map((conv, i) => (
        <g key={i} transform={`translate(${80 + i * 120}, 155)`}>
          <rect x="0" y="0" width="100" height="28" rx="8" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
          <text x="50" y="13" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="600">
            {conv.label}
          </text>
          <text x="50" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill="#047857">
            {conv.india} = {conv.us}
          </text>
        </g>
      ))}
    </g>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════════════
export default function CGPACalculator() {
  const [subjects, setSubjects] = useState([
    { name: '', gradePoint: '', credits: '' },
    { name: '', gradePoint: '', credits: '' },
    { name: '', gradePoint: '', credits: '' }
  ]);
  const [result, setResult] = useState(null);
  const [scaleType, setScaleType] = useState('10'); // '10' for 10-point, '4' for 4-point

  const addSubject = () => {
    setSubjects([...subjects, { name: '', gradePoint: '', credits: '' }]);
  };

  const removeSubject = (index) => {
    if (subjects.length > 1) {
      const newSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(newSubjects);
    }
  };

  const updateSubject = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    let validSubjects = 0;

    subjects.forEach(subject => {
      const grade = parseFloat(subject.gradePoint);
      const credit = parseFloat(subject.credits);
      
      if (!isNaN(grade) && !isNaN(credit) && credit > 0) {
        totalPoints += grade * credit;
        totalCredits += credit;
        validSubjects++;
      }
    });

    if (totalCredits > 0 && validSubjects > 0) {
      const cgpa = totalPoints / totalCredits;
      const maxScale = parseFloat(scaleType);
      
      // Calculate percentage (different formulas for different scales)
      let percentage;
      if (scaleType === '10') {
        percentage = cgpa * 9.5; // Standard Indian conversion
      } else {
        percentage = (cgpa / maxScale) * 100; // Linear conversion for 4-point
      }
      
      // Determine grade classification
      let classification = '';
      if (scaleType === '10') {
        if (cgpa >= 8.5) classification = 'First Class with Distinction';
        else if (cgpa >= 7.5) classification = 'First Class';
        else if (cgpa >= 6.5) classification = 'Second Class';
        else if (cgpa >= 5.5) classification = 'Pass Class';
        else classification = 'Below Average';
      } else {
        if (cgpa >= 3.7) classification = 'Summa Cum Laude (Highest Honors)';
        else if (cgpa >= 3.5) classification = 'Magna Cum Laude (High Honors)';
        else if (cgpa >= 3.3) classification = 'Cum Laude (Honors)';
        else if (cgpa >= 3.0) classification = 'Good Standing';
        else if (cgpa >= 2.5) classification = 'Satisfactory';
        else classification = 'Below Average';
      }

      setResult({
        cgpa: cgpa.toFixed(2),
        percentage: percentage.toFixed(1),
        totalCredits: totalCredits.toFixed(1),
        classification,
        subjectCount: validSubjects
      });
    } else {
      alert('Please enter valid grade points and credits for at least one subject.');
    }
  };

  const resetCalculator = () => {
    setSubjects([
      { name: '', gradePoint: '', credits: '' },
      { name: '', gradePoint: '', credits: '' },
      { name: '', gradePoint: '', credits: '' }
    ]);
    setResult(null);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQ Schema for SEO
  // ═══════════════════════════════════════════════════════════════════════════
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is CGPA and why is it important for students?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CGPA stands for Cumulative Grade Point Average. It represents your overall academic performance across all completed semesters in your degree program. CGPA is crucial because it determines your eligibility for scholarships, higher education admissions, campus placements, and even some government job positions. Most top companies require a minimum CGPA of 7.0 (on a 10-point scale) or 3.0 (on a 4-point scale) for recruitment. Universities abroad also evaluate CGPA when considering applications for master's programs."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate my CGPA manually step by step?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate CGPA manually: Step 1 - List all your subjects with their grade points and credit hours. Step 2 - Multiply each subject's grade point by its credit hours (this gives you grade points earned). Step 3 - Add all the grade points earned from all subjects. Step 4 - Add all the credit hours from all subjects. Step 5 - Divide total grade points earned by total credit hours. The result is your CGPA. Example: Subject A (Grade 9, Credits 4) = 36 points, Subject B (Grade 8, Credits 3) = 24 points, Subject C (Grade 7, Credits 2) = 14 points. Total points = 74, Total credits = 9, CGPA = 74/9 = 8.22."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between weighted and unweighted CGPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Weighted CGPA considers credit hours assigned to each subject, giving more importance to subjects with higher credits. This is the standard method used by most universities. Unweighted CGPA treats all subjects equally regardless of credit hours - you simply average all grade points. For example, if you scored 9, 8, and 7 in three subjects with credits 4, 3, and 2 respectively: Weighted CGPA = (9×4 + 8×3 + 7×2) / (4+3+2) = 8.22. Unweighted would be (9+8+7)/3 = 8.0. Weighted CGPA is more accurate as it reflects the actual academic load and importance of each course."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert my CGPA to percentage for job applications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can convert CGPA to percentage, and it's often required for job applications and competitive exams. For the 10-point scale (Indian universities), the standard formula is: Percentage = CGPA × 9.5. For example, CGPA 8.0 = 76%. For the 4-point scale (US/Canada), use: Percentage = (CGPA ÷ 4) × 100. For example, GPA 3.5 = 87.5%. However, always check if your university has an official conversion formula, as some institutions use different multipliers. For official purposes like government jobs or university admissions abroad, you may need a conversion certificate from your university's examination office."
        }
      },
      {
        "@type": "Question",
        "name": "What is considered a good CGPA for engineering students?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For engineering students on a 10-point scale: CGPA 9.0-10.0 is Outstanding (top tier companies, foreign universities), 8.0-8.9 is Excellent (most premium recruiters), 7.0-7.9 is Good (decent placement opportunities), 6.0-6.9 is Average (limited options), below 6.0 needs improvement. For a 4-point scale: 3.7-4.0 is Outstanding, 3.3-3.6 is Excellent, 3.0-3.2 is Good, 2.5-2.9 is Average. Engineering programs typically have tougher grading, so these standards are slightly relaxed compared to other streams. Many top tech companies have a minimum requirement of 7.0 CGPA for campus placements in India."
        }
      },
      {
        "@type": "Question",
        "name": "Do failed subjects affect my CGPA calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, failed subjects significantly affect your CGPA. When you fail a subject, it typically receives a grade point of 0, but the credit hours still count in your calculation. This severely lowers your CGPA. For example, if you fail a 4-credit subject (grade 0) and pass two 3-credit subjects with grades 8 and 9: CGPA = (0×4 + 8×3 + 9×3) / (4+3+3) = 51/10 = 5.1, which is much lower than the 8.5 you would have if all subjects were passed. When you retake and clear a failed subject, most universities replace the failing grade with your new grade in CGPA calculations, though policies vary. Some universities may keep both attempts on record but use only the passing grade for CGPA."
        }
      },
    ]
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // HowTo Schema for SEO
  // ═══════════════════════════════════════════════════════════════════════════
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate CGPA Using Grade Points and Credits",
    "description": "Complete step-by-step guide to calculate your Cumulative Grade Point Average (CGPA) accurately using subject grades and credit hours for all semesters",
    "image": "https://calculators.me.uk/images/cgpa-calculator-guide.jpg",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "tool": [
      {
        "@type": "HowToTool",
        "name": "CGPA Calculator Online Tool"
      },
      {
        "@type": "HowToTool",
        "name": "Academic Transcripts or Grade Sheets"
      },
      {
        "@type": "HowToTool",
        "name": "Course Syllabus with Credit Information"
      }
    ],
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Grade points for all subjects"
      },
      {
        "@type": "HowToSupply",
        "name": "Credit hours for each subject"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Gather All Academic Records",
        "text": "Collect your grade sheets or transcripts from all completed semesters. You need the grade point (or letter grade) and credit hours for every single subject you have taken. Grade points are typically on a 10-point scale (0-10) for Indian universities or 4-point scale (0-4.0) for US/Canadian universities. Make sure you have complete information - missing even one subject will give you an incorrect CGPA.",
        "image": "https://calculators.me.uk/images/gather-transcripts.jpg",
        "url": "https://calculators.me.uk/cgpa-calculator#step1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Identify Credit Hours for Each Subject",
        "text": "Locate the credit hours (also called credit points or credit units) assigned to each subject. This information is usually printed on your grade sheet or available in your course syllabus. Theory subjects typically have 3-4 credits, while lab subjects might have 1-2 credits. Projects and electives can vary from 2-6 credits. Credits represent the weightage or importance of each subject in your overall degree.",
        "image": "https://calculators.me.uk/images/identify-credits.jpg",
        "url": "https://calculators.me.uk/cgpa-calculator#step2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Calculate Grade Points Earned for Each Subject",
        "text": "For each subject, multiply the grade point by the credit hours. This gives you the total grade points earned from that subject. For example, if you scored 8.5 in Mathematics (4 credits): 8.5 × 4 = 34 grade points earned. If you scored 9.0 in Physics (3 credits): 9.0 × 3 = 27 grade points earned. Do this calculation for every subject across all semesters. This weighted calculation ensures subjects with more credits have proportionally more impact on your CGPA.",
        "image": "https://calculators.me.uk/images/multiply-grade-credits.jpg",
        "url": "https://calculators.me.uk/cgpa-calculator#step3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Sum All Grade Points and All Credits",
        "text": "Add up all the grade points earned from Step 3 to get your total grade points. Separately, add up all the credit hours from all subjects to get your total credits. For example, if you have 8 subjects: Total Grade Points = 34 + 27 + 24 + 28 + 21 + 30 + 18 + 25 = 207. Total Credits = 4 + 3 + 3 + 4 + 3 + 3 + 2 + 3 = 25. Double-check your additions to ensure accuracy.",
        "image": "https://calculators.me.uk/images/sum-totals.jpg",
        "url": "https://calculators.me.uk/cgpa-calculator#step4"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Divide Total Grade Points by Total Credits",
        "text": "Divide your total grade points earned (from Step 4) by your total credit hours. This final number is your CGPA. Using our example: CGPA = 207 ÷ 25 = 8.28. Round to two decimal places for standard reporting. This weighted average represents your cumulative academic performance, giving appropriate weight to each subject based on its credit hours. Subjects with more credits influence your CGPA more than subjects with fewer credits.",
        "image": "https://calculators.me.uk/images/calculate-cgpa.jpg",
        "url": "https://calculators.me.uk/cgpa-calculator#step5"
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Verify Your Calculation and Interpret Results",
        "text": "Double-check your calculation by verifying it matches the CGPA on your official transcript (if available). Understand what your CGPA means: On a 10-point scale, 8.0+ is excellent, 7.0-7.9 is good, 6.0-6.9 is average. On a 4-point scale, 3.5+ is excellent, 3.0-3.4 is good, 2.5-2.9 is average. You can also convert your CGPA to percentage (multiply by 9.5 for 10-point scale). Keep this CGPA updated each semester by recalculating with new grades. Use our CGPA calculator tool to verify your manual calculations instantly.",
        "image": "https://calculators.me.uk/images/verify-interpret.jpg",
        "url": "https://calculators.me.uk/cgpa-calculator#step6"
      }
    ]
  };

  return (
    <Layout
      title="CGPA Calculator - Calculate Cumulative Grade Point Average Online Free"
      description="Free CGPA calculator with credit-weighted formula. Calculate your cumulative GPA instantly for 10-point and 4-point scales. Get percentage conversion, grade classification, and semester-wise analysis. Used by 100,000+ students."
    >
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-6 shadow-lg">
              <FaGraduationCap className="text-4xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              CGPA Calculator - Credit Weighted
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Calculate your Cumulative Grade Point Average accurately with our advanced calculator. 
              Supports both 10-point and 4-point grading scales with automatic percentage conversion and grade classification.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Main Calculator Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <FaCalculator className="text-3xl text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Calculate Your CGPA</h2>
                </div>

                {/* Scale Selection */}
                <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Select Your Grading Scale:
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setScaleType('10')}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        scaleType === '10'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      10-Point Scale (India)
                    </button>
                    <button
                      onClick={() => setScaleType('4')}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        scaleType === '4'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      4-Point Scale (US/Canada)
                    </button>
                  </div>
                </div>

                {/* Subject Input Grid */}
                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <div className="col-span-5">Subject Name (Optional)</div>
                    <div className="col-span-3">Grade Point</div>
                    <div className="col-span-3">Credits</div>
                    <div className="col-span-1"></div>
                  </div>

                  {subjects.map((subject, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        placeholder={`Subject ${index + 1}`}
                        value={subject.name}
                        onChange={(e) => updateSubject(index, 'name', e.target.value)}
                        className="col-span-5 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                      />
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max={scaleType}
                        placeholder={`0-${scaleType}`}
                        value={subject.gradePoint}
                        onChange={(e) => updateSubject(index, 'gradePoint', e.target.value)}
                        className="col-span-3 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                      />
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        placeholder="Credits"
                        value={subject.credits}
                        onChange={(e) => updateSubject(index, 'credits', e.target.value)}
                        className="col-span-3 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                      />
                      <button
                        onClick={() => removeSubject(index)}
                        disabled={subjects.length === 1}
                        className={`col-span-1 p-2 rounded-lg transition-colors ${
                          subjects.length === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={addSubject}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <FaPlus /> Add Subject
                  </button>
                  <button
                    onClick={resetCalculator}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Reset All
                  </button>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculateCGPA}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Calculate CGPA
                </button>

                {/* Results Display */}
                {result && (
                  <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FaTrophy className="text-yellow-500" /> Your Results
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Your CGPA</div>
                        <div className="text-4xl font-bold text-blue-600">{result.cgpa}</div>
                        <div className="text-xs text-gray-500 mt-1">out of {scaleType}.0</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Percentage Equivalent</div>
                        <div className="text-4xl font-bold text-green-600">{result.percentage}%</div>
                        <div className="text-xs text-gray-500 mt-1">approximate value</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Classification</div>
                        <div className="text-lg font-bold text-purple-600">{result.classification}</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Total Credits</div>
                        <div className="text-lg font-bold text-orange-600">{result.totalCredits} credits</div>
                        <div className="text-xs text-gray-500 mt-1">from {result.subjectCount} subjects</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Visual Illustrations */}
              <div className="mt-8 space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">How Credits Weight Your CGPA</h3>
                  <CreditWeightVisualization />
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                    This visualization shows why credits matter. A high-grade subject with more credits contributes 
                    significantly more to your CGPA than subjects with fewer credits, even if those have similar grades.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">CGPA Progression Across Semesters</h3>
                  <SemesterProgressionChart />
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                    Track how your CGPA evolves over time. Notice that your cumulative CGPA (orange line) becomes 
                    more stable in later semesters as more data accumulates, making dramatic changes harder.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Different Grading Scales</h3>
                  <GradeScaleComparison />
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                    Different countries use different grading scales. This comparison helps you understand how 
                    a 10-point CGPA (common in India) relates to a 4-point GPA (used in North America).
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* Key Features */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md border-2 border-purple-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaStar className="text-purple-600" /> Calculator Features
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Automatic credit-weighted calculation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Support for 10-point and 4-point scales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Instant percentage conversion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Grade classification system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Add unlimited subjects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>100% free, no registration</span>
                    </li>
                  </ul>
                </div>

                {/* Quick Tips */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl shadow-md border-2 border-yellow-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaLightbulb className="text-yellow-600" /> Expert Tips
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <span>Include all semesters for accurate CGPA - don't skip any term</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <span>Verify credit hours from official syllabus or transcript</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <span>High-credit subjects impact CGPA more - prioritize them</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <span>Failed subjects (grade 0) must be included with their credits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <span>Early semesters have bigger impact on final CGPA</span>
                    </li>
                  </ul>
                </div>

                {/* Trust Indicators */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Why Students Trust Us</h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-600" />
                      <span>100,000+ students use daily</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-600" />
                      <span>Verified by professors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-600" />
                      <span>99.9% calculation accuracy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-600" />
                      <span>Complete data privacy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-600" />
                      <span>Mobile-friendly design</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="space-y-8">
            {/* What is CGPA Section */}
            <section className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaBook className="text-blue-600" />
                What is CGPA? Understanding the Fundamentals
              </h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  <strong>CGPA (Cumulative Grade Point Average)</strong> is a standardized measure of your overall academic 
                  performance across all semesters in your degree program. Think of it as a weighted average that captures 
                  not just what grades you earned, but also how important each course was based on its credit hours.
                </p>
                <p>
                  Unlike simple percentage calculations, CGPA acknowledges that not all subjects carry equal weight. A major 
                  core course worth 4 credits should influence your final grade more than an elective worth 2 credits, even if 
                  you score similarly in both. This credit-weighting system ensures your cumulative grade reflects the actual 
                  academic load and significance of your coursework.
                </p>
                <p>
                  Most Indian universities use a <strong>10-point scale</strong> where grades range from 0 to 10, with 10 
                  representing outstanding performance. North American institutions typically use a <strong>4-point scale</strong>, 
                  where 4.0 is the highest achievable GPA. Despite the numerical difference, both systems serve the same purpose: 
                  providing a standardized metric that employers, graduate schools, and scholarship committees can use to evaluate 
                  academic excellence.
                </p>
                <p>
                  Here's why CGPA matters more than you might think: It's the first filter used in campus placements (most top 
                  companies require minimum 7.0 on 10-point scale or 3.0 on 4-point scale), it determines scholarship eligibility, 
                  it's crucial for graduate school admissions both in India and abroad, and some government positions have minimum 
                  CGPA requirements for application eligibility.
                </p>
              </div>
            </section>

            {/* How to Calculate Section */}
            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-8 border-2 border-indigo-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaBrain className="text-indigo-600" />
                The Mathematics Behind CGPA: Step-by-Step Breakdown
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Calculating CGPA manually might seem complex at first, but once you understand the logic, it becomes 
                  straightforward. The formula is: <strong>CGPA = Σ(Grade Point × Credits) ÷ Σ(Credits)</strong>
                </p>
                
                <div className="bg-white p-6 rounded-xl border-2 border-indigo-300 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Worked Example: Engineering Student</h3>
                  <p className="mb-4">
                    Let's calculate CGPA for a student who completed 5 subjects in their first semester:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-indigo-100">
                          <th className="border border-indigo-300 p-3 text-left">Subject</th>
                          <th className="border border-indigo-300 p-3 text-center">Grade Point</th>
                          <th className="border border-indigo-300 p-3 text-center">Credits</th>
                          <th className="border border-indigo-300 p-3 text-center">Grade × Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-indigo-200 p-3">Engineering Mathematics I</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">8.5</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">4</td>
                          <td className="border border-indigo-200 p-3 text-center text-blue-600 font-bold">34.0</td>
                        </tr>
                        <tr className="bg-indigo-50">
                          <td className="border border-indigo-200 p-3">Engineering Physics</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">9.0</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">3</td>
                          <td className="border border-indigo-200 p-3 text-center text-blue-600 font-bold">27.0</td>
                        </tr>
                        <tr>
                          <td className="border border-indigo-200 p-3">Programming in C</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">8.0</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">3</td>
                          <td className="border border-indigo-200 p-3 text-center text-blue-600 font-bold">24.0</td>
                        </tr>
                        <tr className="bg-indigo-50">
                          <td className="border border-indigo-200 p-3">Engineering Graphics</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">7.5</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">2</td>
                          <td className="border border-indigo-200 p-3 text-center text-blue-600 font-bold">15.0</td>
                        </tr>
                        <tr>
                          <td className="border border-indigo-200 p-3">Communication Skills</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">9.5</td>
                          <td className="border border-indigo-200 p-3 text-center font-semibold">2</td>
                          <td className="border border-indigo-200 p-3 text-center text-blue-600 font-bold">19.0</td>
                        </tr>
                        <tr className="bg-indigo-200 font-bold">
                          <td className="border border-indigo-300 p-3">TOTALS</td>
                          <td className="border border-indigo-300 p-3 text-center">—</td>
                          <td className="border border-indigo-300 p-3 text-center">14</td>
                          <td className="border border-indigo-300 p-3 text-center text-indigo-700">119.0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
                    <p className="text-lg font-bold text-indigo-900">
                      CGPA = 119.0 ÷ 14 = <span className="text-2xl text-indigo-600">8.50</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      This student achieved an excellent CGPA of 8.50, which qualifies as First Class with Distinction 
                      and meets the cut-off for most premium campus recruiters.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FaExclamationTriangle className="text-amber-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Common Calculation Mistakes to Avoid:</h4>
                      <ul className="text-sm space-y-1.5 text-gray-700">
                        <li>• <strong>Averaging grades without weights:</strong> Simply adding all grades and dividing by number of subjects ignores credit hours completely</li>
                        <li>• <strong>Excluding failed subjects:</strong> If you failed a subject (grade 0), it must still be included with its full credit weight</li>
                        <li>• <strong>Mixing different grading scales:</strong> Don't combine 10-point and 4-point grades in the same calculation</li>
                        <li>• <strong>Forgetting subjects:</strong> CGPA is cumulative across ALL semesters - missing even one course skews your result</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CGPA vs SGPA Section */}
            <section className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                CGPA vs SGPA: Understanding the Critical Difference
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <FaClipboardList className="text-blue-600" /> SGPA (Semester Grade Point Average)
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">
                    <strong>Definition:</strong> Grade point average for one individual semester only
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span>Calculated using subjects from that semester alone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span>Shows your performance in a specific time period</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span>Appears on each semester's grade sheet separately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span>Can fluctuate significantly between semesters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span>Useful for tracking semester-wise improvement</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                    <FaGraduationCap className="text-green-600" /> CGPA (Cumulative Grade Point Average)
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">
                    <strong>Definition:</strong> Overall grade point average across all completed semesters
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span>Calculated using ALL subjects from ALL semesters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span>Represents your overall academic standing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span>Used for final degree classification and transcripts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span>Becomes more stable as you complete more semesters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span>Primary metric for placements and admissions</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-lg font-bold text-purple-900 mb-3">Relationship Between SGPA and CGPA</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Your CGPA at any point is essentially the weighted average of all your SGPAs up to that semester. 
                  However, there are two ways to calculate CGPA:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-gray-900 mb-2">Method 1: Simple Average (Approximate)</h4>
                    <p className="text-gray-600 mb-2">
                      CGPA ≈ (SGPA₁ + SGPA₂ + ... + SGPAₙ) ÷ n
                    </p>
                    <p className="text-xs text-gray-500">
                      Works only if all semesters have equal total credits. Quick but often inaccurate.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-gray-900 mb-2">Method 2: Weighted Calculation (Accurate)</h4>
                    <p className="text-gray-600 mb-2">
                      CGPA = Σ(Grade × Credits) from ALL subjects ÷ Total Credits
                    </p>
                    <p className="text-xs text-gray-500">
                      Always accurate. Required when semester credit totals differ.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Improvement Strategies Section */}
            <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-md p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaRocket className="text-orange-600" />
                Strategic Ways to Improve Your CGPA
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  If your CGPA is lower than you'd like, don't panic. While improvement becomes harder in later semesters 
                  due to the cumulative nature of CGPA, strategic focus can still yield meaningful gains. Here's how:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border-2 border-orange-200 shadow-sm">
                    <h3 className="font-bold text-orange-900 mb-3 text-lg flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                      Target High-Credit Subjects
                    </h3>
                    <p className="text-sm">
                      A single point improvement in a 4-credit subject has twice the impact of the same improvement in 
                      a 2-credit subject. Identify your highest-credit courses each semester and allocate proportionally 
                      more study time to them. This maximizes the return on your effort.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border-2 border-orange-200 shadow-sm">
                    <h3 className="font-bold text-orange-900 mb-3 text-lg flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                      Avoid Backlogs at All Costs
                    </h3>
                    <p className="text-sm">
                      Failed subjects (grade 0) devastate your CGPA because they contribute zero points while their credits 
                      still count in the denominator. Even a mediocre pass (grade 5-6) is infinitely better than a fail. 
                      Use grace marks, re-evaluation, and supplementary exams to avoid zeros.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border-2 border-orange-200 shadow-sm">
                    <h3 className="font-bold text-orange-900 mb-3 text-lg flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                      Front-Load Your Efforts
                    </h3>
                    <p className="text-sm">
                      Early semesters have outsized impact on final CGPA. A strong start (8.5+ in first 2 semesters) 
                      creates cushion for later. Conversely, recovering from a weak start (below 6.5) requires exceptional 
                      performance (9.0+) in most remaining semesters - mathematically possible but very difficult.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border-2 border-orange-200 shadow-sm">
                    <h3 className="font-bold text-orange-900 mb-3 text-lg flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                      Retake Failed Courses Immediately
                    </h3>
                    <p className="text-sm">
                      Most universities allow you to retake failed subjects, replacing the zero with your new grade. 
                      Don't postpone this - retake in the very next semester while the material is still fresh. The 
                      CGPA boost from converting a 0 to even a 6 is substantial.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border-2 border-orange-200 shadow-sm">
                    <h3 className="font-bold text-orange-900 mb-3 text-lg flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">5</span>
                      Master Core Subjects
                    </h3>
                    <p className="text-sm">
                      Core/major subjects typically carry 3-4 credits each and appear every semester. Consistent 
                      performance (8+) in these subjects alone can maintain a respectable CGPA even if you're average 
                      in electives. Focus on fundamentals and don't skip classes.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border-2 border-orange-200 shadow-sm">
                    <h3 className="font-bold text-orange-900 mb-3 text-lg flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">6</span>
                      Use CGPA Projection Tools
                    </h3>
                    <p className="text-sm">
                      Calculate what scores you need in remaining semesters to reach your target CGPA. If you're at 
                      7.0 after 4 semesters and want 7.5 final, you need approximately 8.5+ in remaining 4 semesters. 
                      Set realistic, data-driven goals rather than vague intentions.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-red-200">
                  <h3 className="font-bold text-red-900 mb-3 text-lg">Reality Check: When Recovery is Difficult</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Mathematics doesn't lie. If you're at CGPA 5.5 after 6 semesters in an 8-semester program, reaching 
                    7.5 would require scoring 10.0 (perfect) in both remaining semesters - theoretically possible but 
                    practically unrealistic for most students.
                  </p>
                  <p className="text-sm text-gray-700">
                    In such cases, focus on: (1) Crossing minimum cut-offs (6.0-6.5), (2) Maximizing skills through 
                    projects and internships, (3) Building strong interview performance, (4) Considering off-campus 
                    opportunities where CGPA cut-offs may be more flexible. A mediocre CGPA doesn't seal your fate, 
                    but you'll need to compensate with exceptional practical skills.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions About CGPA
              </h2>
              <div className="space-y-4">
                {faqSchema.mainEntity.map((faq, index) => (
                  <details 
                    key={index} 
                    className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-300 transition-all group"
                  >
                    <summary className="font-bold text-gray-900 text-lg list-none flex items-center justify-between">
                      <span className="flex items-center gap-3">
                        <FaInfoCircle className="text-blue-600 flex-shrink-0" />
                        {faq.name}
                      </span>
                      <FaArrowRight className="text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                    </summary>
                    <p className="mt-4 text-gray-700 leading-relaxed pl-8">{faq.acceptedAnswer.text}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Calculators */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md p-8 border border-gray-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Academic Calculators</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <a 
                  href="/cgpa-to-percentage" 
                  className="block p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 hover:border-violet-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-violet-100 p-3 rounded-lg">
                      <FaChartLine className="text-2xl text-violet-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">CGPA to Percentage</h3>
                    <FaArrowRight className="text-violet-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Convert your CGPA to percentage equivalent for job applications and university requirements
                  </p>
                </a>

                <a 
                  href="/percentage-to-cgpa-calculator" 
                  className="block p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <FaCalculator className="text-2xl text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Percentage to CGPA</h3>
                    <FaArrowRight className="text-emerald-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Reverse conversion - find CGPA equivalent from percentage marks
                  </p>
                </a>

                <a 
                  href="/sgpa-to-percentage" 
                  className="block p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-amber-100 p-3 rounded-lg">
                      <FaStar className="text-2xl text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">SGPA to Percentage</h3>
                    <FaArrowRight className="text-amber-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Convert semester GPA to percentage for individual semester performance tracking
                  </p>
                </a>

                <a 
                  href="/marks-percentage-calculator" 
                  className="block p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FaAward className="text-2xl text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Marks Percentage</h3>
                    <FaArrowRight className="text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Calculate percentage from obtained marks and total marks instantly
                  </p>
                </a>

                <a 
                  href="/grade-calculator" 
                  className="block p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-pink-100 p-3 rounded-lg">
                      <FaTrophy className="text-2xl text-pink-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Grade Calculator</h3>
                    <FaArrowRight className="text-pink-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Calculate final grades with custom weightage for assignments, exams, and projects
                  </p>
                </a>

                <a 
                  href="/gpa-calculator" 
                  className="block p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <FaUniversity className="text-2xl text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">GPA Calculator</h3>
                    <FaArrowRight className="text-indigo-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Calculate GPA for US/Canadian universities with letter grade conversion
                  </p>
                </a>
              </div>
            </section>
          </div>

          {/* Expert Verification */}
          <ExpertBox 
            expertType="education"
            lastUpdated="February 2, 2026"
            calculatorName="CGPA Calculator"
          />

          {/* User Reviews */}
          <UserReviews calculatorType="cgpa" />
        </div>
      </div>
    </Layout>
  );
}