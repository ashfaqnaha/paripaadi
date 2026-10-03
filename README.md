# Pencilbox

Open index.html in a modern browser. Keep index.html, style.css, engine.js, and app.js together. No installation, internet connection, or API key is needed.

Enter one of the 12 supported festivals, press Get prompt, then copy the result into an image-generation tool. Regenerate replaces the single prompt with the next ranked concept using a brief Matrix-style animation. It stops when the credible options run out. Reduced-motion preferences skip the animation. Results stay hidden before submission and while changing the festival.

## Recognition-first matching

engine.js contains the school materials, occasion anchors, explicit construction recipes and pure matching functions. app.js handles the interface.

School objects are still crossed with event anchors, but a pair is rejected unless an explicit recipe explains how to construct a recognizable symbol with at least two required visual features. Eligible recipes must meet minimum editorial recognition and feasibility ratings. Surviving candidates are ranked by recognition (60%), shape compatibility (20%), feasibility (15%), and simplicity (5%). Shape overlap and vague educational values cannot make an unapproved pair eligible. Regeneration never lowers the eligibility threshold.

Gandhi Jayanti uses round spectacles together with a charkha; no bare notebook or generic simplicity metaphor can enter its shortlist. Christmas requires a tiered tree with a star and ornaments. Diwali requires a diya bowl, wick, and flame shape. All 12 supported events have three explicit material recipes.

The ratings are curated judgments, not measured recognition probabilities. Image models can still miss required details. No actual image-generation or audience recognition study has been performed. For symbols shared across occasions, the prompt calls for a short event caption to be added afterward. Indian Independence Day and Republic Day cannot be distinguished reliably by national colours alone. Unsupported events ask the user to choose from the suggestions; there is no unvalidated generic fallback.

To extend: add an event with familiar anchors, mandatory features, and concrete material recipes. Keep recognition-critical details even when they cost some empty space. Run `node tests/engine.test.cjs` after editing the engine.

Optional local server: `python3 -m http.server 8000`
