import type { StoreLinks } from "@/content/schema";

export function playUrl(packageId: string): string {
  return `https://play.google.com/store/apps/details?id=${packageId}`;
}

export function appStoreUrl(id: string, country: "us" | "ae" = "us"): string {
  return `https://apps.apple.com/${country}/app/id${id}`;
}

export function storeUrls(stores: StoreLinks): { play?: { url: string }; appStore?: { url: string } } {
  return {
    play: stores.play ? { url: playUrl(stores.play.packageId) } : undefined,
    appStore: stores.appStore ? { url: appStoreUrl(stores.appStore.id, stores.appStore.country) } : undefined,
  };
}
