const getUsuarioSchema = noEsPatch => {
  const nombre = {
    [noEsPatch ? "exists" : "optional"]: true,
    isLength: {
      errorMessage: "El nombre tiene que tener dos caracteres como mínimo",
      options: {
        min: 2
      }
    }
  };
  const apellidos = {
    [noEsPatch ? "exists" : "optional"]: true,
    errorMessage: "Faltan los apellidos del usuario",
    notEmpty: true
  };
  const email = {
    [noEsPatch ? "exists" : "optional"]: true,
    errorMessage: "Falta el e-mail del usuario",
    notEmpty: true
  };
  const contraseña = {
    [noEsPatch ? "exists" : "optional"]: true,
    isLength: {
      errorMessage: "La contraseña tiene que tener ocho caracteres como mínimo",
      options: {
        min: 8
      }
    }
  };
  const telefono = {
    [noEsPatch ? "exists" : "optional"]: true,
    errorMessage: "Introduce un número de teléfono válido",
  };
  const direccion = {
    [noEsPatch ? "exists" : "optional"]: true,
    errorMessage: "Introduce una dirección válida",
  };
  const fechaAlta = {
    [noEsPatch ? "exists" : "optional"]: true,
    errorMessage: "La fecha introducida tiene que tener formato timestamp",
  };
  return {
    nombre,
    apellidos,
    email,
    contraseña,
    telefono,
    direccion,
    fechaAlta
  };
};

const getUsuarioSchemaCompleto = getUsuarioSchema(true);
const getUsuarioSchemaParcial = getUsuarioSchema(false);
module.exports = {
  getUsuarioSchemaCompleto,
  getUsuarioSchemaParcial
};
