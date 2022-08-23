-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: Scheduler
-- ------------------------------------------------------
-- Server version	5.7.35

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
-- Current Database: `Scheduler`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Scheduler` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `Scheduler`;

--
-- Table structure for table `job_pipeline`
--

DROP TABLE IF EXISTS `job_pipeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_pipeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `converter_interface_name` varchar(100) DEFAULT NULL,
  `converter_service_name` varchar(100) DEFAULT NULL,
  `sch_expression` varchar(45) DEFAULT NULL,
  `job_info` longblob,
  `createdOn` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_pipeline`
--

LOCK TABLES `job_pipeline` WRITE;
/*!40000 ALTER TABLE `job_pipeline` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_pipeline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `sessions`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sessions` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `sessions`;

--
-- Table structure for table `JettySessions`
--

DROP TABLE IF EXISTS `JettySessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JettySessions` (
  `sessionId` varchar(120) NOT NULL,
  `contextPath` varchar(60) NOT NULL,
  `virtualHost` varchar(60) NOT NULL,
  `lastNode` varchar(60) DEFAULT NULL,
  `accessTime` bigint(20) DEFAULT NULL,
  `lastAccessTime` bigint(20) DEFAULT NULL,
  `createTime` bigint(20) DEFAULT NULL,
  `cookieTime` bigint(20) DEFAULT NULL,
  `lastSavedTime` bigint(20) DEFAULT NULL,
  `expiryTime` bigint(20) DEFAULT NULL,
  `maxInterval` bigint(20) DEFAULT NULL,
  `map` blob,
  PRIMARY KEY (`sessionId`,`contextPath`,`virtualHost`),
  KEY `idx_JettySessions_expiry` (`expiryTime`),
  KEY `idx_JettySessions_session` (`sessionId`,`contextPath`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JettySessions`
--

LOCK TABLES `JettySessions` WRITE;
/*!40000 ALTER TABLE `JettySessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `JettySessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-21 17:16:17
