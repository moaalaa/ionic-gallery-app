<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="!isLoading">
      <ion-grid>
        <ion-row>
          <ion-col size="4" :key="photo" v-for="photo in photos">
            <ion-img
              :src="photo.webViewPath"
              @click="showOptions(photo)"
            ></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="capturePhoto">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
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
  IonFab,
  IonFabButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonSkeletonText,
  IonThumbnail,
} from "@ionic/vue";

import { ref } from "vue";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

import { camera, trash, close, share } from "ionicons/icons";

import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { UserPhoto } from "@/types/PhotoTypes";

export default {
  name: "Lists",
  components: {
    IonPage,
    IonHeader,
    IonFab,
    IonFabButton,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonSkeletonText,
    IonThumbnail,
  },
  setup() {
    const isLoading = ref(true);

    const { photos, capturePhoto, deletePhoto, sharePhoto } = usePhotoGallery();

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
      capturePhoto,
      showOptions,
      deletePhoto,
      sharePhoto,
      camera,
      trash,
      close,
    };
  },
};
</script>