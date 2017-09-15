(function () {
  'use strict';

  /**
   * @name Runner
   * @class
   */
  function Runner (target, options) {
    this.container = target;
    this.options = options;
    this.nodes = {};

    this.init();
  }

  /**
   * @public
   */
  Runner.prototype.init = function () {
    this.render();
    this.bindEvents();
    this.attach();
  };

  /**
   * @public
   */
  Runner.prototype.attach = function () {
    this.container.appendChild(this.nodes.root);
  };

  /**
   * @public
   */
  Runner.prototype.bindEvents = function () {
    var runner = this;

    this.nodes.tabs.querySelector('.toggle').addEventListener('click', function onToggleClick (evt) {
      var button = evt.target;
      var tabName = button.getAttribute('data-tab');

      runner.showTab(tabName);
    });

    this.nodes.root.addEventListener('click', function onClick (evt) {
      if (evt.target.getAttribute('data-action') === 'run-suite') {
        var button = evt.target;

        var suiteId = button.getAttribute('data-suite-id');
        var suite = runner.getSuiteById(suiteId);

        button.style.display = 'none';
        runner.runSuite(suite);
      }
    });
  };

  /**
   * @param {String} suiteId
   * @returns {Object}
   * @public
   */
  Runner.prototype.getSuiteById = function (suiteId) {
    return this.options.suites[suiteId] || null;
  };

  /**
   * @public
   */
  Runner.prototype.render = function () {
    var suites = this.options.suites;

    var root = createElement();
    var title = createElement();
    var test = createElement('ol');

    var tabs = this.renderTabs(['Test', 'Results'], 0);
    var results = this.renderReport(this.options.report);

    root.classList.add('benchmark');
    root.classList.add('benchmark--display-test');

    title.textContent = 'Benchmark';
    title.classList.add('benchmark-title');

    test.classList.add('benchmark-test');

    Object.keys(suites).forEach(function (key) {
      test.appendChild(this.renderSuite(key, suites[key]));
    }, this);

    root.appendChild(title);
    root.appendChild(tabs);
    root.appendChild(test);
    root.appendChild(results);

    this.nodes.root = root;
    this.nodes.tabs = tabs;
  };

  /**
   * @param {Array} tabItems
   * @param {Number} selectedIdx
   * @returns {HTMLElement}
   * @public
   */
  Runner.prototype.renderTabs = function (tabItems, selectedIdx) {
    var tabs = createElement();
    var toggle = createElement();

    tabs.classList.add('benchmark-tabs');
    toggle.classList.add('toggle');

    tabItems.forEach(function (tabItem, idx) {
      var button = createElement('a');
      var type = idx === 0 ? 'left' : 'right';

      button.classList.add('toggle-button');
      button.classList.add('toggle-button--' + type);

      if (idx === selectedIdx) {
        button.classList.add('toggle-button--selected');
      }

      button.setAttribute('data-tab', tabItem.toLowerCase());
      button.setAttribute('tabindex', '0');

      button.textContent = tabItem;

      toggle.appendChild(button);
    });

    tabs.appendChild(toggle);

    return tabs;
  };

  /**
   * @param {Object} report
   * @public
   */
  Runner.prototype.renderReport = function (report) {
    var resultsRoot = createElement('ol');
    var html = '';

    resultsRoot.classList.add('benchmark-results');

    report.forEach(function (suite) {
      html = html + '<li class="benchmark-suite">';
      html = html + `<div class="benchmark-suite-title">${suite.suite.title}</div>`;

      suite.records.forEach(function (record) {
        html = html + '<div class="benchmark-suite-record">';

        html = html + '<div class="benchmark-suite-record-title">';
        html = html + `  <div class="benchmark-suite-record-browser">${record.browser}</div>`;
        html = html + `  <div class="benchmark-suite-record-system">${record.system}</div>`;
        html = html + '</div>';

        html = html + '<div class="benchmark-suite-result benchmark-suite-result--no-diagram">';

        record.result.forEach(function (item) {
          var fastest = item.best ? 'benchmark-suite-result-item--fastest' : '';

          html = html + `<div class="benchmark-suite-result-item ${fastest}">`;
          html = html + `<div class="benchmark-suite-result-name">${item.title}</div>`;
          html = html + `<div class="benchmark-suite-result-value">${item.value}</div>`;
          html = html + '</div>';
        });

        html = html + '</div>';
        html = html + '</div>';
      });

      html = html + '</li>';
    });

    resultsRoot.innerHTML = html;

    return resultsRoot;
  };

  /**
   * @param {String} name
   * @param {Object} suite
   * @public
   */
  Runner.prototype.renderSuite = function (name, suite) {
    var suiteRoot = createElement('li');
    var suiteTitle = createElement();
    var button = createElement('a');
    var result = createElement();

    suiteRoot.classList.add('benchmark-suite');
    suiteRoot.setAttribute('data-role', 'suite');
    suiteRoot.setAttribute('data-suite-id', suite.id);

    suiteTitle.classList.add('benchmark-suite-title');
    suiteTitle.textContent = suite.description;

    button.classList.add('benchmark-suite-run');
    button.classList.add('button');
    button.textContent = 'Run test';
    button.setAttribute('data-suite-id', suite.id);
    button.setAttribute('data-action', 'run-suite');

    result.setAttribute('data-role', 'result');

    suiteRoot.appendChild(suiteTitle);
    suiteRoot.appendChild(button);
    suiteRoot.appendChild(result);

    return suiteRoot;
  };

  /**
   * @param {Object} suite
   * @public
   */
  Runner.prototype.runSuite = function (suite) {
    var suiteElem = document.querySelector('[data-role="suite"][data-suite-id="' + suite.id + '"');
    var targetElem = suiteElem.querySelector('[data-role="result"]');

    var reporter = new Reporter(targetElem, {});

    suite.suite
      .on('cycle', function onCycle (event) {
        reporter.printCycle(event);
      })
      .on('complete', function onComplete () {
        reporter.printResults(this);
      })
      .run({ async: true });
  };

  /**
   * @param {String} tabName
   * @public
   */
  Runner.prototype.showTab = function (tabName) {
    var root = this.nodes.root;
    var toggleButtons = this.nodes.tabs.querySelectorAll('.toggle-button');

    root.classList.remove('benchmark--display-test');
    root.classList.remove('benchmark--display-results');
    root.classList.add('benchmark--display-' + tabName);

    toggleButtons[0].classList.remove('toggle-button--selected');
    toggleButtons[1].classList.remove('toggle-button--selected');

    this.nodes.tabs.querySelector('[data-tab="' + tabName + '"]')
      .classList.add('toggle-button--selected');
  };

  /**
   * @param {String} tagName
   * @inner
   */
  function createElement (tagName) {
    return document.createElement(tagName || 'div');
  }

  window.Runner = Runner;
})();
