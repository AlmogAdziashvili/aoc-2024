const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = _.split(input, '\n');
    const words = _.map(lines, _.words);
    const numbers = _.map(
        words, 
        _.unary(_.curryRight(_.map)(_.parseInt)),
    );
    const lists = _.zip(...numbers);
    return lists;
};

const solve1 = ([list1, list2]) => {
    const sortedList1 = _.sortBy(list1);
    const sortedList2 = _.sortBy(list2);
    const pairs = _.zip(sortedList1, sortedList2);
    const differences = _.map(pairs, _.spread(_.subtract));
    const absDifferences = _.map(differences, Math.abs);
    const sum = _.sum(absDifferences);
    return sum;
};

const solve2 = ([list1, list2]) => {
    const list2Counts = _.countBy(list2);
    const similarityScore = _.reduce(list1, (acc, value) => {
        return acc + value * (list2Counts[value] || 0);
    }, 0);
    
    return similarityScore;
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(11);

        const result = solve1(processInput(input));
        expect(result).toBe(2430334);
    });

    it('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(31);

        const result = solve2(processInput(input));
        expect(result).toBe(28786472);
    });
});