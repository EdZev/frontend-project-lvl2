install: install

run:
	bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .