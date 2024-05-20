-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: escape
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `character_store`
--

DROP TABLE IF EXISTS `character_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character_store` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `character_name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  `asset_url` varchar(512) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_store`
--

LOCK TABLES `character_store` WRITE;
/*!40000 ALTER TABLE `character_store` DISABLE KEYS */;
/*!40000 ALTER TABLE `character_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `chat_room_id` bigint NOT NULL,
  `sender_id` bigint NOT NULL,
  `content` varchar(512) DEFAULT NULL,
  `type` char(5) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_chat_message_1` (`sender_id`),
  KEY `FK_chat_room_TO_chat_message` (`chat_room_id`),
  CONSTRAINT `FK_chat_room_TO_chat_message` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_user_TO_chat_message_1` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_of_room`
--

DROP TABLE IF EXISTS `chat_of_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_of_room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `room_id` bigint NOT NULL,
  `chat_room_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) NOT NULL DEFAULT (uuid()),
  PRIMARY KEY (`id`),
  KEY `FK_room_TO_chat_of_room_1` (`room_id`),
  KEY `FK_chat_room_TO_chat_of_room_1` (`chat_room_id`),
  CONSTRAINT `FK_chat_room_TO_chat_of_room_1` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`),
  CONSTRAINT `FK_room_TO_chat_of_room_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_of_room`
--

LOCK TABLES `chat_of_room` WRITE;
/*!40000 ALTER TABLE `chat_of_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_of_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_user` bigint NOT NULL,
  `uuid` varchar(36) DEFAULT (uuid()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `final_answer`
--

DROP TABLE IF EXISTS `final_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `final_answer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) NOT NULL COMMENT '최종 정답 내용',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `final_answer`
--

LOCK TABLES `final_answer` WRITE;
/*!40000 ALTER TABLE `final_answer` DISABLE KEYS */;
INSERT INTO `final_answer` VALUES (1,'정우야하루라도 농구를 안하면덧나니','2024-05-10 05:45:09','2024-05-10 05:45:09','763a133f-0e90-11ef-ad01-0242ac101402');
INSERT INTO `final_answer` VALUES (2,'희주야 좀 들어와','2024-05-10 05:45:09','2024-05-10 05:45:09','763a31c7-0e90-11ef-ad01-0242ac101402');
INSERT INTO `final_answer` VALUES (3,'역시 지원이야 최고','2024-05-10 05:45:09','2024-05-10 05:45:09','763a49b3-0e90-11ef-ad01-0242ac101402');
INSERT INTO `final_answer` VALUES (4,'정훈아 웹소켓 구현해줘','2024-05-10 05:45:09','2024-05-10 05:45:09','763a6087-0e90-11ef-ad01-0242ac101402');
INSERT INTO `final_answer` VALUES (5,'병주넌 참사람이 됐다','2024-05-10 05:45:09','2024-05-10 05:45:09','763a7520-0e90-11ef-ad01-0242ac101402');
/*!40000 ALTER TABLE `final_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'1','init','SQL','V1__init.sql',1545489072,'root','2024-05-10 05:45:06',3299,1);
INSERT INTO `flyway_schema_history` VALUES (2,'2','change column type','SQL','V2__change_column_type.sql',553659,'root','2024-05-10 05:45:08',2265,1);
INSERT INTO `flyway_schema_history` VALUES (3,'3','add thema dummy data','SQL','V3__add_thema_dummy_data.sql',-624145742,'root','2024-05-10 05:45:08',10,1);
INSERT INTO `flyway_schema_history` VALUES (4,'4','add quiz dummy data','SQL','V4__add_quiz_dummy_data.sql',834696635,'root','2024-05-10 05:45:08',22,1);
INSERT INTO `flyway_schema_history` VALUES (5,'5','add user dummy data','SQL','V5__add_user_dummy_data.sql',-295666546,'root','2024-05-10 05:45:08',6,1);
INSERT INTO `flyway_schema_history` VALUES (6,'6','modify column type','SQL','V6__modify_column_type.sql',-1006163023,'root','2024-05-10 05:45:09',242,1);
INSERT INTO `flyway_schema_history` VALUES (7,'7','delete column ranking','SQL','V7__delete_column_ranking.sql',932135158,'root','2024-05-10 05:45:09',95,1);
INSERT INTO `flyway_schema_history` VALUES (8,'8','add final answer dummy data','SQL','V8__add_final_answer_dummy_data.sql',-1550981577,'root','2024-05-10 05:45:09',6,1);
INSERT INTO `flyway_schema_history` VALUES (9,'9','add column to character store','SQL','V9__add_column_to_character_store.sql',1338497,'root','2024-05-10 05:45:09',27,1);
INSERT INTO `flyway_schema_history` VALUES (10,'10','update user uuid','SQL','V10__update_user_uuid.sql',711276272,'root','2024-05-10 05:45:09',6,1);
INSERT INTO `flyway_schema_history` VALUES (11,'11','add friend dummy data','SQL','V11__add_friend_dummy_data.sql',-242832946,'root','2024-05-10 05:45:09',4,1);
INSERT INTO `flyway_schema_history` VALUES (12,'12','add participants deleteflag column','SQL','V12__add_participants_deleteflag_column.sql',584445999,'root','2024-05-10 05:45:09',32,1);
INSERT INTO `flyway_schema_history` VALUES (13,'13','change chat FK setting','SQL','V13__change_chat_FK_setting.sql',177233992,'root','2024-05-10 05:45:09',268,1);
INSERT INTO `flyway_schema_history` VALUES (14,'14','delete column user','SQL','V14__delete_column_user.sql',-507022613,'root','2024-05-10 05:45:09',49,1);
INSERT INTO `flyway_schema_history` VALUES (15,'15','add column user','SQL','V15__add_column_user.sql',988887230,'root','2024-05-10 05:45:09',47,1);
INSERT INTO `flyway_schema_history` VALUES (16,'16','add column user','SQL','V16__add_column_user.sql',-32714564,'root','2024-05-10 05:45:10',50,1);
INSERT INTO `flyway_schema_history` VALUES (17,'17','fix wrong category column','SQL','V17__fix_wrong_category_column.sql',-2105538968,'root','2024-05-10 05:45:10',8,1);
INSERT INTO `flyway_schema_history` VALUES (18,'18','add column user','SQL','V18__add_column_user.sql',-246239274,'root','2024-05-10 05:45:10',46,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `from_user_id` bigint NOT NULL,
  `to_user_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_friend_1` (`from_user_id`),
  KEY `FK_user_TO_friend_2` (`to_user_id`),
  CONSTRAINT `FK_user_TO_friend_1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_user_TO_friend_2` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (1,1,2,'2024-05-10 05:45:09','2024-05-10 05:45:09','764a72b8-0e90-11ef-ad01-0242ac101402');
INSERT INTO `friend` VALUES (2,2,3,'2024-05-10 05:45:09','2024-05-10 05:45:09','764a9268-0e90-11ef-ad01-0242ac101402');
INSERT INTO `friend` VALUES (3,21,22,'2024-05-16 01:33:53','2024-05-16 01:33:53','34c093fa-ec50-44ba-9b6b-c1c2d047e6f0');
INSERT INTO `friend` VALUES (4,22,21,'2024-05-16 01:33:53','2024-05-16 01:33:53','3256e967-054a-4445-8cf5-4888a916c7db');
INSERT INTO `friend` VALUES (25,6,15,'2024-05-16 15:57:22','2024-05-16 15:57:22','4dc9c5ee-3411-45bf-9883-be2932eda032');
INSERT INTO `friend` VALUES (26,15,6,'2024-05-16 15:57:22','2024-05-16 15:57:22','8282f0a3-9175-483d-b6ed-bbc173c75fc8');
INSERT INTO `friend` VALUES (35,12,21,'2024-05-17 06:32:43','2024-05-17 06:32:43','c6b77f95-f0ba-47d0-afd4-8c4ebb753f8b');
INSERT INTO `friend` VALUES (36,21,12,'2024-05-17 06:32:43','2024-05-17 06:32:43','40a3e708-9dba-4176-a3e8-5d596b53f528');
INSERT INTO `friend` VALUES (37,39,21,'2024-05-17 06:44:55','2024-05-17 06:44:55','56b207ef-318b-4388-884e-8390a1143bf7');
INSERT INTO `friend` VALUES (38,21,39,'2024-05-17 06:44:55','2024-05-17 06:44:55','96db83c9-1153-4ee1-8acd-7c28247cc932');
INSERT INTO `friend` VALUES (39,12,39,'2024-05-18 06:31:42','2024-05-18 06:31:42','b234d6fb-cada-4721-afba-c45e30f4e26a');
INSERT INTO `friend` VALUES (40,39,12,'2024-05-18 06:31:42','2024-05-18 06:31:42','154ede4a-f9f3-4c1e-90de-b5ad58f9a08e');
INSERT INTO `friend` VALUES (41,16,39,'2024-05-18 09:06:25','2024-05-18 09:06:25','3fc7065c-eabe-4895-856f-ec84717d3ce7');
INSERT INTO `friend` VALUES (42,39,16,'2024-05-18 09:06:25','2024-05-18 09:06:25','43fd4dad-b0ab-4e64-b027-fbb8d742282c');
INSERT INTO `friend` VALUES (43,49,50,'2024-05-18 14:51:47','2024-05-18 14:51:47','7bf4ab4c-76e7-4729-9d0a-5e0bec832c6f');
INSERT INTO `friend` VALUES (44,50,49,'2024-05-18 14:51:47','2024-05-18 14:51:47','a285c977-f5d8-4f4f-8102-b54991c1e0b0');
INSERT INTO `friend` VALUES (47,8,55,'2024-05-18 20:14:23','2024-05-18 20:14:23','b809cb87-294f-4e32-ae34-ab29f8096b1f');
INSERT INTO `friend` VALUES (48,55,8,'2024-05-18 20:14:23','2024-05-18 20:14:23','2692a7fa-6507-4755-befa-f5e21932b81c');
INSERT INTO `friend` VALUES (49,56,8,'2024-05-19 13:26:48','2024-05-19 13:26:48','6ed09610-21cb-4dc9-a6e9-076499619c4d');
INSERT INTO `friend` VALUES (50,8,56,'2024-05-19 13:26:48','2024-05-19 13:26:48','144362ce-17df-480a-b306-92019cffeeed');
INSERT INTO `friend` VALUES (51,13,56,'2024-05-19 16:31:38','2024-05-19 16:31:38','e6e302f2-f903-4b11-8664-b2cf03a8b373');
INSERT INTO `friend` VALUES (52,56,13,'2024-05-19 16:31:38','2024-05-19 16:31:38','e965cb06-5b54-4a0d-a7a9-6e66138c1267');
INSERT INTO `friend` VALUES (53,20,39,'2024-05-19 16:44:51','2024-05-19 16:44:51','e96eb258-d6af-4f59-8c52-bb54e0cd9bb8');
INSERT INTO `friend` VALUES (54,39,20,'2024-05-19 16:44:51','2024-05-19 16:44:51','8b8a2b2b-78a5-4e7f-bec6-1c4f8f10ddfe');
INSERT INTO `friend` VALUES (71,13,29,'2024-05-19 17:10:53','2024-05-19 17:10:53','af9394ff-5b8b-49b0-b822-01a600cefaa3');
INSERT INTO `friend` VALUES (72,29,13,'2024-05-19 17:10:53','2024-05-19 17:10:53','d441a560-b23f-4874-917b-b549d9d92805');
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_delete_history`
--

DROP TABLE IF EXISTS `friend_delete_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_delete_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `from_user_id` bigint NOT NULL,
  `to_user_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_friend_delete_history_1` (`from_user_id`),
  KEY `FK_user_TO_friend_delete_history_2` (`to_user_id`),
  CONSTRAINT `FK_user_TO_friend_delete_history_1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_user_TO_friend_delete_history_2` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_delete_history`
--

LOCK TABLES `friend_delete_history` WRITE;
/*!40000 ALTER TABLE `friend_delete_history` DISABLE KEYS */;
INSERT INTO `friend_delete_history` VALUES (1,13,29,'2024-05-16 07:42:23','2024-05-16 07:42:23','d543270d-1357-11ef-904f-0242ac101405');
INSERT INTO `friend_delete_history` VALUES (2,13,21,'2024-05-16 10:58:25','2024-05-16 10:58:25','37ee1947-1373-11ef-b3a5-0242ac101404');
INSERT INTO `friend_delete_history` VALUES (3,13,29,'2024-05-16 11:04:10','2024-05-16 11:04:10','05cf02dd-1374-11ef-b3a5-0242ac101404');
INSERT INTO `friend_delete_history` VALUES (4,13,29,'2024-05-16 11:13:46','2024-05-16 11:13:46','5cd51f0b-1375-11ef-b3a5-0242ac101404');
INSERT INTO `friend_delete_history` VALUES (5,13,29,'2024-05-16 11:15:27','2024-05-16 11:15:27','990682c2-1375-11ef-b3a5-0242ac101404');
INSERT INTO `friend_delete_history` VALUES (6,13,29,'2024-05-16 11:39:41','2024-05-16 11:39:41','fc1eb9c7-1378-11ef-b3a5-0242ac101404');
INSERT INTO `friend_delete_history` VALUES (7,29,13,'2024-05-16 13:23:09','2024-05-16 13:23:09','6ff82f51-1387-11ef-b3a5-0242ac101404');
INSERT INTO `friend_delete_history` VALUES (8,13,29,'2024-05-16 13:51:45','2024-05-16 13:51:45','6f43b003-138b-11ef-b3a5-0242ac101404');
INSERT INTO `friend_delete_history` VALUES (9,21,20,'2024-05-16 15:54:30','2024-05-16 15:54:30','951a1035-139c-11ef-b3a5-0242ac101404');
INSERT INTO `friend_delete_history` VALUES (10,29,13,'2024-05-17 02:27:48','2024-05-17 02:27:48','0d4cb7f5-13f5-11ef-a164-0242ac101406');
INSERT INTO `friend_delete_history` VALUES (11,13,29,'2024-05-17 02:28:07','2024-05-17 02:28:07','18d7504b-13f5-11ef-a164-0242ac101406');
INSERT INTO `friend_delete_history` VALUES (12,13,29,'2024-05-17 02:55:52','2024-05-17 02:55:52','f8f9f775-13f8-11ef-9b34-0242ac101407');
INSERT INTO `friend_delete_history` VALUES (13,21,12,'2024-05-17 06:30:31','2024-05-17 06:30:31','f5e758d7-1416-11ef-8136-0242ac101405');
INSERT INTO `friend_delete_history` VALUES (14,13,29,'2024-05-18 14:05:11','2024-05-18 14:05:11','a40cb6de-151f-11ef-a70d-0242ac101404');
INSERT INTO `friend_delete_history` VALUES (15,13,29,'2024-05-19 16:50:44','2024-05-19 16:50:44','ef2ddc1d-15ff-11ef-82e8-0242ac101407');
INSERT INTO `friend_delete_history` VALUES (16,29,13,'2024-05-19 16:53:28','2024-05-19 16:53:28','50eb0816-1600-11ef-82e8-0242ac101407');
INSERT INTO `friend_delete_history` VALUES (17,13,29,'2024-05-19 16:56:20','2024-05-19 16:56:20','b74e039f-1600-11ef-82e8-0242ac101407');
INSERT INTO `friend_delete_history` VALUES (18,29,13,'2024-05-19 16:58:03','2024-05-19 16:58:03','f505beee-1600-11ef-82e8-0242ac101407');
INSERT INTO `friend_delete_history` VALUES (19,13,29,'2024-05-19 17:00:00','2024-05-19 17:00:00','3a68f62a-1601-11ef-82e8-0242ac101407');
INSERT INTO `friend_delete_history` VALUES (20,29,13,'2024-05-19 17:00:59','2024-05-19 17:00:59','5dd6645e-1601-11ef-82e8-0242ac101407');
INSERT INTO `friend_delete_history` VALUES (21,13,29,'2024-05-19 17:05:48','2024-05-19 17:05:48','0a284912-1602-11ef-82e8-0242ac101407');
INSERT INTO `friend_delete_history` VALUES (22,13,29,'2024-05-19 17:07:14','2024-05-19 17:07:14','3d0d050b-1602-11ef-82e8-0242ac101407');
INSERT INTO `friend_delete_history` VALUES (23,13,29,'2024-05-19 17:10:16','2024-05-19 17:10:16','a99359c4-1602-11ef-82e8-0242ac101407');
/*!40000 ALTER TABLE `friend_delete_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `furniture`
--

DROP TABLE IF EXISTS `furniture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `furniture` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `furniture`
--

LOCK TABLES `furniture` WRITE;
/*!40000 ALTER TABLE `furniture` DISABLE KEYS */;
/*!40000 ALTER TABLE `furniture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_history`
--

DROP TABLE IF EXISTS `game_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL COMMENT '유저 아이디',
  `thema_id` bigint NOT NULL COMMENT '테마 아이디',
  `clear_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_game_history_1` (`user_id`),
  KEY `FK_thema_TO_game_history_1` (`thema_id`),
  CONSTRAINT `FK_thema_TO_game_history_1` FOREIGN KEY (`thema_id`) REFERENCES `thema` (`id`),
  CONSTRAINT `FK_user_TO_game_history_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=632 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_history`
--

LOCK TABLES `game_history` WRITE;
/*!40000 ALTER TABLE `game_history` DISABLE KEYS */;
INSERT INTO `game_history` VALUES (1,13,1,'00:09:00','2024-05-13 04:36:37','2024-05-13 04:36:37','2448ec59-d233-4118-94c2-f4359f9c3896');
INSERT INTO `game_history` VALUES (2,13,1,'00:09:00','2024-05-13 04:59:48','2024-05-13 04:59:48','cd302e22-ea9d-4d95-840d-e1f299970a6e');
INSERT INTO `game_history` VALUES (3,13,1,'00:10:00','2024-05-13 05:00:16','2024-05-13 05:00:16','d7dc82e5-5736-4626-b0f6-d8281f7e47f7');
INSERT INTO `game_history` VALUES (4,13,1,'00:08:00','2024-05-13 05:00:29','2024-05-13 05:00:29','70f05fda-538d-4f9d-aacd-b5f5ac73a20e');
INSERT INTO `game_history` VALUES (5,13,1,'00:06:50','2024-05-15 04:09:22','2024-05-15 04:09:22','c8a4438f-04b2-4910-9010-ae2b802e5c27');
INSERT INTO `game_history` VALUES (6,12,1,'00:06:24','2024-05-16 01:43:10','2024-05-16 01:43:10','409a7d67-d759-444a-84b6-b17771464e60');
INSERT INTO `game_history` VALUES (7,12,1,'00:05:50','2024-05-16 01:46:09','2024-05-16 01:46:09','143fc3b6-8bce-4ca3-a1ec-a9f0c60b51a0');
INSERT INTO `game_history` VALUES (8,12,1,'00:05:11','2024-05-16 03:24:36','2024-05-16 03:24:36','ecf86bf9-932b-44ad-b362-9542c70e7dc5');
INSERT INTO `game_history` VALUES (9,12,1,'00:07:03','2024-05-16 03:39:26','2024-05-16 03:39:26','2907cf45-8e2a-4a0d-b516-bbf6d4c0cf52');
INSERT INTO `game_history` VALUES (10,12,1,'00:05:31','2024-05-16 03:48:01','2024-05-16 03:48:01','3f8fce0c-ac55-4ce6-9fc8-2b1b73c40085');
INSERT INTO `game_history` VALUES (11,12,1,'00:08:24','2024-05-16 04:00:09','2024-05-16 04:00:09','8eaa0fa2-9046-478c-a196-ea62f17832d8');
INSERT INTO `game_history` VALUES (12,12,1,'00:04:06','2024-05-16 04:38:26','2024-05-16 04:38:26','6015daca-8966-4734-b342-af55d539f3b8');
INSERT INTO `game_history` VALUES (13,24,1,'00:08:32','2024-05-16 04:58:53','2024-05-16 04:58:53','0a076052-8a7a-4893-9975-e257f960e218');
INSERT INTO `game_history` VALUES (14,24,1,'00:09:56','2024-05-16 04:59:40','2024-05-16 04:59:40','1c879b0f-4af4-4f45-bc4f-f164b11d0aad');
INSERT INTO `game_history` VALUES (15,27,1,'00:05:19','2024-05-16 05:25:21','2024-05-16 05:25:21','be986fac-dea9-4d37-bb47-b8bb4923b3cc');
INSERT INTO `game_history` VALUES (16,26,1,'00:09:51','2024-05-16 05:38:16','2024-05-16 05:38:16','cf6d8890-ad37-47bf-9791-b561b33cad9a');
INSERT INTO `game_history` VALUES (17,12,1,'00:05:06','2024-05-16 06:24:39','2024-05-16 06:24:39','2333d69c-6a89-415d-ab4b-d0a7a8995e0b');
INSERT INTO `game_history` VALUES (18,12,1,'00:03:36','2024-05-16 06:57:54','2024-05-16 06:57:54','2a2317a8-3fca-4dec-add6-98b7a0b23a2d');
INSERT INTO `game_history` VALUES (19,12,1,'00:02:22','2024-05-16 07:42:29','2024-05-16 07:42:29','1d9499d7-8ef4-40b1-a811-88e279795f95');
INSERT INTO `game_history` VALUES (20,16,1,'00:05:34','2024-05-16 08:05:36','2024-05-16 08:05:36','83a293c2-6c3e-4fbb-b0ac-96e1c2bc5da8');
INSERT INTO `game_history` VALUES (21,16,1,'00:09:38','2024-05-16 08:16:00','2024-05-16 08:16:00','b23f1d8c-41d0-4f10-aebc-a713034f1b42');
INSERT INTO `game_history` VALUES (22,16,1,'00:09:30','2024-05-16 08:28:32','2024-05-16 08:28:32','a7268574-c35a-495f-815b-65b11e6355a3');
INSERT INTO `game_history` VALUES (23,13,1,'00:01:30','2024-05-16 14:09:06','2024-05-16 14:09:06','96766e1d-2f24-4b8d-aff4-11cc57996668');
INSERT INTO `game_history` VALUES (24,29,1,'00:01:25','2024-05-16 14:56:18','2024-05-16 14:56:18','1c8d12a7-bf98-4a85-9303-e8d9d29e1f89');
INSERT INTO `game_history` VALUES (25,7,1,'00:07:32','2024-05-16 15:18:33','2024-05-16 15:18:33','e0c61e7a-900b-46a5-b6c3-15adad910a0e');
INSERT INTO `game_history` VALUES (26,29,1,'00:04:21','2024-05-16 15:22:52','2024-05-16 15:22:52','c2300696-f93e-4529-a532-690bdf81033b');
INSERT INTO `game_history` VALUES (27,29,10,'00:04:51','2024-05-16 15:26:46','2024-05-16 15:26:46','e8203aad-51be-492a-bb36-e1be9f1ab3af');
INSERT INTO `game_history` VALUES (28,13,1,'00:02:37','2024-05-17 06:51:49','2024-05-17 06:51:49','6699d962-4600-4841-8ed2-47e2d6dcc5ef');
INSERT INTO `game_history` VALUES (29,42,10,'00:04:55','2024-05-17 12:05:21','2024-05-17 12:05:21','68447d1e-4f9a-43b0-9734-e35e074066a7');
INSERT INTO `game_history` VALUES (30,7,1,'00:03:24','2024-05-17 15:05:05','2024-05-17 15:05:05','ae6df7f7-3e35-4a57-9095-c7d8d1ecfd65');
INSERT INTO `game_history` VALUES (31,7,1,'00:04:13','2024-05-17 16:59:33','2024-05-17 16:59:33','a6df95a7-c826-495d-a1a3-2ce4ad6e554d');
INSERT INTO `game_history` VALUES (32,7,1,'00:03:51','2024-05-18 05:31:43','2024-05-18 05:31:43','c3f063d9-befe-4f86-b8dc-5584bd53ee4e');
INSERT INTO `game_history` VALUES (33,44,1,'00:10:29','2024-05-18 05:37:04','2024-05-18 05:37:04','39ba0dcc-f1bf-4a7e-8106-ab7e90cb5b9c');
INSERT INTO `game_history` VALUES (34,44,1,'00:10:29','2024-05-18 05:37:05','2024-05-18 05:37:05','8eb5a4ab-a20e-4b40-a47a-70fb88887605');
INSERT INTO `game_history` VALUES (35,44,1,'00:10:28','2024-05-18 05:37:07','2024-05-18 05:37:07','e80b6123-fd31-4138-a260-a46d23897d84');
INSERT INTO `game_history` VALUES (36,44,1,'00:10:28','2024-05-18 05:37:07','2024-05-18 05:37:07','3f8951db-da88-49de-97a5-3a8dd98e9698');
INSERT INTO `game_history` VALUES (37,44,1,'00:10:28','2024-05-18 05:37:07','2024-05-18 05:37:07','925a53fb-a65a-4a47-91d8-99cdb208f8fd');
INSERT INTO `game_history` VALUES (38,44,1,'00:10:27','2024-05-18 05:37:08','2024-05-18 05:37:08','6272bef5-79c4-4885-a76f-cb2b81f59683');
INSERT INTO `game_history` VALUES (39,44,1,'00:10:27','2024-05-18 05:37:08','2024-05-18 05:37:08','26a90467-71aa-4c3e-80fa-31a59973e4bd');
INSERT INTO `game_history` VALUES (40,44,1,'00:10:26','2024-05-18 05:37:09','2024-05-18 05:37:09','38067544-f93a-4517-a076-759dc032a532');
INSERT INTO `game_history` VALUES (41,44,1,'00:10:26','2024-05-18 05:37:11','2024-05-18 05:37:11','fca83460-7b16-4a83-854b-1c2e514066e0');
INSERT INTO `game_history` VALUES (42,44,1,'00:10:26','2024-05-18 05:37:12','2024-05-18 05:37:12','24849ed9-f3eb-431b-9da2-c4b10044e04d');
INSERT INTO `game_history` VALUES (43,44,1,'00:10:26','2024-05-18 05:37:13','2024-05-18 05:37:13','d87890a7-f907-44f1-92b3-ba031f66b8ee');
INSERT INTO `game_history` VALUES (44,44,1,'00:10:26','2024-05-18 05:37:14','2024-05-18 05:37:14','ec9f3280-b4e0-49f6-8eab-fe414caa52cd');
INSERT INTO `game_history` VALUES (45,44,1,'00:10:26','2024-05-18 05:37:14','2024-05-18 05:37:14','9207711c-ba94-4536-81c7-3bc7b280ed2f');
INSERT INTO `game_history` VALUES (46,44,1,'00:10:26','2024-05-18 05:37:15','2024-05-18 05:37:15','5bf1eb60-9068-481d-9f24-c5c55ca35b98');
INSERT INTO `game_history` VALUES (47,44,1,'00:10:26','2024-05-18 05:37:15','2024-05-18 05:37:15','4b51c7b3-f1b9-48aa-acac-bf5d7d5aff24');
INSERT INTO `game_history` VALUES (48,44,1,'00:10:25','2024-05-18 05:37:16','2024-05-18 05:37:16','ea5ede77-3e07-4846-8f29-57355393a402');
INSERT INTO `game_history` VALUES (49,44,1,'00:10:25','2024-05-18 05:37:19','2024-05-18 05:37:19','89f2c8c7-23e4-42bd-a421-d52ff1b30592');
INSERT INTO `game_history` VALUES (50,44,1,'00:10:25','2024-05-18 05:37:22','2024-05-18 05:37:22','472ad046-4e73-4d56-a90f-133b6e203973');
INSERT INTO `game_history` VALUES (51,44,1,'00:10:25','2024-05-18 05:37:22','2024-05-18 05:37:22','bdd89643-c280-41f1-9d32-aaffe01499a9');
INSERT INTO `game_history` VALUES (52,44,1,'00:10:24','2024-05-18 05:37:23','2024-05-18 05:37:23','a128bb90-479b-45b3-a27a-b6ee223175ec');
INSERT INTO `game_history` VALUES (53,44,1,'00:10:24','2024-05-18 05:37:24','2024-05-18 05:37:24','0ae82156-7466-48b6-99ae-733d9254d2dd');
INSERT INTO `game_history` VALUES (54,44,1,'00:10:24','2024-05-18 05:37:24','2024-05-18 05:37:24','32ed2aff-94ac-4c4c-8c6c-d6771ca30940');
INSERT INTO `game_history` VALUES (55,44,1,'00:10:24','2024-05-18 05:37:25','2024-05-18 05:37:25','53d33fde-d47c-42ef-aeaf-309826e14dfe');
INSERT INTO `game_history` VALUES (56,44,1,'00:10:23','2024-05-18 05:37:27','2024-05-18 05:37:27','fa420b1e-fc27-4f59-8398-9b5b0a5da2c4');
INSERT INTO `game_history` VALUES (57,44,1,'00:10:23','2024-05-18 05:37:28','2024-05-18 05:37:28','f15f7142-5855-485f-affa-2eeb4a0250ff');
INSERT INTO `game_history` VALUES (58,44,1,'00:10:23','2024-05-18 05:37:29','2024-05-18 05:37:29','7ca8b4a9-946c-48ca-8c91-17fafbf94076');
INSERT INTO `game_history` VALUES (59,44,1,'00:10:22','2024-05-18 05:37:29','2024-05-18 05:37:29','51d902d0-95ac-454a-bfaa-5e8dc8d4e425');
INSERT INTO `game_history` VALUES (60,44,1,'00:10:22','2024-05-18 05:37:30','2024-05-18 05:37:30','a0a7e23a-195c-416d-bb38-45328357b61f');
INSERT INTO `game_history` VALUES (61,44,1,'00:10:22','2024-05-18 05:37:30','2024-05-18 05:37:30','ada2412e-acc1-416c-b9d7-2aa08b95edcb');
INSERT INTO `game_history` VALUES (62,44,1,'00:10:21','2024-05-18 05:37:32','2024-05-18 05:37:32','f418e971-489d-4818-a5e9-f68fba14b9e0');
INSERT INTO `game_history` VALUES (63,44,1,'00:10:21','2024-05-18 05:37:35','2024-05-18 05:37:35','f26f0294-bf88-4839-a6c4-4cc0e832707a');
INSERT INTO `game_history` VALUES (64,44,1,'00:10:20','2024-05-18 05:37:37','2024-05-18 05:37:37','de37850a-627d-4771-a903-10badfed2490');
INSERT INTO `game_history` VALUES (65,44,1,'00:10:10','2024-05-18 05:37:49','2024-05-18 05:37:49','e42a7053-789e-4d44-9ff9-5772443483c3');
INSERT INTO `game_history` VALUES (66,44,1,'00:10:08','2024-05-18 05:37:53','2024-05-18 05:37:53','77492e67-6918-4302-9c77-cc2aa99bb0e3');
INSERT INTO `game_history` VALUES (67,44,1,'00:10:06','2024-05-18 05:37:56','2024-05-18 05:37:56','2e2acbe4-5c8c-4c89-ace4-7f5d53cc5646');
INSERT INTO `game_history` VALUES (68,44,1,'00:10:06','2024-05-18 05:37:57','2024-05-18 05:37:57','9df2fd70-45f7-4c1b-9e4d-efd22073f386');
INSERT INTO `game_history` VALUES (69,44,1,'00:10:06','2024-05-18 05:37:57','2024-05-18 05:37:57','6292c936-6957-4fc2-a7d1-34835ff7c665');
INSERT INTO `game_history` VALUES (70,44,1,'00:10:06','2024-05-18 05:37:58','2024-05-18 05:37:58','069c6785-1070-4fd6-b04c-2bad8d6e2e51');
INSERT INTO `game_history` VALUES (71,44,1,'00:10:06','2024-05-18 05:37:58','2024-05-18 05:37:58','dfaa4d09-3541-4fc4-89bf-926dcfcda148');
INSERT INTO `game_history` VALUES (72,44,1,'00:10:06','2024-05-18 05:37:58','2024-05-18 05:37:58','4517c693-ac47-4acc-8fd6-97a6a64d49d6');
INSERT INTO `game_history` VALUES (73,44,1,'00:10:05','2024-05-18 05:37:58','2024-05-18 05:37:58','d778ea10-ca07-4edc-911e-2e5bf14006c8');
INSERT INTO `game_history` VALUES (74,44,1,'00:10:05','2024-05-18 05:37:59','2024-05-18 05:37:59','82441674-5f0c-4c70-9869-8735d2d8f9d8');
INSERT INTO `game_history` VALUES (75,44,1,'00:10:05','2024-05-18 05:37:59','2024-05-18 05:37:59','1a70ba65-9dcb-4302-8b60-e711970ac369');
INSERT INTO `game_history` VALUES (76,44,1,'00:10:02','2024-05-18 05:38:05','2024-05-18 05:38:05','daa8ab1f-f5f2-4422-8ab5-912fbbca04ea');
INSERT INTO `game_history` VALUES (77,44,1,'00:10:01','2024-05-18 05:38:06','2024-05-18 05:38:06','fb5cf985-2f15-43fd-825d-bc5d07606ec8');
INSERT INTO `game_history` VALUES (78,7,1,'00:05:57','2024-05-18 05:44:15','2024-05-18 05:44:15','3444d895-5baa-4327-bb6d-2495e3064955');
INSERT INTO `game_history` VALUES (79,7,1,'00:03:23','2024-05-18 05:49:08','2024-05-18 05:49:08','e690e71a-ea98-4606-9091-fad405e778a1');
INSERT INTO `game_history` VALUES (80,44,10,'00:08:41','2024-05-18 05:59:14','2024-05-18 05:59:14','39e1b939-d4a5-4590-adab-9dbc4b7f15e7');
INSERT INTO `game_history` VALUES (81,7,1,'00:04:54','2024-05-18 06:07:43','2024-05-18 06:07:43','598b90a7-e69d-4f4f-a827-58318ec83752');
INSERT INTO `game_history` VALUES (82,7,1,'00:05:31','2024-05-18 06:13:40','2024-05-18 06:13:40','ede72378-6d71-455e-b38c-710910878d91');
INSERT INTO `game_history` VALUES (83,7,1,'00:04:29','2024-05-18 07:00:40','2024-05-18 07:00:40','5d370a5a-c992-4e7a-be16-e3060c67ce58');
INSERT INTO `game_history` VALUES (84,7,1,'00:05:44','2024-05-18 07:44:13','2024-05-18 07:44:13','efb2f7a2-b8b1-4c58-bfc9-7b6f76655953');
INSERT INTO `game_history` VALUES (85,12,10,'00:04:50','2024-05-18 07:49:47','2024-05-18 07:49:47','7239bf02-62a9-45cc-a998-98dbf4f18b02');
INSERT INTO `game_history` VALUES (86,12,10,'00:10:37','2024-05-18 08:25:25','2024-05-18 08:25:25','6e4fb043-bb75-43a5-a081-26c96c37d71d');
INSERT INTO `game_history` VALUES (87,39,10,'00:09:44','2024-05-18 08:30:15','2024-05-18 08:30:15','fa171dba-8fcc-4bba-aae7-eb2325cea727');
INSERT INTO `game_history` VALUES (88,39,10,'00:06:06','2024-05-18 08:44:14','2024-05-18 08:44:14','814156c8-2f3f-4729-82fa-1fa4a6441bb2');
INSERT INTO `game_history` VALUES (89,7,10,'00:05:29','2024-05-18 09:04:21','2024-05-18 09:04:21','cb40747c-c8dd-4b1d-a418-264e9dd0753b');
INSERT INTO `game_history` VALUES (90,7,10,'00:08:13','2024-05-18 09:38:34','2024-05-18 09:38:34','b5c83371-d3b3-4e06-b983-608d994c6ba3');
INSERT INTO `game_history` VALUES (91,7,10,'00:05:50','2024-05-18 09:52:13','2024-05-18 09:52:13','486681f8-d4fc-4db6-b9e6-a16ea2bcf5c7');
INSERT INTO `game_history` VALUES (92,6,10,'00:03:27','2024-05-18 11:00:23','2024-05-18 11:00:23','15c935b6-8d5a-447b-900a-a4555e079f05');
INSERT INTO `game_history` VALUES (93,7,10,'00:04:15','2024-05-18 12:21:47','2024-05-18 12:21:47','0eb11d4a-bdef-41a1-94a1-8d3dcf4b0e98');
INSERT INTO `game_history` VALUES (94,7,10,'00:05:41','2024-05-18 13:08:31','2024-05-18 13:08:31','38c5e678-57e5-40fb-8158-4a6ffd9b2d4e');
INSERT INTO `game_history` VALUES (95,6,10,'00:08:29','2024-05-18 13:30:07','2024-05-18 13:30:07','c116a2f8-70a6-4e97-af92-3bf09112d74e');
INSERT INTO `game_history` VALUES (96,7,10,'00:04:27','2024-05-18 14:16:07','2024-05-18 14:16:07','04e574ce-1039-47e3-943f-c2f65f1f4d80');
INSERT INTO `game_history` VALUES (97,13,1,'00:01:34','2024-05-18 15:34:59','2024-05-18 15:34:59','d63227b5-25dd-48ad-b22e-f39c906df3f6');
INSERT INTO `game_history` VALUES (98,13,1,'00:01:34','2024-05-18 15:35:00','2024-05-18 15:35:00','d2a660cc-b6f2-4dea-84dc-c8f172d33fa1');
INSERT INTO `game_history` VALUES (99,13,1,'00:01:33','2024-05-18 15:35:01','2024-05-18 15:35:01','c11ff51f-4203-4f73-a15e-d13e3c6f642b');
INSERT INTO `game_history` VALUES (100,13,1,'00:01:33','2024-05-18 15:35:01','2024-05-18 15:35:01','c385e4ae-e656-4ce2-926b-0decc84e8966');
INSERT INTO `game_history` VALUES (101,13,1,'00:01:33','2024-05-18 15:35:02','2024-05-18 15:35:02','cbec52eb-1807-4ef6-b77f-9ed4f8cf6ea6');
INSERT INTO `game_history` VALUES (102,13,1,'00:01:33','2024-05-18 15:35:02','2024-05-18 15:35:02','3d93e845-c75e-4420-b127-49be30df4dfd');
INSERT INTO `game_history` VALUES (103,13,1,'00:01:33','2024-05-18 15:35:02','2024-05-18 15:35:02','6597ce20-4cca-436e-9757-6cc88d61bd11');
INSERT INTO `game_history` VALUES (104,13,1,'00:01:33','2024-05-18 15:35:03','2024-05-18 15:35:03','82ff3db0-5212-4204-abc3-396ba753949b');
INSERT INTO `game_history` VALUES (105,13,1,'00:01:32','2024-05-18 15:35:03','2024-05-18 15:35:03','f5f8115d-f47d-4032-9ba3-5dfc48b41a04');
INSERT INTO `game_history` VALUES (106,13,1,'00:01:32','2024-05-18 15:35:03','2024-05-18 15:35:03','844ed0b6-c406-4a75-8582-981dd9ce0167');
INSERT INTO `game_history` VALUES (107,13,1,'00:01:32','2024-05-18 15:35:03','2024-05-18 15:35:03','47f45e91-513f-4b69-993e-94c77a09811a');
INSERT INTO `game_history` VALUES (108,13,1,'00:01:32','2024-05-18 15:35:04','2024-05-18 15:35:04','f9ebd945-d294-4424-87ae-04d8aac0a3e8');
INSERT INTO `game_history` VALUES (109,13,1,'00:01:32','2024-05-18 15:35:04','2024-05-18 15:35:04','333d67ff-4edc-4ef0-8cc2-ac67f361859e');
INSERT INTO `game_history` VALUES (110,13,1,'00:01:28','2024-05-18 15:35:10','2024-05-18 15:35:10','4e7c603a-1edb-45b3-97fc-712fe90660a4');
INSERT INTO `game_history` VALUES (111,13,1,'00:01:28','2024-05-18 15:35:10','2024-05-18 15:35:10','3368a3a1-9eb4-4cb2-98ee-eb3c4a5d2f66');
INSERT INTO `game_history` VALUES (112,13,1,'00:01:28','2024-05-18 15:35:11','2024-05-18 15:35:11','ed6904ff-c19d-4649-9082-0bd69968c754');
INSERT INTO `game_history` VALUES (113,13,1,'00:01:28','2024-05-18 15:35:11','2024-05-18 15:35:11','e7bc2e6e-4df6-4314-ba1f-cede5b3cbacb');
INSERT INTO `game_history` VALUES (114,13,1,'00:01:28','2024-05-18 15:35:11','2024-05-18 15:35:11','601d629f-1f8b-47f8-8ab3-5ed6ae4b9727');
INSERT INTO `game_history` VALUES (115,13,1,'00:01:28','2024-05-18 15:35:11','2024-05-18 15:35:11','fa353f75-6f75-4b86-bedb-bf98ed4456e9');
INSERT INTO `game_history` VALUES (116,13,1,'00:01:28','2024-05-18 15:35:12','2024-05-18 15:35:12','d00362f7-de21-4e94-b588-4f106e237d2d');
INSERT INTO `game_history` VALUES (117,13,1,'00:01:28','2024-05-18 15:35:12','2024-05-18 15:35:12','f8a8c0ad-955d-409a-8d2e-2f042687ab97');
INSERT INTO `game_history` VALUES (118,13,1,'00:01:28','2024-05-18 15:35:12','2024-05-18 15:35:12','91cc512a-5d58-4cab-b470-3ce16882bf6b');
INSERT INTO `game_history` VALUES (119,13,1,'00:01:28','2024-05-18 15:35:13','2024-05-18 15:35:13','243dd0d2-5d29-489d-bd42-6db80e44d6e6');
INSERT INTO `game_history` VALUES (120,13,1,'00:01:28','2024-05-18 15:35:13','2024-05-18 15:35:13','2b0b3194-8286-45e1-9641-8b3090bf625d');
INSERT INTO `game_history` VALUES (121,13,1,'00:01:27','2024-05-18 15:35:13','2024-05-18 15:35:13','e43bc2ac-1161-44db-8b27-c9bb0595fa08');
INSERT INTO `game_history` VALUES (122,13,1,'00:01:27','2024-05-18 15:35:13','2024-05-18 15:35:13','1c99ed07-2c8a-4f27-a3f2-051ede72f94d');
INSERT INTO `game_history` VALUES (123,13,1,'00:01:27','2024-05-18 15:35:14','2024-05-18 15:35:14','de93e421-3d9e-4c08-99e7-e7301f7ce9ed');
INSERT INTO `game_history` VALUES (124,13,1,'00:01:27','2024-05-18 15:35:15','2024-05-18 15:35:15','728e767e-0798-4925-8738-199d5c04c034');
INSERT INTO `game_history` VALUES (125,13,1,'00:01:27','2024-05-18 15:35:15','2024-05-18 15:35:15','d256a7e6-4bdf-48b0-a043-bd7263c1bd90');
INSERT INTO `game_history` VALUES (126,13,1,'00:01:27','2024-05-18 15:35:15','2024-05-18 15:35:15','8ad8a4ea-8d93-4fb9-b294-948b0d4d5dd9');
INSERT INTO `game_history` VALUES (127,13,1,'00:01:26','2024-05-18 15:35:16','2024-05-18 15:35:16','b878bd43-7b51-4d15-b9c1-750e0cf32fb5');
INSERT INTO `game_history` VALUES (128,13,1,'00:01:26','2024-05-18 15:35:16','2024-05-18 15:35:16','ee52051c-9140-4550-a1a4-457d0672715a');
INSERT INTO `game_history` VALUES (129,13,1,'00:01:26','2024-05-18 15:35:16','2024-05-18 15:35:16','c608fb4b-cb1a-4405-b341-ef6fb240d1cc');
INSERT INTO `game_history` VALUES (130,13,1,'00:01:26','2024-05-18 15:35:16','2024-05-18 15:35:16','72844e07-74df-4140-a01f-089235c37c52');
INSERT INTO `game_history` VALUES (131,13,1,'00:01:26','2024-05-18 15:35:16','2024-05-18 15:35:16','b8ca84c8-960b-4a78-a30d-5cc876461c0d');
INSERT INTO `game_history` VALUES (132,13,1,'00:01:26','2024-05-18 15:35:17','2024-05-18 15:35:17','8238d092-74cd-4f8d-8413-e1cbd8e58d34');
INSERT INTO `game_history` VALUES (133,13,1,'00:01:26','2024-05-18 15:35:17','2024-05-18 15:35:17','d84e4491-94c0-4491-a840-1215de0ff67b');
INSERT INTO `game_history` VALUES (134,13,1,'00:01:26','2024-05-18 15:35:18','2024-05-18 15:35:18','9b94f056-4c7e-42bb-b998-6dfe54021dd6');
INSERT INTO `game_history` VALUES (135,13,1,'00:01:26','2024-05-18 15:35:18','2024-05-18 15:35:18','48b117c6-399a-4bf5-a5a3-87bc424cde49');
INSERT INTO `game_history` VALUES (136,13,1,'00:01:26','2024-05-18 15:35:18','2024-05-18 15:35:18','8268f212-c1bf-4ba4-91b5-f6385ccb8378');
INSERT INTO `game_history` VALUES (137,13,1,'00:01:26','2024-05-18 15:35:18','2024-05-18 15:35:18','47dd1e13-66c0-48d1-a57e-5f4b8e85b907');
INSERT INTO `game_history` VALUES (138,13,1,'00:01:26','2024-05-18 15:35:18','2024-05-18 15:35:18','a250c793-5072-4064-a1d3-d5bb078de1ec');
INSERT INTO `game_history` VALUES (139,13,1,'00:01:26','2024-05-18 15:35:19','2024-05-18 15:35:19','f258c0c8-cd38-4531-83da-aa73a3c2ddc1');
INSERT INTO `game_history` VALUES (140,13,1,'00:01:26','2024-05-18 15:35:20','2024-05-18 15:35:20','e2471c6e-7e49-4d28-ac33-919a1700c0df');
INSERT INTO `game_history` VALUES (141,13,1,'00:01:26','2024-05-18 15:35:20','2024-05-18 15:35:20','2fc44fa2-3498-47cb-af21-8c1290a72c80');
INSERT INTO `game_history` VALUES (142,13,1,'00:01:26','2024-05-18 15:35:20','2024-05-18 15:35:20','34c47dd1-7002-4412-8815-525cb486297f');
INSERT INTO `game_history` VALUES (143,13,1,'00:01:26','2024-05-18 15:35:20','2024-05-18 15:35:20','737fc6d4-8459-4156-b444-ae14a4e0baa7');
INSERT INTO `game_history` VALUES (144,13,1,'00:01:26','2024-05-18 15:35:21','2024-05-18 15:35:21','e6351d9a-b9f0-4a93-b13c-8413d91e267d');
INSERT INTO `game_history` VALUES (145,13,1,'00:01:26','2024-05-18 15:35:21','2024-05-18 15:35:21','fae8136f-4891-46cc-9237-5a2303fad63c');
INSERT INTO `game_history` VALUES (146,13,1,'00:01:26','2024-05-18 15:35:21','2024-05-18 15:35:21','9520c8aa-bfbf-421c-84b0-beb3312a9c31');
INSERT INTO `game_history` VALUES (147,13,1,'00:01:26','2024-05-18 15:35:21','2024-05-18 15:35:21','30221936-1117-447d-85f2-0cc906636443');
INSERT INTO `game_history` VALUES (148,13,1,'00:01:26','2024-05-18 15:35:21','2024-05-18 15:35:21','ef3cd4f6-d31a-4af4-bb38-e0faffe27101');
INSERT INTO `game_history` VALUES (149,13,1,'00:01:26','2024-05-18 15:35:23','2024-05-18 15:35:23','f15b9e06-ea5c-4f97-ad70-319390aa43d9');
INSERT INTO `game_history` VALUES (150,13,1,'00:01:26','2024-05-18 15:35:23','2024-05-18 15:35:23','570ce36a-0ee8-43d6-bd19-6e3e822cb434');
INSERT INTO `game_history` VALUES (151,13,1,'00:01:26','2024-05-18 15:35:23','2024-05-18 15:35:23','94fdcdf2-4ef9-43ca-a585-d71d332ebdec');
INSERT INTO `game_history` VALUES (152,13,1,'00:01:26','2024-05-18 15:35:23','2024-05-18 15:35:23','23ff432e-446b-4d13-a047-c8d87f537726');
INSERT INTO `game_history` VALUES (153,13,1,'00:01:26','2024-05-18 15:35:24','2024-05-18 15:35:24','29d117d5-d532-4ce8-967c-e3547cb02a72');
INSERT INTO `game_history` VALUES (154,13,1,'00:01:26','2024-05-18 15:35:27','2024-05-18 15:35:27','6b4f640e-73a0-4bbe-9c32-c627571a7a37');
INSERT INTO `game_history` VALUES (155,13,1,'00:01:26','2024-05-18 15:35:28','2024-05-18 15:35:28','51258dcd-75f3-42a9-9d1d-6fae352a7000');
INSERT INTO `game_history` VALUES (156,13,1,'00:01:26','2024-05-18 15:35:28','2024-05-18 15:35:28','a656b887-3ccc-4efc-bc46-438f42fe7510');
INSERT INTO `game_history` VALUES (157,13,1,'00:01:26','2024-05-18 15:35:28','2024-05-18 15:35:28','5b7eec24-75d4-4638-a999-f309c38a3ba4');
INSERT INTO `game_history` VALUES (158,13,1,'00:03:05','2024-05-18 15:37:53','2024-05-18 15:37:53','b31115b7-91c6-43ec-8b55-7ebffde09569');
INSERT INTO `game_history` VALUES (159,13,1,'00:03:05','2024-05-18 15:37:54','2024-05-18 15:37:54','33df39f9-cf3d-4545-a5a9-cf75bf3faf9c');
INSERT INTO `game_history` VALUES (160,13,1,'00:03:05','2024-05-18 15:37:54','2024-05-18 15:37:54','93e9f7ba-fc6b-4407-8213-2282e377c797');
INSERT INTO `game_history` VALUES (161,13,1,'00:04:45','2024-05-18 15:38:16','2024-05-18 15:38:16','b479a242-86f1-40a3-8978-08e02f2dbfdf');
INSERT INTO `game_history` VALUES (162,13,1,'00:05:41','2024-05-18 15:39:26','2024-05-18 15:39:26','c3acae75-0295-4527-877e-d6a1401e4a00');
INSERT INTO `game_history` VALUES (163,13,1,'00:05:41','2024-05-18 15:39:26','2024-05-18 15:39:26','affe6b6e-aa28-468c-9e0f-f8e67bb0a24b');
INSERT INTO `game_history` VALUES (164,13,1,'00:05:41','2024-05-18 15:39:27','2024-05-18 15:39:27','903967ee-2224-4e38-9af8-2ac255cc94fe');
INSERT INTO `game_history` VALUES (165,13,1,'00:01:42','2024-05-18 15:48:56','2024-05-18 15:48:56','a55f7df4-48fb-4dc4-aabc-d1b3054ec445');
INSERT INTO `game_history` VALUES (166,13,1,'00:01:42','2024-05-18 15:48:58','2024-05-18 15:48:58','e68626af-25b8-4794-bf89-2d7c6b4764cc');
INSERT INTO `game_history` VALUES (167,13,1,'00:01:42','2024-05-18 15:48:58','2024-05-18 15:48:58','e444632c-a83b-418d-b152-5e72c69dc59f');
INSERT INTO `game_history` VALUES (168,13,1,'00:01:41','2024-05-18 15:49:00','2024-05-18 15:49:00','2f62debe-c088-443d-830e-57c95f883f63');
INSERT INTO `game_history` VALUES (169,13,1,'00:03:23','2024-05-18 15:51:23','2024-05-18 15:51:23','3c847cd6-7219-4b18-8e07-1a47661f7c70');
INSERT INTO `game_history` VALUES (170,13,1,'00:03:22','2024-05-18 15:51:28','2024-05-18 15:51:28','085b56b9-c5b6-4534-81ff-bb237f0090ab');
INSERT INTO `game_history` VALUES (171,13,1,'00:03:22','2024-05-18 15:51:29','2024-05-18 15:51:29','a55750d1-8fa0-4bf4-96d4-3ac660dddf9b');
INSERT INTO `game_history` VALUES (172,13,1,'00:04:48','2024-05-18 15:52:04','2024-05-18 15:52:04','2318528d-bc29-4407-b5c0-9f8db7afe8d4');
INSERT INTO `game_history` VALUES (173,13,1,'00:04:48','2024-05-18 15:52:05','2024-05-18 15:52:05','0ba79b9b-473b-4a81-86d9-cfb3e9958c67');
INSERT INTO `game_history` VALUES (174,13,1,'00:04:47','2024-05-18 15:52:06','2024-05-18 15:52:06','5fc7b4ae-3770-4e3d-98ba-ba24bf536f33');
INSERT INTO `game_history` VALUES (175,13,1,'00:04:47','2024-05-18 15:52:07','2024-05-18 15:52:07','b3f5573c-29f1-4fd7-9c87-a768a9505ba6');
INSERT INTO `game_history` VALUES (176,13,1,'00:04:47','2024-05-18 15:52:07','2024-05-18 15:52:07','07351070-eaf6-4950-ad8a-0e86f2b4cdb1');
INSERT INTO `game_history` VALUES (177,13,1,'00:04:47','2024-05-18 15:52:07','2024-05-18 15:52:07','231a239c-274a-48a5-a3ff-ffc28ee0f56e');
INSERT INTO `game_history` VALUES (178,13,1,'00:04:47','2024-05-18 15:52:08','2024-05-18 15:52:08','225d0dcb-7a09-4d00-a6d5-c75f9b171958');
INSERT INTO `game_history` VALUES (179,13,1,'00:04:45','2024-05-18 15:52:09','2024-05-18 15:52:09','523c842d-3607-4364-8570-f0ecff3cc623');
INSERT INTO `game_history` VALUES (180,13,1,'00:04:45','2024-05-18 15:52:10','2024-05-18 15:52:10','802eca1d-204c-4faa-b5cd-43af0d034e1a');
INSERT INTO `game_history` VALUES (181,13,1,'00:04:45','2024-05-18 15:52:11','2024-05-18 15:52:11','e162787b-06e8-42b3-b1c0-334232b7f4eb');
INSERT INTO `game_history` VALUES (182,13,1,'00:04:45','2024-05-18 15:52:11','2024-05-18 15:52:11','d0f07689-8dff-4294-8672-2ff0d283629d');
INSERT INTO `game_history` VALUES (183,13,1,'00:04:42','2024-05-18 15:52:20','2024-05-18 15:52:20','7e9a5f62-38bb-4dc1-abbd-f099849aae90');
INSERT INTO `game_history` VALUES (184,13,1,'00:04:42','2024-05-18 15:52:21','2024-05-18 15:52:21','62980151-ec7a-4d4b-beff-7f1385f62f68');
INSERT INTO `game_history` VALUES (185,13,1,'00:04:42','2024-05-18 15:52:21','2024-05-18 15:52:21','b753ad62-d90f-413a-848c-496fa617509d');
INSERT INTO `game_history` VALUES (186,13,1,'00:04:42','2024-05-18 15:52:22','2024-05-18 15:52:22','395a95e8-44ee-45f9-98c7-e4a732284ebb');
INSERT INTO `game_history` VALUES (187,13,1,'00:04:42','2024-05-18 15:52:22','2024-05-18 15:52:22','4aef6f2e-fe43-4d1e-9246-54ef637b1bde');
INSERT INTO `game_history` VALUES (188,13,1,'00:04:41','2024-05-18 15:52:23','2024-05-18 15:52:23','4dd68d65-1308-4f70-b53c-9877d732dc5f');
INSERT INTO `game_history` VALUES (189,13,1,'00:04:41','2024-05-18 15:52:24','2024-05-18 15:52:24','788669f5-de49-422f-bff2-5976d6cac8f2');
INSERT INTO `game_history` VALUES (190,13,1,'00:04:41','2024-05-18 15:52:24','2024-05-18 15:52:24','b374b6e7-ced1-422b-8776-daa6fa00e69a');
INSERT INTO `game_history` VALUES (191,13,1,'00:04:41','2024-05-18 15:52:24','2024-05-18 15:52:24','c45ac019-d1a4-49ed-bda4-996a3b56a938');
INSERT INTO `game_history` VALUES (192,13,1,'00:04:40','2024-05-18 15:52:24','2024-05-18 15:52:24','870ec8f1-6701-4b27-bed4-bf9c1b0cc69b');
INSERT INTO `game_history` VALUES (193,13,1,'00:04:40','2024-05-18 15:52:25','2024-05-18 15:52:25','4501da87-1922-4e46-bb55-16e440212b6e');
INSERT INTO `game_history` VALUES (194,13,1,'00:04:40','2024-05-18 15:52:25','2024-05-18 15:52:25','c8724891-dea8-4f55-b1af-45db755b53d3');
INSERT INTO `game_history` VALUES (195,13,1,'00:04:40','2024-05-18 15:52:25','2024-05-18 15:52:25','d73cff6c-74aa-49ae-ad02-2d652eee9e2f');
INSERT INTO `game_history` VALUES (196,13,1,'00:04:40','2024-05-18 15:52:25','2024-05-18 15:52:25','ae66be3b-d3d7-45e1-8183-9fe546e758bb');
INSERT INTO `game_history` VALUES (197,13,1,'00:04:40','2024-05-18 15:52:26','2024-05-18 15:52:26','d8cbf285-db8b-4858-aed8-692d31c1e363');
INSERT INTO `game_history` VALUES (198,13,1,'00:04:40','2024-05-18 15:52:26','2024-05-18 15:52:26','1f62faf8-a0bc-4d12-9b24-d50ea19778cd');
INSERT INTO `game_history` VALUES (199,13,1,'00:04:40','2024-05-18 15:52:26','2024-05-18 15:52:26','e0942f97-936d-4a1f-9994-b8ef743ceda2');
INSERT INTO `game_history` VALUES (200,13,1,'00:04:40','2024-05-18 15:52:27','2024-05-18 15:52:27','64f1df92-538f-47f5-a704-6bff4ebdbe4a');
INSERT INTO `game_history` VALUES (201,13,1,'00:04:40','2024-05-18 15:52:27','2024-05-18 15:52:27','3e45be07-6c99-4ab3-9b3a-47722ce9fab7');
INSERT INTO `game_history` VALUES (202,13,1,'00:04:40','2024-05-18 15:52:27','2024-05-18 15:52:27','d884a1b5-2c3b-4d8b-950b-9ed631cd01f4');
INSERT INTO `game_history` VALUES (203,13,1,'00:04:40','2024-05-18 15:52:28','2024-05-18 15:52:28','082f5250-0938-45b9-9064-ba69ac29d353');
INSERT INTO `game_history` VALUES (204,13,1,'00:04:40','2024-05-18 15:52:28','2024-05-18 15:52:28','675e05a2-5f9c-4b69-a683-4ead624c9c98');
INSERT INTO `game_history` VALUES (205,13,1,'00:04:39','2024-05-18 15:52:30','2024-05-18 15:52:30','ca199c09-9c64-4534-8cd8-741b5c090a08');
INSERT INTO `game_history` VALUES (206,13,1,'00:04:39','2024-05-18 15:52:30','2024-05-18 15:52:30','72a3ee67-9a99-4dc5-823a-8b0edd37d2b5');
INSERT INTO `game_history` VALUES (207,13,1,'00:04:39','2024-05-18 15:52:30','2024-05-18 15:52:30','de57ae5e-4f15-4601-bee6-e9c74724d070');
INSERT INTO `game_history` VALUES (208,13,1,'00:04:39','2024-05-18 15:52:30','2024-05-18 15:52:30','2cbbfc1c-6848-4a49-ae40-9edfe7237887');
INSERT INTO `game_history` VALUES (209,13,1,'00:04:39','2024-05-18 15:52:30','2024-05-18 15:52:30','8782fb8d-3b70-480a-8d04-e95db6ba9d1c');
INSERT INTO `game_history` VALUES (210,13,1,'00:04:39','2024-05-18 15:52:30','2024-05-18 15:52:30','9d7d97aa-f026-4d58-86e6-51f7e6e61ec3');
INSERT INTO `game_history` VALUES (211,13,1,'00:04:38','2024-05-18 15:52:31','2024-05-18 15:52:31','13444ae2-df05-44fa-b3a1-81c7d3d9f03d');
INSERT INTO `game_history` VALUES (212,13,1,'00:04:38','2024-05-18 15:52:31','2024-05-18 15:52:31','fcab8b7a-9dd8-48df-bf16-56531350a5e8');
INSERT INTO `game_history` VALUES (213,13,1,'00:04:38','2024-05-18 15:52:31','2024-05-18 15:52:31','8a79087c-08fe-46b5-89f5-4fa7b5a4bd94');
INSERT INTO `game_history` VALUES (214,13,1,'00:04:38','2024-05-18 15:52:31','2024-05-18 15:52:31','ab72a326-f55a-4e3b-b207-89e6ed8a8bed');
INSERT INTO `game_history` VALUES (215,13,1,'00:04:38','2024-05-18 15:52:31','2024-05-18 15:52:31','c6385280-f1ff-47e8-b2f9-c1e3fd120d1e');
INSERT INTO `game_history` VALUES (216,13,1,'00:04:38','2024-05-18 15:52:31','2024-05-18 15:52:31','f3bb97b8-4160-4440-b3a4-2194372a8f9e');
INSERT INTO `game_history` VALUES (217,13,1,'00:04:37','2024-05-18 15:52:32','2024-05-18 15:52:32','65e507e3-97b1-4931-87f5-7bb2c147477d');
INSERT INTO `game_history` VALUES (218,13,1,'00:04:37','2024-05-18 15:52:32','2024-05-18 15:52:32','c18bea22-b060-46a8-8b42-e6bb1d2de68d');
INSERT INTO `game_history` VALUES (219,13,1,'00:04:37','2024-05-18 15:52:33','2024-05-18 15:52:33','8e436376-66ad-4468-a2d0-4648fd0a3028');
INSERT INTO `game_history` VALUES (220,13,1,'00:04:37','2024-05-18 15:52:33','2024-05-18 15:52:33','1920f085-49f6-45dc-891c-b94181f29e36');
INSERT INTO `game_history` VALUES (221,13,1,'00:04:37','2024-05-18 15:52:34','2024-05-18 15:52:34','0167601d-fd1d-4c43-a144-b8009abbe8e8');
INSERT INTO `game_history` VALUES (222,13,1,'00:04:37','2024-05-18 15:52:34','2024-05-18 15:52:34','2f6ac2f7-edfb-415c-a897-7047d8259759');
INSERT INTO `game_history` VALUES (223,13,1,'00:04:37','2024-05-18 15:52:34','2024-05-18 15:52:34','2d3e193a-adfb-4881-9179-d4bc69c640f3');
INSERT INTO `game_history` VALUES (224,13,1,'00:04:37','2024-05-18 15:52:34','2024-05-18 15:52:34','1f44c01b-5a8d-4b96-b02e-52614284eaac');
INSERT INTO `game_history` VALUES (225,13,1,'00:04:37','2024-05-18 15:52:35','2024-05-18 15:52:35','12aa4ca0-6dd6-450a-8224-715abf3a9c89');
INSERT INTO `game_history` VALUES (226,13,1,'00:04:37','2024-05-18 15:52:35','2024-05-18 15:52:35','e1831c47-bb29-4bfd-a623-753b29fd3773');
INSERT INTO `game_history` VALUES (227,13,1,'00:04:37','2024-05-18 15:52:35','2024-05-18 15:52:35','4b8095dc-1f2f-434c-b4e1-a5811576632d');
INSERT INTO `game_history` VALUES (228,13,1,'00:04:36','2024-05-18 15:52:35','2024-05-18 15:52:35','58cc12ee-87f8-43b7-b186-93ea5cb550e4');
INSERT INTO `game_history` VALUES (229,13,1,'00:04:36','2024-05-18 15:52:36','2024-05-18 15:52:36','ae27563c-3925-4ba0-848c-221879e8fd30');
INSERT INTO `game_history` VALUES (230,13,1,'00:04:36','2024-05-18 15:52:36','2024-05-18 15:52:36','344b6ea2-c62b-4c6e-a3ae-d22f4a3abbd8');
INSERT INTO `game_history` VALUES (231,13,1,'00:04:36','2024-05-18 15:52:36','2024-05-18 15:52:36','a78ff17a-88b9-48b1-a46c-362757e519dd');
INSERT INTO `game_history` VALUES (232,13,1,'00:04:35','2024-05-18 15:52:37','2024-05-18 15:52:37','4f33c7ff-87e6-486f-b7fe-1507c2f100f3');
INSERT INTO `game_history` VALUES (233,13,1,'00:04:35','2024-05-18 15:52:37','2024-05-18 15:52:37','7e3f5462-6fd2-4de6-a3ed-add8a5ddb4b4');
INSERT INTO `game_history` VALUES (234,13,1,'00:04:35','2024-05-18 15:52:37','2024-05-18 15:52:37','c5f650b4-75ca-486b-8826-7d457cb78244');
INSERT INTO `game_history` VALUES (235,13,1,'00:04:35','2024-05-18 15:52:37','2024-05-18 15:52:37','73ea4e96-ac58-4763-8a25-22883498c79b');
INSERT INTO `game_history` VALUES (236,13,1,'00:04:35','2024-05-18 15:52:37','2024-05-18 15:52:37','58bad0ef-5135-4a50-ac86-903b5224eddd');
INSERT INTO `game_history` VALUES (237,13,1,'00:04:35','2024-05-18 15:52:38','2024-05-18 15:52:38','30ff4e8b-556f-4327-ad7f-88a1625d407d');
INSERT INTO `game_history` VALUES (238,13,1,'00:04:35','2024-05-18 15:52:38','2024-05-18 15:52:38','e54023d1-1f64-4a6b-b952-f727fcf1c3ed');
INSERT INTO `game_history` VALUES (239,13,1,'00:04:35','2024-05-18 15:52:38','2024-05-18 15:52:38','e7d4e3a0-a801-47d3-b133-65378d6dcc3a');
INSERT INTO `game_history` VALUES (240,13,1,'00:04:35','2024-05-18 15:52:38','2024-05-18 15:52:38','996ee6f0-0b28-4a39-af4f-b85f43440c1c');
INSERT INTO `game_history` VALUES (241,13,1,'00:04:34','2024-05-18 15:52:39','2024-05-18 15:52:39','92a2ce12-43b0-41cd-b3f9-87117ee023d1');
INSERT INTO `game_history` VALUES (242,13,1,'00:04:34','2024-05-18 15:52:39','2024-05-18 15:52:39','388306b5-5327-41b8-bc3b-47209378e96d');
INSERT INTO `game_history` VALUES (243,13,1,'00:04:34','2024-05-18 15:52:39','2024-05-18 15:52:39','f4f808d0-24a2-48b8-96d3-eb7c00a8c38e');
INSERT INTO `game_history` VALUES (244,13,1,'00:04:34','2024-05-18 15:52:39','2024-05-18 15:52:39','7bd298d6-f3dc-4e64-8200-8478bb471441');
INSERT INTO `game_history` VALUES (245,13,1,'00:04:34','2024-05-18 15:52:39','2024-05-18 15:52:39','4e8d6feb-6454-4d86-b19b-9472a6e5ee68');
INSERT INTO `game_history` VALUES (246,13,1,'00:04:34','2024-05-18 15:52:40','2024-05-18 15:52:40','4f973391-cca3-4366-8c2b-43726f3791a3');
INSERT INTO `game_history` VALUES (247,13,1,'00:04:34','2024-05-18 15:52:40','2024-05-18 15:52:40','920faa40-5190-491d-8664-f428c10cede3');
INSERT INTO `game_history` VALUES (248,13,1,'00:04:34','2024-05-18 15:52:40','2024-05-18 15:52:40','10f4221b-800e-4d47-a548-a2fc9ea811b2');
INSERT INTO `game_history` VALUES (249,13,1,'00:04:34','2024-05-18 15:52:40','2024-05-18 15:52:40','7087ef42-b6fc-4faa-8e5e-7bc05dc022d7');
INSERT INTO `game_history` VALUES (250,13,1,'00:04:34','2024-05-18 15:52:40','2024-05-18 15:52:40','b0867358-ad55-4f0f-9a68-f748579b1047');
INSERT INTO `game_history` VALUES (251,13,1,'00:04:34','2024-05-18 15:52:41','2024-05-18 15:52:41','c3eed6fc-aa95-46ab-bdb5-804f1ae5ee2c');
INSERT INTO `game_history` VALUES (252,13,1,'00:04:34','2024-05-18 15:52:41','2024-05-18 15:52:41','3fc9a486-7dcf-49a4-9402-5b6e8751fdc7');
INSERT INTO `game_history` VALUES (253,13,1,'00:04:34','2024-05-18 15:52:41','2024-05-18 15:52:41','d776e5c1-bde9-498e-b202-4c2f44aaeb40');
INSERT INTO `game_history` VALUES (254,13,1,'00:04:34','2024-05-18 15:52:41','2024-05-18 15:52:41','f50b9605-faf9-4acf-ad2e-d9df8f72776e');
INSERT INTO `game_history` VALUES (255,13,1,'00:04:34','2024-05-18 15:52:41','2024-05-18 15:52:41','7d2a4a34-ff00-4bb9-a954-e4dc971a7c92');
INSERT INTO `game_history` VALUES (256,13,1,'00:04:34','2024-05-18 15:52:41','2024-05-18 15:52:41','72b10bc7-15a0-4a88-882e-700947ba22e6');
INSERT INTO `game_history` VALUES (257,13,1,'00:04:34','2024-05-18 15:52:42','2024-05-18 15:52:42','d2ea0cf2-dfe4-40b1-8664-70fbbebcb1f6');
INSERT INTO `game_history` VALUES (258,13,1,'00:04:34','2024-05-18 15:52:42','2024-05-18 15:52:42','34a1bcac-b43d-4d1a-a3ab-344c5a1c85a7');
INSERT INTO `game_history` VALUES (259,13,1,'00:04:34','2024-05-18 15:52:42','2024-05-18 15:52:42','24152156-f93c-4f6f-89f8-a0e1305641cc');
INSERT INTO `game_history` VALUES (260,13,1,'00:04:34','2024-05-18 15:52:42','2024-05-18 15:52:42','79871c12-7c48-407d-ae2f-7006242ba5e0');
INSERT INTO `game_history` VALUES (261,13,1,'00:04:34','2024-05-18 15:52:42','2024-05-18 15:52:42','f5f23df6-8aae-467a-abe7-fdb7424aefef');
INSERT INTO `game_history` VALUES (262,13,1,'00:04:34','2024-05-18 15:52:43','2024-05-18 15:52:43','4d73a4da-e3b2-49c5-8bf5-f4a805d46f1f');
INSERT INTO `game_history` VALUES (263,13,1,'00:04:34','2024-05-18 15:52:43','2024-05-18 15:52:43','7aa28e1e-c616-4be6-9afd-1ffbe5a8ff8b');
INSERT INTO `game_history` VALUES (264,13,1,'00:04:34','2024-05-18 15:52:43','2024-05-18 15:52:43','0a0e807f-bf41-46cb-9f5c-1ac7f92461de');
INSERT INTO `game_history` VALUES (265,13,1,'00:04:34','2024-05-18 15:52:43','2024-05-18 15:52:43','bb2a2644-3b94-4ddf-9022-e0ce5c9962bc');
INSERT INTO `game_history` VALUES (266,13,1,'00:04:34','2024-05-18 15:52:43','2024-05-18 15:52:43','a8ce4d0a-21e7-4ae7-a25e-5ce315dc4218');
INSERT INTO `game_history` VALUES (267,13,1,'00:04:34','2024-05-18 15:52:43','2024-05-18 15:52:43','3d713e46-843b-4b5f-a530-5084aa0b68bb');
INSERT INTO `game_history` VALUES (268,13,1,'00:04:34','2024-05-18 15:52:44','2024-05-18 15:52:44','08ee2c89-5b7f-47f8-90bf-b67112ca5889');
INSERT INTO `game_history` VALUES (269,13,1,'00:04:34','2024-05-18 15:52:44','2024-05-18 15:52:44','e8e89394-c8bc-4a60-85bb-25976da1eaf0');
INSERT INTO `game_history` VALUES (270,13,1,'00:04:34','2024-05-18 15:52:44','2024-05-18 15:52:44','8f1b3439-1e08-40d3-9094-8546af4c38e5');
INSERT INTO `game_history` VALUES (271,13,1,'00:04:34','2024-05-18 15:52:44','2024-05-18 15:52:44','04010d40-75cd-4218-b0ba-3760710fa8db');
INSERT INTO `game_history` VALUES (272,13,1,'00:04:34','2024-05-18 15:52:44','2024-05-18 15:52:44','77b3a42b-885d-44df-ad91-044b14ae90f1');
INSERT INTO `game_history` VALUES (273,13,1,'00:04:34','2024-05-18 15:52:44','2024-05-18 15:52:44','2fcfd6e7-76f4-487e-8781-a6d3c8446caf');
INSERT INTO `game_history` VALUES (274,13,1,'00:04:34','2024-05-18 15:52:45','2024-05-18 15:52:45','27ee4966-ea97-475e-aa3e-73463a034940');
INSERT INTO `game_history` VALUES (275,13,1,'00:04:34','2024-05-18 15:52:45','2024-05-18 15:52:45','51a61458-d5ea-4ed7-a6ac-a01cf3335cc5');
INSERT INTO `game_history` VALUES (276,13,1,'00:04:34','2024-05-18 15:52:45','2024-05-18 15:52:45','bc4b2ffa-2092-418c-bafe-a41e7a5d4fbd');
INSERT INTO `game_history` VALUES (277,13,1,'00:04:34','2024-05-18 15:52:45','2024-05-18 15:52:45','91acf352-7093-4c5d-b80c-45965c01c1a6');
INSERT INTO `game_history` VALUES (278,13,1,'00:04:34','2024-05-18 15:52:45','2024-05-18 15:52:45','39d016d1-3b95-4f87-9cd1-957ea2588df5');
INSERT INTO `game_history` VALUES (279,13,1,'00:04:33','2024-05-18 15:52:54','2024-05-18 15:52:54','9aafe3ff-f3bb-4033-8736-5c38e246fce5');
INSERT INTO `game_history` VALUES (280,13,1,'00:04:05','2024-05-18 15:53:28','2024-05-18 15:53:28','c6c34edd-da19-4250-a3ce-45a07193c110');
INSERT INTO `game_history` VALUES (281,13,1,'00:04:05','2024-05-18 15:53:28','2024-05-18 15:53:28','267f1c68-29a3-4a3f-9240-bfcdad51e17e');
INSERT INTO `game_history` VALUES (282,13,1,'00:05:54','2024-05-18 15:53:40','2024-05-18 15:53:40','c4d2e944-70a5-4c89-a203-ecccd77900a2');
INSERT INTO `game_history` VALUES (283,13,1,'00:05:49','2024-05-18 15:53:48','2024-05-18 15:53:48','728ede34-a144-4775-8cff-1a4eef599362');
INSERT INTO `game_history` VALUES (284,13,1,'00:05:49','2024-05-18 15:53:48','2024-05-18 15:53:48','bffa9abd-ee84-40d3-aeed-0740e240a412');
INSERT INTO `game_history` VALUES (285,13,1,'00:05:48','2024-05-18 15:53:51','2024-05-18 15:53:51','0f970331-0dc2-4408-8b80-813315ab41a0');
INSERT INTO `game_history` VALUES (286,13,1,'00:05:48','2024-05-18 15:53:51','2024-05-18 15:53:51','509beddb-1190-4b9c-ba1b-f4961db696fc');
INSERT INTO `game_history` VALUES (287,13,1,'00:05:48','2024-05-18 15:53:51','2024-05-18 15:53:51','4add3b76-a478-4beb-b085-40248e6dfbcb');
INSERT INTO `game_history` VALUES (288,13,1,'00:05:45','2024-05-18 15:53:56','2024-05-18 15:53:56','26e1f4fa-4c12-400b-a554-1627fe1ca25b');
INSERT INTO `game_history` VALUES (289,13,1,'00:05:45','2024-05-18 15:53:56','2024-05-18 15:53:56','16290288-6a9e-4300-a0fb-068aab42aa37');
INSERT INTO `game_history` VALUES (290,13,1,'00:10:22','2024-05-18 15:59:20','2024-05-18 15:59:20','ccc2b578-64f1-4bdc-ade6-86f3801ba541');
INSERT INTO `game_history` VALUES (291,13,1,'00:10:22','2024-05-18 15:59:20','2024-05-18 15:59:20','20abe070-2d2a-472c-88b8-d5adb24205a0');
INSERT INTO `game_history` VALUES (292,13,1,'00:01:30','2024-05-18 16:10:35','2024-05-18 16:10:35','a267b838-9890-40fe-8681-7d060082b224');
INSERT INTO `game_history` VALUES (293,13,1,'00:01:30','2024-05-18 16:10:35','2024-05-18 16:10:35','2a5a9bad-b021-435c-b164-6b6d97664724');
INSERT INTO `game_history` VALUES (294,13,1,'00:01:30','2024-05-18 16:10:36','2024-05-18 16:10:36','5cde1396-c469-43e6-b4f7-22a125c51d6c');
INSERT INTO `game_history` VALUES (295,13,1,'00:01:30','2024-05-18 16:10:36','2024-05-18 16:10:36','7b123291-9c1c-4988-b656-b2a876f643ca');
INSERT INTO `game_history` VALUES (296,13,1,'00:01:29','2024-05-18 16:10:36','2024-05-18 16:10:36','7fcfae64-b0c9-4000-8cd4-41e8c4376909');
INSERT INTO `game_history` VALUES (297,13,1,'00:01:29','2024-05-18 16:10:36','2024-05-18 16:10:36','a660797c-7520-4573-ac96-ee6c5a95de59');
INSERT INTO `game_history` VALUES (298,13,1,'00:01:29','2024-05-18 16:10:37','2024-05-18 16:10:37','2ac740cd-ad31-44f3-b7a1-b1b715e8183c');
INSERT INTO `game_history` VALUES (299,13,1,'00:01:29','2024-05-18 16:10:37','2024-05-18 16:10:37','e7b03745-7981-4516-8376-5fda967b8f21');
INSERT INTO `game_history` VALUES (300,13,1,'00:01:29','2024-05-18 16:10:37','2024-05-18 16:10:37','b3737e33-8a89-4dca-b383-e638fafdf8e1');
INSERT INTO `game_history` VALUES (301,13,1,'00:01:28','2024-05-18 16:10:37','2024-05-18 16:10:37','7ccbd446-57e5-4e39-b2da-62d17d693ff6');
INSERT INTO `game_history` VALUES (302,13,1,'00:01:28','2024-05-18 16:10:38','2024-05-18 16:10:38','dc78f75e-c7b0-4434-ace1-3a900574a4a2');
INSERT INTO `game_history` VALUES (303,13,1,'00:01:28','2024-05-18 16:10:38','2024-05-18 16:10:38','cb956a60-c06d-4dee-aba2-bf63ca0f4b76');
INSERT INTO `game_history` VALUES (304,13,1,'00:01:28','2024-05-18 16:10:38','2024-05-18 16:10:38','bd0009e3-796c-4883-860f-3e2d7db338e4');
INSERT INTO `game_history` VALUES (305,13,1,'00:01:27','2024-05-18 16:10:38','2024-05-18 16:10:38','f4f5f3c7-67be-4bec-a952-d0eafa9d16cb');
INSERT INTO `game_history` VALUES (306,13,1,'00:01:27','2024-05-18 16:10:39','2024-05-18 16:10:39','f9cf4f9f-0b75-49a7-90a4-9240bf323dab');
INSERT INTO `game_history` VALUES (307,13,1,'00:01:27','2024-05-18 16:10:39','2024-05-18 16:10:39','3b0851e2-2473-49ac-8101-ec7451165ee0');
INSERT INTO `game_history` VALUES (308,13,1,'00:01:27','2024-05-18 16:10:40','2024-05-18 16:10:40','699f938c-ab8f-470e-835e-68693446d23f');
INSERT INTO `game_history` VALUES (309,13,1,'00:01:27','2024-05-18 16:10:40','2024-05-18 16:10:40','fa6883ea-f7fc-4d0e-ac77-daeb4c07006a');
INSERT INTO `game_history` VALUES (310,13,1,'00:01:27','2024-05-18 16:10:41','2024-05-18 16:10:41','49791d32-7e3d-4e64-a68d-aa4979161f1d');
INSERT INTO `game_history` VALUES (311,13,1,'00:01:27','2024-05-18 16:10:41','2024-05-18 16:10:41','88ede1fd-8078-4e0a-99a0-eedf5e9f6bdf');
INSERT INTO `game_history` VALUES (312,13,1,'00:01:27','2024-05-18 16:10:41','2024-05-18 16:10:41','64e4dcc3-f431-4001-8203-43204d14735e');
INSERT INTO `game_history` VALUES (313,13,1,'00:02:50','2024-05-18 16:11:19','2024-05-18 16:11:19','c5eb3026-2585-4e3a-a07d-f1d5c3c41065');
INSERT INTO `game_history` VALUES (314,13,1,'00:02:50','2024-05-18 16:11:20','2024-05-18 16:11:20','ebb52af7-51f0-484b-accb-65fd62d585e0');
INSERT INTO `game_history` VALUES (315,13,1,'00:02:49','2024-05-18 16:11:20','2024-05-18 16:11:20','5c102e65-8322-4781-9605-0488caf27072');
INSERT INTO `game_history` VALUES (316,54,1,'00:03:41','2024-05-18 16:11:24','2024-05-18 16:11:24','f49abc08-a617-4c50-9f84-956e8092046d');
INSERT INTO `game_history` VALUES (317,54,1,'00:03:41','2024-05-18 16:11:25','2024-05-18 16:11:25','4b63f1cd-038a-4e55-8d6c-75d2b2dda8da');
INSERT INTO `game_history` VALUES (318,54,1,'00:03:41','2024-05-18 16:11:25','2024-05-18 16:11:25','0d4b82ae-2d7c-4644-8ab0-27471e80f3c8');
INSERT INTO `game_history` VALUES (319,54,1,'00:03:41','2024-05-18 16:11:25','2024-05-18 16:11:25','312738fb-062d-483c-bcad-05f3e5fc787c');
INSERT INTO `game_history` VALUES (320,54,1,'00:03:40','2024-05-18 16:11:25','2024-05-18 16:11:25','db7d3e5b-9216-4e40-83ea-a240fc3965ad');
INSERT INTO `game_history` VALUES (321,54,1,'00:03:40','2024-05-18 16:11:26','2024-05-18 16:11:26','b77906fc-35b3-461a-9620-221eec3f8de7');
INSERT INTO `game_history` VALUES (322,54,1,'00:03:40','2024-05-18 16:11:26','2024-05-18 16:11:26','11ae9d49-e462-4c93-a6d2-0a282dd807f1');
INSERT INTO `game_history` VALUES (323,54,1,'00:03:40','2024-05-18 16:11:26','2024-05-18 16:11:26','b6da806b-c2b4-4347-9e2c-60580a867a4c');
INSERT INTO `game_history` VALUES (324,54,1,'00:03:40','2024-05-18 16:11:27','2024-05-18 16:11:27','be559022-281a-4aef-a822-6e026e9c6e78');
INSERT INTO `game_history` VALUES (325,54,1,'00:03:40','2024-05-18 16:11:27','2024-05-18 16:11:27','b49eb7a1-cbb2-4b8e-aa52-fa09d501d640');
INSERT INTO `game_history` VALUES (326,54,1,'00:03:40','2024-05-18 16:11:28','2024-05-18 16:11:28','edc03697-463c-46b6-99c9-17285cc1569d');
INSERT INTO `game_history` VALUES (327,54,1,'00:03:40','2024-05-18 16:11:28','2024-05-18 16:11:28','e6ad3158-5fd7-42a6-a6d3-07b54e280030');
INSERT INTO `game_history` VALUES (328,54,1,'00:03:40','2024-05-18 16:11:28','2024-05-18 16:11:28','6c843bfe-0043-4092-9a84-5c1f0e6e5d39');
INSERT INTO `game_history` VALUES (329,54,1,'00:03:40','2024-05-18 16:11:28','2024-05-18 16:11:28','a58215da-cb62-440d-bc2a-9917a1ba2a5c');
INSERT INTO `game_history` VALUES (330,54,1,'00:03:40','2024-05-18 16:11:29','2024-05-18 16:11:29','3ad9b87d-467e-4163-9922-cb077d003c36');
INSERT INTO `game_history` VALUES (331,54,1,'00:03:40','2024-05-18 16:11:29','2024-05-18 16:11:29','363026ec-41c9-4dde-8428-224cde26a9b6');
INSERT INTO `game_history` VALUES (332,54,1,'00:03:39','2024-05-18 16:11:29','2024-05-18 16:11:29','4b71223d-2a8c-40ce-94d1-d949bc624c30');
INSERT INTO `game_history` VALUES (333,54,1,'00:03:39','2024-05-18 16:11:29','2024-05-18 16:11:29','c837e502-c5b4-4462-bd98-52e0aceb9b88');
INSERT INTO `game_history` VALUES (334,54,1,'00:03:39','2024-05-18 16:11:29','2024-05-18 16:11:29','122068db-ec03-49bd-82cd-47c62f73f029');
INSERT INTO `game_history` VALUES (335,54,1,'00:03:39','2024-05-18 16:11:29','2024-05-18 16:11:29','4ce40e2e-f7eb-49a8-b4d2-11300b09a297');
INSERT INTO `game_history` VALUES (336,54,1,'00:03:39','2024-05-18 16:11:30','2024-05-18 16:11:30','940ef834-4561-45a6-acf9-79b1b75d4a5e');
INSERT INTO `game_history` VALUES (337,54,1,'00:03:39','2024-05-18 16:11:30','2024-05-18 16:11:30','ad84eadb-9321-4fab-ac7b-c46f07dc9e18');
INSERT INTO `game_history` VALUES (338,54,1,'00:03:39','2024-05-18 16:11:30','2024-05-18 16:11:30','6deb54a3-a5af-4a86-85ff-49fd0ecff158');
INSERT INTO `game_history` VALUES (339,54,1,'00:03:39','2024-05-18 16:11:31','2024-05-18 16:11:31','ef170f60-6276-401a-8468-b705b6fef3b1');
INSERT INTO `game_history` VALUES (340,54,1,'00:03:39','2024-05-18 16:11:31','2024-05-18 16:11:31','c5855044-60d8-4561-b45f-63759a9a6463');
INSERT INTO `game_history` VALUES (341,54,1,'00:03:39','2024-05-18 16:11:31','2024-05-18 16:11:31','319cc979-76aa-4432-b1e1-cfafd475f9ad');
INSERT INTO `game_history` VALUES (342,54,1,'00:03:39','2024-05-18 16:11:31','2024-05-18 16:11:31','b37bba71-4ddb-49be-8c9d-729622210915');
INSERT INTO `game_history` VALUES (343,54,1,'00:03:39','2024-05-18 16:11:31','2024-05-18 16:11:31','590fa366-1491-4c6d-b64e-669930449520');
INSERT INTO `game_history` VALUES (344,54,1,'00:03:39','2024-05-18 16:11:32','2024-05-18 16:11:32','2d7a8571-c757-461d-beb4-9e5618b12bbf');
INSERT INTO `game_history` VALUES (345,54,1,'00:03:39','2024-05-18 16:11:32','2024-05-18 16:11:32','2ce5ae0b-4423-4245-93ef-6191530ac13a');
INSERT INTO `game_history` VALUES (346,54,1,'00:03:39','2024-05-18 16:11:32','2024-05-18 16:11:32','91cde402-279f-409f-b365-3f0bd134bad8');
INSERT INTO `game_history` VALUES (347,54,1,'00:03:39','2024-05-18 16:11:32','2024-05-18 16:11:32','125964fc-9564-4d7c-80f7-52de1b70a712');
INSERT INTO `game_history` VALUES (348,54,1,'00:03:39','2024-05-18 16:11:32','2024-05-18 16:11:32','94e6acf3-d484-4e4e-b4d2-5f17967e8d2e');
INSERT INTO `game_history` VALUES (349,54,1,'00:03:39','2024-05-18 16:11:32','2024-05-18 16:11:32','ba4725d1-484c-4aa7-ab83-050719016860');
INSERT INTO `game_history` VALUES (350,54,1,'00:03:38','2024-05-18 16:11:33','2024-05-18 16:11:33','5adf5fe0-4909-4ae7-8508-cbacab3b6e99');
INSERT INTO `game_history` VALUES (351,54,1,'00:03:38','2024-05-18 16:11:33','2024-05-18 16:11:33','4fb9a576-b3b7-457d-b443-3aba2f022bad');
INSERT INTO `game_history` VALUES (352,54,1,'00:03:38','2024-05-18 16:11:33','2024-05-18 16:11:33','2034a328-c837-4c78-ad08-5d82ed0d1933');
INSERT INTO `game_history` VALUES (353,54,1,'00:03:38','2024-05-18 16:11:33','2024-05-18 16:11:33','f4d3f5f8-7728-4937-a7ac-b62a66109c20');
INSERT INTO `game_history` VALUES (354,54,1,'00:03:38','2024-05-18 16:11:34','2024-05-18 16:11:34','8856d697-31d2-434f-a15c-b4e8d9d7405b');
INSERT INTO `game_history` VALUES (355,54,1,'00:03:38','2024-05-18 16:11:34','2024-05-18 16:11:34','64816f4c-f8cc-4201-9ee8-6a1b35e15d1f');
INSERT INTO `game_history` VALUES (356,54,1,'00:03:38','2024-05-18 16:11:34','2024-05-18 16:11:34','d58d2b2f-d8e6-411d-af2c-81a1bff92179');
INSERT INTO `game_history` VALUES (357,54,1,'00:03:38','2024-05-18 16:11:34','2024-05-18 16:11:34','af14f837-c778-479e-840a-f5991c5696d0');
INSERT INTO `game_history` VALUES (358,54,1,'00:03:38','2024-05-18 16:11:34','2024-05-18 16:11:34','f7298818-f4a1-40a0-b755-0a12dced7233');
INSERT INTO `game_history` VALUES (359,54,1,'00:03:38','2024-05-18 16:11:34','2024-05-18 16:11:34','b837e31c-c2b0-4824-a0b4-3d092707c113');
INSERT INTO `game_history` VALUES (360,54,1,'00:03:38','2024-05-18 16:11:35','2024-05-18 16:11:35','cd61e82c-5e8d-49b1-84b4-1f219c9f9bfc');
INSERT INTO `game_history` VALUES (361,54,1,'00:03:38','2024-05-18 16:11:35','2024-05-18 16:11:35','66376f07-1b07-49da-ae32-e9fa38a1d4b4');
INSERT INTO `game_history` VALUES (362,54,1,'00:03:38','2024-05-18 16:11:35','2024-05-18 16:11:35','bedc5ced-140a-42b3-ae6b-5e13afb647c8');
INSERT INTO `game_history` VALUES (363,54,1,'00:03:38','2024-05-18 16:11:35','2024-05-18 16:11:35','9681015f-ae71-4047-a04b-f7504bd451cd');
INSERT INTO `game_history` VALUES (364,54,1,'00:03:38','2024-05-18 16:11:35','2024-05-18 16:11:35','139b1594-68bb-4aec-9653-688a84d38c1c');
INSERT INTO `game_history` VALUES (365,54,1,'00:03:38','2024-05-18 16:11:36','2024-05-18 16:11:36','ff4c9488-233f-4bbd-b836-3b9493abd56d');
INSERT INTO `game_history` VALUES (366,54,1,'00:03:38','2024-05-18 16:11:36','2024-05-18 16:11:36','2ce6bd71-108e-45b4-8055-1f5edfab0b25');
INSERT INTO `game_history` VALUES (367,54,1,'00:03:38','2024-05-18 16:11:36','2024-05-18 16:11:36','cefd29c9-c9a9-403d-a76f-c4bb0691f19a');
INSERT INTO `game_history` VALUES (368,54,1,'00:03:38','2024-05-18 16:11:36','2024-05-18 16:11:36','4a795ded-adb2-4ecc-9cdc-8e26b3f5ffac');
INSERT INTO `game_history` VALUES (369,54,1,'00:03:38','2024-05-18 16:11:36','2024-05-18 16:11:36','ca0aaa22-ad91-43c5-8ddb-4a032b29c22d');
INSERT INTO `game_history` VALUES (370,54,1,'00:03:38','2024-05-18 16:11:36','2024-05-18 16:11:36','1e00fd66-cc2e-4656-b172-dffa036c04cb');
INSERT INTO `game_history` VALUES (371,54,1,'00:03:38','2024-05-18 16:11:37','2024-05-18 16:11:37','ea8f914d-2937-4850-90d2-4c6f6e0b099d');
INSERT INTO `game_history` VALUES (372,54,1,'00:03:38','2024-05-18 16:11:37','2024-05-18 16:11:37','fbc81ad3-9968-425a-af87-ae553480da9c');
INSERT INTO `game_history` VALUES (373,54,1,'00:03:38','2024-05-18 16:11:37','2024-05-18 16:11:37','20af194b-a420-4456-9ab6-c5b307b68161');
INSERT INTO `game_history` VALUES (374,54,1,'00:03:38','2024-05-18 16:11:37','2024-05-18 16:11:37','d6239304-b15d-43ae-af90-eeab71ce4a2d');
INSERT INTO `game_history` VALUES (375,54,1,'00:03:38','2024-05-18 16:11:37','2024-05-18 16:11:37','e2927206-7063-47d9-956f-cf4129424d21');
INSERT INTO `game_history` VALUES (376,54,1,'00:03:38','2024-05-18 16:11:37','2024-05-18 16:11:37','bda0faa8-6794-431f-be74-14189fb5a636');
INSERT INTO `game_history` VALUES (377,54,1,'00:03:38','2024-05-18 16:11:38','2024-05-18 16:11:38','4cd848b4-6a1c-42ea-a7d4-bbc7957a572e');
INSERT INTO `game_history` VALUES (378,54,1,'00:03:38','2024-05-18 16:11:38','2024-05-18 16:11:38','a32c6072-e5a5-405f-802e-a7433dc7bb8e');
INSERT INTO `game_history` VALUES (379,54,1,'00:03:38','2024-05-18 16:11:38','2024-05-18 16:11:38','27c894fb-4197-4fc5-ad7c-6ec46f246d97');
INSERT INTO `game_history` VALUES (380,54,1,'00:03:37','2024-05-18 16:11:46','2024-05-18 16:11:46','09da6695-5293-446f-b7c4-467fc2748856');
INSERT INTO `game_history` VALUES (381,54,1,'00:03:37','2024-05-18 16:11:46','2024-05-18 16:11:46','bd785614-cec5-428a-a8b8-34d833900a23');
INSERT INTO `game_history` VALUES (382,54,1,'00:03:37','2024-05-18 16:11:46','2024-05-18 16:11:46','cb639cd0-003b-4cf1-b603-36af7648898a');
INSERT INTO `game_history` VALUES (383,54,1,'00:03:37','2024-05-18 16:11:47','2024-05-18 16:11:47','48affca1-3a95-456d-a47f-06f9852211b6');
INSERT INTO `game_history` VALUES (384,54,1,'00:03:37','2024-05-18 16:11:47','2024-05-18 16:11:47','f1121683-ab58-491f-ac31-d3e2c88fe9c8');
INSERT INTO `game_history` VALUES (385,54,1,'00:03:37','2024-05-18 16:11:47','2024-05-18 16:11:47','fb3cd551-8382-42de-9376-9d62c12eef23');
INSERT INTO `game_history` VALUES (386,54,1,'00:03:37','2024-05-18 16:11:47','2024-05-18 16:11:47','61b88adf-7408-4853-91ac-741cacc716d2');
INSERT INTO `game_history` VALUES (387,54,1,'00:03:37','2024-05-18 16:11:47','2024-05-18 16:11:47','af785195-b195-4642-808e-07f8d43c5ae8');
INSERT INTO `game_history` VALUES (388,54,1,'00:03:37','2024-05-18 16:11:47','2024-05-18 16:11:47','6f14088e-2c2f-482c-8f31-5dd1915ec5c9');
INSERT INTO `game_history` VALUES (389,54,1,'00:03:36','2024-05-18 16:11:48','2024-05-18 16:11:48','0273af36-d30a-4836-8716-c172c94e1734');
INSERT INTO `game_history` VALUES (390,54,1,'00:03:36','2024-05-18 16:11:48','2024-05-18 16:11:48','71cc5933-4428-45a7-8e6f-3e5a18201654');
INSERT INTO `game_history` VALUES (391,54,1,'00:03:36','2024-05-18 16:11:48','2024-05-18 16:11:48','a1b107e6-ec4d-49cd-8ab1-6ae64fdd0d18');
INSERT INTO `game_history` VALUES (392,54,1,'00:03:36','2024-05-18 16:11:48','2024-05-18 16:11:48','322a619d-d644-4596-aac3-8b339c69aa13');
INSERT INTO `game_history` VALUES (393,54,1,'00:03:36','2024-05-18 16:11:48','2024-05-18 16:11:48','38f7471e-bfde-424a-be50-5e59c25755dc');
INSERT INTO `game_history` VALUES (394,54,1,'00:03:36','2024-05-18 16:11:48','2024-05-18 16:11:48','80c7b00c-43f1-4fb9-8ba5-0fef5689ee97');
INSERT INTO `game_history` VALUES (395,54,1,'00:03:35','2024-05-18 16:11:49','2024-05-18 16:11:49','135876cf-de96-4331-add9-bb046ba77cb9');
INSERT INTO `game_history` VALUES (396,54,1,'00:03:35','2024-05-18 16:11:49','2024-05-18 16:11:49','a20b1936-e913-45f7-b3ea-14138333446a');
INSERT INTO `game_history` VALUES (397,54,1,'00:03:35','2024-05-18 16:11:49','2024-05-18 16:11:49','e624a5bd-eef3-4e8a-a1f5-f782c3ab73c7');
INSERT INTO `game_history` VALUES (398,54,1,'00:03:35','2024-05-18 16:11:49','2024-05-18 16:11:49','25335dad-4e1c-415a-aea8-68dc2fa2fdae');
INSERT INTO `game_history` VALUES (399,54,1,'00:03:35','2024-05-18 16:11:49','2024-05-18 16:11:49','468f1391-9016-4bd8-9e4c-ab4e9efa28b9');
INSERT INTO `game_history` VALUES (400,54,1,'00:03:35','2024-05-18 16:11:50','2024-05-18 16:11:50','755b3a65-ad36-4910-9d7f-b92a8e12dda4');
INSERT INTO `game_history` VALUES (401,54,1,'00:03:34','2024-05-18 16:11:50','2024-05-18 16:11:50','6d9a8549-4e27-4c85-af7b-fb9e0471f04c');
INSERT INTO `game_history` VALUES (402,54,1,'00:03:34','2024-05-18 16:11:50','2024-05-18 16:11:50','1f3de12c-ed43-440e-abcd-4e33276b9956');
INSERT INTO `game_history` VALUES (403,54,1,'00:03:34','2024-05-18 16:11:50','2024-05-18 16:11:50','0f8b4ed7-8475-4055-bc86-91819cd7f789');
INSERT INTO `game_history` VALUES (404,54,1,'00:03:34','2024-05-18 16:11:50','2024-05-18 16:11:50','601feca2-a1fd-47f9-9f6b-5d814231a39c');
INSERT INTO `game_history` VALUES (405,54,1,'00:03:34','2024-05-18 16:11:50','2024-05-18 16:11:50','24bcba50-e417-4143-91c5-dc44a8a675f6');
INSERT INTO `game_history` VALUES (406,54,1,'00:03:34','2024-05-18 16:11:51','2024-05-18 16:11:51','01698cf2-a8b4-4753-bc76-ff9fe825955a');
INSERT INTO `game_history` VALUES (407,54,1,'00:03:34','2024-05-18 16:11:51','2024-05-18 16:11:51','06ef74d2-0cce-4fe2-86fb-8d412278bd72');
INSERT INTO `game_history` VALUES (408,54,1,'00:03:34','2024-05-18 16:11:51','2024-05-18 16:11:51','73918a1b-9645-4524-9306-f4acc4c22662');
INSERT INTO `game_history` VALUES (409,54,1,'00:04:47','2024-05-18 16:12:41','2024-05-18 16:12:41','aa632a8b-ff88-41e2-9b66-df68cf56cbc2');
INSERT INTO `game_history` VALUES (410,54,1,'00:04:47','2024-05-18 16:12:42','2024-05-18 16:12:42','a58893ca-6eea-4d9c-9f64-b22eaaa1263d');
INSERT INTO `game_history` VALUES (411,54,1,'00:04:47','2024-05-18 16:12:42','2024-05-18 16:12:42','59ec9557-d23d-4208-b2d8-ec93bbc23772');
INSERT INTO `game_history` VALUES (412,54,1,'00:04:47','2024-05-18 16:12:42','2024-05-18 16:12:42','785765cf-47e1-4c95-a656-ddae86808bef');
INSERT INTO `game_history` VALUES (413,54,1,'00:04:43','2024-05-18 16:12:46','2024-05-18 16:12:46','0d3a1f51-11ca-496e-9bc4-e356e2b16c96');
INSERT INTO `game_history` VALUES (414,54,1,'00:04:41','2024-05-18 16:12:49','2024-05-18 16:12:49','5d3f85ae-0495-4c0f-8c24-32f0582698fe');
INSERT INTO `game_history` VALUES (415,13,1,'00:03:18','2024-05-18 16:12:54','2024-05-18 16:12:54','6d9f61bc-4b09-4e6d-a46b-01dfc7e46776');
INSERT INTO `game_history` VALUES (416,54,1,'00:04:31','2024-05-18 16:13:02','2024-05-18 16:13:02','326baf71-a637-4c61-aa8f-495bad0f6986');
INSERT INTO `game_history` VALUES (417,54,1,'00:04:31','2024-05-18 16:13:02','2024-05-18 16:13:02','102ec1f3-61b5-4513-b207-d3f74d833f63');
INSERT INTO `game_history` VALUES (418,54,1,'00:04:31','2024-05-18 16:13:03','2024-05-18 16:13:03','b7867f09-32d4-43d9-97db-b1f81d2aad8c');
INSERT INTO `game_history` VALUES (419,54,1,'00:04:31','2024-05-18 16:13:03','2024-05-18 16:13:03','ff96017f-c754-4067-92cb-9be6c4ead638');
INSERT INTO `game_history` VALUES (420,54,1,'00:04:31','2024-05-18 16:13:04','2024-05-18 16:13:04','1bb88d38-1c08-4a29-907f-44e1249489e3');
INSERT INTO `game_history` VALUES (421,54,1,'00:04:31','2024-05-18 16:13:04','2024-05-18 16:13:04','72b2bbdb-4423-40a2-ae27-2a5aaee8ffc5');
INSERT INTO `game_history` VALUES (422,54,1,'00:04:31','2024-05-18 16:13:04','2024-05-18 16:13:04','f373ed98-ec70-446b-8e9d-11ada6e2e830');
INSERT INTO `game_history` VALUES (423,54,1,'00:04:31','2024-05-18 16:13:04','2024-05-18 16:13:04','10d94c8f-ba1c-4974-a702-81b8c0974b9c');
INSERT INTO `game_history` VALUES (424,54,1,'00:04:31','2024-05-18 16:13:05','2024-05-18 16:13:05','a7d58490-52ba-4334-ba03-af535881fe1b');
INSERT INTO `game_history` VALUES (425,54,1,'00:04:31','2024-05-18 16:13:05','2024-05-18 16:13:05','b5094eae-89f2-4d78-a2c6-80e9618331b8');
INSERT INTO `game_history` VALUES (426,54,1,'00:04:29','2024-05-18 16:13:07','2024-05-18 16:13:07','0097078a-f00a-4cec-804a-d406dc90e296');
INSERT INTO `game_history` VALUES (427,54,1,'00:04:29','2024-05-18 16:13:07','2024-05-18 16:13:07','8c7b3ac5-a2a4-459b-a68c-b39dbe182f2a');
INSERT INTO `game_history` VALUES (428,54,1,'00:04:29','2024-05-18 16:13:08','2024-05-18 16:13:08','5db72632-6576-4ef6-b2bd-b759a857118f');
INSERT INTO `game_history` VALUES (429,54,1,'00:04:29','2024-05-18 16:13:08','2024-05-18 16:13:08','f06e38c4-5fc2-41a4-b7c7-dd932163273b');
INSERT INTO `game_history` VALUES (430,54,1,'00:04:28','2024-05-18 16:13:11','2024-05-18 16:13:11','bda426dc-4832-4881-a248-03a771468cd4');
INSERT INTO `game_history` VALUES (431,54,1,'00:04:28','2024-05-18 16:13:11','2024-05-18 16:13:11','b4948725-88e5-4f5e-9ca8-b009c73fe7ef');
INSERT INTO `game_history` VALUES (432,54,1,'00:04:28','2024-05-18 16:13:14','2024-05-18 16:13:14','8607a406-35da-482f-bbfb-25a5c011a54e');
INSERT INTO `game_history` VALUES (433,54,1,'00:04:28','2024-05-18 16:13:14','2024-05-18 16:13:14','2c0b7a33-5604-4c8b-ae00-4b38b5243290');
INSERT INTO `game_history` VALUES (434,54,1,'00:04:28','2024-05-18 16:13:14','2024-05-18 16:13:14','b204b950-3404-48d0-805d-ff37bfeaa5db');
INSERT INTO `game_history` VALUES (435,54,1,'00:04:28','2024-05-18 16:13:14','2024-05-18 16:13:14','455c4227-3174-4216-930f-414c9330b31a');
INSERT INTO `game_history` VALUES (436,54,1,'00:04:27','2024-05-18 16:13:14','2024-05-18 16:13:14','6b3fcb58-0797-4734-a620-50d37ac9d992');
INSERT INTO `game_history` VALUES (437,54,1,'00:04:27','2024-05-18 16:13:15','2024-05-18 16:13:15','bb92f112-a004-4b4f-ab3d-b6031f865f84');
INSERT INTO `game_history` VALUES (438,54,1,'00:04:27','2024-05-18 16:13:15','2024-05-18 16:13:15','333c14e8-e0ca-48b7-ba5c-accd567e3eb9');
INSERT INTO `game_history` VALUES (439,54,1,'00:04:27','2024-05-18 16:13:15','2024-05-18 16:13:15','e0df7b50-ea83-411a-87e9-3f4cb605c6bf');
INSERT INTO `game_history` VALUES (440,54,1,'00:04:27','2024-05-18 16:13:15','2024-05-18 16:13:15','cec093f7-7ad3-4d32-9502-a5bea7de0b5e');
INSERT INTO `game_history` VALUES (441,54,1,'00:04:27','2024-05-18 16:13:15','2024-05-18 16:13:15','54d2e789-a043-49f7-8def-b1677f2a9b47');
INSERT INTO `game_history` VALUES (442,54,1,'00:04:27','2024-05-18 16:13:15','2024-05-18 16:13:15','77d4fe80-b970-4a4c-b8ca-3789b4010d9e');
INSERT INTO `game_history` VALUES (443,54,1,'00:04:27','2024-05-18 16:13:16','2024-05-18 16:13:16','df4b8cfc-7283-471a-ab9b-eea6bf01e207');
INSERT INTO `game_history` VALUES (444,54,1,'00:04:27','2024-05-18 16:13:16','2024-05-18 16:13:16','29f64fa9-90a8-4463-abb4-6c4fb212f7d4');
INSERT INTO `game_history` VALUES (445,54,1,'00:04:27','2024-05-18 16:13:16','2024-05-18 16:13:16','aea276d7-93d4-4cee-b870-3ee780ad5a02');
INSERT INTO `game_history` VALUES (446,54,1,'00:04:27','2024-05-18 16:13:16','2024-05-18 16:13:16','6b6c2b0c-6dba-4c91-9f66-90894d32de42');
INSERT INTO `game_history` VALUES (447,54,1,'00:04:27','2024-05-18 16:13:16','2024-05-18 16:13:16','05c49192-1f3b-4607-aa69-bdad896119ef');
INSERT INTO `game_history` VALUES (448,54,1,'00:04:27','2024-05-18 16:13:16','2024-05-18 16:13:16','5b631424-93eb-4fb2-b99e-92fa198bba5b');
INSERT INTO `game_history` VALUES (449,54,1,'00:04:26','2024-05-18 16:13:17','2024-05-18 16:13:17','3fec92f9-997b-44cd-bee2-46db535f3693');
INSERT INTO `game_history` VALUES (450,54,1,'00:04:26','2024-05-18 16:13:17','2024-05-18 16:13:17','25790321-5259-45ce-b395-a9732cf7c20d');
INSERT INTO `game_history` VALUES (451,54,1,'00:04:26','2024-05-18 16:13:17','2024-05-18 16:13:17','e23c2604-1292-4dd6-8104-21ed459ca531');
INSERT INTO `game_history` VALUES (452,54,1,'00:04:26','2024-05-18 16:13:17','2024-05-18 16:13:17','0f0c8fbc-8517-4872-9007-9accaf9b0676');
INSERT INTO `game_history` VALUES (453,54,1,'00:04:26','2024-05-18 16:13:18','2024-05-18 16:13:18','d5808993-fe00-43f3-b181-cec4ccc881f3');
INSERT INTO `game_history` VALUES (454,54,1,'00:04:25','2024-05-18 16:13:18','2024-05-18 16:13:18','a78b64f7-159c-424b-8cb5-4c12ee7205fd');
INSERT INTO `game_history` VALUES (455,54,1,'00:04:25','2024-05-18 16:13:18','2024-05-18 16:13:18','6af9cedc-1976-4fc8-9de9-e69f93cd9e18');
INSERT INTO `game_history` VALUES (456,54,1,'00:04:25','2024-05-18 16:13:18','2024-05-18 16:13:18','b1d6c1a3-43b8-4a87-9745-3d142966000b');
INSERT INTO `game_history` VALUES (457,54,1,'00:04:25','2024-05-18 16:13:18','2024-05-18 16:13:18','74308fe0-ee39-441a-91a9-c8a21488b231');
INSERT INTO `game_history` VALUES (458,54,1,'00:04:25','2024-05-18 16:13:18','2024-05-18 16:13:18','5930b5a0-522c-4a53-8345-e0308413882f');
INSERT INTO `game_history` VALUES (459,54,1,'00:04:25','2024-05-18 16:13:19','2024-05-18 16:13:19','4cc37809-2c0a-4879-bfd3-cbfa9d36f0fd');
INSERT INTO `game_history` VALUES (460,54,1,'00:04:24','2024-05-18 16:13:19','2024-05-18 16:13:19','17108726-ae5d-43e2-8758-e884ab6df8e7');
INSERT INTO `game_history` VALUES (461,54,1,'00:04:24','2024-05-18 16:13:19','2024-05-18 16:13:19','19dc5b9e-e14d-4c91-b638-3eba08103ae7');
INSERT INTO `game_history` VALUES (462,54,1,'00:04:24','2024-05-18 16:13:19','2024-05-18 16:13:19','71417257-8790-4b2e-b1f8-970e0b7a625b');
INSERT INTO `game_history` VALUES (463,54,1,'00:04:24','2024-05-18 16:13:19','2024-05-18 16:13:19','c61fce38-3e1f-41a5-a947-71c35cc78572');
INSERT INTO `game_history` VALUES (464,54,1,'00:04:24','2024-05-18 16:13:20','2024-05-18 16:13:20','1f0fff41-6bfa-4692-b1f8-8c5e24020e40');
INSERT INTO `game_history` VALUES (465,54,1,'00:04:23','2024-05-18 16:13:20','2024-05-18 16:13:20','e1c2f2ee-55b1-42f2-899b-3b62046b854a');
INSERT INTO `game_history` VALUES (466,54,1,'00:04:02','2024-05-18 16:13:43','2024-05-18 16:13:43','ecd35a9c-d2b7-4986-b9e6-a990d3a512c1');
INSERT INTO `game_history` VALUES (467,54,1,'00:04:02','2024-05-18 16:13:43','2024-05-18 16:13:43','bb3493d4-60cd-447d-8929-0ec1bff09947');
INSERT INTO `game_history` VALUES (468,54,1,'00:05:05','2024-05-18 16:14:43','2024-05-18 16:14:43','1acc9073-b220-4453-a8e6-6b3e862a37c5');
INSERT INTO `game_history` VALUES (469,54,1,'00:06:58','2024-05-18 16:14:50','2024-05-18 16:14:50','dc2266b4-e0ef-4deb-b49f-9de36a491d1b');
INSERT INTO `game_history` VALUES (470,54,1,'00:06:40','2024-05-18 16:15:12','2024-05-18 16:15:12','776dfa7b-d2b9-4b5c-b6cb-9d78dfbce621');
INSERT INTO `game_history` VALUES (471,54,1,'00:06:40','2024-05-18 16:15:13','2024-05-18 16:15:13','c7266ec7-a480-4844-aee5-e901df17eabb');
INSERT INTO `game_history` VALUES (472,54,1,'00:06:40','2024-05-18 16:15:13','2024-05-18 16:15:13','c56ae346-6dc7-459a-9f61-3ef00f9cd839');
INSERT INTO `game_history` VALUES (473,54,1,'00:06:40','2024-05-18 16:15:13','2024-05-18 16:15:13','688533f1-285c-4b41-bff6-cfd7f6b1554b');
INSERT INTO `game_history` VALUES (474,54,1,'00:06:40','2024-05-18 16:15:13','2024-05-18 16:15:13','e00ed001-adec-4781-8baf-514e99506c83');
INSERT INTO `game_history` VALUES (475,54,1,'00:06:40','2024-05-18 16:15:13','2024-05-18 16:15:13','680b32d6-70da-4540-aef5-37bcc66bfbea');
INSERT INTO `game_history` VALUES (476,54,1,'00:06:39','2024-05-18 16:15:13','2024-05-18 16:15:13','c2600263-4db6-4b42-b1aa-873a2c94f254');
INSERT INTO `game_history` VALUES (477,54,1,'00:06:39','2024-05-18 16:15:14','2024-05-18 16:15:14','c936f2bc-b5a2-4cba-b49a-389635acb00e');
INSERT INTO `game_history` VALUES (478,54,1,'00:06:39','2024-05-18 16:15:14','2024-05-18 16:15:14','9961edeb-01cb-4a12-b1dc-1a09f150f4d9');
INSERT INTO `game_history` VALUES (479,54,1,'00:06:39','2024-05-18 16:15:14','2024-05-18 16:15:14','518f58a0-901c-41dd-ba82-929808e58713');
INSERT INTO `game_history` VALUES (480,54,1,'00:06:38','2024-05-18 16:15:16','2024-05-18 16:15:16','fc644d1f-7808-4412-8e5f-c069eb2b64ca');
INSERT INTO `game_history` VALUES (481,54,1,'00:06:38','2024-05-18 16:15:16','2024-05-18 16:15:16','51602f2e-ee61-4b45-a304-df36b52d92d7');
INSERT INTO `game_history` VALUES (482,54,1,'00:06:38','2024-05-18 16:15:16','2024-05-18 16:15:16','e372ca1d-7f2c-4d9a-940f-2ae29b9196c2');
INSERT INTO `game_history` VALUES (483,54,1,'00:06:38','2024-05-18 16:15:16','2024-05-18 16:15:16','84844909-39ef-4258-b418-0c1821604fd9');
INSERT INTO `game_history` VALUES (484,54,1,'00:06:38','2024-05-18 16:15:16','2024-05-18 16:15:16','a396a54f-0433-44cc-b537-b69e17ce908f');
INSERT INTO `game_history` VALUES (485,54,1,'00:06:38','2024-05-18 16:15:17','2024-05-18 16:15:17','fbdc0f98-82bb-4b52-a991-8a97a64e75dd');
INSERT INTO `game_history` VALUES (486,54,1,'00:06:37','2024-05-18 16:15:17','2024-05-18 16:15:17','79d178c2-7d32-4b6d-aa02-0c4fffcab459');
INSERT INTO `game_history` VALUES (487,54,1,'00:06:37','2024-05-18 16:15:17','2024-05-18 16:15:17','bebcb453-788f-4555-be19-2cc0393fc7e5');
INSERT INTO `game_history` VALUES (488,54,1,'00:06:37','2024-05-18 16:15:17','2024-05-18 16:15:17','c01e9459-2003-42ae-84d0-7e5ce2924563');
INSERT INTO `game_history` VALUES (489,54,1,'00:06:37','2024-05-18 16:15:17','2024-05-18 16:15:17','8f47fc1b-430d-4a13-98b7-370151892d39');
INSERT INTO `game_history` VALUES (490,54,1,'00:06:37','2024-05-18 16:15:17','2024-05-18 16:15:17','a17ebc6d-2d6a-4046-a511-83438a31784f');
INSERT INTO `game_history` VALUES (491,54,1,'00:06:37','2024-05-18 16:15:18','2024-05-18 16:15:18','a5bb74f4-5eb7-436d-806d-eb06534f333b');
INSERT INTO `game_history` VALUES (492,54,1,'00:06:36','2024-05-18 16:15:18','2024-05-18 16:15:18','a1317a4b-d44a-4f64-9549-5018c4e73973');
INSERT INTO `game_history` VALUES (493,54,1,'00:06:36','2024-05-18 16:15:18','2024-05-18 16:15:18','cbdedcdd-716e-4884-a99a-b3f6fedf2ea6');
INSERT INTO `game_history` VALUES (494,54,1,'00:06:36','2024-05-18 16:15:18','2024-05-18 16:15:18','0c8485de-5b8e-4c70-94a7-07aa1f3c23f8');
INSERT INTO `game_history` VALUES (495,54,1,'00:06:36','2024-05-18 16:15:18','2024-05-18 16:15:18','ad3dad78-bde7-4512-81ca-c3ee0de106ed');
INSERT INTO `game_history` VALUES (496,54,1,'00:06:36','2024-05-18 16:15:18','2024-05-18 16:15:18','ee3b6934-eff1-4b24-89b4-0f6aec72775c');
INSERT INTO `game_history` VALUES (497,54,1,'00:06:36','2024-05-18 16:15:19','2024-05-18 16:15:19','45308b16-da73-4a3c-96e8-7e67837b8366');
INSERT INTO `game_history` VALUES (498,54,1,'00:06:36','2024-05-18 16:15:19','2024-05-18 16:15:19','a0007744-1da0-4bdc-a70b-61f9e27ec6ce');
INSERT INTO `game_history` VALUES (499,54,1,'00:06:36','2024-05-18 16:15:19','2024-05-18 16:15:19','313fcdd3-1caf-4444-b0d7-005c26853bb5');
INSERT INTO `game_history` VALUES (500,54,1,'00:06:36','2024-05-18 16:15:19','2024-05-18 16:15:19','80b23c59-ecbc-4cf7-b1b0-03a526c0f85d');
INSERT INTO `game_history` VALUES (501,54,1,'00:06:36','2024-05-18 16:15:19','2024-05-18 16:15:19','660f6ae4-2066-4d28-aa14-8ab9c2bd02dd');
INSERT INTO `game_history` VALUES (502,54,1,'00:06:35','2024-05-18 16:15:19','2024-05-18 16:15:19','b167c8f1-5a8d-4be1-ad15-0548083d03c7');
INSERT INTO `game_history` VALUES (503,54,1,'00:06:35','2024-05-18 16:15:20','2024-05-18 16:15:20','a379f5c4-9d45-4b21-b744-009ed80670a0');
INSERT INTO `game_history` VALUES (504,54,1,'00:06:35','2024-05-18 16:15:20','2024-05-18 16:15:20','bf8c8631-f272-4a70-85ba-0a963818aa1c');
INSERT INTO `game_history` VALUES (505,54,1,'00:06:35','2024-05-18 16:15:20','2024-05-18 16:15:20','151dc779-8b12-40f1-849e-f0edaa08742c');
INSERT INTO `game_history` VALUES (506,54,1,'00:06:35','2024-05-18 16:15:20','2024-05-18 16:15:20','b25ba4f2-c2cc-4527-a32d-f30717a10721');
INSERT INTO `game_history` VALUES (507,54,1,'00:06:35','2024-05-18 16:15:20','2024-05-18 16:15:20','286dfb10-c7e1-44ca-abb3-7cf3e32bc682');
INSERT INTO `game_history` VALUES (508,54,1,'00:06:35','2024-05-18 16:15:20','2024-05-18 16:15:20','6199dc9b-d2a1-4db9-bfe9-0b4bc923d086');
INSERT INTO `game_history` VALUES (509,54,1,'00:06:34','2024-05-18 16:15:21','2024-05-18 16:15:21','25efde30-7561-4c90-b87d-7d1c12a31bbe');
INSERT INTO `game_history` VALUES (510,54,1,'00:06:34','2024-05-18 16:15:21','2024-05-18 16:15:21','44e965fe-e54b-47a0-99ac-2d0964f023d6');
INSERT INTO `game_history` VALUES (511,54,1,'00:06:34','2024-05-18 16:15:21','2024-05-18 16:15:21','5432bcf7-9219-4d18-970e-68ff0685c5e2');
INSERT INTO `game_history` VALUES (512,54,1,'00:06:34','2024-05-18 16:15:21','2024-05-18 16:15:21','53461962-52f7-4db8-8197-cd9bc9275846');
INSERT INTO `game_history` VALUES (513,54,1,'00:06:34','2024-05-18 16:15:21','2024-05-18 16:15:21','72effa10-9e26-4c98-8093-6ae21be1373a');
INSERT INTO `game_history` VALUES (514,54,1,'00:06:34','2024-05-18 16:15:21','2024-05-18 16:15:21','abb2941f-1583-4b23-a811-8cfdf3694496');
INSERT INTO `game_history` VALUES (515,54,1,'00:06:34','2024-05-18 16:15:22','2024-05-18 16:15:22','7473bc95-b84b-431c-83fe-58da99ce7881');
INSERT INTO `game_history` VALUES (516,54,1,'00:06:33','2024-05-18 16:15:22','2024-05-18 16:15:22','b08210bf-61f6-4218-acbf-2646f4725d2b');
INSERT INTO `game_history` VALUES (517,54,1,'00:06:33','2024-05-18 16:15:22','2024-05-18 16:15:22','b5d07fc5-a2f0-4bc2-985f-b3461699b2b7');
INSERT INTO `game_history` VALUES (518,54,1,'00:06:08','2024-05-18 16:15:49','2024-05-18 16:15:49','8e977832-b617-4e80-ad4b-ce69f6612674');
INSERT INTO `game_history` VALUES (519,54,1,'00:06:08','2024-05-18 16:15:49','2024-05-18 16:15:49','a8c5f43a-b52e-4ddd-8015-c5417024affa');
INSERT INTO `game_history` VALUES (520,54,1,'00:06:08','2024-05-18 16:15:49','2024-05-18 16:15:49','e1dee7c0-17fe-434d-8261-6d9ff286335a');
INSERT INTO `game_history` VALUES (521,13,1,'00:04:00','2024-05-18 16:18:06','2024-05-18 16:18:06','e95408cb-eb90-40ca-b056-def3d7dd44b4');
INSERT INTO `game_history` VALUES (522,54,1,'00:03:52','2024-05-18 16:18:52','2024-05-18 16:18:52','c29538d6-41d5-4ae3-a820-675ea9e64480');
INSERT INTO `game_history` VALUES (523,54,1,'00:03:52','2024-05-18 16:18:53','2024-05-18 16:18:53','d7ce8543-8403-42df-a744-81d94cee2757');
INSERT INTO `game_history` VALUES (524,54,1,'00:03:52','2024-05-18 16:18:53','2024-05-18 16:18:53','c8f8ff5e-4a54-43f4-81c3-bece8c9401c2');
INSERT INTO `game_history` VALUES (525,54,1,'00:03:52','2024-05-18 16:18:53','2024-05-18 16:18:53','331ebc79-90bd-463b-a5e7-76b46722023b');
INSERT INTO `game_history` VALUES (526,54,1,'00:03:51','2024-05-18 16:18:54','2024-05-18 16:18:54','fc48e96e-eb41-4b49-971b-eca5421b4278');
INSERT INTO `game_history` VALUES (527,54,1,'00:03:46','2024-05-18 16:19:06','2024-05-18 16:19:06','f57c60cb-7215-44f5-a180-84ff6e2a0454');
INSERT INTO `game_history` VALUES (528,54,1,'00:03:46','2024-05-18 16:19:06','2024-05-18 16:19:06','f2f3a3ff-7197-439b-be91-ed936af5d575');
INSERT INTO `game_history` VALUES (529,54,1,'00:03:46','2024-05-18 16:19:06','2024-05-18 16:19:06','a556c4f9-3297-483d-91cb-0370916b4c23');
INSERT INTO `game_history` VALUES (530,54,1,'00:03:46','2024-05-18 16:19:06','2024-05-18 16:19:06','83193b44-c879-4750-bf5f-3d5c8ce47307');
INSERT INTO `game_history` VALUES (531,54,1,'00:03:46','2024-05-18 16:19:06','2024-05-18 16:19:06','08f0e10b-945b-4324-b492-de6806d3b616');
INSERT INTO `game_history` VALUES (532,54,1,'00:03:46','2024-05-18 16:19:06','2024-05-18 16:19:06','f43b7ec1-60db-40b4-86d8-2aa500138c7d');
INSERT INTO `game_history` VALUES (533,54,1,'00:03:46','2024-05-18 16:19:07','2024-05-18 16:19:07','b08859eb-c85f-4ab3-8377-a47b437283f4');
INSERT INTO `game_history` VALUES (534,54,1,'00:03:46','2024-05-18 16:19:07','2024-05-18 16:19:07','828ed372-86ce-42cc-a293-e62b788c0715');
INSERT INTO `game_history` VALUES (535,54,1,'00:03:46','2024-05-18 16:19:08','2024-05-18 16:19:08','ccb942ed-01ce-45ce-b6a1-1b12681359d4');
INSERT INTO `game_history` VALUES (536,54,1,'00:03:46','2024-05-18 16:19:08','2024-05-18 16:19:08','1d496883-2f07-4fbc-bd7a-874088e7a5da');
INSERT INTO `game_history` VALUES (537,54,1,'00:03:46','2024-05-18 16:19:08','2024-05-18 16:19:08','ddbbf5bc-a3f5-4b78-b705-094937741028');
INSERT INTO `game_history` VALUES (538,54,1,'00:03:46','2024-05-18 16:19:08','2024-05-18 16:19:08','bcd3dccf-ef41-4a4e-ae34-7751393d6be8');
INSERT INTO `game_history` VALUES (539,54,1,'00:03:45','2024-05-18 16:19:08','2024-05-18 16:19:08','91ae502e-4690-4c39-9436-a8725272f636');
INSERT INTO `game_history` VALUES (540,54,1,'00:03:45','2024-05-18 16:19:08','2024-05-18 16:19:08','96169ead-bdba-4872-9d65-784787455065');
INSERT INTO `game_history` VALUES (541,54,1,'00:03:45','2024-05-18 16:19:09','2024-05-18 16:19:09','da0461fb-6aa1-43d8-9b60-3658b7ff6cc6');
INSERT INTO `game_history` VALUES (542,54,1,'00:03:45','2024-05-18 16:19:09','2024-05-18 16:19:09','519f2f3f-a9f7-4f90-b35f-383affa49455');
INSERT INTO `game_history` VALUES (543,54,1,'00:03:45','2024-05-18 16:19:09','2024-05-18 16:19:09','aea8b8a8-3a53-4076-9086-8bce09299c32');
INSERT INTO `game_history` VALUES (544,54,1,'00:03:45','2024-05-18 16:19:09','2024-05-18 16:19:09','fb974da4-dd4a-4306-a0b8-80ba46849e86');
INSERT INTO `game_history` VALUES (545,54,1,'00:03:44','2024-05-18 16:19:09','2024-05-18 16:19:09','86cf39d9-5482-49a7-aef8-241a08927087');
INSERT INTO `game_history` VALUES (546,54,1,'00:03:44','2024-05-18 16:19:09','2024-05-18 16:19:09','7a5ab3af-cf02-4cce-b5ea-e251c9b1aef2');
INSERT INTO `game_history` VALUES (547,54,1,'00:03:44','2024-05-18 16:19:10','2024-05-18 16:19:10','e1308a12-c6b2-434b-b89b-7e3ec2bd2403');
INSERT INTO `game_history` VALUES (548,54,1,'00:03:44','2024-05-18 16:19:10','2024-05-18 16:19:10','b04e070b-63be-4e88-a9e4-2e152c094700');
INSERT INTO `game_history` VALUES (549,54,1,'00:03:44','2024-05-18 16:19:10','2024-05-18 16:19:10','7e99fe05-669e-4cbb-91c1-8b9b2f228685');
INSERT INTO `game_history` VALUES (550,54,1,'00:03:44','2024-05-18 16:19:10','2024-05-18 16:19:10','3abe32d0-6ce6-4b86-bc2a-f2173244ffee');
INSERT INTO `game_history` VALUES (551,54,1,'00:03:43','2024-05-18 16:19:10','2024-05-18 16:19:10','2d04c60d-f092-434f-b0a7-11af73b9d2bf');
INSERT INTO `game_history` VALUES (552,54,1,'00:03:43','2024-05-18 16:19:10','2024-05-18 16:19:10','31db7a6d-dce6-46cc-be6a-92b1dc424583');
INSERT INTO `game_history` VALUES (553,54,1,'00:03:43','2024-05-18 16:19:11','2024-05-18 16:19:11','dcb6b2e5-2bd2-48f3-9757-fdab2744e148');
INSERT INTO `game_history` VALUES (554,54,1,'00:03:43','2024-05-18 16:19:11','2024-05-18 16:19:11','22fb1239-123f-4fa7-89c9-b29417e9c87f');
INSERT INTO `game_history` VALUES (555,54,1,'00:03:17','2024-05-18 16:19:40','2024-05-18 16:19:40','eeaa427e-bda8-4672-9eb0-340ca3ff4f0b');
INSERT INTO `game_history` VALUES (556,54,1,'00:03:17','2024-05-18 16:19:40','2024-05-18 16:19:40','9eb458c2-51ae-4277-bb82-95fadf4870f3');
INSERT INTO `game_history` VALUES (557,54,1,'00:03:17','2024-05-18 16:19:41','2024-05-18 16:19:41','586d126d-4d13-4480-97b1-2b83fbbed7a1');
INSERT INTO `game_history` VALUES (558,54,1,'00:03:17','2024-05-18 16:19:41','2024-05-18 16:19:41','2922d2fa-909b-4e5c-a9db-9e58e2d2939d');
INSERT INTO `game_history` VALUES (559,54,1,'00:03:17','2024-05-18 16:19:41','2024-05-18 16:19:41','4df27355-8915-4760-adaa-9ad57accc261');
INSERT INTO `game_history` VALUES (560,54,1,'00:03:17','2024-05-18 16:19:42','2024-05-18 16:19:42','0ee90d3e-8997-4b06-86e9-e2527fe4823c');
INSERT INTO `game_history` VALUES (561,54,1,'00:03:17','2024-05-18 16:19:42','2024-05-18 16:19:42','ebf57e7f-ea53-4f4c-ab26-bd191d054806');
INSERT INTO `game_history` VALUES (562,54,1,'00:03:16','2024-05-18 16:19:42','2024-05-18 16:19:42','444073b6-d8f4-4cc5-a1e1-cc1dc8b74448');
INSERT INTO `game_history` VALUES (563,54,1,'00:04:25','2024-05-18 16:20:35','2024-05-18 16:20:35','db428d91-4084-4ae7-b754-1cddf307a4f3');
INSERT INTO `game_history` VALUES (564,54,1,'00:04:25','2024-05-18 16:20:35','2024-05-18 16:20:35','6e350b3c-0db3-48ee-92bc-4fa01522a827');
INSERT INTO `game_history` VALUES (565,54,1,'00:04:25','2024-05-18 16:20:35','2024-05-18 16:20:35','3eae0ebf-4f3e-4932-ad05-be28038786d1');
INSERT INTO `game_history` VALUES (566,54,1,'00:04:25','2024-05-18 16:20:35','2024-05-18 16:20:35','a5511e20-6bfc-43cd-bc06-670a2f59ad16');
INSERT INTO `game_history` VALUES (567,54,1,'00:04:25','2024-05-18 16:20:35','2024-05-18 16:20:35','c22b33dd-a833-41ef-a699-77de5a0c8d2b');
INSERT INTO `game_history` VALUES (568,54,1,'00:04:25','2024-05-18 16:20:36','2024-05-18 16:20:36','814f505e-d97b-4482-b099-953c93c6badc');
INSERT INTO `game_history` VALUES (569,54,1,'00:04:24','2024-05-18 16:20:36','2024-05-18 16:20:36','d8b6345b-b45d-4ad6-b6e7-bfd4be604d2e');
INSERT INTO `game_history` VALUES (570,54,1,'00:04:24','2024-05-18 16:20:36','2024-05-18 16:20:36','1852ed27-e515-478e-acf5-58ff9ac8ad80');
INSERT INTO `game_history` VALUES (571,54,1,'00:04:24','2024-05-18 16:20:37','2024-05-18 16:20:37','d41d18af-ca80-4b0a-8f73-a28345456075');
INSERT INTO `game_history` VALUES (572,54,1,'00:04:24','2024-05-18 16:20:37','2024-05-18 16:20:37','c84f59bd-196f-4e36-bb5b-4796af08a6cf');
INSERT INTO `game_history` VALUES (573,54,1,'00:04:24','2024-05-18 16:20:37','2024-05-18 16:20:37','c460358f-ddbd-4a1c-82f8-451500f2a5e6');
INSERT INTO `game_history` VALUES (574,54,1,'00:04:24','2024-05-18 16:20:37','2024-05-18 16:20:37','28d43b9d-c0e4-43c2-97c5-805182cd3e25');
INSERT INTO `game_history` VALUES (575,54,1,'00:04:24','2024-05-18 16:20:37','2024-05-18 16:20:37','dcaf4908-4572-4b73-9441-60f4d558ce02');
INSERT INTO `game_history` VALUES (576,54,1,'00:04:24','2024-05-18 16:20:37','2024-05-18 16:20:37','45191b0a-e2a6-4354-bdcd-3198f05e4a0e');
INSERT INTO `game_history` VALUES (577,54,1,'00:04:23','2024-05-18 16:20:38','2024-05-18 16:20:38','d8e8b52d-7501-4db0-952b-f89090323bb5');
INSERT INTO `game_history` VALUES (578,54,1,'00:04:23','2024-05-18 16:20:38','2024-05-18 16:20:38','ed4aaaf2-7cab-41c7-8a7f-9367d53a8fa0');
INSERT INTO `game_history` VALUES (579,54,1,'00:04:23','2024-05-18 16:20:38','2024-05-18 16:20:38','ed3fd152-e109-45e8-9eb5-8e83f482b2a9');
INSERT INTO `game_history` VALUES (580,54,1,'00:04:23','2024-05-18 16:20:38','2024-05-18 16:20:38','c7ef38e1-8f30-497c-b23d-093e93c82189');
INSERT INTO `game_history` VALUES (581,54,1,'00:04:19','2024-05-18 16:20:43','2024-05-18 16:20:43','19eed58b-d30f-4a9c-8cee-0468e88d5108');
INSERT INTO `game_history` VALUES (582,54,1,'00:04:19','2024-05-18 16:20:43','2024-05-18 16:20:43','36e28d61-4232-428a-a114-6b9cc8b808d1');
INSERT INTO `game_history` VALUES (583,54,1,'00:04:19','2024-05-18 16:20:44','2024-05-18 16:20:44','2111e22e-0dce-477c-8cc4-4a34eebf4228');
INSERT INTO `game_history` VALUES (584,54,1,'00:04:19','2024-05-18 16:20:44','2024-05-18 16:20:44','75f8937a-13d0-426a-a75c-f3b58814302b');
INSERT INTO `game_history` VALUES (585,54,1,'00:04:19','2024-05-18 16:20:44','2024-05-18 16:20:44','1177e13b-9e91-4a57-9927-1a113ec0d20a');
INSERT INTO `game_history` VALUES (586,54,1,'00:04:19','2024-05-18 16:20:44','2024-05-18 16:20:44','c5ad5a53-b1e2-4088-9f9e-58537208754f');
INSERT INTO `game_history` VALUES (587,54,1,'00:04:19','2024-05-18 16:20:44','2024-05-18 16:20:44','10489943-5010-4b6c-bb51-101a13a73be4');
INSERT INTO `game_history` VALUES (588,54,1,'00:04:19','2024-05-18 16:20:44','2024-05-18 16:20:44','7790f729-62dc-44e2-9cc8-5f579b52d6ad');
INSERT INTO `game_history` VALUES (589,54,1,'00:04:19','2024-05-18 16:20:45','2024-05-18 16:20:45','58db6ad5-726d-4a98-81b2-bc5efc97b5bb');
INSERT INTO `game_history` VALUES (590,54,1,'00:04:19','2024-05-18 16:20:45','2024-05-18 16:20:45','ea87345f-4e43-4a76-bc97-15293f692937');
INSERT INTO `game_history` VALUES (591,54,1,'00:04:19','2024-05-18 16:20:45','2024-05-18 16:20:45','d64d5011-6921-4c85-8561-92c9e2256919');
INSERT INTO `game_history` VALUES (592,54,1,'00:04:19','2024-05-18 16:20:45','2024-05-18 16:20:45','2430b705-7119-479b-ab94-e0c1b263022c');
INSERT INTO `game_history` VALUES (593,13,1,'00:01:40','2024-05-18 16:27:15','2024-05-18 16:27:15','e4b785ca-964c-4f82-bec1-f932c42ea722');
INSERT INTO `game_history` VALUES (594,7,10,'00:05:13','2024-05-18 17:27:15','2024-05-18 17:27:15','8bd2f69a-58c0-4c84-a16d-57475c435a6d');
INSERT INTO `game_history` VALUES (595,29,1,'00:01:40','2024-05-19 04:19:00','2024-05-19 04:19:00','114e7b7a-fa28-434a-a08d-22a645bd44f9');
INSERT INTO `game_history` VALUES (596,13,7,'00:06:25','2024-05-19 09:56:43','2024-05-19 09:56:43','9d46b9b6-85d2-423b-96ab-3c278c56cbee');
INSERT INTO `game_history` VALUES (597,13,7,'00:04:11','2024-05-19 10:19:09','2024-05-19 10:19:09','f5b6bee1-071f-4dbe-97b6-8e77b3072623');
INSERT INTO `game_history` VALUES (598,7,10,'00:06:16','2024-05-19 11:13:13','2024-05-19 11:13:13','2c87bfda-2c00-49d3-81d9-0ab977b85c76');
INSERT INTO `game_history` VALUES (599,12,10,'00:06:51','2024-05-19 12:21:06','2024-05-19 12:21:06','e8f1289d-ce63-4376-a99c-56d26c9e47f7');
INSERT INTO `game_history` VALUES (600,32,10,'00:09:58','2024-05-19 13:37:14','2024-05-19 13:37:14','6ab917b6-c9c3-468c-b181-0892154856e5');
INSERT INTO `game_history` VALUES (601,13,1,'00:08:57','2024-05-19 13:53:15','2024-05-19 13:53:15','925a6b6e-44c5-4b7b-ae0d-47619cd4ae40');
INSERT INTO `game_history` VALUES (602,32,7,'00:04:33','2024-05-19 14:05:43','2024-05-19 14:05:43','17d386be-8c10-493a-b13c-501bf89a38d5');
INSERT INTO `game_history` VALUES (603,32,7,'00:02:03','2024-05-19 14:07:06','2024-05-19 14:07:06','4c4f1481-dea7-48df-8182-c47e63f05b8c');
INSERT INTO `game_history` VALUES (604,32,7,'00:01:45','2024-05-19 14:07:42','2024-05-19 14:07:42','8dfb90df-7917-4cf6-b692-0c4139277d35');
INSERT INTO `game_history` VALUES (605,32,7,'00:03:05','2024-05-19 14:10:00','2024-05-19 14:10:00','70534415-1f06-4eb2-a140-3344d87e2280');
INSERT INTO `game_history` VALUES (606,32,7,'00:02:41','2024-05-19 14:10:41','2024-05-19 14:10:41','5199726c-5bad-493d-ae82-523f1dde0cec');
INSERT INTO `game_history` VALUES (607,32,7,'00:01:45','2024-05-19 14:11:48','2024-05-19 14:11:48','54ed7e60-e359-4299-af9d-a1e7260fcf19');
INSERT INTO `game_history` VALUES (608,13,7,'00:06:17','2024-05-19 14:13:33','2024-05-19 14:13:33','714a4061-ee9d-412f-9914-85716c49845d');
INSERT INTO `game_history` VALUES (609,13,7,'00:06:51','2024-05-19 14:16:25','2024-05-19 14:16:25','b65b1f43-3e72-45c0-8b5c-f10a13c12c07');
INSERT INTO `game_history` VALUES (610,13,7,'00:01:22','2024-05-19 14:19:53','2024-05-19 14:19:53','18b19f6d-f18a-436d-bfcf-f1e893f4a30a');
INSERT INTO `game_history` VALUES (611,39,10,'00:07:50','2024-05-19 15:12:41','2024-05-19 15:12:41','a3c2144f-d39e-4246-addb-c70ebb5bdcbb');
INSERT INTO `game_history` VALUES (612,8,10,'00:04:17','2024-05-19 16:22:51','2024-05-19 16:22:51','b6d3943b-97c9-4ce4-bb5f-14949b3d79b7');
INSERT INTO `game_history` VALUES (613,32,7,'00:02:32','2024-05-19 17:18:50','2024-05-19 17:18:50','77ccb928-4ab3-4328-a2e7-d4117587032a');
INSERT INTO `game_history` VALUES (614,32,7,'00:01:10','2024-05-19 17:19:36','2024-05-19 17:19:36','b51e9f09-96f0-4f91-a83d-d852aa01c67d');
INSERT INTO `game_history` VALUES (615,32,7,'00:01:45','2024-05-19 17:21:12','2024-05-19 17:21:12','4bd2330c-3976-4f8f-9fc8-bdaaa841e914');
INSERT INTO `game_history` VALUES (616,13,1,'00:02:40','2024-05-19 17:21:18','2024-05-19 17:21:18','881e1a5f-d67f-4b9e-98e3-6ade43b2bcfa');
INSERT INTO `game_history` VALUES (617,8,7,'00:01:33','2024-05-19 17:29:47','2024-05-19 17:29:47','611eb93e-5753-4e62-8805-27fe9506938b');
INSERT INTO `game_history` VALUES (618,13,7,'00:01:49','2024-05-19 17:37:21','2024-05-19 17:37:21','c3c80be8-c9f2-4e5b-940b-edf03e2f3cdd');
INSERT INTO `game_history` VALUES (619,13,7,'00:02:48','2024-05-19 17:41:12','2024-05-19 17:41:12','4065b61e-a3ce-472a-a56a-0906d9026031');
INSERT INTO `game_history` VALUES (620,13,7,'00:03:43','2024-05-19 17:42:02','2024-05-19 17:42:02','f833fae0-49b8-4fbd-982c-cb19986aace3');
INSERT INTO `game_history` VALUES (621,13,7,'00:02:21','2024-05-19 17:46:27','2024-05-19 17:46:27','fd3dd190-a570-4280-8084-1a864b32ff57');
INSERT INTO `game_history` VALUES (622,13,7,'00:01:21','2024-05-19 17:47:26','2024-05-19 17:47:26','3bf55607-23c1-4efa-b58f-c03aa8d4417a');
INSERT INTO `game_history` VALUES (623,13,7,'00:01:18','2024-05-19 17:50:12','2024-05-19 17:50:12','11ddd6be-6aeb-4718-91fd-2b5777ffb33a');
INSERT INTO `game_history` VALUES (624,13,7,'00:01:15','2024-05-19 17:51:01','2024-05-19 17:51:01','f6df514d-1863-4d8c-b7df-0cd4b3d3c964');
INSERT INTO `game_history` VALUES (625,13,7,'00:02:24','2024-05-19 18:04:44','2024-05-19 18:04:44','ccfb1137-9a83-41a2-9c1c-3feb40b75afe');
INSERT INTO `game_history` VALUES (626,13,7,'00:00:45','2024-05-19 18:07:04','2024-05-19 18:07:04','eaa6df43-ec83-4e51-a556-8e57d1289096');
INSERT INTO `game_history` VALUES (627,13,7,'00:02:10','2024-05-19 18:08:57','2024-05-19 18:08:57','daf13f66-8726-4149-8a6d-efa5c91a317e');
INSERT INTO `game_history` VALUES (628,13,7,'00:01:49','2024-05-19 18:10:30','2024-05-19 18:10:30','b9bd40ba-9d1d-4f84-b856-466567bb5d6d');
INSERT INTO `game_history` VALUES (629,13,7,'00:00:10','2024-05-19 18:12:59','2024-05-19 18:12:59','6802e26a-6a1a-44c0-8dd4-ead37154b35f');
INSERT INTO `game_history` VALUES (630,13,7,'00:00:40','2024-05-19 18:13:54','2024-05-19 18:13:54','db22b5a7-9074-41ff-87ea-a7f105767aad');
INSERT INTO `game_history` VALUES (631,13,7,'00:00:10','2024-05-19 18:18:01','2024-05-19 18:18:01','6ca01506-4cbc-4976-bf34-e2585df44716');
/*!40000 ALTER TABLE `game_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_character`
--

DROP TABLE IF EXISTS `my_character`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_character` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `character_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_my_character_1` (`user_id`),
  KEY `FK_character_store_TO_my_character_1` (`character_id`),
  CONSTRAINT `FK_character_store_TO_my_character_1` FOREIGN KEY (`character_id`) REFERENCES `character_store` (`id`),
  CONSTRAINT `FK_user_TO_my_character_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_character`
--

LOCK TABLES `my_character` WRITE;
/*!40000 ALTER TABLE `my_character` DISABLE KEYS */;
/*!40000 ALTER TABLE `my_character` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `chat_room_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_user` bigint NOT NULL,
  `uuid` varchar(36) DEFAULT (uuid()),
  `delete_flag` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_participants_1` (`user_id`),
  KEY `FK_user_TO_participants_2` (`updated_user`),
  KEY `FK_chat_room_TO_participants` (`chat_room_id`),
  CONSTRAINT `FK_chat_room_TO_participants` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_user_TO_participants_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_user_TO_participants_2` FOREIGN KEY (`updated_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hint` varchar(255) DEFAULT NULL COMMENT '힌트',
  `content` varchar(5000) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL COMMENT '퀴즈 이미지',
  `difficulty` int NOT NULL DEFAULT '0',
  `answer` varchar(255) NOT NULL COMMENT '정답',
  `type` varchar(255) DEFAULT NULL COMMENT '문제 타입',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  `thema_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_thema_TO_quiz_1` (`thema_id`),
  CONSTRAINT `FK_thema_TO_quiz_1` FOREIGN KEY (`thema_id`) REFERENCES `thema` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (27,'시간을 중점으로 살펴보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/c28935be-3041-4057-bd17-71189f7ba73d_%ED%95%98-1.png',1,'2',NULL,'2024-05-14 03:45:33','2024-05-14 03:45:33','5092075d-987d-4540-af80-2d74611b1b21',2);
INSERT INTO `quiz` VALUES (28,'시간을 중점으로 살펴보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/b1165280-c7bb-4a54-8fa7-cabda5c42b1c_%ED%95%98-1.png',1,'2',NULL,'2024-05-14 03:46:58','2024-05-14 03:46:58','a26bb132-bfaa-4e20-832f-ee8bc8932d9a',2);
INSERT INTO `quiz` VALUES (29,'번갈아서 덧셈, 곱셈 해보자.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/d93800c6-c2ba-495f-9190-efe645679b1d_%ED%95%98-2.png',1,'888',NULL,'2024-05-14 03:47:57','2024-05-14 03:47:57','7e44ed87-7c8e-4452-b788-2aae47dba630',2);
INSERT INTO `quiz` VALUES (30,'-1',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/60aef136-30af-4154-8ef2-c86e766d4a2b_%ED%95%98-3.png',1,'12',NULL,'2024-05-14 03:48:28','2024-05-14 03:48:28','3059fdc5-2cb0-4cfa-9f31-e6178f92310e',2);
INSERT INTO `quiz` VALUES (31,'계단 덧셈',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/12837057-394f-4846-8c79-65ddc51b7e4d_%EC%A4%91-1.png',2,'34',NULL,'2024-05-14 03:49:04','2024-05-14 03:49:04','33615669-8e04-4cb7-8690-d59314de1bb3',2);
INSERT INTO `quiz` VALUES (32,'시계',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/a4c78a20-edb5-4296-9c99-41d31fef1b0f_%EC%A4%91-2.png',2,'15',NULL,'2024-05-14 03:49:41','2024-05-14 03:49:41','690c0be8-9f54-4c76-b2ed-94ea809a8dc4',2);
INSERT INTO `quiz` VALUES (33,'금요일의 내일은 토요일. 토요일이 어제인 요일 ',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/a2b2ec3e-1b38-456a-bde5-0fae7565dd3f_%EC%A4%91-3.png',2,'일요일',NULL,'2024-05-14 03:50:23','2024-05-14 03:50:23','dc707c74-f7ff-4647-a691-37ad10d906f4',2);
INSERT INTO `quiz` VALUES (34,'덧셈, 뺄',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/6a100620-a728-462d-82f4-d7f9eea3b983_%EC%83%81-1.png',3,'111',NULL,'2024-05-14 03:51:15','2024-05-14 03:51:15','bf738f0b-51a6-4bf9-8e7e-62bc69a49577',2);
INSERT INTO `quiz` VALUES (35,'사이에 있는 특정 숫자의 개수',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/1452d5c8-d4ff-4605-978f-4ef1d25faf8e_%EC%83%81%20-2.png',3,'4',NULL,'2024-05-14 03:51:46','2024-05-14 03:51:46','172ae041-1068-4e65-bd98-490398fcb191',2);
INSERT INTO `quiz` VALUES (36,'7단',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/5ae01241-c91f-4a5d-8351-8c5eeb15bc63_%EC%83%81-3.png',3,'5',NULL,'2024-05-14 03:52:09','2024-05-14 03:52:09','ef395c9f-4bd7-4f13-8f41-666f00d88039',2);
INSERT INTO `quiz` VALUES (37,'특정 숫자의 개수',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/ec2c7e56-cac6-4b6a-8491-da3fcc0236ea_%ED%95%98%ED%95%98-1.png',1,'1',NULL,'2024-05-14 03:56:04','2024-05-14 03:56:04','51c5cd90-6f47-4060-a333-088445f276b1',3);
INSERT INTO `quiz` VALUES (38,'1과 2중에 한 명은 거짓말을 하고 있다.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/601d14d6-61a1-41b2-bbd5-1861013c0b70_%ED%95%98%ED%95%982.png',1,'규현',NULL,'2024-05-14 03:56:41','2024-05-14 03:56:41','06fd6c11-76d6-4cd6-ab3c-eafdd6144e2a',3);
INSERT INTO `quiz` VALUES (39,'나머지',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/f65ea00b-bb4f-421f-b6af-5e9565e1d773_%ED%95%98%ED%95%98-3.png',1,'2',NULL,'2024-05-14 03:57:11','2024-05-14 03:57:11','8bcea7e6-ada3-4801-9015-f15da9948edb',3);
INSERT INTO `quiz` VALUES (40,'거울',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/4eb28b0f-6aa5-486b-8a18-d7f775209602_%EC%A4%91%EC%A4%91-1.png',2,'72804912',NULL,'2024-05-14 03:57:41','2024-05-14 03:57:41','e465cd0c-6745-4005-8b6b-bf807d0ba9ae',3);
INSERT INTO `quiz` VALUES (41,'합집합',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/d2442b35-9e47-4737-92d0-ecd1dfe2e927_%EC%A4%91%EC%A4%91-2.png',2,'8939',NULL,'2024-05-14 03:58:10','2024-05-14 03:58:10','d22e8563-40cc-421f-875b-e569e2dea18b',3);
INSERT INTO `quiz` VALUES (42,'시간',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/1d8e55f7-2ed0-4c96-8325-e0580cfc26c0_%EC%A4%91%EC%A4%91-3.png',2,'805',NULL,'2024-05-14 03:58:36','2024-05-14 03:58:36','690982b7-d85b-41c3-9635-52a5c2e30b03',3);
INSERT INTO `quiz` VALUES (43,'5+3=8',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/82f3371c-25d6-40db-a4ae-348d1fc62a32_%EC%83%81%EC%83%811.png',3,'96534',NULL,'2024-05-14 03:59:21','2024-05-14 03:59:21','5bef6044-d0be-42b0-94f4-54b370db4eba',3);
INSERT INTO `quiz` VALUES (44,'B의 진술이 참인 경우와 D의 진술이 참인 경우로 나눠본다.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/19cbc013-5460-41f1-9566-56278df01817_%EC%83%81%EC%83%812.png',3,'E는 눈이 없다',NULL,'2024-05-14 03:59:44','2024-05-14 03:59:44','69647d6b-5a79-4446-8195-984de1e605a2',3);
INSERT INTO `quiz` VALUES (45,'화요일에 내장을 해부하는 경우와 목요일에 내장을 해부하는 경우로 나누어본다.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/ef1cb12c-bdb1-4a2c-8fad-2a5f9dfb3d00_%EC%83%81%EC%83%813.png',3,'5가지',NULL,'2024-05-14 04:00:12','2024-05-14 04:00:12','8321497b-dda9-4fc0-afb4-f2dfca37200a',3);
INSERT INTO `quiz` VALUES (52,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/cf89a1f2-e277-4b9d-a4dd-b6835ef57d94_%EB%B3%91%EC%A3%BC%ED%95%981.png',1,'1',NULL,'2024-05-16 01:20:08','2024-05-16 01:20:08','3268a691-7783-4936-8d2b-d15d6fc3e783',8);
INSERT INTO `quiz` VALUES (53,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/d347d78b-f73a-45b2-af1d-f31616ed0b7a_%EB%B3%91%EC%A3%BC%ED%95%982.png',1,'2',NULL,'2024-05-16 01:20:32','2024-05-16 01:20:32','c476ef74-ae2e-4106-bb50-d5afe6985d36',8);
INSERT INTO `quiz` VALUES (54,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/d5b9b4e0-d42b-43a3-af7a-50a748411b83_%EB%B3%91%EC%A3%BC%ED%95%983.png',1,'1',NULL,'2024-05-16 01:20:50','2024-05-16 01:20:50','a1497a5f-16d9-4007-8440-5b106f86eb5c',8);
INSERT INTO `quiz` VALUES (55,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/f2bb0c47-c592-49a5-b21d-0b0917b8cb91_%EB%B3%91%EC%A3%BC%EC%A4%911.png',2,'1',NULL,'2024-05-16 01:21:06','2024-05-16 01:21:06','f1eeea8c-83d5-4fb3-9646-f9a1fe1fe1c5',8);
INSERT INTO `quiz` VALUES (56,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/ed22566c-43ee-449d-bf2c-7ea8e0fe76a2_%EB%B3%91%EC%A3%BC%EC%A4%912.png',2,'1',NULL,'2024-05-16 01:21:18','2024-05-16 01:21:18','79d928a0-2366-42a1-8668-eb29dd8812c7',8);
INSERT INTO `quiz` VALUES (57,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/433feac6-18e9-45b0-94b2-c0d62544206e_%EB%B3%91%EC%A3%BC%EC%A4%913.png',2,'1',NULL,'2024-05-16 01:21:30','2024-05-16 01:21:30','08ecbc76-9dd4-49f3-a8ab-7fe278da268d',8);
INSERT INTO `quiz` VALUES (58,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/3c897845-9682-452d-8a90-ddd1f545663c_%EB%B3%91%EC%A3%BC%EC%83%811.png',3,'4',NULL,'2024-05-16 01:21:51','2024-05-16 01:21:51','1c1b2ecb-c211-4fa8-b90d-4a8bdfe5117e',8);
INSERT INTO `quiz` VALUES (59,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/b40c6214-6fc1-4ae0-af72-cd6d2591e457_%EB%B3%91%EC%A3%BC%EC%83%812.png',3,'1',NULL,'2024-05-16 01:22:45','2024-05-16 01:22:45','9cb437d5-24bb-4ba2-8e95-63cea7a8fc0e',8);
INSERT INTO `quiz` VALUES (60,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/7c4be655-4efa-44d1-89b4-9f711135bd38_%EB%B3%91%EC%A3%BC%EC%83%813.png',3,'3',NULL,'2024-05-16 01:22:59','2024-05-16 01:22:59','0fa9f4bc-4374-4006-b93a-1a08c86e9acd',8);
INSERT INTO `quiz` VALUES (61,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/79d8cbc0-4682-4e8d-910f-3e279cef9a94_%ED%94%84%EB%A1%9C%ED%95%981.png',1,'4',NULL,'2024-05-16 01:32:26','2024-05-16 01:32:26','e579b611-d266-49a3-bd2b-421c5f398262',9);
INSERT INTO `quiz` VALUES (62,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/02ba8b95-54bc-421f-ae7f-ce5b5a3b5169_%ED%94%84%EB%A1%9C%ED%95%982.png',1,'3',NULL,'2024-05-16 01:32:46','2024-05-16 01:32:46','b0177c62-6598-42fa-9dcb-21775de6707f',9);
INSERT INTO `quiz` VALUES (63,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/3a06764d-3090-4d69-a429-01016d684bcf_%ED%94%84%EB%A1%9C%ED%95%983.png',1,'3',NULL,'2024-05-16 01:33:03','2024-05-16 01:33:03','9c0d5919-f4a7-4d91-b974-4ee88234a92c',9);
INSERT INTO `quiz` VALUES (64,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/d123105f-7bee-4261-8ffa-e25a1001ab3a_%ED%94%84%EB%A1%9C%EC%A4%911.png',2,'2',NULL,'2024-05-16 01:33:21','2024-05-16 01:33:21','c83ecbab-adf3-45be-8a3c-58b31624adee',9);
INSERT INTO `quiz` VALUES (65,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/fa21b8dc-6708-4a87-8f8a-f90e5aa33aa6_%ED%94%84%EB%A1%9C%EC%A4%912.png',2,'2',NULL,'2024-05-16 01:33:30','2024-05-16 01:33:30','3ccd342c-a274-46b5-a7b6-38862883063c',9);
INSERT INTO `quiz` VALUES (66,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/ae31093c-c171-4b08-8d9c-8a1cb27fa7ab_%ED%94%84%EB%A1%9C%EC%A4%913.png',2,'3',NULL,'2024-05-16 01:33:45','2024-05-16 01:33:45','84c0edbc-84bc-44c3-8600-3deb4e9c9b35',9);
INSERT INTO `quiz` VALUES (67,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/32edac21-d80d-4542-8e90-981dbb8f2c56_%ED%94%84%EB%A1%9C%EC%83%811.png',3,'4',NULL,'2024-05-16 01:34:43','2024-05-16 01:34:43','e0a8cf35-1d4f-4c68-991f-67cf615e9590',9);
INSERT INTO `quiz` VALUES (68,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/014ebef0-78ab-4c8f-a7eb-9c12ae07e694_%ED%94%84%EB%A1%9C%EC%83%812.png',3,'4',NULL,'2024-05-16 01:34:53','2024-05-16 01:34:53','ecf9654c-2cae-43ed-84b7-da298696e94d',9);
INSERT INTO `quiz` VALUES (69,'NULL.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/124d98b6-4961-450d-9768-9eafaaaaac49_%ED%94%84%EB%A1%9C%EC%83%813.png',3,'1',NULL,'2024-05-16 01:35:10','2024-05-16 01:35:10','42865226-e7ce-4215-8ced-f205de33942b',9);
INSERT INTO `quiz` VALUES (94,'문장 속 숫자를 찾아보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/24a0e1e9-11f4-4fad-aee0-0ecb80d17f1c_space_lower_1.jpg',1,'3',NULL,'2024-05-19 11:45:55','2024-05-19 11:45:55','c044c13e-7e11-4690-8acf-e06c8cb2b5b3',10);
INSERT INTO `quiz` VALUES (95,'제발 맞춰주세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/575113a5-94f4-4b1e-b246-391ad32b493c_space_lower_2.jpg',1,'3',NULL,'2024-05-19 11:46:16','2024-05-19 11:46:16','65e2b6aa-9a42-4be4-9fab-e4ad226c5e41',10);
INSERT INTO `quiz` VALUES (96,'세번째 숫자와 같은 숫자가 몇 개일까요?',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/ad34e028-dedc-4f20-8542-be8359a73e02_space_lower_3.jpg',1,'3',NULL,'2024-05-19 11:47:02','2024-05-19 11:47:02','dad19219-47c6-4f90-82e5-c54b5d105ee9',10);
INSERT INTO `quiz` VALUES (97,'단위를 생각해 보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/4262d484-aeee-44d3-acbb-53249e31b431_space_lower_4.jpg',1,'1',NULL,'2024-05-19 11:47:34','2024-05-19 11:47:34','fd4065de-f45d-4ed8-a93e-aeafaaf74793',10);
INSERT INTO `quiz` VALUES (98,'어린아이의 시각으로 보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/37b838ee-e0ec-4a0b-ad74-da3bed799bcc_space_lower_5.jpg',1,'1',NULL,'2024-05-19 11:47:51','2024-05-19 11:47:51','e014881a-670b-4de9-8148-3c674d15f25c',10);
INSERT INTO `quiz` VALUES (99,'동물은 고양이랍니다.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/2f371c9f-08f0-4996-acf4-a68aa8bbf761_space_lower_6.jpg',1,'1',NULL,'2024-05-19 11:48:25','2024-05-19 11:48:25','a76c1f55-cff8-44b3-8f98-6fde741dda17',10);
INSERT INTO `quiz` VALUES (100,'규칙을 찾아보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/e3329fd7-863a-46d9-8285-29d94b5c6fca_space_lower_7.jpg',1,'3',NULL,'2024-05-19 11:48:52','2024-05-19 11:48:52','104f1438-021d-4595-a7e1-8f1261c9ba58',10);
INSERT INTO `quiz` VALUES (101,'발음 해 보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/617b0da7-e612-4589-be9f-1b1c0c80f532_space_lower_8.jpg',1,'2',NULL,'2024-05-19 11:49:15','2024-05-19 11:49:15','90de2ef6-7d6f-4a31-a852-babd205ea6f8',10);
INSERT INTO `quiz` VALUES (102,'거꾸로 보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/39ece8c1-abe1-41eb-8093-91d695c50751_space_lower_9.jpg',1,'2',NULL,'2024-05-19 11:49:40','2024-05-19 11:49:40','f31e510d-ca3f-41d1-abbe-3f12036cc5cd',10);
INSERT INTO `quiz` VALUES (104,'밖의 수의 곱은 가운데 수',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/0799eb79-7bc4-430f-9fe7-19f7ecc2a83f_space_middle_1.jpg',2,'1',NULL,'2024-05-19 11:54:39','2024-05-19 11:54:39','5636595e-f47b-41ff-8b98-a7b32dad00e2',10);
INSERT INTO `quiz` VALUES (105,'단어를 붙여보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/a5981aea-f218-4906-ab12-32c8d7f23e71_space_middle_2.jpg',2,'3',NULL,'2024-05-19 11:55:01','2024-05-19 11:55:01','e7f36ad3-b7bd-492f-9354-f01ed7dbc3c7',10);
INSERT INTO `quiz` VALUES (106,'한글로 생각해보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/94dfd342-2708-4a75-a523-94addba1575b_space_middle_3.jpg',2,'1',NULL,'2024-05-19 11:55:40','2024-05-19 11:55:40','e32f656e-1d3e-4835-97f8-35778cb6f4b6',10);
INSERT INTO `quiz` VALUES (107,'고정관념에서 벗어나세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/7e594f47-6825-422d-96c6-363368207500_space_middle_4.jpg',2,'3',NULL,'2024-05-19 11:56:03','2024-05-19 11:56:03','f2aca896-2f51-41f3-a310-0e19bc5fd926',10);
INSERT INTO `quiz` VALUES (108,'끝말잇기',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/0301a34f-5339-43f4-91e9-84be860fbf06_space_middle_5.jpg',2,'4',NULL,'2024-05-19 11:56:24','2024-05-19 11:56:24','11b1669c-2517-4572-805c-befc54812aa7',10);
INSERT INTO `quiz` VALUES (109,'시계방향으로 수 만큼 회전시키세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/5abc443c-69f5-4966-8b9b-518ff0d57dab_space_middle_6.jpg',2,'2',NULL,'2024-05-19 11:56:53','2024-05-19 11:56:53','4e7abaee-ab85-4dba-bce3-6697377894c1',10);
INSERT INTO `quiz` VALUES (110,'트럼프 카드 Diamond, Heart, Spade, ?',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/df3887c4-647b-46a4-974d-2c8ff8e0e719_space_middle_6.jpg',2,'4',NULL,'2024-05-19 11:57:14','2024-05-19 11:57:14','0fea2495-c671-437e-ae8e-6ccdc77457d1',10);
INSERT INTO `quiz` VALUES (111,'문제를 잘 읽으세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/c401615a-9f45-43bd-ad5c-7f446b563dc3_space_middle_8.jpg',2,'2',NULL,'2024-05-19 11:58:34','2024-05-19 11:58:34','d039115a-73c5-4f40-bd67-46d30eaf157f',10);
INSERT INTO `quiz` VALUES (112,'알파벳에서 선 하나씩 빼 보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/00f9b365-0be6-4a55-a72e-1a9853602e93_space_upper_1.jpg',3,'3',NULL,'2024-05-19 12:02:53','2024-05-19 12:02:53','2f5e3a4c-f5c9-46eb-b0a1-884723e1757a',10);
INSERT INTO `quiz` VALUES (113,'잘 생각해보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/366edd1a-fe61-43af-a2fc-e0d5e02e1622_space_upper_2.jpg',3,'3',NULL,'2024-05-19 12:03:13','2024-05-19 12:03:13','f6cf7da8-839a-4692-9d94-47b97f891e3b',10);
INSERT INTO `quiz` VALUES (114,'전자숫자를 생각해보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/a6105b5d-8bd2-4bfd-a5e3-094dd4a74a5f_space_upper_3.jpg',3,'2',NULL,'2024-05-19 12:03:33','2024-05-19 12:03:33','8353c743-c2ab-435b-b6aa-14227ca0dc70',10);
INSERT INTO `quiz` VALUES (115,'위와 밑의 가운데',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/95953c09-e5e6-4c64-8e4b-b36a7d3cccd0_space_upper_4.jpg',3,'1',NULL,'2024-05-19 12:03:54','2024-05-19 12:03:54','c5a7667b-793b-4256-9241-226a9dd1fe06',10);
INSERT INTO `quiz` VALUES (116,'잘 생각해보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/546fce7b-b929-4468-aac5-efae3e7e32b7_space_upper_5.jpg',3,'3',NULL,'2024-05-19 12:04:10','2024-05-19 12:04:10','82462a57-08f5-4f25-a71e-8625ae35e461',10);
INSERT INTO `quiz` VALUES (117,'단위를 생각해보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/6009c65d-c288-4fd7-b21a-60c564b3e5b6_space_upper_6.jpg',3,'3',NULL,'2024-05-19 12:04:26','2024-05-19 12:04:26','91158870-0388-4bd4-9765-c49cb8b42abe',10);
INSERT INTO `quiz` VALUES (118,'외국인은 중국인이에요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/d42231c9-94ec-4b4e-953d-88a30b70d3bc_space_upper_7.jpg',3,'2',NULL,'2024-05-19 12:04:50','2024-05-19 12:04:50','7353f085-08d3-41d6-9ebd-d9fdde3bbdbb',10);
INSERT INTO `quiz` VALUES (119,'잘 생각해보세요.',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/7298d82a-5bce-4a11-93a6-ac96969e44a5_space_upper_8.jpg',3,'4',NULL,'2024-05-19 12:05:27','2024-05-19 12:05:27','bdddf227-764c-4c62-8e49-9cd5f7cbfc66',10);
INSERT INTO `quiz` VALUES (120,'3n+4',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/eb27065d-0e6a-44f4-97b5-be74718e3924_%ED%95%984.png',1,'100',NULL,'2024-05-19 12:25:55','2024-05-19 12:25:55','1c8af10a-e24e-416c-aa64-416e09dce1f6',2);
INSERT INTO `quiz` VALUES (121,'2n+10',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/c2476c90-d031-4183-8926-7abf15194a66_%ED%95%985.png',1,'133',NULL,'2024-05-19 12:27:15','2024-05-19 12:27:15','6ae20f7a-df1e-4097-9a00-e423712d7f4f',2);
INSERT INTO `quiz` VALUES (122,'거울',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/bba8d8ec-eeb2-4102-8ba5-981f9fd6942f_%EC%A4%914.png',2,'JDGFLT',NULL,'2024-05-19 12:28:40','2024-05-19 12:28:40','14e1c0be-7f1f-4054-9fad-8043afc86622',2);
INSERT INTO `quiz` VALUES (123,'시간',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/4618a0fe-2161-42bd-90f1-43605781e41a_%EC%A4%915.png',2,'655',NULL,'2024-05-19 12:29:09','2024-05-19 12:29:09','6910480d-7c28-4a72-8659-d10eeb915793',2);
INSERT INTO `quiz` VALUES (124,'-2의 n승',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/577762ec-49dc-4842-8121-3c0f49eebe8b_%EC%83%814.png',3,'270',NULL,'2024-05-19 12:30:28','2024-05-19 12:30:28','7c624a89-c89b-4903-b135-e14b196183fe',2);
INSERT INTO `quiz` VALUES (125,'n의 제곱',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/eec7440a-a7e1-47a9-94d5-0cb30f7773fe_%EC%83%815.png',3,'104',NULL,'2024-05-19 12:30:49','2024-05-19 12:30:49','d2600ef5-48d0-4028-b354-5a529c06328d',2);
INSERT INTO `quiz` VALUES (126,'3n-2',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/518da57a-8ff3-4266-9329-5157b5fc3b29_%EA%B3%BC%ED%95%99%EC%9E%90%ED%95%981.png',1,'83',NULL,'2024-05-19 12:32:12','2024-05-19 12:32:12','acda60a4-526a-49c6-bde3-c4c29a5cf6d7',3);
INSERT INTO `quiz` VALUES (127,'홀수에서 -4, 짝수에서 *3',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/abc103a8-3d98-4d79-9ee3-92d5239203ad_%EA%B3%BC%ED%95%99%EC%9E%90%ED%95%982.png',1,'-8',NULL,'2024-05-19 12:32:37','2024-05-19 12:32:37','7017ab1b-2ae8-41d3-a06b-67eb345c155b',3);
INSERT INTO `quiz` VALUES (128,'2n+3',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/b634dc0b-c36c-401a-87fa-14a5611690b1_%EA%B3%BC%ED%95%99%EC%9E%90%EC%A4%911.png',2,'88',NULL,'2024-05-19 12:34:21','2024-05-19 12:34:21','ea8a9ca7-d527-4a5b-934e-15c958ba3a82',3);
INSERT INTO `quiz` VALUES (129,'+3, *2',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/f4a21df8-e984-42ff-8df4-292a462d6e84_%EA%B3%BC%ED%95%99%EC%9E%90%EC%A4%912.png',2,'1',NULL,'2024-05-19 12:34:43','2024-05-19 12:34:43','3247cfb0-5520-48fb-900f-1e8b5e51aec2',3);
INSERT INTO `quiz` VALUES (130,'-5n',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/ec8d126d-c809-4ac6-877d-b169dc0ae60f_%EA%B3%BC%ED%95%99%EC%9E%90%EC%83%811.png',3,'108',NULL,'2024-05-19 12:35:41','2024-05-19 12:35:41','b1235867-36b1-409b-8442-b61a1da07e92',3);
INSERT INTO `quiz` VALUES (131,'*2, -2, %2',NULL,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/quiz-image/becb9f9e-2027-458e-979f-7d87c51c0464_%EA%B3%BC%ED%95%99%EC%9E%90%EC%83%812.png',3,'9',NULL,'2024-05-19 12:36:08','2024-05-19 12:36:08','577d440d-a2c4-40b4-b78a-0fc37f57a528',3);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranking`
--

DROP TABLE IF EXISTS `ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranking` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `best_time` time NOT NULL,
  `thema_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  PRIMARY KEY (`id`),
  KEY `FK_thema_TO_ranking_1` (`thema_id`),
  KEY `FK_user_TO_ranking_1` (`user_id`),
  CONSTRAINT `FK_thema_TO_ranking_1` FOREIGN KEY (`thema_id`) REFERENCES `thema` (`id`),
  CONSTRAINT `FK_user_TO_ranking_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking`
--

LOCK TABLES `ranking` WRITE;
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
INSERT INTO `ranking` VALUES (1,'00:01:26',1,13,'2024-05-13 04:36:37','2024-05-18 15:35:16','3e347351-75cf-4106-b021-7f3a78170bce');
INSERT INTO `ranking` VALUES (2,'00:02:22',1,12,'2024-05-16 01:43:10','2024-05-16 07:42:29','a1cb70ab-9698-47af-a2ac-aefde79872ed');
INSERT INTO `ranking` VALUES (3,'00:08:32',1,24,'2024-05-16 04:58:53','2024-05-16 04:58:53','40021457-1679-4339-8923-f7a024f19ed8');
INSERT INTO `ranking` VALUES (4,'00:05:19',1,27,'2024-05-16 05:25:21','2024-05-16 05:25:21','13fbd5ef-afd3-40a0-bb78-04c5c83a4cb6');
INSERT INTO `ranking` VALUES (5,'00:09:51',1,26,'2024-05-16 05:38:16','2024-05-16 05:38:16','443af200-9ce2-49f6-94bb-c0fe59e0d53c');
INSERT INTO `ranking` VALUES (6,'00:05:34',1,16,'2024-05-16 08:05:36','2024-05-16 08:05:36','b433f01d-da13-436c-b550-32869db62a52');
INSERT INTO `ranking` VALUES (7,'00:01:25',1,29,'2024-05-16 14:56:18','2024-05-16 14:56:18','0ed260ec-8175-4918-b3f3-474e17d86219');
INSERT INTO `ranking` VALUES (8,'00:03:23',1,7,'2024-05-16 15:18:33','2024-05-18 05:49:08','2a030593-a1cb-4243-b901-4fd39fe774b9');
INSERT INTO `ranking` VALUES (9,'00:04:51',10,29,'2024-05-16 15:26:46','2024-05-16 15:26:46','500651c6-dc65-4e1f-9bab-a8c491e0fa91');
INSERT INTO `ranking` VALUES (10,'00:04:55',10,42,'2024-05-17 12:05:21','2024-05-17 12:05:21','0b978124-7308-4c54-b742-5297627bab2e');
INSERT INTO `ranking` VALUES (11,'00:10:01',1,44,'2024-05-18 05:37:04','2024-05-18 05:38:06','9b7c3136-a51b-42b9-b447-b18c6bdad69d');
INSERT INTO `ranking` VALUES (12,'00:08:41',10,44,'2024-05-18 05:59:14','2024-05-18 05:59:14','8bd93d94-8981-4de4-918d-0c3881912506');
INSERT INTO `ranking` VALUES (13,'00:04:50',10,12,'2024-05-18 07:49:47','2024-05-18 07:49:47','09ddcc47-9903-4f3a-8527-797cc7b6c4d6');
INSERT INTO `ranking` VALUES (14,'00:06:06',10,39,'2024-05-18 08:30:15','2024-05-18 08:44:14','ac5ec9b0-b38b-4762-8bc1-618528e9434a');
INSERT INTO `ranking` VALUES (15,'00:04:15',10,7,'2024-05-18 09:04:21','2024-05-18 12:21:47','a89c2aa2-3b2f-4d33-9b83-f477bd9bd436');
INSERT INTO `ranking` VALUES (16,'00:03:27',10,6,'2024-05-18 11:00:23','2024-05-18 11:00:23','e057c14f-480d-4fd5-941d-c3b63118cad7');
INSERT INTO `ranking` VALUES (17,'00:03:16',1,54,'2024-05-18 16:11:24','2024-05-18 16:19:42','eed684b9-7db6-4459-ac8b-60a7b2b08d00');
INSERT INTO `ranking` VALUES (18,'00:00:10',7,13,'2024-05-19 09:56:43','2024-05-19 18:12:59','e80c4331-1034-4681-b41e-417c1b9014c6');
INSERT INTO `ranking` VALUES (19,'00:09:58',10,32,'2024-05-19 13:37:14','2024-05-19 13:37:14','d1ab6fb8-798d-4d99-b037-5dccb8e8656e');
INSERT INTO `ranking` VALUES (20,'00:01:10',7,32,'2024-05-19 14:05:43','2024-05-19 17:19:36','b11b5aae-6717-4833-9008-7b33195a26bc');
INSERT INTO `ranking` VALUES (21,'00:04:17',10,8,'2024-05-19 16:22:51','2024-05-19 16:22:51','d7128ef4-8d20-4aeb-8423-dd60fe30362b');
INSERT INTO `ranking` VALUES (22,'00:01:33',7,8,'2024-05-19 17:29:47','2024-05-19 17:29:47','4a5ccab2-a823-4e2f-ad58-98f4ae5bde9f');
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `password` varchar(512) DEFAULT NULL,
  `capacity` int NOT NULL DEFAULT '0',
  `started_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `thema_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  `created_user` bigint NOT NULL,
  `updated_user` bigint NOT NULL,
  `has_password` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_thema_TO_room_1` (`thema_id`),
  KEY `FK_user_TO_room_1` (`user_id`),
  CONSTRAINT `FK_thema_TO_room_1` FOREIGN KEY (`thema_id`) REFERENCES `thema` (`id`),
  CONSTRAINT `FK_user_TO_room_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=475 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (356,'147258369',NULL,2,'2024-05-18 07:04:29',1,12,'2024-05-18 07:04:29','2024-05-18 07:04:42','7ef6538b-0ec9-4129-8733-2bb43e69e0ca',12,12,0);
INSERT INTO `room` VALUES (357,'?????',NULL,2,'2024-05-18 07:25:11',1,39,'2024-05-18 07:25:11','2024-05-18 08:52:27','c0000c8e-dc5a-4584-9187-073438d7d10e',39,39,0);
INSERT INTO `room` VALUES (358,'이거 테스트임',NULL,2,'2024-05-18 07:42:06',1,39,'2024-05-18 07:42:06','2024-05-18 08:51:42','5d480783-ce20-4d6e-9e20-a902cb8a8726',39,39,0);
INSERT INTO `room` VALUES (360,'삭제 ㅌㅅㅌ',NULL,2,'2024-05-18 08:52:33',1,16,'2024-05-18 08:52:33','2024-05-18 08:52:38','e35cb633-5cea-4c34-a124-4af619b07644',16,16,0);
INSERT INTO `room` VALUES (363,'fwe',NULL,1,'2024-05-18 09:35:02',1,16,'2024-05-18 09:35:02','2024-05-18 09:35:02','d7d74bf2-f7b5-4561-9f86-c384217722aa',16,16,0);
INSERT INTO `room` VALUES (366,'test',NULL,2,'2024-05-18 13:35:45',1,6,'2024-05-18 13:35:45','2024-05-18 13:36:00','35b82b8e-9d0c-4e1c-85ba-bc62a9da0f4e',6,6,0);
INSERT INTO `room` VALUES (367,'나는야 송정훈의 대기실',NULL,2,'2024-05-18 14:04:56',1,32,'2024-05-18 14:04:56','2024-05-18 14:04:56','b245e85f-800d-4232-b842-80f52b15fdcd',32,32,0);
INSERT INTO `room` VALUES (371,'072','$2a$10$cFHiGPHStDlICCTEFFof5u//EnzGHncMQtDmunmu.xp2WNJ0RDj6u',2,'2024-05-18 14:54:16',1,50,'2024-05-18 14:54:16','2024-05-18 14:54:25','713db6b9-36f8-4fe3-9bdd-7b22e0195613',50,50,1);
INSERT INTO `room` VALUES (382,'fgg',NULL,2,'2024-05-19 04:11:32',1,13,'2024-05-19 04:11:32','2024-05-19 04:12:35','baaea7a9-9903-4264-8d35-ff61912a87d0',13,13,0);
INSERT INTO `room` VALUES (389,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:15',1,56,'2024-05-19 13:40:15','2024-05-19 13:40:15','e16ad55a-3621-4e1e-870e-608d9a863c0a',56,56,0);
INSERT INTO `room` VALUES (390,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:16',1,56,'2024-05-19 13:40:16','2024-05-19 13:40:16','34d01f16-c1c5-47cc-a792-5609ec973ca5',56,56,0);
INSERT INTO `room` VALUES (391,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:17',1,56,'2024-05-19 13:40:17','2024-05-19 13:40:17','b198f64e-2029-49b6-a93c-21375020b850',56,56,0);
INSERT INTO `room` VALUES (392,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:18',1,56,'2024-05-19 13:40:18','2024-05-19 13:40:18','c1d4c8a4-89ef-438b-8e5e-01c24934239f',56,56,0);
INSERT INTO `room` VALUES (393,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:19',1,56,'2024-05-19 13:40:19','2024-05-19 13:40:19','394f544e-8e7d-45fe-b3a2-7d59f3aa3548',56,56,0);
INSERT INTO `room` VALUES (394,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:20',1,56,'2024-05-19 13:40:20','2024-05-19 13:40:20','095c95b5-d1bb-4a02-b3a1-ee7f7ed2f364',56,56,0);
INSERT INTO `room` VALUES (395,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:21',1,56,'2024-05-19 13:40:21','2024-05-19 13:40:21','de6abc8c-f8e8-47e1-b93d-9f341a4304ab',56,56,0);
INSERT INTO `room` VALUES (396,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:22',1,56,'2024-05-19 13:40:22','2024-05-19 13:40:22','b75397a9-8500-45af-bebd-fb697a42b9b8',56,56,0);
INSERT INTO `room` VALUES (397,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:23',1,56,'2024-05-19 13:40:23','2024-05-19 13:40:23','dc45b77e-c56c-49c0-b366-661f854ccf4c',56,56,0);
INSERT INTO `room` VALUES (398,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:24',1,56,'2024-05-19 13:40:24','2024-05-19 13:40:24','1593a9dd-cba8-43fe-8da4-ba945d85c5a5',56,56,0);
INSERT INTO `room` VALUES (399,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:25',1,56,'2024-05-19 13:40:25','2024-05-19 13:40:25','37e1e4a1-5609-4958-a496-0efb55072967',56,56,0);
INSERT INTO `room` VALUES (400,'톡쏘는소방관의 대기실',NULL,2,'2024-05-19 13:40:26',1,8,'2024-05-19 13:40:26','2024-05-19 13:40:26','d68560bb-5aa9-49f2-9ebe-79460e71356d',8,8,0);
INSERT INTO `room` VALUES (401,'톡쏘는소방관의 대기실',NULL,2,'2024-05-19 13:40:29',1,8,'2024-05-19 13:40:29','2024-05-19 13:40:29','dc2bcbd6-25a5-4aee-9640-317ba8961d5b',8,8,0);
INSERT INTO `room` VALUES (402,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:36',1,56,'2024-05-19 13:40:36','2024-05-19 13:40:36','9e88a463-c1e0-4c1c-b161-50aed36926bf',56,56,0);
INSERT INTO `room` VALUES (403,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:37',1,56,'2024-05-19 13:40:37','2024-05-19 13:40:37','32f9f6e4-833f-47af-a3f2-e1f4c6bd658b',56,56,0);
INSERT INTO `room` VALUES (404,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:38',1,56,'2024-05-19 13:40:38','2024-05-19 13:40:38','44249f9c-f6c5-4728-95ef-33f4336811a9',56,56,0);
INSERT INTO `room` VALUES (405,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:39',1,56,'2024-05-19 13:40:39','2024-05-19 13:40:39','47e05420-a289-4f97-bd2e-ba8a835e2ee0',56,56,0);
INSERT INTO `room` VALUES (406,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:40',1,56,'2024-05-19 13:40:40','2024-05-19 13:40:40','8f17a5d8-cd80-48e7-b55e-d0381979fba8',56,56,0);
INSERT INTO `room` VALUES (407,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:40:41',1,56,'2024-05-19 13:40:41','2024-05-19 13:40:41','67416706-08f8-49e4-bf13-33c8bec2a53f',56,56,0);
INSERT INTO `room` VALUES (408,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:41:15',1,56,'2024-05-19 13:41:15','2024-05-19 13:41:15','0401c043-0e44-4a43-b850-e06a01aa2853',56,56,0);
INSERT INTO `room` VALUES (409,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:42:46',1,56,'2024-05-19 13:42:46','2024-05-19 13:42:46','0536f555-30f0-47d8-a59f-cc5965f20c37',56,56,0);
INSERT INTO `room` VALUES (410,'잘익은콧털의 대기실',NULL,2,'2024-05-19 13:43:39',1,56,'2024-05-19 13:43:39','2024-05-19 13:43:39','84e5822c-a4ea-4a1e-8060-8051f5020690',56,56,0);
INSERT INTO `room` VALUES (411,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:40',1,16,'2024-05-19 13:43:40','2024-05-19 13:43:40','d210a75e-78e5-4643-a828-cdec37616752',16,16,0);
INSERT INTO `room` VALUES (412,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:41',1,16,'2024-05-19 13:43:41','2024-05-19 13:43:41','883d51d5-06ca-485a-ab7f-bdcfd9007aeb',16,16,0);
INSERT INTO `room` VALUES (413,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:42',1,16,'2024-05-19 13:43:42','2024-05-19 13:43:42','deb381a6-20ba-4016-9680-d887eb50b137',16,16,0);
INSERT INTO `room` VALUES (414,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:43',1,16,'2024-05-19 13:43:43','2024-05-19 13:43:43','9ca25204-7f64-441e-aeed-408c731772db',16,16,0);
INSERT INTO `room` VALUES (415,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:44',1,16,'2024-05-19 13:43:44','2024-05-19 13:43:44','e7736496-5bc0-4e1b-8668-a3645c2d6474',16,16,0);
INSERT INTO `room` VALUES (416,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:45',1,16,'2024-05-19 13:43:45','2024-05-19 13:43:45','8eb0839d-fb54-4179-979f-3380d1e1ad4a',16,16,0);
INSERT INTO `room` VALUES (417,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:46',1,16,'2024-05-19 13:43:46','2024-05-19 13:43:46','73c52091-ba79-47f8-8576-b422bce79af2',16,16,0);
INSERT INTO `room` VALUES (418,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:47',1,16,'2024-05-19 13:43:47','2024-05-19 13:43:47','7aacb268-fc40-4847-8f80-963eb24bc505',16,16,0);
INSERT INTO `room` VALUES (419,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:48',1,16,'2024-05-19 13:43:48','2024-05-19 13:43:48','5462c590-834a-4cdf-8a31-2728f0edfad1',16,16,0);
INSERT INTO `room` VALUES (420,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:49',1,16,'2024-05-19 13:43:49','2024-05-19 13:43:49','24b1dece-958a-4a01-a43f-d773e63eeb56',16,16,0);
INSERT INTO `room` VALUES (421,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:50',1,16,'2024-05-19 13:43:50','2024-05-19 13:43:50','6d6feec5-368e-4566-b5ae-97d80dd45245',16,16,0);
INSERT INTO `room` VALUES (422,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:51',1,16,'2024-05-19 13:43:51','2024-05-19 13:43:51','f846b17f-6f49-4496-8cea-1119a0a7d928',16,16,0);
INSERT INTO `room` VALUES (423,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:52',1,16,'2024-05-19 13:43:52','2024-05-19 13:43:52','6517f759-9e0b-4b2a-8174-0d00a04951eb',16,16,0);
INSERT INTO `room` VALUES (424,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:53',1,16,'2024-05-19 13:43:53','2024-05-19 13:43:53','fc34868a-89c6-4017-9274-c9f87db0cf0a',16,16,0);
INSERT INTO `room` VALUES (425,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:55',1,16,'2024-05-19 13:43:55','2024-05-19 13:43:55','f125e8fa-da43-47a2-a7f4-6dc2d12e254e',16,16,0);
INSERT INTO `room` VALUES (426,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:56',1,16,'2024-05-19 13:43:56','2024-05-19 13:43:56','c4ea31ce-44f9-4321-b054-e9796c1fe548',16,16,0);
INSERT INTO `room` VALUES (427,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:57',1,16,'2024-05-19 13:43:57','2024-05-19 13:43:57','470dfc5c-1b97-493d-9045-f78ecbbad047',16,16,0);
INSERT INTO `room` VALUES (428,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:58',1,16,'2024-05-19 13:43:58','2024-05-19 13:43:58','f04f3299-62d7-4601-8242-c3983a657a5f',16,16,0);
INSERT INTO `room` VALUES (429,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:43:59',1,16,'2024-05-19 13:43:59','2024-05-19 13:43:59','d1a92f24-70c4-48ad-b6a3-cc5531a01c94',16,16,0);
INSERT INTO `room` VALUES (430,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:44:00',1,16,'2024-05-19 13:44:00','2024-05-19 13:44:00','2798a736-356f-42c5-bb0e-c77db584cfd7',16,16,0);
INSERT INTO `room` VALUES (431,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:44:01',1,16,'2024-05-19 13:44:01','2024-05-19 13:44:01','60794f40-9503-44c5-8de0-45f0d09c89a5',16,16,0);
INSERT INTO `room` VALUES (432,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:44:02',1,16,'2024-05-19 13:44:02','2024-05-19 13:44:02','d32a1092-b31f-4045-af8e-8d33f4840a1e',16,16,0);
INSERT INTO `room` VALUES (433,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 13:44:03',1,16,'2024-05-19 13:44:03','2024-05-19 13:44:03','e31abd1d-01be-419e-ac83-66b0747ce6cc',16,16,0);
INSERT INTO `room` VALUES (434,'와봐',NULL,2,'2024-05-19 13:51:11',7,56,'2024-05-19 13:51:11','2024-05-19 13:51:18','5db52b48-7b0b-455a-baaf-8b08559770f6',56,56,0);
INSERT INTO `room` VALUES (440,'잘익은콧털의 대기실',NULL,2,'2024-05-19 14:02:24',1,56,'2024-05-19 14:02:24','2024-05-19 14:02:24','a70049f1-6260-4736-8f71-57eaefbb0a6f',56,56,0);
INSERT INTO `room` VALUES (441,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 14:02:33',1,16,'2024-05-19 14:02:33','2024-05-19 14:02:33','51d2d929-ba99-408e-8169-b52776645cfa',16,16,0);
INSERT INTO `room` VALUES (442,'잘익은콧털의 대기실',NULL,2,'2024-05-19 14:02:34',1,56,'2024-05-19 14:02:34','2024-05-19 14:02:34','52f37bf4-5500-4612-8c87-417bfe1ca8d0',56,56,0);
INSERT INTO `room` VALUES (443,'잘익은콧털의 대기실',NULL,2,'2024-05-19 14:02:35',1,56,'2024-05-19 14:02:35','2024-05-19 14:02:35','18e09c59-ab22-438d-9c79-5e0da21aaa2e',56,56,0);
INSERT INTO `room` VALUES (444,'잘익은콧털의 대기실',NULL,2,'2024-05-19 14:02:36',1,56,'2024-05-19 14:02:36','2024-05-19 14:02:36','e432bb9f-63ef-4ebd-86be-c64e167474a9',56,56,0);
INSERT INTO `room` VALUES (445,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 14:02:37',1,16,'2024-05-19 14:02:37','2024-05-19 14:02:37','af52bb35-2437-4bef-a9c3-4b5f5dc32340',16,16,0);
INSERT INTO `room` VALUES (446,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 14:02:38',1,16,'2024-05-19 14:02:38','2024-05-19 14:02:38','57cc8220-c4e0-492c-b879-0d741bef39cb',16,16,0);
INSERT INTO `room` VALUES (447,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 14:02:39',1,16,'2024-05-19 14:02:39','2024-05-19 14:02:39','b2adc7a7-c292-474e-bca6-75df52c66f73',16,16,0);
INSERT INTO `room` VALUES (448,'잘익은콧털의 대기실',NULL,2,'2024-05-19 14:02:40',1,56,'2024-05-19 14:02:40','2024-05-19 14:02:40','27c4a94c-35dd-4d4e-864d-31f31bc9ca74',56,56,0);
INSERT INTO `room` VALUES (449,'잘익은콧털의 대기실',NULL,2,'2024-05-19 14:02:41',1,56,'2024-05-19 14:02:41','2024-05-19 14:02:41','2ffb7856-9331-41f1-af34-3841d66673a3',56,56,0);
INSERT INTO `room` VALUES (450,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 14:02:42',1,16,'2024-05-19 14:02:42','2024-05-19 14:02:42','27792d8c-a0b9-45a9-8bb9-b0595fc53646',16,16,0);
INSERT INTO `room` VALUES (451,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 14:02:43',1,16,'2024-05-19 14:02:43','2024-05-19 14:02:43','83ddfb77-f908-4aae-a651-8388e8d07380',16,16,0);
INSERT INTO `room` VALUES (452,'잘익은콧털의 대기실',NULL,2,'2024-05-19 14:02:45',1,56,'2024-05-19 14:02:45','2024-05-19 14:02:45','54f1f518-a90c-409c-8f26-cd8fc6677e6c',56,56,0);
INSERT INTO `room` VALUES (453,'잘익은콧털의 대기실',NULL,2,'2024-05-19 14:02:46',1,56,'2024-05-19 14:02:46','2024-05-19 14:02:46','3e3080bd-f0ed-4a55-a38d-63845c5b2a77',56,56,0);
INSERT INTO `room` VALUES (454,'잘익은콧털의 대기실',NULL,1,'2024-05-19 14:48:03',1,56,'2024-05-19 14:48:03','2024-05-19 15:03:01','46b692a5-8faf-4cd5-a5d6-f009c9bea1ea',56,56,0);
INSERT INTO `room` VALUES (455,'잘익은콧털의 대기실',NULL,1,'2024-05-19 14:48:04',1,56,'2024-05-19 14:48:04','2024-05-19 14:48:04','0a3e9255-3066-4892-a5eb-d6cb5ae387a1',56,56,0);
INSERT INTO `room` VALUES (456,'1234',NULL,2,'2024-05-19 14:48:25',1,15,'2024-05-19 14:48:25','2024-05-19 14:48:54','f50d1627-1340-495f-af46-87c27defdb42',15,15,0);
INSERT INTO `room` VALUES (457,'시대를 앞서간 간달프의 대기실',NULL,2,'2024-05-19 14:48:28',1,16,'2024-05-19 14:48:28','2024-05-19 14:48:28','056592ba-c407-4b80-84f1-91416852ed9c',16,16,0);
INSERT INTO `room` VALUES (458,'잘익은콧털의 대기실',NULL,1,'2024-05-19 14:48:29',1,56,'2024-05-19 14:48:29','2024-05-19 14:48:29','1598a5c1-1505-46c3-a37a-eec084619dad',56,56,0);
INSERT INTO `room` VALUES (463,'들어와',NULL,2,'2024-05-19 16:32:13',1,56,'2024-05-19 16:32:13','2024-05-19 16:32:44','06c20395-f170-4e4d-a7b8-0d78431a3e1e',56,56,0);
INSERT INTO `room` VALUES (464,'이거 테스트에용',NULL,2,'2024-05-19 16:45:02',7,39,'2024-05-19 16:45:02','2024-05-19 16:46:58','8677275a-7d02-41b3-8bb9-8921371d6329',39,39,0);
INSERT INTO `room` VALUES (468,'qwdqw',NULL,2,'2024-05-19 16:51:34',1,29,'2024-05-19 16:51:34','2024-05-19 16:52:42','e5676e62-89c7-4b54-b85a-21ffecb17aca',29,29,0);
INSERT INTO `room` VALUES (470,'ㅎ',NULL,1,'2024-05-19 16:57:32',1,29,'2024-05-19 16:57:32','2024-05-19 16:57:32','9cd2ea54-5436-4a06-b05f-58a4834056f1',29,29,0);
INSERT INTO `room` VALUES (472,'ㅇㅈㅂㅈㅂ',NULL,2,'2024-05-19 17:10:36',1,29,'2024-05-19 17:10:36','2024-05-19 17:10:59','77b0bb5c-99c7-487f-9276-71ce1823b928',29,29,0);
INSERT INTO `room` VALUES (473,'//',NULL,2,'2024-05-19 17:26:24',1,8,'2024-05-19 17:26:24','2024-05-19 17:27:10','09838908-afc0-438c-8222-e72519668871',8,8,0);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thema`
--

DROP TABLE IF EXISTS `thema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thema` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` int NOT NULL DEFAULT '0',
  `description` varchar(2500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT (uuid()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thema`
--

LOCK TABLES `thema` WRITE;
/*!40000 ALTER TABLE `thema` DISABLE KEYS */;
INSERT INTO `thema` VALUES (1,1,'지하 감옥에서 이뤄지는 목숨을 건 탈출!','2024-05-10 05:45:08','2024-05-10 05:45:08','75ed2cc3-0e90-11ef-ad01-0242ac101402');
INSERT INTO `thema` VALUES (2,2,'당신은 실험체입니다. 제한시간 10분동안 3개의 문제를 해결해서 싸이코패스 과학자로부터 탈출하세요. 힌트는 단 한 번만 사용할 수 있습니다.','2024-05-10 05:45:08','2024-05-10 05:45:08','75ed4e7a-0e90-11ef-ad01-0242ac101402');
INSERT INTO `thema` VALUES (3,3,'당신은 과학자입니다. 제한시간 10분동안 3개의 문제를 해결해서 도망치는 실험체를 잡으세요. 힌트는 단 한 번만 사용할 수 있습니다.','2024-05-10 05:45:08','2024-05-10 05:45:08','75ed6db5-0e90-11ef-ad01-0242ac101402');
INSERT INTO `thema` VALUES (7,4,'나는 오늘도 공부하기 싫다! 도망치자!','2024-05-10 05:45:08','2024-05-10 05:45:08','75ede733-0e90-11ef-ad01-0242ac101402');
INSERT INTO `thema` VALUES (8,5,'당신은 교육생입니다. 제한시간 10분동안 3개의 문제를 해결해서 멀티캠퍼스를 떠나세요. 힌트는 단 한 번만 사용할 수 있습니다.','2024-05-10 05:45:08','2024-05-10 05:45:08','75ee0a18-0e90-11ef-ad01-0242ac101402');
INSERT INTO `thema` VALUES (9,6,'당신은 컨설턴트입니다. 제한시간 10분동안 3개의 문제를 해결해서 도망가려는 교육생을 붙잡으세요. 힌트는 단 한 번만 사용할 수 있습니다.','2024-05-10 05:45:08','2024-05-10 05:45:08','75ee2e80-0e90-11ef-ad01-0242ac101402');
INSERT INTO `thema` VALUES (10,7,'눈을 뜨니 우주선이다. 나에게 주어진 시간은 10분, 시간 내에 이 우주선을 탈출해야한다!','2024-05-10 05:45:10','2024-05-10 05:45:10','76a47484-0e90-11ef-ad01-0242ac101402');
/*!40000 ALTER TABLE `thema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `login_id` varchar(255) NOT NULL,
  `password` varchar(512) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `point` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` varchar(36) DEFAULT (uuid()),
  `withdrawal` tinyint NOT NULL DEFAULT '0',
  `profile_url` varchar(3000) DEFAULT NULL,
  `saved_file_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'asdf','asdf','asdf',100,'2024-05-10 05:45:08','2024-05-10 05:45:08','c83e73a6-0470-11ef-9c95-0242ac101404',0,NULL,NULL);
INSERT INTO `user` VALUES (2,'qwer','qwer','qwer',200,'2024-05-10 05:45:08','2024-05-10 05:45:08','c83e8aea-0470-11ef-9c95-0242ac101404',0,NULL,NULL);
INSERT INTO `user` VALUES (3,'zxcv','zxcv','zxcv',300,'2024-05-10 05:45:08','2024-05-10 05:45:08','c83ea244-0470-11ef-9c95-0242ac101404',0,NULL,NULL);
INSERT INTO `user` VALUES (4,'poiu','poiu','poiu',400,'2024-05-10 05:45:08','2024-05-10 05:45:08','c83eb2fe-0470-11ef-9c95-0242ac101404',0,NULL,NULL);
INSERT INTO `user` VALUES (5,'mnbv','mnbv','mnbv',5000,'2024-05-10 05:45:08','2024-05-10 05:45:08','c83ec6b2-0470-11ef-9c95-0242ac101404',0,NULL,NULL);
INSERT INTO `user` VALUES (6,'o2juice','$2a$10$hil/dS4FZoSrUKYoFu8V6uhhv6ppfsbedwlp6Am2bt/R/AHa0pbRS','맛있는 오이쥬스',0,'2024-05-10 05:45:47','2024-05-18 11:00:43','c38b101b-9842-4b2d-9e79-bc75de81caec',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/c71ebe2f-99e6-4e01-a364-2048a5c174dd_random_dice.png','c71ebe2f-99e6-4e01-a364-2048a5c174dd_random_dice.png');
INSERT INTO `user` VALUES (7,'ohiju','$2a$10$lI7a7QGVRfaV3PevAPi8xuFFFyiUAdSNRJNye8GgWmJbCcpR3/hF.','스트릿출신 부자아빠',0,'2024-05-10 05:47:16','2024-05-10 05:47:16','54024b0f-79f6-44b9-8b6b-d43a15f4b8f2',0,'https://s-learner-bucket.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (8,'oheeju','$2a$10$F3mNGU/kGoMMwOp6meGarufYGPLrR.zSdl6LiCWrUctCSkcqSPKue','톡쏘는소방관',0,'2024-05-11 07:31:20','2024-05-19 13:24:46','02ef5c49-ce58-40f3-a451-79f43c3d02e5',0,'https://s-learner-bucket.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (9,'io1234','$2a$10$ujW0YkNIwstb86ZusPNI4.7dZhqLHzppoFrA.yT7MwqJvG8.6vk2i','시계 볼 줄 모르는 밀크쉐이크',0,'2024-05-11 08:30:28','2024-05-11 08:30:28','6fd50119-0e89-4699-ab85-5587befad476',0,'https://s-learner-bucket.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (10,'qwert3','$2a$10$nyMg9saLexGRJk1EMsq88.TZpGeXIXoaJhbzRfAIJQInMhzJ3zuf2','길에서 외국인을 만난 방울토마토',0,'2024-05-12 03:14:15','2024-05-12 03:14:15','8530e486-f9f1-42d2-a0dd-19a79b99e843',0,'https://s-learner-bucket.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (11,'qwert2','$2a$10$So2m2JzlJnqjylX6hRrsMu7mgRloQedjpH3kba17KIwDVzPNy7WTK','불면증 걸린 웰시코기',0,'2024-05-12 04:54:38','2024-05-12 04:54:38','ec018938-fd70-45e1-a892-fc715f127491',0,'https://s-learner-bucket.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (12,'qwertyuiop','$2a$10$QHQe0a8icGpkhAs9DqvOHOfR5f6kyVzeeKwdfUIpAYjimWsEmTsyq','삼겹살을 굽고 있는 아이언맨',0,'2024-05-12 06:58:00','2024-05-16 06:52:30','bcfc8d9f-83ce-49de-a2d7-ba3fa37c82b2',0,'https://s-learner-bucket.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (13,'sansan','$2a$10$FXJj1kxlmdXv3Qwhdq86/.gpQZTapEDcFb86xzEIwqq2/zCLL7eTO','침대한테 삼켜진 공기계',0,'2024-05-13 01:24:36','2024-05-19 17:21:43','7c3ea38b-bc25-4a4f-8e92-3f446543103a',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/de4871b0-7171-446d-8094-880c040049fb_1536156589444.jpg','de4871b0-7171-446d-8094-880c040049fb_1536156589444.jpg');
INSERT INTO `user` VALUES (14,'hiheejoo','$2a$10$7Yi9AYdIrUFm/Q64.OHZ3.z0mNCcIKNT9U4zDFwZ7jeCt68xxTtMa','렉 걸린 단벌신사',0,'2024-05-13 01:38:45','2024-05-13 01:38:45','50fff5bc-5da6-40cb-9dda-1b6b19d8aa03',0,'https://s-learner-bucket.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (15,'o2o2','$2a$10$4wuHB/4xhML2yuC6smEIB.1UsWU0d03ljNZ4QjB8p0TNvRhV3GNGW','킹갓희주',0,'2024-05-13 04:43:23','2024-05-18 11:02:08','2807c692-80f8-483f-bbd0-233057c2c5d4',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/98200718-8d3a-4b32-80f8-bef9b0ea4e3a_gameroom.png','98200718-8d3a-4b32-80f8-bef9b0ea4e3a_gameroom.png');
INSERT INTO `user` VALUES (16,'asdfff','$2a$10$Tq7ObTd0.533bOFgQ.Gdh.DpbBpWqMre5VuELQfjSiTdIqOLxDKVm','시대를 앞서간 간달프',0,'2024-05-13 06:59:01','2024-05-13 06:59:01','f8f6e489-6695-4749-af61-913dbbdc760a',0,'https://s-learner-bucket.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (17,'luke1046','$2a$10$rCOPMtRMJlP9bLVe9e3PlepI2WIhRt0dVHNLMc9lwpQSLrfyGYDVu','서럽게 우는 알바 사장',0,'2024-05-14 00:25:17','2024-05-14 00:25:17','59668833-4074-4178-995a-ba79b9530bca',0,'https://s-learner-bucket.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (18,'asdfaa','$2a$10$rT5lcr2GA/4Gh4tTElGaYeqdP7t3UFn8DQjrEc1wBL8Ct4Cq0InO2','겨울잠자는 잔소리',0,'2024-05-14 01:45:51','2024-05-14 01:45:51','d709b964-ff83-4fd4-9476-1f0538d0f895',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (19,'mmm3657','$2a$10$wz9IGze8dF4KZt3Uu9vc5.ZArmBDqE2al0XQ/lK1ETXYL/903FDTW','배고픈 다람쥐',0,'2024-05-14 09:01:54','2024-05-14 09:01:54','50d733ed-6c6d-4e6a-a881-ddaf987d0b88',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (20,'qqq','$2a$10$RWdcPH5x.9e8lIp.VO5lBOuwFMssnZXMSlsmv0x0CzOQQ2ZZfWFtq','책만 읽으면 잠드는 방울토마토',0,'2024-05-15 18:44:49','2024-05-15 18:44:49','b9f26678-4619-4d75-8c7a-22579c10fef8',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (21,'aba','$2a$10$QjhYMpj4Zkzq0VIqU/oGs.dX/tr6m0.ZT3Y3Y03SfZYvxR/3oLkwa','매운 음식을 못먹는 엑셀마스터',0,'2024-05-15 18:45:16','2024-05-15 18:45:16','749d119d-25b3-497f-aed1-9a683ea839fe',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (22,'abc','$2a$10$SSCmNmxsDxDLmdeT6Jbs8uo504glCkb3HAwoy7KU.fJAQsSTtp4U2','과장님한테 혼난 아기상어',0,'2024-05-16 01:06:16','2024-05-16 01:06:16','2042d174-190e-427b-8242-60f1e3589d39',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (23,'coach01','$2a$10$sbwY8A2u0PGGz5C8.mLR3uWf.FcEU.sHKmhIotwvDFzfDhhRvfzB2','책 읽고 있는 뉴요커',0,'2024-05-16 04:04:45','2024-05-16 04:04:45','987b16e9-9aff-4f95-a2b0-33c530bbb619',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (24,'qwe123','$2a$10$S13gDsI7SeNlGFp72WujAu1xF221C2N7A5CjeSv.SB3Z66eCrjAVm','커피내리는 편돌이',0,'2024-05-16 04:48:59','2024-05-16 04:48:59','fd2461bf-ad8e-449d-b05e-e71e25f98d8e',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (25,'rhrnak','$2a$10$lrabcN7NttXBXCMauy2EPuDtk5s5Qz2eYX41EzwhI5ErJDjGpQeQO','108배 하는 티모',0,'2024-05-16 05:10:34','2024-05-16 05:10:34','5882b7cc-9844-4417-ade6-5ebe3e5a6276',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (26,'tester','$2a$10$n2v4KC.2CxF.0BeLS.QqdenSez3AUR/mFX4Pxr2mYbVcIrhFwQ0Zu','다이어트 실패하는 주사위',0,'2024-05-16 05:10:55','2024-05-16 05:10:55','9cc77db0-4950-491d-abab-fb17a2271d6e',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (27,'rkawk','$2a$10$eq/mxkyhLTJ1Upd54DgPz.f0ZSW/HQD3iIsmm9mPKU3z1lKE//On6','멍때리는 즐라탄',0,'2024-05-16 05:11:03','2024-05-16 05:11:03','7d65ed92-594b-4228-8de2-d82f7a73f7a7',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (28,'san','$2a$10$fEGSYq3086u6CC0f.d98beMaRdUQFu0VQyONVXKwEFrOMgzPDiztW','덤블링하는 선인장',0,'2024-05-16 05:47:31','2024-05-16 05:47:31','701e5a65-1f26-49d4-9b97-bb6ec19ea435',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (29,'asap','$2a$10$eP1LNhapgcIIgY8p8LTCjOHpldIYEVqcdzblsOL9zCuTZcJI9HV7e','혈액형을 맹신하는 영웅',0,'2024-05-16 05:51:04','2024-05-16 05:51:04','486a99e8-decf-4f79-8ee6-7f07413a90a3',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (30,'heejuicesPartner','$2a$10$rctch3bLnlTrDFsMdovLzeoaXkaKFSlfLjHxS5Fyd6sztdDvORi9u','내집 마련을 꿈꾸는 유튜버',0,'2024-05-16 06:22:41','2024-05-16 06:22:41','00c9900a-f6c9-4927-92cb-9cc8f384a58d',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (31,'workju1124','$2a$10$SPgSayYy3dI5oOjZTlFz8.FdJfJMI.3QFXXH/pUYvZqNg3ku9MGdW','바짓가랑이 붙잡는 주사위',0,'2024-05-16 07:33:36','2024-05-16 07:33:36','e8ef2732-0571-4672-8ddb-d99f536c6fa5',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (32,'asdf1234','$2a$10$VUhI3cJO3.2Spv1MPBBKqOQF78FvgygOfxlaCbLLoNWdgUb/h9CKO','나는야 송정훈',0,'2024-05-16 07:34:17','2024-05-16 07:34:59','f2470a92-ead1-4df0-ba25-20865dc669f7',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (33,'aaa','$2a$10$8N0i02rAFhCVUr.S18uRZOOtQ1dK9aXKTsCtwy5NIlnH7gBVgIyoq','눈이 침침한 엑셀마스터',0,'2024-05-16 07:59:03','2024-05-16 07:59:03','83056f89-059d-42f8-856a-f4359c215373',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (34,'ohijuice','$2a$10$r4j4YFAyFUZMMh7O5ecNeufTwHOooIXPVgYGDfZLEVz7smIJJgxj2','눈이 침침한 최고령 유치원생',0,'2024-05-16 08:01:24','2024-05-16 08:01:24','95e6b763-f182-4562-94a7-8b1a6a1562de',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (35,'asdfghjkl','$2a$10$u.KK3SA8az/3h/Zn/BLbHeu15dwAqgVvGmRDFd/z2194IpqrSEnNW','힘쎈승려',0,'2024-05-17 04:07:26','2024-05-17 07:43:42','0b73937e-8ed8-441f-b757-1292252d9711',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (36,'abc123','$2a$10$oC5z1Dog8yqVmj1g5QkYKOvwev/90xq.KloETN99GFgbTnQHe1ZMO','얍쌉한간호사',0,'2024-05-17 05:18:52','2024-05-17 05:18:52','630b7383-1ab4-46a2-8ff3-66f9e0949569',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (37,'mike','$2a$10$yMrNfMaxdP49FoCYby66Ie28spy8bVUoV0TrM7bmI5q.umnHExLy6','빠른감자',0,'2024-05-17 06:00:58','2024-05-17 06:00:58','5fd2801a-6af5-497d-9764-11299d4cdcad',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (38,'dysgus2','$2a$10$Zom9zjCeXNIPkRrSxffMVO6tjohG4zxw2v3rnsOa0uJqJkIJad8Hy','피곤한늑대',0,'2024-05-17 06:23:26','2024-05-17 06:23:26','a5f0f9dc-f32e-46ce-9253-52ded9eb2f37',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (39,'sss','$2a$10$rSVy4c2YSkA6bmeZYEL4G.VVmmHgPEigJwad7NleOoByMazigU4kO','a303팀 최고다',0,'2024-05-17 06:43:48','2024-05-19 07:01:55','c0e6153e-628d-4775-a339-12183a8ebac4',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (40,'consultant','$2a$10$BhEom4Blm5NuXCD7j660BepPbeOMXWXNeW2Ledbcsox.AyWeZXDru','지루한비버',0,'2024-05-17 06:51:50','2024-05-17 06:51:50','1106f8c9-8116-4416-8bec-8351c741e231',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (41,'coach123','$2a$10$GjQFqNFx0P/em4NNz/4g7.yGfbEFKZ/N.hQs52SOYGQlic8P8Xmq.','기쎈치킨',0,'2024-05-17 06:52:38','2024-05-17 06:52:38','c60efb7c-bd1e-4f64-b256-1482948d3167',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (42,'kangmin','$2a$10$srTlww8DWi34Bwr5Ect/meg6VcrzZQspKRF/0djTQHP3XgHHKi5oa','현명한떡볶이',0,'2024-05-17 11:53:15','2024-05-17 11:53:15','b5c15e56-0ed0-4fb7-bb78-97f667abb38e',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (43,'jenoya','$2a$10$JhFWMLaauXEZNdLSG6CDNu9rTi8OsOlTOZy3P57ATva1o0qhkdNFa','얼사몸도',0,'2024-05-17 11:59:43','2024-05-17 12:00:05','a59a353c-7b66-4e38-ac83-d9c5e6f4ad0f',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (44,'wjkim135','$2a$10$4Lh4jKuTVlNl2zOcTkUSheNciSEIpjxnB0K7E3GJglF7gJRmkymxO','바삭한찌개',0,'2024-05-18 05:27:43','2024-05-18 05:27:43','13786bc8-be00-48e3-8641-af51314a7bb2',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (45,'ssafssaf','$2a$10$fc2XdTVDdInvbNsQtSG2NO3v4SzGdoa0QmATozRFRjcvoKfvcMvPW','잘익은학생',0,'2024-05-18 12:30:51','2024-05-18 12:30:51','2f8fcb5d-0a2c-48e3-8df3-12d9015d792a',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (46,'ohskjy123','$2a$10$id91Di36RcyL.DUaRqNTiuDJ0ITLZDfFjADn/nKYEBtJvvAjtwKBm','볼록한수달',0,'2024-05-18 13:22:23','2024-05-18 13:22:23','5bbf14b6-86f7-4c4d-afef-671702d42129',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (47,'aaaa','$2a$10$MmccJm4metuwN17G2BfzpOynOQyhi1Sde2nml6nIfQ06bv8HIhdo6','당황한병아리',0,'2024-05-18 13:49:14','2024-05-18 13:49:14','393029fb-24b4-4008-b641-3b223b6c067f',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (48,'proforme','$2a$10$iZMaGbnityzeEpY53.oEVOGm4hFLcASX7pJm1zLlpaGoaCI.dxfuq','담백한피자',0,'2024-05-18 13:58:15','2024-05-18 13:58:15','bc9bbbbe-c693-4e1c-b4ad-84fff3edaf9f',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (49,'unzo','$2a$10$Cd.o2MiOm9iCTZuH3hEB2Oe/SnC.TSI0sjEqeYxu48TEZsAp2R8K6','새콤한니모',0,'2024-05-18 14:48:14','2024-05-18 14:48:36','a34b1319-8754-4fa5-afac-960e6f27270e',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (50,'yuk07','$2a$10$8LihYUgZeO/uThW9oPiE1.ze0MTtlhf6IGtcSaCIFnNZJsCf5eIDa','날씬한꽃개',0,'2024-05-18 14:50:18','2024-05-18 14:50:18','4e7af2c9-e652-465d-a40d-c78b57e9e92e',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (51,'ybyb99','$2a$10$uLfOz2r0tpw5E3oho9E9zungC8bwgSgyV1iCNgdHLYe33xkQ0C.w6','차가운떡볶이',0,'2024-05-18 14:50:40','2024-05-18 14:50:40','12ed0688-cdc4-4f01-a696-726684e8e0f9',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (52,'taehyeon','$2a$10$PdrSDbbjpzRlIBngLles5uV1st1Bb19e2pUhEGY2ZNWTk278v/Hzy','씩씩한악어',0,'2024-05-18 14:51:48','2024-05-18 14:54:55','a03ec63b-0827-4f84-ad2f-d56430efa898',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (53,'qwer1','$2a$10$HLPEdp02HSa5hKXQuuS9o.0QxUzhM3Tbe0HYvjEHy26KssG0t6Oki','잔잔한참외',0,'2024-05-18 16:01:40','2024-05-18 16:01:40','cbbb5758-b06e-4d75-a17b-04025ce4493f',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (54,'duck','$2a$10$EHzkGlMNfbLhdi65gzan2eZ.l5xRDjiN6.SlMl9dFMbGEs43sU2uW','높은국민',0,'2024-05-18 16:02:00','2024-05-18 16:02:00','a6a7dae7-c797-46ec-a51c-6f513ffb9a28',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (55,'o1234','$2a$10$IM2q6loDr9i1g5JkiENPkOuBcDpfckp66RD1UlG4rHhcjkdIyWT4q','덜익은배추',0,'2024-05-18 20:09:03','2024-05-18 20:09:03','6bbfe8ce-a461-45cb-8ceb-72d0460cecc1',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
INSERT INTO `user` VALUES (56,'song','$2a$10$nSrvfW5q1JZFX4IzR6fqZu6C5I3DuRSQh6rA6DhgEHXMR7PrfC/Kq','잘익은콧털',0,'2024-05-19 13:24:51','2024-05-19 16:43:17','268f3a81-6ca0-4885-afba-7ba1daf07395',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/ca071c21-38ec-4fed-8a9f-8611364498db_jira%20%ED%94%84%EB%A1%9C%ED%95%84%20%EC%BC%80%EB%A1%9C%ED%94%BC%20%EC%82%AC%EC%A7%84.png','ca071c21-38ec-4fed-8a9f-8611364498db_jira 프로필 케로피 사진.png');
INSERT INTO `user` VALUES (57,'ilovebyeongjookorea','$2a$10$FDlf5jX1zAjq4Yp00.cToO2j8Hhb.m6ByIAg8Enunz0xiPhB72inW','우아한붕어빵',0,'2024-05-19 23:59:42','2024-05-19 23:59:42','b8517713-70cc-46a0-b5c7-7af572a40cbb',0,'https://escape-sf.s3.ap-northeast-2.amazonaws.com/profiles/10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY+%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.jpg','10d67aa9-722e-4a62-9eaf-737df1fa564a_SSAFY 바탕화면.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  0:12:28
