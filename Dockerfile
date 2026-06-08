# ---------- étape 1 : build du bundle statique ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- étape 2 : service via Apache httpd ----------
FROM httpd:2.4-alpine
# Écoute sur 4242, et active les modules compression / en-têtes
RUN sed -i 's@^Listen 80@Listen 4242@' /usr/local/apache2/conf/httpd.conf \
 && sed -i -E 's@^#(LoadModule (deflate|filter|headers)_module)@\1@' /usr/local/apache2/conf/httpd.conf \
 && echo 'Include conf/extra/maths.conf' >> /usr/local/apache2/conf/httpd.conf
COPY httpd-maths.conf /usr/local/apache2/conf/extra/maths.conf
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/
EXPOSE 4242
