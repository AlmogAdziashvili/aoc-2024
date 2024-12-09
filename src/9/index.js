const { expect, it, describe } = require('@jest/globals');
const fs = require('fs');
const _ = require('lodash');

const exampleInput = fs.readFileSync(__dirname + '/example.txt', 'utf8');
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const processInput = (input) => {
    const nums = input.split('').map(Number);
    const files = nums.filter((_, i) => i % 2 === 0);
    const spaces = nums.filter((_, i) => i % 2 === 1);
    return [files, spaces, nums];
};

const solve1 = ([files, spaces, nums]) => {
    let sum = 0;
    const length = _.sum(files);
    let current = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums[i]; j++) {
            if (i % 2 === 0) {
                sum += current * (i / 2);
            } else {
                sum += current * (files.length - 1);
                files[files.length - 1] -= 1;
                if (files[files.length - 1] === 0) {
                    files.pop();
                }
            }
            current++;
            if (current === length) {
                return sum;
            }
        }
    }
    return sum;
};

const solve2 = ([_, spaces, data]) => {
    const diskBlocks = parseDiskBlocks(data);
    const files = [];
    const freeSpans = [];

    diskBlocks.forEach((block, i) => {
        if (block !== ".") {
            files[block] ??= { id: block, size: 0, positions: [] };
            files[block].positions.push(i);
            files[block].size++;
        } else if (!freeSpans.length || freeSpans.at(-1).end + 1 !== i) {
            freeSpans.push({ start: i, end: i, size: 1 });
        } else {
            freeSpans.at(-1).end++;
            freeSpans.at(-1).size++;
        }
    });

    files.reverse().forEach((file) => {
        if (!file) return;

        const { size, positions } = file;
        const fileStartPos = positions[0];
        const targetSpan = freeSpans.find((span) => span.size >= size && span.end < fileStartPos);

        if (targetSpan) {
            positions.forEach((pos) => (diskBlocks[pos] = "."))
            for (let i = 0; i < size; i++) {
                diskBlocks[targetSpan.start + i] = file.id;
            }

            if (targetSpan.size === size) {
                freeSpans.splice(freeSpans.indexOf(targetSpan), 1);
            } else {
                targetSpan.start += size;
                targetSpan.size -= size;
            }

            freeSpans.push({
                start: fileStartPos,
                end: fileStartPos + size - 1,
                size
            });
        }
    })

    return computeChecksum(diskBlocks);
};

const parseDiskBlocks = (data) => {
    const diskBlocks = [];
    let fileId = 0;
    let isFile = true;

    for (const length of data) {
        const len = +length;
        diskBlocks.push(...Array(len).fill(isFile ? fileId : "."));
        if (isFile) fileId++;
        isFile = !isFile;
    }

    return diskBlocks;
}
const computeChecksum = (diskBlocks) => {
    return diskBlocks
        .reduce((checksum, block, index) => checksum + (block !== "." ? index * block : 0), 0);
}


describe('Day 1', () => {
    it.skip('Part 1', () => {
        const exampleResult = solve1(processInput(exampleInput));
        expect(exampleResult).toBe(1928);

        const result = solve1(processInput(input));
        expect(result).toBe(6432869891895);
    });

    it.skip('Part 2', () => {
        const exampleResult = solve2(processInput(exampleInput));
        expect(exampleResult).toBe(2858);

        const result = solve2(processInput(input));
        expect(result).toBe(6467290479134);
    });
});