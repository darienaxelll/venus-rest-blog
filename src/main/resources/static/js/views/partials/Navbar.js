import {isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    let navbar =  `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/" data-link>PostBook<i class="fa-solid fa-signs-post"></i></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a href="/" data-link class="nav-link active" aria-current="page">Home</a>
                </li>
                <li class="nav-item">
                  <a href="/posts" data-link class="nav-link">Posts</a>
                </li>
    `;

    if (isLoggedIn()) {
        navbar += `
                    <li class="nav-item">
                      <a href="/me" data-link class="nav-link">About Me</a>
                    </li>
                    <li class="nav-item">
                      <a href="/logout" data-link class="nav-link">Logout</a>
                    </li>
                </ul>
                </div>
        `;
    } else {
        navbar += `
                    <li class="nav-item">
                      <a href="/login" data-link class="nav-link">Login</a>
                    </li>
                    <li class="nav-item">
                      <a href="/register" data-link class="nav-link">Register</a>
                    </li>
                </ul>
                </div>
        `
    }

        navbar += `</div></nav>`;

    return navbar;
}