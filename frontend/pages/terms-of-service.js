import Layout from '../components/Layout';
import { FaFileContract, FaBalanceScale, FaExclamationTriangle, FaCheckCircle, FaUserCheck, FaHandshake } from 'react-icons/fa';

export default function TermsOfService() {
  return (
    <Layout
      title="Terms of Service - Usage Guidelines & Legal Terms"
      description="Read our terms of service to understand the rules for using our free calculator platform. Simple, fair terms for everyone."
      keywords="terms of service, terms and conditions, usage policy, legal terms"
    >
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FaFileContract className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Terms of Service
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto">
              Simple, fair rules for using our calculators. No legal jargon, just straightforward terms.
            </p>
            <p className="text-sm text-purple-200 mt-4">
              Last Updated: October 19, 2025
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              The Basics (What You Need to Know)
            </h2>
            <div className="prose prose-lg max-w-none">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Our calculators are free for everyone – personal and commercial use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Use them responsibly and verify important calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>We strive for accuracy but aren't liable for errors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Don't misuse the service or try to break it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>We can update these terms, but we'll let you know</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaHandshake className="text-gray-600" />
                1. Agreement to Terms
              </h2>
              
              <p className="text-gray-700 mb-4">
                By accessing and using this calculator platform, you agree to be bound by these Terms of Service. If you don't agree with these terms, please don't use our calculators. It's that simple.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">2. What We Provide</h2>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2.1 Free Calculator Services</h3>
              <p className="text-gray-700 mb-4">
                We provide a collection of free online calculators covering educational calculators, financial calculators, lifestyle calculators, and more tools as we continue to expand.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2.2 Service Availability</h3>
              <p className="text-gray-700 mb-4">
                We try to keep our calculators available 24/7, but we can't guarantee 100% uptime. Occasionally, we need to perform maintenance and updates, fix bugs, make improvements, or add new features.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">3. How You Can Use Our Calculators</h2>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3.1 Permitted Uses</h3>
              <p className="text-gray-700 mb-4">
                You're welcome to use our calculators for personal use, educational purposes, professional use, commercial use, and you can share links to our calculators with others.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3.2 Restrictions</h3>
              <p className="text-gray-700 mb-4">
                Here's what you can't do: Don't scrape our content, don't overload our servers, don't reverse engineer, don't spread malware, don't impersonate us, and don't violate laws.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 flex items-center gap-3">
                <FaExclamationTriangle className="text-yellow-600" />
                4. Accuracy and Disclaimers
              </h2>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4.1 We Strive for Accuracy</h3>
              <p className="text-gray-700 mb-4">
                We work hard to ensure our calculators are accurate and use verified formulas based on industry-standard formulas, educational institution guidelines, financial calculation best practices, and peer-reviewed methodologies.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4.2 But Verify Important Calculations</h3>
              <p className="text-gray-700 mb-4">
                While we're confident in our calculators, you should always verify results when making important financial decisions, submitting official applications, dealing with legal requirements, or when results will significantly impact your life.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 flex items-center gap-3">
                <FaBalanceScale className="text-gray-600" />
                5. Limitation of Liability
              </h2>

              <p className="text-gray-700 mb-4">
                We're not responsible for any losses or damages resulting from using our calculators, relying on calculation results, errors or inaccuracies, service downtime, third-party links, or any other use of our service.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl my-6">
                <h3 className="font-bold text-gray-900 mb-2">⚠️ Important Note</h3>
                <p className="text-gray-700">
                  This isn't us being mean or trying to avoid responsibility. We genuinely try to provide accurate, helpful calculators. But legally, we need to protect ourselves from liability for free services.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">6. Intellectual Property</h2>

              <p className="text-gray-700 mb-4">
                The design, code, content, and functionality of our website are owned by us and protected by intellectual property laws. You may link to our calculators, share calculator links, reference our calculators, and embed calculator links in educational materials.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">7. User Conduct</h2>

              <p className="text-gray-700 mb-4">
                We expect users to behave responsibly. Don't attempt to hack or compromise our security, upload viruses, spam our contact forms, use automated tools to overwhelm our servers, try to access restricted areas, or interfere with other users.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">8. Changes to Service and Terms</h2>

              <p className="text-gray-700 mb-4">
                We reserve the right to add new calculators, modify existing calculators, remove calculators, change the design, or discontinue the service. We may update these Terms of Service from time to time.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 flex items-center gap-3">
                <FaUserCheck className="text-gray-600" />
                9. Privacy and Data
              </h2>

              <p className="text-gray-700 mb-4">
                How we handle your data is covered in our <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>. The short version: we don't collect personal information, your calculations are processed locally, we use minimal anonymous analytics, and we don't sell or share your data.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">10. Contact Information</h2>

              <p className="text-gray-700 mb-4">
                Questions about these terms? Contact us at: <a href="mailto:legal@calculatorplatform.com" className="text-blue-600 hover:text-blue-800">legal@calculatorplatform.com</a>
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mt-8">
                <h3 className="font-bold text-gray-900 mb-3">Our Philosophy on Terms</h3>
                <p className="text-gray-700">
                  We know terms of service are usually boring legal documents that nobody reads. We've tried to make ours clear and fair. The bottom line is simple: we provide free calculators, you use them responsibly, and everyone benefits.
                </p>
              </div>

              <div className="mt-8 text-center p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl">
                <p className="text-lg font-semibold mb-2">
                  By using our calculators, you agree to these terms.
                </p>
                <p className="text-sm text-purple-100">
                  Updated: October 19, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}