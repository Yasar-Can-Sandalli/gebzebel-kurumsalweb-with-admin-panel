
(function($){
    $("#search").on("keyup",function(){
		$("#search_row").show();
		var val = $(this).val();
		var hiddenValue = $("#type").val(); // Değişiklik burada
		/*console.log(val.length)*/
		if(val.length>1){
			/*find('div').removeClass('search_passive').addClass('search_active')*/
			$.post( "theme/kbb/ajax/search.php", { search: $(this).val(), type: hiddenValue } ) // Değişiklik burada
				.done(function( data ) {
					
				$("#search_row").html(data);
				
			});

		
		}else{
			$("#search_row").html("");
			}
    });
	$("#search").on("focusout",function(){
		
		 setTimeout(function() { $('#search_row').hide() }, 500);
		});
		
		
		$("#search").on("focus",function(){
		    $("#search_row").show();
			var hiddenValue = $("#type").val();
              $.post( "theme/kbb/ajax/search.php", { search: $(this).val(), type: hiddenValue } ) // Değişiklik burada
                .done(function( data ) {
                    $("#search_row").html(data);
                });
		});
	
})(jQuery);









 get_weather()
    function get_weather(city) {
        if(city==null){
            city = "KOCAELI";
        }
        var request = $.ajax({
            url: "https://api.gazisoft.com/services.php?service=hava&city="+city,
            method: "POST",
            dataType: "JSON"
        });

        request.done(function( response ) {
            $("#weather .w_title").html(response.title)
            $("#weather .w_icon img").attr("src",response.icon)
            $("#weather .w_temp").html(response.temperature)
          
        });
        request.always(function () {
            $("#hava_durumu .module_select select").prop("disabled", false);
            $("#hava_durumu .module_loading").hide();

        })

    }
	
	
	
	
	// Sayfadaki tüm dış bağlantıları seçer ve onlara "_blank" özelliğini atar
    document.addEventListener('DOMContentLoaded', function() {
      var externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

      externalLinks.forEach(function(link) {
        link.setAttribute('target', '_blank');
      });
    });

if ($('[data-fancybox="gallery1"]').length > 0) {

    $('[data-fancybox="gallery1"]').fancybox({
        buttons: [
            'download',
            'thumbs',
            'close'
        ]
    });
}
if ($('#color-calendar').length > 0) {

   
if ($('#color-calendar').length > 0) {
    $.get("panel/api/?case=events_all&limitStart=0&limitOffset=20&orderBy=activity_date")
        .done(function(data) {
            empty_events_html = "";
            for (let i = 0; i < Math.min(3, data.length); i++) {
                const event = data[i];
                empty_events_html += `
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <a href="${event.item_url}" class="event-item" style="height: 377px;">
                            <img src="${event.image}" alt="${event.title}" style="width:100%; height: 180px;">
                            <div class="date featured">
                                <p class="category-name">${event.category_name}</p>
                                <div class="day">
                                    <p>${event.dateDay}</p>
                                </div>
                                <div class="restOfDate">
                                    <p>${event.dateMonth} ${event.dateYear}</p>
                                    <span>${event.dateDayName}</span>
                                </div>
                            </div>
                            <div class="title">
                                <h6 style="height: 70px;">${event.title}</h6>
                            </div>
                            <div class="timeLocation">
                                <p><i class="uil uil-clock"></i>${event.dateOclock}</p>
                                <p><i class="uil uil-map-marker"></i>${event.locationName}</p>
                            </div>
                        </a>
                    </div>`;
            }

            // Kalan etkinlikler için mycalendar'ı ayarla
            mycalendar = new Calendar({
                id: '#color-calendar',
                calendarSize: 'large',
                theme: 'glass',
                primaryColor: '#FF6E35',
                headerBackgroundColor: '#FF6E35',
                dateChanged: (currentDate, events) => {
                    const events_display = document.querySelector('.events-display');
                    let events_html = '';
                    events.forEach(event => {
                        events_html += `
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                <a href="${event.item_url}" class="event-item" style="height: 377px;">
                                    <img src="${event.image}" alt="${event.title}" style="width:100%; height: 180px;">
                                    <div class="date featured">
                                        <p class="category-name">${event.category_name}</p>
                                        <div class="day">
                                            <p>${event.dateDay}</p>
                                        </div>
                                        <div class="restOfDate">
                                            <p>${event.dateMonth} ${event.dateYear}</p>
                                            <span>${event.dateDayName}</span>
                                        </div>
                                    </div>
                                    <div class="title">
                                        <h6 style="height: 70px;">${event.title}</h6>
                                    </div>
                                    <div class="timeLocation">
                                        <p><i class="uil uil-clock"></i>${event.dateOclock}</p>
                                        <p><i class="uil uil-map-marker"></i>${event.locationName}</p>
                                    </div>
                                </a>
                            </div>`;
                    });
                    if (events_html) {
                        events_display.innerHTML = events_html;
                    } else {
                        events_display.innerHTML = empty_events_html;
                    }
                }
            });

            // İlk 3 etkinliği göstermek için setEventsData metodunu kullanma
            mycalendar.setEventsData(data.slice(0, 3));
        });
}

   
   
}


function popup(mylink, windowname)
{
if (! window.focus)return true;
var href;
if (typeof(mylink) == 'string')
   href=mylink;
else
   href=mylink.href;
window.open(href, windowname, 'width=550,height=650,scrollbars=yes');
return false;
}
