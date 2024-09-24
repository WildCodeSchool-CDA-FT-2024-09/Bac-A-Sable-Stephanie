CREATE TABLE `status` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `private` BOOL
);

CREATE TABLE `repo` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `url` VARCHAR(150) NOT NULL,
    `status_id` INT,
    FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `comment` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `text` TEXT,
    `repo_id` INT,
    FOREIGN KEY (`repo_id`) REFERENCES `repo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `language` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(50)
);

CREATE TABLE `repo_language` (
    `repo_id` INT,
    `language_id` INT,
    FOREIGN KEY (`repo_id`) REFERENCES `repo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`repo_id`, `language_id`)
);