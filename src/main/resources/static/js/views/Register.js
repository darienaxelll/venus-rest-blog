import CreateView from "../createView.js"

export default function Register(props) {
    return `
    <!DOCTYPE html>
        <html>
            <head>
            <meta charset="UTF-8"/>
            <title>Register</title>
            <style>
                body {
                    background-color: #222;
                }
                #register-div {
                    margin-top: 50px;
                    margin-left: 10%;
                    display: block;
                    position: relative;
                    background-color: white;
                    width: 75%;
                    padding: 10px;
                    border: 2px solid white;
                    border-radius: 5px;
                }
            </style>
            </head>
            <body>
            <div id="register-div">
            <form id="register-form">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input id="username" class="form-control" name="username" type="text"/>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password">
                <span id="passwordHelpInline" class="form-text">
                  Must be 8-20 characters long.
                </span>
              </div>
              <button id="register-btn" type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
            </body>
        </html>
`;
}

export function RegisterEvent(){
    const registerButton = document.querySelector("#register-btn");
    registerButton.addEventListener("click", function (e) {

        const usernameField = document.querySelector("#username");
        const emailField = document.querySelector("#email");
        const passwordField = document.querySelector("#password");

        let newUser = {
            username: usernameField.value,
            email: emailField.value,
            password: passwordField.value
        }

        console.log(newUser);

        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        }

        fetch(USER_API_BASE_URL + "/create", request)
            .then(response => {
                console.log(response.status);
                CreateView("/");
            })

    })
}