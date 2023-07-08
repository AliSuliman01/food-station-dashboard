const dashboardSettings = JSON.parse(localStorage.getItem('dashboard-settings'));

const toImagePath = (path = "") => {
  
    return !path?.startsWith('blob') ? (dashboardSettings.backend_base_url + path) : path
}

const refreshContexmenuePreventing = () => {
    function handleContextMenu(e) {
        e.preventDefault(); // prevents the default right-click menu from appearing
      }
  
      const preventContextmenuContainers = document.getElementsByClassName("prevent-contextmenu");
  
      for (const container of preventContextmenuContainers) {
        container.addEventListener("contextmenu", handleContextMenu);
      }
  
      return () => {
        for (const container of preventContextmenuContainers) {
          container.removeEventListener("contextmenu", handleContextMenu);
        }
      };
}

export {
  toImagePath,
    refreshContexmenuePreventing
}