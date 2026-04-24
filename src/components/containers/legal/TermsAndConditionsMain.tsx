import React from "react";
import Link from "next/link";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
} from "@/constants/contact";

/**
 * Long-form Terms & Conditions for Cressoft Marketing.
 * Covers website use plus the engagement model commonly used for the agency's
 * digital marketing services. Written under Malaysian law.
 */
const TermsAndConditionsMain = () => {
  return (
    <section className="section legal-page fade-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <article className="legal-page__content fade-top">
              <p className="legal-page__meta">
                <strong>Effective date:</strong> 1 April 2026
                <br />
                <strong>Last updated:</strong> 22 April 2026
              </p>

              <p className="primary-text">
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your
                use of the website <Link href="/">cressoft.net</Link> and the
                digital marketing services provided by{" "}
                <strong>Cressoft Marketing</strong> (&ldquo;Cressoft&rdquo;,
                &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By
                accessing our website or engaging our services, you confirm
                that you have read, understood, and agreed to be bound by
                these Terms.
              </p>

              <h2 className="legal-page__h2">1. About us</h2>
              <p>
                Cressoft Marketing is a digital marketing agency based at{" "}
                {CONTACT_ADDRESS}. You can reach us at{" "}
                <Link href={CONTACT_MAILTO_HREF}>{CONTACT_EMAIL}</Link> or{" "}
                <Link href={CONTACT_PHONE_TEL_HREF}>
                  {CONTACT_PHONE_DISPLAY}
                </Link>
                .
              </p>

              <h2 className="legal-page__h2">2. Use of our website</h2>
              <p>
                You agree to use our website lawfully and in a manner that
                does not infringe on the rights of, restrict, or inhibit
                anyone else&rsquo;s use of the site. In particular, you agree
                not to:
              </p>
              <ul className="legal-page__list">
                <li>
                  Attempt to gain unauthorised access to any part of our
                  website, systems, or networks.
                </li>
                <li>
                  Upload or transmit any virus, malware, or harmful code.
                </li>
                <li>
                  Use automated tools (bots, scrapers, crawlers) to extract
                  data from the site without our prior written consent, except
                  for legitimate search-engine indexing.
                </li>
                <li>
                  Reproduce, copy, or resell any portion of the website for a
                  commercial purpose without our written permission.
                </li>
              </ul>
              <p>
                We reserve the right to suspend or restrict access to the
                website at any time, with or without notice, for any reason.
              </p>

              <h2 className="legal-page__h2">3. Services and engagement</h2>
              <p>
                Cressoft provides digital marketing services including but not
                limited to search engine optimisation (SEO), Google Ads and
                paid media management, social media marketing, content
                production, branding, web design and development, and related
                consulting work. The specific scope, deliverables, timeline,
                and fees for any engagement will be set out in a separate
                proposal, statement of work, or contract (&ldquo;SOW&rdquo;).
                If anything in the SOW conflicts with these Terms, the SOW
                will prevail for that engagement.
              </p>

              <h2 className="legal-page__h2">4. Quotations and proposals</h2>
              <p>
                Quotations and proposals issued by Cressoft are valid for{" "}
                <strong>30 days</strong> from the date of issue, unless
                otherwise stated. A project is confirmed only when both
                parties have signed the SOW (or otherwise accepted it in
                writing) and any required deposit has been received.
              </p>

              <h2 className="legal-page__h2">5. Fees, invoicing &amp; payment</h2>
              <ul className="legal-page__list">
                <li>
                  Fees are quoted in Malaysian Ringgit (MYR) unless stated
                  otherwise and are exclusive of any applicable taxes (e.g.
                  SST), bank charges, third-party media spend, or licence
                  fees.
                </li>
                <li>
                  For one-off projects, we typically require a deposit of
                  30&ndash;50% before work begins, with the balance invoiced
                  according to the milestones in the SOW.
                </li>
                <li>
                  Retainers and recurring services are invoiced monthly in
                  advance unless otherwise agreed.
                </li>
                <li>
                  Invoices are due within <strong>14 days</strong> of the
                  invoice date unless a different term is stated on the
                  invoice or in the SOW.
                </li>
                <li>
                  Late payments may, at our discretion, attract interest of
                  1.5% per month on the outstanding balance, and we reserve
                  the right to suspend ongoing work until the account is
                  brought up to date.
                </li>
                <li>
                  Third-party costs &mdash; including ad spend, software
                  subscriptions, stock assets, and hosting &mdash; are passed
                  through to the client unless explicitly included in the
                  SOW.
                </li>
              </ul>

              <h2 className="legal-page__h2">6. Client responsibilities</h2>
              <p>
                To enable us to deliver our services on time and on budget,
                you agree to:
              </p>
              <ul className="legal-page__list">
                <li>
                  Provide timely access to relevant accounts, platforms,
                  brand assets, content, and approvals.
                </li>
                <li>
                  Designate a single point of contact who is empowered to
                  make decisions and approve deliverables.
                </li>
                <li>
                  Provide feedback, sign-offs, and content within the
                  timelines agreed in the SOW. Delays caused by the client
                  may shift project timelines and may incur additional fees.
                </li>
                <li>
                  Ensure that any materials you provide (text, images,
                  videos, logos, data, etc.) are accurate, do not infringe
                  third-party rights, and comply with applicable laws.
                </li>
              </ul>

              <h2 className="legal-page__h2">7. Revisions and change requests</h2>
              <p>
                Each deliverable includes a reasonable number of revision
                rounds as set out in the SOW. Additional revisions, scope
                changes, or new requirements outside the agreed scope will be
                quoted separately as a change request and will be invoiced
                accordingly.
              </p>

              <h2 className="legal-page__h2">8. Intellectual property</h2>
              <ul className="legal-page__list">
                <li>
                  All content on our website (including text, graphics,
                  logos, code, and design) is owned by or licensed to
                  Cressoft and is protected by Malaysian and international
                  intellectual-property laws.
                </li>
                <li>
                  On full payment of all fees due, ownership of the final
                  deliverables created specifically for your project transfers
                  to you, except for any third-party assets, open-source
                  components, fonts, stock media, or proprietary tools and
                  frameworks owned by Cressoft.
                </li>
                <li>
                  Cressoft retains the right to use deliverables, project
                  outcomes, and case-study information in our portfolio,
                  marketing materials, and pitches, unless otherwise agreed
                  in writing.
                </li>
              </ul>

              <h2 className="legal-page__h2">9. Confidentiality</h2>
              <p>
                Both parties agree to keep each other&rsquo;s confidential
                information secure and to use it only for the purposes of the
                engagement. This obligation continues after the engagement
                ends. Confidential information does not include information
                that is already public, was lawfully received from a third
                party, or is required to be disclosed by law.
              </p>

              <h2 className="legal-page__h2">10. Performance and results</h2>
              <p>
                Digital marketing depends on many factors outside our control
                &mdash; including search-engine algorithms, ad-platform
                policies, market conditions, competitor activity, and the
                quality of the underlying product or service. While we apply
                proven strategies and best practices, Cressoft does not
                guarantee specific rankings, traffic, leads, conversions, or
                revenue outcomes unless explicitly stated in writing.
              </p>

              <h2 className="legal-page__h2">11. Third-party platforms</h2>
              <p>
                Many of our services involve third-party platforms (Google,
                Meta, TikTok, hosting providers, CRMs, etc.). We are not
                responsible for changes those platforms make to their terms,
                pricing, features, or policies, nor for outages, data loss,
                account suspensions, or rejected ads caused by those
                platforms.
              </p>

              <h2 className="legal-page__h2">12. Termination</h2>
              <ul className="legal-page__list">
                <li>
                  Either party may terminate an ongoing engagement by giving
                  the notice period specified in the SOW (typically{" "}
                  <strong>30 days&rsquo; written notice</strong>).
                </li>
                <li>
                  Either party may terminate immediately if the other party
                  commits a material breach that is not remedied within 14
                  days of written notice, or becomes insolvent.
                </li>
                <li>
                  On termination, you remain liable for all fees and
                  third-party costs incurred up to the termination date,
                  including work performed but not yet invoiced.
                </li>
              </ul>

              <h2 className="legal-page__h2">13. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, Cressoft&rsquo;s
                total aggregate liability arising out of or in connection
                with these Terms or any engagement shall not exceed the total
                fees paid by you to Cressoft in the{" "}
                <strong>three (3) months</strong> immediately preceding the
                event giving rise to the liability. We will not be liable for
                any indirect, incidental, special, consequential, or punitive
                damages, including loss of profits, revenue, data, or
                goodwill.
              </p>

              <h2 className="legal-page__h2">14. Indemnity</h2>
              <p>
                You agree to indemnify and hold Cressoft harmless from any
                claim, loss, or damage (including reasonable legal fees)
                arising from materials you provide, your use of the
                deliverables in breach of these Terms, or your violation of
                any law or third-party right.
              </p>

              <h2 className="legal-page__h2">15. Force majeure</h2>
              <p>
                Neither party will be liable for any failure or delay in
                performance caused by events outside its reasonable control,
                including natural disasters, pandemics, government action,
                war, civil unrest, internet or utility outages, or third-party
                platform failures.
              </p>

              <h2 className="legal-page__h2">16. Privacy</h2>
              <p>
                Our handling of personal data is governed by our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>, which
                forms part of these Terms.
              </p>

              <h2 className="legal-page__h2">17. Governing law and disputes</h2>
              <p>
                These Terms are governed by the laws of Malaysia. Any dispute
                arising out of or in connection with these Terms shall be
                subject to the exclusive jurisdiction of the courts of
                Malaysia. The parties agree to first attempt to resolve any
                dispute through good-faith discussions before initiating
                formal proceedings.
              </p>

              <h2 className="legal-page__h2">18. Changes to these Terms</h2>
              <p>
                We may revise these Terms from time to time. The
                &ldquo;Last updated&rdquo; date above will reflect the most
                recent changes. Continued use of our website or services
                after a change constitutes acceptance of the revised Terms.
              </p>

              <h2 className="legal-page__h2">19. Contact us</h2>
              <p>
                For any questions about these Terms, please get in touch:
              </p>
              <ul className="legal-page__list">
                <li>
                  <strong>Email:</strong>{" "}
                  <Link href={CONTACT_MAILTO_HREF}>{CONTACT_EMAIL}</Link>
                </li>
                <li>
                  <strong>Phone / WhatsApp:</strong>{" "}
                  <Link href={CONTACT_PHONE_TEL_HREF}>
                    {CONTACT_PHONE_DISPLAY}
                  </Link>
                </li>
                <li>
                  <strong>Address:</strong> {CONTACT_ADDRESS}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionsMain;
