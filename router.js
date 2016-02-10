// import express module
var express = require('express');
// import mongoose module
var mongoose = require('mongoose');

module.exports = function(app){
    
    // content management system on /cms serve "cms" folder
    app.use('/cms', express.static('cms'));
    app.use('/page', express.static('public'));

    app.get('/', function(req, res){
       
        res.send({ name:'Franci' });
        
    });
    
    app.get('/products', function(req, res){
       
        var Product = mongoose.model('Product');
        
        Product.find(function(err, docs){
           
            res.send(docs);
            
        });
        
    });
  
    app.post('/product', function(req, res){
       
        var data = req.body;
        
        var Product = mongoose.model('Product');
        
        var myProduct = new Product(data);
        myProduct.save(function(err){
            
           if(err){
               console.log(err);
               res.sendStatus(400);
           }else{
            res.send(myProduct);
           }
            
        });
        
    });
    
    app.get('/api/projects', function(req, res){
       
        var Project = mongoose.model('Project');
        Project.find(function(err, docs){
           
            if(err){
                console.log(err);
                res.sendStatus(400);
            }else{
                res.send(docs);
            }
            
        });
        
    });
    
    app.delete('/api/project/:id', function(req, res){
        
        var id = req.params.id;
    
        var Project = mongoose.model('Project');
        
        Project.findByIdAndRemove(id, function(err, doc){
           
            if(!err){
                res.sendStatus(200);
            }else{
                res.sendStatus(400);
            }
            
        });
        
    });
    
    app.put('/api/project/:id', function(req, res){
       
        var id = req.params.id;
        
        var Project = mongoose.model('Project');
        
        Project.findByIdAndUpdate(id, req.body, function(err, doc){
           
            if(!err){
                res.send(doc);
            }else{
                console.log(err);
                res.sendStatus(400);
            }
            
        });
        
    });
    
    app.post('/api/project', function(req, res){
       
        var data = req.body;
        
        var Project = mongoose.model('Project');
        var project = new Project(data);
        
        project.save(function(err){
           
            if(err){
                console.log(err);
                res.sendStatus(400);
            }else{
                res.send(project);
            }
            
        });
        
    });
    
    app.get('/dynamic-page', function(req, res){
       
        // products refereces the products.ejs file in views folder
        // views is the default folder for .ejs templates
        // second parameter is an object with parameters you can use to render content in the template
        res.render('products', { products : myProducts });
        
    });
    
};