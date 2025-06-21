This is my implementation of api assignment

to run the backend just clone the repo and 
- cd be  
- node index.js

for database please run: 
- docker run -d -p 27107:27107 mongo

i have implemented 4 endpoints:
- http://localhost:3000/ is a get endpoint for accesses my data in db
- http://localhost:3000/add is a post endpoint to add blog in the db
  - {
    "title": "hello", 
    "blog": "this is the blog add endpoint of my app"
}
- http://localhost:3000/update/[item id] is an patch endpoint:
  - {"title": "new title" }
- http://localhost:3000/delete/[item id] is a delete endpoint which will delete my endpoint