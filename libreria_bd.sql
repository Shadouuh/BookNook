-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2024 a las 16:42:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `libreria_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int(11) NOT NULL,
  `es_actual` tinyint(1) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id_carrito`, `es_actual`, `id_usuario`) VALUES
(1, 0, 1),
(2, 1, 9),
(3, 0, 2),
(4, 0, 2),
(5, 1, 11),
(7, 1, 14),
(8, 1, 18),
(9, 0, 2),
(10, 1, 19),
(11, 1, 20),
(12, 0, 2),
(13, 0, 2),
(14, 0, 2),
(15, 1, 2),
(16, 0, 1),
(17, 0, 1),
(18, 0, 1),
(19, 0, 1),
(20, 0, 1),
(21, 0, 1),
(22, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_items`
--

CREATE TABLE `carrito_items` (
  `id_item` int(11) NOT NULL,
  `id_carrito` int(11) DEFAULT NULL,
  `id_libro` varchar(30) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `carrito_items`
--

INSERT INTO `carrito_items` (`id_item`, `id_carrito`, `id_libro`, `cantidad`) VALUES
(3, 19, 'zyTCAlFPjgYC', 3),
(5, 21, 'zyTCAlFPjgYC', 1),
(6, 22, 'zyTCAlFPjgYC', 2),
(8, 10, 'zyTCAlFPjgYC', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `dni` varchar(15) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `id_sede` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `dni`, `nombre`, `apellido`, `area`, `id_sede`) VALUES
(1, '47232321', 'Ezequiel', 'Enrriquez', 'Reparto', 1),
(2, '221212121', 'Ray', 'Bradbury', 'Ventas', 2),
(5, '123345678', 'Cuan', 'Antelo', 'Administracion', 1),
(8, '99999999', 'Pollito', 'Antelo', 'SemiDios', 1),
(10, '111111122222', 'Juan', 'Souza Silva', 'Reparto', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id_login` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `clave` varchar(256) DEFAULT NULL,
  `tipo` enum('super_admin','cliente','encargado','empleado','repartidor') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id_login`, `email`, `telefono`, `clave`, `tipo`) VALUES
(1, 'juancottier0@gmail.com', '', '1234', 'super_admin'),
(9, 'juanescolar0@gmail.com', 'undefined', 'dd9LJ2akb70yF4sZX849l2MmZd9CX3exYf3Kv6Dssq6YK3frPx7yF2rHHr2Fy7xPrf3KY6qssD6vK3fYxe3XC9dZmM2l948XZs4Fy07bka2JL9dd', 'cliente'),
(10, 'palateo8567@gmail.com', NULL, 'i79yU4dZb809F2smid9CU3dxVD1vC3oYHs2Fy0xbOb6vv6bObx0yF2sHYo3Cv1DVxd3UC9dims2F908bZd4Uy97i', 'cliente'),
(11, 'teresita@gmail.com', '113254769801', 'Vd1CC3oxH829y2xmQ75yc4zZnk2jT7sFPe7XF9rZZM9lX4eXsf6KK6fsPr7FF7rPsf6KK6fsXe4Xl9MZZr9FX7ePFs7Tj2knZz4cy57Qmx2y928Hxo3CC1dV', 'cliente'),
(33, 'correo@gmail.com', '', '1234', 'empleado'),
(56, 'santelo@hotmail.com', '1111111111', 'Vd1CC3oxH829y2xmQ75yc4zZnk2jT7sFPe7XF9rZZM9lX4eXsf6KK6fsPr7FF7rPsf6KK6fsXe4Xl9MZZr9FX7ePFs7Tj2knZz4cy57Qmx2y928Hxo3CC1dV', 'cliente'),
(57, 'nodejs.com', '1234567890', 'iL9vU3dNs26QK8fjVk1jC7oFse6XK9fZVM1lC4oXsf6KK6fsgr4FM7zPHx2yy2xHPz7MF4rgsf6KK6fsXo4Cl1MVZf9KX6esFo7Cj1kVjf8KQ62sNd3Uv9Li', 'cliente'),
(59, 'phppythonnodejs.com', '0987654321', 'iL9vU3dNs26QK8fjVk1jC7oFse6XK9fZVM1lC4oXsf6KK6fsgr4FM7zPHx2yy2xHPz7MF4rgsf6KK6fsXo4Cl1MVZf9KX6esFo7Cj1kVjf8KQ62sNd3Uv9Li', 'cliente'),
(60, 'email.com', '0101010101', 'dd9LJ2akb70yF4sZX849l2MmZd9CX3exYf3Kv6DssD6vK3fYxe3XC9dZmM2l948XZs4Fy07bka2JL9dd', 'cliente'),
(62, 'blablaemail.com', '11110000', 'dd9LJ2akb70yF4sZX849l2MmZd9CX3exYf3Kv6DssD6vK3fYxe3XC9dZmM2l948XZs4Fy07bka2JL9dd', 'cliente'),
(68, 'mail.com.ar', '1123581347', 'dd9LJ2akb70yF4sZX849l2MmZd9CX3exYf3Kv6DssD6vK3fYxe3XC9dZmM2l948XZs4Fy07bka2JL9dd', 'cliente'),
(69, 'juanhot@hotmail.com', '1122334455', 'dd9LJ2akb70yF4sZX849l2MmZd9CX3exYf3Kv6DssD6vK3fYxe3XC9dZmM2l948XZs4Fy07bka2JL9dd', 'repartidor'),
(71, 'teste@exemplo.us', '3121286800', 'df9KJ6assa6JK9fddf9KJ6assa6JK9fd', 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `total` float DEFAULT NULL,
  `estado` enum('pendiente','entregado','cancelado') NOT NULL,
  `fecha_estimada` date NOT NULL,
  `fecha_llegada` date NOT NULL,
  `fecha_compra` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_usuario` int(11) DEFAULT NULL,
  `id_carrito` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `total`, `estado`, `fecha_estimada`, `fecha_llegada`, `fecha_compra`, `id_usuario`, `id_carrito`) VALUES
(3, 3000, 'pendiente', '2025-05-05', '0000-00-00', '2024-10-17 15:33:46', 2, 3),
(4, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-10-18 13:39:53', 2, 4),
(5, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-12-01 14:23:17', 2, 9),
(6, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-12-01 14:23:20', 2, 12),
(7, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-12-01 14:37:37', 2, 13),
(10, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-12-01 14:41:42', 2, 14),
(12, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-12-01 14:43:16', 1, 1),
(13, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-12-01 14:43:29', 1, 16),
(14, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-12-01 14:43:46', 1, 17),
(15, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-12-01 14:43:48', 1, 18),
(16, 15.79, 'pendiente', '2022-02-02', '0000-00-00', '2024-12-01 14:57:50', 1, 19),
(17, 12345, 'pendiente', '2001-01-01', '0000-00-00', '2024-12-01 15:22:34', 1, 20),
(18, 0, 'pendiente', '2022-12-08', '0000-00-00', '2024-12-01 15:35:39', 1, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `id_sede` int(11) NOT NULL,
  `localidad` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`id_sede`, `localidad`) VALUES
(1, 'Monte Grande'),
(2, 'Caballito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaccion`
--

CREATE TABLE `transaccion` (
  `id_transaccion` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `metodo_pago` enum('tarjeta_credito','tarjeta_debito','transferencia') DEFAULT NULL,
  `num_tarjeta` varchar(50) NOT NULL,
  `estado` enum('pendiente','completada','cancelada') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `transaccion`
--

INSERT INTO `transaccion` (`id_transaccion`, `id_pedido`, `metodo_pago`, `num_tarjeta`, `estado`) VALUES
(1, 15, 'tarjeta_credito', '22 1221 212', 'pendiente'),
(2, 17, 'tarjeta_credito', '21312312', 'pendiente'),
(3, 18, 'tarjeta_credito', '1234567890', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_nacimiento` date DEFAULT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `foto_perfil` varchar(256) NOT NULL,
  `id_login` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `direccion`, `fecha_registro`, `fecha_nacimiento`, `alias`, `foto_perfil`, `id_login`) VALUES
(1, 'Cuan', 'Gottier', 'Miranda 895', '2024-09-29 03:00:00', '2007-09-04', 'Juanerros', 'default.png', 1),
(2, 'Don', 'Roberto', 'Los Pinos 343', '2024-10-17 13:29:15', '2002-01-01', 'Yadou', 'default.png', 56),
(9, 'Juan', 'Juan', 'Acanomas 321', '2024-10-17 14:22:29', '2001-11-01', 'Juanarroz', 'default.png', 57),
(11, 'Juan', 'Juan', 'Acanomas 321', '2024-10-17 20:06:58', '2001-11-01', 'Nauj', 'default.png', 59),
(14, 'Cottier', 'Juan', 'casa 123', '2024-10-17 20:12:34', '2024-11-01', 'Evil Juan', 'default.png', 62),
(18, 'Cottier', 'Juan', 'casa 123', '2024-10-17 20:39:19', '2024-11-01', 'aña Juan', 'default.png', 68),
(19, 'Cottier', 'Juan', 'casa 123', '2024-11-06 10:48:07', '2024-11-01', 'juan hot', 'gato.png', 69),
(20, 'Juan Francisco', 'Souza Silva', 'Rua Inexistente, 2000', '2024-11-30 14:23:00', '2024-11-30', 'Juana', '', 71);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `carrito_items`
--
ALTER TABLE `carrito_items`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `id_carrito` (`id_carrito`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `id_sede` (`id_sede`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`id_carrito`),
  ADD KEY `id_carrito` (`id_carrito`);

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`id_sede`);

--
-- Indices de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD PRIMARY KEY (`id_transaccion`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `alias` (`alias`),
  ADD KEY `id_login` (`id_login`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `carrito_items`
--
ALTER TABLE `carrito_items`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `id_sede` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  MODIFY `id_transaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `carrito_items`
--
ALTER TABLE `carrito_items`
  ADD CONSTRAINT `carrito_items_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD CONSTRAINT `transaccion_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_login`) REFERENCES `login` (`id_login`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
