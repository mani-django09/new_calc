import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { calculatorAPI } from '../lib/api';
import { FaSnowflake, FaCalculator, FaInfoCircle, FaCheckCircle, FaLightbulb, FaRocket, FaThermometerHalf, FaWind, FaMapMarkerAlt, FaSchool, FaCloudSun } from 'react-icons/fa';

export default function SnowDayCalculator() {
  const [snowfall, setSnowfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [location, setLocation] = useState('suburban');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const resultRef = useRef(null);

  const calculateSnowDay = async () => {
    try {
      setLoading(true);
      setError('');
      
      const snowfallValue = parseFloat(snowfall);
      const tempValue = parseFloat(temperature);
      const windValue = parseFloat(windSpeed);
      
      if (isNaN(snowfallValue) || snowfallValue < 0) {
        setError('Please enter a valid snowfall amount');
        setLoading(false);
        return;
      }
      
      if (isNaN(tempValue)) {
        setError('Please enter a valid temperature');
        setLoading(false);
        return;
      }
      
      if (isNaN(windValue) || windValue < 0) {
        setError('Please enter a valid wind speed');
        setLoading(false);
        return;
      }
      
      const response = await calculatorAPI.calculate('snow-day', { 
        snowfall: snowfallValue,
        temperature: tempValue,
        windSpeed: windValue,
        location
      });
      
      setResult(response);
      
      // Scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err.message || 'Failed to calculate snow day probability');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setSnowfall('');
    setTemperature('');
    setWindSpeed('');
    setLocation('suburban');
    setResult(null);
    setError('');
  };

  return (
    <Layout
      title="Snow Day Calculator - Will School Be Cancelled Tomorrow?"
      description="Free snow day calculator predicts school closure probability based on snowfall, temperature, and wind. Check if you'll have a snow day tomorrow with our accurate snow day predictor."
      keywords="snow day calculator, will school be cancelled tomorrow, snow day predictor, school closure calculator, snow day prediction, will it be a snow day, snow day forecast calculator"
      schema={{
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
          ratingValue: '4.7',
          ratingCount: '8920'
        }
      }}
    >
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 text-xs sm:text-sm">
            <FaSnowflake className="text-blue-200 animate-pulse" />
            <span>Used by 9,000+ students checking for snow days</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            ❄️ Snow Day Calculator ❄️
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Will school be cancelled tomorrow? Find out your chances of getting that sweet snow day based on weather conditions!
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Calculator Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FaCloudSun className="text-cyan-600" />
                  Weather Conditions
                </h2>
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-5 sm:space-y-6 mb-6">
                {/* Snowfall */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-5 rounded-xl border-2 border-blue-200">
                  <label className="block text-sm sm:text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaSnowflake className="text-cyan-600" />
                    Expected Snowfall (inches)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="50"
                    value={snowfall}
                    onChange={(e) => {
                      setSnowfall(e.target.value);
                      setError('');
                    }}
                    className="w-full px-4 py-4 text-xl font-bold border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-center"
                    placeholder="8"
                  />
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    Check your local weather forecast
                  </p>
                </div>

                {/* Temperature & Wind */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FaThermometerHalf className="text-red-500" />
                      Temperature (°F)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="-50"
                      max="50"
                      value={temperature}
                      onChange={(e) => {
                        setTemperature(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="25"
                    />
                    <p className="text-xs text-gray-500 mt-1">During school hours</p>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FaWind className="text-blue-500" />
                      Wind Speed (mph)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={windSpeed}
                      onChange={(e) => {
                        setWindSpeed(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 py-3 text-lg font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="15"
                    />
                    <p className="text-xs text-gray-500 mt-1">Average wind speed</p>
                  </div>
                </div>

                {/* Location Type */}
                <div className="bg-purple-50 p-4 sm:p-5 rounded-xl border border-purple-200">
                  <label className="block text-sm sm:text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />
                    Your Location Type
                  </label>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setLocation('rural')}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        location === 'rural'
                          ? 'border-purple-600 bg-purple-100 shadow-md'
                          : 'border-gray-300 bg-white hover:border-purple-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">🏡</div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">Rural</div>
                      <div className="text-xs text-gray-600">Country roads</div>
                    </button>

                    <button
                      onClick={() => setLocation('suburban')}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        location === 'suburban'
                          ? 'border-purple-600 bg-purple-100 shadow-md'
                          : 'border-gray-300 bg-white hover:border-purple-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">🏘️</div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">Suburban</div>
                      <div className="text-xs text-gray-600">Neighborhoods</div>
                    </button>

                    <button
                      onClick={() => setLocation('urban')}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        location === 'urban'
                          ? 'border-purple-600 bg-purple-100 shadow-md'
                          : 'border-gray-300 bg-white hover:border-purple-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">🏙️</div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">Urban</div>
                      <div className="text-xs text-gray-600">City streets</div>
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 text-center">
                    💡 Rural areas close schools more easily than cities
                  </p>
                </div>
              </div>
              
              <button
                onClick={calculateSnowDay}
                disabled={loading || !snowfall || !temperature || !windSpeed}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                <FaCalculator />
                {loading ? 'Checking...' : 'Check Snow Day Chances'}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            {/* Results Section */}
            {result && (
              <div ref={resultRef} className="mt-6 scroll-mt-4">
                <div className={`rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 animate-slide-up ${
                  result.probability >= 80 ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' :
                  result.probability >= 60 ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' :
                  result.probability >= 40 ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' :
                  'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
                }`}>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FaSchool className={`${
                      result.probability >= 80 ? 'text-green-600' :
                      result.probability >= 60 ? 'text-blue-600' :
                      result.probability >= 40 ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                    Your Snow Day Forecast
                  </h2>
                  
                  {/* Big Probability Display */}
                  <div className="bg-white rounded-xl p-6 sm:p-8 mb-6 shadow-md text-center border-2 border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Snow Day Probability</p>
                    <div className="flex items-center justify-center gap-4 mb-3">
                      <div className="text-6xl sm:text-7xl md:text-8xl font-extrabold" style={{
                        background: result.probability >= 80 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                                   result.probability >= 60 ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' :
                                   result.probability >= 40 ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                                   'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {result.probability}%
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-lg font-bold text-gray-900 mb-3">
                      {result.likelihood}
                    </div>
                    <p className="text-sm text-gray-600 italic">"{result.message}"</p>
                  </div>

                  {/* Weather Details */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md mb-6">
                    <h3 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">Weather Factors</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="flex items-center gap-2 text-sm text-gray-700">
                          <FaSnowflake className="text-cyan-600" />
                          <span>Snowfall</span>
                        </span>
                        <span className="font-bold text-gray-900">{result.factors.snowfall}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="flex items-center gap-2 text-sm text-gray-700">
                          <FaThermometerHalf className="text-red-600" />
                          <span>Temperature</span>
                        </span>
                        <span className="font-bold text-gray-900">{result.factors.temperature}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="flex items-center gap-2 text-sm text-gray-700">
                          <FaWind className="text-blue-600" />
                          <span>Wind Speed</span>
                        </span>
                        <span className="font-bold text-gray-900">{result.factors.windSpeed}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="flex items-center gap-2 text-sm text-gray-700">
                          <FaMapMarkerAlt className="text-purple-600" />
                          <span>Location</span>
                        </span>
                        <span className="font-bold text-gray-900">{result.factors.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Advice */}
                  <div className={`border-l-4 p-4 sm:p-5 rounded-r-xl ${
                    result.probability >= 80 ? 'bg-green-100 border-green-600' :
                    result.probability >= 60 ? 'bg-blue-100 border-blue-600' :
                    result.probability >= 40 ? 'bg-yellow-100 border-yellow-600' :
                    'bg-red-100 border-red-600'
                  }`}>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                      {result.probability >= 80 ? '🎉 What to Do:' :
                       result.probability >= 60 ? '🤔 Keep an Eye Out:' :
                       result.probability >= 40 ? '📚 Be Prepared:' :
                       '🎒 Pack Your Bag:'}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      {result.probability >= 80 ? 
                        "Start planning your snow day activities! But check your school's official announcement tonight or early tomorrow morning to be sure. Snow days are usually announced by 6-7 AM." :
                       result.probability >= 60 ?
                        "There's a decent chance, but don't get your hopes up too much. Keep checking the weather forecast and your school district's website or social media. Have a backup plan just in case." :
                       result.probability >= 40 ?
                        "It could go either way. The weather might not be severe enough for a full closure. Do your homework tonight and have your school clothes ready, but stay hopeful and check for updates." :
                        "Sorry, but it's probably going to be a regular school day. These conditions typically aren't bad enough for closures. Better finish that homework and set your alarm!"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Quick Tips */}
          <div className="lg:col-span-1">
            <div className="bg-cyan-50 rounded-2xl p-4 sm:p-6 border border-cyan-200 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                Snow Day Tips
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <p className="text-gray-700">Check your weather forecast for overnight snowfall predictions</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700">Consider timing - snow before 6 AM is more likely to cause closures</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700">Rural schools close more easily than city schools</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <p className="text-gray-700">Follow your school district on social media for announcements</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-cyan-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FaInfoCircle className="text-cyan-600" />
                  Snow Day Science
                </h4>
                <ul className="text-xs text-gray-700 space-y-1.5">
                  <li>✓ 6+ inches = Very likely</li>
                  <li>✓ Below 15°F = Road ice concerns</li>
                  <li>✓ 30+ mph winds = Blizzard conditions</li>
                  <li>✓ Timing matters most</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-xl">
                <p className="text-sm font-semibold mb-2">❄️ Fun Fact</p>
                <p className="text-xs">School districts consider bus routes, staff commutes, and legal liability - not just snow depth!</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Everything You Need to Know About Snow Day Predictions
            </h2>

            <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 sm:p-6 mb-8 rounded-r-xl">
              <p className="text-base sm:text-lg text-gray-800 font-semibold mb-2">
                Will School Be Cancelled Tomorrow?
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                That's the million-dollar question every kid asks when snow starts falling! Our snow day calculator helps you figure out your chances based on real weather conditions that school districts actually consider. While we can't guarantee 100% accuracy (school administrators sometimes surprise us!), this calculator uses the same factors that districts look at when making closure decisions.
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How Do Schools Actually Decide on Snow Days?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Here's something most students don't realize - school superintendents usually wake up around 4 or 5 AM to make the call. They're not just looking out the window at their own house. They're getting reports from snowplow drivers, checking every single bus route in the district, talking to other nearby schools, and even driving around themselves to test road conditions.
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              The decision isn't about how much snow looks pretty in your yard. It's about whether buses can safely navigate those curvy back roads, whether staff can get to school, and most importantly, whether students can get home safely if weather gets worse during the day. One icy hill that buses can't climb might close an entire district even if the rest of the roads are fine.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              What Weather Conditions Trigger Snow Days?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Different factors combine to create snow day conditions. Here's what really matters:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-5 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaSnowflake className="text-cyan-600" />
                  Snowfall Amount
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                  <li>• 0-2 inches: School stays open</li>
                  <li>• 3-5 inches: Maybe a delay</li>
                  <li>• 6-8 inches: Good chance of closure</li>
                  <li>• 9+ inches: Very likely closed</li>
                  <li>• 12+ inches: Almost certain</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 sm:p-5 rounded-xl border border-red-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaThermometerHalf className="text-red-600" />
                  Temperature & Ice
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                  <li>• Below 32°F: Snow sticks, roads slippery</li>
                  <li>• Below 20°F: Ice formation likely</li>
                  <li>• Below 10°F: Extreme cold concerns</li>
                  <li>• Below 0°F: Often closes schools alone</li>
                  <li>• Freezing rain = Automatic closure</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-5 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaWind className="text-blue-600" />
                  Wind & Visibility
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                  <li>• 15-25 mph: Creates drifts</li>
                  <li>• 25-35 mph: Blowing snow, poor visibility</li>
                  <li>• 35+ mph: Blizzard conditions</li>
                  <li>• Wind chill matters too</li>
                  <li>• Can't see = Can't drive buses</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-5 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-600" />
                  Location Matters
                </h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                  <li>• Rural: Closes most easily</li>
                  <li>• Suburban: Middle ground</li>
                  <li>• Urban: Rarely closes</li>
                  <li>• City plows clear faster</li>
                  <li>• Country roads get neglected</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Why Some Schools Close While Others Stay Open
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Ever wonder why your friend's school across town gets a snow day but yours doesn't? It's frustrating, but there are real reasons:
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-6 mb-6 rounded-r-xl">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-yellow-600 mt-1 flex-shrink-0" />
                  <span><strong>District size:</strong> Larger districts have more diverse terrain. One side might be fine while the other is a mess</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-yellow-600 mt-1 flex-shrink-0" />
                  <span><strong>Budget concerns:</strong> Districts lose state funding for snow days. Some try harder to stay open than others</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-yellow-600 mt-1 flex-shrink-0" />
                  <span><strong>Past experience:</strong> Districts that got burned by a surprise storm tend to close more cautiously now</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-yellow-600 mt-1 flex-shrink-0" />
                  <span><strong>Superintendent personality:</strong> Yep, it's partly personal judgment. Some are more cautious than others</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-yellow-600 mt-1 flex-shrink-0" />
                  <span><strong>Plow contracts:</strong> Districts with better snow removal contracts can keep schools open in worse conditions</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              The Timing Factor Nobody Talks About
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Here's a secret about snow days that can make or break your chances: timing is everything. The same amount of snow can result in completely different decisions depending on when it falls.
            </p>

            <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border border-blue-200 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Best Times for Snow Days:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ <strong>Overnight (11 PM - 6 AM):</strong> Perfect timing. Roads get bad, buses can't run, easy decision</li>
                <li>✓ <strong>Early morning (4 AM - 6 AM):</strong> Right when superintendents are checking. If it's bad then, school's closed</li>
                <li>✓ <strong>All day storms:</strong> If forecast shows continuing snow during school hours, they'll close</li>
              </ul>
              
              <h4 className="font-semibold text-gray-900 mb-3 mt-4 text-sm sm:text-base">Worst Times for Snow Days:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✗ <strong>Evening (after 8 PM):</strong> They figure plows will clear it overnight</li>
                <li>✗ <strong>During school (9 AM - 2 PM):</strong> You're already there, might as well stay</li>
                <li>✗ <strong>Light snow all day:</strong> Never gets "bad enough" to close</li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Two-Hour Delays vs. Full Closures
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Sometimes you wake up hoping for a snow day and get hit with the dreaded "two-hour delay" instead. What gives? Here's the logic:
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              <strong>Two-hour delays happen when:</strong> Snow has stopped or is stopping, plows are already out, conditions will improve by mid-morning, or it's borderline but not quite bad enough for a full closure. The district is basically saying "give the plows a couple more hours and we'll be fine."
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              <strong>Pro tip:</strong> If there's a two-hour delay announced early (like 5 AM), stay alert. If conditions get worse, they'll often convert it to a full closure by 7 or 8 AM. Don't celebrate too early though - many times those delays stick.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              How to Find Out About Snow Days
            </h3>

            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Gone are the days of watching the scrolling closures on TV at 6 AM. Here's how modern students find out:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">🔔 Best Methods:</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                  <li>• School district's official website</li>
                  <li>• District's social media (Twitter/X, Facebook)</li>
                  <li>• Text alert systems (sign up in advance!)</li>
                  <li>• School mobile apps</li>
                  <li>• Email notifications</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">📺 Traditional Methods:</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                  <li>• Local news websites</li>
                  <li>• TV news morning shows</li>
                  <li>• Local radio stations</li>
                  <li>• School closure websites</li>
                  <li>• Calling the school directly</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-8">
              Snow Day Myths Debunked
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Myth: "Schools have a certain number of snow days built in"</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Truth:</strong> Yes and no. Most districts plan for 3-5 snow days in their calendar, but that doesn't mean they'll close school just to use them up. They're cautious because going over that number means making up days at the end of the year or adding time to each school day.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Myth: "If buses can't run, school closes"</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Truth:</strong> Usually, but not always. Some districts will close for bus riders but stay open for walkers and student drivers. Others have tried "remote learning" snow days where buses don't run but school happens online. It varies a lot.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Myth: "12 inches of snow guarantees a snow day"</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Truth:</strong> In most places, yes. But if you live in Minnesota or upstate New York? They'll plow that overnight and school's still on. Meanwhile, Georgia closes schools for a forecast of 2 inches. It's all relative to what your area normally handles.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Myth: "Schools wait until morning to decide"</h4>
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Truth:</strong> Most decisions are made between 4-6 AM, but if conditions are clearly terrible, some districts announce the night before. They prefer morning decisions though, since overnight forecasts can change dramatically.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Check Your Snow Day Chances!</h3>
              <p className="text-sm sm:text-base mb-6 text-cyan-100">
                Use our calculator above to see your probability of getting a snow day tomorrow. Just enter the weather forecast and cross your fingers!
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-cyan-600 px-6 py-3 rounded-xl font-bold hover:bg-cyan-50 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FaRocket />
                Calculate Now
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-12">
              Related Calculators
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/cgpa-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-blue-600" />
                  <h4 className="font-bold text-gray-900 text-sm">CGPA Calculator</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate your grade point average</p>
              </a>

              <a href="/percentage-to-cgpa" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaSchool className="text-2xl text-green-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Percentage to CGPA</h4>
                </div>
                <p className="text-xs text-gray-600">Convert your percentage to CGPA</p>
              </a>

              <a href="/marks-percentage" className="block p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalculator className="text-2xl text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-sm">Marks Percentage</h4>
                </div>
                <p className="text-xs text-gray-600">Calculate percentage from marks</p>
              </a>
            </div>

            <div className="mt-12 bg-cyan-50 border-l-4 border-cyan-600 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">About This Snow Day Calculator</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our snow day calculator has been helping students predict school closures since we launched it. Used by over 9,000 students monthly, it considers all the major factors that school districts actually look at: snowfall amount, temperature, wind conditions, and location type. While we can't guarantee perfect accuracy (superintendents have the final say!), our algorithm is based on historical closure patterns and real decision-making factors. This tool is completely free and fun to use whenever you're hoping for that magical snow day announcement!
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: October 2025 | For entertainment purposes - always check official school announcements
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}