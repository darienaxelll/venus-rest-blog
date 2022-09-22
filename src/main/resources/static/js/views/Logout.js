import createView from "../createView.js";

export default function Logout(props) {
    return `
    <header>
        <style>
            #loader-wrapper {
                 position: fixed;
                 top: 0;
                 left: 0;
                 width: 100%;
                 height: 100%;
                 z-index: 1000;
                 
                 background-color: #222;
            }
            
            #title-div {
                margin-top: 2em;
                display: flex;
                flex-direction: row;
            }
            
            h1 {
                align-items: center;
                align-content: center;
                color: white;
            }
            
            #loader {
                 -webkit-animation: spin 2s linear infinite;
                animation: spin 2s linear infinite;
    
                 display: block;
                 position: relative;
                 left: 50%;
                 top: 50%;
                 width: 150px;
                 height: 150px;
                 margin: -75px 0 0 -75px;
                 z-index: 1500;
                 
                 border: 3px solid transparent;
                 border-top-color: #3498db;
                 border-radius: 50%;

            }
            
            #loader:before {
               -webkit-animation: spin 3s linear infinite;
                animation: spin 3s linear infinite;
                
                display: block;
                content: "";
                position: absolute;
                top: 5px;
                left: 5px;
                right: 5px;
                bottom: 5px;
                
                border: 3px solid transparent;
                border-top-color: #e74c3c;
                border-radius: 50%;
            }
            
            #loader:after {
                -webkit-animation: spin 3s linear infinite;
                animation: spin 3s linear infinite;
                
                display: block;
                content: "";
                position: absolute;
                top: 15px;
                left: 15px;
                right: 15px;
                bottom: 15px;
                
                border: 3px solid transparent;
                border-top-color: #f9c922;
                border-radius: 50%;
            }
            
            @keyframes spin {
            0%   {
               -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
                -ms-transform: rotate(0deg);  /* IE 9 */
                transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
            }
            
            100% {
                -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
                -ms-transform: rotate(360deg);  /* IE 9 */
                transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
            }
            
            @keyframes spin {
            0%   {
                -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
                -ms-transform: rotate(0deg);  /* IE 9 */
                transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
            }
            
            100% {
                -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
                -ms-transform: rotate(360deg);  /* IE 9 */
                transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
            }
            
            #loader-wrapper .loader-section {
            position: fixed
            top: 0;
            width: 51%;
            height: 100%;
            background: #222;
            z-index: 1000;
            }
            
            #loader-wrapper .loader-section.section-left {
            left: 0;
            }
            #loader-wrapper .loader-section.section-right {
            right: 0;
            }
        </style>
    </header>
    <body>
        <div id="loader-wrapper">
            <div id="title-div">
            <h1 class="display-3">Logging off ...</h1>
            </div>          
            <div id="loader"></div>
            
            <div class="loader-section section-left"></div>
            <div class="loader-section section-right"></div>
        </div>
    </body>
`;
}

export function LogoutEvent() {
    window.setTimeout(function () {
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        createView("/login");
    }, 3000)
}