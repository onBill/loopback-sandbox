module.exports = function(app) {
  var Foo = app.models.Foo;

  // set validation
  Foo.validatesLengthOf('name', {min: 5});

  // adding entries with short names is not possible:
  Foo.create({name: 'One'}, function(err, foo) {
    console.log(err); // shows that it fails
  });

  // create one valid instance
  Foo.create({name: 'Two long'}, function(err, foo) {
    // create a valid entry
    if ( ! err) {
      // update that entry to an invalid value
      Foo.updateAll({id: foo.id}, {name:'Two'}, function(err, foo){
        // no validation happens
        if ( ! err) {
          Foo.find(function(err, foos){
            // shows the invalid item
            console.log(foos);
          });
        }
      });
    }
  });
};
