Github page doesn't support routing and will throw a 404 error.

Must read about this: https://stackoverflow.com/questions/44733730/react-router-with-dynamic-routes-give-404-on-a-browser-direct-link

In the documentation:
"The json() method of the Body mixin takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as JSON."

So, the code can be like this:
fetch(url).then(res => res.json() // res is still a promise
                .then(res => console.log(res)) //now res is really a json object
                );
                
And another way to get the data:
"When resumed, the value of the await expression is that of the fulfilled Promise."

async function test()
{
let res = await fetch(url); // res is a response object
let res2 = await res.json() // res.json() is a promise, but await take the value of the this fulfilled promise, so now the res2 is the json object we need
}
