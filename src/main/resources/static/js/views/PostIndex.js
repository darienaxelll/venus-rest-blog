import CreateView from "../createView.js";
import {getHeaders} from "../auth.js";

let posts;

export default function PostIndex(props) {

    const postsHTML = generatePostHTML(props.posts);

    posts = props.posts;

    return `
        <header>
            <style>
        body {
            background-color:black;
        }
        
        #table-div {
            margin: 20px 20px 0 20px;
            border: 1px solid white;
            border-radius: 5px;
        }
        
        table {
            border-radius: 5px;
        }
        
        #form-div {
        background-color: white;
            width: 50%;
            padding: 15px;
            border: 2px solid grey;
            border-radius: 5px;
            display: block;
            position: relative;
            left: 25%;
            top: 25%;
        }
        
        #deleteBtn {
            margin-left: 25px;
        }
        </style>
        </header>
        <body>
            <div id="table-div">
                ${postsHTML}
            </div>
            <hr>
            <div id="form-div">
            <div class="mb-3">
              <label for="title" class="form-label"><h3>Post Title</h3></label>
              <input type="email" class="form-control" id="title" placeholder="Enter Title">
            </div>
            <div class="mb-3">
              <label for="content" class="form-label"><h3>Content Area</h3></label>
              <textarea class="form-control" id="content" rows="2" placeholder="Enter Text..."></textarea>
            </div>
            <button data-id="0" id="saveButton" type="button" class="btn btn-outline-primary">Save Post</button>
            </div>
        </body>
    `;
}

function generatePostHTML(posts) {
    let postsHTML = `
    <table class="table table-dark table-striped">
        <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Content</th>
          <th scope="col">Author</th>
          <th scope="col">Category</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
      `;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        let categories = '';
        if(post.categories) {
            for (let j = 0; j < post.categories.length; j++) {
                if (categories !== "") {
                    categories += ", ";
                }
                categories += post.categories[j].name;
            }
        }


        let authorName = "";
        if (post.author) {
            authorName = post.author.username;
        }

        postsHTML += `
            <tr>
            <td>${post.title}</td>
            <td>${post.content}</td>
            <td>${authorName}</td>
            <td>${categories}</td>
            <td><button id="editBtn" data-id=${post.id} type="button" class="btn btn-secondary editPost">Edit</button> <button id="deleteBtn" data-id=${post.id} class="btn btn-danger deletePost">Delete</button></td>
            </tr>
        `
    }
    postsHTML += `</tbody></table>`;
    return postsHTML;
}

export function postSetup() {
    setupSaveHandler();
    setupEditHandlers();
    setupDeletePostHandler();
}

function setupEditHandlers() {
    // target all edit buttons
    const editButtons = document.querySelectorAll(".editPost");
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function (e) {

            //get the post id of the edit button
            const postId = parseInt(this.getAttribute("data-id"));

            loadPostIntoForm(postId);
        });
    }
}

function loadPostIntoForm(postId) {
    // go find the post in the posts' data that matched the id
    const post = fetchPostById(postId);
    if (!post) {
        console.log("Did not find the post for id" + postId);
    }

    //load the post data into the form
    const titleField = document.querySelector("#title");
    const contentField = document.querySelector("#content");

    titleField.value = post.title;
    contentField.value = post.content;

    const saveButton = document.querySelector("#saveButton");
    saveButton.setAttribute("data-id", postId);
}

function fetchPostById(postId) {
    for (let i = 0; i < posts.length; i++) {
        if(posts[i].id === postId) {
            return posts[i];
        }

    }
    // didn't find it so return something falsy
    return false;
}

function setupDeletePostHandler() {
    // Target all delete buttons
    const deleteButtons = document.querySelectorAll(".deletePost");
    // add a click handler to  all delete buttons
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function (e) {
            // get the post id of each delete button
            const postId = this.getAttribute("data-id");

            deletePost(postId);
        })
    }
}

function deletePost(postId) {
    const request = {
        method: "DELETE",
        headers: getHeaders()
    }
    const url = "http://localhost:8080/api/posts/" + postId;
    fetch(url, request)
        .then(function(response) {
            // check the response code
            CreateView("/posts");
        })
}

function setupSaveHandler() {
    const saveButton = document.querySelector("#saveButton");
    saveButton.addEventListener("click", function (e) {
        // check the data-id for the save button
        const postId = parseInt(this.getAttribute("data-id"));

        // get the title and content for the new/update post
        const titleField = document.querySelector("#title");
        const contentField = document.querySelector("#content");

        const post = {
            title: titleField.value,
            content: contentField.value
        }

        // make request
        const request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(post)
        }

        let url = POST_API_BASE_URL;

        // if we are updating post, change request and url

        if (postId > 0) {
            request.method = "PUT";
            url += `/${postId}`;
        }

        fetch(url, request)
            .then(function(response) {
                console.log(response.status)
                // check status code
                CreateView("/posts");
            })
    })
}

