export default function getUsers(req, usersList){
    //Answer query for specific User ID
    if (req.params.id) {
        console.log(`${req.connection.remoteAddress} requested user ID ${req.params.id}`)
        return usersList.filter((e)=>{return e.id == req.params.id})
    } else {
        console.log(`${req.connection.remoteAddress} requested users list`)
        return usersList.filter((e)=>{return e.active})
    }
}