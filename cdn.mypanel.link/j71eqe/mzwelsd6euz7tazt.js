$("a.mass-order").click(function () {
    $(".newOrderSide").addClass("hidden");
    $(".massOrderSide").removeClass("hidden");
    $("ul.nav li a.active").removeClass("active");
    $(this).addClass("active");
});

$("ul.platforms li button").click(function () {
    $("ul.platforms li button").removeClass("active");
    $(this).toggleClass("active");

    let platform = $(this).attr("data-platform");

    if (platform == "all") {
        $(".si-header").show();
        $(".service-item").show();
        $(".category-card").show();
    } else if (platform == "fav") {
        $(".category-card").show();
        $(".si-header").hide();
        $(".service-item:not(.mb-4)").hide();
        $(".service-item[data-fav='true']").show();
    } else {
        $(".si-header").show();
        $(".service-item").show();
        $(".category-card").hide();
        $(".category-card[data-platform='" + platform + "']").show();
    }
});


const filterServicesInput = document.getElementById('filterServicesInput');
if (filterServicesInput) {
    const serviceTitle = document.querySelectorAll('.si-title');
    const serviceHeads = document.querySelectorAll('.category-card > .card-header');
    const nothingFound = document.querySelector('.nothing-found');
    const searchTextWrite = document.getElementById('search-text-write');

    filterServicesInput.addEventListener('keyup', e => {
        const keyword = e.target.value;
        $('.service-item').each(function () {
            var text = $(this).text().toLowerCase();
            if (text.indexOf(e.target.value.toLowerCase()) == -1) {
                $(this).addClass('hidden');
            } else {
                $(this).removeClass('hidden');
            }
        });

        const catCards = document.querySelectorAll('.category-card');
        [...catCards].forEach(card => {
            const itemsHidden = card.querySelectorAll('.service-item.hidden');
            const items = card.querySelectorAll('.service-item');
            if (itemsHidden.length == items.length) {
                card.style.display = 'none';
                card.classList.add('empty');
            } else {
                card.style.display = '';
                card.classList.remove('empty');
            }
        })

        const catCardsCount = catCards.length;
        // empty cards
        const emptyCards = document.querySelectorAll('.category-card.empty');
        console.log(emptyCards.length, catCardsCount);
        if (emptyCards.length == catCardsCount) {
            nothingFound.style.display = '';
            searchTextWrite.innerHTML = keyword;
        } else {
            nothingFound.style.display = 'none';
            searchTextWrite.innerHTML = '';
        }
    });
}

function filterService(category) {
    if (category == 'all')
        $('.category-card.hidden').removeClass('hidden');
    else {
        $('.category-card').addClass('hidden');
        $('.category-card[data-category="' + category + '"]').removeClass('hidden');
    }
    removeEmptyCategory();
}

const filterServces = document.getElementById('filterServices');
if (filterServces) {
    filterServces.addEventListener('change', e => {
        filterService(e.target.value);
    });
}

$(".js-show-sidebar, .js-close-sidebar").on("click", function() {
    $("aside.sidebar").toggleClass("passive");
});
	
$(".js-show-sidebar, .js-close-sidebar").on("click", function() {
    $("body").toggleClass("sidebar-active");
});	

(function() {
    $("#switch-theme-input").on("change", function() {
        if ($(this).prop("checked")) {
            $("body").addClass("dark");
            localStorage.setItem("darkMode", true);
        } else {
            $("body").removeClass("dark");
            localStorage.setItem("darkMode", false);
        }
    });
})();
(function() {
    $(document).on("click", function(e) {
        var toggle_item = $(e.target).closest(".toggle-item"),
            toggle_head = $(e.target).closest(".toggle-head"),
            action_item = $(e.target).closest(".action-item"),
            action_head = $(e.target).closest(".action-head");
        if (action_item.length) {
            if (action_head.length && action_item.hasClass("active")) return action_item.removeClass("active");
            $(".action-item").removeClass("active");
            return action_item.toggleClass("active");
        }
        if (toggle_head.length && toggle_item.hasClass("active")) return toggle_item.removeClass("active");
        $(".toggle-item, .action-item").removeClass("active");
        toggle_item.toggleClass("active");
    });
})();

const headerScroll = () => {
    if (window.scrollY > 10) {
        document.querySelector('#header').classList.add('fixed');
    } else {
        document.querySelector('#header').classList.remove('fixed');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#header')) {
        headerScroll();
    }
});

window.addEventListener('scroll', e => {
    headerScroll();
})

function noAuthMenu() {
		$('.b-menu-wrapper').toggleClass('active');
		$('body').toggleClass('stop-body');
}

var modalOpen = (modalId, data = null) => {
  const modal = document.getElementById(modalId);
  const modalBox = modal.querySelector('.modal-box');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modal.addEventListener('click', e => {
    if (e.target !== modalBox && !modalBox.contains(e.target)) {
      closeModal();
    }
  });

  const modalCloseBtn = modal.querySelector('.m-close');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', e => {
      closeModal();
    })
  }

  if (data != null) {
    Object.keys(data).forEach(key => {
      const el = document.getElementById(key);
      if (el) {
        el.innerHTML = data[key];
      }
    });
  }

}

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  makeToast('Panoya kopyalandı')
};

var toastTime;

function makeToast(text = null, timeOut=4000) {
  $('.toast-text').html(text)
  $('.bs-toast').fadeIn(300);

  toastTime = setTimeout(() => {
    $('.bs-toast').fadeOut(300);
  }, timeOut);
}

function removeToast() {
  $('.bs-toast').fadeOut(300);
  clearTimeout(toastTime);
}

function setAmount(val) {
    var setamount = document.getElementById("amount");
    setamount.value = val
}

const newsDrawer = document.querySelector('.basket-drawer');

if (newsDrawer) {
  const newsDrawerToggle = document.querySelector('.basket-drawer-toggle');
  const newsDrawerClose = document.querySelector('.basket-header-close');
  const newsDrawerOverlay = document.querySelector('.basket-overlay');


  newsDrawerToggle.addEventListener('click', e => {
    newsDrawer.style.display = 'block';
    setTimeout(() => { 
      newsDrawer.style.transform = 'translateX(0)';
    }, 10)
    newsDrawerOverlay.style.display = 'block';
  });

  newsDrawerClose.addEventListener('click', e => {
    newsDrawer.style.transform = 'translateX(100%)';
    setTimeout(() => {
      newsDrawer.style.display = 'none';
    }, 300);
    newsDrawerOverlay.style.display = 'none';
  });
}

const useState = (defaultValue) => {
  let value = defaultValue;
  const getValue = () => value
  const setValue = newValue => value = newValue
  return [getValue, setValue];
}

const [gender, setGender] = useState('male');
const genderLocal = localStorage.getItem('gender');

if (genderLocal !== null) {
  setGender(genderLocal);
}

if (localStorage.getItem("color")) {
    $("body").attr("data-color", localStorage.getItem("color"));
} else {
    $("body").attr("data-color", "purple");
}

const genderSwitch = document.getElementById('gender-switch');
if (genderSwitch) {
  if (gender() == 'male') {
    genderSwitch.classList.add('gs-male');
  } else {
    genderSwitch.classList.add('gs-female');
  }
  genderSwitch.addEventListener('click', e => {
    if (gender() == 'male') {
      genderSwitch.classList.remove('gs-male');
      genderSwitch.classList.add('gs-female');
      setGender('female');
   	  localStorage.setItem("color", "purple");
      $("body").attr("data-color", "purple");
    } else {
      genderSwitch.classList.remove('gs-female');
      genderSwitch.classList.add('gs-male');
      setGender('male');
      localStorage.setItem("color", "blue");
      $("body").attr("data-color", "blue");
    }
    
    localStorage.setItem('gender', gender());
  });
}

var sChatBody = document.getElementsByClassName('schat-chat-body')[0];
if (sChatBody) {
  sChatBody.scrollTo(0, sChatBody.offsetHeight);
}

$('.home-ss-tab').click(function(){
  if($(this).hasClass('active')){
      $(this).find('.ss-tab-content').slideToggle(200);
      $(this).toggleClass('active');
  }else {
      $('.home-ss-tab').removeClass('active');
      $('.home-ss-tab > .ss-tab-content').slideUp(200);
      $(this).find('.ss-tab-content').slideToggle(200);
      $(this).toggleClass('active');
  }
});

const newOrderCats = document.getElementById('new-order-cats');

if (newOrderCats) {
    const orderFormCats = document.getElementById('orderform-category');
    var realData = orderFormCats.innerHTML;

    const dCatBtns = document.querySelectorAll('.nwo-cat-btn');
    if (dCatBtns[0]) {
        [...dCatBtns].forEach(btn => {
            btn.addEventListener('click', e => {
                const val = btn.getAttribute('data-change-cat');
                const orderFormCats = document.getElementById('orderform-category');
                const options = document.querySelectorAll('#orderform-category-copy option');

                const dCatbtns = document.querySelectorAll('.nwo-cat-btn');
                [...dCatbtns].forEach(bt => {
                    bt.classList.remove('active');
                });
                btn.classList.add('active');

                const newOptions = [];
                [...options].forEach(el => {
                    if (el.innerText.toLowerCase().includes(val.toLowerCase())) {
                        newOptions.push(el);
                    }
                });
                const newOptionsHtml = [];
                [...newOptions].forEach(el => {
                    newOptionsHtml.push(el.outerHTML);
                });
                orderFormCats.innerHTML = newOptionsHtml.join('');

                $('#orderform-category').trigger('change');
            });
        })
    }
    setTimeout(() => {
        const orderFormCopy = document.createElement('select');
        orderFormCopy.setAttribute('id', 'orderform-category-copy');
        orderFormCopy.style.display = 'none';
        orderFormCopy.innerHTML = realData;
        orderFormCats.parentNode.insertBefore(orderFormCopy, orderFormCats);
    }, 100)
}

const htmlcontents = document.querySelector("BODY");
function colorApp() {
    let mode = localStorage.getItem('platMode');
    if (mode) {
        htmlcontents.classList.toggle(localStorage.getItem('platMode'));
    }
}
colorApp();
