let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  
}
$(document).ready(function () {
    function showSlide($slide) {
        $('.slide-item').removeClass('active-slide-item');
        $slide.addClass('active-slide-item');

        // Reset the transform before starting the new animation
        $slide.css('transform', 'scale(0.5)');

        // Animate the scaling effect
        setTimeout(function () {
            $slide.css('transform', 'scale(1)');
        }, 100); // Slight delay to ensure the transition happens
    }

    let currentSlide = 0;
    const slides = $('.slide-item');
    const totalSlides = slides.length;

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide($(slides[currentSlide]));
    }

    // Initial call to start the zoom effect
    showSlide($(slides[currentSlide]));

    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);
});

