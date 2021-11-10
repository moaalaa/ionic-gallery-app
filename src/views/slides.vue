<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="!isLoading">
      <swiper @swiper="setSwiperInstance" zoom keyboard :loop="true" :centeredSlides="true" :autoplay="{ 'delay': 2500, 'disableOnInteraction': false }" >

          <swiper-slide :key="photo" v-for="photo in photos" >

            <ion-img :src="photo.webViewPath" @click="showOptions(photo)"></ion-img>
          
          </swiper-slide>

      </swiper>      
    </ion-content>

    <ion-content :fullscreen="true" v-else>
      
			<ion-grid>
        <ion-row>
          <ion-col size="4" :key="index" v-for="index in 15">
            <ion-thumbnail>
							<ion-skeleton-text animated></ion-skeleton-text>
            </ion-thumbnail>
          </ion-col>
        </ion-row>
      </ion-grid>


    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  actionSheetController,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonSkeletonText,
  IonThumbnail,
  IonicSwiper,
} from "@ionic/vue";

import { ref } from "vue";

import SwiperCore, { Autoplay, Keyboard, Zoom } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

import { trash, close, share } from "ionicons/icons";

import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { UserPhoto } from "@/types/PhotoTypes";

import 'swiper/swiper-bundle.min.css';
import '@ionic/vue/css/ionic-swiper.css';

SwiperCore.use([IonicSwiper, Keyboard, Zoom, Autoplay]);

export default {
  name: "Slides",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonSkeletonText,
    IonThumbnail,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const isLoading = ref(true);
    const slides = ref();

    const { photos, deletePhoto, sharePhoto } = usePhotoGallery();

    const setSwiperInstance = (swiper: any) =>{
      slides.value = swiper;
    };

    const showOptions = async (photo: UserPhoto) => {
      await Haptics.impact({ style: ImpactStyle.Medium });

      const actionSheet = await actionSheetController.create({
        header: "Photos",
        buttons: [
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              deletePhoto(photo);
            },
          },
          {
            text: "Share",
            icon: share,
            handler: () => {
              sharePhoto(photo);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            icon: close,
            handler: () => ({}), // action sheet will automatically closed noting we wan't to do
          },
        ],
      });

      await actionSheet.present();
    };

		// Simulate Loading
		setTimeout(() => {
			isLoading.value = false;
		}, 2000);

    return {
      isLoading,
      photos,
      setSwiperInstance,
      showOptions,
      deletePhoto,
      sharePhoto,
      trash,
      close,
    };
  },
};
</script>