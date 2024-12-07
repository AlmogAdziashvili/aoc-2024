const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const lines = input.split('\n').map(a => a.split(''));
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === '^') {
                return [lines, [i, j]];
            }
        }
    }
    return lines;
};

function nextDirection(currentDirection) {
    if (currentDirection[0] === 0 && currentDirection[1] === 1) {
        return [1, 0];
    }
    if (currentDirection[0] === 0 && currentDirection[1] === -1) {
        return [-1, 0];
    }
    if (currentDirection[0] === 1 && currentDirection[1] === 0) {
        return [0, -1];
    }
    if (currentDirection[0] === -1 && currentDirection[1] === 0) {
        return [0, 1];
    }
}

const solve1 = ([map, [x, y]]) => {
    const s = new Set();
    let currentPosition = [x, y];
    s.add(currentPosition.join(','));
    let currentDirection = [-1, 0];
    while (currentPosition[0] >= 0 && currentPosition[0] < map.length && currentPosition[1] >= 0 && currentPosition[1] < map[0].length) { 
        let newPosition = [currentPosition[0] + currentDirection[0], currentPosition[1] + currentDirection[1]];
        while (map[newPosition[0]] && map[newPosition[0]][newPosition[1]] === '#') {
            currentDirection = nextDirection(currentDirection);
            newPosition = [currentPosition[0] + currentDirection[0], currentPosition[1] + currentDirection[1]];
        }
        currentPosition = newPosition;
        s.add(currentPosition.join(','));
    }
    return s.size - 1;
};

function blockCreateLoop(map, s, currentPosition, currentDirection) {
    const _nextDirection = nextDirection(currentDirection);
    const nextPosition = [currentPosition[0] + _nextDirection[0], currentPosition[1] + _nextDirection[1]];
    let steps = 0;
    while (map[nextPosition[0]] && map[nextPosition[0]][nextPosition[1]] !== '#' && steps < 500) {
        if (s.has(nextPosition.join(',').concat(_nextDirection.join(',')))) {
            return true;
        }
        nextPosition[0] += _nextDirection[0];
        nextPosition[1] += _nextDirection[1];
        steps++;
    }
    return false;
}

const solve2 = ([map, [x, y]]) => {
    let count = 0;
    const s = new Set();
    let currentPosition = [x, y];
    s.add(currentPosition.join(','));
    let currentDirection = [-1, 0];
    while (currentPosition[0] >= 0 && currentPosition[0] < map.length && currentPosition[1] >= 0 && currentPosition[1] < map[0].length) { 
        let newPosition = [currentPosition[0] + currentDirection[0], currentPosition[1] + currentDirection[1]];
        while (map[newPosition[0]] && map[newPosition[0]][newPosition[1]] === '#') {
            currentDirection = nextDirection(currentDirection);
            newPosition = [currentPosition[0] + currentDirection[0], currentPosition[1] + currentDirection[1]];
        }
        if (blockCreateLoop(map, s, currentPosition, currentDirection)) {
            console.log('Loop detected', currentPosition, currentDirection);
            count++;
        }
        currentPosition = newPosition;
        s.add(currentPosition.join(',').concat(currentDirection.join(',')));
    }
    return count;
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(41);

        const result = solve1(processInput(input));
        expect(result).toBe(4665);
    });

    it.skip('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(6);

        const result = solve2(processInput(input));
        expect(result).toBe(28786472);
    });
});