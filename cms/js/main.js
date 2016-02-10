var selectedProject;


$.get('/api/projects', function(projects){
    
    console.log(projects);
    
    for(var i=0;i<projects.length;i++){
        
        var project = projects[i];
        
        renderProjectRow(project);
        
    }

});


// GET POST PUT DELETE
function renderProjectRow(project){
    
    var $tr = $('<tr>');
    var $td1 = $('<td>', { text : project.title });
    var $td2 = $('<td>', { text : project.postedOnDate });
    var $td3 = $('<td>');

    var $deleteButton = $('<div>', { text:'Delete', class:'btn btn-xs btn-danger', id:project._id });
    var $editButton = $('<div>', { text:'Edit', class:'btn btn-xs btn-warning' });
    var $publishButton = $('<div>', { text:'Publish', class:'btn btn-xs btn-success' });

    $deleteButton.on('click', function(){
       
        var id = $(this).attr('id');
        var c = confirm('Are you sure?');
        
        if(c){
            // trigger a DELETE request to /api/project/:id
            $.ajax({
                type:'DELETE',
                url:'/api/project/'+id,
                success:function(){
                    $tr.remove();
                }
            });
        }
    });
    
    $editButton.on('click', function(){
        
        selectedProject = project;
        
        var $title = $('#title-input');
        var $descr = $('#descr-input');
        
        $title.val(project.title);
        $descr.val(project.description);
        
        $('#project-modal').modal('show');
        
    });

    $td3.append($deleteButton,' ', $editButton,' ', $publishButton);

    $tr.append($td1, $td2, $td3);

    $('#projects-body').append($tr);
    
}

$('#add-new-button').on('click', function(){
   
    $('#project-modal').modal('show');
    
});

// When user presses on create button in the modal
$('#confirm-button').on('click', function(){
    
    var $title = $('#title-input');
    var $descr = $('#descr-input');
    
    var titleValue = $title.val();
    var descrValue = $descr.val();
    
    var projectData = {
        title : titleValue,
        description : descrValue
    };
    
    if(selectedProject){
        
        $.ajax({
                type:'PUT',
                data:projectData,
                url:'/api/project/'+selectedProject._id,
                success:function(){
                    
                }
            });
        
        selectedProject = null;
        $('#project-modal').modal('hide');
        
    }else{
        
        // /api/project
        $.post('/api/project', projectData, function(project){

            console.log('Project created');
            console.log(project);
            renderProjectRow(project);

        });
        
    }
    
    $title.val('');
    $descr.val('');
    
    $('#project-modal').modal('hide')
    
});











