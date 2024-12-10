const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = input.trim().split('\n');
    return lines;
};

const solve1 = (input) => {
    let ret = 0;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] == "0") {
                let visited = {};
                let navigate = (y, x, l) => {
                    if (y < 0 || y >= input.length || visited[[y, x]] || input[y][x] != l) return;
                    visited[[y, x]] = true;
                    if (l == 9) {
                        ret++;
                        return;
                    }
                    navigate(y - 1, x, l + 1);
                    navigate(y + 1, x, l + 1);
                    navigate(y, x - 1, l + 1);
                    navigate(y, x + 1, l + 1);
                }
                navigate(y, x, 0);
            }
        }
    }
    return ret;
};

const solve2 = (input) => {
    let ret = 0;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] == "0") {
                let visited = {};
                let navigate = (y, x, l) => {
                    if (y < 0 || y >= input.length || visited[[y, x]] || input[y][x] != l) return;
                    if (l == 9) {
                        ret++;
                        return;
                    }
                    navigate(y - 1, x, l + 1);
                    navigate(y + 1, x, l + 1);
                    navigate(y, x - 1, l + 1);
                    navigate(y, x + 1, l + 1);
                }
                navigate(y, x, 0);
            }
        }
    }
    return ret;
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(36);

        const result = solve1(processInput(input));
        expect(result).toBe(682);
    });

    it.skip('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(81);

        const result = solve2(processInput(input));
        expect(result).toBe(1511);
    });
});