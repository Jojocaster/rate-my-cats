const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? "";
const BASE_URL = "https://api.thecatapi.com/v1/";

console.log(API_KEY);

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  console.log("apiFetch:", url);

  const headers: Record<string, string> = {
    "x-api-key": API_KEY,
    ...(options?.headers as Record<string, string>),
  };
  console.log("headers", headers);
  console.log("options", options);
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
