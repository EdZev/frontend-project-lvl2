import _ from 'lodash';

export default (diff) => {
  const iter = (data, path) => data.flatMap((elem) => {
    const {
      name, status, value, oldValue, newValue, children,
    } = elem;

    const prepareValue = (currentValue) => {
      if (_.isObject(currentValue)) return '[complex value]';
      if (_.isString(currentValue)) return `'${currentValue}'`;
      return currentValue;
    };

    const preparePathStr = (currentName) => (path.length > 0 ? `'${path.join('.')}.${currentName}'` : `'${currentName}'`);

    switch (status) {
      case 'added':
        return `Property ${preparePathStr(name)} was added with value: ${prepareValue(value)}\n`;
      case 'removed':
        return `Property ${preparePathStr(name)} was removed\n`;
      case 'updated':
        return `Property ${preparePathStr(name)} was updated. From ${prepareValue(oldValue)} to ${prepareValue(newValue)}\n`;
      case 'unknown':
        return iter(children, [...path, name]);
      case 'unupdated':
        return null;
      default:
        throw new Error(`${status} - unknown status for ${name}.`);
    }
  }).filter((elem) => elem !== null);
  return iter(diff, []).join('');
};
