-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Sep 27, 2023 at 02:43 PM
-- Server version: 5.7.42
-- PHP Version: 8.2.8


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `roy_didijean`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(4) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL
);

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `user_id`, `username`, `created_date`) VALUES
(1, 1, 'tony.stark', '2023-09-27 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `created_date` datetime NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cedula` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `cellphone_number` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `rif` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `garments`
--

CREATE TABLE `garments` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `style` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `type` enum('upper','lower','full') NOT NULL,
  `created_date` datetime NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `independent`
--

CREATE TABLE `independent` (
  `id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `cedula` varchar(255) NOT NULL,
  `birthDate` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity_in_stock` int(11) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `buy_cost` decimal(10,0) DEFAULT NULL,
  `sell_cost` decimal(10,0) DEFAULT NULL,
  `created_date` datetime NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

CREATE TABLE `providers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20230802032911-create-user.js'),
('20230803215245-create-client-admin.js'),
('20230803225113-create-providers.js'),
('20230923195257-create-products.js'),
('20230924174858-create-transaction-buy-sell.js'),
('20230924201547-create-bill.js');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `currency` VARCHAR(5) CHECK(`currency` IN ('usd','cop','ves')) NOT NULL,
  `payment_method` VARCHAR(10) CHECK( `payment_method` IN ('cash','card','transfer','movil')) NOT NULL,
  `data_payment` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `total` int(11) DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL,
  `last_session_timestamp` datetime DEFAULT NULL
);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_date`, `last_session_timestamp`) VALUES
(1, 'Tony Stark', 'tony@stark.com', '$2b$10$FLyOaZ2FxlmU8h3xDws1fukjpVW5/8j9yvLzLpv0oYnlRRcSbMNqO', '2023-09-27 00:00:00', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`,`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`,`product_id`,`transaction_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`,`user_id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`,`provider_id`),
  ADD UNIQUE KEY `rif` (`rif`),
  ADD KEY `provider_id` (`provider_id`);

--
-- Indexes for table `garments`
--
ALTER TABLE `garments`
  ADD PRIMARY KEY (`id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `independent`
--
ALTER TABLE `independent`
  ADD PRIMARY KEY (`id`,`provider_id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD KEY `provider_id` (`provider_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `provider_id` (`provider_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `garments`
--
ALTER TABLE `garments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `independent`
--
ALTER TABLE `independent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `garments`
--
ALTER TABLE `garments`
  ADD CONSTRAINT `garments_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `independent`
--
ALTER TABLE `independent`
  ADD CONSTRAINT `independent_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
