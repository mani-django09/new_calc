import Image from 'next/image';

/**
 * Optimized Image Component with Next.js Image Optimization
 * Implements lazy loading, blur placeholders, and automatic format conversion
 * 
 * Usage:
 * <OptimizedImage 
 *   src="/calculator-hero.jpg" 
 *   alt="CGPA Calculator Interface"
 *   width={1200}
 *   height={630}
 *   priority={false}
 * />
 */

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className = '',
  objectFit = 'cover',
  quality = 85
}) {
  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: 'auto' }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={quality}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
        style={{
          objectFit: objectFit,
          width: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
}

// Shimmer effect for loading placeholder
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>
`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);