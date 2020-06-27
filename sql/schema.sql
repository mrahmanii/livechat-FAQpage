CREATE TABLE `messages`(
    `message_id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(45) DEFAULT NULL,
    `user_name` VARCHAR(45) DEFAULT NULL,
    `staff_id` VARCHAR(45) DEFAULT NULL,
    `staff_name` VARCHAR(45) DEFAULT NULL,
    `sent_time` TIMESTAMP NULL DEFAULT NULL,
    `direction` VARCHAR(45) DEFAULT NULL,
    `message` VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY(`message_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 174 DEFAULT CHARSET = latin1;
