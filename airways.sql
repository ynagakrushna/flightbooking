-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema airways
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema airways
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `airways` DEFAULT CHARACTER SET utf8 ;
USE `airways` ;

-- -----------------------------------------------------
-- Table `airways`.`airlines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `airways`.`airlines` (
  `airline_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`airline_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `airways`.`airports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `airways`.`airports` (
  `airport_id` INT(11) NOT NULL AUTO_INCREMENT,
  `iata_code` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`airport_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `airways`.`flightclass`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `airways`.`flightclass` (
  `flightclass_id` INT(11) NOT NULL AUTO_INCREMENT,
  `class_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`flightclass_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `airways`.`flights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `airways`.`flights` (
  `flight_id` INT(11) NOT NULL AUTO_INCREMENT,
  `flight_number` VARCHAR(50) NOT NULL,
  `departure_date_time` DATETIME NOT NULL,
  `arrival_date_time` DATETIME NOT NULL,
  `duration_in_minutes` INT(11) NOT NULL,
  `distance_in_miles` INT(11) NOT NULL,
  `airline_id` INT(11) NOT NULL,
  PRIMARY KEY (`flight_id`),
  INDEX `fk_flights_airlines1_idx` (`airline_id` ASC) VISIBLE,
  CONSTRAINT `fk_flights_airlines1`
    FOREIGN KEY (`airline_id`)
    REFERENCES `airways`.`airlines` (`airline_id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `airways`.`flights_has_airports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `airways`.`flights_has_airports` (
  `flight_id` INT(11) NOT NULL,
  `airport_id` INT(11) NOT NULL,
  PRIMARY KEY (`flight_id`, `airport_id`),
  INDEX `fk_flights_has_airports_airports1_idx` (`airport_id` ASC) VISIBLE,
  INDEX `fk_flights_has_airports_flights1_idx` (`flight_id` ASC) VISIBLE,
  CONSTRAINT `fk_flights_has_airports_airports1`
    FOREIGN KEY (`airport_id`)
    REFERENCES `airways`.`airports` (`airport_id`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_flights_has_airports_flights1`
    FOREIGN KEY (`flight_id`)
    REFERENCES `airways`.`flights` (`flight_id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `airways`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `airways`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `airways`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `airways`.`tickets` (
  `ticket_id` INT(11) NOT NULL AUTO_INCREMENT,
  `ticket_number` VARCHAR(50) NOT NULL,
  `price` DECIMAL(5,2) NOT NULL,
  `confirmationNumber` CHAR(32) NOT NULL,
  `flightclass_id` INT(11) NOT NULL,
  `flight_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`ticket_id`),
  INDEX `fk_tickets_flightclass1_idx` (`flightclass_id` ASC) VISIBLE,
  INDEX `fk_tickets_flights1_idx` (`flight_id` ASC) VISIBLE,
  INDEX `fk_tickets_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_tickets_flightclass1`
    FOREIGN KEY (`flightclass_id`)
    REFERENCES `airways`.`flightclass` (`flightclass_id`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_flights1`
    FOREIGN KEY (`flight_id`)
    REFERENCES `airways`.`flights` (`flight_id`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `airways`.`users` (`user_id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
