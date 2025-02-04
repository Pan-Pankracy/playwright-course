import { isDesktopViewPort } from '../utils/isDektopViewport'

export class Navigation {
  constructor(page) {
    this.page = page

    //this.addButtons = page.locator('[data-qa="product-button"]')
    this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
    this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
  }

  getBasketCount = async () => {
    await this.basketCounter.waitFor()
    const text = await this.basketCounter.innerText()
    return parseInt(text, 10)
  }

  goToCheckout = async () => {
    // if mobile viewport, fist open burger menu
    if (!isDesktopViewPort(this.page)) {
        await this.mobileBurgerButton.waitFor()
        await this.mobileBurgerButton.click()
    }
    await this.checkoutLink.waitFor()
    await this.checkoutLink.click()
    await this.page.waitForURL('/basket')
  }
}
