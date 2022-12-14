
import { Rate } from "k6/metrics";
import http from "k6/http";

var myRate = new Rate("my_rate");

// Realiza un seguimiento del porcentaje de valores en una serie que no son cero. En este caso el rate hara un porcentaje con la cantidad de escenarios y la cantidad de errores.
export default function() {
    const resp = http.get('https://localhost:7054/api/Presentation/GetMisPresentacionesURLIncorrecta/nati.stefania%40gmail.com');
    const resp1 = http.get('https://localhost:7054/api/Presentation/GetMisPresentaciones/nati.stefania%40gmail.com');
  
    console.log('Scenario 1: '+ JSON.stringify(resp.error_code));
    console.log('Scenario 2: '+ JSON.stringify(resp1.error_code));
    
    myRate.add(resp.error_code);
    myRate.add(resp1.error_code);
};