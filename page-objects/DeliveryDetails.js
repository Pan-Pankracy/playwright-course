import { expect } from "@playwright/test"
 export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postCodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('city')
        this.countryDropdown = page.getByRole('combobox')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
    }

    fillDetails = async (userDetails) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userDetails.firstName)
        await this.lastNameInput.fill(userDetails.lastName)
        await this.streetInput.fill(userDetails.street)
        await this.postCodeInput.fill(userDetails.postcode)
        await this.cityInput.fill(userDetails.city)
        await this.countryDropdown.selectOption(userDetails.country)
     }

    saveDetails = async() => {
        const detailsCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await this.savedAddressContainer.waitFor()
        expect(this.savedAddressContainer).toHaveCount(detailsCountBeforeSaving + 1)
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCodeInput.inputValue())
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
    }

    continueToPayment = async() => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
    }
}