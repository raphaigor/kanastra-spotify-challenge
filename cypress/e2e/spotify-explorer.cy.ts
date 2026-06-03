describe("Spotify Artist Explorer", () => {
  const getByTestId = (testId: string) => cy.get(`[data-testid="${testId}"]`);

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept("GET", "/api/spotify/artists/*/albums*", {
      fixture: "artist-albums.json",
    }).as("albums");
    cy.intercept("GET", "/api/spotify/artists/*", {
      fixture: "artist-details.json",
    }).as("artistDetails");
    cy.intercept("GET", "/api/spotify/artists?*", {
      fixture: "artists.json",
    }).as("artists");
  });

  it("cobre busca, seleção, detalhes, álbuns, paginação e idioma persistido", () => {
    cy.visit("/");

    getByTestId("hero-title").should("contain.text", "Spotify");
    getByTestId("artist-search-input").should("be.visible");

    getByTestId("artist-search-input").clear().type("Coldplay");
    cy.wait("@artists");

    getByTestId("artist-card").should("have.length.at.least", 1);
    getByTestId("artist-card").contains("Coldplay").click();
    cy.wait("@artistDetails");
    cy.wait("@albums");

    getByTestId("artist-details").should("contain.text", "Coldplay");
    getByTestId("top-tracks-section")
      .should("be.visible")
      .and("contain.text", "Principais músicas")
      .and("contain.text", "Yellow");
    getByTestId("albums-section")
      .should("be.visible")
      .and("contain.text", "Álbuns");

    getByTestId("album-card").should("have.length.at.least", 1);
    getByTestId("album-search-input")
      .scrollIntoView()
      .should("be.visible")
      .and("be.enabled")
      .click();
    getByTestId("album-search-input").clear();
    getByTestId("album-search-input").type("Parachutes");
    getByTestId("album-search-input").should("have.value", "Parachutes");
    getByTestId("albums-section").should("contain.text", "Parachutes");
    getByTestId("albums-pagination")
      .should("be.visible")
      .and("contain.text", "Página 1 de 2");

    getByTestId("language-switcher").contains("EN").click();
    getByTestId("top-tracks-section").should("contain.text", "Top tracks");
    cy.reload();

    getByTestId("top-tracks-section").should("contain.text", "Top tracks");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "spotify-explorer:locale")
      .should("eq", "en-US");
  });
});
