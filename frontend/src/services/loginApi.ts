export const loginAdmin = async (username: string, password: string): Promise<string> => {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Errore nel login');
  }

  return response.text(); // oppure response.json() se il backend restituisce JSON
};
