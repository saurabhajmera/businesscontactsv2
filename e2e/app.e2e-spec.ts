import { Businesscontactsv2Page } from './app.po';

describe('businesscontactsv2 App', function() {
  let page: Businesscontactsv2Page;

  beforeEach(() => {
    page = new Businesscontactsv2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
