import process from 'process';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';
import format from './formatters/index.js';

const makeDiff = (data) => {
  const [data1, data2] = data;
  const [keys1, keys2] = data.map((obj) => Object.keys(obj));

  const jointKeys = _.union(keys1, keys2).sort();

  return jointKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const isObject1 = _.isObject(value1);
    const isObject2 = _.isObject(value2);
    if (!_.has(data1, key)) {
      return { name: key, status: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { name: key, status: 'removed', value: value1 };
    }
    if (isObject1 && isObject2) {
      return { name: key, status: 'not defined', value: makeDiff([value1, value2]) };
    }
    if (value1 === value2) {
      return { name: key, status: 'not updated', value: value1 };
    }
    return {
      name: key, status: 'updated', oldValue: value1, newValue: value2,
    };
  });
};

export default (filepath1, filepath2, outputFormat) => {
  const currentDir = process.cwd();
  const dataset = [filepath1, filepath2].map((filepath) => {
    const fullPath = path.resolve(currentDir, filepath);
    const data = parsers(fullPath);
    return data;
  });
  const parseError = dataset.find((elem) => typeof elem === 'string');
  if (parseError) return parseError;

  const diff = makeDiff(dataset);

  return format(diff, outputFormat);
};
