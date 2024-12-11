const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = input.split(' ').map(Number);
    const map = {};
    lines.forEach((line, index) => {
        if (!map[line]) {
            map[line] = 0;
        }
        map[line]++;
    });
    return map;
};

const solve1 = (input) => {
    let map = input;
    for (let i = 0; i < 25; i++){
        const newMap = {};
        Object.keys(map).forEach(a => {
            let newV = [];
            if (a === '0') {
                newV = [1];
            }
            else if (a.toString().length % 2 == 0) {
                newV = [a.toString().slice(0, a.toString().length / 2), a.toString().slice(a.toString().length / 2)].map(Number);
            } else {
                newV = [a * 2024];
            }
            newV.forEach(v => {
                if (!newMap[v]) {
                    newMap[v] = 0;
                }
                newMap[v] += map[a];
            });
        });
        map = newMap;
    }
    return Object.values(map).reduce((a, b) => a + b, 0);
};

const solve2 = (input) => {
    let map = input;
    for (let i = 0; i < 75; i++){
        const newMap = {};
        Object.keys(map).forEach(a => {
            let newV = [];
            if (a === '0') {
                newV = [1];
            }
            else if (a.toString().length % 2 == 0) {
                newV = [a.toString().slice(0, a.toString().length / 2), a.toString().slice(a.toString().length / 2)].map(Number);
            } else {
                newV = [a * 2024];
            }
            newV.forEach(v => {
                if (!newMap[v]) {
                    newMap[v] = 0;
                }
                newMap[v] += map[a];
            });
        });
        map = newMap;
    }
    return Object.values(map).reduce((a, b) => a + b, 0);
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(55312);

        const result = solve1(processInput(input));
        expect(result).toBe(213625);
    });

    it.skip('Part 2', () => {
        const result = solve2(processInput(input));
        expect(result).toBe(252442982856820);
    });
});