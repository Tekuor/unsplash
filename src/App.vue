<template>
  <div class="mx-6">
    <div class="columns mt-4">
      <span class="column is-2">
        <img src="@/assets/my_unsplash_logo.svg"/>
      </span>

      <span class="column is-3">
        <b-field>
        <b-input placeholder="Search by name"
          type="search"
          icon="magnify"
          v-model="filter">
        </b-input>
        </b-field>
      </span>

      <span class="column is-7">
        <b-button id="photo-button" type="is-primary" class="is-pulled-right" @click="photoModalActive = true">Add a photo</b-button>
      </span>
    </div>
    <HelloWorld :filter="filter"/>

        <b-modal v-model="photoModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                  <p class="headingText">Add a new photo</p>

                  <b-field label="Label" style="margin-top:30px">
                    <b-input placeholder="Suspendisse elit massa" v-model="label"></b-input>
                  </b-field>

                  <b-field label="Photo URL">
                    <b-input placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..." v-model="url"></b-input>
                  </b-field>

                  <div class="is-pulled-right" style="margin-top:30px">
                    <div>
                      <span class="mr-4">
                        <b-button style="color: #BDBDBD;" type="is-ghost" @click="photoModalActive = false">Cancel</b-button>
                      </span>
                      <span>
                        <b-button id="submit-button" type="is-primary" :loading="loading" class="is-pulled-right" @click="create">Submit</b-button>
                      </span>
                    </div>
                  </div>
                </div>
            </div>
        </b-modal>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { mapActions } from "vuex";

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      photoModalActive: false,
      url: "",
      label: "",
      filter: "",
      loading: false
    }
  },
  methods:{
    ...mapActions("Images", ["createNewImage"]),
    async create(){
      try{
        this.loading = true
        await this.createNewImage({label: this.label, url:this.url})
        this.photoModalActive = false
      }catch(e){
        console.log(e)
      }finally{
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
#photo-button {
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 14px;
  width: 137px;
  height: 55px;
}

.card {
  width: 620px;
  height: 367.2px;
  background: #FFFFFF;
  border-radius: 12px;
}

.headingText {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #333333;
}

.submit-button {
  width: 105px;
  height: 55px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
</style>
