import React from "react";
import Link from "next/link";

/**
 * Long-form article blocks - classes paired with
 * `src/styles/sections/_quantel-blog-html.scss` to match `BlogDetailsMain` /
 * blog listing patterns (`blog-article__*`, `blog-sidebar__widget`, `bd-related__*`).
 */
const QuantelBlogHtml = () => (
  <div className="quantel-blog-html-root">
    <p>
      In a market where countless technology firms compete for the same
      clients, Quantel Solutions has spent five years doing something
      deceptively simple: showing up with results rather than promises.
      Headquartered in London, the company has quietly built a reputation as
      one of the more dependable technology partners for startups, scaleups,
      and enterprises across the UK, US, and UAE.
    </p>

    <p>
      This post takes a closer look at what Quantel does, why it resonates so
      well with ambitious businesses, and what any leader considering a
      technology partner should know before making a decision.
    </p>

    <div className="cb-meta-strip" aria-hidden="true">
      <span>SaaS &amp; Technology</span>
      <span className="cb-meta-strip__dot" />
      <span>UK · US · UAE</span>
      <span className="cb-meta-strip__dot" />
      <span>Startups &amp; enterprises</span>
    </div>

    <div className="cb-panel cb-panel--stats">
      <div className="cb-stats">
        <div className="cb-stats__cell">
          <span className="cb-stats__num">5+</span>
          <span className="cb-stats__label">Years in operation</span>
        </div>
        <div className="cb-stats__cell">
          <span className="cb-stats__num">500+</span>
          <span className="cb-stats__label">Projects delivered</span>
        </div>
        <div className="cb-stats__cell">
          <span className="cb-stats__num">200+</span>
          <span className="cb-stats__label">Businesses served</span>
        </div>
        <div className="cb-stats__cell">
          <span className="cb-stats__num">98%</span>
          <span className="cb-stats__label">Client retention rate</span>
        </div>
      </div>
    </div>

    <h2 className="cb-block-title">Who Is Quantel Solutions?</h2>

    <p>
      Quantel Solutions was founded in 2021 with a straightforward mission:
      help ambitious businesses grow through better technology. What started
      as a focused team in London has expanded into a full-service technology
      company serving clients across the UK, US, UAE, and Asia-Pacific.
    </p>

    <p>
      By 2023, the team had crossed the 100-client milestone. By 2026, they
      were delivering across three continents - a reputation built on repeat
      results, not marketing spend.
    </p>

    <div className="cb-panel cb-panel--timeline">
      <div className="cb-timeline">
        <div className="cb-timeline__item">
          <div className="cb-timeline__year">2021</div>
          <div className="cb-timeline__rail" aria-hidden="true" />
          <div className="cb-timeline__body">
            <h3 className="cb-timeline__heading">Founded in London</h3>
            <p>
              Founded with a clear mission to help ambitious businesses build
              and scale their digital products.
            </p>
          </div>
        </div>
        <div className="cb-timeline__item">
          <div className="cb-timeline__year">2023</div>
          <div className="cb-timeline__rail" aria-hidden="true" />
          <div className="cb-timeline__body">
            <h3 className="cb-timeline__heading">100+ Clients served</h3>
            <p>
              Expanded the team and hit a major milestone serving businesses
              internationally.
            </p>
          </div>
        </div>
        <div className="cb-timeline__item">
          <div className="cb-timeline__year">2026</div>
          <div className="cb-timeline__rail" aria-hidden="true" />
          <div className="cb-timeline__body">
            <h3 className="cb-timeline__heading">Global delivery</h3>
            <p>
              Scaled delivery across the UK, US, and UAE with a 5-star client
              reputation - a rare achievement in a competitive market.
            </p>
          </div>
        </div>
      </div>
    </div>

    <h2 className="cb-block-title">A Full Stack of Technology Services</h2>

    <p>
      What separates a reliable partner from a single-service vendor is breadth
      paired with depth. Quantel offers both. Rather than outsourcing work or
      patching together freelancers, the team handles every layer of a
      product&apos;s lifecycle under one roof.
    </p>

    <ul className="cb-services" aria-label="Services offered">
      <li className="cb-services__item">
        <span className="cb-services__idx">01</span>
        <span className="cb-services__label">SaaS Product Development</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">02</span>
        <span className="cb-services__label">White-Label Platforms</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">03</span>
        <span className="cb-services__label">AI &amp; Automation</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">04</span>
        <span className="cb-services__label">Web Development</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">05</span>
        <span className="cb-services__label">Search Engine Optimisation</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">06</span>
        <span className="cb-services__label">Social Media Marketing</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">07</span>
        <span className="cb-services__label">Mobile App Development</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">08</span>
        <span className="cb-services__label">Ecommerce Solutions</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">09</span>
        <span className="cb-services__label">ERP Solutions</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">10</span>
        <span className="cb-services__label">UI / UX Design</span>
      </li>
    </ul>

    <p>
      This range matters more than it might appear. A business that needs a new
      SaaS platform, an AI feature, and a growth strategy simultaneously would
      typically have to coordinate between three different providers. Quantel
      consolidates that - creating a cleaner execution pipeline and sharper
      strategic coherence across every touchpoint.
    </p>

    <h2 className="cb-block-title">
      The &quot;No One-Size-Fits-All&quot; Philosophy
    </h2>

    <blockquote className="cb-pullquote">
      <p>
        &quot;We don&apos;t believe in one-size-fits-all packages. Every
        solution we craft is tailored to your industry, your market, and your
        goals - engineered to scale across borders.&quot;
      </p>
    </blockquote>

    <p>
      That&apos;s not marketing copy for its own sake. It reflects a practical
      reality: a London fintech has entirely different needs from a Dubai
      retailer or a San Francisco SaaS startup. Each market has its own
      regulatory nuances, buyer behaviours, and competitive dynamics that
      partners without global experience often misunderstand or ignore.
    </p>

    <p>
      Quantel&apos;s pitch isn&apos;t that they work with everyone - it&apos;s
      that they work <em>correctly</em> with whoever they take on. They openly
      limit new client intake each quarter precisely to protect the quality of
      each engagement.
    </p>

    <h2 className="cb-block-title">What the Numbers Actually Look Like</h2>

    <p>
      Claims of results are everywhere in technology. What makes Quantel&apos;s
      testimonials distinctive is their specificity - businesses aren&apos;t
      describing vague improvements but concrete, measurable shifts.
    </p>

    <div className="cb-quotes">
      <article className="cb-quote-card">
        <p className="cb-quote-card__text">
          &quot;Quantel rebuilt our logistics platform as a proper multi-tenant
          SaaS product. Within four months we onboarded our first enterprise
          clients and cut manual operations dramatically.&quot;
        </p>
        <p className="cb-quote-card__meta">
          James Whitfield - Founder, Whitfield Logistics Ltd, London
        </p>
      </article>
      <article className="cb-quote-card">
        <p className="cb-quote-card__text">
          &quot;We launched a fully white-labelled retail platform with Quantel
          and went to market in record time. Their AI-driven recommendations
          measurably lifted our conversion rate.&quot;
        </p>
        <p className="cb-quote-card__meta">
          Sarah Al-Mansouri - CEO, Luminae Retail, Dubai
        </p>
      </article>
      <article className="cb-quote-card">
        <p className="cb-quote-card__text">
          &quot;The Quantel team scaled our SaaS infrastructure and shipped
          automation that saved our ops team hundreds of hours a month.&quot;
        </p>
        <p className="cb-quote-card__meta">
          David Chen - CTO, PivotTech Inc., San Francisco
        </p>
      </article>
    </div>

    <p>
      Enterprise clients onboarded in four months. Go-to-market in record time.
      Hundreds of operational hours saved every month. These aren&apos;t
      outliers cherry-picked from years of data - they&apos;re representative of
      what focused, well-engineered technology can do when executed properly.
    </p>

    <h2 className="cb-block-title">Honest Timelines - and Why That Matters</h2>

    <p>
      One of the most refreshing aspects of Quantel&apos;s communication is
      their candour about how long things take. A focused MVP or configured
      white-label platform typically goes live within six to twelve weeks. Full
      custom SaaS products run three to six months to a production-ready v1.
    </p>

    <p>
      This is worth noting because the technology landscape has no shortage of
      vendors promising &quot;launch in days&quot; or &quot;AI that runs
      itself.&quot; Quantel doesn&apos;t make those promises - and that
      restraint is itself a signal worth paying attention to.
    </p>

    <p>
      Their approach of shipping in short, demoable sprints means clients see
      working software early and often, rather than waiting months for a single
      big reveal. Done well, it de-risks delivery while building a product that
      genuinely fits the business.
    </p>

    <h2 className="cb-block-title">Who They&apos;re Built For</h2>

    <p>
      Quantel partners with early-stage startups shipping their first product,
      scaleups hardening their platform for growth, and enterprises modernising
      legacy systems. Each gets a team scoped to their stage - lean and fast for
      startups, governed and secure for enterprises.
    </p>

    <p>
      Importantly, Quantel is set up to complement existing teams, not replace
      them. Many clients use them to own a specific workstream - a SaaS module
      or an AI feature, for instance - while their internal team handles the
      rest. That flexibility makes them a practical choice for businesses at
      various stages of maturity.
    </p>

    <h2 className="cb-block-title">
      The Free Discovery Call - Worth Taking Seriously
    </h2>

    <p>
      Quantel offers a free discovery call. Unusually, they describe it as a
      genuine working session rather than a sales pitch. A senior strategist
      reviews your goals and current stack, identifies the highest-leverage
      opportunities, and delivers a practical roadmap - followed by a written
      summary within twenty-four hours.
    </p>

    <p>
      Whether or not you ultimately engage them, that&apos;s a useful offer. Any
      leader wanting an honest external read on their product or growth position
      has very little to lose by taking the call.
    </p>

    <h2 className="cb-block-title">Final Thoughts</h2>

    <p>
      Quantel Solutions is not trying to be the flashiest firm in technology.
      They&apos;re trying to be the most reliable one. After five years, a 98%
      client retention rate, and a portfolio spanning SaaS, white-label, AI, and
      growth across three continents, the evidence suggests they&apos;re
      succeeding at that goal.
    </p>

    <p>
      For businesses navigating an increasingly competitive digital landscape,
      that kind of track record - built slowly, on actual results - is exactly
      what&apos;s worth looking for in a long-term partner.
    </p>

    <aside className="blog-sidebar__widget blog-sidebar__widget--cta cb-cta">
      <p className="blog-sidebar__cta-lead">Next step</p>
      <h2 className="cb-cta__title">Ready to build something global?</h2>
      <p className="cb-cta__text">
        Quantel Solutions offers a free discovery call with no obligations.
        Find out where your biggest digital opportunities are.
      </p>
      <Link href="/contact" className="btn btn--primary cb-cta__btn">
        Book a discovery call
      </Link>
      <p className="cb-cta__fine">
        Or visit{" "}
        <a
          href="https://quantel.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          quantel.uk
        </a>{" "}
        to learn more
      </p>
    </aside>
  </div>
);

export default QuantelBlogHtml;
