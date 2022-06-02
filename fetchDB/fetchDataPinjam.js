const URI = 'http://192.168.43.181:8000';
export default{
    async fetchDataPinjam(){
        try{
            let response = await fetch(URI + '/api/pinjams');
            let responseJsonData = await response.json();
            return responseJsonData;
        } catch(e) {
            console.log(e);
        }
    }
}


