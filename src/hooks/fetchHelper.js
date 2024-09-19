export const postRequest = async (url, body = {}, timeout = 5000) => {
  try {
    const response = await fetchWithTimeout(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
      timeout
    );

    if (!response.ok) {
      const errorBody = await response.text(); // Garde le texte de la réponse si c'est pas du JSON
      return {
        error: `HTTP error! Status: ${response.status}, Message: ${errorBody}`,
      };
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return { error: 'Response is not valid JSON' };
    }
  } catch (error) {
    if (error.message === 'Request timed out') {
      return { error: 'The request timed out. Please try again later.' };
    }
    return { error: `Network or server error: ${error.message}` };
  }
};

const fetchWithTimeout = (url, options, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request timed out'));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
};
