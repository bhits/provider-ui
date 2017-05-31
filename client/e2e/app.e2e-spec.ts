import { ProviderUiPage } from './app.po';

describe('provider-ui App', () => {
  let page: ProviderUiPage;

  beforeEach(() => {
    page = new ProviderUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
