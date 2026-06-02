# Spotify Artist Explorer

## Sobre o projeto

Este projeto foi desenvolvido para um desafio técnico frontend com o objetivo de consumir a Spotify Web API de forma segura e construir uma experiência responsiva para explorar artistas, músicas e álbuns.

A aplicação permite pesquisar artistas, selecionar um resultado, visualizar popularidade, seguidores, principais músicas e navegar pela discografia com paginação manual de 20 álbuns por página.

## Funcionalidades

- Busca de artistas por nome.
- Seleção de artista com destaque visual.
- Exibição de nome, popularidade, seguidores, gêneros e link para o Spotify.
- Listagem das principais músicas do artista.
- Listagem de álbuns com 20 itens por página.
- Paginação manual de álbuns.
- Filtro de álbuns por nome.
- Estados de loading, erro e lista vazia.
- Interface responsiva para mobile e desktop.
- Tradução tokenizada em `pt-BR` e `en-US`.
- Consumo seguro da API do Spotify via API Routes do Next.js.

## Tecnologias utilizadas

- **Next.js**: usado com App Router para compor UI, rotas server-side e API Routes na mesma aplicação.
- **React**: base da componentização e da composição da interface.
- **TypeScript**: garante tipagem para modelos de domínio, responses da API, hooks e services.
- **Tailwind CSS**: acelera a criação de uma UI responsiva e consistente sem sair do componente.
- **Axios**: centraliza requests HTTP tanto para a API interna quanto para a Spotify Web API.
- **TanStack React Query**: gerencia cache, loading, erro, refetch e evita requests desnecessárias.
- **Context API**: mantém estado global de UI, como idioma e artista selecionado, sem prop drilling.
- **Spotify Web API**: fonte dos dados de artistas, músicas e álbuns.
- **Tradução tokenizada**: dicionários tipados em `pt-BR` e `en-US` para textos de interface.

## Arquitetura do projeto

```text
src/
  app/
    api/                  # API Routes seguras do Next.js
    layout.tsx            # Layout global e providers
    page.tsx              # Orquestra a experiência principal
    providers.tsx         # React Query Provider e UIProvider
  components/
    common/               # Componentes reutilizáveis e sem regra de domínio
    artists/              # Componentes do domínio de artistas
    albums/               # Componentes do domínio de álbuns
    layout/               # Composição visual da página
  constants/              # Query keys, rotas e paginação
  contexts/               # Estado global de UI
  hooks/                  # Hooks de dados e debounce
  i18n/                   # Dicionários tokenizados
  services/               # Comunicação HTTP interna e externa
  types/                  # Tipos separados por domínio
  utils/                  # Formatadores e mappers
```

Essa estrutura separa responsabilidades por domínio e por camada. A página principal não contém regra de request nem marcação extensa; ela apenas renderiza o `SpotifyExplorer`.

## Padrões de componentização

- **common**: componentes genéricos como `Button`, `Input`, `LoadingState`, `ErrorState`, `EmptyState`, `LanguageSwitcher` e `Stat`.
- **artists**: componentes ligados à busca, listagem, card, detalhes e top tracks de artistas.
- **albums**: componentes ligados à busca, grid, card e paginação de álbuns.
- **layout**: composição da tela principal, como hero/header e grid responsivo.

Componentes usam PascalCase, hooks começam com `use`, services descrevem a operação externa e tipos ficam separados por domínio.

## Fluxo de dados

O fluxo de dados segue a cadeia:

```text
UI -> Hook -> Service/API Route -> Spotify API -> Mapper -> UI
```

Exemplo:

```text
ArtistList -> useArtists -> spotifyApi -> /api/spotify/artists -> spotifyClient -> Spotify Web API -> mapArtist -> ArtistCard
```

Os hooks encapsulam React Query e centralizam query keys. Os services encapsulam HTTP. Os mappers deixam explícito o ponto onde a resposta externa pode ser adaptada para o modelo usado pela UI.

## Segurança no consumo da API

As credenciais do Spotify ficam exclusivamente no servidor, em `.env.local`:

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

O browser nunca acessa `SPOTIFY_CLIENT_SECRET`. A UI chama apenas rotas internas do Next.js em `/api/spotify/*`. Essas rotas executam o fluxo Client Credentials no servidor e repassam para a UI somente os dados necessários.

## Gerenciamento de estado

- **React Query**: estado assíncrono, cache, loading, erro e refetch de artistas, detalhes e álbuns.
- **Context API**: estado global de UI, como idioma e artista selecionado.
- **Estado local**: filtros e página atual ficam próximos dos componentes que os usam.

Essa separação evita prop drilling, reduz acoplamento e facilita explicar onde cada estado vive.

## Internacionalização

A internacionalização usa dicionários tokenizados em:

- `src/i18n/dictionaries/pt-BR.ts`
- `src/i18n/dictionaries/en-US.ts`

O tipo `TranslationKey` é derivado do dicionário base, reduzindo o risco de usar chaves inexistentes.

## Paginação e filtros

A busca de artistas usa filtro por nome com debounce para evitar chamadas excessivas.

A listagem de álbuns usa paginação manual com 20 itens por página. O filtro por nome do álbum reseta a página para `1`, evitando estados inválidos quando o resultado filtrado tem menos páginas.

## Como rodar o projeto

### Requisitos

```bash
Node.js 24.16.0
pnpm 10+
```

Crie `.env.local` a partir de `.env.example`:

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

Instale as dependências:

```bash
pnpm install
```

Rode em desenvolvimento:

```bash
pnpm dev
```

Acesse:

```text
http://localhost:3000
```

## Scripts disponíveis

- `pnpm dev`: inicia o servidor de desenvolvimento.
- `pnpm build`: gera a build de produção.
- `pnpm start`: executa a build de produção.
- `pnpm lint`: roda o ESLint.

## Decisões técnicas

- **API Routes para proteger credenciais**: o token do Spotify é obtido no backend do Next.js.
- **Separação por domínio**: artistas e álbuns têm componentes próprios, facilitando manutenção e testes.
- **React Query para dados remotos**: evita duplicação de estado assíncrono e entrega cache por chave.
- **Query keys centralizadas**: reduz inconsistências e facilita invalidar/refatorar queries.
- **Mappers explícitos**: deixam claro onde a resposta da API externa pode ser convertida para modelos internos.
- **Context API enxuto**: usado apenas para estado global de UI, não para cache de dados remotos.
- **Debounce nos filtros**: melhora UX e reduz chamadas desnecessárias.

## Melhorias futuras

- Testes unitários com Jest ou Vitest.
- Testes E2E com Cypress.
- Skeleton loading mais refinado.
- Animações de transição entre artista e discografia.
- Persistência do idioma em localStorage.
- Novos filtros usando gêneros, popularidade ou tipo de lançamento da API do Spotify.
