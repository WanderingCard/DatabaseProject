Schema

Customer Schema:

{
	_id: num,
	fName: string,
	lName: string,
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
	fname: string,
	lname: string,
	services: [
		serviceIdOne,
		serviceIdTwo,
	]
}

Job Schema:

{
	_id: num,
	car: carId
	service: [
		serviceIdOne,
		serviceIdTwo
	]
	date: timeString,
	technican: technicanId
}

Make Schema:

{
	_id: num,
	label: string
}

Model Schema:

{
	_id: num,
	label: string
}
