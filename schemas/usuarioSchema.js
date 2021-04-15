const getUsuarioSchema = esPatch => {
  const nombre = {
    [esPatch ? "exists" : "optional"]: true,
    isLength: {
      errorMessage: "El nombre tiene que tener dos caracteres como mínimo",
      options: {
        min: 2
      }
    }
  };
  const apellidos = {
    [esPatch ? "exists" : "optional"]: true,
    errorMessage: "Faltan los apellidos del usuario",
    notEmpty: true
  };
  const email = {
    [esPatch ? "exists" : "optional"]: true,
    errorMessage: "Falta el e-mail del usuario",
    notEmpty: true
  };
  const contrasenya = {
    [esPatch ? "exists" : "optional"]: true,
    isLength: {
      errorMessage: "La contraseña tiene que tener ocho caracteres como mínimo",
      options: {
        min: 8
      }
    }
  };
  const telefono = {
    [esPatch ? "exists" : "optional"]: true,
    errorMessage: "Introduce un número de teléfono válido",
  };
  const direccion = {
    [esPatch ? "exists" : "optional"]: true,
    errorMessage: "Introduce una dirección válida",
  };
  const fechaAlta = {
    [esPatch ? "exists" : "optional"]: true,
    errorMessage: "La fecha introducida tiene que tener formato timestamp",
  };
  return {
    nombre,
    apellidos,
    email,
    contrasenya,
    telefono,
    direccion,
    fechaAlta
  };
};

module.exports = {
  getUsuarioSchema
};
