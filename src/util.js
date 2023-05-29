export const fetchData = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};

export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
