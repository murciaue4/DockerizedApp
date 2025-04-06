
const error = require("../../../middlewares/errors");
const respuestas = require("../../../red/respuestas");
const auth = require("../../auth");

const T_COMENTS = "coments";
const T_RATE = "ratings";
const T_USERS = "users";
const T_HOTEL = "hoteles";
const T_IMAGE = "imagenes_hoteles";
const T_IMGUS = "imagenes_clientes";
const T_AUTH = "auth";

module.exports = function (dbIn) {
  let db = dbIn;
  if (!db) {
    db = require("../../../db/databse");
  }

  //____________________________________POST________________________________________

  //crear el controlador ping2 para que se conecte a la base de dato
  const ping2 = async (req, res) => {
    try {
      const rows = await db.ping2();
      console.log("controller-user/ PING2:", rows);
      respuestas.sucess(req, res, rows, 200);
    } catch (error) {
      respuestas.error(req, res, error, error.statusCode);
    }
  };

  //-------------------------------AUTHENTICATION CONTROLERS--------------------------------

  const validarContraseña = (contraseña) => {
    const longitudValida = contraseña.length >= 8 && contraseña.length <= 15;
    const tieneNumero = /[0-9]/.test(contraseña);
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    return longitudValida && tieneNumero && tieneMayuscula;
  };

  const verificarDuplicados = async (body, createdUsers) => {
    const emails = createdUsers.map((el) => el.email.toLowerCase());
    const [findByEmail] = createdUsers.filter(
      (el) => el.email.toLowerCase() === body.email.toLowerCase()
    );
    const isDuplicateEmail = emails.includes(body.email.toLowerCase());
    const isId = createdUsers.map((el) => el.id).includes(body.id);

    return { isDuplicateEmail, findByEmail, isId };
  };

  const crearUsuario = async (body, findByEmail, isId, isDuplicateEmail) => {
    let user = {
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      usertype: Number(body.usertype),
    };

    if (isId && body.id === findByEmail.id) {
      user.id = body.id;
    }

    if (isDuplicateEmail) {
      if (body.id === 0) {
        throw error("email ya usado", 401);
      }
      if (isId && body.id === findByEmail.id) {
        user.id = body.id;
      }
    }

    return user;
  };

  const insertarUsuario = async (user) => {
    const result1 = await db.postUser(T_USERS, user);
    let insertIdConsulta1 = result1[0].insertId;
    console.log(result1[0]);
    if (insertIdConsulta1 === 0) {
      insertIdConsulta1 = user.id;
    }
    return insertIdConsulta1;
  };

  const insertarLog = async (insertIdConsulta1, body) => {
    if (body.username && body.password) {
      return await auth.insertLog({
        email: body.email,
        username: body.username,
        password: body.password,
        user_id: insertIdConsulta1,
      });
    }
    return [];
  };

  const postUsers = async (req, res) => {
    try {
      if (!validarContraseña(req.body.password)) {
        throw error(
          "La contraseña debe contar con al menos 8 caracteres, una mayúscula y un número.",
          401
        );
      }

      const body = req.body;
      const isUsername = await db.getUserByUsername(T_AUTH, body.username);
      if (isUsername.length > 0) {
        throw error("username ya usado", 401);
      }

      const query = await db.allUsers(T_USERS);
      const createdUsers = query.map((el) => ({
        id: el.id,
        email: el.email.toLowerCase(),
      }));

      const { isDuplicateEmail, findByEmail, isId } = await verificarDuplicados(
        body,
        createdUsers
      );
      const user = await crearUsuario(
        body,
        findByEmail,
        isId,
        isDuplicateEmail
      );
      const insertIdConsulta1 = await insertarUsuario(user);
      const result2 = await insertarLog(insertIdConsulta1, body);

      respuestas.sucess(req, res, result2, 200);
    } catch (error) {
      respuestas.error(req, res, error, error.estatusCode);
    }
  };

  //-----------------COMMENT AND RATE CONTROLLERS-------------------
  //---POST---//
  const postComments = async (req, res) => {
    try {
      const comment = {
        user_id: req.params.id_user,
        hotel_id: req.params.id_hotel,
        username: req.body.username,
        text_comment: req.body.comment_text,
      };

      const existingComments = await db.getCommentUser(
        T_COMENTS,
        req.params.id_user
      );

      const existingComment = existingComments.find(
        (comment) => comment.hotel_id == req.params.id_hotel
      );

      if (existingComment) {
        comment.id = existingComment.id;
      }

      const DBresponse = await db.postComment(T_COMENTS, comment);
      console.log("controller-user/ POST_COMMENT:", DBresponse);

      respuestas.sucess(req, res, DBresponse, 200);
    } catch (error) {
      respuestas.error(req, res, error, error.statusCode);
    }
  };
  const postRatings = async (req, res) => {
    try {
      const rate = {
        cliente_id: req.params.id_user,
        hotel_id: req.params.id_hotel,
        calificacion: req.body.calificacion,
      };

      const existingRatings = await db.getRatingUser(
        T_RATE,
        req.params.id_user
      );
      const existingRating = existingRatings.find(
        (rating) => rating.hotel_id == req.params.id_hotel
      );

      if (existingRating) {
        rate.id = existingRating.id;
      }

      const DBresponse = await db.postRate(T_RATE, rate);
      console.log("controller-user/ POST_RATE:", DBresponse);

      respuestas.sucess(req, res, DBresponse, 200);
    } catch (error) {
      respuestas.error(req, res, error, error.statusCode);
    }
  };
  const getRatingsUser = async (req, res) => {
    const id = req.params.id_user;
    try {
      const rows = await db.getRatingUser(T_RATE, id);

      respuestas.sucess(req, res, rows, 200);
    } catch (error) {
      console.log(error);

      respuestas.error(req, res, error, 500);
    }
  };
  //--GET--//
  const getCommentsUser = async (req, res) => {
    const id = req.params.id_user;
    try {
      const rows = await db.getCommentUser(T_COMENTS, id);

      respuestas.sucess(req, res, rows, 200);
    } catch (error) {
      console.log(error);

      respuestas.error(req, res, error, 500);
    }
  };
  const getRatingsHotel = async (req, res) => {
    const id = req.params.id_hotel;
    try {
      const rows = await db.getRatingHotel(T_RATE, id);

      respuestas.sucess(req, res, rows, 200);
    } catch (error) {
      console.log(error);

      respuestas.error(req, res, error, 500);
    }
  };
  const getCommentsHotel = async (req, res) => {
    const id = req.params.id_hotel;
    try {
      const rows = await db.getCommentHotel(T_COMENTS, id);

      respuestas.sucess(req, res, rows, 200);
    } catch (error) {
      console.log(error);

      respuestas.error(req, res, error, 500);
    }
  };
  //--DELETE--//
  const deleteRatingsHotel = async (req, res) => {
    //tengo que buscar el id del coemntario y si ese comentario tienen el id del usuario en cuestion si puede eliminar de lo contario no
    try {
      const id = req.params.id_user;
      const result = await db.deleteRating(T_RATE, id);
      respuestas.sucess(req, res, result, 200);
    } catch (err) {
      respuestas.error(req, res, result, err.statusCode);
    }
  };

  //------------------------------- HOTEL CONTROLLERS--------------------------------
  //---POST---//
  const postHoteles = async (req, res) => {
    try {
      const body = req.body;

      // Obtener la lista de hoteles existentes
      const consulta = await db.getHotels(T_HOTEL);
      const hoteles = consulta.map((el) => ({ id: el.id, name: el.name }));

      // Verificar duplicados por ID y nombre
      const isDuplicateId = hoteles.some((el) => el.id === body.id);
      const isDuplicateName = hoteles.some((el) => el.name === body.name);

      const findDuplicated = hoteles.find((el) => el.email === body.email);

      // Crear el objeto hotel a partir del cuerpo de la solicitud
      const hotel = { ...body };
      if (req.params.id_user) {
        hotel.id_user = req.params.id_user;
      }

      // Manejar duplicados por nombre // Si el nombre ya existe, se lanza un error
      if (isDuplicateName) {
        if (body.id === 0) {
          throw new Error("Ya existe un HOTEL con este nombre");
        }
        if (isDuplicateId && body.id === findDuplicated.id) {
          hotel.id = body.id;
        }
      }

      // Manejar duplicados por ID // Si el ID es 0, se asigna un nuevo ID pero si es diferente de 0, se mantiene el ID porque significaa que se está actualizando
      if (isDuplicateId && body.id === findDuplicated.id) {
        hotel.id = body.id;
      }

      // Insertar el hotel en la base de datos
      const DBresponse = await db.postHotel(T_HOTEL, hotel);
      console.log("controller-user/ Result of postHotel:", DBresponse);

      // Enviar respuesta exitosa
      respuestas.sucess(req, res, DBresponse, 200);
    } catch (error) {
      // Manejar errores y enviar respuesta de error
      respuestas.error(req, res, error.message, error.statusCode || 500);
    }
  };
  const postImages = async (req, res) => {
    
    try {
      let idHotel = null;
      let idUser = null;
      if (req.params.id_hotel) {
        idHotel = req.params.id_hotel;
      }
      if (req.params.user) {
        idUser = req.params.id_user;
      }
      if(req.params.id_user && req.params.id_hotel > 0){
        const result = await db.postImage(T_IMAGE, req, idHotel, idUser);
      respuestas.sucess(req, res, result, 200);
      }else{
     
        throw new Error('Error en postImages: No se ha especificado el id del usuario o del hotel');
      }
      
    } catch (error) {
      if (error.errno === 1062) {
        respuestas.error(req, res, 'Error en postImages: Imagen ya existe', 300);
      } else {
        respuestas.error(req, res, error, error.statusCode );
      }
    }
  };
  //--GET--//
  const getAllImages = async (req, res) => {
    try {
      const rows = await db.getImages(T_IMAGE);
      const data = rows.map((el) => el);
      respuestas.sucess(req, res, data, 200);
    } catch (error) {
      console.log(error);
      respuestas.error(req, res, error, 500);
    }
  };
  const getAllHotels = async (req, res) => {
    try {
      const hoteles = await db.getHotels();
    

      const data = hoteles.map((hotel) => {
      

        // Crear objeto de ubicación
        const location = {
          directions: hotel.directions,
          country: hotel.country,
          departamento: hotel.departamento,
          city: hotel.city,
          sector: hotel.sector,
          barrio: hotel.barrio,
          indications: hotel.indications,
          lat: hotel.lat,
          lng: hotel.lng,
        };
        //crear un objeto que calcule el precio mas alto, el precio mas bajo y el promedio de precios redondeado
        const prices = hotel.rooms?.map((room) => room.price);
        const maxPrice = prices?.length > 0 ? Math.max(...prices) : 0;
        const minPrice = prices?.length > 0 ? Math.min(...prices) : 0;
        const avgPrice = Math.round(prices?.reduce((a, b) => a + b, 0) / prices?.length);


        const capacity = hotel.rooms
          ?.map((room) => room.quantity)
          ?.reduce((a, b) => a + b, 0);
        const availableRooms = hotel.rooms
          ?.map((room) => room.available)
          ?.reduce((a, b) => a + b, 0);

        // Excluir propiedades de ubicación del objeto principal
        const {
        
          ...restOfHotel
        } = hotel;

        return {
          ...restOfHotel,
          location: location,
          availableRooms,
          capacity,
          maxPrice,
          minPrice,
          avgPrice,
        };
      });

      respuestas.sucess(req, res, data, 200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  };

  const getHotels = async (req, res) => {
    try {
      const id = req.params.id;
      const hoteles = await db.getHotel(id);

      const data = hoteles.map((hotel) => {
       

        // Crear objeto de ubicación
        const location = {
          directions: hotel.directions,
          country: hotel.country,
          departamento: hotel.departamento,
          city: hotel.city,
          sector: hotel.sector,
          barrio: hotel.barrio,
          indications: hotel.indications,
          lat: hotel.lat,
          lng: hotel.lng,
        };
        //crear un objeto que calcule el precio mas alto, el precio mas bajo y el promedio de precios redondeado
        const prices = hotel.rooms?.map((room) => room.price);
        const maxPrice = prices?.length > 0 ? Math.max(...prices) : 0;
        const minPrice = prices?.length > 0 ? Math.min(...prices) : 0;
        const avgPrice = Math.round(prices?.reduce((a, b) => a + b, 0) / prices?.length);


        const capacity = hotel.rooms
          ?.map((room) => room.quantity)
          ?.reduce((a, b) => a + b, 0);
        const availableRooms = hotel.rooms
          ?.map((room) => room.available)
          ?.reduce((a, b) => a + b, 0);

        // Excluir propiedades de ubicación del objeto principal
        const {
          directions,
          country,
          departamento,
          city,
          sector,
          barrio,
          indications,
          lat,
          lng,
          ...restOfHotel
        } = hotel;

        return {
          ...restOfHotel,
          location: location,
          availableRooms,
          capacity,
          maxPrice,
          minPrice,
          avgPrice,
        };
      });

      respuestas.sucess(req, res, data, 200);
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "somethings goes wrong", error });
    }
  };
  const getHotelsByUser = async (req, res) => {
    try {
      const id = req.params.id;
      
      const hoteles = await db.getHotelByUser(id);
     
      respuestas.sucess(req, res, hoteles, 200);
    } catch (error) {
      console.log(error);
      respuestas.error(req, res, hoteles, 401);
    }
  };
  const getServices = async (req, res) => {
    try {
      const rows = await db.queryUniversal(`SELECT * FROM services`);
      const data = rows;
      console.log(data);
      respuestas.sucess(req, res, data, 200);
    } catch (error) {
      console.log(error);
      respuestas.error(req, res, error, 500);
    }
  };


  //--------------------------------USERS CONTROLLERS--------------------------------

  const postImagesUser = async (req, res) => {
    try {
      let idUser = req.params.id_user;

      const result = await db.postImgUser(T_IMGUS, req, idUser);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error.errno === 1062) {
        res.status(300).render("index");
      } else {
        res.status(500).send("Something went wrong while uploading data");
      }
    }
  };
  const getImageUser = async (req, res) => {
    try {
      const rows = await db.getUserImg(T_IMGUS, req.params.id);
      const data = rows;
      respuestas.sucess(req, res, data, 200);
    } catch (error) {
      console.log(error);

      respuestas.error(req, res, error, 500);
    }
  };
  const getAllUsers = async (req, res) => {
    try {
      const rows = await db.allUsers(T_USERS);
      respuestas.sucess(req, res, rows, 200);
    } catch (error) {
      respuestas.error(res, "err", 500);
    }
  };
  const getUsers = async (req, res) => {
    try {
      const rows = await db.getUser(T_USERS, req.params.id);
      respuestas.sucess(req, res, rows, 200);
    } catch (error) {
      respuestas.error(req, res, error, 500)
    }
  };

  //_____________________________________GET_____________________________________
const getTypes = async (req, res) => {
  try {
    const type = req.params.type;
   if(type === 'room_types'){
    const rows = await db.queryUniversal(`SELECT * FROM ${type}`);
    respuestas.sucess(req, res, rows, 200);
    }
    if(type === 'services'){
      const rows = await db.queryUniversal(`SELECT * FROM ${type}`);
      respuestas.sucess(req, res, rows, 200);
    }
  }
  catch (error) {
    respuestas.error(req, res, error, 500);
  }
}

  // __________________________________UPDATE__________________________________

  const updateHoteles = async (req, res) => {
    try {
      const body = req.body;
      console.log("UPDATE HOTEL BOODY on controllers: ", req.body);
      const id_hotel = req.params.id_hotel;
      body.id = id_hotel;

      const result = await db.updateHotel(T_HOTEL, body);
      console.log("UPDATEDDDD HOTEL controlers:", result);

      respuestas.sucess(req, res, result, 200);
    } catch (error) {
      respuestas.error(req, res, error, error.estatusCode);
    }
  };

  //___________________________________DELETE__________________________________

  return {
    getAllImages,
    getAllHotels,
    getAllUsers,
    getUsers,
    getHotelsByUser,
    getHotels,
    postImages,
    postImagesUser,
    postHoteles,
    postUsers,
    updateHoteles,
    getImageUser,
    postRatings,
    postComments,
    getRatingsUser,
    getRatingsHotel,
    getCommentsUser,
    getCommentsHotel,
    deleteRatingsHotel,
    ping2,
    getTypes,
    getServices,
  };
};
