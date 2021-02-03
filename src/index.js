import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';

const getData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

export default (filepath1, filepath2) => {
  const currentDir = process.cwd();
  const fullpath1 = path.resolve(currentDir, filepath1);
  const fullpath2 = path.resolve(currentDir, filepath2);
  const data1 = getData(fullpath1);
  const data2 = getData(fullpath2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const jointKeys = _.union(keys1, keys2).sort();
  const result = jointKeys.reduce((acc, key) => {
    const newAcc = acc;
    const dataKey1 = data1[key] ?? null;
    const dataKey2 = data2[key] ?? null;
    if (dataKey1 === dataKey2) return [...newAcc, `    ${key}: ${dataKey1}`];
    if (dataKey1 !== null) {
      newAcc.push(`  - ${key}: ${dataKey1}`);
    }
    if (dataKey2 !== null) {
      newAcc.push(`  + ${key}: ${dataKey2}`);
    }
    return newAcc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
