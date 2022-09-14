import CreateView from "../createView.js"

let me;

export default function meHTML(props) {

    me = props.me;

    const postsHTML = postHTML(me);

    return `
    <div class="card text-white bg-dark mb-3 mt-4" style="max-width: 18rem;">
      <div class="card-header">User Info <i class="fa-solid fa-user"></i></div>
      <div class="card-body">
        <h5 class="card-title">Reset Password:</h5>
      <div class="row g-3 align-items-center">
      <form>
          <div class="col-auto">
            <label for="oldPassword" class="col-form-label">Old Password</label>
          </div>
          <div class="col-auto">
            <input type="password" id="oldPassword" class="form-control" aria-describedby="passwordHelpInline">
          </div>
          
          <div class="col-auto">
            <label for="newPassword" class="col-form-label">New Password</label>
          </div>
          <div class="col-auto">
            <input type="password" id="newPassword" class="form-control" aria-describedby="passwordHelpInline">
          </div>
          <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              Must be 8-20 characters long.
            </span>
          </div>
          
          <div class="col-auto">
            <label for="confirmPassword" class="col-form-label">Confirm Password</label>
          </div>
          <div class="col-auto">
            <input type="password" id="confirmPassword" class="form-control" aria-describedby="passwordHelpInline">
          </div>
          <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              Must be 8-20 characters long.
            </span>
          </div>
        </div>
        
        <button id="submitPassword" type="button" class="btn btn-light mt-3">Submit</button>
        <button id="togglePassword" type="button" class="btn btn-light mt-3 ml-4">See Passwords</button>
        
        </form>
    </div>
    
    <hr>
    
    ${postsHTML}
    `;
}

function postHTML(me) {
    let html = `
         <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Content</th>
        </tr>
      </thead>
      <tbody>
    `;

    for (let i = 0; i < me.posts.length; i++) {
        const post = me.posts[i];
        html += `
            <tr>
            <td>${post.title}</td>
            <td>${post.content}</td>
            </tr>
        `
    }
    html += `</tbody></table>`;
    return html;
}

export function meJavaScript() {
    resetPassword();
    togglePassword();
}

function resetPassword() {
    const submitButton = document.querySelector("#submitPassword");

    submitButton.addEventListener("click", function (e) {
        const oldPassword = document.querySelector("#oldPassword").value;
        const newPassword = document.querySelector("#newPassword").value;
        const confirmPassword = document.querySelector("#confirmPassword").value;

        const request = {
            method: "PUT"
        }

        const url = `${USER_API_BASE_URL}/${me.id}/updatePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`

        fetch(url, request)
            .then(function () {
                CreateView("/");
            });
    });
}

// function togglePassword() {
//     const toggleBtn = document.querySelector("#toggleButton");
//
//     toggleBtn.addEventListener("click", function (e) {
//         const inputs = document.querySelectorAll("input");
//
//         for (let i = 0; i < inputs.length; i++) {
//             if (inputs[i].getAttribute("type") === "password") {
//                 inputs[i].setAttribute("type", "text");
//             } else {
//                 inputs[i].setAttribute("type", "password");
//             }
//         }
//     });
// }