const getIncidenciaSchema = (requiereId) => {
  let idIncidencia = {
    optional: true,
    isMongoId: {
      errorMessage: "El id de la incidencia tiene que ser un ObjectId de Mongo"
    }
  };
  if (requiereId) {
    idIncidencia = {
      custom: {
        errorMessage: "El id de la incidencia tiene que pasarse a través del URL",
        options: (value, { req }) => {
          if (req.body.idIncidencia) {
            return true;
          }
          return false;
        }
      },
      isMongoId: {
        errorMessage: "El id de la incidencia tiene que ser un ObjectId de Mongo"
      }
    };
  }
  const nombre = {
    isLength: {
      errorMessage: "Falta el nombre de la incidencia",
      options: {
        min: 2
      }
    }
  };
  const fotoIncidencia = {
    errorMessage: "Falta la foto de la incidencia"
  };
  const descripcion = {
    optional: true,
    errorMessage: "Falta la descripción de la incidencia"

  };
  const direccion = {
    custom: {
      errorMessage: "Se tiene que incluir la dirección de la incidencia o las coordenadas\
       (latitud y longitud)",
      options: (value, { req }) => {
        if (value || (req.body.latitud && req.body.longitud)) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  const latitud = {
    custom: {
      errorMessage: "Se tiene que incluir la dirección de la incidencia o las coordenadas\
       (latitud y longitud)",
      options: (value, { req }) => {
        if (req.body.direccion || (value && req.body.longitud)) {
          return true;
        } else {
          return false;
        }
      }
    },
    isFloat: {
      errorMessage: "La latitud tiene que ser un float entre -90 y 90",
      options: {
        min: -90,
        max: 90
      }
    }
  };
  const longitud = {
    custom: {
      errorMessage: "Se tiene que incluir la dirección de la incidencia o las coordenadas\
       (latitud y longitud)",
      options: (value, { req }) => {
        if (req.body.direccion || (req.body.latitud && value)) {
          return true;
        } else {
          return false;
        }
      }
    },
    isFloat: {
      errorMessage: "La longitud tiene que ser un float entre -180 y 180",
      options: {
        min: -180,
        max: 180
      }
    }
  };
  const tipoIncidencia = {
    exists: {
      errorMessage: "Falta el tipo de la incidencia"
    },
    custom: {
      errorMessage: "El tipo de incidencia solo puede ser uno de los siguientes valores:\
      [civismo, medio ambiente, infraestructura, otros]",
      options: (value) => {
        const tipos = ["civismo", "medio ambiente", "infraestructura", "otros"];
        if (tipos.includes(value)) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  const resuelta = {
    exists: {
      errorMessage: "Falta el estado de la incidencia"
    },
    isBoolean: {
      errorMessage: "El estado de resolución tiene que ser booleano"
    }
  };
  return {
    nombre,
    fotoIncidencia,
    descripcion,
    direccion,
    latitud,
    longitud,
    tipoIncidencia,
    resuelta
  };
};

module.exports = {
  getIncidenciaSchema
};
