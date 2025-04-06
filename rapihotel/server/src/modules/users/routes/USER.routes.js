const { Router } = require('express');
const { ping2, getAllImages, postImages, postImagesUser, getAllHotels, getAllUsers, postUsers, getUsers, postHoteles, getHotels, getHotelsByUser, updateHoteles, getImageUser, postComments, postRatings, getCommentsHotel, getCommentsUser, getRatingsUser, getRatingsHotel, deleteRatingsHotel, getTypes, getServices } = require('../index');
const seguridad = require('../security');
const { logIn } = require('../../auth'); 




const router = Router();
// generar una ruta ping 
router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
});

//generar tuta ping 2 pero esta vez para que se conecte a la tabla ping del la base de datos que tengo en el proyecto
router.get('/ping2', ping2);

//__________________________POST__________________________
router.post('/upload/:id_hotel/:id_user', postImages)
router.post('/post_imguser/:id_user', postImagesUser)
router.post('/users', postUsers)
router.post('/login', logIn)
router.post('/hoteles/:id_user', postHoteles)

router.post('/hoteles/:id_hotel/comments/:id_user', postComments)
router.post('/hoteles/:id_hotel/ratings/:id_user', postRatings)

// mysql://root:KOVuLEQSnNUydIKXKvoawpbRtRCJyIYZ@autorack.proxy.rlwy.net:36074/railway
 
//___________________________GET__________________________ _

router.get('/hoteles',getAllHotels)
router.get('/hoteles/:id',  getHotels)
router.get('/hoteles/propietario_id/:id', getHotelsByUser)
//users
router.get('/users',  getAllUsers)
router.get('/users/:id',  getUsers)
//images
router.get('/img_user/:id',  getImageUser)
router.get('/images', getAllImages)
//comments and rating
router.get('/:id_user/ratings',  getRatingsUser)
router.get('/hoteles/:id_hotel/ratings', getRatingsHotel)
router.get('/:id_user/comments',  getCommentsUser)
router.get('/hoteles/:id_hotel/comments', getCommentsHotel)
router.get('/gettypes/:type', getTypes)
router.get('/gettypes/services', getServices )

//____________________________UPDATE____________________________

router.post('/hoteles/apt/:id_hotel/:id_user',  updateHoteles)


//_____________________________DELETE________________________________


router.delete('/hoteles/:id_user/ratings', deleteRatingsHotel)
// router.delete('/hoteles/:id_user/comments', deleteCommentsHotel)



module.exports = router;