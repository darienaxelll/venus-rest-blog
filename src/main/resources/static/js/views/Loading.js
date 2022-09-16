export default function Loading(props) {
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
            }
            
            #loader {
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
            }
            
            #loader:before {
                display: block;
                content: "";
                position: absolute;
                top: 5px;
                left: 5px;
                right: 5px;
                bottom: 5px;
                
                border: 3px solid transparent;
                border-top-color: #e74c3c;
            }
            
            #loader:after {
                display: block;
                content: "";
                position: absolute;
                top: 15px;
                left: 15px;
                right: 15px;
                bottom: 15px;
                
                border: 3px solid transparent;
                border-top-color: #f9c922;
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