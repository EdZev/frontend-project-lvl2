import process from 'process';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';
import format from './formarters/index.js';

const makeDiff = (data) => {
  const [data1, data2] = data;
  const [keys1, keys2] = data.map((obj) => Object.keys(obj));

  const jointKeys = _.union(keys1, keys2).sort();

  return jointKeys.reduce((acc, key) => {
    const newAcc = acc;
    const dataValue1 = data1[key];
    const dataValue2 = data2[key];
    if (_.isObject(dataValue1) && _.isObject(dataValue2)) {
      return [...newAcc, { key: `${key}`, value: makeDiff([dataValue1, dataValue2]) }];
    }
    if (dataValue1 === dataValue2) {
      return [...newAcc, { key: `${key}`, value: dataValue1 }];
    }
    if (_.isObject(dataValue1)) {
      newAcc.push({ key: `${key}`, status: 'minus', value: makeDiff([dataValue1, dataValue1]) });
    }
    if (_.isObject(dataValue2)) {
      newAcc.push({ key: `${key}`, status: 'plus', value: makeDiff([dataValue2, dataValue2]) });
    }
    if (_.has(data1, key) && !_.isObject(dataValue1)) {
      newAcc.push({ key: `${key}`, status: 'minus', value: dataValue1 });
    }
    if (_.has(data2, key) && !_.isObject(dataValue2)) {
      newAcc.push({ key: `${key}`, status: 'plus', value: dataValue2 });
    }
    return newAcc;
  }, []);
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
