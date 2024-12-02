const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = input.split('\n');
    return lines;
};

const solve1 = (input) => {
    return input;
};

const solve2 = (input) => {
    return input;
};

describe('Day 1', () => {
    it('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(11);

        const result = solve1(processInput(input));
        expect(result).toBe(2430334);
    });

    it.skip('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(31);

        const result = solve2(processInput(input));
        expect(result).toBe(28786472);
    });
});