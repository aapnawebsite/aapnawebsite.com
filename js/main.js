(function ($) {
    "use strict";

    // Starting Intro Page Handler
    var dismissIntro = function () {
        var splash = $('#intro-splash');
        if (splash.length > 0 && !splash.hasClass('fade-out')) {
            splash.addClass('fade-out');
            setTimeout(function () {
                splash.remove();
            }, 850);
        }
    };

    // Auto-dismiss intro page after animation completes (~2.2s)
    setTimeout(dismissIntro, 2200);

    // Click anywhere or skip button to enter immediately
    $(document).on('click', '#intro-splash, #intro-skip-btn', function () {
        dismissIntro();
    });


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    
    // Device Mockup Switcher (Desktop / Tablet / Mobile)
    $(document).on('click', '.device-tab', function () {
        $('.device-tab').removeClass('active');
        $(this).addClass('active');
        var view = $(this).data('view');
        var $screen = $('#laptop-screen-view');
        $screen.removeClass('view-tablet view-mobile');
        if (view === 'tablet') {
            $screen.addClass('view-tablet');
        } else if (view === 'mobile') {
            $screen.addClass('view-mobile');
        }
    });

    // Animated Stats Counter on Scroll
    var hasRunCounters = false;
    var runStatsCounters = function () {
        if (hasRunCounters) return;
        var statsSection = $('.stats-strip');
        if (statsSection.length === 0) return;
        var rect = statsSection[0].getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.9) {
            hasRunCounters = true;
            $('.stat-number').each(function () {
                var $this = $(this);
                var fullText = $this.text().trim();
                var num = parseFloat(fullText.replace(/[^0-9.]/g, ''));
                var suffix = fullText.replace(/[0-9.]/g, '');
                if (!isNaN(num)) {
                    $({ count: 0 }).animate({ count: num }, {
                        duration: 1500,
                        easing: 'swing',
                        step: function () {
                            if (fullText.includes('.')) {
                                $this.text(this.count.toFixed(1) + suffix);
                            } else {
                                $this.text(Math.floor(this.count) + suffix);
                            }
                        },
                        complete: function () {
                            $this.text(fullText);
                        }
                    });
                }
            });
        }
    };
    $(window).on('scroll', runStatsCounters);
    runStatsCounters();

    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);

/*** DARK MODE START ***/

document.addEventListener("DOMContentLoaded", function () {

  const toggleBtn = document.getElementById("theme-toggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      // Save user preference
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

});

/*** DARK MODE END ***/

// EmailJS Contact Form Handler
document.addEventListener("DOMContentLoaded", function () {
  if (typeof emailjs !== "undefined") {
    try {
      emailjs.init("K70-YYx5nUXFqVyuf");
    } catch(err) {
      console.warn("EmailJS init note:", err);
    }
  }

  var form = document.getElementById("contactForm");
  var statusMsg = document.getElementById("form-status");

  if (form && statusMsg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      statusMsg.style.display = "block";
      statusMsg.className = "status-msg";
      statusMsg.textContent = "Sending message...";

      if (typeof emailjs !== "undefined") {
        var serviceID = "service_xtlwz5j";
        var templateID = "template_f3l6h8g";

        emailjs.sendForm(serviceID, templateID, this)
          .then(function() {
            statusMsg.textContent = "Message sent successfully! Our team will contact you soon.";
            statusMsg.classList.add("status-success");
            form.reset();
          })
          .catch(function(err) {
            console.error(err);
            statusMsg.textContent = "Error sending message. Please reach us via WhatsApp or Email directly!";
            statusMsg.classList.add("status-error");
          });
      } else {
        statusMsg.textContent = "Thank you! Please contact us directly via WhatsApp (+91894330609) or email.";
        statusMsg.classList.add("status-success");
        form.reset();
      }
    });
  }
});
