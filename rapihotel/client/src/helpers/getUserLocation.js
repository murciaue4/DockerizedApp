export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert("La geolocalización no es compatible con este navegador.");
      return reject(new Error("Geolocation not supported"));
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        resolve([latitude, longitude]);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            alert("Permiso de geolocalización denegado, porfavor habilita la geolocalización en tu navegador.");
            break;
          case err.POSITION_UNAVAILABLE:
            alert("La ubicación no está disponible.");
            break;
          case err.TIMEOUT:
            alert("La solicitud de geolocalización ha caducado.");
            break;
          default:
            alert("No fue posible obtener tu ubicación.");
            break;
        }
        console.log(err);
        reject(err);
      }
    );
  });
};

export const getOperatingSystem = () => {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = null;

  if (macosPlatforms.includes(platform)) {
    os = "Mac OS";
  } else if (iosPlatforms.includes(platform)) {
    os = "iOS";
  } else if (windowsPlatforms.includes(platform)) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
};


