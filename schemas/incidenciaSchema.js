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
    exists: {
      errorMessage: "Falta el nombre de la incidencia"
    }
  };
  const usuarioCreador = {
    exists: {
      errorMessage: "Falta el idObject del usuario que creó la incidencia"
    },
    isMongoId: {
      errorMessage: "El usuario creador tiene que ser un ObjectId de Mongo"
    }
  };
  const fotoIncidencia = {
    exists: {
      errorMessage: "Falta la foto de la incidencia"
    }
  };
  const descripcion = {
    exists: {
      errorMessage: "Falta la descripción de la incidencia"
    }
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
  const registrada = {
    exists: {
      errorMessage: "Falta la fecha de registro de la incidencia"
    },
    isInt: {
      errorMessage: "La fecha de registro tiene que ser un timestamp"
    },
    isLength: {
      errorMessage: "La fecha de registro tiene que ser un timestamp",
      options: {
        min: 13,
        max: 13
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
    usuarioCreador,
    fotoIncidencia,
    descripcion,
    direccion,
    registrada,
    latitud,
    longitud,
    tipoIncidencia,
    resuelta
  };
};

module.exports = {
  getIncidenciaSchema
};
