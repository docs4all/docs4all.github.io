function SearchController() {

  var apiClient = window._context["ApiClient"];
  var menuController = window._context["MenuController"];

  var searchInput;

  this.init = async () => {
    searchInput = $('#search_input');
    searchInput.keyup(this.onKeyUp);

    searchButton = $('#search-button');
    searchButton.on('click',this.onSearchButtonClick);
  };

  this.onSearchButtonClick = async (ev) => {
    searchInput.val("");
    var resultsContainer = $('#search-modal-results-container');
    resultsContainer.empty();
    $("#search-modal").modal('show');
  }  

  this.onResultRowClick = async (ev) => {
    var documentPath = ev.currentTarget.getAttribute("path");
    await menuController.renderPageFromPath(documentPath);
    $("#search-modal").modal('hide');
  }

  this.onKeyUp = async (ev) => {
    var textToSearch = searchInput.val();
    
    if(textToSearch.length <3){
      return
    }
   
    var results = await apiClient.findDocumentByText(textToSearch);

    if(results.length == 0){
      return
    }

    var content = '<table id="search_results_table" style="width: 100%; display: inline-table" >'
    for(i=0; i<results.length; i++){
      if(results[i].path=="/root.md") continue;
      var title = results[i].title || results[i].path
      content += `<tr style="cursor: pointer;border-bottom: 1pt solid #b3b3b3;" path="${results[i].path}" ><td> ${title} </td></tr>`;
    }
    content += "</table>"

    var resultsContainer = $('#search-modal-results-container');
    resultsContainer.empty();
    resultsContainer.append(content);

    $('#search_results_table').on('click', 'tr', this.onResultRowClick);
  }

}

if (typeof window._context === 'undefined') {
  window._context = {};
}
window._context["SearchController"] = new SearchController();
