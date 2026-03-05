export function createHistoryManager() {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

  function save() {
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }

  return {
    add(entry) {
      history.unshift(entry);
      if (history.length > 20) history.pop();
      save();
    },
    get() {
      return history;
    },
    clear() {
      history = [];
      save();
    },
  };
}
