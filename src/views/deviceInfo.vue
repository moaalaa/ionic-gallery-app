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

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item>
          <ion-label>Your Device Unique Id Is</ion-label>
          <ion-chip color="primary">
            <ion-label color="warning" v-text="deviceUniqueId"></ion-label>
          </ion-chip>
        </ion-item>

        <ion-item>
          <ion-label>Battery Level</ion-label>
          <ion-chip color="danger" v-if="deviceBatteryPercentage === null">
            <ion-label color="danger">Not Supported</ion-label>
          </ion-chip>

          <ion-progress-bar
            v-else
            :value="deviceBatteryPercentage"
          ></ion-progress-bar>
        </ion-item>

        <ion-item>
          <ion-label>Is Your Device Charging</ion-label>
          <ion-chip color="danger" v-if="deviceBatteryIsCharging === null">
            <ion-label color="danger">Not Supported</ion-label>
          </ion-chip>

          <ion-chip color="secondary" v-else>
            <ion-label
              color="secondary"
              v-text="deviceBatteryIsCharging"
            ></ion-label>
          </ion-chip>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonProgressBar,
  isPlatform,
  toastController,
} from "@ionic/vue";

import {
  NativeBiometric,
  AvailableResult,
  BiometryType,
} from "capacitor-native-biometric";
import { useDevice } from "@/composables/useDevice";
import { onMounted } from "vue";

export default {
  name: "deviceInfo",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonChip,
    IonProgressBar,
  },
  setup() {
    onMounted(() => {
      if (isPlatform("hybrid")) {
        NativeBiometric.isAvailable().then((result: AvailableResult) => {
          if (result.isAvailable) {
            NativeBiometric.verifyIdentity({
              reason: "Because it's Secure data",
              title: "Verify yourself",
              subtitle: "i weant to do it also",
              description: "virifing yourself is good",
              negativeButtonText: "Verify me please my sweet user",
            }).then(async () => {
              const toast = await toastController.create({
                message: "Verified",
                duration: 2000,
              });
              return toast.present();
            });
          }
        });
      }
    });

    const { deviceId, deviceOSInfo, deviceBatteryInfo, deviceLanguageCode } = useDevice();

    let deviceUniqueId = null;
    let deviceBatteryPercentage = null;
    let deviceBatteryIsCharging = null;

    if (deviceId.value !== undefined) {
      if (deviceId.value.uuid !== undefined) {
        deviceUniqueId = deviceId.value.uuid;
      }
    }

    if (deviceBatteryInfo.value !== undefined) {
      if (deviceBatteryInfo.value.batteryLevel !== undefined) {
        deviceBatteryPercentage = deviceBatteryInfo.value.batteryLevel / 100; // get it by percentage for ion progress
      }

      if (deviceBatteryInfo.value.isCharging !== undefined) {
        deviceBatteryIsCharging = deviceBatteryInfo.value.isCharging;
      }
    }

    return {
      deviceUniqueId,
      deviceOSInfo,
      deviceBatteryPercentage,
      deviceBatteryIsCharging,
      deviceLanguageCode,
    };
  },
};
</script>
