<template>
<div>
  <b-loading v-if="loading" :is-full-page="false" v-model="loading" :can-cancel="false"></b-loading>
  <div v-else>
   <masonry
      :gutter="{ default: '30px', 700: '15px' }"
      :cols="{ default: 3, 1000: 3, 700: 2, 500: 1 }"
      v-if="items.length"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="mt-2 mb-2"
        color="blue lighten-3"
      >
        <div class="container" @mouseover="hoverImg(item.id)" @mouseleave="hoveredId = ''">
          <img id="con" :src="item.url" />
          <b-button @click="showDeleteModal(item.id)" v-if="hoveredId === item.id" class="delete-btn" type="is-danger" outlined>delete</b-button>
          <div class="label" v-if="hoveredId === item.id">{{item.label}}</div>
        </div>
      </div>
    </masonry>

    <div v-else class="noImages">No Images Available</div>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'HelloWorld',
  props: {
    filter: String
  },
  mounted(){
    this.getAllImages()
  },
  data(){
    return{
      hoveredId:"",
      password: "",
      deleteModalActive: false,
      loading: false
    }
  },
  methods:{
    ...mapActions("Images", ["getTotalImages", "deleteOneImage"]),
    hoverImg(id){
      this.hoveredId = id
    },
    async showDeleteModal(id){
      this.$buefy.dialog.confirm({
        title: 'Deleting image',
        message: 'Are you sure you want to <b>delete</b> the image?',
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteImage(id)
      })
    },
    async getAllImages(){
      try{
        this.loading = true
        await this.getTotalImages({})
      }catch(e){
        console.log(e)
      }finally{
        this.loading = false
      }
    },
    async deleteImage(id){
      await this.deleteOneImage(id)
      this.deleteModalActive = true
    }
  },
  computed:{
    items(){
      const images = this.$store.getters['Images/getAllImages']
      if(this.filter){
        const result = images.filter(image => image.label.toLowerCase() == this.filter.toLowerCase())
        return result;
      }
      return images
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #con {
    border-radius: 16px;
  }

.label {
  position: absolute;
  bottom: 8px;
  left: 16px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #FFFFFF;
  word-wrap: break-word;
  width: 289.53px;
  margin-bottom: 10px;
}

.container {
  position: relative;
}

.delete-btn{
  position: absolute;
  top: 8px;
  right: 16px;
  width: 63px;
  height: 23px;
  border-radius: 38px;
}

.card {
  width: 620px;
  height: 276.12px;
  background: #FFFFFF;
  border-radius: 12px;
}

.headingText {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #333333;
}

.noImages {
  color: #3DB46D;
  text-align: center;
  padding-top: 150px;
  font-size: 25px;
}
</style>
