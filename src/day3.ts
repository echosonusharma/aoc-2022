import { readData } from './index';

const charValue = (char: string): number => {
	const charCode = char.charCodeAt(0);

	if (charCode >= 65 && charCode <= 90) {
		return charCode - 65 + 27;
	}

	return charCode - 97 + 1;
};

export const solution = (): void => {
	const data = readData(3)?.split('\r\n') as Array<string>;

	const all: Array<string> = [];

	for (let i = 0; i < data.length; ++i) {
		const partOne = data[i].slice(0, data[i].length / 2);
		const partTwo = data[i].slice(data[i].length / 2).split('');

		for (let j = 0; j < partTwo.length; ++j) {
			if (partOne.includes(partTwo[j])) {
				all.push(partTwo[j]);
				break;
			}
		}
	}

	const all1: Array<string> = [];

	for (let i = 0; i < data.length; i += 3) {
		const One = data[i].split('');
		const Two = data[i + 1];
		const Three = data[i + 2];

		for (let j = 0; j < One.length; ++j) {
			if (Two.includes(One[j]) && Three.includes(One[j])) {
				all1.push(One[j]);
				break;
			}
		}
	}

	console.log(all.reduce((acc, curr) => acc + charValue(curr), 0));

	console.log(all1.reduce((acc, curr) => acc + charValue(curr), 0));
};
