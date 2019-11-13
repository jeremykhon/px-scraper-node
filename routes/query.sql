CREATE EXTENSION IF NOT EXISTS tablefunc;

SELECT *
FROM crosstab(
	'SELECT DATE(created_at) as date, car_name, max(car_price)
	FROM logs
	GROUP BY (date, car_name)
	ORDER BY 1,2',
	'SELECT DISTINCT car_name FROM logs')
AS logs(
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
