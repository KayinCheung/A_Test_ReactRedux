//Helper function to handle arrow key navigation of top menu
export const ArrowNavigation = e => {
  const HomeMenu = document.getElementById("HomeMenu");
  const HistoryMenu = document.getElementById("HistoryMenu");
  switch (e.key) {
    case "ArrowUp":
      //If at top of page
      if (!window.pageYOffset) {
        if (document.activeElement === HomeMenu) {
          HistoryMenu.focus();
        } else {
          HomeMenu.focus();
        }
      }
      break;
    case "ArrowDown":
      document.activeElement.blur();
      break;

    default:
      break;
  }
  //If one of the menu elements are focused, return false to indicate enter keys should not be handled.
  if (
    document.activeElement === HistoryMenu ||
    document.activeElement === HomeMenu
  ) {
    return false;
  }
  return true;
};
