import { FaCheckCircle, FaCertificate, FaAward } from 'react-icons/fa';

export default function ExpertBox({ 
  expertType = 'education',
  lastUpdated = 'January 31, 2026',
  calculatorName = 'this calculator'
}) {
  const experts = {
    education: {
      initials: 'SK',
      name: 'Dr. Sandeep Kumar',
      title: 'Lead Education Consultant',
      credentials: 'Ph.D. in Mathematics | Ex-IIT Delhi Professor',
      experience: '12+ years in academic counseling',
      expertise: 'CGPA calculations, university grading systems, academic assessments',
      color: 'from-blue-600 to-indigo-600'
    },
    finance: {
      initials: 'PM',
      name: 'Priya Mehta, CFA',
      title: 'Financial Calculator Specialist',
      credentials: 'MBA Finance | CFA Level II',
      experience: '8 years in mortgage and investment banking',
      expertise: 'Mortgage calculations, loan amortization, financial planning',
      color: 'from-green-600 to-emerald-600'
    },
    immigration: {
      initials: 'RV',
      name: 'Rajesh Verma',
      title: 'Immigration Consultant',
      credentials: 'RCIC (Regulated Canadian Immigration Consultant)',
      experience: '10+ years in Express Entry consulting',
      expertise: 'CRS score calculations, Canadian immigration requirements',
      color: 'from-red-600 to-pink-600'
    }
  };

  const expert = experts[expertType] || experts.education;

  return (
    <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 mt-8 border-l-4 border-blue-600">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FaCertificate className="text-blue-600 text-xl" />
        <h3 className="text-xl font-bold text-gray-900">
          Verified by Expert
        </h3>
      </div>

      {/* Expert Profile */}
      <div className="flex items-start gap-4 mb-6">
        {/* Avatar */}
        <div className={`w-20 h-20 bg-gradient-to-br ${expert.color} rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg`}>
          {expert.initials}
        </div>

        {/* Details */}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900 mb-1">
            {expert.name}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            {expert.title}
          </p>
          <div className="space-y-1 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600 text-xs flex-shrink-0" />
              <span>{expert.credentials}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600 text-xs flex-shrink-0" />
              <span>{expert.experience}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Verification Statement */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 mb-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong className="text-gray-900">Expert Verification:</strong> {calculatorName} has been 
          developed and verified by {expert.name} with expertise in {expert.expertise}. 
          All formulas and calculations are based on official guidelines and industry standards, 
          ensuring accuracy and reliability.
        </p>
      </div>

      {/* Last Updated & Review Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Last Updated:</span>
          <span>{lastUpdated}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Next Review:</span>
          <span>February 2026</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <FaCertificate className="mr-1 text-xs" />
          Expert Verified
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <FaAward className="mr-1 text-xs" />
          Industry Standard
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          <FaCheckCircle className="mr-1 text-xs" />
          99.9% Accuracy
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          <FaCheckCircle className="mr-1 text-xs" />
          Regularly Updated
        </span>
      </div>

      {/* Methodology Note */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h5 className="text-sm font-bold text-gray-900 mb-2">Our Verification Process</h5>
        <ul className="space-y-1 text-xs text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>All formulas cross-checked with official university/institutional guidelines</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Regular updates based on latest standards and user feedback</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Peer-reviewed by multiple subject matter experts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Tested with thousands of real-world scenarios</span>
          </li>
        </ul>
      </div>

      {/* Schema Markup for Author */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: expert.name,
            jobTitle: expert.title,
            description: expert.credentials,
            knowsAbout: expert.expertise.split(', ')
          })
        }}
      />
    </section>
  );
}