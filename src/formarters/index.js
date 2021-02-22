import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      return 'Unknow output format';
  }
};
