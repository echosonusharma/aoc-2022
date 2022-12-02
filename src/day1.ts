import { readData } from './index';

export const solution = (): void => {
	const data = readData(1)?.split('\r\n') as Array<string>;

	let currValue: number = 0;
	const all: Array<number> = [];

	for (let i = 0; i < data.length; ++i) {
		if (data[i] === '') {
			all.push(currValue);
			currValue = 0;
		} else {
			currValue += +data[i];
		}
	}

	console.log(Math.max(...all));
	console.log(
		all
			.sort((a, z) => z - a)
			.slice(0, 3)
			.reduce((acc, crr) => acc + crr)
	);
};
