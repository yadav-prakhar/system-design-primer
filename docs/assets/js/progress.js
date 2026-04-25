(function() {
  'use strict';

  var STORAGE_KEY = 'sdp-progress';

  var TOPICS = [
    'dns',
    'cdn',
    'load-balancer',
    'database',
    'cache',
    'asynchronism',
    'communication',
    'security',
    'appendix',
    'solutions',
    'resources'
  ];

  var progressData = {};
  var storageAvailable = true;

  function isStorageAvailable() {
    try {
      localStorage.setItem('__storage_test__', '__storage_test__');
      localStorage.removeItem('__storage_test__');
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadProgress() {
    if (!storageAvailable) {
      return {};
    }
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Progress: Failed to load progress data', e);
    }
    return {};
  }

  function saveProgress() {
    if (!storageAvailable) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    } catch (e) {
      console.warn('Progress: Failed to save progress data', e);
    }
  }

  function getCurrentTopicId() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    if (filename === 'index.html') {
      return 'index';
    }
    return filename.replace('.html', '');
  }

  function calculateProgress() {
    var completed = TOPICS.filter(function(topic) {
      return progressData[topic] === true;
    }).length;
    return Math.round((completed / TOPICS.length) * 100);
  }

  function updateHeaderProgress() {
    var indicator = document.querySelector('.progress-indicator');
    if (indicator) {
      var percent = calculateProgress();
      indicator.textContent = 'Progress: ' + percent + '%';
      indicator.setAttribute('aria-label', 'Progress: ' + percent + '% complete');
    }
  }

  function updateSidebarCheckboxes() {
    TOPICS.forEach(function(topic) {
      var checkbox = document.querySelector('.nav-progress-checkbox[data-topic="' + topic + '"]');
      if (checkbox) {
        checkbox.checked = progressData[topic] === true;
      }
    });
  }

  function createProgressCheckbox(topicId, isCompleted) {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'nav-progress-checkbox';
    checkbox.dataset.topic = topicId;
    checkbox.checked = isCompleted;
    checkbox.setAttribute('aria-label', 'Mark ' + topicId + ' as complete');
    return checkbox;
  }

  function injectSidebarCheckboxes() {
    TOPICS.forEach(function(topic) {
      var navItem = document.querySelector('.nav-item a[href="' + topic + '.html"]');
      if (navItem && navItem.parentNode) {
        var isCompleted = progressData[topic] === true;
        var checkbox = createProgressCheckbox(topic, isCompleted);
        navItem.parentNode.insertBefore(checkbox, navItem);
      }
    });
  }

  function handleCheckboxChange(event) {
    var checkbox = event.target;
    if (checkbox.classList.contains('nav-progress-checkbox')) {
      var topicId = checkbox.dataset.topic;
      progressData[topicId] = checkbox.checked;
      saveProgress();
      updateHeaderProgress();
    }
  }

  function createProgressBar() {
    var percent = calculateProgress();
    var container = document.createElement('div');
    container.className = 'progress-bar-container';
    container.innerHTML =
      '<div class="progress-bar-label">Your Progress: ' + percent + '%</div>' +
      '<div class="progress-bar">' +
        '<div class="progress-bar-fill" style="width: ' + percent + '%"></div>' +
      '</div>' +
      '<button class="reset-progress-btn" type="button">Reset All Progress</button>';
    return container;
  }

  function injectHomepageProgressBar() {
    var main = document.querySelector('.site-main');
    if (main && getCurrentTopicId() === 'index') {
      var existingBar = document.querySelector('.progress-bar-container');
      if (existingBar) {
        existingBar.remove();
      }
      var progressBar = createProgressBar();
      var firstSection = main.querySelector('section');
      if (firstSection) {
        main.insertBefore(progressBar, firstSection);
      }
    }
  }

  function handleResetClick() {
    TOPICS.forEach(function(topic) {
      progressData[topic] = false;
    });
    saveProgress();
    updateHeaderProgress();
    updateSidebarCheckboxes();
    injectHomepageProgressBar();
  }

  function initEventListeners() {
    document.addEventListener('change', handleCheckboxChange);
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('reset-progress-btn')) {
        handleResetClick();
      }
    });
  }

  function init() {
    storageAvailable = isStorageAvailable();
    progressData = loadProgress();
    initEventListeners();
    updateHeaderProgress();
    injectSidebarCheckboxes();
    injectHomepageProgressBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();