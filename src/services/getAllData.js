

 const getAllData = (url) => {
   return fetch(url).then(r=>r.json())

}

export default getAllData

