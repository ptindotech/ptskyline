import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/brand/site-config";

export const metadata: Metadata = {
  title: "Otjiwarongo Sports Bonanza 2026",
  description: "Otjiwarongo Sports Bonanza 2026: 21 to 23 August at Mokati Stadium. Soccer, netball, volleyball. N$45,000 in prizes. King Tee Dee live Saturday.",
  alternates: { canonical: "/blog/otjiwarongo-sports-bonanza-2026" },
  openGraph: {
    title: "Otjiwarongo Sports Bonanza 2026 | Mendozer Investments",
    description: "21 to 23 August 2026 at Mokati Stadium. Soccer, netball, volleyball. N$45,000 prize pool. Music by King Tee Dee.",
    type: "article",
    url: "/blog/otjiwarongo-sports-bonanza-2026",
    images: [{ url: "/images/blog/otjiwarongo-sports-bonanza-flyer.jpg", width: 1809, height: 2560, alt: "Otjiwarongo Sports Bonanza 2026 event flyer" }],
    publishedTime: "2026-08-15T00:00:00.000Z",
    authors: ["Mendozer Investments"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Otjiwarongo Sports Bonanza 2026 | Mendozer Investments",
    description: "21 to 23 August 2026 at Mokati Stadium. N$45,000 prize pool. Music by King Tee Dee.",
    images: ["/images/blog/otjiwarongo-sports-bonanza-flyer.jpg"],
  },
};

export default function OtjiwarongoSportsBonanzaPage() {
  const postUrl = `${siteConfig.url}/blog/otjiwarongo-sports-bonanza-2026`;
  const imageUrl = `${siteConfig.url}/images/blog/otjiwarongo-sports-bonanza-flyer.jpg`;

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Otjiwarongo Sports Bonanza 2026",
    description: "Mendozer Investments presents the Otjiwarongo Sports Bonanza, three days of soccer, netball, and volleyball at Mokati Stadium with a N$45,000 prize pool and live music by King Tee Dee.",
    startDate: "2026-08-21",
    endDate: "2026-08-23",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Mokati Stadium",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Otjiwarongo",
        addressCountry: "NA",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Mendozer Investments",
      url: siteConfig.url,
      email: siteConfig.email,
    },
    image: imageUrl,
    offers: [
      {
        "@type": "Offer",
        name: "Friday entry",
        price: "0",
        priceCurrency: "NAD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-08-21",
      },
      {
        "@type": "Offer",
        name: "Saturday music show entry",
        price: "30",
        priceCurrency: "NAD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-08-22",
      },
      {
        "@type": "Offer",
        name: "Sunday entry",
        price: "0",
        priceCurrency: "NAD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-08-23",
      },
    ],
  };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Otjiwarongo Sports Bonanza 2026: Sport, Music, Unity, Community",
    image: imageUrl,
    datePublished: "2026-08-15T00:00:00.000Z",
    dateModified: "2026-08-15T00:00:00.000Z",
    author: {
      "@type": "Organization",
      name: "Mendozer Investments",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Mendozer Investments",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/assets/logos/mendozer-logo-full.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    description: "Otjiwarongo Sports Bonanza 2026: 21 to 23 August at Mokati Stadium. Soccer, netball, volleyball. N$45,000 in prizes. King Tee Dee live Saturday.",
  };

  const sports = [
    {
      name: "Soccer",
      total: "N$30,000",
      registration: "N$500",
      prizes: [
        { place: "Winner", amount: "N$15,000" },
        { place: "Runner-up", amount: "N$10,000" },
        { place: "Semi-finalists (each)", amount: "N$2,500" },
      ],
    },
    {
      name: "Netball",
      total: "N$10,000",
      registration: "N$300",
      prizes: [
        { place: "Winner", amount: "N$5,000" },
        { place: "Runner-up", amount: "N$3,000" },
        { place: "Semi-finalists (each)", amount: "N$1,000" },
      ],
    },
    {
      name: "Volleyball",
      total: "N$5,000",
      registration: "N$100",
      prizes: [
        { place: "Winner", amount: "N$2,500" },
        { place: "Runner-up", amount: "N$1,000" },
        { place: "Semi-finalists (each)", amount: "N$750" },
      ],
    },
  ];

  const contacts = [
    { name: "Sehedy", phone: "081 277 8696" },
    { name: "Regina", phone: "081 680 5242" },
    { name: "Jeremia", phone: "081 471 5216" },
  ];

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} type="application/ld+json" />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Mendozer Investments presents</p>
            </Reveal>
            <Reveal delay={80}>
              <h1>Otjiwarongo Sports Bonanza 2026.</h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="blog-post__lede">
                Three days of sport, music, and community at Mokati Stadium. N$45,000 up for grabs across soccer, netball, and volleyball. King Tee Dee headlines the Saturday music show.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="blog-post__meta">
                <span>21 to 23 August 2026</span>
                <span aria-hidden="true"> / </span>
                <span>Mokati Stadium, Otjiwarongo</span>
                <span aria-hidden="true"> / </span>
                <span>Theme: Sport, Music, Unity, Community</span>
              </div>
            </Reveal>
          </div>
        </header>

        <section className="blog-post__featured">
          <div className="site-container">
            <Reveal variant="up">
              <figure className="blog-post__figure">
                <Image
                  alt="Otjiwarongo Sports Bonanza 2026 event flyer with full event details, prize breakdown, and contact information"
                  className="blog-post__flyer"
                  height={2560}
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  src="/images/blog/otjiwarongo-sports-bonanza-flyer.jpg"
                  unoptimized
                  width={1809}
                />
                <figcaption>Otjiwarongo Sports Bonanza 2026 official flyer</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="section blog-post__body">
          <div className="site-container blog-post__body-inner">
            <Reveal>
              <h2>One weekend. Three sports. One community.</h2>
              <p>
                Mendozer Investments is bringing the Otjiwarongo Sports Bonanza to Mokati Stadium from Friday 21 August to Sunday 23 August 2026. Three days of competitive soccer, netball, and volleyball, capped with a live music show on Saturday night headlined by King Tee Dee. The full prize pool sits at N$45,000, spread across three sports and multiple placement tiers, so more teams walk away with something.
              </p>
              <p>
                The bonanza is built around a simple theme: Sport, Music, Unity, Community. Mendozer Investments is putting real money behind local sport because the Otjiwarongo community has the talent and the energy to match. Whether you are a player, a coach, a fan, or a music lover, there is a lane for you across the weekend.
              </p>
            </Reveal>

            <Reveal>
              <h2>Event details</h2>
              <dl className="blog-post__details">
                <div>
                  <dt>Dates</dt>
                  <dd>Friday 21 August to Sunday 23 August 2026</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>Mokati Stadium, Otjiwarongo, Namibia</dd>
                </div>
                <div>
                  <dt>Prize pool</dt>
                  <dd>N$45,000 up for grabs across soccer, netball, and volleyball</dd>
                </div>
                <div>
                  <dt>Entry</dt>
                  <dd>
                    <span>Friday: Free</span>
                    <span>Saturday: N$30 (music show)</span>
                    <span>Sunday: Free</span>
                  </dd>
                </div>
                <div>
                  <dt>Theme</dt>
                  <dd>Sport, Music, Unity, Community</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal>
              <h2>Prize breakdown by sport</h2>
              <p>Three sports, each with its own registration fee and prize structure. Every sport pays out to the winner, runner-up, and both semi-finalists.</p>
            </Reveal>

            {sports.map((sport) => (
              <Reveal key={sport.name}>
                <div className="blog-post__sport">
                  <div className="blog-post__sport-header">
                    <h3>{sport.name}</h3>
                    <div className="blog-post__sport-totals">
                      <span className="blog-post__sport-total">Total: {sport.total}</span>
                      <span className="blog-post__sport-reg">Registration: {sport.registration}</span>
                    </div>
                  </div>
                  <table className="blog-post__prizes">
                    <thead>
                      <tr>
                        <th>Placement</th>
                        <th>Prize</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sport.prizes.map((prize) => (
                        <tr key={prize.place}>
                          <td>{prize.place}</td>
                          <td>{prize.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <h2>Entertainment lineup</h2>
              <p>
                Saturday night is the music show. King Tee Dee headlines, with more local acts to be announced. Entry to the Saturday music show is N$30 at the gate. Friday and Sunday sport entries are free, so the whole community can come through and watch the action.
              </p>
              <p>
                The full artist lineup and set times will be confirmed closer to the event. Follow Mendozer Investments on Instagram and Facebook for updates as the weekend approaches.
              </p>
            </Reveal>

            <Reveal>
              <div className="blog-post__cta">
                <h2>Register your team or get more info</h2>
                <p>Contacts are open for team registration and general enquiries. Call any of the three organisers below to lock in your spot.</p>
                <div className="blog-post__contacts">
                  {contacts.map((contact) => (
                    <a key={contact.name} href={`tel:+264${contact.phone.replace(/\s/g, "").replace(/^0/, "")}`}>
                      <span>{contact.name}</span>
                      <strong>{contact.phone}</strong>
                    </a>
                  ))}
                </div>
                <Link className="button button--primary" href="/contact">
                  <span>Send a group enquiry</span>
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
}
