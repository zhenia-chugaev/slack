install:
	npm ci

build:
	rm -rf frontend/build
	npm run build -w frontend

start: build
	npx start-server -s frontend/build

dev-server:
	npx start-server

dev-client:
	npm run start -w frontend

check:
	npm run lint -w frontend

fix:
	npm run lint:fix -w frontend
