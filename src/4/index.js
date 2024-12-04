const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const mat = input.split('\n').map(row => row.split(''));
    return mat;
};

function findXMASHorizontal(mat, y, x) {
    let count = 0;
    let i = x;
    if (x + 3 < mat[0].length) {
        if (mat[y][i + 1] === 'M' && mat[y][i + 2] === 'A' && mat[y][i + 3] === 'S') {
            count++;
        }
    }
    if (x - 3 >= 0) {
        if (mat[y][i - 1] === 'M' && mat[y][i - 2] === 'A' && mat[y][i - 3] === 'S') {
            count++;
        }
    }
    return count;
}

function findXMASVertical(mat, y, x) {
    let count = 0;
    let i = y;
    if (y + 3 < mat.length) {
        if (mat[i + 1][x] === 'M' && mat[i + 2][x] === 'A' && mat[i + 3][x] === 'S') {
            count++;
        }
    }
    if (y - 3 >= 0) {
        if (mat[i - 1][x] === 'M' && mat[i - 2][x] === 'A' && mat[i - 3][x] === 'S') {
            count++;
        }
    }
    return count;
}

function findXMASDiagonal(mat, y, x) {
    let count = 0;
    let i = y;
    let j = x;
    if (y + 3 < mat.length && x + 3 < mat[0].length) {
        if (mat[i + 1][j + 1] === 'M' && mat[i + 2][j + 2] === 'A' && mat[i + 3][j + 3] === 'S') {
            count++;
        }
    }
    if (y - 3 >= 0 && x - 3 >= 0) {
        if (mat[i - 1][j - 1] === 'M' && mat[i - 2][j - 2] === 'A' && mat[i - 3][j - 3] === 'S') {
            count++;
        }
    }
    if (y + 3 < mat.length && x - 3 >= 0) {
        if (mat[i + 1][j - 1] === 'M' && mat[i + 2][j - 2] === 'A' && mat[i + 3][j - 3] === 'S') {
            count++;
        }
    }
    if (y - 3 >= 0 && x + 3 < mat[0].length) {
        if (mat[i - 1][j + 1] === 'M' && mat[i - 2][j + 2] === 'A' && mat[i - 3][j + 3] === 'S') {
            count++;
        }
    }
    return count;
}

const solve1 = (input) => {
    let count = 0;
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === 'X') {
                count += findXMASHorizontal(input, y, x);
                count += findXMASVertical(input, y, x);
                count += findXMASDiagonal(input, y, x);
            }
        }
    }
    return count;
};

const solve2 = (input) => {
    let count = 0;
    for (let y = 1; y < input.length - 1; y++) {
        for (let x = 1; x < input[y].length - 1; x++) {
            if (input[y][x] === 'A') {
                if ((input[y - 1][x - 1] === 'M' && input[y + 1][x + 1] === 'S') || (input[y - 1][x - 1] === 'S' && input[y + 1][x + 1] === 'M')) {
                    if ((input[y - 1][x + 1] === 'M' && input[y + 1][x - 1] === 'S') || (input[y - 1][x + 1] === 'S' && input[y + 1][x - 1] === 'M')) {
                        count++;
                    }
                }
            }
        }
    }
    return count;
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(18);

        const result = solve1(processInput(input));
        expect(result).toBe(2514);
    });

    it.skip('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(9);

        const result = solve2(processInput(input));
        expect(result).toBe(1888);
    });
});