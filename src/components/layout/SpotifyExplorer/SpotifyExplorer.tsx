"use client";

import { ArtistDetails } from "@/components/artists/ArtistDetails/ArtistDetails";
import { ArtistList } from "@/components/artists/ArtistList/ArtistList";
import { HeroHeader } from "@/components/layout/HeroHeader/HeroHeader";

export function SpotifyExplorer() {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <HeroHeader />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-6 md:px-8 lg:grid-cols-[360px_1fr]">
        <ArtistList />
        <ArtistDetails />
      </section>
    </main>
  );
}
