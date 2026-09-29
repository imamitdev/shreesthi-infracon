/**
 * SHREESTHI INFRACON PVT. LTD. - Main JavaScript Controller
 * Interactive Features:
 * - Sticky Header Scroll Detection
 * - Smooth Anchor Scrolling (Hyperlink to Middle/About Section)
 * - Horizontal Scrolling Services Showcase (Drag & Button Navigation)
 * - Service to Form Auto-Fill Linkage
 * - Project Modal & Specs
 * - Responsive Gallery Lightbox
 * - Appointment / Query Form Handler with WhatsApp Integration
 * - Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initHorizontalScroll();
  initServiceInquiryLinks();
  initGalleryLightbox();
  initProjectModals();
  initAppointmentForm();
  initScrollAnimations();
});

/* ---------- 1. Sticky Header Scroll Detection ---------- */
function initStickyHeader() {
  const header = document.querySelector('.header-sticky');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ---------- 2. Mobile Navigation Drawer ---------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeBtn = document.getElementById('mobileNavClose');
  const overlay = document.getElementById('mobileNavOverlay');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!overlay || !toggleBtn) return;

  const openNav = () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });
}

/* ---------- 3. Horizontal Scrolling Services Showcase with Auto-Scroll ---------- */
function initHorizontalScroll() {
  const scrollContainer = document.getElementById('servicesScrollContainer');
  const prevBtn = document.getElementById('servicesScrollPrev');
  const nextBtn = document.getElementById('servicesScrollNext');

  if (!scrollContainer) return;

  const getScrollDistance = () => {
    const card = scrollContainer.querySelector('.service-card');
    if (card) {
      const style = window.getComputedStyle(scrollContainer);
      const gap = parseInt(style.gap || '24', 10);
      return card.offsetWidth + gap;
    }
    return 380;
  };

  const scrollNext = () => {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    // If reached end, loop smoothly back to beginning
    if (scrollContainer.scrollLeft >= maxScroll - 20) {
      scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      scrollContainer.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollContainer.scrollLeft <= 20) {
      scrollContainer.scrollTo({ left: scrollContainer.scrollWidth, behavior: 'smooth' });
    } else {
      scrollContainer.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
    }
  };

  // Auto-scroll Timer: advances every 3.5 seconds
  let autoScrollTimer = null;
  const AUTO_SCROLL_INTERVAL = 3500;

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollTimer = setInterval(() => {
      scrollNext();
    }, AUTO_SCROLL_INTERVAL);
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  };

  const resetAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };

  // Button clicks
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      scrollNext();
      resetAutoScroll();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      scrollPrev();
      resetAutoScroll();
    });
  }

  // Pause on hover so users can easily read cards
  scrollContainer.addEventListener('mouseenter', stopAutoScroll);
  scrollContainer.addEventListener('mouseleave', startAutoScroll);

  // Pause on touch devices
  scrollContainer.addEventListener('touchstart', stopAutoScroll, { passive: true });
  scrollContainer.addEventListener('touchend', startAutoScroll, { passive: true });

  // Start auto-scroll on load
  startAutoScroll();

  // Drag to scroll functionality
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    stopAutoScroll();
    scrollContainer.style.cursor = 'grabbing';
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
    startAutoScroll();
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
    resetAutoScroll();
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
}

/* ---------- 4. Auto-Fill Service into Appointment Form ---------- */
function initServiceInquiryLinks() {
  const inquiryButtons = document.querySelectorAll('.service-action-btn');
  const serviceSelect = document.getElementById('appointmentService');
  const appointmentSection = document.getElementById('query') || document.getElementById('appointment');

  inquiryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service');
      if (serviceName && serviceSelect) {
        serviceSelect.value = serviceName;
      }
      if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
        // Flash subtle focus ring
        setTimeout(() => {
          if (serviceSelect) serviceSelect.focus();
        }, 600);
      }
    });
  });
}

/* ---------- 5. Responsive Gallery Lightbox ---------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!lightbox || !lightboxImg) return;

  const images = [];
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      images.push({
        src: img.getAttribute('src') || img.src,
        caption: item.querySelector('.gallery-caption')?.textContent || `Gallery Image ${index + 1}`
      });
    }
  });

  let currentIndex = 0;

  const updateLightbox = (idx) => {
    currentIndex = (idx + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].caption;
  };

  const openLightbox = (index) => {
    updateLightbox(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => updateLightbox(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateLightbox(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
  });
}

/* ---------- 6. Project Modal Details ---------- */
function initProjectModals() {
  const projectButtons = document.querySelectorAll('.view-project-btn');
  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');
  const projectModalBody = document.getElementById('projectModalBody');

  if (!projectModal || !projectModalBody) return;

  const projectDetails = {
    '1': {
      title: 'Project 01: Greenfield Plotted Township',
      tag: 'Completed / Delivered',
      location: 'Prime Outer Ring Corridor, Lucknow',
      desc: 'A premium 25-acre gated plotted township developed with world-class planning. Features 40ft & 30ft wide black-top roads, underground electrification, dedicated green parks, and clear freehold registration titles.',
      highlights: [
        'Gated Community with 24/7 Security Entry',
        'Lush Green Avenue Plantation & Landscaping',
        'Immediate Registry & Mutation Assured',
        'Over 180+ Delighted Families Invested'
      ],
      images: [
        'assets/images/projects/project-1/IMG-20221129-WA0033.jpg',
        'assets/images/projects/project-1/IMG-20230815-WA0109.jpg',
        'assets/images/projects/project-1/IMG-20260601-WA0034.jpg'
      ]
    },
    '2': {
      title: 'Project 02: Commercial Complex & Retail Hub',
      tag: 'Completed Landmark',
      location: 'Near CMS Shaheed Path, Gomti Nagar Extension',
      desc: 'Strategic commercial development designed for corporate offices, retail spaces, and high-footfall business operations. Excellent connectivity to Shaheed Path and international airport road.',
      highlights: [
        'Modern High-Ceiling Architecture',
        'Dedicated Ample Parking Basement',
        'High-Speed Elevators & Power Backup',
        'Prime Frontage with Maximum Road Visibility'
      ],
      images: [
        'assets/images/projects/project-2/IMG-20210604-WA0056.jpg',
        'assets/images/projects/project-2/IMG-20240621-WA0008.jpg'
      ]
    },
    '3': {
      title: 'Project 03: Nature Grove Residential Enclave',
      tag: 'Completed & Handed Over',
      location: 'Gomti Nagar Extension Peripheral, Lucknow',
      desc: 'Eco-conscious plotted residential development seamlessly blending urban convenience with natural serenity. Thoughtfully designed layout offering peaceful residential living and high capital appreciation.',
      highlights: [
        'Eco-friendly Stormwater Drainage System',
        'Solar-Powered Street Lighting',
        'Proximity to Reputed Schools & Healthcare Hubs',
        '100% Transparent Legal Documentation'
      ],
      images: [
        'assets/images/projects/project-3/IMG-20240715-WA0023.jpg',
        'assets/images/projects/project-3/IMG-20251104-WA0019.jpg'
      ]
    }
  };

  projectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectDetails[projId];
      if (!data) return;

      projectModalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; border-bottom: 1px solid #dbe4de; padding-bottom: 14px;">
            <div>
              <span style="display: inline-block; background: #16422e; color: #fff; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px;">${data.tag}</span>
              <h3 style="font-family: 'Libre Baskerville', serif; color: #0a1c13; font-size: 1.5rem; margin: 0;">${data.title}</h3>
              <p style="color: #718479; font-size: 0.9rem; margin-top: 4px;"><i class="fas fa-map-marker-alt" style="color: #d4af37; margin-right: 6px;"></i>${data.location}</p>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
            ${data.images.map(img => `<img src="${img}" style="width: 100%; height: 160px; object-fit: cover; border-radius: 8px; border: 1px solid #e0e0e0;">`).join('')}
          </div>

          <p style="color: #4a5d52; line-height: 1.7; font-size: 0.96rem;">${data.desc}</p>

          <div style="background: #e9f0ea; padding: 18px; border-radius: 8px;">
            <h4 style="font-family: 'Libre Baskerville', serif; color: #0f2e20; margin-bottom: 10px; font-size: 1.05rem;">Key Project Highlights</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              ${data.highlights.map(h => `<li style="font-size: 0.88rem; color: #15241b; display: flex; align-items: center; gap: 8px;"><i class="fas fa-check-circle" style="color: #2d6a4f;"></i> ${h}</li>`).join('')}
            </ul>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;">
            <button class="btn btn-gold" onclick="document.getElementById('projectModalClose').click(); document.getElementById('appointment').scrollIntoView({behavior:'smooth'});">Schedule Site Visit</button>
          </div>
        </div>
      `;

      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (projectModalClose) {
    projectModalClose.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ---------- 7. Appointment Form & WhatsApp Conversion ---------- */
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  const banner = document.getElementById('formSuccessBanner');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value?.trim() || '';
    const phone = form.elements['phone']?.value?.trim() || '';
    const email = form.elements['email']?.value?.trim() || '';
    const service = form.elements['service']?.value || 'General Consultation';
    const date = form.elements['date']?.value || '';
    const message = form.elements['message']?.value?.trim() || '';

    if (!name || !phone) {
      alert('Please fill in your name and contact number.');
      return;
    }

    // Show on-screen confirmation banner
    if (banner) {
      banner.style.display = 'flex';
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      `Hello Shreesthi Infracon Team,\n\nI would like to schedule an appointment / inquiry:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Interested In:* ${service}\n*Preferred Date:* ${date}\n*Requirements:* ${message}`
    );

    // Option to open WhatsApp directly
    setTimeout(() => {
      const confirmWA = confirm("Thank you! Would you also like to send this inquiry directly to our team via WhatsApp for instant response?");
      if (confirmWA) {
        window.open(`https://wa.me/919876543210?text=${waText}`, '_blank');
      }
      form.reset();
    }, 800);
  });
}

/* ---------- 8. Subtle Scroll Reveal Animations ---------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
