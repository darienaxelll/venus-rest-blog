export default function Login(props) {
    return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Log In</title>
        <style>
            body {
                background-color: #222;
            }
            
            form {
                width: 50%;
                height: 75%;
                padding: 10px;
                background-color: white;
                margin-top: 15%;
                margin-left: 25%;
                border: 2px solid black;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
    <div>
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="email" class="form-control" id="username" aria-describedby="emailHelp">
            <div id="note" class="form-text">Speak your mind. Post it.</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password">
            <span id="passwordHelpInline" class="form-text">
                Must be 8-20 characters long.
            </span>
          </div>
          
          <button id = "login-btn" type="submit" class="btn btn-primary">Log in</button>
        </form>
    </div>
    </body>
</html>`;

}


