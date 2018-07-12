module.exports = class Blueprint {
  constructor (json) {
    this.json = json
  }

  find (filter, prop) {
    // Get namespaced or current JSON schema.
    const json = prop ? this.json[prop] : this.json

    // Filter the JSON schema using the filter parameter.
    if (Number.isInteger(filter)) {
      this.json = json[filter]
    } else if (typeof filter === 'string') {
      this.json = json.find(o => Object.values(o).includes(filter))
    } else if (typeof filter === 'function') {
      let values = Array.isArray(json) ? json : Object.values(json)
      this.json = values.find(filter)
    }

    // Return this instance so user can chain calls.
    return this
  }

  group (filter) {
    return this.find(filter)
  }

  resource (filter) {
    return this.find(filter, 'resources')
  }

  action (filter) {
    return this.find(filter, 'actions')
  }

  example (filter) {
    return this.find(filter, 'examples')
  }

  request (filter) {
    return this.find(filter, 'requests')
  }

  response (filter) {
    return this.find(filter, 'responses')
  }

  body () {
    return JSON.parse(this.json.body)
  }
}
