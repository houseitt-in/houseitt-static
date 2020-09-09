// code for styling purposes only, NO INVOLVEMENT with FUNCTIONING of search bar

jQuery(document).ready(function($) {
  var alterClass = function() {
    var ww = document.body.clientWidth;
	console.log(ww);
    const search_reveal_btns = document.querySelectorAll(".search-reveal-options .search-reveal-option");
    const to_be_revealed = document.querySelectorAll(".to_be_revealed");
    const search_reveal_btns_container = document.querySelector(".search-reveal-options");
    if (ww < 1001) {

      search_reveal_btns[0].addEventListener("click", () => {
          search_reveal_btns.forEach(btn => {
              btn.classList.add("search_btns_hide");
          });

          setTimeout(()=> {
              search_reveal_btns_container.style.display = "none";
          }, 400);

          to_be_revealed.forEach(reveal => {
              reveal.style.display = "block";
          })
          
          setTimeout(()=> {
              to_be_revealed.forEach(reveal => {
                  reveal.classList.add("search-reveal-reveal");
              })
          }, 20);
      })   




      $(".positioning").removeClass("navbar-nav");
      $(".positioning").addClass("search-small");
      $(".my-banner-inner").addClass("my-banner-inner-small");

    } else {
      search_reveal_btns.forEach(btn => {
          btn.classList.add("search_btns_hide");
      });

      setTimeout(()=> {
          search_reveal_btns_container.style.display = "none";
      }, 400);

      to_be_revealed.forEach(reveal => {
          reveal.style.display = "block";
      })
      
      setTimeout(()=> {
          to_be_revealed.forEach(reveal => {
              reveal.classList.add("search-reveal-reveal");
          })
      }, 20);
    }
    // else if (ww >= 880) {
    //   $(".positioning").addClass("navbar-nav");
    //   $(".positioning").removeClass("search-small");
    //   $(".my-banner-inner").removeClass("my-banner-inner-small");
    // }
    if (ww < 500) {
      $(".my-search-head").addClass("my-search-head-small");
    } else if (ww >= 500) {
      $(".my-search-head").removeClass("my-search-head-small");
    }
    if (ww < 400) {
      $(".my-search-head").addClass("my-search-head-smallest");
    } else if (ww >= 400) {
      $(".my-search-head").removeClass("my-search-head-smallest");
    }
  };
  $(window).resize(function() {
    alterClass();
  });
  alterClass();
});

// Data mapper
// Map frontend data to format compatible with backend api endpoint
function map_search_params_to_backend_compatible_format(data) {
 /*sample data const data = {
    property_type: "Residential", // 'residential' or 'commercial'
    location: location,
    sharing: sharing, // incase of PG, ex. dual, triple, quad
    bhk: bhk, // incase of flats, ex. 1,2,3,...
    min_budget: min_budget,
    max_budget: max_budget
  };*/
  mapped_data = {};
  if (data['property_type'] === 'Flats')
    mapped_data['property_type'] = "FLAT";
  if (data['property_type'] === 'PG')
    mapped_data['property_type'] = "PG";
  if (data['sharing'] === 'Single ')
    mapped_data['variant_label'] = "SINGLE";
  if (data['sharing'] === 'Double ')
    mapped_data['variant_label'] = "DOUBLE";
  if (data['sharing'] === 'Triple ')
    mapped_data['variant_label'] = "TRIPLE";
  if (data['sharing'] === 'Quadruple ')
    mapped_data['variant_label'] = "QUAD";
  // if (data['min_budget'])
  //   mapped_data['min_price_range'] = data['min_budget'];
  if (data['max_budget'])
    mapped_data['max_budget'] = data['max_budget'];
  if (data['bhk'] === '1 RK ')
    mapped_data['variant_label'] = "1_ROOM_SET";
  if (data['bhk'] === '1 BHK ')
    mapped_data['variant_label'] = "1_BHK";
  if (data['bhk'] === '2 BHK ')
    mapped_data['variant_label'] = "2_BHK";
  if (data['bhk'] === '3 BHK ')
    mapped_data['variant_label'] = "3_BHK";
  if (data['bhk'] === '4 BHK ')
    mapped_data['variant_label'] = "4_BHK";
  if (data['bhk'] === '5 BHK ')
    mapped_data['variant_label'] = "5_BHK";
  if (data['bhk'] === '6 BHK ')
    mapped_data['variant_label'] = "6_BHK";
  if (data['floors'])
    mapped_data['num_floors'] = parseInt(data['floors']);
  if (data['location'])
    mapped_data['location'] = data['location'].trim();
  if (data['area'])
    mapped_data['area'] = data['area'].trim();
  return mapped_data;
}


// Search Bar

const residential_form = document.getElementById("residential_form");
const commercial_form = document.getElementById("commercial_form");
const residential_btn = document.getElementById("flat");
const commercial_btn = document.getElementById("pg");
$: virgin_bg = document.getElementsByClassName("radio-one");
$: preocc_bg = document.getElementsByClassName("radio-two");
function form_select() {
  if (residential_btn.checked) {
    
    residential_form_select();
    virgin_bg[0].classList.add("bg");
    preocc_bg[0].classList.remove("bg");
  } else {
    commercial_form_select();
    virgin_bg[0].classList.remove("bg");
    preocc_bg[0].classList.add("bg");

  }
}


//globally used code
function updateDropdownHeadings() {
  let r_dependent_btn = document.getElementById("r_dependent_btn");
  r_dependent_btn.innerHTML = `${this.innerHTML} <span class="caret">`;
}

function f_updateDropdownHeadings() {
  let f_dependent_btn = document.getElementById("f_dependent_btn");
  f_dependent_btn.innerHTML = `${this.innerHTML} <span class="caret">`;
}
const areas_btn = document.getElementById("areas_btn");
const r_location_btn = document.getElementById("r_location_btn");
const r_budget_btn = document.getElementById("r_budget_btn");
const min_budget_range = document.getElementById("myRangeMin");
const max_budget_range = document.getElementById("myRangeMax");

function residential_form_select() {
  residential_form.classList.remove("hide");
  commercial_form.classList.add("hide");

  const locations = document.querySelectorAll("#location");
  const areas = document.querySelectorAll("#areas");
  const budgets = document.querySelectorAll("#budget_option");


  const budget_apply_filter = document.querySelector("#budget_apply_filter");
  const budget_clear_filter = document.querySelector("#budget_clear_filter");


  // Updating Dropdown Headings, when an option is selected
  areas.forEach(area => {
    area.addEventListener("click", function() {
      areas_btn.innerHTML = `${this.innerHTML} <span class="caret">`;
      r_location_btn.innerHTML = `Location <span class="caret">`;
    });
  });
  locations.forEach(location => {
    location.addEventListener("click", function() {
      r_location_btn.innerHTML = `${this.innerHTML} <span class="caret">`;
    });
  });


  budget_apply_filter.addEventListener("click", () => {
    r_budget_btn.innerHTML = `Applied <span class="caret">`;
    budget_clear_filter.classList.remove("hide_budget_filter_options");
    budget_apply_filter.classList.add("hide_budget_filter_options");
  });

  budget_clear_filter.addEventListener("click", () => {
    r_budget_btn.innerHTML = `Budget <span class="caret">`;
    budget_clear_filter.classList.add("hide_budget_filter_options");
    budget_apply_filter.classList.remove("hide_budget_filter_options");
  });
  
}

function r_search_submit() {
  //Storing form data in variables
  let location, sharing, bhk, min_budget, max_budget, area;
  if (areas_btn.innerText.trim() === "Area") {
    area = null;
//	document.getElementById('type_error').innerHTML = 'Select The Type of The Property!';
//	return;
  } else {
    area = areas_btn.innerText;
  }
  if (r_location_btn.innerText.trim() === "Location") {
    location = null;
  } else {
    location = r_location_btn.innerText;
  }
  if (
    r_dependent_btn.innerText === "BHK " ||
    r_dependent_btn.innerText === "Sharing "
  ) {
    sharing = null;
    bhk = null;
  } else {
      bhk = r_dependent_btn.innerText;
      sharing = null;
}
 if (r_budget_btn.innerText == "Budget ") {
    min_budget = null;
	max_budget = null;
  } else {
    min_budget = min_budget_range.value;
    max_budget = max_budget_range.value;
	}
  //Sending Data Through post request
  const data = {
    property_type: "Flats", // 'residential' or 'commercial'
    location: location,
	area: area,
    sharing: sharing, // incase of PG, ex. dual, triple, quad
    bhk: bhk, // incase of flats, ex. 1,2,3,...
    min_budget: min_budget,
    max_budget: max_budget
  };

  function post(path, params, method = "post") {
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement("form");
    form.method = method;
    form.action = path;

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }
  mapped_data = map_search_params_to_backend_compatible_format(data);
  if (mapped_data['type'] == 3){
	post("/flatmate/search", mapped_data, "get");
  } else {
  post("/search", mapped_data, "get");
  }
}

const f_sub_type_btn = document.getElementById("f_sub_type_btn");
const f_location_btn = document.getElementById("f_location_btn");
const f_areas_btn = document.getElementById("f_areas_btn");
const f_budget_btn = document.getElementById("f_budget_btn");
const min_budget_range_1 = document.getElementById("myRangeMin1");
const max_budget_range_1 = document.getElementById("myRangeMax1");

function commercial_form_select() {
  commercial_form.classList.remove("hide");
  residential_form.classList.add("hide");
  const locations = document.querySelectorAll("#f_location");
  const areas = document.querySelectorAll("#f_areas");
  const budgets = document.querySelectorAll("#f_budget_option");

  const budget_apply_filter_pg = document.querySelector("#budget_apply_filter_pg");
  const budget_clear_filter_pg = document.querySelector("#budget_clear_filter_pg");

  locations.forEach(location => {
    location.addEventListener("click", function() {
      f_location_btn.innerHTML = `${this.innerHTML} <span class="caret">`;
    });
  });
  areas.forEach(area => {
    area.addEventListener("click", function() {
      f_areas_btn.innerHTML = `${this.innerHTML} <span class="caret">`;
      f_location_btn.innerHTML = `Location <span class="caret">`;
    });
  });
  

  budget_apply_filter_pg.addEventListener("click", () => {
    f_budget_btn.innerHTML = `Applied <span class="caret">`;
    budget_clear_filter_pg.classList.remove("hide_budget_filter_options");
    budget_apply_filter_pg.classList.add("hide_budget_filter_options");
  });

  budget_clear_filter_pg.addEventListener("click", () => {
    f_budget_btn.innerHTML = `Budget <span class="caret">`;
    budget_clear_filter_pg.classList.add("hide_budget_filter_options");
    budget_apply_filter_pg.classList.remove("hide_budget_filter_options");
  });

}

function f_search_submit() {
  //Storing form data in variables
  let location, sharing, min_budget, max_budget;

  if (f_areas_btn.innerText.trim() === "Area") {
    area = null;
  } else {
    area = f_areas_btn.innerText;
  }
  if (f_location_btn.innerText.trim() === "Location") {
    location = null;
  } else {
    location = f_location_btn.innerText;
  }
  if (f_dependent_btn.innerText === "Sharing ") {
    sharing = null;
  } else {
    sharing = f_dependent_btn.innerText;
  }
  if (f_budget_btn.innerText == "Budget ") {
    min_budget = null;
	max_budget = null;
  } else {
    min_budget = min_budget_range_1.value;
	max_budget = max_budget_range_1.value;
  }
  //Sending Data Through post request
  const data = {
    property_type: "PG", // 'residential' or 'commercial'
    location: location,
	area: area,
    sharing: sharing,
    min_budget: min_budget,
    max_budget: max_budget
  };

  function post(path, params, method = "post") {
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement("form");
    form.method = method;
    form.action = path;

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

  mapped_data = map_search_params_to_backend_compatible_format(data);
  post("/search", mapped_data, "get");
}

// Modal Code
// Modal activation
$(".delete-wishlist-property").on("click", function() {
	r = confirm("Do you really want to delete this property ?");
	if (r == true){
    id = $(this).attr('data-id');
    //console.log($(this));
    //console.log(id);
    removeFromWishlist(id);
	}
});
function removeFromWishlist(id, refresh) {
  //console.log("removing from wishlist:"+id);
  propertyId = id;
  url = '/customer/dashboard/wishlist';
  const data = {
    op: 'DELETE',
    property_id: propertyId
  };

  //AJAX REQUEST, PLEASE REVIEW
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(function(response) {
    console.log(response);
    if (response.redirected) {
      window.location.href = response.url;
    }
    if (response.status === 200){
      $('#wishlist-property-'+id).remove();
      //window.alert('Property Removed from wishlist');
      if(refresh)
      location.reload(true);
      return;
    }
    if (response.status === 403) {
      window.alert('First login to remove from wishlist.');
      //window.location.replace("https://www.houseitt.in/login/");
      return;
    }
    if (response.status === 409) {
    window.alert('Property already deleted or not in wishlist any longer.');
       return;
    }
  }, function(error) {
    console.log(error.message);
});
}
function addToWishlist(id, reload) {
  console.log("adding to wishlist:"+id);
  propertyId = id;
  url = '/customer/dashboard/wishlist';
  const data = {
    property_id: propertyId
  };

  //AJAX REQUEST, PLEASE REVIEW
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(function(response) {
    console.log(response);
    if (response.redirected) {
      window.location.href = response.url;
    }
    if (response.status === 200){
      $("#successPropertyModal").modal("show");
      if (reload){ setTimeout(wantToReload,5000);}
      return;
    }
    if (response.status === 403) {
      window.alert('First login to shortlist properties.');
       //window.location.replace("http://www.w3schools.com");
      return;
    }
    if (response.status === 409) {
      $("#failurePropertyModal").modal("show");
      return;
    }
	if (response.status === 500) {
	  window.alert('You are not logged in as customer');
	}
  }, function(error) {
    console.log(error.message);
});
}

function wantToReload()
{
location.reload(true);
}
// To Activate Failure Modal, use Code Below
//  $("#failurePropertyModal").modal("show");

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// ################## TO BE COMPLETED LATER

// AutoComplete

// const search = document.getElementById("search");
// const matchList = document.getElementById("match-list");

// //Searches Json and Filters it
// const searchStates = async searchText => {
//   const res = await fetch(
//     "https://gist.githubusercontent.com/bradtraversy/20dee7787486d10db3bd1f55fae5fdf4/raw/2c06c44dcea55ecbb6fbf20edfd240ec6373b688/state_capitals.json"
//   );
//   const data = await res.json();

//   //Get Matches

//   let matches = data.filter(location => {
//     const regex = new RegExp(`^${searchText}`, "gi"); // '^' means to start with, if we don't put '^' it will match any substring as well
//     return location.name.match(regex);
//   });

//   if (searchText.length === 0) {
//     matches = [];
//   }

//   outputHTML(matches);
// };

// const outputHTML = (matches) => {
//   if(matches.length>0){
//     const html = `

//     `
//   }
// }

// search.addEventListener("input", () => searchStates(search.value));

// toggle search bar
function toggle_search_bar(){
  search_bar = document.getElementById("search_forms");
  s_anim = document.getElementById("search-anim");
  banner = document.getElementById("banner");

  if (search_bar.classList.contains("search-hide"))
	{
		
		search_bar.classList.remove("search-hide");		
		search_bar.classList.add("search-show");
		banner.classList.add("my-banner-height-change");
		s_anim.classList.remove("fa-times-anim");
		s_anim.classList.add("fa-search-anim");
		s_anim.classList.remove("fa-search");
		s_anim.classList.add("fa-times");
	}
  else
	{
		search_bar.classList.remove("search-show");
		search_bar.classList.add("search-hide");
		banner.classList.remove("my-banner-height-change");
		s_anim.classList.remove("fa-search-anim");
		s_anim.classList.add("fa-times-anim");
		s_anim.classList.add("fa-search");
		s_anim.classList.remove("fa-times");

	}

}

// toggle search bar

// CODE FOR SUBMIT PROPERTY PAGE //
function pg_select(){
	$('#bathroom_option').hide();
	$('#bhk_option').hide();
	$('#balcony_option').hide();
	$('#floors').hide();
	$('#price').hide();
	$('#sharing_option').show();
	$('#pg_amenities').show();
	$('#flat_amenities').hide();
	$('.gender_opt').hide();
	$('#last_entry_field_id').show();
}

function flat_select(){
	$('#bathroom_option').show();
	$('#bhk_option').show();
	$('#balcony_option').show();
	$('#floors').show();
	$('#price').show();
	$('#sharing_option').hide();
	$('#pg_amenities').hide();
	$('#flat_amenities').show();
	$('.gender_opt').show();
	$('#last_entry_field_id').hide();
}

// CODE FOR SUBMIT PROPERTY PAGE //

// COPY LINK //

function copyLink(){
	linkdiv = document.getElementById("shareurl");
	linkdiv.style.display = "block";
	if(navigator.userAgent.match(/ipad|iphone/i))
	{
		range = document.createRange();
        range.selectNodeContents(linkdiv);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        linkdiv.setSelectionRange(0, 999999);
	}
	else{
	linkdiv.select();
		}
	document.execCommand('copy');
	linkdiv.style.display = "none";
	alert("copied");
}

// COPY LINK //

// SEARCH ON LOCATION CLICK //
function search_it(location){
	url = '/search/?location='+location;
	window.location.href = url;
}
function search_it_flat(location){
	url = '/search/?property_type=FLAT&location='+location;
	window.location.href = url;
}
function search_it_pg(location){
	url = '/search/?property_type=PG&location='+location;
	window.location.href = url;
}
// SEARCH ON LOCATION CLICK //


// NAVBAR ON SCROLL FIXED //

window.onscroll = function() {
onScrollFixed()
};
var navbar = document.getElementById("navbar-scroll");
var sticky = navbar.offsetTop;

function onScrollFixed() {
  if (window.pageYOffset >= 300) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// NAVBAR ON SCROLL FIXED //

// Slide Navbar
const slideMenuOverlay = document.getElementById("slide-menu-overlay");
const slideMenu = document.getElementById("slide-menu");
const documentBody = document.getElementById("body");


const openSlideMenu = () => {
  slideMenuOverlay.classList.add("slide-menu-overlay-activate");
  setTimeout(() => { slideMenu.style.transform = 'translateX(0)';}, 10);
  
  // documentBody.style.overflowY='hidden';
}

const closeSlideMenu = () => {
  slideMenu.style.transform = 'translateX(100%)';
  setTimeout(() => { slideMenuOverlay.classList.remove("slide-menu-overlay-activate");}, 400);
  documentBody.style.overflowY='visible';
}
