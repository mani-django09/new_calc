import Link from 'next/link';

export default function CalculatorCard({ title, description, icon, href, category }) {
  const categoryColors = {
    education: 'bg-blue-100 text-blue-800 border-blue-200',
    finance: 'bg-green-100 text-green-800 border-green-200',
    lifestyle: 'bg-purple-100 text-purple-800 border-purple-200',
    gaming: 'bg-orange-100 text-orange-800 border-orange-200',
    immigration: 'bg-red-100 text-red-800 border-red-200',
  };

  const gradientColors = {
    education: 'from-blue-50 to-blue-100',
    finance: 'from-green-50 to-green-100',
    lifestyle: 'from-purple-50 to-purple-100',
    gaming: 'from-orange-50 to-orange-100',
    immigration: 'from-red-50 to-red-100',
  };

  return (
    <Link href={href}>
      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 h-full border-2 border-gray-100 hover:border-primary-400 cursor-pointer group overflow-hidden">
        {/* Gradient Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[category] || 'from-gray-50 to-gray-100'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              {icon}
            </div>
            {category && (
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${categoryColors[category] || 'bg-gray-100 text-gray-800 border-gray-200'} shadow-sm`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors leading-tight">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-primary-600 font-bold text-sm group-hover:text-primary-700 transition-colors">
              Calculate Now
            </span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-primary-600 text-lg">
              →
            </span>
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Link>
  );
}