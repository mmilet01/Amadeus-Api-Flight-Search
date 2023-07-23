import React, { useState } from "react";
import { LocationAirportsDto } from "../../../interfaces/interfaces";

function LocationSearch(props: any) {
	const [locations, setLocations] = useState<LocationAirportsDto>();
	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function onLocationInputBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
		setValue(e.target.value);
		setIsLoading(true);
		let url =
			process.env.REACT_APP_API_URL +
			"amadeusapi/cities?keyword=" +
			e.target.value;

		fetch(url)
			.then((response) => response.json())
			.then((locations) => {
				setLocations(locations.included);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<div>
			<label>
				{props.display}
				<input
					type="text"
					onBlur={(e) => onLocationInputBlur(e)}
					required={true}
				/>
			</label>
			<div>
				{isLoading ? (
					<div>Loading {value} airports</div>
				) : value && locations ? (
					<div>
						{value} airports
						<div>
							{Object.keys(locations.airports).map((key) => (
								<div key={key} style={{ display: "inline" }}>
									<input
										type="radio"
										id={key}
										name={props.name}
										value={key}
										required={true}
									/>
									<label htmlFor={key} style={{ whiteSpace: "nowrap" }}>
										{locations.airports[key].name +
											": " +
											locations.airports[key].iataCode}
									</label>
									<br />
								</div>
							))}
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default LocationSearch;
