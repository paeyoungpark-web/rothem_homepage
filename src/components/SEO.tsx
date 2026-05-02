import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

export default function SEO({ 
  title = '로뎀시스템 | 차세대 보안 파트너', 
  description = '신뢰를 바탕으로 한 기술, 로뎀시스템이 귀사의 디지털 자산을 완벽하게 지킵니다. ISMS-P, ISO 인증 및 통합 보안 컨설팅.', 
  url = 'https://ais-dev-56tomqpgh2sqlynpc7fb2f-471630685044.asia-northeast1.run.app', 
  image = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80', 
  type = 'website'
}: SEOProps) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": url,
    "logo": image,
    "name": "로뎀시스템",
    "description": description
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
