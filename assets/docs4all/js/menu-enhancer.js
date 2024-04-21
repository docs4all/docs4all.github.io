function MenuEnhancer(){

 function anidateChildren(menuItemsData, parentItem){

    if(typeof parentItem.children === 'undefined'){
      parentItem.children = [];
    }

    menuItemsData.forEach(function(menuItem){
      delete menuItem.$loki
      delete menuItem.meta
      delete menuItem.content
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

  this.plainLisToNestedList = (  menuItemsData ) => {

    var rootMenu = [];

    menuItemsData.forEach(function(menuItem){
      if(typeof menuItem.parent === 'undefined'){
        if(menuItem.path!="/root.md"){
          rootMenu.push(menuItem);
        }
      }
    });

    rootMenu.sort(sortArrayByFieldOrder);
    
    rootMenu.forEach(function(menuItem){
      anidateChildren(menuItemsData,menuItem);
    });

    return rootMenu;
  }

}

if(typeof window._context === 'undefined'){
   window._context = {};
}
window._context["MenuEnhancer"] = new MenuEnhancer();
