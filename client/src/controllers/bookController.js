// IMPORTER ICI
import sanitize from 'sanitize-html';

const bookController = {

    async search (req, res){
      try {
 
  
        res.render('search')
  
        
      } catch (error) {
        return next(error);
      }
    },
    async handleSearch(req, res){
      try {
        const searchInput = sanitize(req.body.query);
        const dangersearchInput = req.body.query
        console.log(req.body.query)
        console.log(searchInput)
        
        res.render('search', {searchInput, dangersearchInput});
      } catch (error) {
        return next(error);
      }
    }
  
    }

    export default bookController