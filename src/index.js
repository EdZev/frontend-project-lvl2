import process from 'process';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';
import format from './formatters/index.js';

const makeDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const jointKeys = _.union(keys1, keys2).sort();

  return jointKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { name: key, status: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { name: key, status: 'removed', value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { name: key, status: 'unknown', children: makeDiff(value1, value2) };
    }
    if (value1 === value2) {
      return { name: key, status: 'unupdated', value: value1 };
    }
    return {
      name: key, status: 'updated', oldValue: value1, newValue: value2,
    };
  });
};

export default (filepath1, filepath2, outputFormat) => {
  const currentDir = process.cwd();

  const fullPath1 = path.resolve(currentDir, filepath1);
  const fullPath2 = path.resolve(currentDir, filepath2);

  const data1 = parsers(fullPath1);
  const data2 = parsers(fullPath2);

  const diff = makeDiff(data1, data2);

  return format(diff, outputFormat);
};
