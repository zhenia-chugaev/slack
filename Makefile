install:
	npm ci --ignore-scripts

build: install
	rm -rf frontend/build
	npm run build -w frontend

start:
	npx start-server -s frontend/build

dev:
	npm run start -w frontend

check:
	npm run lint -w frontend

fix:
	npm run lint:fix -w frontend
