-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 18 mars 2025 à 09:01
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `expo_einstein`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `nom_admin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom_admin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mail_admin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `login_admin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mdp_admin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `nom_admin`, `prenom_admin`, `mail_admin`, `login_admin`, `mdp_admin`) VALUES
(1, '', '', '', 'emilie_admin', '$2y$10$cOZA6G8i8g9TpFLldPuIBeaW5y6evr7FRxvpUbBUCZjkQRvZ40K/2');

-- --------------------------------------------------------

--
-- Structure de la table `billet`
--

DROP TABLE IF EXISTS `billet`;
CREATE TABLE IF NOT EXISTS `billet` (
  `id_billet` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `resa` int NOT NULL,
  `tarif` int NOT NULL,
  PRIMARY KEY (`id_billet`),
  KEY `resa` (`resa`),
  KEY `tarif` (`tarif`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `billet`
--

INSERT INTO `billet` (`id_billet`, `nom`, `prenom`, `resa`, `tarif`) VALUES
(44, 'Martin', 'Sophie', 14, 1),
(45, 'Durand', 'Paul', 14, 2),
(48, 'Martin', 'Sophie', 16, 1),
(49, 'Durand', 'Paul', 16, 2);

-- --------------------------------------------------------

--
-- Structure de la table `resa`
--

DROP TABLE IF EXISTS `resa`;
CREATE TABLE IF NOT EXISTS `resa` (
  `id_resa` int NOT NULL AUTO_INCREMENT,
  `date_resa` date NOT NULL,
  `heure_resa` time NOT NULL,
  `mail_resa` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nom_resa` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom_resa` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_resa`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `resa`
--

INSERT INTO `resa` (`id_resa`, `date_resa`, `heure_resa`, `mail_resa`, `nom_resa`, `prenom_resa`) VALUES
(13, '2025-12-05', '10:30:00', 'jean@gme.com', 'jean', 'lolo'),
(14, '2025-10-25', '15:00:00', 'jean.dupont@email.com', 'Dupont', 'Jean'),
(16, '2025-10-25', '15:00:00', 'jean.dupont@email.com', 'Dupont', 'Jean');

-- --------------------------------------------------------

--
-- Structure de la table `tarif`
--

DROP TABLE IF EXISTS `tarif`;
CREATE TABLE IF NOT EXISTS `tarif` (
  `id_tarif` int NOT NULL AUTO_INCREMENT,
  `nom_tarif` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prix` int NOT NULL,
  PRIMARY KEY (`id_tarif`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tarif`
--

INSERT INTO `tarif` (`id_tarif`, `nom_tarif`, `prix`) VALUES
(1, 'Plein Tarif', 10),
(2, 'Enfant -16ans', 0),
(3, 'Jeune -26ans', 0),
(4, 'Senior +65ans', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `billet`
--
ALTER TABLE `billet`
  ADD CONSTRAINT `billet_ibfk_1` FOREIGN KEY (`resa`) REFERENCES `resa` (`id_resa`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `billet_ibfk_2` FOREIGN KEY (`tarif`) REFERENCES `tarif` (`id_tarif`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
