//Main Body
let body = document.querySelector("body");

//Container
let container = document.createElement("div");
container.classList.add("container", "py-4");
body.appendChild(container);

//Heading
let heading = document.createElement("h1");
heading.innerText = "THE PERTINENT TIMES";
heading.classList.add("my-3", "text-center");
container.appendChild(heading);

//Navbar
let navBar = document.createElement("div");
navBar.innerHTML = `
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light border-top border-bottom border-dark">
        <button class="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <a class="nav-link" id="Arts" onclick="getNews('Arts')">Arts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="Blogs" onclick="getNews('Blogs')">Blogs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="Food" onclick="getNews('Food')">Food</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="Movies" onclick="getNews('Movies')">Movies</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="Science" onclick="getNews('Science')">Science</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="Sports" onclick="getNews('Sports')">Sports</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="Travel" onclick="getNews('Travel')">Travel</a>
                </li>
                </ul>
            </div>
        </div>
    </nav>
`;
container.appendChild(navBar);

//News Area
let newsArea = document.createElement("div");
newsArea.classList.add("py-3");

createNewsArea = (news_array, subject_name) => {
  let newsAreaString = "";
  news_array.forEach((news) => {
    let newsString = `
            <div class="jumbotron">
                <div class="row">
                    <div class="col-md-8">
                        <h4 class="lead">${subject_name.toUpperCase()}</h4>
                        <h2 class="display-5">${
                          news["headline"]["print_headline"]
                        }</h2>
                        <p class="small">Published: ${news["pub_date"]}</p>
                        <p>${news["abstract"]}</p>
                        <p class="lead">
                        <a class="btn btn-dark btn-lg" href="${
                          news["web_url"]
                        }" target="_blank" role="button">Read more</a>
                        </p>
                    </div>
                    <div class="col-md-4">
                        <image src="https://nytimes.com/${
                          news["multimedia"][0]["url"]
                        }" height="auto" width="300"/>
                    </div>
                </div>
            </div>
        `;
    newsAreaString += newsString;
  });
  newsArea.innerHTML = newsAreaString;
};
container.appendChild(newsArea);

let API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";

getNews = async (subject_name) => {
  let url = `${API_URL}${subject_name}&api-key=k5JwrZQin8rNSK1UF7ymZqZpJiqimPdP`;

  let res = await fetch(url);
  let json = await res.json();

  createNewsArea(json["response"]["docs"], subject_name);
};

getNews("Arts");
