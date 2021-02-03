#!/usr/bin/env node
import { Command } from 'commander';
// eslint-disable-next-line import/extensions
import compareFiles from '../src/index.js';

const program = new Command();

const gendiff = program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    // eslint-disable-next-line no-console
    console.log(compareFiles(filepath1, filepath2));
  });

program.parse(process.argv);

export default gendiff;
