import React from "react";
import Link from "next/link";

/**
 * Long-form article blocks — classes paired with
 * `src/styles/sections/_cressoft-blog-html.scss` to match `BlogDetailsMain` /
 * blog listing patterns (`blog-article__*`, `blog-sidebar__widget`, `bd-related__*`).
 */
const CressoftBlogHtml = () => (
  <div className="cressoft-blog-html-root">
    <p>
      In a country where hundreds of digital agencies compete for the same
      clients, Cressoft Marketing has spent over a decade doing something
      deceptively simple: showing up with results rather than promises. Based in
      Kota Damansara, Kuala Lumpur, the agency has quietly built a reputation as
      one of Malaysia&apos;s most dependable growth partners for SMEs, startups,
      and scaling brands.
    </p>

    <p>
      This post takes a closer look at what Cressoft does, why it resonates so
      well with Malaysian businesses, and what any business owner considering a
      digital marketing partner should know before making a decision.
    </p>

    <div className="cb-meta-strip" aria-hidden="true">
      <span>Digital Marketing</span>
      <span className="cb-meta-strip__dot" />
      <span>Malaysia</span>
      <span className="cb-meta-strip__dot" />
      <span>SME &amp; growth brands</span>
    </div>

    <div className="cb-panel cb-panel--stats">
      <div className="cb-stats">
        <div className="cb-stats__cell">
          <span className="cb-stats__num">12+</span>
          <span className="cb-stats__label">Years in operation</span>
        </div>
        <div className="cb-stats__cell">
          <span className="cb-stats__num">25k</span>
          <span className="cb-stats__label">Projects delivered</span>
        </div>
        <div className="cb-stats__cell">
          <span className="cb-stats__num">120+</span>
          <span className="cb-stats__label">Malaysian brands served</span>
        </div>
        <div className="cb-stats__cell">
          <span className="cb-stats__num">98%</span>
          <span className="cb-stats__label">Client satisfaction rate</span>
        </div>
      </div>
    </div>

    <h2 className="cb-block-title">Who Is Cressoft Marketing?</h2>

    <p>
      Cressoft Marketing was founded in 2014 with a straightforward mission:
      help Malaysian businesses grow online. What started as a focused agency in
      Kota Damansara has expanded into a full-service operation serving clients
      from Penang to Johor Bahru, Kota Kinabalu to Kuching — and even
      internationally into Singapore and wider Southeast Asia.
    </p>

    <p>
      By 2018, the team had crossed the 100-client milestone. By 2022, they had
      earned a top-rated status across Google, Facebook, and several industry
      directories — a 5-star reputation built on repeat results, not marketing
      spend.
    </p>

    <div className="cb-panel cb-panel--timeline">
      <div className="cb-timeline">
        <div className="cb-timeline__item">
          <div className="cb-timeline__year">2014</div>
          <div className="cb-timeline__rail" aria-hidden="true" />
          <div className="cb-timeline__body">
            <h3 className="cb-timeline__heading">Launched in Kota Damansara</h3>
            <p>
              Founded with a clear mission to help Malaysian businesses establish
              and grow their digital presence.
            </p>
          </div>
        </div>
        <div className="cb-timeline__item">
          <div className="cb-timeline__year">2018</div>
          <div className="cb-timeline__rail" aria-hidden="true" />
          <div className="cb-timeline__body">
            <h3 className="cb-timeline__heading">100+ Clients served</h3>
            <p>
              Expanded the team and hit a major milestone serving businesses across
              all of Malaysia.
            </p>
          </div>
        </div>
        <div className="cb-timeline__item">
          <div className="cb-timeline__year">2022</div>
          <div className="cb-timeline__rail" aria-hidden="true" />
          <div className="cb-timeline__body">
            <h3 className="cb-timeline__heading">Top-rated agency in KL</h3>
            <p>
              Earned a 5-star reputation across multiple platforms — a rare
              achievement in a competitive market.
            </p>
          </div>
        </div>
      </div>
    </div>

    <h2 className="cb-block-title">A Full Stack of Digital Services</h2>

    <p>
      What separates a reliable agency from a single-service vendor is breadth
      paired with depth. Cressoft offers both. Rather than outsourcing work or
      patching together freelancers, the team handles every layer of a
      brand&apos;s digital presence under one roof.
    </p>

    <ul className="cb-services" aria-label="Services offered">
      <li className="cb-services__item">
        <span className="cb-services__idx">01</span>
        <span className="cb-services__label">AI Solutions</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">02</span>
        <span className="cb-services__label">Web Development</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">03</span>
        <span className="cb-services__label">Search Engine Optimisation</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">04</span>
        <span className="cb-services__label">Social Media Marketing</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">05</span>
        <span className="cb-services__label">Mobile App Development</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">06</span>
        <span className="cb-services__label">Ecommerce Solutions</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">07</span>
        <span className="cb-services__label">ERP Solutions</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">08</span>
        <span className="cb-services__label">UI / UX Design</span>
      </li>
      <li className="cb-services__item">
        <span className="cb-services__idx">09</span>
        <span className="cb-services__label">Custom Digital Solutions</span>
      </li>
    </ul>

    <p>
      This range matters more than it might appear. A business that needs a new
      website, an SEO strategy, and a Google Ads campaign simultaneously would
      typically have to coordinate between three different providers. Cressoft
      consolidates that — creating a cleaner execution pipeline and sharper
      strategic coherence across every touchpoint.
    </p>

    <h2 className="cb-block-title">
      The &quot;No One-Size-Fits-All&quot; Philosophy
    </h2>

    <blockquote className="cb-pullquote">
      <p>
        &quot;We don&apos;t believe in one-size-fits-all packages. Every strategy
        we craft is tailored to your industry, your market, and your goals —
        because we understand the Malaysian business landscape inside out.&quot;
      </p>
    </blockquote>

    <p>
      That&apos;s not marketing copy for its own sake. It reflects a practical
      reality: a Penang-based F&amp;B outlet has entirely different digital
      needs from a Selangor tech distributor or a Kuching professional services
      firm. The Malaysian market has regional nuances, multilingual audiences, and
      buyer behaviours that agencies without local roots often misunderstand or
      ignore.
    </p>

    <p>
      Cressoft&apos;s pitch isn&apos;t that they work with everyone — it&apos;s
      that they work <em>correctly</em> with whoever they take on. They openly
      limit new client intake each month precisely to protect the quality of each
      engagement.
    </p>

    <h2 className="cb-block-title">What the Numbers Actually Look Like</h2>

    <p>
      Claims of results are everywhere in digital marketing. What makes
      Cressoft&apos;s testimonials distinctive is their specificity — businesses
      aren&apos;t describing vague improvements but concrete, measurable shifts.
    </p>

    <div className="cb-quotes">
      <article className="cb-quote-card">
        <p className="cb-quote-card__text">
          &quot;Cressoft transformed our online presence completely. Within 4
          months, our website traffic doubled and we started getting consistent
          leads through Google — something we struggled with for years.&quot;
        </p>
        <p className="cb-quote-card__meta">
          Hafiz Rahman — Founder, HR Consultancy, Kuala Lumpur
        </p>
      </article>
      <article className="cb-quote-card">
        <p className="cb-quote-card__text">
          &quot;Our Instagram following grew by 300% and we saw a direct increase in
          walk-in customers. The team truly understands the Malaysian audience.&quot;
        </p>
        <p className="cb-quote-card__meta">
          Nurul Ain Yusof — Owner, The Bloom Café, Petaling Jaya
        </p>
      </article>
      <article className="cb-quote-card">
        <p className="cb-quote-card__text">
          &quot;The Cressoft team built our e-commerce website from scratch and
          handled our Google Ads. Our online sales went up 5x in the first 6
          months.&quot;
        </p>
        <p className="cb-quote-card__meta">
          David Lim — Director, TechGear Malaysia, Selangor
        </p>
      </article>
    </div>

    <p>
      Traffic doubled in four months. Instagram following tripled with
      measurable foot-traffic impact. E-commerce revenue up fivefold in six
      months. These aren&apos;t outliers cherry-picked from years of data —
      they&apos;re representative of what focused, locally-attuned digital
      strategy can do when executed properly.
    </p>

    <h2 className="cb-block-title">Honest Timelines — and Why That Matters</h2>

    <p>
      One of the most refreshing aspects of Cressoft&apos;s public-facing
      communication is their candour about how long things take. SEO, they
      acknowledge, shows meaningful traction between months three and six — not
      week one. Google Ads and Meta campaigns generate their first qualified leads
      within ten to fourteen days, but need ongoing optimisation to scale.
    </p>

    <p>
      This is worth noting because the Malaysian digital marketing landscape has
      no shortage of agencies promising &quot;page one in two weeks&quot; or
      &quot;viral results guaranteed.&quot; Cressoft doesn&apos;t make those
      promises — and that restraint is itself a signal worth paying attention to.
    </p>

    <p>
      Their approach of pairing paid ads (for immediate lead flow) with SEO (as
      a compounding, long-term asset) is textbook integrated strategy. Done well,
      it gives businesses cash-flow certainty in the short term while building
      brand equity that reduces ad dependency over time.
    </p>

    <h2 className="cb-block-title">Who They&apos;re Built For</h2>

    <p>
      The majority of Cressoft&apos;s clientele are Malaysian SMEs — businesses
      with five to two hundred staff who need professional marketing expertise
      without the overhead of an in-house team. They also work with growth-stage
      startups and established brands entering new verticals.
    </p>

    <p>
      Importantly, Cressoft is set up to complement existing teams, not replace
      them. Many clients use them to own a specific channel — Google Ads, for
      instance — while their internal team handles content or social media. That
      flexibility makes them a practical choice for businesses at various stages
      of marketing maturity.
    </p>

    <hr className="cb-divider" />

    <h2 className="cb-block-title">
      The Free Strategy Audit — Worth Taking Seriously
    </h2>

    <p>
      Cressoft offers a free thirty-minute strategy audit. Unusually, they
      describe it as a genuine working session rather than a sales pitch. A
      senior strategist reviews your current online presence, identifies the top
      three highest-leverage opportunities, and delivers a practical thirty-day
      action plan — followed by a written summary within twenty-four hours.
    </p>

    <p>
      Whether or not you ultimately engage them, that&apos;s a useful offer. Any
      business owner wanting an honest external read on their digital position
      has very little to lose by taking the call.
    </p>

    <h2 className="cb-block-title">Final Thoughts</h2>

    <p>
      Cressoft Marketing is not trying to be the flashiest agency in Malaysia.
      They&apos;re trying to be the most reliable one. After twelve years, a 98%
      client satisfaction rate, and a portfolio spanning industries from
      automotive to F&amp;B to professional services, the evidence suggests
      they&apos;re succeeding at that goal.
    </p>

    <p>
      For Malaysian SMEs navigating an increasingly competitive digital
      landscape, that kind of track record — built slowly, on actual results — is
      exactly what&apos;s worth looking for in a long-term partner.
    </p>

    <aside className="blog-sidebar__widget blog-sidebar__widget--cta cb-cta">
      <p className="blog-sidebar__cta-lead">Next step</p>
      <h2 className="cb-cta__title">Ready to grow your brand online?</h2>
      <p className="cb-cta__text">
        Cressoft Marketing offers a free 30-minute strategy audit with no
        obligations. Find out where your biggest digital opportunities are.
      </p>
      <Link href="/contact" className="btn btn--primary cb-cta__btn">
        Claim your free audit
      </Link>
      <p className="cb-cta__fine">
        Or visit{" "}
        <a
          href="https://cressoft.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          cressoft.net
        </a>{" "}
        to learn more
      </p>
    </aside>
  </div>
);

export default CressoftBlogHtml;
