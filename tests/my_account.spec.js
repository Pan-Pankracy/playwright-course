import { test } from '@playwright/test'
import { MyAccountPage } from '../page-objects/MyAccountPage'
import { getLoginToken } from '../api-calls/getLoginToken'

test('My account using cookie injection and mocking network request', async ({
  page,
}) => {
  // Make a request to get login token
  const loginToken = await getLoginToken()
  //   console.warn({ loginToken })

  // Mocking network request
  await page.route('**/api/user?**', async (route, request) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'PLAYWRIGHT ERROR FROM MOCKING' }),
    })
  })

  // Inject the login token into the browser
  const myAccountPage = new MyAccountPage(page)
  await myAccountPage.visit()
  // Injecting is happeing through page.evaluate()
  await page.evaluate(
    ([loginTokenInsideBrowserCode]) => {
      document.cookie = 'token=' + loginTokenInsideBrowserCode
    },
    [loginToken]
  )
  await myAccountPage.visit()
  await myAccountPage.waitForPageHeading()
})
