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

Hemos decidido trabajar con lo mencionado anteriormente, ya que ambos trabajamos actualmente en ello y nos sentimos comodos utilizando estas herramientas. Evitando de esta forma, el tener que aprender o familiarizarse de nuevo con un lenguaje o framework web. 


<h4>Métodos HTTP:</h4> 

* <b>POST:</b> /api/Login/ExternalLogin <br>
Método utilizado para el login con google

* <b>GET:</b> /api/Presentation/GetMisPresentaciones/{email} <br>
Método utilizado para obtener todas las presentaciones realizadas por la persona con el email pasado por parametro.

* <b>POST:</b> /api/Presentation/PostNuevaPresentacion <br>
Método utilizado para generar una nueva presentación

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

