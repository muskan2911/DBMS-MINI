create database patent_auto;
use patent_auto;
CREATE TABLE patents (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    department VARCHAR(100),
    datePublished DATE
);

CREATE TABLE authors (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE patents_authors (
    patent_id INT,
    author_id INT,
    FOREIGN KEY (patent_id) REFERENCES patents(id),
    FOREIGN KEY (author_id) REFERENCES authors(id),
    PRIMARY KEY (patent_id, author_id)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
use patent_auto;
select * from patents;
create table test_patent1(Patent_title varchar(40), Patent_id integer, patent_type varchar(30), patent_author varchar(40), patent_department varchar(30), published date);

select * from test_patent1;

