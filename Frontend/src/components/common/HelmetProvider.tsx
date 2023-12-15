import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface IProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function HelmetProvider({
  children,
  title,
  description,
}: IProps) {
  return (
    <>
      <Helmet>
        <title>책벌래 - {title}</title>
        <meta name="Description" content={description} />
      </Helmet>
      {children}
    </>
  );
}
