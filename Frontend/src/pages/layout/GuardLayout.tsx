import { Outlet, Navigate } from 'react-router-dom';

interface IProps {
  isRouteAccessible: boolean;
  redirectUrl: string;
}

export default function GuardLayout({
  isRouteAccessible,
  redirectUrl,
}: IProps): JSX.Element {
  if (isRouteAccessible) {
    console.log('outlet');
  } else {
    console.log('navigate', redirectUrl);
  }

  return isRouteAccessible ? <Outlet /> : <Navigate to={redirectUrl} replace />;
}
