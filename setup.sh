mkdir SQL

cp .env.exemple .env
nano .env
sudo chmod 777 .env
cp .env ./node/.env

cd ./node
sudo docker build -t node_plus .
cd ../