install: 
	npm install

help:
	gendiff -h

start:
	gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json

stylish:
	gendiff -f stylish ./__fixtures__/file1.json ./__fixtures__/file2.json

plain:
	gendiff -f plain ./__fixtures__/file1.yml ./__fixtures__/file2.json

json:
	gendiff -f json ./__fixtures__/file1.json ./__fixtures__/file2.json

publish:
	npm publish --dry-run

lint:
	npx eslint .

jest:
	npx --node-arg --experimental-vm-modules jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8
