Schema

Customer Schema:

{
	_id: num,
	address: string,
	phoneNumber: string,
	cars: [
		carIdOne,
		carIdTwo
	]
}

Car Schema (Possibly)
{
	_id: num,
	model: string,
	make: string,
	licensePlate: string
	ownerId: num
}

Services Schema:

{
	_id: num,
	title: string
	cost: decimal
}

Technican Schema

{
	_id: num,
	services: [
		serviceIdOne,
		serviceIdTwo,
	]
}

Job Schema:

{
	_id: num,
	car: carId
	service: linktToServiceId
	date: timeString,
	technican: technicanId
}
