import { Selector } from 'testcafe';

fixture`Listagem de notícias`.page`http://localhost:5173/news`;

test('Carrega a lista de notícias', async t => {
  const card = Selector('[data-testid="news-card"]');

  await t
    .expect(card.exists).ok();
});

test('Busca por título', async t => {
  const inputBusca = Selector('input[type="text"]');
  const card = Selector('[data-testid="news-card"]').withText('TestCafe');

  await t
    .typeText(inputBusca, 'TestCafe', { replace: true })
    .wait(1500)
    .expect(card.exists).ok();
});
