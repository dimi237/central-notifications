# central-notifications
Web queue worker example with a central notifications


## Authors

- [@dimi237](https://www.github.com/dimi237)


## Installation

First you need Node js, Docker

After that  go to the project directory and run

```bash
 cd api && npm install
```


go back to the project directory and run

```bash
 cd worker && npm install
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/dimi237/central-notifications.git
```

Go to the project directory

Start RabbitMq on Docker

```bash
  docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```


Start the api server

```bash
 cd api && npm run start
```



Start the worker server

```bash
 cd worker && npm run start
```

create a new user 


```bash
 cd api && npm run user
```



## API Reference

#### Login

```http
  GET /api/v0/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. 
| `password` | `string` | **Required**. |

#### send email

```http
  POST /api/v0/notify/email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required**. email
| `message`      | `string` | **Required**. email's body  |
| `email`      | `string` | **Required**. receiver email
| `object`      | `string` | **Required**.
| `cc`      | `string` | 




#### send sms

```http
  POST /api/v0/notify/sms
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required**. sms
| `message`      | `string` | **Required**. sms body  |
| `tel`      | `string` | **Required**. receiver's phone number
