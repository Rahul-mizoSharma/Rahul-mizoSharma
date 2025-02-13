const movies = [
    {
        id: 1,
        title: "Stranger Things",
        image: "https://wallpaperaccess.com/full/1605477.jpg"
    },
    {
        id: 2,
        title: "The Witcher",
        image: "https://wallpapercave.com/wp/wp5410696.jpg"
    },
    {
        id: 3,
        title: "Money Heist",
        image: "https://wallpapercave.com/wp/wp6581266.jpg"
    },
    {
        id: 4,
        title: "Dark",
        image: "https://wallpapercave.com/wp/wp4056410.jpg"
    },
    {
        id: 5,
        title: "The Crown",
        image: "https://wallpapercave.com/wp/wp7285816.jpg"
    }
];

// Function to create movie cards
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`;
    return movieCard;
}

// Function to populate movie rows
function populateMovieRow(rowId, movies) {
    const row = document.getElementById(rowId);
    movies.forEach(movie => {
        row.appendChild(createMovieCard(movie));
    });
}

// Add scroll behavior to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = '#141414';
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
});

// Populate movie rows when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateMovieRow('trendingRow', movies);
    populateMovieRow('popularRow', movies);
    populateMovieRow('continueWatchingRow', movies);
});