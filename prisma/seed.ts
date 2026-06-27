import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL as string),
});

type SeedPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  readMinutes: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  body: string;
};

const posts: SeedPost[] = [
  {
    slug: "yoga-for-body-alignment",
    title: "Yoga for Posture & Body Alignment: Small Corrections, Big Change",
    category: "Body Alignment",
    excerpt:
      "How mindful alignment in everyday movement protects your joints, eases pain and changes how you feel — one small correction at a time.",
    coverImage: "/assets/river-pose.jpeg",
    readMinutes: 7,
    metaTitle: "Yoga for Posture & Body Alignment | Just Begin Yoga",
    metaDescription:
      "Learn how yoga improves posture and body alignment. Simple, mindful corrections for your spine, hips and shoulders to ease pain and move better — from Just Begin Yoga.",
    keywords:
      "yoga for posture, body alignment yoga, yoga for back pain, spinal alignment, posture correction, yoga alignment tips, beginner yoga",
    body: `
<p>Most of us spend hours each day folded over a phone, hunched at a desk or slumped on a sofa. Over months and years, the body quietly adapts to those shapes — rounded shoulders, a tight lower back, a forward-jutting neck. The good news? The body is just as willing to <strong>re-learn better alignment</strong>, and yoga is one of the gentlest, most effective ways to teach it.</p>

<h2>What "alignment" really means</h2>
<p>Alignment isn't about standing rigidly straight like a soldier. It's about stacking your joints so that your bones — not your overworked muscles — carry your weight. When your skeleton is well-organised, muscles can finally relax, breathing opens up, and everyday movements stop costing so much energy.</p>
<blockquote>Good posture is not a position you hold. It's a relationship you keep returning to.</blockquote>

<h2>Three small corrections that change everything</h2>
<h3>1. Stack your head over your heart, your heart over your hips</h3>
<p>In sitting or standing, imagine a soft thread lifting the crown of your head. Let your chin drop a fraction so the back of your neck lengthens. This single cue undoes hours of "text neck."</p>

<h3>2. Let your shoulders melt down the back</h3>
<p>We carry tension by lifting the shoulders toward the ears. In poses like Mountain (Tadasana) and Downward Dog, consciously slide the shoulder blades down and slightly together. Your neck and upper back will thank you.</p>

<h3>3. Find a neutral pelvis</h3>
<p>An over-arched or over-tucked lower back is the root of much discomfort. Yoga teaches you to feel the "neutral" middle — the foundation for a pain-free spine in standing poses, in chairs, and in life.</p>

<h2>Poses that rebuild alignment</h2>
<ul>
  <li><strong>Tadasana (Mountain Pose)</strong> — the blueprint for every standing posture.</li>
  <li><strong>Cat–Cow</strong> — wakes up a stiff spine and teaches segmental movement.</li>
  <li><strong>Bridge Pose</strong> — strengthens the back body that holds you upright.</li>
  <li><strong>Cobra & Sphinx</strong> — gently reverse the day's forward slump.</li>
  <li><strong>Wall-supported standing</strong> — a feedback tool to feel true vertical.</li>
</ul>

<h2>Consistency beats intensity</h2>
<p>You don't need an hour a day. Ten mindful minutes, done regularly, will shift your posture far more than an occasional heroic session. Alignment is a habit the nervous system builds through repetition — and the same steadiness that improves your posture also builds your <a href="/blog/yoga-for-general-fitness">overall fitness, strength and stamina</a>.</p>

<p>Interestingly, the same principle of small, mindful corrections applies above the neck too — gentle, targeted movement can tone and relax the muscles of the face. If that intrigues you, read our guide to <a href="/blog/face-yoga-natural-toning">face yoga and natural toning</a>.</p>

<h2>Practise with guidance</h2>
<p>Alignment is much easier to learn when someone can see what you can't. In a <a href="/services/personal">personal online class</a> Anusha can spot the subtle habits pulling you out of line and give you cues tailored to your body. Prefer company? Our <a href="/group-classes">group classes</a> bring the same attention in a friendly, motivating setting.</p>

<p>Ready to stand a little taller? <a href="/contact">Book a free trial class</a> and take the first simple step toward a body that feels at home in itself.</p>
`,
  },
  {
    slug: "yoga-for-general-fitness",
    title: "Yoga for General Fitness: Strength, Mobility & Stamina",
    category: "General Fitness",
    excerpt:
      "You don't need a gym to get strong and fit. Here's how a steady yoga practice builds real strength, mobility and stamina for everyday life.",
    coverImage: "/assets/breath.jpeg",
    readMinutes: 6,
    metaTitle: "Yoga for General Fitness: Strength & Stamina | Just Begin Yoga",
    metaDescription:
      "Discover how yoga builds full-body strength, mobility and stamina without a gym. A practical guide to using yoga for general fitness — from Just Begin Yoga.",
    keywords:
      "yoga for fitness, yoga for strength, yoga for stamina, full body yoga, yoga vs gym, mobility yoga, general fitness yoga",
    body: `
<p>There's a myth that yoga is only about stretching and relaxation. In reality, a well-rounded practice is one of the most complete forms of <strong>general fitness</strong> there is — building strength, mobility, balance, stamina and breath capacity all at once, using nothing but your own body.</p>

<h2>The four pillars yoga trains</h2>
<h3>1. Strength</h3>
<p>Holding a Plank, lowering through Chaturanga, balancing in Warrior III — these are bodyweight strength exercises in disguise. Yoga builds <em>functional</em> strength: the kind that helps you carry groceries, climb stairs and pick up a child without strain.</p>

<h3>2. Mobility</h3>
<p>Unlike static stretching, yoga moves your joints through their full range under control. Over time, stiff hips, tight hamstrings and locked-up shoulders begin to open — and that freedom of movement is what keeps you young.</p>

<h3>3. Stamina & breath</h3>
<p>Flowing sequences (Vinyasa) link movement to breath, gently raising the heart rate while teaching your lungs to work efficiently. This is where yoga quietly becomes cardio.</p>

<h3>4. Balance & coordination</h3>
<p>Standing balances train the small stabilising muscles and the nervous system together — protecting you from falls and improving athletic performance in every other activity.</p>

<blockquote>Yoga doesn't just make you flexible. It makes you capable.</blockquote>

<h2>A simple weekly rhythm</h2>
<ul>
  <li><strong>2–3 dynamic sessions</strong> (Sun Salutations, standing flows) for strength and stamina.</li>
  <li><strong>1–2 slower sessions</strong> (Yin, restorative) for deep mobility and recovery.</li>
  <li><strong>Daily micro-practice</strong> — even five minutes of breathing keeps the habit alive.</li>
</ul>

<h2>Why it works when gyms don't</h2>
<p>Yoga is sustainable. There's no equipment to buy, no commute, and it scales perfectly to your level on any given day. It also trains the things gyms often ignore — joint health, breath, balance and a calm mind. And because every pose depends on good <a href="/blog/yoga-for-body-alignment">posture and body alignment</a>, you're protecting your body even as you challenge it.</p>

<p>Fitness isn't only about the body below the neck, either. The face has muscles too — and they respond to mindful exercise. See our beginner's guide to <a href="/blog/face-yoga-natural-toning">face yoga</a> for a surprisingly refreshing add-on to your routine.</p>

<h2>Start where you are</h2>
<p>You don't need to be fit to start yoga — you do yoga to <em>become</em> fit. A <a href="/services/personal">personal class</a> lets us match the intensity to your current level and goals, while <a href="/group-classes">group classes</a> add the energy and accountability of practising together.</p>

<p>Want to feel stronger, looser and more energised? <a href="/contact">Book a free trial</a> and discover how much your body is capable of.</p>
`,
  },
  {
    slug: "face-yoga-natural-toning",
    title: "Face Yoga: Natural Toning & Glow Through Simple Exercises",
    category: "Face Yoga",
    excerpt:
      "Your face has over 40 muscles — and most of us never train them. Here's how gentle face yoga can tone, lift and bring a natural glow.",
    coverImage: "/assets/anusha-founder.jpeg",
    readMinutes: 6,
    metaTitle: "Face Yoga: Natural Toning & Glow Exercises | Just Begin Yoga",
    metaDescription:
      "A beginner's guide to face yoga — simple, natural exercises to tone facial muscles, ease tension and bring a healthy glow. Learn the basics with Just Begin Yoga.",
    keywords:
      "face yoga, facial exercises, natural face toning, face yoga for glow, anti-ageing yoga, jawline exercises, face yoga for beginners",
    body: `
<p>We train our arms, our core and our legs — but almost never the <strong>40-plus muscles of the face</strong>. Yet those muscles hold tension, lose tone and shape how we look and feel, just like any others. Face yoga is a gentle, natural way to wake them up: a few minutes of mindful movement that can ease tension, improve circulation and bring a healthy glow.</p>

<h2>What face yoga can (and can't) do</h2>
<p>Let's be honest and grounded. Face yoga is not a miracle or a substitute for medical treatment. What it <em>can</em> do is improve blood flow, release the clench we hold in the jaw and brow, and tone underused muscles so the face looks more relaxed and lifted over time. Think of it as <strong>fitness and relaxation for your face</strong>.</p>

<blockquote>A relaxed face is a younger-looking face. Most "tension lines" are exactly that — tension.</blockquote>

<h2>Five simple exercises to begin</h2>
<h3>1. The brow smoother</h3>
<p>Place your fingertips lightly on your forehead and gently draw outward while resisting with the brow. Releases the frown we hold without noticing.</p>

<h3>2. Cheek lifter</h3>
<p>Smile softly with closed lips, then lift the cheeks toward the eyes. Hold, release, repeat. Tones the muscles that lift the mid-face.</p>

<h3>3. Jaw & neck release</h3>
<p>Tilt the head back gently and make a slow chewing motion. Eases jaw clenching and defines the jawline.</p>

<h3>4. Eye circles</h3>
<p>Using your ring finger, tap very lightly around the eye socket to boost circulation and reduce puffiness.</p>

<h3>5. The "O" and smile</h3>
<p>Alternate a wide "O" shape with a closed-lip smile to work the muscles around the mouth.</p>

<h2>Breath makes it work</h2>
<p>As with every part of yoga, the breath is the secret ingredient. Slow, steady breathing relaxes the nervous system so the facial muscles can actually let go. This is the same mindful breathing that underpins our work on <a href="/blog/yoga-for-body-alignment">posture and alignment</a> — the face, after all, sits at the very top of the spine.</p>

<p>And like any muscle work, consistency is what brings results. The principles are the same ones that make yoga so effective for <a href="/blog/yoga-for-general-fitness">general fitness</a>: small, regular effort compounds.</p>

<h2>Learn it properly</h2>
<p>Face yoga is subtle, and doing it well is easier with guidance. In a <a href="/services/personal">personal online class</a> Anusha can demonstrate the exact movements and help you build a short daily routine that fits your life.</p>

<p>Curious to try? <a href="/contact">Book a free trial</a> and give your face the same care you give the rest of your body.</p>
`,
  },
];

async function main() {
  // ---- Admin user ----
  const email = process.env.SEED_ADMIN_EMAIL || "admin@justbeginyoga.in";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const name = process.env.SEED_ADMIN_NAME || "Admin";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });
  console.log(`✓ Admin ready: ${email}`);

  // ---- Blog posts ----
  const publishedAt = new Date("2025-01-15T09:00:00.000Z");
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        category: p.category,
        excerpt: p.excerpt,
        body: p.body.trim(),
        coverImage: p.coverImage,
        readMinutes: p.readMinutes,
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        keywords: p.keywords,
        ogImage: p.coverImage,
        published: true,
      },
      create: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        excerpt: p.excerpt,
        body: p.body.trim(),
        coverImage: p.coverImage,
        readMinutes: p.readMinutes,
        author: "Anusha Shetty",
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        keywords: p.keywords,
        ogImage: p.coverImage,
        published: true,
        // stagger publish dates so ordering is stable
        publishedAt: new Date(publishedAt.getTime() + i * 86400000),
      },
    });
    console.log(`✓ Blog: ${p.title}`);
  }

  // ---- Gallery (only seeds when empty, so admin edits aren't overwritten) ----
  const galleryCount = await prisma.galleryImage.count();
  if (galleryCount === 0) {
    const gallery = [
      { imageUrl: "/assets/breath.jpeg", title: "Breath & stillness", caption: "Finding calm before the flow begins.", category: "Practice" },
      { imageUrl: "/assets/river-pose.jpeg", title: "By the river", caption: "Practising in the open air.", category: "Outdoor" },
      { imageUrl: "/assets/anusha-founder.jpeg", title: "Anusha Shetty", caption: "Founder & instructor at Just Begin Yoga.", category: "Studio" },
      { imageUrl: "/assets/group-class-laptop.png", title: "Online group class", caption: "Practising together from anywhere.", category: "Classes" },
      { imageUrl: "/assets/apartment-class.jpeg", title: "Apartment session", caption: "Community yoga close to home.", category: "Classes" },
      { imageUrl: "/assets/slots/jb-group-class.webp", title: "Group flow", caption: "Moving as one.", category: "Classes" },
      { imageUrl: "/assets/slots/jb-style-vinyasa.webp", title: "Vinyasa", caption: "Linking breath to movement.", category: "Styles" },
      { imageUrl: "/assets/slots/jb-style-hatha.webp", title: "Hatha", caption: "Steady, foundational postures.", category: "Styles" },
      { imageUrl: "/assets/whyyoga-group.png", title: "Why yoga", caption: "Strength, calm and connection.", category: "Studio" },
    ];
    for (let i = 0; i < gallery.length; i++) {
      const g = gallery[i];
      await prisma.galleryImage.create({ data: { ...g, sortOrder: i, published: true } });
    }
    console.log(`✓ Gallery: seeded ${gallery.length} images`);
  } else {
    console.log(`• Gallery: ${galleryCount} image(s) already present — skipped`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
