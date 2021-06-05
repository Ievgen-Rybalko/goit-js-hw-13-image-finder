export default function getRefs() {
  return {
    galleryContainer: document.querySelector('.gallery'),
    searchQuery: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  };
}