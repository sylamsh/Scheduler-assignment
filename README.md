# Scheduler-assignment

server : https://sylamsh-scheduler.herokuapp.com

### Problem Statement
- Build a scheduler in JS with the NodeJS framework and a script to run it for 10 events.
- The event will consist of a text (string) and a date time at which it will run.
- The scheduler must schedule the event to trigger a function at the date time mentioned in the event body.
- The trigger function (API) must accept the text as input, sleep for duration of text length and return text backwards.

### Frameworks/Libraries
[Express.js](https://expressjs.com/)  
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 
Creating a robust API is quick and easy.

[node-fetch](https://www.npmjs.com/package/node-fetch)  
Provides an interface for fetching resources (including across the network).

### Approach
The [Scheduler](https://github.com/Sylamsh/Scheduler-assignment/blob/main/scheduler/server.js) is an api function that is called by the [loop-script](https://github.com/Sylamsh/Scheduler-assignment/blob/main/client.js).

| Route  | Request  | Description |
| :----- |:-------- | :---------- |
| `/` | GET | To check if the server is running |
| `/scheduler` | POST | Schedules an event to trigger 'triggerFunction' |
| `/triggerFunction` | POST | Sleeps for the length of the text and responses with the reversed text |

### Problems faced
1. Heroku-hosted server sleeps after some time of inactivity. 
Hence, for the first couple of requests, the scheduled time is passed by the time, the request is received by the server.  
_Not Solved_ : A get request was sent before the scheduler requests, to wake the server from sleep.

2. Heroku-hosted server sends back status:503 "request timed out", if there is no response after 30s since the request was sent.  
_Solved_ : Test cases were limited within the range of the 30s 

### To run
At the root folder

```
npm install  
npm start
```
