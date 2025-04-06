
const { Router } = require('express');
const { insertLog, logIn, getCredential, verifyEmail, confirmEmail, forgotPassword, resetPassword } = require('../index');
const seguridad = require('../../users/security');
const router = Router();

// Ruta para el inicio de sesión
router.post('/login', logIn);

// Ruta para obtener las credenciales
router.get('/', getCredential);

// Ruta para enviar correo electrónico de verificación
router.put('/verify-email/:id', seguridad(), verifyEmail); 

// Ruta para confirmar la verificación del correo electrónico
router.get('/confirm-email/:token/:id', confirmEmail);

// Ruta para enviar correo electrónico de recuperación de contraseña
router.post('/forgot-password', forgotPassword);

// Rutapara insertar resetear la contraseña
router.post('/reset-password', resetPassword);

module.exports = router;