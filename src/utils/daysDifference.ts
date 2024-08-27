export function calculateDaysDifference(date1: string, date2: string): number {
	// Parse the dates to Date objects
	const parsedDate1 = new Date(date1);
	const parsedDate2 = new Date(date2);

	// Calculate the difference in milliseconds
	const differenceInMilliseconds =
		parsedDate2.getTime() - parsedDate1.getTime();

	// Convert milliseconds to days
	const millisecondsInOneDay = 1000 * 60 * 60 * 24;
	const differenceInDays = differenceInMilliseconds / millisecondsInOneDay;

	return Math.floor(differenceInDays);
}
