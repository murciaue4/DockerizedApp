const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const dbConfig = require("../config");
const awsConfig = require("../config");
const { putObjectsS3, getObjectsS3, listObjectsS3, deleteObjectsS3 } = require("../aws/s3");
const { CLIENT_RENEG_LIMIT } = require("tls");

const pool = mysql.createPool(dbConfig.db);

//_____________________________POST________________________________________

const ping2 = async () => {
  const [rows] = await pool.query("SELECT * FROM ping;");
  return rows;
};
const queryUniversal = async (query) => {
  const [rows] = await pool.query(query);
  return rows;
};

const postComment = async (tabla, body) => {
  const result = await pool.query(
    `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE date = CURRENT_TIMESTAMP, ?;`,
    [body, body]
  );
  return result;
};
const postRate = async (tabla, body) => {
  const result = await pool.query(
    `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE fecha = CURRENT_TIMESTAMP, ?;`,
    [body, body]
  );
  return result;
};
const postUser = async (tabla, body) => {
  const result = await pool.query(
    `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`,
    [body, body]
  );
  return result;
};
const postHotel = async (tabla, body) => {
  const connection = await pool.getConnection();
  try { 
    await connection.beginTransaction();

    // Desestructurar el objeto body para obtener los datos necesarios
    const {
      id,
      id_user,
      name,
      descripcion,
      location: { city, country, sector, directions, barrio, indications },
      choords: { lat, lng },
      groupName,
      telefono,
      segundoTelefono,
      email,
      type,
      rooms,
      servicios,
    } = body;

    // Inserción en la tabla hoteles
    const [hotelResult] = await connection.query(
      `INSERT INTO ${tabla} (id, id_user, name, type, groupName, telefono, segundoTelefono, descripcion, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        id,
        id_user,
        name,
        type,
        groupName,
        telefono,
        segundoTelefono,
        descripcion,
        email,
      ]
    );

    // Obtener el ID del hotel insertado
    const hotelId = hotelResult.insertId;

    // Inserción en la tabla ubicaciones usando el ID del hotel recién insertado
    const [locationResult] = await connection.query(
      `INSERT INTO locations (hotel_id, country, city, sector, barrio, directions, indications, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        hotelId,
        country,
        city,
        sector,
        barrio,
        directions,
        indications,
        lat,
        lng,
      ]
    );

    const locationId = locationResult.insertId;

    // Actualizar el hotel con el id de la ubicación
    await connection.query(`UPDATE hoteles SET location_id = ? WHERE id = ?;`, [
      locationId,
      hotelId,
    ]);

    // Inserción de rooms
    for (const key in rooms) {
      const { type, quantity, price, available } = rooms[key];
      await connection.query(
        `INSERT INTO rooms (hotel_id, type, quantity, price, available) VALUES (?, ?, ?, ?, ?);`,
        [hotelId, type, quantity, price, available]
      );
    }

    // Inserción de servicios
    for (const key in servicios) {
      const serviceId = servicios[key];
      await connection.query(
        `INSERT INTO hotel_services (hotel_id, service_id) VALUES (?, ?);`,
        [hotelId, serviceId]
      );
    }

    // Confirmar la transacción
    await connection.commit();
    return { success: true, hotelId };
  } catch (error) {
    // Revertir la transacción en caso de fallo
    await connection.rollback();
    console.error("Error en postHotel:", error);
    throw error;
  } finally {
    connection.release();
  }
};

const postImage = async (tabla, req, idHotel, idUser) => {
  const files = req.files; // req.files contendrá la matriz de archivos si utilizo .array('images')
  const insertImageToDatabase = async (file) => {
    // Construir la clave para el archivo en S3
  // estoy construyendo en la clave el nombre del archivo, el id del hotel y el id del usuario de modo que toda imagen tendra el conbre ej: 'htl_11_imagen.jpgU22.jpg' donde 'htl' indica que es una imagen de un hotel, '11' es el id del hotel, 'imagen.jpg' es el nombre del archivo, 'U22' indica que el usuario 22 subio la imagen
    const key = `htl${idHotel}_${file.filename}`;
    const body = fs.createReadStream(file.path);
    try {
      // Sube la imagen a S3 usando la función putObjectsS3
      const { imageUrl } = await putObjectsS3(awsConfig.s3.bucket, key, body);

      const dataBody = {
        name: file.filename,
        url: imageUrl,
        type: file.mimetype,
        originalname: file.originalname,
      };
      if (idHotel) {
        dataBody.hotel_id = idHotel;
      }
      if (idUser) {
        dataBody.id_user = idUser;
      }

      const [rows] = await pool.query(
        `SELECT originalname FROM ${tabla} WHERE hotel_id = ?;`,
        [idHotel]
      );

      // Si es el primer dato, lo insertamos en la base de datos. Si no, filtramos para que no esté duplicado, filtramos por nombre original.
      if (
        rows.length === 0 ||
        !rows.some((el) => el.originalname === file.originalname)
      ) {
        const result = await pool.query(
          `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`,
          [dataBody, dataBody]
        );
       

        // Eliminar el archivo temporal después de guardarlo en la base de datos
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(
              `Error eliminando el archivo temporal: ${file.filename}`
            );
          } else {
            console.log(`Archivo temporal eliminado: ${file.filename}`);
          }
        });

        return result;
      } else {
        console.log(
          `La imagen con nombre ${file.originalname} ya existe en la base de datos.`
        );

        // Eliminar el archivo temporal ya que no se necesita
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(
              `Error eliminando el archivo temporal: ${file.filename}`
            );
          } else {
            console.log(`Archivo temporal eliminado: ${file.filename}`);
          }
        });

        return null;
      }
    } catch (err) {
    
      throw err;
    }
  };

  // Procesar cada archivo en la matriz
  const results = await Promise.all(files.map(insertImageToDatabase));
  return results;
};

const postImgUser = async (tabla, req, idUser) => {
  const files = req.files; // req.files contendrá la matriz de archivos

  const insertImageToDatabase = async (file) => {
    // Construir la clave para S3 con "usimg", el id del usuario y el nombre del archivo
    const key = `usimg${idUser}_${file.filename}`;
    const body = fs.createReadStream(file.path);
    let connection;
    try {
      // Sube la imagen a S3 usando la función putObjectsS3
      const { imageUrl } = await putObjectsS3(awsConfig.s3.bucket, key, body);

      const dataBody = {
        name: key, // Usamos la clave generada para identificar la imagen
        url: imageUrl,
        type: file.mimetype,
        originalname: file.originalname,
        id_user: idUser,
      };

      // Obtener una conexión del pool y comenzar una transacción
      connection = await pool.getConnection();
      await connection.beginTransaction();

      // Verificar si ya existe una imagen para este usuario
      const [rows] = await connection.query(
        `SELECT name FROM ${tabla} WHERE id_user = ?;`,
        [idUser]
      );

      // Si existe, eliminar la imagen anterior de S3
      if (rows.length > 0) {
        const keyToDelete = rows[0].name;
        await deleteObjectsS3(awsConfig.s3.bucket, keyToDelete);
      }

      // Insertar o actualizar el registro en la base de datos
      const result = await connection.query(
        `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`,
        [dataBody, dataBody]
      );

      // Confirmar la transacción
      await connection.commit();

      // Eliminar el archivo temporal después de subirlo a S3 y guardarlo en la BD
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Error eliminando el archivo temporal: ${file.filename}`);
        } else {
          console.log(`Archivo temporal eliminado: ${file.filename}`);
        }
      });

      return result;
    } catch (err) {
      if (connection) {
        // Revertir la transacción en caso de error
        await connection.rollback();
      }
      // Eliminar el archivo temporal en caso de error
      fs.unlink(file.path, (err2) => {
        if (err2) {
          console.error(`Error eliminando el archivo temporal: ${file.filename}`);
        } else {
          console.log(`Archivo temporal eliminado: ${file.filename}`);
        }
      });
      throw err;
    } finally {
      if (connection) connection.release();
    }
  };

  // Procesar cada archivo de la matriz de forma concurrente
  const results = await Promise.all(files.map(insertImageToDatabase));
  return results;
};
/*db.query(
      "SELECT user_id FROM password_resets WHERE token = ?",
      [token]
    );
    */
const postReset = async (tabla, body) => {
  const result = await pool.query(
    `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE date = CURRENT_TIMESTAMP, ?;`,
    [body, body]
  );
  return result;
};

const postToken = async (tabla, body) => {
  const result = await pool.query(
    `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`,
    [body, body]
  );
  return result;
};

//________________________________GET_________________________________________

const getRatingUser = async (tabla, id) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${tabla} WHERE cliente_id = ${id};`
  );
  return rows;
};
const getCommentUser = async (tabla, id) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${tabla} WHERE user_id = ${id};`
  );
  return rows;
};
const getRatingHotel = async (tabla, id) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${tabla} WHERE hotel_id = ${id};`
  );
  return rows;
};
const getCommentHotel = async (tabla, id) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${tabla} WHERE hotel_id = ${id};`
  );
  return rows;
};
const allUsers = async (tabla) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla};`);
  return rows;
};
const getUser = async (tabla, id) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE id = ?;`, [id]);
  return rows;
};
const getHotels = async () => {
  try {
    const query =
     `
      SELECT 
    h.*,  
    u.name AS user_name, 
    u.lastname AS user_lastname, 
    u.email AS user_email, 
    u.telefono AS user_telefono, 
    l.directions, 
    l.country, 
    l.departamento, 
    l.city, 
    l.sector, 
    l.barrio, 
    l.indications, 
    l.lat, 
    l.lng, 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', s.id, 'name', s.name, 'category', s.category))
     FROM hotelesappdb.services AS s
     JOIN hotelesappdb.hotel_services AS hs ON hs.service_id = s.id
     WHERE hs.hotel_id = h.id
     GROUP BY hs.hotel_id) AS services, 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('url', ih.url, 'type', ih.type, 'originalname', ih.originalname))
     FROM hotelesappdb.imagenes_hoteles AS ih
     WHERE ih.hotel_id = h.id) AS images, 
    (SELECT JSON_ARRAYAGG(
         JSON_OBJECT(
             'room_type', JSON_OBJECT(
                 'id', rt.id,
                 'name', rt.name,
                 'capacity', rt.capacity,
                 'description', rt.room_description,
                 'beds', rt.beds
                 
             ),
             'price', rms.price,
             'quantity', rms.quantity,
             'available', rms.available,
             'discount', rms.discount
         )
     )
     FROM hotelesappdb.rooms AS rms
     JOIN hotelesappdb.room_types AS rt ON rms.type = rt.id
     WHERE rms.hotel_id = h.id) AS rooms, 
    COALESCE(AVG(r.calificacion), 0) AS avg_rating, 
    COUNT(r.id) AS total_ratings
FROM 
    hotelesappdb.hoteles AS h
LEFT JOIN 
    hotelesappdb.users AS u ON h.id_user = u.id
LEFT JOIN 
    hotelesappdb.locations AS l ON h.location_id = l.id
LEFT JOIN 
    hotelesappdb.ratings AS r ON h.id = r.hotel_id
GROUP BY 
    h.id;

    `;
    const [rows] = await pool.query(query);
   
  
    return rows;
  } catch (error) {
    console.error("Error en getHotels:", error);
    throw error;
  }
};


const getHotel = async (id) => {
  try {
    const query = `
      SELECT 
    h.*,  
    u.name AS user_name, 
    u.lastname AS user_lastname, 
    u.email AS user_email, 
    u.telefono AS user_telefono, 
    l.directions, 
    l.country, 
    l.departamento, 
    l.city, 
    l.sector, 
    l.barrio, 
    l.indications, 
    l.lat, 
    l.lng, 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT( 'id', s.id, 'name', s.name, 'category', s.category))
         FROM hotelesappdb.services AS s
         JOIN hotelesappdb.hotel_services AS hs ON hs.service_id = s.id
         WHERE hs.hotel_id = h.id
         GROUP BY hs.hotel_id) AS services, 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('url', ih.url, 'type', ih.type, 'originalname', ih.originalname)) 
         FROM hotelesappdb.imagenes_hoteles AS ih
         WHERE ih.hotel_id = h.id) AS images, 
    (SELECT JSON_ARRAYAGG(
           JSON_OBJECT(
              'room_type', JSON_OBJECT(
                 'id', rt.id,
                 'name', rt.name,
                 'capacity', rt.capacity,
                 'description', rt.room_description,
                 'beds', rt.beds
                 
             ),
             'price', rms.price,
             'quantity', rms.quantity,
             'available', rms.available,
             'discount', rms.discount
         )
        )
        FROM hotelesappdb.rooms AS rms
        JOIN hotelesappdb.room_types AS rt ON rms.type = rt.id
        WHERE rms.hotel_id = h.id
    ) AS rooms, 
    COALESCE(AVG(r.calificacion), 0) AS avg_rating, 
    COUNT(r.id) AS total_ratings
FROM 
    hotelesappdb.hoteles AS h
LEFT JOIN 
    hotelesappdb.users AS u ON h.id_user = u.id
LEFT JOIN 
    hotelesappdb.locations AS l ON h.location_id = l.id
LEFT JOIN 
    hotelesappdb.ratings AS r ON h.id = r.hotel_id
WHERE h.id = ?
GROUP BY 
    h.id;

    `;
    const [rows] = await pool.query(query, id);
   
    // Retorna el hotel si existe, o null en caso contrario
    return rows.length ? rows : null;
  } catch (error) {
    console.error("Error en getHotel:", error);
    throw error;
  }
};

const getHotelByUser = async (userId) => {
  console.log(userId);
  console.log("userId in database", userId);
  console.log("userId in database", userId);
  try {
    const query = `
      SELECT 
    h.*,  
    u.name AS user_name, 
    u.lastname AS user_lastname, 
    u.email AS user_email, 
    u.telefono AS user_telefono, 
    l.directions, 
    l.country, 
    l.departamento, 
    l.city, 
    l.sector, 
    l.barrio, 
    l.indications, 
    l.lat, 
    l.lng, 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', s.name)) 
     FROM hotelesappdb.services AS s
     JOIN hotelesappdb.hotel_services AS hs ON hs.service_id = s.id
     WHERE hs.hotel_id = h.id
     GROUP BY hs.hotel_id) AS services, 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('url', ih.url, 'type', ih.type, 'originalname', ih.originalname)) 
     FROM hotelesappdb.imagenes_hoteles AS ih
     WHERE ih.hotel_id = h.id) AS images, 
    (SELECT JSON_ARRAYAGG(
         JSON_OBJECT(
             'room_type', JSON_OBJECT(
                 'id', rt.id,
                 'name', rt.name,
                 'capacity', rt.capacity,
                 'description', rt.room_description
             ),
             'price', rms.price,
             'quantity', rms.quantity,
             'available', rms.available
         )
    )
     FROM hotelesappdb.rooms AS rms
     JOIN hotelesappdb.room_types AS rt ON rms.type = rt.id
     WHERE rms.hotel_id = h.id) AS rooms, 
    COALESCE(AVG(r.calificacion), 0) AS avg_rating, 
    COUNT(r.id) AS total_ratings
FROM 
    hotelesappdb.hoteles AS h
LEFT JOIN 
    hotelesappdb.users AS u ON h.id_user = u.id
LEFT JOIN 
    hotelesappdb.locations AS l ON h.location_id = l.id
LEFT JOIN 
    hotelesappdb.ratings AS r ON h.id = r.hotel_id
WHERE
    h.id_user = ?
GROUP BY 
    h.id;

    `;
    const [rows] = await pool.query(query, [userId]);
    
    return rows;
  } catch (error) {
    console.error("Error en getHotelByUser:", error);
    throw error;
  }
};

const getUserByUsername = async (tabla, data) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${tabla} WHERE username = ? ;`,
    [data]
  );
  return rows;
};
const query2 = async (tabla, data) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE email = ? ;`, [
    data,
  ]);
  return rows;
};
const getImagesById = async (tabla, HotelId) => {
  const [images] = await pool.query(
    `SELECT * FROM ${tabla} WHERE hotel_id = ${HotelId}`
  );
  const data = images.map((el) => el.name);
  return data;
};
const getUserImg = async (tabla, userId) => {
  try {
    // Realiza la consulta utilizando el campo id_user para buscar las imágenes del usuario
    const [images] = await pool.query(
      `SELECT * FROM ${tabla} WHERE id_user = ?`,
      [userId]
    );

    if (images.length === 0) {
      return `No se encontraron imágenes para el usuario con ID: ${userId}`;
    }

    // Ya no es necesario escribir las imágenes en el sistema de archivos,
    // ya que ahora la información relevante es la URL que apunta a S3.
    // Puedes retornar la imagen o las imágenes según lo requieras.
    return images[0]; // O retornar todo el array: return images;
  } catch (error) {
    console.error("Error al obtener la imagen del usuario:", error);
    throw new Error("Hubo un problema al procesar las imágenes del usuario.");
  }
};
const getImages = async (tabla) => {
  const images = await pool.query(`SELECT * FROM ${tabla}`);
  //traer las imagenes con la url desde s3
  const data = images.map((el) => el.url);

  return data;
};

//_____________________________________UPDATE_____________________________________

const updateUser = async (tabla, body, userId) => {
  try {
    console.log("body", body);
    const result = await pool.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [
      body,
      userId,
    ]);
    return result;
  } catch (error) {
    console.error("Error en updateUser:", error);
    throw error;
  }
};
const updateHotel = async (tabla, body) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Desestructurar el objeto body para obtener los datos necesarios
    const {
      id, // id del hotel que se va a actualizar
      id_user,
      name,
      descripcion,
      location: { city, country, sector, directions, barrio, indications },
      choords: { lat, lng },
      groupName,
      telefono,
      segundoTelefono,
      email,
      type,
      rooms,
      servicios,
    } = body;

    // Actualización en la tabla hoteles
    await connection.query(
      `UPDATE ${tabla} SET id_user = ?, name = ?, type = ?, groupName = ?, telefono = ?, segundoTelefono = ?, descripcion = ?, email = ? WHERE id = ?;`,
      [
        id_user,
        name,
        type,
        groupName,
        telefono,
        segundoTelefono,
        descripcion,
        email,
        id,
      ]
    );

    // Actualización en la tabla locations
    // Se asume que la tabla locations está relacionada mediante hotel_id, que es igual al id del hotel
    await connection.query(
      `UPDATE locations SET country = ?, city = ?, sector = ?, barrio = ?, directions = ?, indications = ?, lat = ?, lng = ? WHERE hotel_id = ?;`,
      [
        country,
        city,
        sector,
        barrio,
        directions,
        indications,
        lat,
        lng,
        id,
      ]
    );

    // Actualización de rooms:
    // Una estrategia común es eliminar las habitaciones existentes y reinsertar las nuevas
    await connection.query(`DELETE FROM rooms WHERE hotel_id = ?;`, [id]);
    for (const key in rooms) {
      const { type, quantity, price, available } = rooms[key];
      await connection.query(
        `INSERT INTO rooms (hotel_id, type, quantity, price, available) VALUES (?, ?, ?, ?, ?);`,
        [id, type, quantity, price, available]
      );
    }

    // Actualización de servicios:
    // Se eliminan los servicios actuales y se insertan los nuevos
    await connection.query(`DELETE FROM hotel_services WHERE hotel_id = ?;`, [id]);
    for (const key in servicios) {
      const serviceId = servicios[key];
      await connection.query(
        `INSERT INTO hotel_services (hotel_id, service_id) VALUES (?, ?);`,
        [id, serviceId]
      );
    }

    // Confirmar la transacción
    await connection.commit();
    return { success: true, hotelId: id };
  } catch (error) {
    // Revertir la transacción en caso de fallo
    await connection.rollback();
    console.error("Error en updateHotel:", error);
    throw error;
  } finally {
    connection.release();
  }
};

//______________________________________DELETE________________________________________

const deleteRating = async (tabla, id) => {
  const result = await pool.query(`DELETE * FROM ${tabla} WHERE id=${id}`);
  return result;
  //aqui tiene que llegar el id del comentario
};

module.exports = {
  updateHotel,
  allUsers,
  postImage,
  postImgUser,
  getImages,
  getHotels,
  getHotel,
  postUser,
  getUser,
  getUserByUsername,
  getImagesById,
  getUserImg,
  postHotel,
  getHotelByUser,
  query2,
  updateUser,
  postComment,
  postRate,
  getRatingHotel,
  getRatingUser,
  getCommentUser,
  getCommentHotel,
  deleteRating,
  ping2,
  postToken,
  queryUniversal,
};
