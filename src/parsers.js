import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filePath) => {
  try {
    const format = path.extname(filePath).slice(1);
    const data = fs.readFileSync(filePath, 'utf-8');
    switch (format) {
      case 'json':
        return JSON.parse(data);
      case 'yml':
        return yaml.load(data);
      default:
        return `Unknown format of file: ${filePath}`;
    }
  } catch (error) {
    return `No such file or directory: ${filePath}`;
  }
};
