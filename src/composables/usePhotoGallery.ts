import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

const PHOTO_STORAGE = 'photos';
const photos = ref<UserPhoto[]>([]);

export interface UserPhoto {
    filePath: string;
    webViewPath?: string;
}

const cachePhoto = () => {
    Storage.set({
        key: PHOTO_STORAGE,
        value: JSON.stringify(photos.value),
    })
};

watch(photos, cachePhoto);

const loadSavedPhotos = async () => {    
    const photoList = await Storage.get({key: PHOTO_STORAGE});
    const photosInStorage = photoList.value ? JSON.parse(photoList.value) : [];

    // If running on the web...
    if (! isPlatform('hybrid')) {

        for (const photo of photosInStorage) {
            const file = await Filesystem.readFile({
                path: photo.filePath,
                directory: Directory.Data,
            });

            // Web platform only: Load the photo as base64 data
            photo.webViewPath = `data:image/jpeg;base64,${file.data}`;
        }
    }

    photos.value = photosInStorage;

};

const convertBlogToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };

    reader.readAsDataURL(blob);
});

const savePictureToFileSystem = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    let base64Data: string;
    
    // "hybrid" will detect mobile - iOS or Android
    if (isPlatform('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path!
        });

        base64Data = file.data;
    } else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        base64Data = await convertBlogToBase64(blob) as string;
    }

    const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
    });

    if (isPlatform('hybrid')) {
        // Display the new image by rewriting the 'file://' path to HTTP
        // Details: https://ionicframework.com/docs/building/webview#file-protocol
        
        return {
            filePath: savedFile.uri,
            webViewPath: Capacitor.convertFileSrc(savedFile.uri),
        }
    
    } else {
        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
            filePath: fileName,
            webViewPath: photo.webPath
        };
    }
}

export function usePhotoGallery () {
    onMounted(loadSavedPhotos);

    const capturePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        
        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePictureToFileSystem(cameraPhoto, fileName);

        photos.value = [savedFileImage, ...photos.value];
    };

    return { photos, capturePhoto };
}


