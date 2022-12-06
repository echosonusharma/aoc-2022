import { readData } from './index';

const uniqueCheck = (packet: string): boolean =>
	new Set(packet.split('')).size === packet.length;

const findMarker = (data: string, consists: number): number | undefined => {
	for (let i = 0, j = consists; i < data.length; i++, j++) {
		if (uniqueCheck(data.slice(i, j))) {
			return j;
		}
	}
};

export const solution = (): void => {
	const data = readData(6)?.toString() as string;

	console.log(findMarker(data, 4), findMarker(data, 14));
};
