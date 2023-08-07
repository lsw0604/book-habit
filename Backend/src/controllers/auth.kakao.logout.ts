import { Response, Request, NextFunction } from 'express';

export default function KakaoLogout(req: Request, res: Response, next: NextFunction) {
  console.log(req.session);
  const response = fetch('https://kapi.kakao.com/v1/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer 6G4qzwGB9DhdB7wRDgxgYq03DzwdJ7CMZGH_Vy1uCiolDwAAAYnQbm9S`,
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
  });

  res.status(200).json(response);
}
