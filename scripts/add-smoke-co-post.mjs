import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const title =
  "Smoke and Carbon Monoxide Alarm Regulations for Landlords 2026: Requirements, Fines and Best Practice";

const slug = "smoke-co-alarm-regulations-landlords-uk";

const excerpt =
  "Complete guide to smoke and CO alarm regulations for UK rental properties. Covers the 2022 amendments, which alarms you need, fines up to £5,000, testing requirements, and what landlords need to do now.";

const content = `<h2>What the law requires</h2>
<p>The Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 set out the legal requirements for alarms in private rented properties in England. These regulations updated the original 2015 rules and significantly expanded the scope of what landlords must provide.</p>
<p>Since 1 October 2022, every landlord must:</p>
<ul>
<li>Install at least one <strong>smoke alarm on each storey</strong> of the property that is used as living accommodation</li>
<li>Install a <strong>carbon monoxide alarm in any room</strong> that contains a fixed combustion appliance (except gas cookers)</li>
<li><strong>Test every alarm</strong> on the day a new tenancy begins and ensure it is in proper working order</li>
</ul>
<p>This applies to <strong>all tenancies</strong> — not just new ones. If you have a long-standing tenant who moved in years ago, the property still needs to meet these requirements.</p>

<h2>What changed in 2022</h2>
<p>The original 2015 regulations only required carbon monoxide alarms in rooms with a solid fuel appliance (wood burner, coal fire, etc.). The 2022 amendment extended this to <strong>all fixed combustion appliances</strong>, which now includes:</p>
<ul>
<li><strong>Gas boilers</strong> (including combi boilers)</li>
<li><strong>Gas fires</strong></li>
<li><strong>Oil boilers</strong></li>
<li><strong>Wood burners and multi-fuel stoves</strong></li>
<li><strong>Open fires</strong></li>
</ul>
<p>The only exception is <strong>gas cookers</strong> — no carbon monoxide alarm is required in a kitchen solely because it has a gas cooker.</p>
<p>This was a significant change. Most rental properties in England have a gas boiler, which means most rental properties now need at least one carbon monoxide alarm that they may not have needed before 2022.</p>

<h2>Where exactly do alarms need to go?</h2>
<h3>Smoke alarms</h3>
<p>One smoke alarm is required on <strong>each storey used as living accommodation</strong>. This includes:</p>
<ul>
<li>Ground floor</li>
<li>First floor</li>
<li>Any additional floors including loft conversions used as bedrooms</li>
<li>Basements used as living space</li>
</ul>
<p>"Living accommodation" means any area used for sleeping, cooking, or living. A storey used only for storage does not count.</p>
<p>The regulations do not specify exactly where on each storey the alarm must be placed, but best practice is:</p>
<ul>
<li><strong>Hallways and landings</strong> — the most common and effective location</li>
<li><strong>Outside bedrooms</strong> — so occupants are alerted while sleeping</li>
<li><strong>Away from kitchens and bathrooms</strong> — to avoid false alarms from steam and cooking</li>
</ul>
<h3>Carbon monoxide alarms</h3>
<p>One carbon monoxide alarm is required in <strong>any room</strong> containing a fixed combustion appliance. This means:</p>
<ul>
<li>If the gas boiler is in the kitchen — CO alarm in the kitchen</li>
<li>If the gas boiler is in a utility room — CO alarm in the utility room</li>
<li>If there is a gas fire in the living room — CO alarm in the living room</li>
<li>If there is a wood burner in a bedroom — CO alarm in that bedroom</li>
</ul>
<p>If the boiler is in an airing cupboard or enclosed space within a room, the alarm goes in the room that the cupboard opens into.</p>

<h2>Fines and enforcement</h2>
<p>Enforcement sits with the local housing authority (your local council). The process works like this:</p>
<ol>
<li><strong>The council identifies non-compliance</strong> — usually through a tenant complaint, a routine inspection, or an HMO licensing check</li>
<li><strong>A remedial notice is issued</strong> — giving you <strong>28 days</strong> to install the required alarms</li>
<li><strong>If you fail to comply</strong> — the council can enter the property, fit the alarms themselves, and issue a <strong>fine of up to £5,000</strong></li>
</ol>
<p>The fine is per offence. If you have multiple properties without compliant alarms, each property is a separate breach.</p>
<p>It is worth noting that the fine is for failing to comply with a remedial notice — not for the initial absence of alarms. In practice, this means you get one chance to fix it. But relying on that grace period is risky: if a fire or CO incident occurs in a property without compliant alarms, the legal and insurance consequences are severe regardless of whether a notice was issued.</p>
<h3>Insurance implications</h3>
<p>Most landlord insurance policies require you to maintain the property in compliance with all applicable regulations. If a fire or carbon monoxide incident occurs in a property without the required alarms:</p>
<ul>
<li>Your buildings and contents claim can be <strong>refused</strong></li>
<li>Your public liability cover may be <strong>voided</strong></li>
<li>You could be left <strong>personally liable</strong> for tenant injury or death</li>
</ul>
<p>This is the risk that makes the £20–£50 cost of a few alarms look trivial.</p>

<h2>What type of alarm should you install?</h2>
<p>The regulations do not mandate a specific type of alarm, only that smoke and CO alarms are installed and working. However, the type you choose matters for reliability, maintenance, and future-proofing.</p>
<h3>Smoke alarms</h3>
<ul>
<li><strong>Battery-only (replaceable)</strong> — £5–£10, 1 year battery. Cheapest but needs annual battery changes and tenants can remove the batteries.</li>
<li><strong>Sealed lithium battery</strong> — £15–£25, 10 year battery. No battery changes needed, tamper-resistant. A good mid-range option.</li>
<li><strong>Hard-wired (mains powered)</strong> — £25–£40 plus fitting. Permanent with battery backup. Most reliable and required for new builds. Meets the Decent Homes Standard.</li>
<li><strong>Hard-wired interlinked</strong> — £30–£50 plus fitting. When one alarm triggers, all alarms sound. The gold standard for rental properties.</li>
</ul>
<p><strong>Recommendation:</strong> For existing rental properties, sealed 10-year lithium battery alarms are the practical sweet spot — no annual battery changes, tamper-resistant, and affordable. For refurbishments or new additions, go hard-wired interlinked. The Decent Homes Standard (coming under the Renters' Rights Act) will push the sector toward hard-wired interlinked alarms, so fitting them now is future-proofing.</p>
<h3>Carbon monoxide alarms</h3>
<ul>
<li><strong>Battery-powered (sealed)</strong> — £15–£25, 7–10 year lifespan. Most common for rental properties. Check the expiry date on the unit.</li>
<li><strong>Hard-wired</strong> — £30–£50 plus fitting, 7–10 year sensor. Mains powered with battery backup, but the sensor still needs replacing when it expires.</li>
</ul>
<p><strong>Important:</strong> All CO alarms have a limited sensor life, typically 7–10 years. Even hard-wired units need replacing when the sensor expires. The expiry date is printed on the alarm — this is the date you need to track, not the installation date.</p>

<h2>Testing requirements</h2>
<p>You must test every smoke and carbon monoxide alarm <strong>on the day the tenancy starts</strong> (known as the "check-in" date). This means:</p>
<ul>
<li>Press the test button on each alarm</li>
<li>Confirm it sounds correctly</li>
<li>Document that the test was carried out</li>
</ul>
<p>The regulations do not require you to test alarms during an ongoing tenancy — that responsibility passes to the tenant once they have moved in. However, you remain responsible for ensuring the alarms are installed and were working at the start of the tenancy.</p>
<p><strong>Best practice:</strong> test alarms during every routine inspection, not just at tenancy start. Document it with a photo or a note in your records. If a dispute arises later, you want evidence that the alarms were present and working at every touchpoint.</p>

<h2>The Decent Homes Standard and what is coming next</h2>
<p>The Renters' Rights Act 2026 will apply the Decent Homes Standard to the private rented sector for the first time. While the exact requirements are still being finalised, the direction is clear:</p>
<ul>
<li><strong>Hard-wired interlinked smoke alarms</strong> are likely to become the minimum standard</li>
<li>Properties that currently rely on battery-only alarms may need upgrading</li>
<li>The standard will be enforced through the PRS Database and local authority inspections</li>
</ul>
<p>If you are fitting or replacing alarms now, choosing hard-wired interlinked systems avoids having to upgrade again in the near future.</p>

<h2>Key takeaways</h2>
<ul>
<li>Every rental property needs a <strong>smoke alarm on each storey</strong> and a <strong>CO alarm in any room with a fixed combustion appliance</strong> (except gas cookers)</li>
<li>This has applied to <strong>all tenancies</strong> since October 2022 — not just new ones</li>
<li>Alarms must be <strong>tested on the day the tenancy starts</strong></li>
<li>Fines of up to <strong>£5,000</strong> for failing to comply with a remedial notice</li>
<li>CO alarm sensors expire after <strong>7–10 years</strong> regardless of power source — track the expiry date, not the install date</li>
<li><strong>Sealed 10-year lithium alarms</strong> are the practical choice for most properties today</li>
<li><strong>Hard-wired interlinked alarms</strong> are the future — the Decent Homes Standard will likely require them</li>
</ul>

<p><em>This article is for general guidance and applies to England. Regulations may differ in Scotland, Wales, and Northern Ireland. Always check current requirements with your local authority or a qualified adviser.</em></p>`;

const { data: existing } = await supabase
  .from("blog_posts")
  .select("id, slug")
  .eq("slug", slug)
  .maybeSingle();

if (existing) {
  console.log(`Post with slug "${slug}" already exists (id: ${existing.id}). Aborting.`);
  process.exit(1);
}

const { data, error } = await supabase
  .from("blog_posts")
  .insert({
    title,
    slug,
    excerpt,
    content,
    cover_image: null,
    published: false,
  })
  .select()
  .single();

if (error) {
  console.error("Insert failed:", error);
  process.exit(1);
}

console.log("Inserted blog post:");
console.log(`  id: ${data.id}`);
console.log(`  slug: ${data.slug}`);
console.log(`  published: ${data.published}`);
console.log(`  admin URL: /admin/blog/${data.id}`);
