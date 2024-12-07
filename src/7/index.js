const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = input.split('\n')
        .map(line => line.split(': '))
        .map(([a, b]) => [Number(a), b.split(' ').map(Number)]);
    return lines;
};

function canResolve(result, numbers) {
    // can some combination of numbers equal result?
    const numberOfCombination = Math.pow(2, numbers.length - 1);
    for (let i = 0; i < numberOfCombination; i++) {
        let equation = '';
        const binary = i.toString(2).padStart(numbers.length - 1, '0');
        for (let j = 0; j < numbers.length; j++) {
            equation += numbers[j];
            equation = `( ${equation} )`;
            if (j < numbers.length - 1) {
                equation += binary[j] === '1' ? '+' : '*';
            }
        }
        if (eval(equation) === result) {
            return true;
        }
    }
    return false;
}

function canResolve2(result, numbers) {
    // can some combination of numbers equal result?
    const numberOfCombination = Math.pow(3, numbers.length - 1);
    for (let i = 0; i < numberOfCombination; i++) {
        let equation = '';
        const binary = i.toString(3).padStart(numbers.length - 1, '0');
        for (let j = 0; j < numbers.length; j++) {
            equation += numbers[j];
            equation = eval(equation).toString();
    
            if (j < numbers.length - 1) {
                if (binary[j] === '0') {
                    equation += '+';
                }
                if (binary[j] === '1') {
                    equation += '*';
                }

            }
        }
        if (result == 292) {
            console.log(equation)
        }
        if (eval(equation) === result) {
            return true;
        }
    }
    return false;
}

const solve1 = (input) => {
    let sum = 0;
    for (const [result, numbers] of input) {
        if (canResolve(result, numbers)) {
            sum += result;
        }
    }
    return sum;
};

const solve2 = (input) => {
    let sum = 0;
    for (const [result, numbers] of input) {
        if (canResolve2(result, numbers)) {
            console.log(result);
            sum += result;
        }
    }
    return sum;
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(11387);

        const result = solve1(processInput(input));
        expect(result).toBe(7885693428401);
    });

    it.skip('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(11387);

        const result = solve2(processInput(input));
        expect(result).toBe(348360680516005);
    });
});