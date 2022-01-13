

DROP TABLE IF EXISTS product;

CREATE TABLE product (
  id INTEGER AUTO_INCREMENT ,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price DECIMAL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id INTEGER AUTO_INCREMENT ,
  product_id INTEGER,
  name TEXT,
  sale_price DECIMAL(5,2) DEFAULT 0.0 NOT NULL,
  original_price DECIMAL(5,2),
  default_style BOOLEAN,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INTEGER AUTO_INCREMENT ,
  style_id INTEGER,
  url TEXT,
  thumbnail_url TEXT,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id INTEGER AUTO_INCREMENT ,
  style_id INTEGER,
  size CHAR(10),
  quantity INTEGER,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id INTEGER AUTO_INCREMENT ,
  product_id INTEGER,
  feature TEXT,
  value TEXT,
  PRIMARY KEY (id)
);

ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE photos ADD FOREIGN KEY (style_id) REFERENCES styles (id);
ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES styles (id);
ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES product (id);

