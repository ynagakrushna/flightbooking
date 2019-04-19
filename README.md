# Flight Booking API

### Passwords

set PASSWORD=yourdbpassword;
set airways_jwtPrivateKey=yourprivatekey;

## Endpoints

#### Must be login as user

### User Endpoints
get - /api/users/me
post - /api/users

#### req.body
{
	"name": "Naga Krushna Yelisetty",
	"email": "nagakrushnay@gmail.com",
	"password": "password"
}

### Ticket Endpoints
get - /api/tickets
post - /api/tickets

#### req.body
{
"fcid": fcid,
"fid": fid
}

#### Must be login as admin

### Flight Endpoints
get - /api/flights
post - /api/flights
delete - /api/flights/:id

#### req.body
{
	"number": 123,
	"departure": "2019-04-22 10:00:00",
	"arrival": "2019-04-21 10:00:00",
	"duration": 30,
	"miles": 300
}

### AIRLINE Endpoints
get - /api/airline
post - /api/airline

#### req.body
{
	"name": "Airline Operator"
}

### Airport Endpoints
get - /api/airports
post - /api/airports

#### req.body
{
	"iata": "iata",
	"name": "Airport Name",
	"city": "City",
	"state": "state"
}

### flight associated airport Endpoints

get - /api/airports/flights
post - /api/airports/flights

#### req.body
{
	"flight_id": fid,
	"airport_id": aid
}


