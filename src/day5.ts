import { readData } from './index';

interface ICargo {
	[keys: string]: string[];
}

const formatCargo = (input: Array<string>): ICargo => {
	const obj: ICargo = {};

	for (let i = input.length - 1; i >= 0; --i) {
		const data: string = input[i];

		if (i === input.length - 1) {
			data.split(' ').forEach((item: string) => {
				if (item !== '') {
					obj[item] = [];
				}
			});
		} else {
			let idx: number = 1;

			for (let j = 0; j < data.length; j += 4, idx++) {
				const crate: string = data.slice(j, j + 3);

				if (crate !== '   ') {
					obj[`${idx}`].push(crate);
				}
			}
		}
	}

	return obj;
};

export const solution = (): void => {
	const data = readData(5)?.split('\r\n') as Array<string>;

	const cargo: string[] = data.splice(0, data.indexOf('') + 1);
	cargo.pop();

	const formattedCargo: ICargo = formatCargo(cargo);

	const formattedCargo1: ICargo = formatCargo(cargo);

	for (let k = 0; k < data.length; ++k) {
		const movement: string[] = data[k].split(' ');

		const move: string[] = formattedCargo[`${movement[3]}`].splice(
			-movement[1]
		);

		const move1: string[] = formattedCargo1[`${movement[3]}`].splice(
			-movement[1]
		);

		move.reverse().forEach((v) => {
			formattedCargo[`${movement[5]}`].push(v);
		});

		formattedCargo1[`${movement[5]}`] =
			formattedCargo1[`${movement[5]}`].concat(move1);
	}

	const order = (obj: ICargo): string =>
		Object.values(obj).reduce(
			(acc, value) => (acc += value[value.length - 1]?.slice(1, 2)),
			''
		);

	console.log(order(formattedCargo), order(formattedCargo1));
};
