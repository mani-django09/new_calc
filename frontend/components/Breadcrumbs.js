import Link from 'next/link'
import { FaChevronRight, FaHome } from 'react-icons/fa'

export default function Breadcrumbs({ items = [] }) {

  // If no breadcrumbs, render nothing (prevents empty schema)
  if (!Array.isArray(items) || items.length === 0) {
    return null
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://calculators.me.uk${item.href}`,
    })),
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Visual Breadcrumbs */}
      <nav
        className="flex items-center text-sm text-gray-600 mb-6 px-4 sm:px-0"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center flex-wrap">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <FaChevronRight
                  className="mx-2 text-xs text-gray-400 flex-shrink-0"
                  aria-hidden="true"
                />
              )}

              {index === items.length - 1 ? (
                <span
                  className="text-gray-900 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary-600 transition-colors flex items-center gap-1"
                >
                  {index === 0 && (
                    <FaHome className="text-base" aria-label="Home" />
                  )}
                  <span>{index === 0 ? '' : item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
