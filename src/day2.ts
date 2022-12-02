import { readData } from './index';

interface I_CONST<T> {
	[x: string]: T;
}

const POINTS: I_CONST<number> = {
	X: 1,
	Y: 2,
	Z: 3,
};

const TO_WIN: I_CONST<string> = {
	A: 'Y',
	B: 'Z',
	C: 'X',
};

const TO_LOSE: I_CONST<string> = {
	A: 'Z',
	B: 'X',
	C: 'Y',
};

const DRAW: I_CONST<string> = {
	A: 'X',
	B: 'Y',
	C: 'Z',
};

// a - rock - x - 1
// b - paper - y - 2
// c - scissors - z - 3

// won - 6
// draw - 3
// lost - 0

// r - p
// p - s
// s - r

export const solution = (): void => {
	const data = readData(2)?.split('\r\n') as Array<string>;

	const all: Array<number> = [];

	for (let i = 0; i < data.length; ++i) {
		const [opponent, me] = data[i].split(' ');

		if (TO_WIN[opponent] === me) {
			// win
			all.push(POINTS[me] + 6);
		} else if (DRAW[opponent] === me) {
			// draw
			all.push(POINTS[me] + 3);
		} else {
			//lost
			all.push(POINTS[me]);
		}
	}

	const part2 = data.reduce((acc: number, curr: string) => {
		const [opponent, me] = curr.split(' ');

		if (me === 'Z') {
			// to win
			acc += POINTS[TO_WIN[opponent]] + 6;
		} else if (me === 'Y') {
			// to draw
			acc += POINTS[DRAW[opponent]] + 3;
		} else {
			// to lost
			acc += POINTS[TO_LOSE[opponent]];
		}

		return acc;
	}, 0);

	console.log(all.reduce((acc, curr) => acc + curr));

	console.log(part2);
};
