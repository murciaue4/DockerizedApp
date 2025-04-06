const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const respuestas = require('../../../red/respuestas');
const auth = require('../../../authentication/index');
const error = require('../../../middlewares/errors');
const nodemailer = require('nodemailer');

const T_AUTH = 'auth';
const T_RPASS = 'password_resets';

module.exports = function (dbIn) {
  let db = dbIn;
  if (!db) {
    db = require('../../../db/databse');
  }




  const hashPassword = async (password) => {
    const saltRounds = 5;
    return await bcrypt.hash(password, saltRounds);
  };

  const insertLog = async (data) => {
    console.log('Datos recibidos:', {
      email: data.email,
      username: data.username,
      password: data.password,
      user_id: data.user_id,
    });

    try {
      const authData = {};

      if (data.user_id && data.user_id !== 0) {
        authData.user_id = data.user_id;
      }

      if (data.email) {
        authData.email = data.email;
      }

      if (data.username) {
        authData.username = data.username;
      }

      if (data.password) {
        authData.password = await hashPassword(data.password);
      }

      const result = await db.postUser(T_AUTH, authData);
      return result;
    } catch (error) {
      console.error('Error al insertar log:', error);
      throw error;
    }
  };

  const logIn = async (req, res) => {
    let result = res;
    try {
      const data = await db.getUserByUsername(T_AUTH, req.body.username);
      console.log('controller-auth/cantidad usuarios encontrados: ', data.length);
      if (data.length <= 0) {
        throw error('user not exist !');
      } else {
        console.log('controller-auth/usuarios encontrados: ', data);
        const res = await bcrypt.compare(req.body.password, data[0].password);
        if (!res) {
          throw error('wrong password !');
        } else {
          const getToken = auth.asignaToken(data[0]);
          let user = {
            id: data[0].id,
            user_id: data[0].user_id,
            username: data[0].username,
            email: data[0].email,
            is_verify: data[0].is_verify,
            token: getToken,
          };
          respuestas.sucess(req, result, user, 200);
        }
      }
    } catch (error) {
      console.log(error);
      respuestas.error(req, result, error, 500);
    }
  };

  const getCredential = async (req, res) => {
    result = res;
    try {
      const data = await db.getUserByUsername(T_AUTH, req.body.username);
      respuestas.sucess(req, result, data, 200);
    } catch (error) {
      respuestas.error(req, result, error, 500);
    }
  };

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const verifyEmail = async (req, res) => {
    try {
      // Genero un token único para el usuario
      const payload = {
        userId: req.body.id,
        email: req.body.email,
      };

      // Opciones de configuración del token
      const options = {
        expiresIn: '1h', // Tiempo de expiración del token
        issuer: 'myApp', // Emisor del token
      };

      // Genero el token utilizando jwt.sign()
      const token = jwt.sign(payload, process.env.JET_SECRET, options);


      // Envio correo electrónico de verificación
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: req.body.email,
        subject: 'Verificación de Correo Electrónico',
        text: `Haz clic en el siguiente enlace para verificar tu dirección de correo electrónico: http://localhost:3333/auth/confirm-email/${token}/${payload.userId}`,
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Verificación de Correo Electrónico</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                            text-align: center;
                        }
                        p {
                            color: #666;
                            text-align: center;
                        }
                        .button {
                            display: block;
                            width: 200px;
                            margin: 20px auto;
                            padding: 10px 20px;
                            background-color: #007bff;
                            color: #f4f4f4 !important; /* Color blanco con !important */
                            text-align: center;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: bold; /* Texto en negrita */
                        }
                        
                        .button:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Verificación de Correo Electrónico</h1>
                        <p>Haz clic en el siguiente botón para verificar tu dirección de correo electrónico:</p>
                        <a class="button" href="http://localhost:3333/auth/confirm-email/${token}/${payload.userId}" target="_blank">Verificar Correo Electrónico</a>
                    </div>
                </body>
                </html>`,
      };
      const sqlBody = {
        temp_token: token,
      };
      const rows = await db.updateUser(T_AUTH, sqlBody, req.body.id);
      console.log(rows);
      const data = await transporter.sendMail(mailOptions);
      respuestas.sucess(req, res, data, 200);
    } catch (error) {
      console.error(error);
      respuestas.error(req, res, error, 500);
    }
  };

  const confirmEmail = async (req, res) => {
    try {
      // Obtener el token de la URL
      const token = req.params.token;

      // Obtener el usuario por su ID desde la base de datos
      const userId = req.params.id;
      console.log('userId: ', userId);
      const [userRows] = await db.getUser(T_AUTH, userId);
console.log('controller-auth/confirmEmail/userRows: ', userRows);
      // Verifico si se encontró un usuario con el ID proporcionado
      if (userRows.length == 0) {
        return res.status(400).json({ error: 'Usuario no encontrado.' });
      }

      // Obtengo el token de verificación hasheado almacenado en la base de datos
      const tokenFromDatabase = userRows.temp_token;

      // Comparar el token de la URL con el token almacenado en la base de datos utilizando el mismo secreto\
      console.log(token === tokenFromDatabase
      );
      const match = (token === tokenFromDatabase
      );
      if (!match) {
        return res.status(400).json({ error: 'Token de verificación no válido.' });
      }

      // Marco el correo electrónico como verificado y elimino el token de verificación
      const sqlBody = {
        is_verify: '1', 
        temp_token: null,
      };
      const rows = await db.updateUser(T_AUTH, sqlBody, userId);

      // Respondo con un mensaje de éxito
      res.redirect('http://localhost:5173/login');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al verificar el correo electrónico.' });
    }
  };

  
  const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('email auth controler',email)

  try {
    // Verificar que el correo exista
    const user = await db.queryUniversal(`SELECT id FROM auth WHERE email = '${email}';`);
    console.log('first user', user)
    if (user.length === 0) {
      return res.status(404).json({ error: "Correo no encontrado" });
    }

    // Generar token único
    const token = jwt.sign({ email }, process.env.JET_SECRET, { expiresIn: "1h" });


    // Guardar token en la base de datos
    await db.postToken(T_RPASS, {token, user_id: user[0].id.toString()});

    // Configurar nodemailer para enviar el correo
    const resetUrl = `http://localhost:5173/auth/reset?token=${token}`;
    await transporter.sendMail({
      from: "Soporte Rapihoteles.com",
      to: email,
      subject: "Recupera tu contraseña",
      html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Correo Electrónico</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            font-size: 24px;
        }
        p {
            color: #666;
            text-align: center;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .button {
            display: block;
            width: 220px;
            margin: 0 auto;
            padding: 12px 25px;
            background-color: #007bff;
            color: #fff !important;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            transition: background-color 0.3s, transform 0.3s;
        }
        .button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 30px;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Reestablece tu contraseña!</h1>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>
<p>Para continuar con el restablecimiento de tu contraseña, haz clic en el siguiente botón y podrás ingresar una nueva:</p>

        <a class="button" href="${resetUrl}" target="_blank">Cambiar contraseña</a>
    </div>
    <div class="footer">
        <p>Si no solicitaste este registro, puedes ignorar este mensaje. Si tienes alguna pregunta, no dudes en <a href="mailto:support@tusitio.com">contactarnos</a>.</p>
    </div>
</body>
</html>
`,
    });

    res.json({ message: "Correo enviado para recuperación de contraseña" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
const resetPassword =  async (req, res) => {
  const { token, newPassword } = req.body;
  console.log(req.body)
console.log('token en auth controler resetPassword ',token)
  try {
    // Verificar el token
    const resetRecord = await db.queryUniversal(
      `SELECT user_id FROM password_resets WHERE token = '${token}';`
    );
console.log('id con ese token ', resetRecord);
    if (resetRecord.length === 0) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario
    await db.queryUniversal(`UPDATE auth SET password = '${hashedPassword}' WHERE id = '${resetRecord[0].user_id}';`);

    // Eliminar el token usado
    await db.queryUniversal(`DELETE FROM password_resets WHERE token = '${token}';`);

    res.json({ message: "Contraseña actualizada con éxito", statusCode: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor", statusCode: 500 });
  }
}


  return {
    insertLog,
    logIn,
    getCredential,
    verifyEmail,
    confirmEmail,
    forgotPassword,
    resetPassword,
  };
};
