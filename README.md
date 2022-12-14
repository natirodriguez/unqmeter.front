# UNQMeter - FrontEnd
<h4>Decisiones de desarrollo:</h4> 

* c# v.10
* .NET Core 6
* Angular 10
* Entity Framework
* Sql Server
* Bootstrap
* angularx-social-login
* Swagger
* K6

Hemos decidido trabajar con lo mencionado anteriormente, ya que ambos trabajamos actualmente en ello y nos sentimos comodos utilizando estas herramientas. Evitando de esta forma, el tener que aprender o familiarizarse de nuevo con un lenguaje o framework web. 


<h4>Métodos HTTP:</h4> 

* <b>POST:</b> /api/Login/ExternalLogin <br>
Método utilizado para el login con google.

* <b>GET:</b> /api/Presentation/GetMisPresentaciones/{email} <br>
Método utilizado para obtener todas las presentaciones realizadas por la persona con el email pasado por parametro.

* <b>GET:</b> /api/Presentation/GetPresentacion/{id} <br>
Método utilizado para obtener la presentación correspondiente al id pasado por parametro.

* <b>GET:</b> /api/GetSlydesByIdPresentation/{presentationId} <br>
Método utilizado para obtener las slydes correspondientes a una determinada presentacion, pasando por parametro su Id.

* <b>GET:</b> /api/Presentation/GetTipoPreguntas <br>
Método utilizado para traer todos los tipos de preguntas del sistema.

* <b>GET:</b> /api/Presentation/EstaVencidaLaPresentacion/{presentationId} <br>
Método utilizado para saber si una presentación se encuentra vencida. Se encuentra vencida en caso de que tenga fecha de vencimiento y la misma, sea mayor a la fecha actual.

* <b>GET:</b> /api/Presentation/GetSlydesAnswersByIdPresentation/{presentationId} <br>
Método utilizado para obtener las slydes que tuvieron una respuesta por parte del usuario.

* <b>GET:</b> /api/RespuestaParticipante/GetSlydesSinRespuestas/{idPresentacion} <br>
Método utilizado para saber las slydes que no tuvieron respuesta por parte del usuario.

* <b>POST:</b> /api/Presentation/PostNuevaPresentacion <br>
Método utilizado para generar una nueva presentación.

* <b>POST:</b> /api/Presentation/GetClonarPresentacion/ <br>
Método utilizado para clonar la presentación que tenga determinado Id. Clona la presentación, la slyde y las opciones slyde correspondientes.

* <b>POST:</b> /api/Presentation/PostCompartirPresentacion <br>
Método utilizado para setear la fecha de inicio y fin de la presentación, según lo cargado en los parametros tiempo de vida.

* <b>POST:</b> /api/Presentation/SaveSlyde <br>
Método utilizado para guardar una slyde.

* <b>POST:</b> /api/RespuestaParticipante/SaveRespuesta <br>
Método utilizado para guardar la respuesta del usuario.

* <b>DELETE:</b> /api/Presentation/DeleteSlyde/{slydeId} <br>
Método utilizado para eliminar la slyde correspondiente al id pasado por parametro.

* <b>DELETE:</b> /api/Presentation/DeletePresentacion/{presentacionId} <br>
Método utilizado para eliminar la presentación correspondiente al id pasado por parametro.

* <b>DELETE:</b> /api/Presentation/DeleteOptionSlyde/{optionSlydeId} <br>
Método utilizado para eliminar la opcion de slyde correspondiente al id pasado por parametro.

<br/>

<h4>Instalación del ambiente de desarrollo:</h4>

1) Instalar Node.js
2) Desde la consola ejecutar:
```
npm install -g @angular/cli
```
3. Instalar las dependencias encontradas en ./node_modules
```
npm install
```

