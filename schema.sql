CREATE DATABASE IF NOT EXISTS `calendario`;
USE `calendario`;

-- Tabla: usuarios
CREATE TABLE `usuarios` (
  `idUsuario` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100),
  `apellido1` VARCHAR(100),
  `apellido2` VARCHAR(100),
  `email` VARCHAR(150) UNIQUE,
  `password` VARCHAR(255),
  `idDepartamento` INT,
  `user` VARCHAR(100) UNIQUE
);

-- Tabla: departamento
CREATE TABLE `departamento` (
  `idDepartamento` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100),
  `color` VARCHAR(20)
);

-- Tabla: salas
CREATE TABLE `salas` (
  `idSalas` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100)
);

-- Tabla: reserva
CREATE TABLE `reserva` (
  `idReserva` INT AUTO_INCREMENT PRIMARY KEY,
  `fecha` DATE,
  `descripcion` VARCHAR(255),
  `horaMin` TIME,
  `horaMax` TIME,
  `idUsuario` INT,
  `idSala` INT,
  FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`idUsuario`),
  FOREIGN KEY (`idSala`) REFERENCES `salas`(`idSalas`)
);

-- Tabla: horariosCalendario
CREATE TABLE `horariosCalendario` (
  `idHorariosCalendario` INT AUTO_INCREMENT PRIMARY KEY,
  `fecha` DATE
  -- otros campos dinámicos según uso en PHP
  -- agrega aquí los campos que uses en los inserts
);

-- Tabla: usuario_departamento
CREATE TABLE `usuario_departamento` (
  `idUsuario_departamento` INT AUTO_INCREMENT PRIMARY KEY,
  `estado` BOOLEAN,
  `idUser` INT,
  `idDepartamento` INT,
  FOREIGN KEY (`idUser`) REFERENCES `usuarios`(`idUsuario`),
  FOREIGN KEY (`idDepartamento`) REFERENCES `departamento`(`idDepartamento`)
);

-- Inserts para poblar la base de datos
INSERT INTO `departamento` (`nombre`, `color`) VALUES
  ('Informática', '#FF5733'),
  ('Recursos Humanos', '#33FF57'),
  ('Dirección', '#3357FF');

INSERT INTO `salas` (`nombre`) VALUES
  ('Sala de Juntas'),
  ('Sala de Reuniones'),
  ('Aula de Formación');

INSERT INTO `usuarios` (`nombre`, `apellido1`, `apellido2`, `email`, `password`, `idDepartamento`, `user`) VALUES
  ('Juan', 'Pérez', 'García', 'juan.perez@example.com', MD5('1234'), 1, 'juanp'),
  ('Ana', 'López', 'Martínez', 'ana.lopez@example.com', MD5('abcd'), 2, 'anal'),
  ('Luis', 'Sánchez', 'Ruiz', 'luis.sanchez@example.com', MD5('qwerty'), 3, 'luiss');

INSERT INTO `reserva` (`fecha`, `descripcion`, `horaMin`, `horaMax`, `idUsuario`, `idSala`) VALUES
  ('2025-10-03', 'Reunión semanal', '09:00', '10:00', 1, 1),
  ('2025-10-03', 'Formación interna', '11:00', '12:30', 2, 3);

INSERT INTO `usuario_departamento` (`estado`, `idUser`, `idDepartamento`) VALUES
  (true, 1, 1),
  (true, 2, 2),
  (true, 3, 3);
