

/*$(document).on('ready', function() {
    var dayofYear = Cookies.get('roosterClick'); // Retriev cookie where user last clicked
    while (dayofYear >= 10) { 
            var dayofYear = dayofYear-10;
            workDays(dayofYear);
    }
    while (dayofYear <= 5000) {
        workDays(dayofYear);
        var dayofYear = dayofYear+10;
    }
});*/

var days = $("td:not(:empty):not(.wknr)");
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output = d.getFullYear() + '/' +
    ((''+month).length<2 ? '0' : '') + month + '/' +
    ((''+day).length<2 ? '0' : '') + day;


$(document).on('ready', function() {

    var dayofYear = localStorage.getItem("roosterKlik"); // get last clicked day
    //console.log(dayofYear);
    if (dayofYear !== null) {
      while (dayofYear >= 10) { 
              dayofYear = dayofYear-10;
              workDays(dayofYear);
      }
      while (dayofYear <= 5000) {
          workDays(dayofYear);
          dayofYear = dayofYear+10;
      }
      $('#lock').addClass('active')
    }

    // Jumps to current Month of the year
    var currentMonth = '#' + month + '-' + d.getFullYear()

    $('html, body').animate({
        scrollTop: $(currentMonth).offset().top
    }, 200);
});




var locked = localStorage.getItem("locked")
if (!locked) {
    days.on('click.rooster', function() {
    var dayofYear = days.index($(this));
    var realDay = dayofYear-20; //console.log("dayofYear <td> is: "+ realDay);
    /*Cookies.set('roosterClick', realDay); // Set cookie for the date clicked*/
    localStorage.setItem("roosterKlik", realDay);
        days.not(".feestdag").not(".hidden").removeClass();
        while (dayofYear >= 10) { 
                var dayofYear = dayofYear-10;
                workDays(dayofYear);
        }
        while (dayofYear <= 5000) {
            workDays(dayofYear);
            var dayofYear = dayofYear+10;
        }
    });   
}

// Feestdagen
// days.each(function() {
//     var dag = days.index($(this));
//     var overflow = +20;
//     if (dag == 1+overflow) { // Nieuwjaarsdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Nieuwjaarsdag"});
//     } else if (dag == 93+overflow) { // Goede vrijdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Goede vrijdag"});
//     } else if (dag == 95+overflow || dag == 96+overflow) { // 1e & 2e Paasdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Pasen"});
//     } else if (dag == 117+overflow) { // Koningsdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Koningsdag"});
//     } else if (dag == 125+overflow) { // Bevrijdingsdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Bevrijdingsdag"});
//     } else if (dag == 134+overflow) { // Hemelvaartsdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Hemelvaartsdag"});
//     } else if (dag == 144+overflow || dag == 145+overflow) { // 1e & 2e Pinksterdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Pinksteren"});
//     } else if (dag == 359+overflow || dag == 360+overflow) { // 1e & 2e Kerstdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Kerst"});
//     } else if (dag == 365+overflow) { // Oudjaarsdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Oudjaarsdag"});
//     } else if (dag == 366+overflow) { // Nieuwjaarsdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Nieuwjaarsdag"});
//     } else if (dag == 450+overflow) { // Goede vrijdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Goede vrijdag"});
//     } else if (dag == 452+overflow || dag == 453+overflow) { // 1e & 2e Paasdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Pasen"});
//     } else if (dag == 483+overflow) { // Koningsdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Koningsdag"});
//     } else if (dag == 491+overflow) { // Bevrijdingsdag 2015 & Hemelvaartsdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Bevrijdingsdag & Hemelvaartsdag"});
//     } else if (dag == 501+overflow || dag == 502+overflow) { // 1e & 2e Pinksterdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Pinksteren"});
//     } else if (dag == 725+overflow || dag == 726+overflow) { // 1e & 2e Kerstdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Kerst"});
//     } else if (dag == 731+overflow) { // Oudjaarsdag 2015
//         $(this).addClass("feestdag").attr({"data-toggle": "tooltip", "data-container": "body", "title": "Oudjaarsdag"});
//     }
// });

$(function () {
  $('[data-toggle="tooltip"]').tooltip({ delay: { hide: 200 }, placement: 'bottom' })
})

// Lock & Unlock roster creation
$("#lock").click(function(){
    days.off('click.rooster');
    $(this).addClass('active');
    $('#unlock').removeClass('active');
    localStorage.setItem("locked", true);
});


$('#unlock').click(function() {
    $('#lock').removeClass('active')
    days.on('click.rooster', function() {
        var dayofYear = days.index($(this))
        var realDay = dayofYear-20;
        localStorage.setItem('roosterKlik', realDay)
        days.not('.feestdag').not('.hidden').removeClass()
        while (dayofYear >= 10) {
            var dayofYear = dayofYear - 10
            workDays(dayofYear)
        }
        while (dayofYear <= 5000) {
            workDays(dayofYear)
            var dayofYear = dayofYear + 10
        }
        localStorage.setItem('locked', false)
    })
})

function workDays(dayofYear) {
    days.eq(dayofYear).addClass("ochtend").attr({"title": "Ochtenddienst"});
    days.eq(dayofYear+1).addClass("ochtend").attr({"title": "Ochtenddienst"});
    days.eq(dayofYear+2).addClass("avond").attr({"title": "Avonddienst"});
    days.eq(dayofYear+3).addClass("avond").attr({"title": "Avonddienst"});
    days.eq(dayofYear+4).addClass("nacht").attr({"title": "Nachtdienst"});
    days.eq(dayofYear+5).addClass("nacht").attr({"title": "Nachtdienst"});
    days.eq(dayofYear+6).removeClass;
    days.eq(dayofYear+7).removeClass;
    days.eq(dayofYear+8).removeClass;
    days.eq(dayofYear+9).removeClass;
}