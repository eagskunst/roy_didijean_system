-- Table structure for table `admins`
CREATE TABLE `admins` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `username` TEXT NOT NULL,
  `created_date` DATETIME NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Table structure for table `clients`
CREATE TABLE `clients` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `cedula` TEXT NOT NULL,
  `address` TEXT NOT NULL,
  `cellphone_number` TEXT DEFAULT NULL,
  `created_date` DATETIME NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Table structure for table `company`
CREATE TABLE `company` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `provider_id` INTEGER NOT NULL,
  `rif` TEXT NOT NULL,
  `company_name` TEXT NOT NULL,
  `created_date` DATETIME NOT NULL,
  FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`)
);

-- Table structure for table `independent`
CREATE TABLE `independent` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `provider_id` INTEGER NOT NULL,
  `cedula` TEXT NOT NULL,
  `birthDate` TEXT DEFAULT NULL,
  `created_date` DATETIME NOT NULL,
  FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`)
);

-- Table structure for table `providers`
CREATE TABLE `providers` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `address` TEXT NOT NULL,
  `phone_number` TEXT DEFAULT NULL,
  `email` TEXT NOT NULL,
  `created_date` DATETIME NOT NULL
);

-- Table structure for table `SequelizeMeta`
CREATE TABLE `SequelizeMeta` (
  `name` TEXT NOT NULL
);

-- Table structure for table `users`
CREATE TABLE `users` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `created_date` DATETIME NOT NULL,
  `last_session_timestamp` DATETIME DEFAULT NULL
);

-- Indexes for dumped tables

-- Indexes for table `admins`
CREATE UNIQUE INDEX `username` ON `admins` (`username`);

-- Indexes for table `clients`
CREATE UNIQUE INDEX `cedula` ON `clients` (`cedula`);
CREATE INDEX `user_id` ON `clients` (`user_id`);

-- Indexes for table `company`
CREATE UNIQUE INDEX `rif` ON `company` (`rif`);
CREATE INDEX `provider_id` ON `company` (`provider_id`);

-- Indexes for table `independent`
CREATE UNIQUE INDEX `cedula` ON `independent` (`cedula`);
CREATE INDEX `provider_id` ON `independent` (`provider_id`);

-- Indexes for table `providers`
CREATE UNIQUE INDEX `email` ON `providers` (`email`);

-- Indexes for table `SequelizeMeta`
CREATE UNIQUE INDEX `name` ON `SequelizeMeta` (`name`);

-- Indexes for table `users`
CREATE UNIQUE INDEX `email` ON `users` (`email`);


INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_date`, `last_session_timestamp`) VALUES
(1, 'Tony Stark', 'tony@stark.com', '$2b$10$FLyOaZ2FxlmU8h3xDws1fukjpVW5/8j9yvLzLpv0oYnlRRcSbMNqO', '2023-09-15 00:00:00', NULL);


INSERT INTO `admins`(`id`,`user_id`,`username`, `created_date`) VALUES (1, 1, 'tony.stark', '2023-09-15 00:00:00');