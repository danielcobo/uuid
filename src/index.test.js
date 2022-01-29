const uuid = require('./index.js');
test('Does no throw', function () {
  expect(function () {
    return uuid();
  }).not.toThrow();
});

test('returns UUID with 32 length', function () {
  const id = uuid();
  expect(id.length).toStrictEqual(32);
});

test('prepend', function () {
  const prepend = 'id';
  const id = uuid(prepend);
  expect(id.slice(0, 2)).toStrictEqual(prepend);
});

test('no collision for 1 000 000 values', function () {
  let duplicates = [];
  let index = {};

  for (let i = 0; i < 1000000; i++) {
    const id = uuid();
    if (index[id]) {
      duplicates.push(id);
    }
    index[id] = true;
  }

  expect(duplicates).toStrictEqual([]);
});

test('100 000 ordered values', function () {
  let ids = [];
  let index = {};

  for (let i = 0; i < 100000; i++) {
    ids.push(uuid());
  }

  expect(ids).toStrictEqual(ids.sort());
});
