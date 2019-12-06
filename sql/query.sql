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
	"Accord" int,
	"Altima" int,
	"Ascent" int,
	"CR-V" int,
	"CX-3" int,
	"CX-5" int,
	"CX-9" int,
	"Camry" int,
	"Civic" int,
	"Corolla" int,
	"CrosTrek" int,
	"ES" int,
	"Eclipse Cross" int,
	"Forester" int,
	"Frontier" int,
	"HR-V" int,
	"Highlander" int,
	"ILX" int,
	"Impreza" int,
	"Kicks" int,
	"Mazda3" int,
	"Mazda6" int,
	"Mirage" int,
	"Murano" int,
	"Odyssey" int,
	"Outback" int,
	"Outlander" int,
	"Pilot" int,
	"Prius" int,
	"RAV4" int,
	"RLX/RL" int,
	"RX" int,
	"Rogue" int,
	"Sentra" int,
	"TLX" int,
	"Tacoma" int,
	"Tundra" int,
	"UX" int,
	"Yaris" int
)