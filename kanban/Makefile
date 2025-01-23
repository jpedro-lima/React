#colors
MAGENTA                 = \033[0;35m
GREY                    = \033[38;5;8m
RESET                   = \033[0m

all:  build up

build:
	@sudo docker build -t kanban-image ./app

up:
	@sudo docker run --name react-kanban -dp 8000:8000 kanban-image
	@echo "${GREY}Access project on ${MAGENTA}http://localhost:8000${RESET}"

stop:
	@sudo docker stop react-kanban
	@sudo docker rm react-kanban
	@sudo docker rmi -f kanban-image

clean: stop

re: clean all

.PHONY: all build up stop clean re
