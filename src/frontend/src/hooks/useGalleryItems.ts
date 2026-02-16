import { useGetGalleryItems } from './useQueries';
import { GalleryItemType } from '@/backend';

export function useGalleryItems(itemType: GalleryItemType | null) {
  return useGetGalleryItems(itemType);
}
