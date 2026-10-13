/**
 * Support Your Department - Inter-Dept Sports Meet 2026
 * Orchestrates image reveal animation and delayed pop-out breathing button.
 */

document.addEventListener('DOMContentLoaded', () => {
  const bgWrapper = document.getElementById('bgRevealWrapper');
  const bgImg = document.getElementById('sportsBgImg');
  const supportBtn = document.getElementById('supportDeptBtn');

  // Button popup timing: 2.2 seconds (seamlessly syncs as the smooth background reveal completes)
  const BUTTON_POPUP_DELAY_MS = 2200;

  let animationStarted = false;

  function startPageSequence() {
    if (animationStarted) return;
    animationStarted = true;

    // 1. Trigger background top-to-bottom reveal animation
    if (bgWrapper) {
      bgWrapper.classList.add('is-revealing');

      // Once the reveal animation completes (2.2s), mark as revealed
      bgWrapper.addEventListener('animationend', () => {
        bgWrapper.classList.add('is-revealed');
      }, { once: true });
    }

    // 2. Wait 2.2s, then pop out the button
    setTimeout(() => {
      triggerButtonPopOut();
    }, BUTTON_POPUP_DELAY_MS);
  }

  function triggerButtonPopOut() {
    if (!supportBtn) return;

    // Add pop-out animation class
    supportBtn.classList.add('is-popped');

    // Once the pop-out animation completes, seamlessly transition into continuous breathing
    supportBtn.addEventListener('animationend', (event) => {
      // Ensure we only transition from the popOutBounce animation
      if (event.animationName === 'popOutBounce') {
        supportBtn.classList.remove('is-popped');
        supportBtn.classList.add('is-breathing');
      }
    }, { once: true });

    // Safety fallback in case animationend is interrupted
    setTimeout(() => {
      if (!supportBtn.classList.contains('is-breathing')) {
        supportBtn.classList.remove('is-popped');
        supportBtn.classList.add('is-breathing');
      }
    }, 550);
  }

  // Check if image is already loaded (from cache or fast load)
  if (bgImg) {
    if (bgImg.complete && bgImg.naturalWidth !== 0) {
      // Already loaded
      startPageSequence();
    } else {
      // Wait for image to load
      bgImg.addEventListener('load', () => {
        startPageSequence();
      }, { once: true });

      // Fallback: if image error or taking too long, start anyway after 1s
      setTimeout(() => {
        startPageSequence();
      }, 1000);
    }
  } else {
    startPageSequence();
  }

  // Interactive micro-interaction on button click
  if (supportBtn) {
    supportBtn.addEventListener('click', (e) => {
      // Create a subtle tactile press effect
      supportBtn.style.transform = 'translateY(2px) scale(0.96)';
      setTimeout(() => {
        supportBtn.style.transform = '';
      }, 150);
    });
  }
});
