// main.js - Adaptive Study Hub Landing Page Logic
// By - Paras Dhiman

/**
 * =============================================
 * ADAPTIVE STUDY HUB - MAIN JAVASCRIPT
 * =============================================
 */

document.addEventListener('DOMContentLoaded', function() {
  initPreloader();
  initThemeToggle();
  initMobileMenu();
  initSmoothScroll();
  initBackToTop();
  initScrollAnimations();
  initVideoPlayer();
  initNotesSync();
  initCourseFilter();
  initTestSystem();
  initChallengeMode();
  initDoubtSystem();
  initDashboard();
  initSilkUI();
  initTooltips();
  initModals();
  initToasts();
  initAccordions();
  initTabs();
  initDropdowns();
  initFormValidation();
  initAuthPages();
  initCourseProgress();
  initLeaderboard();
  initStreakSystem();
  initGamification();
  initAIFeatures();
});

function initPreloader() {
  const preloader = document.querySelector('.preloader');

  window.addEventListener('load', function() {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 1000); 
  });

  window.addEventListener('error', function() {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
}
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;


  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;


  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDark) {
    html.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  themeToggle?.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);


    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
  });


  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      updateThemeIcon(newTheme);
    }
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;

  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbar = document.querySelector('.navbar');
  const html = document.documentElement;

  if (!mobileMenuBtn || !navbar) return;

  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navbar.classList.toggle('active');


    if (navbar.classList.contains('active')) {
      html.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
    }
  });


  document.addEventListener('click', function(e) {
    if (!mobileMenuBtn.contains(e.target) && !navbar.contains(e.target)) {
      mobileMenuBtn.classList.remove('active');
      navbar.classList.remove('active');
      html.style.overflow = '';
    }
  });
}


function initSmoothScroll() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Close mobile menu if open
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const navbar = document.querySelector('.navbar');
      if (mobileMenuBtn?.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navbar.classList.remove('active');
        document.documentElement.style.overflow = '';
      }

      if (this.getAttribute('href').startsWith('#') && this.host === window.location.host) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// =============================================
// BACK TO TOP BUTTON
// =============================================
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');

  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
function initScrollAnimations() {
  // Intersection Observer for scroll animations
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        // Remove observer after animation
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Apply to all elements with animation classes
  document.querySelectorAll(
    '.feature-card, .ai-card, .testimonial-card, .course-card, .stat-card, .recommended-card, .chapter, .doubt-item, .leaderboard-item'
  ).forEach(el => {
    animateOnScroll.observe(el);
  });

  // Special animations for hero elements
  const heroElements = document.querySelectorAll('.hero-text h1, .hero-text p, .hero-text .cta-buttons, .hero-text .stats, .element');
  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    el.classList.add('animate-fadeInUp');
  });

  // Animate hero image
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    heroImage.classList.add('animate-fadeIn');
  }
}

// =============================================
// VIDEO PLAYER
// =============================================
function initVideoPlayer() {
  const videoContainer = document.querySelector('.video-container');
  if (!videoContainer) return;

  const video = document.getElementById('course-video');
  const playPauseBtn = document.querySelector('.play-pause-btn');
  const currentTimeEl = document.querySelector('.current-time');
  const durationEl = document.querySelector('.duration');
  const progressBar = document.querySelector('.time-progress');
  const timeBar = document.querySelector('.time-bar');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const speedBtn = document.getElementById('speed-btn');
  const ccBtn = document.getElementById('cc-btn');
  const notesSyncBtn = document.getElementById('notes-sync-btn');
  const notesContainer = document.getElementById('notes-container');

  // Initialize Video.js if available
  if (typeof videojs !== 'undefined' && video) {
    const player = videojs(video, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
    });

    // Custom controls
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (player.paused()) {
          player.play();
          playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
          player.pause();
          playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
      });
    }

    // Update time display
    player.on('timeupdate', () => {
      if (currentTimeEl && durationEl) {
        currentTimeEl.textContent = formatTime(player.currentTime());
        durationEl.textContent = formatTime(player.duration());

        // Update progress bar
        if (progressBar && timeBar) {
          const progressPercent = (player.currentTime() / player.duration()) * 100;
          progressBar.style.width = `${progressPercent}%`;
        }
      }

      // Sync notes if enabled
      if (notesSyncBtn?.classList.contains('active') && notesContainer) {
        syncNotesWithVideo(player.currentTime());
      }
    });

    // Click on progress bar to seek
    if (timeBar) {
      timeBar.addEventListener('click', (e) => {
        const rect = timeBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        player.currentTime(pos * player.duration());
      });
    }

    // Fullscreen toggle
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          videoContainer.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
        } else {
          document.exitFullscreen();
        }
      });
    }

    // Playback speed
    if (speedBtn) {
      const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
      let currentSpeedIndex = 2; // Default to 1x

      speedBtn.addEventListener('click', () => {
        currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
        player.playbackRate(speeds[currentSpeedIndex]);
        speedBtn.innerHTML = `<i class="fas fa-tachometer-alt"></i><span>${speeds[currentSpeedIndex]}x</span>`;
      });
    }

    // Closed captions (placeholder)
    if (ccBtn) {
      ccBtn.addEventListener('click', () => {
        ccBtn.classList.toggle('active');
        // In a real implementation, you would toggle captions here
      });
    }

    // Notes sync toggle
    if (notesSyncBtn) {
      notesSyncBtn.addEventListener('click', () => {
        notesSyncBtn.classList.toggle('active');
        if (notesSyncBtn.classList.contains('active')) {
          syncNotesWithVideo(player.currentTime());
        }
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (player.paused()) {
          player.play();
          if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
          player.pause();
          if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
      }
    });
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function syncNotesWithVideo(currentTime) {
  const notes = document.querySelectorAll('.note');
  let closestNote = null;
  let minDiff = Infinity;

  notes.forEach(note => {
    const noteTime = parseFloat(note.dataset.time) || 0;
    const diff = Math.abs(noteTime - currentTime);

    if (diff < minDiff) {
      minDiff = diff;
      closestNote = note;
    }
  });

  // Remove active class from all notes
  notes.forEach(note => note.classList.remove('active'));

  // Add active class to closest note
  if (closestNote) {
    closestNote.classList.add('active');
    closestNote.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }
}

// =============================================
// NOTES SYNC SYSTEM
// =============================================
function initNotesSync() {
  const notesContainer = document.getElementById('notes-container');
  if (!notesContainer) return;

  // Click on note to seek to that time in video
  const notes = notesContainer.querySelectorAll('.note');
  const video = document.getElementById('course-video');

  notes.forEach(note => {
    note.addEventListener('click', () => {
      const noteTime = parseFloat(note.dataset.time) || 0;

      // If Video.js is available
      if (typeof videojs !== 'undefined' && video) {
        const player = videojs(video);
        player.currentTime(noteTime);
        player.play();
      }

      // Highlight the note
      notes.forEach(n => n.classList.remove('active'));
      note.classList.add('active');
    });
  });
}

// =============================================
// COURSE FILTER & SEARCH
// =============================================
function initCourseFilter() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const sortSelect = document.getElementById('sort-by');
  const difficultySelect = document.getElementById('difficulty');
  const searchInput = document.querySelector('.search-box input');
  const coursesContainer = document.getElementById('courses-container');
  const loadMoreBtn = document.querySelector('.load-more-btn');

  if (!coursesContainer) return;

  let allCourses = Array.from(coursesContainer.querySelectorAll('.course-card'));
  let visibleCourses = [...allCourses];
  let currentCategory = 'all';
  let currentSort = 'popular';
  let currentDifficulty = 'all';
  let searchQuery = '';

  // Category filter
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      currentCategory = btn.dataset.category;
      filterCourses();
    });
  });

  // Sort filter
  sortSelect?.addEventListener('change', () => {
    currentSort = sortSelect.value;
    filterCourses();
  });

  // Difficulty filter
  difficultySelect?.addEventListener('change', () => {
    currentDifficulty = difficultySelect.value;
    filterCourses();
  });

  // Search
  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    filterCourses();
  });

  // Load more button
  loadMoreBtn?.addEventListener('click', () => {
    // In a real implementation, you would load more courses from an API
    // For this demo, we'll just show all hidden courses
    const hiddenCourses = coursesContainer.querySelectorAll('.course-card.hidden');
    hiddenCourses.forEach(course => {
      course.classList.remove('hidden');
      course.classList.add('animate-fadeInUp');
    });

    if (hiddenCourses.length === 0) {
      loadMoreBtn.style.display = 'none';
    }
  });

  function filterCourses() {
    // Reset all courses to hidden
    allCourses.forEach(course => {
      course.classList.add('hidden');
      course.classList.remove('animate-fadeInUp');
    });

    // Filter courses
    visibleCourses = allCourses.filter(course => {
      // Category filter
      if (currentCategory !== 'all' && !course.dataset.category?.includes(currentCategory)) {
        return false;
      }

      // Difficulty filter
      if (currentDifficulty !== 'all' && course.dataset.difficulty !== currentDifficulty) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const title = course.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = course.querySelector('p')?.textContent.toLowerCase() || '';
        if (!title.includes(searchQuery) && !description.includes(searchQuery)) {
          return false;
        }
      }

      return true;
    });

    // Sort courses
    visibleCourses.sort((a, b) => {
      switch (currentSort) {
        case 'rating':
          return (parseFloat(b.dataset.rating) || 0) - (parseFloat(a.dataset.rating) || 0);
        case 'newest':
          // In a real app, you would compare dates
          return 0;
        case 'progress':
          // In a real app, you would compare user progress
          const aProgress = parseFloat(a.querySelector('.progress')?.style.width || '0%');
          const bProgress = parseFloat(b.querySelector('.progress')?.style.width || '0%');
          return bProgress - aProgress;
        default: // popular
          return 0;
      }
    });

    // Show filtered courses
    const coursesToShow = visibleCourses.slice(0, 6); // Show first 6 by default
    coursesToShow.forEach(course => {
      course.classList.remove('hidden');
      course.classList.add('animate-fadeInUp');
    });

    // Show/hide load more button
    if (loadMoreBtn) {
      if (visibleCourses.length > 6) {
        loadMoreBtn.style.display = 'flex';
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }
  }

  // Initial filter
  filterCourses();
}

// =============================================
// TEST SYSTEM
// =============================================
function initTestSystem() {
  const testContainer = document.querySelector('.test-container');
  if (!testContainer) return;

  const testOptions = document.querySelectorAll('.test-option');
  const testSubmitBtn = document.querySelector('.test-submit-btn');
  const testNavigation = document.querySelector('.test-navigation');
  const prevBtn = document.querySelector('.nav-btn.prev-btn');
  const nextBtn = document.querySelector('.nav-btn.next-btn');
  const timerEl = document.querySelector('.test-timer span:last-child');
  const questionItems = document.querySelectorAll('.test-question-item');

  let currentQuestion = 0;
  const questions = document.querySelectorAll('.test-question-container');
  let timeLeft = 3600; // 1 hour in seconds
  let timerInterval;
  let answers = {};
  let score = 0;

  // Initialize test
  function initTest() {
    if (questions.length === 0) return;

    // Show first question
    showQuestion(currentQuestion);

    // Start timer
    startTimer();

    // Load saved progress if exists
    const savedProgress = localStorage.getItem(`testProgress_${window.location.pathname}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      answers = progress.answers || {};
      currentQuestion = progress.currentQuestion || 0;
      timeLeft = progress.timeLeft || 3600;
      score = progress.score || 0;

      // Update UI
      showQuestion(currentQuestion);
      updateQuestionItems();
      updateTimerDisplay();
    }
  }

  // Show question
  function showQuestion(index) {
    questions.forEach((q, i) => {
      q.style.display = i === index ? 'block' : 'none';
    });

    // Update navigation buttons
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === questions.length - 1;

    // Update question items in sidebar
    updateQuestionItems();

    // Auto-save progress
    saveProgress();
  }

  // Update question items in sidebar
  function updateQuestionItems() {
    questionItems.forEach((item, index) => {
      item.classList.remove('active', 'answered', 'correct', 'incorrect');

      if (index === currentQuestion) {
        item.classList.add('active');
      }

      if (answers[index] !== undefined) {
        item.classList.add('answered');

        // In a real test, you would check if the answer is correct
        // For demo, we'll just mark some as correct
        if (answers[index] === getCorrectAnswer(index)) {
          item.classList.add('correct');
        } else {
          item.classList.add('incorrect');
        }
      }
    });
  }

  // Get correct answer (for demo purposes)
  function getCorrectAnswer(questionIndex) {
    // In a real app, this would come from your data
    const correctAnswers = ['B', 'A', 'C', 'D', 'B']; // Example answers
    return correctAnswers[questionIndex % correctAnswers.length];
  }

  // Start timer
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    updateTimerDisplay();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitTest();
      }
    }, 1000);
  }

  // Update timer display
  function updateTimerDisplay() {
    if (!timerEl) return;

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    timerEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Select option
  testOptions.forEach(option => {
    option.addEventListener('click', () => {
      const questionIndex = parseInt(option.closest('.test-question-container').dataset.questionIndex || '0');
      const optionValue = option.dataset.value || option.querySelector('input').value;

      // Store answer
      answers[questionIndex] = optionValue;

      // Update selected state
      const questionOptions = option.closest('.test-question-container').querySelectorAll('.test-option');
      questionOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');

      // Auto-save progress
      saveProgress();
    });
  });

  // Navigation
  prevBtn?.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  });

  nextBtn?.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  });

  // Submit test
  testSubmitBtn?.addEventListener('click', submitTest);

  function submitTest() {
    clearInterval(timerInterval);

    // Calculate score
    score = 0;
    Object.keys(answers).forEach(questionIndex => {
      if (answers[questionIndex] === getCorrectAnswer(parseInt(questionIndex))) {
        score++;
      }
    });

    // Show results
    showResults();

    // Save final results
    saveResults();
  }

  function showResults() {
    // Hide test container
    testContainer.style.display = 'none';

    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'test-results';

    // Calculate percentage
    const percentage = Math.round((score / questions.length) * 100);

    resultsContainer.innerHTML = `
      <div class="results-header">
        <h2><i class="fas fa-chart-line"></i> Test Results</h2>
        <div class="results-score">
          <span class="score-value">${score}/${questions.length}</span>
          <span class="score-percentage">${percentage}%</span>
        </div>
      </div>

      <div class="results-summary">
        <div class="summary-item">
          <i class="fas fa-check-circle"></i>
          <div>
            <span class="summary-label">Correct Answers</span>
            <span class="summary-value">${score}</span>
          </div>
        </div>
        <div class="summary-item">
          <i class="fas fa-times-circle"></i>
          <div>
            <span class="summary-label">Incorrect Answers</span>
            <span class="summary-value">${questions.length - score}</span>
          </div>
        </div>
        <div class="summary-item">
          <i class="fas fa-clock"></i>
          <div>
            <span class="summary-label">Time Taken</span>
            <span class="summary-value">${formatTime(3600 - timeLeft)}</span>
          </div>
        </div>
      </div>

      <div class="results-chart">
        <div class="chart">
          <div class="chart-bar correct" style="height: ${percentage}%"></div>
          <div class="chart-bar incorrect" style="height: ${100 - percentage}%"></div>
        </div>
        <div class="chart-labels">
          <span><i class="fas fa-check-circle" style="color: var(--secondary-color);"></i> Correct</span>
          <span><i class="fas fa-times-circle" style="color: var(--accent-color);"></i> Incorrect</span>
        </div>
      </div>

      <div class="results-actions">
        <button class="btn btn-secondary review-btn">
          <i class="fas fa-redo"></i> Review Answers
        </button>
        <a href="dashboard.html" class="btn btn-primary">
          <i class="fas fa-chart-line"></i> View Dashboard
        </a>
        <a href="courses.html" class="btn btn-outline">
          <i class="fas fa-book-open"></i> Back to Courses
        </a>
      </div>
    `;

    // Insert results after test container
    testContainer.parentNode.insertBefore(resultsContainer, testContainer.nextSibling);

    // Add event listener for review button
    const reviewBtn = resultsContainer.querySelector('.review-btn');
    reviewBtn?.addEventListener('click', () => {
      resultsContainer.remove();
      testContainer.style.display = 'block';
      currentQuestion = 0;
      showQuestion(currentQuestion);
    });
  }

  // Save progress
  function saveProgress() {
    const progress = {
      currentQuestion,
      answers,
      timeLeft,
      score,
      timestamp: Date.now()
    };
    localStorage.setItem(`testProgress_${window.location.pathname}`, JSON.stringify(progress));
  }

  // Save results
  function saveResults() {
    const results = {
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      timeTaken: 3600 - timeLeft,
      timestamp: Date.now()
    };

    // Save to localStorage
    localStorage.setItem(`testResults_${window.location.pathname}`, JSON.stringify(results));

    // In a real app, you would also send this to your backend
    console.log('Test results:', results);
  }

  // Prevent cheating
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // User switched tabs
      alert('Please do not switch tabs during the test!');
      // In a real app, you might want to auto-submit or flag the attempt
    }
  });

  // Initialize test
  initTest();
}

// =============================================
// CHALLENGE MODE
// =============================================
function initChallengeMode() {
  const challengeContainer = document.querySelector('.challenge-container');
  if (!challengeContainer) return;

  const challengeOptions = document.querySelectorAll('.challenge-option');
  const challengeTimerEl = document.querySelector('.challenge-timer span:last-child');
  const challengeResult = document.querySelector('.challenge-result');
  const leaderboardItems = document.querySelectorAll('.leaderboard-item');

  let currentQuestion = 0;
  const questions = document.querySelectorAll('.challenge-question');
  let timeLeft = 30; // 30 seconds per question
  let timerInterval;
  let answers = {};
  let score = 0;
  let streak = parseInt(localStorage.getItem('challengeStreak')) || 0;
  let xp = parseInt(localStorage.getItem('userXP')) || 0;

  // Initialize challenge
  function initChallenge() {
    if (questions.length === 0) return;

    // Show first question
    showQuestion(currentQuestion);

    // Start timer
    startTimer();

    // Update streak display
    updateStreakDisplay();

    // Load saved progress if exists
    const savedProgress = localStorage.getItem(`challengeProgress_${Date.now()}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      answers = progress.answers || {};
      currentQuestion = progress.currentQuestion || 0;
      timeLeft = progress.timeLeft || 30;

      // Update UI
      showQuestion(currentQuestion);
      updateTimerDisplay();
    }
  }

  // Show question
  function showQuestion(index) {
    questions.forEach((q, i) => {
      q.style.display = i === index ? 'block' : 'none';
    });

    // Reset timer
    timeLeft = 30;
    updateTimerDisplay();
  }

  // Start timer
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    updateTimerDisplay();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        // Time's up! Move to next question or end
        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          showQuestion(currentQuestion);
          startTimer();
        } else {
          endChallenge();
        }
      }
    }, 1000);
  }

  // Update timer display
  function updateTimerDisplay() {
    if (!challengeTimerEl) return;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    challengeTimerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Select option
  challengeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const questionIndex = parseInt(option.closest('.challenge-question').dataset.questionIndex || '0');
      const optionValue = option.dataset.value || option.querySelector('input').value;

      // Store answer
      answers[questionIndex] = optionValue;

      // Check if correct
      const isCorrect = optionValue === getCorrectAnswer(questionIndex);

      if (isCorrect) {
        score++;
        streak++;
        xp += 10; // 10 XP per correct answer

        // Update XP and streak in localStorage
        localStorage.setItem('userXP', xp);
        localStorage.setItem('challengeStreak', streak);

        // Show correct feedback
        option.classList.add('correct');
        showFeedback('Correct! +10 XP', 'success');
      } else {
        // Wrong answer - end streak
        streak = 0;
        localStorage.setItem('challengeStreak', streak);
        option.classList.add('incorrect');
        showFeedback('Incorrect! Streak reset', 'error');
      }

      // Move to next question or end
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          currentQuestion++;
          showQuestion(currentQuestion);
          startTimer();
        }, 1000);
      } else {
        setTimeout(() => {
          endChallenge();
        }, 1000);
      }
    });
  });

  // Get correct answer (for demo purposes)
  function getCorrectAnswer(questionIndex) {
    const correctAnswers = ['B', 'A', 'C', 'D', 'B']; // Example answers
    return correctAnswers[questionIndex % correctAnswers.length];
  }

  // Show feedback
  function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'times-circle'}"></i>
      <span>${message}</span>
    `;

    // Style the feedback
    feedback.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--bg-primary);
      padding: 1rem 2rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      animation: fadeInUp 0.3s ease forwards;
    `;

    // Add to body
    document.body.appendChild(feedback);

    // Remove after 2 seconds
    setTimeout(() => {
      feedback.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => feedback.remove(), 300);
    }, 2000);
  }

  // End challenge
  function endChallenge() {
    clearInterval(timerInterval);

    // Calculate percentage
    const percentage = Math.round((score / questions.length) * 100);

    // Update challenge result
    if (challengeResult) {
      challengeResult.innerHTML = `
        <div class="challenge-result-icon ${score >= questions.length / 2 ? 'correct' : 'incorrect'}">
          <i class="fas fa-${score >= questions.length / 2 ? 'trophy' : 'times-circle'}"></i>
        </div>
        <h3 class="challenge-result-title">${score >= questions.length / 2 ? 'Great Job!' : 'Keep Practicing!'}</h3>
        <p class="challenge-result-message">
          You scored ${score} out of ${questions.length} (${percentage}%)
        </p>
        <div class="challenge-result-stats">
          <div class="stat">
            <span class="label">XP Earned:</span>
            <span class="value">+${score * 10}</span>
          </div>
          <div class="stat">
            <span class="label">New Streak:</span>
            <span class="value">${streak} days</span>
          </div>
        </div>
        <div class="challenge-result-actions">
          <button class="btn btn-primary retry-btn">
            <i class="fas fa-redo"></i> Try Again
          </button>
          <a href="challenge.html" class="btn btn-secondary">
            <i class="fas fa-fire"></i> New Challenge
          </a>
        </div>
      `;

      challengeResult.style.display = 'block';

      // Add event listener for retry button
      const retryBtn = challengeResult.querySelector('.retry-btn');
      retryBtn?.addEventListener('click', () => {
        // Reset and start new challenge
        currentQuestion = 0;
        answers = {};
        score = 0;
        showQuestion(currentQuestion);
        startTimer();
        challengeResult.style.display = 'none';
      });
    }

    // Update XP display in sidebar
    updateXPDisplay();

    // Save results
    saveChallengeResults();
  }

  // Update streak display
  function updateStreakDisplay() {
    const streakEl = document.querySelector('.challenge-streak span:last-child');
    if (streakEl) {
      streakEl.textContent = `${streak}-day streak!`;
    }
  }

  // Update XP display
  function updateXPDisplay() {
    const xpEl = document.querySelector('.challenge-stat-value');
    if (xpEl) {
      xpEl.textContent = xp;
    }
  }

  // Save challenge results
  function saveChallengeResults() {
    const results = {
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      streak,
      xp: score * 10,
      timestamp: Date.now()
    };

    // Save to localStorage
    localStorage.setItem(`challengeResults_${Date.now()}`, JSON.stringify(results));

    // Update leaderboard (in a real app, this would come from a backend)
    updateLeaderboard();

    // In a real app, you would also send this to your backend
    console.log('Challenge results:', results);
  }

  // Update leaderboard
  function updateLeaderboard() {
    // This is a demo - in a real app, you would fetch this from a backend
    const leaderboardData = [
      { rank: 1, name: 'Paras', score: 1250, streak: 15, avatar: 'assets/images/user1.jpg' },
      { rank: 2, name: 'Ananya', score: 1180, streak: 12, avatar: 'assets/images/user2.jpg' },
      { rank: 3, name: 'Rahul', score: 1050, streak: 10, avatar: 'assets/images/user3.jpg' },
      { rank: 4, name: 'Priya', score: 980, streak: 8, avatar: 'assets/images/user1.jpg' },
      { rank: 5, name: 'You', score: xp, streak: streak, avatar: 'assets/images/user.jpg' }
    ];

    // Sort by score
    leaderboardData.sort((a, b) => b.score - a.score);

    // Update leaderboard items
    leaderboardItems.forEach((item, index) => {
      if (index < leaderboardData.length) {
        const data = leaderboardData[index];
        item.innerHTML = `
          <div class="leaderboard-rank">${data.rank}</div>
          <img src="${data.avatar}" alt="${data.name}" class="leaderboard-avatar">
          <div class="leaderboard-user">
            <div class="leaderboard-user-name">${data.name}</div>
            <div class="leaderboard-user-streak">
              <i class="fas fa-fire"></i> ${data.streak} day${data.streak !== 1 ? 's' : ''}
            </div>
          </div>
          <div class="leaderboard-score">${data.score} XP</div>
        `;

        // Highlight current user
        if (data.name === 'You') {
          item.classList.add('current-user');
        } else {
          item.classList.remove('current-user');
        }
      }
    });
  }

  // Initialize challenge
  initChallenge();
}

// =============================================
// DOUBT SYSTEM
// =============================================
function initDoubtSystem() {
  const doubtForm = document.querySelector('.doubt-form');
  const doubtList = document.querySelector('.doubt-list');
  const doubtFilter = document.querySelector('.doubt-filter');
  const doubtSort = document.querySelector('.doubt-sort select');
  const doubtActions = document.querySelectorAll('.doubt-action-btn');

  if (!doubtList) return;

  // Sample doubts data
  let doubts = [
    {
      id: 1,
      user: {
        name: 'Paras Dhiman',
        avatar: 'assets/images/user1.jpg',
        time: '2 hours ago'
      },
      category: 'Mathematics',
      question: 'How do I solve this integration problem: ∫x²e^x dx?',
      answers: [
        {
          user: {
            name: 'Ananya Gupta',
            avatar: 'assets/images/user2.jpg',
            time: '1 hour ago'
          },
          content: 'Use integration by parts. Let u = x², dv = e^x dx. Then du = 2x dx, v = e^x. The formula is ∫u dv = uv - ∫v du.',
          upvotes: 5,
          isAccepted: true
        },
        {
          user: {
            name: 'Rahul Verma',
            avatar: 'assets/images/user3.jpg',
            time: '30 minutes ago'
          },
          content: 'The answer is e^x(x² - 2x + 2) + C. You can verify by differentiating.',
          upvotes: 3,
          isAccepted: false
        }
      ],
      tags: ['calculus', 'integration'],
      views: 45,
      upvotes: 8,
      isResolved: false
    },
    {
      id: 2,
      user: {
        name: 'Priya Sharma',
        avatar: 'assets/images/user2.jpg',
        time: '5 hours ago'
      },
      category: 'Physics',
      question: 'Can someone explain the concept of electric flux in simple terms?',
      answers: [
        {
          user: {
            name: 'SoftwareLabs Team',
            avatar: 'assets/images/logo.png',
            time: '4 hours ago'
          },
          content: 'Electric flux is a measure of the number of electric field lines passing through a given area. It\'s calculated as Φ = E·A = EA cosθ, where E is the electric field, A is the area, and θ is the angle between them.',
          upvotes: 12,
          isAccepted: true
        }
      ],
      tags: ['electrostatics', 'flux'],
      views: 89,
      upvotes: 15,
      isResolved: true
    },
    {
      id: 3,
      user: {
        name: 'Rahul Verma',
        avatar: 'assets/images/user3.jpg',
        time: '1 day ago'
      },
      category: 'Coding',
      question: 'How do I reverse a linked list in Python?',
      answers: [
        {
          user: {
            name: 'Paras Dhiman',
            avatar: 'assets/images/user1.jpg',
            time: '23 hours ago'
          },
          content: 'Here\'s a Python function to reverse a linked list:\n\n```python\ndef reverse_linked_list(head):\n    prev = None\n    current = head\n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    return prev\n```',
          upvotes: 7,
          isAccepted: true
        }
      ],
      tags: ['python', 'data-structures'],
      views: 124,
      upvotes: 9,
      isResolved: true
    }
  ];

  // Render doubts
  function renderDoubts(filteredDoubts = doubts) {
    doubtList.innerHTML = '';

    if (filteredDoubts.length === 0) {
      doubtList.innerHTML = `
        <div class="no-doubts">
          <i class="fas fa-question-circle"></i>
          <h3>No doubts found</h3>
          <p>Be the first to ask a question!</p>
        </div>
      `;
      return;
    }

    filteredDoubts.forEach(doubt => {
      const doubtItem = document.createElement('div');
      doubtItem.className = 'doubt-item';
      if (doubt.isResolved) {
        doubtItem.classList.add('resolved');
      }

      // Create question HTML
      let questionHtml = `
        <div class="doubt-item-header">
          <div class="doubt-item-user">
            <img src="${doubt.user.avatar}" alt="${doubt.user.name}" class="doubt-item-avatar">
            <div class="doubt-item-info">
              <div class="doubt-item-name">${doubt.user.name}</div>
              <div class="doubt-item-time"><i class="fas fa-clock"></i> ${doubt.user.time}</div>
            </div>
          </div>
          <span class="doubt-item-category"><i class="fas fa-tag"></i> ${doubt.category}</span>
        </div>
        <div class="doubt-item-content">
          <div class="doubt-item-question">${doubt.question}</div>
          <div class="doubt-item-meta">
            <span><i class="fas fa-eye"></i> ${doubt.views} views</span>
            <span><i class="fas fa-thumbs-up"></i> ${doubt.upvotes} upvotes</span>
            ${doubt.tags.map(tag => `<span class="doubt-tag">#${tag}</span>`).join('')}
          </div>
        </div>
        <div class="doubt-item-actions">
          <button class="doubt-action-btn upvote-btn ${doubt.upvoted ? 'active' : ''}" data-doubt-id="${doubt.id}">
            <i class="fas fa-thumbs-up"></i> Upvote (${doubt.upvotes})
          </button>
          <button class="doubt-action-btn answer-btn" data-doubt-id="${doubt.id}">
            <i class="fas fa-reply"></i> Answer
          </button>
          <button class="doubt-action-btn share-btn" data-doubt-id="${doubt.id}">
            <i class="fas fa-share-alt"></i> Share
          </button>
        </div>
      `;

      // Add answers if they exist
      if (doubt.answers && doubt.answers.length > 0) {
        questionHtml += `
          <div class="doubt-answers">
            <h4><i class="fas fa-comments"></i> ${doubt.answers.length} Answer${doubt.answers.length > 1 ? 's' : ''}</h4>
        `;

        doubt.answers.forEach(answer => {
          questionHtml += `
            <div class="doubt-answer ${answer.isAccepted ? 'accepted' : ''}">
              <div class="doubt-answer-header">
                <div class="doubt-answer-user">
                  <img src="${answer.user.avatar}" alt="${answer.user.name}" class="doubt-answer-avatar">
                  <div class="doubt-answer-info">
                    <div class="doubt-answer-name">${answer.user.name}</div>
                    <div class="doubt-answer-time"><i class="fas fa-clock"></i> ${answer.user.time}</div>
                  </div>
                </div>
                ${answer.isAccepted ? '<span class="accepted-badge"><i class="fas fa-check-circle"></i> Accepted</span>' : ''}
              </div>
              <div class="doubt-answer-content">${answer.content}</div>
              <div class="doubt-answer-actions">
                <button class="doubt-action-btn upvote-btn ${answer.upvoted ? 'active' : ''}" data-answer-id="${doubt.id}-${doubt.answers.indexOf(answer)}">
                  <i class="fas fa-thumbs-up"></i> (${answer.upvotes})
                </button>
                ${!doubt.isResolved && answer.user.name === getCurrentUser() ? `
                  <button class="doubt-action-btn accept-btn" data-answer-id="${doubt.id}-${doubt.answers.indexOf(answer)}">
                    <i class="fas fa-check-circle"></i> Accept
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        });

        questionHtml += `</div>`;
      }

      doubtItem.innerHTML = questionHtml;
      doubtList.appendChild(doubtItem);
    });

    // Add event listeners to action buttons
    initDoubtActionButtons();
  }

  // Initialize doubt action buttons
  function initDoubtActionButtons() {
    // Upvote doubt
    document.querySelectorAll('.doubt-item-actions .upvote-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const doubtId = parseInt(btn.dataset.doubtId);
        const doubt = doubts.find(d => d.id === doubtId);
        if (doubt) {
          doubt.upvotes += btn.classList.contains('active') ? -1 : 1;
          doubt.upvoted = !btn.classList.contains('active');
          btn.classList.toggle('active');
          btn.innerHTML = `<i class="fas fa-thumbs-up"></i> Upvote (${doubt.upvotes})`;
        }
      });
    });

    // Answer doubt
    document.querySelectorAll('.doubt-item-actions .answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const doubtId = parseInt(btn.dataset.doubtId);
        showAnswerForm(doubtId);
      });
    });

    // Upvote answer
    document.querySelectorAll('.doubt-answer-actions .upvote-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const [doubtId, answerIndex] = btn.dataset.answerId.split('-');
        const doubt = doubts.find(d => d.id === parseInt(doubtId));
        if (doubt && doubt.answers[parseInt(answerIndex)]) {
          const answer = doubt.answers[parseInt(answerIndex)];
          answer.upvotes += btn.classList.contains('active') ? -1 : 1;
          answer.upvoted = !btn.classList.contains('active');
          btn.classList.toggle('active');
          btn.innerHTML = `<i class="fas fa-thumbs-up"></i> (${answer.upvotes})`;
        }
      });
    });

    // Accept answer
    document.querySelectorAll('.doubt-answer-actions .accept-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const [doubtId, answerIndex] = btn.dataset.answerId.split('-');
        const doubt = doubts.find(d => d.id === parseInt(doubtId));
        if (doubt) {
          // Mark all answers as not accepted
          doubt.answers.forEach(a => a.isAccepted = false);
          // Mark this answer as accepted
          doubt.answers[parseInt(answerIndex)].isAccepted = true;
          // Mark doubt as resolved
          doubt.isResolved = true;

          // Re-render doubts
          renderDoubts();

          // Show success message
          showToast('Answer accepted! Doubt marked as resolved.', 'success');
        }
      });
    });
  }

  // Show answer form
  function showAnswerForm(doubtId) {
    const doubt = doubts.find(d => d.id === doubtId);
    if (!doubt) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Answer Doubt</h3>
          <button class="modal-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="doubt-preview">
            <p><strong>${doubt.user.name}</strong> asked:</p>
            <p>${doubt.question}</p>
          </div>
          <form class="answer-form">
            <div class="form-group">
              <label class="form-label">Your Answer</label>
              <textarea class="form-textarea" placeholder="Write your answer here..." required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Formatting Help</label>
              <div class="formatting-help">
                <p>You can use Markdown for formatting:</p>
                <ul>
                  <li><code>**bold**</code> or <code>__bold__</code> for <strong>bold</strong></li>
                  <li><code>*italic*</code> or <code>_italic_</code> for <em>italic</em></li>
                  <li><code>```code```</code> for code blocks</li>
                  <li><code>- list item</code> for lists</li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline cancel-btn">Cancel</button>
          <button type="submit" class="btn btn-primary submit-answer-btn">Post Answer</button>
        </div>
      </div>
    `;

    // Add to body
    document.body.appendChild(modal);

    // Show modal
    modal.classList.add('visible');

    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const submitBtn = modal.querySelector('.submit-answer-btn');
    const form = modal.querySelector('.answer-form');

    function closeModal() {
      modal.classList.remove('visible');
      setTimeout(() => modal.remove(), 300);
    }

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    // Submit answer
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const answerText = form.querySelector('.form-textarea').value.trim();

      if (answerText) {
        // Add answer to doubt
        doubt.answers.push({
          user: {
            name: getCurrentUser(),
            avatar: getCurrentUserAvatar(),
            time: 'Just now'
          },
          content: answerText,
          upvotes: 0,
          isAccepted: false
        });

        // Re-render doubts
        renderDoubts();

        // Close modal
        closeModal();

        // Show success message
        showToast('Your answer has been posted!', 'success');
      }
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Filter doubts
  doubtFilter?.addEventListener('click', () => {
    // In a real app, you would show a dropdown with filter options
    showToast('Filter functionality would be implemented here', 'info');
  });

  // Sort doubts
  doubtSort?.addEventListener('change', () => {
    const sortBy = doubtSort.value;
    let sortedDoubts = [...doubts];

    switch (sortBy) {
      case 'recent':
        sortedDoubts.sort((a, b) => new Date(b.user.time) - new Date(a.user.time));
        break;
      case 'popular':
        sortedDoubts.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'unanswered':
        sortedDoubts = sortedDoubts.filter(d => d.answers.length === 0);
        break;
      case 'resolved':
        sortedDoubts = sortedDoubts.filter(d => d.isResolved);
        break;
      case 'unresolved':
        sortedDoubts = sortedDoubts.filter(d => !d.isResolved);
        break;
      default: // votes
        sortedDoubts.sort((a, b) => b.upvotes - a.upvotes);
    }

    renderDoubts(sortedDoubts);
  });

  // Submit new doubt
  doubtForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const question = doubtForm.querySelector('textarea[name="question"]').value.trim();
    const category = doubtForm.querySelector('select[name="category"]').value;
    const tags = doubtForm.querySelector('input[name="tags"]').value.trim().split(',').map(tag => tag.trim());

    if (question) {
      // Create new doubt
      const newDoubt = {
        id: doubts.length + 1,
        user: {
          name: getCurrentUser(),
          avatar: getCurrentUserAvatar(),
          time: 'Just now'
        },
        category: category || 'General',
        question: question,
        answers: [],
        tags: tags.filter(tag => tag),
        views: 0,
        upvotes: 0,
        isResolved: false
      };

      // Add to beginning of array
      doubts.unshift(newDoubt);

      // Re-render doubts
      renderDoubts();

      // Reset form
      doubtForm.reset();

      // Show success message
      showToast('Your doubt has been posted!', 'success');
    }
  });

  // Initialize
  renderDoubts();
}

// Helper function to get current user
function getCurrentUser() {
  // In a real app, this would come from your auth system
  return localStorage.getItem('userName') || 'Guest User';
}

// Helper function to get current user avatar
function getCurrentUserAvatar() {
  // In a real app, this would come from your auth system
  return localStorage.getItem('userAvatar') || 'assets/images/user.jpg';
}

// =============================================
// DASHBOARD
// =============================================
function initDashboard() {
  const dashboardContainer = document.querySelector('.dashboard-layout');
  if (!dashboardContainer) return;

  // Sample data
  const userStats = {
    totalCourses: 8,
    completedCourses: 3,
    inProgressCourses: 5,
    totalTests: 12,
    averageScore: 78,
    timeSpent: 45, // hours
    currentStreak: parseInt(localStorage.getItem('challengeStreak')) || 0,
    longestStreak: 15,
    xp: parseInt(localStorage.getItem('userXP')) || 0,
    level: Math.floor((parseInt(localStorage.getItem('userXP')) || 0) / 100) + 1
  };

  const recentTests = [
    { name: 'Calculus Test', score: 85, date: '2 days ago', time: '25:30' },
    { name: 'Physics Quiz', score: 72, date: '1 week ago', time: '18:45' },
    { name: 'Chemistry Mock', score: 90, date: '2 weeks ago', time: '45:00' }
  ];

  const weakAreas = [
    { name: 'Integration', category: 'Mathematics', progress: 45, recommendation: '2 videos + 1 test' },
    { name: 'Electrostatics', category: 'Physics', progress: 30, recommendation: '3 videos + 2 tests' },
    { name: 'Organic Chemistry', category: 'Chemistry', progress: 55, recommendation: '1 video + 1 test' }
  ];

  const strongAreas = [
    { name: 'Matrices', category: 'Mathematics', progress: 90 },
    { name: 'Kinematics', category: 'Physics', progress: 85 },
    { name: 'Thermodynamics', category: 'Chemistry', progress: 80 }
  ];

  const weeklyProgress = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 70 },
    { day: 'Wed', score: 75 },
    { day: 'Thu', score: 80 },
    { day: 'Fri', score: 85 },
    { day: 'Sat', score: 78 },
    { day: 'Sun', score: 82 }
  ];

  // Update stats cards
  const statCards = document.querySelectorAll('.stat-card');
  if (statCards.length > 0) {
    const stats = [
      { icon: 'fa-book-open', label: 'Courses Enrolled', value: userStats.totalCourses, change: '+2 this month', positive: true },
      { icon: 'fa-check-circle', label: 'Completed Courses', value: userStats.completedCourses, change: '+1 this week', positive: true },
      { icon: 'fa-file-alt', label: 'Tests Taken', value: userStats.totalTests, change: '+3 this month', positive: true },
      { icon: 'fa-chart-line', label: 'Avg. Score', value: `${userStats.averageScore}%`, change: '+5% from last week', positive: true }
    ];

    stats.forEach((stat, index) => {
      if (statCards[index]) {
        statCards[index].innerHTML = `
          <div class="stat-card-header">
            <div class="stat-card-icon">
              <i class="fas ${stat.icon}"></i>
            </div>
            <div class="stat-card-change ${stat.positive ? 'positive' : 'negative'}">
              <i class="fas fa-${stat.positive ? 'arrow-up' : 'arrow-down'}"></i>
              <span>${stat.change}</span>
            </div>
          </div>
          <div class="stat-card-value">${stat.value}</div>
          <div class="stat-card-label">${stat.label}</div>
        `;
      }
    });
  }

  // Update charts
  initCharts(weeklyProgress, userStats);

  // Update weakness tracker
  initWeaknessTracker(weakAreas, strongAreas);

  // Update recent tests
  initRecentTests(recentTests);

  // Update XP and level
  initXPAndLevel(userStats);
}

// Initialize Charts
function initCharts(weeklyProgress, userStats) {
  const chartContainers = document.querySelectorAll('.chart-container');

  // Weekly Progress Chart
  if (chartContainers[0]) {
    chartContainers[0].innerHTML = `
      <canvas id="weeklyProgressChart"></canvas>
    `;

    // In a real app, you would use Chart.js or similar
    // This is a simple placeholder
    const ctx = document.getElementById('weeklyProgressChart');
    if (ctx) {
      // Simple bar chart using CSS
      const chart = document.createElement('div');
      chart.className = 'simple-bar-chart';
      chart.style.height = '200px';
      chart.style.display = 'flex';
      chart.style.alignItems = 'flex-end';
      chart.style.gap = '10px';
      chart.style.padding = '20px 0';

      weeklyProgress.forEach(day => {
        const barContainer = document.createElement('div');
        barContainer.style.display = 'flex';
        barContainer.style.flexDirection = 'column';
        barContainer.style.alignItems = 'center';
        barContainer.style.gap = '5px';
        barContainer.style.flex = '1';

        const bar = document.createElement('div');
        bar.style.width = '40px';
        bar.style.height = `${day.score * 2}px`;
        bar.style.background = 'var(--gradient-1)';
        bar.style.borderRadius = 'var(--radius-sm) var(--radius-sm) 0 0';
        bar.style.position = 'relative';
        bar.style.transition = 'height 0.5s ease';

        const label = document.createElement('span');
        label.textContent = day.day;
        label.style.fontSize = 'var(--font-size-xs)';
        label.style.color = 'var(--text-secondary)';

        barContainer.appendChild(bar);
        barContainer.appendChild(label);
        chart.appendChild(barContainer);
      });

      chartContainers[0].appendChild(chart);
    }
  }

  // Score Distribution Chart
  if (chartContainers[1]) {
    chartContainers[1].innerHTML = `
      <div class="score-distribution">
        <div class="score-segment correct" style="--score: ${userStats.averageScore};">
          <span class="score-label">Correct</span>
          <span class="score-value">${userStats.averageScore}%</span>
        </div>
        <div class="score-segment incorrect" style="--score: ${100 - userStats.averageScore};">
          <span class="score-label">Incorrect</span>
          <span class="score-value">${100 - userStats.averageScore}%</span>
        </div>
      </div>
    `;
  }
}

// Initialize Weakness Tracker
function initWeaknessTracker(weakAreas, strongAreas) {
  const weaknessContent = document.querySelector('.weakness-content');
  const weaknessTabs = document.querySelectorAll('.weakness-tab');

  if (!weaknessContent) return;

  // Render weak areas
  function renderWeakAreas() {
    weaknessContent.innerHTML = '';

    weakAreas.forEach(area => {
      const areaEl = document.createElement('div');
      areaEl.className = 'weakness-category';

      areaEl.innerHTML = `
        <div class="weakness-category-header">
          <i class="fas fa-exclamation-triangle weakness-category-icon weak"></i>
          <h4 class="weakness-category-title">${area.name}</h4>
        </div>
        <div class="weakness-topics">
          <div class="weakness-topic weak">
            <i class="fas fa-book"></i>
            <span>${area.category}</span>
          </div>
        </div>
        <div class="weakness-progress">
          <div class="progress-bar">
            <div class="progress" style="width: ${area.progress}%;"></div>
          </div>
          <div class="progress-info">
            <span>${area.progress}% Complete</span>
            <span class="recommendation"><i class="fas fa-lightbulb"></i> ${area.recommendation}</span>
          </div>
        </div>
      `;

      weaknessContent.appendChild(areaEl);
    });
  }

  // Render strong areas
  function renderStrongAreas() {
    weaknessContent.innerHTML = '';

    strongAreas.forEach(area => {
      const areaEl = document.createElement('div');
      areaEl.className = 'weakness-category';

      areaEl.innerHTML = `
        <div class="weakness-category-header">
          <i class="fas fa-check-circle weakness-category-icon strong"></i>
          <h4 class="weakness-category-title">${area.name}</h4>
        </div>
        <div class="weakness-topics">
          <div class="weakness-topic strong">
            <i class="fas fa-book"></i>
            <span>${area.category}</span>
          </div>
        </div>
        <div class="weakness-progress">
          <div class="progress-bar">
            <div class="progress" style="width: ${area.progress}%;"></div>
          </div>
          <div class="progress-info">
            <span>${area.progress}% Complete</span>
            <span class="recommendation"><i class="fas fa-star"></i> Keep it up!</span>
          </div>
        </div>
      `;

      weaknessContent.appendChild(areaEl);
    });
  }

  // Tab switching
  weaknessTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      weaknessTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (tab.textContent.includes('Weak')) {
        renderWeakAreas();
      } else {
        renderStrongAreas();
      }
    });
  });

  // Initial render
  renderWeakAreas();
}

// Initialize Recent Tests
function initRecentTests(recentTests) {
  const recentTestsContainer = document.querySelector('.recent-tests');
  if (!recentTestsContainer) return;

  recentTestsContainer.innerHTML = recentTests.map(test => `
    <div class="recent-test-item">
      <div class="recent-test-info">
        <h4 class="recent-test-name">${test.name}</h4>
        <div class="recent-test-meta">
          <span><i class="fas fa-calendar"></i> ${test.date}</span>
          <span><i class="fas fa-clock"></i> ${test.time}</span>
        </div>
      </div>
      <div class="recent-test-score">
        <div class="score-circle ${test.score >= 80 ? 'good' : test.score >= 60 ? 'average' : 'poor'}">
          <span>${test.score}%</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize XP and Level
function initXPAndLevel(userStats) {
  const xpContainer = document.querySelector('.profile-xp');
  if (!xpContainer) return;

  // Update XP display
  const xpValueEl = xpContainer.querySelector('.profile-xp-value');
  if (xpValueEl) {
    xpValueEl.textContent = `${userStats.xp} XP`;
  }

  // Update level
  const levelEl = document.querySelector('.profile-level');
  if (levelEl) {
    levelEl.textContent = `Level ${userStats.level}`;
  }

  // Update XP bar
  const xpBar = xpContainer.querySelector('.profile-xp-bar');
  const xpFill = xpContainer.querySelector('.profile-xp-fill');
  const xpInfo = xpContainer.querySelector('.profile-xp-info');

  if (xpBar && xpFill && xpInfo) {
    const xpForNextLevel = 100;
    const xpInCurrentLevel = userStats.xp % xpForNextLevel;
    const progress = (xpInCurrentLevel / xpForNextLevel) * 100;

    xpFill.style.width = `${progress}%`;
    xpInfo.innerHTML = `
      <span>Level ${userStats.level}</span>
      <span>${xpInCurrentLevel}/${xpForNextLevel} XP</span>
    `;
  }
}

// =============================================
// SILK UI COMPONENTS
// =============================================
function initSilkUI() {
  // Initialize Silk UI components if they exist on the page
  const silkElements = document.querySelectorAll('[data-silk]');

  if (silkElements.length > 0) {
    console.log('Silk UI elements found:', silkElements.length);

    // You can add specific Silk UI initialization here
    // For example, handling scroll containers, modals, etc.

    // Example: Initialize scroll containers
    document.querySelectorAll('[data-silk~=c2]').forEach(container => {
      // Add any specific initialization for scroll containers
      container.addEventListener('scroll', () => {
        // Handle scroll events if needed
      });
    });
  }
}

// =============================================
// TOOLTIPS
// =============================================
function initTooltips() {
  const tooltips = document.querySelectorAll('.tooltip');

  tooltips.forEach(tooltip => {
    const content = tooltip.querySelector('.tooltip-content');
    if (!content) return;

    // Position tooltip
    const rect = tooltip.getBoundingClientRect();
    content.style.left = `${rect.width / 2}px`;
    content.style.bottom = `${rect.height + 5}px`;

    // Show/hide tooltip
    tooltip.addEventListener('mouseenter', () => {
      content.style.opacity = '1';
      content.style.visibility = 'visible';
    });

    tooltip.addEventListener('mouseleave', () => {
      content.style.opacity = '0';
      content.style.visibility = 'hidden';
    });
  });
}

// =============================================
// MODALS
// =============================================
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');

  modalTriggers.forEach(trigger => {
    const modalId = trigger.getAttribute('data-modal-trigger');
    const modal = document.getElementById(modalId);

    if (!modal) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      showModal(modal);
    });
  });

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-overlay.visible');
      openModals.forEach(modal => hideModal(modal));
    }
  });
}

function showModal(modal) {
  const overlay = modal.closest('.modal-overlay') || modal;

  // Show overlay
  overlay.classList.add('visible');

  // Focus first focusable element
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
  const overlay = modal.closest('.modal-overlay') || modal;

  // Hide overlay
  overlay.classList.remove('visible');

  // Restore body scroll
  document.body.style.overflow = '';

  // Return focus to trigger if it exists
  const triggerId = modal.getAttribute('data-modal-id');
  if (triggerId) {
    const trigger = document.querySelector(`[data-modal-trigger="${triggerId}"]`);
    if (trigger) {
      trigger.focus();
    }
  }
}

// =============================================
// TOASTS
// =============================================
function initToasts() {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  // Set icon based on type
  let icon = 'fa-info-circle';
  switch (type) {
    case 'success':
      icon = 'fa-check-circle';
      break;
    case 'error':
      icon = 'fa-exclamation-circle';
      break;
    case 'warning':
      icon = 'fa-exclamation-triangle';
      break;
  }

  toast.innerHTML = `
    <i class="fas ${icon} toast-icon"></i>
    <span class="toast-message">${message}</span>
    <button class="toast-close"><i class="fas fa-times"></i></button>
  `;

  toastContainer.appendChild(toast);

  // Auto-remove after duration
  const timer = setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);

  // Close button
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn?.addEventListener('click', () => {
    clearTimeout(timer);
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  });

  return toast;
}

// =============================================
// ACCORDIONS
// =============================================
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.closest('.accordion-item');
      const accordionContent = accordionItem.querySelector('.accordion-content');

      // Toggle active state
      accordionItem.classList.toggle('active');

      // Animate content
      if (accordionItem.classList.contains('active')) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      } else {
        accordionContent.style.maxHeight = '0';
      }
    });
  });
}

// =============================================
// TABS
// =============================================
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      const tabContent = document.getElementById(tabId);

      // Remove active class from all buttons and contents
      const tabGroup = button.closest('.tabs');
      tabGroup?.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      if (tabContent) {
        tabContent.classList.add('active');
      }
    });
  });
}

// =============================================
// DROPDOWNS
// =============================================
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    const dropdownMenu = toggle.nextElementSibling;

    if (!dropdownMenu || !dropdownMenu.classList.contains('dropdown-menu')) return;

    // Toggle dropdown on click
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close all other dropdowns
      document.querySelectorAll('.dropdown-menu.visible').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.classList.remove('visible');
          menu.closest('.dropdown').querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current dropdown
      dropdownMenu.classList.toggle('visible');
      toggle.setAttribute('aria-expanded', dropdownMenu.classList.contains('visible'));
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.visible').forEach(menu => {
        menu.classList.remove('visible');
        menu.closest('.dropdown').querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close dropdowns when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.dropdown-menu.visible').forEach(menu => {
        menu.classList.remove('visible');
        menu.closest('.dropdown').querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });
}

// =============================================
// FORM VALIDATION
// =============================================
function initFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;

      // Check required fields
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');

          // Show error message
          let errorMessage = field.nextElementSibling;
          if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
          }
          errorMessage.textContent = 'This field is required';
        } else {
          field.classList.remove('error');
          const errorMessage = field.nextElementSibling;
          if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
          }
        }
      });

      // Check email format
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');

          let errorMessage = emailField.nextElementSibling;
          if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            emailField.parentNode.insertBefore(errorMessage, emailField.nextSibling);
          }
          errorMessage.textContent = 'Please enter a valid email address';
        }
      }

      // Check password match
      const passwordField = form.querySelector('input[name="password"]');
      const confirmPasswordField = form.querySelector('input[name="confirmPassword"]');
      if (passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value) {
        isValid = false;
        passwordField.classList.add('error');
        confirmPasswordField.classList.add('error');

        let errorMessage = confirmPasswordField.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
          errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';
          confirmPasswordField.parentNode.insertBefore(errorMessage, confirmPasswordField.nextSibling);
        }
        errorMessage.textContent = 'Passwords do not match';
      }

      if (!isValid) {
        e.preventDefault();
        // Focus on first error field
        const firstErrorField = form.querySelector('.error');
        if (firstErrorField) {
          firstErrorField.focus();
        }
      }
    });

    // Clear error on input
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
          errorMessage.remove();
        }
      });
    });
  });
}

// =============================================
// AUTH PAGES
// =============================================
function initAuthPages() {
  const loginForm = document.querySelector('.login-form');
  const signupForm = document.querySelector('.signup-form');
  const authSocialBtns = document.querySelectorAll('.auth-social-btn');

  // Social login buttons
  authSocialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const provider = btn.classList.contains('google') ? 'Google' :
                     btn.classList.contains('facebook') ? 'Facebook' :
                     btn.classList.contains('github') ? 'GitHub' : 'Unknown';

      // In a real app, you would implement OAuth here
      showToast(`Logging in with ${provider}...`, 'info');

      // Simulate login after 2 seconds
      setTimeout(() => {
        // Save user data
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', `${provider} User`);
        localStorage.setItem('userAvatar', `assets/images/${provider.toLowerCase()}-avatar.jpg`);

        // Redirect to home
        window.location.href = 'index.html';
      }, 2000);
    });
  });

  // Login form
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    const rememberMe = loginForm.querySelector('input[type="checkbox"]').checked;

    // Simple validation
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    // In a real app, you would validate credentials with a backend
    // For demo, we'll just check if email and password are not empty
    showToast('Logging in...', 'info');

    // Simulate login
    setTimeout(() => {
      // Save user data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', 'Paras Dhiman');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userAvatar', 'assets/images/user.jpg');

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // Redirect to home
      window.location.href = 'index.html';
    }, 1500);
  });

  // Signup form
  signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = signupForm.querySelector('input[name="name"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]').value;
    const terms = signupForm.querySelector('input[type="checkbox"]').checked;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (!terms) {
      showToast('You must accept the terms and conditions', 'error');
      return;
    }

    // In a real app, you would send this data to your backend
    showToast('Creating your account...', 'info');

    // Simulate signup
    setTimeout(() => {
      // Save user data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userAvatar', 'assets/images/user.jpg');
      localStorage.setItem('userXP', '0');
      localStorage.setItem('challengeStreak', '0');

      // Redirect to home
      window.location.href = 'index.html';
    }, 1500);
  });

  // Check if user is already logged in
  if (localStorage.getItem('isLoggedIn') === 'true') {
    // Redirect to home if on login/signup page
    if (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) {
      window.location.href = 'index.html';
    }

    // Update UI for logged-in user
    updateAuthUI();
  }
}

// Update UI for logged-in user
function updateAuthUI() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName') || 'User';
  const userAvatar = localStorage.getItem('userAvatar') || 'assets/images/user.jpg';

  // Update header
  const authButtons = document.querySelector('.auth-buttons');
  if (authButtons) {
    authButtons.innerHTML = `
      <div class="user-menu">
        <button class="user-btn dropdown-toggle" aria-expanded="false">
          <img src="${userAvatar}" alt="${userName}" class="user-avatar">
          <span class="user-name">${userName}</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="dropdown-menu user-dropdown">
          <a href="profile.html" class="dropdown-item">
            <i class="fas fa-user"></i> Profile
          </a>
          <a href="dashboard.html" class="dropdown-item">
            <i class="fas fa-chart-line"></i> Dashboard
          </a>
          <a href="settings.html" class="dropdown-item">
            <i class="fas fa-cog"></i> Settings
          </a>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item logout-btn">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    `;

    // Initialize dropdown
    initDropdowns();

    // Logout button
    const logoutBtn = authButtons.querySelector('.logout-btn');
    logoutBtn?.addEventListener('click', () => {
      // Clear user data
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userAvatar');

      // Redirect to home
      window.location.href = 'index.html';
    });
  }

  // Update profile link in mobile menu if it exists
  const mobileNavbar = document.querySelector('.navbar');
  if (mobileNavbar) {
    const profileLink = document.createElement('li');
    profileLink.innerHTML = `
      <a href="profile.html">
        <i class="fas fa-user"></i> Profile
      </a>
    `;
    mobileNavbar.querySelector('ul').appendChild(profileLink);

    const logoutLink = document.createElement('li');
    logoutLink.innerHTML = `
      <a href="#" class="logout-link">
        <i class="fas fa-sign-out-alt"></i> Logout
      </a>
    `;
    mobileNavbar.querySelector('ul').appendChild(logoutLink);

    // Logout link
    const logoutLinkBtn = logoutLink.querySelector('a');
    logoutLinkBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userAvatar');
      window.location.href = 'index.html';
    });
  }
}

// =============================================
// COURSE PROGRESS
// =============================================
function initCourseProgress() {
  // Load saved progress for each course
  const courseCards = document.querySelectorAll('.course-card');

  courseCards.forEach(card => {
    const courseId = card.dataset.course || card.querySelector('a').getAttribute('href').split('=')[1];
    const progressKey = `courseProgress_${courseId}`;

    // Get saved progress
    const savedProgress = localStorage.getItem(progressKey);

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      const progressBar = card.querySelector('.progress');
      const progressText = card.querySelector('.progress-text');

      if (progressBar && progressText) {
        progressBar.style.width = `${progress.percent}%`;
        progressText.textContent = `${progress.percent}% Complete`;
      }
    }

    // Update progress when watching videos
    const startBtn = card.querySelector('.start-btn');
    startBtn?.addEventListener('click', () => {
      // In a real app, you would track progress as the user watches videos
      // For demo, we'll just increment progress by 10% each time
      let progress = { percent: 0 };
      const savedProgress = localStorage.getItem(progressKey);

      if (savedProgress) {
        progress = JSON.parse(savedProgress);
      }

      progress.percent = Math.min(100, progress.percent + 10);

      localStorage.setItem(progressKey, JSON.stringify(progress));

      // Update UI
      const progressBar = card.querySelector('.progress');
      const progressText = card.querySelector('.progress-text');

      if (progressBar && progressText) {
        progressBar.style.width = `${progress.percent}%`;
        progressText.textContent = `${progress.percent}% Complete`;
      }

      // Show toast
      showToast(`Progress updated: ${progress.percent}%`, 'success');
    });
  });
}

// =============================================
// LEADERBOARD
// =============================================
function initLeaderboard() {
  const leaderboardItems = document.querySelectorAll('.leaderboard-item');

  if (leaderboardItems.length === 0) return;

  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Paras Dhiman', score: 1250, streak: 15, avatar: 'assets/images/user1.jpg', isCurrentUser: false },
    { rank: 2, name: 'Ananya Gupta', score: 1180, streak: 12, avatar: 'assets/images/user2.jpg', isCurrentUser: false },
    { rank: 3, name: 'Rahul Verma', score: 1050, streak: 10, avatar: 'assets/images/user3.jpg', isCurrentUser: false },
    { rank: 4, name: 'Priya Sharma', score: 980, streak: 8, avatar: 'assets/images/user1.jpg', isCurrentUser: false },
    { rank: 5, name: getCurrentUser(), score: parseInt(localStorage.getItem('userXP')) || 0, streak: parseInt(localStorage.getItem('challengeStreak')) || 0, avatar: getCurrentUserAvatar(), isCurrentUser: true }
  ];

  // Sort by score
  leaderboardData.sort((a, b) => b.score - a.score);

  // Update ranks
  leaderboardData.forEach((user, index) => {
    user.rank = index + 1;
  });

  // Update leaderboard items
  leaderboardItems.forEach((item, index) => {
    if (index < leaderboardData.length) {
      const user = leaderboardData[index];

      item.innerHTML = `
        <div class="leaderboard-rank">${user.rank}</div>
        <img src="${user.avatar}" alt="${user.name}" class="leaderboard-avatar">
        <div class="leaderboard-user">
          <div class="leaderboard-user-name">${user.name}${user.isCurrentUser ? ' (You)' : ''}</div>
          <div class="leaderboard-user-streak">
            <i class="fas fa-fire"></i> ${user.streak} day${user.streak !== 1 ? 's' : ''}
          </div>
        </div>
        <div class="leaderboard-score">${user.score} XP</div>
      `;

      // Highlight current user
      if (user.isCurrentUser) {
        item.classList.add('current-user');
      } else {
        item.classList.remove('current-user');
      }
    }
  });
}

// =============================================
// STREAK SYSTEM
// =============================================
function initStreakSystem() {
  // Check if user has a streak
  const streak = parseInt(localStorage.getItem('challengeStreak')) || 0;

  // Update streak display
  const streakElements = document.querySelectorAll('.streak-display');
  streakElements.forEach(el => {
    el.textContent = `${streak} day${streak !== 1 ? 's' : ''}`;
  });

  // Check if streak should be incremented (once per day)
  const lastStreakDate = localStorage.getItem('lastStreakDate');
  const today = new Date().toDateString();

  if (lastStreakDate !== today && streak > 0) {
    // Increment streak
    const newStreak = streak + 1;
    localStorage.setItem('challengeStreak', newStreak);
    localStorage.setItem('lastStreakDate', today);

    // Update display
    streakElements.forEach(el => {
      el.textContent = `${newStreak} day${newStreak !== 1 ? 's' : ''}`;
    });

    // Show toast
    showToast(`🔥 Your streak is now ${newStreak} days!`, 'success');
  } else if (lastStreakDate !== today && streak === 0) {
    // Start new streak
    localStorage.setItem('challengeStreak', 1);
    localStorage.setItem('lastStreakDate', today);

    // Update display
    streakElements.forEach(el => {
      el.textContent = '1 day';
    });

    // Show toast
    showToast('🔥 New streak started!', 'success');
  }
}

// =============================================
// GAMIFICATION
// =============================================
function initGamification() {
  // Load user XP and level
  let xp = parseInt(localStorage.getItem('userXP')) || 0;
  let level = Math.floor(xp / 100) + 1;

  // Update XP and level displays
  const xpElements = document.querySelectorAll('.xp-display');
  xpElements.forEach(el => {
    el.textContent = `${xp} XP`;
  });

  const levelElements = document.querySelectorAll('.level-display');
  levelElements.forEach(el => {
    el.textContent = `Level ${level}`;
  });

  // Update XP bar
  const xpBars = document.querySelectorAll('.xp-bar');
  xpBars.forEach(bar => {
    const xpFill = bar.querySelector('.progress');
    const xpInfo = bar.querySelector('.xp-bar > span:last-child');

    if (xpFill && xpInfo) {
      const xpForNextLevel = 100;
      const xpInCurrentLevel = xp % xpForNextLevel;
      const progress = (xpInCurrentLevel / xpForNextLevel) * 100;

      xpFill.style.width = `${progress}%`;
      xpInfo.textContent = `${xpInCurrentLevel}/${xpForNextLevel} XP`;
    }
  });

  // Award badges (demo)
  awardBadges(xp, level);
}

// Award badges based on XP and level
function awardBadges(xp, level) {
  const badgesContainer = document.querySelector('.badges-container');
  if (!badgesContainer) return;

  // Sample badges
  const badges = [
    { name: 'Beginner', xp: 0, icon: 'fa-medal', color: '#cd7f32', earned: xp >= 0 },
    { name: 'Math Master', xp: 500, icon: 'fa-square-root-alt', color: '#6c5ce7', earned: xp >= 500 },
    { name: 'Physics Warrior', xp: 1000, icon: 'fa-atom', color: '#00cec9', earned: xp >= 1000 },
    { name: 'Chemistry Champion', xp: 1500, icon: 'fa-flask', color: '#fd79a8', earned: xp >= 1500 },
    { name: 'Coding Ninja', xp: 2000, icon: 'fa-code', color: '#ff6b6b', earned: xp >= 2000 },
    { name: 'Study Legend', xp: 5000, icon: 'fa-crown', color: '#ffd700', earned: xp >= 5000 }
  ];

  // Render badges
  badgesContainer.innerHTML = badges.map(badge => `
    <div class="badge-item ${badge.earned ? 'earned' : 'locked'}" style="--badge-color: ${badge.color}">
      <div class="badge-icon">
        <i class="fas ${badge.icon}"></i>
      </div>
      <div class="badge-info">
        <h4 class="badge-name">${badge.name}</h4>
        <p class="badge-requirement">${badge.xp} XP</p>
      </div>
      ${badge.earned ? '<span class="badge-status earned"><i class="fas fa-check"></i> Earned</span>' : '<span class="badge-status locked"><i class="fas fa-lock"></i> Locked</span>'}
    </div>
  `).join('');
}

// =============================================
// AI FEATURES
// =============================================
function initAIFeatures() {
  // Study Planner
  const studyPlannerForm = document.querySelector('.study-planner-form');
  const studyPlannerResult = document.querySelector('.study-planner-result');

  studyPlannerForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const examDate = studyPlannerForm.querySelector('input[type="date"]').value;
    const subjects = Array.from(studyPlannerForm.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value);

    if (!examDate || subjects.length === 0) {
      showToast('Please select an exam date and at least one subject', 'error');
      return;
    }

    // Generate study plan (demo)
    generateStudyPlan(examDate, subjects);
  });

  // Voice Notes
  const voiceNotesBtn = document.getElementById('voice-notes-btn');
  const voiceNotesOutput = document.getElementById('voice-notes-output');

  if (voiceNotesBtn && voiceNotesOutput) {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      voiceNotesBtn.style.display = 'none';
      showToast('Voice notes are not supported in your browser', 'warning');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Configure recognition
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    voiceNotesBtn.addEventListener('click', () => {
      if (voiceNotesBtn.classList.contains('recording')) {
        // Stop recording
        recognition.stop();
        voiceNotesBtn.classList.remove('recording');
        voiceNotesBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
      } else {
        // Start recording
        voiceNotesOutput.textContent = 'Listening...';
        recognition.start();
        voiceNotesBtn.classList.add('recording');
        voiceNotesBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
      }
    });

    // Handle results
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      voiceNotesOutput.textContent = transcript;

      // Save to localStorage
      const notes = JSON.parse(localStorage.getItem('voiceNotes') || '[]');
      notes.push({
        text: transcript,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('voiceNotes', JSON.stringify(notes));
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      voiceNotesOutput.textContent = 'Error: ' + event.error;
      voiceNotesBtn.classList.remove('recording');
      voiceNotesBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
    };

    recognition.onend = () => {
      if (voiceNotesBtn.classList.contains('recording')) {
        voiceNotesBtn.classList.remove('recording');
        voiceNotesBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
      }
    };
  }
}

// Generate study plan
function generateStudyPlan(examDate, subjects) {
  const studyPlannerResult = document.querySelector('.study-planner-result');
  if (!studyPlannerResult) return;

  // Calculate days until exam
  const examDateObj = new Date(examDate);
  const today = new Date();
  const daysUntilExam = Math.ceil((examDateObj - today) / (1000 * 60 * 60 * 24));

  if (daysUntilExam <= 0) {
    showToast('Please select a future date', 'error');
    return;
  }

  // Generate plan (demo)
  const plan = [];
  const daysPerSubject = Math.floor(daysUntilExam / subjects.length);
  let currentDay = 0;

  subjects.forEach(subject => {
    const subjectDays = Math.max(1, daysPerSubject);

    for (let i = 0; i < subjectDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + currentDay + i);

      plan.push({
        date: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
        subject: subject,
        topics: getTopicsForSubject(subject, i, subjectDays),
        studyTime: getStudyTime(subject),
        practiceTime: getPracticeTime(subject)
      });
    }

    currentDay += subjectDays;
  });

  // Render plan
  studyPlannerResult.innerHTML = `
    <div class="study-plan-header">
      <h3><i class="fas fa-calendar-alt"></i> Your Study Plan</h3>
      <p>${daysUntilExam} days until your exam on ${examDateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
    </div>
    <div class="study-plan">
      ${plan.map(day => `
        <div class="study-day">
          <div class="study-day-header">
            <span class="study-day-date">${day.date}</span>
            <span class="study-subject">${day.subject}</span>
          </div>
          <div class="study-day-details">
            <div class="study-topics">
              <i class="fas fa-book"></i>
              <div>
                <strong>Topics:</strong>
                <ul>
                  ${day.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
              </div>
            </div>
            <div class="study-times">
              <div class="study-time">
                <i class="fas fa-clock"></i>
                <span><strong>Study:</strong> ${day.studyTime}</span>
              </div>
              <div class="study-time">
                <i class="fas fa-pencil-alt"></i>
                <span><strong>Practice:</strong> ${day.practiceTime}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="study-plan-actions">
      <button class="btn btn-primary" onclick="saveStudyPlan()">
        <i class="fas fa-save"></i> Save Plan
      </button>
      <button class="btn btn-outline" onclick="printStudyPlan()">
        <i class="fas fa-print"></i> Print Plan
      </button>
    </div>
  `;

  // Scroll to result
  studyPlannerResult.scrollIntoView({ behavior: 'smooth' });
}

// Helper function to get topics for a subject
function getTopicsForSubject(subject, day, totalDays) {
  const subjects = {
    'Mathematics': [
      ['Limits and Continuity', 'Differentiation Basics'],
      ['Applications of Derivatives', 'Integration Techniques'],
      ['Definite Integrals', 'Applications of Integration'],
      ['Differential Equations', 'Sequences and Series'],
      ['Vector Calculus', 'Multivariable Functions']
    ],
    'Physics': [
      ['Kinematics', 'Newton\'s Laws'],
      ['Work, Energy, and Power', 'Momentum and Collisions'],
      ['Rotational Motion', 'Gravitation'],
      ['Thermodynamics', 'Waves and Oscillations'],
      ['Electrostatics', 'Magnetism']
    ],
    'Chemistry': [
      ['Atomic Structure', 'Chemical Bonding'],
      ['Thermochemistry', 'Chemical Kinetics'],
      ['Equilibrium', 'Acids and Bases'],
      ['Electrochemistry', 'Organic Chemistry Basics'],
      ['Biomolecules', 'Environmental Chemistry']
    ],
    'Biology': [
      ['Cell Structure', 'Cell Function'],
      ['Genetics', 'Molecular Biology'],
      ['Evolution', 'Ecology'],
      ['Human Physiology', 'Plant Physiology'],
      ['Microbiology', 'Biotechnology']
    ],
    'Coding': [
      ['Python Basics', 'Data Structures'],
      ['Algorithms', 'Object-Oriented Programming'],
      ['Web Development', 'Databases'],
      ['Problem Solving', 'Competitive Programming'],
      ['System Design', 'Advanced Topics']
    ]
  };

  return subjects[subject]?.[day % subjects[subject].length] || ['Review and Practice'];
}

// Helper function to get study time
function getStudyTime(subject) {
  const times = {
    'Mathematics': '2 hours',
    'Physics': '1.5 hours',
    'Chemistry': '1.5 hours',
    'Biology': '1.5 hours',
    'Coding': '2 hours'
  };
  return times[subject] || '1 hour';
}

// Helper function to get practice time
function getPracticeTime(subject) {
  const times = {
    'Mathematics': '1 hour',
    'Physics': '1 hour',
    'Chemistry': '1 hour',
    'Biology': '1 hour',
    'Coding': '1.5 hours'
  };
  return times[subject] || '30 minutes';
}

// Save study plan
function saveStudyPlan() {
  const studyPlannerResult = document.querySelector('.study-planner-result');
  if (!studyPlannerResult) return;

  const planData = {
    html: studyPlannerResult.innerHTML,
    timestamp: new Date().toISOString()
  };

  localStorage.setItem('savedStudyPlan', JSON.stringify(planData));
  showToast('Study plan saved!', 'success');
}

// Print study plan
function printStudyPlan() {
  const studyPlannerResult = document.querySelector('.study-planner-result');
  if (!studyPlannerResult) return;

  // Create a printable version
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Study Plan</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #6c5ce7; }
        .study-day { margin-bottom: 20px; border: 1px solid #eee; padding: 15px; border-radius: 5px; }
        .study-day-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .study-subject { font-weight: bold; color: #6c5ce7; }
        .study-topics ul { margin: 5px 0; padding-left: 20px; }
        .study-times { display: flex; gap: 20px; margin-top: 10px; }
        .study-time { display: flex; align-items: center; gap: 5px; }
        @media print {
          body { margin: 0; }
          .study-day { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <h1>Your Study Plan</h1>
      ${studyPlannerResult.querySelector('.study-plan').innerHTML}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// =============================================
// LIVE CLASSES (Basic Implementation)
// =============================================
function initLiveClasses() {
  const liveClassPreview = document.querySelector('.live-class-preview');
  if (!liveClassPreview) return;

  // In a real app, you would use WebRTC or a service like Agora, Twilio, etc.
  // This is a basic simulation

  const joinBtn = liveClassPreview.querySelector('.join-class-btn');
  joinBtn?.addEventListener('click', () => {
    showToast('Joining live class...', 'info');

    // Simulate joining class
    setTimeout(() => {
      // In a real app, you would redirect to the live class room
      window.location.href = `live-class.html?class=${joinBtn.dataset.classId}`;
    }, 1500);
  });
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format relative time
function formatRelativeTime(date) {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now - then) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return interval === 1 ? `${interval} ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return 'Just now';
}


function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu.visible').forEach(menu => {
      menu.classList.remove('visible');
      const toggle = menu.previousElementSibling;
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});


document.addEventListener('keydown', (e) => {

  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.visible').forEach(modal => {
      hideModal(modal);
    });


    document.querySelectorAll('.dropdown-menu.visible').forEach(menu => {
      menu.classList.remove('visible');
      const toggle = menu.previousElementSibling;
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {

    const testContainer = document.querySelector('.test-container');
    if (testContainer && testContainer.style.display !== 'none') {
      alert('Please do not switch tabs during the test!');

    }
  }
});

document.addEventListener('contextmenu', (e) => {
  const testContainer = e.target.closest('.test-container');
  if (testContainer && testContainer.style.display !== 'none') {
    e.preventDefault();
    showToast('Right-click is disabled during tests', 'warning');
  }
});

window.addEventListener('load', function() {
  initLiveClasses();
  checkForUpdates();
});


function checkForUpdates() {
  console.log('Checking for updates...');

  if (localStorage.getItem('lastUpdateCheck')) {
    const lastCheck = new Date(localStorage.getItem('lastUpdateCheck'));
    const now = new Date();
    const hoursSinceCheck = (now - lastCheck) / (1000 * 60 * 60);

    if (hoursSinceCheck > 24) {

      showToast('New content available! Check out the latest courses.', 'info');
    }
  }


  localStorage.setItem('lastUpdateCheck', new Date().toISOString());
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}


function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.');
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Notification permission denied.');
    }
  });
}

function showNotification(title, body) {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: '/assets/images/favicon.ico'
    });
  } else if (Notification.permission !== 'denied') {
    requestNotificationPermission();
    setTimeout(() => showNotification(title, body), 1000);
  }
}

window.showToast = showToast;
window.saveStudyPlan = saveStudyPlan;
window.printStudyPlan = printStudyPlan;
window.getCurrentUser = getCurrentUser;
window.getCurrentUserAvatar = getCurrentUserAvatar;
