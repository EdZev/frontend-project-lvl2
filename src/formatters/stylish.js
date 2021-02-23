import _ from 'lodash';

const isParent = (obj) => _.isObject(obj);

const buildStr = (depth, name, value, parent, status = 'default') => {
  const statusStr = {
    added: '+',
    removed: '-',
    default: ' ',
  };
  const space = ' ';
  const mainIndent = space.repeat(2);
  const indent = space.repeat(4 * depth);

  if (!parent) {
    return `\n${mainIndent}${indent}${statusStr[status]} ${name}: ${value}`;
  }

  if (!_.isObject(value)) {
    return `\n${mainIndent}${indent}${statusStr[status]} ${name}: {${value}\n${mainIndent.repeat(2)}${indent}}`;
  }

  const parsedChildren = Object.keys(value)
    .map((key) => buildStr(depth + 1, key, value[key], isParent(value[key])))
    .join('');
  return buildStr(depth, name, parsedChildren, true, status);
};

export default (data) => {
  const iter = (arr, depth) => {
    const format = arr.flatMap((elem) => {
      const {
        name, status, value, oldValue, newValue, children,
      } = elem;
      switch (status) {
        case 'added':
          return buildStr(depth, name, value, isParent(value), 'added');
        case 'removed':
          return buildStr(depth, name, value, isParent(value), 'removed');
        case 'updated':
          return [
            buildStr(depth, name, oldValue, isParent(oldValue), 'removed'),
            buildStr(depth, name, newValue, isParent(newValue), 'added'),
          ];
        case 'unupdated':
          return buildStr(depth, name, value, isParent(value));
        case 'unknown':
          return buildStr(depth, name, iter(children, depth + 1), isParent(children));
        default:
          throw new Error(`${status} - unknown status for ${name}.`);
      }
    });
    return `${format.join('')}`;
  };
  return `{${iter(data, 0)}\n}`;
};
