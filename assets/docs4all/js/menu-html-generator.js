function MenuHtmlGenerator(){

  this.menuWithoutChildrenTemplate = `
  <li><a page-path="@path" href="#">@name</a></li>
  `

  this.menuWithChildrenTemplate = `
  <li><a page-path="@path" href="#">@name</a>
    <ul>
      @children
    </ul>
  </li>
  `

 function anidateChildren(menuItemsData, parentItem){

    if(typeof parentItem.children === 'undefined'){
      parentItem.children = [];
    }

    menuItemsData.forEach(function(menuItem){
      if(parentItem.id == menuItem.parent){
        parentItem.children.push(menuItem);
        parentItem.children.sort(sortArrayByFieldOrder)
        if(menuItem.type == 'node'){
          anidateChildren(menuItemsData,menuItem);
        }
      }
    });
  };

  function sortArrayByFieldOrder(a,b){
    return (a.order > b.order) ? 1 : (a.order < b.order) ? -1 : 0;
  }

  this.createComplexMenu = (menuItems) => {
    var menuAsString = "";
    menuItems.forEach((menuItem)=>{
      var menuItemString;
      if(typeof menuItem.children === 'undefined' || menuItem.children.length == 0){
        menuItemString = this.menuWithoutChildrenTemplate.
        replace("@name",(menuItem.title ? menuItem.title : menuItem.name )).
        replace("@path",menuItem.path);
      }else{
        var childrenAsString = this.createComplexMenu(menuItem.children);
        menuItemString = this.menuWithChildrenTemplate.
        replace("@name",(menuItem.title ? menuItem.title : menuItem.name )).
        replace("@path",menuItem.path).
        replace("@children",childrenAsString);
      }
      menuAsString =  menuAsString + "\n" + menuItemString;
    });

    return menuAsString;
  }

}

if(typeof window._context === 'undefined'){
   window._context = {};
}
window._context["MenuHtmlGenerator"] = new MenuHtmlGenerator();
