// Inicializações necessárias
const track = document.querySelector('.Carousel_Slides');
const slides = Array.from(track.children);
const nextButton =  document.querySelector('.Right_Button');
const previousButton =  document.querySelector('.Left_Button');
const slide_width = slides[0].getBoundingClientRect().width;

// Por imagens umas ao lado das outras
const set_slide = (slide, index) => {
    slide.style.left = slide_width * index + 'px';
};
slides.forEach(set_slide)

// Mover para o próximo slide
const move_to_slide = (track ,current_slide, target_slide) => {
    track.style.transform = 'translateX(-' + target_slide.style.left + ')';
    current_slide.classList.remove('Current_Slide');
    target_slide.classList.add('Current_Slide');

    // atualizar botão se necessário
    if (!target_slide.nextElementSibling) nextButton.classList.add('Is_Hidden');
    else if (nextButton.classList.contains('Is_Hidden')) nextButton.classList.remove('Is_Hidden');
    if (!target_slide.previousElementSibling) previousButton.classList.add('Is_Hidden');
    else if (previousButton.classList.contains('Is_Hidden')) previousButton.classList.remove('Is_Hidden');
}

// Mover para direita
nextButton.addEventListener('click', e => {
    const current_slide = track.querySelector('.Current_Slide');
    const next_slide  = current_slide.nextElementSibling;

    // mover para o prox slide
    move_to_slide(track, current_slide, next_slide);
   
});

// Mover para a esquerda
previousButton.addEventListener('click', e => {
    const current_slide = track.querySelector('.Current_Slide');
    const previous_slide  = current_slide.previousElementSibling;

    // mover para o prox slide
    move_to_slide(track, current_slide, previous_slide);
});