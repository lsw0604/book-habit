import axios from 'axios';

type GeoLocationRequestType = {
  latitude: string;
  longitude: string;
};

type GeoLocationResponseType = {
  query: string;
};

export const geoLocation = async ({ query }: GeoLocationResponseType) => {
  const { data, status } = await axios.get<GeoLocationRequestType>(
    `${process.env.BASE_URL}/api/map/${query}`
  );
  return { data, status };
};
