import React, { useState } from "react";
import {
	IAmadeusApiErrorResponse,
	IFlightOfferResponseDto,
	IValidationErrorResponse,
} from "../../interfaces/interfaces";
import AmadeusApiError from "../errors/amadeusApiError";
import ValidationApiError from "../errors/validationApiError";
import LocationSearch from "./locationSearch/locationSearch";
import "./searchFlightsForm.css";

interface ISearchFlightsFormProps {
	setFlightData: (data: IFlightOfferResponseDto | null) => void;
	setOneWaySearch: (data: boolean) => void;
	setIsLoading: (data: boolean) => void;
}

function SearchFlightsForm(props: ISearchFlightsFormProps) {
	const [amadeusError, setAmadeusError] =
		useState<IAmadeusApiErrorResponse | null>(null);
	const [validationError, setValidationError] =
		useState<IValidationErrorResponse | null>(null);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		props.setIsLoading(true);
		props.setFlightData(null);
		setAmadeusError(null);
		setValidationError(null);

		const form = e.currentTarget;
		const formData = new FormData(form);

		let url = process.env.REACT_APP_API_URL + "amadeusapi/flight-offers?";
		const formJson = Object.fromEntries(formData.entries());
		for (const key in formJson) {
			url += `${key}=${formJson[key]}&`;
		}
		const fetchUrl = url.slice(0, -1);

		fetch(fetchUrl)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				if (data.status === 400) {
					data.isAmadeusApiError
						? setAmadeusError(data)
						: setValidationError(data);
				} else {
					const result = data as IFlightOfferResponseDto;
					props.setFlightData(result);
					props.setOneWaySearch(result.data[0]?.itineraries.length == 1);
				}
			})
			.catch((err) => {
				console.log("some errors", err);
			})
			.finally(() => {
				props.setIsLoading(false);
			});
	}

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)} className="searchForm">
				<div className="inputs">
					<LocationSearch
						name="originLocationCode"
						display="From:"
					></LocationSearch>
					<LocationSearch
						name="destinationLocationCode"
						display="To:"
					></LocationSearch>
					<div>
						<label>
							Departure:
							<input name="departureDate" type="date" required={true} />
						</label>
					</div>
					<div>
						<label>
							Return: <input name="returnDate" type="date" />
						</label>
					</div>
					<div>
						<label>
							Number of passengers:
							<input name="adults" type="number" required={true} />
						</label>
					</div>
					<div className="curr">
						Currency:
						<label>
							<input
								type="radio"
								name="currencyCode"
								value="EUR"
								defaultChecked={true}
							/>
							EURO
						</label>
						<label>
							<input type="radio" name="currencyCode" value="USD" />
							USD
						</label>
					</div>
				</div>

				<button type="submit">Search</button>
			</form>

			<div>
				<AmadeusApiError amadeusError={amadeusError}></AmadeusApiError>
				<ValidationApiError
					validationError={validationError}
				></ValidationApiError>
			</div>
		</div>
	);
}

export default SearchFlightsForm;
