import { readData } from './index';

type File = {
	name: string;
	size: number;
};

type Folder = {
	name: string;
	children: Array<File | Folder | []>;
	size?: number;
};

type Root = Array<Folder | File>;

const atMost: number = 100_000;

const spaceAvailable: number = 70_000_000;
const neededUnusedSpace: number = 30_000_000;

const root: Root = [];

let mem: Array<string> = [];

let curr: Root;

export const solution = (): void => {
	const data = readData(7)?.split('\r\n') as Array<string>;

	let loadFiles: boolean = false;

	// build dir structure
	for (let i = 0; i < data.length; ++i) {
		const cmd: string = data[i];

		// go to root dir
		if (cmd === '$ cd /') {
			curr = root;
			continue;
		}

		// up a dir
		if (cmd === '$ cd ..') {
			let folder: Root = root;

			mem.pop();

			for (let k = 0; k < mem.length; ++k) {
				const idx: number = folder.findIndex(
					({ name }: { name: string }) => name === mem[k]
				);

				folder = (folder[idx] as Folder)?.children as Root;
			}

			curr = folder;
			continue;
		}

		// inside a dir
		if (cmd.startsWith('$ cd') && !cmd.endsWith('..')) {
			const dirName: string = cmd.split(' ')[2];

			for (let j = 0; j < curr.length; ++j) {
				if (curr[j].name === dirName) {
					curr = (curr[j] as Folder)?.children as Root;
					mem.push(dirName);
					break;
				}
			}

			continue;
		}

		// list a dir
		if (cmd === '$ ls') {
			loadFiles = true;
			continue;
		}

		if (loadFiles && cmd.startsWith('$')) {
			loadFiles = false;
			continue;
		}

		if (loadFiles) {
			if (cmd.startsWith('dir')) {
				curr.push({ name: cmd.split(' ')[1], children: [] });
			} else {
				const [size, name] = cmd.split(' ');
				curr.push({ name, size: +size });
			}
		}
	}

	const p1: Array<number> = [];
	const p2: Array<number> = [];

	function calculateSize(obj: Folder): number {
		let size: number = obj.size || 0;

		if (obj.children) {
			for (let child of obj.children) {
				size += calculateSize(child as Folder);
			}
			obj.size = size;

			if (size < atMost) {
				p1.push(size);
			}

			p2.push(size);
		}

		return size;
	}

	function calculateChildSizes(obj: Folder | File): void {
		const sizes: Array<number> = [];

		if ((obj as Folder)?.children) {
			for (let child of (obj as Folder).children) {
				sizes.push(calculateSize(child as Folder));
			}

			const size: number = sizes.reduce((a, b) => a + b, 0);
			obj.size = size;

			if (size < atMost) {
				p1.push(size);
			}

			p2.push(size);
		}
	}

	root.forEach((obj: File | Folder) => calculateChildSizes(obj));

	console.log(p1.reduce((a, b) => a + b, 0));

	const rootSize: number = root.reduce(
		(a: number, { size }: Folder | File) => a + (size as number),
		0
	);

	const unusedSpace: number = spaceAvailable - rootSize;

	const sizeNeeded: number = neededUnusedSpace - unusedSpace;

	console.log(
		p2.filter((size: number) => size > sizeNeeded).sort((a, z) => a - z)[0]
	);

	// console.log(JSON.stringify(root, null, 2));
	// console.log(mem);
	// console.log(root);
	// console.log(data);
};
