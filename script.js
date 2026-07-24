// Asynchronous - doesn't block

console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");


// Exercise 2: Callback Pattern

// Old-style callbacks

function fetchData(callback) {

    setTimeout(() => {

        const data = { name: "John", age: 30 };

        callback(data);

    }, 1000);
}

fetchData(function(data) {

    console.log("Data received:", data);

});

// Create a function that simulates loading user data

function loadUser(userId, callback) {

    setTimeout(() => {

         const user = {

            id: userId,
            
            name: "John",
            
            age: 30,

            Job: "Teacher",
         

         Address: {

            Country: "Kenya",

            City: "Nairobi",

         }

    };
    
    callback(user);

}, 1500);

}

loadUser(101, function(user) {

    console.log("User data recived:", user);

});

// Callback Hell & Introduction to Promises

// Promises to the Rescue

// Creating a Promise 

// User posts

function getUserPosts(postId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (userId > 0) {

                resolve([
                    {
                        id: 1,

                        title: "post 1",
                    },

                    {
                        id: 2,

                        title: "post 2",
                    }

                    ]);

            } else {

                reject("No posts found");

            }

        }, 1000);

    });
}


// Post comments

function getPostComments(userId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (userId > 0) {

                resolve([
                    {
                        id: 1,

                        title: "post 1",
                    },

                    {
                        id: 2,

                        title: "post 2",
                    }

                    ]);

            } else {

                reject("No posts found");

            }

        }, 1000);

    });
}


// Promise Chaining 

// PromisePeromise.all

// simultaneous Data for 3 users 

const promise1 = getUserData(1);

const promise2 = getUserData(2);

const promise3 = getUserData(3);

Promise.all([promise(1), promise(2), promise(3)])

    .then(results => {

        console.log(results);

    })

    .catch(error => {

        console.error("One failed:", error);

    });

// Async/Await 

// Rewrite the callback hell example using async/await/

// Callback from hell example 

async function loadUserData() {

    const User = await getUserData(1);

    console.log("User:", user);

    const  Post = await getUserPost(userId);

    console.log("Posts:", posts);

    const Comment = await  getPostComments(posts [0].id);

    console.log(comments);
   
}

loadUserData();
  
 // Fetch API Basics

 // Fetch and display

 // A single user from JSONPlaceholder

 fetch("https://jsonplaceholder.typicode.com/users/1")

    .then(response => response.json())

    .then(data => {

       console.log(data);

    })

    .catch(error => {

    console.error("Error", error);

   });


// All user 
 
 fetch("https://jsonplaceholder.typicode.com/users")

    .then(response => response.json())

    .then(data => {

        console.log(data);

   })

   .catch(error => {

    console.error("Error", error);

    });


// Post for user 1
 
 fetch("https://jsonplaceholder.typicode.com/users/1/posts")

    .then(response => response.json())

    .then(data => { 

      data.forEach(post => {

        console.log(post);

    });

})

.catch(error => {

    console.error("Error", error);

 });

 // POST Requests

 // Form

const form = document.getElementById("postForm");

const results = document.getElementById("result");


form.addEventListener("submit", function(event){

    event.preventDefault();

});
    
 fetch("https://jsonplaceholder.typicode.com/users/1/posts", {

     method: "POST", 

     headers: {

        "Content-Type": "application/json"
},

body: JSON.stringify({
     
    title: document.getElementById("title").value,

    body: document.getElementById("body").value,

    userId: 1

    })

})

.then(response => response.json())

.then(data => {
    
   console.log(data);

     results.innerHTML = `

        <h3>${data.title}</h3>

        <p>${data.body}</p>
        
        <p>User ID: ${data.userId}</p>
    `;

})

.catch(error => {

    console.error("Error:", error);

});

