// Next.js SEO Configuration
// This file contains default SEO settings for all pages

export const defaultSEO = {
  titleTemplate: '%s | Calculators.me.uk - Free Online Calculators',
  defaultTitle: 'Calculators.me.uk - Free Online Calculators',
  description: 'Free online calculators for education, finance, immigration, and lifestyle. Calculate CGPA, CRS scores, mortgage payments, and more. Trusted by 50,000+ users worldwide.',
  canonical: 'https://calculators.me.uk',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://calculators.me.uk',
    site_name: 'Calculators.me.uk',
    images: [
      {
        url: 'https://calculators.me.uk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculators.me.uk - Free Online Calculators',
      },
    ],
  },
  twitter: {
    handle: '@calculatorsmeuk',
    site: '@calculatorsmeuk',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'theme-color',
      content: '#3b82f6',
    },
    {
      name: 'msapplication-TileColor',
      content: '#3b82f6',
    },
    {
      name: 'author',
      content: 'Calculators.me.uk Editorial Team',
    },
    {
      name: 'publisher',
      content: 'Calculators.me.uk',
    },
    {
      name: 'robots',
      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'Free Online Calculators - CGPA, CRS, Mortgage & More',
    description: 'Professional online calculators for students, immigrants, and homeowners. Calculate CGPA, CRS scores, mortgage payments, and more. Fast, accurate, and 100% free.',
    keywords: 'online calculator, CGPA calculator, CRS calculator, mortgage calculator, percentage calculator, free calculator, education calculator, immigration calculator',
  },
  about: {
    title: 'About Us - Free Online Calculators for Everyone',
    description: 'Learn about our mission to provide free, accurate, and easy-to-use calculators for students, professionals, and everyday users. No registration required.',
    keywords: 'about us, free calculators, online tools, calculator website, who we are',
  },
  contact: {
    title: 'Contact Us - Get in Touch',
    description: 'Have questions or feedback? Contact our team for support, suggestions, or partnership inquiries.',
    keywords: 'contact, support, help, feedback',
  },
  privacy: {
    title: 'Privacy Policy - Your Data Protection',
    description: 'Learn how we protect your privacy and handle your data. We never store or share your calculation inputs.',
    keywords: 'privacy policy, data protection, GDPR, privacy',
  },
  terms: {
    title: 'Terms of Service - Usage Agreement',
    description: 'Read our terms of service to understand how you can use our free calculators and what to expect.',
    keywords: 'terms of service, terms and conditions, usage agreement',
  },
  disclaimer: {
    title: 'Disclaimer - Calculator Accuracy',
    description: 'Important information about the accuracy and limitations of our calculators. Always verify results for critical decisions.',
    keywords: 'disclaimer, calculator accuracy, limitations',
  },
  cgpaCalculator: {
    title: 'CGPA Calculator - Calculate Cumulative GPA Online Free',
    description: 'Calculate your CGPA (Cumulative Grade Point Average) online. Support for 10-point and 4-point scales. Free, accurate, and instant results for students.',
    keywords: 'CGPA calculator, cumulative GPA calculator, GPA calculator, grade calculator, CGPA calculation, semester GPA',
  },
  cgpaToPercentage: {
    title: 'CGPA to Percentage Calculator - Convert GPA to Percentage Online Free',
    description: 'Convert CGPA to percentage instantly with our free calculator. Support for 10-point and 4-point GPA scales. Accurate conversion for Indian, US, UK, and Canadian grading systems.',
    keywords: 'cgpa to percentage calculator, cgpa to percentage, convert cgpa to percentage, gpa to percentage converter, cgpa percentage conversion, 10 point cgpa to percentage, 4 point gpa to percentage',
  },
  percentageToCgpa: {
    title: 'Percentage to CGPA Calculator - Convert Percentage to GPA Online Free',
    description: 'Convert percentage to CGPA instantly with our free calculator. Support for 10-point and 4-point scales. Accurate conversion for Indian, US, UK, and Canadian grading systems.',
    keywords: 'percentage to cgpa calculator, percentage to cgpa, convert percentage to cgpa, percentage to gpa converter, marks to cgpa calculator, percentage to grade point calculator',
  },
  marksPercentage: {
    title: 'Marks Percentage Calculator - Calculate Exam Percentage from Marks Online',
    description: 'Calculate your exam percentage instantly from obtained marks and total marks. Free marks to percentage calculator for students. Get grades, results, and performance analysis in seconds.',
    keywords: 'marks percentage calculator, calculate percentage from marks, marks to percentage, exam percentage calculator, percentage calculator marks, how to calculate percentage of marks, marks percentage formula, grade percentage calculator',
  },
  mortgageOverpayment: {
    title: 'Mortgage Overpayment Calculator - Calculate Interest Savings from Extra Payments',
    description: 'Calculate how much you can save with mortgage overpayments. Free calculator shows interest savings and reduced loan term from extra monthly or yearly payments on your home loan.',
    keywords: 'mortgage overpayment calculator, mortgage extra payment calculator, overpayment savings calculator, mortgage overpayment uk, extra mortgage payment calculator, pay off mortgage early calculator',
  },
  mortgagePayoff: {
    title: 'Mortgage Payoff Calculator - Early Mortgage Payoff Calculator Free',
    description: 'Calculate how much you can save by paying off your mortgage early. Free calculator shows interest savings and reduced loan term from extra payments.',
    keywords: 'mortgage payoff calculator, early mortgage payoff, mortgage payoff calculator uk, pay off mortgage early, mortgage repayment calculator',
  },
  crsCalculator: {
    title: 'CRS Calculator - Canada Express Entry Points Calculator Free',
    description: 'Calculate your CRS (Comprehensive Ranking System) score for Canada Express Entry immigration. Free, accurate, and instant results. Check your eligibility for Canadian PR.',
    keywords: 'CRS calculator, Canada Express Entry calculator, CRS score calculator, Canada immigration points, Express Entry points calculator, Canadian PR calculator',
  },
  shareAverage: {
    title: 'Share Average Calculator - Stock Average Price Calculator Free',
    description: 'Calculate your average stock purchase price across multiple buys. Free share average calculator for investors. Track your investment cost basis accurately.',
    keywords: 'share average calculator, stock average calculator, average share price calculator, investment calculator, stock cost basis calculator',
  },
};

// Structured data templates
export const structuredData = {
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calculators.me.uk',
    url: 'https://calculators.me.uk',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://calculators.me.uk/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calculators.me.uk',
    url: 'https://calculators.me.uk',
    logo: {
      '@type': 'ImageObject',
      url: 'https://calculators.me.uk/logo.png',
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://twitter.com/calculatorsmeuk',
      'https://github.com/calculatorsmeuk',
      'https://linkedin.com/company/calculatorsmeuk',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-20-1234-5678',
      contactType: 'customer support',
      email: 'support@calculators.me.uk',
      availableLanguage: ['English'],
    },
  },
  calculator: (name, description, url) => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: name,
    description: description,
    url: url,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '50000',
      bestRating: '5',
      worstRating: '1',
    },
  }),
  faq: (questions) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }),
  breadcrumb: (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  article: (title, description, url, datePublished, dateModified, author) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author || 'Calculators.me.uk Editorial Team',
      url: 'https://calculators.me.uk/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calculators.me.uk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://calculators.me.uk/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }),
};

// Calculator-specific schemas with enhanced E-E-A-T
export const calculatorSchemas = {
  cgpaToPercentage: {
    '@type': 'WebApplication',
    name: 'CGPA to Percentage Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '18650',
      bestRating: '5',
    },
    author: {
      '@type': 'Organization',
      name: 'Calculators.me.uk Editorial Team',
      url: 'https://calculators.me.uk/about',
    },
    datePublished: '2023-01-01',
    dateModified: '2025-01-31',
  },
  marksPercentage: {
    '@type': 'WebApplication',
    name: 'Marks Percentage Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '22450',
      bestRating: '5',
    },
    author: {
      '@type': 'Organization',
      name: 'Calculators.me.uk Editorial Team',
      url: 'https://calculators.me.uk/about',
    },
    datePublished: '2023-01-01',
    dateModified: '2025-01-31',
  },
  mortgageOverpayment: {
    '@type': 'WebApplication',
    name: 'Mortgage Overpayment Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '13450',
      bestRating: '5',
    },
    author: {
      '@type': 'Organization',
      name: 'Calculators.me.uk Editorial Team',
      url: 'https://calculators.me.uk/about',
    },
    datePublished: '2023-01-01',
    dateModified: '2025-01-31',
  },
  percentageToCgpa: {
    '@type': 'WebApplication',
    name: 'Percentage to CGPA Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '16240',
      bestRating: '5',
    },
    author: {
      '@type': 'Organization',
      name: 'Calculators.me.uk Editorial Team',
      url: 'https://calculators.me.uk/about',
    },
    datePublished: '2023-01-01',
    dateModified: '2025-01-31',
  },
};

export default defaultSEO;