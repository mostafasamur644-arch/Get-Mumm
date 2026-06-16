import { db, pool } from "./index.js";
import {
  categoriesTable,
  chefsTable,
  menuItemsTable,
  testimonialsTable,
  blogPostsTable,
  subscriptionPlansTable,
} from "./schema/index.js";
import { eq, sql } from "drizzle-orm";

async function main() {
  console.log("🌱 Seeding Get Mumm database…");

  await db.delete(menuItemsTable);
  await db.delete(testimonialsTable);
  await db.delete(blogPostsTable);
  await db.delete(subscriptionPlansTable);
  await db.delete(chefsTable);
  await db.delete(categoriesTable);
  console.log("  ✓ Cleared existing data");

  /* ── Categories ───────────────────────────────────────────────────── */
  const cats = await db.insert(categoriesTable).values([
    {
      name: "Rice & Grain Dishes",
      nameAr: "أطباق الأرز والحبوب",
      slug: "rice-grains",
      description: "Egypt's beloved rice and grain staples — from street-side koshari to hearty ful medames and flaky fiteer.",
      descriptionAr: "أشهر أطباق الأرز والحبوب المصرية — من كشري الشارع إلى الفول المدمس والفطير المشلتت.",
      imageUrl: "/koshari.png",
      itemCount: 0,
    },
    {
      name: "Stuffed Dishes",
      nameAr: "محاشي",
      slug: "stuffed",
      description: "Tender vegetables and vine leaves lovingly stuffed with herbed rice, slow-cooked to perfection.",
      descriptionAr: "خضروات وأوراق عنب محشوة بأرز معطر، مطبوخة على نار هادئة بعناية.",
      imageUrl: "/mahshi.png",
      itemCount: 0,
    },
    {
      name: "Meat Dishes",
      nameAr: "أطباق اللحوم",
      slug: "meat",
      description: "Rich braised meats, festive fattah, and hand-rolled kofta grilled over charcoal.",
      descriptionAr: "لحوم مشوية فاخرة وفتة الأعياد وكفتة محضّرة باليد على الفحم.",
      imageUrl: "/kofta.png",
      itemCount: 0,
    },
    {
      name: "Soups & Stews",
      nameAr: "شوربات وطواجن",
      slug: "soups-stews",
      description: "Soul-warming molokhia, hearty lentil soup, and slow-simmered tagines.",
      descriptionAr: "ملوخية دافئة للروح وشوربة عدس غنية وطواجن تُطهى على نار هادئة.",
      imageUrl: "/molokhia.png",
      itemCount: 0,
    },
    {
      name: "Salads & Sides",
      nameAr: "سلطات ومقبلات",
      slug: "salads-sides",
      description: "Fresh garden salads, creamy tahini, smoky baba ghanoush, and seasonal mezze.",
      descriptionAr: "سلطات طازجة وطحينة كريمية وبابا غنوج مدخن ومزة موسمية.",
      imageUrl: "/mahshi.png",
      itemCount: 0,
    },
    {
      name: "Desserts",
      nameAr: "حلويات",
      slug: "desserts",
      description: "Egypt's most beloved sweets — from warm umm ali to golden basbousa drizzled with honey.",
      descriptionAr: "أشهر الحلويات المصرية — من أم علي الدافئة إلى البسبوسة الذهبية بالعسل.",
      imageUrl: "/umm_ali.png",
      itemCount: 0,
    },
  ]).returning();
  console.log(`  ✓ Inserted ${cats.length} categories`);
  const c = Object.fromEntries(cats.map((x) => [x.slug, x]));

  /* ── Chefs ─────────────────────────────────────────────────────────── */
  const chefs = await db.insert(chefsTable).values([
    {
      name: "Umm Hassan",
      nameAr: "أم حسن",
      bio: "A Cairo kitchen legend with 30 years perfecting street classics. Her koshari is the standard every vendor is measured against — three lentil layers, hand-fried onions, and a sauce made fresh every morning.",
      bioAr: "أسطورة مطبخ القاهرة بخبرة 30 عاماً في إتقان أكلات الشارع. كشريها هو المقياس الذي يُقاس به كل الباعة — ثلاث طبقات من العدس وبصل مقلي باليد وصلصة طازجة كل صباح.",
      imageUrl: "/chef1.png",
      specialties: ["Koshari", "Ful Medames", "Fiteer"],
      specialtiesAr: ["كشري", "فول مدمس", "فطير"],
      itemCount: 0, rating: 4.9, joinedYear: 2016,
    },
    {
      name: "Nadia Magdi",
      nameAr: "نادية مجدي",
      bio: "Nadia inherited her grandmother's mahshi recipes from Alexandria and has spent two decades perfecting every stuffed leaf and vegetable. She rolls each vine leaf by hand — no machine, no shortcuts.",
      bioAr: "نادية ورثت وصفات جدتها في المحاشي من الإسكندرية وأمضت عقدين في إتقان كل ورقة وخضرة محشوة. تلف كل ورقة عنب باليد — بدون آلة ولا اختصارات.",
      imageUrl: "/chef2.png",
      specialties: ["Mahshi", "Wara Einab", "Stuffed Peppers"],
      specialtiesAr: ["محشي", "ورق عنب", "فلفل محشي"],
      itemCount: 0, rating: 4.8, joinedYear: 2017,
    },
    {
      name: "Samia Farouk",
      nameAr: "سامية فاروق",
      bio: "Samia's Eid fattah became so famous her neighbours started ordering weeks in advance. Her kofta has a secret blend of seven spices, and her hawawshi is baked in a traditional clay oven for the authentic crunch.",
      bioAr: "فتة سامية في العيد أصبحت شهيرة لدرجة أن جيرانها بدأوا يطلبون قبل أسابيع. كفتتها لها مزيج سري من سبع بهارات وهواوشيها مخبوز في فرن فخاري تقليدي للحصول على القرمشة الأصيلة.",
      imageUrl: "/chef1.png",
      specialties: ["Fattah", "Kofta", "Hawawshi"],
      specialtiesAr: ["فتة", "كفتة", "هواوشي"],
      itemCount: 0, rating: 4.9, joinedYear: 2015,
    },
    {
      name: "Hanan Ibrahim",
      nameAr: "حنان إبراهيم",
      bio: "Hanan's slow-cooked molokhia with rabbit is a Sunday institution in Giza. Her lentil soup is made with red lentils from Luxor and her chicken tagine simmers for three hours in a sealed clay pot.",
      bioAr: "ملوخية حنان المطبوخة ببطء مع الأرانب هي طقس يوم الأحد في الجيزة. شوربة عدسها من العدس الأحمر من الأقصر وطاجن دجاجها يُطهى لثلاث ساعات في طاجن فخاري مختوم.",
      imageUrl: "/chef2.png",
      specialties: ["Molokhia", "Lentil Soup", "Chicken Tagine"],
      specialtiesAr: ["ملوخية", "شوربة عدس", "طاجن دجاج"],
      itemCount: 0, rating: 4.7, joinedYear: 2018,
    },
    {
      name: "Maha El-Sayed",
      nameAr: "مها السيد",
      bio: "The undisputed queen of Egyptian desserts. Maha's umm ali is served warm with just the right balance of cream, pastry and toasted nuts. Her konafa is hand-pulled each morning and her basbousa is soaked in rose-water syrup for 24 hours.",
      bioAr: "الملكة غير المنازعة للحلويات المصرية. أم علي مها تُقدَّم دافئة بالتوازن الصحيح من الكريمة والعجينة والمكسرات. كنافتها تُسحب باليد كل صباح وبسبوسها تنقع في قطر ماء الورد لـ 24 ساعة.",
      imageUrl: "/chef1.png",
      specialties: ["Umm Ali", "Basbousa", "Konafa"],
      specialtiesAr: ["أم علي", "بسبوسة", "كنافة"],
      itemCount: 0, rating: 4.9, joinedYear: 2019,
    },
  ]).returning();
  console.log(`  ✓ Inserted ${chefs.length} chefs`);
  const chef = Object.fromEntries(chefs.map((x) => [x.name, x]));

  /* ── Menu Items ─────────────────────────────────────────────────────── */
  const items = await db.insert(menuItemsTable).values([

    /* Rice & Grain */
    { name: "Koshari", nameAr: "كُشري", description: "Egypt's iconic street dish — layers of rice, brown lentils, macaroni, crispy fried onions, tangy tomato sauce and a garlic-vinegar daqqa, all in one bowl.", descriptionAr: "أشهر أكلة شعبية مصرية — طبقات من الأرز والعدس البني والمعكرونة والبصل المقلي المقرمش مع صلصة طماطم حامضة ودقة ثوم وخل في طبق واحد.", price: 65, categoryId: c["rice-grains"].id, categoryName: "Rice & Grain Dishes", categoryNameAr: "أطباق الأرز والحبوب", imageUrl: "/koshari.png", dietary: ["vegan"], isAvailable: true, isFeatured: true, chefName: chef["Umm Hassan"].name, chefNameAr: chef["Umm Hassan"].nameAr, rating: 4.9, prepTimeMinutes: 30 },
    { name: "Ful Medames", nameAr: "فول مدمس", description: "Slow-simmered fava beans with garlic, cumin, lemon and a generous drizzle of extra-virgin olive oil. Egypt's breakfast staple, made the old way — overnight in a copper pot.", descriptionAr: "فول مدمس مطبوخ ببطء مع الثوم والكمون والليمون ورذاذ سخي من زيت الزيتون. وجبة الإفطار المصرية الأصيلة بالطريقة القديمة — طوال الليل في وعاء نحاسي.", price: 45, categoryId: c["rice-grains"].id, categoryName: "Rice & Grain Dishes", categoryNameAr: "أطباق الأرز والحبوب", imageUrl: "/koshari.png", dietary: ["vegan", "gluten-free"], isAvailable: true, isFeatured: false, chefName: chef["Umm Hassan"].name, chefNameAr: chef["Umm Hassan"].nameAr, rating: 4.8, prepTimeMinutes: 45 },
    { name: "Fiteer Meshaltet", nameAr: "فطير مشلتت", description: "Layers upon layers of paper-thin dough folded with pure butter and baked until flaky and golden — Egypt's ancient flatbread, served with honey and thick cream.", descriptionAr: "طبقات فوق طبقات من العجينة الرقيقة مطوية بالسمن الخالص ومخبوزة حتى تصبح ذهبية ومقرمشة — الفطير المصري القديم، يُقدَّم مع العسل والقشطة.", price: 80, categoryId: c["rice-grains"].id, categoryName: "Rice & Grain Dishes", categoryNameAr: "أطباق الأرز والحبوب", imageUrl: "/koshari.png", dietary: [], isAvailable: true, isFeatured: false, chefName: chef["Umm Hassan"].name, chefNameAr: chef["Umm Hassan"].nameAr, rating: 4.8, prepTimeMinutes: 50 },
    { name: "Macarona Béchamel", nameAr: "مكرونة بشاميل", description: "Layered pasta baked with spiced minced beef and a thick, golden béchamel crust — Egypt's beloved answer to lasagne, baked in a deep tray and cut in generous squares.", descriptionAr: "مكرونة متعددة الطبقات مخبوزة مع لحم بقر مفروم متبل وبشاميل ذهبي سميك — الإجابة المصرية على اللازانيا، مخبوزة في صينية عميقة ومقطعة مربعات سخية.", price: 110, categoryId: c["rice-grains"].id, categoryName: "Rice & Grain Dishes", categoryNameAr: "أطباق الأرز والحبوب", imageUrl: "/fatta.png", dietary: [], isAvailable: true, isFeatured: false, chefName: chef["Umm Hassan"].name, chefNameAr: chef["Umm Hassan"].nameAr, rating: 4.7, prepTimeMinutes: 60 },
    { name: "Rice with Vermicelli", nameAr: "أرز بالشعرية", description: "Fluffy long-grain Egyptian rice toasted with thin vermicelli in clarified butter until golden, then simmered in light chicken stock — the perfect side for any tagine or stew.", descriptionAr: "أرز مصري طويل الحبة محمص مع شعرية رفيعة في السمن حتى يصبح ذهبياً، ثم يُطهى في مرق دجاج خفيف — الطبق الجانبي المثالي لأي طاجن أو يخنة.", price: 35, categoryId: c["rice-grains"].id, categoryName: "Rice & Grain Dishes", categoryNameAr: "أطباق الأرز والحبوب", imageUrl: "/koshari.png", dietary: ["vegan"], isAvailable: true, isFeatured: false, chefName: chef["Umm Hassan"].name, chefNameAr: chef["Umm Hassan"].nameAr, rating: 4.6, prepTimeMinutes: 20 },

    /* Stuffed Dishes */
    { name: "Stuffed Vine Leaves", nameAr: "ورق عنب", description: "Rolled vine leaves packed with herbed rice, diced tomato and a hint of lemon, slow-cooked in a pot lined with lamb ribs for a deep, rich flavour.", descriptionAr: "أوراق عنب مفرودة محشوة بأرز معطر وطماطم مفرومة ورائحة الليمون، مطبوخة ببطء في طنجرة مبطنة بضلوع خروف لنكهة غنية وعميقة.", price: 140, categoryId: c["stuffed"].id, categoryName: "Stuffed Dishes", categoryNameAr: "محاشي", imageUrl: "/mahshi.png", dietary: ["vegan"], isAvailable: true, isFeatured: true, chefName: chef["Nadia Magdi"].name, chefNameAr: chef["Nadia Magdi"].nameAr, rating: 4.9, prepTimeMinutes: 90 },
    { name: "Mixed Mahshi Platter", nameAr: "طبق محاشي مشكل", description: "Zucchini, Nile cabbage, peppers and aubergine all stuffed with Nadia's signature herbed rice — a celebration platter that feeds the whole table.", descriptionAr: "كوسة وكرنب نيلي وفلفل وباذنجان محشو بأرز نادية المميز — طبق احتفالي يكفي الطاولة كلها.", price: 165, categoryId: c["stuffed"].id, categoryName: "Stuffed Dishes", categoryNameAr: "محاشي", imageUrl: "/mahshi.png", dietary: ["vegan"], isAvailable: true, isFeatured: false, chefName: chef["Nadia Magdi"].name, chefNameAr: chef["Nadia Magdi"].nameAr, rating: 4.8, prepTimeMinutes: 100 },
    { name: "Stuffed Zucchini", nameAr: "كوسة محشية", description: "Baby zucchini delicately cored and filled with aromatic herbed rice and a touch of ground beef, braised until butter-soft in a light tomato broth.", descriptionAr: "كوسة صغيرة منزوعة الداخل ومحشوة بأرز معطر ولحم مفروم، مطبوخة حتى تصبح طرية في مرق طماطم خفيف.", price: 125, categoryId: c["stuffed"].id, categoryName: "Stuffed Dishes", categoryNameAr: "محاشي", imageUrl: "/mahshi.png", dietary: [], isAvailable: true, isFeatured: false, chefName: chef["Nadia Magdi"].name, chefNameAr: chef["Nadia Magdi"].nameAr, rating: 4.7, prepTimeMinutes: 85 },
    { name: "Stuffed Cabbage Rolls", nameAr: "كرنب محشي", description: "Tender Nile cabbage leaves wrapped around a fragrant rice and herb filling, slow-cooked with tomatoes and a squeeze of fresh lemon until the leaves melt on the tongue.", descriptionAr: "أوراق كرنب نيلي طرية ملفوفة حول حشوة أرز وأعشاب معطرة، مطبوخة ببطء مع الطماطم وليمون طازج حتى تذوب الأوراق على اللسان.", price: 115, categoryId: c["stuffed"].id, categoryName: "Stuffed Dishes", categoryNameAr: "محاشي", imageUrl: "/mahshi.png", dietary: ["vegan"], isAvailable: true, isFeatured: false, chefName: chef["Nadia Magdi"].name, chefNameAr: chef["Nadia Magdi"].nameAr, rating: 4.8, prepTimeMinutes: 95 },

    /* Meat Dishes */
    { name: "Lamb Fattah", nameAr: "فتة لحم ضأن", description: "Crispy baladi bread, fragrant white rice and slow-braised whole lamb bathed in a rich garlic-vinegar broth, finished with toasted almonds and pine nuts.", descriptionAr: "خبز بلدي مقرمش وأرز أبيض فاخر وخروف كامل مسلوق ببطء في مرق غني بالثوم والخل، منتهي باللوز وحبوب الصنوبر المحمصة.", price: 235, categoryId: c["meat"].id, categoryName: "Meat Dishes", categoryNameAr: "أطباق اللحوم", imageUrl: "/fatta.png", dietary: [], isAvailable: true, isFeatured: true, chefName: chef["Samia Farouk"].name, chefNameAr: chef["Samia Farouk"].nameAr, rating: 4.9, prepTimeMinutes: 120 },
    { name: "Grilled Kofta", nameAr: "كفتة مشوية", description: "Hand-rolled ground beef and lamb kofta seasoned with Samia's seven-spice blend — parsley, onion, cumin, coriander, cinnamon, allspice and a pinch of chilli — charcoal-grilled and served with tahini.", descriptionAr: "كفتة لحم بقر وضأن مفرود باليد، متبلة بمزيج سامية السري من سبع بهارات — بقدونس وبصل وكمون وكسبرة وقرفة وبهار وقليل من الفلفل الحار — مشوية على الفحم وتُقدَّم مع الطحينة.", price: 155, categoryId: c["meat"].id, categoryName: "Meat Dishes", categoryNameAr: "أطباق اللحوم", imageUrl: "/kofta.png", dietary: ["gluten-free"], isAvailable: true, isFeatured: true, chefName: chef["Samia Farouk"].name, chefNameAr: chef["Samia Farouk"].nameAr, rating: 4.8, prepTimeMinutes: 40 },
    { name: "Hawawshi", nameAr: "هواوشي", description: "Minced beef and lamb heavily spiced with onion, chilli and fresh herbs, sealed inside baladi dough and baked in a clay oven until the outside is shatteringly crisp.", descriptionAr: "لحم بقر وضأن مفروم متبل بكثافة بالبصل والفلفل والأعشاب الطازجة، مختوم داخل عجينة بلدي ومخبوز في فرن فخاري حتى تصبح الخارجية مقرمشة تماماً.", price: 95, categoryId: c["meat"].id, categoryName: "Meat Dishes", categoryNameAr: "أطباق اللحوم", imageUrl: "/kofta.png", dietary: [], isAvailable: true, isFeatured: false, chefName: chef["Samia Farouk"].name, chefNameAr: chef["Samia Farouk"].nameAr, rating: 4.7, prepTimeMinutes: 35 },
    { name: "Braised Beef Tagine", nameAr: "طاجن لحم بتلو", description: "Slow-braised beef shin with caramelised onions, potato wedges and green peppers, sealed in a clay tagine with Samia's warming spice mix until the meat is fall-apart tender.", descriptionAr: "كاحل لحم بتلو مطبوخ ببطء مع بصل مكرمل وبطاطس وفلفل أخضر، مختوم في طاجن فخاري مع مزيج بهارات سامية الدافئ حتى تتفتت اللحمة.", price: 210, categoryId: c["meat"].id, categoryName: "Meat Dishes", categoryNameAr: "أطباق اللحوم", imageUrl: "/fatta.png", dietary: ["gluten-free"], isAvailable: true, isFeatured: false, chefName: chef["Samia Farouk"].name, chefNameAr: chef["Samia Farouk"].nameAr, rating: 4.8, prepTimeMinutes: 110 },
    { name: "Chicken Hawawshi", nameAr: "هواوشي دجاج", description: "A lighter take on the Cairo classic — minced free-range chicken with onions, fresh herbs and green chilli baked inside baladi bread until golden and crunchy all the way through.", descriptionAr: "نسخة أخف من الكلاسيكي القاهري — دجاج بلدي مفروم مع بصل وأعشاب طازجة وفلفل حار أخضر مخبوز داخل خبز بلدي حتى يصبح ذهبياً ومقرمشاً تماماً.", price: 80, categoryId: c["meat"].id, categoryName: "Meat Dishes", categoryNameAr: "أطباق اللحوم", imageUrl: "/kofta.png", dietary: [], isAvailable: true, isFeatured: false, chefName: chef["Samia Farouk"].name, chefNameAr: chef["Samia Farouk"].nameAr, rating: 4.6, prepTimeMinutes: 30 },

    /* Soups & Stews */
    { name: "Molokhia with Chicken", nameAr: "ملوخية بالدجاج", description: "Silky jute leaves simmered low and slow in a rich free-range chicken broth, finished with a sizzling ta'leya of garlic and dried coriander poured tableside.", descriptionAr: "أوراق ملوخية ناعمة تُطهى ببطء في مرق دجاج بلدي غني، منتهية بتقلية مقلية من الثوم والكسبرة المجففة تُسكب على الطاولة.", price: 130, categoryId: c["soups-stews"].id, categoryName: "Soups & Stews", categoryNameAr: "شوربات وطواجن", imageUrl: "/molokhia.png", dietary: ["gluten-free"], isAvailable: true, isFeatured: false, chefName: chef["Hanan Ibrahim"].name, chefNameAr: chef["Hanan Ibrahim"].nameAr, rating: 4.8, prepTimeMinutes: 50 },
    { name: "Molokhia with Rabbit", nameAr: "ملوخية بالأرانب", description: "The Giza Sunday classic — whole rabbit portions braised in rich broth, served alongside silky molokhia with its signature garlicky ta'leya. Hanan's most celebrated dish.", descriptionAr: "الكلاسيكي الجيزاوي ليوم الأحد — قطع أرنب كاملة مطبوخة في مرق غني، تُقدَّم مع ملوخية ناعمة وتقليتها الثومية المميزة. أشهر أطباق حنان.", price: 175, categoryId: c["soups-stews"].id, categoryName: "Soups & Stews", categoryNameAr: "شوربات وطواجن", imageUrl: "/molokhia.png", dietary: ["gluten-free"], isAvailable: true, isFeatured: true, chefName: chef["Hanan Ibrahim"].name, chefNameAr: chef["Hanan Ibrahim"].nameAr, rating: 4.9, prepTimeMinutes: 75 },
    { name: "Shorbet Ads", nameAr: "شوربة عدس", description: "Velvety red lentil soup made with Luxor lentils, roasted cumin, fresh lemon and topped with a swirl of crispy golden fried onions and a drizzle of chilli oil.", descriptionAr: "شوربة عدس أحمر مخملية من عدس الأقصر مع كمون محمص وليمون طازج ومزينة بحلقات بصل مقلية ذهبية ورذاذ زيت الفلفل الحار.", price: 75, categoryId: c["soups-stews"].id, categoryName: "Soups & Stews", categoryNameAr: "شوربات وطواجن", imageUrl: "/molokhia.png", dietary: ["vegan", "gluten-free"], isAvailable: true, isFeatured: false, chefName: chef["Hanan Ibrahim"].name, chefNameAr: chef["Hanan Ibrahim"].nameAr, rating: 4.7, prepTimeMinutes: 35 },
    { name: "Chicken Tagine", nameAr: "طاجن دجاج", description: "Free-range chicken, seasonal vegetables and preserved lemon sealed inside a clay tagine with saffron, then slow-cooked for three hours until the meat falls from the bone.", descriptionAr: "دجاج بلدي وخضار موسمية وليمون مخلل مختومة داخل طاجن فخاري مع زعفران، ثم تُطهى ببطء لثلاث ساعات حتى تتساقط اللحمة من العظمة.", price: 175, categoryId: c["soups-stews"].id, categoryName: "Soups & Stews", categoryNameAr: "شوربات وطواجن", imageUrl: "/molokhia.png", dietary: ["gluten-free"], isAvailable: true, isFeatured: false, chefName: chef["Hanan Ibrahim"].name, chefNameAr: chef["Hanan Ibrahim"].nameAr, rating: 4.8, prepTimeMinutes: 80 },
    { name: "Shorbet Feraakh", nameAr: "شوربة فراخ", description: "Crystal-clear free-range chicken broth simmered for four hours with whole spices, celery and carrots — nourishing, light and deeply comforting.", descriptionAr: "مرق دجاج بلدي صافٍ كالكريستال يُطهى لأربع ساعات مع البهارات الكاملة والكرفس والجزر — مغذٍّ وخفيف ومريح للأعماق.", price: 65, categoryId: c["soups-stews"].id, categoryName: "Soups & Stews", categoryNameAr: "شوربات وطواجن", imageUrl: "/molokhia.png", dietary: ["gluten-free"], isAvailable: true, isFeatured: false, chefName: chef["Hanan Ibrahim"].name, chefNameAr: chef["Hanan Ibrahim"].nameAr, rating: 4.6, prepTimeMinutes: 40 },

    /* Salads & Sides */
    { name: "Salata Baladi", nameAr: "سلطة بلدي", description: "Classic Egyptian village salad of vine-ripened tomatoes, cucumber, red onion and flat-leaf parsley in a sharp lemon and extra-virgin olive oil dressing.", descriptionAr: "السلطة البلدية الكلاسيكية من طماطم ناضجة على الكرمة وخيار وبصل أحمر وبقدونس مع تتبيلة حامضة من الليمون وزيت الزيتون البكر.", price: 55, categoryId: c["salads-sides"].id, categoryName: "Salads & Sides", categoryNameAr: "سلطات ومقبلات", imageUrl: "/mahshi.png", dietary: ["vegan", "gluten-free"], isAvailable: true, isFeatured: false, chefName: chef["Umm Hassan"].name, chefNameAr: chef["Umm Hassan"].nameAr, rating: 4.6, prepTimeMinutes: 10 },
    { name: "Tahini & Baba Ghanoush", nameAr: "طحينة وبابا غنوج", description: "Freshly stone-ground sesame tahini alongside flame-roasted aubergine mashed with garlic, lemon and smoked paprika — served with warm baladi bread for dipping.", descriptionAr: "طحينة سمسم مطحونة حجراً طازجة مع متبل باذنجان محمص على النار ومهروس بالثوم والليمون والبابريكا المدخنة — تُقدَّم مع خبز بلدي دافئ.", price: 70, categoryId: c["salads-sides"].id, categoryName: "Salads & Sides", categoryNameAr: "سلطات ومقبلات", imageUrl: "/mahshi.png", dietary: ["vegan"], isAvailable: true, isFeatured: false, chefName: chef["Samia Farouk"].name, chefNameAr: chef["Samia Farouk"].nameAr, rating: 4.7, prepTimeMinutes: 15 },
    { name: "Egyptian Fattoush", nameAr: "فتوش مصري", description: "Crispy shards of toasted baladi bread tossed with romaine, radish, mint, sumac-pickled red onion and a pomegranate-lemon dressing — crunchy, bright and refreshing.", descriptionAr: "قطع خبز بلدي مقرمشة مع خس ورومان وفجل ونعناع وبصل أحمر مخلل بالسماق وتتبيلة رمان وليمون — مقرمش ومنعش.", price: 60, categoryId: c["salads-sides"].id, categoryName: "Salads & Sides", categoryNameAr: "سلطات ومقبلات", imageUrl: "/mahshi.png", dietary: ["vegan"], isAvailable: true, isFeatured: false, chefName: chef["Umm Hassan"].name, chefNameAr: chef["Umm Hassan"].nameAr, rating: 4.5, prepTimeMinutes: 12 },
    { name: "Hummus Baladi", nameAr: "حمص بلدي", description: "Slow-cooked Egyptian chickpeas blended until impossibly silky with tahini, fresh lemon and a drizzle of top-grade olive oil — finished with a dusting of cumin and paprika.", descriptionAr: "حمص مصري مطبوخ ببطء ممزوج حتى يصبح ناعماً بشكل لا يُصدَّق مع الطحينة والليمون الطازج وزيت الزيتون الممتاز — منتهٍ بالكمون والبابريكا.", price: 65, categoryId: c["salads-sides"].id, categoryName: "Salads & Sides", categoryNameAr: "سلطات ومقبلات", imageUrl: "/mahshi.png", dietary: ["vegan", "gluten-free"], isAvailable: true, isFeatured: false, chefName: chef["Samia Farouk"].name, chefNameAr: chef["Samia Farouk"].nameAr, rating: 4.7, prepTimeMinutes: 10 },

    /* Desserts */
    { name: "Umm Ali", nameAr: "أم علي", description: "Egypt's most beloved dessert — torn puff pastry soaked in sweetened cream, scattered with toasted almonds, hazelnuts, coconut and raisins, then baked until bubbling and golden.", descriptionAr: "أشهر حلوى مصرية — عجينة منفوخة مقطعة منقوعة في كريمة محلاة مع لوز وبندق وجوز هند وزبيب محمص، ثم مخبوزة حتى تفور وتصبح ذهبية.", price: 85, categoryId: c["desserts"].id, categoryName: "Desserts", categoryNameAr: "حلويات", imageUrl: "/umm_ali.png", dietary: [], isAvailable: true, isFeatured: true, chefName: chef["Maha El-Sayed"].name, chefNameAr: chef["Maha El-Sayed"].nameAr, rating: 4.9, prepTimeMinutes: 25 },
    { name: "Basbousa bil Ashta", nameAr: "بسبوسة بالقشطة", description: "Golden semolina cake soaked in rose-water syrup for 24 hours, topped with thick clotted ashta cream and crushed pistachios — Maha's signature after-Ramadan dessert.", descriptionAr: "كيكة سميد ذهبية منقوعة في قطر ماء الورد لـ 24 ساعة، مزينة بالقشطة الكثيفة والفستق المطحون — حلوى مها المميزة بعد رمضان.", price: 75, categoryId: c["desserts"].id, categoryName: "Desserts", categoryNameAr: "حلويات", imageUrl: "/umm_ali.png", dietary: [], isAvailable: true, isFeatured: false, chefName: chef["Maha El-Sayed"].name, chefNameAr: chef["Maha El-Sayed"].nameAr, rating: 4.8, prepTimeMinutes: 20 },
    { name: "Konafa bil Goz el-Hend", nameAr: "كنافة بجوز الهند", description: "Hand-pulled shredded filo pastry filled with sweet cream cheese and toasted coconut, baked until deep golden, then flooded with orange-blossom honey syrup.", descriptionAr: "عجينة كنافة مسحوبة باليد محشوة بجبنة قشطة حلوة وجوز هند محمص، مخبوزة حتى تصبح ذهبية عميقة ثم تُغرق بقطر عسل زهر البرتقال.", price: 95, categoryId: c["desserts"].id, categoryName: "Desserts", categoryNameAr: "حلويات", imageUrl: "/umm_ali.png", dietary: [], isAvailable: true, isFeatured: false, chefName: chef["Maha El-Sayed"].name, chefNameAr: chef["Maha El-Sayed"].nameAr, rating: 4.9, prepTimeMinutes: 30 },
    { name: "Mahalabiya", nameAr: "محلبية", description: "Silky Egyptian milk pudding set with cornstarch and scented with mastic and orange blossom, chilled until trembling-soft and scattered with crushed pistachios and rose petals.", descriptionAr: "محلبية مصرية ناعمة مضبوطة بالنشا ومعطرة بالمستكة وماء الورد، مبردة حتى تهتز بنعومة ومزينة بالفستق المطحون وبتلات الورد.", price: 60, categoryId: c["desserts"].id, categoryName: "Desserts", categoryNameAr: "حلويات", imageUrl: "/umm_ali.png", dietary: ["gluten-free"], isAvailable: true, isFeatured: false, chefName: chef["Maha El-Sayed"].name, chefNameAr: chef["Maha El-Sayed"].nameAr, rating: 4.7, prepTimeMinutes: 15 },
    { name: "Zalabia", nameAr: "زلابية", description: "Crispy spirals of leavened dough fried golden and drizzled immediately with jasmine-scented honey syrup — best eaten warm, when the outside shatters and the inside is pillowy soft.", descriptionAr: "أقراص حلزونية مقرمشة من العجينة المخمرة مقلية حتى تصبح ذهبية ومغمورة فوراً بقطر العسل المعطر بالياسمين — تُؤكل دافئة حين تتكسر من الخارج وتصبح وثيرة من الداخل.", price: 55, categoryId: c["desserts"].id, categoryName: "Desserts", categoryNameAr: "حلويات", imageUrl: "/umm_ali.png", dietary: ["vegan"], isAvailable: true, isFeatured: false, chefName: chef["Maha El-Sayed"].name, chefNameAr: chef["Maha El-Sayed"].nameAr, rating: 4.6, prepTimeMinutes: 20 },

  ]).returning();
  console.log(`  ✓ Inserted ${items.length} menu items`);

  /* ── Update itemCount on chefs & categories ─────────────────────── */
  for (const ch of chefs) {
    const cnt = items.filter((i) => i.chefName === ch.name).length;
    await db.update(chefsTable).set({ itemCount: cnt }).where(eq(chefsTable.id, ch.id));
  }
  for (const cat of cats) {
    const cnt = items.filter((i) => i.categoryId === cat.id).length;
    await db.update(categoriesTable).set({ itemCount: cnt }).where(eq(categoriesTable.id, cat.id));
  }
  console.log("  ✓ Updated itemCount on chefs and categories");

  /* ── Testimonials ───────────────────────────────────────────────── */
  const testimonials = await db.insert(testimonialsTable).values([
    { name: "Layla Hassan", nameAr: "ليلى حسن", quote: "Umm Hassan's koshari brought back memories of eating on the street in Sayeda Zeinab. Three lentil layers, crispy onions, the sauce just right. I've ordered every week for four months now.", quoteAr: "كشري أم حسن أعاد لي ذكريات الأكل في شارع السيدة زينب. ثلاث طبقات عدس وبصل مقلي والصلصة صح تماماً. طلبت كل أسبوع منذ أربعة أشهر.", type: "customer", rating: 5, avatarUrl: "/koshari.png" },
    { name: "Ahmed Kamal", nameAr: "أحمد كمال", quote: "Nadia's mixed mahshi platter — my entire family argued over who got the last stuffed pepper. That is the highest compliment I know how to give.", quoteAr: "طبق محاشي نادية المشكل — تجادلت عائلتي بأكملها على آخر فلفلة محشية. هذا أعلى مديح أعرفه.", type: "customer", rating: 5, avatarUrl: "/mahshi.png" },
    { name: "Dina Samir", nameAr: "دينا سمير", quote: "Samia's lamb fattah for Eid was exactly what I grew up eating at my grandmother's — crispy bread soaked in that garlic broth. I cried a little, honestly.", quoteAr: "فتة لحم الضأن من سامية في العيد كانت بالضبط ما كبرت عليه في بيت جدتي — خبز مقرمش منقوع في مرق الثوم. بكيت قليلاً بصراحة.", type: "customer", rating: 5, avatarUrl: "/fatta.png" },
    { name: "Sara Mostafa", nameAr: "سارة مصطفى", quote: "Maha's umm ali arrived warm, perfectly creamy, with toasted nuts in every spoonful. I closed my eyes and I was back in my mother's kitchen. Five stars isn't enough.", quoteAr: "أم علي مها وصلت دافئة وكريمية بشكل مثالي مع مكسرات محمصة في كل ملعقة. أغمضت عيني وعدت إلى مطبخ أمي. خمس نجوم لا تكفي.", type: "customer", rating: 5, avatarUrl: "/umm_ali.png" },
    { name: "Khaled Mansour", nameAr: "خالد منصور", quote: "Hanan's molokhia with chicken is the real thing — that ta'leya poured at the table, the smell that fills the room. My kids have started requesting it every Sunday like clockwork.", quoteAr: "ملوخية حنان بالدجاج هي الشيء الحقيقي — التقلية تُسكب على الطاولة والرائحة تملأ الغرفة. أولادي بدأوا يطلبونها كل أحد مثل الساعة.", type: "customer", rating: 5, avatarUrl: "/molokhia.png" },
    { name: "Mariam Youssef", nameAr: "مريم يوسف", quote: "I ordered the rabbit molokhia for my parents' anniversary dinner. My mother said it was better than the version she's been making for 40 years. I didn't tell Hanan that — I was afraid she'd raise the price.", quoteAr: "طلبت ملوخية الأرانب لعشاء ذكرى زواج والديّ. قالت أمي إنها أحسن من النسخة التي تطبخها منذ 40 سنة. ما قلتش لحنان — خفت ترفع السعر.", type: "customer", rating: 5, avatarUrl: "/molokhia.png" },
    { name: "Omar Fathy", nameAr: "عمر فتحي", quote: "Our team of 40 orders lunch from Get Mumm three times a week. Always on time, always hot, and every single person finishes their plate. That never happened with any other catering.", quoteAr: "فريقنا المكون من 40 شخصاً يطلب الغداء من Get Mumm ثلاث مرات أسبوعياً. دائماً في الوقت وساخن دائماً وكل شخص ينهي طبقه. هذا لم يحدث مع أي تقديم طعام آخر.", type: "office", rating: 5, avatarUrl: "/office_catering.png", company: "Nile Digital Agency", companyAr: "وكالة نايل ديجيتال", role: "Operations Manager", roleAr: "مدير العمليات" },
    { name: "Rania El-Desoky", nameAr: "رانيا الدسوقي", quote: "We tried five catering companies before Get Mumm. We are the only office where people ask for the chef's name after lunch. Samia's kofta is what converted us.", quoteAr: "جربنا خمس شركات تقديم طعام قبل Get Mumm. نحن المكتب الوحيد الذي يسأل فيه الناس عن اسم الطاهية بعد الغداء. كفتة سامية هي ما حوّلنا.", type: "office", rating: 5, avatarUrl: "/office_catering.png", company: "Maadi Architecture Studio", companyAr: "استوديو معادي للعمارة", role: "Founder", roleAr: "المؤسسة" },
    { name: "Tarek Galal", nameAr: "طارق جلال", quote: "Switched our weekly team lunch to Get Mumm six months ago. Productivity is up — I'm only half joking. Food this good makes people happy to come back to the office.", quoteAr: "غيّرنا غداء الفريق الأسبوعي إلى Get Mumm منذ ستة أشهر. الإنتاجية ارتفعت — أنا أمزح بشكل نصفي فقط. طعام بهذه الجودة يجعل الناس سعيدين بالعودة للمكتب.", type: "office", rating: 5, avatarUrl: "/office_catering.png", company: "Cairo Tech Hub", companyAr: "كايرو تك هاب", role: "CEO", roleAr: "المدير التنفيذي" },
    { name: "Yasmin Nour", nameAr: "ياسمين نور", quote: "I ordered Nadia's vine leaves for a dinner party of twelve. Every guest asked me which restaurant I used. When I said it was a home cook, no one believed me.", quoteAr: "طلبت ورق عنب نادية لعشاء من اثني عشر شخصاً. كل ضيف سألني أي مطعم استخدمت. حين قلت إنها طاهية منزلية، لم يصدق أحد.", type: "customer", rating: 5, avatarUrl: "/mahshi.png" },
  ]).returning();
  console.log(`  ✓ Inserted ${testimonials.length} testimonials`);

  /* ── Blog Posts ─────────────────────────────────────────────────── */
  const posts = await db.insert(blogPostsTable).values([
    {
      title: "The Story of Koshari: Egypt's Accidental National Dish",
      titleAr: "قصة الكشري: الطبق الوطني المصري غير المقصود",
      slug: "story-of-koshari",
      excerpt: "From humble street corners to international food festivals — how a mishmash of leftover grains became Egypt's most iconic meal.",
      excerptAr: "من أرصفة الشوارع المتواضعة إلى مهرجانات الطعام الدولية — كيف أصبح خليط بقايا الحبوب الوجبة الأكثر شهرة في مصر.",
      content: `<p>No one planned koshari. That is what makes it so perfectly Egyptian.</p>
<p>Food historians trace the dish's lineage to at least three continents: the lentils from the Nile Valley, the macaroni from Italian influence during the 19th century, and the spiced tomato sauce possibly borrowed from Indian workers who settled along the canal during the khedival era. Rice was already everywhere. The fried onions — the golden, shatteringly crisp ones that make or break a bowl — those are a local innovation no one can claim.</p>
<p>What is remarkable is not the individual ingredients but how they arrived together. Koshari is, in essence, a dish made of leftovers elevated by audacity. Street vendors in the nineteenth century would combine whatever grains were available and sell bowls for a handful of milliemes. It fed the poor. It fed the students. It fed the workers who built modern Cairo.</p>
<h2>The Anatomy of a Perfect Bowl</h2>
<p>Ask any Egyptian and they will tell you there is a right way and a wrong way. The rice must be cooked separately — never together with the lentils. The lentils must be brown, not green, and soft enough to give when pressed but not collapsing into paste. The macaroni is always elbow-shaped. Always.</p>
<p>The tomato sauce is where most vendors are judged. The base is simple: tomato, garlic, vinegar, cumin, and chilli. But the proportions are everything. Too much vinegar and the sauce tastes sharp and thin. Too little and it has no character. The best versions sit somewhere between sharp and rich, with a dark depth that can only come from letting the garlic fry long past golden — almost to the edge of burnt.</p>
<p>Then the ta'leya: a separate garnish of garlic fried in hot oil poured over at the last moment. Not every vendor does this. The ones that do are the ones with queues down the street.</p>
<h2>Umm Hassan's Version</h2>
<p>When we brought Umm Hassan onto the Get Mumm platform, we asked her what makes her koshari different from the thousand other versions in Cairo. She didn't answer immediately. She went to her stove and came back fifteen minutes later with a bowl.</p>
<p>"Eat first," she said. "Then I'll tell you."</p>
<p>We ate. The onions were extraordinary — not just fried but caramelised to a mahogany depth that added sweetness to the sharp sauce. The lentils had a nuttiness we hadn't tasted before. She told us she toasts them dry before boiling. Five minutes in a dry pan. "My mother's trick," she said. "Nobody does this anymore."</p>
<p>Her sauce is made fresh every morning. She refuses to use the batch she made the day before, even if there is plenty left. "You can taste a day-old sauce," she says. "The tomato gets tired."</p>`,
      contentAr: `<p>لم يُخطِّط أحد للكشري. هذا ما يجعله مصرياً بامتياز.</p>
<p>يرجع المؤرخون الطهويون أصول الطبق إلى ثلاث قارات على الأقل: العدس من وادي النيل، والمعكرونة من التأثير الإيطالي في القرن التاسع عشر، وصلصة الطماطم المتبلة المقتبسة ربما من العمال الهنود الذين استقروا على ضفاف القناة في العهد الخديوي. أما الأرز فكان في كل مكان. والبصل المقلي — ذلك الذهبي المقرمش الذي يصنع الفارق في الطبق — فهو ابتكار محلي لا يمكن لأحد المطالبة به.</p>
<p>ما هو مذهل ليس المكونات الفردية بل كيفية اجتماعها. الكشري في جوهره طبق من البقايا ارتفع بجرأة. كان باعة الشوارع في القرن التاسع عشر يجمعون ما تبقى من حبوب ويبيعون أطباقاً بقبضة من المليمات. أطعم الفقراء. أطعم الطلاب. أطعم العمال الذين بنوا القاهرة الحديثة.</p>`,
      imageUrl: "/koshari.png",
      type: "blog",
      publishedAt: "2026-01-15",
      author: "Nour El-Masry",
      authorAr: "نور المصري",
      readTimeMinutes: 7,
      tags: ["koshari", "cairo", "street food", "history"],
    },
    {
      title: "Mahshi: The Art of the Stuffed Vegetable",
      titleAr: "المحاشي: فن الخضار المحشية",
      slug: "art-of-mahshi",
      excerpt: "A rolling lesson from Nadia Magdi — why the best mahshi is made slowly, and what separates Alexandria's tradition from Cairo's.",
      excerptAr: "درس في اللف من نادية مجدي — لماذا أفضل المحاشي يُصنع ببطء، وما الذي يميز تقليد الإسكندرية عن القاهرة.",
      content: `<p>Nadia Magdi lays out the vine leaves the way a surgeon lays out instruments — each one flat, each one aligned, the stem trimmed with two quick cuts of a small knife she has used for twenty years.</p>
<p>"The leaf has a direction," she explains, without looking up. "You always roll with the direction of the veins, not against them. If you go against them, they crack when they cook."</p>
<p>This is the kind of knowledge that lives in the hands, not in recipe books. Nadia learned it from her grandmother in Alexandria, who learned it from her mother, who learned it in a kitchen that no longer exists in a neighbourhood that no longer exists either.</p>
<h2>Alexandria vs. Cairo</h2>
<p>There is a quiet, longstanding argument between Alexandrians and Cairenes about who makes better mahshi. Alexandrians will tell you theirs is lighter — more lemon, more dill, less of the heavy tomato that Cairo kitchens favour. Cairenes will tell you the Alexandrian version is too delicate, too Mediterranean, not Egyptian enough.</p>
<p>Nadia is Alexandrian, but she has lived in Cairo for twenty years. Her mahshi is a settlement between the two traditions: lemon-bright but with body, fragrant with dill but anchored by the slow cooking in a pot lined with lamb ribs whose fat melts into the broth over two hours.</p>
<p>"The ribs are not decoration," she says. "They are the soul of the pot. Without them the vine leaves taste of nothing but themselves."</p>
<h2>The Rolling</h2>
<p>A spoonful of rice mixture — never more, never less. She doesn't measure. After twenty years, her palm is the measure. The leaf goes shiny-side down on the mat. Rice goes in the centre, just below the stem end. The bottom folds up first, then the sides, then you roll away from yourself: tight but not so tight the leaf will split when the rice swells in cooking.</p>
<p>She can roll forty leaves in the time it takes most people to roll five. Each one identical. Each one a small architecture.</p>`,
      contentAr: `<p>تفرد نادية مجدي أوراق العنب كما يفرد الجراح أدواته — كل ورقة مسطحة، كل ورقة محاذية، العرق مقلوم بقطعتين سريعتين بسكين صغيرة استخدمتها لعشرين عاماً.</p>
<p>"الورقة لها اتجاه" تشرح دون أن ترفع نظرها. "تلف دائماً مع اتجاه العروق لا ضدها. إذا لففت ضدها تتشقق حين تُطهى."</p>
<p>هذا النوع من المعرفة يعيش في اليدين لا في كتب الوصفات. تعلمته نادية من جدتها في الإسكندرية، التي تعلمته من أمها، التي تعلمته في مطبخ لم يعد موجوداً في حي لم يعد موجوداً أيضاً.</p>`,
      imageUrl: "/mahshi.png",
      type: "blog",
      publishedAt: "2026-02-03",
      author: "Heba Rashid",
      authorAr: "هبة راشد",
      readTimeMinutes: 6,
      tags: ["mahshi", "stuffed", "alexandria", "tradition"],
    },
    {
      title: "How to Make Umm Ali at Home (Maha's Method)",
      titleAr: "طريقة تحضير أم علي في المنزل (طريقة مها)",
      slug: "umm-ali-recipe-maha",
      excerpt: "The full recipe from Maha El-Sayed — including the one step most home cooks skip that makes all the difference.",
      excerptAr: "الوصفة الكاملة من مها السيد — بما فيها الخطوة التي يتخطاها معظم الطهاة في المنزل والتي تصنع الفارق كله.",
      content: `<p>Maha El-Sayed has been making umm ali for thirty years, and in that time she has made it for Eid tables, for condolence visits, for new babies and for no occasion at all — just because someone in the neighbourhood was having a bad week.</p>
<p>"Umm ali is not a recipe," she says. "It is an act of care."</p>
<p>That said, there is a recipe. And there is a step most home cooks skip.</p>
<h2>Ingredients (serves 6–8)</h2>
<ul>
<li>500g puff pastry (thawed if frozen, or use day-old croissants for a richer result)</li>
<li>1 litre full-fat milk</li>
<li>200ml double cream</li>
<li>4 tablespoons sugar (more to taste)</li>
<li>1 teaspoon vanilla extract</li>
<li>1 teaspoon rose water</li>
<li>100g mixed toasted nuts: almonds, hazelnuts, walnuts</li>
<li>50g desiccated coconut, lightly toasted</li>
<li>50g golden raisins, soaked in warm water for 10 minutes</li>
</ul>
<h2>The Method</h2>
<p><strong>Step 1 — Toast the pastry.</strong> Tear the puff pastry into rough pieces, no larger than a playing card. Spread them on a baking tray and bake at 200°C for 12 minutes, until golden and very crisp. They should sound hollow when you tap them. This is the step most people skip. They use untoasted pastry and wonder why their umm ali is soggy.</p>
<p><strong>Step 2 — Make the cream base.</strong> Warm the milk, cream, sugar and vanilla together in a saucepan until the sugar dissolves and the liquid steams but does not boil. Add the rose water at the very end, off the heat — it loses its fragrance if cooked.</p>
<p><strong>Step 3 — Build the dish.</strong> Spread half the toasted pastry pieces across the bottom of a large ovenproof dish. Scatter over half the nuts, coconut and raisins. Add the remaining pastry on top, then the remaining nuts and fruit.</p>
<p><strong>Step 4 — Pour and bake.</strong> Pour the hot cream slowly and evenly over the pastry. It will sink. That is correct. Let it sit for two minutes, then bake at 200°C for 15–18 minutes, until the top is golden and the cream is bubbling around the edges.</p>
<p><strong>Step 5 — Serve immediately.</strong> Umm ali waits for no one. It is best the moment it comes from the oven, when the top is crisp and the underneath is cream-soaked and yielding.</p>
<h2>Maha's Note</h2>
<p>"The nuts must be warm when they go in," she says. "Toast them in a dry pan while the pastry is in the oven. Cold nuts kill the dish."</p>`,
      contentAr: `<p>تصنع مها السيد أم علي منذ ثلاثين عاماً، وفي تلك الفترة صنعتها لموائد العيد، وزيارات العزاء، والمواليد الجدد ولأسباب أخرى — فقط لأن شخصاً في الحي كان يمر بأسبوع صعب.</p>
<p>"أم علي ليست وصفة" تقول. "هي فعل عناية."</p>
<p>مع ذلك، هناك وصفة. وهناك خطوة يتخطاها معظم الطهاة في المنزل.</p>
<h2>المكونات (لـ 6-8 أشخاص)</h2>
<ul>
<li>500 جرام عجينة منفوخة (مذابة إذا كانت مجمدة، أو استخدمي كرواسون اليوم السابق لنتيجة أغنى)</li>
<li>لتر حليب كامل الدسم</li>
<li>200 مل كريمة مزدوجة</li>
<li>4 ملاعق كبيرة سكر (حسب الذوق)</li>
<li>ملعقة صغيرة فانيليا</li>
<li>ملعقة صغيرة ماء ورد</li>
<li>100 جرام مكسرات مشكلة محمصة: لوز وبندق وجوز</li>
<li>50 جرام جوز هند مجفف محمص قليلاً</li>
<li>50 جرام زبيب ذهبي منقوع في ماء دافئ لـ 10 دقائق</li>
</ul>`,
      imageUrl: "/umm_ali.png",
      type: "recipe",
      publishedAt: "2026-02-20",
      author: "Maha El-Sayed",
      authorAr: "مها السيد",
      readTimeMinutes: 8,
      tags: ["umm ali", "recipe", "dessert", "baking"],
    },
    {
      title: "Ful Medames: Egypt's Morning Ritual",
      titleAr: "الفول المدمس: طقس الصباح المصري",
      slug: "ful-medames-morning-ritual",
      excerpt: "Why Egyptians have been eating slow-cooked fava beans for breakfast since the time of the pharaohs — and how Umm Hassan still makes it the old way.",
      excerptAr: "لماذا يأكل المصريون الفول المدمس على الإفطار منذ عهد الفراعنة — وكيف تصنعه أم حسن بالطريقة القديمة.",
      content: `<p>Egyptians have been eating ful since at least 2600 BCE. Fava beans were found in the tombs of the pharaohs at Gebelein, provisioned for the afterlife. This is a serious breakfast food.</p>
<p>The ritual is almost unchanged. The beans — large, dried, brown-skinned — are soaked overnight and then cooked in a qidra, a heavy copper or earthenware pot sealed with a lid, over very low heat for anything from eight to twelve hours. The pot sits on the coals overnight and in the morning there is breakfast.</p>
<p>Modern versions use pressure cookers and canned beans. Umm Hassan does not. She soaks her beans the day before and starts the qidra at midnight. By five in the morning the kitchen smells of something warm and earthy and irreducible.</p>
<h2>The Toppings Are the Argument</h2>
<p>Every Egyptian has strong opinions about ful toppings and everyone is right. The base is non-negotiable: garlic, cumin, salt, lemon. After that, the variations are infinite.</p>
<p>Some people use butter — a thick pad of it, melting into the warm beans. Others use olive oil and only olive oil, from the first pressing, unfiltered, green and grassy. There are those who add diced tomatoes and those who consider this an abomination. Hard-boiled eggs are eaten alongside or crumbled into the bowl. Chilli, raw or pickled. Fresh parsley. Some people even use tahini, which creates a completely different dish that is delicious but is not, strictly speaking, ful medames.</p>
<p>Umm Hassan serves hers with a drizzle of extra-virgin olive oil, a squeeze of lemon applied at the moment of serving, and a small saucer of raw chilli on the side. She does not put the chilli in the ful itself. "That is for each person to decide," she says. "I'm not responsible for your stomach."</p>`,
      contentAr: `<p>يأكل المصريون الفول منذ عام 2600 قبل الميلاد على الأقل. وُجدت حبوب الفول في مقابر الفراعنة في جبلين، مُعدَّة للحياة الآخرة. هذا طعام إفطار جاد.</p>
<p>الطقس لم يتغير تقريباً. الحبوب — الكبيرة والمجففة والبنية الجلد — تُنقع طوال الليل ثم تُطهى في قدرة، وهي وعاء نحاسي أو فخاري ثقيل مختوم بغطاء، على نار خفيفة جداً لثماني إلى اثنتي عشرة ساعة. تجلس القدرة على الجمر طوال الليل وفي الصباح يكون الإفطار جاهزاً.</p>`,
      imageUrl: "/koshari.png",
      type: "blog",
      publishedAt: "2026-03-05",
      author: "Umm Hassan",
      authorAr: "أم حسن",
      readTimeMinutes: 6,
      tags: ["ful", "breakfast", "tradition", "pharaohs"],
    },
    {
      title: "Kofta: Seven Spices and a Clay Oven",
      titleAr: "الكفتة: سبع بهارات وفرن فخاري",
      slug: "kofta-seven-spices",
      excerpt: "Samia Farouk's secret spice blend, the charcoal technique, and why she refuses to use a meat grinder.",
      excerptAr: "مزيج بهارات سامية فاروق السري وتقنية الفحم ولماذا ترفض استخدام مفرمة اللحم.",
      content: `<p>Samia Farouk will not tell you the exact proportions of her seven-spice blend. She has been asked. She smiles and changes the subject.</p>
<p>What she will tell you: the spices are cumin, coriander, cinnamon, allspice, black pepper, nutmeg and cardamom. The proportions shift depending on the season, the batch of meat, and something she describes as "the mood of the day." This is not mysticism. It is the accumulated calibration of a cook who has made this dish thousands of times and whose palate has become a precision instrument.</p>
<h2>The Meat</h2>
<p>She insists on hand-chopping the meat. Not because she doesn't own a mincer — she does — but because the mincer produces meat of uniform texture, and uniform texture, she says, makes for a kofta that slides off the skewer and falls apart on the grill.</p>
<p>Hand-chopping produces irregular pieces. Some will be fine, some a little coarser. When they are combined with the fat and the onion and the herbs and shaped around the skewer, the irregular pieces interlock and hold. "The texture is what keeps it together," she says. "Not egg. Not breadcrumbs. Texture."</p>
<h2>The Charcoal</h2>
<p>She uses Egyptian mesquite charcoal — the kind that burns hot and steady without flaring. She doesn't cook over a flame. She cooks over embers, which means the kofta is grilled in radiant heat rather than direct fire. "Flame burns the outside before the inside cooks," she explains. "Embers cook everything at the same time."</p>
<p>The kofta goes on the grill when the charcoal is covered with a thin grey ash — the moment when it is at its hottest and most stable. It takes four minutes on each side. No more. She turns it once and does not touch it again until it is done.</p>`,
      contentAr: `<p>لن تخبرك سامية فاروق بالنسب الدقيقة لمزيجها من سبع بهارات. لقد سُئلت. تبتسم وتغير الموضوع.</p>
<p>ما ستخبرك به: البهارات هي الكمون والكسبرة والقرفة والبهار والفلفل الأسود وجوزة الطيب والهيل. النسب تتغير بحسب الموسم ودفعة اللحم وشيء تصفه بـ"مزاج اليوم". هذا ليس تصوفاً. إنه المعايرة المتراكمة لطاهية صنعت هذا الطبق آلاف المرات وأصبح ذوقها أداة دقيقة.</p>`,
      imageUrl: "/kofta.png",
      type: "blog",
      publishedAt: "2026-03-18",
      author: "Samia Farouk",
      authorAr: "سامية فاروق",
      readTimeMinutes: 5,
      tags: ["kofta", "grilling", "spices", "technique"],
    },
    {
      title: "Slow-Cooked Molokhia: A Giza Sunday",
      titleAr: "الملوخية على نار هادئة: أحد الجيزة",
      slug: "molokhia-giza-sunday",
      excerpt: "Hanan Ibrahim on the weekly ritual that feeds her family, the ta'leya that wakes the whole building, and why rabbit is non-negotiable.",
      excerptAr: "حنان إبراهيم عن الطقس الأسبوعي الذي يُطعم عائلتها والتقلية التي تُوقظ المبنى بأكمله ولماذا الأرانب أمر لا يقبل النقاش.",
      content: `<p>Every Sunday morning in Hanan Ibrahim's building in Giza, the same thing happens. Around nine o'clock, a smell begins to drift from her kitchen down the stairwell — warm, green, with something sharp and garlicky underneath. By nine-thirty, her neighbour on the fourth floor has knocked on the door to "just check what she's making."</p>
<p>She is always making molokhia.</p>
<p>"My mother made it on Sundays. Her mother made it on Sundays. My daughters will make it on Sundays," Hanan says. "I don't know where the Sunday came from originally. It's just Sunday food."</p>
<h2>The Leaves</h2>
<p>Molokhia is jute leaf — Corchorus olitorius — a plant with a slippery, viscous quality when cooked that gives the dish its characteristic texture. Egyptians either love it or find it difficult. Those who love it call the texture silky. Those who don't call it something unprintable.</p>
<p>Hanan buys her leaves fresh from the market on Saturday afternoon, then strips them from their stems by hand. This takes two hours. She refuses to use frozen. "Frozen molokhia has no life in it," she says. "You can taste the cold."</p>
<h2>Why Rabbit</h2>
<p>Chicken molokhia is the everyday version. Rabbit molokhia is the Sunday version. This is the law in Giza and Hanan has no patience for those who argue with it.</p>
<p>The rabbit is browned first in a heavy pot — whole jointed pieces, skin on — until the exterior is deep mahogany. Then it is simmered for ninety minutes in water with onion, bay leaf and whole spices until the broth is rich and the meat is falling from the bone. The molokhia is cooked in this broth, not in water. The rabbit adds a sweetness and depth that chicken simply cannot replicate.</p>
<h2>The Ta'leya</h2>
<p>This is the moment the building wakes up. Oil heats in a small pan until it shimmers. Two whole heads of garlic go in — not cloves, heads — crushed, not chopped, because crushed garlic releases more of the volatile compounds. Then the dried coriander. It all goes in the hot oil at once and you have exactly forty-five seconds before it burns. Hanan pours it into the pot of molokhia and puts the lid back on immediately, letting the steam carry the fragrance through the whole dish.</p>`,
      contentAr: `<p>كل صباح أحد في مبنى حنان إبراهيم في الجيزة، يحدث الشيء نفسه. نحو التاسعة صباحاً، تبدأ رائحة تتسلل من مطبخها إلى الدرج — دافئة وخضراء مع شيء حاد وثومي في الأسفل. بحلول التاسعة والنصف، تكون جارتها في الطابق الرابع قد طرقت الباب "فقط لتتحقق مما تطبخه."</p>
<p>إنها دائماً تطبخ الملوخية.</p>
<p>"أمي كانت تطبخها يوم الأحد. وأم أمي كانت تطبخها يوم الأحد. بناتي سيطبخنها يوم الأحد" تقول حنان. "لا أعرف من أين جاء الأحد في الأصل. إنه ببساطة طعام يوم الأحد."</p>`,
      imageUrl: "/molokhia.png",
      type: "blog",
      publishedAt: "2026-04-07",
      author: "Hanan Ibrahim",
      authorAr: "حنان إبراهيم",
      readTimeMinutes: 7,
      tags: ["molokhia", "rabbit", "sunday", "giza"],
    },
    {
      title: "How to Make Stuffed Vine Leaves (Wara Einab)",
      titleAr: "طريقة تحضير ورق عنب محشي",
      slug: "stuffed-vine-leaves-recipe",
      excerpt: "Nadia Magdi's complete guide to rolling, filling, and slow-cooking the perfect wara einab — with the Alexandrian trick that makes all the difference.",
      excerptAr: "الدليل الكامل لنادية مجدي لف وحشو وطهي ورق العنب المثالي ببطء — مع الحيلة الإسكندرية التي تصنع الفارق كله.",
      content: `<p>Nadia's vine leaves are the product of two decades of refinement. This is the complete recipe, as she makes it.</p>
<h2>For the Rice Filling</h2>
<ul>
<li>400g Egyptian short-grain rice, washed three times until the water runs clear</li>
<li>3 medium tomatoes, very finely diced</li>
<li>1 large onion, grated (not chopped — grated dissolves into the rice)</li>
<li>Large bunch of flat-leaf parsley, finely chopped</li>
<li>Large bunch of fresh dill, finely chopped (the Alexandrian element)</li>
<li>6 tablespoons good olive oil</li>
<li>Juice of 2 lemons</li>
<li>1½ teaspoons salt, ½ teaspoon black pepper, ½ teaspoon cumin, pinch of cinnamon</li>
</ul>
<h2>For the Pot</h2>
<ul>
<li>500g lamb ribs or lamb neck chops</li>
<li>50 vine leaves (jarred, rinsed; or fresh if in season)</li>
<li>2 large tomatoes, sliced into rounds</li>
<li>Juice of 1 lemon</li>
<li>Salt, a generous pinch of sugar</li>
</ul>
<h2>The Rice Filling</h2>
<p>Combine all filling ingredients. Do not cook the rice first — it goes in raw. The raw rice will absorb the tomato juices and the olive oil and the herbs as it cooks inside the leaves, which is what creates the flavour. Taste the mixture: it should be sharply lemony, well-seasoned and fragrant. If it tastes bland uncooked, it will be bland cooked.</p>
<h2>The Rolling</h2>
<p>Lay each leaf shiny-side down on a flat surface. Remove any tough stems with a small cut. Place one level tablespoon of rice in the centre, just below the middle of the leaf. Fold the bottom of the leaf up over the rice. Fold in the sides. Roll away from you, firmly but without force. The roll should be the thickness of a finger and tight enough that it holds its shape when held in the air.</p>
<h2>Building the Pot</h2>
<p>Line the bottom of a heavy pot with the lamb ribs. Lay the tomato rounds over the ribs. Place the rolled vine leaves in tight layers on top, seam-side down, each one snug against the next. Pour over a mixture of water, lemon juice, a good pinch of salt and a pinch of sugar. The liquid should just cover the rolls. Place a heatproof plate on top, weighted with a heavy stone or tin. This keeps the rolls from unwrapping.</p>
<p>Bring to a simmer, then reduce to the lowest possible heat. Cook for 90 minutes. The rice will have swollen to fill the leaf completely and the outside of each roll will be soft and translucent. The cooking liquid in the bottom of the pot will have become a rich, fragrant broth from the lamb ribs.</p>
<p>Serve with a bowl of thick, cold yoghurt alongside.</p>`,
      contentAr: `<p>ورق عنب نادية هو نتاج عقدين من الصقل. هذه هي الوصفة الكاملة، كما تصنعها.</p>
<h2>لحشوة الأرز</h2>
<ul>
<li>400 جرام أرز مصري قصير الحبة، مغسول ثلاث مرات حتى يصفو الماء</li>
<li>3 طماطم متوسطة، مقطعة ناعماً جداً</li>
<li>بصلة كبيرة مبشورة (لا مقطعة — المبشور يذوب في الأرز)</li>
<li>حزمة كبيرة بقدونس ورقي مفروم ناعماً</li>
<li>حزمة كبيرة شبت طازج مفروم ناعماً (العنصر الإسكندراني)</li>
<li>6 ملاعق كبيرة زيت زيتون جيد</li>
<li>عصير ليمونتين</li>
<li>ملعقة ونصف صغيرة ملح، ونصف ملعقة فلفل أسود، ونصف ملعقة كمون، ورشة قرفة</li>
</ul>`,
      imageUrl: "/mahshi.png",
      type: "recipe",
      publishedAt: "2026-04-22",
      author: "Nadia Magdi",
      authorAr: "نادية مجدي",
      readTimeMinutes: 9,
      tags: ["wara einab", "mahshi", "recipe", "vine leaves"],
    },
    {
      title: "Fattah: The Eid Dish",
      titleAr: "الفتة: طبق العيد",
      slug: "fattah-eid-dish",
      excerpt: "Why this multi-layered dish of bread, rice and slow-braised lamb is the centrepiece of every Egyptian Eid celebration.",
      excerptAr: "لماذا يُعدّ هذا الطبق متعدد الطبقات من الخبز والأرز واللحم المطهي ببطء محوراً لكل احتفالات العيد المصرية.",
      content: `<p>In Egypt, fattah is not a meal. It is an occasion. No one makes fattah on a Tuesday because they happen to have lamb. Fattah is made for Eid al-Adha, for the feast after a wedding, for the celebration of a son's return from abroad. It is food that marks a moment.</p>
<p>The dish is a study in contrasts: crispy baladi bread soaked until soft, white rice cooked in rich lamb broth, whole braised lamb cut into pieces and placed on top, and then the sauce — a sharp, garlic-forward broth thickened with tomato paste and sharpened with more vinegar than you think is correct until you taste it.</p>
<h2>Samia's Technique</h2>
<p>Samia Farouk starts her fattah the evening before Eid. The lamb — she always uses the leg — goes into a large pot with onion, whole spices, bay leaves and enough water to cover by several centimetres. It simmers, not boils, for three hours. The difference matters: boiling makes the meat tough and the broth cloudy; simmering produces clear, sweet broth and meat that is still juicy.</p>
<p>The rice is cooked in the strained broth with a little butter and a teaspoon of the spice residue from the pot. This is the step that gives the fattah its depth. Plain rice tastes of nothing. Rice cooked in lamb broth tastes of everything that came before it.</p>
<h2>The Bread Layer</h2>
<p>Stale baladi bread, torn into pieces and fried in ghee until crisp. Not baked — fried. The fried bread has a richness that baked bread cannot replicate. It soaks up the broth poured over it but retains enough structure to provide contrast against the soft rice.</p>
<p>Samia says the bread should be "crispy going in and soft coming out." The broth is poured over it at the last moment before serving, so that by the time it reaches the table it has soaked up everything but still has some crunch in the centre.</p>
<h2>The Sauce</h2>
<p>Garlic — a great deal of it — fried in butter until just golden. Tomato paste stirred in and cooked for two minutes. Then a generous pour of the lamb broth, more salt, and a tablespoon of vinegar. This is poured over everything. It sounds too sharp. It is exactly right.</p>`,
      contentAr: `<p>في مصر، الفتة ليست وجبة. إنها مناسبة. لا أحد يصنع الفتة يوم الثلاثاء لأنه صادف أن لديه لحماً. الفتة تُصنع لعيد الأضحى، وللوليمة بعد الزفاف، والاحتفال بعودة ابن من الخارج. إنه طعام يُميِّز لحظة.</p>
<p>الطبق هو دراسة في التناقضات: خبز بلدي مقرمش منقوع حتى يلين، وأرز أبيض مطبوخ في مرق الضأن الغني، وخروف مطهو كامل مقطع موضوع فوقه، ثم الصلصة — مرق حاد بالثوم مثخّن بمعجون الطماطم ومحمَّض بخل أكثر مما تظن صحيحاً حتى تتذوقه.</p>`,
      imageUrl: "/fatta.png",
      type: "blog",
      publishedAt: "2026-05-10",
      author: "Nour El-Masry",
      authorAr: "نور المصري",
      readTimeMinutes: 7,
      tags: ["fattah", "eid", "lamb", "celebration"],
    },
    {
      title: "Konafa: How Maha Pulls the Dough by Hand",
      titleAr: "الكنافة: كيف تسحب مها العجينة باليد",
      slug: "konafa-hand-pulled-dough",
      excerpt: "The ancient craft of hand-pulled konafa pastry — and why Maha El-Sayed wakes at 4am every morning to do it.",
      excerptAr: "حرفة الكنافة المسحوبة باليد القديمة — ولماذا تستيقظ مها السيد في الساعة الرابعة صباحاً كل يوم لتصنعها.",
      content: `<p>Maha El-Sayed wakes at four o'clock every morning. By five she is standing at a round griddle the size of a cartwheel, a bowl of thin batter to her left and a pair of worn cotton gloves on her hands.</p>
<p>She dips her fingers into the batter — an ultra-thin mixture of flour, water and a little semolina — and draws them across the hot surface in rapid, sweeping strokes. The batter hits the griddle and sets almost instantly into translucent white threads. She lifts them before they colour, coils them into nests and sets them aside. This is hand-pulled konafa. It takes four hours to make enough for one day of orders.</p>
<h2>Why Bother?</h2>
<p>Machine-made konafa is widely available and technically identical in composition. Maha will not use it. "You can see the difference," she says, and she is right. Machine konafa strands are uniform in width and dry. Hand-pulled strands are irregular — some fine as hair, some slightly thicker — and they retain a slight pliability that makes the baked product texturally complex: crispy at the edges, yielding in the middle, with threads that break apart individually rather than clumping.</p>
<p>"The machine makes something that looks like konafa," she says. "I make konafa."</p>
<h2>The Filling</h2>
<p>She fills hers with ashta — a very thick, very simple clotted cream made from full-fat milk heated until a skin forms, which is lifted off and folded into itself repeatedly until it becomes a dense, faintly sweet cream with a slightly elastic texture. Not ricotta. Not cream cheese. Ashta specifically.</p>
<h2>The Syrup</h2>
<p>Orange blossom water, honey and a little lemon to keep it from crystallising. She pours it over the konafa the moment it comes out of the oven. "Cold syrup on hot konafa, or hot syrup on cold konafa — never both the same temperature," she says. This is the rule that determines whether the pastry stays crispy or goes soggy.</p>`,
      contentAr: `<p>تستيقظ مها السيد في الساعة الرابعة صباحاً. بحلول الخامسة تكون تقف أمام صينية مستديرة بحجم عجلة عربة، وعاء من العجينة الرقيقة على يسارها وزوج من القفازات القطنية البالية على يديها.</p>
<p>تغمس أصابعها في العجينة — مزيج رقيق جداً من الدقيق والماء وقليل من السميد — وتسحبها عبر السطح الساخن بضربات سريعة وكاسحة. تضرب العجينة الصاج وتتماسك تقريباً فوراً في خيوط بيضاء شفافة. ترفعها قبل أن تتلوَّن وتلف منها عشوشاً وتضعها جانباً. هذه هي الكنافة المسحوبة باليد. يستغرق صنع ما يكفي لطلبات يوم واحد أربع ساعات.</p>`,
      imageUrl: "/umm_ali.png",
      type: "blog",
      publishedAt: "2026-05-28",
      author: "Heba Rashid",
      authorAr: "هبة راشد",
      readTimeMinutes: 6,
      tags: ["konafa", "dessert", "craft", "pastry"],
    },
    {
      title: "Red Lentil Soup Recipe: Luxor Lentils, Hanan's Way",
      titleAr: "وصفة شوربة العدس الأحمر: عدس الأقصر بطريقة حنان",
      slug: "red-lentil-soup-recipe",
      excerpt: "Simple ingredients, but the technique is everything. Hanan Ibrahim's complete method for the velvety lentil soup that sells out every day.",
      excerptAr: "مكونات بسيطة لكن التقنية هي كل شيء. الطريقة الكاملة لحنان إبراهيم لشوربة العدس المخملية التي تنفد كل يوم.",
      content: `<p>Red lentil soup should not be complicated. Hanan Ibrahim insists on this. "If you are making it complicated, you are doing something wrong," she says.</p>
<p>The complexity is not in the ingredients — which are five — but in the sequence and the attention.</p>
<h2>Ingredients (serves 4)</h2>
<ul>
<li>300g red lentils (Egyptian variety, from Luxor if you can find them — rounder and sweeter than the flat Turkish ones)</li>
<li>1 large onion, roughly chopped</li>
<li>3 cloves garlic, whole</li>
<li>1½ teaspoons ground cumin</li>
<li>Salt, olive oil, lemon juice</li>
</ul>
<h2>The Method</h2>
<p><strong>Cook the lentils.</strong> Rinse the lentils until the water runs clear. Place in a large pot with the onion, garlic and enough cold water to cover by 8 centimetres. Bring to a boil, skimming off any foam. Reduce the heat and simmer for 25 minutes until the lentils are completely soft and beginning to collapse.</p>
<p><strong>Blend.</strong> Use a stick blender directly in the pot (Hanan does not use a standing blender — it over-processes the soup and makes it gluey). Blend until smooth but not perfectly so: you want texture, not velvet.</p>
<p><strong>The cumin.</strong> Heat a dry pan until very hot. Add the cumin and stir for thirty seconds until it darkens one shade and smells nutty. Pour it immediately into the soup. This step — toasting the cumin dry rather than blooming it in oil — is what gives the soup its distinctive roasted depth.</p>
<p><strong>Season and finish.</strong> Add salt, a squeeze of lemon, and adjust the water to your preferred thickness. The soup should coat a spoon but flow easily.</p>
<p><strong>The garnish.</strong> Fry thin half-rounds of onion in olive oil until deep golden and crispy. Place on top of each bowl. Add a small drizzle of chilli oil if you like heat. Serve immediately.</p>
<h2>Hanan's Note</h2>
<p>"The lemon goes in at the table, not in the pot. In the pot the lemon cooks and loses its freshness. At the table it stays bright." Add it to your bowl, not to the batch.</p>`,
      contentAr: `<p>لا يجب أن تكون شوربة العدس الأحمر معقدة. تصر حنان إبراهيم على ذلك. "إذا كنت تعقِّدها فأنت تفعل شيئاً خاطئاً" تقول.</p>
<p>التعقيد ليس في المكونات — وهي خمسة — بل في التسلسل والانتباه.</p>
<h2>المكونات (لـ 4 أشخاص)</h2>
<ul>
<li>300 جرام عدس أحمر (الصنف المصري، من الأقصر إن أمكن العثور عليه — أكثر استدارة وحلاوة من الأتراك المسطح)</li>
<li>بصلة كبيرة مقطعة خشناً</li>
<li>3 فصوص ثوم كاملة</li>
<li>ملعقة ونصف صغيرة كمون مطحون</li>
<li>ملح وزيت زيتون وعصير ليمون</li>
</ul>`,
      imageUrl: "/molokhia.png",
      type: "recipe",
      publishedAt: "2026-06-02",
      author: "Hanan Ibrahim",
      authorAr: "حنان إبراهيم",
      readTimeMinutes: 5,
      tags: ["lentil soup", "recipe", "vegetarian", "quick"],
    },
  ]).returning();
  console.log(`  ✓ Inserted ${posts.length} blog posts`);

  /* ── Subscription Plans ─────────────────────────────────────────── */
  const plans = await db.insert(subscriptionPlansTable).values([
    {
      name: "Solo",
      nameAr: "فردي",
      description: "Perfect for one person who wants home-cooked Egyptian meals delivered on their schedule.",
      descriptionAr: "مثالي لشخص واحد يريد وجبات مصرية منزلية على جدوله الزمني.",
      price: 499,
      period: "monthly",
      features: [
        "5 meals per week",
        "Choose your dishes each week",
        "Free delivery on all orders",
        "Priority customer support",
        "Cancel anytime",
      ],
      featuresAr: [
        "5 وجبات أسبوعياً",
        "اختر أطباقك كل أسبوع",
        "توصيل مجاني على جميع الطلبات",
        "دعم عملاء مميز",
        "إلغاء في أي وقت",
      ],
      isPopular: false,
      targetAudience: "individual",
    },
    {
      name: "Family",
      nameAr: "عائلي",
      description: "Feeds a family of four with authentic Egyptian home cooking — enough for the whole table.",
      descriptionAr: "يُطعم عائلة من أربعة أشخاص بالطبخ المنزلي المصري الأصيل — ما يكفي للطاولة كلها.",
      price: 1299,
      period: "monthly",
      features: [
        "4 family-sized meals per week (feeds 4–5)",
        "Chef rotation — try all 5 chefs",
        "Free delivery on all orders",
        "Dedicated family account manager",
        "10% off extra a-la-carte orders",
        "Flexible schedule changes",
        "Cancel anytime",
      ],
      featuresAr: [
        "4 وجبات عائلية أسبوعياً (لـ 4-5 أشخاص)",
        "تناوب الطهاة — جرِّب كل الطهاة الخمسة",
        "توصيل مجاني على جميع الطلبات",
        "مدير حساب عائلي مخصص",
        "خصم 10% على الطلبات الإضافية",
        "تغيير جدول مرن",
        "إلغاء في أي وقت",
      ],
      isPopular: true,
      targetAudience: "family",
    },
    {
      name: "Office",
      nameAr: "مكتبي",
      description: "Bring authentic Egyptian home cooking to your team — served hot, on time, every time.",
      descriptionAr: "اجلب الطبخ المنزلي المصري الأصيل لفريقك — يُقدَّم ساخناً وفي الوقت المحدد في كل مرة.",
      price: 3999,
      period: "monthly",
      features: [
        "Daily lunch for up to 20 people",
        "Rotating weekly menu from all chefs",
        "Free delivery and setup",
        "Dedicated office account manager",
        "Customisable for dietary requirements",
        "Monthly billing with tax invoice",
        "Priority same-day adjustments",
        "Cancel anytime",
      ],
      featuresAr: [
        "غداء يومي لما يصل إلى 20 شخصاً",
        "قائمة أسبوعية متناوبة من جميع الطهاة",
        "توصيل وإعداد مجاني",
        "مدير حساب مكتبي مخصص",
        "قابل للتخصيص حسب المتطلبات الغذائية",
        "فوترة شهرية مع فاتورة ضريبية",
        "تعديلات في نفس اليوم بأولوية",
        "إلغاء في أي وقت",
      ],
      isPopular: false,
      targetAudience: "office",
    },
    {
      name: "Premium",
      nameAr: "بريميوم",
      description: "Maximum flexibility for the serious Egyptian food lover — daily meals, all chefs, all dishes, anytime.",
      descriptionAr: "أقصى مرونة لمحب الطعام المصري الجاد — وجبات يومية وجميع الطهاة وجميع الأطباق في أي وقت.",
      price: 2199,
      period: "monthly",
      features: [
        "Daily meals, 7 days a week",
        "Unlimited chef and dish selection",
        "Free express delivery",
        "Personalised nutrition notes",
        "Early access to seasonal specials",
        "VIP event invitations",
        "Dedicated concierge line",
        "Cancel anytime",
      ],
      featuresAr: [
        "وجبات يومية، 7 أيام في الأسبوع",
        "اختيار غير محدود للطهاة والأطباق",
        "توصيل سريع مجاني",
        "ملاحظات تغذوية شخصية",
        "وصول مبكر للأطباق الموسمية الخاصة",
        "دعوات VIP للفعاليات",
        "خط خدمة VIP مخصص",
        "إلغاء في أي وقت",
      ],
      isPopular: false,
      targetAudience: "individual",
    },
  ]).returning();
  console.log(`  ✓ Inserted ${plans.length} subscription plans`);

  await pool.end();
  console.log("\n✅ Database seeded successfully!\n");
}

main().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
