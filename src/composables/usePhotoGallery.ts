import { ref } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Storage } from '@capacitor/storage';

const photos = ref<UserPhoto[]>([]);

export interface UserPhoto {
    filePath: string;
    webViewPath?: string;
}

const convertBlogToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };

    reader.readAsDataURL(blob);
});

const savePictureToFileSystem = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const base64Data: string = await convertBlogToBase64(blob) as string;
    
    await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
        filePath: fileName,
        webViewPath: photo.webPath
    };
}

export function usePhotoGallery () {
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


