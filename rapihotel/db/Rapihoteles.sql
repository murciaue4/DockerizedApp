-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: hotelesappdb
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `temp_token` text,
  `is_verify` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `fk_auth_cliente` (`user_id`),
  CONSTRAINT `fk_auth_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (10,16,'gerson123','gdmp92@hotmail.com','$2a$10$SHZ2Yqmq.V2OvYA6TcNi3ux87qPmLUX4DvzdUbPSRjt3ccplxuSoa',NULL,1),(12,18,'Daniel','programorphosis@gmail.com','$2a$05$AhrL2Kd4guZS2AGPie7ZO.cl88MyMtrPyTyH6wu.cNdwRbLG3BZPa',NULL,1),(13,19,'anamiller','gdmp29@gmail.com','$2a$05$iOCy0kpAvaIIW.2C/gtFsed43F7/7VMakLexFJFqB0vVbSVtXLleC',NULL,1);
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_user_verify` AFTER UPDATE ON `auth` FOR EACH ROW BEGIN
    IF OLD.is_Verify <> NEW.is_Verify THEN
        UPDATE users 
        SET verify = NEW.is_Verify
        WHERE id = NEW.user_id;  -- Cambiado de user_id a id
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `coments`
--

DROP TABLE IF EXISTS `coments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hotel_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `text_comment` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comentario_hotel` (`hotel_id`),
  KEY `fk_comentario_user` (`user_id`),
  CONSTRAINT `fk_comentario_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hoteles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comentario_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coments`
--

LOCK TABLES `coments` WRITE;
/*!40000 ALTER TABLE `coments` DISABLE KEYS */;
INSERT INTO `coments` VALUES (11,28,19,'anamiller','lo mejor de lo mejor','2025-04-04 05:44:34'),(12,31,16,'gerson123','gyhjhgjghjhgfj','2025-04-01 01:13:31'),(13,30,16,'gerson123','jshfgbhdsgvfygsdahjf suahdfujyhsdabf sauf','2025-04-01 02:36:02'),(14,28,16,'gerson123','Excelente hotel, instalaciones nuevas y muy comodas','2025-04-02 08:51:24'),(15,34,16,'gerson123','excelente servicio','2025-04-02 12:07:28'),(16,29,16,'gerson123','podria ser mejor','2025-04-03 01:29:29'),(17,33,19,'anamiller','bueno','2025-04-04 06:21:33');
/*!40000 ALTER TABLE `coments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_services`
--

DROP TABLE IF EXISTS `hotel_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel_services` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hotel_id` bigint DEFAULT NULL,
  `service_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hotel_servicio_hotel` (`hotel_id`),
  KEY `fk_hotel_servicio_servicio` (`service_id`),
  CONSTRAINT `fk_hotel_servicio_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hoteles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_hotel_servicio_servicio` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=976 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_services`
--

LOCK TABLES `hotel_services` WRITE;
/*!40000 ALTER TABLE `hotel_services` DISABLE KEYS */;
INSERT INTO `hotel_services` VALUES (159,28,1),(160,28,2),(161,28,3),(162,28,4),(163,28,8),(164,28,12),(165,28,15),(166,28,16),(167,28,22),(168,28,24),(169,28,25),(170,28,27),(171,28,30),(172,28,34),(173,28,41),(174,28,42),(175,28,46),(176,28,54),(177,28,55),(178,29,1),(179,29,4),(180,29,3),(181,29,2),(182,29,5),(183,29,15),(184,29,16),(185,29,17),(186,29,19),(187,29,25),(188,29,27),(189,29,32),(190,29,34),(191,29,55),(192,29,46),(193,29,42),(194,30,1),(195,30,3),(196,30,2),(197,30,5),(198,30,15),(199,30,16),(200,30,25),(201,30,27),(202,30,43),(203,30,47),(204,30,46),(205,31,1),(206,31,2),(207,31,3),(208,31,9),(209,31,10),(210,31,14),(211,31,22),(212,31,26),(213,31,25),(214,31,27),(215,31,16),(216,31,15),(217,31,8),(218,31,45),(219,31,52),(220,31,57),(221,32,1),(222,32,2),(223,32,3),(224,32,9),(225,32,6),(226,32,11),(227,32,31),(228,32,26),(229,32,17),(230,32,20),(231,32,23),(232,32,16),(233,32,15),(234,32,55),(235,32,57),(236,32,54),(237,32,35),(238,32,32),(239,33,1),(240,33,2),(241,33,3),(242,33,4),(243,33,5),(244,33,6),(245,33,9),(246,33,16),(247,33,15),(248,33,17),(249,33,25),(250,33,27),(251,33,32),(252,33,41),(253,33,42),(254,33,46),(255,33,47),(256,33,45),(257,33,54),(258,33,55),(259,33,48),(283,36,1),(284,36,3),(285,36,15),(286,36,16),(287,36,17),(288,36,25),(289,36,26),(290,36,27),(291,36,44),(292,36,46),(596,35,1),(597,35,2),(598,35,15),(599,35,16),(600,35,24),(601,35,27),(602,35,46),(603,35,55),(956,34,9),(957,34,9),(958,34,1),(959,34,3),(960,34,5),(961,34,2),(962,34,39),(963,34,41),(964,34,40),(965,34,42),(966,37,1),(967,37,11),(968,37,17),(969,37,33),(970,37,39),(971,37,48),(972,37,52),(973,37,56),(974,37,57),(975,37,55);
/*!40000 ALTER TABLE `hotel_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoteles`
--

DROP TABLE IF EXISTS `hoteles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoteles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_user` bigint DEFAULT NULL,
  `location_id` bigint DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `groupName` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `segundoTelefono` varchar(20) DEFAULT NULL,
  `descripcion` text,
  `type` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_cliente_id` (`id_user`),
  KEY `fk_ubicacion_id` (`location_id`),
  CONSTRAINT `fk_cliente_id` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_ubicacion_id` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoteles`
--

LOCK TABLES `hoteles` WRITE;
/*!40000 ALTER TABLE `hoteles` DISABLE KEYS */;
INSERT INTO `hoteles` VALUES (28,18,26,'Lago azul','Grupo de hoteleros Rubiales','3105521338','3105521331','Hotel Los Lago Azul es un oasis de tranquilidad y confort, ubicado junto a un lago de aguas cristalinas. Sus modernas instalaciones y acogedoras habitaciones invitan a disfrutar de una experiencia única, perfecta para familias, parejas y viajeros que buscan relajarse en plena naturaleza. Disfruta de su exquisita gastronomía y actividades al aire libre en un entorno paradisíaco.','hotel','programorphosis@gmail.com'),(29,18,27,'Las maracas','','3345521338','3134561338','Hotel Las Maracas te invita a descubrir un refugio de paz y confort en plena naturaleza. Con un entorno vibrante, modernas instalaciones y habitaciones acogedoras, es el lugar perfecto para escapar, disfrutar de actividades al aire libre y deleitarse con la gastronomía local. Una experiencia única para familias y parejas en un ambiente relajado y lleno de encanto.','hotel','lasmaracas@gmail.com'),(30,18,28,'Cesar Palace','','3156789043','','Cesarpalace es el destino ideal para quienes buscan lujo y confort. Con una arquitectura impresionante y detalles elegantes, este hotel ofrece habitaciones espaciosas y servicios de primera calidad. Relájate en un ambiente sofisticado, disfruta de una exquisita gastronomía y vive una experiencia inolvidable en un entorno exclusivo lleno de encanto.','hotel','cesarpalace@hotmail.com'),(31,16,29,'Terraza Royale','grupo de hoteleros rubiales','3345214338','4523535434','Terraza Royale es un oasis de elegancia y confort. Su arquitectura moderna se fusiona con espacios cuidadosamente diseñados para la relajación y el bienestar. Disfruta de habitaciones exquisitamente decoradas, áreas exclusivas y un servicio impecable que te harán vivir una experiencia inolvidable en el corazón de la ciudad.','hotel','trr@gmail.com'),(32,16,30,'El Desnucadero','','332345678','3213456798','El Desnucadero es un motel atrevido y moderno, ideal para quienes buscan experiencias únicas. Con ambientes íntimos y habitaciones cuidadosamente decoradas, ofrece el confort y la discreción que necesitas para una escapada inolvidable. Cada detalle está pensado para brindar un servicio personalizado en un entorno provocativo y seguro.','motel','eldescnucadero@gmail.com'),(33,16,31,' Luna','irc ltda','3456237676','6665443','Hotel Luna es un refugio de serenidad y estilo. Ubicado en un entorno encantador, ofrece habitaciones elegantes y un servicio atento que invitan a descansar y recargar energías. Ideal para parejas y viajeros que buscan una experiencia de confort y modernidad, Hotel Luna combina la calidez de su ambiente con instalaciones de primera calidad para hacer de cada estancia un momento inolvidable.','hotel','hotal_luna@gmail.com'),(34,19,32,'El viajero','','3456789876','3213456565','Hotel El Viajero es un refugio de elegancia y confort en el corazón de la ciudad, diseñado para satisfacer a los viajeros más exigentes. Con una fusión armoniosa de modernidad y tradición, sus espacios invitan al descanso y a la inspiración. Las amplias habitaciones, decoradas con estilo y equipadas con tecnología de punta, ofrecen vistas únicas. Además sus jardines, terraza y restaurante deleitan con sabores locales e internacionales, garantizando una experiencia inolvidable en cada rincón.','hotel','elviajerohotel@hotmail.com'),(35,19,33,'Las palmas','','3215435454','3211212121','Hotel Las Palams es un oasis urbano que redefine el arte del hospedaje. Ubicado en una zona estratégica, su diseño vanguardista y sofisticado se fusiona con detalles de inspiración local, creando ambientes cálidos y únicos. Cada habitación, decorada con esmero, ofrece confort absoluto y vistas panorámicas. Con un restaurante de cocina fusión y áreas de relax, Las Palams garantiza una experiencia inolvidable para quienes buscan modernidad, elegancia y un servicio personalizado.','hotel','laspalmas@gmail.com'),(36,19,34,'Los clavados','','3105521338','','Motel El Clavadero – Un lugar discreto y acogedor donde la pasión y la comodidad se encuentran. Nuestras habitaciones están diseñadas para brindar una experiencia única, con ambientes privados, jacuzzi, luces tenues y todo lo necesario para hacer de tu estancia un momento inolvidable. Ubicado en un punto estratégico para mayor privacidad, ofrecemos servicio de habitaciones, ambientación romántica y opciones especiales para cada ocasión. ¡Déjate llevar y vive la experiencia en El Clavadero! ??','motel','g29@gmail.com'),(37,16,35,'campamento x','','3105521338','','gedgfdsgfdgdfg','campamento','g@hotmail.com');
/*!40000 ALTER TABLE `hoteles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes_clientes`
--

DROP TABLE IF EXISTS `imagenes_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes_clientes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_user` bigint NOT NULL,
  `name` text NOT NULL,
  `url` text NOT NULL,
  `originalName` text NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`id_user`),
  UNIQUE KEY `id_user_UNIQUE` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes_clientes`
--

LOCK TABLES `imagenes_clientes` WRITE;
/*!40000 ALTER TABLE `imagenes_clientes` DISABLE KEYS */;
INSERT INTO `imagenes_clientes` VALUES (1,16,'usimg16_791588db-6f59-44b8-ae50-37be61f333ac.jpg','https://d3n2qe9d3gjl02.cloudfront.net/usimg16_791588db-6f59-44b8-ae50-37be61f333ac.jpg','portrait-322470_1280.jpg','image/jpeg'),(14,18,'usimg18_38c2eac6-ff7d-4b95-a2fa-e40762a0298a.jpg','https://d3n2qe9d3gjl02.cloudfront.net/usimg18_38c2eac6-ff7d-4b95-a2fa-e40762a0298a.jpg','stock-photo-woman-ordered-breakfast-in-1hotel-room-eating-food-on-balcony-wearing-robe-enjoying-winter-mountains-2568082415.jpg','image/jpeg'),(17,19,'usimg19_9146899c-67f6-4994-b4f6-9dc5ee84ee67.jpg','https://d3n2qe9d3gjl02.cloudfront.net/usimg19_9146899c-67f6-4994-b4f6-9dc5ee84ee67.jpg','portrait-3098319_1280.jpg','image/jpeg');
/*!40000 ALTER TABLE `imagenes_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes_hoteles`
--

DROP TABLE IF EXISTS `imagenes_hoteles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes_hoteles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hotel_id` bigint DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `url` text NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `originalname` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_imagenes_hotel` (`hotel_id`),
  CONSTRAINT `fk_imagenes_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hoteles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes_hoteles`
--

LOCK TABLES `imagenes_hoteles` WRITE;
/*!40000 ALTER TABLE `imagenes_hoteles` DISABLE KEYS */;
INSERT INTO `imagenes_hoteles` VALUES (179,28,'5126f769-f3b4-4c26-8126-f9fb985db727.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_5126f769-f3b4-4c26-8126-f9fb985db727.jpg','image/jpeg','81421060.jpg'),(180,28,'60147bed-c3d7-4b75-a3db-7be12f184e41.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_60147bed-c3d7-4b75-a3db-7be12f184e41.jpg','image/jpeg','81055716.jpg'),(181,28,'0615e97e-9294-49f0-83ce-18546018aacf.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_0615e97e-9294-49f0-83ce-18546018aacf.jpg','image/jpeg','432924997.jpg'),(182,28,'b05a6db1-d72a-4bf8-b2d2-d2810c741cfa.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_b05a6db1-d72a-4bf8-b2d2-d2810c741cfa.jpg','image/jpeg','538626533.jpg'),(183,28,'9ad4aa0c-4d25-4908-9ed4-7fb51ed8cf89.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_9ad4aa0c-4d25-4908-9ed4-7fb51ed8cf89.jpg','image/jpeg','81055721.jpg'),(184,28,'514bdcb4-1e89-4772-a461-474b5ea38eff.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_514bdcb4-1e89-4772-a461-474b5ea38eff.jpg','image/jpeg','1stock-photo-helping-the-visitor-woman-is-at-reception-of-the-modern-hotel-2538062873.jpg'),(185,28,'72e4bae0-671f-4572-b8b9-9aca88bc83b5.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_72e4bae0-671f-4572-b8b9-9aca88bc83b5.jpg','image/jpeg','bathroom-1336164_1280.jpg'),(186,28,'1ab562eb-d3b7-4d6f-b58d-d8a71f7b0bd7.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_1ab562eb-d3b7-4d6f-b58d-d8a71f7b0bd7.jpg','image/jpeg','alcoholic-beverages-1845295_960_720.jpg'),(187,28,'2b90760c-951b-4018-a4bf-a32bda705629.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_2b90760c-951b-4018-a4bf-a32bda705629.jpg','image/jpeg','1stock-photo-eilat-israel-october-the-facade-of-tamarind-hotel-facing-tourist-embankment-in-rays-of-2552787121.jpg'),(188,28,'d5948c06-dd05-4380-95d4-b4f4e1bf48c4.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl28_d5948c06-dd05-4380-95d4-b4f4e1bf48c4.jpg','image/jpeg','170209131056-qasr-pool.jpg'),(189,29,'91ec4377-f980-48a4-b7b3-68b2e06ef1de.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_91ec4377-f980-48a4-b7b3-68b2e06ef1de.jpg','image/jpeg','bulgaria-2098435_960_720.jpg'),(190,29,'141d5e51-4fd6-49d0-81e7-5106dbd52dea.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_141d5e51-4fd6-49d0-81e7-5106dbd52dea.jpg','image/jpeg','bulgaria-2098431_960_720.jpg'),(191,29,'e6c81358-37de-45ce-8409-971850869fbe.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_e6c81358-37de-45ce-8409-971850869fbe.jpg','image/jpeg','bedroom-6686061_960_720.jpg'),(192,29,'5f164890-eec7-474d-8ef2-6a0faad4989c.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_5f164890-eec7-474d-8ef2-6a0faad4989c.jpg','image/jpeg','architecture-835902_960_720.jpg'),(193,29,'2798db43-b06c-4b33-bd0d-c4a28e2c1204.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_2798db43-b06c-4b33-bd0d-c4a28e2c1204.jpg','image/jpeg','bedroom-3475656_1280.jpg'),(194,29,'af0c465f-3d9a-4f62-898d-b8c11be38c4d.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_af0c465f-3d9a-4f62-898d-b8c11be38c4d.jpg','image/jpeg','cafe-2081857_960_720.jpg'),(195,29,'45fb4ef4-4572-4d7b-8060-411d11825a2f.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_45fb4ef4-4572-4d7b-8060-411d11825a2f.jpg','image/jpeg','cafe-1869656_960_720.jpg'),(196,29,'8d0f7980-4102-4036-a46f-c8ab6acc08ce.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_8d0f7980-4102-4036-a46f-c8ab6acc08ce.jpg','image/jpeg','bathroom-1336167_960_720.jpg'),(197,29,'0d5875c1-765b-4a24-b2de-6e582fca4ed6.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_0d5875c1-765b-4a24-b2de-6e582fca4ed6.jpg','image/jpeg','bedroom-389254_1280.jpg'),(198,29,'9d4c3a0c-6e66-4eb9-ae3f-fb593dd43bad.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl29_9d4c3a0c-6e66-4eb9-ae3f-fb593dd43bad.jpg','image/jpeg','1stock-photo-woman-s-hand-holda-plate-of-instant-buckwheat-with-a-mountain-as-a-backdrop-the-concept-of-1028923954.jpg'),(199,30,'3da721b3-ff36-44f7-8e00-1f55a9dc8df2.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_3da721b3-ff36-44f7-8e00-1f55a9dc8df2.jpg','image/jpeg','Gran_Hotel_Villavicencio_1.jpg'),(200,30,'2590ddbf-3aee-4cbf-b713-687471a22e9a.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_2590ddbf-3aee-4cbf-b713-687471a22e9a.jpg','image/jpeg','bathroom-2094682_960_720.jpg'),(201,30,'8fb8e167-6f2f-48db-a2d5-c48c91134b7b.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_8fb8e167-6f2f-48db-a2d5-c48c91134b7b.jpg','image/jpeg','girl-2583442_960_720.jpg'),(202,30,'d273a3df-ecab-4487-a6c5-a8494b367b28.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_d273a3df-ecab-4487-a6c5-a8494b367b28.jpg','image/jpeg','coffee-819362_960_720.jpg'),(203,30,'9f740e1c-e0c8-4ce0-ad4d-15f799d008bd.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_9f740e1c-e0c8-4ce0-ad4d-15f799d008bd.jpg','image/jpeg','food-5981232_960_720.jpg'),(204,30,'258ff1d3-df7a-4c43-ab0a-629b0d8662c0.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_258ff1d3-df7a-4c43-ab0a-629b0d8662c0.jpg','image/jpeg','breakfast-1835478_960_720.jpg'),(205,30,'5d9a871d-ac77-4cfb-a97d-f606ce27920a.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_5d9a871d-ac77-4cfb-a97d-f606ce27920a.jpg','image/jpeg','bedroom-window-1434067_960_720.jpg'),(206,30,'c35dbcac-8c24-4868-b81a-8e8142d98fdd.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_c35dbcac-8c24-4868-b81a-8e8142d98fdd.jpg','image/jpeg','bathroom-490781_960_720.jpg'),(207,30,'dd9e5601-8061-4a80-9762-a00c7277d593.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_dd9e5601-8061-4a80-9762-a00c7277d593.jpg','image/jpeg','bedroom-5664221_1280.jpg'),(208,30,'840ea7fe-782b-4549-a5b4-6bed6a6dd582.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl30_840ea7fe-782b-4549-a5b4-6bed6a6dd582.jpg','image/jpeg','home-2609600_1280.jpg'),(209,31,'974321e5-e7b6-43d6-878b-6f43fbd9b62e.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl31_974321e5-e7b6-43d6-878b-6f43fbd9b62e.jpg','image/jpeg','bathroom-2094733_960_720.jpg'),(210,31,'04f7a80e-fee0-445e-99d0-4050b5cfab38.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl31_04f7a80e-fee0-445e-99d0-4050b5cfab38.jpg','image/jpeg','computer-3596169_960_720.jpg'),(211,31,'153b048f-cc1f-4132-b087-a13a65b9d312.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl31_153b048f-cc1f-4132-b087-a13a65b9d312.jpg','image/jpeg','coffee-5037800_960_720.jpg'),(212,31,'9f6545bd-67d3-45c9-b722-270a79b39971.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl31_9f6545bd-67d3-45c9-b722-270a79b39971.jpg','image/jpeg','home-2609600_1280.jpg'),(213,31,'ccf2d1ab-84a4-4a84-95b0-8f9b97db3224.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl31_ccf2d1ab-84a4-4a84-95b0-8f9b97db3224.jpg','image/jpeg','bathroom-3563272_960_720.jpg'),(214,31,'42b66262-0af3-4c80-89d1-1707eeb88bcd.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl31_42b66262-0af3-4c80-89d1-1707eeb88bcd.jpg','image/jpeg','electric-scooter-4983759_960_720.jpg'),(215,31,'a74e7d47-b267-4f31-b6d1-59c024a271f5.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl31_a74e7d47-b267-4f31-b6d1-59c024a271f5.jpg','image/jpeg','coffee-5495609_1280.jpg'),(216,31,'2bbb689a-7832-44b9-b0d7-e2bc13a7d173.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl31_2bbb689a-7832-44b9-b0d7-e2bc13a7d173.jpg','image/jpeg','coffee-819362_960_720.jpg'),(217,31,'463ef98a-f97f-44cc-9fed-da0d0dfb9f14.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl31_463ef98a-f97f-44cc-9fed-da0d0dfb9f14.jpg','image/jpeg','istockphoto-1356475606-2048x2048.jpg'),(218,32,'806c50c7-6fbd-4472-b7c6-77a70a1319d0.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_806c50c7-6fbd-4472-b7c6-77a70a1319d0.jpg','image/jpeg','mariel-hotel-apartments.jpg'),(219,32,'7fd6097b-c1f3-457d-a276-3c24a248ae34.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_7fd6097b-c1f3-457d-a276-3c24a248ae34.jpg','image/jpeg','restaurant-1360674_960_720.jpg'),(220,32,'509f6897-e004-4bb7-8d15-8c3b7d786095.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_509f6897-e004-4bb7-8d15-8c3b7d786095.jpg','image/jpeg','bathroom-6686057_960_720.jpg'),(221,32,'e33d8543-baa4-4356-b4e8-8d8d01457c26.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_e33d8543-baa4-4356-b4e8-8d8d01457c26.jpg','image/jpeg','parking-4061323_960_720.jpg'),(222,32,'ed83eca1-2094-45cb-a78c-3ff7a5758dd2.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_ed83eca1-2094-45cb-a78c-3ff7a5758dd2.jpg','image/jpeg','living-room-2155376_1280.jpg'),(223,32,'1cd8a05d-f5c5-4d9b-880d-8f4a700b0714.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_1cd8a05d-f5c5-4d9b-880d-8f4a700b0714.jpg','image/jpeg','bathroom-1336164_1280.jpg'),(224,32,'5b969913-edc6-4eb0-998f-4a6e20b4cb12.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_5b969913-edc6-4eb0-998f-4a6e20b4cb12.jpg','image/jpeg','lake-954119_960_720.jpg'),(225,32,'98ed4be7-acd4-4e6b-be53-ae1c2ca6befd.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_98ed4be7-acd4-4e6b-be53-ae1c2ca6befd.jpg','image/jpeg','Mariel-Hotel-Boutique-Lima-Exterior.jpg'),(226,32,'487ac99a-bba3-4cae-9ea4-172c66530bb5.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_487ac99a-bba3-4cae-9ea4-172c66530bb5.jpg','image/jpeg','living-room-8477521_1280.jpg'),(227,32,'162519b0-ab8e-4742-ad41-ab61cfd6afd0.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl32_162519b0-ab8e-4742-ad41-ab61cfd6afd0.jpg','image/jpeg','istockphoto-2183861914-2048x2048.jpg'),(228,33,'750f107e-8aa2-403a-ab85-8619ad3e9025.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_750f107e-8aa2-403a-ab85-8619ad3e9025.jpg','image/jpeg','woman-6803845_960_720.jpg'),(229,33,'235e0021-0d7b-4d17-8453-be05ff61e5f3.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_235e0021-0d7b-4d17-8453-be05ff61e5f3.jpg','image/jpeg','wc-265278_1280.jpg'),(230,33,'b3dc7c78-23da-4ea1-9ed6-36a579dd7a24.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_b3dc7c78-23da-4ea1-9ed6-36a579dd7a24.jpg','image/jpeg','wc-265275_960_720.jpg'),(231,33,'d4c9dda5-44fa-495c-8fda-c8cea5618d51.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_d4c9dda5-44fa-495c-8fda-c8cea5618d51.jpg','image/jpeg','woman-5631257_960_720.jpg'),(232,33,'025c4d82-bff0-4ca4-a1b1-9fcea161c7c8.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_025c4d82-bff0-4ca4-a1b1-9fcea161c7c8.jpg','image/jpeg','wc-111092_960_720.jpg'),(233,33,'d7017d63-b02a-4cbf-9fc6-5771660d10a2.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_d7017d63-b02a-4cbf-9fc6-5771660d10a2.jpg','image/jpeg','sweden-4309297_960_720.jpg'),(234,33,'82065fea-3c44-476f-a952-a7ac16507925.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_82065fea-3c44-476f-a952-a7ac16507925.jpg','image/jpeg','bathroom-1336167_960_720.jpg'),(235,33,'e736fd03-8870-4b95-9f14-4b9a04051f3e.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_e736fd03-8870-4b95-9f14-4b9a04051f3e.jpg','image/jpeg','scooter-7396608_960_720.jpg'),(236,33,'c527896b-f6d0-44e6-9117-be6a2028fdd1.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_c527896b-f6d0-44e6-9117-be6a2028fdd1.jpg','image/jpeg','bathroom-6686057_960_720.jpg'),(237,33,'1eb2afdf-a6e8-45fd-b917-7d45094d6fe8.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl33_1eb2afdf-a6e8-45fd-b917-7d45094d6fe8.jpg','image/jpeg','restaurant-4104585_960_720.jpg'),(239,34,'9121b996-0c41-47a7-bda0-e7a9d520a5c8.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl34_9121b996-0c41-47a7-bda0-e7a9d520a5c8.jpg','image/jpeg','wc-111092_960_720.jpg'),(240,34,'f637c8c1-2df4-4dd1-b898-bc96bec378c4.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl34_f637c8c1-2df4-4dd1-b898-bc96bec378c4.jpg','image/jpeg','woman-5631257_960_720.jpg'),(241,34,'d9f883cf-fc59-430c-a59f-6d30378dc565.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl34_d9f883cf-fc59-430c-a59f-6d30378dc565.jpg','image/jpeg','wc-265275_960_720.jpg'),(242,34,'4b8b1177-bbc9-42dd-8eb4-b3bbf46d42d5.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl34_4b8b1177-bbc9-42dd-8eb4-b3bbf46d42d5.jpg','image/jpeg','restaurant-2344914_960_720.jpg'),(243,34,'29ad6616-4007-4ffb-8b46-81014eff5f9e.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl34_29ad6616-4007-4ffb-8b46-81014eff5f9e.jpg','image/jpeg','sweden-4309297_960_720.jpg'),(244,34,'b74e20c2-e0df-43f8-820c-0dd7ce57f595.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl34_b74e20c2-e0df-43f8-820c-0dd7ce57f595.jpg','image/jpeg','wc-265278_1280.jpg'),(245,34,'97c88429-fbf1-49f8-93db-814c4b09bda4.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl34_97c88429-fbf1-49f8-93db-814c4b09bda4.jpg','image/jpeg','scooter-7396608_960_720.jpg'),(246,34,'087cb1a9-2138-466c-a386-dd81761a143b.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl34_087cb1a9-2138-466c-a386-dd81761a143b.jpg','image/jpeg','stock-photo-woman-ordered-breakfast-in-1hotel-room-eating-food-on-balcony-wearing-robe-enjoying-winter-mountains-2568082415.jpg'),(247,34,'995e12f7-ee9a-4e6f-8984-4d221644a55c.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl34_995e12f7-ee9a-4e6f-8984-4d221644a55c.jpg','image/jpeg','restaurant-4104585_960_720.jpg'),(248,35,'40864a78-ca51-4b10-9f45-c82353e94ea4.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_40864a78-ca51-4b10-9f45-c82353e94ea4.jpg','image/jpeg','432924997.jpg'),(249,35,'a6be676a-f38a-44d4-9300-28b0dea388ea.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_a6be676a-f38a-44d4-9300-28b0dea388ea.jpg','image/jpeg','hotel-1330854_960_720.jpg'),(250,35,'bbb46647-bf0c-4230-98d2-b7cae27a95ac.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_bbb46647-bf0c-4230-98d2-b7cae27a95ac.jpg','image/jpeg','girl-2583442_960_720.jpg'),(251,35,'7df0f997-a5cd-4a6e-a801-3edcfb179e5c.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_7df0f997-a5cd-4a6e-a801-3edcfb179e5c.jpg','image/jpeg','hotel-1330834_960_720.jpg'),(252,35,'158883b7-e6d6-47b9-a6f7-2d746aebc715.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_158883b7-e6d6-47b9-a6f7-2d746aebc715.jpg','image/jpeg','istockphoto-1152658696-2048x2048.jpg'),(253,35,'3805300f-a15e-4b11-8153-ceb80e3b791f.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_3805300f-a15e-4b11-8153-ceb80e3b791f.jpg','image/jpeg','cafe-1869656_960_720.jpg'),(254,35,'3477d81b-c12e-4a1c-bf1b-053a5a9180cc.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_3477d81b-c12e-4a1c-bf1b-053a5a9180cc.jpg','image/jpeg','living-room-2155376_1280.jpg'),(255,35,'30a2d30a-1672-4287-8893-c44ad05fe2a9.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_30a2d30a-1672-4287-8893-c44ad05fe2a9.jpg','image/jpeg','restaurant-4104585_960_720.jpg'),(256,35,'3b3b1b7b-f206-4f6c-b364-9a41199fbdfe.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_3b3b1b7b-f206-4f6c-b364-9a41199fbdfe.jpg','image/jpeg','scooter-7396608_960_720.jpg'),(257,35,'d6943c51-4061-4e05-bd60-2f6b5c86e462.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl35_d6943c51-4061-4e05-bd60-2f6b5c86e462.jpg','image/jpeg','Gran_Hotel_Villavicencio_1.jpg'),(258,36,'5a345e92-67a4-47e0-9b3e-d2e70e80369c.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl36_5a345e92-67a4-47e0-9b3e-d2e70e80369c.jpg','image/jpeg','scooter-7396608_960_720.jpg'),(259,36,'e823ab8d-be14-4f91-80d5-93fc3306e1af.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl36_e823ab8d-be14-4f91-80d5-93fc3306e1af.jpg','image/jpeg','wc-111092_960_720.jpg'),(260,36,'baf06526-3740-41d6-a6dc-8a17cc531f93.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl36_baf06526-3740-41d6-a6dc-8a17cc531f93.jpg','image/jpeg','sweden-4309297_960_720.jpg'),(261,36,'9a0eed2e-5510-48a5-a31c-26ee0f2e9e81.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl36_9a0eed2e-5510-48a5-a31c-26ee0f2e9e81.jpg','image/jpeg','restaurant-4104585_960_720.jpg'),(262,36,'5e9c2a02-a703-4e6f-a539-f41eac73418f.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl36_5e9c2a02-a703-4e6f-a539-f41eac73418f.jpg','image/jpeg','stock-photo-woman-ordered-breakfast-in-1hotel-room-eating-food-on-balcony-wearing-robe-enjoying-winter-mountains-2568082415.jpg'),(263,36,'43206526-e895-444a-b03f-a594eb65f24b.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl36_43206526-e895-444a-b03f-a594eb65f24b.jpg','image/jpeg','restaurant-2344914_960_720.jpg'),(264,36,'bb825ade-85f4-4a90-8dd5-99fe9e182876.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl36_bb825ade-85f4-4a90-8dd5-99fe9e182876.jpg','image/jpeg','wc-265275_960_720.jpg'),(265,37,'dfa2e8be-2cc3-441f-9dab-a68bdf7c119b.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl37_dfa2e8be-2cc3-441f-9dab-a68bdf7c119b.jpg','image/jpeg','81055716.jpg'),(266,37,'03c587f8-d9cb-459c-8414-3ba774ccc5f1.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl37_03c587f8-d9cb-459c-8414-3ba774ccc5f1.jpg','image/jpeg','81421060.jpg'),(267,37,'0db07824-cd1c-4ff9-b995-1e98a9bbf547.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl37_0db07824-cd1c-4ff9-b995-1e98a9bbf547.jpg','image/jpeg','81055721.jpg'),(268,37,'efffa4a5-f927-4db3-ab27-f3217a6af4fd.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl37_efffa4a5-f927-4db3-ab27-f3217a6af4fd.jpg','image/jpeg','1stock-photo-helping-the-visitor-woman-is-at-reception-of-the-modern-hotel-2538062873.jpg'),(269,37,'29d1608e-dfe9-41ff-ba33-94bfb65f0b6c.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl37_29d1608e-dfe9-41ff-ba33-94bfb65f0b6c.jpg','image/jpeg','1stock-photo-eilat-israel-october-the-facade-of-tamarind-hotel-facing-tourist-embankment-in-rays-of-2552787121.jpg'),(270,37,'d239cf06-0ee8-413c-a002-9193803e9380.jpg','https://d3n2qe9d3gjl02.cloudfront.net/htl37_d239cf06-0ee8-413c-a002-9193803e9380.jpg','image/jpeg','1stock-photo-woman-s-hand-holda-plate-of-instant-buckwheat-with-a-mountain-as-a-backdrop-the-concept-of-1028923954.jpg');
/*!40000 ALTER TABLE `imagenes_hoteles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hotel_id` bigint DEFAULT NULL,
  `directions` varchar(255) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `departamento` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `sector` varchar(100) DEFAULT NULL,
  `barrio` varchar(100) DEFAULT NULL,
  `indications` text,
  `lat` varchar(45) DEFAULT NULL,
  `lng` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hotel_location_idx` (`hotel_id`),
  CONSTRAINT `fk_hotel_location` FOREIGN KEY (`hotel_id`) REFERENCES `hoteles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (26,28,'calle 2 # 7-12','colombia',NULL,'puerto gaitan','el porvenir','El porvenir','Dos cuadras al sur desde el polideportivo central','3.763701226331081','-71.36285099446849'),(27,29,'calle2 #7-10','colombia',NULL,'puerto gaitan','el porvenir','El porvenir','Bajando por la cuadra de salchichon hotel del color rojo','3.763727818822174','-71.36324596890175'),(28,30,'Manzana 54 casa 24','colombia',NULL,'puerto gaitan','el porvenir','','via principal diagonal a comidas rpidas el ecuatoriano','3.7650132089479724','-71.36323816239985'),(29,31,'calle1 #6 -3','colombia',NULL,'puerto gaitan','el porvenir','','Frente al polideportivo principal','3.764038427009855','-71.36388201355228'),(30,32,'Av principal calle 2 esquina','colombia',NULL,'puerto gaitan','el porvenir','','Frente a la planta tratadora de agua','3.7650018199535347','-71.36396561789725'),(31,33,NULL,'colombia',NULL,'puerto gaitan','el porvenir','','Hotel blanco de portones dorados','3.764572122122786','-71.36268549639628'),(32,34,'calle 1 # 34 -4','colombia',NULL,'puerto gaitan','el porvenir','el porvenir','junto a taller de ebanisteria','3.7660797379123867','-71.36525908001434'),(33,35,'','colombia',NULL,'puerto gaitan','el porvenir','','Hotel de color amarillo con palmeras en frente','3.7628413265090592','-71.36359106604814'),(34,36,'Manzana 54 casa 24','colombia',NULL,'puerto gaitan','el oasis','gdfgdsfgfdsg','gsdfsgfdasgdfas','3.775490358448612','-71.65775524881914'),(35,37,'Manzana 54 casa 24','colombia',NULL,'puerto gaitan','el porvenir (caserio)','','bkjabdfwdfiu fhdsuf sfh sdhf s hfhsdf dsaf ksdaf sdfkjjhsd f hdsf','3.7640449265501','-71.36319654327886');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `token` varchar(255) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ping`
--

DROP TABLE IF EXISTS `ping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ping` (
  `id` bigint NOT NULL,
  `message` varchar(45) DEFAULT NULL,
  `number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='table to make test on conection between db and backend servers';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ping`
--

LOCK TABLES `ping` WRITE;
/*!40000 ALTER TABLE `ping` DISABLE KEYS */;
INSERT INTO `ping` VALUES (1,'pong','1232');
/*!40000 ALTER TABLE `ping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hotel_id` bigint DEFAULT NULL,
  `cliente_id` bigint DEFAULT NULL,
  `calificacion` int NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_calificacion_hotel` (`hotel_id`),
  KEY `fk_calificacion_cliente` (`cliente_id`),
  CONSTRAINT `fk_calificacion_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_calificacion_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hoteles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (16,28,19,10,'2025-04-04 05:44:34'),(17,31,16,5,'2025-04-01 01:13:31'),(18,30,16,3,'2025-04-01 02:36:02'),(19,28,16,9,'2025-04-02 08:51:24'),(20,34,16,10,'2025-04-02 12:07:28'),(21,29,16,7,'2025-04-03 01:29:29'),(22,33,19,7,'2025-04-04 06:21:33');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cliente_id` bigint DEFAULT NULL,
  `habitacion_id` bigint DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cliente` (`cliente_id`),
  KEY `fk_habitacion` (`habitacion_id`),
  CONSTRAINT `fk_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_habitacion` FOREIGN KEY (`habitacion_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_types`
--

DROP TABLE IF EXISTS `room_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `capacity` int NOT NULL,
  `room_description` varchar(100) DEFAULT NULL,
  `beds` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_types`
--

LOCK TABLES `room_types` WRITE;
/*!40000 ALTER TABLE `room_types` DISABLE KEYS */;
INSERT INTO `room_types` VALUES (1,'cama sencilla',1,'habitaciones con cama sencilla para una persona',1),(2,'cama doble',2,'habitaciones con cama doble para 1 o 2 personas',1),(3,'dos camas',2,'habitaciones con dos camas sencillas para dos personas',2),(4,'tres camas',3,'habitaciones con tres camas o camarote y cama',3),(5,'cuatro camas',4,'habitaciones con cuatro camas o dos camarotes',4),(6,'mixta',3,'habitaciones con una cama doble y una sencilla',3),(7,'doble doble',4,'habitaciones con dos camas doble',2);
/*!40000 ALTER TABLE `room_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hotel_id` bigint DEFAULT NULL,
  `type` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `available` int DEFAULT NULL,
  `discount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hotel` (`hotel_id`),
  KEY `fk_type_idx` (`type`),
  CONSTRAINT `fk_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hoteles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_type` FOREIGN KEY (`type`) REFERENCES `room_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (33,28,1,50000.00,5,5,0),(34,28,3,75000.00,10,5,NULL),(35,28,5,90000.00,10,3,NULL),(36,29,1,55000.00,5,5,10),(37,29,6,80000.00,10,2,NULL),(38,30,3,75000.00,12,12,NULL),(39,31,1,55000.00,10,10,7),(40,31,3,75000.00,10,10,NULL),(41,31,4,85000.00,10,0,NULL),(42,32,2,95000.00,12,12,NULL),(43,33,1,40000.00,12,7,50),(44,33,3,80000.00,10,4,NULL),(45,33,7,120000.00,1,1,NULL),(50,36,2,60000.00,20,20,NULL),(110,35,4,85000.00,8,1,NULL),(153,34,2,60000.00,5,5,NULL),(154,34,1,45000.00,5,0,NULL),(155,34,4,85000.00,10,5,NULL),(156,37,3,100000.00,20,6,NULL);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Recepción 24 horas','Servicios Generales'),(2,'Wi-Fi gratuito','Servicios Generales'),(3,'Parqueadero','Servicios Generales'),(4,'Servicio de habitaciones','Servicios Generales'),(5,'Consigna de equipaje','Servicios Generales'),(6,'Servicio de traslado','Servicios Generales'),(7,'Acceso para personas con movilidad reducida','Servicios Generales'),(8,'Lavanderia y tintoreria','Servicios Generales'),(9,'Caja fuerte','Servicios Generales'),(10,'Cambio de moneda','Servicios Generales'),(11,'Recepcionista','Servicios Generales'),(12,'Check-in/check-out express','Servicios Generales'),(13,'Alquiler de autos y bicicletas','Servicios Generales'),(14,'Ascensores','Servicios Generales'),(15,'Aire acondicionado/calefacción','Servicios en la Habitación'),(16,'Televisión de pantalla plana','Servicios en la Habitación'),(17,'Mini bar','Servicios en la Habitación'),(18,'Guarda ropa','Servicios en la Habitación'),(19,'Escritorio de trabajo','Servicios en la Habitación'),(20,'Ventilador/abanico','Servicios en la Habitación'),(21,'Desayuno incluido','Servicios en la Habitación'),(22,'Baño privado','Servicios en la Habitación'),(23,'Servicio de despertador','Servicios en la Habitación'),(24,'Servicio de limpieza diaria','Servicios en la Habitación'),(25,'Restaurante','Gastronomía'),(26,'Bar','Gastronomía'),(27,'Cafetería','Gastronomía'),(28,'Desayuno gratis','Gastronomía'),(29,'Servicio de catering para eventos','Gastronomía'),(30,'Menús especiales','Gastronomía'),(31,'Room service','Gastronomía'),(32,'Piscina','Ocio y Entretenimiento'),(33,'Spa y centro de bienestar','Ocio y Entretenimiento'),(34,'Gimnasio','Ocio y Entretenimiento'),(35,'Sauna y jacuzzi','Ocio y Entretenimiento'),(36,'Club infantil','Ocio y Entretenimiento'),(37,'Zona de juegos para niños','Ocio y Entretenimiento'),(38,'Actividades recreativas','Ocio y Entretenimiento'),(39,'Excursiones organizadas','Ocio y Entretenimiento'),(40,'Entretenimiento en vivo','Ocio y Entretenimiento'),(41,'Campo futbol o minifutbol','Ocio y Entretenimiento'),(42,'Consola de videojuegos','Ocio y Entretenimiento'),(43,'Salas de reuniones y conferencias','Servicios de Negocios'),(44,'Centro de negocios','Servicios de Negocios'),(45,'Impresoras y fotocopiadoras','Servicios de Negocios'),(46,'Wi-Fi de alta velocidad','Servicios de Negocios'),(47,'Equipos audiovisuales','Servicios de Negocios'),(48,'Admisión de mascotas','Servicios Especiales'),(49,'Servicios para bodas','Servicios Especiales'),(50,'Servicios de fotografía','Servicios Especiales'),(51,'Guia turistico','Servicios Especiales'),(52,'Zona de playa privada','Servicios Especiales'),(53,'Servicio de niñera','Servicios Especiales'),(54,'Tienda ','Otros Servicios'),(55,'Farmacia o botiquín disponible','Otros Servicios'),(56,'Cajero automático','Otros Servicios'),(57,'Máquinas expendedoras','Otros Servicios'),(58,'Servicio de transporte gratuito','Otros Servicios');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `middle_name` varchar(45) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `birthday` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `accessibility_needs` varchar(45) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `segundoTelefono` varchar(20) DEFAULT NULL,
  `usertype` tinyint(1) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verify` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'gerson',NULL,'murcia',NULL,NULL,NULL,'gdmp92@hotmail.com',NULL,NULL,0,'2024-12-20 19:02:48',1),(18,'daniel',NULL,'Peña',NULL,NULL,NULL,'programorphosis@gmail.com',NULL,NULL,0,'2025-03-08 15:59:41',1),(19,'ana',NULL,'miller',NULL,NULL,NULL,'gdmp29@gmail.com',NULL,NULL,0,'2025-03-08 18:59:12',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hotelesappdb'
--

--
-- Dumping routines for database 'hotelesappdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-04  4:10:03
