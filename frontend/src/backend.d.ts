import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    id: bigint;
    content: string;
    sender: Principal;
    timestamp: bigint;
}
export interface GalleryItem {
    id: bigint;
    url: string;
    title: string;
    owner: Principal;
    timestamp: bigint;
    itemType: GalleryItemType;
}
export interface Conversation {
    id: bigint;
    participants: Array<Principal>;
    messages: Array<Message>;
}
export interface UserProfile {
    name: string;
}
export enum GalleryItemType {
    video = "video",
    photo = "photo",
    analytic = "analytic"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(itemType: GalleryItemType, title: string, url: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createConversation(participants: Array<Principal>): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getConversations(): Promise<Array<Conversation>>;
    getGalleryByType(itemType: GalleryItemType | null): Promise<Array<GalleryItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendMessage(conversationId: bigint, content: string): Promise<Message>;
}
