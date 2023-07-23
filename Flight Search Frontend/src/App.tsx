import { useState } from "react";
import "./App.css";
import DisplayFlightOffers from "./components/displayFlightOffers/displayFlightOffers";
import SearchFlightsForm from "./components/searchFlightsForm/searchFlightsForm";
import { IFlightOfferResponseDto } from "./interfaces/interfaces";

function App() {
	const [flightData, setFlightData] = useState<
		IFlightOfferResponseDto | null | undefined
	>();
	const [oneWaySearch, setOneWaySearch] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	return (
		<div className="App">
			<header className="App-header">
				<SearchFlightsForm
					setFlightData={setFlightData}
					setOneWaySearch={setOneWaySearch}
					setIsLoading={setIsLoading}
				></SearchFlightsForm>
				<DisplayFlightOffers
					flightData={flightData}
					isOneWaySearch={oneWaySearch}
					isLoading={isLoading}
				></DisplayFlightOffers>
			</header>
		</div>
	);
}

export default App;
