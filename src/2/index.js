const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = input.split('\n');
    const numbers = lines.map(a => a.split(' ').map(Number));
    return numbers;
};

const isDecreasing = line => line.every((a, i) => i === 0 || a > line[i - 1]);
const isIncreasing = line => line.every((a, i) => i === 0 || a < line[i - 1]);
const isDifferenceBetween1and3 = (a, b) => Math.abs(a - b) >= 1 && Math.abs(a - b) <= 3;

const isValid = (line) => {
    const couples = _.zip(_.initial(line), _.tail(line));
    const isValid = couples.every(([a, b]) => isDifferenceBetween1and3(a, b));
    const isDecOrInc = isDecreasing(line) || isIncreasing(line);
    return isDecOrInc && isValid;
}

const solve1 = (input) => {
    const validCount = input.reduce((acc, line) => {
        return acc + (isValid(line) ? 1 : 0);
    }, 0);

    return validCount;
};

const solve2 = (input) => {
    const permutations = (line) => {
        return line.map((_, i) => {
            const newLine = [...line];
            newLine.splice(i, 1);
            return newLine;
        });
    };

    const validCount = input.reduce((acc, line) => {
        const isThereValidPermutation = permutations(line).some(isValid);
        return acc + (isThereValidPermutation ? 1 : 0);
    }, 0);

    return validCount;
};

describe.skip('Day 2', () => {
    it('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(2);

        const result = solve1(processInput(input));
        expect(result).toBe(306);
    });

    it('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(4);

        const result = solve2(processInput(input));
        expect(result).toBe(366);
    });
});