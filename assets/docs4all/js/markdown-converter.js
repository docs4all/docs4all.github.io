function MarkdownConverter(){

  this.apiClient = window._context["ApiClient"];

  var markdownConverter = window.markdownit({
    html: true
  });  

  this.render = (markdownString) => {
    for(var key in window._context["global_csr_variables"]){
      var regex = new RegExp(`{{${key}}}`, 'g');
      markdownString = markdownString.replace(regex, window._context["global_csr_variables"][key]);
    }
    return markdownConverter.render(markdownString)
  };
  
}

if(typeof window._context === 'undefined'){
   window._context = {};
}
window._context["MarkdownConverter"] =  new MarkdownConverter();
