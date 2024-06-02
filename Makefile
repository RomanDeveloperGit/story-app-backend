build-image:
	docker build -t story-app-backend-image .

run-container:
	docker run -d -e DATABASE_URL=postgresql://login:password@ip:port/story-app-db?schema=public -p 8000:8000 --rm --name story-app-backend-container story-app-backend-image

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


db-run-container:
	docker run --name story-app-db-container -e POSTGRES_USER=login -e POSTGRES_PASSWORD=password -e POSTGRES_DB=story-app-db -p 5432:5432 -d -v pgdata:/var/lib/postgresql/data postgres 
db-remove-container:
	docker rm -f story-app-db-container
