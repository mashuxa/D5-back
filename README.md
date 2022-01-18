#DOCKER


## How to run:

### build docker image:
*docker build . --tag pickby*

### run docker image on :4000 port:
*docker run -p 4000:4000 pickby*


## Useful:

### open container and check anything:
*docker run -it pickby /bin/bash*

### show list of images (with image's id):
*docker ps*

### stop image by id:
*docker stop <id>*
