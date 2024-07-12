# Gestion des Projets de Recherche - CERBO
## Description du Projet
Ce projet vise à développer une plateforme de gestion des projets de recherche pour le Système CERBO (Comité Ethique de Recherche Biomédical Oujda). L'objectif principal est d'automatiser la gestion des projets annuels de recherche des investigateurs de toutes les régions du Maroc. La plateforme permet de soumettre, traiter, évaluer et finaliser les projets de recherche à travers des interfaces utilisateur conviviales et sécurisées

## Dépendances
### Backend

- Java 17 ou version supérieure
  - [Télécharger Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- Spring Boot 2.5.4 ou version supérieure
  - [Documentation Spring Boot](https://spring.io/projects/spring-boot)
- MySQL 8.0 ou version supérieure
  - [Télécharger MySQL](https://dev.mysql.com/downloads/mysql/)
### Frontend

- Node.js 18 ou version supérieure
  - [Télécharger Node.js](https://nodejs.org/en/download/)
- React 18 ou version supérieure
  - [Documentation React](https://reactjs.org/)
- Tailwind CSS 2.1.0 ou version supérieure
  - [Documentation Tailwind CSS](https://tailwindcss.com/docs)

## Instructions d'installation et de lancement
### Lancement avec Docker
1. Cloner le repository:
   ```bash
   git clone https://github.com/Edrissi/cerboApp.git
   cd cerboApp
2. Lancer les conteneurs Docker:
   ```bash
   docker-compose build
   docker-compose up
3. Accéder à l'application:
   - Backend : http://localhost:8000
   - Frontend : http://localhost:5173

## Procédures de Déploiement
### Sans Docker
1. Backend
   - Compilez le projet avec Maven:
     ```bash
     mvn clean package
   - Copiez le fichier JAR généré sur votre serveur:
     ```bash
     scp target/cerbo-backend.jar user@server:/path/to/deploy
   - Lancez l'application sur le serveur:
     ```bash
     java -jar /path/to/deploy/cerbo-backend.jar
2. Frontend
   - Compilez le projet avec npm:
     ```bash
     npm run build
   - Copiez le contenu du dossier build sur votre serveur web (Apache, Nginx, etc.):
     ```bash
     scp -r build/* user@server:/path/to/webroot
   
### Avec Docker
1. Créer des fichiers Dockerfile pour le backend et le frontend:
   - Backend Dockerfile
     ```bash
     # Backend Dockerfile
     FROM openjdk:11-jre-slim
     COPY target/cerbo-backend.jar /app/backend.jar
     ENTRYPOINT ["java", "-jar", "/app/backend.jar"]
     - Backend Dockerfile
    - Frontend Dockerfile
     ```bash
     # Frontend Dockerfile
     FROM node:14 as build
     WORKDIR /app
     COPY package*.json ./
     RUN npm install
     COPY . .
     RUN npm run build

     FROM nginx:alpine
     COPY --from=build /app/build /usr/share/nginx/html
2. Construire les images Docker:
   ```bash
   cd backend
   docker build -t backend .
   cd ../frontend
   docker build -t frontend .
3. Lancer les conteneurs Docker:
   ```bash
   docker run -d -p 8000:8000 cerbo-backend
   docker run -d -p 00:00 cerbo-frontend

   


 
   
