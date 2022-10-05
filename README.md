# e-Marketplace-Database-Interface
This project deals with creating an e-Marketplace database and a user interface to interact with the database.

The project began with the creation of a schema with entities like Customer, Product, Orders, etc. and relations like Places (Customer to Orders), Includes 
(Orders to Products), etc. The vision was to create a marketplace interface to allow users to browse products and buy products they like. The schema was kept
such that to avoid redundancy as much as possible. The initial functionalities thought were addition and deletion of user accounts (buyer and merchant), creation of 
orders, inclusion of products in an order, etc. Later, added a trigger like waiving off the delivery fee if the order amount exceeds a 
threshold, as is practised by many e-marketplaces. Also, to enable the possibility of deleting records from 
the entities with the primary key, I applied constraint on the foreign keys referring to these primary keys. The database also employs an auto-increment feature on 
the primary key of Orders entity (ID). The interface that was created fulfilled all the basis requirements of any e-marketing website and can be worked upon to transform 
into a state-of-the-art website through small changes.
