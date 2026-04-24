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
 * Long-form Privacy Policy for Cressoft Marketing.
 * Written to align with Malaysia's Personal Data Protection Act 2010 (PDPA)
 * and common cookie / analytics disclosures for a marketing agency website.
 */
const PrivacyPolicyMain = () => {
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
                This Privacy Policy explains how <strong>Cressoft Marketing</strong>{" "}
                (&ldquo;Cressoft&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
                &ldquo;us&rdquo;) collects, uses, discloses, and protects your
                personal data when you visit{" "}
                <Link href="/">cressoft.net</Link>, contact us, or engage our
                digital marketing services. We are committed to handling your
                personal data in accordance with Malaysia&rsquo;s{" "}
                <em>Personal Data Protection Act 2010 (PDPA)</em> and other
                applicable laws.
              </p>

              <h2 className="legal-page__h2">1. Who we are</h2>
              <p>
                Cressoft Marketing is a digital marketing agency based at{" "}
                {CONTACT_ADDRESS}. For any questions about this policy or the
                personal data we hold about you, please contact us at{" "}
                <Link href={CONTACT_MAILTO_HREF}>{CONTACT_EMAIL}</Link> or{" "}
                <Link href={CONTACT_PHONE_TEL_HREF}>{CONTACT_PHONE_DISPLAY}</Link>.
              </p>

              <h2 className="legal-page__h2">2. Information we collect</h2>
              <p>
                We only collect personal data that is reasonably necessary for
                the services we provide and the operation of our website. The
                categories of data we may collect include:
              </p>
              <ul className="legal-page__list">
                <li>
                  <strong>Contact details</strong> &mdash; your name, email,
                  phone number, company name, and job title when you submit a
                  form, request a quote, or message us on WhatsApp.
                </li>
                <li>
                  <strong>Project information</strong> &mdash; the goals,
                  budget, timelines, and business context you share with us so
                  we can prepare a proposal or run a campaign.
                </li>
                <li>
                  <strong>Billing details</strong> &mdash; company registration
                  number, billing address, and tax information required to
                  invoice clients.
                </li>
                <li>
                  <strong>Website usage data</strong> &mdash; IP address,
                  browser type, device type, referring URL, pages visited,
                  approximate location (city/country), and timestamps,
                  collected automatically through cookies and analytics tools.
                </li>
                <li>
                  <strong>Marketing preferences</strong> &mdash; your
                  subscription status for newsletters, case studies, or
                  campaign updates.
                </li>
              </ul>

              <h2 className="legal-page__h2">3. How we use your information</h2>
              <p>We use the personal data we collect to:</p>
              <ul className="legal-page__list">
                <li>
                  Respond to your enquiries and provide the marketing services
                  you have requested (SEO, Google Ads, social media, web
                  development, branding, and related work).
                </li>
                <li>
                  Prepare proposals, contracts, statements of work, and
                  invoices.
                </li>
                <li>
                  Operate, maintain, and improve our website &mdash; including
                  measuring page performance and understanding which content
                  is most useful.
                </li>
                <li>
                  Send service-related communications (status updates, reports,
                  renewal reminders).
                </li>
                <li>
                  Send marketing communications &mdash; only where you have
                  opted in or where we are otherwise permitted to do so under
                  the PDPA. You can opt out at any time.
                </li>
                <li>
                  Comply with legal, regulatory, accounting, and tax
                  obligations in Malaysia.
                </li>
                <li>
                  Detect, prevent, and respond to fraud, abuse, security
                  incidents, and unlawful activity.
                </li>
              </ul>

              <h2 className="legal-page__h2">4. Cookies and analytics</h2>
              <p>
                Our website uses cookies and similar technologies to make the
                site work, remember your preferences, and help us understand
                how visitors use it. We may use third-party analytics and
                advertising tools such as Google Analytics, Google Tag
                Manager, Google Ads, and Meta Pixel. These tools may set
                cookies or process limited identifiers to measure traffic,
                attribute conversions, and improve our marketing.
              </p>
              <p>
                You can control or block cookies through your browser
                settings. Disabling cookies may affect the functionality of
                certain parts of the site.
              </p>

              <h2 className="legal-page__h2">5. How we share your information</h2>
              <p>
                We do not sell your personal data. We only share it with
                trusted parties when it is necessary to deliver our services
                or to meet a legal obligation, including:
              </p>
              <ul className="legal-page__list">
                <li>
                  <strong>Service providers</strong> who help us operate our
                  business &mdash; for example, hosting providers, email
                  platforms, CRM and project-management tools, analytics
                  vendors, and payment processors.
                </li>
                <li>
                  <strong>Advertising partners</strong> such as Google and Meta
                  when running performance campaigns on your behalf, where
                  applicable and within their policies.
                </li>
                <li>
                  <strong>Professional advisors</strong> such as lawyers,
                  accountants, and auditors.
                </li>
                <li>
                  <strong>Authorities</strong> when required by Malaysian law,
                  a court order, or a legitimate request from a regulator.
                </li>
              </ul>
              <p>
                Where personal data is transferred outside Malaysia (for
                example to global SaaS providers), we take reasonable steps to
                ensure that the data continues to receive an adequate level of
                protection.
              </p>

              <h2 className="legal-page__h2">6. How long we keep your data</h2>
              <p>
                We retain personal data only for as long as it is necessary
                for the purposes set out in this policy, to fulfil our
                contractual obligations, or to comply with legal, accounting,
                or tax requirements. When data is no longer required, it is
                securely deleted or anonymised.
              </p>

              <h2 className="legal-page__h2">7. How we protect your data</h2>
              <p>
                We use reasonable technical and organisational measures
                &mdash; including access controls, encryption in transit
                (HTTPS), and vetted vendors &mdash; to protect personal data
                against loss, misuse, unauthorised access, disclosure,
                alteration, or destruction. No method of transmission over the
                Internet is 100% secure, but we work hard to protect the data
                you entrust to us.
              </p>

              <h2 className="legal-page__h2">8. Your rights under the PDPA</h2>
              <p>
                Subject to certain conditions and exceptions under the PDPA,
                you have the right to:
              </p>
              <ul className="legal-page__list">
                <li>Access the personal data we hold about you.</li>
                <li>
                  Request correction of personal data that is inaccurate,
                  incomplete, misleading, or out of date.
                </li>
                <li>
                  Withdraw your consent for us to process your personal data,
                  or limit the processing of it.
                </li>
                <li>Opt out of receiving marketing communications.</li>
                <li>
                  Lodge a complaint with the Personal Data Protection
                  Department (Jabatan Perlindungan Data Peribadi) if you
                  believe your rights have been infringed.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please email us at{" "}
                <Link href={CONTACT_MAILTO_HREF}>{CONTACT_EMAIL}</Link>. We
                may need to verify your identity before responding.
              </p>

              <h2 className="legal-page__h2">9. Children&rsquo;s privacy</h2>
              <p>
                Our services are intended for businesses and adult
                professionals. We do not knowingly collect personal data from
                children under 18. If you believe a child has provided
                personal data to us, please contact us so we can remove it.
              </p>

              <h2 className="legal-page__h2">10. Third-party websites</h2>
              <p>
                Our website may link to third-party websites, tools, or social
                media platforms that we do not control. This Privacy Policy
                does not apply to those third parties &mdash; please review
                their own privacy policies before using them.
              </p>

              <h2 className="legal-page__h2">11. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our services, technology, or applicable law. The
                &ldquo;Last updated&rdquo; date at the top of this page will
                always show when it was most recently revised. Material
                changes will be highlighted on this page or communicated via
                email where appropriate.
              </p>

              <h2 className="legal-page__h2">12. Contact us</h2>
              <p>
                If you have any questions, concerns, or requests regarding
                this Privacy Policy or how we handle your personal data,
                please reach out:
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

export default PrivacyPolicyMain;
