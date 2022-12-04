import { readData } from './index';

export const solution = (): void => {
	const data = readData(4)?.split('\r\n') as Array<string>;

	let count: number = 0;
	let count1: number = 0;

	for (let i = 0; i < data.length; ++i) {
		const [sec1, sec2]: string[] = data[i].split(',');

		const sec1Val: string[] = sec1.split('-');
		const sec2Val: string[] = sec2.split('-');

		if (+sec2Val[0] >= +sec1Val[0] && +sec2Val[1] <= +sec1Val[1]) {
			count += 1;
		} else if (+sec2Val[0] <= +sec1Val[0] && +sec2Val[1] >= +sec1Val[1]) {
			count += 1;
		}
	}

	for (let i = 0; i < data.length; ++i) {
		const [sec1, sec2]: string[] = data[i].split(',');

		const sec1Val: string[] = sec1.split('-');
		const sec2Val: string[] = sec2.split('-');

		if (+sec2Val[0] >= +sec1Val[0] && +sec2Val[0] <= +sec1Val[1]) {
			count1 += 1;
		} else if (+sec2Val[1] >= +sec1Val[0] && +sec2Val[0] <= +sec1Val[1]) {
			count1 += 1;
		}
	}

	console.log(count);
	console.log(count1);
};
