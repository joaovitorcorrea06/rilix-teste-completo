import { Selector } from 'testcafe';

fixture`Formulário de notícia`.page`http://localhost:5173/news/new`;

test('Validações de campos obrigatórios', async t => {
  await t
    .click(Selector('button').withText('Criar Notícia'))
    .expect(Selector('p').withText('Título é obrigatório').exists).ok()
    .expect(Selector('p').withText('Imagem é obrigatória').exists).ok()
    .expect(Selector('p').withText('Resumo é obrigatório').exists).ok()
    .expect(Selector('p').withText('Descrição é obrigatória').exists).ok();
});

test('Cria uma nova notícia com sucesso', async t => {
  await t
    .typeText('[name="title"]', 'Notícia TestCafe')
    .typeText('[name="image_key"]', 'https://via.placeholder.com/150')
    .typeText('[name="resume"]', 'Resumo teste')
    .typeText('[name="description"]', 'Descrição teste')
    .click('button[type="submit"]')
    .wait(1000)
    .expect(Selector('div').withText('Notícia criada com sucesso!').exists).ok();
});
