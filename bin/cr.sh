#!/usr/bin/env bash

touch ./inputs/day$(expr $(ls ./inputs | wc -l) + 1).txt

SRC_FILE_PATH=./src/day$(ls ./src | wc -l).ts

touch ${SRC_FILE_PATH}

echo -e "import { readData } from './index'; \n\nexport const solution = (): void => { \n\tconst data = readData(3)?.split('\\\r\\\n') as Array<string>;\n\n};\n" >> ${SRC_FILE_PATH}
