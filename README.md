# City List Application

## Features
### Login
Three main users -> `admin`, `editor` and `user` with three different roles

- **admin**: **_ROLE_ADMIN_**
  - username: _admin_
  - password: _youshallpass_

- **editor**: **_ROLE_ALLOW_EDIT_**
  - username: _editor_
  - password: _youshallpass_

- **user**: **_ROLE_USER_**
  - username: _user_
  - password: _youshallpass_


- **ROLE_ADMIN** and **ROLE_EDIT** users are allowed to edit and view cities
- **ROLE_USER** users can view cities


### List cities
- Select a city and edit the selected city
- Search cities by the name


## Tech
### Database:
MySQL

### Core API:
Spring Boot Application

### Web:
React Application

## Build and deploy
### Build and run with docker
- execute ```./buildAndDeploy.sh``` to build new changes and start the app
- execute ```./deploy.sh``` to start the app
- execute ```./undeploy.sh``` to stop the app
- The application can be accessed via `localhost:3000` with users username `admin`,`editor` or `user` with password `youshallpass`

### Build and run the application without docker
Need to install **mysql**, **gradle** and **node**
- Step 1: If mysql host and port are not default (localhost:3306) , update mysql host and port in `city-list-core-api/src/main/resources/application.properties`
- Step 2: Within `city-list-core-api` folder, bootrun city-list-core-api with ```gradle bootRun``` command
- Step 3: Execute ```npm i -g serve```
- Step 4: within `city-list-web` folder execute ```npm i && npm run build && serve -s build```
- Step 5: The application can be accessed via `localhost:3000` with users username `admin`,`editor` or `user` with password `youshallpass`
