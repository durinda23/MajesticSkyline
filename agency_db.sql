-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 25 2025 г., 13:08
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `agency_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `agent`
--

CREATE TABLE `agent` (
  `ID_agent` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `agent`
--

INSERT INTO `agent` (`ID_agent`, `first_name`, `last_name`, `email`, `phone`) VALUES
(1, 'Анна', 'Иванова', 'anna.ivanova@majestic.com', '+79001234567'),
(2, 'Олег', 'Майами', 'oleg.miami@majestic.com', '+79007654321'),
(3, 'Мария', 'Сидорова', 'maria.sidorova@majestic.com', '+79003456789'),
(4, 'Влад', 'Куертов', 'vlad.kuertov@majestic.com', '+79001112233'),
(5, 'Екатерина', 'Мизулина', 'ekaterina.mizulina@majestic.com', '+79004445566'),
(6, 'Николай', 'Чебурченко', 'nikolai.cheburchenko@majestic.com', '+79887654565');

-- --------------------------------------------------------

--
-- Структура таблицы `client`
--

CREATE TABLE `client` (
  `ID_client` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `middle_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `budget` int DEFAULT NULL,
  `ID_type_house` int DEFAULT NULL,
  `role` enum('Админ','Клиент') NOT NULL DEFAULT 'Клиент'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `client`
--

INSERT INTO `client` (`ID_client`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `hashed_password`, `budget`, `ID_type_house`, `role`) VALUES
(1, 'Иван', 'Евтеев', 'Владимирович', 'ivan_business@mail.ru', '+79779954034', '$2y$10$27c1ZqK.bndWWabng0jPBuJNBfjCGnCCm54iXYWkuemOT8l0pnmKO', 300000000, 3, 'Клиент'),
(2, 'Ольга', 'Бузова', 'Игоревна', 'olga.buzova@mail.ru', '+79167778899', '', 500000000, 1, 'Клиент'),
(3, 'Роман', 'Абрамович', 'Аркадьевич', 'roman.abramovich@mail.com', '+442076543210', '', 2000000000, 3, 'Клиент'),
(4, 'Криштиану', 'Роналду', '', 'cr7@gmail.com', '+351912345678', '', 1500000000, 3, 'Клиент'),
(5, 'anatoly', NULL, NULL, 'test1@mail.ru', NULL, '$2y$10$mruToXygIcdlnAGppFqEd.1sHkTLagrjKbpwM2.UtU5SPPrFq7QtG', NULL, NULL, 'Клиент'),
(6, 'ivan', NULL, NULL, 'test2@mail.ru', NULL, '$2y$10$sO2baflGPsKve95hXNgVReAV7sBklwJdELsnnGkATETAFjUrkNmgS', NULL, NULL, 'Клиент'),
(7, 'admin', NULL, NULL, 'admin@majestic.com', NULL, '$2y$10$jjQ/Cy94G8one5y.DmcNMuNVeltG2zdopRCkg8u2Dn4Bd/pt8LuY.', 10000, NULL, 'Админ');

-- --------------------------------------------------------

--
-- Структура таблицы `deal`
--

CREATE TABLE `deal` (
  `ID_deal` int NOT NULL,
  `amount` int NOT NULL,
  `deal_date` date NOT NULL,
  `ID_client` int NOT NULL,
  `ID_agent` int NOT NULL,
  `ID_house` int NOT NULL,
  `ID_status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `deal`
--

INSERT INTO `deal` (`ID_deal`, `amount`, `deal_date`, `ID_client`, `ID_agent`, `ID_house`, `ID_status`) VALUES
(1, 350000000, '2025-04-10', 1, 1, 1, 3),
(2, 250000000, '2025-05-05', 2, 4, 2, 3),
(3, 280000000, '2025-06-01', 3, 5, 4, 3),
(4, 290000000, '2025-05-15', 4, 2, 8, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `house`
--

CREATE TABLE `house` (
  `ID_house` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `area` int NOT NULL,
  `bedrooms` int NOT NULL,
  `bathrooms` int NOT NULL,
  `location` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `avaliability_date` date NOT NULL,
  `photos` varchar(255) NOT NULL,
  `ID_type_house` int NOT NULL,
  `ID_status` int NOT NULL DEFAULT '1',
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `house`
--

INSERT INTO `house` (`ID_house`, `name`, `area`, `bedrooms`, `bathrooms`, `location`, `price`, `avaliability_date`, `photos`, `ID_type_house`, `ID_status`, `description`) VALUES
(1, 'Спиртная подошва', 340, 5, 6, 'Россия, Московская область', 100000000, '2025-04-12', '../podoshva_house.png', 3, 3, 'Этот \"Спиртная подошва\" на 340 м² в Московской области — идеальное убежище от столичной суеты, где вы сможете почувствовать себя царём тапочек! Дом пропитан духом русской души, а 5 спален с 6 санузлами — это настоящая находка для новогодних посиделок с родственниками, которые не знают, где остановиться. Вид на лес напоминает декорации к фильму про медведей, а цена в 100 млн — это просто шутка для вашего бюджета, пока соседи не превратили участок в самогонный завод. К тому же, тут есть место для бани, где можно спрятаться от налоговой! Покупайте скорее, пока не пришлось делить участок с лосём!'),
(2, 'Пентхаус в Москва-Сити', 280, 3, 3, 'Россия, Москва', 250000000, '2025-06-15', '../moscow_city.png', 1, 3, 'Пентхаус в Москва-Сити на 280 м² — это не просто дом, а пропуск в элиту с видом на вечные пробки! Три спальни и три санузла созданы для минималистов, которые любят просыпаться под гудки машин, а стеклянные стены позволяют любоваться городом, как король, пока соседи пялятся на вас с завистью. Цена в 250 млн — это как аренда вертолёта на год, но с видом на небоскрёбы и шансом забыть, где лестница. Терраса идеальна для коктейлей, а лифт — для ленивых утренних спусков. Берите, пока не построили ещё выше!'),
(3, 'Коттедж на берегу Финского залива', 320, 4, 4, 'Россия, Ленинградская область', 180000000, '2025-08-10', '../finsky.png', 2, 1, 'Коттедж на берегу Финского залива на 320 м² — это не просто дом, а база для рыбалки с видом на водичку и случайных чаек на крыше! Четыре спальни и четыре санузла ждут друзей, которые притворяются рыбаками, а локация в Ленобласти подарит тишину, прерываемую только криками чаек. Цена в 180 млн — это шанс стать местным Немо, пока залив не высох, а небольшой сад у воды — для выращивания картошки или просто хвастовства перед городскими. Берите, пока не пришлось делить участок с морскими котиками!'),
(4, 'Вилла в Марбелье', 420, 6, 5, 'Испания, Коста-дель-Соль', 280000000, '2025-09-01', '../main_buy_house.png', 3, 3, 'Вилла в Марбелье на 420 м² — это не дом, а мечта с загаром, которая кричит о статусе \"миллионер\"! Шесть спален и пять санузлов созданы для вечеринок, где гости будут драться за зеркало, а вид на Коста-дель-Соль — лучше, чем любая открытка с пальмами. Цена в 280 млн — это просто плата за шанс купаться в бассейне, притворяясь русалкой, пока олигархи не разобрали все виллы. Сад с оливками зовёт делать масло, а терраса — устраивать барбекю с видом на закат. Покупайте, пока не поздно!'),
(5, 'Апартаменты в Барселоне', 150, 2, 2, 'Испания, Барселона', 120000000, '2025-07-20', '../barcelona.png', 1, 1, 'Апартаменты в Барселоне на 150 м² — это компактный рай с видом на Гауди и шансом услышать фламенко под окном! Две спальни и два санузла идеальны для романтики или уединения, а цена в 120 млн — это как билет на концерт под звёздами. Терраса зовёт делать селфи с паэльей, а близость к Саграде Фамилия — для тех, кто хочет вдохновляться архитектурой вместо будильника. Берите, пока Барселона не стала слишком модной даже для вас!'),
(6, 'Финка на Майорке', 380, 4, 4, 'Испания, Балеарские острова', 220000000, '2025-08-05', '../finka.png', 2, 1, 'Финка на Майорке на 380 м² — это не дом, а пляжный коктейль с видом на море и шансом стать местным доном! Четыре спальни и четыре санузла ждут сиесты, а сад с оливками — для тех, кто мечтает о собственном масле. Цена в 220 млн — плата за ныряние за сокровищами и утренний кофе с чайками, которые норовят утащить булочку. Бассейн уже готов к вашим прыжкам, а терраса — к танцам под луной. Покупайте, пока остров не утонул в туристах!'),
(7, 'Шале в Швейцарских Альпах', 400, 5, 5, 'Швейцария, Вербье', 320000000, '2025-12-01', '../shale.png', 3, 1, 'Шале в Швейцарских Альпах на 400 м² — это дом для тех, кто хочет кататься на лыжах с крыши и пить глинтвейн с видом на горы! Пять спален и пять санузлов ждут горнолыжников, а цена в 320 млн — это шанс встретить йети или хотя бы местного гида. Камин уже горит, готовый к вашим историям, а терраса — для фото с заснеженными вершинами. Берите, пока Альпы не растаяли от вашего шарма!'),
(8, 'Пентхаус в Дубае Marina', 310, 3, 4, 'ОАЭ, Дубай', 290000000, '2025-10-15', '../marina.png', 1, 1, 'Пентхаус в Дубае Marina на 310 м² — это не жильё, а декорация для Instagram с видом на Бурдж-Халифа! Три спальни и четыре санузла созданы для шейхов, а цена в 290 млн — плата за жизнь без дождя и с пальмами под окном. Бассейн на крыше зовёт плавать и пугать голубей, а терраса — для вечеринок с видом на небеса. Берите, пока не построили небоскрёб ещё выше вашего эго!'),
(9, 'Апартаменты в Ницце', 180, 2, 2, 'Франция, Ницца', 15000000, '2025-07-01', '../nice.png', 1, 2, 'Апартаменты в Ницце на 180 м² — это кусочек рая с видом на променад и шум волн вместо будильника! Две спальни и два санузла идеальны для романтики или уединения, а цена в 15 млн — шанс пить кофе с круассанами под солнышком. Балкон зовёт наблюдать за модниками, а близость к пляжу — для тех, кто любит загар без усилий. Берите, пока Ницца не стала слишком французской даже для вас!'),
(10, 'Вилла на Корсике', 400, 5, 4, 'Франция, Корсика', 25000000, '2025-08-15', '../corsica.png', 3, 2, 'Вилла на Корсике на 400 м² — это дом для пиратов с душой и видом на море! Пять спален и четыре санузла ждут команды, а цена в 25 млн — плата за шанс найти сокровища Наполеона под кроватью. Бассейн зовёт нырять, а виноградник — варить вино, которое удивит даже местных. Терраса идеальна для закатов, а сад — для выращивания цитрусов. Покупайте, пока корсиканцы не заняли всё побережье!'),
(11, 'Шале в Куршевеле', 350, 4, 3, 'Франция, Куршевель', 30000000, '2025-12-01', '../courchevel.png', 2, 2, 'Шале в Куршевеле на 350 м² — это дом для тех, кто катается на лыжах и деньгах с видом на снежные вершины! Четыре спальни и три санузла ждут звёздных гостей, а цена в 30 млн — шанс встретить миллионера за завтраком. Камин готов к вашему шале-шоу, а терраса — для фото с видом на склоны. Берите, пока снег не растаял, а вы не научились кататься!'),
(12, 'Пентхаус в Майами', 220, 3, 2, 'США, Майами', 18000000, '2025-09-10', '../miami.png', 1, 2, 'Пентхаус в Майами на 220 м² — это дом для тусовок с видом на океан и пальмы вместо занавесок! Три спальни и два санузла созданы для диджеев, а цена в 18 млн — плата за танцы до утра. Терраса зовёт устраивать коктейли и селфи с фламинго, а близость к пляжу — для тех, кто любит солёный загар. Берите, пока Майами не утонул в стиле и вечеринках!'),
(13, 'Дом у озера Комо', 300, 4, 3, 'Италия, Комо', 20000000, '2025-10-01', '../como.png', 2, 2, 'Дом у озера Комо на 300 м² — это не жильё, а декорация для романтики с видом на воду! Четыре спальни и три санузла ждут влюблённых, а цена в 20 млн — шанс встретить Джорджа Клуни за чашкой эспрессо. Сад зовёт выращивать оливки, а озеро — ловить рыбу или просто притворяться рыбаком. Терраса идеальна для закатов, а вид — для хвастовства. Берите, пока не заняли!'),
(14, 'Особняк в Лос-Анджелесе', 450, 6, 5, 'США, Лос-Анджелес', 35000000, '2025-11-15', '../la.png', 3, 2, 'Особняк в Лос-Анджелесе на 450 м² — это дом для звёзд с видом на Голливуд и шансом стать легендой! Шесть спален и пять санузлов ждут Оскаров, а цена в 35 млн — плата за соседство с Лео и папарацци под окном. Бассейн зовёт нырять, а сад — устраивать барбекю с видом на звёзды. Терраса — для фотосессий, а стиль — для тех, кто готов к славе. Берите, пока не сняли фильм про ваш успех!');

-- --------------------------------------------------------

--
-- Структура таблицы `review`
--

CREATE TABLE `review` (
  `ID_review` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ID_client` int NOT NULL,
  `deal` enum('куплено','арендовано') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `review`
--

INSERT INTO `review` (`ID_review`, `name`, `content`, `date`, `ID_client`, `deal`) VALUES
(1, 'Гуф', 'Купил хату в Сочи. Теперь \"Лада седан\" кажется мне внедорожником.', '2025-06-08 00:00:00', 1, 'куплено'),
(2, 'hog rider', 'я купил', '2025-06-14 15:57:41', 5, 'куплено'),
(9, 'я в париже', 'ыыыыыыыы', '2025-06-14 16:15:42', 5, 'куплено'),
(13, 'цукенго', 'арендовал, крут', '2025-06-20 10:31:32', 5, 'арендовано');

-- --------------------------------------------------------

--
-- Структура таблицы `status`
--

CREATE TABLE `status` (
  `ID_status` int NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `status`
--

INSERT INTO `status` (`ID_status`, `status`) VALUES
(1, 'доступен для продажи'),
(2, 'доступен для аренды'),
(3, 'продан'),
(4, 'в аренде');

-- --------------------------------------------------------

--
-- Структура таблицы `type_house`
--

CREATE TABLE `type_house` (
  `ID_type_house` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `type_house`
--

INSERT INTO `type_house` (`ID_type_house`, `name`) VALUES
(1, 'элитный'),
(2, 'коттедж'),
(3, 'вилла');

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view1`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view1` (
`avaliability_date` date
,`ID_house` int
,`location` varchar(100)
,`name` varchar(100)
,`price` int
,`type_house` varchar(100)
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view2`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view2` (
`email` varchar(100)
,`first_name` varchar(100)
,`ID_client` int
,`last_name` varchar(100)
,`type_house` varchar(100)
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view3`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view3` (
`agent_first_name` varchar(100)
,`agent_last_name` varchar(100)
,`amount` int
,`deal_date` date
,`house_name` varchar(100)
,`ID_deal` int
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view4`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view4` (
`agent_first_name` varchar(100)
,`agent_last_name` varchar(100)
,`ID_house` int
,`name` varchar(100)
,`price` int
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view5`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view5` (
`amount` int
,`deal_date` date
,`first_name` varchar(100)
,`house_name` varchar(100)
,`ID_client` int
,`last_name` varchar(100)
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view6`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view6` (
`avaliability_date` date
,`ID_house` int
,`location` varchar(100)
,`name` varchar(100)
,`price` int
,`status` varchar(100)
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view7`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view7` (
`first_name` varchar(100)
,`ID_agent` int
,`last_name` varchar(100)
,`total_deals_amount` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view8`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view8` (
`ID_house` int
,`location` varchar(100)
,`name` varchar(100)
,`price` int
,`status` varchar(100)
,`type_house` varchar(100)
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view9`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view9` (
`affordable_houses` text
,`budget` int
,`email` varchar(100)
,`first_name` varchar(100)
,`ID_client` int
,`last_name` varchar(100)
,`max_price` int
,`min_price` int
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `view10`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `view10` (
`area` int
,`ID_house` int
,`name` varchar(100)
,`price` int
,`status` varchar(100)
,`total_rooms` bigint
);

-- --------------------------------------------------------

--
-- Структура для представления `view1`
--
DROP TABLE IF EXISTS `view1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view1`  AS SELECT `h`.`ID_house` AS `ID_house`, `h`.`name` AS `name`, `h`.`location` AS `location`, `h`.`price` AS `price`, `h`.`avaliability_date` AS `avaliability_date`, `th`.`name` AS `type_house` FROM (`house` `h` join `type_house` `th` on((`h`.`ID_type_house` = `th`.`ID_type_house`))) WHERE (`h`.`location` like '%Россия%')  ;

-- --------------------------------------------------------

--
-- Структура для представления `view2`
--
DROP TABLE IF EXISTS `view2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view2`  AS SELECT `c`.`ID_client` AS `ID_client`, `c`.`first_name` AS `first_name`, `c`.`last_name` AS `last_name`, `c`.`email` AS `email`, `th`.`name` AS `type_house` FROM (`client` `c` join `type_house` `th` on((`c`.`ID_type_house` = `th`.`ID_type_house`))) WHERE (`c`.`ID_type_house` = 3)  ;

-- --------------------------------------------------------

--
-- Структура для представления `view3`
--
DROP TABLE IF EXISTS `view3`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view3`  AS SELECT `d`.`ID_deal` AS `ID_deal`, `d`.`amount` AS `amount`, `d`.`deal_date` AS `deal_date`, `a`.`first_name` AS `agent_first_name`, `a`.`last_name` AS `agent_last_name`, `h`.`name` AS `house_name` FROM ((`deal` `d` join `agent` `a` on((`d`.`ID_agent` = `a`.`ID_agent`))) join `house` `h` on((`d`.`ID_house` = `h`.`ID_house`))) WHERE (`d`.`ID_agent` = 1)  ;

-- --------------------------------------------------------

--
-- Структура для представления `view4`
--
DROP TABLE IF EXISTS `view4`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view4`  AS SELECT `h`.`ID_house` AS `ID_house`, `h`.`name` AS `name`, `h`.`price` AS `price`, `a`.`first_name` AS `agent_first_name`, `a`.`last_name` AS `agent_last_name` FROM ((`house` `h` left join `deal` `d` on((`h`.`ID_house` = `d`.`ID_house`))) left join `agent` `a` on((`d`.`ID_agent` = `a`.`ID_agent`))) WHERE ((`d`.`ID_status` = 3) OR (`d`.`ID_status` is null))  ;

-- --------------------------------------------------------

--
-- Структура для представления `view5`
--
DROP TABLE IF EXISTS `view5`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view5`  AS SELECT `c`.`ID_client` AS `ID_client`, `c`.`first_name` AS `first_name`, `c`.`last_name` AS `last_name`, `d`.`amount` AS `amount`, `d`.`deal_date` AS `deal_date`, `h`.`name` AS `house_name` FROM ((`client` `c` join `deal` `d` on((`c`.`ID_client` = `d`.`ID_client`))) join `house` `h` on((`d`.`ID_house` = `h`.`ID_house`))) WHERE (`d`.`amount` = 350000000)  ;

-- --------------------------------------------------------

--
-- Структура для представления `view6`
--
DROP TABLE IF EXISTS `view6`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view6`  AS SELECT `h`.`ID_house` AS `ID_house`, `h`.`name` AS `name`, `h`.`location` AS `location`, `h`.`price` AS `price`, `h`.`avaliability_date` AS `avaliability_date`, `s`.`status` AS `status` FROM (`house` `h` join `status` `s` on((`h`.`ID_status` = `s`.`ID_status`))) WHERE ((`h`.`ID_status` = 1) AND (`h`.`avaliability_date` <= '2025-12-31'))  ;

-- --------------------------------------------------------

--
-- Структура для представления `view7`
--
DROP TABLE IF EXISTS `view7`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view7`  AS SELECT `a`.`ID_agent` AS `ID_agent`, `a`.`first_name` AS `first_name`, `a`.`last_name` AS `last_name`, coalesce(sum(`d`.`amount`),0) AS `total_deals_amount` FROM (`agent` `a` left join `deal` `d` on((`a`.`ID_agent` = `d`.`ID_agent`))) GROUP BY `a`.`ID_agent`, `a`.`first_name`, `a`.`last_name``last_name`  ;

-- --------------------------------------------------------

--
-- Структура для представления `view8`
--
DROP TABLE IF EXISTS `view8`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view8`  AS SELECT `h`.`ID_house` AS `ID_house`, `h`.`name` AS `name`, `h`.`location` AS `location`, `h`.`price` AS `price`, `th`.`name` AS `type_house`, `s`.`status` AS `status` FROM ((`house` `h` join `type_house` `th` on((`h`.`ID_type_house` = `th`.`ID_type_house`))) join `status` `s` on((`h`.`ID_status` = `s`.`ID_status`))) WHERE ((`h`.`ID_status` in (1,2)) AND (`th`.`name` = 'вилла'))  ;

-- --------------------------------------------------------

--
-- Структура для представления `view9`
--
DROP TABLE IF EXISTS `view9`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view9`  AS SELECT `c`.`ID_client` AS `ID_client`, `c`.`first_name` AS `first_name`, `c`.`last_name` AS `last_name`, `c`.`email` AS `email`, `c`.`budget` AS `budget`, group_concat(distinct `h`.`name` separator ', ') AS `affordable_houses`, min(`h`.`price`) AS `min_price`, max(`h`.`price`) AS `max_price` FROM (`client` `c` left join `house` `h` on((`c`.`budget` >= `h`.`price`))) WHERE ((`c`.`budget` is not null) AND (`h`.`price` between 100000000 and 300000000)) GROUP BY `c`.`ID_client`, `c`.`first_name`, `c`.`last_name`, `c`.`email`, `c`.`budget``budget`  ;

-- --------------------------------------------------------

--
-- Структура для представления `view10`
--
DROP TABLE IF EXISTS `view10`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view10`  AS SELECT `h`.`ID_house` AS `ID_house`, `h`.`name` AS `name`, `h`.`area` AS `area`, (`h`.`bedrooms` + `h`.`bathrooms`) AS `total_rooms`, `h`.`price` AS `price`, `s`.`status` AS `status` FROM (`house` `h` join `status` `s` on((`h`.`ID_status` = `s`.`ID_status`)))  ;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`ID_agent`);

--
-- Индексы таблицы `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`ID_client`),
  ADD KEY `ID_type_house` (`ID_type_house`);

--
-- Индексы таблицы `deal`
--
ALTER TABLE `deal`
  ADD PRIMARY KEY (`ID_deal`),
  ADD KEY `ID_agent` (`ID_agent`),
  ADD KEY `ID_client` (`ID_client`),
  ADD KEY `ID_house` (`ID_house`),
  ADD KEY `ID_status` (`ID_status`);

--
-- Индексы таблицы `house`
--
ALTER TABLE `house`
  ADD PRIMARY KEY (`ID_house`),
  ADD KEY `ID_type_house` (`ID_type_house`),
  ADD KEY `house_ibfk_2` (`ID_status`);

--
-- Индексы таблицы `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ID_review`),
  ADD KEY `ID_client` (`ID_client`);

--
-- Индексы таблицы `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`ID_status`);

--
-- Индексы таблицы `type_house`
--
ALTER TABLE `type_house`
  ADD PRIMARY KEY (`ID_type_house`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `agent`
--
ALTER TABLE `agent`
  MODIFY `ID_agent` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `client`
--
ALTER TABLE `client`
  MODIFY `ID_client` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `deal`
--
ALTER TABLE `deal`
  MODIFY `ID_deal` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `house`
--
ALTER TABLE `house`
  MODIFY `ID_house` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `review`
--
ALTER TABLE `review`
  MODIFY `ID_review` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `status`
--
ALTER TABLE `status`
  MODIFY `ID_status` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `type_house`
--
ALTER TABLE `type_house`
  MODIFY `ID_type_house` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `client_ibfk_1` FOREIGN KEY (`ID_type_house`) REFERENCES `type_house` (`ID_type_house`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `deal`
--
ALTER TABLE `deal`
  ADD CONSTRAINT `deal_ibfk_1` FOREIGN KEY (`ID_agent`) REFERENCES `agent` (`ID_agent`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `deal_ibfk_2` FOREIGN KEY (`ID_client`) REFERENCES `client` (`ID_client`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `deal_ibfk_3` FOREIGN KEY (`ID_house`) REFERENCES `house` (`ID_house`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `deal_ibfk_4` FOREIGN KEY (`ID_status`) REFERENCES `status` (`ID_status`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `house`
--
ALTER TABLE `house`
  ADD CONSTRAINT `house_ibfk_1` FOREIGN KEY (`ID_type_house`) REFERENCES `type_house` (`ID_type_house`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `house_ibfk_2` FOREIGN KEY (`ID_status`) REFERENCES `status` (`ID_status`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`ID_client`) REFERENCES `client` (`ID_client`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
