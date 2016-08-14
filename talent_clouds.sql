-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2016 at 08:18 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `talent_clouds`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE IF NOT EXISTS `account` (
  `ID` decimal(10,0) NOT NULL COMMENT 'PK',
  `ORGID` decimal(10,0) NOT NULL COMMENT 'Organization to which this user belongs.',
  `user_type_uid` int(11) DEFAULT NULL,
  `address_uid` int(11) unsigned DEFAULT NULL,
  `USER_ID` varchar(50) NOT NULL COMMENT 'Username or Account Name',
  `PASSWORD` char(32) DEFAULT NULL COMMENT 'MD5 Encrypted Password',
  `home_email` varchar(200) DEFAULT NULL COMMENT 'Email address',
  `ENABLED` decimal(1,0) NOT NULL COMMENT 'Is the usage of this account enabled (1) or disabled (0)?',
  `first_name` varchar(25) DEFAULT '' COMMENT 'first name of user''s real name',
  `middle_name` varchar(25) DEFAULT '' COMMENT 'middle initial of user''s full name',
  `last_name` varchar(25) DEFAULT '' COMMENT 'last name of user''s real name',
  `image_path` varchar(250) DEFAULT '' COMMENT 'images path for pic',
  `gender` varchar(1) DEFAULT '' COMMENT 'Gender : M,F,U',
  `date_of_birth` date DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT '' COMMENT 'phone number',
  `work_email` varchar(255) DEFAULT '' COMMENT 'email ID ',
  `emergency_contact_number` varchar(15) DEFAULT '' COMMENT 'last name of user''s real name',
  `blood_group` varchar(3) DEFAULT '' COMMENT 'Blood Group',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Account created date',
  `created_by` decimal(10,0) DEFAULT NULL COMMENT 'Created by aid',
  `last_modified_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Account last modified date',
  `modified_by` decimal(10,0) DEFAULT NULL COMMENT 'Modified by aid'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE IF NOT EXISTS `address` (
`address_uid` int(10) unsigned NOT NULL,
  `address_1` varchar(100) DEFAULT NULL,
  `address_2` varchar(100) DEFAULT NULL,
  `address_city` varchar(40) DEFAULT NULL,
  `address_state` varchar(2) DEFAULT NULL,
  `address_zipcode` varchar(10) DEFAULT NULL,
  `address_country` varchar(50) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `admin_account`
--

CREATE TABLE IF NOT EXISTS `admin_account` (
  `AID` decimal(10,0) NOT NULL COMMENT 'PK',
  `USER_NAME` varchar(50) NOT NULL COMMENT 'Username or Account Name',
  `PASSWORD` char(32) DEFAULT NULL COMMENT 'MD5 Encrypted Password',
  `REAL_ANAME` varchar(50) DEFAULT NULL COMMENT 'Full Name such as "Joe Smith"',
  `EMAIL` varchar(200) DEFAULT NULL COMMENT 'Email address',
  `ENABLED` decimal(1,0) NOT NULL COMMENT 'Is the usage of this account enabled (1) or disabled (0)?',
  `reports_to_id` decimal(10,0) DEFAULT NULL COMMENT 'AID of supervisor to which this account reports',
  `first_name` varchar(25) DEFAULT '' COMMENT 'first name of user''s real name',
  `middle_name` varchar(25) DEFAULT '' COMMENT 'middle initial of user''s full name',
  `last_name` varchar(25) DEFAULT '' COMMENT 'last name of user''s real name',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Account created date',
  `last_modified_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Account last modified date'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE IF NOT EXISTS `organization` (
  `ORGID` decimal(10,0) NOT NULL,
  `ONAME` varchar(100) NOT NULL,
  `FULL_ONAME` varchar(100) NOT NULL,
  `ORG_CODE` varchar(100) NOT NULL,
  `ACTIVE` decimal(1,0) NOT NULL,
  `COMMENTS` varchar(200) DEFAULT NULL,
  `ADDRESS_ID` varchar(100) DEFAULT NULL,
  `PRIMARY_PHONE` varchar(15) DEFAULT NULL,
  `SECONDARY_PHONE` varchar(15) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(15) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE IF NOT EXISTS `result` (
`id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `mark_obtained` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`id`, `subject_id`, `mark_obtained`, `student_id`) VALUES
(1, 1, 80, 1),
(2, 2, 50, 1),
(3, 3, 40, 1),
(4, 4, 75, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

CREATE TABLE IF NOT EXISTS `student_info` (
  `stud_info_id` decimal(10,0) NOT NULL COMMENT 'PK',
  `account_id` decimal(10,0) NOT NULL COMMENT 'Username or Account Name',
  `class` varchar(10) DEFAULT '',
  `section` varchar(10) DEFAULT '',
  `roll_number` varchar(30) DEFAULT '',
  `bus_route_number` varchar(30) DEFAULT '',
  `mother_name` varchar(100) DEFAULT '',
  `mother_email` varchar(100) DEFAULT '',
  `mother_phone` varchar(100) DEFAULT '',
  `mother_occupation` varchar(100) DEFAULT '',
  `father_name` varchar(100) DEFAULT '',
  `father_email` varchar(100) DEFAULT '',
  `father_phone` varchar(100) DEFAULT '',
  `father_occupation` varchar(100) DEFAULT '',
  `last_modified_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Account last modified date'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE IF NOT EXISTS `subjects` (
`id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `max_mark` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `max_mark`) VALUES
(1, 'English', 100),
(2, 'Math', 100),
(3, 'Biology', 150),
(4, 'Physic', 100);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_info`
--

CREATE TABLE IF NOT EXISTS `teacher_info` (
  `teacher_info_id` decimal(10,0) NOT NULL COMMENT 'PK',
  `account_id` decimal(10,0) NOT NULL COMMENT 'Username or Account Name',
  `class` varchar(10) DEFAULT '',
  `section` varchar(10) DEFAULT '',
  `employee_code` varchar(25) DEFAULT '',
  `reports_to` decimal(10,0) DEFAULT NULL,
  `qualifcation` varchar(100) DEFAULT '',
  `last_modified_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Account last modified date'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `user_type` int(11) NOT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `password`, `email`, `gender`, `mobile_number`, `user_type`, `date_created`, `date_updated`) VALUES
(1, 'Mohammad', 'Khalid', '123456', 'mohdkhalid0807@gmail.com', '1', '8149250342', 1, '2016-07-24 11:07:28', '2016-07-24 11:07:28'),
(2, 'Saquib', 'Ahmed', '123456', 'saquib.ahmed@gmail.com', '1', '8149250342', 1, '2016-07-24 11:07:28', '2016-07-24 11:07:29'),
(3, 'admin', 'user', '123456', 'admin@gmail.com', '1', '9865327410', 0, '2016-07-24 11:07:28', '2016-07-24 11:07:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE IF NOT EXISTS `user_type` (
`id` int(11) NOT NULL,
  `type` varchar(250) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `type`) VALUES
(1, 'Teacher'),
(2, 'Student'),
(3, 'Parent');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
 ADD PRIMARY KEY (`ID`), ADD KEY `I_ACCOUNT_ORGID` (`ORGID`), ADD KEY `FK_ACCOUNT_CREATED_BY` (`created_by`), ADD KEY `account_modified_by` (`modified_by`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
 ADD PRIMARY KEY (`address_uid`);

--
-- Indexes for table `admin_account`
--
ALTER TABLE `admin_account`
 ADD PRIMARY KEY (`AID`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
 ADD PRIMARY KEY (`ORGID`), ADD UNIQUE KEY `UK_ORG_ONAME` (`ONAME`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_info`
--
ALTER TABLE `student_info`
 ADD PRIMARY KEY (`stud_info_id`), ADD KEY `FK_STUD_ACCOUNT_ID` (`account_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher_info`
--
ALTER TABLE `teacher_info`
 ADD PRIMARY KEY (`teacher_info_id`), ADD KEY `FK_TEACHER_ACCOUNT_ID` (`account_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
MODIFY `address_uid` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
ADD CONSTRAINT `FKACCT_REF_ORG` FOREIGN KEY (`ORGID`) REFERENCES `organization` (`ORGID`) ON DELETE CASCADE,
ADD CONSTRAINT `FK_ACCOUNT_CREATED_BY` FOREIGN KEY (`created_by`) REFERENCES `admin_account` (`AID`),
ADD CONSTRAINT `account_modified_by` FOREIGN KEY (`modified_by`) REFERENCES `admin_account` (`AID`);

--
-- Constraints for table `student_info`
--
ALTER TABLE `student_info`
ADD CONSTRAINT `FK_STUD_ACCOUNT_ID` FOREIGN KEY (`account_id`) REFERENCES `account` (`ID`);

--
-- Constraints for table `teacher_info`
--
ALTER TABLE `teacher_info`
ADD CONSTRAINT `FK_TEACHER_ACCOUNT_ID` FOREIGN KEY (`account_id`) REFERENCES `account` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
