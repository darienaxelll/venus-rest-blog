import CreateView from "../createView.js";

export default function PostIndex(props) {
    return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
            <div>
                ${props.posts.map(post => `
            <div class="card" style="width: 100%;">
              <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">${post.content}</p>
                <button id="editButton" type="button" class="btn btn-secondary" style="margin-right: 10rem">Edit</button>
                <button id="deleteButton" type="button" class="btn btn-danger">Delete</button>
              </div>
            </div>`).join('')}  
            </div>
            <hr>
            <div class="mb-3">
              <label for="postTitle" class="form-label">Post Title</label>
              <input type="email" class="form-control" id="postTitle" placeholder="Enter Post Title">
            </div>
            <div class="mb-3">
              <label for="postBody" class="form-label">Content Area</label>
              <textarea class="form-control" id="postBody" rows="2" placeholder="Enter Text..."></textarea>
            </div>
            <button id="addButton" type="button" class="btn btn-outline-primary">Create Post</button>
        </main>
    `;
}

export function postSetup() {
    addPostHandler();
}

function addPostHandler() {
    const addButton = document.querySelector("#addButton");
    addButton.addEventListener("click", function(event) {
        const titleField = document.querySelector("#postTitle");
        const contentField = document.querySelector("#postBody");

        let newPost =  {
            title: titleField.value,
            content: contentField.value
        }

        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPost)
        }

        fetch("http://localhost:8080/api/posts", request)
            .then(response => {
                console.log(response.status);
                CreateView("/posts");
            })
    })
}

// function editPostHandler(id) {
// }
//
// function deletePostHandler() {
//     const deleteButton = document.querySelectorAll("#deleteButton");
//
//
// }

