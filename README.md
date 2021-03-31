# Base enviroment for develop an app using Docker containers and Docker Compose.

## Requeriments and how to start the project

You need installed Docker and Docker Compose.
Once Installed, go to the root folder of the project on a terminal and type:
- ```docker-compose build``` (this may take some time the first time)
- ```docker-compose up```

Note: you should tweak the mysql container to allow connections with username and password:
- Conect to the bashrc of the container with ```docker container exec -it mysql /bin/bash```
- Then type ```mysql -u root -p```, the terminal will prompt asking for the password in the ```docker-compose.yml``` file, type it.
- Once inside mysql, type ```ALTER USER 'root'@'localhost' IDENTIFIED BY 'ThePasswordYouWant';``` 
- Then apply the changes with ```flush privileges;```
- Exit the container and done!

you may need to restart the container too with ```docker restart mysql```.

## Why ?
The main goal of this project is to have a base enviroment for further developments. The technologies used in this project are: Nextjs (with typescript) for develop a frontend, node (with typescript) + express + typeORM for developr a backend, mongodb and mysql.

## Where is used Docker & Docker Compose
In the root directory we have a ```docker-compose.yml``` file, wich tells how we want to build the containers on docker.
It provides:
- The links between the containters
- The ports fordwarding between the container and the host 
- The default password of mysql
- The volumes for the two containers we need to mantain persistent (idk you but I like my data on databases being persistent and see the changes of the code on the fly).

```Dockerfiles``` located in the subfolders indicate what to do with the container wich basicly is to install dependencies and start the services of node.

## You can see the changes of the code on the fly, both backend and frontend!

The frontend came almost straightfordward to be in this way, but backed was more tricky, I had to install teh dependencias and generate te ```tscondig.json``` adn ```tslint.json``` files, once did that, add the configuration onf nodemon on the ```package.json``` of the backend.