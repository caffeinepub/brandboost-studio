import { useAddGalleryItem } from './useQueries';
import { GalleryItemType } from '@/backend';

export function useGalleryPublish() {
  const addGalleryItem = useAddGalleryItem();

  const publishPhoto = async (title: string, dataUrl: string) => {
    await addGalleryItem.mutateAsync({
      itemType: 'photo' as GalleryItemType,
      title,
      url: dataUrl,
    });
  };

  const publishVideo = async (title: string, url: string) => {
    await addGalleryItem.mutateAsync({
      itemType: 'video' as GalleryItemType,
      title,
      url,
    });
  };

  const publishAnalytics = async (title: string, data: any) => {
    await addGalleryItem.mutateAsync({
      itemType: 'analytic' as GalleryItemType,
      title,
      url: JSON.stringify(data),
    });
  };

  return {
    publishPhoto,
    publishVideo,
    publishAnalytics,
  };
}
