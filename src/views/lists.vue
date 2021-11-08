<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid>
        <ion-row>
          <ion-col size="4" :key="photo" v-for="photo in photos">
            <ion-img
              :src="photo.webViewPath"
              @click="ensureDelete(photo)"
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
} from "@ionic/vue";

import { camera, trash, close } from "ionicons/icons";

import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { UserPhoto } from '@/types/PhotoTypes';

export default {
  name: "Tab2",
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
  },
  setup() {
    const ensureDelete = async (photo: UserPhoto) => {
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
            text: "Cancel",
            role: "cancel",
            icon: close,
            handler: () => {}, // action sheet will automatically closed noting we wan't to do
          },
        ],
      });

      await actionSheet.present();
    }

    const { photos, capturePhoto, deletePhoto } = usePhotoGallery();

    return {
      photos,
      capturePhoto,
      ensureDelete,
		  deletePhoto,
      camera,
      trash,
      close,
    };
  },
};
</script>
