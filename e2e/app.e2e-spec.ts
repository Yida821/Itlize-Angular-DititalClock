import { DigitalClockPage } from './app.po';

describe('digital-clock App', function() {
  let page: DigitalClockPage;

  beforeEach(() => {
    page = new DigitalClockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
