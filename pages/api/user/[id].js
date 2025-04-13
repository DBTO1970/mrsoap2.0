/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'

connectDB()


export default async (req, res) => {
    switch(req.method) {
        case "PATCH":
            await updateRole(req, res);
            break;
        case "PATCH":
            await updatePassword(req, res);
            break;
        case "DELETE":
            await deleteUser(req, res)
            break;
    }
}

const updateRole = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin' || !result.root)
        return res.status(500).json({err: 'Authentication not valid'})

        const {id} = req.query
        const {role} = req.body

        await Users.findOneAndUpdate({_id: id}, {role})
        res.json({msg: 'Update Success!'})


    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

// const updatePassword = async (req, res) => {
//     try {
//         const result = await auth(req, res)
//         if(result.role !== 'admin' || !result.root)
//         return res.status(500).json({err: 'Authentication not valid'})

//         const {id} = req.query
//         const {password} = req.body

//         await Users.findOneAndUpdate({_id: id}, {password})
//         res.json({msg: 'Update Success!'})


//     } catch (err) {
//         return res.status(500).json({err: err.message})
//     }
// }



const deleteUser = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin' || !result.root)
        return res.status(500).json({err: 'Authentication not valid'})

        const {id} = req.query

        await Users.findByIdAndDelete(id)
        res.json({msg: 'Deleted Success!'})


    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}