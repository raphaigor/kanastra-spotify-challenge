import { describe, expect, it } from "vitest";
import { compactNumber, formatDuration, getImageUrl } from "./formatters";

describe("formatters", () => {
  it("formata duração em minutos e segundos", () => {
    expect(formatDuration(213000)).toBe("3:33");
  });

  it("seleciona a primeira imagem disponível", () => {
    expect(getImageUrl([{ url: "https://i.scdn.co/image/photo.jpg" }])).toBe(
      "https://i.scdn.co/image/photo.jpg",
    );
  });

  it("usa fallback quando não há imagem", () => {
    expect(getImageUrl([])).toBe("/artist-placeholder.svg");
  });

  it("compacta números conforme locale", () => {
    expect(compactNumber(1200, "en-US")).toBe("1.2K");
  });
});
