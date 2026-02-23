const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleButton.querySelector('i');

// Check for saved user preference, if any, on load of the website
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Default to dark if no preference or if system prefers dark
if (savedTheme === 'light') {
    enableLightMode();
} else {
    enableDarkMode();
}

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        enableDarkMode();
        localStorage.setItem('theme', 'dark');
    } else {
        enableLightMode();
        localStorage.setItem('theme', 'light');
    }
});

function enableLightMode() {
    body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

function enableDarkMode() {
    body.classList.remove('light-mode');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
}

// Easter Egg: Redirect to ZapataOS
const easterEggTrigger = document.getElementById('easter-egg-trigger');
easterEggTrigger.addEventListener('click', () => {
    window.location.href = 'desktop/index.html';
});

// Random Quote Footer
const quotes = [
    { text: "Everything is a game. It's just a matter of whether you're playing it or it's playing you.", author: "Unknown" },
    { text: "When playing a game, the goal is to win, but it is the goal that is important, not the winning.", author: "Reiner Knizia" },
    { text: "We do not stop playing because we grow old, we grow old because we stop playing!", author: "Benjamin Franklin" },
    { text: "Everything is theoretically impossible, until it is done.", author: "Robert A. Heinlein" },
    { text: "If I have seen further it is by standing on the shoulders of Giants.", author: "Isaac Newton" },
    { text: "In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual.", author: "Galileo Galilei" },
    { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The art challenges the technology, and the technology inspires the art.", author: "John Lasseter" },
    { text: "Science is what we understand well enough to explain to a computer. Art is everything else we do.", author: "Donald Knuth" },
    { text: "Move fast and break things. Unless you are playing Jenga.", author: "Unknown" },
    { text: "The good thing about science is that it's true whether or not you believe in it.", author: "Neil deGrasse Tyson" },
    { text: "In the box, you'll find everything you need to build a world.", author: "Unknown" },
    { text: "Technology is anything that wasn't around when you were born.", author: "Alan Kay" },
    { text: "Life is like a game of chess. To win you have to make a move.", author: "Unknown" },
    { text: "The most exciting phrase to hear in science, the one that heralds new discoveries, is not 'Eureka!' but 'That's funny...'", author: "Isaac Asimov" },
    { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { text: "There are only three forms of high art: the symphony, the illustrated children's book and the board game.", author: "Brian K. Vaughan" },
    { text: "Life is more fun if you play games.", author: "Roald Dahl" },
    { text: "It may not be enough to play a game well—you must also be sure you are playing the right game.", author: "Avinash K. Dixit" },
    { text: "Tactics is what you do when there is something to do; strategy is what you do when there is nothing to do.", author: "Savielly Tartakower" },
    { text: "The winner of the game is the player who makes the next-to-last mistake.", author: "Savielly Tartakower" },
    { text: "Science knows no country, because knowledge belongs to humanity.", author: "Louis Pasteur" },
    { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
    { text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" },
    { text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie" },
    { text: "Science never solves a problem without creating ten more.", author: "George Bernard Shaw" },
    { text: "If we knew what it was we were doing, it would not be called research, would it?", author: "Albert Einstein" },
    { text: "Imagination is more important than knowledge.", author: "Albert Einstein" },
    { text: "Everything should be made as simple as possible, but not simpler.", author: "Albert Einstein" },
    { text: "The real problem is not whether machines think but whether men do.", author: "B.F. Skinner" },
    { text: "The science of today is the technology of tomorrow.", author: "Edward Teller" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Technology, like art, is a soaring exercise of the human imagination.", author: "Daniel Bell" },
    { text: "Play is the highest form of research.", author: "Albert Einstein" },
    { text: "Board games: because sometimes, 'I'm bored' just means 'I need more dice.'", author: "Unknown" }
];

function displayRandomQuote() {
    const quoteText = document.getElementById('quote-text');
    if (quoteText) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        quoteText.innerHTML = `"${quote.text}"<br><cite>— ${quote.author}</cite>`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', displayRandomQuote);
window.addEventListener('load', displayRandomQuote); // Backup
