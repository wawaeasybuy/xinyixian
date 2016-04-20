/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Category = require('../api/category/category.model');
var ImageGroup = require('../api/image-group/image-group.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'xinyixian'
  }, function() {
      console.log('finished populating admin');
      User.create({
        provider: 'local',
        role: 'user',
        name: 'tourist',
        email: 'tourist@tourist.com',
        password: 'tourist'
      },function(){
        console.log('finished populating user');
        Category.find({}).remove(function(){
          Category.create({
            // sign:'1',//分类的标志,默认分类为1
            name:'默认分类',//分类名
            tags:[],
            createDate:new Date()
          },function(){
            console.log('finished populating defalut category');
          });
        });
        ImageGroup.find({}).remove(function(){
          ImageGroup.create({
            // sign:'1',//分类组的标志,默认分类为1
            name:'默认分组',//分类组名
            images:[],
            createDate:new Date()
          },function(){
            console.log('finished populating defalut image-group');
          });
        });
      });
      
  });
});
