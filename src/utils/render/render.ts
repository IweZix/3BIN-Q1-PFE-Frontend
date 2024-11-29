/**
 * Render page title
 * @param {String} title - Page title
 * @returns {Void}
 */
const renderPageTitle = (title: string): void => {
  if (!title) return;
  window.document.title = title;
};

export { renderPageTitle };
