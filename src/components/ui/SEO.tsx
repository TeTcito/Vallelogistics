import React from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY_DATA } from '@/data/company';

export interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = COMPANY_DATA.description,
  canonical,
}) => {
  const fullTitle = `${title} | ${COMPANY_DATA.name}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={COMPANY_DATA.name} />
      <meta property="og:image" content="/images/logo.png" />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};
