## Angular

ng new todomvc

yarn add todomvc-app-css

ng g class models/todo

ng g service services/todo


## Backend Django DRF API

python3 -mvenv env

source env/bin/activate

pip install django djangorestframework django-cors-headers

django-admin startproject backend

cd backend

./manage.py startapp todos
