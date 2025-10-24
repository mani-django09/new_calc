import { useState, useRef } from 'react';
import { FaUserCircle, FaStar, FaChartBar, FaTrophy, FaExclamationTriangle, FaCheckDouble, FaFire, FaGlobeAmericas, FaClock, FaUsers, FaAward, FaCalculator, FaEnvelope, FaPhone, FaGraduationCap, FaPassport, FaHome } from 'react-icons/fa';

// Simplified Layout Component (inline)
function Layout({ children, title }) {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-xl shadow-lg">
                  <FaCalculator className="text-xl text-white" />
                </div>
                <div>
                  <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                    Calculators
                  </span>
                  <span className="text-xs text-gray-500 block -mt-1">.me.uk</span>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <a href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</a>
                <a href="/cgpa-calculator" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
                  <FaGraduationCap className="text-blue-600" />
                  CGPA
                </a>
                <a href="/crs-calculator" className="text-indigo-600 font-bold flex items-center gap-2">
                  <FaPassport className="text-red-600" />
                  CRS
                </a>
                <a href="/mortgage-payoff-calculator" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
                  <FaHome className="text-green-600" />
                  Mortgage
                </a>
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-xl">
                    <FaCalculator className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Calculators</h3>
                    <span className="text-xs text-gray-400">.me.uk</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Your trusted platform for free, accurate online calculators.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">→ Home</a></li>
                  <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">→ About Us</a></li>
                  <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">→ Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">Popular Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/cgpa-calculator" className="text-gray-400 hover:text-white transition-colors">→ CGPA Calculator</a></li>
                  <li><a href="/crs-calculator" className="text-gray-400 hover:text-white transition-colors">→ CRS Calculator</a></li>
                  <li><a href="/mortgage-payoff-calculator" className="text-gray-400 hover:text-white transition-colors">→ Mortgage Calculator</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">Contact</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-indigo-400" />
                    <a href="mailto:support@calculators.me.uk" className="text-gray-400 hover:text-white transition-colors">
                      support@calculators.me.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-6 text-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Calculators.me.uk. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
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
    <Layout title="CRS Score Calculator - Canada Express Entry">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <FaFire className="text-yellow-300" />
                <span className="text-sm font-semibold">Trusted by 12,000+ immigration candidates monthly</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
                CRS Score Calculator
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
                Instantly discover your Express Entry CRS score and learn what it takes to qualify for Canadian permanent residence. Fast, accurate, and completely free.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <FaCheckDouble className="text-green-300" />
                  <span>Official IRCC Formula</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-green-300" />
                  <span>Results in 30 Seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-green-300" />
                  <span>No Registration Required</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-indigo-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FaUserCircle className="text-indigo-600 text-xl" />
                  </div>
                  Personal Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How old are you?
                    </label>
                    <input
                      type="number"
                      min="18"
                      max="60"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="e.g., 28"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ages 20-29 get maximum points</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Highest Education Completed
                    </label>
                    <select
                      value={formData.educationLevel}
                      onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    >
                      <option value="secondary">High School Diploma</option>
                      <option value="one-year">1-Year Post-Secondary Certificate</option>
                      <option value="two-year">2-Year Diploma/Degree</option>
                      <option value="bachelor">Bachelor's Degree (3+ years)</option>
                      <option value="two-degrees">Two or More Degrees</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">Doctoral Degree (PhD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Foreign Work Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={formData.foreignExp}
                      onChange={(e) => handleInputChange('foreignExp', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="e.g., 3"
                    />
                    <p className="text-xs text-gray-500 mt-1">Skilled work outside Canada</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Canadian Work Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={formData.canadianExp}
                      onChange={(e) => handleInputChange('canadianExp', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum 80 additional points</p>
                  </div>
                </div>
              </div>

              {/* Language Skills Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-green-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaGlobeAmericas className="text-green-600 text-xl" />
                  </div>
                  Language Proficiency
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Official Language (CLB Level)
                    </label>
                    <select
                      value={formData.firstLangCLB}
                      onChange={(e) => handleInputChange('firstLangCLB', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    >
                      <option value="">Select CLB level...</option>
                      <option value="10">CLB 10+ (IELTS 8.0+)</option>
                      <option value="9">CLB 9 (IELTS 7.0-7.5)</option>
                      <option value="8">CLB 8 (IELTS 6.5)</option>
                      <option value="7">CLB 7 (IELTS 6.0)</option>
                      <option value="6">CLB 6 (IELTS 5.5)</option>
                      <option value="5">CLB 5 (IELTS 5.0)</option>
                      <option value="4">CLB 4 (IELTS 4.5)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">English (IELTS/CELPIP) or French (TEF/TCF)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Second Official Language (CLB Level)
                    </label>
                    <select
                      value={formData.secondLangCLB}
                      onChange={(e) => handleInputChange('secondLangCLB', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    >
                      <option value="0">None / Not tested</option>
                      <option value="7">CLB 7+ (Good proficiency)</option>
                      <option value="5">CLB 5-6 (Basic proficiency)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Bonus: +20 points for bilingualism</p>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3 cursor-pointer bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.frenchSkills}
                      onChange={(e) => handleInputChange('frenchSkills', e.target.checked)}
                      className="w-5 h-5 text-indigo-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Strong French skills (CLB 7+) with English proficiency
                      <span className="ml-2 text-indigo-600 font-semibold">+50 points</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Spouse/Partner Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-pink-500">
                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasSpouse}
                      onChange={(e) => handleInputChange('hasSpouse', e.target.checked)}
                      className="w-6 h-6 text-pink-600 rounded"
                    />
                    <span className="text-xl font-bold text-gray-900">
                      I'm bringing my spouse/partner to Canada
                    </span>
                  </label>
                </div>

                {formData.hasSpouse && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spouse's Education
                        </label>
                        <select
                          value={formData.spouseEducation}
                          onChange={(e) => handleInputChange('spouseEducation', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500"
                        >
                          <option value="none">Less than Bachelor's</option>
                          <option value="secondary">High School</option>
                          <option value="bachelor">Bachelor's Degree</option>
                          <option value="master">Master's or PhD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spouse's CLB Level
                        </label>
                        <select
                          value={formData.spouseCLB}
                          onChange={(e) => handleInputChange('spouseCLB', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500"
                        >
                          <option value="0">No test / Below CLB 4</option>
                          <option value="9">CLB 9+</option>
                          <option value="7">CLB 7-8</option>
                          <option value="5">CLB 5-6</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spouse's Canadian Work (Years)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={formData.spouseCanExp}
                          onChange={(e) => handleInputChange('spouseCanExp', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Factors Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-purple-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaAward className="text-purple-600 text-xl" />
                  </div>
                  Bonus Factors
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.canadianDegree}
                        onChange={(e) => handleInputChange('canadianDegree', e.target.checked)}
                        className="w-5 h-5 text-purple-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Canadian post-secondary credential (diploma/// CONTINUATION OF CRS CALCULATOR CODE - Place this after line 500

degree)
                      </span>
                    </div>
                    <span className="text-purple-600 font-bold">+30</span>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.sibling}
                        onChange={(e) => handleInputChange('sibling', e.target.checked)}
                        className="w-5 h-5 text-purple-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Brother/sister who is Canadian citizen or PR
                      </span>
                    </div>
                    <span className="text-purple-600 font-bold">+15</span>
                  </label>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valid Job Offer in Canada
                    </label>
                    <select
                      value={formData.jobOffer}
                      onChange={(e) => handleInputChange('jobOffer', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500"
                    >
                      <option value="none">No job offer</option>
                      <option value="noc-00">NOC 00 (Senior management) - +200 points</option>
                      <option value="noc-0ab">NOC 0, A, or B (Skilled position) - +50 points</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Must be LMIA-approved or LMIA-exempt</p>
                  </div>

                  <label className="flex items-center justify-between cursor-pointer bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-2 border-yellow-300 hover:border-yellow-400 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.nomination}
                        onChange={(e) => handleInputChange('nomination', e.target.checked)}
                        className="w-5 h-5 text-yellow-600 rounded"
                      />
                      <span className="text-sm font-bold text-gray-800">
                        Provincial Nomination (PNP)
                      </span>
                    </div>
                    <span className="text-yellow-700 font-black text-lg">+600</span>
                  </label>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateScore}
                disabled={loading || !formData.age || !formData.foreignExp || !formData.firstLangCLB}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Calculating Your Score...</span>
                  </>
                ) : (
                  <>
                    <FaChartBar />
                    <span>Calculate My CRS Score</span>
                  </>
                )}
              </button>

              <button
                onClick={resetCalculator}
                className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
              >
                Reset Calculator
              </button>

              {/* Results Section */}
              {score && (
                <div ref={resultsRef} className="space-y-6">
                  {/* Main Score Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-indigo-600">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-4">
                        <FaTrophy className="text-indigo-600" />
                        <span className="text-sm font-semibold text-indigo-600">Your CRS Score Result</span>
                      </div>
                      
                      <div className="text-7xl font-black text-gray-900 mb-2">
                        {score.total}
                      </div>
                      <p className="text-lg text-gray-600">out of 1,200 points</p>
                    </div>

                    {/* Score Status Alert */}
                    {score.competitive ? (
                      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <FaStar className="text-2xl text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-green-900 mb-2">Excellent Score - High Chance of ITA!</h3>
                            <p className="text-green-800 text-sm leading-relaxed">
                              Your score is above the recent cutoff range (typically 470-540). You're in a strong position to receive an Invitation to Apply in upcoming Express Entry draws. Make sure your profile is complete and up-to-date!
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : score.needsImprovement ? (
                      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <FaExclamationTriangle className="text-2xl text-orange-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-orange-900 mb-2">Room for Improvement</h3>
                            <p className="text-orange-800 text-sm leading-relaxed">
                              Your score is below recent cutoffs. Focus on improving language scores (aim for CLB 9+), gaining Canadian experience, or pursuing a provincial nomination to significantly boost your chances.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FaCheckDouble className="text-2xl text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-blue-900 mb-2">Competitive Score</h3>
                            <p className="text-blue-800 text-sm leading-relaxed">
                              You're close to the typical cutoff range. Consider retaking language tests for higher scores or gaining additional work experience to improve your competitiveness.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Score Breakdown Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-600">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FaChartBar className="text-purple-600 text-xl" />
                      </div>
                      Points Breakdown
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-semibold text-gray-900">Core/Human Capital Factors</span>
                          <p className="text-xs text-gray-500 mt-1">Age, Education, Language, Work Experience</p>
                        </div>
                        <span className="text-3xl font-bold text-indigo-600">{score.breakdown.coreFactors}</span>
                      </div>
                      
                      {formData.hasSpouse && (
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-semibold text-gray-900">Spouse/Partner Points</span>
                            <p className="text-xs text-gray-500 mt-1">Accompanying spouse factors</p>
                          </div>
                          <span className="text-3xl font-bold text-pink-600">{score.breakdown.spousePoints}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-semibold text-gray-900">Skill Transferability</span>
                          <p className="text-xs text-gray-500 mt-1">Combinations of education, language & experience</p>
                        </div>
                        <span className="text-3xl font-bold text-green-600">{score.breakdown.skillTransfer}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-semibold text-gray-900">Additional Points</span>
                          <p className="text-xs text-gray-500 mt-1">PNP, Job offer, Canadian education, etc.</p>
                        </div>
                        <span className="text-3xl font-bold text-purple-600">{score.breakdown.additional}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total CRS Score</span>
                        <span className="text-4xl font-black text-indigo-600">{score.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-600">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FaAward className="text-green-600 text-xl" />
                      </div>
                      Recommended Next Steps
                    </h3>
                    
                    <div className="space-y-4">
                      {score.total < 500 && parseInt(formData.firstLangCLB) < 9 && (
                        <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Improve Your Language Scores</h4>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              Moving from CLB 7 to CLB 9 can add 40+ points to your score. Invest time in IELTS/CELPIP preparation courses and practice tests.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {parseInt(formData.canadianExp) === 0 && (
                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                            {score.total < 500 && parseInt(formData.firstLangCLB) < 9 ? '2' : '1'}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Gain Canadian Work Experience</h4>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              Even 1 year of Canadian work experience adds 40+ points and makes you eligible for Canadian Experience Class (CEC) draws with lower cutoffs.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {!formData.nomination && (
                        <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                            {(score.total < 500 && parseInt(formData.firstLangCLB) < 9) && parseInt(formData.canadianExp) === 0 ? '3' : 
                             (score.total < 500 && parseInt(formData.firstLangCLB) < 9) || parseInt(formData.canadianExp) === 0 ? '2' : '1'}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Explore Provincial Nominee Programs (PNP)</h4>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              A provincial nomination adds 600 points, virtually guaranteeing an ITA. Research programs in provinces that match your occupation and qualifications.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {formData.secondLangCLB === '0' && (
                        <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                            {[(score.total < 500 && parseInt(formData.firstLangCLB) < 9), parseInt(formData.canadianExp) === 0, !formData.nomination].filter(Boolean).length + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Consider Learning French</h4>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              Strong French proficiency (CLB 7+) can add 25-50 bonus points. Canada also conducts French-language draws with lower CRS cutoffs.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - CHANGED: Removed sticky positioning */}
            <div className="lg:col-span-1 space-y-6">
              {/* Latest Draw Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaClock className="text-indigo-600" />
                  Recent Draw Information
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
                    <p className="text-xs text-gray-600 mb-1">All Programs Draw</p>
                    <p className="text-2xl font-bold text-indigo-600">489</p>
                    <p className="text-xs text-gray-500 mt-1">Minimum CRS (Last draw)</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <p className="text-xs text-gray-600 mb-1">PNP Category</p>
                    <p className="text-2xl font-bold text-green-600">688</p>
                    <p className="text-xs text-gray-500 mt-1">Minimum CRS (Last draw)</p>
                  </div>

                  <div className="text-xs text-gray-500 text-center pt-2 border-t">
                    Draws typically occur every 2 weeks
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">💡 Pro Insight</p>
                  <p className="text-xs text-gray-700">
                    Candidates with scores 470+ have received ITAs in recent general draws.
                  </p>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Score Maximization Tips</h3>
                
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex gap-3">
                    <span className="text-purple-600 font-bold">→</span>
                    <p>Language is king: CLB 9+ makes the biggest difference</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-purple-600 font-bold">→</span>
                    <p>Age 20-29 gets maximum points (110)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-purple-600 font-bold">→</span>
                    <p>3+ years work experience maxes out that category</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-purple-600 font-bold">→</span>
                    <p>Canadian degree adds 30 bonus points</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-purple-600 font-bold">→</span>
                    <p>PNP is the fastest route if score is low</p>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-3">Ready to Apply?</h3>
                <p className="text-sm text-indigo-100 mb-4">
                  Once you know your score, create your Express Entry profile on the IRCC website.
                </p>
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-white text-indigo-600 font-bold py-3 px-4 rounded-lg hover:bg-indigo-50 transition-all"
                >
                  Visit IRCC Official Site
                </a>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Understanding Your CRS Score: The Complete Breakdown
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Your Comprehensive Ranking System (CRS) score determines whether you'll receive an Invitation to Apply (ITA) for permanent residence through Express Entry.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                  Why CRS Scores Matter More Than Ever
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Canada's Express Entry system isn't first-come, first-served. It's a competitive pool where candidates are ranked. Recent cutoff scores have been between 470-540 points for all-program draws.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
                  <h4 className="font-bold text-gray-900 mb-3">Real-World Impact</h4>
                  <p className="text-gray-700 text-base">
                    A 30-point difference could mean months or years of waiting time. That's why knowing your score and how to improve it is crucial.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                  The Four Pillars of Your CRS Score
                </h3>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200">
                    <h4 className="font-bold text-indigo-900 mb-3 text-lg">Core Factors (Max 600)</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Age: Up to 110 points</li>
                      <li>• Education: Up to 150 points</li>
                      <li>• Language: Up to 160 points</li>
                      <li>• Work Experience: Up to 80 points</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border-2 border-pink-200">
                    <h4 className="font-bold text-pink-900 mb-3 text-lg">Spouse Factors (Max 40)</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Education: Up to 10 points</li>
                      <li>• Language: Up to 20 points</li>
                      <li>• Canadian Work: Up to 10 points</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                    <h4 className="font-bold text-green-900 mb-3 text-lg">Skill Transferability (Max 100)</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Education + Language</li>
                      <li>• Foreign Work + Language</li>
                      <li>• Canadian Work + Foreign Work</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border-2 border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-3 text-lg">Additional Factors (Max 600)</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Provincial Nomination: 600 points</li>
                      <li>• Job Offer: 50-200 points</li>
                      <li>• Canadian Education: 15-30 points</li>
                      <li>• French Proficiency: 25-50 points</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl my-12 text-center">
                  <h3 className="text-2xl font-bold mb-4">Take Action on Your Immigration Journey</h3>
                  <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                    Now that you know your CRS score, you're ahead of thousands of candidates who haven't done this calculation.
                  </p>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-indigo-50 transition-all inline-flex items-center gap-2"
                  >
                    <FaChartBar />
                    Recalculate My Score
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Add animation styles
const styles = `
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
`;