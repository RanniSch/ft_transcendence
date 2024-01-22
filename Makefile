.DEFAULT_GOAL:= all

all:
		docker compose -f ./docker-compose.yml up --build -d

log:
		@docker compose -f ./docker-compose.yml logs | less

down:
		docker compose down

up:
		docker compose up -d

backend_exe:
		docker exec -it backend bash

postgres_exe:
		docker exec -it postgres_db bash

backend_re:
		docker compose -f ./docker-compose.yml stop backend
		docker rmi -f ft_transcendence_be
		docker compose -f ./docker-compose.yml up --build -d backend

postgres_re:
		docker compose -f ./docker-compose.yml stop postgres
		docker rmi -f postgres:16
		docker compose -f ./docker-compose.yml up --build -d postgres

fclean:
		docker system prune -af

help:
		@echo "Usage: make [target]"
		@echo ""
		@echo "Targets:"
		@echo "  all            - build and run containers"
		@echo "  log            - show logs"
		@echo "  down           - stop and remove containers"
		@echo "  up             - run containers"
		@echo "  backend_exe    - enter backend container"
		@echo "  postgres_exe   - enter postgres container"
		@echo "  backend_re     - rebuild backend container"
		@echo "  postgres_re    - rebuild postgres container"
		@echo "  fclean         - remove all unused containers, networks, images (both dangling and unreferenced), and optionally, volumes."
		@echo "  help         	- show this help message and exit"