import { axios } from 'lib/api';
import { useEffect } from 'react';

export default function MyProfile() {
  const fetchData = async () => {
    await axios
      .post('http://localhost:3001/api/auth/test', { test: 'test' })
      .then((res) => console.log('res', res))
      .catch((err) => console.log('err', err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>MyProfile</div>;
}
