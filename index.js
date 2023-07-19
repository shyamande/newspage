const apikey = "d28f95ffcb164f38bacc5c3cd0d78203";
const url = "https://newsapi.org/v2/everything?q= ";

window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${apikey}`);
    const data = await res.json();
    bindData(data.articles);
    
}

function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsTemplate = document.getElementById('template-news-card');
    cardContainer.innerHTML = '';
    articles.forEach((article)=>{
        if(!article.urlToImage) return ;
        const cardClone = newsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newstitle = cardClone.querySelector('#news-title');
    const newssource = cardClone.querySelector('#news-source');
    const newsdesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone : "Asia/Jakarta"
    });


    newssource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}


const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text');

searchbutton.addEventListener('click',()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})
