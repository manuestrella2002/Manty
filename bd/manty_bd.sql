CREATE DATABASE  IF NOT EXISTS `manty_bd` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `manty_bd`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: manty_bd
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `idpedido` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha_pedido` datetime NOT NULL,
  `descripcion_pedido` varchar(2000) CHARACTER SET utf8mb3 NOT NULL,
  `lugar_pedido` varchar(45) CHARACTER SET utf8mb3 NOT NULL,
  `solicitadopor_pedido` varchar(45) CHARACTER SET utf8mb3 NOT NULL,
  `area_pedido` varchar(45) CHARACTER SET utf8mb3 DEFAULT NULL,
  `estado_pedido` varchar(45) CHARACTER SET utf8mb3 DEFAULT NULL,
  PRIMARY KEY (`idpedido`),
  UNIQUE KEY `idpedido_UNIQUE` (`idpedido`)
) ENGINE=InnoDB AUTO_INCREMENT=5005 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2025-03-01 09:00:00','Pedido de mantenimiento en la oficina principal','Oficina 1','Juan Pérez','Mantenimiento','Cerrado'),(2,'2025-03-02 10:30:00','Pedido para reparación de equipo electrónico','Oficina 2','Ana Gómez','Electromedicina','Abierto'),(3,'2025-03-03 14:00:00','Pedido de instalación de nuevos equipos','Oficina 3','Carlos Fernández','Instalaciones','Abierto'),(5000,'2025-03-04 00:00:00','Bacha pierde','Enfermeria','Ana Maria','Plomería','Abierto'),(5001,'2025-03-04 00:00:00','Inodoro pierde','Enfermeria','Ana Maria','Plomería','Abierto'),(5002,'2025-03-04 00:00:00','Cambio de tubo','Dermatologia','Ana Marina','Electricidad','Abierto'),(5003,'2025-03-04 00:00:00','Aire acondicionado pierde tierra','Enfermeria','Ana Maria','Aire acondicionado','Abierto'),(5004,'2025-03-04 11:42:43','Teja suelta en techo pabellón costa.','2do Modelo','Ana Maria','Albañilería','Abierto');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'manty_bd'
--

--
-- Dumping routines for database 'manty_bd'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-07 10:51:29
