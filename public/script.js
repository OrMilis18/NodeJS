function get() {
    
    let req = new XMLHttpRequest();

    req.open('GET', 'http://localhost:3000/all');

    req.onreadystatechange = () => {
        if(req.readyState === 4){
            let arr = JSON.parse(req.response);
            let result = '';
            for (const joke of arr) {
                result += `<strong>שם: ${joke.name} <br> גיל:${joke.age}</strong><br><br>
                <p class="border border-primary" style="padding: 5%">${joke.joke}</p>
                <p>${joke.date}</p>
                    <button onclick="put('${joke.name}')" class="btn btn-warning">Edit</button>
                    <button onclick="deleteJoke('${joke.name}')" class="btn btn-danger">Delete</button> 
                     <br><br><br>
                `
            }

            document.getElementById('jokes').innerHTML = result;
        } 
    }
    req.send();
}

function post(){
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let joke = document.getElementById('joke').value;
    let date = document.getElementById('date').value;

    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/add');

    req.onreadystatechange = () =>{
        if(req.readyState === 4) get();
    }

    req.setRequestHeader('Content-type', 'application/json');

    req.send(JSON.stringify({"name":name, "age":age, "joke":joke, "date":date }));
}

function put(name){
    // input from user:
    let newJoke = prompt('Enter the new joke');

    // call the post method in `/add` path:
    let req = new XMLHttpRequest();
    req.open('PUT', `http://localhost:3000/update/${name}`);

    req.onreadystatechange = () => {
        if(req.readyState === 4) get();
    }

    // define header of request
    req.setRequestHeader('Content-type', 'application/json');
    // send the values from user with request:
    // in req.send() - we can add the body
    req.send(JSON.stringify({"joke":newJoke}));
}


function deleteJoke(name){
    let req = new XMLHttpRequest();
    req.open('DELETE', `http://localhost:3000/delete/${name}`);
    req.onreadystatechange = () =>{
        if(req.readyState === 4) get();
    }
    req.send();
}