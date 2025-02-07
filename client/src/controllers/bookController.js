// IMPORTER ICI

const bookController = {

    async search (req, res){
      try {
 
  
  
        res.render('search');
  
      } catch (error) {
    
        return next(error);
      }
    },
  
    }

    export default bookController