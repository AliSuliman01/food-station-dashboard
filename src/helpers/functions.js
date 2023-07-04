
const imagePath = (path, defaultImage) => {
    return path ?? defaultImage
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
    imagePath,
    refreshContexmenuePreventing
}