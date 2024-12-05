const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const [rules, updates] = input.split('\n\n');
    return [rules.split('\n').map(r => r.split('|')), updates.split('\n').map(line => line.split(','))];
};

const formatRules = (_rules, pages) => {
    let rules = _rules.filter(([a, b]) => pages.includes(a) && pages.includes(b));
    const pagesOrder = [];
    while (pages.length > 0) {
        const cp = [];
        pages.forEach(page => {
            if (rules.every(([a, b]) => {
                return page != b
            })) {
                cp.push(page);
            }
        });
        pages = pages.filter(page => !cp.includes(page));
        pagesOrder.push(cp.length === 1 ? cp[0] : cp);
        rules = rules.filter(([a, b]) => !cp.includes(a) && !cp.includes(b));
    }
    return pagesOrder;
};

const solve1 = ([rules, updates]) => {
    let sum = 0;
    updates.map(update => {
        const ruleMap = formatRules(rules, update);
        if (ruleMap.join(',') === update.join(',')) {
            sum += Number(update[(update.length - 1) / 2]);
        }
    })
    return sum;
};

const solve2 = ([rules, updates]) => {
    let sum = 0;
    updates.map(update => {
        const ruleMap = formatRules(rules, update);
        if (ruleMap.join(',') !== update.join(',')) {
            sum += Number(ruleMap[(ruleMap.length - 1) / 2]);
        }
    })
    return sum;
};

describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(143);

        const result = solve1(processInput(input));
        expect(result).toBe(5268);
    });

    it.skip('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(123);

        const result = solve2(processInput(input));
        expect(result).toBe(5799);
    });
});