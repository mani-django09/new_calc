import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import UserReviews from '../components/UserReviews';
import ExpertBox from '../components/ExpertBox';
import {
  FaHashtag,
  FaStar,
  FaHeart,
  FaLightbulb,
  FaInfoCircle,
  FaCheckCircle,
  FaRocket,
  FaMagic,
  FaBook,
  FaGem,
  FaInfinity,
  FaEye,
  FaCompass,
  FaFeatherAlt,
  FaBolt,
  FaFire,
  FaShieldAlt
} from 'react-icons/fa';

// ─── SVG 1: Pythagorean Number Wheel ──────────────────────────────────────────
// A circular visualization showing how letters map to numbers 1-9
const PythagoreanWheel = () => (
  <svg viewBox="0 0 520 520" className="w-full max-w-lg mx-auto drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer glow ring */}
    <circle cx="260" cy="260" r="240" fill="url(#wheelGlow)" opacity="0.3" />
    
    <defs>
      <radialGradient id="wheelGlow">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="wheelGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="wheelGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>

    {/* Center circle with mystical symbol */}
    <circle cx="260" cy="260" r="85" fill="url(#wheelGrad1)" />
    <circle cx="260" cy="260" r="75" fill="#1f2937" />
    
    {/* Infinity symbol in center */}
    <path d="M235,260 Q220,245 205,260 Q190,275 205,260 Q220,245 235,260 M235,260 Q250,275 265,260 Q280,245 295,260 Q310,275 295,260 Q280,245 265,260" 
      stroke="#fbbf24" strokeWidth="3" fill="none" strokeLinecap="round" />
    
    {/* Number rings - 9 segments */}
    {[...Array(9)].map((_, i) => {
      const angle = (i * 40) - 90;
      const nextAngle = ((i + 1) * 40) - 90;
      const rad1 = (angle * Math.PI) / 180;
      const rad2 = (nextAngle * Math.PI) / 180;
      
      // Outer arc
      const x1 = 260 + 200 * Math.cos(rad1);
      const y1 = 260 + 200 * Math.sin(rad1);
      const x2 = 260 + 200 * Math.cos(rad2);
      const y2 = 260 + 200 * Math.sin(rad2);
      
      // Inner arc
      const x3 = 260 + 130 * Math.cos(rad2);
      const y3 = 260 + 130 * Math.sin(rad2);
      const x4 = 260 + 130 * Math.cos(rad1);
      const y4 = 260 + 130 * Math.sin(rad1);
      
      const colors = [
        '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
        '#ec4899', '#f43f5e', '#14b8a6', '#6366f1'
      ];
      
      const letters = [
        ['A','J','S'], ['B','K','T'], ['C','L','U'], ['D','M','V'], ['E','N','W'],
        ['F','O','X'], ['G','P','Y'], ['H','Q','Z'], ['I','R']
      ];
      
      const midAngle = (angle + nextAngle) / 2;
      const midRad = (midAngle * Math.PI) / 180;
      const labelX = 260 + 165 * Math.cos(midRad);
      const labelY = 260 + 165 * Math.sin(midRad);
      
      return (
        <g key={i}>
          {/* Segment */}
          <path
            d={`M ${x1} ${y1} A 200 200 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 130 130 0 0 0 ${x4} ${y4} Z`}
            fill={colors[i]}
            opacity="0.85"
            stroke="#1f2937"
            strokeWidth="2"
          />
          
          {/* Number label */}
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="28"
            fontWeight="900"
          >
            {i + 1}
          </text>
          
          {/* Letters */}
          <text
            x={260 + 100 * Math.cos(midRad)}
            y={260 + 100 * Math.sin(midRad)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="10"
            fontWeight="700"
          >
            {letters[i].join(' ')}
          </text>
        </g>
      );
    })}
    
    {/* Center text */}
    <text x="260" y="250" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fbbf24">
      Pythagorean
    </text>
    <text x="260" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="#d1d5db">
      Number Wheel
    </text>
  </svg>
);

// ─── SVG 2: Name Energy Flow Visualization ───────────────────────────────────
// Shows how a name's letters flow into a single destiny number
const NameEnergyFlow = ({ exampleName = "MAYA" }) => {
  const letterValues = {
    A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
    J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
    S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8
  };
  
  const letters = exampleName.toUpperCase().split('');
  const values = letters.map(l => letterValues[l] || 0);
  const sum = values.reduce((a, b) => a + b, 0);
  const final = sum > 9 ? String(sum).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0) : sum;
  
  return (
    <svg viewBox="0 0 600 280" className="w-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background gradient */}
      <defs>
        <linearGradient id="flowBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
        <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      
      <rect width="600" height="280" rx="24" fill="url(#flowBg)" />
      
      {/* Letter boxes */}
      {letters.map((letter, i) => {
        const x = 50 + i * 120;
        const y = 50;
        
        return (
          <g key={i}>
            {/* Connection line to center */}
            <path
              d={`M ${x + 45} ${y + 70} Q ${x + 45} 140 300 180`}
              stroke="url(#flowLine)"
              strokeWidth="3"
              strokeDasharray="6 4"
              opacity="0.4"
            />
            
            {/* Letter box */}
            <rect x={x} y={y} width="90" height="90" rx="16" fill="white" stroke="#ec4899" strokeWidth="3" />
            <text x={x + 45} y={y + 50} textAnchor="middle" fontSize="36" fontWeight="900" fill="#1f2937">
              {letter}
            </text>
            <rect x={x + 25} y={y + 65} width="40" height="18" rx="9" fill="#ec4899" />
            <text x={x + 45} y={y + 77} textAnchor="middle" fontSize="12" fontWeight="800" fill="white">
              {values[i]}
            </text>
          </g>
        );
      })}
      
      {/* Sum circle */}
      <circle cx="300" cy="200" r="45" fill="#f59e0b" opacity="0.2" />
      <circle cx="300" cy="200" r="35" fill="#f59e0b" stroke="white" strokeWidth="4" />
      <text x="300" y="195" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">
        SUM
      </text>
      <text x="300" y="212" textAnchor="middle" fontSize="22" fontWeight="900" fill="white">
        {sum}
      </text>
      
      {/* Arrow to final */}
      <path d="M 345 200 L 430 200" stroke="#8b5cf6" strokeWidth="4" markerEnd="url(#arrowhead)" />
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#8b5cf6" />
        </marker>
      </defs>
      
      {/* Final destiny number */}
      <circle cx="500" cy="200" r="55" fill="url(#flowLine)" opacity="0.15" />
      <circle cx="500" cy="200" r="45" fill="url(#flowLine)" stroke="white" strokeWidth="5" />
      <text x="500" y="193" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">
        DESTINY
      </text>
      <text x="500" y="218" textAnchor="middle" fontSize="32" fontWeight="900" fill="white">
        {final}
      </text>
    </svg>
  );
};

// ─── SVG 3: Master Number Cosmic Badge ───────────────────────────────────────
const MasterNumberBadge = ({ number }) => {
  const isSuper = [11, 22, 33].includes(number);
  
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto drop-shadow-2xl">
      <defs>
        <radialGradient id="masterGlow">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="masterGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      
      {isSuper && (
        <>
          {/* Pulsing glow */}
          <circle cx="100" cy="100" r="90" fill="url(#masterGlow)">
            <animate attributeName="r" values="85;95;85" dur="2s" repeatCount="indefinite" />
          </circle>
          
          {/* Rotating stars */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45);
            const x = 100 + 75 * Math.cos((angle * Math.PI) / 180);
            const y = 100 + 75 * Math.sin((angle * Math.PI) / 180);
            
            return (
              <g key={i}>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 100 100`}
                  to={`360 100 100`}
                  dur="20s"
                  repeatCount="indefinite"
                />
                <circle cx={x} cy={y} r="3" fill="#fbbf24" opacity="0.8" />
              </g>
            );
          })}
        </>
      )}
      
      {/* Main circle */}
      <circle cx="100" cy="100" r="70" fill="url(#masterGrad)" stroke="#fef3c7" strokeWidth="4" />
      <circle cx="100" cy="100" r="60" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
      
      {/* Number */}
      <text x="100" y="115" textAnchor="middle" fontSize="48" fontWeight="900" fill="#fbbf24">
        {number}
      </text>
      
      {isSuper && (
        <>
          <text x="100" y="75" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fbbf24">
            ✦ MASTER ✦
          </text>
          <text x="100" y="140" textAnchor="middle" fontSize="8" fontWeight="700" fill="#d97706">
            DIVINE FREQUENCY
          </text>
        </>
      )}
    </svg>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function NameNumerologyCalculator() {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);

  // Calculate numerology - pure client-side
  const calculateNumerology = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (!name.trim()) {
        setError('Please enter a name to reveal its hidden vibration');
        setLoading(false);
        return;
      }

      if (name.trim().length < 2) {
        setError('Name must be at least 2 characters long');
        setLoading(false);
        return;
      }

      // Letter to number mapping (Pythagorean)
      const letterValues = {
        A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
        J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
        S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8
      };

      const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
      const breakdown = cleanName.split('').map(letter => ({
        letter,
        value: letterValues[letter] || 0
      }));

      let sum = breakdown.reduce((acc, item) => acc + item.value, 0);
      let nameNumber = sum;

      // Reduce to single digit unless master number
      while (nameNumber > 9 && ![11, 22, 33].includes(nameNumber)) {
        nameNumber = String(nameNumber).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
      }

      // Determine meaning and traits
      const meanings = {
        1: {
          title: 'The Pioneer & Natural Leader',
          essence: 'You carry the vibration of independence, innovation, and raw creative force. Your name pulses with the energy of new beginnings, individual strength, and the courage to stand alone when necessary.',
          traits: ['Natural-born leader with magnetic charisma', 'Fiercely independent thinker who forges original paths', 'Courageous pioneer unafraid of uncharted territory', 'Strong-willed with unwavering determination', 'Innovative mind that sees possibilities others miss'],
          challenges: 'Learning to collaborate without losing your identity, tempering impatience with compassion',
          career: 'Entrepreneur, CEO, Director, Innovation Leader, Self-Employment',
          element: 'Fire',
          color: '#ef4444',
          planet: 'Sun'
        },
        2: {
          title: 'The Harmonizer & Diplomatic Soul',
          essence: 'Your name resonates with gentle strength, intuitive wisdom, and the profound ability to bring opposing forces into balance. You are the bridge-builder, the peacemaker whose sensitivity creates harmony from chaos.',
          traits: ['Exceptional emotional intelligence and empathy', 'Natural diplomat who resolves conflicts gracefully', 'Highly intuitive with psychic sensitivities', 'Patient listener who truly understands others', 'Cooperative team player who elevates everyone'],
          challenges: 'Setting firm boundaries, avoiding people-pleasing patterns, trusting your own voice',
          career: 'Counselor, Mediator, Therapist, HR Professional, Partner Relations',
          element: 'Water',
          color: '#3b82f6',
          planet: 'Moon'
        },
        3: {
          title: 'The Creative Expresser & Social Butterfly',
          essence: 'Joy, creativity, and self-expression flow through your name like a river of light. You are blessed with the gift of communication, artistic vision, and the ability to uplift others through your natural enthusiasm.',
          traits: ['Exceptional communication and artistic abilities', 'Magnetic charm that draws people naturally', 'Optimistic outlook that inspires hope in others', 'Creative problem-solver with unique perspectives', 'Natural entertainer who brings joy to gatherings'],
          challenges: 'Focusing scattered energies, committing to completion, managing superficiality',
          career: 'Writer, Artist, Speaker, Entertainer, Marketing Creative, Social Media',
          element: 'Air',
          color: '#f59e0b',
          planet: 'Jupiter'
        },
        4: {
          title: 'The Builder & Practical Achiever',
          essence: 'Your name carries the solid, dependable energy of earth itself. You are the foundation upon which great things are built, combining discipline, organization, and unwavering commitment to create lasting structures.',
          traits: ['Rock-solid reliability people can always count on', 'Exceptional organizational and planning skills', 'Strong work ethic with dedication to quality', 'Practical problem-solver grounded in reality', 'Patient persistence that overcomes any obstacle'],
          challenges: 'Embracing flexibility, releasing rigidity, allowing spontaneity into structured life',
          career: 'Project Manager, Engineer, Accountant, Architect, Systems Analyst',
          element: 'Earth',
          color: '#10b981',
          planet: 'Uranus'
        },
        5: {
          title: 'The Freedom Seeker & Adventurous Spirit',
          essence: 'Change, freedom, and endless variety pulse through your name. You are the eternal wanderer, the curious explorer who refuses to be confined, always seeking new experiences and authentic self-expression.',
          traits: ['Adaptable chameleon thriving in changing environments', 'Adventurous spirit with insatiable curiosity', 'Magnetic personality attracting diverse experiences', 'Quick-thinking versatility in any situation', 'Progressive mindset embracing innovation'],
          challenges: 'Developing consistency, avoiding restlessness, completing what you start',
          career: 'Travel Industry, Sales, Marketing, Journalism, Event Planning, Consulting',
          element: 'Air/Fire',
          color: '#8b5cf6',
          planet: 'Mercury'
        },
        6: {
          title: 'The Nurturer & Responsible Guardian',
          essence: 'Love, responsibility, and service to others define your name\'s vibration. You are the caretaker of humanity, blessed with deep compassion and an innate drive to create beauty, harmony, and healing wherever you go.',
          traits: ['Deeply nurturing with unconditional love to give', 'Strong sense of responsibility toward family and community', 'Natural counselor with healing presence', 'Artistic eye creating beauty and comfort', 'Protective guardian of those in your care'],
          challenges: 'Avoiding martyrdom, balancing self-care with service, releasing perfectionism',
          career: 'Teacher, Nurse, Interior Designer, Social Worker, Chef, Family Counselor',
          element: 'Earth/Water',
          color: '#ec4899',
          planet: 'Venus'
        },
        7: {
          title: 'The Mystic Seeker & Analytical Mind',
          essence: 'Mystery, wisdom, and spiritual depth permeate your name. You are the seeker of hidden truths, combining analytical brilliance with intuitive knowing, always searching beneath surface appearances for deeper meaning.',
          traits: ['Profound analytical and research capabilities', 'Strong spiritual connection and intuition', 'Introspective nature seeking deeper understanding', 'Intellectual depth with philosophical mindset', 'Independent thinker valuing solitude for reflection'],
          challenges: 'Balancing isolation with connection, trusting emotions alongside logic, sharing wisdom',
          career: 'Researcher, Scientist, Philosopher, Spiritual Teacher, Analyst, Psychologist',
          element: 'Water/Air',
          color: '#6366f1',
          planet: 'Neptune'
        },
        8: {
          title: 'The Executive & Material Master',
          essence: 'Power, abundance, and material mastery flow through your name. You possess the rare combination of ambition, business acumen, and organizational genius required to manifest wealth and achieve worldly success.',
          traits: ['Natural executive with commanding presence', 'Exceptional business and financial judgment', 'Goal-oriented achiever with strategic vision', 'Confident decision-maker in high-pressure situations', 'Ambitious drive to create material abundance'],
          challenges: 'Balancing material and spiritual pursuits, avoiding workaholism, sharing power',
          career: 'CEO, Financial Advisor, Real Estate, Banking, Corporate Leadership, Investor',
          element: 'Earth/Fire',
          color: '#dc2626',
          planet: 'Saturn'
        },
        9: {
          title: 'The Humanitarian & Universal Lover',
          essence: 'Compassion, wisdom, and universal love radiate from your name. You are the old soul, the humanitarian whose heart embraces all of humanity, driven by idealism and the desire to heal the world.',
          traits: ['Deeply compassionate with universal love', 'Humanitarian vision for collective betterment', 'Wise beyond years with spiritual maturity', 'Generous spirit giving without expectation', 'Idealistic dreamer working for higher purpose'],
          challenges: 'Releasing what\'s complete, avoiding emotional overwhelm, grounding idealism in reality',
          career: 'Non-Profit Leader, Healer, Artist, Global Advocate, Spiritual Guide, Philanthropist',
          element: 'Fire/Water',
          color: '#f43f5e',
          planet: 'Mars'
        },
        11: {
          title: 'Master Number: The Spiritual Messenger',
          essence: '⚡ You carry a MASTER NUMBER - the highest vibration of spiritual illumination. Your name resonates with psychic ability, intuitive wisdom, and the divine calling to inspire and enlighten humanity through your very presence.',
          traits: ['Exceptionally heightened intuition and psychic abilities', 'Natural spiritual teacher and inspirational guide', 'Visionary consciousness seeing beyond physical reality', 'Charismatic presence that uplifts and awakens others', 'Channel for divine wisdom and higher truths'],
          challenges: 'Managing intense sensitivity, grounding spiritual gifts, avoiding nervous tension from high vibration',
          career: 'Spiritual Teacher, Healer, Inspirational Speaker, Psychic, Life Coach, Motivational Leader',
          element: 'Light/Ether',
          color: '#fbbf24',
          planet: 'Sun/Moon',
          isMaster: true
        },
        22: {
          title: 'Master Number: The Master Builder',
          essence: '⚡ You carry a MASTER NUMBER - the architect of dreams made manifest. Your name vibrates with the unique power to take visionary ideas and build them into concrete reality that transforms the world.',
          traits: ['Rare ability to manifest grand visions into physical form', 'Master strategist combining vision with practical execution', 'Exceptional organizational and leadership capabilities', 'Disciplined focus bringing impossible dreams to life', 'Legacy builder creating structures that outlive you'],
          challenges: 'Managing enormous pressure of your calling, balancing idealism with pragmatism, pacing yourself',
          career: 'Visionary CEO, Social Entrepreneur, Master Architect, International Leader, Movement Builder',
          element: 'Earth/Light',
          color: '#f59e0b',
          planet: 'Uranus/Earth',
          isMaster: true
        },
        33: {
          title: 'Master Number: The Master Teacher',
          essence: '⚡ You carry the RAREST MASTER NUMBER - the vibration of unconditional love and selfless service. Your name pulses with Christ consciousness, devoted to uplifting all of humanity through compassion, healing, and spiritual teaching.',
          traits: ['Embodiment of unconditional love and compassion', 'Master healer with transformational presence', 'Selfless devotion to serving collective evolution', 'Profound wisdom combined with genuine humility', 'Living example of spiritual principles in action'],
          challenges: 'Avoiding martyr complex, maintaining boundaries while serving, grounding immense spiritual energy',
          career: 'Spiritual Leader, Master Healer, Humanitarian Icon, Enlightened Teacher, Global Peacemaker',
          element: 'Pure Love/Light',
          color: '#ec4899',
          planet: 'Venus/Jupiter',
          isMaster: true
        }
      };

      const numberInfo = meanings[nameNumber] || meanings[1];

      setResult({
        name: name.trim(),
        nameNumber,
        sum,
        breakdown,
        ...numberInfo
      });

      setLoading(false);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 750);
  };

  const clearAll = () => {
    setName('');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="Name Numerology Calculator 2026 – Free Pythagorean Name Number Calculator with Deep Meaning"
      description="Discover your name's hidden spiritual vibration with our authentic numerology calculator. Instant Pythagorean analysis reveals personality traits, life purpose, and soul energy. 100% free, no signup required."
      keywords="name numerology calculator, free name number calculator, pythagorean numerology, numerology name analysis, calculate destiny number, soul number calculator, name vibration calculator, master number 11 22 33"
      canonicalPath="/name-numerology-calculator"
      ogImage="name-numerology-calculator.jpg"
      lastUpdated="2026-02-01"
      schema={[
        {
          '@type': 'WebApplication',
          name: 'Name Numerology Calculator',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '23400',
            bestRating: '5',
            worstRating: '1'
          },
          screenshot: 'https://calculators.me.uk/images/name-numerology-screenshot.jpg',
          featureList: [
            'Pythagorean numerology calculation',
            'Master number detection (11, 22, 33)',
            'Detailed personality analysis',
            'Career path guidance',
            'Spiritual meaning interpretation'
          ]
        },
        {
          '@type': 'HowTo',
          name: 'How to Calculate Your Name Number Using Numerology',
          description: 'A comprehensive guide to discovering your name\'s hidden numerological vibration using the authentic Pythagorean system, including letter-to-number conversion and reduction to core destiny number.',
          image: 'https://calculators.me.uk/images/numerology-howto.jpg',
          totalTime: 'PT2M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '0'
          },
          tool: [
            {
              '@type': 'HowToTool',
              name: 'Name Numerology Calculator'
            }
          ],
          step: [
            {
              '@type': 'HowToStep',
              name: 'Enter Your Full Name',
              text: 'Type your complete birth name exactly as it appears on your birth certificate. You can also calculate variations like nicknames or married names, but your birth name reveals your core spiritual blueprint. The calculator accepts any name written in English letters.',
              image: 'https://calculators.me.uk/images/numerology-step1.jpg',
              url: 'https://calculators.me.uk/name-numerology-calculator#step1'
            },
            {
              '@type': 'HowToStep',
              name: 'Automatic Letter-to-Number Conversion',
              text: 'Our calculator instantly converts each letter in your name to its corresponding number using the Pythagorean system: A=1, B=2, C=3, continuing through I=9, then J=1, K=2, repeating the cycle. Every letter carries a specific vibrational frequency.',
              image: 'https://calculators.me.uk/images/numerology-step2.jpg',
              url: 'https://calculators.me.uk/name-numerology-calculator#step2'
            },
            {
              '@type': 'HowToStep',
              name: 'Calculate Total and Reduce to Core Number',
              text: 'The calculator adds all letter values together, then reduces the sum to a single digit by adding the digits repeatedly. Special master numbers (11, 22, 33) are never reduced because they carry heightened spiritual significance and unique vibrational power.',
              image: 'https://calculators.me.uk/images/numerology-step3.jpg',
              url: 'https://calculators.me.uk/name-numerology-calculator#step3'
            },
            {
              '@type': 'HowToStep',
              name: 'Discover Your Name\'s Spiritual Meaning',
              text: 'Instantly receive a comprehensive analysis of your name number including personality traits, natural talents, life challenges, ideal career paths, and spiritual purpose. Learn whether you carry a master number vibration and what it means for your soul\'s journey.',
              image: 'https://calculators.me.uk/images/numerology-step4.jpg',
              url: 'https://calculators.me.uk/name-numerology-calculator#step4'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is name numerology and how does it work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Name numerology is an ancient metaphysical practice that assigns numerical values to the letters in your name to reveal your personality, talents, and life path. The Pythagorean system, which our calculator uses, converts each letter to a number (A=1, B=2, continuing through I=9, then repeating). These numbers are added together and reduced to a single digit, revealing your core name vibration. Master numbers 11, 22, and 33 are never reduced because they carry special spiritual significance.'
              }
            },
            {
              '@type': 'Question',
              name: 'Should I use my birth name or current name for numerology?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Your birth name (exactly as written on your birth certificate) reveals your core soul blueprint and life purpose—this energy never changes. However, if you legally changed your name or consistently use a different name, that carries its own vibration affecting how you express yourself in the world. Professional numerologists recommend calculating both: your birth name shows who you fundamentally are, while your current name shows the energy you\'re actively channeling. Many people find both readings valuable for complete self-understanding.'
              }
            },
            
            {
              '@type': 'Question',
              name: 'Can I calculate numerology for nicknames and business names?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Absolutely! While your birth name reveals your core essence, calculating nicknames, married names, or business names provides valuable insights into how different names influence your energy. A nickname you\'ve used since childhood carries real power through years of use and emotional attachment. Business names also have numerological vibration affecting brand energy and success. Many entrepreneurs deliberately choose business names with specific numerology to align with their goals. Our calculator works with any name variation you want to explore.'
              }
            },
            {
              '@type': 'Question',
              name: 'What if my name number doesn\'t match my personality?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'This is completely normal and happens for several reasons. First, your complete numerology chart includes multiple numbers (birth date, soul urge, personality number) that all influence you—your name number is one piece of a larger puzzle. Second, you might be expressing your number in unique personal ways that don\'t match generic descriptions. Third, life circumstances, upbringing, and personal growth shape how your core vibration manifests. Finally, you might be in a phase of developing dormant aspects of yourself. If nothing resonates, try calculating your birth name, current name, and nickname separately—one usually clicks.'
              }
            },
            
            {
              '@type': 'Question',
              name: 'How does name numerology differ from life path numerology?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Name numerology and life path numerology reveal different aspects of your being. Your name number (calculated from the letters in your name) shows your personality, natural talents, how you express yourself, and the gifts you bring to the world. Your life path number (calculated from your birth date) reveals your soul\'s journey, life purpose, and the lessons you\'re here to learn. Together they create a complete picture: your name number is WHO you are, your life path number is WHY you\'re here. For deepest insight, professional numerologists examine both plus several other core numbers in your complete chart.'
              }
            },
            
            {
              '@type': 'Question',
              name: 'Is this name numerology calculator completely free to use?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, this calculator is 100% free forever with no hidden costs, subscriptions, or premium upgrades. You can calculate unlimited names—your own, family members, friends, potential baby names, business names—as many times as you want. No email required, no sign-up, no payment information ever requested. We believe everyone deserves access to spiritual tools for self-discovery. The detailed analysis you receive is exactly the same whether you\'re the first or millionth person to use it. We\'re committed to keeping this tool freely accessible to anyone seeking to understand their name\'s hidden vibration.'
              }
            }
          ]
        }
      ]}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { name: 'Home', href: '/' },
        { name: 'Name Numerology Calculator', href: '/name-numerology-calculator' }
      ]} />

      {/* Hero Section with Mystical Design */}
      <div className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-amber-900 text-white overflow-hidden">
        {/* Animated background stars */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-amber-400/30">
            <FaStar className="text-amber-300" />
            <span className="text-sm font-semibold">Ancient Wisdom • Modern Clarity</span>
            <FaStar className="text-amber-300" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Name Numerology Calculator
          </h1>
          <div className="flex items-center justify-center gap-2 mb-5">
            <FaInfinity className="text-amber-300 text-2xl" />
            <p className="text-xl sm:text-2xl font-light text-purple-100">
              Discover Your Name's Sacred Vibration
            </p>
            <FaInfinity className="text-amber-300 text-2xl" />
          </div>
          <p className="text-base sm:text-lg text-purple-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Every name carries a unique spiritual frequency that shapes your personality, talents, and life path. 
            Unlock the ancient wisdom hidden within your name using authentic Pythagorean numerology.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: <FaBolt />, text: 'Instant Analysis' },
              { icon: <FaHeart />, text: 'Master Numbers Detected' },
              { icon: <FaShieldAlt />, text: '100% Free Forever' },
              { icon: <FaEye />, text: 'No Signup Required' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <div className="text-amber-300">{item.icon}</div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <FaMagic className="text-purple-600" />
                  Reveal Your Name's Power
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-red-50"
                >
                  Clear
                </button>
              </div>

              {/* Name Input */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaFeatherAlt className="text-purple-600" />
                  Enter Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    onKeyPress={(e) => e.key === 'Enter' && calculateNumerology()}
                    className="w-full px-6 py-5 text-2xl font-bold border-3 border-purple-300 rounded-2xl focus:ring-4 focus:ring-purple-400 focus:border-transparent text-center bg-white shadow-inner"
                    placeholder="e.g., Sarah Johnson"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <FaCompass className="text-3xl text-purple-300" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Use your birth name for core soul reading, or try nicknames and variations
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border-l-4 border-amber-500 mb-6">
                <div className="flex items-start gap-3">
                  <FaLightbulb className="text-amber-600 text-xl mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Understanding Your Name Number</p>
                    <p className="text-sm text-gray-700">
                      Your <strong>birth name</strong> reveals your soul's blueprint and never changes. 
                      Your <strong>current name</strong> shows how you express yourself now. 
                      Both readings offer valuable insights into different aspects of your being.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 flex items-start gap-2">
                  <FaInfoCircle className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              {/* Calculate Button */}
              <button
                onClick={calculateNumerology}
                disabled={loading || !name.trim()}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Channeling Your Name's Energy...
                  </>
                ) : (
                  <>
                    <FaRocket />
                    Calculate My Name Number
                  </>
                )}
              </button>

              {/* Pythagorean Wheel Illustration */}
              <div className="mt-10 bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 border-2 border-amber-400">
                <h3 className="text-white font-bold text-xl mb-4 text-center">The Pythagorean System</h3>
                <PythagoreanWheel />
                <p className="text-purple-200 text-sm text-center mt-4 italic">
                  Each letter vibrates at a specific frequency • Numbers 1–9 repeat in cosmic cycles
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Guide */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <FaBook className="text-purple-600" />
                How It Works
              </h3>

              <div className="space-y-4">
                {[
                  { num: 1, text: 'Enter your full name or any variation', icon: <FaFeatherAlt /> },
                  { num: 2, text: 'Letters convert to numbers (A=1, B=2...)', icon: <FaHashtag /> },
                  { num: 3, text: 'Numbers sum and reduce to core vibration', icon: <FaInfinity /> },
                  { num: 4, text: 'Discover your spiritual meaning instantly', icon: <FaGem /> }
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 font-medium leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                  <FaFire className="text-amber-500" />
                  Master Numbers
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { num: '11', title: 'Spiritual Messenger', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
                    { num: '22', title: 'Master Builder', color: 'bg-orange-100 text-orange-800 border-orange-300' },
                    { num: '33', title: 'Master Teacher', color: 'bg-pink-100 text-pink-800 border-pink-300' }
                  ].map((master, i) => (
                    <div key={i} className={`${master.color} p-2 rounded-lg border-2 font-semibold`}>
                      <span className="text-lg font-black">{master.num}</span> • {master.title}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl">
                <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <FaBolt /> Pro Tip
                </p>
                <p className="text-xs leading-relaxed">
                  Calculate different name variations! Your birth name, nickname, and married name 
                  each reveal unique aspects of your multifaceted self.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div ref={resultsRef} className="mt-12 animate-fade-in">
            {/* Master Number Celebration */}
            {result.isMaster && (
              <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 text-white p-8 sm:p-10 rounded-3xl shadow-2xl mb-8 text-center border-4 border-amber-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">⚡✨⚡</div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
                    You Carry a MASTER NUMBER!
                  </h2>
                  <p className="text-xl sm:text-2xl font-light mb-2">
                    {result.name} resonates at Master Number <span className="font-black text-5xl">{result.nameNumber}</span>
                  </p>
                  <p className="text-lg opacity-90">
                    You are blessed with heightened spiritual calling and purpose
                  </p>
                </div>
              </div>
            )}

            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-6 sm:p-10 border-3 border-purple-300">
              
              {/* Name & Number Display */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
                  <FaStar className="text-amber-500" />
                  Your Numerology Reading
                  <FaStar className="text-amber-500" />
                </h2>
                
                <div className="inline-block bg-white px-8 py-4 rounded-2xl shadow-lg border-2 border-purple-200 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Name Analyzed</p>
                  <p className="text-3xl font-black text-purple-900">{result.name}</p>
                </div>

                <MasterNumberBadge number={result.nameNumber} />

                <div className="mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full border-2 border-purple-300">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: result.color }}></div>
                  <span className="font-bold text-gray-900">Element: {result.element}</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-bold text-gray-900">Planet: {result.planet}</span>
                </div>
              </div>

              {/* Energy Flow Visualization */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  How Your Name Flows Into Its Number
                </h3>
                <NameEnergyFlow exampleName={result.name} />
              </div>

              {/* Letter Breakdown */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <FaHashtag className="text-purple-600" />
                  Letter-by-Letter Vibration
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {result.breakdown.map((item, i) => (
                    <div key={i} className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-xl border-2 border-purple-300 text-center transform hover:scale-110 transition-transform">
                      <div className="text-2xl font-black text-purple-900">{item.letter}</div>
                      <div className="text-sm font-bold text-purple-600">{item.value}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Total: <strong>{result.sum}</strong> → Reduced to: <strong className="text-purple-600 text-lg">{result.nameNumber}</strong>
                </p>
              </div>

              {/* Core Essence */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FaGem />
                  {result.title}
                </h3>
                <p className="text-lg leading-relaxed opacity-95">
                  {result.essence}
                </p>
              </div>

              {/* Personality Traits */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 text-xl flex items-center gap-2">
                  <FaHeart className="text-green-600" />
                  Your Natural Gifts & Strengths
                </h3>
                <ul className="space-y-3">
                  {result.traits.map((trait, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="leading-relaxed">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Life Challenges */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 mb-8">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <FaCompass className="text-orange-600" />
                  Growth Areas & Life Lessons
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {result.challenges}
                </p>
              </div>

              {/* Career Path */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <FaRocket className="text-blue-600" />
                  Ideal Career Paths
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {result.career}
                </p>
                <p className="text-sm text-blue-600 mt-3 italic">
                  These careers align with your natural vibration and allow your gifts to shine
                </p>
              </div>

              {/* Closing Wisdom */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-l-4 border-purple-600">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-purple-700">Remember:</strong> Your name number reveals natural tendencies and potentials, 
                  but you always possess free will in shaping your destiny. Use this wisdom as a compass for self-understanding, 
                  not as limitations on who you can become.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-16 max-w-5xl mx-auto space-y-12">

          {/* Section 1: What is Name Numerology */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaBook className="text-purple-600" />
              What Is Name Numerology and Why Does It Matter?
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                Name numerology is far more than a mathematical curiosity—it's an ancient metaphysical science revealing 
                the hidden spiritual vibration encoded within your name. Every letter in the alphabet carries a specific 
                energetic frequency, and when combined in your unique name, these frequencies create a vibrational signature 
                as distinct as your fingerprint.
              </p>
              <p>
                The foundation of our calculator rests on the <strong>Pythagorean numerology system</strong>, developed 
                by the Greek mathematician and mystic Pythagoras over 2,500 years ago. Pythagoras believed that numbers 
                were the universal language of reality itself—that all of existence could be understood through numerical 
                relationships and vibrations. His system assigns each letter a number from 1 to 9, creating a bridge between 
                the seen world of language and the unseen realm of energetic truth.
              </p>
              <p>
                When you calculate your name number, you're not simply adding digits. You're revealing the energetic blueprint 
                your soul chose before birth—the vibrational toolkit you brought into this lifetime. Your name isn't random; 
                whether chosen consciously or unconsciously by your parents, it aligns with your soul's intended path and the 
                lessons you came here to learn.
              </p>
              <p>
                This explains why your name <em>feels</em> like you, why certain names resonate while others feel foreign, 
                and why changing your name (through marriage, legal change, or consistent use of a nickname) actually shifts 
                the energy you project into the world. The vibration is real, even if invisible.
              </p>
            </div>

            <div className="mt-8 bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaEye className="text-purple-600" />
                The Science Behind the Mystery
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                While mainstream science doesn't validate numerology, quantum physics increasingly reveals that everything—including 
                names and sounds—exists as vibrational frequency. When you speak your name, you create sound waves that ripple through 
                physical reality. Ancient traditions understood what modern science is rediscovering: vibration shapes reality, and your 
                name is a continuous vibration you broadcast to the world.
              </p>
            </div>
          </section>

          {/* Section 2: How to Calculate Step-by-Step */}
          <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Calculate Your Name Number: Complete Step-by-Step Guide
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              While our calculator handles everything instantly, understanding the manual process deepens your connection 
              to your number's meaning. Here's exactly how Pythagorean name numerology works:
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border-2 border-amber-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                  <h3 className="text-xl font-bold text-gray-900">Write Out Your Complete Name</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Start with your full birth name exactly as it appears on your birth certificate. This is your soul's 
                  chosen vibrational signature. For this example, let's use <strong>"EMMA ROSE WILLIAMS"</strong>.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Later, you can calculate variations like nicknames or married names to see how different names shift your energy.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-amber-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                  <h3 className="text-xl font-bold text-gray-900">Convert Each Letter to Its Number</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Using the Pythagorean chart, assign each letter its corresponding number. The pattern is simple and repeats every 9 letters:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-2 font-bold text-purple-700">1</td>
                        <td className="py-2">A, J, S</td>
                        <td className="py-2 font-bold text-purple-700">2</td>
                        <td className="py-2">B, K, T</td>
                        <td className="py-2 font-bold text-purple-700">3</td>
                        <td className="py-2">C, L, U</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold text-purple-700">4</td>
                        <td className="py-2">D, M, V</td>
                        <td className="py-2 font-bold text-purple-700">5</td>
                        <td className="py-2">E, N, W</td>
                        <td className="py-2 font-bold text-purple-700">6</td>
                        <td className="py-2">F, O, X</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold text-purple-700">7</td>
                        <td className="py-2">G, P, Y</td>
                        <td className="py-2 font-bold text-purple-700">8</td>
                        <td className="py-2">H, Q, Z</td>
                        <td className="py-2 font-bold text-purple-700">9</td>
                        <td className="py-2">I, R</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 mb-2">For EMMA ROSE WILLIAMS:</p>
                <div className="bg-purple-50 p-4 rounded-lg font-mono text-sm border border-purple-200">
                  <p>E=5, M=4, M=4, A=1 → EMMA = 5+4+4+1 = 14</p>
                  <p>R=9, O=6, S=1, E=5 → ROSE = 9+6+1+5 = 21</p>
                  <p>W=5, I=9, L=3, L=3, I=9, A=1, M=4, S=1 → WILLIAMS = 5+9+3+3+9+1+4+1 = 35</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-amber-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                  <h3 className="text-xl font-bold text-gray-900">Add All Numbers Together</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Sum the totals from each name part:
                </p>
                <div className="bg-purple-50 p-4 rounded-lg font-mono text-lg border border-purple-200">
                  14 + 21 + 35 = <span className="font-bold text-purple-700">70</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-amber-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                  <h3 className="text-xl font-bold text-gray-900">Reduce to Single Digit (With Master Number Exception)</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Keep adding the digits together until you reach a single number—UNLESS you get 11, 22, or 33. 
                  These are Master Numbers and must never be reduced further:
                </p>
                <div className="bg-purple-50 p-4 rounded-lg font-mono text-lg border border-purple-200 mb-4">
                  70 → 7 + 0 = <span className="font-bold text-purple-700 text-2xl">7</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Emma Rose Williams carries Name Number <strong className="text-purple-700 text-xl">7</strong>—the Mystic Seeker—indicating 
                  deep spiritual wisdom, analytical brilliance, and a natural pull toward understanding life's mysteries.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-6 rounded-xl border-2 border-yellow-400">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                  <FaFire className="text-amber-600" />
                  Special Rule: Master Numbers 11, 22, 33
                </h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  If your sum equals 11, 22, or 33 at any point in the reduction process, <strong>STOP</strong>. Do not reduce further. 
                  These double-digit numbers carry intensified spiritual significance:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-yellow-700">11:</span>
                    <span>Spiritual illumination, intuitive messenger, inspired vision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-700">22:</span>
                    <span>Master builder, manifests dreams into reality, visionary leadership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-pink-700">33:</span>
                    <span>Master teacher, Christ consciousness, unconditional service to humanity</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Deep Meaning of Each Number */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Sacred Meaning of Each Name Number
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Each number from 1 to 9 (plus the master numbers) carries a distinct spiritual frequency and life purpose. 
              Here's what each vibration truly means:
            </p>

            <div className="space-y-6">
              {[
                {
                  num: 1,
                  color: 'border-red-400 bg-red-50',
                  title: 'Number 1: The Trailblazer',
                  desc: 'Raw creative power, independence, and pioneering spirit. You came here to lead, innovate, and forge new paths where none existed. Your greatest challenge is learning collaboration without losing your fierce individuality. Natural entrepreneurs and visionary leaders carry this vibration.'
                },
                {
                  num: 2,
                  color: 'border-blue-400 bg-blue-50',
                  title: 'Number 2: The Peacemaker',
                  desc: 'Gentle strength, emotional intelligence, and the gift of bringing harmony from conflict. You are the diplomat, the mediator, the one who sees both sides and builds bridges. Your challenge is setting boundaries without guilt and valuing your own needs as much as others\'. Counselors and healers often carry this frequency.'
                },
                {
                  num: 3,
                  color: 'border-yellow-400 bg-yellow-50',
                  title: 'Number 3: The Creative Expresser',
                  desc: 'Joy, creativity, and magnetic communication flow naturally from you. You uplift others simply by being yourself—optimistic, artistic, and socially gifted. Your challenge is maintaining focus and depth rather than scattering your abundant talents. Writers, artists, and entertainers vibrate at this frequency.'
                },
                {
                  num: 4,
                  color: 'border-green-400 bg-green-50',
                  title: 'Number 4: The Solid Foundation',
                  desc: 'Stability, reliability, and the patient persistence to build something lasting. You are the bedrock others depend on—organized, practical, and devoted to quality work. Your challenge is embracing flexibility and spontaneity without losing your grounding. Engineers and architects often carry this vibration.'
                },
                {
                  num: 5,
                  color: 'border-purple-400 bg-purple-50',
                  title: 'Number 5: The Freedom Lover',
                  desc: 'Change, adventure, and the restless pursuit of experience define you. You refuse confinement, constantly seeking growth through variety and new horizons. Your challenge is developing commitment and completion skills while honoring your need for freedom. Travelers and salespeople thrive with this energy.'
                },
                {
                  num: 6,
                  color: 'border-pink-400 bg-pink-50',
                  title: 'Number 6: The Nurturing Guardian',
                  desc: 'Love, responsibility, and service to family and community flow through you. You create beauty, harmony, and healing wherever you are, naturally caring for others. Your challenge is avoiding martyrdom and perfectionism while maintaining healthy boundaries. Teachers and caregivers embody this vibration.'
                },
                {
                  num: 7,
                  color: 'border-indigo-400 bg-indigo-50',
                  title: 'Number 7: The Mystic Analyst',
                  desc: 'Deep wisdom, spiritual seeking, and analytical brilliance combine uniquely in you. You search beneath surfaces, questioning reality itself, blending logic with intuition. Your challenge is balancing solitude with connection and trusting feelings alongside thoughts. Researchers and spiritual seekers carry this frequency.'
                },
                {
                  num: 8,
                  color: 'border-red-400 bg-red-50',
                  title: 'Number 8: The Material Master',
                  desc: 'Power, abundance, and executive capability mark your path. You understand material reality and possess the strength to achieve worldly success and wealth. Your challenge is balancing material and spiritual pursuits without becoming consumed by ambition. Business leaders and financiers embody this vibration.'
                },
                {
                  num: 9,
                  color: 'border-rose-400 bg-rose-50',
                  title: 'Number 9: The Compassionate Humanitarian',
                  desc: 'Universal love, wisdom, and idealistic service to humanity define your essence. You are the old soul with a heart embracing all beings, working for collective evolution. Your challenge is releasing what\'s complete and grounding lofty ideals in practical reality. Activists and healers resonate at this frequency.'
                }
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-xl border-l-4 ${item.color}`}>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 border-2 border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Your Numerology Questions Answered
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'What is name numerology and how does it work?',
                  a: 'Name numerology is an ancient metaphysical practice that assigns numerical values to the letters in your name to reveal your personality, talents, and life path. The Pythagorean system, which our calculator uses, converts each letter to a number (A=1, B=2, continuing through I=9, then repeating). These numbers are added together and reduced to a single digit, revealing your core name vibration. Master numbers 11, 22, and 33 are never reduced because they carry special spiritual significance.'
                },
                {
                  q: 'Should I use my birth name or current name for numerology?',
                  a: 'Your birth name (exactly as written on your birth certificate) reveals your core soul blueprint and life purpose—this energy never changes. However, if you legally changed your name or consistently use a different name, that carries its own vibration affecting how you express yourself in the world. Professional numerologists recommend calculating both: your birth name shows who you fundamentally are, while your current name shows the energy you\'re actively channeling. Many people find both readings valuable for complete self-understanding.'
                },
                
                {
                  q: 'Can I calculate numerology for nicknames and business names?',
                  a: 'Absolutely! While your birth name reveals your core essence, calculating nicknames, married names, or business names provides valuable insights into how different names influence your energy. A nickname you\'ve used since childhood carries real power through years of use and emotional attachment. Business names also have numerological vibration affecting brand energy and success. Many entrepreneurs deliberately choose business names with specific numerology to align with their goals. Our calculator works with any name variation you want to explore.'
                },
                {
                  q: 'What if my name number doesn\'t match my personality?',
                  a: 'This is completely normal and happens for several reasons. First, your complete numerology chart includes multiple numbers (birth date, soul urge, personality number) that all influence you—your name number is one piece of a larger puzzle. Second, you might be expressing your number in unique personal ways that don\'t match generic descriptions. Third, life circumstances, upbringing, and personal growth shape how your core vibration manifests. Finally, you might be in a phase of developing dormant aspects of yourself. If nothing resonates, try calculating your birth name, current name, and nickname separately—one usually clicks.'
                },
                
                {
                  q: 'How does name numerology differ from life path numerology?',
                  a: 'Name numerology and life path numerology reveal different aspects of your being. Your name number (calculated from the letters in your name) shows your personality, natural talents, how you express yourself, and the gifts you bring to the world. Your life path number (calculated from your birth date) reveals your soul\'s journey, life purpose, and the lessons you\'re here to learn. Together they create a complete picture: your name number is WHO you are, your life path number is WHY you\'re here. For deepest insight, professional numerologists examine both plus several other core numbers in your complete chart.'
                },
                
                {
                  q: 'Is this name numerology calculator completely free to use?',
                  a: 'Yes, this calculator is 100% free forever with no hidden costs, subscriptions, or premium upgrades. You can calculate unlimited names—your own, family members, friends, potential baby names, business names—as many times as you want. No email required, no sign-up, no payment information ever requested. We believe everyone deserves access to spiritual tools for self-discovery. The detailed analysis you receive is exactly the same whether you\'re the first or millionth person to use it. We\'re committed to keeping this tool freely accessible to anyone seeking to understand their name\'s hidden vibration.'
                }
              ].map((faq, i) => (
                <details key={i} className="bg-white p-5 rounded-xl border border-purple-200 cursor-pointer hover:shadow-md transition-all">
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
            expertType="numerology"
            calculatorName="Name Numerology Calculator"
            lastUpdated="February 1, 2026"
          />

          {/* User Reviews */}
          <UserReviews calculatorType="numerology" />

          {/* Related Tools */}
          <section className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore Related Spiritual Calculators
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { href: '/cgpa-to-percentage', icon: <FaHashtag />, title: 'CGPA to Percentage', desc: 'Convert academic grades', color: 'from-blue-500 to-indigo-600' },
                { href: '/percentage-to-cgpa-calculator', icon: <FaStar />, title: 'Percentage to CGPA', desc: 'Reverse grade conversion', color: 'from-green-500 to-emerald-600' },
                { href: '/mortgage-payoff', icon: <FaRocket />, title: 'Mortgage Payoff', desc: 'Calculate loan savings', color: 'from-purple-500 to-pink-600' }
              ].map((tool, i) => (
                <a
                  key={i}
                  href={tool.href}
                  className="block p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all group"
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
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white p-8 sm:p-12 rounded-3xl text-center shadow-2xl">
            <FaInfinity className="text-6xl mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your Name Holds Ancient Wisdom
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Calculate unlimited names. Discover your family's vibrations. Explore baby name options. 
              Choose business names aligned with success. All completely free, forever.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <FaMagic />
              Calculate Another Name
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}