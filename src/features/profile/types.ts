import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Oxford3000Values } from "@/features/dictionaries/types";

export type UploadStatus = "idle" | "uploading" | "error";
export type EditNameStatus = "idle" | "loading" | "error" | "success";

export interface AvatarProps {
  uploadStatus: UploadStatus;
  avatar: string;
  setAvatarToProfile: (file: File | undefined) => Promise<void>;
}

export interface ProfileStatsProps {
  oxford3000: Array<Oxford3000Values>;
  personalDictionary: Array<Oxford3000Values>;
}

export interface UseAvatarReturn {
  avatar: string;
  isProfileLoading: boolean;
  uploadStatus: UploadStatus;
  setAvatarToProfile: (file: File | undefined) => Promise<void>;
}

export interface UseEditNameReturn {
  editNameStatus: EditNameStatus;
  handleEditName: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  isClickedEditName: boolean;
  setIsClickedEditName: Dispatch<SetStateAction<boolean>>;
}

// поєднати потім типи

export interface EditNameProps {
  editNameStatus: EditNameStatus;
  handleEditName: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  isClickedEditName: boolean;
  setIsClickedEditName: Dispatch<SetStateAction<boolean>>;
}
