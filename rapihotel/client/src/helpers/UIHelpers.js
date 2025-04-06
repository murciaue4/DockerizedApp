export const acortarTexto = (
  texto,
  longitudMaxima,
  agregarPuntosSuspensivos
) => {
  if (texto.length > longitudMaxima) {
    texto = texto.substring(0, longitudMaxima);
    if (agregarPuntosSuspensivos) {
      texto += "...";
    }
  }
  return texto;
};

export const getRateColor = (promedio, totalRates) => {
  if (totalRates === 0) {
    return "bg-gray-300"; // Gris si no hay calificaciones
  }

  let claseColor = "";
  if (promedio >= 9.0) {
    claseColor = "bg-green-500"; // Verde para calificaciones excelentes
  } else if (promedio >= 8.0) {
    claseColor = "bg-green-400"; // Verde para calificaciones muy buenas
  } else if (promedio >= 7.0) {
    claseColor = "bg-lime-400"; // Amarillo para calificaciones buenas
  } else if (promedio >= 6.0) {
    claseColor = "bg-yellow-400"; // Naranja para calificaciones aceptables
  } else if (promedio >= 5.0) {
    claseColor = "bg-orange-500"; // Naranja para calificaciones aceptables
  } else {
    claseColor = "bg-red-500"; // Rojo para calificaciones regulares o inferiores
  }

  return claseColor;
};

export const getRateColorText = (promedio, totalRates) => {
  if (totalRates === 0) {
    return "bg-text-secondary"; // Gris si no hay calificaciones
  }

  let claseColor = "";
  if (promedio >= 9.0) {
    claseColor = "text-green-500"; // Verde para calificaciones excelentes
  } else if (promedio >= 8.0) {
    claseColor = "text-green-400"; // Verde para calificaciones muy buenas
  } else if (promedio >= 7.0) {
    claseColor = "text-lime-400"; // Amarillo para calificaciones buenas
  } else if (promedio >= 6.0) {
    claseColor = "text-yellow-400"; // Naranja para calificaciones aceptables
  } else if (promedio >= 5.0) {
    claseColor = "text-orange-500"; // Naranja para calificaciones aceptables
  } else {
    claseColor = "text-red-500"; // Rojo para calificaciones regulares o inferiores
  }

  return claseColor;
}

export const getRateText = (promedio, totalRates) => {
  if (totalRates === 0) {
    return "Sin calificaciones";
  }

  let texto = "";
  if (promedio >= 9.0) {
    texto = "Excelente";
  } else if (promedio >= 8.0) {
    texto = "Muy bueno";
  } else if (promedio >= 7.0) {
    texto = "Bueno";
  } else if (promedio >= 6.0) {
    texto = "Aceptable";
  } else if (promedio >= 5.0) {
    texto = "Regular";
  } else {
    texto = "";
  }

  return texto;
}




export const capitalizeWords = (string) => {
  if (string === null || string === undefined) {
    return "";
  } else {
    return string.replace(/(^|\s)([A-Za-zÀ-ÖØ-öø-ÿ])/g, (match, prefix, letter) => prefix + letter.toUpperCase());


  }
};

export const capitalizeFirstLetterOfText = (text) => {
  
  return text?.charAt(0).toUpperCase() + text?.slice(1);
};  


export const normalize = (text) => {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
