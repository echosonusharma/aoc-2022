#!/usr/bin/env bash

touch ./inputs/day$(expr $(ls ./inputs | wc -l) + 1).txt

SRC_FILE_COUNT=$(ls ./src | wc -l)

SRC_FILE_PATH=./src/day${SRC_FILE_COUNT}.ts

touch ${SRC_FILE_PATH}

echo -e "import { readData } from './index'; \n\nexport const solution = (): void => { \n\tconst data = readData(${SRC_FILE_COUNT})?.split('\\\r\\\n') as Array<string>;\n\n};\n" >> ${SRC_FILE_PATH}
