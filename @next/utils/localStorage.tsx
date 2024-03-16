export function getLocalStorage(key: string) {
  let data = null;
  try {
    data = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (data) {
      data = JSON.parse(data);
    }
  } catch (error) {
    // If stored data is not a strigified JSON this might fail,
    // that's why we catch the error
  }
  return data;
}

export function setLocalStorage(key: any, data: any) {
  try {
    typeof window !== 'undefined' &&
      localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
}

export function removeLocalStorage(key: string) {
  try {
    typeof window !== 'undefined' && localStorage.removeItem(key);
  } catch (error) {
    // If stored data is not a strigified JSON this might fail,
    // that's why we catch the error
  }
}
