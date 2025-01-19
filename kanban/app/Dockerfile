FROM node:slim

EXPOSE 8000

WORKDIR /app/kanban

COPY ./kanban ./

RUN npm install

ENTRYPOINT ["npm", "run", "dev", "--", "--port=8000", "--host=0.0.0.0"]