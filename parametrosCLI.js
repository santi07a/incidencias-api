const { program } = require("commander");

program.option("-p, --puerto <puerto>", "Puerto para el servidor");
program.parse();

module.exports = program.opts();

/* Usuarios

[
  '{{repeat(50)}}',
  {
    _id: '{{objectId()}}',
    index: '{{index()}}',
    nombre: '{{firstName()}}',
    apellidos: '{{surname()}} {{surname()}}',
    fotoPerfil: function () {
      return 'fotoPerfil' + this.index + '.png';
    },
    email: '{{email()}}',
    telefono: '+34 {{phone()}}',
    direccion: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    fechaAlta: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    incidenciasSeguidas: [
      '{{repeat(0, 5)}}',
      '{{objectId()}}'
    ]
  }
] */

/* Incidencias

[
  '{{repeat(20)}}',
  {
    _id: '{{objectId()}}',
    index: '{{index()}}',
    usuarioCreador: '{{objectId()}}',
    fotoIncidencia: function () {
      return 'incidencia' + this.index + '.png';
    },
    descripcion: '{{lorem(1, "paragraphs")}}',
    direccion: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    registrada: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    latitud: '{{floating(-90.000001, 90)}}',
    longitud: '{{floating(-180.000001, 180)}}',
    tipoIncidencia: '{{random("Medio ambiente", "Civismo", "Infraestructura")}}',
    resuelta: '{{bool()}}'
  }
] */
