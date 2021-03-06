const getUsuarioSchema = noEsPatch => {
  const nombre = {
    [noEsPatch ? "exists" : "optional"]: {
      errorMessage: "Falta el nombre del usuario"
    },
    isLength: {
      errorMessage: "El nombre tiene que tener dos caracteres como mínimo",
      options: {
        min: 2
      }
    }
  };
  const apellidos = {
    [noEsPatch ? "exists" : "optional"]: true,
    notEmpty: true,
    errorMessage: "Faltan los apellidos del usuario"
  };
  const email = {
    [noEsPatch ? "exists" : "optional"]: {
      errorMessage: "Falta el e-mail del usuario"
    },
    notEmpty: {
      errorMessage: "Falta el e-mail del usuario"
    },
    isEmail: {
      errorMessage: "Tienes que introducir un e-mail válido"
    }
  };
  const contrasenya = {
    [noEsPatch ? "exists" : "optional"]: {
      errorMessage: "Falta la contraseña del usuario"
    },
    isLength: {
      errorMessage: "La contraseña tiene que tener ocho caracteres como mínimo",
      options: {
        min: 8
      }
    }
  };
  const telefono = {
    [noEsPatch ? "exists" : "optional"]: true,
    notEmpty: true,
    errorMessage: "Introduce un número de teléfono válido",
  };
  const direccion = {
    [noEsPatch ? "exists" : "optional"]: true,
    notEmpty: true,
    errorMessage: "Introduce una dirección válida",
  };
  return {
    nombre,
    apellidos,
    email,
    contrasenya,
    telefono,
    direccion
  };
};

const getUsuarioSchemaCompleto = getUsuarioSchema(true);
const getUsuarioSchemaParcial = getUsuarioSchema(false);

module.exports = {
  getUsuarioSchemaCompleto,
  getUsuarioSchemaParcial
};
