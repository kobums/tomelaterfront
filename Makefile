tag=latest

all: run

run:
	npm start

build:
	npm run build

docker: build
	docker buildx build --platform linux/amd64 -t kobums/tomelater_web:$(tag) --load .

push: build
	docker buildx build --platform linux/amd64 -t kobums/tomelater_web:$(tag) --push .

dummy: