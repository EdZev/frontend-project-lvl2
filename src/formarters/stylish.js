import _ from 'lodash';

const buildStr = (rowData, status, isObject) => {
  const [key, value, space, depth, fn] = rowData;
  if (isObject) {
    return `\n${space}  ${status} ${key}: {${fn(value, depth + 1)}\n${space}    }`;
  }
  return `\n${space}  ${status} ${key}: ${value}`;
};
export default (data) => {
  const iter = (arr, depth) => {
    const space = '    '.repeat(depth);
    const format = arr.map((elem) => {
      const { key, status, value } = elem;
      const rowData = [key, value, space, depth, iter];
      switch (status) {
        case 'minus':
          return (_.isObject(value)) ? buildStr(rowData, '-', true) : buildStr(rowData, '-', false);
        case 'plus':
          return (_.isObject(value)) ? buildStr(rowData, '+', true) : buildStr(rowData, '+', false);
        default:
          return (_.isObject(value)) ? buildStr(rowData, ' ', true) : buildStr(rowData, ' ', false);
      }
    });
    return `${format.join('')}`;
  };
  return `{${iter(data, 0)}\n}`;
};
