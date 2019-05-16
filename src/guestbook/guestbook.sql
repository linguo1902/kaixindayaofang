/*
Navicat MySQL Data Transfer

Source Server         : 1
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : guestbook

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-04-29 16:19:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for contents
-- ----------------------------
DROP TABLE IF EXISTS `contents`;
CREATE TABLE `contents` (
  `cid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `dateline` int(10) unsigned DEFAULT '0',
  `support` int(11) unsigned DEFAULT '0',
  `oppose` int(11) unsigned DEFAULT '0',
  PRIMARY KEY (`cid`),
  KEY `oppose` (`oppose`),
  KEY `uid` (`uid`),
  KEY `support` (`support`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` char(16) DEFAULT NULL,
  `password` char(32) DEFAULT NULL,
  `avatar` tinyint(1) unsigned DEFAULT '1',
  `login_key` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS=1;
