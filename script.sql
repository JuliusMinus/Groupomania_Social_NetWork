
DROP TABLE IF EXISTS users_roles;
CREATE TABLE `users_roles` (
  `id` int unsigned NOT NULL,
  `role_Name` varchar(50) NOT NULL,
  `image_URL` varchar(255) NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users_roles` VALUES ('1', 'user', null, null, null);
INSERT INTO `users_roles` VALUES ('2', 'manager', null, null, null);
INSERT INTO `users_roles` VALUES ('3', 'admin', null, null, null);

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email_H` varchar(300) NOT NULL,
  `email_Crypt` varchar(500) NOT NULL,
  `password_H` varchar(500) NOT NULL,
  `job` varchar(50) DEFAULT NULL,
  `photo_URL` varchar(255) DEFAULT NULL,
  `division` varchar(75) DEFAULT NULL,
  `role_Id` int unsigned DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `last_Connexion` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_email_H` (`email_H`),
  UNIQUE KEY `email_H` (`email_H`),
  UNIQUE KEY `email_H_2` (`email_H`),
  UNIQUE KEY `email_H_3` (`email_H`),
  KEY `fk_role` (`role_Id`),
  CONSTRAINT `fk_role` FOREIGN KEY (`role_Id`) REFERENCES `users_roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 ;



DROP TABLE IF EXISTS post_comment_list;
CREATE TABLE `post_comment_list` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` text,
  `image_URL` varchar(500) DEFAULT NULL,
  `reference` int unsigned DEFAULT NULL,
  `identity_Id` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ind_identity` (`identity_Id`),
  KEY `fk_listcomments_of_post` (`reference`),
  CONSTRAINT `fk_identity` FOREIGN KEY (`identity_Id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_listcomments_of_post` FOREIGN KEY (`reference`) REFERENCES `post_comment_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=315 DEFAULT CHARSET=utf8mb4;

