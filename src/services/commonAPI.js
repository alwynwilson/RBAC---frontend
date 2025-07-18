import axios from 'axios'

const commonAPI = async (httpMethod,url,reqBody,reqHeader)=>{

    const reConfig = {
        method:httpMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{
            "Content-Type": "application/json"
        }
    }
    return await axios(reConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}

export default commonAPI