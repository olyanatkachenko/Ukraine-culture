const {tags, readingTime} = GhostHelpers;


const ghostapi = new GhostContentAPI({
    url: 'http://localhost:2368',
    key: '00cef0bf2fa8d415ce1b5a7b9a',
    version: "v3"
});

// fetch 5 posts, including related tags and authors
ghostapi.posts
    .browse({limit: 3, include: 'tags,authors'})
    .then((posts) => {
        display_posts(posts)
    })
    .catch((err) => {
        console.error(err);
    });


function display_posts(posts) {
    let container = document.getElementById("blog-container")

    let postsHtml = ""


    posts.forEach((post) => {
        console.log(post);
        let title = post.title
        let date = format_date(post.published_at)
        let image = post.feature_image
        let url = post.url

        let time = readingTime(post, {minute: '1 min read.', minutes: '% min read.'});
        console.log(time)

        let postHTML = `<div class="blog-box">

                <div class="blog-img">
                    <img src="${image}" alt=""/>
                </div>

                <div class="blog-text">
                    <span>${date} • ${time}</span>
                    <a href="${url}" class="blog-title">${title}</a>
                    <a href="${url}">Read more</a>
                </div>

            </div>`

        postsHtml = postsHtml + postHTML

    });


    container.innerHTML = postsHtml
}

function format_date(dateString) {
    let now = new Date(dateString)
    return now.toLocaleDateString()
}


window.addEventListener("load", (event) => {
    let href = window.location.href
    if (href.includes("#openSearch")) {
        document.querySelector(".search-trigger").click()
    }
    else if(href.includes("#openBookmark")){

    }

})