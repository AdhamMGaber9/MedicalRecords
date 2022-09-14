// module.exports = {
//   get: (req, res) => {
//     res.send("Hello");
//   },
//   post: (req, res) => {
//     //something
//   },
// };

const Drug = require("../models/Drug") 
module.exports = {
  getdrug: async (req, res) => {
    try {
      const searchField= req.query.drug
    const drugs = await  Drug.find({drug: {$regex: searchField, $options: '$i'}})
    if(!drugs){
      return res.status(404).json({nodrugsfound: 'No drugs found' })

    }
    res.json(drugs)
         
    } catch (error) {
      res.json(error)  
    }}
}