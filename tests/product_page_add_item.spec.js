import { test, expect } from '@playwright/test'

test.skip('Products Page Add To Basket', async ({ page }) => {
  await page.goto('/')

  const addToBasektButton = page.locator('[data-qa="product-button"]').first()
  const basketCounter = page.locator('[data-qa="header-basket-count"]')

  await addToBasektButton.waitFor()
  await expect(basketCounter).toHaveText('0')
  await expect(addToBasektButton).toHaveText('Add to Basket')

  await addToBasektButton.click()

  await addToBasektButton.waitFor()
  await expect(basketCounter).toHaveText('1')
  await expect(addToBasektButton).toHaveText('Remove from Basket')

  const checkoutLink = page.getByRole('link', { name: 'Checkout' })

  await checkoutLink.waitFor()
  await checkoutLink.click()
  await page.waitForURL('/basket')
})
