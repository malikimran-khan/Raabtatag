/**
 * Static guide content — cloned from the parking-alert web
 * SmartParkingGuidePage.jsx and QRCodeSafetyPage.jsx (hardcoded English).
 */

export type GuideBenefit = { icon: string; title: string; text: string };
export type GuideStep = { title: string; text: string };
export type SafetyFeature = { icon: string; title: string; text: string };

export const SMART_PARKING_GUIDE = {
  benefits: [
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy Protection',
      text: "Your phone number stays completely private. All communication is routed through RAABTA TAG's secure platform, so you never have to expose your personal contact details to strangers.",
    },
    {
      icon: 'chatbubble-ellipses-outline',
      title: 'Clear Communication',
      text: 'Leave structured, polite messages instead of anonymous notes. Drivers reach you instantly about blocked driveways or parking issues without any back-and-forth.',
    },
    {
      icon: 'ribbon-outline',
      title: 'Professional Image',
      text: 'A clean, modern QR tag on your dashboard shows that you care about communication and courtesy — far better than a handwritten paper note.',
    },
    {
      icon: 'time-outline',
      title: 'Time Saving',
      text: 'No more waiting around for someone to move their car. Get alerted the moment another driver needs you and resolve the situation in minutes.',
    },
  ] as GuideBenefit[],
  steps: [
    {
      title: 'Register Your Vehicle',
      text: 'Fill in your vehicle details (name, number, color) and your contact information in the RAABTA TAG app or website.',
    },
    {
      title: 'Get Your QR Code',
      text: 'Once approved by our admin team, you receive a unique dynamic QR code generated specifically for your vehicle.',
    },
    {
      title: 'Print & Display',
      text: 'Download the high-quality QR image, print it as a dashboard tag or order a professional sticker.',
    },
    {
      title: 'Stay Connected',
      text: 'Place it on your dashboard or get a professional sticker. You are now ready for smart parking!',
    },
  ] as GuideStep[],
  tips: [
    "Place your QR code where it's clearly visible from outside the vehicle, such as the dashboard or windshield.",
    'Use a high-quality print or sticker to ensure the QR code remains scannable even in different lighting conditions.',
    'Keep your vehicle registration details up to date in case you change your contact information.',
    'Register multiple vehicles if you own more than one — each gets its own unique QR code.',
    'Also register personal items like keys, bags, and phones for comprehensive QR tracking.',
  ] as string[],
};

export const QR_CODE_SAFETY = {
  dynamicPoints: [
    {
      lead: 'No direct phone number exposure',
      text: ' — The QR code never contains your actual phone number, only a link to your secure profile.',
    },
    {
      lead: 'Real-time updates',
      text: ' — Your profile information can be updated at any time without changing the QR code.',
    },
    {
      lead: 'Controlled access',
      text: ' — You decide what information is visible when someone scans your QR code.',
    },
    {
      lead: 'Scan tracking',
      text: ' — You receive notifications whenever your QR code is scanned, giving you full visibility.',
    },
  ] as Array<{ lead: string; text: string }>,
  features: [
    {
      icon: 'eye-off-outline',
      title: 'Anonymous Communication',
      text: 'When someone scans your QR code, they see only what you choose to share. Your identity stays hidden unless you decide to respond.',
    },
    {
      icon: 'server-outline',
      title: 'Secure Platform Routing',
      text: 'All messages and calls pass through RAABTA TAG servers — never directly between strangers and your personal devices.',
    },
    {
      icon: 'key-outline',
      title: 'Encrypted Connections',
      text: 'Every scan and every interaction happens over encrypted connections, keeping your data safe in transit.',
    },
    {
      icon: 'lock-closed-outline',
      title: 'No Data Selling',
      text: 'We never sell your data or share your personal information with third parties. Your details are used only to connect you.',
    },
  ] as SafetyFeature[],
  bestPractices: [
    {
      title: 'Only Scan Trusted Codes',
      text: 'When scanning a RAABTA TAG code, make sure it is intact and has not been tampered with or covered by another sticker.',
    },
    {
      title: 'Keep Your App Updated',
      text: 'Always use the latest version of the RAABTA TAG app or website to benefit from the newest security improvements.',
    },
    {
      title: 'Protect Your Account',
      text: 'Never share your registration details or login credentials with anyone. Our team will never ask for them.',
    },
    {
      title: 'Report Suspicious Activity',
      text: 'If you notice any unusual scans or suspect misuse of your QR code, contact our support team immediately.',
    },
    {
      title: 'Use Unique Codes Per Vehicle',
      text: 'Each vehicle should have its own unique RAABTA TAG QR code. Never share or reuse QR codes between different vehicles.',
    },
  ] as GuideStep[],
};
