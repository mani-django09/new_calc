import Layout from '../components/Layout';
import { FaShieldAlt, FaLock, FaUserSecret, FaCookie, FaDatabase, FaCheckCircle } from 'react-icons/fa';

export default function PrivacyPolicy() {
  return (
    <Layout
      title="Privacy Policy - How We Protect Your Data"
      description="Read our privacy policy to understand how we handle your data. We don't collect personal information and your calculations remain private."
      keywords="privacy policy, data protection, user privacy, calculator privacy"
    >
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FaShieldAlt className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto">
              Your privacy matters. Here's exactly what we do (and don't do) with your information.
            </p>
            <p className="text-sm text-green-200 mt-4">
              Last Updated: October 19, 2025
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-blue-600" />
              The Short Version (TL;DR)
            </h2>
            <div className="prose prose-lg max-w-none">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>We don't collect any personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Your calculations are processed locally in your browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>We don't store or track your input data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>No registration or email required to use our calculators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>We use basic analytics to understand traffic (no personal data)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>We don't sell, share, or rent your information to anyone</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaUserSecret className="text-gray-600" />
                1. Information We Collect
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We don't collect any personal information. Period. You don't need to create an account, provide an email address, or share any identifying details to use our calculators. Your name, email, phone number, address – we don't ask for any of it.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1.2 Calculation Data</h3>
              <p className="text-gray-700 mb-4">
                When you use our calculators, all calculations happen directly in your web browser. The numbers you enter are processed on your device and are never sent to our servers. We have no way to see what you're calculating.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1.3 Anonymous Usage Data</h3>
              <p className="text-gray-700 mb-4">
                We collect basic, non-identifying information about how people use our website, such as which calculators are most popular, what pages people visit, how long people stay, general location (country/city level only), and device type and browser information.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3 mt-12">
                <FaCookie className="text-gray-600" />
                2. Cookies and Tracking
              </h2>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2.1 Essential Cookies</h3>
              <p className="text-gray-700 mb-4">
                We use minimal cookies necessary for the website to function properly. These might include remembering your calculator preferences, basic security features, and session management.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2.2 Analytics Cookies</h3>
              <p className="text-gray-700 mb-4">
                We use analytics services to understand how visitors interact with our site. These services use cookies to collect data, but this information is aggregated and anonymous. We've configured our analytics to respect user privacy as much as possible.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3 mt-12">
                <FaDatabase className="text-gray-600" />
                3. How We Use Information
              </h2>

              <p className="text-gray-700 mb-4">
                The limited anonymous data we collect is used solely to improve our calculators, fix bugs, understand traffic, and make decisions about new features.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3 mt-12">
                <FaLock className="text-gray-600" />
                4. Data Security
              </h2>

              <p className="text-gray-700 mb-4">
                While we collect very little data, we still take security seriously. All connections use HTTPS encryption, our website is hosted on reputable platforms with strong security measures, and we keep our software up to date with security patches.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">5. Your Rights and Choices</h2>

              <p className="text-gray-700 mb-4">
                You can prevent analytics tracking by installing browser extensions that block analytics, enabling "Do Not Track" in your browser settings, or using private/incognito browsing mode. You can clear cookies at any time through your browser settings.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">6. Children's Privacy</h2>

              <p className="text-gray-700 mb-4">
                Our calculators are used by students of all ages, including children under 13. Since we don't collect any personal information, we're in compliance with children's privacy regulations like COPPA.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">7. Contact Us About Privacy</h2>

              <p className="text-gray-700 mb-4">
                Got questions about privacy? Email us at: <a href="mailto:privacy@calculatorplatform.com" className="text-blue-600 hover:text-blue-800">privacy@calculatorplatform.com</a>
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-xl mt-8">
                <h3 className="font-bold text-gray-900 mb-3">Our Privacy Promise</h3>
                <p className="text-gray-700">
                  We built this platform to help people, not to collect data. Your privacy isn't a checkbox for us – it's a fundamental principle. We'll never compromise your privacy for profit or convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}