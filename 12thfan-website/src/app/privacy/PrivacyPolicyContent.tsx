const sections = [
  {
    title: "1. Information We Collect",
    body: (
      <>
        <p>
          We collect and process personal information needed to run 12th Fan as a community and events app.
          This may include:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Account details:</strong> name, username, email address, authentication identifiers
          </li>
          <li>
            <strong>Profile and community content:</strong> photos, bios, posts, comments, reactions,
            messages, and similar content you choose to submit
          </li>
          <li>
            <strong>Event activity:</strong> events you create, join, save, or interact with
          </li>
          <li>
            <strong>Location data</strong> when you grant permission (see Location and maps)
          </li>
          <li>
            <strong>Device and technical data:</strong> app version, diagnostics, approximate usage
            metadata, and identifiers used for security and reliability
          </li>
          <li>
            <strong>Push notification tokens</strong> where you enable notifications
          </li>
          <li>
            <strong>Verification data</strong> when you start optional identity verification (see
            Identity verification and face liveness)
          </li>
          <li>
            <strong>Calendar data</strong> only if you use &quot;Add to calendar&quot; or similar features
            you explicitly trigger
          </li>
        </ul>
        <p className="mt-4">
          We do not intend to collect more than is reasonably necessary for the Services. If you choose
          not to provide certain information, some features may be unavailable.
        </p>
      </>
    ),
  },
  {
    title: "2. Location and maps",
    paragraphs: [
      "With your permission, we collect device location to show nearby events, distances, map pins, and related community features. You can turn this off in your device settings; some features will not work without it.",
      "Maps are displayed using your device's map SDK. On iOS, map tiles and related requests are handled by Apple's map services (MapKit / Apple Maps) under Apple's terms and privacy policy. On Android, map display may use Google Maps when configured, and Google may process requests needed to render maps under Google's policies.",
      "We use location and map-related information to operate features you request (for example event discovery and navigation context). We do not sell your personal information.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    body: (
      <>
        <p>We use your information to:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Create and manage accounts</li>
          <li>Provide and improve our Services</li>
          <li>Enable community and event features</li>
          <li>Personalise user experience</li>
          <li>Communicate important updates</li>
          <li>Prevent fraud, abuse, and security threats</li>
          <li>Analyse app usage and performance</li>
        </ul>
        <p className="mt-4">
          Depending on the activity, we rely on appropriate lawful bases under UK/EEA data protection law
          — for example performing our contract with you, legitimate interests (such as securing the
          Services and measuring reliability), consent where we expressly ask for it (such as optional
          verification), and legal obligations where applicable.
        </p>
      </>
    ),
  },
  {
    title: "4. Who helps us run the app (subprocessors)",
    body: (
      <>
        <p>
          Like most apps, we use specialist providers to host data, authenticate users, send messages,
          analyse crashes, and deliver certain features. They process information on our instructions and
          only where needed to provide the Services.
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-6">
          <li>
            <strong>Supabase</strong> — authentication, Postgres database, file storage, realtime
            channels, and related APIs that store and serve most of your account and community data.
          </li>
          <li>
            <strong>Google Firebase</strong> — Analytics (usage measurement), Crashlytics (crash
            diagnostics), and Firebase Cloud Messaging (native push plumbing on some devices). Firebase
            may receive device/app identifiers and event payloads described in Google&apos;s
            documentation.
          </li>
          <li>
            <strong>Expo</strong> — push notification delivery infrastructure (Expo push service) where
            used, alongside device tokens stored in your profile. Expo also provides the tooling we use
            to build the mobile app.
          </li>
          <li>
            <strong>Amazon Web Services (AWS)</strong> — optional identity verification, including face
            liveness via Amazon Rekognition (see below) and verification APIs we host on AWS (for example
            API Gateway / Lambda).
          </li>
          <li>
            <strong>Vercel</strong> — may host our verification web experience (for example pages under
            our verify domain) and/or serverless APIs such as automated text moderation endpoints; those
            systems may process the inputs required for that feature (for example text you submit when
            moderation runs).
          </li>
          <li>
            <strong>Resend</strong> — where configured as the SMTP/email delivery provider for Supabase
            Auth, Resend processes recipient addresses and message content/metadata needed to send
            transactional emails (such as sign-in or verification messages). If we change provider,
            equivalent processing may occur with another SMTP vendor.
          </li>
          <li>
            <strong>Apple</strong> — Sign in with Apple and Apple Maps / MapKit services as described in
            the sections below.
          </li>
        </ul>
        <p className="mt-4">
          This list is not a claim that &quot;no third parties&quot; see your data — it explains the main
          categories of organisations that may process personal data when you use the Services. Each
          provider has its own privacy notice for how it handles data on its systems.
        </p>
      </>
    ),
  },
  {
    title: "5. Identity verification and face liveness",
    paragraphs: [
      "Certain features may require optional identity verification to reduce impersonation, spam, and misuse. If you start verification, you will be guided through steps that can include capturing images/video with your camera and comparing a live capture to your profile photo.",
      "Face liveness checks may run in an in-app browser session that loads a page we host (which may be delivered via Vercel). That flow uses Amazon Rekognition Face Liveness (AWS) to help confirm a live person is present. AWS processes the inputs required for that session under AWS privacy terms. We then use AWS-hosted verification services to compare images and determine whether to mark your profile as verified in Supabase.",
      "We store verification outcomes (such as verified status and timestamps) in your profile where applicable. We do not use this flow to build a general-purpose biometric database unrelated to verification and safety. If you do not start verification, this processing does not occur.",
      "Where UK GDPR applies, verification that involves facial analysis may involve special category data; we rely on your explicit consent at the point you begin the flow, and you can stop at any time before completing it.",
    ],
  },
  {
    title: "6. Sign in with Apple",
    paragraphs: [
      "If you choose Sign in with Apple, Apple processes authentication on Apple's systems. Depending on your choices, Apple may share your name and/or email (including Apple's private relay email feature) with us so we can create and sign you into your account. Apple's handling of that data is governed by Apple's terms and privacy policy.",
      "We use the identifiers Apple provides to link your account in Supabase and to communicate service-related emails where applicable.",
    ],
  },
  {
    title: "7. Device permissions",
    body: (
      <>
        <p>Depending on the features you use, the app may request access to:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Camera (profile photos, QR codes, and optional verification / liveness)</li>
          <li>Photo library (choosing images to upload)</li>
          <li>Location (nearby events and maps)</li>
          <li>Notifications (alerts you opt into)</li>
          <li>Calendar (only when you use add-to-calendar features)</li>
        </ul>
        <p className="mt-4">
          You can manage or revoke permissions in your device settings. If you deny access, related
          features may be limited or unavailable.
        </p>
      </>
    ),
  },
  {
    title: "8. Community safety and moderation",
    paragraphs: [
      "Because 12th Fan is a community-based platform, we may monitor, review, or remove content and accounts that violate our Terms and Conditions or Community Guidelines.",
      "This may include investigating reports of harassment, abuse, hate speech, impersonation, spam, or unsafe behaviour in order to protect users and maintain platform safety.",
      "Automated moderation may send the text you are posting to our moderation API (which may be hosted on Vercel) solely to classify or block disallowed content; we do not use that processing for unrelated advertising profiling in the app.",
    ],
  },
  {
    title: "9. Cookies and similar technologies",
    paragraphs: [
      "We use cookies, analytics technologies, and similar tools to improve performance, understand usage patterns, and enhance user experience. In the mobile app, this is primarily SDK-based measurement rather than browser cookies.",
      "Firebase Analytics may collect app interaction and device-level data as described in Google's Firebase documentation; Firebase Crashlytics may collect crash diagnostics; Firebase Cloud Messaging and/or Expo push services may process device tokens needed to deliver push notifications. Supabase continues to host your account data and app content separately from Firebase.",
    ],
  },
  {
    title: "10. How long we keep your information",
    paragraphs: [
      "We retain personal information only for as long as necessary to provide the Services, comply with legal obligations, resolve disputes, and enforce our agreements.",
    ],
  },
  {
    title: "11. How we protect your information",
    paragraphs: [
      "We use reasonable technical and organisational security measures to protect your information.",
      "However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "12. International transfers",
    paragraphs: [
      "Our subprocessors may process data in the United Kingdom, the European Economic Area, the United States, and other countries where they operate. Where personal data is transferred outside the UK/EEA, we use appropriate safeguards where required (such as standard contractual clauses or equivalent mechanisms offered by our providers).",
    ],
  },
  {
    title: "13. Your rights, account deletion, and complaints",
    paragraphs: [
      "If you are in the UK or EEA, you may have rights under the UK GDPR / GDPR and local law, including to access, rectify, erase, restrict processing, object to certain processing, and port data where applicable. You may also withdraw consent for processing that is based on consent (for example by not completing optional verification).",
      "You can request account deletion from Account Settings where available. We will delete or anonymise personal data unless we must retain limited information to meet legal, security, or dispute-resolution obligations. If you need help, email admin@12thfan.co.uk.",
      "If you are in the UK and believe we have not handled your data fairly, you may complain to the Information Commissioner's Office (ICO). We appreciate the chance to resolve concerns first — please contact us using the details below.",
    ],
  },
  {
    title: "14. Children's privacy",
    paragraphs: [
      "The Services are strictly intended for users aged 18 years or older. We do not knowingly collect personal information from anyone under 18.",
    ],
  },
  {
    title: "15. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any changes will be posted within the Services with an updated revision date.",
    ],
  },
  {
    title: "16. Contact us",
    paragraphs: [
      "If you have questions about this Privacy Policy or your personal information, contact: admin@12thfan.co.uk",
    ],
  },
  {
    title: "17. Company information",
    body: (
      <address className="mt-4 not-italic leading-relaxed">
        12th Fan LTD
        <br />
        6 Hollies Ct
        <br />
        Basingstoke
        <br />
        England
        <br />
        RG24 9RJ
        <br />
        <br />
        Email:{" "}
        <a
          href="mailto:admin@12thfan.co.uk"
          className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
        >
          admin@12thfan.co.uk
        </a>
      </address>
    ),
  },
] as const;

export function PrivacyPolicyContent() {
  return (
    <article className="text-left text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Last updated: 15 May 2026
        <br />
        Contact:{" "}
        <a
          href="mailto:admin@12thfan.co.uk"
          className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
        >
          admin@12thfan.co.uk
        </a>
        <br />
        Company: 12th Fan LTD, 6 Hollies Ct, Basingstoke, England, RG24 9RJ
      </p>

      <p className="mt-8">
        This Privacy Policy explains how 12th Fan LTD (&quot;12th Fan&quot;, &quot;we&quot;, &quot;us&quot;,
        or &quot;our&quot;), as the data controller for the Services, collects, uses, stores, and protects
        your information when you use our website, mobile application, and related services
        (&quot;Services&quot;).
      </p>
      <p className="mt-4">
        By using our Services, you agree to the practices described in this Privacy Policy.
      </p>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {section.title}
            </h2>
            {"body" in section && section.body}
            {"paragraphs" in section &&
              section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-4">
                  {paragraph}
                </p>
              ))}
          </section>
        ))}
      </div>
    </article>
  );
}
