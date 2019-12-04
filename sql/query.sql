CREATE EXTENSION IF NOT EXISTS tablefunc;

SELECT *
FROM crosstab(
	'SELECT DATE("createdAt") as date, "carName", max("carPrice")
	FROM "CarPriceLogs"
	GROUP BY (date, "carName")
	ORDER BY 1,2,3',
	'SELECT DISTINCT "carName" FROM "CarPriceLogs" ORDER BY 1')
AS "CarPriceLogs"(
	"date" date,
	"4Runner" int,
	"Altima" int,
	"Camry" int,
	"Corolla" int,
	"Frontier" int,
	"Highlander" int,
	"Kicks" int,
	"Murano" int,
	"Prius" int,
	"RAV4" int,
	"Rogue" int,
	"Sentra" int,
	"Tacoma" int,
	"Tundra" int,
	"Yaris" int
)