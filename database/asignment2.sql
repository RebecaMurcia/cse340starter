INSERT INTO account 
( account_firstname , account_lastname , account_email , account_password)
VALUES
( 'Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

UPDATE account
SET
account_type = 'Admin'

DELETE 
FROM
account
WHERE
account_firstname = 'Tony'




