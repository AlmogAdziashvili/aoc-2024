const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = input.split('\n').map(line => line.split(''));
    return lines;
};

const solve1 = (input) => {
    const locations = {};
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] !== '.') {
                if (!locations[input[i][j]]) {
                    locations[input[i][j]] = [];
                }
                locations[input[i][j]].push([i, j]);
            }
        }
    }
    const antinodes = new Set();
    const boundY = input.length;
    const boundX = input[0].length;
    for (const key in locations) {
        for (let i = 0; i < locations[key].length; i++) {
            for (let j = i; j < locations[key].length; j++) {
                if (i === j) {
                    continue;
                }
                const [y1, x1] = locations[key][i];
                const [y2, x2] = locations[key][j];
                const yd = y2 - y1;
                const xd = x2 - x1;

                const anti1 = [y1 - yd, x1 - xd];
                const anti2 = [y2 + yd, x2 + xd];

                if (anti1[0] >= 0 && anti1[0] < boundY && anti1[1] >= 0 && anti1[1] < boundX) {
                    antinodes.add(anti1.join(','));
                }
                if (anti2[0] >= 0 && anti2[0] < boundY && anti2[1] >= 0 && anti2[1] < boundX) {
                    antinodes.add(anti2.join(','));
                }
            }
        }
    }
    console.log(antinodes);
    return antinodes.size;
};

const solve2 = (input) => {
    const locations = {};
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] !== '.') {
                if (!locations[input[i][j]]) {
                    locations[input[i][j]] = [];
                }
                locations[input[i][j]].push([i, j]);
            }
        }
    }
    const antinodes = new Set();
    const boundY = input.length;
    const boundX = input[0].length;
    for (const key in locations) {
        for (let i = 0; i < locations[key].length; i++) {
            for (let j = i; j < locations[key].length; j++) {
                if (i === j) {
                    continue;
                }
                const [y1, x1] = locations[key][i];
                const [y2, x2] = locations[key][j];
                const yd = y2 - y1;
                const xd = x2 - x1;

                let anti1 = [y1, x1];
                let anti2 = [y2, x2];

                while (anti1[0] >= 0 && anti1[0] < boundY && anti1[1] >= 0 && anti1[1] < boundX) {
                    antinodes.add(anti1.join(','));
                    anti1 = [anti1[0] - yd, anti1[1] - xd];
                }
                while (anti2[0] >= 0 && anti2[0] < boundY && anti2[1] >= 0 && anti2[1] < boundX) {
                    antinodes.add(anti2.join(','));
                    anti2 = [anti2[0] + yd, anti2[1] + xd];
                }
            }
        }
    }
    console.log(antinodes);
    return antinodes.size;

};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(14);

        const result = solve1(processInput(input));
        expect(result).toBe(285);
    });

    it.skip('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(34);

        const result = solve2(processInput(input));
        expect(result).toBe(944);
    });
});