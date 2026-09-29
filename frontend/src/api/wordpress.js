/**
 * WordPress Headless REST API Client
 */

const API_BASE = import.meta.env.VITE_WP_API_URL || '';

export async function fetchJson(endpoint, fallback = null) {
  try {
    const separator = endpoint.includes('?') ? '&' : '?';
    const res = await fetch(`${API_BASE}${endpoint}${separator}_t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    });

    if (!res.ok) {
      console.warn(`API error on ${endpoint}: ${res.status}`);
      return fallback;
    }
    return await res.json();
  } catch (err) {
    console.warn(`Fetch failed for ${endpoint}:`, err.message);
    return fallback;
  }
}

// 1. Global Institutional Settings
export async function getSettings() {
  return await fetchJson('/wp-json/gurukapeeth/v1/settings', {
    college_name: 'Gurukripa Peeth College',
    college_hindi: 'गुरुकृपा पीठ महाविद्यालय',
    college_subtitle: 'Post Graduate & Teacher Training College',
    tagline: 'Nurturing Intellect, Cultivating Character, Empowering Society',
    affiliating_univ: 'Govind Guru Tribal University (GGTU), Banswara',
    ncte_code: 'WRC/APW05814/323363',
    aishe_code: 'C-48902',
    naac_grade: 'Accredited B+ (Cycle-1) / SSR in Progress',
    phone_primary: '+91 2964 234567',
    phone_secondary: '+91 94140 12345',
    email_info: 'info@gurukripapeeth.in',
    email_principal: 'principal@gurukripapeeth.in',
    address: 'Gurukripa Peeth College, Pratapgarh Road, Dungarpur, Rajasthan - 314001, India',
    marquee_announcement: 'Admissions Open 2026-27 for B.A., B.Sc., B.Ed., and Integrated B.A.-B.Ed. Programs — Apply Online Now!',
  });
}

// 2. Complete Homepage Assembled Data
export async function getHomepageData() {
  return await fetchJson('/wp-json/gurukapeeth/v1/homepage', null);
}

// 3. Marquee Ticker & Recent Announcements
export async function getMarqueeData() {
  return await fetchJson('/wp-json/gurukapeeth/v1/marquee', {
    announcement: 'Admissions Open 2026-27 for B.A., B.Sc., B.Ed., and Integrated B.A.-B.Ed. Programs — Apply Online Now!',
    notices: [],
  });
}

// 4. Navigation Menu Structure
export async function getNavigation() {
  return await fetchJson('/wp-json/gurukapeeth/v1/navigation', null);
}

// 5. Faculty & Staff Directory
export async function getFaculty() {
  return await fetchJson('/wp-json/gurukapeeth/v1/faculty', []);
}

// 6. Academic Programs
export async function getPrograms() {
  return await fetchJson('/wp-json/gurukapeeth/v1/programs', []);
}

// 7. Notices & Circulars
export async function getNotices() {
  return await fetchJson('/wp-json/gurukapeeth/v1/notices', []);
}

// 8. NAAC SSR Documents
export async function getNaacDocuments() {
  return await fetchJson('/wp-json/gurukapeeth/v1/naac', []);
}

// 9. IQAC Reports & AQAR
export async function getIqacReports() {
  return await fetchJson('/wp-json/gurukapeeth/v1/iqac', []);
}

// 10. Admission Lists & Cutoffs
export async function getAdmissions() {
  return await fetchJson('/wp-json/gurukapeeth/v1/admissions', []);
}

// 11. Leadership Messages
export async function getLeadership() {
  return await fetchJson('/wp-json/gurukapeeth/v1/leadership', []);
}
