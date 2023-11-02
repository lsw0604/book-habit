import { Outlet, Navigate } from 'react-router-dom';

interface IProps {
  isRouteAccessible: boolean;
  redirectUrl: string;
}

/**
 * @param isRouteAccessible boolean: 접근할 수 있냐 없냐를 결정 true면 접근가능
 * @param redirectUrl string: GuardLayout에서 접근 불가능한 상황 해당 URL로 리다이렉트
 * @returns
 */
export default function GuardLayout({
  isRouteAccessible,
  redirectUrl,
}: IProps): JSX.Element {
  return isRouteAccessible ? <Outlet /> : <Navigate to={redirectUrl} replace />;
}
