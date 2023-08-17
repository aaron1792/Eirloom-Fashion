import Commerce from "@chec/commerce.js";



const checkAPIKey = process.env.REACT_APP_CHEC_PUBLIC_KRY
const devEnvironment = process.env.NODE_ENV === 'development'


const commerceConfig = {

axiosConfig:{


headers:{

'X-Chec-Agent': 'commerce.js/v2',
'Chec-version': '2021-09-29'

},

},


}

if(devEnvironment && !checkAPIKey){

throw Error ('Error')

}
//eslint-disable-next-line
export default new Commerce(

checkAPIKey,
devEnvironment,
commerceConfig


)