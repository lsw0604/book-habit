import { Helmet } from 'react-helmet-async';

interface IProps {
  title: string;
  description: string;
  keywords?: string[];
}

export default function HelmetProvider({
  title,
  description,
  keywords,
}: IProps) {
  const keyword = !keywords
    ? '독서, 기록, 기록장, 간단한, 나만의'
    : `독서, 기록, 기록장, 간단한, 나만의, ${keywords.join(', ')}`;

  return (
    <Helmet>
      <title>책벌래 - {title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
    </Helmet>
  );
}
