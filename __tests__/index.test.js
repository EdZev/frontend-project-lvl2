import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const inputFormats = [
  ['json', 'json', 'expectedStylish.txt'],
  ['yml', 'yml', 'expectedStylish.txt'],
  ['yml', 'json', 'expectedStylish.txt'],
  ['json', 'yml', 'expectedStylish.txt'],
];

const outputFormats = [
  ['json', 'stylish', 'expectedStylish.txt'],
  ['json', 'plain', 'expectedPlain.txt'],
  ['json', 'json', 'expectedJson.txt'],
  ['yml', 'stylish', 'expectedStylish.txt'],
  ['yml', 'plain', 'expectedPlain.txt'],
  ['yml', 'json', 'expectedJson.txt'],
];

describe('Test genDiff, each input file format', () => {
  test.each(inputFormats)(
    'Comparison of %p file with %p file',
    (type1, type2, expectedResult) => {
      const expected = readFile(expectedResult);
      const filePath1 = getFixturePath(`file1.${type1}`);
      const filePath2 = getFixturePath(`file2.${type2}`);
      expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expected);
    },
  );
});

describe('Test genDiff, each output format', () => {
  test.each(outputFormats)(
    'Comparison of %p files, %p output format',
    (type, format, expectedResult) => {
      const expected = readFile(expectedResult);
      const filePath1 = getFixturePath(`file1.${type}`);
      const filePath2 = getFixturePath(`file2.${type}`);
      expect(genDiff(filePath1, filePath2, format)).toBe(expected);
    },
  );
});
