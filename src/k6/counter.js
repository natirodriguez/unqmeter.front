import { Counter } from 'k6/metrics';
import { sleep } from 'k6';
import http from 'k6/http';

const allErrors = new Counter('error_counter');

// Métrica que suma valores agregados de manera acumulativa. En este caso el counter suma valores cuya llamada a back genere error
export default function () {
  const resp = http.get('https://localhost:7054/api/Presentation/GetMisPresentacionesURLIncorrecta/nati.stefania%40gmail.com');
  const resp1= http.get('https://localhost:7054/api/Presentation/GetMisPresentaciones');
  const resp2 = http.get('https://localhost:7054/api/Presentation/GetMisPresentaciones/nati.stefania%40gmail.com');

  console.log('Scenario 1: '+ JSON.stringify(resp.error_code));
  console.log('Scenario 2: '+ JSON.stringify(resp1.error_code));
  console.log('Scenario 3: '+ JSON.stringify(resp2.error_code));


  if(JSON.stringify(resp.error_code) != 0){
    allErrors.add(1);
  }

  if(JSON.stringify(resp1.error_code) != 0){
    allErrors.add(1);
  }

  if(JSON.stringify(resp2.error_code) != 0){
    allErrors.add(1);
  }
}
