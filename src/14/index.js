const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = input.split('\n').map(l => {
        const [p, v] = l.split(' ');
        return [p.split('p=')[1].split(',').map(Number), v.split('v=')[1].split(',').map(Number)];
    });
    return lines;
};

const solve1 = (input, width, height) => {
    const finalPositions = input.map(([p, v]) => {
        let w = (p[0] + (v[0] * 100)) % width;
        if (w < 0) {
            w += width;
        }
        let h = (p[1] + (v[1] * 100)) % height;
        if (h < 0) {
            h += height;
        }
        return [w, h];
    });
    const quad1 = finalPositions.filter(([x, y]) => x < (width - 1) / 2 && y < (height - 1) / 2).length;
    const quad2 = finalPositions.filter(([x, y]) => x > (width - 1) / 2 && y < (height - 1) / 2).length;
    const quad3 = finalPositions.filter(([x, y]) => x < (width - 1) / 2 && y > (height - 1) / 2).length;
    const quad4 = finalPositions.filter(([x, y]) => x > (width - 1) / 2 && y > (height - 1) / 2).length;
    return quad1 * quad2 * quad3 * quad4;
};

const solve2 = (input, width, height) => {
    const getFinalPositions = (iter) => input.map(([p, v]) => {
        let w = (p[0] + (v[0] * iter)) % width;
        if (w < 0) {
            w += width;
        }
        let h = (p[1] + (v[1] * iter)) % height;
        if (h < 0) {
            h += height;
        }
        return [w, h];
    });
    let i = 0;
    while (true) {
        const finalPositions = getFinalPositions(i);
        const matrix = Array(height).fill().map(() => Array(width).fill('.'));
        finalPositions.forEach(([x, y]) => matrix[y][x] = '#');
        const areThere10PosInLine = matrix.some(l => l.join('').includes('##########'));
        if (areThere10PosInLine) {
            console.log(matrix.map(l => l.join('')).join('\n'));
            return i;
        }
        i++;
    }
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput), 11, 7);
        expect(exampleResult).toBe(12);

        const result = solve1(processInput(input), 101, 103);
        expect(result).toBe(222208000);
    });

    it.skip('Part 2', () => {
        const result = solve2(processInput(input), 101, 103);
        expect(result).toBe(7623);
    });
});