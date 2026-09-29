# Shreesthi Infracon Pvt. Ltd. - Official Website

> **“Creating the Canvas for a New Tomorrow”**  
> Luxury Real Estate & Infrastructure Website developed with reference to [Barney Estates](https://www.barneyestates.co.uk/).

---

## 🌟 Overview & Highlights

This website has been custom built for **Shreesthi Infracon Pvt. Ltd.** based on the design brief, brand palette, and asset specifications:

1. **Header Ribbon (Frozen/Sticky on Scroll)**
   - Logo in the top-left corner (`assets/images/logo/logo-icon-gold.png`)
   - Sticky navigation ribbon with frosted glass blur effect (`rgba(10, 28, 19, 0.94)`)
   - Direct hyperlink from "About Us" to the middle company introduction section.
   - Quick action button for instant appointment scheduling.

2. **Hero Section with Drone Site Video**
   - Fullscreen drone footage (`assets/videos/hero-drone-1.mp4`) with smooth loop, auto-play, and fallback image.
   - Luxury gold crest emblem (`assets/images/logo/logo-badge-gold.jpg`).
   - Company title: **“SHREESTHI INFRACON” Pvt. Ltd.**
   - Tagline: *“Creating the Canvas for a New Tomorrow”*.
   - Key milestone badges: *Established 2019*, *3+ Completed Projects*, *100% Trust*, *Lucknow Prime Corridors*.
   - Barney Estates style ribbon banner below hero highlighting new development opportunities.

3. **About Section (Middle Section)**
   - Displays company logo and the exact brief introduction text.
   - Highlights 3 delivered projects and the core pillars: Integrity, Planned Spaces, and Sustainable Growth.
   - Real on-site photo showcase with floating achievement badge.

4. **Our Real Estate Services (Horizontal Scrolling Section)**
   - Interactive horizontal scroll container with previous/next navigation buttons and mouse drag support.
   - Features all **8 services** requested in the brief:
     1. Residential Projects
     2. Commercial Projects
     3. Residential & Commercial Plots
     4. Real Estate Investment Solutions
     5. Property Buying & Selling Assistance
     6. Construction & Development
     7. Property Consultancy
     8. Project Planning & Management
   - Each card is paired with high-definition real imagery from the project folder.
   - Clicking *"Inquire Service"* automatically scrolls to the appointment form and pre-selects that specific service in the dropdown!

5. **Landmark Projects Section**
   - **Project 01:** Greenfield Plotted Township (Outer Ring Corridor, Lucknow)
   - **Project 02:** Commercial Complex & Retail Hub (Near CMS Shaheed Path)
   - **Project 03:** Nature Grove Residential Enclave (Gomti Nagar Extension)
   - Interactive *"View Specs"* modal dialog displaying specs, amenities, and site photos.

6. **Site & Development Gallery**
   - Responsive photo gallery featuring 6 authentic on-site photos from the company.
   - Interactive fullscreen lightbox modal with next, previous, and keyboard controls (Esc, Arrow keys).

7. **Query & Appointment Booking Form**
   - Interactive booking form with input validation.
   - Select service, preferred date, budget range, and custom message.
   - Instant feedback confirmation and direct WhatsApp lead conversion.

8. **Contact & Corporate Office**
   - **Office Address:** D1/17 Vardaan khand near CMS Shahedpath, Gomti nagar extension, Lucknow, Uttar Pradesh
   - **Email:** `shreesthiinfracon@gmail.com`
   - **Phone:** `+91 98765 43210`
   - Embedded Google Map showing Gomti Nagar Extension, Lucknow.

9. **Floating WhatsApp Widget**
   - Persistent WhatsApp icon at bottom-right for instant 1-click customer inquiries.

---

## 📂 Directory Structure

```
shreesthi-infracon/
├── index.html                      # Main HTML5 entry point
├── README.md                       # Documentation & instructions
└── assets/
    ├── css/
    │   └── styles.css              # Custom styling, palette & typography
    ├── js/
    │   └── main.js                 # Sticky nav, horizontal scroll, lightbox, modals
    ├── videos/
    │   ├── hero-drone-1.mp4        # Main hero drone video (9.9 MB)
    │   └── hero-drone-2.mp4        # Alternate high-res drone footage
    └── images/
        ├── logo/                   # Brand logos, emblems & badges
        ├── services/               # 8 high-res service images
        ├── projects/               # Project 1, 2, and 3 site images
        └── gallery/                # Authentic on-site progress photos
```

---

## 🚀 How to Run the Website Locally

You can open `index.html` directly in any web browser, or run a local web server:

```powershell
# Using Python:
cd C:\Users\imami\.gemini\antigravity\scratch\shreesthi-infracon
python -m http.server 8080
```

Then visit **`http://localhost:8080/`** in your browser.
