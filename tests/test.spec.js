const expect = require('chai').expect;

describe('Test calculator', () => {

  afterEach(() => {
    if ($('~clear').length > 0) $('~clear').click();
  });

  it('Test with UIAutomator. All digit buttons present on calculator', () => {
    const digitSelector = 'new UiSelector().resourceIdMatches(\".*:id\/digit_.")';
    const digitBtnsCollection = $$(`android=${digitSelector}`);
    const digitBtnsTexts = digitBtnsCollection.map((curr) => curr.getText())
    expect(digitBtnsTexts.sort()).to.deep.equal(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
  });

  it('Test with UIAutomator. 5 + 9 = 14', () => {
    const fiveBtnSelector = 'new UiSelector().text("5")';
    const plusBtnSelector = 'new UiSelector().text("+")';
    const nineBtnSelector = 'new UiSelector().text("9")';
    const equalBtnSelector = 'new UiSelector().text("=")';
    const resultField = 'new UiSelector().resourceIdMatches(\".*:id/result_final\")';

    $(`android=${fiveBtnSelector}`).click();
    $(`android=${plusBtnSelector}`).click();
    $(`android=${nineBtnSelector}`).click();
    $(`android=${equalBtnSelector}`).click();

    const result = $(`android=${resultField}`).getText();
    expect(result).to.be.equal('14');
  });

  it('Test with some accessibilityId. 88 / 4 = 22', () => {
    const eightBtnSelector = 'new UiSelector().resourceId("com.google.android.calculator:id/digit_8")';
    const fourBtnSelector = 'new UiSelector().resourceId("com.google.android.calculator:id/digit_4")';
    const divideBtnSelector = $('~divide');
    const equalBtnSelector = $('~equals');
    const resultField = 'new UiSelector().resourceIdMatches(\".*:id/result_final\")';

    $(`android=${eightBtnSelector}`).click();
    $(`android=${eightBtnSelector}`).click();
    divideBtnSelector.click();
    $(`android=${fourBtnSelector}`).click();
    equalBtnSelector.click();

    const result = $(`android=${resultField}`).getText();
    expect(result).to.be.equal('22');
  });

  it('Swipe down to see history panel', () => {
    let isHistoryDisplayed = false;
    const handleSelector = 'new UiSelector().resourceIdMatches(\".*:id/drag_handle_view\")';
    const hystoryFrameSelector = 'new UiSelector().resourceIdMatches(\".*:id/history_frame\")';
    const handle = $(`android=${handleSelector}`);
    handle.touchAction([
      'press',
      { action: 'moveTo', x: 0, y: 700 },
      'release'
    ])
    if ($$(`android=${hystoryFrameSelector}`).length > 0) {
      isHistoryDisplayed = true;
    }
    expect(isHistoryDisplayed).to.be.true;
  })
});