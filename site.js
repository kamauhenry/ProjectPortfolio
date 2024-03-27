function openGitHub() {
   
    window.open("https://github.com/kamauhenry");

    document.querySelector(".btn12").classList.add("clicked");
}
function openlinkedin() {
   
    window.open("https://www.linkedin.com/in/henry-kamau-b59959224/");

    document.querySelector(".btn12").classList.add("clicked");
}
// Define the scrollToElement function
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function highlightActiveLink() {
    const sections = document.querySelectorAll('div[id^=""]');
    let currentSection = '';
  
    // Function to update active link on scroll
    const updateActiveLink = () => {
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop) {
          currentSection = section.id;
          return; // Exit loop after finding the first visible section
        }
      });
  
      // Remove active class from all links
      const links = document.querySelectorAll('.links-container a');
      links.forEach(link => link.classList.remove('active'));
  
      // Add active class to the corresponding link
      const activeLink = document.querySelector(`.links-container a[href="#${currentSection}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    };
  
    // Add event listener to window scroll event
    window.addEventListener('scroll', updateActiveLink);
  
    // Call the function initially to highlight on page load
    updateActiveLink();
  }
  
  // Call the highlightActiveLink function after DOM is loaded
  window.onload = highlightActiveLink;
  
// Call the function when the page loads
window.onload = function() {
    highlightActiveLink();
};

// Or call the function when the user scrolls
window.onscroll = function() {
    highlightActiveLink();
};

function smoothScroll(target) {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.scrollY  || window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Adjust the duration as needed
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}


document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('KcL0gOD3nsp9DtqMo');
    // Your code here
    var contactForm = document.getElementById('contact-form');
    console.log(contactForm); // Debugging statement
    if (contactForm && contactForm.tagName === 'FORM') {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting normally
            
            // Construct FormData object using the form element
            let formData = new FormData(contactForm);
            
            // Send email using EmailJS with correct arguments
            emailjs.sendForm('service_27rl3pt', 'template_6kiu6mm', contactForm)
                .then(function(response) {
                    console.log('Success!', response.status, response.text);
                    // Optionally, show a success message to the user
                    alert('Your message has been sent successfully!');
                }, function(error) {
                    console.error('Failed!', error);
                    // Optionally, show an error message to the user
                    alert('Oops! Something went wrong. Please try again later.');
                });
            
            // Clear the form fields after submission
            contactForm.reset();
        });
    } else {
        console.error('Element with ID "contact-form" not found or is not a form element.');
    }
});


    
document.querySelectorAll('.links-container > div').forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'selected' class from all links
        document.querySelectorAll('.links-container > div').forEach(link => {
            link.classList.remove('selected');
        });
        // Add 'selected' class to the clicked link
        this.classList.add('selected');
    });
});
window.addEventListener('scroll', reveal);
function reveal(){
    var reveals = document.querySelectorAll('.reveal');

    for(var i = 0; i < reveals.length; i++){

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.MainHeader  .links-container .link#link a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop ;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('MainHeader link a[href*=' + id + ']').classList.add('active');
            });
        };
    });
}

let buttons = document.querySelectorAll('.btn12');

// Add a click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Add the 'clicked' class to the clicked button
        this.classList.add('clicked');

        // Remove the 'clicked' class after 1 second (1000 milliseconds)
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 1000);
    });
});