create database banco_biblioteca;
use banco_biblioteca;

create table clientes (
	cod_cliente int key auto_increment,
    nome_cliente varchar(100),
    cpf varchar(14),
    email varchar(100),
    telefone varchar(20));
    
create table livros (
	cod_livros int key auto_increment,
    titulo varchar(100),
    autor varchar(100),
    editora varchar(100));
    
create table emprestimos (
	cod_emprest int key auto_increment,
    cod_cliente int,
    cod_livros int,
    data_emprestimo date,
    data_devolucao date,
    foreign key (cod_cliente) references clientes(cod_cliente),
    foreign key (cod_livros) references livros(cod_livros));
    
SELECT * FROM CLIENTES;

select * from livros;

select * from emprestimos;

select * from livros;

DELETE FROM livros WHERE cod_livros = 7;
select * from livros;

