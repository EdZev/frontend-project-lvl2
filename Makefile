install: install

help:
	gendiff -h

json:
	gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json

publish:
	npm publish --dry-run

lint:
	npx eslint .

jest:
	npx --node-arg --experimental-vm-modules jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8