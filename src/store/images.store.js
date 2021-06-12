import { getImages, createImage, deleteImage } from "../services";

// State object
const state = {
    images: []
}


// Getter functions
const getters = {
    getAllImages(state) {
        return state.images
    }
}


// Actions 
const actions = {
    async getTotalImages({commit}, query){
        try{
            const images = await getImages(query)
            if(images.data){
                const allImages = Array.isArray(images.data) ? images.data : images.data.data
                commit('set_images', allImages)
                return images.data
            }
        }catch(error){
            throw error.response.data.message
        }
    },
    async createNewImage({commit}, payload){
        try{
            const image = await createImage(payload)
            if(image.data){
                commit('set_images', image.data)
                return image.data.data
            }
        }catch(error){
            throw error.response.data.message
        }
    },
    async deleteOneImage({commit}, id){
        try{
            await deleteImage(id)
            commit('removeImage', id)
        }catch(error){
            throw error.response.data.message
        }
    }
}

// Mutations
const mutations = {
    set_images(state, images){
        if(Array.isArray(images)){
            state.images = images
        }else{
            state.images.unshift(images)
        }
    },
    removeImage(state, id){
        const index = state.images.findIndex((image) => image.id == id);
        if (index > -1) {
            state.images.splice(index, 1);
        }
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}