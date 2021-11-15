import { ref } from "vue";
import { BatteryInfo, Device, DeviceId, DeviceInfo, GetLanguageCodeResult } from "@capacitor/device";
import { onIonViewWillEnter } from "@ionic/vue";

const deviceId = ref<DeviceId>();
const deviceOSInfo = ref<DeviceInfo>();
const deviceBatteryInfo = ref<BatteryInfo>();
const deviceLanguageCode = ref<GetLanguageCodeResult>();

export function useDevice() {
    onIonViewWillEnter(async () => {
        deviceId.value = await Device.getId();
        deviceOSInfo.value = await Device.getInfo();
        deviceBatteryInfo.value = await Device.getBatteryInfo();
        deviceLanguageCode.value = await Device.getLanguageCode();
    });


    return {
        deviceId,
        deviceOSInfo,
        deviceBatteryInfo,
        deviceLanguageCode,
    };
}