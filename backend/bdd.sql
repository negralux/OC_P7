-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 02, 2020 at 12:15 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `GROUPOMANIA`
--

-- --------------------------------------------------------

--
-- Table structure for table `fonction`
--

CREATE TABLE `fonction` (
  `id` int(11) NOT NULL,
  `metier` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fonction`
--

INSERT INTO `fonction` (`id`, `metier`) VALUES
(1, 'Technicien'),
(2, 'Ingénieur'),
(3, 'Direction'),
(4, 'Chargé de communication');

-- --------------------------------------------------------

--
-- Table structure for table `membre`
--

CREATE TABLE `membre` (
  `id` int(11) NOT NULL,
  `date_inscription` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pseudo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int(3) NOT NULL,
  `metier` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `membre`
--

INSERT INTO `membre` (`id`, `date_inscription`, `pseudo`, `email`, `password`, `level`, `metier`, `admin`) VALUES
(1, '2020-09-02 14:10:35', 'philbee', 'philbee@groupomania.fr', '$2b$10$hRSexdu0RLzPHn600Z.kW.jHHvbjSptlBP6/VsH5vOgkMGQ973xhy', 4, 'Chargé.e de communication', 1);

-- --------------------------------------------------------

--
-- Table structure for table `wall`
--

CREATE TABLE `wall` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `userPseudo` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_publication` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `urlImage` text COLLATE utf8mb4_unicode_ci,
  `admin` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fonction`
--
ALTER TABLE `fonction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membre`
--
ALTER TABLE `membre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wall`
--
ALTER TABLE `wall`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fonction`
--
ALTER TABLE `fonction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wall`
--
ALTER TABLE `wall`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;