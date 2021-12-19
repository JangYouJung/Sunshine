-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: sunshine
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(8) NOT NULL,
  `course_id` int NOT NULL,
  `degree` int NOT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `fk_student_id` (`student_id`),
  KEY `course_id` (`course_id`,`degree`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`course_id`, `degree`) REFERENCES `attendance_info` (`course_id`, `degree`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (74,'20161212',1,2),(75,'20211515',1,2),(76,'20181004',1,2),(77,'20191062',1,2),(78,'20171313',1,2),(80,'20181004',1,1),(81,'20191062',1,1),(83,'20150101',1,1),(84,'20211515',1,1),(85,'20161212',1,1),(86,'20210002',1,1),(87,'20210001',1,1),(88,'20201414',1,1),(89,'20171313',1,1),(90,'20210003',1,1);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance_info`
--

DROP TABLE IF EXISTS `attendance_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_info` (
  `course_id` int NOT NULL,
  `degree` int NOT NULL,
  `attendance_personnel` int NOT NULL DEFAULT '0',
  `attendance_num` int NOT NULL,
  `attendance_date` date NOT NULL,
  `attendance_time` time NOT NULL,
  `att_valid` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`course_id`,`degree`),
  CONSTRAINT `fk_course_id1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `attendance_info_chk_1` CHECK ((length(`attendance_num`) = 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_info`
--

LOCK TABLES `attendance_info` WRITE;
/*!40000 ALTER TABLE `attendance_info` DISABLE KEYS */;
INSERT INTO `attendance_info` VALUES (1,1,10,12345,'2021-12-13','11:09:08',0),(1,2,5,68810,'2021-12-13','11:10:37',0),(1,3,1,19630,'2021-12-19','20:14:17',0);
/*!40000 ALTER TABLE `attendance_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(20) NOT NULL,
  `course_num` int NOT NULL,
  `course_date` date NOT NULL,
  `survey_date` date DEFAULT NULL,
  `att_valid` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`course_id`),
  CONSTRAINT `course_chk_1` CHECK ((`course_num` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'취업특강-그래픽디자인',80,'2021-12-13','2021-12-19',0),(2,'취업특강-마케팅',80,'2021-12-09','2021-12-14',0),(3,'자소서 skill - 3회차',50,'2021-11-10','2021-11-15',0),(4,'자소서 skill - 4회차',50,'2022-01-06','2022-01-11',0),(5,'그룹학습컨설팅-행동탐구이상형',20,'2021-12-21','2021-12-26',0),(6,'그룹학습컨설팅-규범탐구이상형',20,'2021-12-21','2021-12-26',0),(7,'SW강화교육-겨울방학',35,'2022-01-03','2022-01-10',0),(8,'프랙탈작품만들기',20,'2021-12-21','2021-12-26',0);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `management`
--

DROP TABLE IF EXISTS `management`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management` (
  `course_id` int NOT NULL,
  `staff_id` varchar(20) NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `fk_staff_id` (`staff_id`),
  CONSTRAINT `fk_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `management`
--

LOCK TABLES `management` WRITE;
/*!40000 ALTER TABLE `management` DISABLE KEYS */;
INSERT INTO `management` VALUES (1,'11111111'),(2,'11111111'),(3,'11111111'),(7,'11111111'),(4,'22222222'),(5,'22222222'),(6,'22222222'),(8,'22222222');
/*!40000 ALTER TABLE `management` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('-lHhWNdU2GaN31RaJP_4IMqSl0EF3LzM',1639973369,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T04:09:28.604Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('-yozkTfjK-3K2Dj3e2W5DuWfmxsYJrtW',1639930373,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T16:12:53.153Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('03tMHMiZ4Ub5s6ec7vfLLSJ0kgvYHqW_',1640003916,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T12:38:36.228Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('0dvJsWQZ2gs7z1u5DL27aqUAEiUd1DjS',1640004652,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T12:50:52.227Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('2tzGj6HwMEmABOSW7T3RFbIcnJzbPvX5',1639952796,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T22:26:35.973Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('33KW5oU6TE97_FpvbWpuOAJ94-TGDaDi',1639976174,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T04:56:13.987Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('3HO_02SyXnPMBgU-FK8KRhS6V10RLUKn',1639955185,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:24.961Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('4eQZuKc2XGHA0MVWIoK4uWOE9nAeOEck',1639965992,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T02:06:31.716Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('4i5wF4XIMhGNISywSxTSBGZXOhJ7k2Sg',1639956119,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:21:59.063Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('4jnaB-cPNCiChsC_cFJ7naIu2dPsfJK-',1639955188,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:28.194Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('5zOpBMw3JIgGO3x9hjntIlyEsA0SyxpL',1639957967,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:52:46.884Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('6_zU6R2kf1pqrX6cSwoqqXdagaypYJjn',1639949356,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T21:29:15.683Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('7LOfqDgorJj7gyPtSiKcGVsIfpIaGMJ-',1639930196,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T16:09:55.844Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('7bZZsYFipW6uhe_tcwUlduRj1fKLE391',1639971470,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T03:37:50.145Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('8wyzSJtzFYUwWp8KJ1-SRn5FOjS52EZ-',1639958027,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:53:47.499Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('8yTPtSuNSwRLHneWFOAvYbOmGDgW0-NC',1639957841,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:50:40.835Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('9jus87IYp9eFvfBcFV8ZCJiZso-U7kUc',1639928807,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T15:46:46.963Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('AppSqymSd0vzaZucpAzLUDaxjeoA1TMq',1639955183,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:22.801Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('BWGbJWgcyECQQA9YJDAwxDXBXd-23x_4',1639955189,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:29.271Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('BoXYyPmgIXqSaiEblAImVxOz_0PLQRoJ',1639957967,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:52:47.451Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('C9ed-wVZJOWg2TihDlCIB2ghd3AIq2LQ',1639954763,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T22:59:22.781Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('CT9b85enYFXheRR0XAlA9py_0TFtZtW0',1639965991,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T02:06:31.158Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('CqthDyCKz0rsKvSAWkPTsDF7mZHvDItz',1639974237,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T04:23:57.038Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('DuivkU2SD5_Oar09p6wpy9tntBJb9hGK',1639954763,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T22:59:22.558Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('ESPzdIxCvZtGeJlEAlNOZYHaRu_8OLez',1639954757,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T22:59:17.390Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('FIcoS6Rm8NDgOBQcvTuN6WhqclmbXsAh',1639954763,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T22:59:23.050Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('G1Ery4EDIk75ppp-tf6TBUkPC-zjENtW',1639923349,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T14:15:49.002Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('HtxpO3VR95Oo3xQxSKA9GAaYUHbyLNVl',1639938582,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T18:29:41.697Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('It8PZVhxjuASDt3zfN-v5piR0hKspGRj',1639955178,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:17.777Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('J1LjmPJQ9Xiy2WDvEbNgikmRLMTp9gbG',1639955182,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:22.260Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('JlsQkf9OCcVGswDP_LjwuX55PEH7-gMG',1639948630,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T21:16:12.327Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('K-NX6ymfH2R1LiUqEVn6J4irt3YN1SV_',1639951615,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T22:06:54.898Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('KHaxG9OYGFpKpABn8WTGQwudLBJXQPMi',1639967870,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T02:37:50.213Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('KN0EDPwamEKx10PRHEFJXM3gMj6KtjCt',1639923349,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T14:15:48.675Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('MZk7ErYO5HlJYBuuOxd8h1uT_CYZbDmd',1640004707,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T12:20:34.799Z\",\"httpOnly\":true,\"path\":\"/\"},\"uid\":\"20193333\",\"isLogined\":true,\"isStudent\":true}'),('N03v_39Kj5nEzcNsu1GQavK3sdtYlysX',1639935448,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T17:37:27.707Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('Nbwir-VARwo4elq52DvacAFTcsnNlO6O',1639920956,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T13:35:55.711Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('OScJfemH-NFq5bvX3x3LVzf9Dg1s7yXy',1639931870,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T16:37:50.224Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('P0VI-K_1QFzsjO8eepaU0qY6TP4Qj8NO',1639976174,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T04:56:13.829Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('QN_BgyBNNsWSz8KYYg4PtpjGlNptNSQC',1639962896,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T01:14:55.524Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('R9W83_WPy8VH1OfALKI9thPMQ9nvU4cx',1639935529,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T16:40:11.232Z\",\"httpOnly\":true,\"path\":\"/\"},\"uid\":\"11111111\",\"isLogined\":true,\"isStudent\":false}'),('Syax0_M7aUCZBTiCHqj-XdKibRwcWKXA',1639931870,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T16:37:49.557Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('TW3K2fqF8HisCdADcj5Iu2Horgs6XzO_',1639955184,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:24.418Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('UFVAeREL5JCqtn3n4R-Q0yHzSbmeN2Tr',1639955183,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:23.337Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('UQr83BhMIpmRKqQkaBiQa6tmvhCiLQc9',1640001011,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T11:50:10.648Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('Ujz9Yeutl8Pf1QgGr-6WeD9JkMzyHC8Q',1639955187,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:26.582Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('VNhhUczyjPFXAqWhWKD3JNmK5vzZZLI2',1639952427,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T22:20:26.759Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('VeJAbWThMbGKDv3uNlR98csIlVo4n18Y',1639955184,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:23.877Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('X24qE6GZPR12L_ymguL5dIVZHvcxLgv8',1639961180,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T00:46:20.123Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('YGT59Nw8vPe1gEUrm0Fi7xAJiSX6SKYA',1639931869,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T16:37:49.331Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('ZnY_AJ9VTcqIGHrdhbp9nUrxZ9vy-Dak',1639955185,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:25.499Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('bDhrph2Ml288feX6un9BwxcCvYYUQu3d',1640001867,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T12:04:27.476Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('bImgmxI0B6gtecsO2wUeBZ13RrXsszDZ',1639976124,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T04:55:23.649Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('bPtZfVZ0TK2LcqhyZkXV5uouxumUfQss',1639975594,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T04:46:34.374Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('bxVCWeCygS7sdVHXGPLuBVP_Cyi1pSCN',1639920047,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T13:20:47.106Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('cFZnHgPytwvyD4tbObLIusxHGd_tz2s1',1639947123,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T20:52:02.671Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('dAWUoztFs62ZvQFwG81j90I4rcmybcLf',1639948573,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T21:16:13.245Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('dwBwjKvB0sPI3SyQJIXGZEzwgRiKl0jM',1639950396,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T21:46:35.518Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('ecAd_O2NauVYhRwtlk-9BQeCBldJq1ew',1639954763,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T22:59:22.912Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('f0bOxfaXQuiBVES564gJFef123GVpvyA',1639941902,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T19:25:01.538Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('gA68VS1i9bXXXYwVnjLkIoQsWIpuvua9',1639959213,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T00:13:33.141Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('gNBg9SyreaHsgkhNCgAa3pGeDmIFjvn2',1639998896,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T11:12:45.939Z\",\"httpOnly\":true,\"path\":\"/\"},\"uid\":\"20193333\",\"isLogined\":true,\"isStudent\":true}'),('gm0CJrTQrif4OwRAZkUAspWUSiEw7CWG',1639973368,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T04:09:28.036Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('h9kZbZq1QOHMANr8WPr7TfPbWbofaYu3',1639961409,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T00:50:08.728Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('hLi7JE6uuCWJU9xUM456oFjxFLBhIcrk',1640005204,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T13:00:03.924Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('hjMG8tZV-L2DnscT_yJKc1fPUyY783ew',1639963227,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T01:20:26.825Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('hnpr-IrXicVf6ZbwUmWwydqrbZVU8BzW',1639961408,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T00:50:08.417Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('jZb1EJYFMCiRTJihZSOI670l-yf1GLBz',1639976194,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T04:56:34.203Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('k3ragarF8mOHy9AZ1HaVhrhYjASwa4Xi',1639976190,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T04:56:28.869Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('lfLZ-z7Ji8kBY2gde9mNfGp86eUu2ZLJ',1639944855,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T20:14:14.687Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('lu_H71U2RQpDv3sJvmTGT5aiY1pp7wdM',1639944400,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T20:06:40.340Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('mK0ld4bLm44t8T_qARzT1C63FIqfySVp',1639971470,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T03:37:49.582Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('mO1AySE5RlOUc4MERwOqhHjVEDNNV7Km',1639955182,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:21.719Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('mZDDGkeA493cgw2GpIcSNNPS1Y4fHW9j',1639954877,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:01:16.562Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('oQHmcAAG46xGhw66yRF6SrQl2wHQitNf',1639971210,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T03:33:30.185Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('oYby0F5HvlHLbEjwxMUUBJ7JVcHOW7LC',1639922700,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T14:05:00.404Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('q0v8Iim5qDWzzfOPXdn10_b-9CBlrZdD',1639944854,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T20:14:14.372Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('q1biq1Ng9BWxxTQdQxG_xSaqkbSEX3Wr',1639947124,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T20:52:03.615Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('qJTxG67mf1-C2f6h_Dk8f67g9PW3cTz7',1639955186,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:26.044Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('qbto_2DXqIq3Oi_TU-bjdW6LAVjbClCy',1640003958,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T12:39:17.724Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('rNdpyITLS3lUSUkcyn4oFCGjQGPhEmgr',1639955187,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:27.119Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('sKg59ENLZt6XxfBLgMM6vxuwy8ENgmBk',1639934408,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T17:20:07.579Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('sqizD3hbp5q_9lmGfGs05geBoGJSHuAz',1639954877,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:01:17.126Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('u5doH-MIVeMURkpFmZ03Jsl7oMnn9azY',1639955188,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:27.660Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('uCN7slzOumVXBkE4iSoZrozsRFvX5sXB',1639950588,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T21:49:47.815Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('usvJdbf51IjcrGo_38WfGpYMj_qWwr3r',1639960770,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T00:39:30.041Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('vKmQUySgLXIfgimGzI3cXDwewenZONze',1640001867,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T12:04:27.474Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('vikKnANcdHH6ATcDS1xxXL9BPHgKYq_L',1639959264,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T00:14:23.600Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('wWSnGMp7TsnXHFcD75D1BWPele0nOOE1',1639955189,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T23:06:28.739Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('y0jh8dlWpChdeIQLzHKFEJ5l2Wwy3Z0w',1640001867,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-20T12:04:27.473Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('yUCIU10L_cPBloCIgWUSRpebcetRtPo4',1639946984,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-19T20:49:44.121Z\",\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` varchar(20) NOT NULL,
  `staff_name` varchar(5) NOT NULL,
  `staff_pwd` varchar(20) NOT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('11111111','김관리','11111111'),('22222222','이관리','22222222');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` varchar(8) NOT NULL,
  `student_name` varchar(5) NOT NULL,
  `student_pwd` varchar(255) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `student_chk_1` CHECK ((length(`student_id`) = 8))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('20150101','채성아','$2b$10$v/y0Ah0JMPZF1r49ZZBUb.UNr0EE0.sIYeheVPbiZnozzGxYuIi2W','yingo24655@hanmail.net'),('20150992','국연수','$2b$10$RKXjhfu/21k0lPMxTpMIDuChdvdDUQFmU1aTqzIAZk9Cy/6sqG5Lu','sunny8198197@gmail.com'),('20161212','김성신','$2b$10$Buvwm81rvoe.hJIpMFCaNeqRowJuAHld1RNelXIKIvL4jtax8zTcq','yingo24655@gmail.com'),('20171313','전수정','$2b$10$yqdwPoGlvkmNr.iEZNmXluQQLu7eObryRbgLtpCOCtBB2bfnSZz0C','godqhrals@naver.com'),('20172067','이나연','$2b$10$vJwzWKMaB67VNppdmmU7PeGyraXasVnfIbkHnJVVXVl60tIDtufKm','gms9424@naver.com'),('20181004','나수룡','$2b$10$dI.T6nA9SajuJ9iqRom31eEdWRV2Of6vZP1jGy8iXuvwKoKpB.Juu','yingo24655@naver.com'),('20190886','김다은','$2b$10$I427SsVHoXFm8VZhPVH3tOoPtLEc5jTNLkitcugE.CTkFYUaglk.a','kdeun00714@naver.com'),('20190992','장유정','$2b$10$wccdkoHC8E98f/qrq6AcQOqJczgi92rzHhT72pap1lYZN/YNrB1.O','sunny819819@naver.com'),('20191062','박민영','$2b$10$tr/MRYrLG4zkp4OxmsCa/OnOT93CMbAF5jLB43BmQrRKRXpeaXprq','20191062@sungshin.ac.kr'),('20193333','권해림','$2b$10$PwBNZl7N7UisQiqY.nxk6.hhuy.Ty01YKaGVSdLehcYtxsIoMxUU.','sstmgsd@gmail.com'),('20201414','나미리','$2b$10$0ZDmKR1IFu7BorwwBCEVaOLfE4aDbwuJsC9Nt0lgbC.Rr3lTUGSny','my-i_can_do@naver.com'),('20210001','김유리','$2b$10$4zk2OrxNKL63IuS5sqy98.y/IqBxNIvt9/S6aydNinr/x5ncnVlWC','gms942400@gmail.com'),('20210002','봉미선','$2b$10$zN6oxG1ZQt.pW3D1RGrJi.4eHPO9vSi7F/8P7CehqqW0.Hq3sBR6m','rkwl1090@gmail.com'),('20210003','이수지','$2b$10$iMhF3Zu.xQY/ZbWfWHKVKO20nZ4fGNRURpa4oZB.yA1X8CRAWnr/K','rkwlrkwl0901@gmail.com'),('20211062','차은주','$2b$10$TphhLOrjMncGVKWQAzUb/uT40Lc/PLGwjQAsxn2kzuCv1uK4IG0Za','studystudy1936@gmail.com'),('20211515','신짱아','$2b$10$zmZKWyy5TGRAV1zbplQ/TO2POokqD/9MWILEmvWdrHeZbe3HaBaxm','gms9424@hanmail.net');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-19 22:14:38
