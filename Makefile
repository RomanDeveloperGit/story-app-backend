build-image:
	docker build -t story-app-backend-image .

run-container:
	docker run -d -e DATABASE_URL=postgresql://user:pass@ip:5432/story-app-db?schema=public -p 8000:8000 --rm --name story-app-backend-container story-app-backend-image

remove-image:
	docker rmi story-app-backend-image

remove-container:
	docker rm -f story-app-backend-container


create:
	make build-image
	make run-container

delete:
	make remove-container
	make remove-image

reload:
	make delete
	make create

# TODO: Для прода добавить Makefile-инструкцию
