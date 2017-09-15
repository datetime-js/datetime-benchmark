(function (window) {
  'use strict';

  var colors = [
    '#ff0000',
    '#ff7400',
    '#009999',
    '#00cc00'
  ];

  function Reporter (target, options) {
    var table;
    var progress;

    function createElement (nodeName) {
      return document.createElement(nodeName || 'div');
    }

    /**
     * @private
     */
    function formatValue (val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * @private
     */
    function createMarkup () {
      table = createElement();
      progress = createElement();

      table.className = 'benchmark-suite-result benchmark-suite-result--in-progress';

      progress.className = 'benchmark-suite-result-item benchmark-suite-result-item--progress';
      progress.innerText = 'Running...';

      table.appendChild(progress);

      target.appendChild(table);
    }

    /**
     * @param {Object} suite
     * @private
     */
    function drawDiagrams (suite) {
      var fastestCase = null;
      var colorIdx = 0;

      suite.each(function (suiteCase) {
        if (!fastestCase || suiteCase.hz > fastestCase.hz) {
          fastestCase = suiteCase;
        }
      });

      suite.each(function (suiteCase) {
        var size = suiteCase.hz / fastestCase.hz * 100;
        var barElem = findBar(suiteCase.id);

        barElem.style.backgroundColor = colors[colorIdx];
        barElem.style.visibility = 'visible';
        barElem.style.width = size.toFixed(4) + '%';

        colorIdx++;
      });
    }

    /**
     * @param {String} id
     * @returns {Element}
     * @private
     */
    function findBar (id) {
      return findItemElem(id).querySelector('[data-role="diagram-bar"]');
    }

    /**
     * @param {String} id
     * @returns {Element}
     * @private
     */
    function findItemElem (id) {
      return target.querySelector('[data-id="' + id + '"]');
    }

    /**
     * @private
     */
    function hideProgress () {
      table.className = 'benchmark-suite-result';
    }

    /**
     * @param {String} id
     * @private
     */
    function highlightFastest (id) {
      findItemElem(id).classList.add('benchmark-suite-result-item--fastest');
    }

    /**
     * @private
     */
    function init () {
      createMarkup();
    }

    /**
     * @public
     */
    function printCycle (event) {
      var suiteItem = event.target;

      var row = createElement();
      var name = createElement();
      var value = createElement();

      var diagram = createElement();
      var diagramBar = createElement();

      name.innerHTML = suiteItem.name;
      name.className = 'benchmark-suite-result-name';

      value.innerText = formatValue(suiteItem.hz.toFixed(0));
      value.className = 'benchmark-suite-result-value';

      diagram.className = 'benchmark-suite-result-diagram';
      diagramBar.className = 'benchmark-suite-result-diagram-bar';

      diagram.setAttribute('data-role', 'diagram');
      diagramBar.setAttribute('data-role', 'diagram-bar');

      diagram.appendChild(diagramBar);

      row.className = 'benchmark-suite-result-item';

      row.appendChild(name);
      row.appendChild(value);
      row.appendChild(diagram);

      row.setAttribute('data-id', suiteItem.id);

      table.appendChild(row);
    }

    /**
     * @public
     */
    function printResults (suite) {
      var fastest = suite.filter('fastest');
      var idx = fastest.length;

      while (idx--) {
        highlightFastest(fastest[idx].id);
      }

      hideProgress();

      drawDiagrams(suite);
    }

    init();

    return {
      printCycle: printCycle,
      printResults: printResults
    };
  }

  window.Reporter = Reporter;
})(window);
