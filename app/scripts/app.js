/*
 Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  app.sendData = function(){
    if(app.$.name.validate() &&
        app.$.surname.validate() &&
        app.$.contact.validate() &&
        app.$.about.validate()) {
      var data = {
        personalInfo: {
          name: app.$.name.value,
          surname: app.$.surname.value,
          contact: app.$.contact.value
        },
        about: app.$.about.value,
        picture: app.$.picture.file,
        sections: []
      };

      Polymer.dom().querySelectorAll('data-section').forEach(function (dataSection) {
        data.sections.push({
          dataId: dataSection.dataId,
          data: dataSection.getItems()
        });
      });

      var formData = new FormData();

      for (var field in data) {
        if (field !== 'picture') {
          formData.append(field, JSON.stringify(data[field]));
        } else {
          if(data[field]) {
            var fileName = data[field].name;
            fileName = Date.now() + '_' + fileName.replace(/ /g, '');
            formData.append(field, data[field], fileName);
          }
        }
      }

      var request = new XMLHttpRequest();
      request.open("POST", "http://foo.com/submitform.php");
      request.send(formData);
      this.$.successDialog.cancelAnimation();
      this.$.successDialog.open();
    }else{
      this.$.toast.show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

})(document);
