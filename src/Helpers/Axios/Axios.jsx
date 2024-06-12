import axios from 'axios';

export const apiUrl = 'https://graph.microsoft.com/v1.0/sites/chandrudemo.sharepoint.com,0b524a9d-7772-403f-b9dc-0523817f54b5,11b98042-696b-42e9-8a86-f1f4a032aaf4/'



async function Axios(url = "", method, data, token, file) {

    try {
        // //console.log("token", token);
        const headers = {}
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
            // headers['Content-Type'] = 'application/json'
            // headers['Access-Control-Allow-Origin'] = "*"
        }
        if (file) {
            // headers['Authorization'] = `Bearer ${token}`
            headers['Content-Type'] = 'multipart/form-data'
        }
        else {
            headers['Content-Type'] = 'application/json'
            // headers['Access-Control-Allow-Origin'] = "*"
            // headers['Accept'] = "*"
        }
        const response = await axios.request({
            method: method,
            url: apiUrl + url,
            data: data,
            headers: headers
        });
        console.log("Axios response", response);
        return response;
    } catch (error) {
        console.warn("Axios Error", error);
        if (error?.response?.status === 401) {
            //console.log("Authorizated");
            // document.cookie = `bearerToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        return error;
    }
}
export default Axios


