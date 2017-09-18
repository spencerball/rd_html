
/*
  Accordion

  This allows a collection of sections to be collapsed by default,
  showing only their headers. Sections can be exanded or collapsed
  individually by clicking their headers. An "Open all" button is
  also added to the top of the accordion, which switches to "Close all"
  when all the sections are expanded.

  The state of each section is saved to the DOM via the `aria-expanded`
  attribute, which also provides accessibility.

*/


function Accordion(element) {

  // First do feature detection for required API methods
  if (
    document.querySelectorAll &&
    window.NodeList &&
    'classList' in document.body
  ) {

    this.element = element
    this.sections = []
    this.setup()

  }

}

function AccordionSection(element, accordion) {
  this.element = element
  this.accordion = accordion
  this.setup()
}

Accordion.prototype.setup = function() {

  var accordion_sections = this.element.querySelectorAll('.accordion-section')

  var accordion = this

  for (var i = accordion_sections.length - 1; i >= 0; i--) {
     accordion.sections.push(new AccordionSection(accordion_sections[i], accordion))
  };

  var accordion_controls = document.createElement('div')
  accordion_controls.setAttribute('class', 'accordion-controls')

  var open_or_close_all_button = document.createElement('button')
  open_or_close_all_button.textContent = 'Open all'
  open_or_close_all_button.setAttribute('class', 'accordion-expand-all')
  open_or_close_all_button.setAttribute('aria-expanded', 'false')

  open_or_close_all_button.addEventListener('click', this.openOrCloseAll.bind(this))

  accordion_controls.appendChild(open_or_close_all_button)

  this.element.insertBefore(accordion_controls, this.element.firstChild)
  this.element.classList.add('with-js')
}

Accordion.prototype.openOrCloseAll = function(event) {

  var open_or_close_all_button = event.target
  var now_expanded = !(open_or_close_all_button.getAttribute('aria-expanded') == 'true')

  for (var i = this.sections.length - 1; i >= 0; i--) {
    this.sections[i].setExpanded(now_expanded)
  };

  this.setOpenCloseButtonExpanded(now_expanded)

}


Accordion.prototype.setOpenCloseButtonExpanded = function(expanded) {

  var open_or_close_all_button = this.element.querySelector('.accordion-expand-all')

  var new_button_text = expanded ? "Close all" : "Open all"
  open_or_close_all_button.setAttribute('aria-expanded', expanded)
  open_or_close_all_button.textContent = new_button_text

}

Accordion.prototype.updateOpenAll = function() {

  var sectionsCount = this.sections.length

  var openSectionsCount = 0

  for (var i = this.sections.length - 1; i >= 0; i--) {
    if (this.sections[i].expanded()) {
      openSectionsCount += 1
    }
  };

  if (sectionsCount == openSectionsCount) {
    this.setOpenCloseButtonExpanded(true)
  } else {
    this.setOpenCloseButtonExpanded(false)
  }

}

AccordionSection.prototype.setup = function() {
  this.element.setAttribute('aria-expanded', 'false')

  var header = this.element.querySelector('.accordion-section-header')
  header.addEventListener('click', this.toggleExpanded.bind(this))

  var icon = document.createElement('span')
  icon.setAttribute('class', 'icon')

  header.appendChild(icon)
}

AccordionSection.prototype.toggleExpanded = function(){
  var expanded = (this.element.getAttribute('aria-expanded') == 'true')

  this.setExpanded(!expanded)
  this.accordion.updateOpenAll()
}

AccordionSection.prototype.expanded = function() {
  return (this.element.getAttribute('aria-expanded') == 'true')
}

AccordionSection.prototype.setExpanded = function(expanded) {
  this.element.setAttribute('aria-expanded', expanded)

  // This is set to trigger reflow for IE8, which doesn't
  // always reflow after a setAttribute call.
  this.element.className = this.element.className

}

if (
  'addEventListener' in document &&
  document.querySelectorAll
  ) {

  document.addEventListener('DOMContentLoaded', function() {

    var accordions = document.querySelectorAll('.accordion')

    for (var i = accordions.length - 1; i >= 0; i--) {
      new Accordion(accordions[i])
    };

  })

}

/* Second contact details

  This hides a set of 'second contact' fields behind
  a link, unless the fields already contain values.

*/

function SecondContactDetails(fieldset) {

  // First do feature detection for required API methods
  if (
    document.querySelectorAll &&
    window.NodeList &&
    'classList' in document.body
  ) {
    this.fieldset = fieldset
    this.setup()
  }
}

SecondContactDetails.prototype.setup = function() {

  var inputFields = this.fieldset.querySelectorAll('input')

  var anyFieldsHaveValue = false;

  for (var i = inputFields.length - 1; i >= 0; i--) {

    if (inputFields[i].value != "") {
      anyFieldsHaveValue = true
      break;
    }
  };

  if (!anyFieldsHaveValue) {

    this.fieldset.classList.add('hidden')

    this.add_second_contact_button = document.createElement('button')
    this.add_second_contact_button.classList.add('link')
    this.add_second_contact_button.textContent = 'Add second contact'
    this.add_second_contact_button.addEventListener('click', this.expandFieldset.bind(this))

    var parent = this.fieldset.parentElement

    parent.insertBefore(this.add_second_contact_button, this.fieldset)

  }

};

SecondContactDetails.prototype.expandFieldset = function() {
  this.add_second_contact_button.remove()
  this.fieldset.classList.remove('hidden')
};

if (
  'addEventListener' in document &&
  document.querySelectorAll
  ) {

  document.addEventListener('DOMContentLoaded', function() {
    var second_contact_details = document.querySelectorAll('.js-second-contact-details')

    for (var i = second_contact_details.length - 1; i >= 0; i--) {
      new SecondContactDetails(second_contact_details[i])
    };

  })

}
/* Secondary Sources

  This hides "Secondary Source" fields (unless they contain values)
  behind an "Add secondary source" link.

*/


function SecondarySources(element) {

  function setup() {
    var secondary_sources = that.element.querySelectorAll('.source')


    for (var i = 0; i < secondary_sources.length; i++) {
      that.secondary_sources.push(new SecondarySource(secondary_sources[i], that))
    };

    that.showButtonForFirstHiddenSource()

  }

  this.element = element
  this.secondary_sources = []

  var that = this
  setup()


}

function SecondarySource(fieldset, secondary_sources) {

  function setup() {

    var fields = that.fieldset.querySelectorAll('input, textarea')
    var anyFieldsHaveValue = false;

    for (var i = fields.length - 1; i >= 0; i--) {

      if (fields[i].value != "") {
        anyFieldsHaveValue = true
        break;
      }
    };

    that.add_secondary_source_button = document.createElement('button')
    that.add_secondary_source_button.classList.add('link')
    that.add_secondary_source_button.classList.add('hidden')
    that.add_secondary_source_button.textContent = 'Add secondary source'
    that.add_secondary_source_button.addEventListener('click', that.addSourceButtonClicked.bind(that))
    var parent = that.fieldset.parentElement
    parent.insertBefore(that.add_secondary_source_button, that.fieldset)


    var remove_secondary_source_button = document.createElement('button')
    remove_secondary_source_button.classList.add('delete')
    remove_secondary_source_button.classList.add('link')
    remove_secondary_source_button.textContent = 'Remove source'
    remove_secondary_source_button.addEventListener('click', that.removeSourceButtonClicked.bind(that))

    var legend = that.fieldset.querySelector('legend')

    if (legend) {
      that.fieldset.insertBefore(remove_secondary_source_button, legend.nextSibling)
    }

    that.setHidden(!anyFieldsHaveValue)

  }


  this.fieldset = fieldset
  this.secondary_sources = secondary_sources
  this.hidden = false

  var that = this
  setup()
}



SecondarySources.prototype.showButtonForFirstHiddenSource = function() {

  if (this.secondary_sources.length > 0) {

    var firstHiddenSourceShown = false

    for (var i = 0; i < this.secondary_sources.length; i++) {

      if (this.secondary_sources[i].hidden && firstHiddenSourceShown == false) {
        this.secondary_sources[i].showAddSourceButton(true)
        firstHiddenSourceShown = true
      } else {
        this.secondary_sources[i].showAddSourceButton(false)
      }

    };

  }

}


SecondarySource.prototype.setHidden = function(hidden) {
  this.hidden = hidden

  if (hidden) {
    this.fieldset.classList.add('hidden')
  } else {
    this.fieldset.classList.remove('hidden')
  }

  this.secondary_sources.showButtonForFirstHiddenSource()
}

SecondarySource.prototype.showAddSourceButton = function(show) {

  if (show) {
    this.add_secondary_source_button.classList.remove('hidden')
  } else {
    this.add_secondary_source_button.classList.add('hidden')
  }

}


SecondarySource.prototype.addSourceButtonClicked = function(event) {

  this.setHidden(false)
  event.preventDefault()
};

SecondarySource.prototype.removeSourceButtonClicked = function(event) {

  var fields = this.fieldset.querySelectorAll('input, textarea')

  for (var i = 0; i < fields.length; i++) {
    fields[i].value = ""
  };

  this.setHidden(true)
  event.preventDefault()
};

if (
  'addEventListener' in document &&
  document.querySelectorAll
  ) {

  document.addEventListener('DOMContentLoaded', function() {
    var secondary_sources = document.querySelectorAll('.js-secondary-sources')

    for (var i = secondary_sources.length - 1; i >= 0; i--) {
      new SecondarySources(secondary_sources[i])
    };

  })

}
$(document).ready(function () {
  var $details = $('details');
  $details.each(function () {
    $(this).after('<div class="print-node"><h3 class="heading-small">' + $(this).find('span').html() + '</h3><div>' + $(this).find('.panel').html() + '</div></div>')
  });

  $('.js--print').click(function (e) {
    e.preventDefault();
    window.print();
  });
});
// Stageprompt 2.0.1
//
// See: https://github.com/alphagov/stageprompt
//
// Stageprompt allows user journeys to be described and instrumented
// using data attributes.
//
// Setup (run this on document ready):
//
//   GOVUK.performance.stageprompt.setupForGoogleAnalytics();
//
// Usage:
//
//   Sending events on page load:
//
//     <div id="wrapper" class="service" data-journey="pay-register-birth-abroad:start">
//         [...]
//     </div>
//
//   Sending events on click:
//
//     <a class="help-button" href="#" data-journey-click="stage:help:info">See more info...</a>

;(function (global) {
  'use strict'

  var $ = global.jQuery
  var GOVUK = global.GOVUK || {}

  GOVUK.performance = GOVUK.performance || {}

  GOVUK.performance.stageprompt = (function () {
    var setup, setupForGoogleAnalytics, splitAction

    splitAction = function (action) {
      var parts = action.split(':')
      if (parts.length <= 3) return parts
      return [parts.shift(), parts.shift(), parts.join(':')]
    }

    setup = function (analyticsCallback) {
      var journeyStage = $('[data-journey]').attr('data-journey')
      var journeyHelpers = $('[data-journey-click]')

      if (journeyStage) {
        analyticsCallback.apply(null, splitAction(journeyStage))
      }

      journeyHelpers.on('click', function (event) {
        analyticsCallback.apply(null, splitAction($(this).data('journey-click')))
      })
    }

    setupForGoogleAnalytics = function () {
      setup(GOVUK.performance.sendGoogleAnalyticsEvent)
    }

    return {
      setup: setup,
      setupForGoogleAnalytics: setupForGoogleAnalytics
    }
  }())

  GOVUK.performance.sendGoogleAnalyticsEvent = function (category, event, label) {
    global._gaq.push(['_trackEvent', category, event, label, undefined, true])
  }

  global.GOVUK = GOVUK
})(window)

$(document).ready(function () {
  var $stickies = $(".sticky-js");
  $.each($stickies, function () {
    var stickyPosition = parseInt($(this).position().top);
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop >= stickyPosition) {
        $(this).addClass('sticky-js-fixed');
      } else {
        $(this).removeClass('sticky-js-fixed');
      }
    }.bind(this));
  });
});
function Table(table) {

  var module = this;
  var $table = table ?  table : $("#table");
  var groupLength = $table.find('thead tr').first().find('td').length - 1;
  var cellLength = $table.find('thead tr td').length;
  var $headings = $table.find('thead tr').last().find('td'), ordering, cachedIndex;

  this.ordering = function(index) {
    var firstClick = cachedIndex !== index;
    if(firstClick) {
      ordering = 'desc';
    } else {
      ordering = ordering !== 'asc' ? 'asc' : 'desc';
    }
    cachedIndex = index;
  }

  if($headings.length) {
    var dataTable = $table.DataTable({
      "paging":   false,
      "searching": false,
      "info":     false
    }),
    offset = 0, yPos, scrolling;

    if(browser && !browser.msie) {
      $.each($headings, function (index) {
        var $button = $(this).find('button');
        $button.on('click', function () {
          module.ordering(index);
          $(this).unbind().attr('class', 'sorting_' + ordering);
          dataTable.order( [index,  ordering]).draw()
        }.bind(this))
      });
    }

    $headings.attr('width', (960 / $headings.length));
    $headings.removeAttr('style').attr('style', 'width:' + 100 / $headings.length + '%');
    $table.removeAttr('style');

    $table.find('tbody')
      .on('touchstart', function(e) {
        yPos = e.originalEvent.layerY;
        if(e.touches.length > 1) {
          $(this).removeClass('scrolling--disabled');
          $('body')
            .bind('touchmove', function(e){e.preventDefault()})
        }
        else {
          $(this).addClass('scrolling--disabled');
        }
      })
      .on('touchend', function(e) {
        $(this).removeClass('scrolling--disabled');
        $('body').unbind('touchmove');
      })
      .on('touchmove', function(e) {
        if(e.touches.length > 1) {
          yPos > e.originalEvent.layerY ? offset++ : offset--;
          if(scrolling == null) {
            scrolling = setTimeout(function() {
              scrolling = null;
              $(this).scrollTop(offset);
            }.bind(this), 30);
          }
        }
      })
  }

  return module;

}

$(document).ready(function () {

  var browser = typeof bowser !== 'undefined' ? bowser : null;

  if(browser) {
    var osversion = parseFloat(browser.osversion);

    if(browser.mac && osversion >= 10.6 && osversion <= 10.8 || browser.msie) {
      $("table").each(function () {
        if($(this).hasClass('cropped')) {
          $(this).addClass("table-fix");
        }
      });
    }
  }

  var $tables = $(".table");

  $.each($tables, function() {
    if (!$(this).hasClass('no-sort')) {
      new Table($(this));
    }
  });

});
