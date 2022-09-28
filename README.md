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

<h4>Creación de tablas en la Base de datos:</h4>
Las migraciones en Entity Framework nos permite crear o actualizar el modelo de la base de datos. 
Para poder generar las tablas a partir de las migraciones dadas, lo que debemos hacer es lo siguiente: <br>
1) Abrir Visual Studio <br>
2) Abrir la consula de Nuget (nuestro gestor de dependencias): <br>
     - Tools <br>
     - Nuget Package Manager<br>
     - Package Manager Console<br>
3) Ejecutar <br>


```
Update-Database
```
