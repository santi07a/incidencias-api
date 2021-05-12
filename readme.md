# Api Rest Incidencias.

# https://puntociudadano.netlify.app para ver el frontal que se comunica con esta Api.

# Para hacer peticiones la URL es:

# https://api-incidencias.herokuapp.com

# Repo frontal: https://github.com/nereadev/proyecto-final-front

(GET) /incidencias/ -> listado de todas las incidencias.
(GET) /{idIncidencia}/ -> detalle de la incidencia elegida.
(GET) /usuarios/ -> listado de los usuarios.
(GET) /{idIncidencia}/ -> detalle de la incidencia elegida.
(POST) /incidencias/ -> se carga una nueva incidencia, en autorization necesitas un Bearer Token, que lo puedes conseguir haciéndote usuario en la app especificada arriba.

Modelo del body tiene que tener este formato: 
{
    nombre: "",
    tipoIncidencia: "",
    descripcion: "",
    direccion: "",
    latitud: number,
    longitud: number,
    resuelta: "",
},

Tanto la imagen como el body hay que pasarlo por params. 
(PATCH) /incidencias/votar -> votas la incidencia, necesitas un Bearer token y en el body pasar el id de la incidencia:

{
    idIncidencia: "";
}

un pedido le sube un voto y si se realiza otro pedido con el mismo token, se le resta un voto.

(DELETE) /{idIncidencia}/ -> Elimina la incidencia elegida. También necesitas de un Bearer Token, y sólo puedes eliminar una incidencia que tu mismo creaste.

# Para realizar este proyecto utilizamos : 

Node.js, Express.js, Next.js, Mongoose. 

MongoDB es la base de datos elegida.

Heroku, Atlas y Firebase para servidores en la nube.

Git es nuestro control de versiones.


