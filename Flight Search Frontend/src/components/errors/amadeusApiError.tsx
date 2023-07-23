import { IAmadeusApiErrorResponse } from "../../interfaces/interfaces";

interface IAmadeusApiErrorProps {
	amadeusError: IAmadeusApiErrorResponse | null;
}

function AmadeusApiError({ amadeusError }: IAmadeusApiErrorProps) {
	return (
		<div>
			<div>
				{amadeusError &&
					amadeusError.errors.length &&
					amadeusError.errors.map((err) => {
						return <div key={err.title}>{err.detail}</div>;
					})}
			</div>
		</div>
	);
}

export default AmadeusApiError;
