import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const BASE_URL = 'https://localhost:7054';

  const responses = http.batch([
    ['GET',  `${BASE_URL}/api/Presentation/GetMisPresentaciones/nati.stefania%40gmail.com`]
  ]);

  sleep(1);
}