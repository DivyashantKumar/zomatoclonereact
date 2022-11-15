const reqFulfil = function (config) {
   const updatedHeader = {
      ...config,headers:{...config.headers,
                         'token':sessionStorage.getItem('token')}}
                         console.log("UpdatedHeaader")
                         console.log(updatedHeader);
   return {
      ...updatedHeader
   }
}

const reqFulfilWithoutToken = function(config){
   return {
      ...config
   }
}

const reqError = function (error) {
   console.log("reqErr");
   return Promise.reject(error);
}

const resFulfil = function (response) {
   return {
       ...response
   };
}

const resError = function (error) {
   return Promise.reject();
}

export {
   reqFulfil,
   reqError,
   resFulfil,
   resError,
   reqFulfilWithoutToken
}
