import Layout from '../components/Layout';
import { FaCalculator, FaUsers, FaRocket, FaHeart, FaChartLine, FaGraduationCap, FaHome, FaDollarSign } from 'react-icons/fa';

export default function AboutUs() {
  return (
    <Layout
      title="About Us - Free Online Calculators for Everyone"
      description="Learn about our mission to provide free, accurate, and easy-to-use calculators for students, professionals, and everyday users. No registration required."
      keywords="about us, free calculators, online tools, calculator website"
    >
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              About Our Calculator Platform
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Making complex calculations simple and accessible for everyone, everywhere.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FaRocket className="text-4xl text-blue-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Story</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-4">
                We started this platform with a simple idea: everyone should have access to reliable calculators without jumping through hoops. No registration forms, no hidden fees, no complicated interfaces – just straightforward tools that work.
              </p>
              
              <p className="text-lg leading-relaxed mb-4">
                As students ourselves, we remember the frustration of trying to calculate CGPA conversions, mortgage payments, or investment averages. We'd end up on websites cluttered with ads, asking for email addresses, or worse – charging money for basic calculations. That didn't sit right with us.
              </p>
              
              <p className="text-lg leading-relaxed">
                So we built something better. A place where you can get your answers quickly, accurately, and completely free. Whether you're a college student figuring out your grades, a homeowner planning mortgage payments, or an investor tracking stock purchases – we've got you covered.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 mb-8 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <FaHeart className="text-4xl text-purple-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Mission</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Free Forever</h3>
                <p className="text-gray-700">
                  We believe essential tools should be free. No premium tiers, no paywalls, no catch. Every calculator on this platform is completely free and will stay that way.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
                <p className="text-gray-700">
                  Your calculations are your business. We don't collect personal information, track your inputs, or share your data. Use our tools with complete peace of mind.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Accuracy Guaranteed</h3>
                <p className="text-gray-700">
                  Every formula is verified and tested. We use industry-standard calculations approved by educational institutions and financial experts worldwide.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile Friendly</h3>
                <p className="text-gray-700">
                  Calculate on the go! All our tools work perfectly on phones, tablets, and desktops. No app downloads needed – just open your browser and go.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FaCalculator className="text-4xl text-green-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Offer</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                <FaGraduationCap className="text-3xl text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Education</h3>
                <p className="text-sm text-gray-700">
                  CGPA calculators, percentage converters, grade trackers, and more for students worldwide.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
                <FaDollarSign className="text-3xl text-green-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Finance</h3>
                <p className="text-sm text-gray-700">
                  Investment calculators, mortgage tools, share averages, and financial planning resources.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
                <FaHome className="text-3xl text-purple-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Real Estate</h3>
                <p className="text-sm text-gray-700">
                  Mortgage payoff calculators, overpayment tools, and home finance planning utilities.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border border-orange-200">
                <FaChartLine className="text-3xl text-orange-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Lifestyle</h3>
                <p className="text-sm text-gray-700">
                  Name numerology, snow day predictions, and fun calculators for everyday life.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 mb-8 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-6">
              <FaUsers className="text-4xl text-green-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why People Trust Us</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl font-extrabold text-green-600 mb-2">50,000+</div>
                <p className="text-gray-700 font-semibold">Daily Users</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl font-extrabold text-blue-600 mb-2">1M+</div>
                <p className="text-gray-700 font-semibold">Calculations Monthly</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl font-extrabold text-purple-600 mb-2">4.9/5</div>
                <p className="text-gray-700 font-semibold">User Rating</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What Our Users Say</h3>
              <div className="space-y-4">
                <blockquote className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-gray-700 italic mb-2">
                    "Finally, a calculator website that doesn't ask me to sign up or watch ads. Just enter your numbers and get the answer. Perfect!"
                  </p>
                  <footer className="text-sm text-gray-600">— Priya S., College Student</footer>
                </blockquote>
                
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-gray-700 italic mb-2">
                    "I use the share average calculator every month for my investments. It's accurate, fast, and I trust the results completely."
                  </p>
                  <footer className="text-sm text-gray-600">— Rajesh K., Investor</footer>
                </blockquote>
                
                <blockquote className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="text-gray-700 italic mb-2">
                    "The mortgage payoff calculator helped me save thousands by showing me how extra payments would affect my loan. Highly recommend!"
                  </p>
                  <footer className="text-sm text-gray-600">— Sarah M., Homeowner</footer>
                </blockquote>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Commitment to You</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-4">
                We're constantly improving and adding new calculators based on what you need. Got a suggestion for a calculator we should build? We're listening. Found a bug or have feedback? We want to hear it.
              </p>
              
              <p className="text-lg leading-relaxed mb-4">
                This platform exists to serve you. We measure our success not in profits (there are none – it's free!), but in how many people we help each day. Every calculation performed, every problem solved, every "thank you" message we receive reminds us why we do this.
              </p>
              
              <p className="text-lg leading-relaxed">
                Thank you for trusting us with your calculations. Whether you're here for a quick CGPA conversion or regularly tracking your investments, we're honored to be your go-to calculator resource.
              </p>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl text-center">
              <p className="text-xl font-semibold mb-2">Questions or Feedback?</p>
              <p className="mb-4">We'd love to hear from you!</p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}