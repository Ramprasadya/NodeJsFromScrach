Node js 

here how can you get the value from the url ;

http://localhost:8080/about?name=Ram&age=24

app.get('/about', (req, res) => {
  res.send('Hello ' + req.query.name + " your age is " + req.query.age)
})

req.quary.name , 
req.quary.age 

Another Way to get value from the url 

http://localhost:8080/contact/ram

app.get('/contact/:name', (req, res) => {
  res.send('Hello' + " " + req.params.name)
})


<!-- Versioning  -->
4.18.2

Last digit mean > Minor fixes in that packege
second Last digit mean > Security updates or added a new feature or fix any criticle bug 
First digit mean > Major Update 

^ -> This is carrrot symbol that is denote that the compatible version according to your projects