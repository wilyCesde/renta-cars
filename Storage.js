export const loadData = async (key) => {
  try {
    const data = localStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log("Error loading data", error);
  }
  return null;
};

export const saveData = async (key, value) => {
  try {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.log("Error saving data", error);
  }
};
