function resizeMasonryItem(item){
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  var grid = document.querySelector('#project-list'),
      rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
      rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

  /*
   * Spanning for any brick = S
   * Grid's row-gap = G
   * Size of grid's implicitly create row-track = R
   * Height of item content = H
   * Net height of the item = H1 = H + G
   * Net height of the implicit row-track = T = G + R
   * S = H1 / T
   */
  var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

  /* Set the spanning as calculated above (S) */
  item.style.gridRowEnd = 'span '+rowSpan;
}

function resizeAllMasonryItems(){
  // Get all item class objects in one list
  var allItems = document.querySelectorAll('#project-list > .category');

  /*
   * Loop through the above list and execute the spanning function to
   * each list-item (i.e. each masonry item)
   */
  for(var i=0;i<allItems.length;i++){
    resizeMasonryItem(allItems[i]);
  }

  document.querySelector('#project-list').style.visibility = 'visible';
}

var masonryEvents = ['load', 'resize'];
masonryEvents.forEach( function(event) {
  window.addEventListener(event, resizeAllMasonryItems);
} );

function applySearch(rawQuery){
  var query = rawQuery.toLowerCase().trim();
   
  var categories = document.querySelectorAll('#project-list > .category');
  var seenCategories = [];
  var projects = document.querySelectorAll('#project-list li');

  for(var i=0; i<projects.length;i++){
    var project = projects[i];
    if (project.dataset.search.indexOf(query) == -1) {
      project.style.display = 'none';
    } else {
      var projectCategory = project.parentNode.parentNode.parentNode;
      projectCategory.style.display = '';
      project.style.display = '';
      seenCategories.push(projectCategory);
    }
  }

  for(var i=0; i<categories.length;i++){
    var category = categories[i];
    if(seenCategories.indexOf(category) == -1){
      category.style.display = 'none';
    }
  }
}

var searchEvents = ['change', 'keyup', 'paste', 'input'];
searchQuery = document.querySelector('#search-query');
searchEvents.forEach(function(event){
  searchQuery.addEventListener(event, function(event){ applySearch(event.target.value) });
});

window.addEventListener('load', function(){
  applySearch(searchQuery.value);
});
