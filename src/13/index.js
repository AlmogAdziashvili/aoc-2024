const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const games = input.split('\n\n').map(game => {
        const [a, b, r] = game.split('\n');
        return {
            a: [parseInt(a.split('X+')[1]), parseInt(a.split('Y+')[1])],
            b: [parseInt(b.split('X+')[1]), parseInt(b.split('Y+')[1])],
            r: [parseInt(r.split('X=')[1]), parseInt(r.split('Y=')[1])],
        }
    });
    return games;
};

function getTokens([ax, ay], [bx, by], [x, y]) {
    const det = ax * by - ay * bx;
    const det1 = x * by - y * bx;
    const det2 = ax * y - ay * x;

    if (det === 0) {
        return 0;
    }

    const t = det1 / det;
    const s = det2 / det;

    if (t < 0 || s < 0 || t % 1 !== 0 || s % 1 !== 0) {
        return 0;
    }

    return t * 3 + s;
}

const solve1 = (input) => {
    const sum = input.reduce((acc, game) => {
        return acc + getTokens(game.a, game.b, game.r);
    }, 0);
    return sum;
};

const solve2 = (input) => {
    const sum = input.reduce((acc, game) => {
        return acc + getTokens(game.a, game.b, game.r.map(x => x + 10000000000000));
    }, 0);
    return sum;
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(480);

        const result = solve1(processInput(input));
        expect(result).toBe(29023);
    });

    it.skip('Part 2', () => {
        const result = solve2(processInput(input));
        expect(result).toBe(96787395375634);
    });
});