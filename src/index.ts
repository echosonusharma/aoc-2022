import { readFileSync } from 'node:fs';

import { solution } from './day3';

export const readData = (day: number): string | undefined => {
	try {
		const data = readFileSync(`inputs/day${day}.txt`, { encoding: 'utf8' });

		return data;
	} catch (err) {
		console.error(err);
	}
};

// answers

solution();
