#!/usr/bin/env node
import { Command } from 'commander';
import compareFiles from '../src/index.js';

const program = new Command();
const gendiff = program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'choose output format: stylish | plain | json', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(compareFiles(filepath1, filepath2, program.opts().format));
  });

program.parse(process.argv);

export default gendiff;
