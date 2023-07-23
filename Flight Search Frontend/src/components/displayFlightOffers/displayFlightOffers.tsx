import { IFlightOfferResponseDto } from "../../interfaces/interfaces";
import { formatDate, formatDuration } from "../../utils/utils";
import "./displayFlightOffers.css";

interface IDisplayFlightOffersProps {
	flightData: IFlightOfferResponseDto | null | undefined;
	isOneWaySearch: boolean;
	isLoading: boolean;
}

function DisplayFlightOffers({
	flightData,
	isOneWaySearch,
	isLoading,
}: IDisplayFlightOffersProps) {
	return (
		<div className="flight-details-container">
			{isLoading && !flightData ? (
				<div>Start your search</div>
			) : isLoading ? (
				<div>Loading...</div>
			) : flightData!.data.length === 0 ? (
				<div>No results found</div>
			) : (
				<table className="flight-table">
					<thead>
						<tr>
							<th>Origin Airport</th>
							<th>Destination Airport</th>
							<th>Departure At</th>
							<th>Arrival At</th>
							<th>Number of stops</th>
							{!isOneWaySearch && <th>Return At</th>}
							{!isOneWaySearch && <th>Arrival At</th>}
							{!isOneWaySearch && <th>Number of stops</th>}
							<th>Number of Passengers</th>
							<th>Duration</th>
							<th>Total Price</th>
							<th>Currency</th>
						</tr>
					</thead>
					<tbody>
						{flightData!.data.map((flightOffer, index) => (
							<tr key={index}>
								<td>
									{flightOffer.itineraries[0].segments[0].departure.iataCode}
								</td>
								<td>
									{
										flightOffer.itineraries[0].segments.slice(-1)[0].arrival
											.iataCode
									}
								</td>
								<td>
									{formatDate(
										flightOffer.itineraries[0].segments[0].departure.at
									)}
									h
								</td>
								<td>
									{formatDate(
										flightOffer.itineraries[0].segments.slice(-1)[0].arrival.at
									)}
									h
								</td>
								<td>{flightOffer.itineraries[0].segments.length - 1}</td>
								{!isOneWaySearch && (
									<td>
										{formatDate(
											flightOffer.itineraries[1].segments[0].departure.at
										)}
										h
									</td>
								)}
								{!isOneWaySearch && (
									<td>
										{formatDate(
											flightOffer.itineraries[1].segments.slice(-1)[0].arrival
												.at
										)}
										h
									</td>
								)}
								{!isOneWaySearch && (
									<td>{flightOffer.itineraries[1].segments.length - 1}</td>
								)}
								<td>{flightOffer.travelerPricings.length}</td>
								<td>{formatDuration(flightOffer.itineraries[0].duration)}</td>
								<td>{flightOffer.price.total}</td>
								<td>{flightOffer.price.currency}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default DisplayFlightOffers;
