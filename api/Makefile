DOCKER_COMPOSE = docker-compose \
	--file docker-compose.yml

ifdef env
COMMA := ,
EMPTY :=
SPACE := $(EMPTY) $(EMPTY)
DOCKER_COMPOSE := $(DOCKER_COMPOSE)$(foreach DOCKER_ENV,$(subst $(COMMA),$(SPACE),$(env)), --file docker-compose.$(DOCKER_ENV).yml)
endif

DOCKER_COMPOSE := $(DOCKER_COMPOSE) \
	--file docker-compose.local.yml

build:
	${DOCKER_COMPOSE} build

detach:
	${DOCKER_COMPOSE} up --detach

down:
	${DOCKER_COMPOSE} down

prod:
	${DOCKER_COMPOSE} pull
	${DOCKER_COMPOSE} up --detach --no-build

push:
	${DOCKER_COMPOSE} push

up:
	${DOCKER_COMPOSE} up
