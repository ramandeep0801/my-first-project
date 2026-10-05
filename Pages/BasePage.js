const path = require('path');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async openURL(url) {
    console.log('Opening URL:', url);
    await this.page.goto(url);
    console.log('URL opened successfully');
  }

  async clickButton(selector, options = { timeout: 15000 }) {
    await this.page.click(selector, options);
  }

  async HoverOverElement(selector) {
    await this.page.hover(selector);
  }

  async generateUsernameWithRandomString(username, length = 5) {
    const randomStr = Math.random().toString(36).substring(2, 2 + length);
    return `${username}${randomStr}`;
}
async generateUsernameWithRandomString(username, length = 5) {
    const randomStr = Math.random().toString(36).substring(2, 2 + length);
    return `${username}${randomStr}`;
}
}
module.exports = { BasePage };