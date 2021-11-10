<template>
  <ion-page>

  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  onIonViewDidEnter
} from "@ionic/vue";

import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { useRouter } from 'vue-router';

export default {
  name: "Lists",
  components: {
    IonPage,
  },
  setup() {
    const { capturePhoto } = usePhotoGallery();
    const router = useRouter();

    const caputerAndRedirect = () => {
      capturePhoto()
        .then(() => {
          router.push('/gallery/lists');
        });
    };
    
    onIonViewDidEnter(caputerAndRedirect);
    

    return {};
  },
};
</script>