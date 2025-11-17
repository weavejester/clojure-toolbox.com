$('#project-list').
    masonry({ transitionDuration: 0, columnWidth: 260 }).
    css({visibility: 'visible'});
$('footer').css({visibility: 'visible'});

function debounce(f, wait){
  var timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => f(...args), wait)
  };
};

function filterProjectsBySearch(query){
    var projects = $('#project-list li');
    if (query == '') {
        projects.show();
    } else {
        projects.hide().filter('[data-search*="' + query + '"]').show();
    }
    $('#project-list .category').show().not(':has(li:visible)').hide();
    $('#project-list').masonry('layout');
}

var debouncedSearch = debounce(filterProjectsBySearch, 100);

$('#search-query').on('change keyup paste input', function(event) {
    var query = $.trim(event.target.value.toLowerCase());
    debouncedSearch(query)
});

$('#search-query').focus().change();
