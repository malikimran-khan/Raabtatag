import { Screen } from '@/components/ui/Screen';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { Features } from '@/components/home/Features';
import { Resources } from '@/components/home/Resources';
import { Testimonials } from '@/components/home/Testimonials';
import { Cta } from '@/components/home/Cta';

/**
 * Home — mobile app dashboard:
 * Hero (with the primary register actions) → Stats → Features →
 * Resources → Testimonials → Cta. All sections and links from the
 * web HomePage are preserved, restyled for one-hand mobile use.
 */
export default function HomeScreen() {
  return (
    <Screen>
      <Hero />
      <Stats />
      <Features />
      <Resources />
      <Testimonials />
      <Cta />
    </Screen>
  );
}

