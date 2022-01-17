
-- schema for get request productid
SELECT *,
(SELECT JSON_ARRAYAGG(JSON_OBJECT("feature",feature,"value",value)) FROM features WHERE product_id=?)
AS features FROM product WHERE id=?;

-- schema for styles get request
SELECT product_id,
(SELECT JSON_ARRAYAGG(JSON_OBJECT("style_id",id,"name",name,"original_price",original_price,"sale_price",sale_price,"default\\?",default,"photos",
(SELECT JSON_ARRAYAGG(JSON_OBJECT("url",url,"thumbnail_url",thumbnail_url)) FROM photos WHERE photos.style_id=styles.id)) FROM styles WHERE product_id=?)
FROM product WHERE product_id=?;