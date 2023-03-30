/**
* Template Name: PhotoFolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

function handleKeyPress(e){
  var key=e.keyCode || e.which;
   if (key==13){
      search();
   }
 }
function search()
{
var searchBox = document.getElementsByClassName('searchbar')[0];
console.log(searchBox.value);

if (!searchBox.value)
{
  alert('Please enter a valid text');
}
else
{
  getPhotos(searchBox.value.trim().toLowerCase());
}
}

function getPhotos(text)
{
document.getElementsByClassName('searchbar')[0].value = '';

 var sdk = apigClientFactory.newClient();

  sdk.searchGet({ q: text})
    .then(function(result) {
      console.log(result['data']["body"]);

      var photo_results = result['data']["body"];

          if (photo_results.length == 0)
          {
              alert("No images found for your search");
          }

      var photosDiv = document.getElementById('photos_results');
      photosDiv.innerHTML = "";

      for (var i=0; i<photo_results.length; i++)
      {
        console.log(photo_results[i]['url']);
        imageLink = "<img src='" + photo_results[i]['url'] + "' class='img-fluid' alt=''>"

              previewLink = "<a href='" + photo_results[i]['url'] + "' title='Labels: " + photo_results[i]['labels']+ "' class='glightbox preview-link'><i class='bi bi-arrows-angle-expand'></i></a>"
              divPreviewLink = "<div class='gallery-links d-flex align-items-center justify-content-center'>" + previewLink + "</div>"
              galleryItem = "<div class='gallery-item h-100'>" + imageLink + divPreviewLink + "</div>"
              adjustedGalleryItem = "<div class='col-xl-3 col-lg-4 col-md-6'>" + galleryItem + "</div>"
              
              photosDiv.innerHTML += adjustedGalleryItem
      }

      const glightbox = GLightbox({
        selector: '.glightbox'
      });

      new Swiper('.slides-1', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
    
      /**
       * Init swiper slider with 3 slides at once in desktop view
       */
      new Swiper('.slides-3', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 40
          },
    
          1200: {
            slidesPerView: 3,
          }
        }
      });

      aois_init();

    }).catch(function(result){
      console.log(result);
    });
}

function upload()
{
var filePath = (document.getElementById('uploaded_file').value).split("\\");
  var fileName = filePath[filePath.length - 1];
  var fileExt = fileName.split(".").pop();
  
  if (!document.getElementById('custom_labels').innerText == "") {
      var customLabels = document.getElementById('custom_labels');
  }
  console.log(fileName);
  console.log(custom_labels.value);

  var file = document.getElementById("uploaded_file").files[0];
  file.constructor = () => file;

  console.log(file.type);

  var sdk = apigClientFactory.newClient();

  var params = {
      'x-amz-meta-customLabels': custom_labels.value,
      "filename": fileName,
      "bucket": "photo2store",
      //'x-amz-meta-customLabels': {"labels": custom_labels.value},
      //'x-amz-meta-customabels': custom_labels.value,
      // "x-api-key": "RAbQGlfiCt1Bdfphacz04348WPcYUnhs8ja4u89C"
  };

  var additionalParams = {
      headers: {
          //'x-amz-meta-customLabels': custom_labels.value,
          'Content-Type': file.type,
          //'policy': ["starts-with", "$x-amz-meta-customLabels", ""]
      }
  };

  var reader = new FileReader();
  reader.onload = function (event) {
      body = btoa(event.target.result);
      //console.log('Reader body : ', body);
      return sdk.uploadBucketFilenamePut(params, file, additionalParams)
      .then(function(result) {
          console.log(result);
          alert('Image uploaded successfully')
      })
      .catch(function(error) {
          console.log(error);
      })
  }
  reader.readAsBinaryString(file);

  document.getElementById('uploaded_file').value = "";
  document.getElementById('custom_labels').value = "";

  // var url = "https://wajuqrne5c.execute-api.us-east-1.amazonaws.com/v1/upload/photos-st3523/duck.jpeg"
  // axios.put(url, file, params).then(response => {
  //     alert("Image uploaded: " + file.name);
  // })
  // .catch(function(error) {
  //     console.log(error);
  // });   
}

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition

function interpretVoice()
{
  if ('SpeechRecognition' in window) {
      console.log("SpeechRecognition is Working");
  } else {
      console.log("SpeechRecognition is Not Working");
  }

  var searchBox = document.getElementsByClassName('searchbar')[0];
  const recognition = new window.SpeechRecognition();

  mic = document.getElementById("switch");  
  
  if (mic.innerHTML == "micOn") {
      recognition.start();
  } else if (mic.innerHTML == "micOff"){
      recognition.stop();
  }

  console.log("reached")

  recognition.addEventListener("start", function() {
      console.log("reached")

      mic.innerHTML = "micOff";
      console.log("Recording.....");
  });

  recognition.addEventListener("end", function() {
      console.log("Stopping recording.");
      mic.innerHTML = "micOn";
  });

  recognition.addEventListener("result", resultOfSpeechRecognition);
  function resultOfSpeechRecognition(event) {
      const current = event.resultIndex;
      transcript = event.results[current][0].transcript;
      searchBox.value = transcript;
      console.log("transcript : ", transcript)
  }
}