import Layout from '../components/Layout';
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaQuestionCircle, FaBug, FaLightbulb, FaComments } from 'react-icons/fa';

export default function Contact() {
  return (
    <Layout
      title="Contact Us - Get in Touch | Calculator Platform"
      description="Have questions, feedback, or suggestions? Get in touch with our team. We'd love to hear from you about our free online calculators."
      keywords="contact us, calculator support, feedback, help, customer service"
    >
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              We'd love to hear from you! Questions, feedback, or just want to say hi? We're here.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <a 
                      href="mailto:support@calculatorplatform.com" 
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      support@calculatorplatform.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      For general inquiries, feedback, and support
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaBug className="text-xl text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Report Issues</h3>
                    <a 
                      href="mailto:bugs@calculatorplatform.com" 
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      bugs@calculatorplatform.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Found a bug or calculation error? Let us know!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaLightbulb className="text-xl text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Suggestions</h3>
                    <a 
                      href="mailto:ideas@calculatorplatform.com" 
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      ideas@calculatorplatform.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Have an idea for a new calculator? Share it with us!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaClock className="text-xl text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Response Time</h3>
                    <p className="text-gray-700">
                      We typically respond within 24-48 hours
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Monday - Friday, 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-xl text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-700">
                      Patna, Bihar, India
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Serving users worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaQuestionCircle className="text-3xl text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Frequently Asked</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How do I report a calculation error?</h3>
                    <p className="text-sm text-gray-700">
                      Email us at bugs@calculatorplatform.com with details about which calculator and what results you got. We'll investigate and fix it ASAP.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Can you add a specific calculator?</h3>
                    <p className="text-sm text-gray-700">
                      Absolutely! Send your suggestion to ideas@calculatorplatform.com. We're always looking to add useful calculators.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Is this service really free?</h3>
                    <p className="text-sm text-gray-700">
                      Yes! 100% free, no hidden costs, no registration required. We believe essential tools should be accessible to everyone.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Do you collect my calculation data?</h3>
                    <p className="text-sm text-gray-700">
                      No. Your calculations are processed locally in your browser. We don't store or track your input data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaComments className="text-3xl text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">We Value Your Feedback</h2>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Your input helps us improve and build better tools. Whether it's praise, criticism, or suggestions – we want to hear it all.
                </p>
                
                <div className="bg-white p-4 rounded-xl border border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-2">What to include in your message:</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Which calculator you're using</li>
                    <li>• What you expected to happen</li>
                    <li>• What actually happened</li>
                    <li>• Screenshots if applicable</li>
                    <li>• Your browser and device (if reporting a bug)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-3">Before You Email...</h3>
                <p className="mb-4">
                  Check out our help resources! Many common questions are already answered:
                </p>
                <div className="space-y-2">
                  <a 
                    href="/about" 
                    className="block bg-white/20 hover:bg-white/30 transition-all p-3 rounded-lg"
                  >
                    📖 About Us - Learn more about our platform
                  </a>
                  <a 
                    href="/privacy-policy" 
                    className="block bg-white/20 hover:bg-white/30 transition-all p-3 rounded-lg"
                  >
                    🔒 Privacy Policy - How we protect your data
                  </a>
                  <a 
                    href="/terms-of-service" 
                    className="block bg-white/20 hover:bg-white/30 transition-all p-3 rounded-lg"
                  >
                    📜 Terms of Service - Usage guidelines
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Happens After You Contact Us?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">We Receive</h3>
                <p className="text-sm text-gray-700">
                  Your email lands in our inbox and gets assigned to the right team member
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">We Review</h3>
                <p className="text-sm text-gray-700">
                  We carefully read your message and investigate if it's a bug report
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">We Respond</h3>
                <p className="text-sm text-gray-700">
                  You'll get a personal reply within 24-48 hours (usually sooner!)
                </p>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">⚡ Quick Tip</h3>
              <p className="text-gray-700">
                For the fastest response, use the specific email addresses above rather than a general contact. Bug reports sent to bugs@calculatorplatform.com get priority attention!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}