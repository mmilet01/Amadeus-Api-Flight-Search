import { IValidationErrorResponse } from "../../interfaces/interfaces";

interface IValidationApiError {
	validationError: IValidationErrorResponse | null;
}

function ValidationApiError({ validationError }: IValidationApiError) {
	return (
		<div>
			<div>
				{validationError &&
					Object.keys(validationError.errors).length &&
					Object.keys(validationError.errors).map((key, index) => (
						<div key={index}>
							{key}: {validationError.errors[key]}
						</div>
					))}
			</div>
		</div>
	);
}

export default ValidationApiError;
