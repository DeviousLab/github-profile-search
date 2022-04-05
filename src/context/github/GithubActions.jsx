const GITHUB_URL = process.env.REACT_APP_GITHUB_API_LINK;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

export const searchUsers = async (text) => {

  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });

  const { items } = await response.json();

  return items
}