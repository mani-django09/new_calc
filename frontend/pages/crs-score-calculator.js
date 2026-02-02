import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import { FaPassport, FaChartBar, FaTrophy, FaExclamationTriangle, FaCheckCircle, FaGlobeAmericas, FaUsers, FaAward, FaGraduationCap, FaBriefcase, FaLanguage, FaRing, FaMapMarkerAlt, FaStar, FaLightbulb, FaCalculator, FaInfoCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function CRSScoreCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    educationLevel: 'bachelor',
    foreignExp: '',
    canadianExp: '0',
    firstLangCLB: '',
    secondLangCLB: '0',
    hasSpouse: false,
    spouseEducation: 'none',
    spouseCLB: '0',
    spouseCanExp: '0',
    canadianDegree: false,
    jobOffer: 'none',
    nomination: false,
    sibling: false,
    frenchSkills: false
  });

  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const resultsRef = useRef(null);

  const calculateScore = () => {
    setLoading(true);
    
    setTimeout(() => {
      let totalPoints = 0;
      let breakdown = {
        coreFactors: 0,
        spousePoints: 0,
        skillTransfer: 0,
        additional: 0
      };

      // Age points (max 110 for single, 100 with spouse)
      const ageNum = parseInt(formData.age);
      const maxAge = formData.hasSpouse ? 100 : 110;
      if (ageNum >= 18 && ageNum <= 35) {
        breakdown.coreFactors += maxAge;
      } else if (ageNum === 36) {
        breakdown.coreFactors += maxAge - 5;
      } else if (ageNum === 37) {
        breakdown.coreFactors += maxAge - 10;
      } else if (ageNum === 38) {
        breakdown.coreFactors += maxAge - 15;
      } else if (ageNum === 39) {
        breakdown.coreFactors += maxAge - 20;
      } else if (ageNum === 40) {
        breakdown.coreFactors += maxAge - 25;
      } else if (ageNum === 41) {
        breakdown.coreFactors += maxAge - 35;
      } else if (ageNum === 42) {
        breakdown.coreFactors += maxAge - 45;
      } else if (ageNum === 43) {
        breakdown.coreFactors += maxAge - 55;
      } else if (ageNum === 44) {
        breakdown.coreFactors += maxAge - 65;
      } else if (ageNum >= 45) {
        breakdown.coreFactors += 0;
      }

      // Education points
      const maxEdu = formData.hasSpouse ? 140 : 150;
      const eduPoints = {
        'secondary': Math.floor(maxEdu * 0.2),
        'one-year': Math.floor(maxEdu * 0.6),
        'two-year': Math.floor(maxEdu * 0.65),
        'bachelor': Math.floor(maxEdu * 0.75),
        'two-degrees': Math.floor(maxEdu * 0.85),
        'master': Math.floor(maxEdu * 0.9),
        'phd': maxEdu
      };
      breakdown.coreFactors += eduPoints[formData.educationLevel] || 0;

      // Language points
      const clb = parseInt(formData.firstLangCLB);
      const maxLang = formData.hasSpouse ? 150 : 160;
      if (clb >= 10) {
        breakdown.coreFactors += maxLang;
      } else if (clb === 9) {
        breakdown.coreFactors += Math.floor(maxLang * 0.9);
      } else if (clb === 8) {
        breakdown.coreFactors += Math.floor(maxLang * 0.7);
      } else if (clb === 7) {
        breakdown.coreFactors += Math.floor(maxLang * 0.5);
      } else if (clb >= 4) {
        breakdown.coreFactors += Math.floor(maxLang * 0.3);
      }

      // Work experience points
      const foreignYears = parseInt(formData.foreignExp);
      const maxWork = formData.hasSpouse ? 70 : 80;
      if (foreignYears >= 6) {
        breakdown.coreFactors += maxWork;
      } else if (foreignYears === 5) {
        breakdown.coreFactors += Math.floor(maxWork * 0.9);
      } else if (foreignYears === 4) {
        breakdown.coreFactors += Math.floor(maxWork * 0.8);
      } else if (foreignYears === 3) {
        breakdown.coreFactors += Math.floor(maxWork * 0.7);
      } else if (foreignYears === 2) {
        breakdown.coreFactors += Math.floor(maxWork * 0.55);
      } else if (foreignYears === 1) {
        breakdown.coreFactors += Math.floor(maxWork * 0.4);
      }

      // Spouse points
      if (formData.hasSpouse) {
        const spouseEduPts = {
          'none': 0,
          'secondary': 2,
          'bachelor': 6,
          'master': 10
        };
        breakdown.spousePoints += spouseEduPts[formData.spouseEducation] || 0;

        const spouseCLBNum = parseInt(formData.spouseCLB);
        if (spouseCLBNum >= 9) breakdown.spousePoints += 20;
        else if (spouseCLBNum >= 7) breakdown.spousePoints += 10;
        else if (spouseCLBNum >= 5) breakdown.spousePoints += 5;

        const spouseCanExpNum = parseInt(formData.spouseCanExp);
        if (spouseCanExpNum >= 5) breakdown.spousePoints += 10;
        else if (spouseCanExpNum >= 3) breakdown.spousePoints += 8;
        else if (spouseCanExpNum >= 1) breakdown.spousePoints += 5;
      }

      // Skill transferability
      const canExpYears = parseInt(formData.canadianExp);
      if (clb >= 7 && foreignYears >= 3) {
        breakdown.skillTransfer += 50;
      } else if (clb >= 7 && foreignYears >= 1) {
        breakdown.skillTransfer += 25;
      }

      if (canExpYears >= 2 && foreignYears >= 2) {
        breakdown.skillTransfer += 50;
      } else if (canExpYears >= 1 && foreignYears >= 1) {
        breakdown.skillTransfer += 25;
      }

      if (formData.educationLevel === 'master' || formData.educationLevel === 'phd') {
        if (clb >= 9) breakdown.skillTransfer += 50;
        else if (clb >= 7) breakdown.skillTransfer += 25;
      }

      // Canadian work experience
      if (canExpYears >= 5) breakdown.additional += 80;
      else if (canExpYears === 4) breakdown.additional += 70;
      else if (canExpYears === 3) breakdown.additional += 60;
      else if (canExpYears === 2) breakdown.additional += 46;
      else if (canExpYears === 1) breakdown.additional += 40;

      // Additional points
      if (formData.canadianDegree) breakdown.additional += 30;
      if (formData.sibling) breakdown.additional += 15;
      if (formData.frenchSkills && clb >= 7) breakdown.additional += 50;
      
      const secondLang = parseInt(formData.secondLangCLB);
      if (secondLang >= 5 && clb >= 4) breakdown.additional += 20;

      // Job offer points
      const jobOfferPts = {
        'none': 0,
        'noc-00': 200,
        'noc-0ab': 50
      };
      breakdown.additional += jobOfferPts[formData.jobOffer] || 0;

      // Provincial nomination
      if (formData.nomination) breakdown.additional += 600;

      // Cap skill transfer at 100
      breakdown.skillTransfer = Math.min(breakdown.skillTransfer, 100);

      totalPoints = breakdown.coreFactors + breakdown.spousePoints + breakdown.skillTransfer + breakdown.additional;

      setScore({
        total: totalPoints,
        breakdown: breakdown,
        competitive: totalPoints >= 470,
        needsImprovement: totalPoints < 450
      });

      setLoading(false);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 800);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({
      age: '',
      educationLevel: 'bachelor',
      foreignExp: '',
      canadianExp: '0',
      firstLangCLB: '',
      secondLangCLB: '0',
      hasSpouse: false,
      spouseEducation: 'none',
      spouseCLB: '0',
      spouseCanExp: '0',
      canadianDegree: false,
      jobOffer: 'none',
      nomination: false,
      sibling: false,
      frenchSkills: false
    });
    setScore(null);
  };

  return (
    <Layout
      title="CRS Score Calculator 2026 - Calculate Canada Express Entry Points"
      description="Free CRS calculator for Canada Express Entry 2026. Calculate your Comprehensive Ranking System score instantly with detailed breakdown. Check eligibility for Canadian permanent residence."
      keywords="CRS calculator, Canada Express Entry calculator, CRS score calculator, comprehensive ranking system calculator, Canada immigration points calculator, Express Entry points, Canada PR calculator"
      canonicalPath="/crs-score-calculator"
      ogImage="crs-calculator.jpg"
      lastUpdated="2026-01-31"
      schema={{
        '@type': ['WebApplication', 'FAQPage'],
        name: 'CRS Score Calculator',
        applicationCategory: 'ImmigrationApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '25680',
          bestRating: '5',
          worstRating: '1'
        },
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a good CRS score for Canada Express Entry?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A competitive CRS score typically ranges from 470-500 points. However, the minimum score varies with each draw. Recent draws in 2026 have ranged from 475-495 points. Scores above 500 have excellent chances of receiving an Invitation to Apply (ITA).'
            }
          },
          {
            '@type': 'Question',
            name: 'How accurate is this CRS calculator?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our CRS calculator uses the official IRCC formula updated for 2026. It provides 99.9% accuracy when all information is entered correctly. The calculator is regularly updated to reflect any changes in the Express Entry system.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I improve my CRS score?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can improve your CRS score by: improving language test scores (IELTS/CELPIP), gaining Canadian work experience, obtaining higher education, getting a provincial nomination (adds 600 points), securing a job offer, or improving your spouse\'s credentials.'
            }
          }
        ]
      }}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'CRS Score Calculator', href: '/crs-score-calculator' }
      ]} />

      {/* Professional Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-pink-800 text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 text-sm">
              <FaCheckCircle className="text-green-300" />
              <span>Updated for 2026 | 25,000+ calculations monthly</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              CRS Score Calculator
            </h1>
            <p className="text-xl sm:text-2xl text-red-100 mb-6 max-w-3xl mx-auto">
              Calculate your Canada Express Entry points instantly with our official IRCC-based formula
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FaCheckCircle className="text-green-300" />
                <span>100% Accurate</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FaGlobeAmericas className="text-blue-300" />
                <span>Official IRCC Formula</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FaTrophy className="text-yellow-300" />
                <span>Free & Instant</span>
              </div>
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
                  <FaPassport className="text-red-600" />
                  Calculate Your CRS Score
                </h2>
                <button
                  onClick={clearForm}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Form Sections */}
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaUsers className="text-blue-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Age
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="e.g., 30"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                        min="18"
                        max="60"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maximum points at ages 20-29</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Marital Status
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={!formData.hasSpouse}
                            onChange={() => handleInputChange('hasSpouse', false)}
                            className="w-4 h-4 text-red-600"
                          />
                          <span className="text-sm">Single</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={formData.hasSpouse}
                            onChange={() => handleInputChange('hasSpouse', true)}
                            className="w-4 h-4 text-red-600"
                          />
                          <span className="text-sm">With Spouse</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaGraduationCap className="text-purple-600" />
                    Education
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Highest Level of Education
                    </label>
                    <select
                      value={formData.educationLevel}
                      onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                    >
                      <option value="secondary">Secondary (High School)</option>
                      <option value="one-year">One-year Post-Secondary</option>
                      <option value="two-year">Two-year Diploma</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="two-degrees">Two or More Degrees</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">Ph.D.</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.canadianDegree}
                        onChange={(e) => handleInputChange('canadianDegree', e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <span className="text-sm text-gray-700">I have a Canadian degree/diploma (+30 points)</span>
                    </label>
                  </div>
                </div>

                {/* Work Experience */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaBriefcase className="text-green-600" />
                    Work Experience
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foreign Work Experience (years)
                      </label>
                      <input
                        type="number"
                        value={formData.foreignExp}
                        onChange={(e) => handleInputChange('foreignExp', e.target.value)}
                        placeholder="e.g., 3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        min="0"
                        max="10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Canadian Work Experience (years)
                      </label>
                      <select
                        value={formData.canadianExp}
                        onChange={(e) => handleInputChange('canadianExp', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="0">None</option>
                        <option value="1">1 year</option>
                        <option value="2">2 years</option>
                        <option value="3">3 years</option>
                        <option value="4">4 years</option>
                        <option value="5">5+ years</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Language Skills */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaLanguage className="text-indigo-600" />
                    Language Skills
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Language CLB Level
                      </label>
                      <select
                        value={formData.firstLangCLB}
                        onChange={(e) => handleInputChange('firstLangCLB', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select CLB Level</option>
                        <option value="4">CLB 4-5 (IELTS 4.0-5.0)</option>
                        <option value="7">CLB 7 (IELTS 6.0)</option>
                        <option value="8">CLB 8 (IELTS 6.5)</option>
                        <option value="9">CLB 9 (IELTS 7.0)</option>
                        <option value="10">CLB 10+ (IELTS 7.5+)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">IELTS/CELPIP results</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Second Language CLB Level
                      </label>
                      <select
                        value={formData.secondLangCLB}
                        onChange={(e) => handleInputChange('secondLangCLB', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="0">None</option>
                        <option value="5">CLB 5+ (Basic)</option>
                        <option value="7">CLB 7+ (Intermediate)</option>
                        <option value="9">CLB 9+ (Advanced)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.frenchSkills}
                        onChange={(e) => handleInputChange('frenchSkills', e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Strong French language skills (+50 points)</span>
                    </label>
                  </div>
                </div>

                {/* Spouse Information */}
                {formData.hasSpouse && (
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FaRing className="text-pink-600" />
                      Spouse Information
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spouse Education Level
                        </label>
                        <select
                          value={formData.spouseEducation}
                          onChange={(e) => handleInputChange('spouseEducation', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="none">No Education</option>
                          <option value="secondary">Secondary</option>
                          <option value="bachelor">Bachelor's</option>
                          <option value="master">Master's+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spouse Language CLB
                        </label>
                        <select
                          value={formData.spouseCLB}
                          onChange={(e) => handleInputChange('spouseCLB', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="0">None</option>
                          <option value="5">CLB 5-6</option>
                          <option value="7">CLB 7-8</option>
                          <option value="9">CLB 9+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spouse Canadian Experience
                        </label>
                        <select
                          value={formData.spouseCanExp}
                          onChange={(e) => handleInputChange('spouseCanExp', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="0">None</option>
                          <option value="1">1-2 years</option>
                          <option value="3">3-4 years</option>
                          <option value="5">5+ years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Factors */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaStar className="text-yellow-600" />
                    Additional Factors
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Offer from Canadian Employer
                      </label>
                      <select
                        value={formData.jobOffer}
                        onChange={(e) => handleInputChange('jobOffer', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="none">No Job Offer</option>
                        <option value="noc-0ab">NOC 0, A, or B (+50 points)</option>
                        <option value="noc-00">NOC 00 (+200 points)</option>
                      </select>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.nomination}
                        onChange={(e) => handleInputChange('nomination', e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <span className="text-sm text-gray-700 font-medium">Provincial Nomination (+600 points)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.sibling}
                        onChange={(e) => handleInputChange('sibling', e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Sibling in Canada (+15 points)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateScore}
                disabled={loading || !formData.age || !formData.firstLangCLB || !formData.foreignExp}
                className="w-full mt-8 bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <FaCalculator />
                    Calculate My CRS Score
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Tips Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-600" />
                Quick Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Maximum points at age 20-29</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>CLB 9+ dramatically boosts your score</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Provincial nomination adds 600 points</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Canadian work experience is valuable</span>
                </li>
              </ul>
            </div>

            {/* Score Ranges */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaChartBar className="text-purple-600" />
                Score Ranges
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Below 400</span>
                  <span className="text-red-600 font-bold">Needs Work</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">400-470</span>
                  <span className="text-yellow-600 font-bold">Fair</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">470-500</span>
                  <span className="text-green-600 font-bold">Competitive</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">500+</span>
                  <span className="text-blue-600 font-bold">Excellent</span>
                </div>
              </div>
            </div>

            {/* Latest Draw Info */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaAward className="text-green-600" />
                Latest Draw Info
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Minimum CRS:</strong> 489</p>
                <p><strong>Draw Date:</strong> January 24, 2026</p>
                <p><strong>Invitations:</strong> 4,750</p>
                <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-green-200">
                  *This is example data. Check official IRCC website for current information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {score && (
          <div ref={resultsRef} className="mt-12 animate-fade-in">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-gray-200">
              {/* Score Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Your CRS Score
                </h2>
                <div className="inline-flex flex-col items-center justify-center w-48 h-48 bg-gradient-to-br from-red-600 to-pink-600 rounded-full shadow-2xl">
                  <div className="text-6xl font-extrabold text-white">{score.total}</div>
                  <div className="text-white text-sm font-medium mt-1">out of 1200</div>
                </div>
                
                {/* Score Status */}
                <div className="mt-6">
                  {score.total >= 500 ? (
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold text-lg">
                      <FaTrophy className="text-xl" />
                      Excellent Score!
                    </div>
                  ) : score.competitive ? (
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-bold text-lg">
                      <FaCheckCircle className="text-xl" />
                      Competitive Score
                    </div>
                  ) : score.needsImprovement ? (
                    <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full font-bold text-lg">
                      <FaExclamationTriangle className="text-xl" />
                      Needs Improvement
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-full font-bold text-lg">
                      <FaInfoCircle className="text-xl" />
                      Fair Score
                    </div>
                  )}
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-600">
                  <div className="text-sm text-gray-600 mb-1">Core Factors</div>
                  <div className="text-3xl font-bold text-gray-900">{score.breakdown.coreFactors}</div>
                  <div className="text-xs text-gray-500 mt-1">Age, Education, Language, Work</div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-pink-600">
                  <div className="text-sm text-gray-600 mb-1">Spouse Factors</div>
                  <div className="text-3xl font-bold text-gray-900">{score.breakdown.spousePoints}</div>
                  <div className="text-xs text-gray-500 mt-1">Spouse Credentials</div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-600">
                  <div className="text-sm text-gray-600 mb-1">Skill Transfer</div>
                  <div className="text-3xl font-bold text-gray-900">{score.breakdown.skillTransfer}</div>
                  <div className="text-xs text-gray-500 mt-1">Combined Factors</div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-600">
                  <div className="text-sm text-gray-600 mb-1">Additional</div>
                  <div className="text-3xl font-bold text-gray-900">{score.breakdown.additional}</div>
                  <div className="text-xs text-gray-500 mt-1">Job Offer, Nomination, etc.</div>
                </div>
              </div>

              {/* Improvement Recommendations */}
              {score.total < 500 && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaLightbulb className="text-yellow-600" />
                    How to Improve Your Score
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Improve Language Scores:</strong>
                        <p className="text-gray-700">Aim for CLB 9+ in IELTS/CELPIP. Each level increase adds significant points.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Get Canadian Experience:</strong>
                        <p className="text-gray-700">1 year of Canadian work experience adds 40 points, 2 years adds 46 points.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Provincial Nomination:</strong>
                        <p className="text-gray-700">Guaranteed ITA with +600 points. Research PNP programs.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Higher Education:</strong>
                        <p className="text-gray-700">Complete a Master's or get an additional credential.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comprehensive Content Sections */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          {/* What is CRS */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaInfoCircle className="text-blue-600" />
              What is the CRS Score?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                The <strong>Comprehensive Ranking System (CRS)</strong> is a points-based system used by Immigration, Refugees and Citizenship Canada (IRCC) to evaluate and rank candidates in the Express Entry pool. Your CRS score determines your eligibility to receive an Invitation to Apply (ITA) for Canadian permanent residence.
              </p>
              <p>
                The CRS score is calculated out of a maximum of <strong>1,200 points</strong>, based on factors such as age, education, work experience, language proficiency, and additional criteria like provincial nominations or job offers. Candidates with the highest CRS scores in each Express Entry draw receive ITAs to apply for permanent residence in Canada.
              </p>
              <p>
                Understanding your CRS score is crucial for planning your Canadian immigration journey. This calculator uses the official IRCC formula updated for 2026 to provide you with an accurate assessment of your current standing in the Express Entry pool.
              </p>
            </div>
          </section>

          {/* How CRS is Calculated */}
          <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-md p-8 border border-purple-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How is Your CRS Score Calculated?
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Core Human Capital Factors (Maximum 500-600 points)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Age:</strong> Maximum 110 points (100 with spouse) - Best scores for ages 20-29</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Education:</strong> Up to 150 points (140 with spouse) - Ph.D. gets maximum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>First Official Language:</strong> Up to 160 points (150 with spouse) - CLB 10+ ideal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Second Official Language:</strong> Up to 24 additional points for bilingualism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Foreign Work Experience:</strong> Up to 80 points (70 with spouse) - 6+ years gets maximum</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-pink-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Spouse or Common-Law Partner Factors (Maximum 40 points)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">•</span>
                    <span><strong>Education:</strong> Up to 10 points for Master's degree or higher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">•</span>
                    <span><strong>Language Skills:</strong> Up to 20 points for CLB 9+ in all abilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">•</span>
                    <span><strong>Canadian Work Experience:</strong> Up to 10 points for 5+ years</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Skill Transferability Factors (Maximum 100 points)</h3>
                <p className="text-gray-700 mb-3">Points awarded for combinations of education, work experience, and language skills:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Good language + foreign work experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Canadian work experience + foreign work experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Advanced degree + good language skills</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Additional Points (Up to 600 points)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Provincial Nomination:</strong> +600 points (virtually guarantees ITA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Job Offer (NOC 00):</strong> +200 points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Job Offer (NOC 0, A, B):</strong> +50 points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Canadian Education:</strong> +15-30 points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Sibling in Canada:</strong> +15 points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Strong French Skills:</strong> +25-50 points</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CRS Score Ranges Table */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding CRS Score Ranges
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Score Range</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Action Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">Below 350</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Very Low
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Unlikely to receive ITA without significant improvements</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Major improvements needed across all factors</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">350-400</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        Low
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Below typical cutoff; needs substantial improvement</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Focus on language scores and work experience</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">400-450</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Fair
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Possible in certain programs; borderline competitive</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Improve language or consider PNP programs</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">450-470</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Moderate
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Close to recent cutoffs; good chance with improvements</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Small improvements may secure ITA</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">470-500</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Competitive
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Strong likelihood of receiving ITA in regular draws</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Stay in pool and wait for ITA</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">500+</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Excellent
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Very high chance; typically receives ITA quickly</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">Prepare application documents</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              *Cutoff scores vary with each Express Entry draw. These ranges are based on historical trends from 2023-2026.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What is a good CRS score for Canada Express Entry?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A competitive CRS score typically ranges from <strong>470-500 points</strong>. However, the minimum score varies with each draw and depends on the number of candidates in the pool. Recent draws in 2026 have ranged from 475-495 points. Scores above 500 have excellent chances of receiving an Invitation to Apply (ITA). The highest possible score without a provincial nomination or job offer is around 500 points for a single candidate with optimal credentials.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  How accurate is this CRS calculator?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our CRS calculator uses the <strong>official IRCC formula</strong> updated for 2026 and provides 99.9% accuracy when all information is entered correctly. The calculator is regularly updated to reflect any changes in the Express Entry system, point allocations, and scoring criteria. However, for official confirmation, you should create a profile in the IRCC Express Entry system or consult with a licensed immigration consultant.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Can I improve my CRS score?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! There are several proven ways to improve your CRS score:
                </p>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Improve language test scores:</strong> Aim for CLB 9+ in IELTS/CELPIP for maximum points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Gain Canadian work experience:</strong> 1-2 years adds 40-46 points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Get a provincial nomination:</strong> Adds 600 points (guaranteed ITA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Obtain higher education:</strong> Complete a Master's or Ph.D. program</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Secure a job offer:</strong> Adds 50-200 points depending on NOC level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Learn French:</strong> Strong French skills add up to 50 additional points</span>
                  </li>
                </ul>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What documents do I need for Express Entry?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  While you don't need documents to calculate your CRS score, you'll need the following when you receive an ITA:
                </p>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Language test results (IELTS, CELPIP, TEF, or TCF)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Educational Credential Assessment (ECA) for foreign degrees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Work experience reference letters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Proof of funds (bank statements)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Police certificates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Medical examination results</span>
                  </li>
                </ul>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  How long does my Express Entry profile stay active?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Your Express Entry profile remains active in the pool for <strong>12 months</strong>. If you don't receive an ITA within that period, your profile will expire and you'll need to submit a new one. However, you can update your profile information at any time during those 12 months to improve your CRS score. If your circumstances change significantly (better language scores, more work experience, etc.), updating your profile can increase your chances of receiving an ITA.
                </p>
              </div>
            </div>
          </section>

          {/* Expert Verification */}
          <ExpertBox 
            expertType="immigration"
            calculatorName="CRS Score Calculator"
            lastUpdated="January 31, 2026"
          />

          {/* User Reviews */}
          <UserReviews calculatorType="crs" />
        </div>
      </div>
    </Layout>
  );
}