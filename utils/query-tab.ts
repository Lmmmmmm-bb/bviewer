export const queryCurrentTab = async () => {
  const [current] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  return current;
};
