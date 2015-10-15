$('#project-list').
    masonry({ transitionDuration: 0, columnWidth: 260 }).
    css({visibility: 'visible'});
$('footer').css({visibility: 'visible'});

$('#search-query').on('change keyup paste input', function(event) {
    var query    = $.trim(event.target.value.toLowerCase());
    var projects = $('#project-list li');
    if (query == '') {
        projects.show();
    } else {
        projects.hide().filter('[data-search*="' + query + '"]').show();
    }
    $('#project-list .category').show().not(':has(li:visible)').hide();
    $('#project-list').masonry('layout');
});

$('#search-query').focus().change();
