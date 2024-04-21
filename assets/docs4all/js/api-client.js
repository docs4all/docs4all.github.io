function ApiClient() {

  var apiBaseUrl = getLocationBasePath();
  var database = new loki('database.db');

  this.init = async () => {
    await this.loadDatabase();
  }
  this.loadDatabase = () => {
    console.log("Loading database");
    return new Promise(function (resolve, reject) {
      $.getJSON("./database.json", function (data) {
        database.loadJSONObject(data);
        resolve()
      }).fail(function () {
        console.log("An error has occurred.");
        reject();
      });
    });
  }

  this.findAll = () => {
    return new Promise(function (resolve, reject) {
      resolve(database.getCollection('documents').data);
    });
  };

  this.findDocumentByPath = (path) => {
    return new Promise(function (resolve, reject) {
      var query = [
        {
          "path": path
        }
      ]

      var documents = database.getCollection('documents');
      var results = documents.find({
        $and: query
      });
      resolve(results)
    });
  };

  this.findDocumentByText = (text) => {
    return new Promise(function (resolve, reject) {
      var queryCollection = [
        {
          "text": {
            "$regex": [text, "i"]
          }
        }
      ];
      var documents = database.getCollection('documents');
      var results = documents.find({
        $and: queryCollection
      });
      resolve(results);
    });
  };


  /**
  * Add a URL parameter
  * @param {string} url
  * @param {string} param the key to set
  * @param {string} value
  */
  function addParam(url, param, value) {
    param = encodeURIComponent(param);
    var a = document.createElement('a');
    param += (value ? "=" + encodeURIComponent(value) : "");
    a.href = url;
    a.search += (a.search ? "&" : "") + param;
    return a.href;
  }

  function getLocationBasePath() {

    if (typeof window === "undefined") {
      console.error("ReferenceError: window is not defined. Are you in frontend javascript layer?");
      return;
    }

    if (typeof window.location === "undefined") {
      console.error("ReferenceError: window.location is not defined. Are you in frontend javascript layer?");
      return;
    }

    if (window.location.port) {
      return window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
    } else {
      return window.location.protocol + "//" + window.location.hostname
    }
  }

}

if (typeof window._context === 'undefined') {
  window._context = {};
}
window._context["ApiClient"] = new ApiClient();
