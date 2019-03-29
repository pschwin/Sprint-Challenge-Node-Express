const express = require ('express');
const actionDB = require ('../../data/helpers/actionModel.js');
const router = express.Router();

router.get('/', async (req, res) =>{
    try{
        const actions = await actionDB.get(req.query);
        res.status(200).json(actions);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Error retrieving actions '})
    }
})

router.get('/:id', async (req, res) =>{
    try{
        const action = await actionDB.get(req.params.id);
        if(action){
            res.status(200).json(action);
        }else{
            res.status(404).json({message: 'Action not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving action',
        });
    }
});

router.post('/', async (req, res) =>{
    try{
        const action = await actionDB.insert(req.body);
        res.status(201).json(action);
    }catch(error){
        res.status(500).json({
            message: "Error adding action",
        })
    }
})

router.delete('/"id', async(req, res) =>{
    try{
        const count = await actionDB.remove(req.params.id);
        if (count > 0){
            res.status(200).json({message: `Action Deleted`})
        }else{
            res.status(404).json({message: `Couldn't find the action`})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: `Error removing the action`
        })
    }
})

router.put('/:id', async(req, res) =>{
    try{
        const action = await actionDB.update(req.params.id, req.body);
        if(action){
            res.status(200).json(action);
        }else{
            res.status(404).json({message: `action couldn't be found`})
        }
    }catch(error){
         console.log(error);
         res.status(500).json({
             message: `Error updating action`
         })   
    }
})


module.exports = router;