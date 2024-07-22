export const isDesktopViewPort = (page) => {
  // return true or false
  const size = page.viewportSize()
  return size.width >= 600
}
