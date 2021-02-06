import process from 'process';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';

export default (filepath1, filepath2) => {
  const currentDir = process.cwd();
  const datas = [filepath1, filepath2].map((filepath) => {
    const fullPath = path.resolve(currentDir, filepath);
    const data = parsers(fullPath);
    return data;
  });

  const parseError = datas.find((elem) => typeof elem === 'string');
  if (parseError) return parseError;

  const [data1, data2] = datas;
  const [keys1, keys2] = datas.map((data) => Object.keys(data));

  const jointKeys = _.union(keys1, keys2).sort();

  const comparisonResult = jointKeys.reduce((acc, key) => {
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

  return `{\n${comparisonResult.join('\n')}\n}`;
};
