
   const HTTP_METHODS = {
    get: 'GET',
    post: 'POST',
  };
  
   const STATUS_CODES = {
    code200: 200,
    code201: 201,
    code400: 400,
    code500: 500,
  };

   const HEADERS = {
    'Content-Type': 'application/json',
    'accept': 'application/json'
};
  
module.exports =  {
    STATUS_CODES,
    HTTP_METHODS,
    HEADERS
  };