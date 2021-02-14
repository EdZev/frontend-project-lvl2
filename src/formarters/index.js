import stylish from './stylish.js';

export default (diff, outputFormat) => {
  if (outputFormat === 'stylish') return stylish(diff);
  return 'unknow output format';
};
