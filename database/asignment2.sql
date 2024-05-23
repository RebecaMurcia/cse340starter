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

UPDATE inventory
SET inv_description = REPLACE( inv_description, 'small interiors','a huge interior');

SELECT
inv_make,
inv_model,
classification_name
FROM
inventory
INNER JOIN 
classification
ON 
inventory.classification_id = classification.classification_id
WHERE classification_name = 'sport';


