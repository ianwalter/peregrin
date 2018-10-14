const Blueprint = require('../')

const json = require('./fixtures/user.json')

test('group can return a resource group by index', () => {
  const blueprint = new Blueprint(json).group(0)
  expect(blueprint.json.name).toEqual('User')
})

test('group can return a resource group by name', () => {
  const blueprint = new Blueprint(json).group('User')
  expect(blueprint.json.name).toEqual('User')
})

test('resource can return a resource by index', () => {
  const blueprint = new Blueprint(json).group(0).resource(0)
  expect(blueprint.json.name).toEqual('Account')
})

test('resource can return a resource by name', () => {
  const blueprint = new Blueprint(json).group('User').resource('Account')
  expect(blueprint.json.name).toEqual('Account')
})

test('body can return the parsed response body example', () => {
  const res = new Blueprint(json)
    .group('User')
    .resource('Account')
    .action('GET')
    .example(0)
    .response(0)
    .body()
  expect(res).toEqual({ id: 1, email: 'user@test.io' })
})

test('example can be used as base for request and response', () => {
  const example = new Blueprint(json)
    .group('User')
    .resource('Account')
    .action('PUT')
    .example(0)
  const req = example.request(0).body()
  const res = example.response(0).body()
  expect(req).toEqual({ id: 1, email: 'user@example.com' })
  expect(res).toEqual({ id: 1, email: 'user@example.com' })
})

test('request can be returned by name', () => {
  const req = new Blueprint(json).request('Successful Update').body()
  expect(req).toEqual({ id: 1, email: 'user@example.com' })
})

test('example can be returned by request name', () => {
  const req = new Blueprint(json).example('Successful Update').request().body()
  expect(req).toEqual({ id: 1, email: 'user@example.com' })
})
