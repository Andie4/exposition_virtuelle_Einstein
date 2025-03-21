-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 21 mars 2025 à 21:26
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `nom_admin`, `prenom_admin`, `mail_admin`, `login_admin`, `mdp_admin`) VALUES
(1, 'Desgranges', 'Emilie', 'emilie.desgranges78@gmail.com', 'emilie_admin', '$2y$10$7KOy2dgEuRXIhmpRb6iIf.GAZNwG5eEb0vH0pe777Jx7pgyM.S1r6');

-- --------------------------------------------------------

--
-- Structure de la table `billet`
--

DROP TABLE IF EXISTS `billet`;
CREATE TABLE IF NOT EXISTS `billet` (
  `id_billet` int NOT NULL AUTO_INCREMENT,
  `nom_billet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `prenom_billet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `resa_billet` int NOT NULL,
  `tarif_billet` int NOT NULL,
  PRIMARY KEY (`id_billet`),
  KEY `resa` (`resa_billet`),
  KEY `tarif` (`tarif_billet`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `billet`
--

INSERT INTO `billet` (`id_billet`, `nom_billet`, `prenom_billet`, `resa_billet`, `tarif_billet`) VALUES
(74, 'Duranda', 'Paul', 29, 3),
(78, 'Lalala', 'gzgbhzoerbg', 29, 3);

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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `resa`
--

INSERT INTO `resa` (`id_resa`, `date_resa`, `heure_resa`, `mail_resa`, `nom_resa`, `prenom_resa`) VALUES
(29, '2025-10-25', '15:00:00', 'jean.dupont@email.com', 'Dupont', 'Jean');

-- --------------------------------------------------------

--
-- Structure de la table `tarif`
--

DROP TABLE IF EXISTS `tarif`;
CREATE TABLE IF NOT EXISTS `tarif` (
  `id_tarif` int NOT NULL AUTO_INCREMENT,
  `nom_tarif` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prix_tarif` int NOT NULL,
  PRIMARY KEY (`id_tarif`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tarif`
--

INSERT INTO `tarif` (`id_tarif`, `nom_tarif`, `prix_tarif`) VALUES
(3, 'Jeune -26ans', 10),
(4, 'Senior +65ans', 0),
(6, 'Premium', 12),
(8, 'Banane', 50);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `billet`
--
ALTER TABLE `billet`
  ADD CONSTRAINT `billet_ibfk_1` FOREIGN KEY (`resa_billet`) REFERENCES `resa` (`id_resa`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `billet_ibfk_2` FOREIGN KEY (`tarif_billet`) REFERENCES `tarif` (`id_tarif`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
