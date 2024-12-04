const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = input.split('\n').join('');
    return lines;
};

const solve1 = (input) => {
    const matches = input.match(/mul\(\d{1,3},\d{1,3}\)/g);
    const pairs = matches.map(match => {
        return match.replace('mul(', '').replace(')', '').split(',').map(Number);
    });
    return pairs.reduce((acc, [a, b]) => acc + a * b, 0);
};

const solve2 = (input) => {
    const matches = input.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g);
    let doo = true;
    let sum = 0;
    for (let i = 0; i < matches.length; i++) {
        console.log(matches[i]);
        if (matches[i] === "do()") {
            doo = true;
            continue;
        }
        if (matches[i] === "don't()") {
            doo = false;
            continue;
        }
        if (doo) {
            const [a, b] = matches[i].replace('mul(', '').replace(')', '').split(',').map(Number);
            console.log(a, b);
            sum += a * b;
        }
    }
    return sum;
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(161);

        const result = solve1(processInput(input));
        expect(result).toBe(175700056);
    });

    it.skip('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(48);

        const result = solve2(processInput(input));
        expect(result).toBe(28786472);
    });
});