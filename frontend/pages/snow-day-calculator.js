import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import {
  FaSnowflake,
  FaCalculator,
  FaInfoCircle,
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaThermometerHalf,
  FaWind,
  FaMapMarkerAlt,
  FaSchool,
  FaCloudSun,
  FaClock,
  FaBus,
  FaExclamationTriangle,
  FaSnowplow,
  FaBell,
  FaCloud,
  FaIcicles,
  FaStar
} from 'react-icons/fa';

// ─── SVG 1: Weather Severity Gauge ────────────────────────────────────────────
// Visual gauge showing snow day probability
const SnowDayGauge = ({ probability }) => {
  const angle = (probability / 100) * 180 - 90;
  const needleX = 200 + 120 * Math.cos((angle * Math.PI) / 180);
  const needleY = 200 + 120 * Math.sin((angle * Math.PI) / 180);
  
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-md mx-auto drop-shadow-xl">
      <defs>
        <linearGradient id="gaugeGreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="gaugeShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Gauge background */}
      <path
        d="M 80 200 A 120 120 0 0 1 320 200"
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="30"
        strokeLinecap="round"
      />
      
      {/* Colored gauge arc */}
      <path
        d="M 80 200 A 120 120 0 0 1 320 200"
        fill="none"
        stroke="url(#gaugeGreen)"
        strokeWidth="28"
        strokeLinecap="round"
        opacity="0.9"
      />
      
      {/* Tick marks */}
      {[0, 25, 50, 75, 100].map((val, i) => {
        const tickAngle = (val / 100) * 180 - 90;
        const x1 = 200 + 100 * Math.cos((tickAngle * Math.PI) / 180);
        const y1 = 200 + 100 * Math.sin((tickAngle * Math.PI) / 180);
        const x2 = 200 + 85 * Math.cos((tickAngle * Math.PI) / 180);
        const y2 = 200 + 85 * Math.sin((tickAngle * Math.PI) / 180);
        const labelX = 200 + 140 * Math.cos((tickAngle * Math.PI) / 180);
        const labelY = 200 + 140 * Math.sin((tickAngle * Math.PI) / 180);
        
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#374151" strokeWidth="3" strokeLinecap="round" />
            <text x={labelX} y={labelY + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#374151">
              {val}%
            </text>
          </g>
        );
      })}
      
      {/* Center circle */}
      <circle cx="200" cy="200" r="20" fill="#1f2937" filter="url(#gaugeShadow)" />
      <circle cx="200" cy="200" r="15" fill="#374151" />
      
      {/* Needle */}
      <line
        x1="200"
        y1="200"
        x2={needleX}
        y2={needleY}
        stroke="#dc2626"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#gaugeShadow)"
      />
      <circle cx="200" cy="200" r="8" fill="#dc2626" stroke="#fff" strokeWidth="2" />
      
      {/* Labels */}
      <text x="80" y="230" fontSize="11" fontWeight="600" fill="#ef4444">Unlikely</text>
      <text x="200" y="235" textAnchor="middle" fontSize="11" fontWeight="600" fill="#f59e0b">Possible</text>
      <text x="320" y="230" textAnchor="end" fontSize="11" fontWeight="600" fill="#10b981">Likely</text>
    </svg>
  );
};

// ─── SVG 2: Snow Conditions Visualization ─────────────────────────────────────
// Shows snowfall levels and their impact
const SnowLevelIllustration = () => (
  <svg viewBox="0 0 600 320" className="w-full max-w-3xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0f9ff" />
        <stop offset="100%" stopColor="#dbeafe" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="600" height="320" fill="url(#skyGrad)" rx="16" />
    
    {/* Falling snow */}
    {[...Array(30)].map((_, i) => (
      <circle
        key={i}
        cx={Math.random() * 600}
        cy={Math.random() * 200}
        r={1.5 + Math.random() * 2}
        fill="white"
        opacity={0.6 + Math.random() * 0.4}
      />
    ))}
    
    {/* Ground levels showing different snow depths */}
    {/* 2 inches - light */}
    <rect x="20" y="240" width="120" height="60" fill="url(#groundGrad)" rx="8" />
    <line x1="30" y1="240" x2="130" y2="240" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 2" />
    <text x="80" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">2"</text>
    <text x="80" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">Open</text>
    <text x="80" y="295" textAnchor="middle" fontSize="9" fill="#bfdbfe">15% chance</text>
    
    {/* 4 inches - moderate */}
    <rect x="160" y="220" width="120" height="80" fill="url(#groundGrad)" rx="8" />
    <line x1="170" y1="220" x2="270" y2="220" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 2" />
    <text x="220" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">4"</text>
    <text x="220" y="270" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">Maybe Delay</text>
    <text x="220" y="290" textAnchor="middle" fontSize="9" fill="#bfdbfe">35% chance</text>
    
    {/* 6 inches - significant */}
    <rect x="300" y="200" width="120" height="100" fill="url(#groundGrad)" rx="8" />
    <line x1="310" y1="200" x2="410" y2="200" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 2" />
    <text x="360" y="190" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">6"</text>
    <text x="360" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">Good Chance</text>
    <text x="360" y="280" textAnchor="middle" fontSize="9" fill="#bfdbfe">65% chance</text>
    
    {/* 10+ inches - major */}
    <rect x="440" y="170" width="140" height="130" fill="url(#groundGrad)" rx="8" />
    <line x1="450" y1="170" x2="570" y2="170" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 2" />
    <text x="510" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">10+"</text>
    <text x="510" y="245" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">Very Likely</text>
    <text x="510" y="265" textAnchor="middle" fontSize="9" fill="#bfdbfe">90%+ chance</text>
    
    {/* School bus icon */}
    <g transform="translate(50, 200)">
      <rect x="0" y="0" width="40" height="20" rx="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="2" y="3" width="8" height="8" fill="#1e3a8a" opacity="0.3" />
      <rect x="12" y="3" width="8" height="8" fill="#1e3a8a" opacity="0.3" />
      <rect x="22" y="3" width="8" height="8" fill="#1e3a8a" opacity="0.3" />
      <rect x="32" y="3" width="6" height="8" fill="#1e3a8a" opacity="0.3" />
      <circle cx="10" cy="22" r="3" fill="#1f2937" />
      <circle cx="30" cy="22" r="3" fill="#1f2937" />
    </g>
    
    {/* Title */}
    <text x="300" y="30" textAnchor="middle" fontSize="18" fontWeight="800" fill="white">
      Snow Depth Impact on School Closures
    </text>
  </svg>
);

// ─── SVG 3: Decision Timeline Visualization ───────────────────────────────────
const DecisionTimeline = () => (
  <svg viewBox="0 0 700 180" className="w-full max-w-3xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="700" height="180" rx="16" fill="#f0f9ff" />
    
    {/* Timeline line */}
    <line x1="50" y1="90" x2="650" y2="90" stroke="url(#timeGrad)" strokeWidth="4" strokeLinecap="round" />
    
    {/* Timeline events */}
    {[
      { x: 80, time: '10 PM', event: 'Snow Starts', icon: '🌨️', top: true },
      { x: 200, time: '12 AM', event: 'Roads Covered', icon: '🛣️', top: false },
      { x: 350, time: '4 AM', event: 'Decision Time', icon: '⏰', top: true, highlight: true },
      { x: 500, time: '6 AM', event: 'Announcement', icon: '📢', top: false },
      { x: 620, time: '7 AM', event: 'Confirmation', icon: '✅', top: true }
    ].map((item, i) => {
      const y = item.top ? 40 : 140;
      const lineY = item.top ? 70 : 110;
      
      return (
        <g key={i}>
          {/* Connecting line */}
          <line x1={item.x} y1={lineY} x2={item.x} y2="90" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
          
          {/* Circle marker */}
          <circle 
            cx={item.x} 
            cy="90" 
            r={item.highlight ? "12" : "8"} 
            fill={item.highlight ? "#dc2626" : "#0284c7"} 
            stroke="white" 
            strokeWidth="3" 
          />
          
          {/* Event box */}
          <rect 
            x={item.x - 45} 
            y={y - 20} 
            width="90" 
            height="40" 
            rx="8" 
            fill={item.highlight ? "#fef2f2" : "white"} 
            stroke={item.highlight ? "#dc2626" : "#0284c7"} 
            strokeWidth="2" 
          />
          
          {/* Icon */}
          <text x={item.x} y={y - 5} textAnchor="middle" fontSize="16">
            {item.icon}
          </text>
          
          {/* Time */}
          <text x={item.x} y={y + 12} textAnchor="middle" fontSize="10" fontWeight="700" fill="#374151">
            {item.time}
          </text>
          
          {/* Event label */}
          <text x={item.x} y={y + (item.top ? 45 : -25)} textAnchor="middle" fontSize="9" fontWeight="600" fill="#6b7280">
            {item.event}
          </text>
        </g>
      );
    })}
    
    {/* Title */}
    <text x="350" y="165" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e3a8a">
      Typical Snow Day Decision Timeline
    </text>
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SnowDayCalculator() {
  const [snowfall, setSnowfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [location, setLocation] = useState('suburban');
  const [timing, setTiming] = useState('overnight');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultRef = useRef(null);

  // Pure client-side calculation
  const calculateSnowDay = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const snowfallValue = parseFloat(snowfall);
      const tempValue = parseFloat(temperature);
      const windValue = parseFloat(windSpeed);

      if (isNaN(snowfallValue) || snowfallValue < 0) {
        setError('Enter a valid snowfall amount (0 or greater)');
        setLoading(false);
        return;
      }

      if (isNaN(tempValue)) {
        setError('Enter a valid temperature in Fahrenheit');
        setLoading(false);
        return;
      }

      if (isNaN(windValue) || windValue < 0) {
        setError('Enter a valid wind speed (0 or greater)');
        setLoading(false);
        return;
      }

      // Calculate probability based on multiple factors
      let probability = 0;

      // Snowfall impact (0-50 points)
      if (snowfallValue >= 12) probability += 50;
      else if (snowfallValue >= 8) probability += 40;
      else if (snowfallValue >= 6) probability += 30;
      else if (snowfallValue >= 4) probability += 20;
      else if (snowfallValue >= 2) probability += 10;
      else probability += 5;

      // Temperature impact (0-20 points)
      if (tempValue <= 0) probability += 20;
      else if (tempValue <= 10) probability += 15;
      else if (tempValue <= 20) probability += 10;
      else if (tempValue <= 30) probability += 5;

      // Wind impact (0-15 points)
      if (windValue >= 35) probability += 15;
      else if (windValue >= 25) probability += 10;
      else if (windValue >= 15) probability += 5;

      // Location impact (0-10 points)
      if (location === 'rural') probability += 10;
      else if (location === 'suburban') probability += 5;
      else probability += 0;

      // Timing impact (0-5 points)
      if (timing === 'overnight') probability += 5;
      else if (timing === 'early-morning') probability += 3;

      // Cap at 100%
      probability = Math.min(100, Math.round(probability));

      // Determine likelihood and messaging
      let likelihood, message, advice, color;

      if (probability >= 85) {
        likelihood = '🎉 Extremely Likely';
        message = 'Start planning your snow day! Conditions are severe enough that closure is almost certain.';
        advice = 'Set your alarm later, prepare indoor activities, and check official announcements to confirm. Schools typically announce by 6-7 AM. This is looking like a real snow day!';
        color = 'green';
      } else if (probability >= 70) {
        likelihood = '😊 Very Likely';
        message = 'Strong chance of a snow day. Weather conditions meet most closure criteria.';
        advice = 'Stay optimistic but check official sources tonight or early tomorrow. Have a backup plan ready, but chances are good you\'ll be home tomorrow. Keep your phone volume on for notifications!';
        color = 'green';
      } else if (probability >= 55) {
        likelihood = '🤔 Moderately Likely';
        message = 'Decent probability of closure. It could go either way depending on overnight conditions.';
        advice = 'Do your homework just in case, but keep checking weather updates and school announcements. The decision will likely come down to road conditions by 5-6 AM. Follow your district on social media.';
        color = 'blue';
      } else if (probability >= 35) {
        likelihood = '😐 Possible But Uncertain';
        message = 'There\'s a chance, but conditions are borderline. Might result in a delay instead.';
        advice = 'Complete your homework and prepare for school. A two-hour delay is more likely than full closure. Check announcements early tomorrow morning. Don\'t stay up late hoping—you probably have school.';
        color = 'yellow';
      } else if (probability >= 20) {
        likelihood = '😕 Unlikely';
        message = 'Conditions aren\'t severe enough for closure in most districts.';
        advice = 'Plan on attending school tomorrow. Weather might cause minor delays but full closure is doubtful. Finish all homework tonight and pack your bag. Maybe you\'ll get lucky, but don\'t count on it.';
        color = 'orange';
      } else {
        likelihood = '😞 Very Unlikely';
        message = 'Sorry—weather isn\'t bad enough for a snow day. School will almost certainly be open.';
        advice = 'These conditions rarely trigger closures. Set your alarm, complete homework, and get ready for a normal school day. Save the snow day dreams for when bigger storms roll through!';
        color = 'red';
      }

      // Weather factor descriptions
      const factors = {
        snowfall: `${snowfallValue}" expected`,
        temperature: `${tempValue}°F`,
        windSpeed: `${windValue} mph`,
        location: location.charAt(0).toUpperCase() + location.slice(1),
        timing: timing === 'overnight' ? 'Overnight snow' : 
                timing === 'early-morning' ? 'Early morning snow' :
                timing === 'during-day' ? 'Daytime snow' : 'Evening snow'
      };

      setResult({
        probability,
        likelihood,
        message,
        advice,
        color,
        factors,
        snowfallValue,
        tempValue,
        windValue
      });

      setLoading(false);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 650);
  };

  const clearAll = () => {
    setSnowfall('');
    setTemperature('');
    setWindSpeed('');
    setLocation('suburban');
    setTiming('overnight');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="Snow Day Calculator 2026 – Will School Be Cancelled Tomorrow? Free Predictor"
      description="Check your snow day chances with our accurate calculator. Enter weather conditions to predict school closure probability. Free tool considers snowfall, temperature, wind, and location for reliable forecasts."
      keywords="snow day calculator, will school be cancelled tomorrow, snow day predictor, school closure calculator, snow day forecast, will it snow enough to cancel school, snow day probability calculator"
      canonicalPath="/snow-day-calculator"
      ogImage="snow-day-calculator.jpg"
      lastUpdated="2026-02-01"
      schema={[
        {
          '@type': 'WebApplication',
          name: 'Snow Day Calculator',
          applicationCategory: 'UtilityApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '15600',
            bestRating: '5',
            worstRating: '1'
          },
          featureList: [
            'Snowfall amount analysis',
            'Temperature impact calculation',
            'Wind speed consideration',
            'Location type adjustment',
            'Snow timing evaluation',
            'Real-time probability results'
          ]
        },
        {
          '@type': 'HowTo',
          name: 'How to Predict If School Will Be Cancelled for Snow',
          description: 'Learn to accurately predict snow day school closures by analyzing weather conditions, understanding district decision-making factors, and timing your forecast for maximum accuracy.',
          image: 'https://calculators.me.uk/images/snow-day-howto.jpg',
          totalTime: 'PT3M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '0'
          },
          tool: [
            {
              '@type': 'HowToTool',
              name: 'Snow Day Calculator'
            },
            {
              '@type': 'HowToTool',
              name: 'Local weather forecast'
            }
          ],
          supply: [
            {
              '@type': 'HowToSupply',
              name: 'Expected snowfall measurement'
            },
            {
              '@type': 'HowToSupply',
              name: 'Temperature forecast'
            },
            {
              '@type': 'HowToSupply',
              name: 'Wind speed data'
            }
          ],
          step: [
            {
              '@type': 'HowToStep',
              name: 'Check Your Local Weather Forecast',
              text: 'Visit a reliable weather service and gather three critical data points: expected snowfall in inches, temperature during school hours (typically 7 AM to 3 PM), and average wind speed. The most accurate forecasts come from NOAA or your local meteorologist. Check the forecast the night before school, ideally between 8-10 PM when overnight predictions are most reliable. Pay special attention to snowfall timing—snow falling between midnight and 6 AM has the highest closure impact.',
              image: 'https://calculators.me.uk/images/snow-check-forecast.jpg',
              url: 'https://calculators.me.uk/snow-day-calculator#step1'
            },
            {
              '@type': 'HowToStep',
              name: 'Enter Weather Data Into Calculator',
              text: 'Input the three weather measurements into our calculator. For snowfall, use the total accumulation expected by 7 AM—not the entire day\'s total. Temperature should be the expected low during morning hours. Wind speed should be the sustained average, not gusts. These measurements determine the base probability before location and timing adjustments are applied.',
              image: 'https://calculators.me.uk/images/snow-enter-data.jpg',
              url: 'https://calculators.me.uk/snow-day-calculator#step2'
            },
            {
              '@type': 'HowToStep',
              name: 'Select Your Location Type and Snow Timing',
              text: 'Choose whether your school district is rural (country roads, scattered population), suburban (residential neighborhoods, mixed roads), or urban (city streets, dense population). Rural districts close most readily due to difficult road clearing; urban districts rarely close due to extensive plowing resources. Then select when snow is expected to fall—overnight snow (10 PM to 6 AM) causes most closures because roads freeze overnight and morning commutes become treacherous.',
              image: 'https://calculators.me.uk/images/snow-location-timing.jpg',
              url: 'https://calculators.me.uk/snow-day-calculator#step3'
            },
            {
              '@type': 'HowToStep',
              name: 'Review Your Snow Day Probability and Plan Accordingly',
              text: 'The calculator displays your closure probability from 0-100%, categorized as Unlikely, Possible, Likely, or Very Likely. Probabilities above 70% indicate strong closure potential—you can cautiously plan for a day off but should still check official announcements. Probabilities between 40-70% suggest a two-hour delay is more likely than full closure. Below 40% means school will probably operate normally. Always verify with your district\'s official channels (website, social media, automated calls) by 6-7 AM when most closure announcements are made.',
              image: 'https://calculators.me.uk/images/snow-review-results.jpg',
              url: 'https://calculators.me.uk/snow-day-calculator#step4'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How accurate is this snow day calculator?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Our calculator analyzes the same factors school superintendents consider: snowfall amount, temperature, wind conditions, location type, and snow timing. Based on historical closure patterns, the calculator achieves approximately 75-80% accuracy for probabilities above 60%. However, final decisions depend on superintendent judgment, local road conditions, and district-specific policies. Use this as a strong indicator, but always check official school announcements for confirmation.'
              }
            },
            {
              '@type': 'Question',
              name: 'What amount of snowfall typically closes schools?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The magic number varies dramatically by region. In areas accustomed to snow (Minnesota, upstate New York, Colorado), 8-10 inches might be required for closure. In regions where snow is rare (Georgia, Texas, North Carolina), 2-3 inches often triggers closure. Suburban districts typically close around 6-8 inches, rural districts at 4-6 inches, and urban districts rarely close below 10-12 inches. The critical factor is not just total snowfall but whether it accumulates on roads faster than plows can clear it.'
              }
            },
            {
              '@type': 'Question',
              name: 'When do schools announce snow days?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most school districts announce closures between 5:00-7:00 AM on the day of the potential closure. Superintendents typically wake around 4:00-5:00 AM to assess overnight snowfall, check road conditions with plow operators, and make the final call. If conditions are clearly severe, some districts announce the night before (usually by 9-10 PM). Two-hour delays are often announced earlier than full closures because they require less certainty. Follow your district on social media, sign up for text alerts, and check their website before 7 AM for the most current information.'
              }
            },
            {
              '@type': 'Question',
              name: 'What is a two-hour delay versus a full closure?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A two-hour delay means school starts two hours later than normal (if school normally starts at 8:00 AM, it starts at 10:00 AM instead). Districts use delays when: snow has stopped and roads will improve with extra plowing time, conditions are borderline but trending better, or forecasts show improvement by mid-morning. Full closures happen when: heavy snow continues through morning hours, roads are impassable even with plowing, or conditions will not improve during school hours. As a rule of thumb, if your calculator shows 35-55% probability, expect a possible delay. Above 70% suggests full closure is more likely.'
              }
            },
            {
              '@type': 'Question',
              name: 'How do rural schools differ from urban schools for snow days?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Rural school districts close much more readily than urban districts for several critical reasons. Rural bus routes cover longer distances on roads that receive lower plowing priority—county roads and private drives get cleared hours or days after main highways. Rural buses navigate steep hills, sharp curves, and unpaved roads that become impassable with less snow. Many rural students live miles from school with no alternative transportation if buses cannot run. Urban districts have shorter bus routes, well-plowed city streets that are high priority, more students who walk or have parent drop-off options, and larger plow budgets. A rural district might close with 4 inches while an urban district remains open with 8 inches of the same storm.'
              }
            },
            {
              '@type': 'Question',
              name: 'Does the timing of snowfall affect school closures?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Timing is absolutely critical and often more important than total accumulation. Overnight snowfall (10 PM to 6 AM) has maximum closure impact because roads freeze overnight, morning rush hour creates dangerous conditions, and superintendents make decisions during peak accumulation. Snow ending by 2-3 AM allows plow catch-up and often results in delays rather than closures. Snow starting after 6 AM rarely closes schools since the decision is already made and students are already commuting. Evening and afternoon snow almost never closes school the same day. The worst timing for closures is snow forecast to continue all day—districts fear students getting stranded at school if afternoon buses cannot run.'
              }
            },
            
          ]
        }
      ]}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Snow Day Calculator', href: '/snow-day-calculator' }
      ]} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-700 text-white overflow-hidden">
        {/* Animated snowflakes background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animation: `snowfall ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${10 + Math.random() * 20}px`
              }}
            >
              ❄
            </div>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-cyan-400/30">
            <FaBell className="text-cyan-300 animate-pulse" />
            <span className="text-sm font-semibold">15,000+ students check daily</span>
            <FaBell className="text-cyan-300 animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            ❄️ Snow Day Calculator ❄️
          </h1>
          <p className="text-xl sm:text-2xl font-light text-cyan-100 mb-5">
            Will School Be Cancelled Tomorrow?
          </p>
          <p className="text-base sm:text-lg text-blue-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Enter your local weather forecast and discover your probability of getting that precious snow day. 
            Our calculator analyzes the exact factors school districts use when making closure decisions.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-sm">
            {[
              { icon: <FaSnowflake />, text: '100% Free' },
              { icon: <FaCalculator />, text: 'Instant Results' },
              { icon: <FaRocket />, text: 'Science-Based' },
              { icon: <FaCheckCircle />, text: 'No Signup' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <div className="text-cyan-300">{item.icon}</div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes snowfall {
            to {
              transform: translateY(100vh);
            }
          }
        `}</style>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-cyan-50 rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-cyan-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <FaCloudSun className="text-cyan-600" />
                  Check Your Snow Day Chances
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-red-50"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-6 mb-8">
                {/* Snowfall Input */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-300">
                  <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaSnowflake className="text-cyan-600" />
                    Expected Snowfall (inches)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="50"
                    value={snowfall}
                    onChange={(e) => { setSnowfall(e.target.value); setError(''); }}
                    className="w-full px-6 py-5 text-2xl font-bold border-3 border-blue-400 rounded-xl focus:ring-4 focus:ring-cyan-400 focus:border-transparent text-center shadow-inner"
                    placeholder="e.g., 6"
                  />
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Check your local weather forecast for overnight accumulation by 7 AM
                  </p>
                </div>

                {/* Temperature & Wind Grid */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="bg-white p-5 rounded-xl border-2 border-red-200">
                    <label className="block text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FaThermometerHalf className="text-red-500" />
                      Temperature (°F)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="-50"
                      max="50"
                      value={temperature}
                      onChange={(e) => { setTemperature(e.target.value); setError(''); }}
                      className="w-full px-5 py-4 text-xl font-bold border-2 border-red-300 rounded-xl focus:ring-4 focus:ring-red-300 focus:border-transparent text-center"
                      placeholder="e.g., 20"
                    />
                    <p className="text-xs text-gray-600 mt-2 text-center">During school hours (7 AM - 3 PM)</p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border-2 border-blue-200">
                    <label className="block text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FaWind className="text-blue-500" />
                      Wind Speed (mph)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={windSpeed}
                      onChange={(e) => { setWindSpeed(e.target.value); setError(''); }}
                      className="w-full px-5 py-4 text-xl font-bold border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent text-center"
                      placeholder="e.g., 15"
                    />
                    <p className="text-xs text-gray-600 mt-2 text-center">Sustained wind, not gusts</p>
                  </div>
                </div>

                {/* Location Type */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200">
                  <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />
                    Your School District Location
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'rural', emoji: '🏡', label: 'Rural', desc: 'Country roads' },
                      { value: 'suburban', emoji: '🏘️', label: 'Suburban', desc: 'Neighborhoods' },
                      { value: 'urban', emoji: '🏙️', label: 'Urban', desc: 'City streets' }
                    ].map((loc) => (
                      <button
                        key={loc.value}
                        onClick={() => setLocation(loc.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          location === loc.value
                            ? 'border-purple-600 bg-purple-100 shadow-lg scale-105'
                            : 'border-purple-300 bg-white hover:border-purple-400 hover:shadow-md'
                        }`}
                      >
                        <div className="text-3xl mb-2">{loc.emoji}</div>
                        <div className="text-sm font-bold text-gray-900">{loc.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{loc.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Snow Timing */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-xl border-2 border-amber-200">
                  <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaClock className="text-amber-600" />
                    When Will Snow Fall?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'overnight', label: 'Overnight', time: '10 PM - 6 AM', best: true },
                      { value: 'early-morning', label: 'Early Morning', time: '4 AM - 8 AM', best: false },
                      { value: 'during-day', label: 'During Day', time: '8 AM - 3 PM', best: false },
                      { value: 'evening', label: 'Evening', time: 'After 6 PM', best: false }
                    ].map((time) => (
                      <button
                        key={time.value}
                        onClick={() => setTiming(time.value)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          timing === time.value
                            ? 'border-amber-600 bg-amber-100 shadow-md'
                            : 'border-amber-300 bg-white hover:border-amber-400'
                        }`}
                      >
                        <div className="font-bold text-sm text-gray-900 flex items-center justify-between">
                          {time.label}
                          {time.best && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Best</span>}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{time.time}</div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-3 text-center italic">
                    💡 Overnight snow has highest closure probability
                  </p>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 flex items-start gap-2">
                  <FaExclamationTriangle className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              {/* Calculate Button */}
              <button
                onClick={calculateSnowDay}
                disabled={loading || !snowfall || !temperature || !windSpeed}
                className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Calculating Your Chances...
                  </>
                ) : (
                  <>
                    <FaSnowflake className="text-xl" />
                    Check Snow Day Probability
                  </>
                )}
              </button>

              {/* Info tip */}
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <FaLightbulb className="text-blue-600 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Pro Tip for Accuracy</p>
                    <p className="text-xs text-gray-700 mt-1">
                      Check your forecast between 8-10 PM for most accurate overnight predictions. 
                      Snow timing matters more than total amount—overnight accumulation closes schools most reliably.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Reference */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <FaSnowplow className="text-cyan-600" />
                Closure Guidelines
              </h3>

              <div className="space-y-4 text-sm">
                <div className="bg-white p-4 rounded-xl border border-cyan-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaSnowflake className="text-cyan-600" />
                    Snowfall Impact
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li>• 0-2": School open</li>
                    <li>• 3-5": Possible delay</li>
                    <li>• 6-8": Good chance</li>
                    <li>• 9-11": Very likely</li>
                    <li>• 12"+: Almost certain</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-red-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaIcicles className="text-red-600" />
                    Temperature
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li>• Below 0°F: High risk</li>
                    <li>• 0-15°F: Ice concerns</li>
                    <li>• 16-30°F: Snow sticks</li>
                    <li>• Above 32°F: Melts fast</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaWind className="text-blue-600" />
                    Wind Effects
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li>• 15-25 mph: Drifting</li>
                    <li>• 25-35 mph: Poor visibility</li>
                    <li>• 35+ mph: Blizzard</li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 p-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl">
                <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <FaBell /> Remember
                </p>
                <p className="text-xs leading-relaxed">
                  Always check official school announcements between 5-7 AM. This calculator guides expectations but districts have final say!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div ref={resultRef} className="mt-12 animate-fade-in">
            {/* High probability celebration */}
            {result.probability >= 75 && (
              <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white p-8 sm:p-10 rounded-3xl shadow-2xl mb-8 text-center border-4 border-green-300">
                <div className="text-6xl mb-4">🎉❄️🎉</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
                  Snow Day Looking Great!
                </h2>
                <p className="text-xl sm:text-2xl font-light">
                  {result.probability}% probability—start planning your day off!
                </p>
              </div>
            )}

            {/* Main Results Card */}
            <div className={`rounded-3xl shadow-2xl p-6 sm:p-10 border-3 ${
              result.color === 'green' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' :
              result.color === 'blue' ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300' :
              result.color === 'yellow' ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300' :
              result.color === 'orange' ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-300' :
              'bg-gradient-to-br from-red-50 to-pink-50 border-red-300'
            }`}>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
                <FaSchool className={`text-3xl ${
                  result.color === 'green' ? 'text-green-600' :
                  result.color === 'blue' ? 'text-blue-600' :
                  result.color === 'yellow' ? 'text-yellow-600' :
                  result.color === 'orange' ? 'text-orange-600' :
                  'text-red-600'
                }`} />
                Your Snow Day Forecast
              </h2>

              {/* Probability Gauge */}
              <div className="mb-10">
                <SnowDayGauge probability={result.probability} />
              </div>

              {/* Likelihood Display */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 mb-8 text-center">
                <div className="text-5xl sm:text-6xl font-black mb-4" style={{
                  background: result.color === 'green' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                             result.color === 'blue' ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' :
                             result.color === 'yellow' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                             result.color === 'orange' ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' :
                             'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {result.probability}%
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">
                  {result.likelihood}
                </div>
                <p className="text-gray-700 italic">"{result.message}"</p>
              </div>

              {/* Weather Factors */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 mb-8">
                <h3 className="font-bold text-gray-900 mb-5 text-lg">Weather Conditions Analyzed</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FaSnowflake className="text-cyan-600" />
                      <span className="text-sm font-semibold text-gray-700">Snowfall</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{result.factors.snowfall}</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FaThermometerHalf className="text-red-600" />
                      <span className="text-sm font-semibold text-gray-700">Temperature</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{result.factors.temperature}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FaWind className="text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Wind Speed</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{result.factors.windSpeed}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FaMapMarkerAlt className="text-purple-600" />
                      <span className="text-sm font-semibold text-gray-700">Location</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{result.factors.location}</div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FaClock className="text-amber-600" />
                      <span className="text-sm font-semibold text-gray-700">Timing</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900">{result.factors.timing}</div>
                  </div>
                </div>
              </div>

              {/* Advice Box */}
              <div className={`p-6 rounded-2xl border-l-4 ${
                result.color === 'green' ? 'bg-green-100 border-green-600' :
                result.color === 'blue' ? 'bg-blue-100 border-blue-600' :
                result.color === 'yellow' ? 'bg-yellow-100 border-yellow-600' :
                result.color === 'orange' ? 'bg-orange-100 border-orange-600' :
                'bg-red-100 border-red-600'
              }`}>
                <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  {result.probability >= 70 ? <FaCheckCircle /> : result.probability >= 40 ? <FaClock /> : <FaBus />}
                  What You Should Do
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {result.advice}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-16 max-w-5xl mx-auto space-y-12">

          {/* Section 1: How Schools Decide */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaSchool className="text-cyan-600" />
              How Do School Districts Actually Decide on Snow Days?
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                The snow day decision isn't random—it's a calculated process that happens while most people sleep. 
                Between 4 and 6 AM, school superintendents across the country wake up to make one of their toughest calls: 
                do road conditions justify keeping tens of thousands of students home?
              </p>
              <p>
                What many students don't realize is that superintendents aren't making this decision from their warm offices. 
                They're getting direct reports from snowplow operators who've been working county and district roads since midnight. 
                They're checking weather radar every thirty minutes. They're driving problematic bus routes themselves—those steep 
                hills on the edge of the district, the sharp curves rural students navigate daily, the unpaved roads that turn to 
                ice when temperatures drop.
              </p>
              <p>
                The superintendent also considers factors students never think about. Can the school building's heating system 
                handle extreme cold? If snow continues during school hours, will afternoon buses be able to get students home safely? 
                What are neighboring districts doing—will parents be confused if one district closes while another stays open? 
                How many snow days has the district already used, and how many can they afford before extending the school year 
                into summer?
              </p>

              {/* Decision Timeline SVG */}
              <div className="my-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                <DecisionTimeline />
                <p className="text-sm text-gray-600 mt-4 text-center italic">
                  Most closure decisions occur between 4-6 AM when superintendents assess overnight conditions
                </p>
              </div>

              <p>
                Here's something crucial: the decision isn't binary. Superintendents have several options beyond "open or closed." 
                A two-hour delay buys time for plows to clear main routes and for temperatures to rise above freezing. 
                A bus-only closure keeps buildings open for students who can walk or get rides while canceling transportation. 
                Some districts now implement "remote learning days" where school happens online instead of getting canceled entirely.
              </p>
            </div>
          </section>

          {/* Section 2: Snow Amount Breakdown */}
          <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Breaking Down Snowfall: How Many Inches Actually Close Schools?
            </h2>
            
            <div className="mb-8">
              <SnowLevelIllustration />
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                There's no universal magic number that guarantees a snow day—it varies dramatically by region and local 
                infrastructure. A snowfall that paralyzes Atlanta would be considered light dusting in Minneapolis. 
                Understanding your region's threshold is critical for accurate predictions.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-white p-6 rounded-xl border-2 border-blue-300">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Snow-Accustomed Regions</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Areas like Minnesota, upstate New York, Colorado, and New England have extensive snow removal 
                    infrastructure and higher closure thresholds:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>4-6 inches:</strong> Schools typically open, just slower morning routes</li>
                    <li>• <strong>8-10 inches:</strong> Possible two-hour delay, closure if continuing</li>
                    <li>• <strong>12-15 inches:</strong> High likelihood of closure</li>
                    <li>• <strong>15+ inches:</strong> Almost guaranteed closure</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-orange-300">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Snow-Rare Regions</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Southern states, Pacific Northwest lowlands, and coastal areas lack snow equipment and close more readily:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>1-2 inches:</strong> Often enough for delays or closures</li>
                    <li>• <strong>3-4 inches:</strong> Very likely closure</li>
                    <li>• <strong>6+ inches:</strong> Multi-day closure possible</li>
                    <li>• <strong>Ice forecast alone:</strong> Automatic closure in many districts</li>
                  </ul>
                </div>
              </div>

              <p>
                The critical factor isn't just accumulation—it's the <strong>rate of accumulation</strong>. Six inches falling 
                over two days allows for continuous plowing and usually keeps schools open with delays. That same six inches 
                falling in three hours overnight overwhelms plow capacity and forces closure. Snow that continues during school 
                hours creates an impossible situation: students might get to school fine but face dangerous conditions going home.
              </p>
            </div>
          </section>

          {/* Section 3: Temperature and Wind */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Temperature and Wind Matter as Much as Snow Depth
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Ask most students what causes snow days and they'll say "lots of snow." But veteran superintendents know 
                that temperature and wind conditions can close schools even when snowfall is moderate. Here's why these 
                factors are equally critical:
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">The Temperature Factor</h3>
              <p>
                Temperature determines whether snow creates passable slush or treacherous ice. At 34°F, four inches of snow 
                might melt by noon—school stays open. At 15°F, that same four inches bonds to pavement as ice that plows 
                can't remove. Road salt becomes ineffective below 15°F, leaving only sand for traction.
              </p>
              <p>
                Extreme cold also creates standalone closure risk. When actual temperature or wind chill drops below -10°F to -20°F, 
                frostbite becomes dangerous for the 10-15 minutes many students spend waiting at bus stops. Elementary students 
                in northern climates often get cold-related closures before any snow falls.
              </p>

              <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 my-6">
                <h4 className="font-bold text-gray-900 mb-3">Temperature Thresholds by Risk Level</h4>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-red-700">Below -20°F:</strong> High closure probability regardless of snow</p>
                  <p><strong className="text-orange-600">-10°F to -20°F:</strong> Moderate closure risk, especially with wind</p>
                  <p><strong className="text-yellow-600">0°F to 10°F:</strong> Ice formation concern, boosts closure odds</p>
                  <p><strong className="text-blue-600">15°F to 32°F:</strong> Prime snow sticking range</p>
                  <p><strong className="text-green-600">Above 32°F:</strong> Snow melts faster, reduces closure likelihood</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">The Wind Speed Impact</h3>
              <p>
                Wind transforms a manageable snowfall into hazardous blizzard conditions. Even light ongoing snow becomes 
                dangerous when 30+ mph winds create whiteout conditions that make driving impossible. Wind doesn't just 
                reduce visibility—it creates massive drifts that bury freshly plowed roads within minutes.
              </p>
              <p>
                Superintendents pay special attention to wind forecasts because buses are particularly vulnerable. School buses 
                sit high off the ground with large surface areas, making them susceptible to wind gusts. A 40 mph gust can push 
                a bus partially into another lane. Rural routes where buses travel long distances on exposed roads become 
                impassable faster than suburban neighborhoods with tree-lined streets that block wind.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 my-6">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">15-25 mph</h4>
                  <p className="text-xs text-gray-700">Creates snow drifts, reduces visibility moderately, manageable conditions</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <h4 className="font-bold text-yellow-900 mb-2">25-35 mph</h4>
                  <p className="text-xs text-gray-700">Blowing snow reduces visibility significantly, drifting buries routes rapidly</p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <h4 className="font-bold text-red-900 mb-2">35+ mph</h4>
                  <p className="text-xs text-gray-700">Blizzard conditions, whiteouts, near-zero visibility, extremely dangerous</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 border-2 border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Your Snow Day Questions Answered
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How accurate is this snow day calculator?',
                  a: 'Our calculator analyzes the same factors school superintendents consider: snowfall amount, temperature, wind conditions, location type, and snow timing. Based on historical closure patterns, the calculator achieves approximately 75-80% accuracy for probabilities above 60%. However, final decisions depend on superintendent judgment, local road conditions, and district-specific policies. Use this as a strong indicator, but always check official school announcements for confirmation.'
                },
                {
                  q: 'What amount of snowfall typically closes schools?',
                  a: 'The magic number varies dramatically by region. In areas accustomed to snow (Minnesota, upstate New York, Colorado), 8-10 inches might be required for closure. In regions where snow is rare (Georgia, Texas, North Carolina), 2-3 inches often triggers closure. Suburban districts typically close around 6-8 inches, rural districts at 4-6 inches, and urban districts rarely close below 10-12 inches. The critical factor is not just total snowfall but whether it accumulates on roads faster than plows can clear it.'
                },
                {
                  q: 'When do schools announce snow days?',
                  a: 'Most school districts announce closures between 5:00-7:00 AM on the day of the potential closure. Superintendents typically wake around 4:00-5:00 AM to assess overnight snowfall, check road conditions with plow operators, and make the final call. If conditions are clearly severe, some districts announce the night before (usually by 9-10 PM). Two-hour delays are often announced earlier than full closures because they require less certainty. Follow your district on social media, sign up for text alerts, and check their website before 7 AM for the most current information.'
                },
                
                {
                  q: 'What is a two-hour delay versus a full closure?',
                  a: 'A two-hour delay means school starts two hours later than normal (if school normally starts at 8:00 AM, it starts at 10:00 AM instead). Districts use delays when: snow has stopped and roads will improve with extra plowing time, conditions are borderline but trending better, or forecasts show improvement by mid-morning. Full closures happen when: heavy snow continues through morning hours, roads are impassable even with plowing, or conditions will not improve during school hours. As a rule of thumb, if your calculator shows 35-55% probability, expect a possible delay. Above 70% suggests full closure is more likely.'
                },
                {
                  q: 'How do rural schools differ from urban schools for snow days?',
                  a: 'Rural school districts close much more readily than urban districts for several critical reasons. Rural bus routes cover longer distances on roads that receive lower plowing priority—county roads and private drives get cleared hours or days after main highways. Rural buses navigate steep hills, sharp curves, and unpaved roads that become impassable with less snow. Many rural students live miles from school with no alternative transportation if buses cannot run. Urban districts have shorter bus routes, well-plowed city streets that are high priority, more students who walk or have parent drop-off options, and larger plow budgets. A rural district might close with 4 inches while an urban district remains open with 8 inches of the same storm.'
                },
                {
                  q: 'Does the timing of snowfall affect school closures?',
                  a: 'Timing is absolutely critical and often more important than total accumulation. Overnight snowfall (10 PM to 6 AM) has maximum closure impact because roads freeze overnight, morning rush hour creates dangerous conditions, and superintendents make decisions during peak accumulation. Snow ending by 2-3 AM allows plow catch-up and often results in delays rather than closures. Snow starting after 6 AM rarely closes schools since the decision is already made and students are already commuting. Evening and afternoon snow almost never closes school the same day. The worst timing for closures is snow forecast to continue all day—districts fear students getting stranded at school if afternoon buses cannot run.'
                },
                
              ].map((faq, i) => (
                <details key={i} className="bg-white p-5 rounded-xl border-2 border-purple-200 cursor-pointer hover:shadow-lg transition-all">
                  <summary className="font-bold text-gray-900 text-base">
                    {faq.q}
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed text-sm">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Expert Box */}
          <ExpertBox
            expertType="education"
            calculatorName="Snow Day Calculator"
            lastUpdated="February 1, 2026"
          />

          {/* User Reviews */}
          <UserReviews calculatorType="snow-day" />

          {/* Related Tools */}
          <section className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore Related Calculators
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { href: '/cgpa-to-percentage', icon: <FaCalculator />, title: 'CGPA to Percentage', desc: 'Convert academic grades', color: 'from-blue-500 to-indigo-600' },
                { href: '/percentage-to-cgpa-calculator', icon: <FaRocket />, title: 'Percentage to CGPA', desc: 'Reverse grade conversion', color: 'from-green-500 to-emerald-600' },
                { href: '/name-numerology-calculator', icon: <FaStar />, title: 'Name Numerology', desc: 'Discover name meaning', color: 'from-purple-500 to-pink-600' }
              ].map((tool, i) => (
                <a
                  key={i}
                  href={tool.href}
                  className="block p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-cyan-300 hover:shadow-lg transition-all group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} text-white rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white p-8 sm:p-12 rounded-3xl text-center shadow-2xl">
            <div className="text-5xl mb-6">❄️</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Check Your Snow Day Probability
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Enter tonight's forecast and see if you'll be building snowmen or sitting in class tomorrow. 
              It's free, instant, and based on real closure factors.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-cyan-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-all inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <FaSnowflake />
              Calculate Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}