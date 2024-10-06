* [X] **Clone project**

> git clone https://github.com/dungdungptit/MERN_dorm_management.git

* [X] **Yêu cầu cài đặt project**

**MongoDB**

- Mongo Compass version 1.44.4
- Mongo shell version 2.3.1

**Node** version 20.17.0

* [X] **Initial data (2 cách)**

**Cách 1:** Mở terminal

> mongosh
>
> use dorm_management

> open file **/MERN_dorm_management/backend/data/data.js**
>
> **copy** **nội dung file data.js và paste vào mongo shell**

**Cách 2:** Sử dụng Mongo Compass

> Mở Open Mongo Shell, **copy** **nội dung file data.js và paste vào mongo shell**

* [X] **Run** **Frontend**

Cài đặt node phiên bản 20.17.0 (node version 20.17.0)

> cd MERN_dorm_management
>
> cd frontend
>
> npm install

Sau khi cài đặt xong node_modules

> npm start

* [X] **Run** **Backend**

Cài đặt node phiên bản 20.17.0 (node version 20.17.0)

> cd MERN_dorm_management
>
> cd backend
>
> npm install

Sau khi cài đặt xong node_modules

> npx nodemon ./server.js

* [X] **Sử dụng hệ thống** 

> Truy cập giao diện frontend: **http://localhost:3000**
> backend: http://localhost:5000
