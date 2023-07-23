export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatDuration = (durationString: string) => {
	const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
	const matches = durationString.match(durationRegex);
	if (matches) {
		const hours = parseInt(matches[1]) || 0;
		const minutes = parseInt(matches[2]) || 0;
		return `${hours} hours ${minutes} minutes`;
	}
};
