# Base enviroment for develop an app using Docker containers and Docker Compose.

## Requeriments and how to start the project

You need installed Docker and Docker Compose.
Once Installed, go to the root folder of the project on a terminal and type:
- ```docker-compose build``` (this may take some time the first time)
- ```docker-compose -f docker-compose.yml -f docker-compose.development.yml up``` This command allow to rise the, and you will see every change or log on the terminal
- ```docker-compose -f docker-compose.yml -f docker-compose.development.yml up -d``` This command allow to rise the containers and be deatached on the terminal (no logs)
- ```docker-compose -f docker-compose.yml -f docker-compose.development.yml -f docker-compose.debug.yml up``` Similar to the first one, but allowing to debug the node process on the vscode.

Note: Due to the extra steps needed to be done to config mysql, I decided to migrate to postgreSql. Just connect through any client at ```localhost:<PORT>``` (default is 5432) and use the user and password on the docker-file of the desired enviroment.

## Why ?
The main goal of this project is to have a base enviroment for further developments. The technologies used in this project are: Nextjs (with typescript) for develop a frontend, node (with typescript) + express + prisma for developr a backend, mongodb and postgreSQL.

### Why Prisma ?
Well, Type-ORM in the end was very verbose, and like sequelize was a bit of a challenge on a big projects mantain all the data. Also, I do not like the versatility of be able to create all the models with a single command, reading from an already existing database and still be able if i want to create the database schema from a file and give it to prisma for it to generate all the models and the database. It also detect the kind of relation between tables if they are included as a constraint on an existing database.
## Where is used Docker Compose
In the root directory we have a ```docker-compose.yml``` file, wich tells how we want to build the containers on docker.
It provides:
- The links between the containters
- The ports fordwarding between the container and the host
- The default user and password of postgreSQL
- The volumes for the two containers we need to mantain persistent (idk you but I like my data on databases being persistent and see the changes of the code on the fly).

## You can see the changes of the code on the fly, both backend and frontend!

The frontend came almost straightfordward to be in this way, but backed was more tricky! I had to install the dependencies and generate te ```tscondig.json``` and ```eslint.js``` files, once did that, add the configuration onf nodemon on the ```package.json``` in the backend.