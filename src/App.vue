<template>
  <ion-app>
    <ion-menu
      side="start"
      type="push"
      menu-id="main-menu"
      content-id="main-outlet"
    >
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Gallery Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>Dark Mode</ion-label>
            <ion-toggle
              color="primary"
              id="theme-toggler"
              @ionChange="toggleTheme"
              value="dark"
              :checked="isDarkTheme.value"
            ></ion-toggle>
          </ion-item>
          <!-- Sliding item with text options on both sides -->
          <ion-item-sliding>
            <ion-item-options side="start">
              <ion-item-option color="light" @click="changeTheme('light')">
                <ion-icon slot="start" :icon="sunny"></ion-icon>
                Ligh Theme
              </ion-item-option>
            </ion-item-options>

            <ion-item>
              <ion-label>Item Options</ion-label>
            </ion-item>

            <ion-item-options side="end">
              <ion-item-option color="dark" @click="changeTheme('dark')">
                <ion-icon slot="start" :icon="moon"></ion-icon>
                Dark Theme
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
          
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main-outlet" />
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonToggle,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from "@ionic/vue";

import { sunny, moon } from 'ionicons/icons';

import { defineComponent, onMounted } from "vue";

import { useTheme } from "@/composables/useTheme";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonToggle,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
  },
  setup() {
    const { loadTheme, changeTheme, isDarkTheme } = useTheme();

    onMounted(async () => {
      await loadTheme();
      (document.getElementById("theme-toggler") as HTMLIonCheckboxElement).checked = isDarkTheme.value
    });

    const toggleTheme = () => changeTheme();

    return {
      toggleTheme,
      changeTheme,
      isDarkTheme,
      sunny,
      moon,
    };
  },
});
</script>
