"use client";
import Loader from "./Loader";
import { useLoaderStore } from "@/store/useLoader.store";

export default function GlobalLoader() {
  const isLoading = useLoaderStore((state) => state.isLoading);

  if (!isLoading) return null;

  return <Loader fullScreen />;
}
