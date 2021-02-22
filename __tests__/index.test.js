import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('compare JSON files', () => {
  const expected = readFile('expectedStylish.txt');
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expected);
});

test('compare YAML files', () => {
  const expected = readFile('expectedStylish.txt');
  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.yml');
  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expected);
});

test('compare YAML file with JSON file', () => {
  const expected = readFile('expectedStylish.txt');
  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.json');
  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expected);
});

test('compare files, output format plain', () => {
  const expected = readFile('expectedPlain.txt');
  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.json');
  expect(genDiff(filePath1, filePath2, 'plain')).toBe(expected);
});
