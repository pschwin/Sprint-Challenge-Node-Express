const express = require ('express');
const projectDB = require ('../../data/helpers/projectModel');
const router = express.Router();

router.get('/', async (req, res) =>{
    try{
        const projects = await projectDB.get(req.params.query);
        res.status(200).json(projects);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Error retrieving projects '})
    }
})

router.get('/:id', async (req, res) =>{
    try{
        const project = await projectDB.get(req.params.id);
        if(project){
            res.status(200).json(project);
        }else{
            res.status(404).json({message: 'Project not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving project',
        });
    }
});

router.post('/', async (req, res) =>{
    try{
        const project = await projectDB.insert(req.body);
        res.status(201).json(project);
    }catch(error){
        res.status(500).json({
            message: "Error adding project",
        })
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        const count = await projectDB.remove(req.params.id);
        if (count > 0){
            res.status(200).json({message: `Project Deleted`})
        }else{
            res.status(404).json({message: `Couldn't find the project`})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: `Error removing the project`
        })
    }
})

router.put('/:id', async(req, res) =>{
    try{
        const project = await projectDB.update(req.params.id, req.body);
        if(project){
            res.status(200).json(project);
        }else{
            res.status(404).json({message: `Project couldn't be found`})
        }
    }catch(error){
         console.log(error);
         res.status(500).json({
             message: `Error updating project`
         })   
    }
})

//Get Project Actions //Sub-Route
router.get('/actions/:id', async(req,res) =>{
    try{
        const response = await projectDB.getProjectActions(req.params.id)
        if(response && response.length > 0){
            res.status(200).json(response)
        }else{
            res.status(404).json({message: 'No actions for this project'})
        }
    }catch(error){
        res.status(500).json({errorMessage: `Error retrieving actions for the project`})
    }
})


module.exports = router;