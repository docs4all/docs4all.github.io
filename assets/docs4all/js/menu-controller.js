function MenuController() {

  var markdownConverter = window._context["MarkdownConverter"];
  var menuEnhancer = window._context["MenuEnhancer"];
  var menuHtmlGenerator = window._context["MenuHtmlGenerator"];
  var apiClient = window._context["ApiClient"];

  this.init = async () => {
    await this.createMenu();
    this.addListener();
    this.renderPageFromPath("/root.md")
  };

  this.addListener = () => {
    $('#menuContainer').on("click", this.menuItemOnclick);
    document.addEventListener("render-page", this.renderPageFromEvent);
  };

  this.createMenu = async () => {
    var documents = await apiClient.findAll();
    var enhancedMenu = menuEnhancer.plainLisToNestedList(documents);
    
    var menuString = menuHtmlGenerator.createComplexMenu(enhancedMenu);
    $("#menuContainer").append(menuString)

    const menuElement = document.getElementById('sidebar');
    const menu = new SlideMenu(menuElement, {
      position: "left",
      submenuLinkAfter: ' ⮞',
      backLinkBefore: '⮜ '
    });
    menu.open();
  };

  this.menuItemOnclick = (event) => {
    if (typeof event.target.getAttribute("page-path") === "undefined") {
      console.log(`menu does not have page-path attribute.`);
      return;
    }
    var documentPath = event.target.getAttribute("page-path");
    console.log(`Go to ${documentPath}`);
    event.preventDefault();

    // Create the event
    var event = new CustomEvent("render-page", {
      "detail": documentPath
    });

    // Dispatch/Trigger/Fire the event
    document.dispatchEvent(event);
  }

  this.renderPageFromEvent = (event) => {
    console.log("rendering page:"+event.detail);
    this.renderPageFromPath(event.detail);
  }

  this.renderPageFromPath = async (documentPath) => {
    if (typeof documentPath === "undefined") {
      console.log(`document path is undefined.`);
      return;
    }

    var document = await apiClient.findDocumentByPath(documentPath);
    if (typeof document === 'undefined' || document.length === 0 || typeof document[0].text === 'undefined') {
      return;
    }
    var html = markdownConverter.render(document[0].text);
    $("#rigthPreview").html(html);
  }

}

if (typeof window._context === 'undefined') {
  window._context = {};
}
window._context["MenuController"] = new MenuController();
