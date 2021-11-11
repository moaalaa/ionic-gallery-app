<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="false" color="primary"></ion-menu-button>
        </ion-buttons>

        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="!isLoading">
      <ion-grid>
        <ion-row>
          <ion-col size="4" :key="photo" v-for="photo in photos">
            <ion-card color="danger">
              <ion-img
                :src="photo.webViewPath"
                @click="showOptions(photo)"
              ></ion-img>

              <ion-card-content v-text="photo.filePath"></ion-card-content>
            </ion-card>
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
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent,
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
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
  },
  setup() {
    const isLoading = ref(true);

    const { photos, capturePhoto, deletePhoto, sharePhoto } = usePhotoGallery();

    const showOptions = async (photo: UserPhoto) => {
      await Haptics.impact({ style: ImpactStyle.Medium });

      const actionSheet = await actionSheetController.create({
        header: `Photo ${photo.filePath} Options`,
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

<style>
.h-100 {
  height: 100%;
}
</style>