import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FaCalculator, FaGithub, FaTwitter, FaLinkedin, FaBars, FaTimes, FaEnvelope, FaPhone, FaGraduationCap, FaPassport, FaHome, FaChevronDown } from 'react-icons/fa';

export default function Layout({ children, title, description, keywords, schema }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorDropdownOpen, setCalculatorDropdownOpen] = useState(false);
  
  const siteTitle = 'Calculators.me.uk - Free Online Calculators';
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  const majorCalculators = [
    { name: 'CGPA Calculator', href: '/cgpa-calculator', icon: <FaGraduationCap className="text-blue-600" /> },
    { name: 'CRS Calculator', href: '/crs-calculator', icon: <FaPassport className="text-red-600" /> },
    { name: 'Mortgage Payoff', href: '/mortgage-payoff-calculator', icon: <FaHome className="text-green-600" /> },
    { name: 'CGPA to Percentage', href: '/cgpa-to-percentage', icon: <FaGraduationCap className="text-indigo-600" /> },
    { name: 'Marks Percentage', href: '/marks-percentage-calculator', icon: <FaGraduationCap className="text-yellow-600" /> },
  ];
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || 'Free online calculators for education, finance, and lifestyle. Calculate CGPA, CRS, mortgage, and more.'} />
        <meta name="keywords" content={keywords || 'online calculator, free calculator, CGPA calculator, CRS calculator'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`https://calculators.me.uk${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
        
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                ...schema,
                url: `https://calculators.me.uk${typeof window !== 'undefined' ? window.location.pathname : ''}`,
              })
            }}
          />
        )}
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Enhanced Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 text-primary-600 hover:text-primary-700 transition-all transform hover:scale-105">
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-xl shadow-lg">
                  <FaCalculator className="text-2xl text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                    Calculators
                  </span>
                  <span className="text-xs text-gray-500 block -mt-1">.me.uk</span>
                </div>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                {/* Calculators Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setCalculatorDropdownOpen(true)}
                  onMouseLeave={() => setCalculatorDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors py-2">
                    Calculators
                    <FaChevronDown className={`text-xs transition-transform ${calculatorDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {calculatorDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-slide-up">
                      {majorCalculators.map((calc, index) => (
                        <Link 
                          key={index}
                          href={calc.href} 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="text-xl">{calc.icon}</div>
                          <span className="text-sm font-medium text-gray-700 hover:text-primary-600">
                            {calc.name}
                          </span>
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                        
                      </div>
                    </div>
                  )}
                </div>

                {/* Individual Calculator Links */}
                <Link href="/cgpa-calculator" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group">
                  <span className="flex items-center gap-2">
                    <FaGraduationCap className="text-blue-600" />
                    CGPA
                  </span>
                </Link>
                
                <Link href="/crs-calculator" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group">
                  <span className="flex items-center gap-2">
                    <FaPassport className="text-red-600" />
                    CRS
                  </span>
                </Link>
                
                <Link href="/mortgage-payoff-calculator" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group">
                  <span className="flex items-center gap-2">
                    <FaHome className="text-green-600" />
                    Mortgage
                  </span>
                </Link>

                
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden py-4 border-t animate-slide-up">
                <div className="flex flex-col space-y-3">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">
                    Popular Calculators
                  </div>
                  {majorCalculators.map((calc, index) => (
                    <Link 
                      key={index}
                      href={calc.href} 
                      className="flex items-center gap-3 text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 px-2" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="text-lg">{calc.icon}</div>
                      <span>{calc.name}</span>
                    </Link>
                  ))}
                  <div className="border-t border-gray-200 pt-3 mt-2">
                    <Link href="/#calculators" className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 px-2 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                      View All Calculators →
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 px-2 block" onClick={() => setMobileMenuOpen(false)}>
                      About Us
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-700 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-3 rounded-xl shadow-lg">
                    <FaCalculator className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Calculators</h3>
                    <span className="text-xs text-gray-400">.me.uk</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Your trusted platform for free, accurate, and fast online calculators. Serving users in India, USA, UK, and Canada.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://twitter.com/calculatorsmeuk" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                    aria-label="Follow us on Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href="https://github.com/calculatorsmeuk" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                    aria-label="View our GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href="https://linkedin.com/company/calculatorsmeuk" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                    aria-label="Connect on LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
                <ul className="space-y-3">
                  <li><Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ Home</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ About Us</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ Contact</Link></li>
                  <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ Privacy Policy</Link></li>
                  <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ Terms of Service</Link></li>
                </ul>
              </div>
              
              {/* Popular Calculators */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-white">Popular Tools</h3>
                <ul className="space-y-3">
                  <li><Link href="/cgpa-calculator" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ CGPA Calculator</Link></li>
                  <li><Link href="/crs-calculator" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ CRS Calculator</Link></li>
                  <li><Link href="/mortgage-payoff-calculator" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ Mortgage Calculator</Link></li>
                  <li><Link href="/cgpa-to-percentage" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ CGPA to Percentage</Link></li>
                  <li><Link href="/marks-percentage-calculator" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">→ Marks Percentage</Link></li>
                </ul>
              </div>
              
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-white">Get in Touch</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <FaEnvelope className="text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a href="mailto:support@calculators.me.uk" className="text-white hover:text-primary-400 transition-colors">
                        support@calculators.me.uk
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaPhone className="text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">Support</p>
                      <p className="text-white">24/7 Online Support</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; {new Date().getFullYear()} Calculators.me.uk. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Made with</span>
                <span className="text-red-500 animate-pulse">❤️</span>
                <span>for students & professionals</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}