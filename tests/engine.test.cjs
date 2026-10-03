const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../engine.js'), 'utf8'), context);
const engine = vm.runInContext('({EVENTS, ITEMS, findEvent, shortlist, evaluate, generatePrompt})', context);

// Regression: a vaguely meaningful notebook is not an event-recognition cue.
const gandhi = engine.findEvent('Gandhi Jayanti');
const notebook = engine.ITEMS.find(i => i.name === 'Open notebook');
assert.equal(engine.evaluate(notebook, gandhi.anchors[0]).eligible, false);
for (const pair of engine.shortlist(gandhi).kept) {
  const prompt = engine.generatePrompt('Gandhi Jayanti', pair);
  assert.match(prompt, /two circular spectacle rims/);
  assert.match(prompt, /charkha with a spoked wheel, base, and spindle/);
  assert.notEqual(pair.item.name, 'Open notebook');
}

// Perfect geometry cannot bypass the construction/recognition gate.
const anonymousObject = {...notebook, shape: gandhi.anchors[0].shape};
assert.equal(engine.evaluate(anonymousObject, gandhi.anchors[0]).eligible, false);
const anchor = gandhi.anchors[0];
const strips = engine.ITEMS.find(i => i.name === 'Craft paper strips');
const weakened = {...anchor, recipes: anchor.recipes.map(r => ({...r, recognition: .5}))};
assert.equal(engine.evaluate(strips, weakened).eligible, false);
assert.equal(engine.evaluate(strips, {...anchor, features: []}).eligible, false);

// Every regenerated option carries all of its required features; no generic tail.
for (const event of engine.EVENTS) {
  const {kept} = engine.shortlist(event);
  assert.equal(kept.length, 3, event.name);
  const prompts = kept.map(p => engine.generatePrompt(event.name, p));
  assert.equal(new Set(prompts).size, kept.length);
  kept.forEach((pair, i) => {
    assert(pair.eligible);
    if (i) assert(kept[i - 1].score >= pair.score);
    for (const feature of pair.anchor.features) assert(prompts[i].includes(feature));
    assert(prompts[i].includes(pair.recipe.construction));
    if (event.caption) assert(prompts[i].includes(event.caption));
  });
}
assert.equal(engine.findEvent('  XMAS ').id, 'christmas');
assert.equal(engine.findEvent('Independence Day').id, 'independence');
assert.equal(engine.findEvent('Unknown occasion'), undefined);
assert.throws(() => engine.generatePrompt('Unknown occasion', null));
assert.throws(() => engine.generatePrompt('Gandhi Jayanti', null));
console.log('Passed: 36 distinct recognizable recipes; Gandhi regression; geometry-only rejection; minimum-recognition gate; descending order; required features; caption disambiguation; unsupported input.');
