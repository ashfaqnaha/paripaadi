/* Curated vocabulary + deterministic heuristic. No network or model required. */
const tags = s => s.split(' ');
const item = (name, shape, meaning, flexibility, simplicity, action) => ({name, shape:tags(shape), meaning:tags(meaning), flexibility, simplicity, action});
const ITEMS = [
 item('Pencil shavings','radial petals rings layered curved organic','creativity togetherness renewal',.95,.85,'Use the natural scalloped curls and coloured edges, keeping their shaved-wood texture visible'),
 item('Ruled notebook page','parallel bands lines flat layered','freedom possibility reflection learning',.95,1,'Use the existing ruled lines as the visual structure; preserve a clearly recognizable paper surface'),
 item('Colour pencils','lines parallel tapered triangle radial','creativity growth togetherness freedom',1,.95,'Arrange a small set of real colour pencils; preserve sharpened tips, wood grain, and plausible scale'),
 item('Single graphite pencil','lines vertical tapered path','guidance peace learning aspiration',.65,1,'Let one unbranded graphite pencil carry the idea with its direction and cast shadow'),
 item('Craft paper strips','curved rings loops bands parallel','togetherness creativity renewal',1,.8,'Gently bend or arrange cut paper strips with visible paper edges and plausible folds'),
 item('Open notebook','wings symmetry layered flat','freedom possibility learning renewal',.75,.95,'Use the open notebook and the gentle lift of its pages, keeping the binding visible'),
 item('Geometry set squares','triangle tapered lines symmetry','growth aspiration learning',.65,.9,'Arrange unbranded translucent set squares without losing their recognizable geometry'),
 item('Paper clips','loops curved lines linked','togetherness peace guidance',.75,.9,'Use a handful of real paper clips with bent-wire geometry; keep the arrangement sparse'),
 item('Erasers','blocks rectangle grid flat','renewal possibility learning',.9,.85,'Use clean unbranded erasers as small tactile modules, with believable rubber surfaces'),
 item('Pencil sharpener','blocks rectangle aperture','creativity growth learning',.45,.8,'Use one ordinary unbranded sharpener with its opening and blade visible'),
 item('Thread-bound exercise book','linked lines loops layered','togetherness reflection learning',.7,.9,'Feature a single exercise book with visible stitched binding and tactile paper'),
 item('Watercolour brush','lines tapered organic vertical','creativity growth guidance',.8,.95,'Use one classroom paintbrush and a restrained trace of pigment'),
 item('Paper offcuts','petals organic layered wings','renewal creativity possibility',1,.8,'Arrange a few leftover pieces of classroom craft paper, keeping the cut edges visible'),
 item('Counting beads','rings radial linked loops','togetherness growth learning',1,.85,'Use a small number of matte counting beads as a legible, sparse arrangement'),
 item('Chalk strokes','lines bands parallel path','learning freedom guidance',1,.9,'Use a few precise chalk marks on a pale matte surface, retaining fine chalk dust'),
 item('Folded paper','triangle tapered wings symmetry','aspiration peace renewal',1,.85,'Use one or a few folded paper forms with realistic creases and no elaborate origami')
];
// Only explicit, drawable recipes enter the candidate pool. Shared shapes alone
// cannot approve a pairing. Recognition ratings are editorial, not probabilities.
const recipe=(item,recognition,construction)=>({item,recognition,construction,feasibility:.95});
const anchor=(id,symbol,shape,features,recipes)=>({id,symbol,shape:tags(shape),features,recipes});
const occasion=(id,name,colours,anchors,caption='')=>({id,name,colours,anchors,caption});
const EVENTS=[
 occasion('gandhi','Gandhi Jayanti',['ivory','graphite','natural wood'],[
  anchor('spectacles-charkha','Gandhi’s round spectacles together with a charkha','rings curved lines radial', ['two circular spectacle rims joined by a short bridge','a small recognizable charkha with a spoked wheel, base, and spindle beside the spectacles'],[
   recipe('Craft paper strips',1,'Bend narrow graphite-grey craft-paper strips into the two round spectacle rims and bridge. Build the adjacent charkha as a small cut-paper silhouette with a complete wheel and spindle. Photograph the paper edges clearly.'),
   recipe('Chalk strokes',.95,'Draw two round spectacles and a compact, structurally complete charkha in precise charcoal-grey classroom chalk on a pale surface. Keep a short piece of chalk at the edge of the drawing.'),
   recipe('Paper offcuts',.9,'Cut the joined round spectacles and a separate charkha silhouette from graphite-grey classroom paper. Retain a few visible offcut edges to reveal the school-craft material.')])]),
 occasion('onam','Onam',['marigold yellow','orange','leaf green','ivory'],[
  anchor('pookalam','an Onam pookalam','radial petals rings layered',['a complete circular floral carpet with three concentric bands','dense petal-like scallops in alternating yellow and orange with a green outer edge'],[
   recipe('Pencil shavings',1,'Arrange curled pencil shavings in three complete concentric rings to form a miniature pookalam. Keep their scalloped edges and shaved wood visible; tint only the edges.'),
   recipe('Paper offcuts',.95,'Cut yellow, orange, and green paper into small petal shapes and arrange them tightly into a complete three-ring pookalam.'),
   recipe('Craft paper strips',.9,'Curl short coloured paper strips into petal loops and build a compact three-ring pookalam with an unmistakable floral-carpet outline.')])], 'Onam'),
 occasion('christmas','Christmas',['evergreen','red','gold'],[
  anchor('tree','a decorated Christmas tree','triangle tapered layered vertical',['a tiered evergreen-tree outline widening toward the base','a small gold five-point star at the top','three tiny red ornaments and a visible short trunk'],[
   recipe('Colour pencils',1,'Lay green colour pencils horizontally in progressively shorter rows, creating the tiered tree. Use a short brown pencil for the trunk, three small red paper dots for ornaments, and a tiny gold paper star at the tip.'),
   recipe('Folded paper',.95,'Stack three folded green paper triangles into a tiered tree. Add a short brown paper trunk, three red paper dots and a gold cut-paper star.'),
   recipe('Craft paper strips',.9,'Arrange progressively shorter green paper strips in clear tiered branches. Add a small paper trunk, three red paper ornaments and a gold star.')])]),
 occasion('independence','Independence Day · India',['saffron','white','India green','navy blue'],[
  anchor('tricolour','India’s tricolour','parallel bands lines flat',['horizontal saffron, white, and green in that top-to-bottom order','a navy-blue Ashoka Chakra with exactly 24 spokes centered in the white band'],[
   recipe('Ruled notebook page',1,'Use three horizontal groups of notebook ruling to form a compact tricolour motif on a single visible page. Preserve the correct colour order and a clearly drawn 24-spoke Chakra, with the rest of the page blank.'),
   recipe('Colour pencils',.95,'Arrange saffron, white, and green pencils into three compact horizontal bands. Place a small white circular paper disc bearing the accurate navy 24-spoke Chakra at the centre of the white band.'),
   recipe('Craft paper strips',.9,'Lay saffron, white and green craft-paper bands flat, in the correct order. Draw a small accurate navy 24-spoke Chakra at the centre of the white strip.')])], 'Independence Day · 15 August'),
 occasion('republic','Republic Day · India',['saffron','white','India green','navy blue'],[
  anchor('constitution','an Indian Constitution book with a tricolour motif','rectangle flat layered parallel',['a closed classroom-made book representing the Constitution','a saffron-white-green bookmark with a navy 24-spoke Chakra in its white band'],[
   recipe('Thread-bound exercise book',1,'Use a visibly stitched exercise book as a handcrafted Constitution-book representation. Lay a tricolour paper bookmark over its cover. Keep a clean title area on the cover for the word CONSTITUTION to be added afterward.'),
   recipe('Folded paper',.95,'Make a small closed book from folded classroom paper. Place a tricolour bookmark on the cover and reserve its title area for CONSTITUTION to be added afterward.'),
   recipe('Ruled notebook page',.9,'Fold a ruled notebook sheet around a small exercise book as its cover. Add a tricolour bookmark and reserve space on the cover for CONSTITUTION to be added afterward.')])], 'Republic Day · 26 January; also add CONSTITUTION on the book cover'),
 occasion('diwali','Diwali',['terracotta','amber gold','ivory'],[
  anchor('diya','a lit diya silhouette','curved tapered layered organic',['a shallow, pointed clay-lamp bowl silhouette','a visible wick at the tip with one teardrop flame above it'],[
   recipe('Folded paper',1,'Fold terracotta classroom paper into a shallow pointed diya bowl. Add a cream paper wick at the tip and an upright amber paper teardrop as its flame. This is a paper sculpture, not a real fire.'),
   recipe('Pencil shavings',.95,'Nest broad curled pencil shavings into the shallow diya-bowl outline. Use small cream and amber paper pieces for the wick and flame. The materials must not burn.'),
   recipe('Chalk strokes',.9,'Draw a simple terracotta diya bowl with a wick and amber flame in classroom chalk on a pale surface. Place one small matching chalk stub beside it.')])]),
 occasion('eid','Eid al-Fitr',['deep green','gold','ivory'],[
  anchor('crescent-lantern','an Eid crescent-and-lantern composition','curved rings vertical symmetry',['a clearly open crescent moon','one small hanging lantern inside the crescent, with a handle and paneled body'],[
   recipe('Craft paper strips',1,'Shape a gold paper strip into a clean crescent. Suspend a tiny deep-green cut-paper lantern inside it with a fine thread; show the lantern handle and paneled body.'),
   recipe('Paper offcuts',.95,'Cut a crescent and a paneled lantern silhouette from gold and green classroom paper. Assemble them as one compact composition, with the lantern hanging inside the crescent.'),
   recipe('Chalk strokes',.9,'Draw a gold crescent around a small green hanging lantern in classroom chalk. Preserve its handle and paneled body, and include one short chalk stub.')])], 'Eid Mubarak · Eid al-Fitr'),
 occasion('holi','Holi',['magenta','yellow','cyan'],[
  anchor('gulal','Holi gulal and a pichkari','lines tapered organic',['three small piles of magenta, yellow and cyan festival powder','a recognizable pichkari with a barrel, narrow nozzle and plunger beside the powder'],[
   recipe('Chalk strokes',1,'Use finely crushed classroom chalk to form the three small gulal-like piles. Make the miniature pichkari silhouette from rolled paper with a clear nozzle and plunger; keep it beside the piles.'),
   recipe('Colour pencils',.95,'Place three short coloured pencils with their tips touching three small matching gulal piles. Add one small rolled-paper pichkari with a nozzle and plunger.'),
   recipe('Craft paper strips',.9,'Roll classroom craft paper into a small pichkari with a distinct barrel, nozzle, and plunger; place it beside three restrained piles of colourful gulal.')])]),
 occasion('teachers','Teachers’ Day',['graphite','white','muted blue'],[
  anchor('teacher-board','a teacher guiding a child at a classroom board','lines rectangle flat',['a simple classroom board','a larger teacher figure pointing at the board and a smaller pupil beside them'],[
   recipe('Chalk strokes',1,'Draw a clear teacher-and-pupil classroom scene in a few chalk lines: an adult pointing to a board, a smaller child looking toward it. Keep a real short chalk stub at the bottom.'),
   recipe('Paper offcuts',.95,'Use two simple cut-paper silhouettes, one adult teacher and one child, beside a tiny paper classroom board. Make the teacher’s pointing arm unmistakable.'),
   recipe('Folded paper',.9,'Make a tiny folded-paper classroom board and place flat cut-paper teacher and pupil silhouettes beside it, with the teacher pointing toward the board.')])], 'Happy Teachers’ Day'),
 occasion('children','Children’s Day',['yellow','blue','coral'],[
  anchor('children-play','children playing with a balloon','organic curved linked',['three clearly child-proportioned figures holding hands','one balloon on a string held by an outer child'],[
   recipe('Paper offcuts',1,'Cut a connected chain of three child-proportioned silhouettes from classroom paper. Give one child a small coloured paper balloon on a thread.'),
   recipe('Chalk strokes',.95,'Draw three recognizable children holding hands, with one holding a balloon, in a few colourful classroom-chalk strokes. Include one chalk stub.'),
   recipe('Craft paper strips',.9,'Fold and cut a strip of classroom paper into a three-child paper chain. Add a small paper balloon on a thread to one outer hand.')])], 'Happy Children’s Day'),
 occasion('newyear','New Year',['graphite','gold','white'],[
  anchor('midnight','a clock striking midnight','rings radial lines',['a complete circular clock face with twelve evenly spaced hour marks','both clock hands meeting at twelve','one restrained gold paper confetti curl'],[
   recipe('Colour pencils',1,'Arrange twelve short graphite pencils as evenly spaced hour marks around a paper circle. Make two gold paper clock hands that both point to twelve. Add a single small gold paper curl.'),
   recipe('Ruled notebook page',.95,'Cut a notebook-paper circle, draw twelve hour marks and two hands pointing straight up at twelve. Place one small gold paper curl beside it.'),
   recipe('Chalk strokes',.9,'Draw a compact clock with twelve hour marks and both hands meeting at twelve using classroom chalk. Add one small gold paper curl beside it.')])], 'Happy New Year'),
 occasion('earth','Earth Day',['ocean blue','leaf green','ivory'],[
  anchor('earth-globe','planet Earth','rings curved organic',['a complete blue circular globe','recognizable green continent silhouettes, not random green patches'],[
   recipe('Paper offcuts',1,'Cut a blue paper disc and layer recognizable green continent shapes onto it to make a small Earth globe. Keep paper edges visible and the whole globe unobstructed.'),
   recipe('Chalk strokes',.95,'Draw a complete blue-and-green Earth globe in classroom chalk, with recognizable continent outlines. Leave one tiny chalk stub at its base.'),
   recipe('Ruled notebook page',.9,'Use a circular piece of ruled notebook paper as the surface for a carefully drawn blue-and-green Earth globe. Keep faint notebook ruling visible under the recognizable continent shapes.')])], 'Earth Day')
];
const normalize=value=>value.toLowerCase().replace(/[^a-z0-9]/g,'');
const aliases={independenceday:'independence',republicday:'republic',eid:'eid',eidulfitr:'eid',teachersday:'teachers',childrensday:'children',newyearsday:'newyear',newyearseve:'newyear',gandhijayanti:'gandhi',earthday:'earth',xmas:'christmas',deepavali:'diwali'};
function findEvent(name){const key=normalize(name);return EVENTS.find(e=>normalize(e.name)===key||e.id===key||e.id===aliases[key]);}
function evaluate(item,anchor){
 const recipe=anchor.recipes.find(r=>r.item===item.name);
 const shared=anchor.shape.filter(t=>item.shape.includes(t));
 const eligible=!!recipe&&recipe.recognition>=.85&&recipe.feasibility>=.8&&anchor.features.length>=2;
 // Recognition comes first; geometry only ranks pre-approved constructions.
 const score=eligible?Math.round(60*recipe.recognition+20*(shared.length/anchor.shape.length)+15*recipe.feasibility+5*item.simplicity):0;
 return {item,anchor,recipe,score,eligible};
}
function shortlist(event){
 const pairs=ITEMS.flatMap(item=>event.anchors.map(anchor=>evaluate(item,anchor)));
 const kept=pairs.filter(p=>p.eligible).sort((a,b)=>b.score-a.score||b.recipe.recognition-a.recipe.recognition||a.item.name.localeCompare(b.item.name));
 return {pairs,kept};
}
function generatePrompt(name,best){
 const event=findEvent(name);
 if(!event||!best?.eligible)throw new Error('Choose a supported festival and a recognizable concept.');
 const {anchor,recipe,item}=best;
 return `Create an original minimalist school-festival image for ${event.name}, portrait 4:5. The immediately recognizable visual anchor must be ${anchor.symbol}. School material: ${item.name}.

CONSTRUCT THIS EXACT VISUAL IDEA
${recipe.construction}

KEEP THESE RECOGNITION FEATURES
${anchor.features.map(f=>'• '+f).join('\n')}
Keep these features together, complete, prominent and readable at thumbnail size. Do not replace them with an abstract suggestion of values, simplicity, guidance, growth or togetherness. The school material must form or visibly participate in the festival symbol, rather than sit next to unrelated decoration.

ART DIRECTION
Premium studio still-life photography, real material textures, soft light and delicate shadows on near-white. Palette: ${event.colours.join(', ')}. Keep roughly 65–75% empty space, but make the entire symbol large enough to read. Use a compact off-centre arrangement in the lower half. Preserve the symbol’s required internal geometry even when positioning the whole composition asymmetrically.

Do not add unrelated props such as dried leaves, extra books, arbitrary petals or decorative circles. Include only the objects specified in the construction. No logos, watermarks or extra symbols. No burning stationery. Do not copy an existing ad or brand layout. Do not render text.${event.caption?` Leave space for the caption “${event.caption}” to be added afterward. This caption is needed for precise occasion identification because the visual can also fit other celebrations.`:' Leave clean space for an optional headline to be added afterward.'}`;
}
