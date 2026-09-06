function ordinalSuffix(day: number): string {
	if (day >= 11 && day <= 13) return 'th';
	switch (day % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
}

/** Formats a date as "September 6th, 2026" (UTC, so build-server timezone can't shift the day). */
export function formatDate(date: Date): string {
	const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();
	return `${month} ${day}${ordinalSuffix(day)}, ${year}`;
}
