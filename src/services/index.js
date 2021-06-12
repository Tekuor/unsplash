import httpClient from './httpClient';

async function getImages(query){
    return await httpClient.get('images', { params:query})
}

async function createImage(payload){
    return await httpClient.post('images',payload)
}

async function deleteImage(payload){
    return await httpClient.delete(`images/${payload}`)
}

export {
    getImages,
    createImage,
    deleteImage
}