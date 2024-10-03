import '../styles/modern-normalize.css'
import '../styles/style.css'
import '../styles/components/header.css'
import '../styles/components/hero.css'
import '../styles/components/about.css'
import '../styles/components/work.css'
import '../styles/components/footer.css'
import '../styles/utils.css'

let banner = document.querySelector('.banner');
let canvas = document.querySelector('#dotsCanvas');
let context = canvas.getContext('2d');

let dots = [];
let arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696969'];

const setCanvasDimensions = () => {
    canvas.width = banner.clientWidth;
    canvas.height = banner.clientHeight;
};

setCanvasDimensions();

const createDots = () => {
    dots = [];
    for (let index = 0; index < 80; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random() * arrayColors.length)]
        });
    }
};

const drawDots = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        context.fillStyle = dot.color;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
    });
};

const drawLinesToMouse = (mouseX, mouseY) => {
    drawDots();
    let mouse = {
        x: mouseX - banner.getBoundingClientRect().left,
        y: mouseY - banner.getBoundingClientRect().top
    };
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
            context.strokeStyle = dot.color;
            context.lineWidth = 0.5;
            context.beginPath();
            context.moveTo(dot.x, dot.y);
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    });
};

banner.addEventListener('mousemove', (event) => {
    drawLinesToMouse(event.clientX, event.clientY);
});

banner.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        drawLinesToMouse(event.touches[0].clientX, event.touches[0].clientY);
    }
});

banner.addEventListener('mouseout', () => {
    drawDots();
});

banner.addEventListener('touchend', () => {
    drawDots();
});

window.addEventListener('resize', () => {
    setCanvasDimensions();
    createDots();
    drawDots();
});

createDots();
drawDots();
