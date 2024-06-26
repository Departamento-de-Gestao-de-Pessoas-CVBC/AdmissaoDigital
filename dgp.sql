-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26/06/2024 às 21:54
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dgp`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `user_adm`
--

CREATE TABLE `user_adm` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `user_adm`
--

INSERT INTO `user_adm` (`id`, `usuario`, `senha`) VALUES
(1, 'gustavo', '123'),
(17, 'Gustavo moreira', '123'),
(18, 'Gustavo moreira', '123'),
(19, '', '123'),
(20, '', '123');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `estado_civil` int(11) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `data_nascimento` varchar(10) NOT NULL,
  `cidade_nascimento` varchar(255) NOT NULL,
  `estado_nascimento` varchar(255) NOT NULL,
  `nacionalidade` int(11) NOT NULL,
  `grau_instrucao` varchar(2) NOT NULL,
  `raca_cor` int(11) NOT NULL,
  `nome_pai` varchar(255) NOT NULL,
  `nome_mae` varchar(255) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `cidade_residencia` varchar(255) NOT NULL,
  `estado_residencia` varchar(255) NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `tipo_logradouro` varchar(255) NOT NULL,
  `logradouro_residencia` varchar(255) NOT NULL,
  `numero_residencia` int(11) NOT NULL,
  `complemento_residencia` varchar(255) NOT NULL,
  `numero_pis` varchar(255) NOT NULL,
  `numero_rg` varchar(255) NOT NULL,
  `expedidor_rg` varchar(255) NOT NULL,
  `data_expedicao_rg` varchar(255) NOT NULL,
  `uf_expedicao_rg` varchar(255) NOT NULL,
  `titulo_eleitor` varchar(255) NOT NULL,
  `titulo_eleitor_zona` varchar(255) NOT NULL,
  `titulo_eleitor_secao` varchar(255) NOT NULL,
  `reservista` varchar(255) NOT NULL,
  `ddd_telefone_1` varchar(255) NOT NULL,
  `telefone_1` varchar(255) NOT NULL,
  `ddd_telefone_2` varchar(255) DEFAULT NULL,
  `telefone_2` varchar(255) DEFAULT NULL,
  `email_1` varchar(255) NOT NULL,
  `email_2` varchar(255) DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `sexo`, `estado_civil`, `cpf`, `data_nascimento`, `cidade_nascimento`, `estado_nascimento`, `nacionalidade`, `grau_instrucao`, `raca_cor`, `nome_pai`, `nome_mae`, `cep`, `cidade_residencia`, `estado_residencia`, `bairro`, `tipo_logradouro`, `logradouro_residencia`, `numero_residencia`, `complemento_residencia`, `numero_pis`, `numero_rg`, `expedidor_rg`, `data_expedicao_rg`, `uf_expedicao_rg`, `titulo_eleitor`, `titulo_eleitor_zona`, `titulo_eleitor_secao`, `reservista`, `ddd_telefone_1`, `telefone_1`, `ddd_telefone_2`, `telefone_2`, `email_1`, `email_2`, `cargo`, `senha`) VALUES
(1, 'asdlmasldma', 'M', 1, '123.810.293-89', '0000-00-00', 'Abadia', 'MG', 10, '01', 1, 'asjdnasjk', 'kjansdkjna', 'kjnaskjdn', 'Abadia', 'MG', 'bsadjkdbakj', 'kjasbdkjab', 'kjasbdkjasb', 231, 'kjbdaskjbda', 'kjbdaskjbdas', 'kjasbdkj', 'asdkjbaskjd', 'kajsdbkajnsbd', 'kjasbdkjasbd', 'kjbdaskjbdas', 'kjbdakjbda', 'kbdaksjbda', 'kjbdakjdb', 'kjdbaskjbda', 'kjdabskjdba', 'kjdbaskjdba', 'kjbdaskjbda', 'kjbdakjbda', 'kjdbaskjbda', 'kajsbdkj', '$2y$10$snaeWGE6rmTAcrDXO/F4Wuqdm3bMqLEGFnXt8KWleOpMtpeIuUmm2'),
(19, 'Gustavo Moreira', 'M', 1, '103.971.969-46', '04/02/2002', 'Porto uniao', '', 20, '07', 7, 'Gustavo Moreira', 'Gustavo Moreira', '65165-156', 'asdasd', 'sc', 'centro', '', '1000', 10, 'casa', '123.12321.31.2', '1312312', 'SC', '04/04/2002', 'espiritoSanto', '361651651651', '012', '123', '549514956146', '42', '(42) 9 9991-1980', '', '', 'gusmoreira02@gmail.com', '', '0036', '$2y$10$lxAF10uDVgGeOkJzzOu/Ieso1NQaSS7U9eICWt5coysZ1YMFPksda'),
(20, 'Felipe Concatto', 'M', 2, '064.196.529-01', '10/05/1990', 'Itajaí', '', 10, '11', 1, 'Evandro Concatto', 'Lia Mara Concatto', '88340-395', 'Camboriú', 'SC', 'Centro', '', 'Luiz Vieira dos Santos', 200, 'AP 401', '123.45645.67.8', '5081597', 'SSP', '10/10/2019', 'santaCatarina', '056456456456', '056', '1234', '123456748978', '47', '9 8434-0494', '', '', 'fconcatto@gmail.com', '', '', '$2y$10$voVXUxZlz6N7YmN1i0tlQ.ntMewt44pgmJdrk/lWmFPLyr4rKaFXu');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_dependentes`
--

CREATE TABLE `usuario_dependentes` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `data_nasc` varchar(10) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario_dependentes`
--

INSERT INTO `usuario_dependentes` (`id`, `nome`, `cpf`, `data_nasc`, `id_usuario`) VALUES
(5, 'gustavo2', '236.308.710', '04/02/2002', 19);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `user_adm`
--
ALTER TABLE `user_adm`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cpf` (`cpf`);

--
-- Índices de tabela `usuario_dependentes`
--
ALTER TABLE `usuario_dependentes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `user_adm`
--
ALTER TABLE `user_adm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `usuario_dependentes`
--
ALTER TABLE `usuario_dependentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `usuario_dependentes`
--
ALTER TABLE `usuario_dependentes`
  ADD CONSTRAINT `usuario_dependentes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
