export interface IAmadeusApiErrorResponse {
	errors: IAmadeusApiError[];
	status: number;
	isSuccess: boolean;
	isAmadeusApiError: boolean;
}

export interface IAmadeusApiError {
	status: number;
	detail: string;
	title: string;
}

export interface IValidationErrorResponse {
	type: string;
	title: string;
	status: number;
	traceId: string;
	errors: ValidationErrorDetails;
}

export interface ValidationErrorDetails {
	[key: string]: string[];
}

export interface IFlightOfferResponseDto {
	data: FlightOffer[];
}

export interface FlightOffer {
	type: string;
	id: string;
	oneWay: boolean;
	itineraries: Itinerary[];
	price: Price;
	travelerPricings: TravelerPricings[];
}

interface TravelerPricings {
	travelerId: string;
	travelerType: string;
}

interface Itinerary {
	segments: Segment[];
	duration: string;
}

interface Segment {
	id: string;
	departure: Location;
	arrival: Location;
	carrierCode: string;
	duration: string;
	numberOfStops: number;
}

interface Price {
	currency: string;
	total: string;
}

interface Location {
	iataCode: string;
	at: string;
}

export interface LocationAirportsDto {
	airports: { [key: string]: Airport };
}

interface Airport {
	name: string;
	iataCode: string;
}
