import axios from "axios";

const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

type TokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

function getCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify credentials");
  }

  return { clientId, clientSecret };
}

async function getAccessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 30_000) {
    return tokenCache.accessToken;
  }

  const { clientId, clientSecret } = getCredentials();
  const basicToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const { data } = await axios.post<{ access_token: string; expires_in: number }>(
    SPOTIFY_ACCOUNTS_URL,
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return tokenCache.accessToken;
}

export async function spotifyGet<TResponse>(
  path: string,
  params?: Record<string, string | number | undefined>,
) {
  const accessToken = await getAccessToken();

  const { data } = await axios.get<TResponse>(`${SPOTIFY_API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params,
  });

  return data;
}

export function spotifyErrorPayload(error: unknown) {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status ?? 500,
      message:
        error.response?.status === 401
          ? "Spotify authorization failed."
          : "Spotify request failed.",
    };
  }

  if (error instanceof Error && error.message === "Missing Spotify credentials") {
    return {
      status: 500,
      message: "Configure SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.",
    };
  }

  return {
    status: 500,
    message: "Unexpected server error.",
  };
}
