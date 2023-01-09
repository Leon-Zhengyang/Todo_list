# Todo list app(Single Page Application)
`#Docker`、`#Postgres`、`#Django`、`#Python`、`#Pytest`、`#Javascript`、`#HTML`、`#CSS`<br>
### overview:
Todolist app whih basic CRUD funcions by using Django framework

## Create app steps in docker containers

### step1
Add **Dockerfile**、**docker-compose.yml**、**requirements.txt** files<br>
**directory and content** referlink: (https://inglow.jp/techblog/docker-django/)

### step2
Run `docker-compose up --build -d` to build containers<br>
Run `docker-compose run --rm web python manage.py makemigrations`<br>
Run `docker-compose run --rm web python manage.py migrate`<br>


# tests
tox:
    docker-compose run --rm web tox

# run pytest
docker-compose run web pytest .