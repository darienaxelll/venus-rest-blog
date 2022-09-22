export default function Home(props) {
    console.log("The frontend did it. HER FAULT");
    return `
        <header>
        <style>
            body {
                background-color: #222;
            }
        </style>
            <h1>Home Page</h1>
        </header>
        <body>
            <div>
                <p>
                    This is the home page text.
                </p>    
            </div>
        </body>
    `;
}