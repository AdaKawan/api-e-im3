DELIMITER //
CREATE TRIGGER before_update_refresh_token
BEFORE UPDATE ON RefreshToken
FOR EACH ROW
BEGIN
    SET NEW.expiredDate = DATE_ADD(NOW(), INTERVAL 10 DAY);
END//
DELIMITER ;
