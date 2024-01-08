# Map Service

This service handles all map related functions, CRUD operations, and api requests to get geolocation.

# Setup

## Local install
Clone the latest code

```
git clone git@git.chalmers.se:courses/dit355/2023/student-teams/dit356-2023-04/map-service.git
```

In the repository, create a .env file in the root directory, same directory as .env.dist, and follow the instructions inside .env.dist.

If you want to run it easily with database inside Docker change the MONGODB_URI inside the .env file to be

```
MONGODB_URI=mongodb://host.docker.internal/MapServiceDB
```
If you have mongodb installed and want to run it without docker you can just use this instead.

```
MONGODB_URI=mongodb://127.0.0.1:27017/MapServiceDB
```

# Run it easily with Docker

In root directory, run:

```
docker build -t image_name .

docker run -p computer_port:container_port image_name
```
# Run it without Docker
In root directory, run:

```
npm install

npm run start
```
