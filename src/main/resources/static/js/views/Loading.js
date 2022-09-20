export default function Loading(props) {
    return `
    <header>
        <style>
            
            @-webkit-keyframes spin {
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
                
            #loader-wrapper {
                 position: fixed;
                 top: 0;
                 left: 0;
                 width: 100%;
                 height: 100%;
                 z-index: 1000;
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
        </style>
    </header>
    <body>
        <div id="loader-wrapper">
            <div id="loader"></div>
        </div>
    </body>
`;
}