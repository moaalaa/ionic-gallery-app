<template>
  <ion-page>
    <ion-tabs>
      
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom">  

        <ion-tab-button tab="camera" href="/gallery/camera">
          <ion-icon :icon="camera" />
          <ion-label>Camera</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="lists" href="/gallery/lists">
          <ion-icon :icon="images" />
          <ion-label>Images</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="slides" href="/gallery/slides">
          <ion-icon :icon="albums" />
          <ion-label>Quick View</ion-label>
        </ion-tab-button>
        
        <ion-tab-button color="danger" tab="device-info" href="/gallery/device-info">
          <ion-icon :icon="fingerPrint" />
          <ion-label>Device Info</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { images, albums, camera, fingerPrint } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      camera,
      images, 
      albums,
      fingerPrint,
    }
  }
}
</script>